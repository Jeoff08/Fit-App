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
    lastCompletedWorkout: null
  });

  // NEW: State for workout statistics
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    totalSets: 0,
    totalExercises: 0,
    totalDuration: 0,
    averageDuration: 0,
    completionRate: 0
  });

  // NEW: State for chart data
  const [chartData, setChartData] = useState({
    weeklyProgress: [],
    monthlyProgress: [],
    exerciseDistribution: []
  });

  // NEW: State for responsive design
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // NEW: State for showing UserForm
  const [showUserForm, setShowUserForm] = useState(false);

  // NEW: State for weekly progress modal
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [selectedWeekData, setSelectedWeekData] = useState(null);

  // NEW: State for user ID
  const [userId, setUserId] = useState(null);

  // Check screen size on mount and resize
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
        // Reset to default state when user logs out
        const emptyProgress = {
          workoutHistory: [],
          fitnessLevel: 'beginner',
          goals: [],
          achievements: [],
          lastCompletedWorkout: null
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
          lastCompletedWorkout: userData.lastCompletedWorkout || null
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Initialize user progress in Firestore
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
          lastCompletedWorkout: userData.lastCompletedWorkout || null
        };
        
        setProgress(userProgress);
        calculateWorkoutStats(userProgress.workoutHistory);
        generateChartData(userProgress.workoutHistory);
      } else {
        // Initialize with empty progress if user document doesn't exist
        const emptyProgress = {
          workoutHistory: [],
          fitnessLevel: 'beginner',
          goals: [],
          achievements: [],
          lastCompletedWorkout: null
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

  // NEW: Handle UserForm submission
  const handleUserFormSubmit = async (userData) => {
    console.log('User data submitted:', userData);
    
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        
        // Update user profile data in Firestore
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
          // Store generated plans if available
          ...(userData.generatedWorkoutPlan && { generatedWorkoutPlan: userData.generatedWorkoutPlan }),
          ...(userData.generatedNutritionPlan && { generatedNutritionPlan: userData.generatedNutritionPlan })
        });

        console.log('User data saved to Firestore');
        
        // Redirect to workout plan page
        window.location.href = '/workout-plan';
        setShowUserForm(false);
      } catch (error) {
        console.error('Error saving user data to Firestore:', error);
      }
    }
  };

  // NEW: Calculate workout statistics
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
    const completionRate = totalWorkouts > 0 ? Math.round((totalWorkouts / (totalWorkouts + 5)) * 100) : 0; // Simplified calculation

    setWorkoutStats({
      totalWorkouts,
      totalSets,
      totalExercises,
      totalDuration,
      averageDuration,
      completionRate
    });
  };

  // NEW: Generate chart data
  const generateChartData = (workoutHistory) => {
    // Weekly progress (last 7 days)
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

    // Monthly progress (last 30 days)
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

    // Exercise distribution
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

  // NEW: Format duration for display
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

  // NEW: Get achievement badges based on progress
  const getAchievements = () => {
    const achievements = [];
    const { totalWorkouts, totalSets, totalExercises } = workoutStats;

    if (totalWorkouts >= 1) achievements.push({ name: 'First Workout!', icon: '🎯', description: 'Completed your first workout' });
    if (totalWorkouts >= 5) achievements.push({ name: 'Consistent Starter', icon: '🔥', description: 'Completed 5 workouts' });
    if (totalWorkouts >= 10) achievements.push({ name: 'Dedicated Trainee', icon: '💪', description: 'Completed 10 workouts' });
    if (totalWorkouts >= 25) achievements.push({ name: 'Fitness Enthusiast', icon: '🏆', description: 'Completed 25 workouts' });
    if (totalSets >= 50) achievements.push({ name: 'Strength Builder', icon: '⚡', description: 'Completed 50 total sets' });
    if (totalSets >= 100) achievements.push({ name: 'Power House', icon: '🚀', description: 'Completed 100 total sets' });
    if (totalExercises >= 20) achievements.push({ name: 'Versatile Athlete', icon: '🌈', description: 'Performed 20 different exercises' });

    return achievements;
  };

  // NEW: Calculate streak
  const calculateStreak = () => {
    const workoutHistory = progress.workoutHistory || [];
    if (workoutHistory.length === 0) return 0;

    const sortedWorkouts = [...workoutHistory].sort((a, b) => 
      new Date(b.completionDate) - new Date(a.completionDate)
    );

    let streak = 0;
    let currentDate = new Date();
    
    // Check if today's workout is done
    const today = new Date().toLocaleDateString();
    if (sortedWorkouts[0].completionDate === today) {
      streak = 1;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Check consecutive previous days
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

  // NEW: Handle weekly progress click
  const handleWeeklyProgressClick = (dayData) => {
    setSelectedWeekData(dayData);
    setShowWeeklyModal(true);
  };

  // NEW: Weekly Progress Modal
  const WeeklyProgressModal = () => {
    if (!showWeeklyModal || !selectedWeekData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-green-500">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Daily Progress Details
              </h2>
              <button
                onClick={() => setShowWeeklyModal(false)}
                className="text-green-300 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="bg-green-700 rounded-xl p-4 md:p-6 mb-6">
              <h3 className="text-xl font-black text-white mb-4 text-center">
                {selectedWeekData.date}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-800 rounded-lg p-3 text-center">
                  <div className="text-white font-black text-lg md:text-xl">{selectedWeekData.workouts}</div>
                  <div className="text-green-200 text-xs md:text-sm">Workouts</div>
                </div>
                <div className="bg-green-800 rounded-lg p-3 text-center">
                  <div className="text-white font-black text-lg md:text-xl">{selectedWeekData.sets}</div>
                  <div className="text-green-200 text-xs md:text-sm">Total Sets</div>
                </div>
                <div className="bg-green-800 rounded-lg p-3 text-center">
                  <div className="text-white font-black text-lg md:text-xl">{selectedWeekData.exercises}</div>
                  <div className="text-green-200 text-xs md:text-sm">Exercises</div>
                </div>
                <div className="bg-green-800 rounded-lg p-3 text-center">
                  <div className="text-white font-black text-lg md:text-xl">{formatDuration(selectedWeekData.duration)}</div>
                  <div className="text-green-200 text-xs md:text-sm">Total Time</div>
                </div>
              </div>

              {selectedWeekData.workoutDetails && selectedWeekData.workoutDetails.length > 0 ? (
                <div>
                  <h4 className="text-lg font-black text-white mb-3">Workout Details:</h4>
                  <div className="space-y-3">
                    {selectedWeekData.workoutDetails.map((workout, index) => (
                      <div key={index} className="bg-green-600 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-bold text-sm md:text-base">{workout.dayName}</h5>
                          <div className="text-green-200 text-xs">
                            {workout.completionTime} • {workout.duration}
                          </div>
                        </div>
                        <div className="text-green-100 text-xs md:text-sm">
                          {workout.exercises?.length || 0} exercises • {workout.totalSets} sets
                        </div>
                        <div className="mt-2 space-y-1">
                          {workout.exercises?.slice(0, 3).map((exercise, exIndex) => (
                            <div key={exIndex} className="flex justify-between text-green-200 text-xs">
                              <span>{exercise.name}</span>
                              <span>{exercise.sets}×{exercise.reps}</span>
                            </div>
                          ))}
                          {workout.exercises?.length > 3 && (
                            <div className="text-green-300 text-xs text-center">
                              +{workout.exercises.length - 3} more exercises
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-green-200 text-sm md:text-base">No workouts completed on this day</p>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowWeeklyModal(false)}
                className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                Close Details
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
          lastCompletedWorkout: null
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

  // Responsive grid classes
  const statsGridClass = isMobile 
    ? "grid grid-cols-2 gap-3" 
    : isTablet 
      ? "grid grid-cols-3 gap-4" 
      : "grid grid-cols-3 lg:grid-cols-6 gap-4";

  const achievementsGridClass = isMobile 
    ? "grid grid-cols-1 gap-4" 
    : isTablet 
      ? "grid grid-cols-2 gap-5" 
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  const chartsGridClass = isMobile 
    ? "grid grid-cols-1 gap-6" 
    : "grid md:grid-cols-2 gap-8";

  const buttonContainerClass = isMobile 
    ? "flex flex-col gap-2 w-full" 
    : "flex gap-2";

  const headerTextSize = isMobile 
    ? "text-3xl md:text-7xl" 
    : "text-4xl md:text-7xl";

  const sectionTitleSize = isMobile 
    ? "text-2xl" 
    : "text-3xl";

  const workoutHeaderClass = isMobile 
    ? "flex flex-col gap-4" 
    : "flex justify-between items-center";

  const workoutStatsClass = isMobile 
    ? "flex flex-wrap gap-2 mt-2" 
    : "flex items-center gap-4 mt-2 md:mt-0";

  // If UserForm should be shown, render it instead of ProgressTracker
  if (showUserForm) {
    return <UserForm onSubmit={handleUserFormSubmit} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <div className="inline-block bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-2xl mb-4 md:mb-6 shadow-2xl">
          <div className="bg-black rounded-2xl p-3">
            <h1 className={`font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-3 tracking-tighter drop-shadow-2xl ${headerTextSize}`}>
              PROGRESS TRACKER
            </h1>
          </div>
        </div>
        <p className="text-base md:text-lg lg:text-2xl text-green-300 max-w-3xl mx-auto leading-relaxed font-medium px-2">
          TRACK YOUR FITNESS JOURNEY AND CELEBRATE YOUR ACHIEVEMENTS
        </p>
      </header>

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Statistics Overview */}
        <div className="bg-black border-4 border-gradient-to-r from-green-500 to-green-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            <h2 className={`font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-6 md:mb-8 text-center ${sectionTitleSize}`}>
              WORKOUT STATISTICS
            </h2>
            
            <div className={`${statsGridClass} mb-6 md:mb-8`}>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">{workoutStats.totalWorkouts}</div>
                <div className="text-green-200 text-xs md:text-sm font-medium">Total Workouts</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">{workoutStats.totalSets}</div>
                <div className="text-green-200 text-xs md:text-sm font-medium">Total Sets</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">{workoutStats.totalExercises}</div>
                <div className="text-green-200 text-xs md:text-sm font-medium">Total Exercises</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">{formatDuration(workoutStats.totalDuration)}</div>
                <div className="text-green-200 text-xs md:text-sm font-medium">Total Time</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">{formatDuration(workoutStats.averageDuration)}</div>
                <div className="text-green-200 text-xs md:text-sm font-medium">Avg. Duration</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2">{streak}</div>
                <div className="text-green-200 text-xs md:text-sm font-medium">Day Streak</div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex justify-between text-green-400 text-xs md:text-sm font-medium mb-1 md:mb-2">
                  <span>Workout Completion Rate</span>
                  <span>{workoutStats.completionRate}%</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2 md:h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-700 h-2 md:h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${workoutStats.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={chartsGridClass}>
          {/* Weekly Progress Chart */}
          <div className="bg-black border-4 border-gradient-to-r from-green-500 to-green-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-black text-green-400 mb-3 md:mb-4">Weekly Progress</h3>
              <div className="space-y-2 md:space-y-3">
                {chartData.weeklyProgress.map((day, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between cursor-pointer hover:bg-green-900 hover:bg-opacity-30 rounded-lg p-2 transition-all duration-200"
                    onClick={() => handleWeeklyProgressClick(day)}
                  >
                    <span className="text-green-300 text-xs md:text-sm w-12 md:w-20">
                      {isMobile ? day.date.split('/')[1] : day.date}
                    </span>
                    <div className="flex-1 mx-2 md:mx-4">
                      <div className="bg-gray-800 rounded-full h-3 md:h-4">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-700 h-3 md:h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(day.workouts * 50, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-white text-xs md:text-sm font-medium w-12 text-right">
                      {day.workouts} {isMobile ? '' : day.workouts === 1 ? 'workout' : 'workouts'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-green-400 text-xs">
                  💡 Click on any day to view detailed statistics
                </p>
              </div>
            </div>
          </div>

          {/* Exercise Distribution */}
          <div className="bg-black border-4 border-gradient-to-r from-green-500 to-green-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-black text-green-400 mb-3 md:mb-4">Top Exercises</h3>
              <div className="space-y-2 md:space-y-3">
                {chartData.exerciseDistribution.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-green-300 text-xs md:text-sm flex-1 truncate mr-2 md:mr-4">{exercise.name}</span>
                    <div className="flex items-center">
                      <div className="bg-gray-800 rounded-full h-2 w-16 md:w-24 mr-2 md:mr-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-700 h-2 rounded-full"
                          style={{ width: `${(exercise.count / Math.max(...chartData.exerciseDistribution.map(e => e.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-xs md:text-sm font-medium w-4 md:w-8 text-right">{exercise.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-black border-4 border-gradient-to-r from-green-500 to-green-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            <h2 className={`font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-6 md:mb-8 text-center ${sectionTitleSize}`}>
              ACHIEVEMENTS & BADGES
            </h2>
            
            {achievements.length > 0 ? (
              <div className={achievementsGridClass}>
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl md:rounded-2xl p-4 md:p-6 text-center transform hover:scale-105 transition-all duration-300">
                    <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">{achievement.icon}</div>
                    <h3 className="text-base md:text-lg font-black text-white mb-1 md:mb-2">{achievement.name}</h3>
                    <p className="text-green-200 text-xs md:text-sm">{achievement.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 md:py-8">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">🎯</div>
                <h3 className="text-lg md:text-xl font-black text-green-400 mb-1 md:mb-2">No Achievements Yet</h3>
                <p className="text-green-600 text-sm md:text-base">Complete your first workout to earn achievements!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="bg-black border-4 border-gradient-to-r from-green-500 to-green-700 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            <div className={workoutHeaderClass}>
              <h2 className={`font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent ${isMobile ? 'text-center mb-4' : ''} ${sectionTitleSize}`}>
                WORKOUT HISTORY
              </h2>
              <div className={buttonContainerClass}>
                <button
                  onClick={() => setShowUserForm(true)}
                  className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-3 md:px-4 py-2 rounded-xl font-medium transition-all text-sm md:text-base"
                >
                  <i className="fas fa-plus mr-1 md:mr-2"></i>
                  Generate New Workout Plan
                </button>
                <button
                  onClick={exportProgress}
                  className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-3 md:px-4 py-2 rounded-xl font-medium transition-all text-sm md:text-base"
                >
                  <i className="fas fa-download mr-1 md:mr-2"></i>
                  Export
                </button>
                <label className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-3 md:px-4 py-2 rounded-xl font-medium transition-all cursor-pointer text-sm md:text-base text-center">
                  <i className="fas fa-upload mr-1 md:mr-2"></i>
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={importProgress}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={clearProgress}
                  className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-3 md:px-4 py-2 rounded-xl font-medium transition-all text-sm md:text-base"
                >
                  <i className="fas fa-trash mr-1 md:mr-2"></i>
                  Clear
                </button>
              </div>
            </div>

            {progress.workoutHistory && progress.workoutHistory.length > 0 ? (
              <div className="space-y-4 md:space-y-6 mt-4 md:mt-0">
                {progress.workoutHistory.slice(0, isMobile ? 5 : 10).map((workout, index) => (
                  <div key={index} className="bg-gray-900 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-800">
                    <div className="flex flex-col">
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-white mb-1">{workout.dayName}</h3>
                        <p className="text-green-400 text-xs md:text-sm">
                          Completed on {workout.completionDate} {isMobile ? <br /> : 'at'} {workout.completionTime}
                        </p>
                      </div>
                      <div className={workoutStatsClass}>
                        <div className="bg-black rounded-lg md:rounded-xl px-2 md:px-3 py-1 border border-green-700">
                          <span className="text-green-400 text-xs md:text-sm font-medium">Duration: </span>
                          <span className="text-white font-medium text-xs md:text-sm">{workout.duration}</span>
                        </div>
                        <div className="bg-black rounded-lg md:rounded-xl px-2 md:px-3 py-1 border border-green-700">
                          <span className="text-green-400 text-xs md:text-sm font-medium">Exercises: </span>
                          <span className="text-white font-medium text-xs md:text-sm">{workout.exercises?.length || 0}</span>
                        </div>
                        <div className="bg-black rounded-lg md:rounded-xl px-2 md:px-3 py-1 border border-green-700">
                          <span className="text-green-400 text-xs md:text-sm font-medium">Total Sets: </span>
                          <span className="text-white font-medium text-xs md:text-sm">{workout.totalSets}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {progress.workoutHistory.length > (isMobile ? 5 : 10) && (
                  <div className="text-center">
                    <p className="text-green-400 text-sm md:text-base">
                      Showing {isMobile ? 5 : 10} of {progress.workoutHistory.length} workouts
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">💪</div>
                <h3 className="text-lg md:text-xl font-black text-green-400 mb-1 md:mb-2">No Workouts Completed Yet</h3>
                <p className="text-green-600 text-sm md:text-base mb-4 md:mb-6">Start your fitness journey by completing your first workout!</p>
                <button
                  onClick={() => setShowUserForm(true)}
                  className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Generate Your First Workout Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Progress Modal */}
      <WeeklyProgressModal />
    </div>
  );
};

export default ProgressTracker;