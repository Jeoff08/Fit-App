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
    generatePlan: false,
    clearWorkouts: false
  });

  // New state for regeneration notification
  const [showRegenerateNotification, setShowRegenerateNotification] = useState(false);
  const [lastProgressDate, setLastProgressDate] = useState(null);
  
  // New state for workout plan regeneration reminder
  const [showWorkoutPlanReminder, setShowWorkoutPlanReminder] = useState(false);

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
          // Personal Information
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          gender: userData.gender,
          
          // Fitness Stats
          fitnessGoal: userData.fitnessGoal,
          activityLevel: userData.activityLevel,
          workoutPreference: userData.workoutPreference,
          fitnessLevel: userData.fitnessLevel,
          
          // Medical Information
          hasMedicalConditions: userData.hasMedicalConditions,
          medicalConditions: userData.medicalConditions,
          
          // Workout Schedule
          preferredWorkoutDays: userData.preferredWorkoutDays,
          selectedDays: userData.selectedDays,
          
          // Progress Tracking
          workoutHistory: userData.workoutHistory || [],
          goals: userData.goals || [],
          achievements: userData.achievements || [],
          lastCompletedWorkout: userData.lastCompletedWorkout || null,
          initialWeight: userData.initialWeight || null,
          currentWeight: userData.currentWeight || null,
          goalWeight: userData.goalWeight || null,
          weightHistory: userData.weightHistory || [],
          weightGoalSetDate: userData.weightGoalSetDate || null,
          lastWorkoutAdjustment: userData.lastWorkoutAdjustment || null,
          generatedWorkoutPlan: userData.generatedWorkoutPlan || null,
          lastWorkoutPlanUpdate: userData.lastWorkoutPlanUpdate || null
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory);
        
        checkAndAdjustWorkouts(userProgress);
        checkForRegenerationNotification(userProgress);
        checkForWorkoutPlanReminder(userProgress);

        // Update localStorage for UserProfile component
        localStorage.setItem('userFitnessProfile', JSON.stringify(userProgress));
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const checkForRegenerationNotification = (userProgress) => {
    if (!userProgress.workoutHistory || userProgress.workoutHistory.length === 0) {
      return;
    }

    const sortedWorkouts = [...userProgress.workoutHistory].sort((a, b) => 
      new Date(b.completionDate) - new Date(a.completionDate)
    );
    
    const lastWorkoutDate = new Date(sortedWorkouts[0].completionDate);
    const currentDate = new Date();
    const daysSinceLastWorkout = Math.floor((currentDate - lastWorkoutDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastWorkout >= 14 && daysSinceLastWorkout <= 21) {
      setShowRegenerateNotification(true);
      setLastProgressDate(lastWorkoutDate.toLocaleDateString());
    } else {
      setShowRegenerateNotification(false);
    }
  };

  const checkForWorkoutPlanReminder = (userProgress) => {
    if (!userProgress.weightGoalSetDate || !userProgress.weightHistory || userProgress.weightHistory.length === 0) {
      return;
    }

    const sortedWeightHistory = [...userProgress.weightHistory].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    const lastWeightUpdateDate = new Date(sortedWeightHistory[0].date);
    const currentDate = new Date();
    const daysSinceLastWeightUpdate = Math.floor((currentDate - lastWeightUpdateDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastWeightUpdate >= 14 && daysSinceLastWeightUpdate <= 21) {
      setShowWorkoutPlanReminder(true);
    } else {
      setShowWorkoutPlanReminder(false);
    }
  };

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
          setShowWorkoutPlanReminder(true);
        }
      }
    }
  };

  const initializeUserProgress = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userProgress = {
          // Personal Information
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          gender: userData.gender,
          
          // Fitness Stats
          fitnessGoal: userData.fitnessGoal,
          activityLevel: userData.activityLevel,
          workoutPreference: userData.workoutPreference,
          fitnessLevel: userData.fitnessLevel,
          
          // Medical Information
          hasMedicalConditions: userData.hasMedicalConditions,
          medicalConditions: userData.medicalConditions,
          
          // Workout Schedule
          preferredWorkoutDays: userData.preferredWorkoutDays,
          selectedDays: userData.selectedDays,
          
          // Progress Tracking
          workoutHistory: userData.workoutHistory || [],
          goals: userData.goals || [],
          achievements: userData.achievements || [],
          lastCompletedWorkout: userData.lastCompletedWorkout || null,
          initialWeight: userData.initialWeight || null,
          currentWeight: userData.currentWeight || null,
          goalWeight: userData.goalWeight || null,
          weightHistory: userData.weightHistory || [],
          weightGoalSetDate: userData.weightGoalSetDate || null,
          lastWorkoutAdjustment: userData.lastWorkoutAdjustment || null,
          generatedWorkoutPlan: userData.generatedWorkoutPlan || null,
          lastWorkoutPlanUpdate: userData.lastWorkoutPlanUpdate || null
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory);
        checkForRegenerationNotification(userProgress);
        checkForWorkoutPlanReminder(userProgress);

        // Update localStorage for UserProfile component
        localStorage.setItem('userFitnessProfile', JSON.stringify(userProgress));
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

  const clearWorkoutHistory = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all your workout history? This will remove all your completed workouts but keep your weight data and settings. This action cannot be undone.');
    
    if (confirmed && userId) {
      try {
        setButtonAnimations(prev => ({ ...prev, clearWorkouts: true }));
        
        const userDocRef = doc(db, 'users', userId);
        
        await updateDoc(userDocRef, {
          workoutHistory: [],
          lastCompletedWorkout: null
        });
        
        setProgress(prev => ({
          ...prev,
          workoutHistory: [],
          lastCompletedWorkout: null
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

  const handleUserFormSubmit = async (userData) => {
    console.log('User data submitted from ProgressTracker:', userData);
    
    // Close the form
    setShowUserForm(false);
    
    // Show success message
    alert('✅ Your fitness profile has been updated successfully! The UserProfile will now show your new information and workout plan.');
    
    // The data is already saved to Firestore and localStorage by UserForm
    // ProgressTracker will automatically update via the real-time listener
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
        workoutDetails: workoutsOnDate,
        hasWorkouts: workoutsOnDate.length > 0
      };
    });

    const weeklyProgressWithWorkouts = weeklyProgress.filter(day => day.hasWorkouts);

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

  const handleRegenerateNotificationClose = () => {
    setShowRegenerateNotification(false);
  };

  const handleWorkoutPlanReminderClose = () => {
    setShowWorkoutPlanReminder(false);
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

  const WeeklyProgressModal = () => {
    if (!showWeeklyModal || !selectedWeekData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                Daily Progress Details - {selectedWeekData.date}
              </h2>
              <button
                onClick={() => setShowWeeklyModal(false)}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-green-500 gym-border">
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
                  <h4 className="text-base font-bold text-white mb-3 gym-text">Workout Details:</h4>
                  <div className="space-y-4">
                    {selectedWeekData.workoutDetails.map((workout, index) => (
                      <div key={index} className="bg-black rounded-lg p-4 border border-green-500 gym-workout-card">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="text-white font-bold text-lg gym-text">{workout.dayName}</h5>
                          <div className="text-orange-400 text-sm">
                            {workout.completionTime} • {workout.duration}
                          </div>
                        </div>
                        <div className="text-green-300 text-sm mb-3">
                          {workout.exercises?.length || 0} exercises • {workout.totalSets} sets
                        </div>
                        
                        <div className="mt-3 space-y-3">
                          <h6 className="text-white font-medium text-sm gym-text">All Exercises:</h6>
                          {workout.exercises?.map((exercise, exIndex) => (
                            <div key={exIndex} className="flex justify-between items-center bg-gray-800 rounded-lg p-3 border border-orange-500">
                              <div className="flex-1">
                                <span className="text-white font-medium text-sm">{exercise.name}</span>
                                {exercise.category && (
                                  <span className="text-green-400 text-xs ml-2">({exercise.category})</span>
                                )}
                              </div>
                              <div className="text-orange-400 text-sm font-medium">
                                {exercise.sets} sets × {exercise.reps} reps
                                {exercise.weight && ` × ${exercise.weight}kg`}
                              </div>
                            </div>
                          ))}
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
                className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button"
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
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                Set Your Weight Goal
              </h2>
              <button
                onClick={() => setShowWeightModal(false)}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
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
                  className="w-full bg-gray-900 border border-orange-500 rounded-lg px-3 py-2 text-white placeholder-green-600 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm gym-input"
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
                  className="w-full bg-gray-900 border border-orange-500 rounded-lg px-3 py-2 text-white placeholder-green-600 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm gym-input"
                  placeholder="Enter your goal weight"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowWeightModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm gym-button"
              >
                Skip
              </button>
              <button
                onClick={handleWeightSubmit}
                className="flex-1 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button"
              >
                Set Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RegenerationNotification = () => {
    if (!showRegenerateNotification) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                Time for a New Plan! 🔄
              </h2>
              <button
                onClick={handleRegenerateNotificationClose}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-green-500">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">💡</div>
                  <h3 className="text-lg font-bold text-white gym-text mb-2">
                    Optimize Your Workouts!
                  </h3>
                </div>
                
                <div className="space-y-2 text-sm text-green-300">
                  <p>It's been <span className="text-orange-400 font-bold">2-3 weeks</span> since your last workout.</p>
                  <p><strong>Generating a new workout plan will:</strong></p>
                  
                  <ul className="list-disc list-inside space-y-1 text-green-400">
                    <li>Create fresh exercises and routines</li>
                    <li>Reset your progress tracking for the new plan</li>
                    <li>Adjust intensity based on current fitness level</li>
                    <li>Keep your workouts challenging and effective</li>
                  </ul>
                  
                  <p className="text-orange-400 text-xs mt-2">
                    Note: Your workout history will be cleared to track progress with the new plan.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRegenerateNotificationClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm gym-button"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    handleRegenerateNotificationClose();
                    handleGenerateNewPlanClick();
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button"
                >
                  Generate New Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WorkoutPlanReminder = () => {
    if (!showWorkoutPlanReminder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full border-2 border-orange-500 gym-border">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white gym-text">
                Time to Refresh Your Plan! 🔄
              </h2>
              <button
                onClick={handleWorkoutPlanReminderClose}
                className="text-orange-500 hover:text-green-400 text-xl font-bold transition-colors gym-button"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-green-500">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">⚡</div>
                  <h3 className="text-lg font-bold text-white gym-text mb-2">
                    Boost Your Weight Loss!
                  </h3>
                </div>
                
                <div className="space-y-2 text-sm text-green-300">
                  <p>It's been <span className="text-orange-400 font-bold">2-3 weeks</span> since your last weight progress update.</p>
                  <p>Your body may have adapted to your current workout routine. A new personalized plan can help:</p>
                  
                  <ul className="list-disc list-inside space-y-1 text-green-400">
                    <li>Break through weight loss plateaus</li>
                    <li>Introduce new exercises for better results</li>
                    <li>Adjust intensity based on your progress</li>
                    <li>Keep your metabolism active</li>
                  </ul>
                  
                  <p className="text-orange-400 font-medium mt-2">Consider generating a new workout plan to accelerate your weight loss journey!</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleWorkoutPlanReminderClose}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm gym-button"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    handleWorkoutPlanReminderClose();
                    handleGenerateNewPlanClick();
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button"
                >
                  Generate New Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const streak = calculateStreak();
  const achievements = getAchievements();
  const weightProgress = calculateWeightProgress();

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

  const setGoalButtonClass = `bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button ${
    buttonAnimations.setGoal ? 'animate-pulse scale-105' : ''
  }`;

  const generatePlanButtonClass = `bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button ${
    buttonAnimations.generatePlan ? 'animate-pulse scale-105' : ''
  }`;

  const clearWorkoutsButtonClass = `bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button ${
    buttonAnimations.clearWorkouts ? 'animate-pulse scale-105' : ''
  }`;

  if (showUserForm) {
    return <UserForm onSubmit={handleUserFormSubmit} isRegenerating={true} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-3 md:p-6 gym-background">
      <style jsx>{`
        .gym-background {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
          position: relative;
        }
        
        .gym-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.8) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .gym-container {
          position: relative;
          z-index: 1;
        }
        
        .gym-header {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(34, 197, 94, 0.1) 100%);
          border: 2px solid #22c55e;
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.2);
        }
        
        .gym-card {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(34, 197, 94, 0.05) 100%);
          border: 1px solid #22c55e;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .gym-stat-card {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(249, 115, 22, 0.1) 100%);
          border: 1px solid #f97316;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.1);
        }
        
        .gym-workout-card {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(34, 197, 94, 0.05) 100%);
          border: 1px solid #22c55e;
          box-shadow: 0 2px 15px rgba(34, 197, 94, 0.1);
        }
        
        .gym-button {
          background: linear-gradient(135deg, #f97316 0%, #22c55e 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
          transition: all 0.3s ease;
        }
        
        .gym-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
        }
        
        .gym-border {
          border: 2px solid;
          border-image: linear-gradient(135deg, #f97316, #22c55e) 1;
        }
        
        .gym-text {
          background: linear-gradient(135deg, #22c55e, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gym-input {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #f97316;
          color: #22c55e;
        }
        
        .gym-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
        
        .gym-progress-bar {
          background: linear-gradient(90deg, #f97316, #22c55e);
          box-shadow: 0 2px 10px rgba(34, 197, 94, 0.3);
        }
        
        .gym-achievement-card {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(249, 115, 22, 0.1) 100%);
          border: 1px solid #f97316;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.2);
        }
        
        @keyframes pulse-gym {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-pulse-gym {
          animation: pulse-gym 2s infinite;
        }
      `}</style>

      <div className="gym-container">
        {/* Header Section */}
        <div className="gym-header rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8">
          <div className={workoutHeaderClass}>
            <div className="flex-1">
              <h1 className={`${headerTextSize} font-bold gym-text mb-2`}>
                Fitness Progress Tracker
              </h1>
              <p className="text-green-400 text-sm md:text-base">
                Track your journey to a stronger, healthier you
              </p>
            </div>
            <div className={workoutStatsClass}>
              <div className="bg-black rounded-lg px-3 py-2 border border-orange-500 gym-stat-card">
                <div className="text-center">
                  <div className="text-white font-bold text-lg md:text-xl">{streak}</div>
                  <div className="text-green-400 text-xs">Day Streak</div>
                </div>
              </div>
              <div className="bg-black rounded-lg px-3 py-2 border border-orange-500 gym-stat-card">
                <div className="text-center">
                  <div className="text-white font-bold text-lg md:text-xl">{workoutStats.totalWorkouts}</div>
                  <div className="text-green-400 text-xs">Total Workouts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 md:mb-8">
          <div className={buttonContainerClass}>
            <button 
              onClick={handleSetGoalWeightClick}
              className={setGoalButtonClass}
            >
              🎯 Set Weight Goal
            </button>
            <button 
              onClick={handleGenerateNewPlanClick}
              className={generatePlanButtonClass}
            >
              💪 Generate New Plan
            </button>
            <button 
              onClick={clearWorkoutHistory}
              className={clearWorkoutsButtonClass}
            >
              🗑️ Clear Workouts
            </button>
          </div>
        </div>

        {/* Weight Progress Section */}
        {progress.initialWeight && progress.goalWeight && (
          <div className="gym-card rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className={`${sectionTitleSize} font-bold gym-text mb-2 md:mb-0`}>
                Weight Progress
              </h2>
              <button
                onClick={handleCurrentWeightUpdate}
                className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-3 py-2 rounded-lg font-medium transition-all text-sm transform hover:scale-105 gym-button"
              >
                Update Current Weight
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-lg">{progress.initialWeight}kg</div>
                  <div className="text-green-400 text-xs">Start Weight</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-lg">{progress.currentWeight}kg</div>
                  <div className="text-green-400 text-xs">Current Weight</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-lg">{progress.goalWeight}kg</div>
                  <div className="text-green-400 text-xs">Goal Weight</div>
                </div>
                <div className="bg-black rounded-lg p-3 text-center border border-orange-500 gym-stat-card">
                  <div className="text-white font-bold text-lg">{weightProgress.weightLost.toFixed(1)}kg</div>
                  <div className="text-green-400 text-xs">Weight Lost</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Progress: {weightProgress.percentage.toFixed(1)}%</span>
                  <span className="text-orange-400">{weightProgress.weightToGo.toFixed(1)}kg to go</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 md:h-4">
                  <div 
                    className="gym-progress-bar h-3 md:h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${weightProgress.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workout Statistics */}
        <div className="gym-card rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 md:mb-8">
          <h2 className={`${sectionTitleSize} font-bold gym-text mb-4`}>
            Workout Statistics
          </h2>
          
          <div className={statsGridClass}>
            <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
              <div className="text-white font-bold text-lg md:text-2xl">{workoutStats.totalWorkouts}</div>
              <div className="text-green-400 text-xs md:text-sm">Total Workouts</div>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
              <div className="text-white font-bold text-lg md:text-2xl">{workoutStats.totalSets}</div>
              <div className="text-green-400 text-xs md:text-sm">Total Sets</div>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
              <div className="text-white font-bold text-lg md:text-2xl">{workoutStats.totalExercises}</div>
              <div className="text-green-400 text-xs md:text-sm">Exercises</div>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
              <div className="text-white font-bold text-lg md:text-2xl">{formatDuration(workoutStats.totalDuration)}</div>
              <div className="text-green-400 text-xs md:text-sm">Total Time</div>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
              <div className="text-white font-bold text-lg md:text-2xl">{formatDuration(workoutStats.averageDuration)}</div>
              <div className="text-green-400 text-xs md:text-sm">Avg. Duration</div>
            </div>
            <div className="bg-black rounded-lg p-3 md:p-4 text-center border border-orange-500 gym-stat-card">
              <div className="text-white font-bold text-lg md:text-2xl">{workoutStats.completionRate}%</div>
              <div className="text-green-400 text-xs md:text-sm">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Charts and Progress Visualization - Only show if there are workouts */}
        {progress.workoutHistory && progress.workoutHistory.length > 0 ? (
          <div className={chartsGridClass}>
            {/* Weekly Progress - Only show if there are workouts in the week */}
            {chartData.weeklyProgress.length > 0 && (
              <div className="gym-card rounded-2xl md:rounded-3xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold gym-text mb-4">Weekly Progress</h3>
                <div className="space-y-3">
                  {chartData.weeklyProgress.map((day, index) => (
                    <div 
                      key={index}
                      onClick={() => handleWeeklyProgressClick(day)}
                      className="gym-workout-card rounded-lg p-3 cursor-pointer transform transition-transform hover:scale-105"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium text-sm gym-text">{day.date}</span>
                        <span className="text-orange-400 text-xs">{day.workouts} workout{day.workouts !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between text-xs text-green-300">
                        <span>{day.sets} sets</span>
                        <span>{day.exercises} exercises</span>
                        <span>{formatDuration(day.duration)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Monthly Progress - Only show if there are workouts in the month */}
            {chartData.monthlyProgress.length > 0 && (
              <div className="gym-card rounded-2xl md:rounded-3xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold gym-text mb-4">Monthly Overview</h3>
                <div className="space-y-4">
                  {chartData.monthlyProgress.map((week, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white gym-text">{week.week}</span>
                        <span className="text-green-400">{week.workouts} workouts</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="gym-progress-bar h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((week.workouts / 7) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Show empty state when no workouts completed
          <div className="gym-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center mb-6 md:mb-8">
            <div className="text-6xl md:text-8xl mb-4">💪</div>
            <h3 className="text-xl md:text-2xl font-bold gym-text mb-2">No Workouts Completed Yet</h3>
            <p className="text-green-400 mb-4">Complete your first workout to see your progress charts and statistics!</p>
            <button 
              onClick={handleGenerateNewPlanClick}
              className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 gym-button"
            >
              Start Your First Workout
            </button>
          </div>
        )}

        {/* Achievements Section */}
        <div className="gym-card rounded-2xl md:rounded-3xl p-4 md:p-6 mt-6 md:mt-8">
          <h2 className={`${sectionTitleSize} font-bold gym-text mb-4`}>
            Achievements
          </h2>
          
          {achievements.length > 0 ? (
            <div className={achievementsGridClass}>
              {achievements.map((achievement, index) => (
                <div key={index} className="gym-achievement-card rounded-lg p-4 transform transition-all hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm md:text-base gym-text">{achievement.name}</h4>
                      <p className="text-green-400 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <div className="text-4xl md:text-6xl mb-3">🏆</div>
              <p className="text-green-400 text-sm md:text-base">Complete workouts to earn achievements!</p>
            </div>
          )}
        </div>

        {/* Recent Workouts - Only show if there are workouts */}
        {progress.workoutHistory && progress.workoutHistory.length > 0 && (
          <div className="gym-card rounded-2xl md:rounded-3xl p-4 md:p-6 mt-6 md:mt-8">
            <h2 className={`${sectionTitleSize} font-bold gym-text mb-4`}>
              Recent Workouts
            </h2>
            
            <div className="space-y-3">
              {progress.workoutHistory.slice(-5).reverse().map((workout, index) => (
                <div key={index} className="gym-workout-card rounded-lg p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-base md:text-lg gym-text">{workout.dayName}</h4>
                      <p className="text-green-400 text-xs md:text-sm">
                        {workout.completionDate} • {workout.completionTime} • {workout.duration}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="bg-black px-2 py-1 rounded text-xs text-orange-400 border border-orange-500">
                          {workout.exercises?.length || 0} exercises
                        </span>
                        <span className="bg-black px-2 py-1 rounded text-xs text-green-400 border border-green-500">
                          {workout.totalSets} sets
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 font-bold text-sm md:text-base">
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <WeeklyProgressModal />
      <WeightInputModal />
      <RegenerationNotification />
      <WorkoutPlanReminder />
    </div>
  );
};

export default ProgressTracker;