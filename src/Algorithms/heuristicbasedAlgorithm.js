// heuristicbasedAlgorithm.js
import { 
  bodybuildingWorkouts, 
  powerliftingWorkouts, 
  calisthenicsWorkouts,
  medicalConditionWorkouts 
} from '../Data/workouts';
import { generateEnhancedMedicalWorkoutPlan } from './rulebasedAlgorithms';

// Enhanced warm-up exercises database with muscle group specificity
const warmUpExercises = {
  general: [
    {
      name: 'Dynamic Stretching',
      description: 'Arm circles, leg swings, torso twists - 30 seconds each',
      duration: '3-5 minutes',
      purpose: 'Increase blood flow and full body mobility',
      equipment: 'bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    },
    {
      name: 'Light Cardio',
      description: 'Jogging in place, jumping jacks, or stationary bike',
      duration: '3-5 minutes',
      purpose: 'Elevate heart rate and warm up muscles',
      equipment: 'bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    }
  ],

  chest: [
    {
      name: 'Chest Activation',
      description: 'Band chest stretches, push-up position planks, scapular protractions',
      duration: '3-4 minutes',
      purpose: 'Activate chest muscles and improve shoulder mobility',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['chest', 'shoulders']
    },
    {
      name: 'Push-Up Prep',
      description: 'Incline push-ups, wall push-ups, chest flyes with light bands',
      duration: '3-5 minutes',
      purpose: 'Prepare chest and triceps for pressing movements',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['chest', 'triceps']
    }
  ],

  back: [
    {
      name: 'Back Activation',
      description: 'Band pull-aparts, scapular retractions, cat-cow stretches',
      duration: '3-4 minutes',
      purpose: 'Activate back muscles and improve posture',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['back', 'rear delts']
    },
    {
      name: 'Pull-Up Prep',
      description: 'Scapular pull-ups, active hangs, band lat activations',
      duration: '3-5 minutes',
      purpose: 'Prepare back and biceps for pulling movements',
      equipment: 'bands/bar',
      difficulty: 'beginner',
      muscleGroups: ['back', 'biceps']
    }
  ],

  legs: [
    {
      name: 'Lower Body Dynamic',
      description: 'Leg swings, hip circles, walking lunges, bodyweight squats',
      duration: '4-5 minutes',
      purpose: 'Activate legs and improve hip mobility',
      equipment: 'bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['quads', 'hamstrings', 'glutes']
    },
    {
      name: 'Glute Activation',
      description: 'Glute bridges, fire hydrants, donkey kicks, band walks',
      duration: '3-4 minutes',
      purpose: 'Activate glutes for squats and deadlifts',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['glutes', 'hamstrings']
    }
  ],

  shoulders: [
    {
      name: 'Shoulder Mobility',
      description: 'Arm circles, shoulder dislocations with band, wall slides',
      duration: '3-4 minutes',
      purpose: 'Improve shoulder range of motion and stability',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['shoulders', 'traps']
    }
  ],

  arms: [
    {
      name: 'Arm Activation',
      description: 'Light band curls, triceps extensions, wrist mobility',
      duration: '3-4 minutes',
      purpose: 'Activate biceps and triceps for arm isolation work',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['biceps', 'triceps']
    }
  ],

  backPain: [
    {
      name: 'Gentle Back Mobility',
      description: 'Cat-cow stretches, pelvic tilts, gentle spinal twists',
      duration: '4-5 minutes',
      purpose: 'Safe mobility for back conditions, focus on core activation',
      equipment: 'bodyweight/mat',
      difficulty: 'beginner',
      muscleGroups: ['core', 'back'],
      medicalCondition: 'backPain'
    }
  ],

  kneeProblems: [
    {
      name: 'Knee-Friendly Warm-up',
      description: 'Seated leg extensions, ankle circles, gentle quad activation',
      duration: '4-5 minutes',
      purpose: 'Low-impact warm-up for knee conditions',
      equipment: 'chair/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['quads', 'hamstrings'],
      medicalCondition: 'kneeProblems'
    }
  ],

  hypertension: [
    {
      name: 'Gentle Cardiovascular Warm-up',
      description: 'Slow marching, seated cycling, deep breathing exercises',
      duration: '5-6 minutes',
      purpose: 'Gradual heart rate elevation for hypertension',
      equipment: 'chair/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['cardiovascular'],
      medicalCondition: 'hypertension'
    }
  ],

  diabetes: [
    {
      name: 'Blood Sugar Friendly Warm-up',
      description: 'Light walking, joint mobility, gradual intensity increase',
      duration: '5-6 minutes',
      purpose: 'Stable blood sugar maintenance during warm-up',
      equipment: 'bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body'],
      medicalCondition: 'diabetes'
    }
  ],

  arthritis: [
    {
      name: 'Joint-Friendly Mobility',
      description: 'Gentle range of motion, heat application, supported stretches',
      duration: '6-8 minutes',
      purpose: 'Reduce joint stiffness and improve mobility',
      equipment: 'chair/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body'],
      medicalCondition: 'arthritis'
    }
  ],

  heartDisease: [
    {
      name: 'Cardiac-Safe Warm-up',
      description: 'Very light movement, breathing focus, gradual progression',
      duration: '6-8 minutes',
      purpose: 'Safe warm-up for heart conditions with medical supervision',
      equipment: 'chair/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['cardiovascular'],
      medicalCondition: 'heartDisease'
    }
  ],

  bodybuilding: [
    {
      name: 'Bodybuilding Full Body Warm-up',
      description: 'Dynamic stretching, light cardio, muscle activation',
      duration: '5-6 minutes',
      purpose: 'Comprehensive warm-up for hypertrophy training',
      equipment: 'bodyweight/bands',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    }
  ],

  powerlifting: [
    {
      name: 'Powerlifting Specific Warm-up',
      description: 'Barbell warm-up sets, dynamic mobility, core activation',
      duration: '6-8 minutes',
      purpose: 'Prepare for heavy compound lifts',
      equipment: 'barbell/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    }
  ],

  calisthenics: [
    {
      name: 'Calisthenics Mobility Flow',
      description: 'Wrist prep, shoulder mobility, dynamic stretching',
      duration: '5-7 minutes',
      purpose: 'Prepare for bodyweight skills and movements',
      equipment: 'bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    }
  ],

  female_focused: [
    {
      name: 'Female Focused Warm-up',
      description: 'Hip mobility, glute activation, posture preparation',
      duration: '5-6 minutes',
      purpose: 'Focus on lower body and back activation',
      equipment: 'bands/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    }
  ],

  medical: [
    {
      name: 'General Medical Warm-up',
      description: 'Slow mobility, breathing exercises, supported stretching',
      duration: '6-8 minutes',
      purpose: 'Safe warm-up for general medical conditions',
      equipment: 'chair/bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body']
    }
  ],

  senior: [
    {
      name: 'Senior Dynamic Stretching',
      description: 'Gentle arm circles, leg swings, torso twists - 20 seconds each',
      duration: '2-3 minutes',
      purpose: 'Gradual mobility increase for older adults',
      equipment: 'bodyweight',
      difficulty: 'beginner',
      muscleGroups: ['full body'],
      ageGroup: 'senior'
    },
    {
      name: 'Senior Light Cardio',
      description: 'Slow marching, gentle stepping, seated cycling',
      duration: '2-3 minutes',
      purpose: 'Gradual heart rate elevation for older adults',
      equipment: 'bodyweight/chair',
      difficulty: 'beginner',
      muscleGroups: ['full body'],
      ageGroup: 'senior'
    }
  ]
};

// Cardio exercises for the end of workouts
const cardioExercises = {
  general: [
    {
      name: 'Light Jogging',
      description: 'Steady pace jogging or brisk walking',
      duration: '5-10 minutes',
      intensity: 'low',
      equipment: 'bodyweight'
    },
    {
      name: 'Jump Rope',
      description: 'Basic jump rope or alternating foot jumps',
      duration: '5-8 minutes',
      intensity: 'moderate',
      equipment: 'jump rope'
    },
    {
      name: 'Stationary Bike',
      description: 'Moderate pace cycling',
      duration: '8-12 minutes',
      intensity: 'low-moderate',
      equipment: 'stationary bike'
    }
  ],
  medical: [
    {
      name: 'Gentle Walking',
      description: 'Slow to moderate pace walking',
      duration: '8-12 minutes',
      intensity: 'very low',
      equipment: 'bodyweight'
    },
    {
      name: 'Seated Cycling',
      description: 'Very light cycling while seated',
      duration: '10-15 minutes',
      intensity: 'very low',
      equipment: 'stationary bike'
    }
  ],
  hiit: [
    {
      name: 'HIIT Circuit',
      description: '30s high intensity, 30s rest: jumping jacks, high knees, mountain climbers',
      duration: '8-10 minutes',
      intensity: 'high',
      equipment: 'bodyweight'
    },
    {
      name: 'Tabata Intervals',
      description: '20s max effort, 10s rest x 8 rounds',
      duration: '4 minutes',
      intensity: 'very high',
      equipment: 'bodyweight'
    }
  ],
  steady_state: [
    {
      name: 'Steady State Cardio',
      description: 'Maintain consistent moderate pace',
      duration: '15-20 minutes',
      intensity: 'moderate',
      equipment: 'various'
    }
  ],
  cool_down: [
    {
      name: 'Active Recovery',
      description: 'Very light movement to cool down',
      duration: '5-8 minutes',
      intensity: 'very low',
      equipment: 'bodyweight'
    }
  ]
};

// Track previously provided workouts for each user
const userWorkoutHistory = new Map();

export const calculateBMR = (age, weight, height, gender) => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export const calculateTDEE = (BMR, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  return BMR * activityMultipliers[activityLevel];
};

export const calculateCalorieIntake = (TDEE, goal) => {
  const goalAdjustments = {
    weightLoss: -500,
    cutting: -300,
    leanMuscle: -250,
    maintenance: 0,
    muscleGain: 300,
    bulking: 500,
    muscleTone: 200
  };
  return TDEE + (goalAdjustments[goal] || 0);
};

export const calculateProteinIntake = (weight, goal) => {
  const proteinMultipliers = {
    weightLoss: 2.2,
    cutting: 2.0,
    leanMuscle: 2.0,
    maintenance: 1.8,
    muscleGain: 2.2,
    bulking: 2.2,
    muscleTone: 2.0
  };
  return weight * (proteinMultipliers[goal] || 1.8);
};

// Function to detect medical conditions from user input
const detectMedicalConditions = (medicalConditionsText) => {
  if (!medicalConditionsText) return [];
  
  const conditions = [];
  const text = medicalConditionsText.toLowerCase();
  
  // Check for common medical conditions
  if (text.includes('back') || text.includes('spine') || text.includes('disc')) {
    conditions.push('backPain');
  }
  if (text.includes('knee') || text.includes('joint') || text.includes('arthritis')) {
    conditions.push('kneeProblems');
  }
  if (text.includes('blood pressure') || text.includes('hypertension') || text.includes('high bp')) {
    conditions.push('hypertension');
  }
  if (text.includes('diabetes') || text.includes('sugar') || text.includes('blood sugar')) {
    conditions.push('diabetes');
  }
  if (text.includes('heart') || text.includes('cardiac') || text.includes('cardiovascular')) {
    conditions.push('heartDisease');
  }
  
  return conditions;
};

// Get user workout history
const getUserWorkoutHistory = (userId) => {
  return userWorkoutHistory.get(userId) || [];
};

// Add workout to user history
const addToUserWorkoutHistory = (userId, workoutIds) => {
  const history = getUserWorkoutHistory(userId);
  const updatedHistory = [...new Set([...history, ...workoutIds])];
  userWorkoutHistory.set(userId, updatedHistory);
};

// Filter out previously used workouts
const filterOutUsedWorkouts = (workouts, userId) => {
  const usedWorkoutIds = getUserWorkoutHistory(userId);
  
  if (usedWorkoutIds.length === 0) {
    return workouts;
  }
  
  // If all workouts have been used, reset history for this user
  if (usedWorkoutIds.length >= workouts.length * 0.8) {
    userWorkoutHistory.set(userId, []);
    return workouts;
  }
  
  return workouts.filter(workout => !usedWorkoutIds.includes(workout.id));
};

// Shuffle array to provide variety
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Filter workouts based on gender to avoid redundancy and inappropriate exercises
const filterWorkoutsByGender = (workouts, gender, workoutPreference) => {
  if (!workouts || !Array.isArray(workouts)) return workouts;
  
  // For female users, filter out extremely male-focused exercises while maintaining workout preference
  if (gender === 'female') {
    return workouts.filter(workout => {
      const exerciseName = workout.name?.toLowerCase() || '';
      
      // Remove exercises that are typically too male-focused
      const maleFocusedExercises = [
        'behind neck', 'neck press', 'extreme heavy', 'power clean', 'clean and jerk'
      ];
      
      const isMaleFocused = maleFocusedExercises.some(exercise => 
        exerciseName.includes(exercise)
      );
      
      // For powerlifting females, keep the core lifts but adjust volume
      if (workoutPreference === 'powerlifting') {
        // Keep all powerlifting core movements but adjust reps/sets
        return true;
      }
      
      return !isMaleFocused;
    });
  }
  
  return workouts;
};

// Function to adjust workouts for users above 40 years old
const adjustWorkoutForAge = (workout, age, fitnessLevel) => {
  if (age <= 40) return workout;
  
  let adjustedWorkout = { ...workout };
  
  // For users above 40, adjust reps and sets
  if (age > 40) {
    // Reduce sets to 2 for most exercises
    adjustedWorkout.sets = 2;
    
    // Adjust reps to 8-10 range for safety and joint health
    if (fitnessLevel === 'beginner' || fitnessLevel === 'intermediate') {
      adjustedWorkout.reps = '8-10';
    } else if (fitnessLevel === 'advanced') {
      // Advanced users above 40 can handle slightly higher reps
      adjustedWorkout.reps = '10-12';
    }
    
    // Increase rest time for better recovery
    if (!adjustedWorkout.rest || adjustedWorkout.rest === '60s') {
      adjustedWorkout.rest = '90s';
    } else if (adjustedWorkout.rest === '90s') {
      adjustedWorkout.rest = '120s';
    }
    
    // Reduce weight percentage for heavy compound lifts
    if (adjustedWorkout.weightPercentage && adjustedWorkout.weightPercentage > 0.7) {
      adjustedWorkout.weightPercentage = Math.max(0.5, adjustedWorkout.weightPercentage * 0.9);
    }
    
    // Add age consideration note
    adjustedWorkout.ageConsideration = 'adjusted_for_40_plus';
  }
  
  return adjustedWorkout;
};

// Adjust workout parameters based on gender
const adjustWorkoutForGender = (workout, gender, fitnessGoal, weight) => {
  let adjustedWorkout = { ...workout };
  
  if (gender === 'female') {
    // Females typically benefit from higher reps for hypertrophy
    if (fitnessGoal === 'muscleGain' || fitnessGoal === 'muscleTone') {
      adjustedWorkout.reps = '12-15';
    }
    
    // Adjust weight percentages for females (generally lower upper body strength)
    if (workout.weightPercentage && workout.muscleGroup) {
      const upperBodyGroups = ['chest', 'shoulders', 'back', 'arms'];
      const isUpperBody = upperBodyGroups.some(group => 
        workout.muscleGroup.toLowerCase().includes(group)
      );
      
      if (isUpperBody) {
        // Reduce weight percentage for upper body exercises for females
        adjustedWorkout.weightPercentage = workout.weightPercentage * 0.8;
      }
    }
  }
  
  // Calculate suggested weight if percentage exists
  if (adjustedWorkout.weightPercentage) {
    adjustedWorkout.suggestedWeight = Math.round(weight * adjustedWorkout.weightPercentage / 5) * 5;
  }
  
  return adjustedWorkout;
};

// Update the main workout adjustment function to include age
const adjustWorkoutForGenderAndAge = (workout, gender, fitnessGoal, weight, age, fitnessLevel) => {
  let adjustedWorkout = adjustWorkoutForGender(workout, gender, fitnessGoal, weight);
  adjustedWorkout = adjustWorkoutForAge(adjustedWorkout, age, fitnessLevel);
  return adjustedWorkout;
};

// Function to select warm-up exercises
const selectWarmUpExercises = (workoutPreference, workoutType, gender = 'male', isMedical = false, age = 30) => {
  let warmUpPool = [];
  
  // Determine primary muscle groups for this workout type
  const targetMuscles = ['full body']; // Default
  
  // Add muscle-group specific warm-ups based on workout type
  if (workoutType.includes('Chest') || workoutType.includes('Push') || workoutType.includes('Bench')) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.chest];
  }
  if (workoutType.includes('Back') || workoutType.includes('Pull') || workoutType.includes('Deadlift')) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.back];
  }
  if (workoutType.includes('Leg') || workoutType.includes('Lower') || workoutType.includes('Squat') || workoutType.includes('Glute')) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.legs];
  }
  if (workoutType.includes('Shoulder') || workoutType.includes('Arm')) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.shoulders, ...warmUpExercises.arms];
  }
  
  // Add preference-specific warm-ups
  if (workoutPreference === 'powerlifting') {
    warmUpPool = [...warmUpPool, ...warmUpExercises.powerlifting];
  } else if (workoutPreference === 'calisthenics') {
    warmUpPool = [...warmUpPool, ...warmUpExercises.calisthenics];
  } else if (workoutPreference === 'bodybuilding') {
    warmUpPool = [...warmUpPool, ...warmUpExercises.bodybuilding];
  } else if (gender === 'female') {
    warmUpPool = [...warmUpPool, ...warmUpExercises.female_focused];
  }
  
  // Add age-specific warm-ups for users above 40
  if (age > 40) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.senior];
    
    // Reduce duration for existing warm-ups for users above 40
    warmUpPool = warmUpPool.map(warmup => {
      if (warmup.duration && !warmup.ageGroup) {
        const durationMatch = warmup.duration.match(/(\d+)-(\d+)/);
        if (durationMatch) {
          const min = Math.max(1, parseInt(durationMatch[1]) - 1);
          const max = Math.max(2, parseInt(durationMatch[2]) - 2);
          return {
            ...warmup,
            duration: `${min}-${max} minutes`,
            ageAdjusted: true
          };
        }
      }
      return warmup;
    });
  }
  
  // Add general warm-ups if pool is still small
  if (warmUpPool.length < 2) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.general];
  }
  
  // Select 1 warm-up exercise
  const shuffled = [...warmUpPool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 1);
  
  return selected;
};

// Function to select cardio exercise
const selectCardioExercise = (workoutType, fitnessGoal, fitnessLevel, isMedical = false) => {
  let cardioPool = cardioExercises.general;
  
  // Medical conditions get gentle cardio
  if (isMedical) {
    return cardioExercises.medical[0];
  }
  
  // Adjust cardio based on fitness goal
  if (fitnessGoal === 'weightLoss' || fitnessGoal === 'cutting') {
    cardioPool = [...cardioExercises.hiit, ...cardioExercises.general];
  } else if (fitnessGoal === 'muscleGain' || fitnessGoal === 'bulking') {
    cardioPool = cardioExercises.cool_down; // Lighter cardio for muscle gain
  }
  
  // Adjust for fitness level
  if (fitnessLevel === 'beginner') {
    cardioPool = cardioPool.filter(cardio => cardio.intensity !== 'very high' && cardio.intensity !== 'high');
  }
  
  // Select random cardio exercise
  const shuffled = [...cardioPool].sort(() => 0.5 - Math.random());
  return shuffled[0];
};

// Generate workout plan for users with medical conditions
const generateMedicalWorkoutPlan = (conditions, fitnessLevel, selectedDays, gender, userId) => {
  // For simplicity, we'll use the first detected condition
  const primaryCondition = conditions[0];
  const medicalWorkouts = medicalConditionWorkouts[primaryCondition] || [];
  
  // Filter medical workouts by gender
  const genderFilteredWorkouts = filterWorkoutsByGender(medicalWorkouts, gender, 'medical');
  
  // Filter out previously used workouts
  const unusedWorkouts = filterOutUsedWorkouts(genderFilteredWorkouts, userId);
  
  // Shuffle for variety
  const shuffledWorkouts = shuffleArray(unusedWorkouts.length > 0 ? unusedWorkouts : genderFilteredWorkouts);
  
  // Adjust intensity based on fitness level
  let intensity = 'low';
  if (fitnessLevel === 'intermediate') {
    intensity = 'moderate';
  } else if (fitnessLevel === 'advanced') {
    intensity = 'moderate'; // Still keep it moderate for safety
  }
  
  // Filter workouts by intensity
  const filteredWorkouts = shuffledWorkouts.filter(workout => workout.intensity === intensity);
  
  // Limit to 8 exercises per day
  const maxExercisesPerDay = 8;
  
  const weeklyPlan = selectedDays.map((day, index) => {
    const startIdx = index * maxExercisesPerDay;
    const endIdx = startIdx + maxExercisesPerDay;
    const dayWorkouts = filteredWorkouts.slice(startIdx, endIdx);
    
    // Add warm-up and cardio
    const warmUp = selectWarmUpExercises('medical', 'Medical', gender, true);
    const cardio = selectCardioExercise('Medical', 'maintenance', fitnessLevel, true);
    
    // Combine warm-up, main workouts, and cardio
    const allWorkouts = [
      ...warmUp.map(w => ({
        ...w,
        id: `${day}-warmup`,
        isWarmUp: true,
        sets: 1,
        reps: w.duration,
        rest: '0s'
      })),
      ...dayWorkouts,
      {
        ...cardio,
        id: `${day}-cardio`,
        name: `Cardio: ${cardio.name}`,
        isCardio: true,
        sets: 1,
        reps: cardio.duration,
        rest: '0s',
        muscleGroup: 'cardiovascular'
      }
    ];
    
    // Track used workout IDs
    const workoutIds = dayWorkouts.map(workout => workout.id).filter(id => id);
    if (workoutIds.length > 0) {
      addToUserWorkoutHistory(userId, workoutIds);
    }
    
    return {
      day,
      workouts: allWorkouts,
      medicalCondition: primaryCondition,
      intensity: intensity,
      genderConsideration: gender === 'female' ? 'female_optimized' : 'standard',
      totalExercises: allWorkouts.length,
      hasWarmUp: true,
      hasCardio: true,
      exerciseCountNote: `Medical plan: ${dayWorkouts.length} exercises + 1 warm-up + 1 cardio`
    };
  });
  
  return weeklyPlan;
};

// Helper function to check if an exercise is contraindicated for medical conditions
const isExerciseContraindicated = (exercise, medicalConditions) => {
  if (!medicalConditions || medicalConditions.length === 0) return false;
  
  const exerciseName = exercise.name.toLowerCase();
  const exerciseType = exercise.type ? exercise.type.toLowerCase() : '';
  
  // Check for back problems
  if (medicalConditions.includes('backPain') || medicalConditions.includes('herniatedDisc')) {
    const riskyExercises = ['deadlift', 'squat', 'good morning', 'bent over', 'overhead press'];
    if (riskyExercises.some(risk => exerciseName.includes(risk))) {
      return true;
    }
  }
  
  // Check for shoulder problems
  if (medicalConditions.includes('shoulderInjury') || medicalConditions.includes('rotatorCuff')) {
    const riskyExercises = ['overhead press', 'lateral raise', 'upright row', 'bench press'];
    if (riskyExercises.some(risk => exerciseName.includes(risk))) {
      return true;
    }
  }
  
  // Check for knee problems
  if (medicalConditions.includes('kneeInjury') || medicalConditions.includes('arthritis')) {
    const riskyExercises = ['squat', 'lunge', 'leg press', 'leg extension'];
    if (riskyExercises.some(risk => exerciseName.includes(risk))) {
      return true;
    }
  }
  
  // Check for hypertension
  if (medicalConditions.includes('hypertension')) {
    const riskyExercises = ['heavy', 'max', 'one rep max'];
    if (riskyExercises.some(risk => exerciseName.includes(risk))) {
      return true;
    }
  }
  
  return false;
};

// Helper function to increase reps for calisthenics
const increaseReps = (reps, multiplier) => {
  if (typeof reps === 'number') {
    return Math.round(reps * multiplier);
  }
  
  if (typeof reps === 'string' && reps.includes('-')) {
    const [min, max] = reps.split('-').map(Number);
    return `${Math.round(min * multiplier)}-${Math.round(max * multiplier)}`;
  }
  
  if (typeof reps === 'string' && reps === 'AMRAP') {
    return 'AMRAP';
  }
  
  return reps;
};

// Get alternative exercises for variety
const getAlternativeExercises = (baseWorkouts, muscleGroup, difficulty, gender, count = 3) => {
  const allWorkouts = Object.values({
    ...bodybuildingWorkouts,
    ...powerliftingWorkouts,
    ...calisthenicsWorkouts
  }).flat();
  
  return allWorkouts
    .filter(workout => 
      workout.muscleGroup === muscleGroup &&
      workout.difficulty === difficulty &&
      workout.genderConsiderations?.[gender] !== 'not_recommended'
    )
    .slice(0, count);
};

// Sort workouts by muscle group priority based on gender
const sortWorkoutsByGenderPriority = (workouts, gender) => {
  if (gender === 'male') {
    // For males: prioritize upper body exercises first (chest, back, shoulders, arms), then legs
    return workouts.sort((a, b) => {
      const aIsUpper = ['chest', 'back', 'shoulders', 'arms'].some(group => 
        a.muscleGroup?.toLowerCase().includes(group)
      );
      const bIsUpper = ['chest', 'back', 'shoulders', 'arms'].some(group => 
        b.muscleGroup?.toLowerCase().includes(group)
      );
      
      if (aIsUpper && !bIsUpper) return -1;
      if (!aIsUpper && bIsUpper) return 1;
      return 0;
    });
  } else {
    // For females: prioritize leg exercises first, then upper body
    return workouts.sort((a, b) => {
      const aIsLeg = ['legs', 'quads', 'hamstrings', 'glutes', 'calves'].some(group => 
        a.muscleGroup?.toLowerCase().includes(group)
      );
      const bIsLeg = ['legs', 'quads', 'hamstrings', 'glutes', 'calves'].some(group => 
        b.muscleGroup?.toLowerCase().includes(group)
      );
      
      if (aIsLeg && !bIsLeg) return -1;
      if (!aIsLeg && bIsLeg) return 1;
      return 0;
    });
  }
};

// Generate a completely new workout plan based on user data using heuristic approach
const generateNewWorkoutPlan = (userData) => {
  const { fitnessGoal, fitnessLevel, workoutPreference, selectedDays, weight, hasMedicalConditions, medicalConditions, gender, userId, age } = userData;
  
  // Check if user has medical conditions
  const detectedConditions = hasMedicalConditions ? detectMedicalConditions(medicalConditions) : [];
  
  // If medical conditions are detected, prioritize medical workouts
  if (detectedConditions.length > 0) {
    return generateMedicalWorkoutPlan(detectedConditions, fitnessLevel, selectedDays, gender, userId);
  }
  
  let selectedWorkouts = [];
  let workoutSplit = [];
  
  // Select workout type based on preference
  if (workoutPreference === 'bodybuilding') {
    if (selectedDays.length <= 3) {
      workoutSplit = ['UpperLower'];
      selectedWorkouts = bodybuildingWorkouts.UpperLower || [];
    } else if (selectedDays.length <= 4) {
      workoutSplit = ['BroSplits'];
      selectedWorkouts = bodybuildingWorkouts.BroSplits || [];
    } else {
      workoutSplit = ['PPL'];
      selectedWorkouts = bodybuildingWorkouts.PPL || [];
    }
  } else if (workoutPreference === 'powerlifting') {
    workoutSplit = ['SBD'];
    selectedWorkouts = powerliftingWorkouts || [];
  } else if (workoutPreference === 'calisthenics') {
    workoutSplit = ['Bodyweight'];
    selectedWorkouts = calisthenicsWorkouts || [];
  }
  
  // Flatten workouts if they are nested
  if (selectedWorkouts && typeof selectedWorkouts === 'object' && !Array.isArray(selectedWorkouts)) {
    selectedWorkouts = Object.values(selectedWorkouts).flat();
  }
  
  // Filter workouts based on gender to avoid redundancy
  selectedWorkouts = filterWorkoutsByGender(selectedWorkouts, gender, workoutPreference);
  
  // Filter out previously used workouts
  const unusedWorkouts = filterOutUsedWorkouts(selectedWorkouts, userId);
  
  // Shuffle for variety - use unused workouts first, then fallback to all if needed
  const availableWorkouts = unusedWorkouts.length > 0 ? unusedWorkouts : selectedWorkouts;
  const shuffledWorkouts = shuffleArray(availableWorkouts);
  
  // Sort workouts by gender priority - males start with upper body, females with legs
  const sortedWorkouts = sortWorkoutsByGenderPriority(shuffledWorkouts, gender);
  
  // Adjust workout intensity based on fitness level, weight, gender, and AGE
  const adjustedWorkouts = sortedWorkouts.map(workout => {
    let adjustedWorkout = adjustWorkoutForGenderAndAge(workout, gender, fitnessGoal, weight, age, fitnessLevel);
    
    // Additional age-based adjustments for users above 40
    if (age > 40) {
      // Further reduce intensity for beginners above 40
      if (fitnessLevel === 'beginner') {
        adjustedWorkout.sets = Math.max(2, adjustedWorkout.sets);
        adjustedWorkout.reps = '8-10';
      }
      
      // Avoid extremely high intensity exercises for users above 40
      if (workout.intensity === 'very high' || workout.difficulty === 'advanced') {
        adjustedWorkout.intensity = 'moderate';
        adjustedWorkout.difficulty = 'intermediate';
      }
    }
    
    // Adjust sets based on fitness level (unless already adjusted for age)
    if (!adjustedWorkout.ageConsideration) {
      if (fitnessLevel === 'beginner') {
        adjustedWorkout.sets = Math.max(2, (workout.sets || 3) - 1);
      } else if (fitnessLevel === 'advanced') {
        adjustedWorkout.sets = (workout.sets || 3) + 1;
      } else {
        adjustedWorkout.sets = workout.sets || 3;
      }
    }
    
    // Adjust reps based on goal (gender and age-specific adjustments already applied)
    if (!adjustedWorkout.reps && !adjustedWorkout.ageConsideration) {
      if (fitnessGoal === 'muscleGain' || fitnessGoal === 'bulking') {
        adjustedWorkout.reps = '8-12';
      } else if (fitnessGoal === 'weightLoss' || fitnessGoal === 'cutting') {
        adjustedWorkout.reps = '12-15';
      } else if (fitnessGoal === 'maintenance' || fitnessGoal === 'leanMuscle' || fitnessGoal === 'muscleTone') {
        adjustedWorkout.reps = '6-10';
      }
    }
    
    return adjustedWorkout;
  });
  
  // Limit to 8 exercises per day (reduce to 6 for users above 40)
  const maxExercisesPerDay = age > 40 ? 6 : 8;
  
  // Generate weekly plan
  const weeklyPlan = selectedDays.map((day, index) => {
    const startIdx = index * maxExercisesPerDay;
    const endIdx = startIdx + maxExercisesPerDay;
    const dayWorkouts = adjustedWorkouts.slice(startIdx, endIdx);
    
    // Select warm-up exercises (now including age parameter)
    const warmUp = selectWarmUpExercises(workoutPreference, workoutSplit[0], gender, false, age);
    
    // Select cardio exercise
    const cardio = selectCardioExercise(workoutSplit[0], fitnessGoal, fitnessLevel, false);
    
    // Reduce cardio intensity for users above 40
    let adjustedCardio = { ...cardio };
    if (age > 40) {
      if (adjustedCardio.intensity === 'high' || adjustedCardio.intensity === 'very high') {
        adjustedCardio.intensity = 'moderate';
        adjustedCardio.description = `Modified for age: ${adjustedCardio.description}`;
      }
      // Reduce duration for users above 40
      if (adjustedCardio.duration) {
        const durationMatch = adjustedCardio.duration.match(/(\d+)-(\d+)/);
        if (durationMatch) {
          const min = Math.max(3, parseInt(durationMatch[1]) - 2);
          const max = Math.max(5, parseInt(durationMatch[2]) - 3);
          adjustedCardio.duration = `${min}-${max} minutes`;
        }
      }
    }
    
    // Combine warm-up, main workouts, and cardio
    const allWorkouts = [
      ...warmUp.map(w => ({
        ...w,
        id: `${day}-warmup`,
        isWarmUp: true,
        sets: 1,
        reps: w.duration,
        rest: '0s'
      })),
      ...dayWorkouts,
      {
        ...adjustedCardio,
        id: `${day}-cardio`,
        name: `Cardio: ${adjustedCardio.name}`,
        isCardio: true,
        sets: 1,
        reps: adjustedCardio.duration,
        rest: '0s',
        muscleGroup: 'cardiovascular'
      }
    ];
    
    // Track used workout IDs
    const workoutIds = dayWorkouts.map(workout => workout.id).filter(id => id);
    if (workoutIds.length > 0) {
      addToUserWorkoutHistory(userId, workoutIds);
    }
    
    return {
      day,
      workouts: allWorkouts,
      workoutType: workoutSplit[0],
      intensity: fitnessLevel,
      genderConsideration: gender === 'female' ? 'female_optimized' : 'standard',
      ageConsideration: age > 40 ? 'adjusted_for_40_plus' : 'standard',
      totalExercises: allWorkouts.length,
      hasWarmUp: true,
      hasCardio: true,
      exerciseCountNote: age > 40 ? 
        `Senior plan: ${dayWorkouts.length} exercises + 1 warm-up + 1 cardio (age-adjusted)` :
        `Main plan: ${dayWorkouts.length} exercises + 1 warm-up + 1 cardio`
    };
  });
  
  return weeklyPlan;
};

// Main heuristic-based workout plan generator
export const generateWorkoutPlan = (userData, currentPlan = null, userProgress = null) => {
  const { fitnessGoal, workoutPreference, fitnessLevel, selectedDays, weight, hasMedicalConditions, medicalConditions, gender, preferredWorkoutDays, userId, age } = userData;
  
  // Check if user has medical conditions - use rule-based algorithm for medical plans
  if (hasMedicalConditions && medicalConditions && medicalConditions.trim() !== '') {
    const medicalPlan = generateEnhancedMedicalWorkoutPlan(medicalConditions, userData);
    if (medicalPlan) {
      return medicalPlan;
    }
  }
  
  // Check if user has medical conditions (fallback to old method if rule-based fails)
  const detectedConditions = hasMedicalConditions ? detectMedicalConditions(medicalConditions) : [];
  
  // If medical conditions are detected, prioritize medical workouts
  if (detectedConditions.length > 0) {
    return generateMedicalWorkoutPlan(detectedConditions, fitnessLevel, selectedDays, gender, userId);
  }
  
  // If we have progress data and current plan, adjust existing plan
  if (currentPlan && userProgress) {
    return adjustWorkoutPlan(currentPlan, userProgress, userData);
  }
  
  // Otherwise generate a completely new plan using heuristic approach
  return generateNewWorkoutPlan(userData);
};

