// // firebase/workoutService.js
// import { 
//   collection, 
//   doc, 
//   getDocs, 
//   getDoc, 
//   setDoc, 
//   updateDoc, 
//   deleteDoc, 
//   query, 
//   where,
//   orderBy,
//   addDoc,
//   serverTimestamp 
// } from 'firebase/firestore';
// import { db } from './config';

// // User workout data collection
// const getUserWorkoutCollection = (userId) => {
//   return collection(db, 'users', userId, 'workoutData');
// };

// // Workout Plans collection
// const workoutPlansCollection = collection(db, 'workoutPlans');

// // Save applied workouts to Firebase
// export const saveAppliedWorkouts = async (userId, workouts) => {
//   try {
//     const userWorkoutRef = doc(getUserWorkoutCollection(userId), 'appliedWorkouts');
//     await setDoc(userWorkoutRef, {
//       workouts: workouts,
//       updatedAt: serverTimestamp()
//     });
//     return true;
//   } catch (error) {
//     console.error('Error saving applied workouts:', error);
//     throw error;
//   }
// };

// // Load applied workouts from Firebase
// export const loadAppliedWorkouts = async (userId) => {
//   try {
//     const userWorkoutRef = doc(getUserWorkoutCollection(userId), 'appliedWorkouts');
//     const docSnap = await getDoc(userWorkoutRef);
    
//     if (docSnap.exists()) {
//       return docSnap.data().workouts || [];
//     }
//     return [];
//   } catch (error) {
//     console.error('Error loading applied workouts:', error);
//     return [];
//   }
// };

// // Save completed workouts to Firebase
// export const saveCompletedWorkouts = async (userId, workouts) => {
//   try {
//     const userWorkoutRef = doc(getUserWorkoutCollection(userId), 'completedWorkouts');
//     await setDoc(userWorkoutRef, {
//       workouts: workouts,
//       updatedAt: serverTimestamp()
//     });
//     return true;
//   } catch (error) {
//     console.error('Error saving completed workouts:', error);
//     throw error;
//   }
// };

// // Load completed workouts from Firebase
// export const loadCompletedWorkouts = async (userId) => {
//   try {
//     const userWorkoutRef = doc(getUserWorkoutCollection(userId), 'completedWorkouts');
//     const docSnap = await getDoc(userWorkoutRef);
    
//     if (docSnap.exists()) {
//       return docSnap.data().workouts || [];
//     }
//     return [];
//   } catch (error) {
//     console.error('Error loading completed workouts:', error);
//     return [];
//   }
// };

// // Save user data to Firebase
// export const saveUserData = async (userId, userData) => {
//   try {
//     const userDataRef = doc(getUserWorkoutCollection(userId), 'userProfile');
//     await setDoc(userDataRef, {
//       ...userData,
//       updatedAt: serverTimestamp()
//     });
//     return true;
//   } catch (error) {
//     console.error('Error saving user data:', error);
//     throw error;
//   }
// };

// // Load user data from Firebase
// export const loadUserData = async (userId) => {
//   try {
//     const userDataRef = doc(getUserWorkoutCollection(userId), 'userProfile');
//     const docSnap = await getDoc(userDataRef);
    
//     if (docSnap.exists()) {
//       return docSnap.data();
//     }
//     return null;
//   } catch (error) {
//     console.error('Error loading user data:', error);
//     return null;
//   }
// };

// // Save workout progress
// export const saveWorkoutProgress = async (userId, progressData) => {
//   try {
//     const progressRef = doc(collection(getUserWorkoutCollection(userId), 'workoutProgress'));
//     await setDoc(progressRef, {
//       ...progressData,
//       createdAt: serverTimestamp()
//     });
//     return true;
//   } catch (error) {
//     console.error('Error saving workout progress:', error);
//     throw error;
//   }
// };

// // Load workout progress history
// export const loadWorkoutProgress = async (userId) => {
//   try {
//     const progressQuery = query(
//       collection(getUserWorkoutCollection(userId), 'workoutProgress'),
//       orderBy('createdAt', 'desc')
//     );
//     const querySnapshot = await getDocs(progressQuery);
    
//     return querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   } catch (error) {
//     console.error('Error loading workout progress:', error);
//     return [];
//   }
// };

// // Get all workout plans (for influencers section)
// export const getAllWorkoutPlans = async () => {
//   try {
//     const querySnapshot = await getDocs(workoutPlansCollection);
//     return querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   } catch (error) {
//     console.error('Error loading workout plans:', error);
//     return [];
//   }
// };

// // Get specific workout plan by ID
// export const getWorkoutPlanById = async (planId) => {
//   try {
//     const planRef = doc(workoutPlansCollection, planId);
//     const planSnap = await getDoc(planRef);
    
//     if (planSnap.exists()) {
//       return {
//         id: planSnap.id,
//         ...planSnap.data()
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error('Error loading workout plan:', error);
//     return null;
//   }
// };