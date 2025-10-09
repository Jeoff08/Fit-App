

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

// Main heuristic-based workout plan generator
export const generateWorkoutPlan = (userData, currentPlan = null, userProgress = null) => {
  const { fitnessGoal, workoutPreference, fitnessLevel, selectedDays, weight, hasMedicalConditions, medicalConditions, gender, preferredWorkoutDays } = userData;
  
  // Check if user has medical conditions
  const detectedConditions = hasMedicalConditions ? detectMedicalConditions(medicalConditions) : [];
  
  // If medical conditions are detected, prioritize medical workouts
  if (detectedConditions.length > 0) {
    return generateMedicalWorkoutPlan(detectedConditions, fitnessLevel, selectedDays, gender);
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
  const { fitnessGoal, weight, medicalConditions } = userData;
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

// Generate a completely new workout plan based on user data using heuristic approach
const generateNewWorkoutPlan = (userData) => {
  const { fitnessGoal, fitnessLevel, workoutPreference, selectedDays, weight, hasMedicalConditions, medicalConditions, gender } = userData;
  
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