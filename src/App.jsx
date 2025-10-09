import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './Config/firebaseconfig';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import UserForm from './Components/UserForm';
import Dashboard from './Components/Dashboard';
import { generateInitialWorkoutPlan, generateInitialNutritionPlan } from './Algorithms/rulebasedAlgorithms';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [authMode, setAuthMode] = useState('login');
  const [showUserForm, setShowUserForm] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appStatus, setAppStatus] = useState('loading'); // 'loading', 'auth', 'form', 'dashboard'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            if (userData.fitnessData) {
              // User has existing fitness data - go directly to dashboard
              setUserData(userData.fitnessData);
              setWorkoutPlan(userData.workoutPlan || generateInitialWorkoutPlan(userData.fitnessData));
              setNutritionPlan(userData.nutritionPlan || generateInitialNutritionPlan(userData.fitnessData));
              setProgressHistory(userData.progressHistory || []);
              setAppStatus('dashboard');
            } else {
              // User exists but no fitness data - show form
              setAppStatus('form');
              setShowUserForm(true);
            }
          } else {
            // New user - show form
            setAppStatus('form');
            setShowUserForm(true);
            setIsNewUser(true);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setAppStatus('form');
          setShowUserForm(true);
        }
      } else {
        // No user - show auth
        setAppStatus('auth');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (user) => {
    setUser(user);
    setIsNewUser(false);
  };

  const handleRegisterSuccess = (user) => {
    setUser(user);
    setAppStatus('form');
    setShowUserForm(true);
    setIsNewUser(true);
  };

  const handleUserDataSubmit = async (data) => {
    try {
      // Convert string values to numbers
      const processedData = {
        ...data,
        age: parseInt(data.age),
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
        name: data.name || 'Fitness Enthusiast'
      };
      
      setUserData(processedData);
      setShowUserForm(false);
      
      // Generate initial plans
      const initialWorkoutPlan = generateInitialWorkoutPlan(processedData);
      const initialNutritionPlan = generateInitialNutritionPlan(processedData);
      
      setWorkoutPlan(initialWorkoutPlan);
      setNutritionPlan(initialNutritionPlan);
      
      // Save user data to Firestore
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          fitnessData: processedData,
          workoutPlan: initialWorkoutPlan,
          nutritionPlan: initialNutritionPlan,
          progressHistory: [],
          createdAt: new Date()
        }, { merge: true });
      }
      
      // Transition to dashboard
      setAppStatus('dashboard');
      
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleProgressUpdate = async (progressData) => {
    const newProgressHistory = [...progressHistory, progressData];
    setProgressHistory(newProgressHistory);
    
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          progressHistory: newProgressHistory
        }, { merge: true });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const handleGenerateNewPlan = () => {
    setAppStatus('form');
    setShowUserForm(true);
  };

  const handleWorkoutPlanUpdate = (newWorkoutPlan) => {
    setWorkoutPlan(newWorkoutPlan);
    
    if (user) {
      try {
        setDoc(doc(db, 'users', user.uid), {
          workoutPlan: newWorkoutPlan
        }, { merge: true });
      } catch (error) {
        console.error('Error saving workout plan:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setWorkoutPlan(null);
      setNutritionPlan(null);
      setProgressHistory([]);
      setShowUserForm(false);
      setIsNewUser(false);
      setAppStatus('auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleToggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleCancelForm = () => {
    if (isNewUser) {
      handleLogout();
    } else {
      setAppStatus('dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-xl">Loading your fitness journey...</p>
      </div>
    );
  }

  // Auth Screen
  if (appStatus === 'auth') {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        {authMode === 'login' ? (
          <Login 
            onToggleAuthMode={handleToggleAuthMode} 
            onLoginSuccess={handleLoginSuccess} 
          />
        ) : (
          <Register 
            onToggleAuthMode={handleToggleAuthMode} 
            onRegisterSuccess={handleRegisterSuccess} 
          />
        )}
      </div>
    );
  }

  // User Form Screen
  if (appStatus === 'form') {
    return (
      <div className="min-h-screen bg-gray-900">
        <UserForm onSubmit={handleUserDataSubmit} />
        {isNewUser && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleCancelForm}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Cancel and Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  // Dashboard Screen
  if (appStatus === 'dashboard' && userData) {
    return (
      <Dashboard 
        userData={userData}
        workoutPlan={workoutPlan}
        nutritionPlan={nutritionPlan}
        progressHistory={progressHistory}
        onProgressUpdate={handleProgressUpdate}
        onLogout={handleLogout}
        onGenerateNewPlan={handleGenerateNewPlan}
        onWorkoutPlanUpdate={handleWorkoutPlanUpdate}
      />
    );
  }

  // Fallback loading
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p>Preparing your experience...</p>
      </div>
    </div>
  );
}

export default App;