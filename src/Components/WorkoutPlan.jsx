// WorkoutPlan.jsx
import React, { useState, useEffect, useRef } from "react";
import WorkoutImage from "./WorkoutImage";
import { db } from "../Config/firebaseconfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { findExerciseAlternatives } from "../Algorithms/rulebasedAlgorithms";
import "../App.css";

const WorkoutPlan = ({
  plan,
  onWorkoutComplete,
  userData,
  onProgressUpdate,
}) => {
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
  const [viewMode, setViewMode] = useState("interactive"); // 'interactive' or 'overview'

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
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Load applied workouts
        if (userData.appliedWorkouts && userData.appliedWorkouts.length > 0) {
          setAppliedWorkouts(userData.appliedWorkouts);
          if (!selectedAppliedWorkout) {
            setSelectedAppliedWorkout(userData.appliedWorkouts[0]);
            // Set default selected day for overview mode
            const firstDayWithWorkouts = userData.appliedWorkouts[0].days.find(
              (day) => day.workouts && day.workouts.length > 0
            );
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
      console.error("Error initializing user data:", error);
    }
  };

  // Listen for real-time updates to applied workouts
  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setAppliedWorkouts(userData.appliedWorkouts || []);

        // Update selected workout if it still exists
        if (selectedAppliedWorkout && userData.appliedWorkouts) {
          const updatedWorkout = userData.appliedWorkouts.find(
            (w) => w.id === selectedAppliedWorkout.id
          );
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
  const currentPlan = selectedAppliedWorkout
    ? selectedAppliedWorkout.days
    : generatedWorkoutPlan || plan;

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
    setShowAlternatives((prev) => ({
      ...prev,
      [exerciseIndex]: !prev[exerciseIndex],
    }));

    // Load alternatives when showing them
    if (!showAlternatives[exerciseIndex]) {
      const currentExercise = getCurrentExercise(currentDay, exerciseIndex);
      await loadAlternativeImages(currentExercise, exerciseIndex);
    }
  };

  // NEW: Function to get alternatives for an exercise
  const getExerciseAlternatives = (exercise) => {
    return findExerciseAlternatives(exercise.name, null, "beginner");
  };

  // NEW: Function to load alternative images
  const loadAlternativeImages = async (exercise, exerciseIndex) => {
    setLoadingAlternatives((prev) => ({ ...prev, [exerciseIndex]: true }));

    // Simulate loading time for better UX
    setTimeout(() => {
      setLoadingAlternatives((prev) => ({ ...prev, [exerciseIndex]: false }));
    }, 500);
  };

  // NEW: Function to replace an exercise with an alternative
  const replaceExercise = (dayIndex, exerciseIndex, alternativeExercise) => {
    const dayKey = `${dayIndex}-${exerciseIndex}`;

    // Create the new exercise object with the same structure but with alternative data
    const newExercise = {
      ...alternativeExercise,
      sets:
        alternativeExercise.sets ||
        currentPlan[dayIndex].workouts[exerciseIndex].sets,
      reps:
        alternativeExercise.reps ||
        currentPlan[dayIndex].workouts[exerciseIndex].reps,
      rest:
        alternativeExercise.rest ||
        currentPlan[dayIndex].workouts[exerciseIndex].rest,
      type:
        alternativeExercise.type ||
        currentPlan[dayIndex].workouts[exerciseIndex].type,
    };

    // Track alternative history
    setAlternativeHistory((prev) => {
      const historyKey = `${dayIndex}-${exerciseIndex}`;
      const currentHistory = prev[historyKey] || [];
      const originalExercise =
        modifiedWorkouts[dayKey] ||
        currentPlan[dayIndex].workouts[exerciseIndex];

      return {
        ...prev,
        [historyKey]: [...currentHistory, originalExercise],
      };
    });

    // Update the modified workouts state
    setModifiedWorkouts((prev) => ({
      ...prev,
      [dayKey]: newExercise,
    }));

    // Hide the alternatives section
    setShowAlternatives((prev) => ({
      ...prev,
      [exerciseIndex]: false,
    }));

    // Reset completion status for this exercise since it's been changed
    setCompletedExercises((prev) => {
      const newSet = new Set(prev);
      newSet.delete(exerciseIndex);
      return newSet;
    });

    setCompletedSetsCount((prev) => ({
      ...prev,
      [exerciseIndex]: 0,
    }));
  };

  // NEW: Function to revert to previous exercise version
  const revertExercise = (dayIndex, exerciseIndex) => {
    const dayKey = `${dayIndex}-${exerciseIndex}`;
    const historyKey = `${dayIndex}-${exerciseIndex}`;

    setAlternativeHistory((prev) => {
      const currentHistory = prev[historyKey] || [];
      if (currentHistory.length === 0) return prev;

      const previousExercise = currentHistory[currentHistory.length - 1];
      const newHistory = currentHistory.slice(0, -1);

      // Update modified workouts with previous exercise
      setModifiedWorkouts((prevWorkouts) => {
        if (newHistory.length === 0) {
          const { [dayKey]: removed, ...rest } = prevWorkouts;
          return rest;
        } else {
          return {
            ...prevWorkouts,
            [dayKey]: previousExercise,
          };
        }
      });

      // Reset completion status
      setCompletedExercises((prev) => {
        const newSet = new Set(prev);
        newSet.delete(exerciseIndex);
        return newSet;
      });

      setCompletedSetsCount((prev) => ({
        ...prev,
        [exerciseIndex]: 0,
      }));

      return {
        ...prev,
        [historyKey]: newHistory,
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

    const dayData = currentPlan.find((day) => day.day === selectedDay);
    if (!dayData || !dayData.workouts) return [];

    // Return modified workouts if they exist for this day
    return dayData.workouts.map((exercise, index) => {
      const dayIndex = currentPlan.findIndex((day) => day.day === selectedDay);
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
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedWorkouts = [...(userData.appliedWorkouts || [])];
        const workoutPlanIndex = updatedWorkouts.findIndex(
          (w) => w.id === selectedAppliedWorkout.id
        );

        if (workoutPlanIndex !== -1) {
          const workoutPlan = updatedWorkouts[workoutPlanIndex];

          // Remove workouts for the selected day
          const dayIndex = workoutPlan.days.findIndex(
            (day) => day.day === selectedDay
          );
          if (dayIndex !== -1) {
            workoutPlan.days[dayIndex].workouts = [];

            // Update Firestore
            await updateDoc(userDocRef, {
              appliedWorkouts: updatedWorkouts,
            });

            setAppliedWorkouts(updatedWorkouts);

            // Update selected applied workout
            setSelectedAppliedWorkout(workoutPlan);
          }
        }
      }
    } catch (error) {
      console.error("Error removing workout:", error);
    }
  };

  // Get available days with workouts (for overview mode)
  const getAvailableDays = () => {
    if (!currentPlan || currentPlan.length === 0) return [];

    return currentPlan
      .filter((day) => day.workouts && day.workouts.length > 0)
      .map((day) => day.day);
  };

  if (
    !currentPlan ||
    currentPlan.length === 0 ||
    (selectedAppliedWorkout &&
      selectedAppliedWorkout.days.every(
        (day) => !day.workouts || day.workouts.length === 0
      ))
  ) {
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
                  {appliedWorkouts.length > 0
                    ? "Select an applied workout or visit the Influencers section to browse and apply professional workout programs!"
                    : "Visit the Influencers section to browse and apply professional workout programs!"}
                </p>
                {appliedWorkouts.length > 0 && (
                  <div className="mb-4">
                    <select
                      value={
                        selectedAppliedWorkout ? selectedAppliedWorkout.id : ""
                      }
                      onChange={(e) => {
                        const workout = appliedWorkouts.find(
                          (w) => w.id === parseInt(e.target.value)
                        );
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
                  onClick={() => (window.location.href = "/influencers")}
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
    setCompletedSetsCount((prev) => ({
      ...prev,
      [index]: 0,
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
    setCompletedSetsCount((prev) => ({
      ...prev,
      [exerciseIndex]: newCount,
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
          reps: currentExercise.reps,
        };
      });

    if (completedExercisesData.length > 0 && userId) {
      const totalSets = completedExercisesData.reduce(
        (total, exercise) => total + exercise.sets,
        0
      );

      const newCompletedWorkout = {
        dayName: currentWorkout.day,
        completionDate: new Date().toLocaleDateString(),
        completionTime: new Date().toLocaleTimeString(),
        duration: formatTime(time),
        exercises: completedExercisesData,
        totalSets: totalSets,
        isPartial: false,
        timestamp: new Date().toISOString(),
      };

      // Call the parent callback to notify about completed workout
      if (onWorkoutComplete) {
        onWorkoutComplete(newCompletedWorkout);
      }

      try {
        const userDocRef = doc(db, "users", userId);

        // Update progress in Firestore
        await updateDoc(userDocRef, {
          workoutHistory: arrayUnion(newCompletedWorkout),
          lastCompletedWorkout: newCompletedWorkout,
        });

        // NEW: Remove the completed day from the workout plan
        if (selectedAppliedWorkout) {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedAppliedWorkouts = [
              ...(userData.appliedWorkouts || []),
            ];

            const updatedWorkouts = updatedAppliedWorkouts.map((workout) => {
              if (workout.id === selectedAppliedWorkout.id) {
                // Remove the completed day from the plan
                const updatedDays = workout.days.filter(
                  (day) => day.day !== currentWorkout.day
                );
                return { ...workout, days: updatedDays };
              }
              return workout;
            });

            // Update applied workouts in Firestore
            await updateDoc(userDocRef, {
              appliedWorkouts: updatedWorkouts,
            });

            setAppliedWorkouts(updatedWorkouts);

            // Update selected workout
            const updatedSelectedWorkout = updatedWorkouts.find(
              (w) => w.id === selectedAppliedWorkout.id
            );
            setSelectedAppliedWorkout(updatedSelectedWorkout);

            // Reset to first available day or show empty state
            if (
              updatedSelectedWorkout &&
              updatedSelectedWorkout.days.length > 0
            ) {
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
        console.error("Error completing workout:", error);
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
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedWorkouts = (userData.appliedWorkouts || []).filter(
          (w) => w.id !== workoutId
        );

        await updateDoc(userDocRef, {
          appliedWorkouts: updatedWorkouts,
        });

        setAppliedWorkouts(updatedWorkouts);

        if (selectedAppliedWorkout && selectedAppliedWorkout.id === workoutId) {
          setSelectedAppliedWorkout(
            updatedWorkouts.length > 0 ? updatedWorkouts[0] : null
          );
          setCurrentDay(0);
          setCompletedExercises(new Set());
          setCompletedSetsCount({});
          setTime(0);
          setIsRunning(false);
        }
      }
    } catch (error) {
      console.error("Error removing applied workout:", error);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const getExerciseDetails = (exercise) => {
    const details = {
      description:
        "This exercise targets multiple muscle groups for overall strength development.",
      properForm: [
        "Maintain proper posture throughout the movement",
        "Control the weight through the full range of motion",
        "Breathe consistently during the exercise",
      ],
      commonMistakes: [
        "Using momentum instead of muscle control",
        "Not using full range of motion",
        "Holding your breath during exertion",
      ],
      equipment: "Barbell/Dumbbells",
      difficulty: "Intermediate",
      targetMuscles: ["Multiple muscle groups"],
      warmupExercises: [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Bodyweight Squats - 10-15 reps to activate lower body",
        "Dynamic Stretching - 5-10 minutes of light cardio",
      ],
    };

    if (exercise.description) {
      details.description = exercise.description;
    }

    const exerciseName = exercise.name.toLowerCase().trim();

    // Improved exercise matching with exact and partial matching
    const matchesExercise = (keywords) => {
      return keywords.some((keyword) =>
        exerciseName.includes(keyword.toLowerCase())
      );
    };

    // NEW EXERCISES - WARMUP AND BEGINNER FRIENDLY
    if (matchesExercise(["arm circle", "arm circles"])) {
      details.description =
        "Arm circles are a dynamic warm-up exercise that improves shoulder mobility, increases blood flow to the shoulder joints, and prepares the upper body for more intense exercise.";
      details.properForm = [
        "Stand with feet shoulder-width apart, arms extended out to sides",
        "Keep arms straight with slight bend in elbows",
        "Make small circles forward, gradually increasing size",
        "After 15-20 reps, reverse direction for backward circles",
        "Keep shoulders relaxed and down away from ears",
        "Maintain engaged core and good posture throughout",
      ];
      details.commonMistakes = [
        "Making circles too large too quickly",
        "Shrugging shoulders up toward ears",
        "Bending elbows excessively during movement",
        "Moving too fast without control",
        "Not maintaining proper standing posture",
      ];
      details.equipment = "None/Bodyweight";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Shoulders", "Rotator Cuff", "Upper Back"];
      details.warmupExercises = [
        "Neck Rolls - 30 seconds each direction",
        "Shoulder Rolls - 30 seconds forward, 30 seconds backward",
        "Deep Breathing - 5-10 slow breaths to relax",
      ];
    } else if (
      matchesExercise(["wall push-up", "wall push ups", "wall pushup"])
    ) {
      details.description =
        "Wall push-ups are a beginner-friendly upper body exercise that builds chest, shoulder, and triceps strength with minimal joint stress. Perfect for building foundational pushing strength.";
      details.properForm = [
        "Stand facing wall about arm's length away",
        "Place hands on wall slightly wider than shoulder-width",
        "Keep body in straight line from head to heels",
        "Bend elbows and lower chest toward wall",
        "Go until nose nearly touches wall",
        "Push back to starting position by extending arms",
      ];
      details.commonMistakes = [
        "Standing too close or too far from wall",
        "Arching back or sagging hips",
        "Not going through full range of motion",
        "Flaring elbows out excessively",
        "Moving too quickly without control",
      ];
      details.equipment = "Wall";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Chest", "Shoulders", "Triceps", "Core"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Shoulder Rolls - 30 seconds each direction",
        "Wrist Circles - 30 seconds each direction",
      ];
    } else if (matchesExercise(["neck roll", "neck rolls", "neck rotation"])) {
      details.description =
        "Neck rolls gently mobilize the cervical spine and relieve tension in the neck and upper trapezius muscles. Important for maintaining neck flexibility and reducing stiffness.";
      details.properForm = [
        "Sit or stand with straight spine and relaxed shoulders",
        "Slowly lower chin to chest, feeling gentle stretch",
        "Roll head to right, bringing right ear toward right shoulder",
        "Continue rolling head backward, looking up toward ceiling",
        "Complete circle by rolling to left side",
        "Repeat in opposite direction for balanced mobility",
      ];
      details.commonMistakes = [
        "Rolling head too quickly or forcefully",
        "Dropping head back too far causing compression",
        "Not maintaining controlled, smooth movement",
        "Shrugging shoulders during the movement",
        "Holding breath instead of breathing naturally",
      ];
      details.equipment = "None";
      details.difficulty = "Beginner";
      details.targetMuscles = [
        "Neck Muscles",
        "Upper Trapezius",
        "Sternocleidomastoid",
      ];
      details.warmupExercises = [
        "Shoulder Shrugs - 10-15 reps",
        "Deep Breathing - 5-10 slow breaths",
        "Gentle Head Tilts - 30 seconds each side",
      ];
    } else if (
      matchesExercise(["resistance band triceps", "band triceps extension"])
    ) {
      details.description =
        "Resistance band triceps extensions target all three heads of the triceps using portable equipment. The constant tension builds arm strength and definition with joint-friendly resistance.";
      details.properForm = [
        "Stand on middle of resistance band with one foot",
        "Grab band ends with each hand, palms facing each other",
        "Bend forward slightly at hips, keeping back straight",
        "Start with elbows bent at 90 degrees, upper arms stationary",
        "Extend arms backward until fully straight",
        "Squeeze triceps at peak contraction, then return with control",
      ];
      details.commonMistakes = [
        "Moving elbows away from body during extension",
        "Using shoulders instead of triceps to move band",
        "Not achieving full arm extension",
        "Rounding back excessively",
        "Using band with too much resistance",
      ];
      details.equipment = "Resistance Band";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = ["Triceps", "Shoulders"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Band Pull-Aparts - 10-15 reps",
        "Wrist Flexor Stretch - 30 seconds each arm",
      ];
    } else if (matchesExercise(["bird-dog", "bird dog", "quadruped"])) {
      details.description =
        "The bird-dog exercise develops core stability, balance, and coordination while strengthening the back, glutes, and shoulders. Excellent for improving spinal stability and posture.";
      details.properForm = [
        "Start on hands and knees in tabletop position",
        "Keep hands under shoulders, knees under hips",
        "Engage core and maintain neutral spine",
        "Simultaneously extend right arm forward and left leg backward",
        "Keep hips and shoulders parallel to floor",
        "Hold for 2-3 seconds, then return to start and alternate sides",
      ];
      details.commonMistakes = [
        "Arching or rounding the lower back",
        "Letting hips rotate during movement",
        "Raising arm or leg too high causing imbalance",
        "Moving too quickly without control",
        "Not maintaining engaged core throughout",
      ];
      details.equipment = "Mat/Bodyweight";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = ["Core", "Glutes", "Shoulders", "Back"];
      details.warmupExercises = [
        "Cat-Cow Stretch - 10-12 reps",
        "Quadruped Rocking - 30 seconds forward and back",
        "Child's Pose - 30 second hold",
      ];
    } else if (
      matchesExercise(["bodyweight squat", "air squat", "no weight squat"])
    ) {
      details.description =
        "Bodyweight squats build foundational lower body strength, mobility, and movement patterns without external load. Perfect for learning proper squat mechanics and building leg endurance.";
      details.properForm = [
        "Stand with feet shoulder-width or slightly wider",
        "Keep chest up and back straight throughout movement",
        "Initiate movement by pushing hips back first",
        "Lower until thighs are parallel to ground or as deep as comfortable",
        "Keep knees in line with toes during descent and ascent",
        "Drive through heels to return to standing position",
      ];
      details.commonMistakes = [
        "Letting knees cave inward",
        "Rounding lower back during descent",
        "Rising onto toes instead of driving through heels",
        "Not going deep enough in squat",
        "Looking down instead of keeping head neutral",
      ];
      details.equipment = "None/Bodyweight";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings", "Core"];
      details.warmupExercises = [
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "Hip Circles - 30 seconds each direction",
        "Ankle Circles - 30 seconds each direction",
      ];
    } else if (
      matchesExercise(["breathing with arm raises", "breath with arm raise"])
    ) {
      details.description =
        "This breathing and mobility exercise combines diaphragmatic breathing with shoulder mobility to reduce stress, improve posture, and increase oxygen flow throughout the body.";
      details.properForm = [
        "Stand with feet shoulder-width apart, arms at sides",
        "Inhale deeply through nose while slowly raising arms overhead",
        "Reach arms fully overhead as you complete inhalation",
        "Pause briefly at top while maintaining expansion",
        "Exhale slowly through mouth while lowering arms",
        "Focus on deep belly breathing rather than chest breathing",
      ];
      details.commonMistakes = [
        "Shrugging shoulders toward ears during raise",
        "Breathing shallowly into chest only",
        "Moving arms too quickly without coordinating breath",
        "Arching lower back excessively",
        "Holding breath instead of continuous flow",
      ];
      details.equipment = "None";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Diaphragm", "Shoulders", "Respiratory Muscles"];
      details.warmupExercises = [
        "Deep Breathing - 5-10 slow breaths",
        "Shoulder Rolls - 30 seconds forward, 30 seconds backward",
        "Rib Cage Expansion - 5 deep breaths with hands on ribs",
      ];
    } else if (
      matchesExercise(["chair squat", "chair squats", "sit to stand"])
    ) {
      details.description =
        "Chair squats are a safe, controlled way to build lower body strength and practice proper squat mechanics using a chair for guidance and support. Ideal for beginners and rehabilitation.";
      details.properForm = [
        "Stand in front of chair with feet shoulder-width apart",
        "Extend arms forward for balance",
        "Slowly lower hips back and down toward chair",
        "Lightly touch chair with glutes, don't sit completely",
        "Keep chest up and knees behind toes",
        "Drive through heels to return to standing position",
      ];
      details.commonMistakes = [
        "Plummeting down and bouncing off chair",
        "Rounding back during descent",
        "Letting knees travel past toes",
        "Not using full range of motion",
        "Using momentum instead of controlled movement",
      ];
      details.equipment = "Chair/Stool";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings", "Core"];
      details.warmupExercises = [
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "Bodyweight Squats - 10-15 reps",
        "Hip Circles - 30 seconds each direction",
      ];

      // CHEST EXERCISES
    } else if (
      matchesExercise(["bench press", "barbell bench", "flat bench"])
    ) {
      details.description =
        "The bench press is a fundamental compound exercise that primarily targets the pectoralis major (chest), anterior deltoids (front shoulders), and triceps. It's essential for building upper body strength and muscle mass.";
      details.properForm = [
        "Lie flat on bench with feet firmly planted on the floor",
        "Grip barbell slightly wider than shoulder-width",
        "Unrack bar and lower to mid-chest with control",
        "Keep elbows at 45-60 degree angle from body",
        "Press bar explosively upward while keeping shoulders retracted",
        "Lock out elbows at top without shrugging shoulders",
      ];
      details.commonMistakes = [
        "Bouncing bar off chest to use momentum",
        "Flaring elbows out to 90 degrees causing shoulder strain",
        "Lifting hips off bench excessively",
        "Not touching chest with the bar each rep",
        "Using uneven grip or pressing unevenly",
      ];
      details.equipment = "Barbell, Bench";
      details.difficulty = "Intermediate";
      details.targetMuscles = [
        "Pectoralis Major",
        "Anterior Deltoids",
        "Triceps",
      ];
      details.warmupExercises = [
        "Push-ups - 10-15 reps",
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Dumbbell Press - 10-12 reps with light weight",
      ];
    } else if (
      matchesExercise(["incline bench", "incline press", "incline barbell"])
    ) {
      details.description =
        "The incline bench press emphasizes the upper pectoral fibers (clavicular head) and front deltoids. The angled position shifts focus to the upper chest for balanced chest development.";
      details.properForm = [
        "Set bench to 30-45 degree incline angle",
        "Lie back with feet flat and arch back slightly",
        "Grip bar slightly wider than shoulder-width",
        "Lower bar to upper chest/clavicle area",
        "Keep elbows at 45-degree angle during descent",
        "Press bar upward in slight arc back to starting position",
      ];
      details.commonMistakes = [
        "Using too steep an angle (becomes shoulder press)",
        "Lowering bar too low on chest",
        "Not maintaining shoulder retraction",
        "Using excessive arch in lower back",
        "Bouncing bar off chest",
      ];
      details.equipment = "Incline Bench, Barbell/Dumbbells";
      details.difficulty = "Intermediate";
      details.targetMuscles = [
        "Upper Pectorals",
        "Anterior Deltoids",
        "Triceps",
      ];
      details.warmupExercises = [
        "Incline Push-ups - 10-15 reps",
        "Band Chest Stretch - 30 seconds each side",
        "Light Incline Press - 10-12 reps with light weight",
      ];
    } else if (matchesExercise(["dumbbell fly", "db fly", "dumbbell flyes"])) {
      details.description =
        "Dumbbell flyes isolate the chest muscles through horizontal shoulder abduction, providing an excellent stretch and peak contraction. They build chest width and definition.";
      details.properForm = [
        "Lie on flat bench with dumbbells extended above chest",
        "Maintain slight bend in elbows (20-30 degrees)",
        "Lower weights in wide arc until chest stretch is felt",
        "Keep palms facing each other throughout movement",
        "Return to start using same arc pattern",
        "Squeeze chest muscles at top position",
      ];
      details.commonMistakes = [
        "Bending elbows too much (turns into press)",
        "Lowering weights too far causing shoulder strain",
        "Using momentum to swing weights up",
        "Not maintaining control during eccentric phase",
        "Going too heavy compromising form",
      ];
      details.equipment = "Dumbbells, Bench";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = ["Pectoralis Major", "Anterior Deltoids"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Dumbbell Press - 10-12 reps with light weight",
        "Doorway Chest Stretch - 30 seconds",
      ];
    } else if (matchesExercise(["cable crossover", "cable fly"])) {
      details.description =
        "Cable crossovers provide constant tension throughout the entire range of motion, targeting the pectoral muscles with emphasis on the inner chest and sternal fibers.";
      details.properForm = [
        "Set cable pulleys above head height",
        "Stand centered with one foot slightly forward",
        "Grab handles with palms facing down",
        "Bring handles together in wide arc motion",
        "Cross hands slightly at peak contraction",
        "Return with control feeling chest stretch",
      ];
      details.commonMistakes = [
        "Using too much weight bending elbows excessively",
        "Leaning forward too much using body momentum",
        "Not squeezing chest at peak contraction",
        "Moving too quickly without control",
        "Setting pulleys at wrong height",
      ];
      details.equipment = "Cable Crossover Machine";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Pectoralis Major", "Anterior Deltoids"];
      details.warmupExercises = [
        "Band Chest Stretch - 30 seconds each side",
        "Light Cable Press - 10-12 reps with light weight",
        "Arm Circles - 30 seconds forward, 30 seconds backward",
      ];

      // BACK EXERCISES
    } else if (matchesExercise(["pull-up", "pull up", "chin-up", "chin up"])) {
      details.description =
        "Pull-ups are a fundamental bodyweight exercise that develops back width, biceps strength, and grip endurance. They target the latissimus dorsi and create the coveted V-taper physique.";
      details.properForm = [
        "Grip bar slightly wider than shoulder-width",
        "Hang with arms fully extended, shoulders engaged",
        "Pull chest toward bar by driving elbows down",
        "Focus on using back muscles rather than arms",
        "Touch chest to bar or get chin over bar",
        "Lower with control to full extension",
      ];
      details.commonMistakes = [
        "Using momentum (kipping) instead of strict form",
        "Not achieving full range of motion",
        "Shrugging shoulders at the top",
        "Not fully extending arms at bottom",
        "Using only arm strength instead of back",
      ];
      details.equipment = "Pull-up Bar";
      details.difficulty = "Intermediate-Advanced";
      details.targetMuscles = [
        "Latissimus Dorsi",
        "Biceps",
        "Rhomboids",
        "Rear Delts",
      ];
      details.warmupExercises = [
        "Scapular Pull-ups - 10-15 reps",
        "Band Pull-Aparts - 15-20 reps",
        "Active Hang - 30 seconds to engage grip",
      ];
    } else if (matchesExercise(["bent over row", "barbell row"])) {
      details.description =
        "Bent over rows are a compound back exercise that builds thickness in the mid-back, lats, and rear delts. They develop overall back strength and improve posture.";
      details.properForm = [
        "Stand with feet shoulder-width apart, knees slightly bent",
        "Hinge at hips until torso is near parallel to floor",
        "Grip barbell with hands slightly wider than shoulders",
        "Pull bar to lower chest/upper abdomen",
        "Keep back straight and core tight throughout",
        "Squeeze shoulder blades together at top",
      ];
      details.commonMistakes = [
        "Rounding the back during the movement",
        "Using momentum to jerk the weight up",
        "Pulling bar too high (to chest instead of abdomen)",
        "Not maintaining hip hinge position",
        "Using too heavy weight compromising form",
      ];
      details.equipment = "Barbell";
      details.difficulty = "Intermediate";
      details.targetMuscles = [
        "Latissimus Dorsi",
        "Rhomboids",
        "Rear Delts",
        "Traps",
      ];
      details.warmupExercises = [
        "Cat-Cow Stretch - 10-12 reps",
        "Light Deadlifts - 8-10 reps with light weight",
        "Band Rows - 12-15 reps to activate back",
      ];
    } else if (matchesExercise(["lat pulldown", "lat pull down"])) {
      details.description =
        "Lat pulldowns target the latissimus dorsi muscles, building back width and strength. This machine exercise is excellent for developing the mind-muscle connection with the lats.";
      details.properForm = [
        "Sit with thighs secured under pads",
        "Grip bar wide with palms facing forward",
        "Lean back slightly with chest up",
        "Pull bar to upper chest while driving elbows down",
        "Squeeze lats at bottom position",
        "Return with control to full extension",
      ];
      details.commonMistakes = [
        "Leaning back too far using body weight",
        "Pulling bar behind neck (risky for shoulders)",
        "Not achieving full stretch at top",
        "Using arms instead of back muscles",
        "Rounding shoulders forward",
      ];
      details.equipment = "Lat Pulldown Machine";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = ["Latissimus Dorsi", "Biceps", "Rhomboids"];
      details.warmupExercises = [
        "Band Pull-Aparts - 15-20 reps",
        "Face Pulls - 12-15 reps with light weight",
        "Scapular Retractions - 10-12 reps",
      ];
    } else if (matchesExercise(["face pull", "face pulls"])) {
      details.description =
        "Face pulls target the rear deltoids, rotator cuff, and upper back muscles. They are crucial for shoulder health, posture correction, and balancing pushing exercises.";
      details.properForm = [
        "Set cable pulley at upper chest height with rope attachment",
        "Grab rope with neutral grip (palms facing each other)",
        "Step back to create tension, elbows slightly bent",
        "Pull rope toward face while externally rotating shoulders",
        "Squeeze rear delts and upper back at peak contraction",
        "Return with control maintaining tension",
      ];
      details.commonMistakes = [
        "Using too much weight compromising form",
        "Pulling toward chest instead of face",
        "Not externally rotating shoulders",
        "Using momentum to move weight",
        "Shrugging shoulders instead of retracting",
      ];
      details.equipment = "Cable Machine, Rope Attachment";
      details.difficulty = "Beginner";
      details.targetMuscles = [
        "Rear Deltoids",
        "Rotator Cuff",
        "Rhomboids",
        "Traps",
      ];
      details.warmupExercises = [
        "Band Pull-Aparts - 15-20 reps",
        "Shoulder Rolls - 30 seconds forward, 30 seconds backward",
        "Light External Rotations - 12-15 reps",
      ];

      // SHOULDER EXERCISES
    } else if (
      matchesExercise(["overhead press", "shoulder press", "military press"])
    ) {
      details.description =
        "The overhead press is a fundamental compound exercise for shoulder development, targeting the anterior and medial deltoids, triceps, and upper chest. It builds strong, well-rounded shoulders.";
      details.properForm = [
        "Stand with feet shoulder-width apart, core tight",
        "Grip barbell slightly wider than shoulder-width",
        "Press bar overhead in straight line",
        "Keep head neutral - push head slightly forward as bar passes",
        "Lock out elbows at top without shrugging",
        "Lower with control back to starting position",
      ];
      details.commonMistakes = [
        "Arching lower back excessively",
        "Using leg drive (becomes push press)",
        "Not going through full range of motion",
        "Flaring elbows out too wide",
        "Shrugging shoulders at lockout",
      ];
      details.equipment = "Barbell/Dumbbells";
      details.difficulty = "Intermediate";
      details.targetMuscles = [
        "Anterior Deltoids",
        "Medial Deltoids",
        "Triceps",
        "Upper Chest",
      ];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Dumbbell Press - 10-12 reps with light weight",
        "Band Pull-Aparts - 15-20 reps",
      ];
    } else if (matchesExercise(["lateral raise", "side lateral raise"])) {
      details.description =
        "Lateral raises isolate the medial deltoids (side shoulders), creating shoulder width and the 'capped' shoulder appearance. They are essential for balanced shoulder development.";
      details.properForm = [
        "Stand with feet shoulder-width apart, dumbbells at sides",
        "Maintain slight bend in elbows throughout movement",
        "Raise arms out to sides until parallel to floor",
        "Lead with elbows, keep palms facing down",
        "Pause briefly at top while squeezing shoulders",
        "Lower with control back to starting position",
      ];
      details.commonMistakes = [
        "Using momentum to swing weights up",
        "Raising weights above shoulder height",
        "Shrugging shoulders instead of isolating delts",
        "Bending elbows too much during movement",
        "Using too heavy weight with poor form",
      ];
      details.equipment = "Dumbbells";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Medial Deltoids", "Supraspinatus"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Front Raises - 10-12 reps with light weight",
        "Shoulder Rolls - 30 seconds forward, 30 seconds backward",
      ];
    } else if (matchesExercise(["front raise", "dumbbell front raise"])) {
      details.description =
        "Front raises target the anterior deltoids (front shoulders), helping to develop well-rounded shoulder strength and size. They complement overhead pressing movements.";
      details.properForm = [
        "Stand with feet shoulder-width apart",
        "Hold dumbbells in front of thighs, palms facing down",
        "Raise one or both arms forward to shoulder height",
        "Keep arms straight with slight elbow bend",
        "Pause at top while squeezing front delts",
        "Lower with control back to start",
      ];
      details.commonMistakes = [
        "Using momentum to swing weights up",
        "Raising above shoulder height",
        "Bending elbows excessively",
        "Leaning backward during movement",
        "Going too heavy compromising form",
      ];
      details.equipment = "Dumbbells/Barbell Plate";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Anterior Deltoids"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Shoulder Rolls - 30 seconds forward, 30 seconds backward",
        "Light Upright Rows - 10-12 reps with light weight",
      ];

      // LEG EXERCISES
    } else if (matchesExercise(["squat", "barbell squat", "back squat"])) {
      details.description =
        "Squats are the king of lower body exercises, targeting the quadriceps, glutes, hamstrings, and core. They build leg strength, power, and functional movement patterns.";
      details.properForm = [
        "Stand with feet shoulder-width or slightly wider",
        "Place barbell across upper back, not neck",
        "Keep chest up and back straight throughout",
        "Break at hips and knees simultaneously",
        "Descend until thighs are parallel or below",
        "Drive through heels to return to standing",
      ];
      details.commonMistakes = [
        "Letting knees cave inward",
        "Rounding lower back during descent",
        "Rising onto toes during ascent",
        "Not going deep enough in squat",
        "Looking down instead of forward",
      ];
      details.equipment = "Barbell, Squat Rack";
      details.difficulty = "Intermediate";
      details.targetMuscles = [
        "Quadriceps",
        "Glutes",
        "Hamstrings",
        "Adductors",
        "Core",
      ];
      details.warmupExercises = [
        "Bodyweight Squats - 15-20 reps",
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "Hip Circles - 30 seconds each direction",
      ];
    } else if (matchesExercise(["deadlift", "conventional deadlift"])) {
      details.description =
        "Deadlifts are a fundamental compound exercise that builds total-body strength, targeting the posterior chain (hamstrings, glutes, back) while engaging the core and grip strength.";
      details.properForm = [
        "Stand with feet hip-width apart, bar over mid-foot",
        "Hinge at hips and bend knees to grip bar",
        "Keep back straight, chest up, shoulders back",
        "Drive through heels while extending hips and knees",
        "Stand tall at top without leaning back",
        "Lower with control following same path",
      ];
      details.commonMistakes = [
        "Rounding the back during lift",
        "Starting with hips too high or too low",
        "Pulling with arms instead of legs/hips",
        "Not keeping bar close to body",
        "Hyperextending at lockout",
      ];
      details.equipment = "Barbell";
      details.difficulty = "Intermediate-Advanced";
      details.targetMuscles = [
        "Hamstrings",
        "Glutes",
        "Erector Spinae",
        "Lats",
        "Traps",
      ];
      details.warmupExercises = [
        "Good Mornings - 10-12 reps with bodyweight",
        "Romanian Deadlifts - 8-10 reps with light weight",
        "Cat-Cow Stretch - 10-12 reps",
      ];
    } else if (matchesExercise(["romanian deadlift", "rdl"])) {
      details.description =
        "Romanian deadlifts focus on the posterior chain with minimal knee bend, emphasizing hamstring and glute development while improving hip hinge mechanics.";
      details.properForm = [
        "Stand with feet hip-width apart, knees slightly bent",
        "Hold barbell or dumbbells in front of thighs",
        "Hinge at hips while maintaining flat back",
        "Lower weight along legs until hamstring stretch",
        "Keep bar close to body throughout movement",
        "Drive hips forward to return to standing",
      ];
      details.commonMistakes = [
        "Rounding the back during descent",
        "Bending knees too much (becomes squat)",
        "Letting weight drift away from body",
        "Not achieving sufficient depth in hinge",
        "Going too heavy compromising form",
      ];
      details.equipment = "Barbell/Dumbbells";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Hamstrings", "Glutes", "Erector Spinae"];
      details.warmupExercises = [
        "Bodyweight Good Mornings - 10-12 reps",
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "Hip Hinge Practice - 10-12 reps without weight",
      ];
    } else if (matchesExercise(["lunges", "walking lunge", "dumbbell lunge"])) {
      details.description =
        "Lunges are a unilateral leg exercise that develops quadriceps, glutes, and hamstrings while improving balance, coordination, and addressing muscle imbalances.";
      details.properForm = [
        "Stand with feet together, weights at sides if used",
        "Step forward with one leg, landing on heel",
        "Lower until both knees are bent at 90 degrees",
        "Keep front knee behind toes, torso upright",
        "Drive through front heel to return to start",
        "Maintain control and balance throughout",
      ];
      details.commonMistakes = [
        "Stepping too short or too long",
        "Letting front knee travel past toes",
        "Leaning forward excessively",
        "Not going deep enough in lunge",
        "Losing balance during movement",
      ];
      details.equipment = "Dumbbells/Barbell/Bodyweight";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings", "Core"];
      details.warmupExercises = [
        "Bodyweight Lunges - 10-12 reps per side",
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "Hip Circles - 30 seconds each direction",
      ];
    } else if (matchesExercise(["leg press", "leg press machine"])) {
      details.description =
        "The leg press targets the quadriceps, glutes, and hamstrings with minimal spinal loading, allowing for heavy lower body training without technical demands of squats.";
      details.properForm = [
        "Sit with back and hips firmly against pads",
        "Place feet shoulder-width on platform",
        "Lower weight until knees are at 90 degrees",
        "Keep knees in line with feet during movement",
        "Press through heels to extend legs",
        "Don't lock knees completely at top",
      ];
      details.commonMistakes = [
        "Going too deep causing lower back rounding",
        "Placing feet too high or too low",
        "Letting knees cave inward",
        "Locking knees at top of movement",
        "Bouncing at bottom of movement",
      ];
      details.equipment = "Leg Press Machine";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings"];
      details.warmupExercises = [
        "Bodyweight Squats - 15-20 reps",
        "Leg Extensions - 12-15 reps with light weight",
        "Hip Circles - 30 seconds each direction",
      ];

      // ARM EXERCISES
    } else if (
      matchesExercise(["bicep curl", "dumbbell curl", "barbell curl"])
    ) {
      details.description =
        "Bicep curls isolate the biceps brachii, brachialis, and brachioradialis, building arm size and strength. They are essential for balanced arm development.";
      details.properForm = [
        "Stand with feet shoulder-width apart",
        "Hold weights with supinated grip (palms up)",
        "Keep elbows tucked at sides throughout",
        "Curl weight toward shoulders",
        "Squeeze biceps hard at top position",
        "Lower with control resisting gravity",
      ];
      details.commonMistakes = [
        "Swinging body to generate momentum",
        "Moving elbows away from body",
        "Not going through full range of motion",
        "Using too heavy weight compromising form",
        "Not controlling eccentric portion",
      ];
      details.equipment = "Dumbbells/Barbell/EZ Bar";
      details.difficulty = "Beginner";
      details.targetMuscles = [
        "Biceps Brachii",
        "Brachialis",
        "Brachioradialis",
      ];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Hammer Curls - 10-12 reps with light weight",
        "Wrist Circles - 30 seconds each direction",
      ];
    } else if (
      matchesExercise([
        "triceps extension",
        "overhead extension",
        "french press",
      ])
    ) {
      details.description =
        "Triceps extensions target all three heads of the triceps, with emphasis on the long head. They build arm size and definition behind the biceps.";
      details.properForm = [
        "Sit or stand with weight overhead",
        "Keep elbows close to head pointing forward",
        "Lower weight behind head by bending elbows",
        "Go until stretch is felt in triceps",
        "Extend arms back to starting position",
        "Squeeze triceps at full extension",
      ];
      details.commonMistakes = [
        "Flaring elbows out to sides",
        "Using too much weight compromising form",
        "Not going through full range of motion",
        "Arching back excessively",
        "Moving shoulders during movement",
      ];
      details.equipment = "Dumbbell/EZ Bar/Cable";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = ["Triceps (All Three Heads)"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Push-downs - 12-15 reps with light weight",
        "Overhead Triceps Stretch - 30 seconds each arm",
      ];
    } else if (matchesExercise(["triceps pushdown", "cable pushdown"])) {
      details.description =
        "Triceps pushdowns target the lateral and medial heads of the triceps, building horseshoe-shaped arm development and improving pressing strength.";
      details.properForm = [
        "Stand facing cable machine with rope or bar",
        "Grip attachment with palms down",
        "Keep elbows tucked at sides throughout",
        "Push weight down until arms fully extended",
        "Squeeze triceps hard at bottom",
        "Return with control to starting position",
      ];
      details.commonMistakes = [
        "Moving elbows away from body",
        "Using body momentum to move weight",
        "Not achieving full arm extension",
        "Leaning forward excessively",
        "Going too heavy with poor form",
      ];
      details.equipment = "Cable Machine";
      details.difficulty = "Beginner";
      details.targetMuscles = ["Triceps (Lateral and Medial Heads)"];
      details.warmupExercises = [
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Light Overhead Extensions - 10-12 reps with light weight",
        "Wrist Flexor Stretch - 30 seconds each arm",
      ];

      // CORE EXERCISES
    } else if (matchesExercise(["plank", "front plank"])) {
      details.description =
        "Planks are an isometric core exercise that builds endurance in the abdominals, obliques, and lower back while improving spinal stability and posture.";
      details.properForm = [
        "Place forearms on ground, elbows under shoulders",
        "Extend legs back, resting on toes",
        "Keep body in straight line from head to heels",
        "Engage core, glutes, and quadriceps",
        "Maintain neutral neck and spine",
        "Hold position without sagging or hiking hips",
      ];
      details.commonMistakes = [
        "Sagging hips toward floor",
        "Hiking hips too high",
        "Looking up instead of keeping neck neutral",
        "Holding breath instead of breathing normally",
        "Not engaging all core muscles",
      ];
      details.equipment = "Mat/Bodyweight";
      details.difficulty = "Beginner";
      details.targetMuscles = [
        "Rectus Abdominis",
        "Transverse Abdominis",
        "Obliques",
        "Lower Back",
      ];
      details.warmupExercises = [
        "Cat-Cow Stretch - 10-12 reps",
        "Bird-Dog - 8-10 reps per side",
        "Dead Bug - 30 seconds",
      ];
    } else if (matchesExercise(["russian twist", "russian twists"])) {
      details.description =
        "Russian twists target the obliques and deep core muscles, improving rotational strength and stability essential for sports and daily activities.";
      details.properForm = [
        "Sit on floor with knees bent, heels on ground",
        "Lean back until torso is at 45-degree angle",
        "Keep back straight, chest up, core engaged",
        "Hold weight with both hands if using",
        "Rotate torso to touch weight to one side",
        "Return to center and rotate to opposite side",
      ];
      details.commonMistakes = [
        "Rounding the back during rotation",
        "Using momentum instead of core control",
        "Rotating only arms instead of torso",
        "Going too fast without control",
        "Not maintaining engaged core throughout",
      ];
      details.equipment = "Mat, Weight Plate/Dumbbell (optional)";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = [
        "Obliques",
        "Rectus Abdominis",
        "Transverse Abdominis",
      ];
      details.warmupExercises = [
        "Cat-Cow Stretch - 10-12 reps",
        "Seated Torso Twists - 30 seconds each side",
        "Dead Bug - 30 seconds",
      ];
    } else if (
      matchesExercise(["leg raise", "hanging leg raise", "lying leg raise"])
    ) {
      details.description =
        "Leg raises target the lower abdominals and hip flexors, building core strength and definition in the often-hard-to-target lower abdominal region.";
      details.properForm = [
        "Lie on back or hang from bar with arms extended",
        "Keep legs straight or slightly bent",
        "Raise legs until perpendicular to floor",
        "Control descent back to starting position",
        "Avoid swinging or using momentum",
        "Engage core throughout entire movement",
      ];
      details.commonMistakes = [
        "Using momentum to swing legs up",
        "Arching back during movement",
        "Not controlling descent phase",
        "Bending knees excessively",
        "Not going through full range of motion",
      ];
      details.equipment = "Mat/Pull-up Bar";
      details.difficulty = "Intermediate";
      details.targetMuscles = ["Lower Abs", "Hip Flexors", "Rectus Abdominis"];
      details.warmupExercises = [
        "Cat-Cow Stretch - 10-12 reps",
        "Knee Tucks - 10-12 reps",
        "Hip Circles - 30 seconds each direction",
      ];
    } else if (matchesExercise(["dead bug", "dead bugs"])) {
      details.description =
        "Dead bugs develop core stability and coordination while training the core to resist extension, which is crucial for spinal health and injury prevention.";
      details.properForm = [
        "Lie on back with arms extended toward ceiling",
        "Lift legs with knees bent at 90 degrees",
        "Simultaneously extend right arm and left leg",
        "Keep lower back pressed into floor",
        "Return to start and alternate sides",
        "Move slowly with control and coordination",
      ];
      details.commonMistakes = [
        "Arching lower back off floor",
        "Moving too quickly without control",
        "Not coordinating opposite arm and leg",
        "Holding breath during movement",
        "Not maintaining core engagement",
      ];
      details.equipment = "Mat";
      details.difficulty = "Beginner";
      details.targetMuscles = [
        "Rectus Abdominis",
        "Transverse Abdominis",
        "Obliques",
      ];
      details.warmupExercises = [
        "Cat-Cow Stretch - 10-12 reps",
        "Deep Breathing - 5-10 slow breaths",
        "Knee Hugs - 30 seconds each side",
      ];

      // CARDIO EXERCISES
    } else if (matchesExercise(["running", "jogging", "treadmill"])) {
      details.description =
        "Running is a fundamental cardiovascular exercise that improves heart health, endurance, and calorie burn. It can be performed outdoors or on a treadmill with varying intensity levels.";
      details.properForm = [
        "Maintain upright posture with slight forward lean",
        "Land mid-foot with each stride, not on heel",
        "Keep shoulders relaxed and down",
        "Bend elbows at 90 degrees, swing arms forward and back",
        "Take quick, light steps rather than long strides",
        "Breathe rhythmically in through nose, out through mouth",
      ];
      details.commonMistakes = [
        "Overstriding (landing with foot too far forward)",
        "Hunching shoulders up toward ears",
        "Looking down instead of forward",
        "Holding tension in hands and arms",
        "Breathing shallowly instead of deeply",
      ];
      details.equipment = "Running Shoes, Treadmill (optional)";
      details.difficulty = "Beginner-Advanced";
      details.targetMuscles = [
        "Quadriceps",
        "Hamstrings",
        "Glutes",
        "Calves",
        "Cardiovascular System",
      ];
      details.warmupExercises = [
        "Light Jogging - 5 minutes at slow pace",
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "High Knees - 30 seconds to activate hip flexors",
      ];
    } else if (matchesExercise(["cycling", "bike", "stationary bike"])) {
      details.description =
        "Cycling is a low-impact cardiovascular exercise that builds leg strength and endurance while being gentle on the joints. It can be performed outdoors or on stationary equipment.";
      details.properForm = [
        "Adjust seat height so knee has slight bend at bottom of pedal stroke",
        "Keep shoulders relaxed, elbows slightly bent",
        "Maintain neutral spine, avoid rounding back",
        "Push and pull through full pedal revolution",
        "Keep feet parallel to ground during cycling",
        "Use gears appropriately for terrain/resistance",
      ];
      details.commonMistakes = [
        "Seat too high or too low causing knee strain",
        "Hunching over handlebars excessively",
        "Pedaling in too high or too low gear",
        "Not using full pedal stroke (only pushing down)",
        "Holding tension in upper body",
      ];
      details.equipment = "Bicycle/Stationary Bike, Helmet";
      details.difficulty = "Beginner-Advanced";
      details.targetMuscles = [
        "Quadriceps",
        "Hamstrings",
        "Glutes",
        "Calves",
        "Cardiovascular System",
      ];
      details.warmupExercises = [
        "Light Cycling - 5 minutes at easy resistance",
        "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
        "Ankle Circles - 30 seconds each direction",
      ];
    } else if (
      matchesExercise(["jump rope", "jump ropeing", "skipping rope"])
    ) {
      details.description =
        "Jump rope is an excellent cardiovascular exercise that improves coordination, foot speed, and endurance while burning significant calories in a short time.";
      details.properForm = [
        "Stand with feet together, rope behind heels",
        "Hold handles at hip level, elbows close to body",
        "Use wrists to swing rope, not whole arms",
        "Jump just high enough to clear rope (1-2 inches)",
        "Land softly on balls of feet, knees slightly bent",
        "Maintain relaxed posture and rhythmic breathing",
      ];
      details.commonMistakes = [
        "Jumping too high causing excessive impact",
        "Using arms instead of wrists to swing rope",
        "Hunching forward with shoulders",
        "Looking down instead of forward",
        "Holding breath during jumping",
      ];
      details.equipment = "Jump Rope";
      details.difficulty = "Beginner-Intermediate";
      details.targetMuscles = [
        "Calves",
        "Quadriceps",
        "Glutes",
        "Shoulders",
        "Cardiovascular System",
      ];
      details.warmupExercises = [
        "Ankle Circles - 30 seconds each direction",
        "Calf Raises - 15-20 reps",
        "Light Jumping - 30 seconds without rope",
      ];
    } else if (matchesExercise(["rowing", "rower", "rowing machine"])) {
      details.description =
        "Rowing is a full-body cardiovascular exercise that engages both upper and lower body muscles while providing low-impact, high-intensity cardio training.";
      details.properForm = [
        "Start with knees bent, arms extended, torso forward",
        "Drive back with legs while keeping arms straight",
        "As legs extend, lean torso back to 11 o'clock position",
        "Pull arms to chest, keeping elbows close to body",
        "Reverse sequence: arms out, torso forward, then bend knees",
        "Maintain smooth, continuous motion throughout",
      ];
      details.commonMistakes = [
        "Using arms before legs in drive phase",
        "Rounding back during the pull",
        "Pulling handle too high or too low",
        "Not using full range of motion",
        "Rushing the recovery phase",
      ];
      details.equipment = "Rowing Machine";
      details.difficulty = "Intermediate";
      details.targetMuscles = [
        "Quadriceps",
        "Hamstrings",
        "Glutes",
        "Back",
        "Arms",
        "Cardiovascular System",
      ];
      details.warmupExercises = [
        "Light Rowing - 5 minutes at easy pace",
        "Arm Circles - 30 seconds forward, 30 seconds backward",
        "Bodyweight Squats - 10-15 reps",
      ];

      // STRETCHING EXERCISES
  if (matchesExercise(["hamstring stretch", "hamstring stretch"])) {
    details.description = "Hamstring stretches improve flexibility in the back of your thighs, reduce lower back tension, and enhance overall leg mobility. Essential for preventing injuries and improving posture.";
    details.properForm = [
      "Sit on floor with one leg extended, other bent with foot against inner thigh",
      "Keep extended leg straight with toes pointing up",
      "Slowly hinge forward from hips, not waist",
      "Reach toward toes until gentle stretch is felt",
      "Hold for 20-30 seconds while breathing deeply",
      "Keep back as straight as possible during stretch"
    ];
    details.commonMistakes = [
      "Rounding the back excessively",
      "Bouncing during the stretch",
      "Pulling too hard causing pain",
      "Holding breath instead of breathing deeply",
      "Not keeping the extended leg straight"
    ];
    details.equipment = "Mat/Yoga Mat";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Hamstrings", "Lower Back", "Glutes"];
    details.warmupExercises = [
      "Light Jogging - 2-3 minutes to warm muscles",
      "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
      "Gentle Hip Circles - 30 seconds each direction"
    ];
  } else if (matchesExercise(["quad stretch", "quadriceps stretch"])) {
    details.description = "Quad stretches target the front thigh muscles, improving knee flexibility and reducing tension in the quadriceps. Important for runners and athletes.";
    details.properForm = [
      "Stand holding wall or chair for balance",
      "Bend one knee and grab ankle with same-side hand",
      "Gently pull heel toward glutes until stretch is felt",
      "Keep knees together and standing leg slightly bent",
      "Hold for 20-30 seconds while maintaining upright posture",
      "Avoid arching lower back during stretch"
    ];
    details.commonMistakes = [
      "Letting knees drift apart",
      "Arching lower back excessively",
      "Pulling too hard on ankle",
      "Not using support for balance",
      "Holding stretch too briefly"
    ];
    details.equipment = "Wall/Chair for support";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Quadriceps", "Hip Flexors"];
    details.warmupExercises = [
      "Light Jogging - 2-3 minutes",
      "Leg Swings - 30 seconds forward",
      "Bodyweight Squats - 10-15 reps"
    ];
  } else if (matchesExercise(["calf stretch", "calf stretches"])) {
    details.description = "Calf stretches improve ankle mobility and flexibility in the gastrocnemius and soleus muscles. Essential for walking, running, and preventing shin splints.";
    details.properForm = [
      "Stand facing wall with hands at shoulder height",
      "Step one foot back, keeping heel flat on ground",
      "Bend front knee while keeping back leg straight",
      "Lean forward until stretch is felt in calf",
      "Hold for 20-30 seconds, then switch legs",
      "Keep both feet pointing forward"
    ];
    details.commonMistakes = [
      "Lifting back heel off ground",
      "Letting back knee bend",
      "Feet pointing outward or inward",
      "Rushing the stretch",
      "Not keeping body aligned"
    ];
    details.equipment = "Wall";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Gastrocnemius", "Soleus"];
    details.warmupExercises = [
      "Ankle Circles - 30 seconds each direction",
      "Calf Raises - 15-20 reps",
      "Light Jogging - 2-3 minutes"
    ];
  } else if (matchesExercise(["hip flexor stretch", "hip flexors stretch"])) {
    details.description = "Hip flexor stretches target the front of the hips, combating tightness from sitting and improving hip mobility for better movement patterns.";
    details.properForm = [
      "Kneel on one knee with other foot forward (lunge position)",
      "Keep front knee at 90-degree angle",
      "Gently push hips forward until stretch is felt",
      "Engage glutes and core during stretch",
      "Hold for 20-30 seconds, then switch sides",
      "Keep torso upright throughout"
    ];
    details.commonMistakes = [
      "Letting front knee go past toes",
      "Arching lower back",
      "Not engaging core muscles",
      "Rushing the stretch",
      "Insufficient hip forward movement"
    ];
    details.equipment = "Mat (optional)";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Hip Flexors", "Psoas", "Quadriceps"];
    details.warmupExercises = [
      "Hip Circles - 30 seconds each direction",
      "Leg Swings - 30 seconds forward",
      "Bodyweight Lunges - 10 reps per side"
    ];
  } else if (matchesExercise(["chest stretch", "chest stretches"])) {
    details.description = "Chest stretches open up the pectoral muscles and shoulders, counteracting hunched posture from sitting and improving upper body mobility.";
    details.properForm = [
      "Stand in doorway or next to wall",
      "Place forearm against door frame at 90-degree angle",
      "Gently lean forward until stretch is felt in chest",
      "Keep shoulders relaxed and down",
      "Hold for 20-30 seconds, then switch arms",
      "Breathe deeply throughout stretch"
    ];
    details.commonMistakes = [
      "Shrugging shoulders up",
      "Leaning too far too quickly",
      "Holding breath",
      "Not maintaining proper arm position",
      "Stretching to the point of pain"
    ];
    details.equipment = "Doorway/Wall";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Pectoralis Major", "Anterior Deltoids"];
    details.warmupExercises = [
      "Arm Circles - 30 seconds forward, 30 seconds backward",
      "Shoulder Rolls - 30 seconds each direction",
      "Light Band Pull-Aparts - 10-15 reps"
    ];
  } else if (matchesExercise(["triceps stretch", "tricep stretch"])) {
    details.description = "Triceps stretches target the back of the arms, improving shoulder and elbow mobility while relieving tension in the upper arms.";
    details.properForm = [
      "Stand or sit with tall posture",
      "Raise one arm overhead and bend elbow",
      "Use opposite hand to gently pull elbow behind head",
      "Keep head neutral and shoulders relaxed",
      "Hold for 20-30 seconds, then switch arms",
      "Feel stretch along back of upper arm"
    ];
    details.commonMistakes = [
      "Pulling too hard on elbow",
      "Leaning to one side",
      "Holding breath during stretch",
      "Not keeping shoulders relaxed",
      "Rushing the movement"
    ];
    details.equipment = "None";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Triceps", "Shoulders"];
    details.warmupExercises = [
      "Arm Circles - 30 seconds forward, 30 seconds backward",
      "Shoulder Rolls - 30 seconds each direction",
      "Light Triceps Extensions - 10-12 reps"
    ];
  } else if (matchesExercise(["child pose", "child's pose"])) {
    details.description = "Child's Pose is a restorative yoga stretch that releases tension in the back, shoulders, and hips while promoting relaxation and deep breathing.";
    details.properForm = [
      "Kneel on mat with big toes touching and knees wide",
      "Sit back on heels and fold forward",
      "Rest forehead on mat and extend arms forward",
      "Relax shoulders toward ground",
      "Hold for 30-60 seconds, breathing deeply",
      "Allow entire body to relax into the stretch"
    ];
    details.commonMistakes = [
      "Not relaxing shoulders completely",
      "Holding tension in neck or back",
      "Breathing shallowly",
      "Rushing the pose",
      "Not allowing knees to spread comfortably"
    ];
    details.equipment = "Yoga Mat";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Back", "Shoulders", "Hips", "Glutes"];
    details.warmupExercises = [
      "Cat-Cow Stretch - 10-12 reps",
      "Deep Breathing - 5-10 slow breaths",
      "Gentle Spinal Twists - 30 seconds each side"
    ];
  }

  // CARDIO EXERCISES
  else if (matchesExercise(["running", "jogging", "treadmill"])) {
    details.description = "Running is a fundamental cardiovascular exercise that improves heart health, endurance, and calorie burn. It can be performed outdoors or on a treadmill with varying intensity levels.";
    details.properForm = [
      "Maintain upright posture with slight forward lean",
      "Land mid-foot with each stride, not on heel",
      "Keep shoulders relaxed and down",
      "Bend elbows at 90 degrees, swing arms forward and back",
      "Take quick, light steps rather than long strides",
      "Breathe rhythmically in through nose, out through mouth"
    ];
    details.commonMistakes = [
      "Overstriding (landing with foot too far forward)",
      "Hunching shoulders up toward ears",
      "Looking down instead of forward",
      "Holding tension in hands and arms",
      "Breathing shallowly instead of deeply"
    ];
    details.equipment = "Running Shoes, Treadmill (optional)";
    details.difficulty = "Beginner-Advanced";
    details.targetMuscles = ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Cardiovascular System"];
    details.warmupExercises = [
      "Light Jogging - 5 minutes at slow pace",
      "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
      "High Knees - 30 seconds to activate hip flexors"
    ];
  } else if (matchesExercise(["cycling", "bike", "stationary bike"])) {
    details.description = "Cycling is a low-impact cardiovascular exercise that builds leg strength and endurance while being gentle on the joints. It can be performed outdoors or on stationary equipment.";
    details.properForm = [
      "Adjust seat height so knee has slight bend at bottom of pedal stroke",
      "Keep shoulders relaxed, elbows slightly bent",
      "Maintain neutral spine, avoid rounding back",
      "Push and pull through full pedal revolution",
      "Keep feet parallel to ground during cycling",
      "Use gears appropriately for terrain/resistance"
    ];
    details.commonMistakes = [
      "Seat too high or too low causing knee strain",
      "Hunching over handlebars excessively",
      "Pedaling in too high or too low gear",
      "Not using full pedal stroke (only pushing down)",
      "Holding tension in upper body"
    ];
    details.equipment = "Bicycle/Stationary Bike, Helmet";
    details.difficulty = "Beginner-Advanced";
    details.targetMuscles = ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Cardiovascular System"];
    details.warmupExercises = [
      "Light Cycling - 5 minutes at easy resistance",
      "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
      "Ankle Circles - 30 seconds each direction"
    ];
  } else if (matchesExercise(["jump rope", "jump ropeing", "skipping rope"])) {
    details.description = "Jump rope is an excellent cardiovascular exercise that improves coordination, foot speed, and endurance while burning significant calories in a short time.";
    details.properForm = [
      "Stand with feet together, rope behind heels",
      "Hold handles at hip level, elbows close to body",
      "Use wrists to swing rope, not whole arms",
      "Jump just high enough to clear rope (1-2 inches)",
      "Land softly on balls of feet, knees slightly bent",
      "Keep jumps small and efficient"
    ];
    details.commonMistakes = [
      "Jumping too high off ground",
      "Using arms instead of wrists to swing rope",
      "Looking down at feet instead of forward",
      "Holding tension in shoulders",
      "Landing flat-footed or with straight legs"
    ];
    details.equipment = "Jump Rope";
    details.difficulty = "Intermediate";
    details.targetMuscles = ["Calves", "Quadriceps", "Shoulders", "Cardiovascular System"];
    details.warmupExercises = [
      "Light Jogging - 2-3 minutes",
      "Ankle Circles - 30 seconds each direction",
      "Calf Raises - 15-20 reps",
      "Wrist Circles - 30 seconds each direction"
    ];
  } else if (matchesExercise(["rowing", "rower", "rowing machine"])) {
    details.description = "Rowing is a full-body cardiovascular exercise that engages both upper and lower body muscles while providing excellent cardiovascular benefits with low joint impact.";
    details.properForm = [
      "Start with knees bent, arms straight (catch position)",
      "Drive back with legs while keeping back straight",
      "When legs are nearly extended, lean back slightly",
      "Pull handle to lower chest, elbows going back",
      "Extend arms, hinge forward from hips, then bend knees",
      "Maintain smooth, continuous motion throughout"
    ];
    details.commonMistakes = [
      "Using arms before legs in the drive phase",
      "Rounding back during the pull",
      "Pulling handle too high (to neck level)",
      "Rushing the recovery phase",
      "Not using full leg drive"
    ];
    details.equipment = "Rowing Machine";
    details.difficulty = "Intermediate";
    details.targetMuscles = ["Quadriceps", "Hamstrings", "Back", "Shoulders", "Arms", "Cardiovascular System"];
    details.warmupExercises = [
      "Light Rowing - 5 minutes at easy pace",
      "Arm Circles - 30 seconds forward, 30 seconds backward",
      "Bodyweight Squats - 10-15 reps",
      "Shoulder Rolls - 30 seconds each direction"
    ];
  } else if (matchesExercise(["elliptical", "elliptical trainer"])) {
    details.description = "The elliptical trainer provides a low-impact cardiovascular workout that mimics running motion without joint stress, making it ideal for all fitness levels and rehabilitation.";
    details.properForm = [
      "Stand tall with shoulders back and down",
      "Grab moving handles to engage upper body",
      "Push through heels, not toes",
      "Keep knees aligned with feet during motion",
      "Maintain upright posture throughout",
      "Use full range of motion in legs and arms"
    ];
    details.commonMistakes = [
      "Leaning too heavily on handrails",
      "Rising up on toes during push phase",
      "Hunching forward over console",
      "Not using full stride length",
      "Letting knees collapse inward"
    ];
    details.equipment = "Elliptical Machine";
    details.difficulty = "Beginner";
    details.targetMuscles = ["Quadriceps", "Hamstrings", "Glutes", "Chest", "Back", "Cardiovascular System"];
    details.warmupExercises = [
      "Light Elliptical - 5 minutes at easy resistance",
      "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
      "Arm Circles - 30 seconds forward, 30 seconds backward"
    ];
  } else if (matchesExercise(["stair climber", "stair machine", "step mill"])) {
    details.description = "The stair climber simulates stair climbing to provide an intense lower body and cardiovascular workout that builds leg strength and endurance while burning significant calories.";
    details.properForm = [
      "Stand tall with slight forward lean from ankles",
      "Place entire foot on each step, not just toes",
      "Use handrails for balance only, not for support",
      "Push through heels to engage glutes and hamstrings",
      "Keep core engaged throughout movement",
      "Maintain steady, controlled pace"
    ];
    details.commonMistakes = [
      "Leaning too heavily on handrails",
      "Stepping only on balls of feet",
      "Hunching forward excessively",
      "Taking steps that are too high",
      "Letting knees extend past toes excessively"
    ];
    details.equipment = "Stair Climber Machine";
    details.difficulty = "Intermediate";
    details.targetMuscles = ["Quadriceps", "Glutes", "Hamstrings", "Calves", "Cardiovascular System"];
    details.warmupExercises = [
      "Light Stair Climbing - 5 minutes at slow pace",
      "Leg Swings - 30 seconds forward, 30 seconds side-to-side",
      "Bodyweight Squats - 10-15 reps",
      "Calf Raises - 15-20 reps"
    ];
  }
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
                    value={
                      selectedAppliedWorkout ? selectedAppliedWorkout.id : ""
                    }
                    onChange={(e) => {
                      const workout = appliedWorkouts.find(
                        (w) => w.id === parseInt(e.target.value)
                      );
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
                    onClick={() =>
                      handleRemoveAppliedWorkout(selectedAppliedWorkout.id)
                    }
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
                onClick={() => setViewMode("interactive")}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs transition-all duration-300 ${
                  viewMode === "interactive"
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                Interactive Mode
              </button>
              <button
                onClick={() => setViewMode("overview")}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs transition-all duration-300 ${
                  viewMode === "overview"
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                Overview Mode
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Interactive Mode */}
      {viewMode === "interactive" && (
        <div className="max-w-7xl mx-auto">
          {/* Timer Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50 mb-4">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-1">
                    WORKOUT TIMER
                  </h2>
                  <div className="text-2xl font-black text-green-400">
                    {formatTime(time)}
                  </div>
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
                    {completedExercises.size} of{" "}
                    {currentPlan[currentDay]?.workouts?.length || 0} exercises
                    completed
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
                    onClick={() =>
                      setCurrentDay(
                        Math.min(currentPlan.length - 1, currentDay + 1)
                      )
                    }
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
              const alternativeHistoryCount = getAlternativeHistory(
                currentDay,
                index
              ).length;

              return (
                <div
                  key={index}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border transition-all duration-300 ${
                    isCompleted
                      ? "border-green-500/50"
                      : isExpanded
                      ? "border-green-400/50"
                      : "border-gray-700/50"
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
                                ? "bg-green-500 border-green-400"
                                : "bg-gray-700 border-gray-600"
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
                              {currentExercise.sets} sets ×{" "}
                              {currentExercise.reps} reps
                              {currentExercise.rest &&
                                ` • ${currentExercise.rest} rest`}
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
                            isExpanded ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
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
                          <h4 className="text-sm font-black text-white">
                            SETS PROGRESS
                          </h4>
                          <span className="text-xs font-black text-green-400">
                            {completedSets}/{totalSets} completed
                          </span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: totalSets }).map(
                            (_, setIndex) => (
                              <div
                                key={setIndex}
                                className={`flex-1 h-2 rounded-full ${
                                  setIndex < completedSets
                                    ? "bg-green-500"
                                    : "bg-gray-700"
                                }`}
                              />
                            )
                          )}
                        </div>
                        {!isCompleted && (
                          <button
                            onClick={() =>
                              handleCompleteSet(index, currentExercise.rest)
                            }
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
                            <h4 className="text-sm font-black text-yellow-400 mb-2">
                              REST TIMER
                            </h4>
                            <div className="text-2xl font-black text-yellow-400 mb-3">
                              {formatTime(countdownTime)}
                            </div>
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
                          {showAlternatives[index]
                            ? "Hide Alternatives"
                            : "Show Alternatives"}
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
                          {alternativeHistoryCount > 0 &&
                            ` (${alternativeHistoryCount} changes)`}
                        </button>
                      )}

                      {/* Alternatives Section */}
                      {showAlternatives[index] && (
                        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                          <h4 className="text-sm font-black text-white mb-3">
                            ALTERNATIVE EXERCISES
                          </h4>

                          {loadingAlternatives[index] ? (
                            <div className="text-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                              <p className="text-xs text-gray-400 mt-2">
                                Loading alternatives...
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {getExerciseAlternatives(currentExercise).map(
                                (alternative, altIndex) => (
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
                                          <h5 className="text-sm font-black text-white">
                                            {alternative.name}
                                          </h5>
                                          <p className="text-green-400 text-xs font-medium mt-1">
                                            {alternative.sets ||
                                              currentExercise.sets}{" "}
                                            sets ×{" "}
                                            {alternative.reps ||
                                              currentExercise.reps}{" "}
                                            reps
                                          </p>
                                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                            {alternative.description ||
                                              "A great alternative that targets similar muscle groups."}
                                          </p>
                                        </div>
                                        <button
                                          onClick={() =>
                                            replaceExercise(
                                              currentDay,
                                              index,
                                              alternative
                                            )
                                          }
                                          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg border border-green-600/30 whitespace-nowrap"
                                        >
                                          Use This
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          {getExerciseAlternatives(currentExercise).length ===
                            0 && (
                            <div className="text-center py-4">
                              <p className="text-gray-400 text-sm">
                                No alternatives found for this exercise.
                              </p>
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
      {viewMode === "overview" && (
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
      {isModalOpen && selectedExercise && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">
                  {selectedExercise.name}
                </h3>
                <button
                  onClick={closeExerciseModal}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
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
                  <h4 className="text-sm font-black text-white mb-2">
                    EXERCISE INFO
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sets:</span>
                      <span className="text-white font-medium">
                        {selectedExercise.sets}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reps:</span>
                      <span className="text-white font-medium">
                        {selectedExercise.reps}
                      </span>
                    </div>
                    {selectedExercise.rest && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rest:</span>
                        <span className="text-white font-medium">
                          {selectedExercise.rest}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white font-medium">
                        {selectedExercise.type || "Strength"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                  <h4 className="text-sm font-black text-white mb-2">
                    EXERCISE DETAILS
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Equipment:</span>
                      <span className="text-white font-medium">
                        {getExerciseDetails(selectedExercise).equipment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Difficulty:</span>
                      <span className="text-white font-medium">
                        {getExerciseDetails(selectedExercise).difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target Muscles:</span>
                      <span className="text-white font-medium text-right">
                        {getExerciseDetails(
                          selectedExercise
                        ).targetMuscles.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">
                  DESCRIPTION
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {getExerciseDetails(selectedExercise).description}
                </p>
              </div>

              {/* NEW: Warmup Exercises Section */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">
                  WARMUP EXERCISES
                </h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  {getExerciseDetails(selectedExercise).warmupExercises.map(
                    (warmup, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {warmup}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Proper Form */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">
                  PROPER FORM
                </h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  {getExerciseDetails(selectedExercise).properForm.map(
                    (point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {point}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <h4 className="text-sm font-black text-white mb-2">
                  COMMON MISTAKES
                </h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  {getExerciseDetails(selectedExercise).commonMistakes.map(
                    (mistake, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {mistake}
                      </li>
                    )
                  )}
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