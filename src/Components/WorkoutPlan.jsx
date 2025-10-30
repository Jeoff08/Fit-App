// WorkoutPlan.jsx
import React, { useState, useEffect, useRef } from "react";
import WorkoutImage from './WorkoutImage';
import { db } from '../Config/firebaseconfig';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { findExerciseAlternatives } from '../Algorithms/rulebasedAlgorithms';
import '../App.css'

const WorkoutPlan = ({ plan, onWorkoutComplete, userData, onProgressUpdate }) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // New state for the countdown timer
  const [countdownTime, setCountdownTime] = useState(0);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const countdownTimerRef = useRef(null);
  
  // New state to track completed sets per exercise
  const [completedSetsCount, setCompletedSetsCount] = useState({});

  // New state for applied workouts
  const [appliedWorkouts, setAppliedWorkouts] = useState([]);
  const [selectedAppliedWorkout, setSelectedAppliedWorkout] = useState(null);

  // New state for view mode and modal
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'overview'

  // NEW: State for generated workout plan
  const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = useState(null);
  const [userId, setUserId] = useState(null);

  // NEW: State for showing alternatives
  const [showAlternatives, setShowAlternatives] = useState({});

  // NEW: State for modified workouts (to track replaced exercises)
  const [modifiedWorkouts, setModifiedWorkouts] = useState({});

  // NEW: State for tracking multiple alternative selections
  const [alternativeHistory, setAlternativeHistory] = useState({});

  // NEW: State for loading alternative images
  const [loadingAlternatives, setLoadingAlternatives] = useState({});

  // Load user data and applied workouts from Firestore
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        await initializeUserData(user.uid);
      } else {
        setUserId(null);
        setAppliedWorkouts([]);
        setGeneratedWorkoutPlan(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const initializeUserData = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Load applied workouts
        if (userData.appliedWorkouts && userData.appliedWorkouts.length > 0) {
          setAppliedWorkouts(userData.appliedWorkouts);
          if (!selectedAppliedWorkout) {
            setSelectedAppliedWorkout(userData.appliedWorkouts[0]);
            // Set default selected day for overview mode
            const firstDayWithWorkouts = userData.appliedWorkouts[0].days.find(day => day.workouts && day.workouts.length > 0);
            if (firstDayWithWorkouts) {
              setSelectedDay(firstDayWithWorkouts.day);
            }
          }
        }

        // Load generated workout plan if exists
        if (userData.generatedWorkoutPlan) {
          setGeneratedWorkoutPlan(userData.generatedWorkoutPlan);
        }
      }
    } catch (error) {
      console.error('Error initializing user data:', error);
    }
  };

  // Listen for real-time updates to applied workouts
  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setAppliedWorkouts(userData.appliedWorkouts || []);
        
        // Update selected workout if it still exists
        if (selectedAppliedWorkout && userData.appliedWorkouts) {
          const updatedWorkout = userData.appliedWorkouts.find(w => w.id === selectedAppliedWorkout.id);
          if (updatedWorkout) {
            setSelectedAppliedWorkout(updatedWorkout);
          } else if (userData.appliedWorkouts.length > 0) {
            setSelectedAppliedWorkout(userData.appliedWorkouts[0]);
          } else {
            setSelectedAppliedWorkout(null);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [userId, selectedAppliedWorkout]);

  // Determine which plan to use - generated workout, applied workout, or passed plan
  const currentPlan = selectedAppliedWorkout ? selectedAppliedWorkout.days : (generatedWorkoutPlan || plan);

  // NEW: Function to get the current exercise (either original or modified)
  const getCurrentExercise = (dayIndex, exerciseIndex) => {
    const dayKey = `${dayIndex}-${exerciseIndex}`;
    if (modifiedWorkouts[dayKey]) {
      return modifiedWorkouts[dayKey];
    }
    return currentPlan[dayIndex]?.workouts?.[exerciseIndex];
  };

  // NEW: Function to toggle alternatives visibility for an exercise
  const toggleAlternatives = async (exerciseIndex) => {
    setShowAlternatives(prev => ({
      ...prev,
      [exerciseIndex]: !prev[exerciseIndex]
    }));

    // Load alternatives when showing them
    if (!showAlternatives[exerciseIndex]) {
      const currentExercise = getCurrentExercise(currentDay, exerciseIndex);
      await loadAlternativeImages(currentExercise, exerciseIndex);
    }
  };

  // NEW: Function to get alternatives for an exercise
  const getExerciseAlternatives = (exercise) => {
    return findExerciseAlternatives(exercise.name, null, 'beginner');
  };

  // NEW: Function to load alternative images
  const loadAlternativeImages = async (exercise, exerciseIndex) => {
    setLoadingAlternatives(prev => ({ ...prev, [exerciseIndex]: true }));
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setLoadingAlternatives(prev => ({ ...prev, [exerciseIndex]: false }));
    }, 500);
  };

  // NEW: Function to replace an exercise with an alternative
  const replaceExercise = (dayIndex, exerciseIndex, alternativeExercise) => {
    const dayKey = `${dayIndex}-${exerciseIndex}`;
    
    // Create the new exercise object with the same structure but with alternative data
    const newExercise = {
      ...alternativeExercise,
      sets: alternativeExercise.sets || currentPlan[dayIndex].workouts[exerciseIndex].sets,
      reps: alternativeExercise.reps || currentPlan[dayIndex].workouts[exerciseIndex].reps,
      rest: alternativeExercise.rest || currentPlan[dayIndex].workouts[exerciseIndex].rest,
      type: alternativeExercise.type || currentPlan[dayIndex].workouts[exerciseIndex].type
    };

    // Track alternative history
    setAlternativeHistory(prev => {
      const historyKey = `${dayIndex}-${exerciseIndex}`;
      const currentHistory = prev[historyKey] || [];
      const originalExercise = modifiedWorkouts[dayKey] || currentPlan[dayIndex].workouts[exerciseIndex];
      
      return {
        ...prev,
        [historyKey]: [...currentHistory, originalExercise]
      };
    });

    // Update the modified workouts state
    setModifiedWorkouts(prev => ({
      ...prev,
      [dayKey]: newExercise
    }));

    // Hide the alternatives section
    setShowAlternatives(prev => ({
      ...prev,
      [exerciseIndex]: false
    }));

    // Reset completion status for this exercise since it's been changed
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      newSet.delete(exerciseIndex);
      return newSet;
    });
    
    setCompletedSetsCount(prev => ({
      ...prev,
      [exerciseIndex]: 0
    }));
  };

  // NEW: Function to revert to previous exercise version
  const revertExercise = (dayIndex, exerciseIndex) => {
    const dayKey = `${dayIndex}-${exerciseIndex}`;
    const historyKey = `${dayIndex}-${exerciseIndex}`;
    
    setAlternativeHistory(prev => {
      const currentHistory = prev[historyKey] || [];
      if (currentHistory.length === 0) return prev;
      
      const previousExercise = currentHistory[currentHistory.length - 1];
      const newHistory = currentHistory.slice(0, -1);
      
      // Update modified workouts with previous exercise
      setModifiedWorkouts(prevWorkouts => {
        if (newHistory.length === 0) {
          const { [dayKey]: removed, ...rest } = prevWorkouts;
          return rest;
        } else {
          return {
            ...prevWorkouts,
            [dayKey]: previousExercise
          };
        }
      });

      // Reset completion status
      setCompletedExercises(prev => {
        const newSet = new Set(prev);
        newSet.delete(exerciseIndex);
        return newSet;
      });
      
      setCompletedSetsCount(prev => ({
        ...prev,
        [exerciseIndex]: 0
      }));

      return {
        ...prev,
        [historyKey]: newHistory
      };
    });
  };

  // NEW: Function to get alternative history for an exercise
  const getAlternativeHistory = (dayIndex, exerciseIndex) => {
    const historyKey = `${dayIndex}-${exerciseIndex}`;
    return alternativeHistory[historyKey] || [];
  };

  // Timer effects
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (isCountdownRunning && countdownTime > 0) {
      countdownTimerRef.current = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isCountdownRunning && countdownTime === 0) {
      clearInterval(countdownTimerRef.current);
      setIsCountdownRunning(false);
    } else if (!isCountdownRunning && countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    return () => clearInterval(countdownTimerRef.current);
  }, [isCountdownRunning, countdownTime]);

  // Function to get workouts for the selected day (for overview mode)
  const getWorkoutsForSelectedDay = () => {
    if (!selectedDay || !currentPlan || currentPlan.length === 0) return [];
    
    const dayData = currentPlan.find(day => day.day === selectedDay);
    if (!dayData || !dayData.workouts) return [];
    
    // Return modified workouts if they exist for this day
    return dayData.workouts.map((exercise, index) => {
      const dayIndex = currentPlan.findIndex(day => day.day === selectedDay);
      const dayKey = `${dayIndex}-${index}`;
      return modifiedWorkouts[dayKey] || exercise;
    });
  };

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeExerciseModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  const handleRemoveWorkout = async () => {
    if (!selectedDay || appliedWorkouts.length === 0 || !userId) return;
    
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedWorkouts = [...(userData.appliedWorkouts || [])];
        const workoutPlanIndex = updatedWorkouts.findIndex(w => w.id === selectedAppliedWorkout.id);
        
        if (workoutPlanIndex !== -1) {
          const workoutPlan = updatedWorkouts[workoutPlanIndex];
          
          // Remove workouts for the selected day
          const dayIndex = workoutPlan.days.findIndex(day => day.day === selectedDay);
          if (dayIndex !== -1) {
            workoutPlan.days[dayIndex].workouts = [];
            
            // Update Firestore
            await updateDoc(userDocRef, {
              appliedWorkouts: updatedWorkouts
            });
            
            setAppliedWorkouts(updatedWorkouts);
            
            // Update selected applied workout
            setSelectedAppliedWorkout(workoutPlan);
          }
        }
      }
    } catch (error) {
      console.error('Error removing workout:', error);
    }
  };

  // Get available days with workouts (for overview mode)
  const getAvailableDays = () => {
    if (!currentPlan || currentPlan.length === 0) return [];
    
    return currentPlan
      .filter(day => day.workouts && day.workouts.length > 0)
      .map(day => day.day);
  };

  if (!currentPlan || currentPlan.length === 0 || (selectedAppliedWorkout && selectedAppliedWorkout.days.every(day => !day.workouts || day.workouts.length === 0))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 md:mb-3 tracking-tighter">
            MY WORKOUT PLAN
          </h1>
          <p className="text-base md:text-2xl text-green-300 max-w-3xl mx-auto leading-relaxed font-medium">
            YOUR PERSONALIZED TRAINING SCHEDULE
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="p-6 md:p-8">
              <div className="text-center py-12 md:py-16">
                <div className="text-6xl md:text-8xl mb-4 md:mb-6">💪</div>
                <h3 className="text-xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-3 md:mb-4">NO WORKOUTS APPLIED YET</h3>
                <p className="text-green-400/80 text-sm md:text-lg mb-6 md:mb-8">
                  {appliedWorkouts.length > 0 ? 
                    "Select an applied workout or visit the Influencers section to browse and apply professional workout programs!" :
                    "Visit the Influencers section to browse and apply professional workout programs!"
                  }
                </p>
                {appliedWorkouts.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <select
                      value={selectedAppliedWorkout ? selectedAppliedWorkout.id : ""}
                      onChange={(e) => {
                        const workout = appliedWorkouts.find(w => w.id === parseInt(e.target.value));
                        setSelectedAppliedWorkout(workout);
                        setCurrentDay(0);
                        setCompletedExercises(new Set());
                        setCompletedSetsCount({});
                        setTime(0);
                        setIsRunning(false);
                      }}
                      className="bg-gray-700/80 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto"
                    >
                      <option value="">Select Applied Workout</option>
                      {appliedWorkouts.map((workout) => (
                        <option key={workout.id} value={workout.id}>
                          {workout.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button 
                  onClick={() => window.location.href = '/influencers'}
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm md:text-base border border-green-600/30 w-full md:w-auto"
                >
                  BROWSE WORKOUT PROGRAMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toggleExercise = (index) => {
    if (expandedExercise === index) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(index);
    }
  };

  const handleCompleteExercise = (index) => {
    setCompletedExercises((prev) => new Set(prev).add(index));
  };

  const handleRestartExercise = (index) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    setCompletedSetsCount(prev => ({
        ...prev,
        [index]: 0
    }));
  };

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleCompleteSet = (exerciseIndex, restTime) => {
    const newCount = (completedSetsCount[exerciseIndex] || 0) + 1;
    setCompletedSetsCount(prev => ({
        ...prev,
        [exerciseIndex]: newCount
    }));

    const totalSets = getCurrentExercise(currentDay, exerciseIndex).sets;
    
    if (newCount < totalSets) {
        const seconds = parseInt(restTime, 10);
        if (!isNaN(seconds) && seconds > 0) {
            setCountdownTime(seconds);
            setIsCountdownRunning(true);
        }
    } else {
        handleCompleteExercise(exerciseIndex);
    }
  };

  // New function to stop the countdown
  const handleStopCountdown = () => {
      setIsCountdownRunning(false);
      setCountdownTime(0);
  };

  // UPDATED: Function to complete the current day and move workout to progress tracker
  const handleCompleteDay = async () => {
    const currentWorkout = currentPlan[currentDay];
    const completedExercisesData = currentWorkout.workouts
      .filter((_, index) => completedExercises.has(index))
      .map((exercise, index) => {
        const currentExercise = getCurrentExercise(currentDay, index);
        return {
          name: currentExercise.name,
          sets: currentExercise.sets,
          reps: currentExercise.reps
        };
      });

    if (completedExercisesData.length > 0 && userId) {
      const totalSets = completedExercisesData.reduce((total, exercise) => total + exercise.sets, 0);
      
      const newCompletedWorkout = {
        dayName: currentWorkout.day,
        completionDate: new Date().toLocaleDateString(),
        completionTime: new Date().toLocaleTimeString(),
        duration: formatTime(time),
        exercises: completedExercisesData,
        totalSets: totalSets,
        isPartial: false,
        timestamp: new Date().toISOString()
      };

      // Call the parent callback to notify about completed workout
      if (onWorkoutComplete) {
        onWorkoutComplete(newCompletedWorkout);
      }
      
      try {
        const userDocRef = doc(db, 'users', userId);
        
        // Update progress in Firestore
        await updateDoc(userDocRef, {
          workoutHistory: arrayUnion(newCompletedWorkout),
          lastCompletedWorkout: newCompletedWorkout
        });
        
        // NEW: Remove the completed day from the workout plan
        if (selectedAppliedWorkout) {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedAppliedWorkouts = [...(userData.appliedWorkouts || [])];
            
            const updatedWorkouts = updatedAppliedWorkouts.map(workout => {
              if (workout.id === selectedAppliedWorkout.id) {
                // Remove the completed day from the plan
                const updatedDays = workout.days.filter(day => day.day !== currentWorkout.day);
                return { ...workout, days: updatedDays };
              }
              return workout;
            });
            
            // Update applied workouts in Firestore
            await updateDoc(userDocRef, {
              appliedWorkouts: updatedWorkouts
            });
            
            setAppliedWorkouts(updatedWorkouts);
            
            // Update selected workout
            const updatedSelectedWorkout = updatedWorkouts.find(w => w.id === selectedAppliedWorkout.id);
            setSelectedAppliedWorkout(updatedSelectedWorkout);
            
            // Reset to first available day or show empty state
            if (updatedSelectedWorkout && updatedSelectedWorkout.days.length > 0) {
              setCurrentDay(0);
            } else {
              // All workouts completed, show empty state
              setSelectedAppliedWorkout(null);
            }
          }
        }
        
        // Reset for next day
        setCompletedExercises(new Set());
        setCompletedSetsCount({});
        setTime(0);
        setIsRunning(false);
        
      } catch (error) {
        console.error('Error completing workout:', error);
      }
    }
  };

  // New function to reset the current day
  const handleResetDay = () => {
    setCompletedExercises(new Set());
    setCompletedSetsCount({});
    setTime(0);
    setIsRunning(false);
  };

  // New function to remove applied workout
  const handleRemoveAppliedWorkout = async (workoutId) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedWorkouts = (userData.appliedWorkouts || []).filter(w => w.id !== workoutId);
        
        await updateDoc(userDocRef, {
          appliedWorkouts: updatedWorkouts
        });
        
        setAppliedWorkouts(updatedWorkouts);
        
        if (selectedAppliedWorkout && selectedAppliedWorkout.id === workoutId) {
          setSelectedAppliedWorkout(updatedWorkouts.length > 0 ? updatedWorkouts[0] : null);
          setCurrentDay(0);
          setCompletedExercises(new Set());
          setCompletedSetsCount({});
          setTime(0);
          setIsRunning(false);
        }
      }
    } catch (error) {
      console.error('Error removing applied workout:', error);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getExerciseDetails = (exercise) => {
    const details = {
      description:
        exercise.description ||
        "This exercise targets multiple muscle groups for overall strength development.",
      properForm: [],
      commonMistakes: [],
      equipment: "Barbell/Dumbbells",
      difficulty: "Intermediate",
      targetMuscles: ["Multiple muscle groups"],
    };

    if (exercise.description) {
      details.description = exercise.description;
    }

    details.properForm = [
      "Maintain proper posture throughout the movement",
      "Control the weight through the full range of motion",
      "Breathe consistently during the exercise",
    ];

    details.commonMistakes = [
      "Using momentum instead of muscle control",
      "Not using full range of motion",
      "Holding your breath during exertion",
    ];

    if (exercise.name.toLowerCase().includes("bench press")) {
      details.description =
        "The bench press is a compound exercise that primarily targets the chest, shoulders, and triceps. It's one of the most effective upper body exercises for building strength and muscle mass.";
      details.properForm = [
        "Lie flat on the bench with feet firmly on the floor",
        "Grip the bar slightly wider than shoulder-width",
        "Lower the bar to your mid-chest with control",
        "Keep your elbows at about a 45-degree angle from your body",
        "Press the bar back up explosively while keeping your back flat on the bench",
      ];
      details.commonMistakes = [
        "Bouncing the bar off your chest",
        "Flaring elbows out at 90 degrees",
        "Lifting your hips off the bench",
        "Not going through the full range of motion",
      ];
      details.equipment = "Barbell, Bench";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Chest", "Shoulders", "Triceps"];
    } else if (exercise.name.toLowerCase().includes("squat")) {
      details.description =
        "Squats are a fundamental lower body exercise that targets the quadriceps, glutes, hamstrings, and core. They are essential for building leg strength and improving functional movement.";
      details.properForm = [
        "Stand with feet shoulder-width apart or slightly wider",
        "Keep your chest up and back straight throughout the movement",
        "Initiate the movement by pushing your hips back first",
        "Lower yourself until your thighs are at least parallel to the floor",
        "Keep your knees in line with your toes during descent and ascent",
        "Drive through your heels to return to the starting position",
      ];
      details.commonMistakes = [
        "Letting your knees cave inward",
        "Rounding your lower back",
        "Lifting your heels off the ground",
        "Not going deep enough in the squat",
      ];
      details.equipment = "Barbell";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings", "Core"];
    } else if (exercise.name.toLowerCase().includes("deadlift")) {
      details.description =
        "The deadlift is a compound exercise that works the entire posterior chain, including the back, glutes, and hamstrings. It's one of the best exercises for overall strength development.";
      details.properForm = [
        "Stand with feet hip-width apart, barbell over mid-foot",
        "Bend at the hips and knees to grip the bar",
        "Keep your back straight and chest up throughout the movement",
        "Take a deep breath and brace your core",
        "Drive through your heels to lift the bar, keeping it close to your body",
        "Stand up straight at the top without hyperextending your back",
        "Lower the bar with control by hinging at the hips",
      ];
      details.commonMistakes = [
        "Rounding your back during the lift",
        "Pulling with your arms instead of driving with your legs",
        "Letting the bar drift away from your body",
        "Hyperextending your back at the top of the movement",
      ];
      details.equipment = "Barbell";
      details.difficulty = "Advanced";
      details.targetMuscles = ["Back", "Glutes", "Hamstrings", "Forearms"];
    } else if (
      exercise.name.toLowerCase().includes("shoulder press") ||
      exercise.name.toLowerCase().includes("overhead press")
    ) {
      details.description =
        "The shoulder press is a compound upper body exercise that primarily targets the deltoids, with secondary involvement from the triceps and upper chest.";
      details.properForm = [
        "Sit or stand with your back straight and core engaged",
        "Hold the weights at shoulder height with palms facing forward",
        "Press the weights overhead until your arms are fully extended",
        "Keep your head in a neutral position - don't jut it forward",
        "Lower the weights with control back to shoulder height",
      ];
      details.commonMistakes = [
        "Arching your back excessively",
        "Pushing your head forward instead of moving around it",
        "Using leg drive when performing strict presses",
        "Not fully extending arms at the top of the movement",
      ];
      details.equipment = "Barbell/Dumbbells";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Shoulders", "Triceps", "Upper Chest"];
    } else if (
      exercise.name.toLowerCase().includes("pull-up") ||
      exercise.name.toLowerCase().includes("chin-up")
    ) {
      details.description =
        "Pull-ups are a fundamental upper body exercise that targets the back muscles, particularly the latissimus dorsi, as well as the biceps and core.";
      details.properForm = [
        "Grip the bar with hands slightly wider than shoulder-width",
        "Hang with arms fully extended and engage your shoulder blades",
        "Pull yourself up until your chin clears the bar",
        "Focus on driving your elbows down toward your hips",
        "Lower yourself with control until your arms are fully extended",
      ];
      details.commonMistakes = [
        "Using momentum instead of muscle strength",
        "Not achieving full range of motion",
        "Shrugging shoulders at the top of the movement",
        "Kipping or swinging excessively",
      ];
      details.equipment = "Pull-up Bar";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Back", "Biceps", "Core"];
    } else if (exercise.name.toLowerCase().includes("bicep curl")) {
      details.description =
        "Bicep curls isolate the biceps brachii muscle, helping to develop arm strength and size. They can be performed with various equipment like dumbbells, barbells, or cables.";
      details.properForm = [
        "Stand or sit with your back straight and core engaged",
        "Keep your elbows close to your torso throughout the movement",
        "Curl the weight up toward your shoulders",
        "Squeeze your biceps at the top of the movement",
        "Lower the weight with control, resisting gravity on the way down",
      ];
      details.commonMistakes = [
        "Swinging the weights using momentum",
        "Moving your elbows away from your body",
        "Not fully extending arms at the bottom",
        "Using weights that are too heavy, compromising form",
      ];
      details.equipment = "Dumbbells/Barbell";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Biceps"];
    } else if (exercise.name.toLowerCase().includes("tricep")) {
      details.description =
        "Tricep exercises target the triceps brachii muscle at the back of the upper arm, which makes up about two-thirds of your arm mass.";
      details.properForm = [
        "Maintain proper posture with your core engaged",
        "Keep your elbows positioned correctly for the specific tricep exercise",
        "Extend your arms fully without locking out elbows excessively",
        "Control the weight throughout the entire range of motion",
        "Focus on feeling the contraction in your triceps",
      ];
      details.commonMistakes = [
        "Flaring elbows out during movements like pushdowns",
        "Using too much weight and compromising form",
        "Not achieving full extension",
        "Moving other body parts to assist the movement",
      ];
      details.equipment = "Cable Machine/Dumbbells";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Triceps"];
    } else if (exercise.name.toLowerCase().includes("row")) {
      details.description =
        "Rowing exercises target the muscles of the back, including the latissimus dorsi, rhomboids, and trapezius, helping to improve posture and upper body strength.";
      details.properForm = [
        "Maintain a neutral spine throughout the movement",
        "Pull the weight toward your torso, squeezing your shoulder blades together",
        "Keep your elbows close to your body",
        "Control the weight on the eccentric portion of the movement",
        "Avoid using momentum to move the weight",
      ];
      details.commonMistakes = [
        "Rounding your back during the movement",
        "Pulling with your arms instead of your back muscles",
        "Using excessive weight that compromises form",
        "Shrugging your shoulders instead of retracting scapulae",
      ];
      details.equipment = "Barbell/Dumbbells/Cable Machine";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Back", "Biceps", "Rear Shoulders"];
    } else if (exercise.name.toLowerCase().includes("lunge")) {
      details.description =
        "Lunges are a unilateral lower body exercise that targets the quadriceps, glutes, and hamstrings while also challenging balance and stability.";
      details.properForm = [
        "Stand tall with your feet hip-width apart",
        "Step forward with one leg, lowering your hips until both knees are bent at 90-degree angles",
        "Keep your front knee directly above your ankle",
        "Lower your back knee toward the floor without touching it",
        "Push through the heel of your front foot to return to the starting position",
      ];
      details.commonMistakes = [
        "Letting your front knee extend past your toes",
        "Leaning too far forward during the movement",
        "Not stepping out far enough, causing poor alignment",
        "Rushing through the movement without control",
      ];
      details.equipment = "Bodyweight/Dumbbells";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings"];
    } else if (exercise.name.toLowerCase().includes("leg press")) {
      details.description =
        "The leg press is a machine exercise that targets the quadriceps, glutes, and hamstrings with less spinal loading than squats.";
      details.properForm = [
        "Sit in the machine with your back flat against the pad",
        "Place your feet shoulder-width apart on the platform",
        "Push the platform away by extending your knees and hips",
        "Lower the weight with control until your knees form a 90-degree angle",
        "Keep your knees in line with your feet throughout the movement",
      ];
      details.commonMistakes = [
        "Lowering the weight too far and rounding your lower back",
        "Locking out your knees at the top of the movement",
        "Placing your feet too high or too low on the platform",
        "Using too much weight and compromising form",
      ];
      details.equipment = "Leg Press Machine";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings"];
    } else if (exercise.name.toLowerCase().includes("lat pulldown")) {
      details.description =
        "Lat pulldowns target the latissimus dorsi muscles of the back, helping to develop width and strength in the upper body.";
      details.properForm = [
        "Sit at the machine with your thighs secured under the pads",
        "Grip the bar slightly wider than shoulder-width",
        "Lean back slightly and pull the bar down to your upper chest",
        "Squeeze your shoulder blades together at the bottom of the movement",
        "Return the bar to the starting position with control",
      ];
      details.commonMistakes = [
        "Using momentum by swinging your body",
        "Pulling the bar behind your neck (can be dangerous)",
        "Not achieving full range of motion",
        "Shrugging your shoulders instead of using your back muscles",
      ];
      details.equipment = "Cable Machine";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Latissimus Dorsi", "Biceps", "Rear Shoulders"];
    } else if (exercise.name.toLowerCase().includes("calf raise")) {
      details.description =
        "Calf raises target the gastrocnemius and soleus muscles of the lower leg, helping to develop calf size and strength.";
      details.properForm = [
        "Stand with the balls of your feet on a raised surface",
        "Hold onto something for balance if needed",
        "Raise your heels as high as possible by extending your ankles",
        "Squeeze your calves at the top of the movement",
        "Lower your heels below the level of the platform for a full stretch",
      ];
      details.commonMistakes = [
        "Not using full range of motion",
        "Bouncing at the bottom of the movement",
        "Bending knees during the exercise",
        "Using too much weight and compromising form",
      ];
      details.equipment = "Bodyweight/Machine/Dumbbells";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Calves"];
    }

    return details;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans p-4 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 md:mb-3 tracking-tighter">
          MY WORKOUT PLAN
        </h1>
        <p className="text-base md:text-2xl text-green-300 max-w-3xl mx-auto leading-relaxed font-medium">
          YOUR PERSONALIZED TRAINING SCHEDULE
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* View Mode Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 md:gap-0">
          <div className="flex space-x-2 md:space-x-4">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'interactive'
                  ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-2xl transform scale-105'
                  : 'bg-gray-800/50 text-green-300 hover:bg-gray-700/50 border border-gray-600/50'
              } text-sm md:text-base`}
            >
              Interactive Mode
            </button>
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'overview'
                  ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-2xl transform scale-105'
                  : 'bg-gray-800/50 text-green-300 hover:bg-gray-700/50 border border-gray-600/50'
              } text-sm md:text-base`}
            >
              Overview Mode
            </button>
          </div>

          {/* Applied Workout Selector */}
          {appliedWorkouts.length > 0 && (
            <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
              <select
                value={selectedAppliedWorkout ? selectedAppliedWorkout.id : ""}
                onChange={(e) => {
                  const workout = appliedWorkouts.find(w => w.id === parseInt(e.target.value));
                  setSelectedAppliedWorkout(workout);
                  setCurrentDay(0);
                  setCompletedExercises(new Set());
                  setCompletedSetsCount({});
                  setTime(0);
                  setIsRunning(false);
                }}
                className="bg-gray-700/80 border border-gray-600 text-white rounded-xl px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto text-sm md:text-base"
              >
                <option value="">Select Applied Workout</option>
                {appliedWorkouts.map((workout) => (
                  <option key={workout.id} value={workout.id}>
                    {workout.name}
                  </option>
                ))}
              </select>
              
              {selectedAppliedWorkout && (
                <button
                  onClick={() => handleRemoveAppliedWorkout(selectedAppliedWorkout.id)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-red-500/30 text-sm md:text-base whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>

        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 mb-6 md:mb-8">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4 md:gap-0">
                <h2 className="text-xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  WORKOUT OVERVIEW
                </h2>
                
                {/* Day Selector */}
                <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
                  <select
                    value={selectedDay || ''}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="bg-gray-700/80 border border-gray-600 text-white rounded-xl px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto text-sm md:text-base"
                  >
                    <option value="">Select Day</option>
                    {getAvailableDays().map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  
                  {selectedDay && (
                    <button
                      onClick={handleRemoveWorkout}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-red-500/30 text-sm md:text-base whitespace-nowrap"
                    >
                      Remove Day
                    </button>
                  )}
                </div>
              </div>

              {selectedDay ? (
                <div className="space-y-4 md:space-y-6">
                  {getWorkoutsForSelectedDay().map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-600/30"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
                        <div className="flex-1">
                          <h3 className="text-lg md:text-2xl font-black text-green-300 mb-1 md:mb-2">
                            {exercise.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-sm md:text-base">
                            <span className="bg-gray-600/50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                              {exercise.sets} sets
                            </span>
                            <span className="bg-gray-600/50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                              {exercise.reps} reps
                            </span>
                            {exercise.rest && (
                              <span className="bg-gray-600/50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                                {exercise.rest} rest
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => openExerciseModal(exercise)}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-green-500/30 text-sm md:text-base whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">📋</div>
                  <h3 className="text-lg md:text-2xl font-black text-green-300 mb-2 md:mb-3">
                    SELECT A DAY TO VIEW WORKOUTS
                  </h3>
                  <p className="text-green-400/80 text-sm md:text-base">
                    Choose a day from the dropdown above to see the scheduled workouts
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interactive Mode */}
        {viewMode === 'interactive' && (
          <>
            {/* Day Navigation */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 mb-6 md:mb-8">
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 gap-4 md:gap-0">
                  <h2 className="text-xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                    {currentPlan[currentDay]?.day || "WORKOUT DAY"}
                  </h2>
                  
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <button
                      onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
                      disabled={currentDay === 0}
                      className="bg-gray-700/80 hover:bg-gray-600/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-gray-600 text-sm md:text-base"
                    >
                      Previous
                    </button>
                    <span className="text-green-300 font-black text-sm md:text-base">
                      Day {currentDay + 1} of {currentPlan.length}
                    </span>
                    <button
                      onClick={() => setCurrentDay(Math.min(currentPlan.length - 1, currentDay + 1))}
                      disabled={currentDay === currentPlan.length - 1}
                      className="bg-gray-700/80 hover:bg-gray-600/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-gray-600 text-sm md:text-base"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700/50 rounded-full h-2 md:h-3 mb-4 md:mb-6">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 md:h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedExercises.size / (currentPlan[currentDay]?.workouts?.length || 1)) * 100}%`,
                    }}
                  ></div>
                </div>

                <p className="text-green-400/80 text-sm md:text-base">
                  {completedExercises.size} of {currentPlan[currentDay]?.workouts?.length || 0} exercises completed
                </p>
              </div>
            </div>

            {/* Timer Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 mb-6 md:mb-8">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-2xl font-black text-green-300 mb-4 md:mb-6 text-center">
                  WORKOUT TIMER
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
                  <div className="text-center md:text-left">
                    <div className="text-3xl md:text-5xl font-black text-white mb-2">
                      {formatTime(time)}
                    </div>
                    <p className="text-green-400/80 text-sm md:text-base">Total Duration</p>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end space-y-3 md:space-y-4">
                    <div className="flex space-x-2 md:space-x-4">
                      <button
                        onClick={handleStartTimer}
                        disabled={isRunning}
                        className="bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50 text-green-400 px-4 py-2 md:px-6 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-green-500/30 text-sm md:text-base"
                      >
                        Start
                      </button>
                      <button
                        onClick={handleStopTimer}
                        disabled={!isRunning}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 disabled:opacity-50 text-yellow-400 px-4 py-2 md:px-6 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-yellow-500/30 text-sm md:text-base"
                      >
                        Pause
                      </button>
                      <button
                        onClick={handleResetTimer}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 md:px-6 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-red-500/30 text-sm md:text-base"
                      >
                        Reset
                      </button>
                    </div>
                    
                    {/* Countdown Timer */}
                    {countdownTime > 0 && (
                      <div className="text-center">
                        <div className="text-xl md:text-3xl font-black text-yellow-400 mb-1">
                          {formatTime(countdownTime)}
                        </div>
                        <p className="text-yellow-400/80 text-sm">Rest Time</p>
                        <button
                          onClick={handleStopCountdown}
                          className="mt-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 md:px-4 md:py-2 rounded-lg font-black uppercase tracking-wider transition-all duration-300 border border-red-500/30 text-xs md:text-sm"
                        >
                          Skip Rest
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Exercises */}
            <div className="space-y-4 md:space-y-6">
              {currentPlan[currentDay]?.workouts?.map((exercise, index) => {
                const currentExercise = getCurrentExercise(currentDay, index);
                const exerciseDetails = getExerciseDetails(currentExercise);
                const alternatives = getExerciseAlternatives(currentExercise);
                const hasHistory = getAlternativeHistory(currentDay, index).length > 0;
                
                return (
                  <div
                    key={index}
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border transition-all duration-500 ${
                      completedExercises.has(index)
                        ? "border-green-500/50"
                        : "border-gray-700/50"
                    }`}
                  >
                    <div className="p-4 md:p-6">
                      {/* Exercise Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3 md:gap-0">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 md:mb-3">
                            <h3 className="text-lg md:text-2xl font-black text-green-300">
                              {currentExercise.name}
                            </h3>
                            {completedExercises.has(index) && (
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 md:px-3 md:py-2 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider border border-green-500/30">
                                Completed
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-sm md:text-base">
                            <span className="bg-gray-700/50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                              {currentExercise.sets} sets
                            </span>
                            <span className="bg-gray-700/50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                              {currentExercise.reps} reps
                            </span>
                            {currentExercise.rest && (
                              <span className="bg-gray-700/50 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                                {currentExercise.rest} rest
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 md:space-x-4">
                          {/* Alternative History Button */}
                          {hasHistory && (
                            <button
                              onClick={() => revertExercise(currentDay, index)}
                              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-blue-500/30 text-sm md:text-base"
                              title="Revert to previous exercise"
                            >
                              ↶
                            </button>
                          )}
                          
                          {/* Alternatives Button */}
                          {alternatives.length > 0 && (
                            <button
                              onClick={() => toggleAlternatives(index)}
                              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-purple-500/30 text-sm md:text-base"
                            >
                              Alternatives
                            </button>
                          )}
                          
                          {/* Details Button */}
                          <button
                            onClick={() => openExerciseModal(currentExercise)}
                            className="bg-gray-700/80 hover:bg-gray-600/80 text-white px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-gray-600 text-sm md:text-base"
                          >
                            Details
                          </button>
                          
                          {/* Complete/Restart Button */}
                          {!completedExercises.has(index) ? (
                            <button
                              onClick={() => handleCompleteExercise(index)}
                              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-green-500/30 text-sm md:text-base"
                            >
                              Complete
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestartExercise(index)}
                              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border border-yellow-500/30 text-sm md:text-base"
                            >
                              Restart
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Progress for current exercise */}
                      {!completedExercises.has(index) && (
                        <div className="mb-4 md:mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-green-400/80 text-sm md:text-base">
                              Sets completed: {completedSetsCount[index] || 0} / {currentExercise.sets}
                            </span>
                            <span className="text-green-400/80 text-sm md:text-base">
                              {Math.round(((completedSetsCount[index] || 0) / currentExercise.sets) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700/50 rounded-full h-2 md:h-3">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 md:h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${((completedSetsCount[index] || 0) / currentExercise.sets) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Set Completion Buttons */}
                      {!completedExercises.has(index) && (
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                          {Array.from({ length: currentExercise.sets }).map((_, setIndex) => (
                            <button
                              key={setIndex}
                              onClick={() => handleCompleteSet(index, currentExercise.rest)}
                              disabled={(completedSetsCount[index] || 0) > setIndex}
                              className={`px-3 py-2 md:px-4 md:py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 border text-sm md:text-base ${
                                (completedSetsCount[index] || 0) > setIndex
                                  ? "bg-green-500/20 border-green-500/30 text-green-400"
                                  : "bg-gray-700/80 border-gray-600 text-white hover:bg-gray-600/80"
                              }`}
                            >
                              Set {setIndex + 1}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Alternatives Section */}
                      {showAlternatives[index] && alternatives.length > 0 && (
                        <div className="mt-4 md:mt-6 p-4 md:p-6 bg-gray-700/30 rounded-xl md:rounded-2xl border border-gray-600/30">
                          <h4 className="text-lg md:text-xl font-black text-purple-300 mb-3 md:mb-4">
                            ALTERNATIVE EXERCISES
                          </h4>
                          
                          {loadingAlternatives[index] ? (
                            <div className="text-center py-4 md:py-6">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
                              <p className="text-purple-400/80 mt-2 text-sm md:text-base">Loading alternatives...</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                              {alternatives.slice(0, 6).map((alternative, altIndex) => (
                                <div
                                  key={altIndex}
                                  className="bg-gray-600/30 rounded-xl p-3 md:p-4 border border-gray-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                                  onClick={() => replaceExercise(currentDay, index, alternative)}
                                >
                                  <div className="flex flex-col items-center text-center">
                                    <WorkoutImage 
                                      exerciseName={alternative.name} 
                                      className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3 rounded-lg group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <h5 className="font-black text-purple-300 text-sm md:text-base mb-1 md:mb-2">
                                      {alternative.name}
                                    </h5>
                                    <div className="flex flex-wrap justify-center gap-1 md:gap-2 text-xs md:text-sm">
                                      <span className="bg-gray-500/50 px-2 py-1 rounded">
                                        {alternative.sets || currentExercise.sets} sets
                                      </span>
                                      <span className="bg-gray-500/50 px-2 py-1 rounded">
                                        {alternative.reps || currentExercise.reps} reps
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-purple-400/80 text-center mt-3 md:mt-4 text-sm md:text-base">
                            Click on an alternative to replace the current exercise
                          </p>
                        </div>
                      )}

                      {/* Exercise Image */}
                      <div className="mt-4 md:mt-6 flex justify-center">
                        <WorkoutImage 
                          exerciseName={currentExercise.name} 
                          className="w-32 h-32 md:w-48 md:h-48 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-gray-600/50"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 gap-4 md:gap-0">
              <button
                onClick={handleResetDay}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 border border-red-500/30 w-full md:w-auto text-sm md:text-base"
              >
                Reset Day
              </button>
              
              <button
                onClick={handleCompleteDay}
                disabled={completedExercises.size === 0}
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl w-full md:w-auto text-sm md:text-base border border-green-600/30"
              >
                Complete Day
              </button>
            </div>
          </>
        )}
      </div>

      {/* Exercise Details Modal */}
      {isModalOpen && selectedExercise && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-xl md:text-3xl font-black text-green-300">
                  {selectedExercise.name}
                </h3>
                <button
                  onClick={closeExerciseModal}
                  className="text-gray-400 hover:text-white text-2xl md:text-3xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {/* Exercise Image */}
                <div className="flex justify-center">
                  <WorkoutImage 
                    exerciseName={selectedExercise.name} 
                    className="w-48 h-48 md:w-64 md:h-64 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-gray-600/50"
                  />
                </div>
                
                {/* Exercise Details */}
                <div className="bg-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <h4 className="text-lg md:text-xl font-black text-green-300 mb-3 md:mb-4">
                    EXERCISE DETAILS
                  </h4>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h5 className="font-black text-white mb-1 md:mb-2 text-sm md:text-base">DESCRIPTION</h5>
                      <p className="text-green-400/80 text-sm md:text-base">
                        {getExerciseDetails(selectedExercise).description}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-black text-white mb-1 md:mb-2 text-sm md:text-base">PROPER FORM</h5>
                      <ul className="list-disc list-inside space-y-1 text-green-400/80 text-sm md:text-base">
                        {getExerciseDetails(selectedExercise).properForm.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-black text-white mb-1 md:mb-2 text-sm md:text-base">COMMON MISTAKES</h5>
                      <ul className="list-disc list-inside space-y-1 text-red-400/80 text-sm md:text-base">
                        {getExerciseDetails(selectedExercise).commonMistakes.map((mistake, index) => (
                          <li key={index}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      <div className="bg-gray-600/50 rounded-lg p-3 md:p-4">
                        <h6 className="font-black text-white text-sm md:text-base mb-1">EQUIPMENT</h6>
                        <p className="text-green-400/80 text-sm md:text-base">{getExerciseDetails(selectedExercise).equipment}</p>
                      </div>
                      <div className="bg-gray-600/50 rounded-lg p-3 md:p-4">
                        <h6 className="font-black text-white text-sm md:text-base mb-1">DIFFICULTY</h6>
                        <p className="text-green-400/80 text-sm md:text-base">{getExerciseDetails(selectedExercise).difficulty}</p>
                      </div>
                      <div className="bg-gray-600/50 rounded-lg p-3 md:p-4">
                        <h6 className="font-black text-white text-sm md:text-base mb-1">TARGET MUSCLES</h6>
                        <p className="text-green-400/80 text-sm md:text-base">
                          {getExerciseDetails(selectedExercise).targetMuscles.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;