// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import WorkoutPlan from './WorkoutPlan';
import NutritionPlan from './NutritionPlan';
import ProgressTracker from './ProgressTracker';
import Influencers from './Influencers'; 
import { signOut } from 'firebase/auth';
import { auth } from '../Config/firebaseconfig';

const Dashboard = ({ 
  userData, 
  workoutPlan, 
  nutritionPlan, 
  onProgressUpdate, 
  onLogout,
  onGenerateNewPlan,
  onWorkoutPlanUpdate 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    setContentVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setContentVisible(true);
    }, 300);
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="relative">
            {/* Pulsing Logo */}
            <div className="animate-pulse flex flex-col items-center">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-3 sm:p-4 rounded-full mb-3 sm:mb-4 animate-bounce">
                <img 
                  src="public/Kyrie-fitness gym.jpg" 
                  alt="ASH-FIT Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white animate-pulse">
                ASH-<span className="text-emerald-400">FIT</span>
              </h1>
              <div className="mt-3 sm:mt-4 w-6 h-1 sm:w-8 sm:h-1 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      )}

      {/* Background Image Placeholder */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-1000"
        style={{ 
          backgroundImage: `url('src/assets/Kyrie-fitness gym.jpg(2).jpg')`
        }}
      ></div>
      
      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-700 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-emerald-800 via-black to-emerald-900 shadow-lg border-b border-emerald-600 transform transition-all duration-500 ease-out">
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-2 sm:space-x-3 animate-fade-in">
                  <div className="bg-black p-1 sm:p-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110">
                    <img 
                      src="public/Kyrie-fitness gym.jpg" 
                      alt="ASH-FIT Logo" 
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white transition-all duration-300 hover:text-emerald-300">
                    ASH-<span className="text-emerald-400">FIT</span>
                  </h1>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-1">
                <button
                  onClick={() => handleTabChange('dashboard')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'dashboard'
                      ? 'bg-white text-emerald-800 shadow-md border border-emerald-200 scale-105'
                      : 'text-white hover:bg-emerald-700/40 border border-emerald-600/30 hover:shadow-lg'
                  }`}
                >
                  <i className="fas fa-home mr-2"></i>Dashboard
                </button>
                <button
                  onClick={() => handleTabChange('workout')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'workout'
                      ? 'bg-white text-emerald-800 shadow-md border border-emerald-200 scale-105'
                      : 'text-white hover:bg-emerald-700/40 border border-emerald-600/30 hover:shadow-lg'
                  }`}
                >
                  <i className="fas fa-dumbbell mr-2"></i>Workouts
                </button>
                <button
                  onClick={() => handleTabChange('nutrition')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'nutrition'
                      ? 'bg-white text-emerald-800 shadow-md border border-emerald-200 scale-105'
                      : 'text-white hover:bg-emerald-700/40 border border-emerald-600/30 hover:shadow-lg'
                  }`}
                >
                  <i className="fas fa-utensils mr-2"></i>Nutrition
                </button>
                <button
                  onClick={() => handleTabChange('progress')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'progress'
                      ? 'bg-white text-emerald-800 shadow-md border border-emerald-200 scale-105'
                      : 'text-white hover:bg-emerald-700/40 border border-emerald-600/30 hover:shadow-lg'
                  }`}
                >
                  <i className="fas fa-chart-line mr-2"></i>Progress
                </button>
                <button
                  onClick={() => handleTabChange('influencers')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'influencers'
                      ? 'bg-white text-emerald-800 shadow-md border border-emerald-200 scale-105'
                      : 'text-white hover:bg-emerald-700/40 border border-emerald-600/30 hover:shadow-lg'
                  }`}
                >
                  <i className="fas fa-users mr-2"></i>Professionals
                </button>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden md:block animate-fade-in">
                  <span className="text-white text-sm sm:text-base font-medium transition-all duration-300 hover:text-emerald-300">
                    Welcome, {userData?.name || 'Fitness Enthusiast'}!
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 text-white px-3 sm:px-4 py-2 rounded-lg border border-white/30 hover:bg-emerald-700/40 transition-all duration-300 shadow-md hover:shadow-emerald-500/20 transform hover:scale-105 text-sm sm:text-base"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white/10 backdrop-blur-sm border-b border-emerald-600/30 shadow-md transform transition-all duration-500">
          <div className="container mx-auto px-2 sm:px-4 py-2">
            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-700/80 text-white shadow-inner scale-105'
                    : 'text-white bg-white/10 hover:bg-emerald-700/40'
                }`}
              >
                <i className="fas fa-home text-xs sm:text-sm mb-1"></i>
                <span className="text-xs">Home</span>
              </button>
              <button
                onClick={() => handleTabChange('workout')}
                className={`flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'workout'
                    ? 'bg-emerald-700/80 text-white shadow-inner scale-105'
                    : 'text-white bg-white/10 hover:bg-emerald-700/40'
                }`}
              >
                <i className="fas fa-dumbbell text-xs sm:text-sm mb-1"></i>
                <span className="text-xs">Workout</span>
              </button>
              <button
                onClick={() => handleTabChange('nutrition')}
                className={`flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'nutrition'
                    ? 'bg-emerald-700/80 text-white shadow-inner scale-105'
                    : 'text-white bg-white/10 hover:bg-emerald-700/40'
                }`}
              >
                <i className="fas fa-utensils text-xs sm:text-sm mb-1"></i>
                <span className="text-xs">Food</span>
              </button>
              <button
                onClick={() => handleTabChange('progress')}
                className={`flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'progress'
                    ? 'bg-emerald-700/80 text-white shadow-inner scale-105'
                    : 'text-white bg-white/10 hover:bg-emerald-700/40'
                }`}
              >
                <i className="fas fa-chart-line text-xs sm:text-sm mb-1"></i>
                <span className="text-xs">Progress</span>
              </button>
              <button
                onClick={() => handleTabChange('influencers')}
                className={`flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'influencers'
                    ? 'bg-emerald-700/80 text-white shadow-inner scale-105'
                    : 'text-white bg-white/10 hover:bg-emerald-700/40'
                }`}
              >
                <i className="fas fa-users text-xs sm:text-sm mb-1"></i>
                <span className="text-xs">Pros</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-3 sm:p-4 md:p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className={`transition-all duration-500 ease-in-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {/* Welcome Header */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="animate-slide-in-left">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white transition-all duration-300 hover:text-emerald-300">
                      Welcome back, {userData?.name || 'Fitness Champion'}!
                    </h1>
                    <p className="text-emerald-100 mt-1 sm:mt-2 text-sm sm:text-base transition-all duration-300 hover:text-white">
                      Ready to crush your {userData?.fitnessGoal?.replace(/([A-Z])/g, ' $1') || 'fitness'} goals today?
                    </p>
                  </div>
                  <div className="animate-slide-in-right">
                    <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-3 sm:p-4 rounded-xl text-white text-center border border-emerald-500 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <div className="text-xl sm:text-2xl font-bold animate-pulse">{userData?.selectedDays?.length || 0}</div>
                      <div className="text-xs sm:text-sm">Workout Days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Content - Improved Mobile Layout */}
              <div className="space-y-4 sm:space-y-6">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                    <WorkoutPlan plan={workoutPlan} isMobile={isMobile} />
                  </div>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                    <NutritionPlan plan={nutritionPlan} isMobile={isMobile} />
                  </div>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                    <ProgressTracker 
                      userData={userData} 
                      onProgressUpdate={onProgressUpdate}
                      workoutPlan={workoutPlan}
                      onWorkoutPlanUpdate={onWorkoutPlanUpdate}
                      onGenerateNewPlan={onGenerateNewPlan}
                      isMobile={isMobile}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workout Tab */}
          {activeTab === 'workout' && (
            <div className={`transition-all duration-500 ease-in-out ${
              contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                <WorkoutPlan plan={workoutPlan} isMobile={isMobile} />
              </div>
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <div className={`transition-all duration-500 ease-in-out ${
              contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                <NutritionPlan plan={nutritionPlan} isMobile={isMobile} />
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className={`transition-all duration-500 ease-in-out ${
              contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                <ProgressTracker 
                  userData={userData} 
                  onProgressUpdate={onProgressUpdate}
                  workoutPlan={workoutPlan}
                  onWorkoutPlanUpdate={onWorkoutPlanUpdate}
                  onGenerateNewPlan={onGenerateNewPlan}
                  isMobile={isMobile}
                />
              </div>
            </div>
          )}
           
          {/* Influencers Tab */}
          {activeTab === 'influencers' && (
            <div className={`transition-all duration-500 ease-in-out ${
              contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-emerald-600/30 transform transition-all duration-500 hover:shadow-xl overflow-x-auto">
                <Influencers isMobile={isMobile} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-black/80 backdrop-blur-md text-white mt-8 sm:mt-12 py-6 sm:py-8 border-t border-emerald-700/30 transform transition-all duration-500">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 md:mb-0 animate-fade-in">
                <div className="bg-black-700 p-1 sm:p-2 rounded-full transition-transform duration-300 hover:scale-110">
                  <img 
                    src="public/Kyrie-fitness gym.jpg" 
                    alt="ASH-FIT Logo" 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold transition-all duration-300 hover:text-emerald-300">
                  ASH-<span className="text-emerald-400">FIT</span>
                </h2>
              </div>
              <div className="text-center md:text-right animate-fade-in">
                <p className="text-emerald-200 text-sm sm:text-base transition-all duration-300 hover:text-white">
                  &copy; 2025 ASH-FIT. Your personalized fitness companion.
                </p>
                <p className="text-emerald-200 text-xs sm:text-sm mt-1 transition-all duration-300 hover:text-white">
                  <i className="fas fa-heart text-red-400 mr-1 animate-pulse"></i>
                  Built with passion for fitness enthusiasts
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Add custom CSS for animations and responsive design */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          /* Improved mobile scrolling */
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .grid-cols-1 {
            grid-template-columns: 1fr;
          }
          
          /* Better spacing on mobile */
          .space-y-4 > * + * {
            margin-top: 1rem;
          }
        }

        /* Ensure touch-friendly buttons on mobile */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improved text readability on mobile */
          .text-sm-mobile {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          
          /* Better padding for mobile cards */
          .mobile-card-padding {
            padding: 1rem;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          /* Even more compact for very small screens */
          .text-xs-mobile {
            font-size: 0.75rem;
            line-height: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;