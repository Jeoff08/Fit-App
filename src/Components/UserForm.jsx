import React, { useState } from 'react';
import { generateWorkoutPlan, generateNutritionPlan } from '../Algorithms/heuristicbasedAlgorithm';
import { db } from '../Config/firebaseconfig';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const UserForm = ({ onSubmit, isRegenerating = false }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    fitnessGoal: 'muscleGain',
    activityLevel: 'moderate',
    workoutPreference: 'bodybuilding',
    fitnessLevel: 'beginner',
    hasMedicalConditions: false,
    medicalConditions: '',
    preferredWorkoutDays: 3,
    selectedDays: []
  });

  const [animationDirection, setAnimationDirection] = useState('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Enhanced options with more realistic choices
  const genderOptions = [
    { value: 'male', label: 'Male', icon: '♂', description: 'Male' },
    { value: 'female', label: 'Female', icon: '♀', description: 'Female' },
  ];

  const fitnessGoalOptions = [
    { value: 'weightLoss', label: 'Fat Loss', icon: '🔥', description: 'Burn fat and reduce body weight' },
    { value: 'cutting', label: 'Cutting Phase', icon: '✂️', description: 'Maintain muscle while losing fat' },
    { value: 'leanMuscle', label: 'Lean Muscle', icon: '💪', description: 'Build defined, athletic physique' },
    { value: 'muscleGain', label: 'Mass Building', icon: '🏋️', description: 'Increase muscle size and strength' },
    { value: 'bulking', label: 'Bulking Phase', icon: '📈', description: 'Maximize muscle growth' },
    { value: 'muscleTone', label: 'Toning', icon: '✨', description: 'Define and sculpt muscles' },
    { value: 'maintenance', label: 'Maintenance', icon: '⚖️', description: 'Maintain current fitness level' },
    { value: 'performance', label: 'Athletic Performance', icon: '🏃', description: 'Improve sports performance' }
  ];

  const activityLevelOptions = [
    { value: 'sedentary', label: 'Desk Job', icon: '💺', description: 'Mostly sitting, little exercise' },
    { value: 'light', label: 'Light Active', icon: '🚶', description: 'Light exercise 1-2 days/week' },
    { value: 'moderate', label: 'Moderately Active', icon: '🏃', description: 'Exercise 3-4 days/week' },
    { value: 'active', label: 'Very Active', icon: '🚴', description: 'Intense exercise 5-6 days/week' },
  ];

  const workoutPreferenceOptions = [
    { value: 'bodybuilding', label: 'Bodybuilding', icon: '🏋️', description: 'Aesthetic muscle development' },
    { value: 'powerlifting', label: 'Powerlifting', icon: '💪', description: 'Focus on strength and power' },
    { value: 'calisthenics', label: 'Calisthenics', icon: '🤸', description: 'Bodyweight exercises' },
  ];

  const fitnessLevelOptions = [
    { value: 'beginner', label: 'New Starter', icon: '🌱', description: 'Less than 6 months experience' },
    { value: 'intermediate', label: 'Regular Trainee', icon: '🌿', description: '6 months - 2 years experience' },
    { value: 'advanced', label: 'Advanced Lifter', icon: '🦾', description: '2+ years consistent training' },
    { value: 'elite', label: 'Elite Athlete', icon: '🏆', description: 'Competitive experience' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDaySelection = (day) => {
    setUserData(prevData => {
      const selectedDays = [...prevData.selectedDays];
      if (selectedDays.includes(day)) {
        return { ...prevData, selectedDays: selectedDays.filter(d => d !== day) };
      } else if (selectedDays.length < prevData.preferredWorkoutDays) {
        return { ...prevData, selectedDays: [...selectedDays, day] };
      }
      return prevData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setAnimationDirection('forward');
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      
      try {
        // Generate workout and nutrition plans using heuristic algorithm
        const workoutPlan = generateWorkoutPlan(userData);
        const nutritionPlan = generateNutritionPlan(userData);
        
        // Get current user
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Prepare complete user data
        const completeUserData = {
          // Personal Information
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          gender: userData.gender,
          
          // Fitness Stats
          fitnessGoal: userData.fitnessGoal,
          activityLevel: userData.activityLevel,
          workoutPreference: userData.workoutPreference,
          fitnessLevel: userData.fitnessLevel,
          
          // Medical Information
          hasMedicalConditions: userData.hasMedicalConditions,
          medicalConditions: userData.medicalConditions,
          
          // Workout Schedule
          preferredWorkoutDays: userData.preferredWorkoutDays,
          selectedDays: userData.selectedDays,
          
          // Generated Plans
          generatedWorkoutPlan: workoutPlan,
          generatedNutritionPlan: nutritionPlan,
          lastWorkoutPlanUpdate: new Date().toISOString(),
          
          // Progress Tracking (reset for new plan if regenerating)
          ...(isRegenerating && {
            workoutHistory: [],
            lastCompletedWorkout: null,
            lastWorkoutAdjustment: null
          }),
          
          // Timestamp
          lastUpdated: new Date().toISOString()
        };

        // Save to Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, completeUserData, { merge: true });

        // Save to localStorage for immediate access
        localStorage.setItem('userFitnessProfile', JSON.stringify(completeUserData));

        // Set registration date if it's the first time
        const savedRegistrationDate = localStorage.getItem('userRegistrationDate');
        if (!savedRegistrationDate) {
          localStorage.setItem('userRegistrationDate', new Date().toISOString());
        }

        // Pass data to parent component
        if (onSubmit) {
          onSubmit(completeUserData);
        }

        console.log('User data saved successfully:', completeUserData);

      } catch (error) {
        console.error('Error saving user data:', error);
        alert('Error saving your profile. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setAnimationDirection('backward');
      setStep(step - 1);
    }
  };

  const renderStep1 = () => (
    <div className={`space-y-6 animate-fade-in-${animationDirection}`}>
      <h3 className="text-xl font-bold text-green-300 mb-6 text-center tracking-wide border-b border-green-500/30 pb-3">
        PERSONAL INFORMATION
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Age Input */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">🎂</span>
            AGE
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-400 text-lg">🎂</span>
            </div>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="w-full bg-gradient-to-b from-gray-900 to-black border-2 border-green-600/50 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/30 transition-all duration-300"
              required
              min="15"
              max="100"
            />
          </div>
        </div>
        
        {/* Weight Input */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">⚖️</span>
            WEIGHT (KG)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-400 text-lg">⚖️</span>
            </div>
            <input
              type="number"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              className="w-full bg-gradient-to-b from-gray-900 to-black border-2 border-green-600/50 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/30 transition-all duration-300"
              required
              min="30"
              max="200"
              step="0.1"
            />
          </div>
        </div>
        
        {/* Height Input */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">📏</span>
            HEIGHT (CM)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-400 text-lg">📏</span>
            </div>
            <input
              type="number"
              name="height"
              value={userData.height}
              onChange={handleChange}
              className="w-full bg-gradient-to-b from-gray-900 to-black border-2 border-green-600/50 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/30 transition-all duration-300"
              required
              min="100"
              max="250"
            />
          </div>
        </div>
        
        {/* Gender Select */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">👤</span>
            GENDER
          </label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setUserData(prev => ({ ...prev, gender: option.value }))}
                className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  userData.gender === option.value
                    ? 'bg-gradient-to-br from-green-600 to-green-800 border-green-400 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gradient-to-b from-gray-900 to-black border-green-600/50 text-green-200 hover:border-green-500/80 hover:bg-gradient-to-br hover:from-green-900/30 hover:to-black'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">{option.icon}</div>
                  <div className="text-xs font-semibold">{option.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fitness Goal Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">🎯</span>
          FITNESS GOAL
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          {fitnessGoalOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, fitnessGoal: option.value }))}
              className={`p-2 md:p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                userData.fitnessGoal === option.value
                  ? 'bg-gradient-to-br from-green-600 to-green-800 border-green-400 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gradient-to-b from-gray-900 to-black border-green-600/50 text-green-200 hover:border-green-500/80 hover:bg-gradient-to-br hover:from-green-900/30 hover:to-black'
              }`}
            >
              <div className="text-center">
                <div className="text-base md:text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-xs opacity-80 mt-1 hidden sm:block">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={`space-y-6 animate-fade-in-${animationDirection}`}>
      <h3 className="text-xl font-bold text-green-300 mb-6 text-center tracking-wide border-b border-green-500/30 pb-3">
        FITNESS PREFERENCES
      </h3>
      
      {/* Activity Level Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">🏃</span>
          ACTIVITY LEVEL
        </label>
        <div className="space-y-2 md:space-y-3">
          {activityLevelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, activityLevel: option.value }))}
              className={`w-full p-3 md:p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 text-left ${
                userData.activityLevel === option.value
                  ? 'bg-gradient-to-r from-green-600 to-green-800 border-green-400 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gradient-to-b from-gray-900 to-black border-green-600/50 text-green-200 hover:border-green-500/80 hover:bg-gradient-to-br hover:from-green-900/30 hover:to-black'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <span className="text-lg md:text-xl">{option.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{option.label}</div>
                    <div className="text-xs opacity-80 hidden sm:block">{option.description}</div>
                  </div>
                </div>
                {userData.activityLevel === option.value && (
                  <span className="text-white bg-green-500 rounded-full p-1">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Workout Preference Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">💪</span>
          TRAINING STYLE
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {workoutPreferenceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, workoutPreference: option.value }))}
              className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                userData.workoutPreference === option.value
                  ? 'bg-gradient-to-br from-green-600 to-green-800 border-green-400 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gradient-to-b from-gray-900 to-black border-green-600/50 text-green-200 hover:border-green-500/80 hover:bg-gradient-to-br hover:from-green-900/30 hover:to-black'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-xs opacity-80 mt-1 hidden sm:block">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fitness Level Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">📊</span>
          EXPERIENCE LEVEL
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {fitnessLevelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, fitnessLevel: option.value }))}
              className={`p-2 md:p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                userData.fitnessLevel === option.value
                  ? 'bg-gradient-to-br from-green-600 to-green-800 border-green-400 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gradient-to-b from-gray-900 to-black border-green-600/50 text-green-200 hover:border-green-500/80 hover:bg-gradient-to-br hover:from-green-900/30 hover:to-black'
              }`}
            >
              <div className="text-center">
                <div className="text-base md:text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-xs opacity-80 mt-1 hidden sm:block">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Workout Days */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">📅</span>
          WORKOUT DAYS PER WEEK: <span className="text-green-400 font-bold text-lg ml-2 bg-gradient-to-r from-green-500 to-green-700 px-2 py-1 rounded-lg">{userData.preferredWorkoutDays}</span>
        </label>
        <div className="px-2">
          <input
            type="range"
            name="preferredWorkoutDays"
            min="1"
            max="7"
            value={userData.preferredWorkoutDays}
            onChange={handleChange}
            className="w-full h-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg appearance-none cursor-pointer slider-thumb-green"
          />
          <div className="flex justify-between text-xs text-green-300/80 mt-3 font-bold">
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <span key={day} className={day == userData.preferredWorkoutDays ? "text-green-400 text-lg bg-gradient-to-r from-green-600 to-green-800 px-2 rounded-full" : ""}>
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={`space-y-6 animate-fade-in-${animationDirection}`}>
      <h3 className="text-xl font-bold text-green-300 mb-6 text-center tracking-wide border-b border-green-500/30 pb-3">
        WORKOUT SCHEDULE
      </h3>
      
      {/* Day Selection Grid */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-4 text-center tracking-wide flex items-center justify-center">
          <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">📋</span>
          SELECT {userData.preferredWorkoutDays} TRAINING DAY{userData.preferredWorkoutDays > 1 ? 'S' : ''}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {daysOfWeek.map((day, index) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDaySelection(day)}
              className={`p-2 md:p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                userData.selectedDays.includes(day)
                  ? 'bg-gradient-to-br from-green-600 to-green-800 border-green-400 text-white shadow-lg shadow-green-500/30 scale-110'
                  : 'bg-gradient-to-b from-gray-900 to-black border-green-600/50 text-green-200 hover:border-green-500/80 hover:bg-gradient-to-br hover:from-green-900/30 hover:to-black'
              } ${userData.selectedDays.length >= userData.preferredWorkoutDays && !userData.selectedDays.includes(day) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={userData.selectedDays.length >= userData.preferredWorkoutDays && !userData.selectedDays.includes(day)}
            >
              <div className="text-center">
                <div className="text-sm md:text-lg font-bold mb-1">{day.substring(0, 3)}</div>
                <div className="text-xs opacity-80">{index + 1}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="text-sm text-green-300/80 text-center mt-4 font-bold bg-gradient-to-r from-green-900/50 to-black/50 p-2 rounded-lg">
          SELECTED: {userData.selectedDays.length}/{userData.preferredWorkoutDays} DAYS
        </p>
      </div>

      {/* Medical Conditions */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="flex items-center cursor-pointer p-3 md:p-4 bg-gradient-to-b from-gray-900 to-black rounded-xl border-2 border-green-600/50 hover:border-green-500/60 transition-all duration-300">
          <input
            type="checkbox"
            name="hasMedicalConditions"
            checked={userData.hasMedicalConditions}
            onChange={handleChange}
            className="mr-3 accent-green-500 cursor-pointer h-5 w-5"
          />
          <span className="text-sm font-bold text-green-200 tracking-wide flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-2">🏥</span>
            MEDICAL CONDITIONS OR INJURIES?
          </span>
        </label>
        {userData.hasMedicalConditions && (
          <div className="mt-4 relative animate-fade-in">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <span className="text-green-400 text-lg">💊</span>
            </div>
            <textarea
              name="medicalConditions"
              value={userData.medicalConditions}
              onChange={handleChange}
              placeholder="Please describe any medical conditions, injuries, or limitations we should know about..."
              className="w-full bg-gradient-to-b from-gray-900 to-black border-2 border-green-600/50 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/30 transition-all duration-300 resize-none"
              rows="3"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-black overflow-hidden relative">
      {/* Background Image with Overlay - Fixed */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/Kyrie-fitness gym.jpg(1).jpg"
          alt="Gym background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-green-900/20 to-black/90 backdrop-blur-sm"></div>
      </div>
      
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-gradient-to-br from-gray-900/95 via-green-950/50 to-black/95 rounded-3xl shadow-2xl overflow-hidden border border-green-500/50 z-10 my-4 md:my-8 backdrop-blur-lg relative transform hover:scale-101 transition-transform duration-500">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-black h-2 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 h-full transition-all duration-700 ease-out shadow-lg shadow-green-500/30"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex justify-between px-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                num <= step ? 'bg-gradient-to-r from-green-500 to-green-700 border-green-400 scale-125 shadow-lg shadow-green-500/50' : 'bg-gray-700 border-gray-600'
              }`}></div>
            ))}
          </div>
        </div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 via-green-900/60 to-gray-900/90 py-6 md:py-8 px-4 md:px-8 border-b border-green-500/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10"></div>
          <div className="flex items-center justify-center space-x-3 md:space-x-4 relative z-10">
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 md:p-3 rounded-full shadow-lg shadow-green-500/50 animate-pulse-slow border border-green-400/50">
              <img 
                src="/images/Kyrie-fitness gym.jpg" 
                alt="ASH-FIT Logo" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-300 tracking-wider">
              ASH<span className="text-green-400">FIT</span>
            </h1>
          </div>
          <p className="text-green-300 text-center text-xs md:text-sm mt-2 md:mt-3 font-bold tracking-widest bg-gradient-to-r from-green-900/50 to-black/50 p-2 rounded-lg">
            {isRegenerating ? 'REGENERATE WORKOUT PLAN' : `STEP ${step} OF 3 - ${step === 1 ? 'PERSONAL INFO' : step === 2 ? 'PREFERENCES' : 'SCHEDULE'}`}
          </p>
        </div>
        
        {/* Form Content */}
        <div className="px-4 md:px-8 py-6 md:py-8 bg-transparent">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-green-300 to-green-200 tracking-wide">
            {isRegenerating ? 'UPDATE YOUR FITNESS PROFILE' : 'FITNESS PROFILE BUILDER'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="min-h-80 md:min-h-96">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </div>
            
            {/* Navigation Buttons */}
            <div className={`flex ${step > 1 ? 'justify-between' : 'justify-end'} mt-8 md:mt-10`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-b from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-bold rounded-xl transition-all duration-300 border border-green-600/50 hover:border-green-500/80 hover:scale-105 flex items-center space-x-2 md:space-x-3 shadow-lg"
                >
                  <span className="text-lg">←</span>
                  <span className="text-sm md:text-base">BACK</span>
                </button>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white font-bold rounded-xl transition-all duration-300 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 flex items-center space-x-2 md:space-x-3 group border border-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    <span className="tracking-wide text-sm md:text-base">SAVING...</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide text-sm md:text-base">{step === 3 ? 'GENERATE PLAN' : 'CONTINUE'}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-lg">
                      {step === 3 ? '🎯' : '→'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for animations and mobile responsiveness */}
      <style jsx>{`
        @keyframes fadeInForward {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInBackward {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in-forward {
          animation: fadeInForward 0.5s ease-out;
        }
        
        .animate-fade-in-backward {
          animation: fadeInBackward 0.5s ease-out;
        }
        
        .slider-thumb-green::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #22c55e, #16a34a);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.7);
        }
        
        .slider-thumb-green::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #22c55e, #16a34a);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.7);
        }
        
        .hover-scale-102:hover {
          transform: scale(1.02);
        }
        
        .scale-101 {
          transform: scale(1.01);
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.8);
          }
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }

        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .min-h-80 {
            min-height: 20rem;
          }
          
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .py-6 {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }
          
          .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
          
          .space-y-6 > * + * {
            margin-top: 1rem;
          }
          
          .gap-2 {
            gap: 0.5rem;
          }
          
          .p-2 {
            padding: 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .hidden.sm\\:block {
            display: none;
          }
        }

        @media (min-width: 768px) {
          .hidden.md\\:block {
            display: block;
          }
          
          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          
          .md\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          
          .md\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          
          .md\\:grid-cols-7 {
            grid-template-columns: repeat(7, minmax(0, 1fr));
          }
        }

        /* Small phone adjustments */
        @media (max-width: 380px) {
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          
          .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          
          .text-xs {
            font-size: 0.7rem;
          }
          
          .p-2 {
            padding: 0.4rem;
          }
          
          .gap-2 {
            gap: 0.4rem;
          }
        }

        /* New Media Screen for Ultra-small devices */
        @media (max-width: 320px) {
          .min-h-screen {
            min-height: 100vh;
            padding: 0.5rem;
          }
          
          .max-w-4xl {
            margin: 0.25rem;
          }
          
          .text-2xl {
            font-size: 1.25rem;
          }
          
          .text-xl {
            font-size: 1.125rem;
          }
          
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .grid-cols-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          
          .gap-2 {
            gap: 0.25rem;
          }
          
          .p-2 {
            padding: 0.25rem;
          }
          
          .px-4 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .py-6 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          
          .space-y-6 > * + * {
            margin-top: 0.75rem;
          }
        }

        /* Media Screen for Tablets */
        @media (min-width: 769px) and (max-width: 1024px) {
          .max-w-4xl {
            max-width: 90%;
          }
          
          .md\\:grid-cols-4 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          
          .md\\:grid-cols-7 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        /* Media Screen for Large screens */
        @media (min-width: 1025px) {
          .max-w-4xl {
            max-width: 56rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserForm;