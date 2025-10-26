import React, { useState, useMemo, useEffect } from 'react';
import { bodybuilders } from '../data2.0/bodybuilders';
import { modernInfluencers } from '../data2.0/modernInfluencers';
import { scienceBasedLifters } from '../data2.0/scienceBasedLifters';
import { coaches } from '../data2.0/coaches';
import { db } from '../Config/firebaseconfig';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Influencers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [appliedWorkouts, setAppliedWorkouts] = useState([]);
  const [showAppliedWorkoutPopup, setShowAppliedWorkoutPopup] = useState(false);
  const [recentlyAppliedWorkout, setRecentlyAppliedWorkout] = useState(null);
  
  const [showDaySelectionModal, setShowDaySelectionModal] = useState(false);
  const [selectedWorkoutData, setSelectedWorkoutData] = useState(null);
  const [userWorkoutDays, setUserWorkoutDays] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [userId, setUserId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allInfluencers = useMemo(() => [
    ...bodybuilders,
    ...modernInfluencers,
    ...scienceBasedLifters,
    ...coaches
  ], []);

  // Initialize user and listen for changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        await initializeUserData(user.uid);
      } else {
        // Handle case when user is not logged in
        setUserId(null);
        setUserProfile({});
        setUserWorkoutDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
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
        setUserProfile(userData.profile || {});
        
        // Set workout days from applied workouts or profile
        if (userData.appliedWorkouts && userData.appliedWorkouts.length > 0 && userData.appliedWorkouts[0].days) {
          const days = userData.appliedWorkouts[0].days.map(day => day.day);
          setUserWorkoutDays(days);
        } else if (userData.profile?.trainingDays && userData.profile.trainingDays.length > 0) {
          setUserWorkoutDays(userData.profile.trainingDays);
        } else {
          setUserWorkoutDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
        }
        
        setAppliedWorkouts(userData.appliedWorkouts || []);
      } else {
        // Create initial user document
        await setDoc(userDocRef, {
          profile: {},
          appliedWorkouts: [],
          workoutHistory: [],
          createdAt: new Date()
        });
        setUserWorkoutDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
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
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Heuristic algorithm to adjust workout based on user data
  const adjustWorkoutForUser = (exercises, userData) => {
    if (!userData || !userData.fitnessLevel) return exercises;

    const adjustedExercises = exercises.map(exercise => {
      let adjustedExercise = { ...exercise };
      
      // Adjust based on fitness level
      switch (userData.fitnessLevel.toLowerCase()) {
        case 'beginner':
          if (adjustedExercise.sets > 3) {
            adjustedExercise.sets = 3;
          }
          
          if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
            const [min, max] = adjustedExercise.reps.split('-').map(Number);
            adjustedExercise.reps = `${Math.max(8, min - 2)}-${Math.max(12, max - 2)}`;
          } else if (typeof adjustedExercise.reps === 'number') {
            adjustedExercise.reps = Math.min(12, Math.max(8, adjustedExercise.reps));
          }
          
          if (adjustedExercise.rest) {
            adjustedExercise.rest = `90-120s`;
          }
          break;
          
        case 'intermediate':
          if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
            const [min, max] = adjustedExercise.reps.split('-').map(Number);
            adjustedExercise.reps = `${Math.max(6, min - 1)}-${Math.max(10, max - 1)}`;
          }
          break;
          
        case 'advanced':
          if (adjustedExercise.sets < 4) {
            adjustedExercise.sets += 1;
          }
          break;
          
        default:
          break;
      }
      
      // Adjust for age if available
      if (userData.age && userData.age > 40) {
        if (adjustedExercise.sets > 3) {
          adjustedExercise.sets = 3;
        }
        
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${Math.max(8, min)}-${Math.max(12, max)}`;
        }
        
        if (adjustedExercise.rest) {
          adjustedExercise.rest = `90-120s`;
        }
      }
      
      // Adjust for weight goals
      if (userData.fitnessGoal === 'weightLoss') {
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${min + 2}-${max + 4}`;
        } else if (typeof adjustedExercise.reps === 'number') {
          adjustedExercise.reps = adjustedExercise.reps + 4;
        }
      } else if (userData.fitnessGoal === 'muscleGain') {
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${Math.max(6, min)}-${Math.max(10, max)}`;
        }
      }
      
      return adjustedExercise;
    });
    
    return adjustedExercises;
  };

  const getInfluencersByCategory = (category) => {
    switch (category) {
      case 'bodybuilders': return bodybuilders;
      case 'modern': return modernInfluencers;
      case 'science': return scienceBasedLifters;
      case 'coaches': return coaches;
      default: return allInfluencers;
    }
  };

  const filteredInfluencers = useMemo(() => {
    if (searchTerm.trim()) {
      const categoryInfluencers = getInfluencersByCategory(selectedCategory);
      return categoryInfluencers.filter(influencer => 
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return getInfluencersByCategory(selectedCategory);
    }
  }, [allInfluencers, searchTerm, selectedCategory]);

  const openWorkoutModal = (split) => {
    const adjustedSplit = {
      ...split,
      exercises: adjustWorkoutForUser(split.exercises, userProfile)
    };
    setSelectedSplit(adjustedSplit);
    setIsModalOpen(true);
  };

  const closeWorkoutModal = () => {
    setIsModalOpen(false);
    setSelectedSplit(null);
  };

  const handleInfluencerClick = (influencer) => {
    setSelectedInfluencer(influencer);
  };

  const handleBackToGrid = () => {
    setSelectedInfluencer(null);
  };

  const openDaySelectionModal = (influencerName, split) => {
    const adjustedSplit = {
      ...split,
      exercises: adjustWorkoutForUser(split.exercises, userProfile)
    };
    setSelectedWorkoutData({ influencerName, split: adjustedSplit });
    setShowDaySelectionModal(true);
  };

  const closeDaySelectionModal = () => {
    setShowDaySelectionModal(false);
    setSelectedWorkoutData(null);
  };

  const handleApplyWorkoutToDay = async (selectedDay) => {
    if (!selectedWorkoutData || !userId) return;
    
    const { influencerName, split } = selectedWorkoutData;
    const workoutPlan = convertSplitToWorkoutPlanForDay(influencerName, split, selectedDay);
    
    try {
      const userDocRef = doc(db, 'users', userId);
      
      // Get current applied workouts
      const userDoc = await getDoc(userDocRef);
      const currentData = userDoc.exists() ? userDoc.data() : { appliedWorkouts: [] };
      const existingWorkouts = currentData.appliedWorkouts || [];
      
      const dayIndex = userWorkoutDays.findIndex(day => day === selectedDay);
      let newWorkouts = [...existingWorkouts];
      
      if (newWorkouts.length > 0 && newWorkouts[0].days) {
        const dayIndex = newWorkouts[0].days.findIndex(day => day.day === selectedDay);
        
        if (dayIndex !== -1) {
          newWorkouts[0].days[dayIndex] = workoutPlan.days[0];
          
          const influencersInPlan = [...new Set(newWorkouts[0].days
            .filter(day => day.workouts && day.workouts.length > 0)
            .map(day => day.workouts[0]?.description?.match(/From (.*?)'s/)?.[1])
            .filter(Boolean))];
          
          if (influencersInPlan.length > 0) {
            newWorkouts[0].name = `Custom Workout Plan (${influencersInPlan.join(' + ')})`;
            newWorkouts[0].description = `Custom plan combining workouts from ${influencersInPlan.join(' and ')}`;
          }
        } else {
          newWorkouts[0].days.push(workoutPlan.days[0]);
        }
      } else {
        const newWorkoutPlan = {
          id: Date.now(),
          name: `${influencerName} - ${split.name}`,
          influencer: influencerName,
          splitName: split.name,
          days: userWorkoutDays.map(day => {
            if (day === selectedDay) {
              return workoutPlan.days[0];
            }
            return {
              day: day,
              workouts: []
            };
          }),
          appliedDate: new Date().toLocaleDateString(),
          description: `Workout program by ${influencerName} - Adjusted for ${userProfile.fitnessLevel || 'your'} level`
        };
        newWorkouts = [newWorkoutPlan];
      }
      
      // Update Firestore
      await updateDoc(userDocRef, {
        appliedWorkouts: newWorkouts
      });
      
      setAppliedWorkouts(newWorkouts);
      setRecentlyAppliedWorkout(workoutPlan);
      setShowAppliedWorkoutPopup(true);
      
      closeDaySelectionModal();
      closeWorkoutModal();
      
      setTimeout(() => {
        setShowAppliedWorkoutPopup(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error applying workout:', error);
    }
  };

  const convertSplitToWorkoutPlanForDay = (influencerName, split, selectedDay) => {
    const workoutDays = [];
    
    workoutDays.push({
      day: selectedDay,
      workouts: split.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest,
        type: 'Strength',
        description: `From ${influencerName}'s ${split.name} program - Adjusted for ${userProfile.fitnessLevel || 'your'} level`,
        influencer: influencerName,
        splitName: split.name
      }))
    });
    
    return {
      id: Date.now(),
      name: `${influencerName} - ${split.name} on ${selectedDay}`,
      influencer: influencerName,
      splitName: split.name,
      days: workoutDays,
      appliedDate: new Date().toLocaleDateString(),
      description: `Professional workout program by ${influencerName} applied to ${selectedDay} - Adjusted for ${userProfile.fitnessLevel || 'your'} level`
    };
  };

  const handleApplyWorkout = (influencerName, split) => {
    openDaySelectionModal(influencerName, split);
  };

  const AppliedWorkoutPopup = () => {
    if (!showAppliedWorkoutPopup || !recentlyAppliedWorkout) return null;

    return (
      <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-2xl shadow-2xl border-2 border-green-400 z-50 max-w-sm animate-fadeIn sm:max-w-xs">
        <div className="flex items-center">
          <div className="bg-black bg-opacity-40 p-2 rounded-full mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-lg sm:text-base">WORKOUT APPLIED!</h3>
            <p className="text-green-100 text-sm sm:text-xs">
              {recentlyAppliedWorkout.name} has been added to your workout plan.
              {userProfile.fitnessLevel && ` Adjusted for ${userProfile.fitnessLevel} level.`}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAppliedWorkoutPopup(false)}
          className="absolute top-2 right-2 text-white hover:text-green-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  const DaySelectionModal = () => {
    if (!showDaySelectionModal || !selectedWorkoutData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-2xl border-2 border-green-500 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-green-700 border-b-2 border-green-500 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-green-400 drop-shadow-lg sm:text-xl">SELECT DAY</h3>
                <p className="text-gray-300 mt-1 text-sm sm:text-xs">
                  Apply {selectedWorkoutData.split.name} by {selectedWorkoutData.influencerName}
                  {userProfile.fitnessLevel && ` (Adjusted for ${userProfile.fitnessLevel} level)`}
                </p>
              </div>
              <button 
                onClick={closeDaySelectionModal}
                className="text-gray-400 hover:text-green-400 text-3xl font-bold transition-all duration-300 hover:scale-110 sm:text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-4 text-center sm:text-base">
                Choose which day to apply this workout:
              </h4>
              
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                {userWorkoutDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyWorkoutToDay(day)}
                    className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border-2 border-green-500 sm:p-3 sm:text-sm"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-green-800 border-l-4 border-green-500 rounded-xl p-4">
              <p className="text-gray-300 text-sm sm:text-xs">
                <strong>Note:</strong> This will replace any existing workout on the selected day with this new routine.
                {userProfile.fitnessLevel && ` The workout has been adjusted for your ${userProfile.fitnessLevel} fitness level.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WorkoutModal = ({ split, influencer, onClose }) => {
    if (!split) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-2xl border-2 border-green-500 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl sm:max-w-full sm:mx-2">
          <div className="sticky top-0 bg-green-700 border-b-2 border-green-500 p-6 rounded-t-2xl sm:p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-green-400 drop-shadow-lg sm:text-xl">{split.name}</h3>
                <p className="text-gray-300 mt-1 text-sm sm:text-xs">By {influencer.name}</p>
                {userProfile.fitnessLevel && (
                  <p className="text-green-300 mt-1 text-sm font-medium sm:text-xs">
                    ✓ Adjusted for {userProfile.fitnessLevel} level
                  </p>
                )}
                {split.description && (
                  <p className="text-gray-300 mt-2 italic text-sm sm:text-xs">{split.description}</p>
                )}
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-green-400 text-3xl font-bold transition-all duration-300 hover:scale-110 sm:text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-4">
            <div className="bg-black rounded-xl overflow-hidden border-2 border-green-600 shadow-2xl">
              {/* Mobile-optimized table header */}
              <div className="grid grid-cols-1 bg-green-600 text-white font-black text-sm uppercase tracking-wider sm:hidden">
                <div className="p-4 text-center">Exercise Details</div>
              </div>
              <div className="hidden sm:grid grid-cols-5 bg-green-600 text-white font-black text-sm uppercase tracking-wider">
                <div className="p-4 text-center border-r border-green-500">Exercise</div>
                <div className="p-4 text-center border-r border-green-500">Sets</div>
                <div className="p-4 text-center border-r border-green-500">Reps</div>
                <div className="p-4 text-center border-r border-green-500">Rest</div>
                <div className="p-4 text-center">Notes</div>
              </div>
              
              {split.exercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-1 sm:grid-cols-5 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-green-900 bg-opacity-20' : 'bg-black'
                  } hover:bg-green-800 hover:bg-opacity-30 border-t border-green-800 group`}
                >
                  {/* Mobile View */}
                  <div className="sm:hidden p-4 border-b border-green-800">
                    <div className="font-bold text-white text-lg mb-2 text-center group-hover:text-green-300 transition-colors">
                      {exercise.name}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-800 bg-opacity-50 p-2 rounded-lg">
                        <div className="text-green-400 font-black text-sm">Sets</div>
                        <div className="text-white font-bold">{exercise.sets}</div>
                      </div>
                      <div className="bg-green-800 bg-opacity-50 p-2 rounded-lg">
                        <div className="text-green-400 font-black text-sm">Reps</div>
                        <div className="text-white font-bold">{exercise.reps}</div>
                      </div>
                      <div className="bg-green-800 bg-opacity-50 p-2 rounded-lg">
                        <div className="text-green-400 font-black text-sm">Rest</div>
                        <div className="text-white font-bold">{exercise.rest}</div>
                      </div>
                    </div>
                    {exercise.notes && (
                      <div className="mt-3 text-gray-300 text-sm text-center bg-green-900 bg-opacity-30 p-2 rounded-lg">
                        {exercise.notes}
                      </div>
                    )}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:flex p-4 border-r border-green-800 items-center justify-center font-bold text-white text-sm group-hover:text-green-300 transition-colors">
                    {exercise.name}
                  </div>
                  <div className="hidden sm:flex p-4 border-r border-green-800 items-center justify-center text-green-400 font-black text-lg">
                    {exercise.sets}
                  </div>
                  <div className="hidden sm:flex p-4 border-r border-green-800 items-center justify-center text-green-400 font-black text-lg">
                    {exercise.reps}
                  </div>
                  <div className="hidden sm:flex p-4 border-r border-green-800 items-center justify-center text-white font-black text-lg">
                    {exercise.rest}
                  </div>
                  <div className="hidden sm:flex p-4 items-center justify-center text-gray-300 text-sm text-center group-hover:text-white transition-colors">
                    {exercise.notes || '-'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => handleApplyWorkout(influencer.name, split)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-green-400 sm:px-4 sm:py-3 sm:text-sm"
              >
                <svg className="w-5 h-5 inline-block mr-2 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                APPLY THIS WORKOUT TO MY PLAN
              </button>
              <p className="text-gray-400 text-sm mt-2 sm:text-xs">
                This will let you choose which day to add {influencer.name}'s program to
                {userProfile.fitnessLevel && ` (Adjusted for ${userProfile.fitnessLevel} level)`}
              </p>
            </div>

            <div className="mt-8 bg-green-800 border-l-4 border-green-500 rounded-xl p-6 shadow-lg sm:p-4">
              <h4 className="font-black text-green-400 text-xl mb-4 flex items-center sm:text-lg">
                <span className="mr-3 text-2xl sm:text-xl">💪</span> GYM PRO TIPS
              </h4>
              <ul className="text-gray-200 text-sm space-y-3 sm:text-xs">
                <li className="flex items-start bg-green-900 bg-opacity-30 p-3 rounded-lg">
                  <span className="text-green-400 mr-3 font-bold">▶</span>
                  <span>Always warm up with 5-10 minutes of light cardio and dynamic stretching</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-3 rounded-lg">
                  <span className="text-green-400 mr-3 font-bold">▶</span>
                  <span>Focus on progressive overload - increase weight or reps each week</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-3 rounded-lg">
                  <span className="text-green-400 mr-3 font-bold">▶</span>
                  <span>Maintain strict form to prevent injuries and maximize muscle activation</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-3 rounded-lg">
                  <span className="text-green-400 mr-3 font-bold">▶</span>
                  <span>Stay hydrated and fuel your body with proper nutrition</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-3 rounded-lg">
                  <span className="text-green-400 mr-3 font-bold">▶</span>
                  <span>Get 7-9 hours of sleep for optimal recovery and growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InfluencerCard = ({ influencer }) => {
    const adjustedSplits = influencer.splits.map(split => ({
      ...split,
      exercises: adjustWorkoutForUser(split.exercises, userProfile)
    }));

    return (
      <div className="bg-black border-4 border-green-500 rounded-3xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="relative bg-green-700 p-8 border-b-4 border-green-500 sm:p-6">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-black p-1 rounded-full">
                <img 
                  src={influencer.image} 
                  alt={influencer.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-green-500 shadow-2xl sm:w-24 sm:h-24"
                />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg sm:text-3xl">
                {influencer.name}
              </h2>
              <div className="inline-block bg-green-600 px-6 py-2 rounded-full shadow-lg sm:px-4 sm:py-1">
                <span className="font-black text-white text-sm uppercase tracking-widest sm:text-xs">
                  {influencer.style}
                </span>
              </div>
              {userProfile.fitnessLevel && (
                <div className="mt-2 inline-block bg-green-800 px-4 py-1 rounded-full">
                  <span className="text-green-200 text-xs font-medium sm:text-xs">
                    Workouts adjusted for {userProfile.fitnessLevel} level
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 bg-black sm:p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8 sm:grid-cols-1 sm:gap-4">
            <div className="bg-green-800 p-6 rounded-xl border-l-4 border-green-500 shadow-lg sm:p-4">
              <h3 className="text-xl font-black text-green-400 mb-4 flex items-center sm:text-lg">
                <span className="mr-3 text-2xl sm:text-xl">🏆</span>
                Career Highlights
              </h3>
              <p className="text-gray-200 leading-relaxed font-medium sm:text-sm">{influencer.career}</p>
            </div>
            <div className="bg-green-800 p-6 rounded-xl border-l-4 border-green-500 shadow-lg sm:p-4">
              <h3 className="text-xl font-black text-green-400 mb-4 flex items-center sm:text-lg">
                <span className="mr-3 text-2xl sm:text-xl">⭐</span>
                Major Achievements
              </h3>
              <p className="text-gray-200 leading-relaxed font-medium sm:text-sm">{influencer.achievements}</p>
            </div>
          </div>

          <div className="bg-green-700 rounded-xl p-6 mb-8 border-l-4 border-green-500 shadow-lg sm:p-4">
            <p className="text-gray-200 italic text-xl text-center leading-relaxed font-medium sm:text-base">
              "{influencer.description}"
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-3xl font-black text-white mb-8 text-center flex items-center justify-center sm:text-2xl">
              <span className="mr-3 text-4xl sm:text-2xl">🔥</span>
              TRAINING PROGRAMS
              <span className="ml-3 text-4xl sm:text-2xl">💪</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:grid-cols-1 sm:gap-4">
              {adjustedSplits.map((split, splitIndex) => (
                <div key={splitIndex} className="bg-green-800 border-2 border-green-600 rounded-xl p-6 group hover:shadow-2xl transition-all duration-300 sm:p-4">
                  <h4 className="font-black text-white mb-3 group-hover:text-green-300 text-lg sm:text-base">
                    {split.name}
                  </h4>
                  {split.description && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:text-gray-200 sm:text-xs">{split.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-xs">{split.exercises.length} exercises</span>
                    <span className="bg-green-900 bg-opacity-50 text-gray-300 text-xs px-2 py-1 rounded-full">
                      {split.exercises.reduce((total, ex) => total + parseInt(ex.sets), 0)} sets total
                    </span>
                  </div>
                  {userProfile.fitnessLevel && (
                    <div className="mb-3 bg-green-900 bg-opacity-30 rounded-lg p-2">
                      <span className="text-green-300 text-xs font-medium">
                        ✓ Adjusted for {userProfile.fitnessLevel}
                      </span>
                    </div>
                  )}
                  <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
                    <button
                      onClick={() => openWorkoutModal(split)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center sm:py-3"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApplyWorkout(influencer.name, split)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-center sm:py-3"
                    >
                      Apply Workout
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PictureGrid = ({ influencers }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-3">
      {influencers.map((influencer, index) => (
        <button
          key={index}
          onClick={() => handleInfluencerClick(influencer)}
          className="group relative bg-black border-2 border-green-600 rounded-2xl p-3 transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-2xl sm:p-2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-black p-1 rounded-full">
              <img 
                src={influencer.image} 
                alt={influencer.name}
                className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-green-600 group-hover:border-green-400 transition-all duration-300 shadow-lg sm:w-14 sm:h-14"
              />
            </div>
          </div>
          <div className="mt-2 text-center">
            <h3 className="font-black text-white text-xs group-hover:text-green-300 transition-colors sm:text-xs truncate">
              {influencer.name}
            </h3>
            <p className="text-gray-400 text-xs mt-1 font-medium sm:text-xs truncate">{influencer.style}</p>
            {userProfile.fitnessLevel && (
              <div className="mt-1 bg-green-800 bg-opacity-50 rounded-full px-1 py-0.5">
                <span className="text-green-200 text-xs sm:text-xs">Adjusted</span>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );

  const CategoryDropdown = () => (
    <div className="relative w-full max-w-xs mx-auto">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-black bg-opacity-50 border-2 border-green-600 text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-green-400 transition-all duration-300 shadow-lg font-medium flex justify-between items-center"
      >
        <span>
          {selectedCategory === 'all' ? 'All Categories' :
           selectedCategory === 'bodybuilders' ? 'Bodybuilders' :
           selectedCategory === 'modern' ? 'Modern Influencers' :
           selectedCategory === 'science' ? 'Science-Based' : 'Coaches'}
        </span>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-95 border-2 border-green-600 rounded-2xl shadow-2xl z-10 backdrop-blur-lg">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'bodybuilders', label: 'Bodybuilders' },
            { value: 'modern', label: 'Modern Influencers' },
            { value: 'science', label: 'Science-Based' },
            { value: 'coaches', label: 'Coaches' }
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setSelectedCategory(category.value);
                setIsDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-all duration-200 font-medium ${
                selectedCategory === category.value 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:bg-green-800 hover:text-white'
              } ${category.value === 'all' ? 'rounded-t-2xl' : ''} ${
                category.value === 'coaches' ? 'rounded-b-2xl' : ''
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-lg sm:text-4xl">
            FITNESS INFLUENCERS
          </h1>
          <p className="text-gray-400 text-xl mb-8 font-medium max-w-3xl mx-auto sm:text-base">
            Discover training programs from the world's top bodybuilders, athletes, and fitness experts. 
            All workouts are automatically adjusted for your fitness level.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="w-full md:w-64">
              <CategoryDropdown />
            </div>
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search influencers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black bg-opacity-50 border-2 border-green-600 text-white px-4 py-3 rounded-2xl focus:outline-none focus:border-green-400 transition-all duration-300 shadow-lg placeholder-gray-400 font-medium"
              />
            </div>
          </div>
        </div>

        {selectedInfluencer ? (
          <div>
            <button
              onClick={handleBackToGrid}
              className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-green-500 flex items-center sm:px-4 sm:py-2 sm:text-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK TO ALL INFLUENCERS
            </button>
            <InfluencerCard influencer={selectedInfluencer} />
          </div>
        ) : (
          <PictureGrid influencers={filteredInfluencers} />
        )}

        {isModalOpen && selectedSplit && selectedInfluencer && (
          <WorkoutModal 
            split={selectedSplit} 
            influencer={selectedInfluencer} 
            onClose={closeWorkoutModal} 
          />
        )}

        <DaySelectionModal />
        <AppliedWorkoutPopup />
      </div>
    </div>
  );
};

export default Influencers;