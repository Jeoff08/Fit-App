import React, { useState } from 'react';
import { generateWorkoutPlan, generateNutritionPlan } from '../Algorithms/heuristicbasedAlgorithm';

const UserForm = ({ onSubmit }) => {
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
    { value: 'extremelyActive', label: 'Extremely Active', icon: '🏋️', description: 'Professional athlete level' }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setAnimationDirection('forward');
      setStep(step + 1);
    } else {
      // Generate workout plan using heuristic algorithm
      const workoutPlan = generateWorkoutPlan(userData);
      const nutritionPlan = generateNutritionPlan(userData);
      
      // Pass both user data and generated plans to parent
      onSubmit({
        ...userData,
        generatedWorkoutPlan: workoutPlan,
        generatedNutritionPlan: nutritionPlan
      });
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
      <h3 className="text-xl font-bold text-green-300 mb-6 text-center tracking-wide">
        PERSONAL INFORMATION
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Input */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">AGE</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-400 text-lg">🎂</span>
            </div>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="w-full bg-gray-800/90 border-2 border-green-600/30 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
              required
              min="15"
              max="100"
            />
          </div>
        </div>
        
        {/* Weight Input */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">WEIGHT (KG)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-400 text-lg">⚖️</span>
            </div>
            <input
              type="number"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              className="w-full bg-gray-800/90 border-2 border-green-600/30 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
              required
              min="30"
              max="200"
              step="0.1"
            />
          </div>
        </div>
        
        {/* Height Input */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">HEIGHT (CM)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-400 text-lg">📏</span>
            </div>
            <input
              type="number"
              name="height"
              value={userData.height}
              onChange={handleChange}
              className="w-full bg-gray-800/90 border-2 border-green-600/30 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
              required
              min="100"
              max="250"
            />
          </div>
        </div>
        
        {/* Gender Select */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">GENDER</label>
          <div className="grid grid-cols-3 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setUserData(prev => ({ ...prev, gender: option.value }))}
                className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  userData.gender === option.value
                    ? userData.gender === 'male'
                      ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg'
                      : 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg'
                    : 'bg-gray-800/70 border-green-600/30 text-green-200 hover:border-green-500/60'
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
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">FITNESS GOAL</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fitnessGoalOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, fitnessGoal: option.value }))}
              className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                userData.fitnessGoal === option.value
                  ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg'
                  : 'bg-gray-800/70 border-green-600/30 text-green-200 hover:border-green-500/60'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-xs opacity-80 mt-1">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={`space-y-6 animate-fade-in-${animationDirection}`}>
      <h3 className="text-xl font-bold text-green-300 mb-6 text-center tracking-wide">
        FITNESS PREFERENCES
      </h3>
      
      {/* Activity Level Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">ACTIVITY LEVEL</label>
        <div className="space-y-3">
          {activityLevelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, activityLevel: option.value }))}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 text-left ${
                userData.activityLevel === option.value
                  ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-400 text-white shadow-lg'
                  : 'bg-gray-800/70 border-green-600/30 text-green-200 hover:border-green-500/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{option.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{option.label}</div>
                    <div className="text-xs opacity-80">{option.description}</div>
                  </div>
                </div>
                {userData.activityLevel === option.value && (
                  <span className="text-white">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Workout Preference Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">TRAINING STYLE</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workoutPreferenceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, workoutPreference: option.value }))}
              className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                userData.workoutPreference === option.value
                  ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg'
                  : 'bg-gray-800/70 border-green-600/30 text-green-200 hover:border-green-500/60'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-xs opacity-80 mt-1">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fitness Level Select */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">EXPERIENCE LEVEL</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fitnessLevelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserData(prev => ({ ...prev, fitnessLevel: option.value }))}
              className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                userData.fitnessLevel === option.value
                  ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg'
                  : 'bg-gray-800/70 border-green-600/30 text-green-200 hover:border-green-500/60'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-xs font-bold">{option.label}</div>
                <div className="text-xs opacity-80 mt-1">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Workout Days */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-3 tracking-wide">
          WORKOUT DAYS PER WEEK: <span className="text-green-400 font-bold text-lg">{userData.preferredWorkoutDays}</span>
        </label>
        <div className="px-2">
          <input
            type="range"
            name="preferredWorkoutDays"
            min="1"
            max="7"
            value={userData.preferredWorkoutDays}
            onChange={handleChange}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-green"
          />
          <div className="flex justify-between text-xs text-green-300/80 mt-3 font-bold">
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <span key={day} className={day == userData.preferredWorkoutDays ? "text-green-400 text-lg" : ""}>
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
      <h3 className="text-xl font-bold text-green-300 mb-6 text-center tracking-wide">
        WORKOUT SCHEDULE
      </h3>
      
      {/* Day Selection Grid */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="block text-sm font-bold text-green-200 mb-4 text-center tracking-wide">
          SELECT {userData.preferredWorkoutDays} TRAINING DAY{userData.preferredWorkoutDays > 1 ? 'S' : ''}
        </label>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
          {daysOfWeek.map((day, index) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDaySelection(day)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                userData.selectedDays.includes(day)
                  ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg scale-110'
                  : 'bg-gray-800/70 border-green-600/30 text-green-200 hover:border-green-500/60'
              } ${userData.selectedDays.length >= userData.preferredWorkoutDays && !userData.selectedDays.includes(day) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={userData.selectedDays.length >= userData.preferredWorkoutDays && !userData.selectedDays.includes(day)}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-1">{day.substring(0, 3)}</div>
                <div className="text-xs opacity-80">{index + 1}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="text-sm text-green-300/80 text-center mt-4 font-bold">
          SELECTED: {userData.selectedDays.length}/{userData.preferredWorkoutDays} DAYS
        </p>
      </div>

      {/* Medical Conditions */}
      <div className="transform hover:scale-105 transition-transform duration-300">
        <label className="flex items-center cursor-pointer p-4 bg-gray-800/70 rounded-xl border-2 border-green-600/30 hover:border-green-500/40 transition-all duration-300">
          <input
            type="checkbox"
            name="hasMedicalConditions"
            checked={userData.hasMedicalConditions}
            onChange={handleChange}
            className="mr-3 accent-green-500 cursor-pointer h-5 w-5"
          />
          <span className="text-sm font-bold text-green-200 tracking-wide">MEDICAL CONDITIONS OR INJURIES?</span>
        </label>
        {userData.hasMedicalConditions && (
          <div className="mt-4 relative animate-fade-in">
            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
              <span className="text-green-400 text-lg">🏥</span>
            </div>
            <textarea
              name="medicalConditions"
              value={userData.medicalConditions}
              onChange={handleChange}
              placeholder="Please describe any medical conditions, injuries, or limitations we should know about..."
              className="w-full bg-gray-800/90 border-2 border-green-600/30 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 resize-none"
              rows="3"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden relative">
      {/* Background Image with Overlay - Fixed */}
      <div className="fixed inset-0 z-0">
        <img 
          src="src/assets/Kyrie-fitness gym.jpg(1).jpg"
          alt="Gym background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/80 backdrop-blur-sm"></div>
      </div>
      
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-gradient-to-br from-gray-900/95 via-gray-950/90 to-black/95 rounded-3xl shadow-2xl overflow-hidden border border-green-500/30 z-10 my-8 backdrop-blur-lg relative transform hover:scale-101 transition-transform duration-500">
        {/* Progress Bar */}
        <div className="bg-gray-800/50 h-2 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-700 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
          <div className="absolute inset-0 flex justify-between px-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                num <= step ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-400 scale-125' : 'bg-gray-700 border-gray-600'
              }`}></div>
            ))}
          </div>
        </div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/80 via-green-900/40 to-gray-900/80 py-8 px-8 border-b border-green-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-green-500/5 to-green-500/5"></div>
          <div className="flex items-center justify-center space-x-4 relative z-10">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full shadow-lg animate-pulse-slow">
              <img 
                src="src/assets/Kyrie-fitness gym.jpg" 
                alt="ASH-FIT Logo" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400 tracking-wider">
              ASH<span className="text-green-400">FIT</span>
            </h1>
          </div>
          <p className="text-green-300 text-center text-sm mt-3 font-bold tracking-widest">
            STEP {step} OF 3 - {step === 1 ? 'PERSONAL INFO' : step === 2 ? 'PREFERENCES' : 'SCHEDULE'}
          </p>
        </div>
        
        {/* Form Content */}
        <div className="px-8 py-8 bg-transparent">
          <h2 className="text-3xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-300 tracking-wide">
            FITNESS PROFILE BUILDER
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="min-h-96">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </div>
            
            {/* Navigation Buttons */}
            <div className={`flex ${step > 1 ? 'justify-between' : 'justify-end'} mt-10`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-4 bg-gray-700/80 hover:bg-gray-600/90 text-white font-bold rounded-xl transition-all duration-300 border border-green-600/50 hover:border-green-500/60 hover:scale-105 flex items-center space-x-3 shadow-lg"
                >
                  <span className="text-lg">←</span>
                  <span>BACK</span>
                </button>
              )}
              
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-green-500/30 hover:scale-105 flex items-center space-x-3 group"
              >
                <span className="tracking-wide">{step === 3 ? 'GENERATE WORKOUT PLAN' : 'CONTINUE'}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300 text-lg">
                  {step === 3 ? '🎯' : '→'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for animations */}
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
          background: linear-gradient(45deg, #10b981, #22c55e);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        
        .slider-thumb-green::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #22c55e);
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
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
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
};

export default UserForm;