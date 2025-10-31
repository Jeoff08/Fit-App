// ProgressTracker.jsx
import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { db } from '../Config/firebaseconfig';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ProgressTracker = ({ userData, onProgressUpdate }) => {
  const [progress, setProgress] = useState({
    workoutHistory: [],
    fitnessLevel: 'beginner',
    goals: [],
    achievements: [],
    lastCompletedWorkout: null,
    initialWeight: null,
    currentWeight: null,
    goalWeight: null,
    weightHistory: [],
    weightGoalSetDate: null,
    lastWorkoutAdjustment: null,
    dailyStats: {
      date: new Date().toLocaleDateString(),
      workouts: 0,
      sets: 0,
      exercises: 0,
      duration: 0
    },
    weeklyProgress: []
  });

  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    totalSets: 0,
    totalExercises: 0,
    totalDuration: 0,
    averageDuration: 0,
    completionRate: 0
  });

  const [chartData, setChartData] = useState({
    weeklyProgress: [],
    monthlyProgress: [],
    exerciseDistribution: []
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [selectedWeekData, setSelectedWeekData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState({
    currentWeight: '',
    goalWeight: ''
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonAnimations, setButtonAnimations] = useState({
    setGoal: false,
    generatePlan: false,
    clearWorkouts: false,
    importData: false,
    exportData: false
  });

  const [showImportExport, setShowImportExport] = useState(false);
  const [importData, setImportData] = useState('');

  // Enhanced responsive design with media queries
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Check and reset daily stats if it's a new day - IMPROVED VERSION
  const checkAndResetDailyStats = async (userProgress) => {
    const today = new Date().toLocaleDateString();
    const currentDailyStats = userProgress.dailyStats || {
      date: today,
      workouts: 0,
      sets: 0,
      exercises: 0,
      duration: 0
    };

    // If it's a new day, reset daily stats and archive to weekly progress
    if (currentDailyStats.date !== today) {
      const yesterdayStats = { ...currentDailyStats };
      
      // Archive yesterday's stats to weekly progress if there were workouts
      if (yesterdayStats.workouts > 0 || yesterdayStats.sets > 0 || yesterdayStats.exercises > 0) {
        const weeklyProgress = userProgress.weeklyProgress || [];
        
        // Check if we already have an entry for yesterday
        const existingEntryIndex = weeklyProgress.findIndex(entry => entry.date === yesterdayStats.date);
        
        let updatedWeeklyProgress;
        if (existingEntryIndex !== -1) {
          // Update existing entry
          updatedWeeklyProgress = [...weeklyProgress];
          updatedWeeklyProgress[existingEntryIndex] = {
            ...updatedWeeklyProgress[existingEntryIndex],
            workouts: updatedWeeklyProgress[existingEntryIndex].workouts + yesterdayStats.workouts,
            sets: updatedWeeklyProgress[existingEntryIndex].sets + yesterdayStats.sets,
            exercises: updatedWeeklyProgress[existingEntryIndex].exercises + yesterdayStats.exercises,
            duration: updatedWeeklyProgress[existingEntryIndex].duration + yesterdayStats.duration
          };
        } else {
          // Add new entry
          updatedWeeklyProgress = [...weeklyProgress, {
            ...yesterdayStats,
            archivedAt: new Date().toISOString()
          }];
        }
        
        // Update Firestore with reset daily stats and updated weekly progress
        if (userId) {
          const userDocRef = doc(db, 'users', userId);
          await updateDoc(userDocRef, {
            dailyStats: {
              date: today,
              workouts: 0,
              sets: 0,
              exercises: 0,
              duration: 0
            },
            weeklyProgress: updatedWeeklyProgress
          });
        }

        return {
          dailyStats: {
            date: today,
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: updatedWeeklyProgress
        };
      } else {
        // Just reset daily stats if no workouts yesterday
        if (userId) {
          const userDocRef = doc(db, 'users', userId);
          await updateDoc(userDocRef, {
            dailyStats: {
              date: today,
              workouts: 0,
              sets: 0,
              exercises: 0,
              duration: 0
            }
          });
        }

        return {
          dailyStats: {
            date: today,
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: userProgress.weeklyProgress || []
        };
      }
    }

    return null;
  };

  // Update daily stats when a workout is completed - IMPROVED VERSION
  const updateDailyStats = async (workoutData) => {
    if (!userId) return;

    const today = new Date().toLocaleDateString();
    const currentDailyStats = progress.dailyStats || {
      date: today,
      workouts: 0,
      sets: 0,
      exercises: 0,
      duration: 0
    };

    // First, check if we need to reset for new day
    if (currentDailyStats.date !== today) {
      await checkAndResetDailyStats(progress);
      // After reset, start with fresh stats for the new day
      const freshStats = {
        date: today,
        workouts: 0,
        sets: 0,
        exercises: 0,
        duration: 0
      };
      
      // Now add the current workout to the fresh stats
      const updatedDailyStats = await addWorkoutToDailyStats(freshStats, workoutData);
      await saveDailyStatsToFirestore(updatedDailyStats);
      
      setProgress(prev => ({
        ...prev,
        dailyStats: updatedDailyStats
      }));
      
    } else {
      // Same day, just update the stats
      const updatedDailyStats = await addWorkoutToDailyStats(currentDailyStats, workoutData);
      await saveDailyStatsToFirestore(updatedDailyStats);
      
      setProgress(prev => ({
        ...prev,
        dailyStats: updatedDailyStats
      }));
    }
  };

  // Helper function to add workout data to daily stats
  const addWorkoutToDailyStats = async (dailyStats, workoutData) => {
    // Calculate workout duration in seconds
    let durationSeconds = 0;
    if (workoutData.duration) {
      const [minutes, seconds] = workoutData.duration.split(':').map(Number);
      durationSeconds = minutes * 60 + seconds;
    }

    return {
      date: dailyStats.date,
      workouts: dailyStats.workouts + 1,
      sets: dailyStats.sets + (workoutData.totalSets || 0),
      exercises: dailyStats.exercises + (workoutData.exercises?.length || 0),
      duration: dailyStats.duration + durationSeconds,
      lastWorkout: workoutData.dayName,
      lastUpdated: new Date().toISOString()
    };
  };

  // Helper function to save daily stats to Firestore
  const saveDailyStatsToFirestore = async (dailyStats) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        dailyStats: dailyStats
      });
    } catch (error) {
      console.error('Error updating daily stats:', error);
    }
  };

  // Initialize auth and load progress from Firestore
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        await initializeUserProgress(user.uid);
      } else {
        setUserId(null);
        const emptyProgress = {
          workoutHistory: [],
          fitnessLevel: 'beginner',
          goals: [],
          achievements: [],
          lastCompletedWorkout: null,
          initialWeight: null,
          currentWeight: null,
          goalWeight: null,
          weightHistory: [],
          weightGoalSetDate: null,
          lastWorkoutAdjustment: null,
          dailyStats: {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: []
        };
        setProgress(emptyProgress);
        calculateWorkoutStats([]);
        generateChartData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for real-time updates to progress
  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, async (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        
        // Check and reset daily stats if needed
        const resetData = await checkAndResetDailyStats(userData);
        
        const userProgress = {
          workoutHistory: userData.workoutHistory || [],
          fitnessLevel: userData.fitnessLevel || 'beginner',
          goals: userData.goals || [],
          achievements: userData.achievements || [],
          lastCompletedWorkout: userData.lastCompletedWorkout || null,
          initialWeight: userData.initialWeight || null,
          currentWeight: userData.currentWeight || null,
          goalWeight: userData.goalWeight || null,
          weightHistory: userData.weightHistory || [],
          weightGoalSetDate: userData.weightGoalSetDate || null,
          lastWorkoutAdjustment: userData.lastWorkoutAdjustment || null,
          dailyStats: resetData?.dailyStats || userData.dailyStats || {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: resetData?.weeklyProgress || userData.weeklyProgress || []
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory, userProgress.weeklyProgress);
        
        checkAndAdjustWorkouts(userProgress);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Auto-reset daily stats at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimer = setTimeout(() => {
      // Reset daily stats at midnight
      if (userId) {
        checkAndResetDailyStats(progress);
      }
      
      // Set up recurring midnight check
      setInterval(() => {
        if (userId) {
          checkAndResetDailyStats(progress);
        }
      }, 24 * 60 * 60 * 1000); // 24 hours
    }, timeUntilMidnight);
    
    return () => clearTimeout(midnightTimer);
  }, [userId, progress]);

  const checkAndAdjustWorkouts = async (userProgress) => {
    if (!userProgress.goalWeight || !userProgress.weightGoalSetDate || !userId) return;

    const goalSetDate = new Date(userProgress.weightGoalSetDate);
    const currentDate = new Date();
    const weeksSinceGoalSet = Math.floor((currentDate - goalSetDate) / (7 * 24 * 60 * 60 * 1000));
    
    if (weeksSinceGoalSet >= 2 && weeksSinceGoalSet <= 3) {
      const lastAdjustment = userProgress.lastWorkoutAdjustment ? new Date(userProgress.lastWorkoutAdjustment) : null;
      const daysSinceLastAdjustment = lastAdjustment ? Math.floor((currentDate - lastAdjustment) / (24 * 60 * 60 * 1000)) : 999;
      
      if (daysSinceLastAdjustment > 7) {
        const currentWeight = userProgress.currentWeight;
        const goalWeight = userProgress.goalWeight;
        const initialWeight = userProgress.initialWeight;
        
        const totalWeightToLose = initialWeight - goalWeight;
        const weightLostSoFar = initialWeight - currentWeight;
        const expectedWeightLoss = totalWeightToLose * (weeksSinceGoalSet / 8);
        
        if (weightLostSoFar < expectedWeightLoss * 0.5) {
          await adjustWorkoutIntensity(userProgress);
        }
      }
    }
  };

  const adjustWorkoutIntensity = async (userProgress) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const currentFitnessLevel = userProgress.fitnessLevel;
      let newFitnessLevel = currentFitnessLevel;
      let adjustmentMessage = '';
      
      if (currentFitnessLevel === 'beginner') {
        newFitnessLevel = 'intermediate';
        adjustmentMessage = 'Workout intensity increased to intermediate level to help reach your weight goal faster.';
      } else if (currentFitnessLevel === 'intermediate') {
        newFitnessLevel = 'advanced';
        adjustmentMessage = 'Workout intensity increased to advanced level to boost your weight loss progress.';
      } else if (currentFitnessLevel === 'advanced') {
        adjustmentMessage = 'Workout frequency and duration optimized for maximum weight loss results.';
      }
      
      await updateDoc(userDocRef, {
        fitnessLevel: newFitnessLevel,
        lastWorkoutAdjustment: new Date().toISOString()
      });
      
      if (adjustmentMessage) {
        alert(`🏋️ Workout Plan Adjusted!\n\n${adjustmentMessage}\n\nYour workouts have been automatically optimized to help you reach your weight goal.`);
      }
      
    } catch (error) {
      console.error('Error adjusting workout intensity:', error);
    }
  };

  const initializeUserProgress = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check and reset daily stats if needed
        const resetData = await checkAndResetDailyStats(userData);
        
        const userProgress = {
          workoutHistory: userData.workoutHistory || [],
          fitnessLevel: userData.fitnessLevel || 'beginner',
          goals: userData.goals || [],
          achievements: userData.achievements || [],
          lastCompletedWorkout: userData.lastCompletedWorkout || null,
          initialWeight: userData.initialWeight || null,
          currentWeight: userData.currentWeight || null,
          goalWeight: userData.goalWeight || null,
          weightHistory: userData.weightHistory || [],
          weightGoalSetDate: userData.weightGoalSetDate || null,
          lastWorkoutAdjustment: userData.lastWorkoutAdjustment || null,
          dailyStats: resetData?.dailyStats || userData.dailyStats || {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: resetData?.weeklyProgress || userData.weeklyProgress || []
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory, userProgress.weeklyProgress);
      } else {
        const emptyProgress = {
          workoutHistory: [],
          fitnessLevel: 'beginner',
          goals: [],
          achievements: [],
          lastCompletedWorkout: null,
          initialWeight: null,
          currentWeight: null,
          goalWeight: null,
          weightHistory: [],
          weightGoalSetDate: null,
          lastWorkoutAdjustment: null,
          dailyStats: {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: []
        };
        
        await updateDoc(userDocRef, emptyProgress);
        setProgress(emptyProgress);
        calculateWorkoutStats([]);
        generateChartData([]);
      }
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };

  // New function to clear only workout history
  const clearWorkoutHistory = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all your workout history? This will remove all your completed workouts but keep your weight data and settings. This action cannot be undone.');
    
    if (confirmed && userId) {
      try {
        setButtonAnimations(prev => ({ ...prev, clearWorkouts: true }));
        
        const userDocRef = doc(db, 'users', userId);
        
        await updateDoc(userDocRef, {
          workoutHistory: [],
          lastCompletedWorkout: null,
          dailyStats: {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          }
        });
        
        // Update local state
        setProgress(prev => ({
          ...prev,
          workoutHistory: [],
          lastCompletedWorkout: null,
          dailyStats: {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          }
        }));
        
        calculateWorkoutStats([]);
        generateChartData([]);
        
        setTimeout(() => {
          setButtonAnimations(prev => ({ ...prev, clearWorkouts: false }));
        }, 600);
        
        alert('✅ Workout history cleared successfully! Your weight data and settings have been preserved.');
        
      } catch (error) {
        console.error('Error clearing workout history:', error);
        alert('Error clearing workout history. Please try again.');
        setButtonAnimations(prev => ({ ...prev, clearWorkouts: false }));
      }
    }
  };

  // Export progress data
  const exportProgressData = () => {
    setButtonAnimations(prev => ({ ...prev, exportData: true }));
    
    const exportData = {
      progress: progress,
      workoutStats: workoutStats,
      chartData: chartData,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitness-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setButtonAnimations(prev => ({ ...prev, exportData: false }));
    }, 600);
    
    alert('📤 Progress data exported successfully!');
  };

  // Import progress data
  const importProgressData = () => {
    if (!importData.trim()) {
      alert('Please paste your progress data to import.');
      return;
    }
    
    try {
      setButtonAnimations(prev => ({ ...prev, importData: true }));
      
      const importedData = JSON.parse(importData);
      
      // Validate the imported data structure
      if (!importedData.progress || !importedData.workoutStats) {
        throw new Error('Invalid data format');
      }
      
      const confirmed = window.confirm(
        'This will replace your current progress data. Are you sure you want to continue?'
      );
      
      if (confirmed && userId) {
        // Update Firestore with imported data
        const userDocRef = doc(db, 'users', userId);
        updateDoc(userDocRef, {
          workoutHistory: importedData.progress.workoutHistory || [],
          fitnessLevel: importedData.progress.fitnessLevel || 'beginner',
          goals: importedData.progress.goals || [],
          achievements: importedData.progress.achievements || [],
          lastCompletedWorkout: importedData.progress.lastCompletedWorkout || null,
          initialWeight: importedData.progress.initialWeight || null,
          currentWeight: importedData.progress.currentWeight || null,
          goalWeight: importedData.progress.goalWeight || null,
          weightHistory: importedData.progress.weightHistory || [],
          weightGoalSetDate: importedData.progress.weightGoalSetDate || null,
          lastWorkoutAdjustment: importedData.progress.lastWorkoutAdjustment || null,
          dailyStats: importedData.progress.dailyStats || {
            date: new Date().toLocaleDateString(),
            workouts: 0,
            sets: 0,
            exercises: 0,
            duration: 0
          },
          weeklyProgress: importedData.progress.weeklyProgress || []
        });
        
        setImportData('');
        setShowImportExport(false);
        
        alert('📥 Progress data imported successfully!');
      }
      
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data. Please check the format and try again.');
    } finally {
      setTimeout(() => {
        setButtonAnimations(prev => ({ ...prev, importData: false }));
      }, 600);
    }
  };

  const handleWeightSubmit = async () => {
    const currentWeight = parseFloat(weightInput.currentWeight);
    const goalWeight = parseFloat(weightInput.goalWeight);
    
    if (!currentWeight || !goalWeight || currentWeight <= 0 || goalWeight <= 0) {
      alert('Please enter valid weight values.');
      return;
    }
    
    if (currentWeight < goalWeight) {
      alert('Goal weight should be less than current weight for weight loss goals.');
      return;
    }
    
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        const today = new Date().toISOString();
        
        const weightUpdate = {
          initialWeight: currentWeight,
          currentWeight: currentWeight,
          goalWeight: goalWeight,
          weightGoalSetDate: today,
          weightHistory: [{
            date: today,
            weight: currentWeight,
            note: 'Initial weight'
          }]
        };
        
        await updateDoc(userDocRef, weightUpdate);
        
        setProgress(prev => ({
          ...prev,
          ...weightUpdate
        }));
        
        setShowWeightModal(false);
        setWeightInput({ currentWeight: '', goalWeight: '' });
        
        alert('🎯 Weight goal set successfully! Your workouts will be automatically adjusted if needed to help you reach your goal.');
        
      } catch (error) {
        console.error('Error saving weight data:', error);
        alert('Error saving weight data. Please try again.');
      }
    }
  };

  const handleCurrentWeightUpdate = async () => {
    const newWeight = parseFloat(prompt('Enter your current weight (kg):'));
    
    if (!newWeight || newWeight <= 0) {
      alert('Please enter a valid weight.');
      return;
    }
    
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        const today = new Date().toISOString();
        
        const weightUpdate = {
          currentWeight: newWeight,
          weightHistory: arrayUnion({
            date: today,
            weight: newWeight,
            note: 'Progress update'
          })
        };
        
        await updateDoc(userDocRef, weightUpdate);
        
        setProgress(prev => ({
          ...prev,
          currentWeight: newWeight,
          weightHistory: [...prev.weightHistory, {
            date: today,
            weight: newWeight,
            note: 'Progress update'
          }]
        }));
        
        alert('Weight updated successfully!');
        
        if (newWeight <= progress.goalWeight) {
          alert('🎉 Congratulations! You have reached your weight goal!');
        }
        
      } catch (error) {
        console.error('Error updating weight:', error);
        alert('Error updating weight. Please try again.');
      }
    }
  };

  const calculateWeightProgress = () => {
    if (!progress.initialWeight || !progress.currentWeight || !progress.goalWeight) {
      return { percentage: 0, weightLost: 0, weightToGo: 0 };
    }
    
    const totalWeightToLose = progress.initialWeight - progress.goalWeight;
    const weightLost = progress.initialWeight - progress.currentWeight;
    const percentage = Math.min(Math.max((weightLost / totalWeightToLose) * 100, 0), 100);
    const weightToGo = Math.max(progress.currentWeight - progress.goalWeight, 0);
    
    return { percentage, weightLost: Math.max(weightLost, 0), weightToGo };
  };

  const handleUserFormSubmit = async (userData) => {
    console.log('User data submitted:', userData);
    
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        
        await updateDoc(userDocRef, {
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          gender: userData.gender,
          fitnessGoal: userData.fitnessGoal,
          activityLevel: userData.activityLevel,
          workoutPreference: userData.workoutPreference,
          fitnessLevel: userData.fitnessLevel,
          hasMedicalConditions: userData.hasMedicalConditions,
          medicalConditions: userData.medicalConditions,
          preferredWorkoutDays: userData.preferredWorkoutDays,
          selectedDays: userData.selectedDays,
          ...(userData.generatedWorkoutPlan && { generatedWorkoutPlan: userData.generatedWorkoutPlan }),
          ...(userData.generatedNutritionPlan && { generatedNutritionPlan: userData.generatedNutritionPlan })
        });

        console.log('User data saved to Firestore');
        
        window.location.href = '/workout-plan';
        setShowUserForm(false);
      } catch (error) {
        console.error('Error saving user data to Firestore:', error);
      }
    }
  };

  const calculateWorkoutStats = (workoutHistory) => {
    const totalWorkouts = workoutHistory.length;
    const totalSets = workoutHistory.reduce((sum, workout) => sum + (workout.totalSets || 0), 0);
    const totalExercises = workoutHistory.reduce((sum, workout) => sum + (workout.exercises?.length || 0), 0);
    const totalDuration = workoutHistory.reduce((sum, workout) => {
      if (workout.duration) {
        const [minutes, seconds] = workout.duration.split(':').map(Number);
        return sum + minutes * 60 + seconds;
      }
      return sum;
    }, 0);
    
    const averageDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
    const completionRate = totalWorkouts > 0 ? Math.round((totalWorkouts / (totalWorkouts + 5)) * 100) : 0;

    setWorkoutStats({
      totalWorkouts,
      totalSets,
      totalExercises,
      totalDuration,
      averageDuration,
      completionRate
    });
  };

  const generateChartData = (workoutHistory, weeklyProgress = []) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();

    // Combine workout history with daily stats for weekly progress
    const weeklyProgressData = last7Days.map(date => {
      const workoutsOnDate = workoutHistory.filter(workout => workout.completionDate === date);
      const dailyStats = weeklyProgress.find(day => day.date === date);
      
      const totalSets = workoutsOnDate.reduce((sum, workout) => sum + (workout.totalSets || 0), 0) + (dailyStats?.sets || 0);
      const totalExercises = workoutsOnDate.reduce((sum, workout) => sum + (workout.exercises?.length || 0), 0) + (dailyStats?.exercises || 0);
      const totalDuration = workoutsOnDate.reduce((sum, workout) => {
        if (workout.duration) {
          const [minutes, seconds] = workout.duration.split(':').map(Number);
          return sum + minutes * 60 + seconds;
        }
        return sum;
      }, 0) + (dailyStats?.duration || 0);
      
      const totalWorkouts = workoutsOnDate.length + (dailyStats?.workouts || 0);
      
      return {
        date,
        workouts: totalWorkouts,
        sets: totalSets,
        exercises: totalExercises,
        duration: totalDuration,
        workoutDetails: workoutsOnDate,
        dailyStats: dailyStats,
        hasWorkouts: totalWorkouts > 0
      };
    });

    // Filter out days with no workouts for display
    const weeklyProgressWithWorkouts = weeklyProgressData.filter(day => day.hasWorkouts);

    const monthlyProgress = Array.from({ length: 4 }, (_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (3 - i) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const weekWorkouts = workoutHistory.filter(workout => {
        const workoutDate = new Date(workout.completionDate);
        return workoutDate >= weekStart && workoutDate <= weekEnd;
      });
      
      return {
        week: `Week ${i + 1}`,
        workouts: weekWorkouts.length,
        sets: weekWorkouts.reduce((sum, workout) => sum + (workout.totalSets || 0), 0),
        hasWorkouts: weekWorkouts.length > 0
      };
    });

    // Filter out weeks with no workouts
    const monthlyProgressWithWorkouts = monthlyProgress.filter(week => week.hasWorkouts);

    const exerciseCount = {};
    workoutHistory.forEach(workout => {
      workout.exercises?.forEach(exercise => {
        exerciseCount[exercise.name] = (exerciseCount[exercise.name] || 0) + 1;
      });
    });

    const exerciseDistribution = Object.entries(exerciseCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    setChartData({
      weeklyProgress: weeklyProgressWithWorkouts,
      monthlyProgress: monthlyProgressWithWorkouts,
      exerciseDistribution
    });
  };

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getAchievements = () => {
    const achievements = [];
    const { totalWorkouts, totalSets, totalExercises } = workoutStats;
    const weightProgress = calculateWeightProgress();

    if (totalWorkouts >= 1) achievements.push({ name: 'First Workout!', icon: '🎯', description: 'Completed your first workout' });
    if (totalWorkouts >= 5) achievements.push({ name: 'Consistent Starter', icon: '🔥', description: 'Completed 5 workouts' });
    if (totalWorkouts >= 10) achievements.push({ name: 'Dedicated Trainee', icon: '💪', description: 'Completed 10 workouts' });
    if (totalWorkouts >= 25) achievements.push({ name: 'Fitness Enthusiast', icon: '🏆', description: 'Completed 25 workouts' });
    if (totalSets >= 50) achievements.push({ name: 'Strength Builder', icon: '⚡', description: 'Completed 50 total sets' });
    if (totalSets >= 100) achievements.push({ name: 'Power House', icon: '🚀', description: 'Completed 100 total sets' });
    if (totalExercises >= 20) achievements.push({ name: 'Versatile Athlete', icon: '🌈', description: 'Performed 20 different exercises' });
    if (weightProgress.percentage >= 25) achievements.push({ name: 'Weight Loss Starter', icon: '⚖️', description: '25% to weight goal' });
    if (weightProgress.percentage >= 50) achievements.push({ name: 'Halfway There!', icon: '🎯', description: '50% to weight goal' });
    if (weightProgress.percentage >= 75) achievements.push({ name: 'Almost There!', icon: '🔥', description: '75% to weight goal' });
    if (weightProgress.percentage >= 100) achievements.push({ name: 'Goal Achieved!', icon: '🏆', description: 'Reached weight goal' });

    return achievements;
  };

  const calculateStreak = () => {
    const workoutHistory = progress.workoutHistory || [];
    if (workoutHistory.length === 0) return 0;

    const sortedWorkouts = [...workoutHistory].sort((a, b) => 
      new Date(b.completionDate) - new Date(a.completionDate)
    );

    let streak = 0;
    let currentDate = new Date();
    
    const today = new Date().toLocaleDateString();
    if (sortedWorkouts[0].completionDate === today) {
      streak = 1;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    for (let i = 0; i < sortedWorkouts.length; i++) {
      const workoutDate = new Date(sortedWorkouts[i].completionDate);
      const expectedDate = new Date(currentDate);
      
      if (workoutDate.toLocaleDateString() === expectedDate.toLocaleDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const handleWeeklyProgressClick = (dayData) => {
    setSelectedWeekData(dayData);
    setShowWeeklyModal(true);
  };

  const handleSetGoalWeightClick = () => {
    setButtonAnimations(prev => ({ ...prev, setGoal: true }));
    
    setTimeout(() => {
      setButtonAnimations(prev => ({ ...prev, setGoal: false }));
    }, 600);
    
    setShowWeightModal(true);
  };

  const handleGenerateNewPlanClick = () => {
    setButtonAnimations(prev => ({ ...prev, generatePlan: true }));
    
    setTimeout(() => {
      setButtonAnimations(prev => ({ ...prev, generatePlan: false }));
    }, 600);
    
    setShowUserForm(true);
  };

  const handleImportExportClick = () => {
    setShowImportExport(true);
  };

  const WeeklyProgressModal = () => {
    if (!showWeeklyModal || !selectedWeekData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                Daily Progress Details
              </h2>
              <button
                onClick={() => setShowWeeklyModal(false)}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
              >
                ×
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 mb-4 border border-green-500 gym-border">
              <h3 className="text-lg font-bold text-white mb-3 text-center gym-text">
                {selectedWeekData.date}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-base md:text-lg">{selectedWeekData.workouts}</div>
                  <div className="text-green-400 text-xs">Workouts</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-base md:text-lg">{selectedWeekData.sets}</div>
                  <div className="text-green-400 text-xs">Total Sets</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-base md:text-lg">{selectedWeekData.exercises}</div>
                  <div className="text-green-400 text-xs">Exercises</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-base md:text-lg">{formatDuration(selectedWeekData.duration)}</div>
                  <div className="text-green-400 text-xs">Total Time</div>
                </div>
              </div>

              {selectedWeekData.workoutDetails && selectedWeekData.workoutDetails.length > 0 ? (
                <div>
                  <h4 className="text-base font-bold text-white mb-2 gym-text">Workout Details:</h4>
                  <div className="space-y-2">
                    {selectedWeekData.workoutDetails.map((workout, index) => (
                      <div key={index} className="bg-black rounded-lg p-3 border border-green-500 gym-workout-card">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-white font-medium text-sm gym-text">{workout.dayName}</h5>
                          <div className="text-orange-400 text-xs">
                            {workout.completionTime} • {workout.duration}
                          </div>
                        </div>
                        <div className="text-green-300 text-xs">
                          {workout.exercises?.length || 0} exercises • {workout.totalSets} sets
                        </div>
                        <div className="mt-1 space-y-1">
                          {workout.exercises?.slice(0, 3).map((exercise, exIndex) => (
                            <div key={exIndex} className="flex justify-between text-orange-400 text-xs">
                              <span>{exercise.name}</span>
                              <span>{exercise.sets}×{exercise.reps}</span>
                            </div>
                          ))}
                          {workout.exercises?.length > 3 && (
                            <div className="text-green-500 text-xs text-center">
                              +{workout.exercises.length - 3} more exercises
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="text-3xl mb-1">📊</div>
                  <p className="text-green-400 text-sm">No workouts completed on this day</p>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowWeeklyModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-green-600 transition-all transform hover:scale-105 gym-button"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WeightModal = () => {
    if (!showWeightModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
              🎯 Set Your Weight Goal
            </h2>
            
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1 gym-text">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  value={weightInput.currentWeight}
                  onChange={(e) => setWeightInput(prev => ({ ...prev, currentWeight: e.target.value }))}
                  className="w-full px-3 py-2 bg-black border-2 border-orange-500 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors gym-input"
                  placeholder="Enter current weight"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-1 gym-text">
                  Goal Weight (kg)
                </label>
                <input
                  type="number"
                  value={weightInput.goalWeight}
                  onChange={(e) => setWeightInput(prev => ({ ...prev, goalWeight: e.target.value }))}
                  className="w-full px-3 py-2 bg-black border-2 border-orange-500 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors gym-input"
                  placeholder="Enter goal weight"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowWeightModal(false);
                  setWeightInput({ currentWeight: '', goalWeight: '' });
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors gym-button"
              >
                Cancel
              </button>
              <button
                onClick={handleWeightSubmit}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-green-600 transition-all transform hover:scale-105 gym-button"
              >
                Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ImportExportModal = () => {
    if (!showImportExport) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                📊 Import/Export Progress Data
              </h2>
              <button
                onClick={() => setShowImportExport(false)}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Export Section */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-green-500 gym-border">
                <h3 className="text-lg font-bold text-white mb-3 gym-text">Export Progress Data</h3>
                <p className="text-green-400 text-sm mb-3">
                  Download your complete progress data as a JSON file for backup or transfer.
                </p>
                <button
                  onClick={exportProgressData}
                  className={`w-full px-4 py-3 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-orange-600 transition-all transform hover:scale-105 gym-button ${
                    buttonAnimations.exportData ? 'animate-pulse' : ''
                  }`}
                >
                  📤 Export Progress Data
                </button>
              </div>

              {/* Import Section */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-4 border border-orange-500 gym-border">
                <h3 className="text-lg font-bold text-white mb-3 gym-text">Import Progress Data</h3>
                <p className="text-orange-400 text-sm mb-3">
                  Paste your exported JSON data to restore your progress.
                </p>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  className="w-full h-32 px-3 py-2 bg-black border-2 border-orange-500 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors gym-input"
                  placeholder="Paste your exported JSON data here..."
                />
                <button
                  onClick={importProgressData}
                  className={`w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-green-600 transition-all transform hover:scale-105 gym-button mt-3 ${
                    buttonAnimations.importData ? 'animate-pulse' : ''
                  }`}
                >
                  📥 Import Progress Data
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowImportExport(false)}
                className="px-6 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors gym-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const achievements = getAchievements();
  const currentStreak = calculateStreak();
  const weightProgress = calculateWeightProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-orange-900 text-white p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 gym-text">
          <span className="text-orange-500">PROGRESS</span>{' '}
          <span className="text-green-500">TRACKER</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base gym-text">
          Track your fitness journey and celebrate your achievements
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <button
          onClick={handleSetGoalWeightClick}
          className={`px-4 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-green-600 transition-all transform hover:scale-105 gym-button ${buttonAnimations.setGoal ? 'animate-pulse' : ''}`}
        >
          🎯 Set Weight Goal
        </button>
        
        <button
          onClick={handleGenerateNewPlanClick}
          className={`px-4 py-3 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-orange-600 transition-all transform hover:scale-105 gym-button ${buttonAnimations.generatePlan ? 'animate-pulse' : ''}`}
        >
          💪 Generate New Plan
        </button>
        
        <button
          onClick={handleImportExportClick}
          className={`px-4 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-orange-600 transition-all transform hover:scale-105 gym-button`}
        >
          📊 Import/Export
        </button>
      </div>

      {/* Additional Action Buttons */}
      <div className="flex justify-center mb-6 md:mb-8">
        <button
          onClick={clearWorkoutHistory}
          className={`px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all transform hover:scale-105 gym-button ${buttonAnimations.clearWorkouts ? 'animate-pulse' : ''}`}
        >
          🗑️ Clear Workout History
        </button>
      </div>

      {/* Daily Stats Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 mb-6 md:mb-8 border-2 border-green-500 gym-border">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
          📊 Today's Progress
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
            <div className="text-white font-bold text-lg md:text-xl">{progress.dailyStats.workouts}</div>
            <div className="text-green-400 text-xs md:text-sm">Workouts</div>
          </div>
          <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
            <div className="text-white font-bold text-lg md:text-xl">{progress.dailyStats.sets}</div>
            <div className="text-green-400 text-xs md:text-sm">Total Sets</div>
          </div>
          <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
            <div className="text-white font-bold text-lg md:text-xl">{progress.dailyStats.exercises}</div>
            <div className="text-green-400 text-xs md:text-sm">Exercises</div>
          </div>
          <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
            <div className="text-white font-bold text-lg md:text-xl">{formatDuration(progress.dailyStats.duration)}</div>
            <div className="text-green-400 text-xs md:text-sm">Total Time</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-orange-400 text-sm gym-text">
            Stats reset daily at midnight • Auto-saved to weekly progress
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Workout Statistics */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 border-2 border-orange-500 gym-border">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
              📈 Workout Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                <div className="text-white font-bold text-lg md:text-xl">{workoutStats.totalWorkouts}</div>
                <div className="text-orange-400 text-xs md:text-sm">Total Workouts</div>
              </div>
              <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                <div className="text-white font-bold text-lg md:text-xl">{workoutStats.totalSets}</div>
                <div className="text-orange-400 text-xs md:text-sm">Total Sets</div>
              </div>
              <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                <div className="text-white font-bold text-lg md:text-xl">{workoutStats.totalExercises}</div>
                <div className="text-orange-400 text-xs md:text-sm">Total Exercises</div>
              </div>
              <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                <div className="text-white font-bold text-lg md:text-xl">{formatDuration(workoutStats.totalDuration)}</div>
                <div className="text-orange-400 text-xs md:text-sm">Total Time</div>
              </div>
              <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                <div className="text-white font-bold text-lg md:text-xl">{formatDuration(workoutStats.averageDuration)}</div>
                <div className="text-orange-400 text-xs md:text-sm">Avg. Duration</div>
              </div>
              <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                <div className="text-white font-bold text-lg md:text-xl">{workoutStats.completionRate}%</div>
                <div className="text-orange-400 text-xs md:text-sm">Completion Rate</div>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 border-2 border-green-500 gym-border">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
              📅 Weekly Progress
            </h2>
            <div className="space-y-3">
              {chartData.weeklyProgress.length > 0 ? (
                chartData.weeklyProgress.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => handleWeeklyProgressClick(day)}
                    className="bg-black rounded-lg p-3 md:p-4 border border-orange-500 hover:border-green-500 transition-colors cursor-pointer gym-workout-card"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-white font-bold text-sm md:text-base gym-text">{day.date}</h3>
                      <span className="text-green-400 text-xs md:text-sm">{day.workouts} workout(s)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="text-orange-400 text-xs md:text-sm">
                        <div className="font-bold">{day.sets}</div>
                        <div>Sets</div>
                      </div>
                      <div className="text-orange-400 text-xs md:text-sm">
                        <div className="font-bold">{day.exercises}</div>
                        <div>Exercises</div>
                      </div>
                      <div className="text-orange-400 text-xs md:text-sm">
                        <div className="font-bold">{formatDuration(day.duration)}</div>
                        <div>Time</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-green-400 text-sm md:text-base gym-text">No workouts completed this week yet</p>
                  <p className="text-orange-400 text-xs mt-1 gym-text">Complete a workout to see your progress here!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 md:space-y-8">
          {/* Weight Progress */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 border-2 border-orange-500 gym-border">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
              ⚖️ Weight Progress
            </h2>
            {progress.currentWeight && progress.goalWeight ? (
              <div className="space-y-4">
                <div className="bg-black rounded-lg p-4 border border-green-500 gym-stat-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium gym-text">Progress</span>
                    <span className="text-orange-400 font-bold text-sm md:text-base">{weightProgress.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 md:h-4">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-green-500 h-3 md:h-4 rounded-full transition-all duration-500"
                      style={{ width: `${weightProgress.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                    <div className="text-white font-bold text-lg md:text-xl">{progress.initialWeight}kg</div>
                    <div className="text-orange-400 text-xs md:text-sm">Starting</div>
                  </div>
                  <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                    <div className="text-white font-bold text-lg md:text-xl">{progress.currentWeight}kg</div>
                    <div className="text-orange-400 text-xs md:text-sm">Current</div>
                  </div>
                  <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                    <div className="text-white font-bold text-lg md:text-xl">{progress.goalWeight}kg</div>
                    <div className="text-orange-400 text-xs md:text-sm">Goal</div>
                  </div>
                  <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-green-500 gym-stat-card">
                    <div className="text-white font-bold text-lg md:text-xl">{weightProgress.weightLost.toFixed(1)}kg</div>
                    <div className="text-orange-400 text-xs md:text-sm">Lost</div>
                  </div>
                </div>
                
                <button
                  onClick={handleCurrentWeightUpdate}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-orange-600 transition-all transform hover:scale-105 gym-button"
                >
                  Update Current Weight
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-2">⚖️</div>
                <p className="text-green-400 text-sm md:text-base gym-text mb-3">Set your weight goal to track your progress</p>
                <button
                  onClick={handleSetGoalWeightClick}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-green-600 transition-all transform hover:scale-105 gym-button"
                >
                  Set Weight Goal
                </button>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 border-2 border-green-500 gym-border">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
              🏆 Achievements
            </h2>
            <div className="space-y-3">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-black rounded-lg p-3 md:p-4 border border-orange-500 gym-achievement-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl md:text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-base gym-text">{achievement.name}</h3>
                        <p className="text-green-400 text-xs md:text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-green-400 text-sm md:text-base gym-text">Complete workouts to earn achievements</p>
                  <p className="text-orange-400 text-xs mt-1 gym-text">Your first achievement is waiting!</p>
                </div>
              )}
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 border-2 border-orange-500 gym-border">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center gym-text">
              🔥 Current Streak
            </h2>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2 gym-text">{currentStreak}</div>
              <p className="text-green-400 text-sm md:text-base gym-text">consecutive days with workouts</p>
              {currentStreak >= 3 && (
                <p className="text-orange-400 text-xs mt-2 gym-text">Keep going! You're on fire! 🔥</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WeeklyProgressModal />
      <WeightModal />
      <ImportExportModal />

      {/* User Form Modal */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500 gym-border">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                  Generate New Workout Plan
                </h2>
                <button
                  onClick={() => setShowUserForm(false)}
                  className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
                >
                  ×
                </button>
              </div>
              <UserForm 
                onSubmit={handleUserFormSubmit}
                onCancel={() => setShowUserForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;