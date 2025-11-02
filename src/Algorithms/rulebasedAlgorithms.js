// RulebaseAlgorithm.js

import { 
  bodybuildingWorkouts, 
  powerliftingWorkouts, 
  calisthenicsWorkouts,
  medicalConditionWorkouts 
} from '../Data/workouts';

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

// Function to find exercise alternatives
const findExerciseAlternatives = (exerciseName, preferredEquipment = null, fitnessLevel = 'beginner') => {
  const normalizedName = exerciseName.toLowerCase().trim();
  
  // Find alternatives for the exercise
  let alternatives = exerciseAlternatives[normalizedName] || [];
  
  // If no direct match, try partial matching
  if (alternatives.length === 0) {
    for (const [key, altList] of Object.entries(exerciseAlternatives)) {
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
        workout.difficulty || 'beginner'
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

// Function to get alternative workout plan with specific equipment
export const getAlternativeWorkoutPlan = (originalWorkoutPlan, equipmentType, fitnessLevel = 'beginner') => {
  const alternativePlan = originalWorkoutPlan.map(dayPlan => ({
    ...dayPlan,
    workouts: dayPlan.workouts.map(workout => {
      const alternatives = findExerciseAlternatives(workout.name, equipmentType, fitnessLevel);
      
      if (alternatives.length > 0) {
        // Replace with first available alternative
        return replaceExerciseWithAlternative(workout, alternatives[0]);
      }
      
      // If no alternative found, keep original
      return workout;
    })
  }));
  
  return alternativePlan;
};

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

// Enhanced medical condition detection with workout preference consideration
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
const getWorkoutIntensity = (condition, severity, fitnessLevel) => {
  // Base intensity on condition severity
  let baseIntensity = 'low';
  
  if (severity === 'mild') {
    baseIntensity = fitnessLevel === 'beginner' ? 'low' : 'moderate';
  } else if (severity === 'moderate') {
    baseIntensity = 'low';
  } else if (severity === 'severe') {
    baseIntensity = 'very low';
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

// Generate medical workout plan based on detected conditions
export const generateMedicalWorkoutPlanFromText = (medicalText, userData) => {
  const { fitnessLevel, selectedDays, gender, workoutPreference, weight } = userData;
  
  // Detect conditions from text
  const detectedConditions = detectMedicalConditions(medicalText, workoutPreference);
  
  if (detectedConditions.length === 0) {
    return null; // No medical conditions detected
  }
  
  // Use the primary condition (first detected)
  const primaryCondition = detectedConditions[0];
  const conditionKey = primaryCondition.condition;
  const severity = primaryCondition.severity;
  
  // Get appropriate intensity
  const workoutIntensity = getWorkoutIntensity(conditionKey, severity, fitnessLevel);
  
  // Get medical workouts for the condition
  let medicalWorkouts = medicalConditionWorkouts[conditionKey] || [];
  
  // Filter by intensity
  let filteredWorkouts = medicalWorkouts.filter(workout => 
    workout.intensity === workoutIntensity || 
    (workoutIntensity === 'very low' && workout.intensity === 'low')
  );
  
  // If no workouts found for the exact intensity, get all available
  if (filteredWorkouts.length === 0) {
    filteredWorkouts = medicalWorkouts;
  }
  
  // Further filter by workout preference to maintain training style
  let preferenceFilteredWorkouts = [];
  
  if (workoutPreference === 'bodybuilding') {
    preferenceFilteredWorkouts = filteredWorkouts.filter(workout => 
      workout.type === 'Bodybuilding' || 
      workout.type === 'Upper Body Strength' ||
      workout.type === 'Lower Body'
    );
  } else if (workoutPreference === 'powerlifting') {
    preferenceFilteredWorkouts = filteredWorkouts.filter(workout => 
      workout.type === 'Powerlifting' ||
      workout.type.includes('Strength')
    );
  } else if (workoutPreference === 'calisthenics') {
    preferenceFilteredWorkouts = filteredWorkouts.filter(workout => 
      workout.type === 'Calisthenics' ||
      workout.type === 'Bodyweight'
    );
  }
  
  // If preference filtering gives us too few exercises, include other types
  if (preferenceFilteredWorkouts.length < selectedDays.length * 4) {
    const additionalWorkouts = filteredWorkouts.filter(workout => 
      !preferenceFilteredWorkouts.includes(workout)
    );
    preferenceFilteredWorkouts = [...preferenceFilteredWorkouts, ...additionalWorkouts.slice(0, 10)];
  }
  
  // Ensure we have enough workouts
  const totalWorkoutsNeeded = selectedDays.length * 4; // 4 workouts per day for medical conditions
  let finalWorkouts = preferenceFilteredWorkouts;
  
  if (finalWorkouts.length < totalWorkoutsNeeded) {
    // Add more workouts from the general medical pool if needed
    const additionalNeeded = totalWorkoutsNeeded - finalWorkouts.length;
    const extraWorkouts = medicalWorkouts
      .filter(workout => !finalWorkouts.includes(workout))
      .slice(0, additionalNeeded);
    
    finalWorkouts = [...finalWorkouts, ...extraWorkouts];
  }
  
  // Distribute workouts across selected days (4 per day for medical conditions)
  const workoutsPerDay = 4;
  
  const weeklyPlan = selectedDays.map((day, index) => {
    const startIdx = index * workoutsPerDay;
    const endIdx = startIdx + workoutsPerDay;
    const dayWorkouts = finalWorkouts.slice(startIdx, endIdx);
    
    // Adjust workouts for gender if needed
    const genderAdjustedWorkouts = dayWorkouts.map(workout => 
      adjustWorkoutForGender(workout, gender, userData.fitnessGoal, weight)
    );
    
    return {
      day,
      workouts: genderAdjustedWorkouts,
      medicalCondition: conditionKey,
      conditionSeverity: severity,
      intensity: workoutIntensity,
      workoutStyle: workoutPreference,
      genderConsideration: gender === 'female' ? 'female_optimized' : 'standard',
      totalExercises: dayWorkouts.length,
      isMedicalPlan: true,
      medicalNotes: getMedicalNotes(conditionKey, severity)
    };
  });
  
  // Add alternatives to medical workout plan
  return addAlternativesToWorkoutPlan(weeklyPlan);
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

// Function to add leg workouts for females on Monday
const addLegWorkoutForFemale = (weeklyPlan, gender, adjustedWorkouts) => {
  if (gender === 'female') {
    // Find Monday in the weekly plan
    const mondayPlan = weeklyPlan.find(day => day.day.toLowerCase() === 'monday');
    
    if (mondayPlan) {
      // Filter leg workouts from available exercises
      const legWorkouts = adjustedWorkouts.filter(workout => 
        workout.muscleGroup && workout.muscleGroup.toLowerCase().includes('legs')
      );
      
      // Add 1-2 leg workouts to Monday if available
      if (legWorkouts.length > 0) {
        const legsToAdd = legWorkouts.slice(0, 2); // Add up to 2 leg exercises
        mondayPlan.workouts = [...legsToAdd, ...mondayPlan.workouts];
        
        // Ensure we don't exceed reasonable workout count
        if (mondayPlan.workouts.length > 8) {
          mondayPlan.workouts = mondayPlan.workouts.slice(0, 8);
        }
      }
    }
  }
  
  return weeklyPlan;
};

// Enhanced main workout generation function with medical condition detection
export const generateInitialWorkoutPlan = (userData) => {
  const { fitnessGoal, workoutPreference, fitnessLevel, selectedDays, weight, hasMedicalConditions, medicalConditions, gender } = userData;
  
  // Check if user has medical conditions and generate medical workout plan if detected
  if (hasMedicalConditions && medicalConditions && medicalConditions.trim() !== '') {
    const medicalPlan = generateMedicalWorkoutPlanFromText(medicalConditions, userData);
    if (medicalPlan) {
      return medicalPlan;
    }
  }
  
  // Original workout generation code for users without medical conditions
  let selectedWorkouts = [];
  let workoutSplit = [];
  
  // Select workout type based on preference
  if (workoutPreference === 'bodybuilding') {
    if (selectedDays.length <= 3) {
      workoutSplit = ['UpperLower'];
      selectedWorkouts = bodybuildingWorkouts.UpperLower;
    } else if (selectedDays.length <= 4) {
      workoutSplit = ['BroSplits'];
      selectedWorkouts = bodybuildingWorkouts.BroSplits;
    } else {
      workoutSplit = ['PPL'];
      selectedWorkouts = bodybuildingWorkouts.PPL;
    }
  } else if (workoutPreference === 'powerlifting') {
    workoutSplit = ['SBD'];
    selectedWorkouts = powerliftingWorkouts;
  } else if (workoutPreference === 'calisthenics') {
    workoutSplit = ['Bodyweight'];
    selectedWorkouts = calisthenicsWorkouts;
  }
  
  // Filter workouts based on gender to avoid redundancy
  selectedWorkouts = filterWorkoutsByGender(selectedWorkouts, gender, workoutPreference);
  
  // Adjust workout intensity based on fitness level, weight, and gender
  const adjustedWorkouts = selectedWorkouts.map(workout => {
    let adjustedWorkout = adjustWorkoutForGender(workout, gender, fitnessGoal, weight);
    
    // Adjust sets based on fitness level
    if (fitnessLevel === 'beginner') {
      adjustedWorkout.sets = Math.max(2, workout.sets - 1);
    } else if (fitnessLevel === 'advanced') {
      adjustedWorkout.sets = workout.sets + 1;
    }
    
    // Adjust reps based on goal (gender-specific adjustments already applied)
    if (!adjustedWorkout.reps) {
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
  
  // Ensure we have enough workouts for 5 per day
  const totalWorkoutsNeeded = selectedDays.length * 5;
  let finalWorkouts = adjustedWorkouts;
  
  if (finalWorkouts.length < totalWorkoutsNeeded) {
    // Add more workouts if needed (you might want to import additional exercises)
    const additionalNeeded = totalWorkoutsNeeded - finalWorkouts.length;
    // For now, we'll duplicate some workouts with modifications
    const availableWorkouts = [...finalWorkouts];
    
    for (let i = 0; i < additionalNeeded; i++) {
      const originalWorkout = availableWorkouts[i % availableWorkouts.length];
      const modifiedWorkout = {
        ...originalWorkout,
        id: originalWorkout.id * 1000 + i,
        name: `${originalWorkout.name} (Alternate)`,
        description: `${originalWorkout.description} - Additional variation`
      };
      finalWorkouts.push(modifiedWorkout);
    }
  }
  
  // Distribute workouts across selected days (5 per day)
  const workoutsPerDay = 5;
  
  let weeklyPlan = selectedDays.map((day, index) => {
    const startIdx = index * workoutsPerDay;
    const endIdx = startIdx + workoutsPerDay;
    return {
      day,
      workouts: finalWorkouts.slice(startIdx, endIdx),
      genderConsideration: gender === 'female' ? 'female_optimized' : 'standard',
      totalExercises: 5,
      isMedicalPlan: false
    };
  });
  
  // Add leg workouts for females on Monday
  weeklyPlan = addLegWorkoutForFemale(weeklyPlan, gender, adjustedWorkouts);
  
  // Ensure each day still has exactly 5 workouts after adding leg workouts
  weeklyPlan = weeklyPlan.map(dayPlan => {
    if (dayPlan.workouts.length > 5) {
      return {
        ...dayPlan,
        workouts: dayPlan.workouts.slice(0, 5)
      };
    }
    return dayPlan;
  });
  
  // Add alternatives to each exercise with button data
  weeklyPlan = addAlternativesToWorkoutPlan(weeklyPlan);
  
  return weeklyPlan;
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

// Function to get exercise alternatives for UI display
export const getExerciseAlternativesForUI = (exerciseName, fitnessLevel = 'beginner') => {
  const alternatives = findExerciseAlternatives(exerciseName, null, fitnessLevel);
  
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

// Export the alternative functions for external use
export { findExerciseAlternatives, exerciseAlternatives, medicalConditionPatterns };