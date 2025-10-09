// Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebaseconfig';

const Login = ({ onToggleAuthMode, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(userCredential.user);
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
            {/* Barbell Loading Animation */}
            <div className="relative w-32 h-8 mb-8 mx-auto">
              <div className="absolute inset-0 flex items-center justify-between">
                {/* Barbell plates */}
                <div className="w-6 h-6 bg-green-500 rounded-full animate-plate-bounce-left"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full animate-plate-bounce-right"></div>
              </div>
              {/* Barbell bar */}
              <div className="w-full h-2 bg-gray-300 rounded-full animate-barbell-lift"></div>
            </div>
            
            {/* Weight Stack Animation */}
            <div className="flex justify-center space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map((weight) => (
                <div 
                  key={weight}
                  className="w-4 h-8 bg-green-400 rounded-sm animate-weight-drop"
                  style={{ animationDelay: `${weight * 0.1}s` }}
                ></div>
              ))}
            </div>
            
            {/* Gym Text Animation */}
            <div className="text-center">
              <h3 className="text-green-400 text-xl font-bold tracking-widest animate-pulse">
                ENTERING TO CREATE ACCOUNT  
              </h3>
              <p className="text-gray-400 text-sm mt-2">Setting up to create account....</p>
            </div>
            
            {/* Progress Bar with Weight Indicators */}
            <div className="w-64 h-2 bg-gray-700 rounded-full mt-6 overflow-hidden mx-auto relative">
              <div className="h-full bg-green-400 rounded-full animate-gym-progress"></div>
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
      
      {/* Login Container with Glassmorphism Effect */}
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
              <h1 className="text-4xl font-bold text-white tracking-widest uppercase animate-gym-glow">ASH-<span className="text-green-400">FIT</span></h1>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-2 font-light tracking-wide animate-fade-in-slow">
            
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
                  placeholder="••••••••"
                  required
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
                    <span className="text-sm tracking-wide">Lifting...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2 text-sm group-hover:animate-bounce"></i>
                  Authenticate
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              First time here?{' '}
              <button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning}
                className="text-green-400 font-medium hover:text-green-300 transition-colors tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Create Account 
                  <i className="fas fa-dumbbell ml-2 text-xs group-hover:animate-rotate-90"></i>
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
        @keyframes barbell-lift {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes plate-bounce-left {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(-5px) scale(1.1); }
        }
        
        @keyframes plate-bounce-right {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(5px) scale(1.1); }
        }
        
        @keyframes weight-drop {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(5px); opacity: 0.7; }
        }
        
        @keyframes gym-progress {
          0% { width: 0%; }
          20% { width: 25%; background-color: #10B981; }
          40% { width: 50%; background-color: #059669; }
          60% { width: 75%; background-color: #047857; }
          80% { width: 90%; background-color: #065F46; }
          100% { width: 100%; background-color: #064E3B; }
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
        
        @keyframes rotate-90 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
        
        .animate-barbell-lift {
          animation: barbell-lift 1.5s ease-in-out infinite;
        }
        
        .animate-plate-bounce-left {
          animation: plate-bounce-left 1.5s ease-in-out infinite;
        }
        
        .animate-plate-bounce-right {
          animation: plate-bounce-right 1.5s ease-in-out infinite;
        }
        
        .animate-weight-drop {
          animation: weight-drop 1.5s ease-in-out infinite;
        }
        
        .animate-gym-progress {
          animation: gym-progress 1.5s ease-in-out forwards;
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
        
        .animate-rotate-90 {
          animation: rotate-90 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;