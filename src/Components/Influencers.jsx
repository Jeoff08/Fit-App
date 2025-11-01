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

  // Enhanced heuristic algorithm to adjust workout based on user data
  const adjustWorkoutForUser = (exercises, userData) => {
    if (!userData || !userData.fitnessLevel) return exercises;

    const adjustedExercises = exercises.map(exercise => {
      let adjustedExercise = { ...exercise };
      
      // Adjust based on fitness level
      switch (userData.fitnessLevel.toLowerCase()) {
        case 'beginner':
          // Reduce sets for beginners
          if (adjustedExercise.sets > 3) {
            adjustedExercise.sets = 3;
          } else if (adjustedExercise.sets < 2) {
            adjustedExercise.sets = 2;
          }
          
          // Increase reps for beginners (higher reps for form practice)
          if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
            const [min, max] = adjustedExercise.reps.split('-').map(Number);
            adjustedExercise.reps = `${Math.max(10, min + 2)}-${Math.max(15, max + 3)}`;
          } else if (typeof adjustedExercise.reps === 'number') {
            adjustedExercise.reps = Math.min(15, Math.max(10, adjustedExercise.reps + 3));
          } else {
            // Default for beginners if reps format is unknown
            adjustedExercise.reps = '10-15';
          }
          
          // Longer rest periods for beginners
          if (adjustedExercise.rest) {
            adjustedExercise.rest = `90-120s`;
          } else {
            adjustedExercise.rest = '90-120s';
          }
          break;
          
        case 'intermediate':
          // Moderate adjustments for intermediates
          if (adjustedExercise.sets > 4) {
            adjustedExercise.sets = 4;
          }
          
          if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
            const [min, max] = adjustedExercise.reps.split('-').map(Number);
            adjustedExercise.reps = `${Math.max(8, min)}-${Math.max(12, max)}`;
          } else if (typeof adjustedExercise.reps === 'number') {
            adjustedExercise.reps = Math.min(12, Math.max(8, adjustedExercise.reps));
          }
          
          if (adjustedExercise.rest) {
            adjustedExercise.rest = `60-90s`;
          }
          break;
          
        case 'advanced':
          // Keep or slightly increase intensity for advanced users
          if (adjustedExercise.sets < 4) {
            adjustedExercise.sets += 1;
          }
          
          if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
            const [min, max] = adjustedExercise.reps.split('-').map(Number);
            adjustedExercise.reps = `${Math.max(6, min - 1)}-${Math.max(10, max - 1)}`;
          } else if (typeof adjustedExercise.reps === 'number') {
            adjustedExercise.reps = Math.max(6, adjustedExercise.reps - 2);
          }
          
          if (adjustedExercise.rest) {
            adjustedExercise.rest = `45-60s`;
          }
          break;
          
        default:
          break;
      }
      
      // Additional adjustments for age if available
      if (userData.age && userData.age > 40) {
        if (adjustedExercise.sets > 3) {
          adjustedExercise.sets = 3;
        }
        
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${Math.max(10, min)}-${Math.max(15, max)}`;
        }
        
        if (adjustedExercise.rest) {
          adjustedExercise.rest = `90-120s`;
        }
      }
      
      // Adjust for weight goals
      if (userData.fitnessGoal === 'weightLoss') {
        // Higher reps for endurance and calorie burn
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${min + 3}-${max + 5}`;
        } else if (typeof adjustedExercise.reps === 'number') {
          adjustedExercise.reps = adjustedExercise.reps + 5;
        }
        
        // Shorter rest for metabolic effect
        if (adjustedExercise.rest) {
          adjustedExercise.rest = `30-60s`;
        }
      } else if (userData.fitnessGoal === 'muscleGain') {
        // Moderate reps for hypertrophy
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${Math.max(8, min)}-${Math.max(12, max)}`;
        }
        
        // Adequate rest for recovery between sets
        if (adjustedExercise.rest) {
          adjustedExercise.rest = `60-90s`;
        }
      } else if (userData.fitnessGoal === 'strength') {
        // Lower reps for strength focus
        if (typeof adjustedExercise.reps === 'string' && adjustedExercise.reps.includes('-')) {
          const [min, max] = adjustedExercise.reps.split('-').map(Number);
          adjustedExercise.reps = `${Math.max(4, min - 2)}-${Math.max(8, max - 2)}`;
        } else if (typeof adjustedExercise.reps === 'number') {
          adjustedExercise.reps = Math.max(4, adjustedExercise.reps - 3);
        }
        
        // Longer rest for strength recovery
        if (adjustedExercise.rest) {
          adjustedExercise.rest = `120-180s`;
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
      
      let newWorkouts = [...existingWorkouts];
      
      if (newWorkouts.length > 0 && newWorkouts[0].days) {
        // Find the day index
        const dayIndex = newWorkouts[0].days.findIndex(day => day.day === selectedDay);
        
        if (dayIndex !== -1) {
          // Check if there are already workouts on this day
          const existingWorkoutsOnDay = newWorkouts[0].days[dayIndex].workouts || [];
          
          // Add the new workout to existing workouts (allowing multiple workouts per day)
          const updatedWorkoutsOnDay = [...existingWorkoutsOnDay, ...workoutPlan.days[0].workouts];
          
          // Update the day with combined workouts
          newWorkouts[0].days[dayIndex] = {
            ...newWorkouts[0].days[dayIndex],
            workouts: updatedWorkoutsOnDay
          };
          
          // Update plan name to reflect multiple influencers
          const influencersInPlan = [...new Set(newWorkouts[0].days
            .filter(day => day.workouts && day.workouts.length > 0)
            .flatMap(day => day.workouts.map(workout => workout.influencer))
            .filter(Boolean))];
          
          if (influencersInPlan.length > 0) {
            newWorkouts[0].name = `Custom Workout Plan (${influencersInPlan.join(' + ')})`;
            newWorkouts[0].description = `Custom plan combining workouts from ${influencersInPlan.join(' and ')}`;
          }
        } else {
          // Add new day if it doesn't exist
          newWorkouts[0].days.push(workoutPlan.days[0]);
        }
      } else {
        // Create new workout plan if none exists
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
        splitName: split.name,
        appliedTimestamp: new Date().toISOString()
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
      <div className="fixed top-2 left-2 right-2 bg-green-600 text-white p-3 rounded-xl shadow-2xl border-2 border-green-400 z-50 animate-fadeIn mx-2">
        <div className="flex items-center">
          <div className="bg-black bg-opacity-40 p-2 rounded-full mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-black text-base">WORKOUT APPLIED!</h3>
            <p className="text-green-100 text-xs">
              {recentlyAppliedWorkout.name} has been added to your workout plan.
              {userProfile.fitnessLevel && ` Adjusted for ${userProfile.fitnessLevel} level.`}
            </p>
            <p className="text-green-200 text-xs mt-1 font-medium">
              ✓ Multiple workouts can be added to the same day
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
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2">
        <div className="bg-black rounded-xl border-2 border-green-500 w-full max-w-sm max-h-[85vh] overflow-y-auto shadow-2xl mx-2">
          <div className="sticky top-0 bg-green-700 border-b-2 border-green-500 p-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-black text-green-400 drop-shadow-lg">SELECT DAY</h3>
                <p className="text-gray-300 mt-1 text-xs">
                  Apply {selectedWorkoutData.split.name} by {selectedWorkoutData.influencerName}
                  {userProfile.fitnessLevel && ` (Adjusted for ${userProfile.fitnessLevel} level)`}
                </p>
              </div>
              <button 
                onClick={closeDaySelectionModal}
                className="text-gray-400 hover:text-green-400 text-2xl font-bold transition-all duration-300 hover:scale-110 ml-2"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-base font-bold text-white mb-3 text-center">
                Choose which day to apply this workout:
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                {userWorkoutDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyWorkoutToDay(day)}
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border-2 border-green-500 text-sm"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-green-800 border-l-4 border-green-500 rounded-lg p-3 mb-2">
              <p className="text-gray-300 text-xs">
                <strong>Note:</strong> This workout will be added to the selected day alongside any existing workouts.
                You can apply multiple workouts to the same day to create combined routines.
              </p>
            </div>

            <div className="bg-blue-800 border-l-4 border-blue-500 rounded-lg p-3">
              <p className="text-gray-200 text-xs">
                <strong>💪 Pro Tip:</strong> Combine complementary workouts for a more comprehensive training session!
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
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2">
        <div className="bg-black rounded-xl border-2 border-green-500 w-full max-w-full max-h-[95vh] overflow-y-auto shadow-2xl mx-1">
          <div className="sticky top-0 bg-green-700 border-b-2 border-green-500 p-4 rounded-t-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-black text-green-400 drop-shadow-lg">{split.name}</h3>
                <p className="text-gray-300 mt-1 text-xs">By {influencer.name}</p>
                {userProfile.fitnessLevel && (
                  <p className="text-green-300 mt-1 text-xs font-medium">
                    ✓ Adjusted for {userProfile.fitnessLevel} level
                  </p>
                )}
                {split.description && (
                  <p className="text-gray-300 mt-2 italic text-xs">{split.description}</p>
                )}
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-green-400 text-2xl font-bold transition-all duration-300 hover:scale-110 ml-2"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-3">
            <div className="bg-black rounded-lg overflow-hidden border-2 border-green-600 shadow-2xl mb-4">
              <div className="bg-green-600 text-white font-black text-xs uppercase tracking-wider p-3 text-center">
                Exercise Details
              </div>
              
              {split.exercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className={`p-3 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-green-900 bg-opacity-20' : 'bg-black'
                  } hover:bg-green-800 hover:bg-opacity-30 border-t border-green-800`}
                >
                  <div className="font-bold text-white text-base mb-2 text-center">
                    {exercise.name}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-2">
                    <div className="bg-green-800 bg-opacity-50 p-2 rounded-lg">
                      <div className="text-green-400 font-black text-xs">Sets</div>
                      <div className="text-white font-bold text-sm">{exercise.sets}</div>
                    </div>
                    <div className="bg-green-800 bg-opacity-50 p-2 rounded-lg">
                      <div className="text-green-400 font-black text-xs">Reps</div>
                      <div className="text-white font-bold text-sm">{exercise.reps}</div>
                    </div>
                    <div className="bg-green-800 bg-opacity-50 p-2 rounded-lg">
                      <div className="text-green-400 font-black text-xs">Rest</div>
                      <div className="text-white font-bold text-sm">{exercise.rest}</div>
                    </div>
                  </div>
                  {exercise.notes && (
                    <div className="text-gray-300 text-xs text-center bg-green-900 bg-opacity-30 p-2 rounded-lg">
                      {exercise.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-4">
              <button
                onClick={() => handleApplyWorkout(influencer.name, split)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-green-400 text-sm w-full"
              >
                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                APPLY THIS WORKOUT
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Choose which day to add {influencer.name}'s program to
              </p>
            </div>

            <div className="bg-green-800 border-l-4 border-green-500 rounded-lg p-3">
              <h4 className="font-black text-green-400 text-base mb-3 flex items-center">
                <span className="mr-2">💪</span> GYM PRO TIPS
              </h4>
              <ul className="text-gray-200 text-xs space-y-2">
                <li className="flex items-start bg-green-900 bg-opacity-30 p-2 rounded-lg">
                  <span className="text-green-400 mr-2 font-bold">▶</span>
                  <span>Warm up with 5-10 minutes of light cardio</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-2 rounded-lg">
                  <span className="text-green-400 mr-2 font-bold">▶</span>
                  <span>Focus on progressive overload</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-2 rounded-lg">
                  <span className="text-green-400 mr-2 font-bold">▶</span>
                  <span>Maintain strict form to prevent injuries</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-2 rounded-lg">
                  <span className="text-green-400 mr-2 font-bold">▶</span>
                  <span>Stay hydrated and eat properly</span>
                </li>
                <li className="flex items-start bg-green-900 bg-opacity-30 p-2 rounded-lg">
                  <span className="text-green-400 mr-2 font-bold">▶</span>
                  <span>Get 7-9 hours of sleep for recovery</span>
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
      <div className="bg-black border-2 border-green-500 rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="relative bg-green-700 p-4 border-b-2 border-green-500">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-75 animate-pulse"></div>
              <div className="relative bg-black p-1 rounded-full">
                <img 
                  src={influencer.image} 
                  alt={influencer.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-500 shadow-lg"
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-black text-white mb-2 drop-shadow-lg">
                {influencer.name}
              </h2>
              <div className="inline-block bg-green-600 px-3 py-1 rounded-full shadow-lg mb-1">
                <span className="font-black text-white text-xs uppercase tracking-widest">
                  {influencer.style}
                </span>
              </div>
              {userProfile.fitnessLevel && (
                <div className="inline-block bg-green-800 px-2 py-1 rounded-full ml-1">
                  <span className="text-green-200 text-xs font-medium">
                    Adjusted for {userProfile.fitnessLevel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-black">
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="bg-green-800 p-3 rounded-lg border-l-4 border-green-500 shadow-lg">
              <h3 className="text-base font-black text-green-400 mb-2 flex items-center">
                <span className="mr-2">🏆</span>
                Career Highlights
              </h3>
              <p className="text-gray-200 leading-relaxed text-xs">{influencer.career}</p>
            </div>
            <div className="bg-green-800 p-3 rounded-lg border-l-4 border-green-500 shadow-lg">
              <h3 className="text-base font-black text-green-400 mb-2 flex items-center">
                <span className="mr-2">⭐</span>
                Major Achievements
              </h3>
              <p className="text-gray-200 leading-relaxed text-xs">{influencer.achievements}</p>
            </div>
          </div>

          <div className="bg-green-700 rounded-lg p-3 mb-4 border-l-4 border-green-500 shadow-lg">
            <p className="text-gray-200 italic text-sm text-center leading-relaxed font-medium">
              "{influencer.description}"
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-black text-white mb-4 text-center flex items-center justify-center">
              <span className="mr-2">🔥</span>
              TRAINING PROGRAMS
              <span className="ml-2">💪</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {adjustedSplits.map((split, splitIndex) => (
                <div key={splitIndex} className="bg-green-800 border border-green-600 rounded-lg p-3 group">
                  <h4 className="font-black text-white mb-2 group-hover:text-green-300 text-sm">
                    {split.name}
                  </h4>
                  {split.description && (
                    <p className="text-gray-300 text-xs mb-3 line-clamp-2 group-hover:text-gray-200">{split.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-xs">{split.exercises.length} exercises</span>
                    <span className="bg-green-900 bg-opacity-50 text-gray-300 text-xs px-2 py-1 rounded-full">
                      {split.exercises.reduce((total, ex) => total + parseInt(ex.sets), 0)} sets total
                    </span>
                  </div>
                  {userProfile.fitnessLevel && (
                    <div className="mb-2 bg-green-900 bg-opacity-30 rounded p-1">
                      <span className="text-green-300 text-xs font-medium">
                        ✓ Adjusted for {userProfile.fitnessLevel}
                      </span>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openWorkoutModal(split)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApplyWorkout(influencer.name, split)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg text-xs font-medium transition-all duration-300 text-center"
                    >
                      Apply Workout
                    </button>
                  </div>
                  <div className="mt-2 bg-blue-900 bg-opacity-30 rounded p-1">
                    <span className="text-blue-300 text-xs font-medium">
                      💪 Can be combined
                    </span>
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
    <div className="grid grid-cols-3 gap-2">
      {influencers.map((influencer, index) => (
        <button
          key={index}
          onClick={() => handleInfluencerClick(influencer)}
          className="group relative bg-black border border-green-600 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-lg"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-black p-0.5 rounded-full">
              <img 
                src={influencer.image} 
                alt={influencer.name}
                className="w-12 h-12 mx-auto rounded-full object-cover border border-green-600 group-hover:border-green-400 transition-all duration-300 shadow-md"
              />
            </div>
          </div>
          <div className="mt-1 text-center">
            <h3 className="font-black text-white text-xs group-hover:text-green-300 transition-colors truncate">
              {influencer.name}
            </h3>
            <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors truncate">
              {influencer.style}
            </p>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-black text-green-400 mb-2 drop-shadow-lg">
            FITNESS INFLUENCERS
          </h1>
          <p className="text-sm text-gray-300 mb-4">
            Discover training programs from world-class athletes and coaches
          </p>
        </div>

        <div className="mb-4">
          <div className="flex flex-col gap-2 mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search influencers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-green-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 shadow-lg text-sm"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-black border border-green-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-green-400 transition-all duration-300 shadow-lg text-sm flex justify-between items-center"
              >
                <span>
                  {selectedCategory === 'all' ? 'All Categories' : 
                   selectedCategory === 'bodybuilders' ? 'Classic Bodybuilders' :
                   selectedCategory === 'modern' ? 'Modern Influencers' :
                   selectedCategory === 'science' ? 'Science-Based' :
                   selectedCategory === 'coaches' ? 'Professional Coaches' : 'All Categories'}
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-green-600 rounded-lg shadow-xl z-10">
                  {[
                    { value: 'all', label: 'All Categories' },
                    { value: 'bodybuilders', label: 'Classic Bodybuilders' },
                    { value: 'modern', label: 'Modern Influencers' },
                    { value: 'science', label: 'Science-Based' },
                    { value: 'coaches', label: 'Professional Coaches' }
                  ].map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 ${
                        selectedCategory === category.value 
                          ? 'bg-green-600 text-white' 
                          : 'text-gray-300 hover:bg-green-800'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {!selectedInfluencer ? (
          <div>
            {filteredInfluencers.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-2">No influencers found</div>
                <p className="text-gray-500 text-sm">Try adjusting your search or category</p>
              </div>
            ) : (
              <PictureGrid influencers={filteredInfluencers} />
            )}
          </div>
        ) : (
          <div>
            <button
              onClick={handleBackToGrid}
              className="mb-4 flex items-center text-green-400 hover:text-green-300 transition-colors duration-300 font-medium text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Influencers
            </button>
            <InfluencerCard influencer={selectedInfluencer} />
          </div>
        )}

        {isModalOpen && selectedSplit && (
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