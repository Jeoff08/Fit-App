// Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Config/firebaseconfig';

const Register = ({ onToggleAuthMode, onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: displayName
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email,
        createdAt: new Date(),
        fitnessData: null
      });

      // Call the success handler with user data
      onRegisterSuccess(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAuthMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onToggleAuthMode();
    }, 1500);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-black overflow-hidden relative font-sans text-white">
      {/* Dynamic Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="src/assets/Kyrie-fitness gym.jpg" 
          alt="Gym background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
      {/* Gym-Themed Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black">
          <div className="relative">
            {/* Running Treadmill Animation */}
            <div className="w-48 h-16 mb-8 mx-auto relative">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-500 rounded-full"></div>
              <div className="absolute bottom-1 left-0 w-full h-0.5 bg-green-400 rounded-full animate-treadmill-move"></div>
              <div className="absolute bottom-2 w-6 h-4 bg-green-500 rounded-sm animate-running-shoe left-1/4"></div>
              <div className="absolute bottom-2 w-6 h-4 bg-green-500 rounded-sm animate-running-shoe-delayed left-3/4"></div>
            </div>
            
            {/* Weight Plate Stack Animation */}
            <div className="flex justify-center space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map((weight) => (
                <div 
                  key={weight}
                  className="w-8 h-8 bg-green-500 rounded-full border-2 border-green-300 animate-weight-stack"
                  style={{ animationDelay: `${weight * 0.2}s` }}
                ></div>
              ))}
            </div>
            
            {/* Gym Text Animation */}
            <div className="text-center">
              <h3 className="text-green-400 text-xl font-bold tracking-widest animate-pulse">
                RETURNING TO SIGN IN
              </h3>
            </div>
            
            {/* Progress Bar with Gym Theme */}
            <div className="w-64 h-2 bg-gray-700 rounded-full mt-6 overflow-hidden mx-auto relative">
              <div className="h-full bg-green-400 rounded-full animate-gym-progress-reverse"></div>
              {/* Weight markers */}
              <div className="absolute top-0 left-0 w-1 h-3 bg-white -mt-0.5"></div>
              <div className="absolute top-0 left-1/4 w-1 h-3 bg-white -mt-0.5"></div>
              <div className="absolute top-0 left-1/2 w-1 h-3 bg-white -mt-0.5"></div>
              <div className="absolute top-0 left-3/4 w-1 h-3 bg-white -mt-0.5"></div>
              <div className="absolute top-0 right-0 w-1 h-3 bg-white -mt-0.5"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Container with Glassmorphism Effect */}
      <div className={`max-w-md w-full rounded-2xl p-8 shadow-2xl border border-gray-700/50 backdrop-filter backdrop-blur-xl bg-gray-900/40 z-20 transition-all duration-500 hover:scale-[1.01] overflow-hidden ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-slide-in-fast"></div>

        {/* Header with Animated Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-black-500 p-3 rounded-full shadow-lg shadow-green-400/20 transform hover:rotate-12 transition-transform duration-300 animate-float">
                <img 
                  src="src/assets/Kyrie-fitness gym.jpg" 
                  alt="ASH-FIT Logo" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-widest uppercase animate-gym-glow">ASH<span className="text-green-400">FIT</span></h1>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-2 font-light tracking-wide animate-fade-in-slow">
            Join our fitness community today.
          </p>
        </div>
        
        {/* Form Section */}
        <div className="space-y-6">
          {error && (
            <div className="p-3 bg-red-600/20 text-red-300 rounded-lg border border-red-600 text-sm flex items-center animate-fade-in">
              <i className="fas fa-exclamation-triangle mr-2 text-red-400"></i>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-green-400 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-green-400 text-sm"></i>
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700/60 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-300 hover:border-green-400/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-green-400 mb-1 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-green-400 text-sm"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700/60 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-300 hover:border-green-400/50"
                  placeholder="yourname@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-green-400 mb-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-green-400 text-sm"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700/60 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-300 hover:border-green-400/50"
                  placeholder="•••••••• (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg text-sm uppercase tracking-wide hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-lg shadow-green-500/30 mt-4 animate-pulse-slow group"
            >
              {loading ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="relative inline-flex items-center justify-center h-5 w-5 animate-spin">
                      <i className="fas fa-dumbbell text-white text-lg"></i>
                    </span>
                    <span className="text-sm tracking-wide">Creating...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-dumbbell mr-2 text-sm group-hover:animate-bounce"></i>
                  Start Your Journey
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              Already have an account?{' '}
              <button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning}
                className="text-green-400 font-medium hover:text-green-300 transition-colors tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Sign In
                  <i className="fas fa-running ml-2 text-xs group-hover:animate-pulse"></i>
                </span>
                <span className="absolute inset-0 bg-green-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>
            </p>
          </div>
        </div>
        
        {/* Footer with Security Message */}
        <div className="px-8 py-4 bg-gray-900/60 border-t border-gray-700/50 mt-8 -mx-8 -mb-8">
          <p className="text-xs text-center text-gray-400 uppercase tracking-wide">
            <i className="fas fa-shield-alt text-green-500 mr-1 text-sm animate-pulse"></i>
            Data Transmission Secure
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes treadmill-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes running-shoe {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-4px) rotate(5deg); }
        }
        
        @keyframes running-shoe-delayed {
          0%, 50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes weight-stack {
          0% { transform: translateY(-30px) scale(0.8); opacity: 0; }
          50% { transform: translateY(0) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes gym-progress-reverse {
          0% { width: 100%; background-color: #064E3B; }
          20% { width: 75%; background-color: #065F46; }
          40% { width: 50%; background-color: #047857; }
          60% { width: 25%; background-color: #059669; }
          80% { width: 10%; background-color: #10B981; }
          100% { width: 0%; background-color: #10B981; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gym-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(16, 185, 129, 0.5); }
          50% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-treadmill-move {
          animation: treadmill-move 1s linear infinite;
        }
        
        .animate-running-shoe {
          animation: running-shoe 1s ease-in-out infinite;
        }
        
        .animate-running-shoe-delayed {
          animation: running-shoe-delayed 1s ease-in-out infinite;
        }
        
        .animate-weight-stack {
          animation: weight-stack 1s ease-out forwards;
        }
        
        .animate-gym-progress-reverse {
          animation: gym-progress-reverse 1.5s ease-in-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gym-glow {
          animation: gym-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;