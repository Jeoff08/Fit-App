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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans p-4">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 tracking-tight">
            MY WORKOUT PLAN
          </h1>
          <p className="text-sm text-green-300 max-w-3xl mx-auto leading-relaxed font-medium">
            YOUR PERSONALIZED TRAINING SCHEDULE
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50">
            <div className="p-4">
              <div className="text-center py-8">
                <div className="text-5xl mb-3">💪</div>
                <h3 className="text-lg font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">
                  NO WORKOUTS APPLIED YET
                </h3>
                <p className="text-green-400/80 text-xs mb-4">
                  {appliedWorkouts.length > 0 ? 
                    "Select an applied workout or visit the Influencers section to browse and apply professional workout programs!" :
                    "Visit the Influencers section to browse and apply professional workout programs!"
                  }
                </p>
                {appliedWorkouts.length > 0 && (
                  <div className="mb-4">
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
                      className="bg-gray-700/80 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
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
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-3 rounded-lg font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg text-xs border border-green-600/30 w-full"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2 tracking-tight">
          MY WORKOUT PLAN
        </h1>
        <p className="text-sm text-green-300 max-w-3xl mx-auto leading-relaxed font-medium">
          YOUR PERSONALIZED TRAINING SCHEDULE
        </p>
      </header>

      {/* Applied Workouts Selection */}
      {appliedWorkouts.length > 0 && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50">
            <div className="p-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
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
                    className="bg-gray-700/80 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-sm"
                  >
                    <option value="">Select Applied Workout</option>
                    {appliedWorkouts.map((workout) => (
                      <option key={workout.id} value={workout.id}>
                        {workout.name}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedAppliedWorkout && (
                  <button
                    onClick={() => handleRemoveAppliedWorkout(selectedAppliedWorkout.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium text-xs transition-all duration-300 border border-red-500/30 whitespace-nowrap"
                  >
                    Remove Workout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50">
          <div className="p-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('interactive')}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs transition-all duration-300 ${
                  viewMode === 'interactive'
                    ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                Interactive Mode
              </button>
              <button
                onClick={() => setViewMode('overview')}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs transition-all duration-300 ${
                  viewMode === 'overview'
                    ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                Overview Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mode */}
      {viewMode === 'interactive' && (
        <div className="max-w-7xl mx-auto">
          {/* Timer Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50 mb-4">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-1">
                    WORKOUT TIMER
                  </h2>
                  <div className="text-2xl font-black text-green-400">{formatTime(time)}</div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <button
                    onClick={handleStartTimer}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-green-500/30"
                  >
                    Start
                  </button>
                  <button
                    onClick={handleStopTimer}
                    disabled={!isRunning}
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-yellow-500/30"
                  >
                    Pause
                  </button>
                  <button
                    onClick={handleResetTimer}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-red-500/30"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Day Navigation */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50 mb-4">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-1">
                    {currentPlan[currentDay]?.day || "WORKOUT DAY"}
                  </h2>
                  <p className="text-green-400/80 text-xs">
                    {completedExercises.size} of {currentPlan[currentDay]?.workouts?.length || 0} exercises completed
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <button
                    onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
                    disabled={currentDay === 0}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-gray-600/30"
                  >
                    Previous Day
                  </button>
                  <button
                    onClick={() => setCurrentDay(Math.min(currentPlan.length - 1, currentDay + 1))}
                    disabled={currentDay === currentPlan.length - 1}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-gray-600/30"
                  >
                    Next Day
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Workout Exercises */}
          <div className="space-y-4">
            {currentPlan[currentDay]?.workouts?.map((exercise, index) => {
              const currentExercise = getCurrentExercise(currentDay, index);
              const isCompleted = completedExercises.has(index);
              const isExpanded = expandedExercise === index;
              const completedSets = completedSetsCount[index] || 0;
              const totalSets = currentExercise.sets;
              
              // Check if this exercise has been modified
              const dayKey = `${currentDay}-${index}`;
              const hasBeenModified = !!modifiedWorkouts[dayKey];
              const alternativeHistoryCount = getAlternativeHistory(currentDay, index).length;

              return (
                <div
                  key={index}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border transition-all duration-300 ${
                    isCompleted
                      ? 'border-green-500/50'
                      : isExpanded
                      ? 'border-green-400/50'
                      : 'border-gray-700/50'
                  }`}
                >
                  {/* Exercise Header */}
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => toggleExercise(index)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full border-2 ${
                              isCompleted
                                ? 'bg-green-500 border-green-400'
                                : 'bg-gray-700 border-gray-600'
                            }`}
                          />
                          <div>
                            <h3 className="text-base font-black text-white">
                              {currentExercise.name}
                              {hasBeenModified && (
                                <span className="ml-2 text-xs bg-yellow-500 text-black px-1.5 py-0.5 rounded-full font-medium">
                                  Modified
                                </span>
                              )}
                            </h3>
                            <p className="text-green-400 text-xs font-medium mt-1">
                              {currentExercise.sets} sets × {currentExercise.reps} reps
                              {currentExercise.rest && ` • ${currentExercise.rest} rest`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-xs text-gray-400">Progress</div>
                          <div className="text-sm font-black text-green-400">
                            {completedSets}/{totalSets} sets
                          </div>
                        </div>
                        <div
                          className={`transform transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exercise Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-4">
                      {/* Exercise Image */}
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <WorkoutImage 
                          exerciseName={currentExercise.name} 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Sets Progress */}
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-black text-white">SETS PROGRESS</h4>
                          <span className="text-xs font-black text-green-400">
                            {completedSets}/{totalSets} completed
                          </span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: totalSets }).map((_, setIndex) => (
                            <div
                              key={setIndex}
                              className={`flex-1 h-2 rounded-full ${
                                setIndex < completedSets ? 'bg-green-500' : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                        {!isCompleted && (
                          <button
                            onClick={() => handleCompleteSet(index, currentExercise.rest)}
                            disabled={isCountdownRunning}
                            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:from-green-800 disabled:to-green-900 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg border border-green-600/30"
                          >
                            Complete Set
                          </button>
                        )}
                      </div>

                      {/* Countdown Timer */}
                      {isCountdownRunning && (
                        <div className="bg-yellow-900/50 rounded-lg p-3 border border-yellow-700/50">
                          <div className="text-center">
                            <h4 className="text-sm font-black text-yellow-400 mb-2">REST TIMER</h4>
                            <div className="text-2xl font-black text-yellow-400 mb-3">{formatTime(countdownTime)}</div>
                            <button
                              onClick={handleStopCountdown}
                              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-yellow-500/30"
                            >
                              Stop Rest Timer
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Exercise Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        {!isCompleted ? (
                          <button
                            onClick={() => handleCompleteExercise(index)}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-green-600/30"
                          >
                            Mark Complete
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestartExercise(index)}
                            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-yellow-600/30"
                          >
                            Restart Exercise
                          </button>
                        )}
                        
                        {/* Alternatives Button */}
                        <button
                          onClick={() => toggleAlternatives(index)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-600/30"
                        >
                          {showAlternatives[index] ? 'Hide Alternatives' : 'Show Alternatives'}
                        </button>

                        {/* Details Button */}
                        <button
                          onClick={() => openExerciseModal(currentExercise)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-600/30"
                        >
                          Details
                        </button>
                      </div>

                      {/* Revert Button - Show only if exercise has been modified */}
                      {hasBeenModified && (
                        <button
                          onClick={() => revertExercise(currentDay, index)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-2.5 rounded-lg font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-red-600/30"
                        >
                          Revert to Original
                          {alternativeHistoryCount > 0 && ` (${alternativeHistoryCount} changes)`}
                        </button>
                      )}

                      {/* Alternatives Section */}
                      {showAlternatives[index] && (
                        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                          <h4 className="text-sm font-black text-white mb-3">ALTERNATIVE EXERCISES</h4>
                          
                          {loadingAlternatives[index] ? (
                            <div className="text-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                              <p className="text-xs text-gray-400 mt-2">Loading alternatives...</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {getExerciseAlternatives(currentExercise).map((alternative, altIndex) => (
                                <div
                                  key={altIndex}
                                  className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
                                >
                                  <div className="flex flex-col gap-3">
                                    {/* Alternative Exercise Image */}
                                    <div className="bg-gray-900/30 rounded-lg p-2">
                                      <WorkoutImage 
                                        exerciseName={alternative.name} 
                                        className="w-full h-32 object-cover rounded-lg"
                                      />
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                      <div className="flex-1">
                                        <h5 className="text-sm font-black text-white">{alternative.name}</h5>
                                        <p className="text-green-400 text-xs font-medium mt-1">
                                          {alternative.sets || currentExercise.sets} sets × {alternative.reps || currentExercise.reps} reps
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                          {alternative.description || "A great alternative that targets similar muscle groups."}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => replaceExercise(currentDay, index, alternative)}
                                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-green-600/30 whitespace-nowrap"
                                      >
                                        Use This
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {getExerciseAlternatives(currentExercise).length === 0 && (
                            <div className="text-center py-4">
                              <p className="text-gray-400 text-sm">No alternatives found for this exercise.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Complete Day Button */}
          {currentPlan[currentDay]?.workouts?.length > 0 && (
            <div className="mt-6">
              <button
                onClick={handleCompleteDay}
                disabled={completedExercises.size === 0}
                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:from-green-800 disabled:to-green-900 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black text-base uppercase tracking-wider transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-2xl border border-green-600/30"
              >
                COMPLETE DAY
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <div className="max-w-7xl mx-auto">
          {/* Day Selection */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50 mb-4">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-1">
                    WORKOUT OVERVIEW
                  </h2>
                  <p className="text-green-400/80 text-xs">
                    {getAvailableDays().length} days available
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <select
                    value={selectedDay || ""}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="bg-gray-700/80 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
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
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-red-500/30"
                    >
                      Remove Day
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Workouts Overview */}
          {selectedDay && (
            <div className="space-y-4">
              {getWorkoutsForSelectedDay().map((exercise, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50"
                >
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-base font-black text-white mb-1">
                          {exercise.name}
                        </h3>
                        <p className="text-green-400 text-xs font-medium">
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.rest && ` • ${exercise.rest} rest`}
                        </p>
                        {exercise.description && (
                          <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                            {exercise.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => openExerciseModal(exercise)}
                        className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-600/30 whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!selectedDay && (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">📋</div>
              <h3 className="text-lg font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-2">
                SELECT A DAY TO VIEW
              </h3>
              <p className="text-green-400/80 text-xs">
                Choose a day from the dropdown above to see the workout details
              </p>
            </div>
          )}
        </div>
      )}

      {/* Exercise Details Modal */}
      {isModalOpen && selectedExercise && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">{selectedExercise.name}</h3>
                <button
                  onClick={closeExerciseModal}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Exercise Image */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <WorkoutImage 
                  exerciseName={selectedExercise.name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Exercise Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                  <h4 className="text-sm font-black text-white mb-2">EXERCISE INFO</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sets:</span>
                      <span className="text-white font-medium">{selectedExercise.sets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reps:</span>
                      <span className="text-white font-medium">{selectedExercise.reps}</span>
                    </div>
                    {selectedExercise.rest && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rest:</span>
                        <span className="text-white font-medium">{selectedExercise.rest}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white font-medium">{selectedExercise.type || "Strength"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                  <h4 className="text-sm font-black text-white mb-2">EXERCISE DETAILS</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Equipment:</span>
                      <span className="text-white font-medium">{getExerciseDetails(selectedExercise).equipment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Difficulty:</span>
                      <span className="text-white font-medium">{getExerciseDetails(selectedExercise).difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target Muscles:</span>
                      <span className="text-white font-medium text-right">
                        {getExerciseDetails(selectedExercise).targetMuscles.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">DESCRIPTION</h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {getExerciseDetails(selectedExercise).description}
                </p>
              </div>

              {/* Proper Form */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">PROPER FORM</h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  {getExerciseDetails(selectedExercise).properForm.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">COMMON MISTAKES</h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  {getExerciseDetails(selectedExercise).commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;