// NutritionPlan.jsx
import React, { useState, useEffect } from 'react';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  arrayUnion,
  Timestamp,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../Config/firebaseconfig';
import { getFoodDatabase } from './foodDatabase';

const NutritionPlan = ({ plan, userId }) => {
  const [mealsPerDay, setMealsPerDay] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('meals');
  const [dailyProgress, setDailyProgress] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const [consumedMacros, setConsumedMacros] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const [remainingMacros, setRemainingMacros] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNutritionData, setUserNutritionData] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [todayLogs, setTodayLogs] = useState([]);

  // NEW STATE: Temporary input values for adding macros
  const [macroInputs, setMacroInputs] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

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
      loadTodayMacrosLogs();
    }
    return () => setIsVisible(false);
  }, [userId]);

  useEffect(() => {
    if (initialPlan) {
      // Initialize remaining macros based on plan
      setRemainingMacros({
        calories: initialPlan.calorieIntake,
        protein: initialPlan.proteinIntake,
        carbs: initialPlan.carbIntake,
        fats: initialPlan.fatIntake
      });
      
      // Initialize daily progress based on consumed macros
      updateDailyProgressFromConsumed();
    }
  }, [initialPlan]);

  // Update daily progress based on consumed macros
  const updateDailyProgressFromConsumed = () => {
    if (!initialPlan) return;

    const newProgress = {
      calories: Math.round((consumedMacros.calories / initialPlan.calorieIntake) * 100),
      protein: Math.round((consumedMacros.protein / initialPlan.proteinIntake) * 100),
      carbs: Math.round((consumedMacros.carbs / initialPlan.carbIntake) * 100),
      fats: Math.round((consumedMacros.fats / initialPlan.fatIntake) * 100)
    };

    // Cap at 100%
    Object.keys(newProgress).forEach(key => {
      if (newProgress[key] > 100) newProgress[key] = 100;
    });

    setDailyProgress(newProgress);
  };

  // Update remaining macros based on consumed macros
  const updateRemainingMacros = () => {
    if (!initialPlan) return;

    const newRemaining = {
      calories: Math.max(0, initialPlan.calorieIntake - consumedMacros.calories),
      protein: Math.max(0, initialPlan.proteinIntake - consumedMacros.protein),
      carbs: Math.max(0, initialPlan.carbIntake - consumedMacros.carbs),
      fats: Math.max(0, initialPlan.fatIntake - consumedMacros.fats)
    };

    setRemainingMacros(newRemaining);
  };

  // Get today's date string for filtering
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  // Load today's macro logs from Firestore
  const loadTodayMacrosLogs = async () => {
    if (!userId) return;
    
    try {
      const today = getTodayDateString();
      const logsRef = collection(db, 'users', userId, 'macroLogs');
      const q = query(
        logsRef,
        where('date', '==', today),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const logs = [];
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      querySnapshot.forEach((doc) => {
        const logData = doc.data();
        logs.push({
          id: doc.id,
          ...logData
        });
        
        totalCalories += logData.calories || 0;
        totalProtein += logData.protein || 0;
        totalCarbs += logData.carbs || 0;
        totalFats += logData.fats || 0;
      });

      setTodayLogs(logs);
      
      // Update consumed macros with today's total
      const newConsumedMacros = {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fats: totalFats
      };
      
      setConsumedMacros(newConsumedMacros);
      
      // Update remaining macros and progress
      if (initialPlan) {
        const newRemainingMacros = {
          calories: Math.max(0, initialPlan.calorieIntake - totalCalories),
          protein: Math.max(0, initialPlan.proteinIntake - totalProtein),
          carbs: Math.max(0, initialPlan.carbIntake - totalCarbs),
          fats: Math.max(0, initialPlan.fatIntake - totalFats)
        };
        
        setRemainingMacros(newRemainingMacros);
        
        const newProgress = {
          calories: Math.round((totalCalories / initialPlan.calorieIntake) * 100),
          protein: Math.round((totalProtein / initialPlan.proteinIntake) * 100),
          carbs: Math.round((totalCarbs / initialPlan.carbIntake) * 100),
          fats: Math.round((totalFats / initialPlan.fatIntake) * 100)
        };

        // Cap at 100%
        Object.keys(newProgress).forEach(key => {
          if (newProgress[key] > 100) newProgress[key] = 100;
        });

        setDailyProgress(newProgress);
      }
      
    } catch (error) {
      console.error('Error loading today\'s macro logs:', error);
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

        // Load consumed macros if exists
        if (userData.consumedMacros) {
          setConsumedMacros(userData.consumedMacros);
        }

        // Load remaining macros if exists
        if (userData.remainingMacros) {
          setRemainingMacros(userData.remainingMacros);
        } else if (initialPlan) {
          // Initialize remaining macros if not exists
          setRemainingMacros({
            calories: initialPlan.calorieIntake,
            protein: initialPlan.proteinIntake,
            carbs: initialPlan.carbIntake,
            fats: initialPlan.fatIntake
          });
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

  // NEW FUNCTION: Handle input change for macro inputs
  const handleMacroInputChange = (nutrient, value) => {
    // Allow numbers and empty string
    if (value === '' || /^\d*$/.test(value)) {
      setMacroInputs(prev => ({
        ...prev,
        [nutrient]: value
      }));
    }
  };

  // UPDATED FUNCTION: Add consumed macros to Firestore
  const addConsumedMacros = async () => {
    if (!initialPlan || !userId) return;

    // Use the macroInputs values instead of consumedMacros
    const calories = parseInt(macroInputs.calories) || 0;
    const protein = parseInt(macroInputs.protein) || 0;
    const carbs = parseInt(macroInputs.carbs) || 0;
    const fats = parseInt(macroInputs.fats) || 0;

    // Validate inputs
    if (calories < 0 || protein < 0 || carbs < 0 || fats < 0) {
      alert('Please enter valid positive numbers for all macros.');
      return;
    }

    if (calories === 0 && protein === 0 && carbs === 0 && fats === 0) {
      alert('Please enter at least one macro value.');
      return;
    }

    try {
      setLoading(true);

      // Create a new macro log entry
      const macroLog = {
        calories: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
        date: getTodayDateString(),
        timestamp: Timestamp.now(),
        mealType: 'custom',
        description: 'Custom macro entry'
      };

      // Add to macro logs subcollection
      const logsRef = collection(db, 'users', userId, 'macroLogs');
      await addDoc(logsRef, macroLog);

      // Reload today's logs to update totals
      await loadTodayMacrosLogs();

      // Clear the input fields
      setMacroInputs({
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
      });

      // Log nutrition activity
      await logNutritionActivity('macros_added', {
        calories: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
        timestamp: Timestamp.now()
      });

      alert('Macros added successfully!');
      
    } catch (error) {
      console.error('Error adding consumed macros:', error);
      alert('Error adding macros. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset daily macros
  const resetDailyMacros = async () => {
    if (!initialPlan || !userId) return;

    if (!confirm('Are you sure you want to reset today\'s macros? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);

      // Delete all of today's macro logs
      const today = getTodayDateString();
      const logsRef = collection(db, 'users', userId, 'macroLogs');
      const q = query(logsRef, where('date', '==', today));
      
      const querySnapshot = await getDocs(q);
      const deletePromises = [];
      
      querySnapshot.forEach((doc) => {
        deletePromises.push(updateDoc(doc.ref, { isDeleted: true }));
        // Alternatively, you can physically delete: deleteDoc(doc.ref);
      });

      await Promise.all(deletePromises);

      // Reset local state
      const newConsumedMacros = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      };

      const newRemainingMacros = {
        calories: initialPlan.calorieIntake,
        protein: initialPlan.proteinIntake,
        carbs: initialPlan.carbIntake,
        fats: initialPlan.fatIntake
      };

      const newProgress = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      };

      setConsumedMacros(newConsumedMacros);
      setRemainingMacros(newRemainingMacros);
      setDailyProgress(newProgress);
      setTodayLogs([]);

      // Save to user preferences
      await saveUserPreferences({
        consumedMacros: newConsumedMacros,
        remainingMacros: newRemainingMacros,
        dailyProgress: newProgress
      });

      // Log reset activity
      await logNutritionActivity('macros_reset', {
        timestamp: Timestamp.now()
      });

      alert('Daily macros reset successfully!');
      
    } catch (error) {
      console.error('Error resetting macros:', error);
      alert('Error resetting macros. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // REMOVED: Old handleConsumedMacroChange function since we're using macroInputs now

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
        consumedMacros: consumedMacros,
        remainingMacros: remainingMacros
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
    if (userNutritionData) {
      if (userNutritionData.dailyProgress) {
        setDailyProgress(userNutritionData.dailyProgress);
      }
      if (userNutritionData.consumedMacros) {
        setConsumedMacros(userNutritionData.consumedMacros);
      }
      if (userNutritionData.remainingMacros) {
        setRemainingMacros(userNutritionData.remainingMacros);
      }
    } else if (initialPlan) {
      // Reset to initial state
      setDailyProgress({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      });
      setConsumedMacros({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      });
      setRemainingMacros({
        calories: initialPlan.calorieIntake,
        protein: initialPlan.proteinIntake,
        carbs: initialPlan.carbIntake,
        fats: initialPlan.fatIntake
      });
    }
    
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
    const progressPercentage = dailyProgress[nutrient] / 100;
    
    // Scale the change based on progress percentage and base value
    return Math.round(baseValue * progressPercentage);
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

  // Delete a specific macro log entry
  const deleteMacroLog = async (logId) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      
      // Mark as deleted (soft delete)
      const logRef = doc(db, 'users', userId, 'macroLogs', logId);
      await updateDoc(logRef, {
        isDeleted: true,
        deletedAt: Timestamp.now()
      });
      
      // Reload today's logs to update totals
      await loadTodayMacrosLogs();
      
      alert('Macro entry deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting macro log:', error);
      alert('Error deleting macro entry. Please try again.');
    } finally {
      setLoading(false);
    }
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

  // Enhanced realistic nutrition calculations with Philippine time schedule (12-hour format)
  const calculateMealDistribution = () => {
    const distributions = {
      3: { 
        ratios: [0.35, 0.40, 0.25],
        timing: ['6:30 AM', '12:30 PM', '7:00 PM'],
        types: ['breakfast', 'lunch', 'dinner']
      },
      4: { 
        ratios: [0.30, 0.35, 0.10, 0.25],
        timing: ['6:30 AM', '12:00 PM', '4:00 PM', '7:30 PM'],
        types: ['breakfast', 'lunch', 'snack', 'dinner']
      },
      5: { 
        ratios: [0.25, 0.10, 0.30, 0.15, 0.20],
        timing: ['6:30 AM', '10:00 AM', '12:30 PM', '4:30 PM', '8:00 PM'],
        types: ['breakfast', 'snack', 'lunch', 'pre-workout', 'dinner']
      },
      6: { 
        ratios: [0.20, 0.10, 0.25, 0.10, 0.25, 0.10],
        timing: ['6:00 AM', '9:30 AM', '12:00 PM', '3:30 PM', '6:30 PM', '9:00 PM'],
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
          .mobile-justify-start {
            justify-content: flex-start;
          }
          .mobile-mt-2 {
            margin-top: 0.5rem;
          }
          .mobile-time-small {
            font-size: 0.65rem;
            padding: 0.4rem;
            min-width: 50px;
          }
          .mobile-meal-compact {
            padding: 0.75rem;
          }
          .mobile-meal-name {
            font-size: 0.875rem;
          }
          .mobile-meal-details {
            font-size: 0.75rem;
          }
          .mobile-nutrient-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
          .mobile-input-small {
            font-size: 0.75rem;
            padding: 0.5rem;
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
          .mobile-time-xs {
            font-size: 0.6rem;
            min-width: 45px;
            padding: 0.3rem;
          }
        }
        
        @media (max-width: 360px) {
          .mobile-xxs-text-sm {
            font-size: 0.75rem;
          }
          .mobile-xxs-p-1 {
            padding: 0.25rem;
          }
          .mobile-time-xxs {
            font-size: 0.55rem;
            min-width: 40px;
            padding: 0.25rem;
          }
        }

        /* Custom time display for better mobile fit */
        .time-display {
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          line-height: 1.2;
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
                  <span className="text-lg md:text-xl font-bold text-white mobile-text-sm">{item.value}</span>
                  <span className="text-xs text-gray-400 mobile-text-xs">{item.unit}</span>
                </div>
                <div className={`text-xs mt-2 mobile-text-xs ${
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

      {/* Navigation Tabs */}
      <div className="mb-6 md:mb-8">
        <div className="mobile-tab-scroll">
          <div className="flex space-x-1 md:space-x-2 mobile-justify-start mobile-tab-scroll">
            {[
              { id: 'meals', label: 'Meal Time', icon: '🍽️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all duration-300 mobile-tab-item mobile-text-sm ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                }`}
              >
                <span className="mr-2 text-sm">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500">
        {/* Meal Time Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-4 md:space-y-6">
            {/* Meal Frequency Selector */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-4 md:p-6 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="font-semibold mb-4 text-white text-lg md:text-xl mobile-xs-text-base flex items-center">
                <i className="fas fa-clock text-green-500 mr-2"></i>
                Meal Frequency
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => handleMealsPerDayChange(num)}
                    className={`py-3 md:py-4 rounded-xl transition-all duration-300 ${
                      mealsPerDay === num 
                        ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg transform scale-105' 
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                  >
                    <div className="text-lg md:text-xl font-bold">{num}</div>
                    <div className="text-xs md:text-sm mobile-text-xs">meals/day</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Schedule */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-4 md:p-6 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="font-semibold mb-4 text-white text-lg md:text-xl mobile-xs-text-base flex items-center">
                <i className="fas fa-calendar-alt text-green-500 mr-2"></i>
                Today's Meal Schedule
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                {mealSuggestions.map((meal, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-4 md:p-5 rounded-2xl border border-gray-700/50 shadow-lg transition-all duration-300 hover:border-green-500/30 hover:bg-gray-800/70 mobile-meal-compact">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mobile-stack">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-semibold text-xs md:text-sm shadow-lg mr-3 md:mr-4 time-display mobile-time-small mobile-time-xs mobile-time-xxs">
                          {meal.time}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm md:text-base mobile-meal-name">
                            {meal.name}
                          </h4>
                          <p className="text-green-400 text-xs md:text-sm mobile-meal-details">
                            {meal.metabolicTip}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center mobile-nutrient-grid">
                        <div>
                          <div className="text-xs md:text-sm text-gray-400 mobile-text-xs">Cal</div>
                          <div className="font-bold text-white text-sm md:text-base mobile-text-sm">{meal.calories}</div>
                        </div>
                        <div>
                          <div className="text-xs md:text-sm text-gray-400 mobile-text-xs">Prot</div>
                          <div className="font-bold text-white text-sm md:text-base mobile-text-sm">{meal.protein}g</div>
                        </div>
                        <div>
                          <div className="text-xs md:text-sm text-gray-400 mobile-text-xs">Carbs</div>
                          <div className="font-bold text-white text-sm md:text-base mobile-text-sm">{meal.carbs}g</div>
                        </div>
                        <div>
                          <div className="text-xs md:text-sm text-gray-400 mobile-text-xs">Fats</div>
                          <div className="font-bold text-white text-sm md:text-base mobile-text-sm">{meal.fats}g</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPlan;