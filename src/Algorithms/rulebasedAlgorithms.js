// RulebaseAlgorithm.js - Enhanced Non-Redundant Workout Generator with Warm-ups & Cardio

import { 
  bodybuildingWorkouts, 
  powerliftingWorkouts, 
  calisthenicsWorkouts,
  medicalConditionWorkouts 
} from '../Data/workouts';

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

  // Muscle group specific warm-ups
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

  // Medical condition specific warm-ups
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

// Cardio alternatives database
const cardioAlternatives = {
  'light jogging': [
    { name: 'Brisk Walking', description: 'Fast-paced walking', duration: '8-12 minutes', intensity: 'low', equipment: 'bodyweight' },
    { name: 'Elliptical Trainer', description: 'Low-impact elliptical machine', duration: '8-12 minutes', intensity: 'low', equipment: 'elliptical machine' },
    { name: 'Stationary Bike', description: 'Moderate pace cycling', duration: '8-12 minutes', intensity: 'low-moderate', equipment: 'stationary bike' }
  ],
  'jump rope': [
    { name: 'High Knees', description: 'Running in place with high knees', duration: '5-8 minutes', intensity: 'moderate', equipment: 'bodyweight' },
    { name: 'Mountain Climbers', description: 'Alternating knee to chest in plank position', duration: '5-8 minutes', intensity: 'moderate', equipment: 'bodyweight' },
    { name: 'Burpees', description: 'Full body explosive movement', duration: '4-6 minutes', intensity: 'high', equipment: 'bodyweight' }
  ],
  'stationary bike': [
    { name: 'Outdoor Cycling', description: 'Cycling outdoors', duration: '10-15 minutes', intensity: 'low-moderate', equipment: 'bicycle' },
    { name: 'Spin Bike', description: 'Indoor cycling class style', duration: '10-15 minutes', intensity: 'moderate', equipment: 'spin bike' },
    { name: 'Recumbent Bike', description: 'Seated cycling with back support', duration: '10-15 minutes', intensity: 'low', equipment: 'recumbent bike' }
  ],
  'gentle walking': [
    { name: 'Seated Marching', description: 'Marching while seated', duration: '8-12 minutes', intensity: 'very low', equipment: 'chair' },
    { name: 'Slow Cycling', description: 'Very light cycling', duration: '10-15 minutes', intensity: 'very low', equipment: 'stationary bike' },
    { name: 'Arm Ergometer', description: 'Upper body cycling machine', duration: '8-12 minutes', intensity: 'very low', equipment: 'arm bike' }
  ],
  'seated cycling': [
    { name: 'Gentle Walking', description: 'Slow pace walking', duration: '8-12 minutes', intensity: 'very low', equipment: 'bodyweight' },
    { name: 'Water Walking', description: 'Walking in chest-deep water', duration: '10-15 minutes', intensity: 'very low', equipment: 'pool' },
    { name: 'Chair Aerobics', description: 'Seated aerobic movements', duration: '10-15 minutes', intensity: 'very low', equipment: 'chair' }
  ],
  'hiit circuit': [
    { name: 'Tabata Intervals', description: '20s max effort, 10s rest x 8 rounds', duration: '4 minutes', intensity: 'very high', equipment: 'bodyweight' },
    { name: 'Sprint Intervals', description: '30s sprint, 60s walk x 6 rounds', duration: '9 minutes', intensity: 'high', equipment: 'treadmill/track' },
    { name: 'Battle Ropes', description: '30s on, 30s rest intervals', duration: '8-10 minutes', intensity: 'high', equipment: 'battle ropes' }
  ],
  'tabata intervals': [
    { name: 'HIIT Circuit', description: '30s high intensity, 30s rest circuit', duration: '8-10 minutes', intensity: 'high', equipment: 'bodyweight' },
    { name: 'EMOM (Every Minute On the Minute)', description: 'Work at start of each minute for 8 minutes', duration: '8 minutes', intensity: 'very high', equipment: 'bodyweight' },
    { name: 'Assault Bike Sprints', description: '20s max effort on assault bike', duration: '4-6 minutes', intensity: 'very high', equipment: 'assault bike' }
  ],
  'steady state cardio': [
    { name: 'Moderate Jogging', description: 'Consistent pace jogging', duration: '15-20 minutes', intensity: 'moderate', equipment: 'bodyweight' },
    { name: 'Rowing Machine', description: 'Steady pace rowing', duration: '15-20 minutes', intensity: 'moderate', equipment: 'rower' },
    { name: 'Swimming Laps', description: 'Continuous swimming', duration: '15-20 minutes', intensity: 'moderate', equipment: 'pool' }
  ],
  'active recovery': [
    { name: 'Slow Walking', description: 'Leisurely pace walking', duration: '5-8 minutes', intensity: 'very low', equipment: 'bodyweight' },
    { name: 'Gentle Cycling', description: 'Very light cycling', duration: '5-8 minutes', intensity: 'very low', equipment: 'stationary bike' },
    { name: 'Yoga Flow', description: 'Gentle yoga sequence', duration: '5-8 minutes', intensity: 'very low', equipment: 'yoga mat' }
  ]
};

// Enhanced workout distribution patterns to avoid redundancy
const workoutDistributionPatterns = {
  // 2-day split: Full Body + Full Body (different exercises)
  '2': {
    pattern: ['Full Body A', 'Full Body B'],
    description: 'Two full body workouts with different exercise selection'
  },
  
  // 3-day split: Push/Pull/Legs or Upper/Lower/Full Body
  '3': {
    pattern: ['Push', 'Pull', 'Legs & Core'],
    alternatePattern: ['Upper A', 'Lower A', 'Full Body'],
    description: 'Classic PPL split or Upper/Lower variation'
  },
  
  // 4-day split: Upper/Lower split repeated
  '4': {
    pattern: ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
    alternatePattern: ['Push', 'Pull', 'Legs', 'Full Body & Core'],
    description: 'Upper/Lower split with varied exercises each session'
  },
  
  // 5-day split: Bro Split with strategic ordering
  '5': {
    pattern: ['Chest & Triceps', 'Back & Biceps', 'Legs & Core', 'Shoulders & Arms', 'Full Body'],
    alternatePattern: ['Push', 'Pull', 'Legs', 'Upper Body', 'Full Body & Core'],
    description: 'Bodybuilding split with comprehensive muscle targeting'
  },
  
  // 6-day split: PPL repeated
  '6': {
    pattern: ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B', 'Legs B'],
    alternatePattern: ['Upper A', 'Lower A', 'Push', 'Pull', 'Legs B', 'Full Body'],
    description: 'High frequency PPL split with exercise variation'
  }
};

// Female-optimized workout patterns with lower body focus and back workouts
const femaleWorkoutPatterns = {
  // 2-day female split: Lower focus + Upper Back Focus
  '2': {
    pattern: ['Lower Body & Core Focus', 'Upper Body & Back Emphasis'],
    description: 'Female-focused split with lower body and back emphasis'
  },
  
  // 3-day female split: Lower/Upper Back & Shoulders/Lower & Glutes
  '3': {
    pattern: ['Lower Body & Glutes', 'Back & Shoulders Focus', 'Full Body Lower & Back'],
    alternatePattern: ['Glute Focus', 'Back & Posture', 'Legs & Core with Back'],
    description: 'Female-focused program with lower body and back priority'
  },
  
  // 4-day female split: Lower/Back & Shoulders/Lower/Full Body Back Focus
  '4': {
    pattern: ['Lower Body Strength', 'Back & Shoulders', 'Glute & Hamstring Focus', 'Full Body Back Emphasis'],
    alternatePattern: ['Legs & Glutes', 'Back Development', 'Lower Body Accessory', 'Full Body Posture'],
    description: 'Balanced female program with double lower body and back days'
  },
  
  // 5-day female split
  '5': {
    pattern: ['Lower Body Power', 'Back & Biceps', 'Glute Focus', 'Upper Body & Back', 'Active Recovery & Core'],
    alternatePattern: ['Legs A', 'Back Intensive', 'Glutes & Hamstrings', 'Upper Back', 'Full Body Posture'],
    description: 'Comprehensive female program with back and lower body emphasis'
  },
  
  // 6-day female split
  '6': {
    pattern: ['Lower Body A', 'Back & Shoulders', 'Glute Focus', 'Lower Body B', 'Back & Arms', 'Full Body Core & Back'],
    alternatePattern: ['Legs Strength', 'Back Development', 'Glute Accessory', 'Legs Hypertrophy', 'Back Intensive', 'Core & Posture'],
    description: 'Advanced female program with significant back and lower body work'
  }
};

// Powerlifting-specific workout patterns
const powerliftingWorkoutPatterns = {
  // 2-day powerlifting split
  '2': {
    pattern: ['Squat & Bench Focus', 'Deadlift & Accessory'],
    description: 'Powerlifting focus on main lifts with accessory work'
  },
  
  // 3-day powerlifting split
  '3': {
    pattern: ['Squat Day', 'Bench Day', 'Deadlift Day'],
    alternatePattern: ['Competition Day A', 'Competition Day B', 'Accessory Day'],
    description: 'Classic powerlifting SBD split'
  },
  
  // 4-day powerlifting split
  '4': {
    pattern: ['Squat Focus', 'Bench Focus', 'Deadlift Focus', 'Bodybuilding Accessory'],
    alternatePattern: ['Heavy Squat', 'Heavy Bench', 'Heavy Deadlift', 'Volume Day'],
    description: 'Powerlifting program with dedicated bodybuilding accessory day'
  },
  
  // 5-day powerlifting split
  '5': {
    pattern: ['Squat Strength', 'Bench Strength', 'Deadlift Strength', 'Upper Accessory', 'Lower Accessory'],
    alternatePattern: ['Competition Squat', 'Competition Bench', 'Competition Deadlift', 'Upper Bodybuilding', 'Lower Bodybuilding'],
    description: 'Advanced powerlifting with bodybuilding hypertrophy work'
  },
  
  // 6-day powerlifting split
  '6': {
    pattern: ['Heavy Squat', 'Heavy Bench', 'Heavy Deadlift', 'Upper Volume', 'Lower Volume', 'Active Recovery'],
    alternatePattern: ['Squat Variation', 'Bench Variation', 'Deadlift Variation', 'Chest & Back', 'Legs & Shoulders', 'Arms & Core'],
    description: 'High-frequency powerlifting with bodybuilding focus'
  }
};

// Calisthenics-specific workout patterns
const calisthenicsWorkoutPatterns = {
  // 2-day calisthenics split
  '2': {
    pattern: ['Upper Body Skills', 'Lower Body & Core'],
    description: 'Fundamental calisthenics split focusing on basic movements'
  },
  
  // 3-day calisthenics split
  '3': {
    pattern: ['Push Skills', 'Pull Skills', 'Legs & Core Skills'],
    alternatePattern: ['Skill Day A', 'Strength Day', 'Skill Day B'],
    description: 'Classic calisthenics PPL with skill development'
  },
  
  // 4-day calisthenics split
  '4': {
    pattern: ['Upper Strength', 'Lower Body', 'Skill Practice', 'Full Body Flow'],
    alternatePattern: ['Push Focus', 'Pull Focus', 'Legs & Core', 'Skill Integration'],
    description: 'Balanced calisthenics program with strength and skill work'
  },
  
  // 5-day calisthenics split
  '5': {
    pattern: ['Push Skills', 'Pull Skills', 'Legs & Core', 'Skill Practice', 'Full Body Circuit'],
    alternatePattern: ['Strength Day', 'Skill Day A', 'Active Recovery', 'Skill Day B', 'Flow Day'],
    description: 'Advanced calisthenics program with dedicated skill days'
  },
  
  // 6-day calisthenics split
  '6': {
    pattern: ['Push A', 'Pull A', 'Legs A', 'Push B', 'Pull B', 'Skill Integration'],
    alternatePattern: ['Strength Focus', 'Skill Practice', 'Active Recovery', 'Strength Focus', 'Skill Practice', 'Flow & Mobility'],
    description: 'High-frequency calisthenics training for advanced practitioners'
  }
};

// Muscle group mapping for each workout type
const muscleGroupFocus = {
  // Push days
  'Push': ['chest', 'shoulders', 'triceps'],
  'Push A': ['chest', 'shoulders', 'triceps'],
  'Push B': ['chest', 'shoulders', 'triceps'],
  
  // Pull days
  'Pull': ['back', 'biceps', 'rear delts'],
  'Pull A': ['back', 'biceps', 'rear delts'],
  'Pull B': ['back', 'biceps', 'rear delts'],
  
  // Leg days
  'Legs': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Legs A': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Legs B': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Legs & Core': ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  
  // Upper body days
  'Upper': ['chest', 'back', 'shoulders', 'arms'],
  'Upper A': ['chest', 'back', 'shoulders', 'arms'],
  'Upper B': ['chest', 'back', 'shoulders', 'arms'],
  
  // Lower body days
  'Lower': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Lower A': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Lower B': ['quads', 'hamstrings', 'glutes', 'calves'],
  
  // Full body days
  'Full Body': ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'],
  'Full Body A': ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'],
  'Full Body B': ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'],
  'Full Body & Core': ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'],
  
  // Bro splits
  'Chest & Triceps': ['chest', 'triceps'],
  'Back & Biceps': ['back', 'biceps'],
  'Shoulders & Arms': ['shoulders', 'biceps', 'triceps'],
  'Back & Core': ['back', 'core'],

  // Calisthenics specific
  'Upper Body Skills': ['chest', 'back', 'shoulders', 'arms'],
  'Lower Body & Core': ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  'Push Skills': ['chest', 'shoulders', 'triceps'],
  'Pull Skills': ['back', 'biceps', 'rear delts'],
  'Legs & Core Skills': ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  'Skill Day A': ['full body'],
  'Skill Day B': ['full body'],
  'Upper Strength': ['chest', 'back', 'shoulders', 'arms'],
  'Skill Practice': ['full body'],
  'Full Body Flow': ['full body'],
  'Push Focus': ['chest', 'shoulders', 'triceps'],
  'Pull Focus': ['back', 'biceps', 'rear delts'],
  'Skill Integration': ['full body'],
  'Full Body Circuit': ['full body'],
  'Strength Day': ['full body'],
  'Active Recovery': ['full body'],
  'Flow Day': ['full body'],
  'Flow & Mobility': ['full body'],

  // Powerlifting specific
  'Squat & Bench Focus': ['quads', 'chest', 'shoulders', 'triceps'],
  'Deadlift & Accessory': ['hamstrings', 'back', 'glutes'],
  'Squat Day': ['quads', 'hamstrings', 'glutes'],
  'Bench Day': ['chest', 'shoulders', 'triceps'],
  'Deadlift Day': ['hamstrings', 'back', 'glutes'],
  'Competition Day A': ['quads', 'chest'],
  'Competition Day B': ['back', 'hamstrings'],
  'Accessory Day': ['full body'],
  'Squat Focus': ['quads', 'hamstrings', 'glutes'],
  'Bench Focus': ['chest', 'shoulders', 'triceps'],
  'Deadlift Focus': ['hamstrings', 'back', 'glutes'],
  'Bodybuilding Accessory': ['full body'],
  'Heavy Squat': ['quads', 'hamstrings', 'glutes'],
  'Heavy Bench': ['chest', 'shoulders', 'triceps'],
  'Heavy Deadlift': ['hamstrings', 'back', 'glutes'],
  'Volume Day': ['full body'],
  'Squat Strength': ['quads', 'hamstrings', 'glutes'],
  'Bench Strength': ['chest', 'shoulders', 'triceps'],
  'Deadlift Strength': ['hamstrings', 'back', 'glutes'],
  'Upper Accessory': ['chest', 'back', 'shoulders', 'arms'],
  'Lower Accessory': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Competition Squat': ['quads', 'hamstrings', 'glutes'],
  'Competition Bench': ['chest', 'shoulders', 'triceps'],
  'Competition Deadlift': ['hamstrings', 'back', 'glutes'],
  'Upper Bodybuilding': ['chest', 'back', 'shoulders', 'arms'],
  'Lower Bodybuilding': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Upper Volume': ['chest', 'back', 'shoulders', 'arms'],
  'Lower Volume': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Squat Variation': ['quads', 'hamstrings', 'glutes'],
  'Bench Variation': ['chest', 'shoulders', 'triceps'],
  'Deadlift Variation': ['hamstrings', 'back', 'glutes'],
  'Chest & Back': ['chest', 'back'],
  'Legs & Shoulders': ['quads', 'hamstrings', 'glutes', 'shoulders'],
  'Arms & Core': ['biceps', 'triceps', 'core'],

  // Female-specific workout types with back emphasis
  'Lower Body & Core Focus': ['quads', 'hamstrings', 'glutes', 'calves', 'core'],
  'Upper Body & Back Emphasis': ['back', 'chest', 'shoulders', 'arms', 'core'],
  'Lower Body & Glutes': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Back & Shoulders Focus': ['back', 'shoulders', 'rear delts', 'traps'],
  'Full Body Lower & Back': ['chest', 'back', 'glutes', 'hamstrings', 'quads', 'core'],
  'Glute Focus': ['glutes', 'hamstrings', 'core'],
  'Back & Posture': ['back', 'rear delts', 'traps', 'core'],
  'Legs & Core with Back': ['quads', 'hamstrings', 'glutes', 'calves', 'back', 'core'],
  'Lower Body Strength': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Back & Shoulders': ['back', 'shoulders', 'rear delts'],
  'Glute & Hamstring Focus': ['glutes', 'hamstrings', 'core'],
  'Full Body Back Emphasis': ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'],
  'Legs & Glutes': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Back Development': ['back', 'biceps', 'rear delts'],
  'Lower Body Accessory': ['glutes', 'hamstrings', 'calves', 'core'],
  'Full Body Posture': ['chest', 'back', 'shoulders', 'legs', 'core'],
  'Lower Body Power': ['quads', 'hamstrings', 'glutes'],
  'Back & Biceps': ['back', 'biceps', 'rear delts'],
  'Upper Body & Back': ['chest', 'back', 'shoulders', 'arms'],
  'Active Recovery & Core': ['core', 'full body'],
  'Legs A': ['quads', 'hamstrings', 'glutes'],
  'Back Intensive': ['back', 'biceps', 'rear delts', 'traps'],
  'Glutes & Hamstrings': ['glutes', 'hamstrings'],
  'Upper Back': ['back', 'shoulders', 'rear delts'],
  'Full Body Posture': ['chest', 'back', 'shoulders', 'legs', 'core'],
  'Lower Body A': ['quads', 'hamstrings', 'glutes'],
  'Back & Shoulders': ['back', 'shoulders', 'rear delts'],
  'Lower Body B': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Back & Arms': ['back', 'biceps', 'triceps'],
  'Full Body Core & Back': ['chest', 'back', 'shoulders', 'legs', 'core'],
  'Legs Strength': ['quads', 'hamstrings', 'glutes'],
  'Back Development': ['back', 'biceps', 'rear delts'],
  'Glute Accessory': ['glutes', 'hamstrings'],
  'Legs Hypertrophy': ['quads', 'hamstrings', 'glutes', 'calves'],
  'Back Intensive': ['back', 'biceps', 'rear delts', 'traps'],
  'Core & Posture': ['core', 'back', 'full body']
};

// Exercise pools categorized by muscle group and equipment
const exercisePools = {
  chest: [
    'Barbell Bench Press', 'Dumbbell Bench Press', 'Incline Bench Press', 
    'Decline Bench Press', 'Cable Crossover', 'Dumbbell Flyes', 'Push Ups',
    'Machine Chest Press', 'Pec Deck', 'Incline Dumbbell Press', 'Floor Press',
    'Close Grip Bench Press', 'Spoto Press'
  ],
  back: [
    'Pull Ups', 'Lat Pulldown', 'Barbell Row', 'Dumbbell Row', 'T-Bar Row',
    'Seated Cable Row', 'Deadlift', 'Machine Row', 'Inverted Row', 'Face Pulls',
    'Rack Pulls', 'Sumo Deadlift', 'Conventional Deadlift'
  ],
  shoulders: [
    'Overhead Press', 'Dumbbell Shoulder Press', 'Lateral Raises', 'Front Raises',
    'Rear Delt Flyes', 'Arnold Press', 'Upright Rows', 'Face Pulls', 'Shrugs',
    'Landmine Press', 'Push Press'
  ],
  biceps: [
    'Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Preacher Curl', 'Concentration Curl',
    'Cable Curl', 'Incline Curl', 'Reverse Curl', 'Zottman Curl', 'Spider Curl'
  ],
  triceps: [
    'Triceps Pushdown', 'Overhead Triceps Extension', 'Skull Crushers', 'Close Grip Bench Press',
    'Dips', 'Bench Dips', 'Cable Kickbacks', 'Dumbbell Triceps Extension', 'JM Press'
  ],
  quads: [
    'Barbell Squat', 'Leg Press', 'Hack Squat', 'Leg Extension', 'Bulgarian Split Squat',
    'Goblet Squat', 'Front Squat', 'Lunges', 'Step Ups', 'Box Squat', 'Pause Squat'
  ],
  hamstrings: [
    'Romanian Deadlift', 'Leg Curl', 'Good Mornings', 'Glute Ham Raise', 'Kettlebell Swing',
    'Stiff Leg Deadlift', 'Nordic Curls', 'Reverse Hyperextension'
  ],
  glutes: [
    'Hip Thrust', 'Glute Bridge', 'Cable Pull Through', 'Donkey Kicks', 'Fire Hydrants',
    'Bulgarian Split Squat', 'Lunges', 'Kettlebell Swing'
  ],
  calves: [
    'Standing Calf Raise', 'Seated Calf Raise', 'Donkey Calf Raise', 'Leg Press Calf Raise',
    'Jump Rope', 'Box Jumps', 'Farmer\'s Walk on Toes'
  ],
  core: [
    'Plank', 'Russian Twists', 'Leg Raises', 'Cable Crunches', 'Ab Wheel', 'Mountain Climbers',
    'Hanging Knee Raises', 'L-sit', 'Dragon Flags', 'Bird Dog', 'Dead Bug', 'Windshield Wipers',
    'Hollow Body Hold', 'V-ups'
  ]
};

// Female-optimized exercise pools with lower body and back emphasis
const femaleExercisePools = {
  chest: [
    'Dumbbell Bench Press', 'Incline Dumbbell Press', 'Push Ups', 'Cable Crossover', 
    'Machine Chest Press', 'Dumbbell Flyes', 'Incline Push Ups', 'Pec Deck'
  ],
  back: [
    'Lat Pulldown', 'Seated Cable Row', 'Dumbbell Row', 'Machine Row', 'Face Pulls',
    'Inverted Row', 'Assisted Pull-ups', 'Reverse Flyes', 'Straight Arm Pulldown',
    'Single Arm Dumbbell Row', 'Cable Row', 'Band Pull Aparts', 'Superman Holds',
    'Back Extensions', 'T-Bar Row', 'Wide Grip Lat Pulldown', 'Close Grip Lat Pulldown'
  ],
  shoulders: [
    'Dumbbell Shoulder Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Flyes',
    'Arnold Press', 'Face Pulls', 'Upright Rows', 'Cable Lateral Raises'
  ],
  biceps: [
    'Dumbbell Curl', 'Hammer Curl', 'Concentration Curl', 'Cable Curl',
    'Incline Curl', 'Preacher Curl', 'Band Curls'
  ],
  triceps: [
    'Triceps Pushdown', 'Overhead Triceps Extension', 'Bench Dips', 'Cable Kickbacks',
    'Dumbbell Triceps Extension', 'Close Grip Push Ups', 'Skull Crushers'
  ],
  quads: [
    'Goblet Squat', 'Bulgarian Split Squat', 'Lunges', 'Leg Press', 'Step Ups',
    'Box Squat', 'Bodyweight Squats', 'Leg Extension', 'Wall Sits'
  ],
  hamstrings: [
    'Romanian Deadlift', 'Leg Curl', 'Glute Ham Raise', 'Kettlebell Swing',
    'Stiff Leg Deadlift', 'Nordic Curls', 'Good Mornings', 'Stability Ball Leg Curl'
  ],
  glutes: [
    'Hip Thrust', 'Glute Bridge', 'Cable Pull Through', 'Donkey Kicks', 'Fire Hydrants',
    'Bulgarian Split Squat', 'Lunges', 'Kettlebell Swing', 'Frog Pumps', 'Single Leg Glute Bridge',
    'Curtsy Lunges', 'Cable Kickbacks', 'Band Glute Bridges'
  ],
  calves: [
    'Standing Calf Raise', 'Seated Calf Raise', 'Leg Press Calf Raise', 'Box Jumps',
    'Jump Rope', 'Single Leg Calf Raises', 'Donkey Calf Raises'
  ],
  core: [
    'Plank', 'Bird Dog', 'Dead Bug', 'Glute Bridge', 'Russian Twists', 'Leg Raises',
    'Mountain Climbers', 'Hollow Body Hold', 'Side Plank', 'Cable Crunches', 'Ab Wheel',
    'Reverse Crunches', 'Bicycle Crunches', 'L-sit Hold'
  ]
};

// Powerlifting-specific exercise pools
const powerliftingExercisePools = {
  // SBD Main Lifts
  competition_squat: [
    'Low Bar Squat', 'High Bar Squat', 'Competition Squat', 'Pause Squat',
    'Tempo Squat', 'Box Squat', 'Safety Bar Squat'
  ],
  competition_bench: [
    'Competition Bench Press', 'Pause Bench Press', 'Close Grip Bench Press',
    'Spoto Press', 'Floor Press', 'Pin Press', 'Board Press'
  ],
  competition_deadlift: [
    'Conventional Deadlift', 'Sumo Deadlift', 'Competition Deadlift',
    'Deficit Deadlift', 'Rack Pulls', 'Block Pulls', 'Pause Deadlift'
  ],
  
  // Squat variations
  squat_variations: [
    'Front Squat', 'Pause Squat', 'Box Squat', 'Tempo Squat', 'Safety Bar Squat',
    'Belt Squat', 'Zercher Squat', 'Hack Squat'
  ],
  
  // Bench variations
  bench_variations: [
    'Close Grip Bench Press', 'Incline Bench Press', 'Floor Press', 'Pin Press',
    'Spoto Press', 'Board Press', 'Reverse Band Bench'
  ],
  
  // Deadlift variations
  deadlift_variations: [
    'Romanian Deadlift', 'Stiff Leg Deadlift', 'Deficit Deadlift', 'Rack Pulls',
    'Block Pulls', 'Snatch Grip Deadlift', 'Trap Bar Deadlift'
  ],
  
  // Powerlifting accessories
  squat_accessories: [
    'Leg Press', 'Hack Squat', 'Belt Squat', 'Bulgarian Split Squat',
    'Lunges', 'Leg Extension', 'Good Mornings'
  ],
  bench_accessories: [
    'Dumbbell Bench Press', 'Incline Dumbbell Press', 'Dips', 'Push Ups',
    'Cable Crossovers', 'Triceps Extensions', 'Face Pulls'
  ],
  deadlift_accessories: [
    'Barbell Rows', 'Dumbbell Rows', 'Pull Ups', 'Lat Pulldowns',
    'Hyperextensions', 'Glute Ham Raises', 'Kettlebell Swings'
  ]
};

// Calisthenics-specific exercise pools
const calisthenicsExercisePools = {
  chest: [
    'Push Ups', 'Decline Push Ups', 'Incline Push Ups', 'Diamond Push Ups', 
    'Wide Grip Push Ups', 'Archer Push Ups', 'Pseudo Planche Push Ups',
    'One Arm Push Up Progressions', 'Planche Push Up Progressions'
  ],
  back: [
    'Pull Ups', 'Chin Ups', 'Australian Pull Ups', 'Archer Pull Ups', 
    'Typewriter Pull Ups', 'One Arm Pull Up Progressions', 'Front Lever Progressions',
    'Back Lever Progressions', 'Muscle Up Progressions'
  ],
  shoulders: [
    'Pike Push Ups', 'Handstand Push Up Progressions', 'Handstand Hold',
    'Wall Handstand', 'Planche Lean', 'Planche Progressions'
  ],
  biceps: [
    'Chin Ups', 'Australian Pull Ups', 'Bodyweight Curls', 'Towel Curls',
    'Ring Curls', 'Isometric Holds'
  ],
  triceps: [
    'Dips', 'Bench Dips', 'Diamond Push Ups', 'Close Grip Push Ups',
    'Korean Dips', 'Russian Dips', 'Bar Dips'
  ],
  quads: [
    'Bodyweight Squats', 'Pistol Squats', 'Shrimp Squats', 'Bulgarian Split Squats',
    'Sissy Squats', 'Jump Squats', 'Box Jumps'
  ],
  hamstrings: [
    'Nordic Curls', 'Glute Ham Raises', 'Single Leg Deadlifts', 'Sliding Leg Curls',
    'Swiss Ball Leg Curls'
  ],
  glutes: [
    'Hip Thrusts', 'Glute Bridges', 'Single Leg Glute Bridges', 'Donkey Kicks',
    'Fire Hydrants', 'Frog Pumps'
  ],
  calves: [
    'Calf Raises', 'Single Leg Calf Raises', 'Jump Rope', 'Box Jumps',
    'Plyometric Jumps'
  ],
  core: [
    'L-sit', 'Hanging Leg Raises', 'Dragon Flags', 'Windshield Wipers',
    'Hollow Body Hold', 'Arch Body Hold', 'V-ups', 'Human Flag Progressions',
    'Front Lever Progressions', 'Planche Progressions', 'Toes to Bar',
    'Knee Raises', 'Russian Twists', 'Plank Variations'
  ],
  skills: [
    'Handstand Practice', 'Planche Progressions', 'Front Lever Progressions',
    'Back Lever Progressions', 'Muscle Up Progressions', 'Human Flag Progressions',
    'L-sit to Handstand', 'Skin the Cat', '360 Pulls', 'One Arm Chin Up Progressions'
  ],
  mobility: [
    'Wrist Mobility', 'Shoulder Mobility', 'Hip Mobility', 'Spinal Waves',
    'German Hang', 'Skin the Cat', 'Bridge Progressions'
  ]
};

// Exercise alternatives database - same muscle groups, different equipment
const exerciseAlternatives = {
  // Chest exercises alternatives
  'barbell bench press': [
    { name: 'Dumbbell Bench Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Machine Chest Press', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Cable Chest Press', equipment: 'cable', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],
  'incline barbell bench press': [
    { name: 'Incline Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Incline Machine Press', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Incline Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],
  'decline barbell bench press': [
    { name: 'Decline Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Decline Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],
  'dumbbell bench press': [
    { name: 'Machine Chest Press', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Cable Chest Press', equipment: 'cable', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],
  
  // Back exercises alternatives
  'barbell row': [
    { name: 'Dumbbell Row', equipment: 'dumbbells', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Machine Row', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Cable Row', equipment: 'cable', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'T-Bar Row', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' }
  ],
  'lat pulldown': [
    { name: 'Pull Ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Assisted Pull Ups', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Dumbbell Pullover', equipment: 'dumbbells', muscleGroup: 'back', difficulty: 'intermediate' }
  ],
  'deadlift': [
    { name: 'Dumbbell Deadlift', equipment: 'dumbbells', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Kettlebell Deadlift', equipment: 'kettlebell', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Rack Pull', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' }
  ],
  
  // Shoulder exercises alternatives
  'barbell overhead press': [
    { name: 'Dumbbell Shoulder Press', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shoulder Press', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Arnold Press', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Push Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' }
  ],
  'barbell shrug': [
    { name: 'Dumbbell Shrug', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shrug', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Farmer\'s Walk', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' }
  ],
  
  // Leg exercises alternatives
  'barbell squat': [
    { name: 'Dumbbell Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Machine Squat', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],
  'leg press': [
    { name: 'Dumbbell Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Step Ups', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Bulgarian Split Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],
  'barbell lunge': [
    { name: 'Dumbbell Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Walking Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Reverse Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Step Ups', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],
  
  // Arm exercises alternatives
  'barbell curl': [
    { name: 'Dumbbell Curl', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Cable Curl', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Machine Curl', equipment: 'machine', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Hammer Curl', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'beginner' }
  ],
  'triceps pushdown': [
    { name: 'Dumbbell Triceps Extension', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Overhead Triceps Extension', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Bench Dips', equipment: 'bodyweight', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Close Grip Push Ups', equipment: 'bodyweight', muscleGroup: 'arms', difficulty: 'intermediate' }
  ],

  // New exercise alternatives added
  'dumbbell flyes': [
    { name: 'Cable Crossover', equipment: 'cable', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pec Deck Machine', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Butterfly Machine', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Plate Press', equipment: 'free weights', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'cable crossover': [
    { name: 'Dumbbell Flyes', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pec Deck Machine', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Band Crossovers', equipment: 'bands', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Incline Dumbbell Flyes', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'dips': [
    { name: 'Bench Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Machine Dip', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Cable Pushdown', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' }
  ],

  'pullups': [
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted Pull-up Machine', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Band Assisted Pull-ups', equipment: 'bands', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  'lateral raises': [
    { name: 'Cable Lateral Raises', equipment: 'cable', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Machine Lateral Raises', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Bent Over Lateral Raises', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Plate Raises', equipment: 'free weights', muscleGroup: 'shoulders', difficulty: 'beginner' }
  ],

  'front raises': [
    { name: 'Cable Front Raises', equipment: 'cable', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Plate Front Raises', equipment: 'free weights', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Barbell Front Raises', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Machine Shoulder Press', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' }
  ],

  'face pull': [
    { name: 'Band Face Pulls', equipment: 'bands', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Cable External Rotation', equipment: 'cable', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Bent Over Rear Delt Flyes', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Reverse Pec Deck', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' }
  ],

  'preacher curl': [
    { name: 'Incline Dumbbell Curl', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'intermediate' },
    { name: 'Machine Preacher Curl', equipment: 'machine', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Cable Curl', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Concentration Curl', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'beginner' }
  ],

  'hammer curl': [
    { name: 'Rope Hammer Curl', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Barbell Hammer Curl', equipment: 'barbell', muscleGroup: 'arms', difficulty: 'intermediate' },
    { name: 'Machine Curl', equipment: 'machine', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Zottman Curl', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'intermediate' }
  ],

  'skull crusher': [
    { name: 'Cable Overhead Extension', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Machine Triceps Extension', equipment: 'machine', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Dumbbell Skull Crusher', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'intermediate' },
    { name: 'Close Grip Push Up', equipment: 'bodyweight', muscleGroup: 'arms', difficulty: 'beginner' }
  ],

  'overhead triceps extension': [
    { name: 'Cable Overhead Extension', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Machine Triceps Extension', equipment: 'machine', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Dumbbell Overhead Extension', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'intermediate' },
    { name: 'Barbell Overhead Extension', equipment: 'barbell', muscleGroup: 'arms', difficulty: 'intermediate' }
  ],

  'legs extension': [
    { name: 'Bodyweight Sissy Squat', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Step Ups', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'leg curls': [
    { name: 'Nordic Hamstring Curl', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'advanced' },
    { name: 'Swiss Ball Leg Curl', equipment: 'stability ball', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'calf raises': [
    { name: 'Machine Calf Raises', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Leg Press Calf Raises', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Donkey Calf Raises', equipment: 'machine', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Barbell Calf Raises', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'lunges': [
    { name: 'Split Squats', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Step Ups', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Bulgarian Split Squats', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Reverse Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'hack squat': [
    { name: 'Barbell Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Dumbbell Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Leg Press', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Goblet Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'seated calf raises': [
    { name: 'Machine Seated Calf Raises', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Dumbbell Seated Calf Raises', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Barbell Seated Calf Raises', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Single Leg Calf Raises', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'abdominal crunches': [
    { name: 'Cable Crunches', equipment: 'cable', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Machine Crunches', equipment: 'machine', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Reverse Crunches', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Plate Crunches', equipment: 'free weights', muscleGroup: 'core', difficulty: 'intermediate' }
  ],

  // Newly added alternatives
  'seated cable rows': [
    { name: 'Dumbbell Rows', equipment: 'dumbbells', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Barbell Rows', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Machine Rows', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'T-Bar Rows', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' }
  ],

  'pull ups': [
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted Pull-ups', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Chin-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Band Assisted Pull-ups', equipment: 'bands', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Negative Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' }
  ],

  'leg extension': [
    { name: 'Bodyweight Sissy Squat', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Step Ups', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Bulgarian Split Squats', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  // Newly requested alternatives
  'close grip bench press': [
    { name: 'Triceps Pushdown', equipment: 'cable', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Dumbbell Triceps Extension', equipment: 'dumbbells', muscleGroup: 'arms', difficulty: 'beginner' },
    { name: 'Close Grip Push Ups', equipment: 'bodyweight', muscleGroup: 'arms', difficulty: 'intermediate' },
    { name: 'Skull Crushers', equipment: 'barbell', muscleGroup: 'arms', difficulty: 'intermediate' },
    { name: 'Bench Dips', equipment: 'bodyweight', muscleGroup: 'arms', difficulty: 'beginner' }
  ],

  'dumbbell rows': [
    { name: 'Barbell Rows', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Cable Rows', equipment: 'cable', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Machine Rows', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'T-Bar Rows', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Kettlebell Rows', equipment: 'kettlebell', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  't-bar rows': [
    { name: 'Barbell Rows', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Dumbbell Rows', equipment: 'dumbbells', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Cable Rows', equipment: 'cable', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Machine Rows', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Seated Cable Rows', equipment: 'cable', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  'shrugs': [
    { name: 'Dumbbell Shrugs', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shrugs', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Barbell Shrugs', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Farmer\'s Walk', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Upright Rows', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' }
  ],

  // New powerlifting exercise alternatives
  'competition bench press': [
    { name: 'Pause Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dumbbell Bench Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Floor Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Spoto Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'competition squat': [
    { name: 'Pause Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Box Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Tempo Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'High Bar Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'pause bench press': [
    { name: 'Competition Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dumbbell Bench Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Floor Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pin Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'pause squat': [
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Box Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Tempo Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Safety Bar Squat', equipment: 'specialty bar', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'front squat': [
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Pause Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Zercher Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'advanced' },
    { name: 'High Bar Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'rack pulls': [
    { name: 'Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Block Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Deficit Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'incline bench press': [
    { name: 'Dumbbell Incline Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Machine Incline Press', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Landmine Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Cable Incline Press', equipment: 'cable', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'box squat': [
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Pause Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Bulgarian Split Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'floor press': [
    { name: 'Competition Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dumbbell Floor Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pin Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' },
    { name: 'Board Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'safety bar squat': [
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Zercher Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'advanced' },
    { name: 'High Bar Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'zercher squat': [
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Safety Bar Squat', equipment: 'specialty bar', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Landmine Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'spoto press': [
    { name: 'Pause Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Competition Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dumbbell Bench Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Pin Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'tempo squat': [
    { name: 'Pause Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Box Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'High Bar Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'block pulls': [
    { name: 'Rack Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Deficit Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'reverse band bench': [
    { name: 'Competition Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pause Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Floor Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pin Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'belt squat': [
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Goblet Squat', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Leg Press', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Hack Squat', equipment: 'machine', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'sumo deadlift': [
    { name: 'Conventional Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Rack Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Block Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Deficit Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'pin press': [
    { name: 'Competition Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pause Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Floor Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Spoto Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'high bar squat': [
    { name: 'Competition Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Front Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Pause Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Box Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Tempo Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'board press': [
    { name: 'Competition Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pause Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Floor Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pin Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'deficit deadlift': [
    { name: 'Conventional Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Rack Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Block Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'conventional deadlift': [
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Rack Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Block Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Deficit Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'landmine press': [
    { name: 'Barbell Overhead Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Dumbbell Shoulder Press', equipment: 'dumbbells', machineGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shoulder Press', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Push Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Arnold Press', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'intermediate' }
  ],

  'good mornings': [
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Stiff Leg Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Back Extension', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Reverse Hyperextension', equipment: 'machine', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Kettlebell Swing', equipment: 'kettlebell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'stiff leg deadlift': [
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Conventional Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Back Extension', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  'romanian deadlift': [
    { name: 'Stiff Leg Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Conventional Deadlift', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Back Extension', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  'barbell hip thrust': [
    { name: 'Glute Bridge', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Cable Pull Through', equipment: 'cable', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Kettlebell Swing', equipment: 'kettlebell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Machine Hip Thrust', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Band Hip Thrust', equipment: 'bands', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'cable pull through': [
    { name: 'Barbell Hip Thrust', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Glute Bridge', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Kettlebell Swing', equipment: 'kettlebell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Machine Hip Thrust', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'glute bridge': [
    { name: 'Barbell Hip Thrust', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Cable Pull Through', equipment: 'cable', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Machine Hip Thrust', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Band Hip Thrust', equipment: 'bands', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Single Leg Glute Bridge', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'kettlebell swing': [
    { name: 'Barbell Hip Thrust', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Cable Pull Through', equipment: 'cable', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Glute Bridge', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'machine hip thrust': [
    { name: 'Barbell Hip Thrust', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Glute Bridge', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Cable Pull Through', equipment: 'cable', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Kettlebell Swing', equipment: 'kettlebell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Band Hip Thrust', equipment: 'bands', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'band hip thrust': [
    { name: 'Barbell Hip Thrust', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Glute Bridge', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Machine Hip Thrust', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Cable Pull Through', equipment: 'cable', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Single Leg Glute Bridge', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'single leg glute bridge': [
    { name: 'Glute Bridge', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Barbell Hip Thrust', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Machine Hip Thrust', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Band Hip Thrust', equipment: 'bands', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Bulgarian Split Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'back extension': [
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Stiff Leg Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Reverse Hyperextension', equipment: 'machine', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Superman', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  'reverse hyperextension': [
    { name: 'Back Extension', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Stiff Leg Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Kettlebell Swing', equipment: 'kettlebell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'superman': [
    { name: 'Back Extension', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Reverse Hyperextension', equipment: 'machine', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Bird Dog', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  'bird dog': [
    { name: 'Superman', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Back Extension', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Reverse Hyperextension', equipment: 'machine', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Good Mornings', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Romanian Deadlift', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' }
  ],

  // Calisthenics exercises
  'pull-ups': [
    { name: 'Chin-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted Pull-ups', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Negative Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' }
  ],

  'push-ups': [
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Machine Chest Press', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Cable Chest Press', equipment: 'cable', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'muscle-ups': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted Muscle-ups', equipment: 'bands', muscleGroup: 'back', difficulty: 'advanced' },
    { name: 'Negative Muscle-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'handstand push-ups': [
    { name: 'Overhead Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Dumbbell Shoulder Press', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shoulder Press', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Pike Push-ups', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Handstand Hold', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'advanced' }
  ],

  'pistol squats': [
    { name: 'Barbell Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Dumbbell Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Leg Press', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Bulgarian Split Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'l-sit': [
    { name: 'Leg Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Hanging Leg Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Knee Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Plank', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'V-sit', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'advanced' }
  ],

  'front lever': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Tuck Front Lever', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Advanced Tuck Front Lever', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'planche': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Planche Lean', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Tuck Planche', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'human flag': [
    { name: 'Side Plank', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Oblique Crunches', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Russian Twists', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Windshield Wipers', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'advanced' },
    { name: 'Human Flag Progressions', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'advanced' }
  ],

  'chin-ups': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted Chin-ups', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Negative Chin-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' }
  ],

  'archer push-ups': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'One-arm Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' },
    { name: 'Decline Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'dragon flags': [
    { name: 'Leg Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Hanging Leg Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Knee Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Reverse Crunches', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'L-sit', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' }
  ],

  'handstand hold': [
    { name: 'Overhead Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Dumbbell Shoulder Press', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shoulder Press', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Pike Push-ups', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Wall Handstand', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'intermediate' }
  ],

  'bulgarian split squats': [
    { name: 'Barbell Squat', equipment: 'barbell', muscleGroup: 'legs', difficulty: 'intermediate' },
    { name: 'Dumbbell Squat', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Leg Press', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Lunges', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' },
    { name: 'Step Ups', equipment: 'dumbbells', muscleGroup: 'legs', difficulty: 'beginner' }
  ],

  'back lever': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Tuck Back Lever', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Advanced Tuck Back Lever', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'one-arm push-ups': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Archer Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' },
    { name: 'Decline Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'hanging leg raises': [
    { name: 'Leg Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Knee Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Reverse Crunches', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'L-sit', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Dragon Flags', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'advanced' }
  ],

  'muscle-up progressions': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted Muscle-ups', equipment: 'bands', muscleGroup: 'back', difficulty: 'advanced' },
    { name: 'Negative Muscle-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'planche push-up progressions': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Planche Lean', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Tuck Planche', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'front lever rows': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Tuck Front Lever', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Advanced Tuck Front Lever', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'pseudo planche push-ups': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dips', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Planche Lean', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Tuck Planche', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  '90° push-ups': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Decline Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Handstand Push-ups', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'advanced' }
  ],

  'one-arm pull-up progressions': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Chin-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Assisted One-arm Pull-ups', equipment: 'bands', muscleGroup: 'back', difficulty: 'advanced' },
    { name: 'Negative One-arm Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ],

  'human flag progressions': [
    { name: 'Side Plank', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Oblique Crunches', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
    { name: 'Russian Twists', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' },
    { name: 'Windshield Wipers', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'advanced' },
    { name: 'Human Flag Training', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'advanced' }
  ],

  'ring push-ups': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Stability Ball Push-ups', equipment: 'stability ball', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Suspension Trainer Push-ups', equipment: 'suspension trainer', muscleGroup: 'chest', difficulty: 'intermediate' }
  ],

  'ring rows': [
    { name: 'Pull-ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Lat Pulldown', equipment: 'machine', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Inverted Rows', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Seated Cable Rows', equipment: 'cable', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Dumbbell Rows', equipment: 'dumbbells', muscleGroup: 'back', difficulty: 'beginner' }
  ],

  'handstand walk': [
    { name: 'Overhead Press', equipment: 'barbell', muscleGroup: 'shoulders', difficulty: 'intermediate' },
    { name: 'Dumbbell Shoulder Press', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Machine Shoulder Press', equipment: 'machine', muscleGroup: 'shoulders', difficulty: 'beginner' },
    { name: 'Handstand Hold', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'advanced' },
    { name: 'Wall Handstand', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'intermediate' }
  ],

  'tapping push-ups': [
    { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
    { name: 'Clap Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Plyometric Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' }
  ],

  'heel raises': [
  { name: 'Single-Leg Calf Raises', equipment: 'bodyweight', muscleGroup: 'calves', difficulty: 'beginner' },
  { name: 'Calf Raises on a Step', equipment: 'step', muscleGroup: 'calves', difficulty: 'beginner' },
  { name: 'Bent-Knee Calf Raises', equipment: 'bodyweight', muscleGroup: 'calves', difficulty: 'beginner' },
  { name: 'Jump Rope', equipment: 'jump rope', muscleGroup: 'calves', difficulty: 'intermediate' },
  { name: 'Farmer\'s Walk on Toes', equipment: 'dumbbells', muscleGroup: 'calves', difficulty: 'intermediate' },
  { name: 'Seated Calf Raises', equipment: 'machine', muscleGroup: 'calves', difficulty: 'beginner' }
],

'wall push-ups': [
  { name: 'Incline Push-ups', equipment: 'bench', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Knee Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Counter Push-ups', equipment: 'counter', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Resistance Band Chest Press', equipment: 'resistance band', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Machine Chest Press', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Dumbbell Chest Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' }
],

'arm circles': [
  { name: 'Shoulder Rolls', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Arm Swings', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Scapular Wall Slides', equipment: 'wall', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Band Pull-Aparts', equipment: 'resistance band', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Light Dumbbell Lateral Raises', equipment: 'dumbbells', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Cable Shoulder Rotations', equipment: 'cable', muscleGroup: 'shoulders', difficulty: 'intermediate' }
],

'breathing exercise': [
  { name: 'Diaphragmatic Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Box Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: '4-7-8 Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Alternate Nostril Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Pursed Lip Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Kapalabhati Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' }
],

'neck rolls': [
  { name: 'Chin Tucks', equipment: 'bodyweight', muscleGroup: 'neck', difficulty: 'beginner' },
  { name: 'Side Neck Stretches', equipment: 'bodyweight', muscleGroup: 'neck', difficulty: 'beginner' },
  { name: 'Forward Neck Stretches', equipment: 'bodyweight', muscleGroup: 'neck', difficulty: 'beginner' },
  { name: 'Resistance Band Neck Flexion', equipment: 'resistance band', muscleGroup: 'neck', difficulty: 'intermediate' },
  { name: 'Towel Neck Stretch', equipment: 'towel', muscleGroup: 'neck', difficulty: 'beginner' },
  { name: 'Scalene Stretch', equipment: 'bodyweight', muscleGroup: 'neck', difficulty: 'beginner' }
],

'resistance band triceps extension': [
  { name: 'Dumbbell Triceps Extension', equipment: 'dumbbells', muscleGroup: 'triceps', difficulty: 'beginner' },
  { name: 'Cable Triceps Pushdown', equipment: 'cable', muscleGroup: 'triceps', difficulty: 'beginner' },
  { name: 'Bench Dips', equipment: 'bench', muscleGroup: 'triceps', difficulty: 'beginner' },
  { name: 'Close Grip Push-ups', equipment: 'bodyweight', muscleGroup: 'triceps', difficulty: 'intermediate' },
  { name: 'Overhead Triceps Extension', equipment: 'dumbbells', muscleGroup: 'triceps', difficulty: 'beginner' },
  { name: 'Skull Crushers', equipment: 'barbell', muscleGroup: 'triceps', difficulty: 'intermediate' }
],

'bird-dog': [
  { name: 'Plank', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Dead Bug', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Superman', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'beginner' },
  { name: 'Quadruped Limb Raises', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Stability Ball Bird Dog', equipment: 'stability ball', muscleGroup: 'core', difficulty: 'intermediate' },
  { name: 'Cable Wood Chops', equipment: 'cable', muscleGroup: 'core', difficulty: 'intermediate' }
],

'bodyweight squats': [
  { name: 'Chair Squats', equipment: 'chair', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Goblet Squats', equipment: 'dumbbell', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Wall Sits', equipment: 'wall', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Bodyweight Lunges', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Step-ups', equipment: 'step', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Machine Leg Press', equipment: 'machine', muscleGroup: 'legs', difficulty: 'beginner' }
],

'breathing with arm raises': [
  { name: 'Sun Salutations', equipment: 'bodyweight', muscleGroup: 'full body', difficulty: 'beginner' },
  { name: 'Breathing with Overhead Reach', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Rib Cage Breathing', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'beginner' },
  { name: 'Breathing with Lateral Raises', equipment: 'bodyweight', muscleGroup: 'shoulders', difficulty: 'beginner' },
  { name: 'Dynamic Chest Opener', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Breathing with Resistance Band Pulls', equipment: 'resistance band', muscleGroup: 'back', difficulty: 'intermediate' }
],

'machine chest press': [
  { name: 'Barbell Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
  { name: 'Dumbbell Bench Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Push-ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Cable Chest Press', equipment: 'cable', muscleGroup: 'chest', difficulty: 'intermediate' },
  { name: 'Resistance Band Chest Press', equipment: 'resistance band', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Pec Deck Machine', equipment: 'machine', muscleGroup: 'chest', difficulty: 'beginner' },
  { name: 'Incline Dumbbell Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'intermediate' }
],

'stationary bike': [
  { name: 'Outdoor Cycling', equipment: 'bicycle', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Spin Bike', equipment: 'spin bike', muscleGroup: 'legs', difficulty: 'intermediate' },
  { name: 'Assault Bike', equipment: 'assault bike', muscleGroup: 'full body', difficulty: 'advanced' },
  { name: 'Rowing Machine', equipment: 'rower', muscleGroup: 'full body', difficulty: 'intermediate' },
  { name: 'Stair Climber', equipment: 'stair machine', muscleGroup: 'legs', difficulty: 'intermediate' },
  { name: 'Jump Rope', equipment: 'jump rope', muscleGroup: 'legs', difficulty: 'intermediate' },
  { name: 'High Knees', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'beginner' }
],

'elliptical trainer': [
  { name: 'Treadmill', equipment: 'treadmill', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Stair Climber', equipment: 'stair machine', muscleGroup: 'legs', difficulty: 'intermediate' },
  { name: 'Arc Trainer', equipment: 'arc trainer', muscleGroup: 'legs', difficulty: 'intermediate' },
  { name: 'Rowing Machine', equipment: 'rower', muscleGroup: 'full body', difficulty: 'intermediate' },
  { name: 'Cross-country Ski Machine', equipment: 'ski machine', muscleGroup: 'full body', difficulty: 'advanced' },
  { name: 'Walking Lunges', equipment: 'bodyweight', muscleGroup: 'legs', difficulty: 'beginner' },
  { name: 'Mountain Climbers', equipment: 'bodyweight', muscleGroup: 'core', difficulty: 'intermediate' }
],
};

// Powerlifting-specific alternatives
const powerliftingAlternatives = {
  'low bar squat': [
    { name: 'High Bar Squat', equipment: 'barbell', muscleGroup: 'quads', difficulty: 'intermediate' },
    { name: 'Safety Bar Squat', equipment: 'specialty bar', muscleGroup: 'quads', difficulty: 'intermediate' },
    { name: 'Belt Squat', equipment: 'belt squat machine', muscleGroup: 'quads', difficulty: 'intermediate' }
  ],
  'competition bench press': [
    { name: 'Close Grip Bench Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Floor Press', equipment: 'barbell', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Dumbbell Bench Press', equipment: 'dumbbells', muscleGroup: 'chest', difficulty: 'beginner' }
  ],
  'conventional deadlift': [
    { name: 'Sumo Deadlift', equipment: 'barbell', muscleGroup: 'hamstrings', difficulty: 'intermediate' },
    { name: 'Trap Bar Deadlift', equipment: 'trap bar', muscleGroup: 'hamstrings', difficulty: 'beginner' },
    { name: 'Rack Pulls', equipment: 'barbell', muscleGroup: 'back', difficulty: 'intermediate' }
  ]
};

// Calisthenics-specific alternatives
const calisthenicsAlternatives = {
  'push ups': [
    { name: 'Diamond Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Archer Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' },
    { name: 'Decline Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'intermediate' },
    { name: 'Pseudo Planche Push Ups', equipment: 'bodyweight', muscleGroup: 'chest', difficulty: 'advanced' }
  ],
  'pull ups': [
    { name: 'Chin Ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'intermediate' },
    { name: 'Australian Pull Ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'beginner' },
    { name: 'Archer Pull Ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' },
    { name: 'Typewriter Pull Ups', equipment: 'bodyweight', muscleGroup: 'back', difficulty: 'advanced' }
  ]
};

// Medical condition detection patterns
const medicalConditionPatterns = {
  backPain: [
    'back pain', 'lower back pain', 'upper back pain', 'spinal', 'disc herniation', 
    'sciatica', 'slipped disc', 'back injury', 'back problems', 'back issues',
    'chronic back pain', 'acute back pain', 'back strain', 'back sprain'
  ],
  kneeProblems: [
    'knee pain', 'knee problems', 'knee injury', 'knee issues', 'knee arthritis',
    'torn meniscus', 'acl injury', 'mcl injury', 'knee surgery', 'knee replacement',
    'patellar tendinitis', 'runner\'s knee', 'knee osteoarthritis', 'swollen knee'
  ],
  hypertension: [
    'high blood pressure', 'hypertension', 'high bp', 'elevated blood pressure',
    'blood pressure issues', 'hypertensive', 'hbp', 'stage 1 hypertension',
    'stage 2 hypertension', 'hypertensive crisis'
  ],
  diabetes: [
    'diabetes', 'type 2 diabetes', 'type 1 diabetes', 'high blood sugar',
    'diabetic', 'insulin resistance', 'prediabetes', 'gestational diabetes',
    'blood sugar problems', 'sugar issues'
  ],
  arthritis: [
    'arthritis', 'osteoarthritis', 'rheumatoid arthritis', 'joint pain',
    'joint inflammation', 'joint stiffness', 'arthritic', 'degenerative joint disease',
    'inflammatory arthritis', 'joint problems'
  ],
  heartDisease: [
    'heart disease', 'heart problems', 'cardiac issues', 'cardiovascular disease',
    'heart condition', 'coronary artery disease', 'heart failure', 'arrhythmia',
    'heart attack history', 'cardiac arrest', 'heart surgery', 'bypass surgery'
  ]
};

// Function to find cardio alternatives
const findCardioAlternatives = (cardioName, preferredIntensity = null, availableEquipment = null) => {
  const normalizedName = cardioName.toLowerCase().trim();
  
  // Find alternatives for the cardio exercise
  let alternatives = cardioAlternatives[normalizedName] || [];
  
  // If no direct match, try partial matching
  if (alternatives.length === 0) {
    for (const [key, altList] of Object.entries(cardioAlternatives)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        alternatives = altList;
        break;
      }
    }
  }
  
  // Filter by preferred intensity if specified
  if (preferredIntensity) {
    alternatives = alternatives.filter(alt => 
      alt.intensity.toLowerCase() === preferredIntensity.toLowerCase()
    );
  }
  
  // Filter by available equipment if specified
  if (availableEquipment && availableEquipment.length > 0) {
    alternatives = alternatives.filter(alt => 
      availableEquipment.some(equip => 
        alt.equipment.toLowerCase().includes(equip.toLowerCase())
      )
    );
  }
  
  return alternatives.length > 0 ? alternatives : [];
};

// Function to replace cardio exercise with alternative
export const replaceCardioWithAlternative = (originalCardio, alternativeCardio) => {
  return {
    ...originalCardio,
    name: `Cardio: ${alternativeCardio.name}`,
    description: alternativeCardio.description,
    reps: alternativeCardio.duration,
    equipment: alternativeCardio.equipment,
    intensity: alternativeCardio.intensity,
    alternatives: undefined // Remove alternatives to avoid recursion
  };
};

// Function to add cardio alternatives to workout plan
export const addCardioAlternativesToWorkoutPlan = (workoutPlan, preferredIntensity = null, availableEquipment = null) => {
  return workoutPlan.map(dayPlan => ({
    ...dayPlan,
    workouts: dayPlan.workouts.map(workout => {
      if (workout.isCardio) {
        // Extract the actual cardio name (remove "Cardio: " prefix)
        const cardioName = workout.name.replace('Cardio: ', '');
        const alternatives = findCardioAlternatives(cardioName, preferredIntensity, availableEquipment);
        
        return {
          ...workout,
          cardioAlternatives: alternatives,
          hasCardioAlternatives: alternatives.length > 0,
          cardioAlternativeButtonText: alternatives.length > 0 ? 
            `View ${alternatives.length} Cardio Alternatives` : 
            'No Cardio Alternatives Available'
        };
      }
      return workout;
    })
  }));
};

// Function to get cardio alternatives for UI display
export const getCardioAlternativesForUI = (cardioName, preferredIntensity = null, availableEquipment = null) => {
  const alternatives = findCardioAlternatives(cardioName, preferredIntensity, availableEquipment);
  
  return {
    originalCardio: cardioName,
    alternatives: alternatives,
    hasAlternatives: alternatives.length > 0,
    alternativeCount: alternatives.length
  };
};

// Function to handle cardio alternative selection from UI
export const selectCardioAlternative = (originalWorkoutPlan, dayIndex, workoutIndex, alternativeIndex) => {
  const updatedPlan = [...originalWorkoutPlan];
  const day = updatedPlan[dayIndex];
  const workout = day.workouts[workoutIndex];
  
  if (workout.isCardio && workout.cardioAlternatives && workout.cardioAlternatives[alternativeIndex]) {
    const selectedAlternative = workout.cardioAlternatives[alternativeIndex];
    day.workouts[workoutIndex] = replaceCardioWithAlternative(workout, selectedAlternative);
  }
  
  return updatedPlan;
};

// Function to select medical condition specific warm-up (only 1 for medical conditions)
const selectMedicalWarmUp = (detectedConditions, usedWarmUps = new Set()) => {
  // Prioritize specific medical condition warm-ups
  for (const condition of detectedConditions) {
    const conditionWarmUps = warmUpExercises[condition.condition];
    if (conditionWarmUps && conditionWarmUps.length > 0) {
      const availableWarmUps = conditionWarmUps.filter(warmUp => !usedWarmUps.has(warmUp.name));
      if (availableWarmUps.length > 0) {
        const selected = availableWarmUps[0];
        usedWarmUps.add(selected.name);
        return {
          warmUps: [selected], // Only 1 warm-up for medical conditions
          usedWarmUps: usedWarmUps
        };
      }
    }
  }
  
  // Fallback to general medical warm-up
  const generalMedical = warmUpExercises.medical.filter(warmUp => !usedWarmUps.has(warmUp.name));
  if (generalMedical.length > 0) {
    const selected = generalMedical[0];
    usedWarmUps.add(selected.name);
    return {
      warmUps: [selected],
      usedWarmUps: usedWarmUps
    };
  }
  
  // Final fallback
  const selected = warmUpExercises.medical[0];
  usedWarmUps.add(selected.name);
  return {
    warmUps: [selected],
    usedWarmUps: usedWarmUps
  };
};

// Function to select non-redundant warm-up exercises based on workout type and day
const selectWarmUpExercises = (workoutPreference, workoutType, gender = 'male', isMedical = false, dayIndex = 0, usedWarmUps = new Set(), detectedConditions = []) => {
  
  // MEDICAL CONDITIONS: Only 1 warm-up specifically for the medical condition
  if (isMedical && detectedConditions.length > 0) {
    return selectMedicalWarmUp(detectedConditions, usedWarmUps);
  }
  
  // REGULAR WORKOUTS: 2 warm-ups with muscle specificity
  let warmUpPool = [];
  
  // Determine primary muscle groups for this workout type
  const targetMuscles = muscleGroupFocus[workoutType] || ['full body'];
  
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
  
  // Add general warm-ups if pool is still small
  if (warmUpPool.length < 4) {
    warmUpPool = [...warmUpPool, ...warmUpExercises.general];
  }
  
  // Filter out recently used warm-ups to avoid redundancy
  const availableWarmUps = warmUpPool.filter(warmUp => !usedWarmUps.has(warmUp.name));
  
  // If we don't have enough unique warm-ups, allow some repetition but prioritize different ones
  let finalWarmUpPool = availableWarmUps.length >= 2 ? availableWarmUps : warmUpPool;
  
  // Select 2 warm-up exercises, ensuring variety
  const shuffled = [...finalWarmUpPool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 2);
  
  // Add selected warm-ups to used set
  selected.forEach(warmUp => usedWarmUps.add(warmUp.name));
  
  return {
    warmUps: selected,
    usedWarmUps: usedWarmUps
  };
};

// Function to select appropriate cardio based on workout type and goals
const selectCardioExercise = (workoutType, fitnessGoal, fitnessLevel, dayIndex, isMedical = false) => {
  let cardioPool = cardioExercises.general;
  
  // Medical conditions get gentle cardio
  if (isMedical) {
    return cardioExercises.medical[0];
  }
  
  // Adjust cardio based on fitness goal
  if (fitnessGoal === 'weightLoss' || fitnessGoal === 'cutting') {
    if (dayIndex % 2 === 0) {
      cardioPool = [...cardioExercises.hiit, ...cardioExercises.general];
    } else {
      cardioPool = [...cardioExercises.steady_state, ...cardioExercises.general];
    }
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

// Helper function to get rep range based on goals and muscle group
const getRepRange = (fitnessGoal, fitnessLevel, muscleGroup, workoutPreference = 'general', gender = 'male') => {
  const isStrengthMuscle = ['chest', 'back', 'quads', 'hamstrings'].includes(muscleGroup);
  
  // Adjust reps for female users - generally higher reps for toning
  if (gender === 'female') {
    if (fitnessGoal === 'muscleGain' || fitnessGoal === 'bulking') {
      return '10-15'; // Higher reps for female muscle gain
    } else if (fitnessGoal === 'weightLoss' || fitnessGoal === 'cutting') {
      return '12-20'; // Higher reps for fat loss
    } else if (fitnessGoal === 'strength') {
      return '6-10'; // Moderate reps for strength
    } else {
      return fitnessLevel === 'beginner' ? '12-15' : '10-12';
    }
  }
  
  // Powerlifting typically uses lower reps
  if (workoutPreference === 'powerlifting') {
    if (fitnessGoal === 'strength') {
      return '1-5';
    } else if (fitnessGoal === 'muscleGain' || fitnessGoal === 'bulking') {
      return '3-6';
    } else {
      return '5-8';
    }
  }
  
  // Calisthenics typically uses higher reps
  if (workoutPreference === 'calisthenics') {
    if (fitnessGoal === 'muscleGain' || fitnessGoal === 'bulking') {
      return '8-15';
    } else if (fitnessGoal === 'weightLoss' || fitnessGoal === 'cutting') {
      return '12-20';
    } else if (fitnessGoal === 'strength') {
      return '3-8';
    } else {
      return fitnessLevel === 'beginner' ? '8-12' : '6-10';
    }
  }
  
  // Standard weight training rep ranges
  if (fitnessGoal === 'muscleGain' || fitnessGoal === 'bulking') {
    return isStrengthMuscle ? '6-10' : '8-12';
  } else if (fitnessGoal === 'weightLoss' || fitnessGoal === 'cutting') {
    return '12-15';
  } else if (fitnessGoal === 'strength') {
    return '3-6';
  } else {
    return fitnessLevel === 'beginner' ? '8-12' : '6-10';
  }
};

// Helper function to determine exercise equipment
const getExerciseEquipment = (exerciseName) => {
  const name = exerciseName.toLowerCase();
  if (name.includes('barbell')) return 'barbell';
  if (name.includes('dumbbell')) return 'dumbbells';
  if (name.includes('cable')) return 'cable';
  if (name.includes('machine')) return 'machine';
  if (name.includes('bodyweight') || name.includes('push') || name.includes('pull') || name.includes('plank')) return 'bodyweight';
  if (name.includes('kettlebell')) return 'kettlebell';
  if (name.includes('ring')) return 'rings';
  if (name.includes('bar')) return 'bar';
  if (name.includes('trap bar')) return 'trap bar';
  if (name.includes('safety bar')) return 'safety bar';
  return 'various';
};

// Helper function to identify compound exercises
const isCompoundExercise = (exerciseName) => {
  const compounds = [
    'squat', 'deadlift', 'bench press', 'overhead press', 'row', 'pull', 'push up',
    'lunge', 'hip thrust', 'clean', 'snatch', 'dip', 'pullup', 'chinup', 'muscle up',
    'handstand', 'planche', 'front lever', 'back lever'
  ];
  return compounds.some(compound => exerciseName.toLowerCase().includes(compound));
};

// Helper function to determine workout intensity
const getWorkoutIntensity = (fitnessLevel, workoutType, workoutPreference = 'general', gender = 'male') => {
  let baseIntensity = fitnessLevel === 'beginner' ? 'moderate' : 
                     fitnessLevel === 'intermediate' ? 'high' : 'very high';
  
  // Adjust intensity for female users
  if (gender === 'female') {
    if (fitnessLevel === 'beginner') baseIntensity = 'moderate';
    else if (fitnessLevel === 'intermediate') baseIntensity = 'moderate-high';
    else baseIntensity = 'high';
  }
  
  if (workoutPreference === 'powerlifting') {
    return gender === 'female' ? 'high' : 'very high'; // Slightly lower for females
  }
  
  if (workoutType.includes('Full Body')) return baseIntensity;
  if (workoutType.includes('Legs')) return 'high';
  if (workoutType.includes('Push') || workoutType.includes('Pull')) return 'moderate-high';
  return baseIntensity;
};

// Function to select SBD exercises for powerlifting days
const selectSBDExercises = (workoutType, previousExercises = [], fitnessLevel, gender = 'male') => {
  const sbdExercises = [];
  const usedExercises = new Set(previousExercises);
  
  // Determine which SBD lift to include based on workout type
  let mainLift = '';
  if (workoutType.includes('Squat')) {
    mainLift = getRandomExercise(powerliftingExercisePools.competition_squat, usedExercises);
  } else if (workoutType.includes('Bench')) {
    mainLift = getRandomExercise(powerliftingExercisePools.competition_bench, usedExercises);
  } else if (workoutType.includes('Deadlift')) {
    mainLift = getRandomExercise(powerliftingExercisePools.competition_deadlift, usedExercises);
  }
  
  if (mainLift) {
    sbdExercises.push(mainLift);
    usedExercises.add(mainLift);
  }
  
  return sbdExercises;
};

// Helper function to get random exercise from pool
const getRandomExercise = (exercisePool, usedExercises) => {
  const available = exercisePool.filter(ex => !usedExercises.has(ex));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};

// Enhanced medical condition detection for multiple conditions
export const detectMedicalConditions = (medicalConditionsText, workoutPreference = 'general') => {
  if (!medicalConditionsText || medicalConditionsText.trim() === '') return [];
  
  const conditions = [];
  const text = medicalConditionsText.toLowerCase().trim();
  
  // Check for each medical condition pattern
  Object.entries(medicalConditionPatterns).forEach(([condition, patterns]) => {
    const hasCondition = patterns.some(pattern => text.includes(pattern));
    if (hasCondition) {
      conditions.push({
        condition: condition,
        severity: detectSeverity(text, condition),
        workoutPreference: workoutPreference
      });
    }
  });
  
  return conditions;
};

// Detect severity based on keywords in the text
const detectSeverity = (text, condition) => {
  const severeKeywords = ['severe', 'chronic', 'acute', 'extreme', 'debilitating', 'constant'];
  const moderateKeywords = ['moderate', 'mild', 'occasional', 'intermittent'];
  
  if (severeKeywords.some(keyword => text.includes(keyword))) {
    return 'severe';
  } else if (moderateKeywords.some(keyword => text.includes(keyword))) {
    return 'moderate';
  } else {
    return 'mild';
  }
};

// Get appropriate workout intensity based on condition and severity
const getWorkoutIntensityForMedical = (condition, severity, fitnessLevel, gender = 'male') => {
  // Base intensity on condition severity
  let baseIntensity = 'low';
  
  if (severity === 'mild') {
    baseIntensity = fitnessLevel === 'beginner' ? 'low' : 'moderate';
  } else if (severity === 'moderate') {
    baseIntensity = 'low';
  } else if (severity === 'severe') {
    baseIntensity = 'very low';
  }
  
  // Adjust for female users - generally lower intensity
  if (gender === 'female') {
    if (baseIntensity === 'moderate') baseIntensity = 'low';
    else if (baseIntensity === 'high') baseIntensity = 'moderate';
  }
  
  // Adjust based on specific conditions
  if (condition === 'heartDisease' || condition === 'hypertension') {
    baseIntensity = 'low'; // Always low for heart conditions
  }
  
  return baseIntensity;
};

// Get medical-specific notes and precautions
const getMedicalNotes = (condition, severity) => {
  const notes = {
    backPain: {
      mild: "Focus on core strengthening and proper form. Avoid heavy lifting and twisting motions.",
      moderate: "Start with gentle mobility exercises. Consult with physical therapist for specific guidance.",
      severe: "Rest and gentle stretching only. Consult healthcare provider before starting any exercise program."
    },
    kneeProblems: {
      mild: "Low-impact exercises recommended. Focus on quadriceps and hamstring strengthening.",
      moderate: "Avoid high-impact activities. Use supported exercises and maintain proper alignment.",
      severe: "Minimal weight-bearing exercises. Focus on range of motion and gentle strengthening."
    },
    hypertension: {
      mild: "Monitor blood pressure during exercise. Avoid heavy lifting and breath-holding.",
      moderate: "Low to moderate intensity only. Focus on cardiovascular health and stress reduction.",
      severe: "Light activity only under medical supervision. Avoid strenuous exercise."
    },
    diabetes: {
      mild: "Monitor blood sugar levels. Stay hydrated and have quick sugar source available.",
      moderate: "Consistent moderate exercise helps insulin sensitivity. Avoid exercise during peak insulin activity.",
      severe: "Medical supervision recommended. Focus on gentle, consistent activity patterns."
    },
    arthritis: {
      mild: "Gentle range of motion exercises. Warm up properly and avoid overexertion.",
      moderate: "Low-impact activities only. Listen to joint feedback and adjust intensity accordingly.",
      severe: "Focus on maintaining mobility. Avoid exercises that cause pain or inflammation."
    },
    heartDisease: {
      mild: "Gradual progression recommended. Monitor heart rate and symptoms during exercise.",
      moderate: "Supervised exercise program recommended. Avoid high-intensity activities.",
      severe: "Medical clearance required. Very light activity only under supervision."
    }
  };
  
  return notes[condition]?.[severity] || "Consult with healthcare provider before starting any exercise program.";
};

// Helper function to get preference-based exercises
const getPreferenceBasedExercises = (workoutPreference, fitnessLevel, fitnessGoal, count = 2, gender = 'male') => {
  const safeExercisePools = {
    bodybuilding: [
      { name: 'Bodyweight Squats', muscleGroup: 'legs', equipment: 'bodyweight', description: 'Safe bodyweight squat variation' },
      { name: 'Light Dumbbell Press', muscleGroup: 'chest', equipment: 'dumbbells', description: 'Light chest press with dumbbells' },
      { name: 'Band Pull Aparts', muscleGroup: 'back', equipment: 'bands', description: 'Shoulder health and back activation' },
      { name: 'Plank', muscleGroup: 'core', equipment: 'bodyweight', description: 'Core stability exercise' },
      { name: 'Bird Dog', muscleGroup: 'core', equipment: 'bodyweight', description: 'Core and balance exercise' },
      { name: 'Glute Bridges', muscleGroup: 'glutes', equipment: 'bodyweight', description: 'Glute activation exercise' }
    ],
    powerlifting: [
      { name: 'Goblet Squats', muscleGroup: 'legs', equipment: 'dumbbell', description: 'Safe squat variation' },
      { name: 'Push Ups', muscleGroup: 'chest', equipment: 'bodyweight', description: 'Bodyweight chest exercise' },
      { name: 'Inverted Rows', muscleGroup: 'back', equipment: 'bodyweight', description: 'Back strengthening exercise' },
      { name: 'Plank', muscleGroup: 'core', equipment: 'bodyweight', description: 'Core stability' },
      { name: 'Bodyweight Lunges', muscleGroup: 'legs', equipment: 'bodyweight', description: 'Leg exercise' },
      { name: 'Face Pulls', muscleGroup: 'shoulders', equipment: 'bands', description: 'Shoulder health exercise' }
    ],
    calisthenics: [
      { name: 'Bodyweight Squats', muscleGroup: 'legs', equipment: 'bodyweight', description: 'Fundamental leg exercise' },
      { name: 'Push Ups', muscleGroup: 'chest', equipment: 'bodyweight', description: 'Upper body strength' },
      { name: 'Australian Pull Ups', muscleGroup: 'back', equipment: 'bodyweight', description: 'Back exercise progression' },
      { name: 'Plank', muscleGroup: 'core', equipment: 'bodyweight', description: 'Core stability' },
      { name: 'L-sit Progressions', muscleGroup: 'core', equipment: 'bodyweight', description: 'Core strength development' },
      { name: 'Hollow Body Hold', muscleGroup: 'core', equipment: 'bodyweight', description: 'Core activation' }
    ]
  };
  
  return safeExercisePools[workoutPreference]?.slice(0, count) || safeExercisePools.bodybuilding.slice(0, count);
};

// Enhanced rep range for medical conditions
const getMedicalRepRange = (fitnessGoal, fitnessLevel, intensity, gender = 'male') => {
  if (gender === 'female') {
    if (intensity === 'very low') {
      return '12-15';
    } else if (intensity === 'low') {
      return fitnessLevel === 'beginner' ? '15-20' : '12-15';
    } else {
      return fitnessLevel === 'beginner' ? '12-15' : '10-12';
    }
  }
  
  if (intensity === 'very low') {
    return '10-15';
  } else if (intensity === 'low') {
    return fitnessLevel === 'beginner' ? '12-15' : '10-12';
  } else {
    return fitnessLevel === 'beginner' ? '10-12' : '8-12';
  }
};

// Get combined medical notes for multiple conditions
const getCombinedMedicalNotes = (detectedConditions) => {
  const notes = [];
  
  detectedConditions.forEach(condition => {
    const conditionNote = getMedicalNotes(condition.condition, condition.severity);
    notes.push(`${condition.condition}: ${conditionNote}`);
  });
  
  // Add general medical advice
  notes.push("Always consult with your healthcare provider before starting any exercise program.");
  notes.push("Stop immediately if you experience any pain or discomfort.");
  notes.push("Focus on proper form and controlled movements.");
  
  return notes.join(' ');
};

// Enhanced function to convert exercises to workout format with warm-ups and cardio
const convertExercisesToWorkoutFormat = (exercises, warmUpExercises, cardioExercise, day, i, workoutType, workoutPreference, fitnessLevel, fitnessGoal, gender, isMedical = false) => {
  const workouts = [];
  
  // Add warm-up exercises first (1 for medical, 2 for regular)
  warmUpExercises.forEach((warmUp, index) => {
    workouts.push({
      id: `${day}-${i}-warmup-${index}`,
      name: warmUp.name,
      muscleGroup: 'full body',
      sets: 1,
      reps: warmUp.duration,
      rest: '0s',
      difficulty: 'beginner',
      equipment: warmUp.equipment,
      description: warmUp.description,
      isCompound: false,
      isWarmUp: true,
      purpose: warmUp.purpose,
      workoutStyle: workoutPreference,
      alternatives: [],
      genderOptimized: gender === 'female' ? 'female_friendly' : 'standard',
      isMedical: isMedical,
      isMedicalSpecific: !!warmUp.medicalCondition
    });
  });
  
  // Add main exercises
  exercises.forEach((exercise, index) => {
    let exerciseSource = gender === 'female' ? femaleExercisePools : exercisePools;
    if (workoutPreference === 'calisthenics') {
      exerciseSource = calisthenicsExercisePools;
    } else if (workoutPreference === 'powerlifting') {
      exerciseSource = gender === 'female' ? { ...femaleExercisePools, ...powerliftingExercisePools } : { ...exercisePools, ...powerliftingExercisePools };
    }
    
    const muscleGroup = Object.keys(exerciseSource).find(group => 
      exerciseSource[group].includes(exercise)
    ) || 'full body';
    
    // Check if this is an SBD exercise (placed at the end)
    const isSBDExercise = index >= exercises.length - 3 && 
                         (exercise.toLowerCase().includes('squat') || 
                          exercise.toLowerCase().includes('bench') || 
                          exercise.toLowerCase().includes('deadlift'));
    
    // Adjust sets for female users - generally fewer sets
    let sets;
    if (gender === 'female') {
      if (isSBDExercise) {
        sets = fitnessLevel === 'beginner' ? 3 : 4;
      } else {
        sets = fitnessLevel === 'beginner' ? 2 : 3;
      }
    } else {
      sets = isSBDExercise ? (fitnessLevel === 'beginner' ? 4 : 5) : (fitnessLevel === 'beginner' ? 3 : 4);
    }
    
    workouts.push({
      id: `${day}-${i}-${index}`,
      name: exercise,
      muscleGroup: muscleGroup,
      sets: sets,
      reps: getRepRange(fitnessGoal, fitnessLevel, muscleGroup, workoutPreference, gender),
      rest: isSBDExercise ? '120-180s' : (workoutPreference === 'calisthenics' ? '45-75s' : '60-90s'),
      difficulty: fitnessLevel,
      equipment: getExerciseEquipment(exercise),
      description: `${exercise} for ${muscleGroup} development`,
      isCompound: isCompoundExercise(exercise),
      isSBD: isSBDExercise,
      isWarmUp: false,
      isMedical: isMedical,
      alternatives: findExerciseAlternatives(exercise, null, fitnessLevel, workoutPreference),
      workoutStyle: workoutPreference,
      genderOptimized: gender === 'female' ? 'female_friendly' : 'standard'
    });
  });
  
  // Add cardio exercise at the end with alternatives
  if (cardioExercise) {
    const cardioName = cardioExercise.name.toLowerCase();
    const cardioAlternativesList = findCardioAlternatives(cardioName);
    
    workouts.push({
      id: `${day}-${i}-cardio`,
      name: `Cardio: ${cardioExercise.name}`,
      muscleGroup: 'cardiovascular',
      sets: 1,
      reps: cardioExercise.duration,
      rest: '0s',
      difficulty: fitnessLevel,
      equipment: cardioExercise.equipment,
      description: cardioExercise.description,
      isCompound: false,
      isWarmUp: false,
      isCardio: true,
      intensity: cardioExercise.intensity,
      workoutStyle: workoutPreference,
      alternatives: [],
      cardioAlternatives: cardioAlternativesList,
      hasCardioAlternatives: cardioAlternativesList.length > 0,
      cardioAlternativeButtonText: cardioAlternativesList.length > 0 ? 
        `View ${cardioAlternativesList.length} Cardio Alternatives` : 
        'No Cardio Alternatives Available',
      genderOptimized: gender === 'female' ? 'female_friendly' : 'standard'
    });
  }
  
  return workouts;
};

// Enhanced non-redundant workout generation with muscle-specific warm-ups and cardio
export const generateNonRedundantWorkoutPlan = (userData) => {
  const { fitnessGoal, workoutPreference, fitnessLevel, selectedDays, weight, gender } = userData;
  
  const dayCount = selectedDays.length;
  
  // Select appropriate workout pattern based on preference and gender
  let patternConfig, finalPattern;
  
  if (gender === 'female') {
    patternConfig = femaleWorkoutPatterns[dayCount.toString()] || femaleWorkoutPatterns['3'];
    finalPattern = patternConfig.pattern;
    
    const backWorkouts = finalPattern.filter(day => 
      day.toLowerCase().includes('back') || 
      day.toLowerCase().includes('posture') ||
      day.toLowerCase().includes('upper') && day.toLowerCase().includes('back')
    );
    
    if (backWorkouts.length === 0 && finalPattern.length >= 2) {
      finalPattern[1] = gender === 'female' ? 'Back & Shoulders Focus' : 'Pull';
    }
  } else if (workoutPreference === 'calisthenics') {
    patternConfig = calisthenicsWorkoutPatterns[dayCount.toString()] || calisthenicsWorkoutPatterns['3'];
    finalPattern = patternConfig.pattern;
  } else if (workoutPreference === 'powerlifting') {
    patternConfig = powerliftingWorkoutPatterns[dayCount.toString()] || powerliftingWorkoutPatterns['3'];
    finalPattern = patternConfig.pattern;
  } else {
    // Bodybuilding and general workouts
    patternConfig = workoutDistributionPatterns[dayCount.toString()] || workoutDistributionPatterns['3'];
    finalPattern = patternConfig.pattern;
    
    if (workoutPreference === 'bodybuilding' && dayCount >= 4) {
      finalPattern = patternConfig.alternatePattern || finalPattern;
    }
  }
  
  while (finalPattern.length < dayCount) {
    finalPattern.push(
      gender === 'female' ? 'Full Body Back Emphasis' :
      workoutPreference === 'calisthenics' ? 'Full Body Flow' : 
      workoutPreference === 'powerlifting' ? 'Bodybuilding Accessory' : 'Full Body'
    );
  }
  finalPattern = finalPattern.slice(0, dayCount);
  
  // Generate workouts for each day
  const weeklyPlan = [];
  const allUsedExercises = new Set();
  let usedWarmUps = new Set(); // Track used warm-ups to avoid redundancy
  
  const getExercisesPerWorkout = (dayCount, gender = 'male') => {
    if (gender === 'female') {
      if (dayCount <= 2) return 8;  // Reduced to account for warm-ups and cardio
      if (dayCount <= 4) return 7;
      return 6;
    } else {
      if (dayCount <= 2) return 9;
      if (dayCount <= 4) return 8;
      return 7;
    }
  };
  
  const exercisesPerWorkout = getExercisesPerWorkout(dayCount, gender);
  
  for (let i = 0; i < dayCount; i++) {
    const day = selectedDays[i];
    const workoutType = finalPattern[i];
    
    // Select non-redundant warm-up exercises for this day
    const warmUpSelection = selectWarmUpExercises(workoutPreference, workoutType, gender, false, i, usedWarmUps);
    const warmUpExercises = warmUpSelection.warmUps;
    usedWarmUps = warmUpSelection.usedWarmUps;
    
    // Select cardio exercise for the end
    const cardioExercise = selectCardioExercise(workoutType, fitnessGoal, fitnessLevel, i);
    
    // Get exercises for this day, avoiding redundancy
    let dayExercises = selectExercisesForDay(
      workoutType, 
      Array.from(allUsedExercises), 
      workoutPreference, 
      fitnessLevel, 
      exercisesPerWorkout,
      gender
    );
    
    // FALLBACK: If no exercises were selected, use basic exercises
    if (dayExercises.length === 0) {
      dayExercises = getFallbackExercises(workoutType, workoutPreference, fitnessLevel, gender);
    }
    
    // Add to used exercises
    dayExercises.forEach(exercise => allUsedExercises.add(exercise));
    
    // Convert to workout format WITH WARM-UPS AND CARDIO
    const workouts = convertExercisesToWorkoutFormat(
      dayExercises, 
      warmUpExercises,
      cardioExercise,
      day, 
      i, 
      workoutType, 
      workoutPreference, 
      fitnessLevel, 
      fitnessGoal, 
      gender,
      false // isMedical
    );
    
    weeklyPlan.push({
      day,
      workoutType,
      workouts,
      totalExercises: workouts.length,
      focusMuscles: muscleGroupFocus[workoutType] || ['full body'],
      intensity: getWorkoutIntensity(fitnessLevel, workoutType, workoutPreference, gender),
      estimatedDuration: `${Math.round(workouts.length * (workoutPreference === 'calisthenics' ? 4 : 5))}-${Math.round(workouts.length * (workoutPreference === 'calisthenics' ? 6 : 7))} minutes`,
      dayNumber: i + 1,
      workoutStyle: workoutPreference,
      hasSBD: workoutPreference === 'powerlifting' && workouts.some(w => w.isSBD),
      hasWarmUp: true,
      warmUpCount: warmUpExercises.length,
      hasCardio: true,
      cardioType: cardioExercise.intensity,
      exerciseCountNote: gender === 'female' ? 
        `Female-optimized: ${exercisesPerWorkout} main exercises + ${warmUpExercises.length} warm-ups + cardio` : 
        `${workoutPreference} plan: ${exercisesPerWorkout} main exercises + ${warmUpExercises.length} warm-ups + cardio`,
      genderOptimization: gender === 'female' ? 'female_focused' : 'standard',
      lowerBodyEmphasis: gender === 'female' ? 'high' : 'standard',
      backWorkoutInclusion: gender === 'female' ? 'enhanced' : 'standard',
      warmUpIncluded: true,
      warmUpDescription: `Includes ${warmUpExercises.length} muscle-specific warm-up exercises`,
      cardioIncluded: true,
      cardioDescription: `${cardioExercise.name} for ${cardioExercise.duration}`
    });
  }
  
  return weeklyPlan;
};

// Enhanced medical workout generation with condition-specific warm-ups (only 1 warm-up)
export const generateMedicalWorkoutPlanFromText = (medicalText, userData) => {
  const { fitnessLevel, selectedDays, gender, workoutPreference, weight, fitnessGoal } = userData;
  
  const detectedConditions = detectMedicalConditions(medicalText, workoutPreference);
  
  if (detectedConditions.length === 0) {
    return null;
  }
  
  const primaryCondition = detectedConditions.reduce((mostSevere, current) => {
    const severityOrder = { 'severe': 3, 'moderate': 2, 'mild': 1 };
    return severityOrder[current.severity] > severityOrder[mostSevere.severity] ? current : mostSevere;
  }, detectedConditions[0]);
  
  const conditionKey = primaryCondition.condition;
  const severity = primaryCondition.severity;
  
  const workoutIntensity = getWorkoutIntensityForMedical(conditionKey, severity, fitnessLevel, gender);
  
  let allMedicalWorkouts = [];
  detectedConditions.forEach(condition => {
    const conditionWorkouts = medicalConditionWorkouts[condition.condition] || [];
    allMedicalWorkouts = [...allMedicalWorkouts, ...conditionWorkouts];
  });
  
  let filteredWorkouts = allMedicalWorkouts.filter(workout => 
    workout.intensity === workoutIntensity || 
    (workoutIntensity === 'very low' && workout.intensity === 'low')
  );
  
  filteredWorkouts = filteredWorkouts.filter((workout, index, self) => 
    index === self.findIndex(w => w.name === workout.name)
  );
  
  if (filteredWorkouts.length === 0) {
    filteredWorkouts = allMedicalWorkouts;
  }
  
  const preferenceExercises = getPreferenceBasedExercises(workoutPreference, fitnessLevel, fitnessGoal, 2, gender);
  
  const weeklyPlan = [];
  const allUsedExercises = new Set();
  let usedWarmUps = new Set();
  const totalExercisesPerWorkout = 5; // Reduced for medical plans
  const preferenceExerciseCount = 2;
  
  for (let i = 0; i < selectedDays.length; i++) {
    const day = selectedDays[i];
    
    // Select medical-condition specific warm-up (ONLY 1 for medical conditions)
    const warmUpSelection = selectWarmUpExercises(workoutPreference, 'Medical', gender, true, i, usedWarmUps, detectedConditions);
    const warmUpExercises = warmUpSelection.warmUps;
    usedWarmUps = warmUpSelection.usedWarmUps;
    
    // Select gentle cardio for medical plans
    const cardioExercise = selectCardioExercise('Medical', fitnessGoal, fitnessLevel, i, true);
    
    // Get medical exercises (3 out of 5)
    const availableMedicalExercises = filteredWorkouts.filter(workout => 
      !allUsedExercises.has(workout.name)
    );
    
    const medicalExercises = availableMedicalExercises.slice(0, totalExercisesPerWorkout - preferenceExerciseCount);
    
    // Get preference exercises (2 out of 5)
    const availablePreferenceExercises = preferenceExercises.filter(exercise => 
      !allUsedExercises.has(exercise.name)
    );
    
    const dayPreferenceExercises = availablePreferenceExercises.slice(0, preferenceExerciseCount);
    
    // Combine exercises
    const dayExercises = [...medicalExercises.map(ex => ex.name), ...dayPreferenceExercises.map(ex => ex.name)];
    
    // Add to used exercises
    dayExercises.forEach(exercise => allUsedExercises.add(exercise));
    
    if (dayExercises.length < totalExercisesPerWorkout) {
      const additionalNeeded = totalExercisesPerWorkout - dayExercises.length;
      const additionalMedical = filteredWorkouts
        .filter(workout => !allUsedExercises.has(workout.name))
        .slice(0, additionalNeeded);
      
      dayExercises.push(...additionalMedical.map(ex => ex.name));
      additionalMedical.forEach(exercise => allUsedExercises.add(exercise.name));
    }
    
    // Convert to workout format WITH 1 WARM-UP AND CARDIO
    const workouts = convertExercisesToWorkoutFormat(
      dayExercises,
      warmUpExercises,
      cardioExercise,
      day,
      i,
      `Medical ${detectedConditions.map(c => c.condition).join(' + ')}`,
      workoutPreference,
      fitnessLevel,
      fitnessGoal,
      gender,
      true // isMedical
    );
    
    // Get medical condition specific warm-up info
    const medicalWarmUp = warmUpExercises[0];
    const isConditionSpecific = !!medicalWarmUp.medicalCondition;
    
    // Update medical-specific properties
    const updatedWorkouts = workouts.map(workout => {
      if (!workout.isWarmUp && !workout.isCardio) {
        const isPreferenceExercise = dayPreferenceExercises.some(prefEx => prefEx.name === workout.name);
        return {
          ...workout,
          isMedical: true,
          isPreferenceBased: isPreferenceExercise,
          workoutStyle: isPreferenceExercise ? workoutPreference : 'medical',
          sets: gender === 'female' ? (fitnessLevel === 'beginner' ? 2 : 3) : (fitnessLevel === 'beginner' ? 3 : 4),
          reps: getMedicalRepRange(fitnessGoal, fitnessLevel, workoutIntensity, gender),
          rest: workoutIntensity === 'very low' ? '60-90s' : '45-75s',
        };
      }
      return workout;
    });
    
    weeklyPlan.push({
      day,
      workoutType: `Medical ${detectedConditions.map(c => c.condition).join(' + ')}`,
      workouts: updatedWorkouts,
      totalExercises: updatedWorkouts.length,
      focusMuscles: ['safe movements', workoutPreference],
      intensity: workoutIntensity,
      estimatedDuration: `${Math.round(updatedWorkouts.length * 8)}-${Math.round(updatedWorkouts.length * 12)} minutes`,
      isMedicalPlan: true,
      medicalNotes: getCombinedMedicalNotes(detectedConditions),
      detectedConditions: detectedConditions.map(c => c.condition),
      preferenceIntegration: `${preferenceExerciseCount} ${workoutPreference} exercises included`,
      workoutStyle: workoutPreference,
      hasWarmUp: true,
      warmUpCount: 1, // Only 1 warm-up for medical conditions
      isConditionSpecificWarmUp: isConditionSpecific,
      conditionSpecificWarmUp: isConditionSpecific ? medicalWarmUp.name : null,
      hasCardio: true,
      cardioType: 'gentle',
      exerciseCountNote: 'Medical plan: 5 exercises + 1 condition-specific warm-up + gentle cardio',
      genderOptimization: gender === 'female' ? 'female_adapted' : 'standard',
      warmUpIncluded: true,
      warmUpDescription: isConditionSpecific ? 
        `Includes 1 condition-specific warm-up for ${medicalWarmUp.medicalCondition}` : 
        'Includes 1 gentle medical warm-up',
      cardioIncluded: true,
      cardioDescription: `Gentle ${cardioExercise.name} for recovery`
    });
  }
  
  return addCardioAlternativesToWorkoutPlan(weeklyPlan);
};

// Fallback exercises in case no exercises are selected
const getFallbackExercises = (workoutType, workoutPreference, fitnessLevel, gender = 'male') => {
  const fallbackExercises = {
    bodybuilding: [
      'Bodyweight Squats', 'Push Ups', 'Inverted Rows', 'Plank', 
      'Glute Bridges', 'Bird Dog', 'Light Dumbbell Press', 'Band Pull Aparts',
      'Bodyweight Lunges', 'Calf Raises', 'Russian Twists', 'Leg Raises'
    ],
    powerlifting: [
      'Goblet Squats', 'Push Ups', 'Inverted Rows', 'Plank',
      'Bodyweight Lunges', 'Face Pulls', 'Band Rows', 'Bodyweight Calf Raises',
      'Glute Bridges', 'Bird Dog', 'Side Plank', 'Dead Bug'
    ],
    calisthenics: [
      'Bodyweight Squats', 'Push Ups', 'Australian Pull Ups', 'Plank',
      'L-sit Progressions', 'Hollow Body Hold', 'Arch Body Hold', 'Mobility Flow',
      'Cossack Squats', 'Pike Push Ups', 'Leg Raises', 'Russian Twists'
    ]
  };
  
  return fallbackExercises[workoutPreference] || fallbackExercises.bodybuilding;
};

// Enhanced exercise selection to guarantee exercises
const selectExercisesForDay = (workoutType, previousExercises = [], workoutPreference, fitnessLevel, exercisesPerWorkout = 8, gender = 'male') => {
  const targetMuscleGroups = muscleGroupFocus[workoutType] || ['full body'];
  const selectedExercises = [];
  const usedExercises = new Set(previousExercises);
  
  // Use appropriate exercise pools based on workout preference and gender
  let exerciseSource = gender === 'female' ? femaleExercisePools : exercisePools;
  if (workoutPreference === 'calisthenics') {
    exerciseSource = calisthenicsExercisePools;
  } else if (workoutPreference === 'powerlifting') {
    exerciseSource = gender === 'female' ? { ...femaleExercisePools, ...powerliftingExercisePools } : { ...exercisePools, ...powerliftingExercisePools };
  }
  
  // For powerlifting, always include SBD exercises at the end
  let sbdExercises = [];
  if (workoutPreference === 'powerlifting' && (
    workoutType.includes('Squat') || 
    workoutType.includes('Bench') || 
    workoutType.includes('Deadlift')
  )) {
    sbdExercises = selectSBDExercises(workoutType, usedExercises, fitnessLevel, gender);
    sbdExercises.forEach(ex => usedExercises.add(ex));
  }
  
  // Select exercises for each muscle group
  targetMuscleGroups.forEach(muscleGroup => {
    const availableExercises = exerciseSource[muscleGroup] || [];
    
    // If no available exercises, try alternative muscle groups
    if (availableExercises.length === 0) {
      return; // Skip this muscle group
    }
    
    // Filter out recently used exercises, but allow some repetition if necessary
    let filteredExercises = availableExercises.filter(exercise => 
      !usedExercises.has(exercise)
    );
    
    // If we don't have enough new exercises, include some from the full pool
    if (filteredExercises.length < 2) {
      filteredExercises = availableExercises;
    }
    
    // Select random exercises
    const count = Math.min(2, filteredExercises.length); // Max 2 per muscle group
    const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    
    selectedExercises.push(...selected);
    selected.forEach(ex => usedExercises.add(ex));
  });
  
  // If we still don't have enough exercises, add from any available pool
  if (selectedExercises.length < exercisesPerWorkout - sbdExercises.length) {
    const needed = exercisesPerWorkout - selectedExercises.length - sbdExercises.length;
    const allExercises = Object.values(exerciseSource).flat();
    const availableExercises = allExercises.filter(ex => !usedExercises.has(ex));
    
    const additional = availableExercises.slice(0, needed);
    selectedExercises.push(...additional);
    additional.forEach(ex => usedExercises.add(ex));
  }
  
  // For powerlifting, add SBD exercises at the end
  const finalExercises = [...selectedExercises.slice(0, exercisesPerWorkout - sbdExercises.length), ...sbdExercises];
  
  return finalExercises.slice(0, exercisesPerWorkout);
};

// Function to find exercise alternatives
const findExerciseAlternatives = (exerciseName, preferredEquipment = null, fitnessLevel = 'beginner', workoutPreference = 'general') => {
  const normalizedName = exerciseName.toLowerCase().trim();
  
  // Use appropriate alternatives based on workout preference
  let alternativeSource = exerciseAlternatives;
  if (workoutPreference === 'calisthenics') {
    alternativeSource = { ...exerciseAlternatives, ...calisthenicsAlternatives };
  } else if (workoutPreference === 'powerlifting') {
    alternativeSource = { ...exerciseAlternatives, ...powerliftingAlternatives };
  }
  
  // Find alternatives for the exercise
  let alternatives = alternativeSource[normalizedName] || [];
  
  // If no direct match, try partial matching
  if (alternatives.length === 0) {
    for (const [key, altList] of Object.entries(alternativeSource)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        alternatives = altList;
        break;
      }
    }
  }
  
  // Filter by preferred equipment if specified
  if (preferredEquipment) {
    alternatives = alternatives.filter(alt => 
      alt.equipment.toLowerCase() === preferredEquipment.toLowerCase()
    );
  }
  
  // Filter by fitness level - beginners get easier alternatives
  if (fitnessLevel === 'beginner') {
    alternatives = alternatives.filter(alt => 
      alt.difficulty === 'beginner' || alt.difficulty === 'intermediate'
    );
  }
  
  return alternatives.length > 0 ? alternatives : [];
};

// Function to replace exercise with alternative
export const replaceExerciseWithAlternative = (originalExercise, alternativeExercise) => {
  return {
    ...originalExercise,
    name: alternativeExercise.name,
    equipment: alternativeExercise.equipment,
    alternatives: undefined // Remove alternatives to avoid recursion
  };
};

// Function to add alternatives to workout plan with button data
export const addAlternativesToWorkoutPlan = (workoutPlan, preferredEquipment = null) => {
  return workoutPlan.map(dayPlan => ({
    ...dayPlan,
    workouts: dayPlan.workouts.map(workout => {
      const alternatives = findExerciseAlternatives(
        workout.name, 
        preferredEquipment, 
        workout.difficulty || 'beginner',
        dayPlan.workoutStyle || 'general'
      );
      
      return {
        ...workout,
        alternatives: alternatives,
        hasAlternatives: alternatives.length > 0,
        alternativeButtonText: alternatives.length > 0 ? `View ${alternatives.length} Alternatives` : 'No Alternatives Available'
      };
    })
  }));
};

// Enhanced main workout generation with medical condition support
export const generateInitialWorkoutPlan = (userData) => {
  const { fitnessGoal, workoutPreference, fitnessLevel, selectedDays, weight, hasMedicalConditions, medicalConditions, gender } = userData;
  
  // Check if user has medical conditions and generate medical workout plan if detected
  if (hasMedicalConditions && medicalConditions && medicalConditions.trim() !== '') {
    const medicalPlan = generateMedicalWorkoutPlanFromText(medicalConditions, userData);
    if (medicalPlan) {
      return medicalPlan;
    }
  }
  
  // Use non-redundant workout generation for users without medical conditions
  const plan = generateNonRedundantWorkoutPlan(userData);
  const planWithExerciseAlternatives = addAlternativesToWorkoutPlan(plan);
  return addCardioAlternativesToWorkoutPlan(planWithExerciseAlternatives);
};

// Enhanced progressive overload function for multi-week plans
export const generateProgressiveWorkoutPlan = (userData, weekNumber = 1) => {
  const basePlan = generateNonRedundantWorkoutPlan(userData);
  const { workoutPreference, gender } = userData;
  
  // Apply progressive overload based on week number and gender
  return basePlan.map(dayPlan => ({
    ...dayPlan,
    workouts: dayPlan.workouts.map(workout => {
      let progressiveWorkout = { ...workout };
      
      // Increase intensity progressively
      if (weekNumber > 1) {
        // Increase sets every 2 weeks (different for SBD exercises and gender)
        if (weekNumber % 2 === 0) {
          if (workout.isSBD) {
            progressiveWorkout.sets = Math.min(gender === 'female' ? 5 : 6, workout.sets + 1);
          } else {
            progressiveWorkout.sets = Math.min(
              gender === 'female' ? (workoutPreference === 'calisthenics' ? 4 : 5) : (workoutPreference === 'calisthenics' ? 5 : 6), 
              workout.sets + 1
            );
          }
        }
        
        // Adjust reps for progressive overload
        if (weekNumber > 3) {
          const currentReps = workout.reps;
          if (currentReps.includes('-')) {
            const [min, max] = currentReps.split('-').map(Number);
            if (workoutPreference === 'powerlifting' && workout.isSBD) {
              progressiveWorkout.reps = `${Math.max(1, min-1)}-${Math.max(3, max-1)}`;
            } else if (workoutPreference === 'calisthenics') {
              progressiveWorkout.reps = `${Math.max(5, min-1)}-${Math.max(10, max-1)}`;
            } else if (gender === 'female') {
              progressiveWorkout.reps = `${Math.max(8, min-1)}-${Math.max(12, max-1)}`;
            } else {
              progressiveWorkout.reps = `${Math.max(3, min-1)}-${Math.max(6, max-1)}`;
            }
          }
        }
        
        // Add intensity techniques after 4 weeks
        if (weekNumber >= 4) {
          if (workoutPreference === 'powerlifting') {
            progressiveWorkout.intensityTechnique = 'pyramid sets';
          } else if (workoutPreference === 'calisthenics') {
            progressiveWorkout.intensityTechnique = weekNumber % 3 === 1 ? 'drop sets' : 
                                                  weekNumber % 3 === 2 ? 'superset' : 'isometric holds';
          } else {
            progressiveWorkout.intensityTechnique = weekNumber % 3 === 1 ? 'drop sets' : 
                                                  weekNumber % 3 === 2 ? 'superset' : 'rest-pause';
          }
        }
        
        // Add week-specific notes
        progressiveWorkout.weekNotes = `Week ${weekNumber}: Focus on progressive overload`;
      }
      
      return progressiveWorkout;
    })
  }));
};

// Function to validate workout plan for redundancy
export const validateWorkoutPlan = (workoutPlan) => {
  const issues = [];
  const allExercises = new Set();
  const muscleGroupFrequency = {};
  
  workoutPlan.forEach(dayPlan => {
    dayPlan.workouts.forEach(workout => {
      const exerciseName = workout.name;
      
      // Check for duplicate exercises
      if (allExercises.has(exerciseName)) {
        issues.push(`Duplicate exercise: ${exerciseName} appears multiple times in the week`);
      }
      allExercises.add(exerciseName);
      
      // Track muscle group frequency
      const muscleGroup = workout.muscleGroup;
      muscleGroupFrequency[muscleGroup] = (muscleGroupFrequency[muscleGroup] || 0) + 1;
    });
  });
  
  // Check for balanced muscle group distribution
  Object.entries(muscleGroupFrequency).forEach(([muscleGroup, count]) => {
    if (count > 4) {
      issues.push(`Muscle group ${muscleGroup} trained ${count} times - consider reducing frequency`);
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
    totalUniqueExercises: allExercises.size,
    muscleGroupDistribution: muscleGroupFrequency
  };
};

// Function to get workout plan summary
export const getWorkoutPlanSummary = (workoutPlan) => {
  const summary = {
    totalDays: workoutPlan.length,
    totalExercises: workoutPlan.reduce((sum, day) => sum + day.workouts.length, 0),
    workoutTypes: [...new Set(workoutPlan.map(day => day.workoutType))],
    muscleGroupsTrained: {},
    estimatedWeeklyTime: workoutPlan.reduce((sum, day) => {
      const timeRange = day.estimatedDuration.split('-');
      return sum + (parseInt(timeRange[0]) + parseInt(timeRange[1])) / 2;
    }, 0),
    workoutStyle: workoutPlan[0]?.workoutStyle || 'general',
    isMedicalPlan: workoutPlan[0]?.isMedicalPlan || false,
    averageExercisesPerDay: Math.round(workoutPlan.reduce((sum, day) => sum + day.workouts.length, 0) / workoutPlan.length),
    genderOptimization: workoutPlan[0]?.genderOptimization || 'standard',
    lowerBodyEmphasis: workoutPlan[0]?.lowerBodyEmphasis || 'standard',
    backWorkoutInclusion: workoutPlan[0]?.backWorkoutInclusion || 'standard',
    hasWarmUps: workoutPlan[0]?.hasWarmUp || false,
    warmUpCount: workoutPlan[0]?.warmUpCount || 0,
    hasCardio: workoutPlan[0]?.hasCardio || false
  };
  
  // Count muscle groups
  workoutPlan.forEach(day => {
    day.workouts.forEach(workout => {
      const muscleGroup = workout.muscleGroup;
      summary.muscleGroupsTrained[muscleGroup] = (summary.muscleGroupsTrained[muscleGroup] || 0) + 1;
    });
  });
  
  return summary;
};

// Function to modify workout plan based on user feedback
export const modifyWorkoutPlanBasedOnFeedback = (originalPlan, feedback) => {
  const { likedExercises = [], dislikedExercises = [], preferredMuscleGroups = [], difficultyFeedback } = feedback;
  
  return originalPlan.map(dayPlan => ({
    ...dayPlan,
    workouts: dayPlan.workouts.map(workout => {
      // Replace disliked exercises with alternatives
      if (dislikedExercises.includes(workout.name) && workout.alternatives && workout.alternatives.length > 0) {
        const alternative = workout.alternatives[0];
        return {
          ...workout,
          name: alternative.name,
          equipment: alternative.equipment,
          replacedFrom: workout.name
        };
      }
      
      // Adjust difficulty based on feedback
      if (difficultyFeedback === 'too_easy') {
        return {
          ...workout,
          sets: Math.min(6, workout.sets + 1),
          reps: adjustRepsForDifficulty(workout.reps, 'increase')
        };
      } else if (difficultyFeedback === 'too_hard') {
        return {
          ...workout,
          sets: Math.max(2, workout.sets - 1),
          reps: adjustRepsForDifficulty(workout.reps, 'decrease')
        };
      }
      
      return workout;
    }).filter(workout => 
      // Filter out exercises from non-preferred muscle groups if specified
      preferredMuscleGroups.length === 0 || 
      preferredMuscleGroups.some(group => workout.muscleGroup.includes(group))
    )
  }));
};

// Helper function to adjust reps based on difficulty feedback
const adjustRepsForDifficulty = (currentReps, direction) => {
  if (currentReps.includes('-')) {
    const [min, max] = currentReps.split('-').map(Number);
    if (direction === 'increase') {
      return `${min}-${Math.max(max, min + 2)}`;
    } else {
      return `${Math.min(min, max - 2)}-${max}`;
    }
  }
  return currentReps;
};

// Function to generate workout plan for specific equipment limitations
export const generateEquipmentSpecificPlan = (userData, availableEquipment) => {
  const basePlan = generateNonRedundantWorkoutPlan(userData);
  
  return basePlan.map(dayPlan => ({
    ...dayPlan,
    workouts: dayPlan.workouts.map(workout => {
      // Check if exercise requires unavailable equipment
      const exerciseEquipment = workout.equipment.toLowerCase();
      const hasEquipment = availableEquipment.some(equip => 
        exerciseEquipment.includes(equip.toLowerCase())
      );
      
      if (!hasEquipment && workout.alternatives && workout.alternatives.length > 0) {
        // Find alternative with available equipment
        const suitableAlternative = workout.alternatives.find(alt => 
          availableEquipment.some(equip => 
            alt.equipment.toLowerCase().includes(equip.toLowerCase())
          )
        );
        
        if (suitableAlternative) {
          return {
            ...workout,
            name: suitableAlternative.name,
            equipment: suitableAlternative.equipment,
            replacedDueToEquipment: workout.name
          };
        }
      }
      
      return workout;
    }).filter(workout => {
      // Filter out exercises that still require unavailable equipment
      const exerciseEquipment = workout.equipment.toLowerCase();
      return availableEquipment.some(equip => 
        exerciseEquipment.includes(equip.toLowerCase())
      );
    })
  }));
};

// Nutrition calculation functions
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

// Enhanced nutrition plan with medical considerations
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
  let medicalNutritionNotes = [];
  
  // Adjust macronutrients based on medical conditions
  if (detectedConditions.some(cond => cond.condition === 'diabetes')) {
    carbPercentage = 0.4; // Lower carbs for diabetes
    fatPercentage = 0.35; // Higher healthy fats
    medicalNutritionNotes.push("Lower carbohydrate intake to help manage blood sugar levels");
  }
  
  if (detectedConditions.some(cond => cond.condition === 'hypertension')) {
    carbPercentage = 0.45; // Slightly lower carbs
    fatPercentage = 0.25; // Maintain fat
    medicalNutritionNotes.push("Reduced sodium intake recommended. Focus on potassium-rich foods.");
  }
  
  if (detectedConditions.some(cond => cond.condition === 'heartDisease')) {
    carbPercentage = 0.4; // Lower carbs
    fatPercentage = 0.3; // Moderate fat with focus on healthy fats
    medicalNutritionNotes.push("Emphasize heart-healthy fats (omega-3s) and limit saturated fats");
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
      `Nutrition plan adjusted for: ${detectedConditions.map(c => c.condition).join(', ')}` : 
      'No specific medical considerations',
    medicalNutritionNotes: medicalNutritionNotes,
    genderConsideration: gender === 'female' ? 'female_optimized' : 'standard',
    isCuttingPlan: isCuttingPlan,
    originalCalorieIntake: isCuttingPlan ? Math.round(calorieIntake) : null,
    calorieDeficit: isCuttingPlan ? Math.round(calorieIntake - finalCalorieIntake) : 0,
    detectedMedicalConditions: detectedConditions.map(c => c.condition)
  };
};

// Function to get exercise alternatives for UI display
export const getExerciseAlternativesForUI = (exerciseName, fitnessLevel = 'beginner', workoutPreference = 'general') => {
  const alternatives = findExerciseAlternatives(exerciseName, null, fitnessLevel, workoutPreference);
  
  return {
    originalExercise: exerciseName,
    alternatives: alternatives,
    hasAlternatives: alternatives.length > 0,
    alternativeCount: alternatives.length
  };
};

// Function to handle alternative selection from UI
export const selectAlternativeExercise = (originalWorkoutPlan, dayIndex, workoutIndex, alternativeIndex) => {
  const updatedPlan = [...originalWorkoutPlan];
  const day = updatedPlan[dayIndex];
  const workout = day.workouts[workoutIndex];
  
  if (workout.alternatives && workout.alternatives[alternativeIndex]) {
    const selectedAlternative = workout.alternatives[alternativeIndex];
    day.workouts[workoutIndex] = replaceExerciseWithAlternative(workout, selectedAlternative);
  }
  
  return updatedPlan;
};

// Export all functions and constants
export {
  workoutDistributionPatterns,
  femaleWorkoutPatterns,
  powerliftingWorkoutPatterns,
  calisthenicsWorkoutPatterns,
  muscleGroupFocus,
  exercisePools,
  femaleExercisePools,
  powerliftingExercisePools,
  calisthenicsExercisePools,
  exerciseAlternatives,
  powerliftingAlternatives,
  calisthenicsAlternatives,
  medicalConditionPatterns,
  warmUpExercises,
  cardioExercises,
  selectWarmUpExercises,
  selectMedicalWarmUp,
  selectCardioExercise,
  findExerciseAlternatives,
  selectExercisesForDay,
  getRepRange,
  getExerciseEquipment,
  isCompoundExercise,
  getWorkoutIntensity,
  findCardioAlternatives,
  cardioAlternatives
};