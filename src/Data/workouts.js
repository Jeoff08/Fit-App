// workouts.js
// Import all workout categories
import { bodybuildingWorkouts, getBodybuildingWorkoutById, getWorkoutsByType, getBodybuildingWorkoutPlan } from './bodybuilding.js'
import { powerliftingWorkouts, getPowerliftingWorkoutById, getPowerliftingWorkoutsByType } from './powerlifting.js'
import { calisthenicsWorkouts, getCalisthenicsWorkoutById, getCalisthenicsWorkoutsByType } from './calisthenics.js'
import { medicalConditionWorkouts, getMedicalWorkoutsByCondition, getMedicalWorkoutById } from './medicalConditions.js'

// Enhanced workout database with additional metadata for optimal selection
export const enhancedWorkouts = {
  bodybuilding: {
    ...bodybuildingWorkouts,
    metadata: {
      type: 'hypertrophy',
      primaryGoal: 'muscle_growth',
      equipmentRequired: ['dumbbells', 'barbells', 'machines'],
      genderNeutral: true,
      medicalConsiderations: {
        backPain: 'moderate_risk',
        kneeProblems: 'variable_risk',
        shoulderProblems: 'moderate_risk'
      }
    }
  },
  powerlifting: {
    ...powerliftingWorkouts,
    metadata: {
      type: 'strength',
      primaryGoal: 'max_strength',
      equipmentRequired: ['barbells', 'power_rack', 'bench'],
      genderNeutral: true,
      medicalConsiderations: {
        backPain: 'high_risk',
        kneeProblems: 'high_risk',
        shoulderProblems: 'moderate_risk'
      }
    }
  },
  calisthenics: {
    ...calisthenicsWorkouts,
    metadata: {
      type: 'bodyweight',
      primaryGoal: 'functional_strength',
      equipmentRequired: ['pullup_bar', 'parallel_bars'],
      genderNeutral: true,
      medicalConsiderations: {
        backPain: 'low_risk',
        kneeProblems: 'low_risk',
        shoulderProblems: 'moderate_risk'
      }
    }
  },
  medical: {
    ...medicalConditionWorkouts,
    metadata: {
      type: 'rehabilitation',
      primaryGoal: 'recovery_safety',
      equipmentRequired: ['resistance_bands', 'bodyweight', 'light_dumbbells'],
      genderNeutral: true,
      medicalConsiderations: 'all_low_risk'
    }
  }
}

// Enhanced workout access functions
export const getAllWorkouts = () => {
  return {
    bodybuilding: bodybuildingWorkouts,
    powerlifting: powerliftingWorkouts,
    calisthenics: calisthenicsWorkouts,
    medical: medicalConditionWorkouts
  }
}

export const getWorkoutById = (workoutType, id) => {
  switch (workoutType) {
    case 'bodybuilding':
      return getBodybuildingWorkoutById(id)
    case 'powerlifting':
      return getPowerliftingWorkoutById(id)
    case 'calisthenics':
      return getCalisthenicsWorkoutById(id)
    case 'medical':
      return getMedicalWorkoutById(id)
    default:
      return null
  }
}

export const getWorkoutsByCategoryAndType = (category, type) => {
  switch (category) {
    case 'bodybuilding':
      return getWorkoutsByType(type)
    case 'powerlifting':
      return getPowerliftingWorkoutsByType(type)
    case 'calisthenics':
      return getCalisthenicsWorkoutsByType(type)
    case 'medical':
      return getMedicalWorkoutsByCondition(type)
    default:
      return []
  }
}

// Enhanced workout plan generation with optimal selection
export const generateOptimalWorkoutPlan = (userPreferences) => {
  const { 
    fitnessGoal, 
    workoutPreference, 
    fitnessLevel, 
    daysPerWeek, 
    gender,
    age,
    weight,
    height,
    medicalConditions = []
  } = userPreferences

  // Base workout selection
  let baseWorkouts = []
  let splitType = ''

  if (workoutPreference === 'bodybuilding') {
    if (daysPerWeek <= 3) {
      splitType = 'UpperLower'
      baseWorkouts = bodybuildingWorkouts.UpperLower || []
    } else if (daysPerWeek <= 4) {
      splitType = 'BroSplits'
      baseWorkouts = bodybuildingWorkouts.BroSplits || []
    } else {
      splitType = 'PPL'
      baseWorkouts = bodybuildingWorkouts.PPL || []
    }
  } else if (workoutPreference === 'powerlifting') {
    splitType = 'SBD'
    baseWorkouts = powerliftingWorkouts || []
  } else if (workoutPreference === 'calisthenics') {
    splitType = 'Bodyweight'
    baseWorkouts = calisthenicsWorkouts || []
  }

  // Apply gender-specific filtering for optimal selection
  const genderOptimizedWorkouts = baseWorkouts.filter(workout => {
    if (!workout.genderConsiderations) return true
    
    if (gender === 'female') {
      return workout.genderConsiderations.female !== 'not_recommended'
    } else {
      return workout.genderConsiderations.male !== 'not_recommended'
    }
  })

  // Apply fitness level filtering
  const levelOptimizedWorkouts = genderOptimizedWorkouts.filter(workout => {
    if (!workout.difficulty) return true
    
    const difficultyLevels = {
      beginner: ['beginner'],
      intermediate: ['beginner', 'intermediate'],
      advanced: ['beginner', 'intermediate', 'advanced']
    }
    
    return difficultyLevels[fitnessLevel].includes(workout.difficulty)
  })

  // Apply medical condition considerations
  const medicallyOptimizedWorkouts = levelOptimizedWorkouts.filter(workout => {
    if (medicalConditions.length === 0) return true
    if (!workout.medicalConsiderations) return true
    
    // Check if workout is safe for user's medical conditions
    return medicalConditions.every(condition => 
      workout.medicalConsiderations[condition] !== 'high_risk'
    )
  })

  return {
    workouts: medicallyOptimizedWorkouts,
    splitType,
    totalWorkouts: medicallyOptimizedWorkouts.length,
    genderOptimization: gender,
    fitnessLevelOptimization: fitnessLevel,
    medicalOptimization: medicalConditions.length > 0
  }
}

// Additional utility functions
export const getWorkoutRecommendations = (userProfile) => {
  const { fitnessGoal, experienceLevel, availableEquipment, medicalConditions } = userProfile
  const allWorkouts = getAllWorkouts()
  let recommendations = []

  // Filter based on fitness goal
  switch (fitnessGoal) {
    case 'muscle_growth':
      recommendations = allWorkouts.bodybuilding
      break
    case 'strength':
      recommendations = allWorkouts.powerlifting
      break
    case 'functional_fitness':
      recommendations = allWorkouts.calisthenics
      break
    case 'rehabilitation':
      recommendations = allWorkouts.medical
      break
    default:
      recommendations = Object.values(allWorkouts).flat()
  }

  // Filter based on equipment availability
  if (availableEquipment && availableEquipment.length > 0) {
    recommendations = recommendations.filter(workout => {
      const workoutEquipment = enhancedWorkouts[workout.category]?.metadata.equipmentRequired || []
      return workoutEquipment.some(equip => availableEquipment.includes(equip))
    })
  }

  // Filter based on medical conditions
  if (medicalConditions && medicalConditions.length > 0) {
    recommendations = recommendations.filter(workout => {
      const considerations = enhancedWorkouts[workout.category]?.metadata.medicalConsiderations
      return medicalConditions.every(condition => 
        considerations[condition] !== 'high_risk'
      )
    })
  }

  return recommendations.slice(0, 10) // Return top 10 recommendations
}

export const getTrendingWorkouts = () => {
  const allWorkouts = Object.values(getAllWorkouts()).flat()
  return allWorkouts
    .filter(workout => workout.trend2025)
    .sort((a, b) => {
      // Sort by popularity and trend status
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return 0
    })
}

export const getWorkoutsByDifficulty = (difficulty) => {
  const allWorkouts = Object.values(getAllWorkouts()).flat()
  return allWorkouts.filter(workout => {
    if (!workout.intensity) return false
    return workout.intensity.toLowerCase() === difficulty.toLowerCase()
  })
}

// Export individual workout categories
export {
  bodybuildingWorkouts,
  powerliftingWorkouts,
  calisthenicsWorkouts,
  medicalConditionWorkouts
}

export default enhancedWorkouts