import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './Config/firebaseconfig';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import UserForm from './Components/UserForm';
import Dashboard from './Components/Dashboard';
import { generateInitialWorkoutPlan, generateInitialNutritionPlan } from './Algorithms/rulebasedAlgorithms';
import Chatbot from './Components/Chatbot';

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
  const [showChatbot, setShowChatbot] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
      setShowChatbot(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleToggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/Kyrie-fitness gym.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-orange-900 opacity-90"></div>
        
        {/* Gym Equipment Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-20 h-20 border-4 border-green-500 rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-16 h-32 border-4 border-orange-500"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 border-4 border-green-300 rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-4 border-orange-400 rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-orange-500 rounded-full animate-bounce"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent mb-2">
            ASH-FIT
          </h2>
          <p className="text-green-200">Preparing your fitness journey...</p>
        </div>
        
        {/* Animated loading bar */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-green-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-orange-500 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Auth Screen
  if (appStatus === 'auth') {
    return (
      <div 
        className="min-h-screen py-12 relative overflow-hidden"
        style={{
          backgroundImage: `url('/Kyrie-fitness gym.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-orange-900 opacity-90"></div>
        
        {/* Gym-themed background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl">🏋️</div>
          <div className="absolute top-20 right-20 text-4xl">💪</div>
          <div className="absolute bottom-40 left-20 text-5xl">🔥</div>
          <div className="absolute bottom-20 right-10 text-6xl">⛓️</div>
          <div className="absolute top-1/3 left-1/2 text-4xl">🏃‍♂️</div>
        </div>
        
        {/* Weight plates decoration */}
        <div className="absolute -left-8 top-1/4 w-32 h-32 border-8 border-green-500 rounded-full opacity-30"></div>
        <div className="absolute -right-12 bottom-1/4 w-40 h-40 border-8 border-orange-500 rounded-full opacity-30"></div>
        
        <div className="relative z-10">
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
      </div>
    );
  }

  // User Form Screen
  if (appStatus === 'form') {
    return (
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url('/Kyrie-fitness gym.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-orange-900 opacity-90"></div>
        
        {/* Gym equipment background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-32 left-16 w-24 h-24 border-4 border-green-500 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-20 h-40 border-4 border-orange-500"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border-4 border-green-300 rotate-45"></div>
          <div className="absolute bottom-1/4 left-1/2 w-12 h-12 border-4 border-orange-400 rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <UserForm onSubmit={handleUserDataSubmit} />
        </div>
      </div>
    );
  }

  // Dashboard Screen
  if (appStatus === 'dashboard' && userData) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('/Kyrie-fitness gym.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient overlay for dashboard */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-orange-900 opacity-95"></div>
        
        {/* V-Coach Button - Circular with Logo and Tooltip */}
        <div className="fixed bottom-6 right-6 z-40">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
              <div className="font-bold text-green-400">ASH Virtual Coach</div>
              <div className="text-xs text-gray-300">Click to chat with your AI fitness assistant</div>
              {/* Tooltip arrow */}
              <div className="absolute top-full right-4 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
          
          <button
            onClick={toggleChatbot}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-16 h-16 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center overflow-hidden border-2 border-white relative group"
          >
            {/* Logo Image Container */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              {/* Image Placeholder - You can replace this with your actual image */}
              <div className="w-full h-full bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[8px] leading-tight text-center">
                  ASH<br/>Coach
                </span>
                <span className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                  💬
                </span>
              </div>
              
              {/* Alternative: If you have an actual image, use this instead */}
              {/* <img 
                src="/v-coach-logo.png" 
                alt="ASH Virtual Coach" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.style.display = 'none';
                }}
              /> */}
            </div>
            
            {/* Pulse animation effect */}
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 animate-ping"></div>
          </button>
        </div>

        {/* Chatbot Modal */}
        {showChatbot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Chatbot Component with onClose prop */}
              <Chatbot onClose={toggleChatbot} />
            </div>
          </div>
        )}
        
        <div className="relative z-10">
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
        </div>
      </div>
    );
  }

  // Fallback loading
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('/Kyrie-fitness gym.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-orange-900 opacity-90"></div>
      
      {/* Gym background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-green-500 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-16 h-32 border-4 border-orange-500"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border-4 border-green-300 rotate-45"></div>
      </div>
      
      <div className="text-white text-center relative z-10">
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-orange-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 bg-black rounded-full"></div>
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
          ASH-FIT
        </h3>
        <p className="text-green-200 mt-2">Building your experience...</p>
      </div>
    </div>
  );
}

export default App;