// Adjust existing workout plan based on user progress
export const adjustWorkoutPlan = (currentPlan, userProgress, userData) => {
  const { fitnessGoal, weight, medicalConditions, userId, gender, fitnessLevel, age } = userData;
  const { weightChange, performanceData } = userProgress;
  
  let adjustedPlan = JSON.parse(JSON.stringify(currentPlan));
  
  // Filter out exercises that might be problematic for medical conditions
  if (medicalConditions && medicalConditions.length > 0) {
    adjustedPlan = adjustedPlan.map(day => {
      return {
        ...day,
        workouts: day.workouts.filter(workout => 
          !isExerciseContraindicated(workout, medicalConditions)
        )
      };
    });
  }
  
  // Apply age-based adjustments if user is above 40
  if (age > 40) {
    adjustedPlan = adjustedPlan.map(day => {
      return {
        ...day,
        workouts: day.workouts.map(workout => {
          if (workout.isWarmUp || workout.isCardio) {
            return workout; // Skip warm-up and cardio for age adjustment
          }
          return adjustWorkoutForAge(workout, age, fitnessLevel);
        }),
        ageConsideration: 'adjusted_for_40_plus'
      };
    });
  }
  
  // Replace some exercises with alternatives for variety
  adjustedPlan = adjustedPlan.map(day => {
    const newWorkouts = day.workouts.map(workout => {
      // 30% chance to replace an exercise with an alternative for variety
      if (Math.random() < 0.3 && workout.muscleGroup && workout.difficulty) {
        const alternatives = getAlternativeExercises(
          [...Object.values(bodybuildingWorkouts).flat(), ...Object.values(powerliftingWorkouts).flat(), ...Object.values(calisthenicsWorkouts).flat()],
          workout.muscleGroup,
          workout.difficulty,
          gender,
          1
        );
        
        if (alternatives.length > 0) {
          const alternative = alternatives[0];
          // Track the new workout
          if (alternative.id) {
            addToUserWorkoutHistory(userId, [alternative.id]);
          }
          return alternative;
        }
      }
      return workout;
    });
    
    return {
      ...day,
      workouts: newWorkouts
    };
  });
  
  // Adjust based on weight change
  if (fitnessGoal === 'muscleGain' && weightChange < 0.5) {
    // Not gaining enough weight, increase intensity
    adjustedPlan = adjustedPlan.map(day => {
      return {
        ...day,
        workouts: day.workouts.map(workout => {
          let newWorkout = { ...workout };
          
          // Increase weight or reps
          if (workout.weightPercentage) {
            newWorkout.weightPercentage = Math.min(0.9, workout.weightPercentage + 0.05);
            newWorkout.suggestedWeight = Math.round(weight * newWorkout.weightPercentage / 5) * 5;
          } else {
            if (typeof newWorkout.reps === 'string' && newWorkout.reps.includes('-')) {
              const [min, max] = newWorkout.reps.split('-').map(Number);
              newWorkout.reps = `${min + 1}-${max + 2}`;
            }
          }
          
          return newWorkout;
        })
      };
    });
  } else if (fitnessGoal === 'weightLoss' && weightChange > -0.5) {
    // Not losing enough weight, increase volume
    adjustedPlan = adjustedPlan.map(day => {
      return {
        ...day,
        workouts: day.workouts.map(workout => {
          let newWorkout = { ...workout };
          
          // Increase reps or sets
          newWorkout.sets += 1;
          if (typeof newWorkout.reps === 'string' && newWorkout.reps.includes('-')) {
            const [min, max] = newWorkout.reps.split('-').map(Number);
            newWorkout.reps = `${min + 2}-${max + 3}`;
          }
          
          return newWorkout;
        })
      };
    });
  }
  
  // Adjust based on performance data
  if (performanceData) {
    performanceData.forEach((performance, index) => {
      if (performance.completed && performance.difficulty < 5) {
        // Exercise was too easy, increase intensity
        const dayIndex = Math.floor(index / adjustedPlan[0].workouts.length);
        const workoutIndex = index % adjustedPlan[0].workouts.length;
        
        if (adjustedPlan[dayIndex] && adjustedPlan[dayIndex].workouts[workoutIndex]) {
          const workout = adjustedPlan[dayIndex].workouts[workoutIndex];
          
          if (workout.weightPercentage) {
            workout.weightPercentage = Math.min(0.9, workout.weightPercentage + 0.05);
            workout.suggestedWeight = Math.round(weight * workout.weightPercentage / 5) * 5;
          } else {
            workout.sets += 1;
          }
        }
      } else if (performance.completed && performance.difficulty > 8) {
        // Exercise was too hard, decrease intensity
        const dayIndex = Math.floor(index / adjustedPlan[0].workouts.length);
        const workoutIndex = index % adjustedPlan[0].workouts.length;
        
        if (adjustedPlan[dayIndex] && adjustedPlan[dayIndex].workouts[workoutIndex]) {
          const workout = adjustedPlan[dayIndex].workouts[workoutIndex];
          
          if (workout.weightPercentage) {
            workout.weightPercentage = Math.max(0.4, workout.weightPercentage - 0.05);
            workout.suggestedWeight = Math.round(weight * workout.weightPercentage / 5) * 5;
          } else {
            workout.sets = Math.max(1, workout.sets - 1);
          }
        }
      }
    });
  }
  
  return adjustedPlan;
};

// Generate a completely new workout plan (for when user wants fresh variety)
export const generateNewWorkoutPlanVariety = (userData) => {
  // Clear user history to force completely new workouts
  if (userData.userId) {
    userWorkoutHistory.delete(userData.userId);
  }
  
  return generateNewWorkoutPlan(userData);
};

// Nutrition plan functions
export const generateNutritionPlan = (userData, currentPlan = null, userProgress = null) => {
  // If we have progress data and current plan, adjust existing plan
  if (currentPlan && userProgress) {
    return adjustNutritionPlan(currentPlan, userProgress, userData);
  }
  
  // Otherwise generate a completely new plan
  return generateInitialNutritionPlan(userData);
};

export const generateInitialNutritionPlan = (userData) => {
  const { age, weight, height, gender, activityLevel, fitnessGoal, hasMedicalConditions, medicalConditions } = userData;
  
  const BMR = calculateBMR(age, weight, height, gender);
  const TDEE = calculateTDEE(BMR, activityLevel);
  
  // Calculate base calorie intake
  let calorieIntake = calculateCalorieIntake(TDEE, fitnessGoal);
  
  // For cutting goals, apply additional calorie reduction while maintaining protein
  let finalCalorieIntake = calorieIntake;
  let isCuttingPlan = false;
  
  if (fitnessGoal === 'cutting') {
    // User wants to cut - reduce calories by 300-500 but maintain protein
    finalCalorieIntake = calorieIntake - 400; // Default to -400 for cutting
    isCuttingPlan = true;
  }
  
  // Calculate protein intake (this remains unchanged for cutting)
  const proteinIntake = calculateProteinIntake(weight, fitnessGoal);
  
  // Check if user has medical conditions that require special nutrition
  const detectedConditions = hasMedicalConditions ? detectMedicalConditions(medicalConditions) : [];
  
  let carbPercentage = 0.5; // Default 50% carbs
  let fatPercentage = 0.25; // Default 25% fat
  
  // Adjust macronutrients based on medical conditions
  if (detectedConditions.includes('diabetes')) {
    carbPercentage = 0.4; // Lower carbs for diabetes
    fatPercentage = 0.35; // Higher healthy fats
  } else if (detectedConditions.includes('hypertension')) {
    carbPercentage = 0.45; // Slightly lower carbs
    fatPercentage = 0.25; // Maintain fat
  } else if (detectedConditions.includes('heartDisease')) {
    carbPercentage = 0.4; // Lower carbs
    fatPercentage = 0.3; // Moderate fat with focus on healthy fats
  }
  
  // For cutting plans, adjust macronutrients to prioritize protein and reduce carbs
  if (isCuttingPlan) {
    carbPercentage = 0.35; // Lower carbs for cutting
    fatPercentage = 0.25; // Maintain fat
    // Protein percentage will be higher automatically due to maintained protein intake
  }
  
  const carbIntake = (finalCalorieIntake * carbPercentage) / 4;
  const fatIntake = (finalCalorieIntake * fatPercentage) / 9;
  
  // Calculate meal distribution
  const meals = [
    {
      name: 'Breakfast',
      calories: Math.round(finalCalorieIntake * 0.25),
      protein: Math.round(proteinIntake * 0.25),
      carbs: Math.round(carbIntake * 0.25),
      fat: Math.round(fatIntake * 0.25)
    },
    {
      name: 'Lunch',
      calories: Math.round(finalCalorieIntake * 0.35),
      protein: Math.round(proteinIntake * 0.35),
      carbs: Math.round(carbIntake * 0.35),
      fat: Math.round(fatIntake * 0.35)
    },
    {
      name: 'Dinner',
      calories: Math.round(finalCalorieIntake * 0.30),
      protein: Math.round(proteinIntake * 0.30),
      carbs: Math.round(carbIntake * 0.30),
      fat: Math.round(fatIntake * 0.30)
    },
    {
      name: 'snack',
      calories: Math.round(finalCalorieIntake * 0.10),
      protein: Math.round(proteinIntake * 0.10),
      carbs: Math.round(carbIntake * 0.10),
      fat: Math.round(fatIntake * 0.10)
    }
  ];
  
  return {
    calorieIntake: Math.round(finalCalorieIntake),
    proteinIntake: Math.round(proteinIntake),
    carbIntake: Math.round(carbIntake),
    fatIntake: Math.round(fatIntake),
    meals,
    medicalConsiderations: detectedConditions.length > 0 ? 
      `Nutrition plan adjusted for: ${detectedConditions.join(', ')}` : 
      'No specific medical considerations',
    genderConsideration: gender === 'female' ? 'female_optimized' : 'standard',
    isCuttingPlan: isCuttingPlan,
    originalCalorieIntake: isCuttingPlan ? Math.round(calorieIntake) : null,
    calorieDeficit: isCuttingPlan ? Math.round(calorieIntake - finalCalorieIntake) : 0
  };
};

export const adjustNutritionPlan = (currentPlan, userProgress, userData) => {
  const { fitnessGoal, weight, medicalConditions } = userData;
  const { weightChange } = userProgress;
  
  let adjustedPlan = JSON.parse(JSON.stringify(currentPlan));
  
  // Adjust for medical conditions
  if (medicalConditions && medicalConditions.includes('diabetes')) {
    // Lower carb intake for diabetics
    adjustedPlan.carbIntake = Math.round((adjustedPlan.calorieIntake * 0.4) / 4);
    adjustedPlan.fatIntake = Math.round((adjustedPlan.calorieIntake * 0.35) / 9);
  }
  
  if (medicalConditions && medicalConditions.includes('hypertension')) {
    // Reduce sodium in meals
    adjustedPlan.meals = adjustedPlan.meals.map(meal => ({
      ...meal,
      sodium: Math.round(meal.sodium * 0.7) // Reduce sodium by 30%
    }));
  }
  
  // Adjust calories based on weight change
  if (fitnessGoal === 'muscleGain' && weightChange < 0.5) {
    // Not gaining enough weight, increase calories
    adjustedPlan.calorieIntake += 250;
    adjustedPlan.proteinIntake = Math.round(weight * 2.2);
  } else if (fitnessGoal === 'weightLoss' && weightChange > -0.5) {
    // Not losing enough weight, decrease calories
    adjustedPlan.calorieIntake = Math.max(1200, adjustedPlan.calorieIntake - 250);
  }
  
  // Recalculate macros based on new calorie intake (unless already adjusted for medical conditions)
  if (!medicalConditions || !medicalConditions.includes('diabetes')) {
    adjustedPlan.carbIntake = Math.round((adjustedPlan.calorieIntake * 0.5) / 4);
    adjustedPlan.fatIntake = Math.round((adjustedPlan.calorieIntake * 0.25) / 9);
  }
  
  // Adjust meals
  adjustedPlan.meals = adjustedPlan.meals.map(meal => {
    const calorieRatio = meal.calories / currentPlan.calorieIntake;
    const proteinRatio = meal.protein / currentPlan.proteinIntake;
    const carbRatio = meal.carbs / currentPlan.carbIntake;
    const fatRatio = meal.fat / currentPlan.fatIntake;
    
    return {
      ...meal,
      calories: Math.round(adjustedPlan.calorieIntake * calorieRatio),
      protein: Math.round(adjustedPlan.proteinIntake * proteinRatio),
      carbs: Math.round(adjustedPlan.carbIntake * carbRatio),
      fat: Math.round(adjustedPlan.fatIntake * fatRatio)
    };
  });
  
  return adjustedPlan;
};

// Additional function for flexible cutting adjustment
export const adjustNutritionForCutting = (baseNutritionPlan, calorieReduction = 400) => {
  if (calorieReduction < 300 || calorieReduction > 500) {
    throw new Error('Calorie reduction for cutting should be between 300-500 calories');
  }

  const { calorieIntake, proteinIntake, carbIntake, fatIntake, meals } = baseNutritionPlan;
  
  // Reduce calories but maintain protein
  const newCalorieIntake = calorieIntake - calorieReduction;
  
  // Recalculate carbs and fat with adjusted percentages for cutting
  const carbPercentage = 0.35; // Lower carbs for cutting
  const fatPercentage = 0.25; // Maintain fat
  
  const newCarbIntake = (newCalorieIntake * carbPercentage) / 4;
  const newFatIntake = (newCalorieIntake * fatPercentage) / 9;
  
  // Update meals with new values
  const updatedMeals = meals.map(meal => {
    const calorieRatio = meal.calories / calorieIntake;
    const proteinRatio = meal.protein / proteinIntake;
    const carbRatio = meal.carbs / carbIntake;
    const fatRatio = meal.fat / fatIntake;
    
    return {
      ...meal,
      calories: Math.round(newCalorieIntake * calorieRatio),
      protein: Math.round(proteinIntake * proteinRatio),
      carbs: Math.round(newCarbIntake * carbRatio),
      fat: Math.round(newFatIntake * fatRatio)
    };
  });
  
  return {
    ...baseNutritionPlan,
    calorieIntake: Math.round(newCalorieIntake),
    carbIntake: Math.round(newCarbIntake),
    fatIntake: Math.round(newFatIntake),
    meals: updatedMeals,
    isCuttingPlan: true,
    originalCalorieIntake: calorieIntake,
    calorieDeficit: calorieReduction
  };
};

// Export the history management for external use if needed
export const clearUserWorkoutHistory = (userId) => {
  userWorkoutHistory.delete(userId);
};

export const getUserWorkoutHistoryCount = (userId) => {
  return getUserWorkoutHistory(userId).length;
};

// Export all functions
export default {
  generateWorkoutPlan,
  adjustWorkoutPlan,
  generateNewWorkoutPlanVariety,
  generateNutritionPlan,
  generateInitialNutritionPlan,
  adjustNutritionPlan,
  adjustNutritionForCutting,
  calculateBMR,
  calculateTDEE,
  calculateCalorieIntake,
  calculateProteinIntake,
  clearUserWorkoutHistory,
  getUserWorkoutHistoryCount,
  adjustWorkoutForAge,
  selectWarmUpExercises
};