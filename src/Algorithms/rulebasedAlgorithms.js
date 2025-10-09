//RulebaseAlgorithm

import { 
  bodybuildingWorkouts, 
  powerliftingWorkouts, 
  calisthenicsWorkouts,
  medicalConditionWorkouts 
} from '../Data/workouts';

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

export const generateInitialWorkoutPlan = (userData) => {
  const { fitnessGoal, workoutPreference, fitnessLevel, selectedDays, weight, hasMedicalConditions, medicalConditions, gender } = userData;
  
  // Check if user has medical conditions
  const detectedConditions = hasMedicalConditions ? detectMedicalConditions(medicalConditions) : [];
  
  // If medical conditions are detected, prioritize medical workouts
  if (detectedConditions.length > 0) {
    return generateMedicalWorkoutPlan(detectedConditions, fitnessLevel, selectedDays, gender);
  }
  
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
  
  // Distribute workouts across selected days
  const workoutsPerDay = Math.ceil(adjustedWorkouts.length / selectedDays.length);
  
  const weeklyPlan = selectedDays.map((day, index) => {
    const startIdx = index * workoutsPerDay;
    const endIdx = startIdx + workoutsPerDay;
    return {
      day,
      workouts: adjustedWorkouts.slice(startIdx, endIdx),
      genderConsideration: gender === 'female' ? 'female_optimized' : 'standard'
    };
  });
  
  return weeklyPlan;
};

// Generate workout plan for users with medical conditions
const generateMedicalWorkoutPlan = (conditions, fitnessLevel, selectedDays, gender) => {
  // For simplicity, we'll use the first detected condition
  const primaryCondition = conditions[0];
  const medicalWorkouts = medicalConditionWorkouts[primaryCondition] || [];
  
  // Filter medical workouts by gender
  const genderFilteredWorkouts = filterWorkoutsByGender(medicalWorkouts, gender, 'medical');
  
  // Adjust intensity based on fitness level
  let intensity = 'low';
  if (fitnessLevel === 'intermediate') {
    intensity = 'moderate';
  } else if (fitnessLevel === 'advanced') {
    intensity = 'moderate'; // Still keep it moderate for safety
  }
  
  // Filter workouts by intensity
  const filteredWorkouts = genderFilteredWorkouts.filter(workout => workout.intensity === intensity);
  
  // Distribute workouts across selected days
  const workoutsPerDay = Math.min(4, Math.ceil(filteredWorkouts.length / selectedDays.length));
  
  const weeklyPlan = selectedDays.map((day, index) => {
    const startIdx = index * workoutsPerDay;
    const endIdx = startIdx + workoutsPerDay;
    return {
      day,
      workouts: filteredWorkouts.slice(startIdx, endIdx),
      medicalCondition: primaryCondition,
      intensity: intensity,
      genderConsideration: gender === 'female' ? 'female_optimized' : 'standard'
    };
  });
  
  return weeklyPlan;
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

// Additional function for flexible cutting adjustment
export const adjustNutritionForCutting = (baseNutritionPlan, calorieReduction = 400) => {
  if (calorieReduction < 300 || calorieReduction > 500) {
    throw new Error('Calorie reduction for cutting should be between 300-500 calories');
  }
rulebasedalgorithm  


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