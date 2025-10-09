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
import { db } from '../Config/firebaseconfig'; // Make sure to import your Firebase config

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
    }
    return () => setIsVisible(false);
  }, [userId]);

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
      <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-green-500 p-3 rounded-xl mr-4 shadow-lg transform rotate-12">
            <i className="fas fa-utensils text-white text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-500">Nutrition Plan</h2>
        </div>
        <div className="text-center py-10 animate-pulse">
          <div className="inline-block p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full mb-6 shadow-inner">
            <i className="fas fa-apple-alt text-5xl text-gray-500"></i>
          </div>
          <p className="text-gray-400 text-lg mb-2">No nutrition plan generated yet.</p>
          <p className="text-sm text-gray-500">Complete your profile to get started!</p>
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

  // Advanced food database with nutritional profiles
  const foodDatabase = {
    breakfast: [
      { name: "Greek Yogurt Bowl", calories: 350, protein: 25, carbs: 30, fats: 12, ingredients: ["Greek yogurt", "berries", "almonds", "honey"] },
      { name: "Avocado Toast", calories: 320, protein: 15, carbs: 35, fats: 16, ingredients: ["whole grain bread", "avocado", "eggs", "spinach"] },
      { name: "Protein Oatmeal", calories: 380, protein: 30, carbs: 45, fats: 8, ingredients: ["oats", "whey protein", "banana", "cinnamon"] }
    ],
    lunch: [
      { name: "Grilled Chicken Salad", calories: 420, protein: 35, carbs: 25, fats: 18, ingredients: ["chicken breast", "mixed greens", "quinoa", "olive oil"] },
      { name: "Salmon & Sweet Potato", calories: 450, protein: 30, carbs: 40, fats: 20, ingredients: ["salmon", "sweet potato", "broccoli", "lemon"] },
      { name: "Turkey Wrap", calories: 380, protein: 28, carbs: 35, fats: 14, ingredients: ["turkey", "whole wheat wrap", "hummus", "vegetables"] }
    ],
    dinner: [
      { name: "Lean Steak & Veggies", calories: 480, protein: 40, carbs: 30, fats: 22, ingredients: ["sirloin steak", "asparagus", "mushrooms", "herbs"] },
      { name: "Fish & Brown Rice", calories: 420, protein: 35, carbs: 45, fats: 15, ingredients: ["white fish", "brown rice", "green beans", "garlic"] },
      { name: "Chicken Stir-fry", calories: 400, protein: 32, carbs: 35, fats: 16, ingredients: ["chicken", "mixed vegetables", "soy sauce", "ginger"] }
    ],
    snack: [
      { name: "Protein Shake", calories: 180, protein: 25, carbs: 10, fats: 4, ingredients: ["whey protein", "almond milk", "berries"] },
      { name: "Apple & Peanut Butter", calories: 200, protein: 8, carbs: 25, fats: 10, ingredients: ["apple", "natural peanut butter", "cinnamon"] },
      { name: "Greek Yogurt Parfait", calories: 220, protein: 20, carbs: 25, fats: 6, ingredients: ["Greek yogurt", "granola", "honey", "nuts"] }
    ]
  };

  const getFoodSuggestions = (mealType) => {
    const baseType = mealType.toLowerCase().includes('breakfast') ? 'breakfast' :
                    mealType.toLowerCase().includes('lunch') ? 'lunch' :
                    mealType.toLowerCase().includes('dinner') ? 'dinner' : 'snack';
    
    return foodDatabase[baseType] || foodDatabase.snack;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-400 mt-4">Loading nutrition data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-orange-500 to-green-500 p-2 md:p-3 rounded-xl mr-3 md:mr-4 shadow-lg transform rotate-12 transition-transform duration-500 hover:rotate-0">
            <i className="fas fa-utensils text-white text-lg md:text-xl"></i>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-500">Nutrition Plan</h2>
        </div>
        <div className="bg-orange-500/20 px-2 py-1 md:px-3 md:py-1 rounded-full border border-orange-500/30">
          <span className="text-orange-400 text-xs md:text-sm font-medium">Active Metabolism</span>
        </div>
      </div>
      
      {/* Metabolic Overview Card */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-orange-900/40 via-green-900/40 to-blue-900/40 rounded-2xl shadow-lg border border-orange-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-green-500/5"></div>
        <div className="relative z-10">
          <h3 className="font-semibold mb-4 text-white text-lg flex items-center">
            <i className="fas fa-fire text-orange-400 mr-2"></i>
            Metabolic Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { 
                value: getUpdatedMetabolicValue(plan.calorieIntake, 'calories'), 
                initialValue: getInitialValue('calories'),
                label: 'Calories', 
                icon: 'fire', 
                color: 'from-orange-500 to-amber-500',
                trend: weeklyTrends.calories,
                unit: ''
              },
              { 
                value: getUpdatedMetabolicValue(plan.proteinIntake, 'protein'), 
                initialValue: getInitialValue('protein'),
                label: 'Protein', 
                icon: 'dumbbell', 
                color: 'from-green-500 to-emerald-500',
                trend: weeklyTrends.protein,
                unit: 'g'
              },
              { 
                value: getUpdatedMetabolicValue(plan.carbIntake, 'carbs'), 
                initialValue: getInitialValue('carbs'),
                label: 'Carbs', 
                icon: 'bread-slice', 
                color: 'from-blue-500 to-cyan-500',
                trend: weeklyTrends.carbs,
                unit: 'g'
              },
              { 
                value: getUpdatedMetabolicValue(plan.fatIntake, 'fats'), 
                initialValue: getInitialValue('fats'),
                label: 'Fats', 
                icon: 'oil-can', 
                color: 'from-orange-500 to-yellow-500',
                trend: weeklyTrends.fats,
                unit: 'g'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 p-3 md:p-4 rounded-xl text-center border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-orange-500/30">
                <div className="flex justify-center mb-2">
                  <div className={`bg-gradient-to-r ${item.color} p-2 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center`}>
                    <i className={`fas fa-${item.icon} text-white text-sm`}></i>
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold mb-1 text-white">{item.value}{item.unit}</div>
                <div className="text-orange-200 text-xs mb-1">{item.label}</div>
                <div className="text-gray-400 text-xs mb-1">
                  Initial: {item.initialValue}{item.unit}
                </div>
                <div className={`text-xs ${item.trend.trend === 'up' ? 'text-green-400' : item.trend.trend === 'down' ? 'text-red-400' : 'text-yellow-400'}`}>
                  <i className={`fas fa-${item.trend.trend === 'up' ? 'arrow-up' : item.trend.trend === 'down' ? 'arrow-down' : 'minus'} mr-1`}></i>
                  {item.trend.change} this week
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Progress Tracker */}
      <div className="mb-6 md:mb-8 bg-gray-800 p-4 md:p-5 rounded-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-lg flex items-center">
            <i className="fas fa-chart-bar text-orange-400 mr-2"></i>
            Today's Progress
          </h3>
          {hasUnsavedChanges && (
            <div className="flex space-x-2">
              <button 
                onClick={discardChanges}
                className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg text-xs hover:bg-orange-500/30 border border-orange-500/30 transition-all"
              >
                Discard
              </button>
              <button 
                onClick={saveProgressChanges}
                disabled={loading}
                className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-xs hover:bg-green-500/30 border border-green-500/30 transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {[
            { key: 'calories', label: 'Calories', color: 'bg-orange-500', icon: 'fire', initial: getInitialValue('calories'), unit: '' },
            { key: 'protein', label: 'Protein', color: 'bg-green-500', icon: 'dumbbell', initial: getInitialValue('protein'), unit: 'g' },
            { key: 'carbs', label: 'Carbohydrates', color: 'bg-blue-500', icon: 'bread-slice', initial: getInitialValue('carbs'), unit: 'g' },
            { key: 'fats', label: 'Fats', color: 'bg-yellow-500', icon: 'oil-can', initial: getInitialValue('fats'), unit: 'g' }
          ].map((nutrient) => (
            <div key={nutrient.key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`${nutrient.color} p-2 rounded-lg`}>
                  <i className={`fas fa-${nutrient.icon} text-white text-sm`}></i>
                </div>
                <div>
                  <span className="text-gray-300 text-sm font-medium block">{nutrient.label}</span>
                  <span className="text-gray-500 text-xs">Initial: {nutrient.initial}{nutrient.unit}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-20 md:w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${nutrient.color} transition-all duration-500`}
                    style={{ width: `${dailyProgress[nutrient.key]}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm font-bold w-8 md:w-12 text-center">{dailyProgress[nutrient.key]}%</span>
                <button 
                  onClick={() => updateDailyProgress(nutrient.key, -10)}
                  className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs hover:bg-orange-500/30 transition-all"
                >
                  -
                </button>
                <button 
                  onClick={() => updateDailyProgress(nutrient.key, 10)}
                  className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs hover:bg-green-500/30 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Meals per day selector */}
      <div className="mb-6 md:mb-8 bg-gray-800 p-4 md:p-5 rounded-2xl border border-gray-700 transition-all duration-300 hover:border-orange-500/30">
        <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
          <i className="fas fa-clock mr-2 text-orange-400"></i>
          Meal Frequency Strategy
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3 md:flex md:space-x-3">
          {[3, 4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => handleMealsPerDayChange(num)}
              className={`py-2 md:py-3 px-3 md:px-4 rounded-xl text-sm font-medium transition-all duration-300 transform ${
                mealsPerDay === num 
                  ? 'bg-gradient-to-r from-orange-600 to-green-700 text-white shadow-lg scale-105' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
              }`}
            >
              {num} Meals
            </button>
          ))}
        </div>
        <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
          <p className="text-orange-300 text-sm">
            <i className="fas fa-lightbulb mr-2"></i>
            {mealsPerDay === 3 ? "Traditional pattern for stable routines" :
             mealsPerDay === 4 ? "Balanced approach for most lifestyles" :
             mealsPerDay === 5 ? "Optimal for active individuals" :
             "Advanced strategy for metabolic efficiency"}
          </p>
        </div>
      </div>
      
      {/* Enhanced Tabs System */}
      <div className="mb-6 md:mb-8 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-700">
          {[
            { id: 'macros', label: 'Meal Intelligence', icon: 'brain' },
            { id: 'schedule', label: 'Metabolic Timing', icon: 'clock' },
            { id: 'foods', label: 'Food Database', icon: 'database' },
            { id: 'tips', label: 'Expert Tips', icon: 'graduation-cap' }
          ].map(tab => (
            <button 
              key={tab.id}
              className={`flex-1 min-w-max py-3 md:py-4 px-2 md:px-4 text-sm font-medium transition-all duration-300 flex items-center justify-center ${
                activeTab === tab.id 
                  ? 'bg-orange-900/30 text-orange-400 border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`fas fa-${tab.icon} mr-1 md:mr-2 ${activeTab === tab.id ? 'text-orange-400' : 'text-gray-500'}`}></i>
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 md:p-5">
          {activeTab === 'macros' ? (
            <div className="space-y-4">
              {mealSuggestions.map((meal, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-750 to-gray-800 p-4 rounded-xl border border-gray-600 transition-all duration-300 hover:border-orange-500/50 hover:scale-[1.01]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`p-2 md:p-3 rounded-lg mr-3 ${
                        meal.type === 'main' ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-green-500/20 border border-green-500/30'
                      }`}>
                        <i className={`fas fa-${meal.type === 'main' ? 'utensils' : 'apple-alt'} ${
                          meal.type === 'main' ? 'text-orange-400' : 'text-green-400'
                        }`}></i>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm md:text-base">{meal.name}</div>
                        <div className="text-orange-400 text-xs md:text-sm">{meal.time} • {Math.round(meal.ratio * 100)}% daily intake</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-lg">{meal.calories} kcal</div>
                      <div className="text-gray-400 text-xs md:text-sm">{meal.protein}g protein</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3">
                    <div className="text-center p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="text-orange-400 font-bold text-sm">{meal.carbs}g</div>
                      <div className="text-gray-400 text-xs">carbs</div>
                    </div>
                    <div className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-green-400 font-bold text-sm">{meal.protein}g</div>
                      <div className="text-gray-400 text-xs">protein</div>
                    </div>
                    <div className="text-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-blue-400 font-bold text-sm">{meal.fats}g</div>
                      <div className="text-gray-400 text-xs">fats</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-2 rounded border-l-4 border-orange-500">
                    <p className="text-orange-300 text-xs">{meal.metabolicTip}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'schedule' ? (
            <div className="space-y-4">
              {mealSuggestions.map((meal, index) => (
                <div key={index} className="bg-gray-750 p-4 rounded-xl border border-gray-600 transition-all duration-300 hover:border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-orange-500/20 p-2 md:p-3 rounded-lg mr-3 border border-orange-500/30">
                        <i className="fas fa-clock text-orange-400"></i>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm md:text-base">{meal.name}</div>
                        <div className="text-orange-400 text-xs md:text-sm">{meal.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-sm md:text-base">{meal.calories} kcal</div>
                      <div className="text-gray-400 text-xs md:text-sm">{meal.protein}g protein</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'foods' ? (
            <div className="space-y-4">
              {mealSuggestions.map((meal, index) => (
                <div key={index} className="bg-gray-750 p-4 rounded-xl border border-gray-600">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500/20 p-2 rounded-lg mr-3 border border-green-500/30">
                      <i className="fas fa-utensils text-green-400"></i>
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">{meal.name} Options</div>
                      <div className="text-green-400 text-xs md:text-sm">{meal.time}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {getFoodSuggestions(meal.name).map((food, foodIndex) => (
                      <div key={foodIndex} className="bg-gray-800/50 p-3 rounded-lg border-l-4 border-orange-500">
                        <div className="font-medium text-white text-sm">{food.name}</div>
                        <div className="text-gray-400 text-xs mt-1">
                          {food.ingredients.join(' • ')}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs">
                          <span className="text-orange-400">{food.calories} cal</span>
                          <span className="text-green-400">{food.protein}g protein</span>
                          <span className="text-blue-400">{food.carbs}g carbs</span>
                          <span className="text-yellow-400">{food.fats}g fats</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 p-4 rounded-xl border border-orange-500/20">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <i className="fas fa-fire text-orange-400 mr-2"></i>
                  Metabolic Optimization
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Distribute protein evenly across meals for optimal muscle synthesis</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Time carbohydrate intake around physical activity periods</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Include healthy fats with evening meals for hormone production</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-500/20">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <i className="fas fa-brain text-blue-400 mr-2"></i>
                  Cognitive Performance
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Include omega-3 rich foods for brain health and focus</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-2 mt-1"></i>
                    <span>Stay hydrated - even mild dehydration affects cognitive function</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Hydration Section */}
      <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-4 md:p-5 rounded-2xl border border-blue-500/30 mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-lg flex items-center">
            <i className="fas fa-tint text-blue-400 mr-2"></i>
            Hydration Intelligence
          </h3>
          <div className="bg-blue-500/20 px-2 md:px-3 py-1 rounded-full">
            <span className="text-blue-300 text-xs md:text-sm font-medium">{hydrationProgress}%</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Daily Hydration Goal</span>
            <span>{hydrationProgress}% / 100%</span>
          </div>
          <div className="w-full bg-blue-900/30 rounded-full h-3 md:h-4 border border-blue-500/20">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-500/25"
              style={{ width: `${hydrationProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => updateHydration(-10)}
            className="flex-1 bg-blue-500/20 text-blue-300 py-2 md:py-3 rounded-xl text-sm font-medium hover:bg-blue-500/30 border border-blue-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <i className="fas fa-minus mr-1"></i> 250ml
          </button>
          <button 
            onClick={() => updateHydration(10)}
            className="flex-1 bg-cyan-500/20 text-cyan-300 py-2 md:py-3 rounded-xl text-sm font-medium hover:bg-cyan-500/30 border border-cyan-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <i className="fas fa-plus mr-1"></i> 250ml
          </button>
          <button 
            onClick={() => updateHydration(20)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 md:py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-700 border border-cyan-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            <i className="fas fa-wine-bottle mr-1"></i> 500ml
          </button>
        </div>
        
        <div className="mt-4 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
          <p className="text-blue-300 text-sm">
            <i className="fas fa-lightbulb mr-2"></i>
            {hydrationProgress < 30 ? "Start your day strong - drink 500ml upon waking" :
             hydrationProgress < 60 ? "Maintain momentum - sip water throughout activities" :
             hydrationProgress < 90 ? "Almost there! Hydration supports recovery" :
             "Excellent! Optimal hydration enhances metabolic efficiency"}
          </p>
        </div>
      </div>
      
      {/* Enhanced Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:from-orange-700 hover:to-orange-800 shadow-lg shadow-orange-500/25 border border-orange-500/30">
          <i className="fas fa-sync-alt mr-2"></i>
          Regenerate
        </button>
        <button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/25 border border-green-500/30">
          <i className="fas fa-download mr-2"></i>
          Export Plan
        </button>
      </div>
    </div>
  );
};

export default NutritionPlan;