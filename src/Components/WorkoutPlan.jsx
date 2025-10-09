// WorkoutPlan.jsx
import React, { useState, useEffect, useRef } from "react";
import WorkoutImage from './WorkoutImage';
import { db } from '../Config/firebaseconfig';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
        if (userData.appliedWorkouts) {
          setAppliedWorkouts(userData.appliedWorkouts);
          if (userData.appliedWorkouts.length > 0 && !selectedAppliedWorkout) {
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
  const currentPlan = generatedWorkoutPlan || (selectedAppliedWorkout ? selectedAppliedWorkout.days : plan);

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
    return dayData ? dayData.workouts : [];
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

  if (!currentPlan || currentPlan.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white font-sans p-4 md:p-8">
        <header className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-2xl mb-6 shadow-2xl">
            <div className="bg-black rounded-2xl p-3">
              <h1 className="text-4xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-3 tracking-tighter drop-shadow-2xl">
                MY WORKOUT PLAN
              </h1>
            </div>
          </div>
          <p className="text-lg md:text-2xl text-green-300 max-w-3xl mx-auto leading-relaxed font-medium">
            YOUR PERSONALIZED TRAINING SCHEDULE
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-black border-4 border-green-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center py-16">
                <div className="text-8xl mb-6">💪</div>
                <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4">NO WORKOUTS APPLIED YET</h3>
                <p className="text-green-600 text-base md:text-lg mb-8">
                  {appliedWorkouts.length > 0 ? 
                    "Select an applied workout or visit the Influencers section to browse and apply professional workout programs!" :
                    "Visit the Influencers section to browse and apply professional workout programs!"
                  }
                </p>
                {appliedWorkouts.length > 0 && (
                  <div className="mb-8">
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
                      className="bg-black text-white border border-green-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto"
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
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-green-400 text-sm md:text-base"
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

    const totalSets = currentPlan[currentDay].workouts[exerciseIndex].sets;
    
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
      .map(exercise => ({
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps
      }));

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

  // Main workout interface
  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 md:p-8">
      <header className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-2xl mb-6 shadow-2xl">
          <div className="bg-black rounded-2xl p-3">
            <h1 className="text-4xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-3 tracking-tighter drop-shadow-2xl">
              MY WORKOUT PLAN
            </h1>
          </div>
        </div>
        <p className="text-lg md:text-2xl text-green-300 max-w-3xl mx-auto leading-relaxed font-medium">
          YOUR PERSONALIZED TRAINING SCHEDULE
        </p>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-black border border-green-800 rounded-2xl p-1 inline-flex">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                viewMode === 'interactive'
                  ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg'
                  : 'text-green-400 hover:text-green-300'
              }`}
            >
              <i className="fas fa-dumbbell mr-2"></i>
              Interactive Mode
            </button>
            <button
              onClick={() => setViewMode('overview')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                viewMode === 'overview'
                  ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg'
                  : 'text-green-400 hover:text-green-300'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              Overview Mode
            </button>
          </div>
        </div>

        {/* Applied Workout Selector */}
        {appliedWorkouts.length > 0 && (
          <div className="bg-black border border-green-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-green-400 text-sm font-medium mb-2">
                  SELECT APPLIED WORKOUT:
                </label>
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
                  className="bg-black text-white border border-green-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                >
                  <option value="">Select Applied Workout</option>
                  {appliedWorkouts.map((workout) => (
                    <option key={workout.id} value={workout.id}>
                      {workout.name} - {workout.influencer}
                    </option>
                  ))}
                </select>
              </div>
              {selectedAppliedWorkout && (
                <button
                  onClick={() => handleRemoveAppliedWorkout(selectedAppliedWorkout.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Remove Workout
                </button>
              )}
            </div>
          </div>
        )}

        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="bg-black border-4 border-green-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h2 className="text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4 md:mb-0">
                  WORKOUT OVERVIEW
                </h2>
                <div className="flex flex-wrap gap-2">
                  {getAvailableDays().map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedDay === day
                          ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg'
                          : 'bg-gray-900 text-green-400 hover:bg-gray-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDay ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black text-green-400">{selectedDay}</h3>
                    <button
                      onClick={handleRemoveWorkout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all text-sm"
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Remove Day
                    </button>
                  </div>
                  <div className="grid gap-6">
                    {getWorkoutsForSelectedDay().map((exercise, index) => (
                      <div key={index} className="bg-gray-900 rounded-2xl p-6 border border-green-800">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Workout Image */}
                          <div className="flex-shrink-0">
                            <WorkoutImage 
                              exerciseName={exercise.name}
                              className="w-full md:w-48 h-48 object-cover rounded-xl"
                              alt={exercise.name}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-xl font-black text-white">{exercise.name}</h4>
                              <button
                                onClick={() => openExerciseModal(exercise)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all text-sm"
                              >
                                <i className="fas fa-info-circle mr-2"></i>
                                Details
                              </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="bg-black rounded-xl p-4 text-center border border-green-800">
                                <div className="text-green-400 text-sm font-medium mb-1">SETS</div>
                                <div className="text-white text-xl font-black">{exercise.sets}</div>
                              </div>
                              <div className="bg-black rounded-xl p-4 text-center border border-green-800">
                                <div className="text-green-400 text-sm font-medium mb-1">REPS</div>
                                <div className="text-white text-xl font-black">{exercise.reps}</div>
                              </div>
                              <div className="bg-black rounded-xl p-4 text-center border border-green-800">
                                <div className="text-green-400 text-sm font-medium mb-1">REST</div>
                                <div className="text-white text-xl font-black">{exercise.rest}</div>
                              </div>
                              <div className="bg-black rounded-xl p-4 text-center border border-green-800">
                                <div className="text-green-400 text-sm font-medium mb-1">TYPE</div>
                                <div className="text-white text-xl font-black">{exercise.type}</div>
                              </div>
                            </div>
                            {exercise.description && (
                              <p className="text-green-300 text-sm leading-relaxed">{exercise.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-black text-green-400 mb-2">SELECT A DAY</h3>
                  <p className="text-green-600">Choose a day from the options above to view the workout details.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interactive Mode */}
        {viewMode === 'interactive' && (
          <>
            {/* Timer Section */}
            <div className="bg-black border-4 border-green-700 rounded-3xl shadow-2xl overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <h2 className="text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4 md:mb-0">
                    WORKOUT TIMER
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-5xl md:text-7xl font-black text-green-400 font-mono">
                        {formatTime(time)}
                      </div>
                      <div className="text-green-600 text-sm font-medium mt-2">SESSION TIME</div>
                    </div>
                    <div className="flex gap-2">
                      {!isRunning ? (
                        <button
                          onClick={handleStartTimer}
                          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-3 rounded-xl font-medium transition-all"
                        >
                          <i className="fas fa-play mr-2"></i>
                          Start
                        </button>
                      ) : (
                        <button
                          onClick={handleStopTimer}
                          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all"
                        >
                          <i className="fas fa-pause mr-2"></i>
                          Pause
                        </button>
                      )}
                      <button
                        onClick={handleResetTimer}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
                      >
                        <i className="fas fa-redo mr-2"></i>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                {countdownTime > 0 && (
                  <div className="bg-gradient-to-r from-green-900 to-green-700 rounded-2xl p-6 text-center mb-6 border-2 border-green-500">
                    <div className="text-green-300 text-sm font-medium mb-2">REST TIMER</div>
                    <div className="text-4xl md:text-6xl font-black text-white font-mono mb-4">
                      {formatTime(countdownTime)}
                    </div>
                    <div className="flex justify-center gap-2">
                      {!isCountdownRunning ? (
                        <button
                          onClick={() => setIsCountdownRunning(true)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all"
                        >
                          <i className="fas fa-play mr-2"></i>
                          Resume Rest
                        </button>
                      ) : (
                        <button
                          onClick={handleStopCountdown}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all"
                        >
                          <i className="fas fa-pause mr-2"></i>
                          Stop Rest
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Day Navigation */}
            <div className="bg-black border-4 border-green-700 rounded-3xl shadow-2xl overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <h3 className="text-xl font-black text-green-400">CURRENT DAY:</h3>
                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-3 rounded-xl font-black text-lg">
                      {currentPlan[currentDay]?.day || "No Workout Available"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
                      disabled={currentDay === 0}
                      className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      <i className="fas fa-chevron-left mr-2"></i>
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentDay(Math.min(currentPlan.length - 1, currentDay + 1))}
                      disabled={currentDay === currentPlan.length - 1}
                      className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      Next
                      <i className="fas fa-chevron-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Workout Exercises */}
            <div className="bg-black border-4 border-green-700 rounded-3xl shadow-2xl overflow-hidden mb-8">
              <div className="p-8">
                <h2 className="text-3xl font-black bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-8 text-center">
                  TODAY'S WORKOUT
                </h2>

                {currentPlan[currentDay]?.workouts?.length > 0 ? (
                  <div className="space-y-6">
                    {currentPlan[currentDay].workouts.map((exercise, index) => {
                      const exerciseDetails = getExerciseDetails(exercise);
                      const isCompleted = completedExercises.has(index);
                      const completedSets = completedSetsCount[index] || 0;
                      const totalSets = exercise.sets;

                      return (
                        <div
                          key={index}
                          className={`bg-gray-900 rounded-2xl p-6 border-2 transition-all duration-300 ${
                            isCompleted
                              ? "border-green-500 bg-gradient-to-r from-green-900/20 to-green-800/20"
                              : "border-green-800 hover:border-green-600"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Workout Image */}
                            <div className="flex-shrink-0">
                              <WorkoutImage 
                                exerciseName={exercise.name}
                                className="w-full md:w-48 h-48 object-cover rounded-xl"
                                alt={exercise.name}
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-xl font-black text-white mb-2">
                                    {exercise.name}
                                    {isCompleted && (
                                      <span className="ml-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        <i className="fas fa-check mr-1"></i>
                                        COMPLETED
                                      </span>
                                    )}
                                  </h3>
                                  <div className="flex flex-wrap gap-4 mb-4">
                                    <div className="bg-black rounded-xl px-4 py-2 border border-green-800">
                                      <div className="text-green-400 text-sm font-medium">SETS</div>
                                      <div className="text-white text-lg font-black">{exercise.sets}</div>
                                    </div>
                                    <div className="bg-black rounded-xl px-4 py-2 border border-green-800">
                                      <div className="text-green-400 text-sm font-medium">REPS</div>
                                      <div className="text-white text-lg font-black">{exercise.reps}</div>
                                    </div>
                                    <div className="bg-black rounded-xl px-4 py-2 border border-green-800">
                                      <div className="text-green-400 text-sm font-medium">REST</div>
                                      <div className="text-white text-lg font-black">{exercise.rest}</div>
                                    </div>
                                    <div className="bg-black rounded-xl px-4 py-2 border border-green-800">
                                      <div className="text-green-400 text-sm font-medium">TYPE</div>
                                      <div className="text-white text-lg font-black">{exercise.type}</div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => openExerciseModal(exercise)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex-shrink-0"
                                >
                                  <i className="fas fa-info-circle mr-2"></i>
                                  Details
                                </button>
                              </div>

                              {/* Progress Bar for Sets */}
                              <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-green-400 text-sm font-medium">
                                    SETS COMPLETED: {completedSets}/{totalSets}
                                  </span>
                                  <span className="text-green-400 text-sm font-medium">
                                    {Math.round((completedSets / totalSets) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-black rounded-full h-3 border border-green-800">
                                  <div
                                    className="bg-gradient-to-r from-green-500 to-green-700 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(completedSets / totalSets) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Exercise Controls */}
                              <div className="flex flex-wrap gap-3">
                                {!isCompleted ? (
                                  <>
                                    <button
                                      onClick={() => handleCompleteSet(index, exercise.rest)}
                                      disabled={completedSets >= totalSets}
                                      className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all"
                                    >
                                      <i className="fas fa-check-circle mr-2"></i>
                                      Complete Set ({completedSets + 1}/{totalSets})
                                    </button>
                                    <button
                                      onClick={() => toggleExercise(index)}
                                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
                                    >
                                      <i className={`fas ${expandedExercise === index ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
                                      {expandedExercise === index ? 'Less' : 'More'} Details
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handleRestartExercise(index)}
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white px-6 py-3 rounded-xl font-medium transition-all"
                                  >
                                    <i className="fas fa-redo mr-2"></i>
                                    Restart Exercise
                                  </button>
                                )}
                              </div>

                              {/* Expanded Exercise Details */}
                              {expandedExercise === index && (
                                <div className="mt-6 p-4 bg-black rounded-xl border border-green-800">
                                  <h4 className="text-lg font-black text-green-400 mb-3">EXERCISE DETAILS</h4>
                                  <p className="text-green-300 mb-4 leading-relaxed">
                                    {exerciseDetails.description}
                                  </p>
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="font-black text-green-400 mb-2">PROPER FORM:</h5>
                                      <ul className="text-green-300 space-y-2">
                                        {exerciseDetails.properForm.map((point, i) => (
                                          <li key={i} className="flex items-start">
                                            <i className="fas fa-check text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                                            <span>{point}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="font-black text-green-400 mb-2">COMMON MISTAKES:</h5>
                                      <ul className="text-green-300 space-y-2">
                                        {exerciseDetails.commonMistakes.map((mistake, i) => (
                                          <li key={i} className="flex items-start">
                                            <i className="fas fa-times text-red-500 mt-1 mr-2 flex-shrink-0"></i>
                                            <span>{mistake}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-green-800">
                                    <div>
                                      <div className="text-green-400 text-sm font-medium">EQUIPMENT</div>
                                      <div className="text-white font-medium">{exerciseDetails.equipment}</div>
                                    </div>
                                    <div>
                                      <div className="text-green-400 text-sm font-medium">DIFFICULTY</div>
                                      <div className="text-white font-medium">{exerciseDetails.difficulty}</div>
                                    </div>
                                    <div>
                                      <div className="text-green-400 text-sm font-medium">TARGET MUSCLES</div>
                                      <div className="text-white font-medium">
                                        {exerciseDetails.targetMuscles.join(", ")}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-8xl mb-6">💪</div>
                    <h3 className="text-2xl font-black text-green-400 mb-4">NO WORKOUTS SCHEDULED</h3>
                    <p className="text-green-600 text-lg mb-8">
                      This day doesn't have any workouts scheduled. Check other days or apply a new workout program.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Completion Section */}
            <div className="bg-black border-4 border-green-700 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-xl font-black text-green-400 mb-2">WORKOUT PROGRESS</h3>
                    <p className="text-green-300">
                      Completed {completedExercises.size} out of {currentPlan[currentDay]?.workouts?.length || 0} exercises
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleResetDay}
                      className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      <i className="fas fa-undo mr-2"></i>
                      Reset Day
                    </button>
                    <button
                      onClick={handleCompleteDay}
                      disabled={completedExercises.size === 0}
                      className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      <i className="fas fa-flag-checkered mr-2"></i>
                      Complete Day & Track Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Exercise Detail Modal */}
      {isModalOpen && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-4 border-green-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-black text-green-400">{selectedExercise.name}</h3>
                <button
                  onClick={closeExerciseModal}
                  className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <WorkoutImage 
                    exerciseName={selectedExercise.name}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                    alt={selectedExercise.name}
                  />
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900 rounded-xl p-4 text-center border border-green-800">
                      <div className="text-green-400 text-sm font-medium mb-1">SETS</div>
                      <div className="text-white text-xl font-black">{selectedExercise.sets}</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-4 text-center border border-green-800">
                      <div className="text-green-400 text-sm font-medium mb-1">REPS</div>
                      <div className="text-white text-xl font-black">{selectedExercise.reps}</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-4 text-center border border-green-800">
                      <div className="text-green-400 text-sm font-medium mb-1">REST</div>
                      <div className="text-white text-xl font-black">{selectedExercise.rest}</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-4 text-center border border-green-800">
                      <div className="text-green-400 text-sm font-medium mb-1">TYPE</div>
                      <div className="text-white text-xl font-black">{selectedExercise.type}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <h4 className="text-xl font-black text-green-400 mb-3">DESCRIPTION</h4>
                    <p className="text-green-300 leading-relaxed">
                      {getExerciseDetails(selectedExercise).description}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <h4 className="text-xl font-black text-green-400 mb-3">PROPER FORM</h4>
                      <ul className="text-green-300 space-y-2">
                        {getExerciseDetails(selectedExercise).properForm.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <i className="fas fa-check text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-green-400 mb-3">COMMON MISTAKES</h4>
                      <ul className="text-green-300 space-y-2">
                        {getExerciseDetails(selectedExercise).commonMistakes.map((mistake, i) => (
                          <li key={i} className="flex items-start">
                            <i className="fas fa-times text-red-500 mt-1 mr-2 flex-shrink-0"></i>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-green-800">
                <div className="text-center">
                  <div className="text-green-400 text-sm font-medium mb-1">EQUIPMENT</div>
                  <div className="text-white font-medium">{getExerciseDetails(selectedExercise).equipment}</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-medium mb-1">DIFFICULTY</div>
                  <div className="text-white font-medium">{getExerciseDetails(selectedExercise).difficulty}</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-medium mb-1">TARGET MUSCLES</div>
                  <div className="text-white font-medium">
                    {getExerciseDetails(selectedExercise).targetMuscles.join(", ")}
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