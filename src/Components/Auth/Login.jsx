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
    }, 2000);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-black overflow-hidden relative font-sans text-white">
      {/* Dynamic Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/Kyrie-fitness gym.jpg" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-90 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
      {/* Enhanced Gym-Themed Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
          <div className="relative">
            {/* Weightlifting Animation */}
            <div className="relative w-48 h-32 mb-8 mx-auto">
              {/* Barbell */}
              <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full shadow-lg animate-barbell-rotate"></div>
              
              {/* Weight Plates */}
              <div className="absolute top-1/2 -left-4 w-8 h-16 bg-gradient-to-b from-green-500 via-green-400 to-green-600 rounded-lg shadow-xl animate-plate-swing-left"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-16 bg-gradient-to-b from-green-500 via-green-400 to-green-600 rounded-lg shadow-xl animate-plate-swing-right"></div>
              
              {/* Additional Plates */}
              <div className="absolute top-1/2 -left-12 w-6 h-12 bg-gradient-to-b from-green-600 via-green-500 to-green-700 rounded-md shadow-lg animate-plate-swing-left-delayed"></div>
              <div className="absolute top-1/2 -right-12 w-6 h-12 bg-gradient-to-b from-green-600 via-green-500 to-green-700 rounded-md shadow-lg animate-plate-swing-right-delayed"></div>
            </div>
            
            {/* Muscle Flex Animation */}
            <div className="flex justify-center space-x-4 mb-6">
              {[1, 2, 3].map((muscle) => (
                <div 
                  key={muscle}
                  className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-green-700 rounded-full animate-muscle-flex"
                  style={{ animationDelay: `${muscle * 0.3}s` }}
                >
                  <div className="absolute inset-1 bg-gradient-to-br from-green-300 to-green-600 rounded-full opacity-70"></div>
                </div>
              ))}
            </div>
            
            {/* Gym Text Animation */}
            <div className="text-center mb-6">
              <h3 className="text-green-400 text-2xl font-bold tracking-widest animate-text-glow">
                ENTERING ASH-FIT SIGNUP
              </h3>
              <p className="text-gray-300 text-sm mt-2 font-light tracking-wide animate-pulse">
                Preparing your fitness journey...
              </p>
            </div>
            
            {/* Heart Rate Monitor */}
            <div className="w-64 h-16 bg-gray-900/80 rounded-xl p-4 mx-auto mb-6 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="text-green-400 text-xs uppercase tracking-wider">HEART RATE</div>
                <div className="text-green-400 text-sm animate-pulse">85 BPM</div>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-heart-rate"></div>
              </div>
            </div>
            
            {/* Progress Bar with Weight Indicators */}
            <div className="w-80 h-3 bg-gray-800 rounded-full mt-6 overflow-hidden mx-auto relative">
              <div className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full animate-gym-progress"></div>
              {/* Weight markers */}
              <div className="absolute top-0 left-0 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse"></div>
              <div className="absolute top-0 left-1/4 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-0 left-1/2 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-0 left-3/4 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute top-0 right-0 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Container with Enhanced Glassmorphism Effect */}
      <div className={`max-w-md w-full rounded-2xl p-8 shadow-2xl border border-green-500/30 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/90 z-20 transition-all duration-500 hover:scale-[1.01] overflow-hidden ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-slide-glow"></div>

        {/* Header with Enhanced Animated Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-full shadow-2xl shadow-green-400/30 transform hover:rotate-12 transition-transform duration-300 animate-float-slow">
                <div className="bg-black p-2 rounded-full">
                  <img 
                    src="/images/Kyrie-fitness gym.jpg" 
                    alt="ASH-FIT Logo" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                  />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-widest uppercase animate-text-glow-slow">
                ASH-<span className="text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">FIT</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-2 font-light tracking-wide animate-fade-in-slow">
            
          </p>
        </div>
        
        {/* Form Section */}
        <div className="space-y-6">
          {error && (
            <div className="p-4 bg-red-600/20 text-red-300 rounded-xl border border-red-600/50 text-sm flex items-center animate-fade-in">
              <i className="fas fa-exclamation-triangle mr-3 text-red-400 text-lg"></i>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                <i className="fas fa-envelope mr-2"></i>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-user text-green-400 text-sm"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                <i className="fas fa-lock mr-2"></i>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-key text-green-400 text-sm"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-2xl shadow-green-500/40 mt-6 animate-pulse-soft group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {loading ? (
                <>
                  <div className="flex items-center space-x-3 relative z-10">
                    <span className="relative inline-flex items-center justify-center h-6 w-6 animate-spin">
                      <i className="fas fa-dumbbell text-white text-lg"></i>
                    </span>
                    <span className="text-sm tracking-wide font-semibold">LIFTING...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-3 text-sm group-hover:animate-bounce relative z-10"></i>
                  <span className="relative z-10">AUTHENTICATE & ENTER</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              First time here?{' '}
              <button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning}
                className="text-green-400 font-bold hover:text-green-300 transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden px-4 py-2 rounded-lg bg-green-400/10 hover:bg-green-400/20"
              >
                <span className="relative z-10 flex items-center">
                  CREATE ACCOUNT 
                  <i className="fas fa-dumbbell ml-3 text-sm group-hover:animate-rotate-90 transition-transform duration-300"></i>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </button>
            </p>
          </div>
        </div>
        
        {/* Enhanced Footer with Security Message */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-900/80 to-black/90 border-t border-green-500/20 mt-8 -mx-8 -mb-8 rounded-b-2xl">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center text-green-400">
              <i className="fas fa-shield-alt text-lg animate-pulse mr-2"></i>
              
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="flex items-center text-gray-400">
              <i className="fas fa-bolt text-sm mr-2"></i>
              
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes barbell-rotate {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(-5deg); }
          50% { transform: translateY(-40px) rotate(0deg); }
          75% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes plate-swing-left {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-5px) rotate(-10deg); }
          50% { transform: translateX(-10px) rotate(0deg); }
          75% { transform: translateX(-5px) rotate(10deg); }
        }
        
        @keyframes plate-swing-right {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(5px) rotate(10deg); }
          50% { transform: translateX(10px) rotate(0deg); }
          75% { transform: translateX(5px) rotate(-10deg); }
        }
        
        @keyframes plate-swing-left-delayed {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-8px) rotate(-15deg); }
          50% { transform: translateX(-16px) rotate(0deg); }
          75% { transform: translateX(-8px) rotate(15deg); }
        }
        
        @keyframes plate-swing-right-delayed {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(8px) rotate(15deg); }
          50% { transform: translateX(16px) rotate(0deg); }
          75% { transform: translateX(8px) rotate(-15deg); }
        }
        
        @keyframes muscle-flex {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes heart-rate {
          0% { width: 0%; }
          20% { width: 25%; }
          40% { width: 50%; }
          60% { width: 75%; }
          80% { width: 90%; }
          100% { width: 100%; }
        }
        
        @keyframes gym-progress {
          0% { width: 0%; }
          25% { width: 25%; }
          50% { width: 50%; }
          75% { width: 75%; }
          100% { width: 100%; }
        }
        
        @keyframes marker-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5),
                         0 0 20px rgba(16, 185, 129, 0.3); 
          }
          50% { 
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.8),
                         0 0 40px rgba(16, 185, 129, 0.6),
                         0 0 60px rgba(16, 185, 129, 0.4); 
          }
        }
        
        @keyframes text-glow-slow {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(16, 185, 129, 0.3); 
          }
          50% { 
            text-shadow: 0 0 15px rgba(16, 185, 129, 0.6),
                         0 0 25px rgba(16, 185, 129, 0.4); 
          }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(-2deg); }
          66% { transform: translateY(-4px) rotate(2deg); }
        }
        
        @keyframes slide-glow {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 30px rgba(16, 185, 129, 0.6); }
        }
        
        @keyframes rotate-90 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
        
        .animate-barbell-rotate {
          animation: barbell-rotate 2s ease-in-out infinite;
        }
        
        .animate-plate-swing-left {
          animation: plate-swing-left 2s ease-in-out infinite;
        }
        
        .animate-plate-swing-right {
          animation: plate-swing-right 2s ease-in-out infinite;
        }
        
        .animate-plate-swing-left-delayed {
          animation: plate-swing-left-delayed 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-plate-swing-right-delayed {
          animation: plate-swing-right-delayed 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-muscle-flex {
          animation: muscle-flex 1.5s ease-in-out infinite;
        }
        
        .animate-heart-rate {
          animation: heart-rate 2s ease-out forwards;
        }
        
        .animate-gym-progress {
          animation: gym-progress 2s ease-out forwards;
        }
        
        .animate-marker-pulse {
          animation: marker-pulse 1s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .animate-text-glow-slow {
          animation: text-glow-slow 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-slide-glow {
          animation: slide-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        
        .animate-rotate-90 {
          animation: rotate-90 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;