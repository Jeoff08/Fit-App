// NutritionPlan.jsx
import React, { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../Config/firebaseconfig';
import { getFoodDatabase } from './foodDatabase';

const NutritionPlan = ({ plan, userId }) => {
  const [mealsPerDay, setMealsPerDay] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('macros');
  const [hydrationProgress, setHydrationProgress] = useState(65);
  const [dailyProgress, setDailyProgress] = useState({
    calories: 45,
    protein: 60,
    carbs: 55,
    fats: 40
  });
  const [progressChanges, setProgressChanges] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNutritionData, setUserNutritionData] = useState(null);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Store initial plan values
  const [initialPlan] = useState(plan ? {
    calorieIntake: plan.calorieIntake,
    proteinIntake: plan.proteinIntake,
    carbIntake: plan.carbIntake,
    fatIntake: plan.fatIntake
  } : null);

  useEffect(() => {
    setIsVisible(true);
    if (userId) {
      loadUserNutritionData();
    } else {
      // Load from localStorage if no userId (guest mode)
      loadWeeklyMealPlanFromLocalStorage();
    }
    return () => setIsVisible(false);
  }, [userId]);

  // Load weekly meal plan from localStorage
  const loadWeeklyMealPlanFromLocalStorage = () => {
    try {
      const savedPlan = localStorage.getItem('weeklyMealPlan');
      if (savedPlan) {
        setWeeklyMealPlan(JSON.parse(savedPlan));
      }
    } catch (error) {
      console.error('Error loading weekly meal plan from localStorage:', error);
    }
  };

  // Save weekly meal plan to localStorage
  const saveWeeklyMealPlanToLocalStorage = (planData) => {
    try {
      localStorage.setItem('weeklyMealPlan', JSON.stringify(planData));
    } catch (error) {
      console.error('Error saving weekly meal plan to localStorage:', error);
    }
  };

  // Load user nutrition data from Firestore
  const loadUserNutritionData = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserNutritionData(userData.nutrition || {});
        
        // Load saved progress if exists
        if (userData.dailyProgress) {
          setDailyProgress(userData.dailyProgress);
        }
        
        if (userData.hydrationProgress !== undefined) {
          setHydrationProgress(userData.hydrationProgress);
        }
        
        if (userData.mealsPerDay) {
          setMealsPerDay(userData.mealsPerDay);
        }

        // Load weekly meal plan if exists
        if (userData.weeklyMealPlan) {
          setWeeklyMealPlan(userData.weeklyMealPlan);
        }
      }
    } catch (error) {
      console.error('Error loading user nutrition data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save user preferences to Firestore
  const saveUserPreferences = async (updates) => {
    if (!userId) return;
    
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        ...updates,
        lastUpdated: Timestamp.now()
      });
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  };

  // Generate weekly meal plan
  const generateWeeklyMealPlan = async () => {
    if (!plan) return;
    
    setIsGeneratingPlan(true);
    try {
      const foodDB = getFoodDatabase(plan.goalType || 'maintenance');
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const newWeeklyPlan = {};
      
      // Calculate meal distribution
      const mealDistribution = calculateMealDistribution();
      
      // Track used foods across the entire week to avoid repetition
      const weeklyUsedFoods = new Set();
      
      daysOfWeek.forEach(day => {
        newWeeklyPlan[day] = generateDailyMealPlan(foodDB, mealDistribution, weeklyUsedFoods);
      });
      
      setWeeklyMealPlan(newWeeklyPlan);
      
      // Save to localStorage
      saveWeeklyMealPlanToLocalStorage(newWeeklyPlan);
      
      // Save to Firestore if user is logged in
      if (userId) {
        await saveUserPreferences({ 
          weeklyMealPlan: newWeeklyPlan
        });
        
        await logNutritionActivity('weekly_plan_generated', {
          mealsPerDay: mealsPerDay,
          timestamp: Timestamp.now()
        });
      }
      
      alert('Weekly meal plan generated successfully!');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      alert('Error generating meal plan. Please try again.');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Generate daily meal plan that perfectly matches targets
  const generateDailyMealPlan = (foodDB, mealDistribution, weeklyUsedFoods) => {
    const dailyMeals = [];
    const dailyUsedFoods = new Set();
    
    // Calculate total targets
    const totalTargets = {
      calories: plan.calorieIntake,
      protein: plan.proteinIntake,
      carbs: plan.carbIntake,
      fats: plan.fatIntake
    };
    
    let remainingTargets = { ...totalTargets };
    
    mealDistribution.ratios.forEach((ratio, index) => {
      const mealType = mealDistribution.types[index];
      const baseFoodType = getBaseFoodType(mealType);
      
      // Get available foods for this meal type
      const availableFoods = foodDB[baseFoodType] || [];
      
      // Filter out foods used this week AND today to avoid repetition
      const filteredFoods = availableFoods.filter(food => 
        !weeklyUsedFoods.has(food.name) && !dailyUsedFoods.has(food.name)
      );
      
      // If no unique foods left, allow repetition but prioritize less used foods
      const foodsToUse = filteredFoods.length > 0 ? filteredFoods : availableFoods;
      
      if (foodsToUse.length > 0) {
        // Select the best matching food for remaining targets
        const selectedFood = selectOptimalFood(foodsToUse, remainingTargets, ratio, mealDistribution.ratios.length - index);
        
        // Mark food as used
        weeklyUsedFoods.add(selectedFood.name);
        dailyUsedFoods.add(selectedFood.name);
        
        // Calculate exact nutrients for this meal to match daily targets
        const mealNutrients = calculateMealNutrients(selectedFood, remainingTargets, ratio, mealDistribution.ratios.length - index);
        
        // Update remaining targets
        remainingTargets.calories -= mealNutrients.calories;
        remainingTargets.protein -= mealNutrients.protein;
        remainingTargets.carbs -= mealNutrients.carbs;
        remainingTargets.fats -= mealNutrients.fats;
        
        dailyMeals.push({
          time: mealDistribution.timing[index],
          name: mealType.charAt(0).toUpperCase() + mealType.slice(1).replace('-', ' '),
          type: mealType,
          food: selectedFood,
          calories: mealNutrients.calories,
          protein: mealNutrients.protein,
          carbs: mealNutrients.carbs,
          fats: mealNutrients.fats,
          ratio: ratio,
          metabolicTip: getMetabolicTip(mealType, index)
        });
      }
    });
    
    // Final adjustment to perfectly match targets
    if (dailyMeals.length > 0) {
      adjustFinalMeal(dailyMeals, remainingTargets);
    }
    
    return dailyMeals;
  };

  // Adjust the final meal to perfectly match remaining targets
  const adjustFinalMeal = (dailyMeals, remainingTargets) => {
    const lastMeal = dailyMeals[dailyMeals.length - 1];
    const food = lastMeal.food;
    
    // Calculate adjustment needed
    const calorieAdjustment = remainingTargets.calories;
    const proteinAdjustment = remainingTargets.protein;
    const carbAdjustment = remainingTargets.carbs;
    const fatAdjustment = remainingTargets.fats;
    
    // Calculate scaling factors for each nutrient
    const calorieScale = calorieAdjustment / food.caloriesPerServing;
    const proteinScale = proteinAdjustment / food.proteinPerServing;
    const carbScale = carbAdjustment / food.carbsPerServing;
    const fatScale = fatAdjustment / food.fatPerServing;
    
    // Use the maximum scale to ensure we meet all targets
    const maxScale = Math.max(calorieScale, proteinScale, carbScale, fatScale, 0.1);
    const finalScale = Math.min(maxScale, 2.0); // Cap at 200% to avoid unrealistic portions
    
    // Apply final adjustment
    lastMeal.calories += Math.round(food.caloriesPerServing * finalScale);
    lastMeal.protein += Math.round(food.proteinPerServing * finalScale);
    lastMeal.carbs += Math.round(food.carbsPerServing * finalScale);
    lastMeal.fats += Math.round(food.fatPerServing * finalScale);
  };

  // Select optimal food based on remaining targets
  const selectOptimalFood = (foods, remainingTargets, currentRatio, mealsRemaining) => {
    // Calculate ideal nutrients for this meal
    const idealCalories = remainingTargets.calories * currentRatio;
    const idealProtein = remainingTargets.protein * currentRatio;
    const idealCarbs = remainingTargets.carbs * currentRatio;
    const idealFats = remainingTargets.fats * currentRatio;
    
    // Find food that best matches ideal nutrients
    let bestFood = foods[0];
    let bestScore = Infinity;
    
    foods.forEach(food => {
      const calorieDiff = Math.abs(food.caloriesPerServing - idealCalories);
      const proteinDiff = Math.abs(food.proteinPerServing - idealProtein);
      const carbDiff = Math.abs(food.carbsPerServing - idealCarbs);
      const fatDiff = Math.abs(food.fatPerServing - idealFats);
      
      // Weight protein more heavily for fitness goals
      const score = calorieDiff * 0.3 + proteinDiff * 0.4 + carbDiff * 0.2 + fatDiff * 0.1;
      
      if (score < bestScore) {
        bestScore = score;
        bestFood = food;
      }
    });
    
    return bestFood;
  };

  // Calculate meal nutrients to match daily targets
  const calculateMealNutrients = (food, remainingTargets, currentRatio, mealsRemaining) => {
    const baseCalories = food.caloriesPerServing;
    const baseProtein = food.proteinPerServing;
    const baseCarbs = food.carbsPerServing;
    const baseFats = food.fatPerServing;
    
    // Calculate scaling factor based on ratio and remaining targets
    const calorieScale = (remainingTargets.calories * currentRatio) / baseCalories;
    const proteinScale = (remainingTargets.protein * currentRatio) / baseProtein;
    const carbScale = (remainingTargets.carbs * currentRatio) / baseCarbs;
    const fatScale = (remainingTargets.fats * currentRatio) / baseFats;
    
    // Use weighted average scaling factor
    const scale = (calorieScale * 0.4 + proteinScale * 0.4 + carbScale * 0.1 + fatScale * 0.1);
    const finalScale = Math.min(scale, 1.5); // Cap at 150% to avoid unrealistic portions
    
    return {
      calories: Math.round(baseCalories * finalScale),
      protein: Math.round(baseProtein * finalScale),
      carbs: Math.round(baseCarbs * finalScale),
      fats: Math.round(baseFats * finalScale)
    };
  };

  // Helper function to map meal types to food database categories
  const getBaseFoodType = (mealType) => {
    if (mealType.includes('breakfast')) return 'breakfast';
    if (mealType.includes('lunch')) return 'lunch';
    if (mealType.includes('dinner')) return 'dinner';
    return 'snacks';
  };

  const updateHydration = async (amount) => {
    const newHydration = Math.min(100, Math.max(0, hydrationProgress + amount));
    setHydrationProgress(newHydration);
    
    // Save to Firestore
    if (userId) {
      try {
        await saveUserPreferences({ 
          hydrationProgress: newHydration 
        });
        
        // Log hydration activity
        await logNutritionActivity('hydration', {
          amount: amount,
          newLevel: newHydration,
          timestamp: Timestamp.now()
        });
      } catch (error) {
        console.error('Error saving hydration:', error);
      }
    }
  };

  const updateDailyProgress = async (nutrient, amount) => {
    const newProgress = {
      ...dailyProgress,
      [nutrient]: Math.min(100, Math.max(0, dailyProgress[nutrient] + amount))
    };
    
    setDailyProgress(newProgress);
    
    setProgressChanges(prev => ({
      ...prev,
      [nutrient]: prev[nutrient] + amount
    }));
    
    setHasUnsavedChanges(true);
    
    // Auto-save to Firestore
    if (userId) {
      try {
        await saveUserPreferences({ 
          dailyProgress: newProgress 
        });
        
        // Log progress update
        await logNutritionActivity('progress_update', {
          nutrient: nutrient,
          amount: amount,
          newValue: newProgress[nutrient],
          timestamp: Timestamp.now()
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const saveProgressChanges = async () => {
    if (!userId) {
      alert('Progress updated successfully!');
      setHasUnsavedChanges(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Save progress changes to Firestore
      await saveUserPreferences({
        dailyProgress: dailyProgress,
        progressChanges: arrayUnion({
          ...progressChanges,
          timestamp: Timestamp.now()
        })
      });
      
      // Reset changes after saving
      setProgressChanges({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      });
      
      setHasUnsavedChanges(false);
      
      // Show success feedback
      alert('Progress updated successfully!');
      
    } catch (error) {
      console.error('Error saving progress changes:', error);
      alert('Error saving progress. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const discardChanges = () => {
    // Revert to original values or load from Firestore
    if (userNutritionData && userNutritionData.dailyProgress) {
      setDailyProgress(userNutritionData.dailyProgress);
    } else {
      setDailyProgress({
        calories: 45,
        protein: 60,
        carbs: 55,
        fats: 40
      });
    }
    
    setProgressChanges({
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    });
    
    setHasUnsavedChanges(false);
  };

  // Log nutrition activities to Firestore
  const logNutritionActivity = async (type, data) => {
    if (!userId) return;
    
    try {
      const activityRef = doc(db, 'users', userId, 'nutritionActivities', Timestamp.now().toMillis().toString());
      await setDoc(activityRef, {
        type,
        ...data,
        userId,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      console.error('Error logging nutrition activity:', error);
    }
  };

  // Save meal preference to Firestore
  const handleMealsPerDayChange = async (num) => {
    setMealsPerDay(num);
    
    if (userId) {
      try {
        await saveUserPreferences({ 
          mealsPerDay: num 
        });
        
        // Log meal frequency change
        await logNutritionActivity('meal_frequency_change', {
          previous: mealsPerDay,
          new: num,
          timestamp: Timestamp.now()
        });
      } catch (error) {
        console.error('Error saving meal preference:', error);
      }
    }
  };

  // Calculate updated metabolic overview based on progress
  const getUpdatedMetabolicValue = (baseValue, nutrient) => {
    const change = progressChanges[nutrient] || 0;
    const progressPercentage = dailyProgress[nutrient] / 100;
    
    // Scale the change based on progress percentage and base value
    return Math.round(baseValue * progressPercentage + (baseValue * 0.01 * change));
  };

  // Get initial values for display
  const getInitialValue = (nutrient) => {
    if (!initialPlan) return 0;
    
    switch(nutrient) {
      case 'calories': return initialPlan.calorieIntake;
      case 'protein': return initialPlan.proteinIntake;
      case 'carbs': return initialPlan.carbIntake;
      case 'fats': return initialPlan.fatIntake;
      default: return 0;
    }
  };

  // Load weekly trends from Firestore or use defaults
  const getWeeklyTrends = () => {
    if (userNutritionData && userNutritionData.weeklyTrends) {
      return userNutritionData.weeklyTrends;
    }
    
    return {
      calories: { trend: 'up', change: '+2.3%' },
      protein: { trend: 'stable', change: '+0.8%' },
      carbs: { trend: 'down', change: '-1.2%' },
      fats: { trend: 'up', change: '+3.1%' }
    };
  };

  const weeklyTrends = getWeeklyTrends();

  if (!plan) {
    return (
      <div className={`bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-700 p-2 md:p-3 rounded-xl mr-3 md:mr-4 shadow-lg transform rotate-12">
            <i className="fas fa-utensils text-white text-lg md:text-xl"></i>
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Nutrition Plan</h2>
        </div>
        <div className="text-center py-8 md:py-10 animate-pulse">
          <div className="inline-block p-4 md:p-5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full mb-4 md:mb-6 shadow-inner">
            <i className="fas fa-apple-alt text-4xl md:text-5xl text-gray-500"></i>
          </div>
          <p className="text-gray-400 text-base md:text-lg mb-2">No nutrition plan generated yet.</p>
          <p className="text-xs md:text-sm text-gray-500">Complete your profile to get started!</p>
        </div>
      </div>
    );
  }

  // Enhanced realistic nutrition calculations with activity level adjustment
  const calculateMealDistribution = () => {
    const distributions = {
      3: { 
        ratios: [0.35, 0.40, 0.25],
        timing: ['7:00 AM', '1:00 PM', '7:00 PM'],
        types: ['breakfast', 'lunch', 'dinner']
      },
      4: { 
        ratios: [0.30, 0.35, 0.10, 0.25],
        timing: ['7:00 AM', '12:30 PM', '4:00 PM', '7:00 PM'],
        types: ['breakfast', 'lunch', 'snack', 'dinner']
      },
      5: { 
        ratios: [0.25, 0.10, 0.30, 0.15, 0.20],
        timing: ['7:00 AM', '10:30 AM', '1:00 PM', '4:30 PM', '7:30 PM'],
        types: ['breakfast', 'snack', 'lunch', 'pre-workout', 'dinner']
      },
      6: { 
        ratios: [0.20, 0.10, 0.25, 0.10, 0.25, 0.10],
        timing: ['6:30 AM', '9:30 AM', '12:30 PM', '3:30 PM', '6:00 PM', '8:00 PM'],
        types: ['breakfast', 'snack', 'lunch', 'snack', 'dinner', 'recovery']
      }
    };
    
    return distributions[mealsPerDay] || distributions[4];
  };

  const mealDistribution = calculateMealDistribution();
  
  // Enhanced meal suggestions with metabolic optimization
  const mealSuggestions = mealDistribution.ratios.map((ratio, index) => {
    const mealType = mealDistribution.types[index];
    const isWorkoutRelated = mealType.includes('workout') || mealType.includes('recovery');
    const isMorning = index === 0;
    const isEvening = index === mealDistribution.ratios.length - 1;
    
    // Advanced nutrient timing based on chronobiology
    let proteinRatio = isWorkoutRelated ? 1.3 : isMorning ? 1.1 : isEvening ? 0.9 : 1.0;
    let carbRatio = isWorkoutRelated ? 1.4 : isMorning ? 1.2 : isEvening ? 0.7 : 1.0;
    let fatRatio = isWorkoutRelated ? 0.4 : isMorning ? 0.8 : isEvening ? 1.3 : 1.0;

    return {
      time: mealDistribution.timing[index],
      name: mealType.charAt(0).toUpperCase() + mealType.slice(1).replace('-', ' '),
      type: mealType.includes('snack') ? 'snack' : 'main',
      calories: Math.round(plan.calorieIntake * ratio),
      protein: Math.round((plan.proteinIntake * ratio * proteinRatio)),
      carbs: Math.round((plan.carbIntake * ratio * carbRatio)),
      fats: Math.round((plan.fatIntake * ratio * fatRatio)),
      ratio: ratio,
      metabolicTip: getMetabolicTip(mealType, index)
    };
  });

  function getMetabolicTip(mealType, index) {
    const tips = {
      breakfast: "High protein breakfast boosts metabolism by 25%",
      lunch: "Include fiber-rich vegetables for sustained energy",
      dinner: "Lighter dinner improves sleep quality and recovery",
      snack: "Protein-rich snacks maintain stable blood sugar",
      'pre-workout': "Fast-digesting carbs + moderate protein for energy",
      'post-workout': "2:1 carb-to-protein ratio optimal for recovery",
      recovery: "Casein protein before bed supports overnight repair"
    };
    return tips[mealType] || "Balanced meal supports metabolic health";
  }

  // Get food suggestions from the food database
  const getFoodSuggestions = (mealType) => {
    const baseType = getBaseFoodType(mealType);
    const foodDB = getFoodDatabase(plan.goalType || 'maintenance');
    return foodDB[baseType] || [];
  };

  // Calculate daily totals for weekly meal plan
  const calculateDailyTotals = (dailyMeals) => {
    return dailyMeals.reduce((totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fats: totals.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  // Calculate total deviation from targets for a day
  const calculateDailyDeviation = (dailyMeals) => {
    const totals = calculateDailyTotals(dailyMeals);
    return {
      calories: Math.abs(totals.calories - plan.calorieIntake),
      protein: Math.abs(totals.protein - plan.proteinIntake),
      carbs: Math.abs(totals.carbs - plan.carbIntake),
      fats: Math.abs(totals.fats - plan.fatIntake)
    };
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="text-gray-400 mt-3 md:mt-4 text-sm md:text-base">Loading nutrition data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Mobile-specific responsive styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .mobile-stack {
            flex-direction: column;
            align-items: flex-start;
          }
          .mobile-stack > * {
            margin-bottom: 8px;
          }
          .mobile-full-width {
            width: 100%;
          }
          .mobile-text-sm {
            font-size: 0.875rem;
          }
          .mobile-text-xs {
            font-size: 0.75rem;
          }
          .mobile-p-3 {
            padding: 0.75rem;
          }
          .mobile-grid-1 {
            grid-template-columns: 1fr;
          }
          .mobile-tab-scroll {
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
          }
          .mobile-tab-item {
            flex-shrink: 0;
          }
        }
        
        @media (max-width: 480px) {
          .mobile-xs-text-lg {
            font-size: 1.125rem;
          }
          .mobile-xs-text-base {
            font-size: 1rem;
          }
          .mobile-xs-text-sm {
            font-size: 0.875rem;
          }
          .mobile-xs-p-2 {
            padding: 0.5rem;
          }
          .mobile-xs-space-y-2 > * + * {
            margin-top: 0.5rem;
          }
        }
        
        @media (max-width: 360px) {
          .mobile-xxs-text-sm {
            font-size: 0.75rem;
          }
          .mobile-xxs-p-1 {
            padding: 0.25rem;
          }
        }
      `}</style>

      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-green-500 to-green-700 p-2 md:p-3 rounded-xl mr-3 md:mr-4 shadow-lg transform rotate-12 transition-transform duration-500 hover:rotate-0">
            <i className="fas fa-utensils text-white text-lg md:text-xl"></i>
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mobile-xs-text-lg">
            Nutrition Plan
          </h2>
        </div>
        <div className="bg-green-500/20 px-2 py-1 md:px-3 md:py-1 rounded-full border border-green-500/30">
          <span className="text-green-400 text-xs md:text-sm font-medium mobile-text-xs">
            Active Metabolism
          </span>
        </div>
      </div>
      
      {/* Metabolic Overview Card */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-green-900/40 via-green-800/40 to-black rounded-2xl shadow-lg border border-green-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-700/5"></div>
        <div className="relative z-10">
          <h3 className="font-semibold mb-3 md:mb-4 text-green-400 text-lg md:text-xl mobile-xs-text-base">
            Metabolic Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { label: "Calories", value: getInitialValue('calories'), unit: "kcal", icon: "🔥", trend: weeklyTrends.calories },
              { label: "Protein", value: getInitialValue('protein'), unit: "g", icon: "💪", trend: weeklyTrends.protein },
              { label: "Carbs", value: getInitialValue('carbs'), unit: "g", icon: "🍚", trend: weeklyTrends.carbs },
              { label: "Fats", value: getInitialValue('fats'), unit: "g", icon: "🥑", trend: weeklyTrends.fats }
            ].map((item, index) => (
              <div key={index} className="bg-black/60 p-3 md:p-4 rounded-xl border border-green-500/10 backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-black/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm text-gray-400 mobile-text-xs">{item.label}</span>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-base md:text-xl font-bold text-white mobile-text-sm">{item.value}</span>
                  <span className="text-xs text-gray-400 mobile-text-xs">{item.unit}</span>
                </div>
                <div className={`text-xs mt-1 mobile-text-xs ${
                  item.trend.trend === 'up' ? 'text-green-400' : 
                  item.trend.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {item.trend.change} this week
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-1 md:space-x-2 mb-6 md:mb-8 bg-gray-800/50 p-1 md:p-2 rounded-2xl border border-gray-700 mobile-tab-scroll">
        {[
          { id: 'macros', label: 'Daily Macros', icon: '📊' },
          { id: 'meals', label: 'Meal Time', icon: '🍽️' },
          { id: 'weekly', label: 'Weekly Meal Plan', icon: '📅' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 mobile-tab-item ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <span className="mr-2 text-sm md:text-base">{tab.icon}</span>
            <span className="text-xs md:text-sm font-medium mobile-text-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500">
        {/* Daily Macros Tab */}
        {activeTab === 'macros' && (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Progress Tracking */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-6 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="font-semibold mb-4 text-white text-lg md:text-xl mobile-xs-text-base">Daily Progress</h3>
                <div className="space-y-4 md:space-y-5">
                  {[
                    { label: "Calories", value: dailyProgress.calories, color: "from-orange-500 to-red-500", icon: "🔥" },
                    { label: "Protein", value: dailyProgress.protein, color: "from-blue-500 to-purple-500", icon: "💪" },
                    { label: "Carbs", value: dailyProgress.carbs, color: "from-green-500 to-teal-500", icon: "🍚" },
                    { label: "Fats", value: dailyProgress.fats, color: "from-yellow-500 to-orange-500", icon: "🥑" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{item.icon}</span>
                          <span className="text-sm text-gray-300 mobile-text-xs">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium text-white mobile-text-xs">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 md:h-3 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {hasUnsavedChanges && (
                  <div className="flex space-x-2 mt-4 md:mt-6 pt-4 md:pt-5 border-t border-gray-700">
                    <button
                      onClick={saveProgressChanges}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl font-medium text-sm md:text-base transition-all duration-300 hover:from-green-600 hover:to-green-800 disabled:opacity-50 mobile-text-sm"
                    >
                      {loading ? 'Saving...' : 'Save Progress'}
                    </button>
                    <button
                      onClick={discardChanges}
                      className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl font-medium text-sm md:text-base transition-all duration-300 hover:from-gray-700 hover:to-gray-900 mobile-text-sm"
                    >
                      Discard
                    </button>
                  </div>
                )}
              </div>

              {/* Hydration & Quick Actions */}
              <div className="space-y-4 md:space-y-6">
                {/* Hydration Tracker */}
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-4 md:p-6 rounded-2xl border border-blue-500/20 shadow-lg">
                  <h3 className="font-semibold mb-4 text-blue-400 text-lg md:text-xl mobile-xs-text-base">Hydration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 mobile-text-xs">Water Intake</span>
                      <span className="text-sm font-medium text-blue-400 mobile-text-xs">{hydrationProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-900/30 rounded-full h-3 md:h-4 overflow-hidden border border-blue-500/20">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${hydrationProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateHydration(-10)}
                        className="flex-1 bg-gradient-to-r from-blue-700 to-blue-900 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl font-medium text-sm md:text-base transition-all duration-300 hover:from-blue-800 hover:to-blue-950 mobile-text-sm"
                      >
                        -10%
                      </button>
                      <button
                        onClick={() => updateHydration(10)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl font-medium text-sm md:text-base transition-all duration-300 hover:from-blue-600 hover:to-blue-800 mobile-text-sm"
                      >
                        +10%
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Progress Update */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-6 rounded-2xl border border-gray-700 shadow-lg">
                  <h3 className="font-semibold mb-4 text-white text-lg md:text-xl mobile-xs-text-base">Quick Update</h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {[
                      { nutrient: 'calories', label: 'Calories', icon: '🔥' },
                      { nutrient: 'protein', label: 'Protein', icon: '💪' },
                      { nutrient: 'carbs', label: 'Carbs', icon: '🍚' },
                      { nutrient: 'fats', label: 'Fats', icon: '🥑' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <span className="text-xs">{item.icon}</span>
                          <span className="text-xs text-gray-400 mobile-text-xs">{item.label}</span>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => updateDailyProgress(item.nutrient, -5)}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white py-1 md:py-2 px-2 rounded-lg text-xs transition-all duration-300 hover:from-red-700 hover:to-red-900 mobile-text-xs"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateDailyProgress(item.nutrient, 5)}
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-800 text-white py-1 md:py-2 px-2 rounded-lg text-xs transition-all duration-300 hover:from-green-700 hover:to-green-900 mobile-text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Meal Time Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-4 md:space-y-6">
            {/* Meal Frequency Selector */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 md:p-6 rounded-2xl border border-gray-700 shadow-lg">
              <h3 className="font-semibold mb-4 text-white text-lg md:text-xl mobile-xs-text-base">Meal Frequency</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {[3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => handleMealsPerDayChange(num)}
                    className={`py-3 md:py-4 px-2 md:px-4 rounded-xl transition-all duration-300 ${
                      mealsPerDay === num
                        ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform scale-105'
                        : 'bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-600/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold mobile-text-sm">{num}</div>
                      <div className="text-xs mobile-text-xs mt-1">Meals</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Schedule */}
            <div className="bg-gradient-to-br from-green-900/40 via-green-800/40 to-black rounded-2xl shadow-lg border border-green-500/20 p-4 md:p-6">
              <h3 className="font-semibold mb-4 text-green-400 text-lg md:text-xl mobile-xs-text-base">Today's Meal Plan</h3>
              <div className="space-y-3 md:space-y-4">
                {mealSuggestions.map((meal, index) => (
                  <div key={index} className="bg-black/40 p-4 md:p-5 rounded-xl border border-green-500/10 backdrop-blur-sm transition-all duration-300 hover:border-green-500/30 hover:bg-black/60">
                    <div className="flex items-start justify-between mobile-stack">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="bg-gradient-to-r from-green-500 to-green-700 p-2 md:p-3 rounded-lg shadow-lg">
                          <i className={`fas ${
                            meal.type === 'main' ? 'fa-utensils' : 'fa-apple-alt'
                          } text-white text-sm md:text-base`}></i>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-white text-base md:text-lg mobile-text-sm">{meal.name}</span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full mobile-text-xs">
                              {meal.time}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-green-300/80 mobile-text-xs max-w-md">
                            {meal.metabolicTip}
                          </p>
                        </div>
                      </div>
                      <div className="text-right mobile-full-width mobile-mt-2">
                        <div className="text-xs text-gray-400 mb-1 mobile-text-xs">Target Nutrients</div>
                        <div className="flex items-center space-x-3 md:space-x-4 mobile-justify-start mobile-mt-1">
                          <div className="text-center">
                            <div className="text-sm font-bold text-white mobile-text-xs">{meal.calories}</div>
                            <div className="text-xs text-gray-400 mobile-text-xs">cal</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-blue-400 mobile-text-xs">{meal.protein}g</div>
                            <div className="text-xs text-gray-400 mobile-text-xs">prot</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-green-400 mobile-text-xs">{meal.carbs}g</div>
                            <div className="text-xs text-gray-400 mobile-text-xs">carbs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-yellow-400 mobile-text-xs">{meal.fats}g</div>
                            <div className="text-xs text-gray-400 mobile-text-xs">fats</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Food Suggestions */}
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-green-500/10">
                      <div className="text-xs text-gray-400 mb-2 mobile-text-xs">Suggested Foods:</div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {getFoodSuggestions(meal.type).slice(0, 3).map((food, foodIndex) => (
                          <span 
                            key={foodIndex}
                            className="inline-block bg-green-500/10 text-green-400 px-2 py-1 rounded-lg text-xs border border-green-500/20 mobile-text-xs"
                          >
                            {food.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Weekly Meal Plan Tab */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            {/* Generate Weekly Plan Button */}
            <div className="text-center">
              <button
                onClick={generateWeeklyMealPlan}
                disabled={isGeneratingPlan}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mobile-full-width mobile-p-3"
              >
                {isGeneratingPlan ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Generating Weekly Plan...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-calendar-plus mr-2"></i>
                    Generate Weekly Meal Plan
                  </span>
                )}
              </button>
            </div>

            {/* Weekly Meal Plan Display */}
            {weeklyMealPlan && (
              <div className="space-y-6">
                <h3 className="font-semibold text-green-400 text-lg md:text-xl mobile-xs-text-base text-center">
                  Your Weekly Meal Plan
                </h3>
                
                {/* Days of the Week */}
                {Object.entries(weeklyMealPlan).map(([day, meals]) => {
                  const dailyTotals = calculateDailyTotals(meals);
                  const dailyDeviation = calculateDailyDeviation(meals);
                  const isOnTarget = dailyDeviation.calories < 50; // Within 50 calories is considered on target
                  
                  return (
                    <div key={day} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                      <div className={`p-4 md:p-6 border-b ${
                        isOnTarget ? 'border-green-500/30 bg-green-500/10' : 'border-yellow-500/30 bg-yellow-500/10'
                      }`}>
                        <div className="flex items-center justify-between mobile-stack">
                          <h4 className="font-bold text-white text-lg md:text-xl capitalize mobile-xs-text-base">
                            {day}
                          </h4>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium mobile-text-xs ${
                            isOnTarget 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {isOnTarget ? '🎯 On Target' : '⚠️ Needs Adjustment'}
                          </div>
                        </div>
                        
                        {/* Daily Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {[
                            { label: 'Total Calories', value: dailyTotals.calories, target: plan.calorieIntake, unit: 'cal' },
                            { label: 'Total Protein', value: dailyTotals.protein, target: plan.proteinIntake, unit: 'g' },
                            { label: 'Total Carbs', value: dailyTotals.carbs, target: plan.carbIntake, unit: 'g' },
                            { label: 'Total Fats', value: dailyTotals.fats, target: plan.fatIntake, unit: 'g' }
                          ].map((item, index) => (
                            <div key={index} className="text-center">
                              <div className="text-xs text-gray-400 mobile-text-xs">{item.label}</div>
                              <div className="text-sm font-bold text-white mobile-text-sm">{item.value}{item.unit}</div>
                              <div className="text-xs text-gray-500 mobile-text-xs">Target: {item.target}{item.unit}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Daily Meals */}
                      <div className="p-4 md:p-6">
                        <div className="space-y-4">
                          {meals.map((meal, mealIndex) => (
                            <div key={mealIndex} className="bg-black/40 p-4 rounded-xl border border-green-500/10">
                              <div className="flex items-start justify-between mobile-stack">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gradient-to-r from-green-500 to-green-700 p-2 rounded-lg">
                                    <i className="fas fa-utensils text-white text-sm"></i>
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-semibold text-white text-sm">{meal.name}</span>
                                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                        {meal.time}
                                      </span>
                                    </div>
                                    <p className="text-xs text-green-300/80">
                                      {meal.metabolicTip}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right mobile-full-width mobile-mt-2">
                                  <div className="text-xs text-gray-400 mb-1">Meal Nutrients</div>
                                  <div className="flex items-center space-x-3 mobile-justify-start">
                                    <div className="text-center">
                                      <div className="text-sm font-bold text-white">{meal.calories}</div>
                                      <div className="text-xs text-gray-400">cal</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-sm font-bold text-blue-400">{meal.protein}g</div>
                                      <div className="text-xs text-gray-400">prot</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-sm font-bold text-green-400">{meal.carbs}g</div>
                                      <div className="text-xs text-gray-400">carbs</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-sm font-bold text-yellow-400">{meal.fats}g</div>
                                      <div className="text-xs text-gray-400">fats</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Food Details */}
                              <div className="mt-3 pt-3 border-t border-green-500/10">
                                <div className="flex items-center justify-between mobile-stack">
                                  <div>
                                    <div className="text-xs text-gray-400 mb-1">Selected Food:</div>
                                    <div className="text-sm font-medium text-white">
                                      {meal.food.name}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                      Portion adjusted to match daily targets
                                    </div>
                                  </div>
                                  <div className="text-right mobile-full-width mobile-mt-2">
                                    <div className="text-xs text-gray-400 mb-1">Base Nutrients (per serving)</div>
                                    <div className="text-xs text-gray-300 space-y-1">
                                      <div>{meal.food.caloriesPerServing} cal</div>
                                      <div>{meal.food.proteinPerServing}g protein</div>
                                      <div>{meal.food.carbsPerServing}g carbs</div>
                                      <div>{meal.food.fatPerServing}g fats</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPlan;