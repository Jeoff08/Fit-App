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
    lastWorkoutAdjustment: null
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
    generatePlan: false
  });

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
          lastWorkoutAdjustment: null
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
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
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
          lastWorkoutAdjustment: userData.lastWorkoutAdjustment || null
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory);
        
        checkAndAdjustWorkouts(userProgress);
      }
    });

    return () => unsubscribe();
  }, [userId]);

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
          lastWorkoutAdjustment: userData.lastWorkoutAdjustment || null
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory);
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
          lastWorkoutAdjustment: null
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

  const generateChartData = (workoutHistory) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();

    const weeklyProgress = last7Days.map(date => {
      const workoutsOnDate = workoutHistory.filter(workout => workout.completionDate === date);
      const totalSets = workoutsOnDate.reduce((sum, workout) => sum + (workout.totalSets || 0), 0);
      const totalExercises = workoutsOnDate.reduce((sum, workout) => sum + (workout.exercises?.length || 0), 0);
      const totalDuration = workoutsOnDate.reduce((sum, workout) => {
        if (workout.duration) {
          const [minutes, seconds] = workout.duration.split(':').map(Number);
          return sum + minutes * 60 + seconds;
        }
        return sum;
      }, 0);
      
      return {
        date,
        workouts: workoutsOnDate.length,
        sets: totalSets,
        exercises: totalExercises,
        duration: totalDuration,
        workoutDetails: workoutsOnDate
      };
    });

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
        sets: weekWorkouts.reduce((sum, workout) => sum + (workout.totalSets || 0), 0)
      };
    });

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
      weeklyProgress,
      monthlyProgress,
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

  const WeeklyProgressModal = () => {
    if (!showWeeklyModal || !selectedWeekData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Daily Progress Details
              </h2>
              <button
                onClick={() => setShowWeeklyModal(false)}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="bg-gradient-to-r from-black to-gray-800 rounded-lg p-4 mb-4 border border-green-500">
              <h3 className="text-lg font-bold text-white mb-3 text-center">
                {selectedWeekData.date}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{selectedWeekData.workouts}</div>
                  <div className="text-green-400 text-xs">Workouts</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{selectedWeekData.sets}</div>
                  <div className="text-green-400 text-xs">Total Sets</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{selectedWeekData.exercises}</div>
                  <div className="text-green-400 text-xs">Exercises</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{formatDuration(selectedWeekData.duration)}</div>
                  <div className="text-green-400 text-xs">Total Time</div>
                </div>
              </div>

              {selectedWeekData.workoutDetails && selectedWeekData.workoutDetails.length > 0 ? (
                <div>
                  <h4 className="text-base font-bold text-white mb-2">Workout Details:</h4>
                  <div className="space-y-2">
                    {selectedWeekData.workoutDetails.map((workout, index) => (
                      <div key={index} className="bg-black rounded-lg p-3 border border-green-500">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-white font-medium text-sm">{workout.dayName}</h5>
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
                className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WeightInputModal = () => {
    if (!showWeightModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full border-2 border-orange-500">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Set Your Weight Goal
              </h2>
              <button
                onClick={() => setShowWeightModal(false)}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-green-400 font-medium mb-1 text-sm">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightInput.currentWeight}
                  onChange={(e) => setWeightInput(prev => ({ ...prev, currentWeight: e.target.value }))}
                  className="w-full bg-black border border-orange-500 rounded-lg px-3 py-2 text-white placeholder-green-600 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                  placeholder="Enter your current weight"
                />
              </div>
              
              <div>
                <label className="block text-green-400 font-medium mb-1 text-sm">
                  Goal Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightInput.goalWeight}
                  onChange={(e) => setWeightInput(prev => ({ ...prev, goalWeight: e.target.value }))}
                  className="w-full bg-black border border-orange-500 rounded-lg px-3 py-2 text-white placeholder-green-600 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                  placeholder="Enter your goal weight"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowWeightModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm"
              >
                Skip
              </button>
              <button
                onClick={handleWeightSubmit}
                className="flex-1 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105"
              >
                Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const clearProgress = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all your progress? This action cannot be undone.');
    if (confirmed && userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
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
          lastWorkoutAdjustment: null
        };
        
        await updateDoc(userDocRef, emptyProgress);
        
        setProgress(emptyProgress);
        calculateWorkoutStats([]);
        generateChartData([]);
      } catch (error) {
        console.error('Error clearing progress:', error);
        alert('Error clearing progress. Please try again.');
      }
    }
  };

  const exportProgress = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fitness-progress.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importedProgress = JSON.parse(e.target.result);
          
          const userDocRef = doc(db, 'users', userId);
          await updateDoc(userDocRef, importedProgress);
          
          setProgress(importedProgress);
          calculateWorkoutStats(importedProgress.workoutHistory || []);
          generateChartData(importedProgress.workoutHistory || []);
          alert('Progress imported successfully!');
        } catch (error) {
          console.error('Error importing progress:', error);
          alert('Error importing progress file. Please make sure it is a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const streak = calculateStreak();
  const achievements = getAchievements();
  const weightProgress = calculateWeightProgress();

  // Enhanced responsive classes with better mobile optimization
  const statsGridClass = isMobile 
    ? "grid grid-cols-2 gap-2" 
    : isTablet 
      ? "grid grid-cols-3 gap-3" 
      : "grid grid-cols-3 lg:grid-cols-6 gap-3";

  const achievementsGridClass = isMobile 
    ? "grid grid-cols-1 gap-3" 
    : isTablet 
      ? "grid grid-cols-2 gap-4" 
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

  const chartsGridClass = isMobile 
    ? "grid grid-cols-1 gap-4" 
    : "grid md:grid-cols-2 gap-6";

  const buttonContainerClass = isMobile 
    ? "flex flex-col gap-2 w-full" 
    : "flex gap-3";

  const headerTextSize = isMobile 
    ? "text-2xl md:text-4xl" 
    : "text-3xl md:text-5xl";

  const sectionTitleSize = isMobile 
    ? "text-xl" 
    : "text-2xl";

  const workoutHeaderClass = isMobile 
    ? "flex flex-col gap-3" 
    : "flex justify-between items-start";

  const workoutStatsClass = isMobile 
    ? "flex flex-wrap gap-2 mt-2" 
    : "flex items-center gap-3 mt-0";

  // Animation classes
  const setGoalButtonClass = `bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 ${
    buttonAnimations.setGoal ? 'animate-pulse scale-105' : ''
  }`;

  const generatePlanButtonClass = `bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 ${
    buttonAnimations.generatePlan ? 'animate-pulse scale-105' : ''
  }`;

  if (showUserForm) {
    return <UserForm onSubmit={handleUserFormSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white font-sans p-3 md:p-6">
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-optimized {
            padding: 1rem;
          }
          .mobile-text {
            font-size: 0.875rem;
          }
          .mobile-padding {
            padding: 1rem;
          }
          .mobile-margin {
            margin-bottom: 1.5rem;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .tablet-optimized {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`mb-6 md:mb-8 text-center mobile-margin ${isMobile ? 'mobile-padding' : ''}`}>
          <h1 className={`${headerTextSize} font-bold mb-2 md:mb-4 bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent`}>
            PROGRESS TRACKER
          </h1>
          <p className="text-green-400 text-sm md:text-base max-w-2xl mx-auto">
            Track your fitness journey, monitor your gains, and crush your goals
          </p>
        </div>

        {/* Quick Stats Section */}
        <div className={`${statsGridClass} mb-6 md:mb-8`}>
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transform transition-transform hover:scale-105 hover:border-green-500">
            <div className="text-lg md:text-2xl font-bold text-white">{workoutStats.totalWorkouts}</div>
            <div className="text-green-400 text-xs md:text-sm">Total Workouts</div>
          </div>
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transform transition-transform hover:scale-105 hover:border-green-500">
            <div className="text-lg md:text-2xl font-bold text-white">{workoutStats.totalSets}</div>
            <div className="text-green-400 text-xs md:text-sm">Total Sets</div>
          </div>
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transform transition-transform hover:scale-105 hover:border-green-500">
            <div className="text-lg md:text-2xl font-bold text-white">{workoutStats.totalExercises}</div>
            <div className="text-green-400 text-xs md:text-sm">Exercises</div>
          </div>
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transform transition-transform hover:scale-105 hover:border-green-500">
            <div className="text-lg md:text-2xl font-bold text-white">{formatDuration(workoutStats.totalDuration)}</div>
            <div className="text-green-400 text-xs md:text-sm">Total Time</div>
          </div>
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transform transition-transform hover:scale-105 hover:border-green-500">
            <div className="text-lg md:text-2xl font-bold text-white">{streak}</div>
            <div className="text-green-400 text-xs md:text-sm">Day Streak</div>
          </div>
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transform transition-transform hover:scale-105 hover:border-green-500">
            <div className="text-lg md:text-2xl font-bold text-white">{workoutStats.completionRate}%</div>
            <div className="text-green-400 text-xs md:text-sm">Completion</div>
          </div>
        </div>

        {/* Weight Progress Section */}
        {progress.initialWeight && progress.goalWeight && (
          <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-green-500 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
              <h2 className={`${sectionTitleSize} font-bold text-white`}>Weight Progress</h2>
              <div className={buttonContainerClass}>
                <button
                  onClick={handleCurrentWeightUpdate}
                  className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105"
                >
                  Update Weight
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{progress.initialWeight}kg</div>
                  <div className="text-green-400 text-xs">Start Weight</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{progress.currentWeight}kg</div>
                  <div className="text-green-400 text-xs">Current Weight</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{progress.goalWeight}kg</div>
                  <div className="text-green-400 text-xs">Goal Weight</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500">
                  <div className="text-white font-bold text-base md:text-lg">{weightProgress.weightLost.toFixed(1)}kg</div>
                  <div className="text-green-400 text-xs">Lost</div>
                </div>
              </div>

              <div className="bg-black rounded-lg p-3 border border-green-500">
                <div className="flex justify-between text-sm text-green-400 mb-1">
                  <span>Progress: {weightProgress.percentage.toFixed(1)}%</span>
                  <span>{weightProgress.weightToGo.toFixed(1)}kg to go</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 md:h-6">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-green-500 h-4 md:h-6 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${weightProgress.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <div className={workoutHeaderClass}>
            <h2 className={`${sectionTitleSize} font-bold text-white mb-3 md:mb-0`}>Quick Actions</h2>
            <div className={workoutStatsClass}>
              <span className="text-green-400 text-sm">Fitness Level: {progress.fitnessLevel}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            <button
              onClick={handleSetGoalWeightClick}
              className={setGoalButtonClass}
            >
              Set Weight Goal
            </button>
            <button
              onClick={handleGenerateNewPlanClick}
              className={generatePlanButtonClass}
            >
              Generate New Plan
            </button>
            <button
              onClick={exportProgress}
              className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105"
            >
              Export Progress
            </button>
            <label className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 text-center cursor-pointer">
              Import Progress
              <input
                type="file"
                accept=".json"
                onChange={importProgress}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Weekly Progress Section */}
        <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-green-500 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <h2 className={`${sectionTitleSize} font-bold text-white mb-4`}>Weekly Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {chartData.weeklyProgress.map((day, index) => (
              <div
                key={index}
                onClick={() => handleWeeklyProgressClick(day)}
                className={`bg-gradient-to-br from-black to-gray-800 border-2 rounded-lg p-2 text-center cursor-pointer transform transition-all hover:scale-105 ${
                  day.workouts > 0 
                    ? 'border-orange-500 hover:border-green-500' 
                    : 'border-gray-700 hover:border-orange-500'
                }`}
              >
                <div className="text-white font-bold text-sm mb-1">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-green-400 text-xs mb-1">
                  {day.workouts} workout{day.workouts !== 1 ? 's' : ''}
                </div>
                <div className="text-orange-400 text-xs">
                  {day.sets} sets
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <h2 className={`${sectionTitleSize} font-bold text-white mb-4`}>Achievements</h2>
          <div className={achievementsGridClass}>
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 border-2 border-green-500 rounded-lg p-3 md:p-4 transform transition-all hover:scale-105 hover:border-orange-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="text-white font-bold text-sm md:text-base">{achievement.name}</div>
                      <div className="text-green-400 text-xs">{achievement.description}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-4">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-green-400 text-sm md:text-base">Complete your first workout to earn achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Workouts Section */}
        <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-green-500 rounded-xl md:rounded-2xl p-4 md:p-6">
          <h2 className={`${sectionTitleSize} font-bold text-white mb-4`}>Recent Workouts</h2>
          <div className="space-y-3">
            {progress.workoutHistory && progress.workoutHistory.slice(-5).reverse().map((workout, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black to-gray-800 border-2 border-orange-500 rounded-lg p-3 md:p-4 transform transition-all hover:scale-105 hover:border-green-500"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-white font-bold text-base md:text-lg">{workout.dayName}</h3>
                    <p className="text-green-400 text-xs md:text-sm">
                      {workout.exercises?.length || 0} exercises • {workout.totalSets} sets • {workout.duration}
                    </p>
                    <p className="text-orange-400 text-xs">
                      Completed on {workout.completionDate} at {workout.completionTime}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {workout.exercises?.slice(0, 3).map((exercise, exIndex) => (
                      <span
                        key={exIndex}
                        className="bg-black text-orange-400 px-2 py-1 rounded text-xs border border-green-500"
                      >
                        {exercise.name}
                      </span>
                    ))}
                    {workout.exercises?.length > 3 && (
                      <span className="bg-black text-green-400 px-2 py-1 rounded text-xs border border-orange-500">
                        +{workout.exercises.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {(!progress.workoutHistory || progress.workoutHistory.length === 0) && (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">💪</div>
                <p className="text-green-400 text-sm md:text-base">No workouts completed yet. Start your fitness journey today!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <WeeklyProgressModal />
      <WeightInputModal />
    </div>
  );
};

export default ProgressTracker;