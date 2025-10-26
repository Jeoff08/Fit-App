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
    }, 2000);
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
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-90 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
      {/* Enhanced Gym-Themed Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
          <div className="relative">
            {/* Treadmill Running Animation */}
            <div className="w-64 h-24 mb-8 mx-auto relative">
              {/* Treadmill Base */}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl shadow-2xl"></div>
              
              {/* Moving Treadmill Belt */}
              <div className="absolute bottom-8 left-0 w-full h-4 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-lg animate-treadmill-run"></div>
              
              {/* Running Shoes */}
              <div className="absolute bottom-12 w-8 h-6 bg-gradient-to-br from-green-500 to-green-700 rounded-lg animate-running-left shadow-lg"></div>
              <div className="absolute bottom-12 w-8 h-6 bg-gradient-to-br from-green-500 to-green-700 rounded-lg animate-running-right shadow-lg"></div>
            </div>
            
            {/* Weight Stack Animation */}
            <div className="flex justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((weight) => (
                <div 
                  key={weight}
                  className="relative w-10 h-10 bg-gradient-to-b from-green-500 to-green-700 rounded-full border-4 border-green-300 shadow-xl animate-weight-lift"
                  style={{ animationDelay: `${weight * 0.2}s` }}
                >
                  <div className="absolute inset-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-200 rounded-full"></div>
                </div>
              ))}
            </div>
            
            {/* Gym Text Animation */}
            <div className="text-center mb-6">
              <h3 className="text-green-400 text-2xl font-bold tracking-widest animate-text-glow">
                RETURNING TO ASH-FIT LOGIN
              </h3>
              <p className="text-gray-300 text-sm mt-2 font-light tracking-wide animate-pulse">
                Preparing sign-in experience...
              </p>
            </div>
            
            {/* Fitness Stats Monitor */}
            <div className="w-64 h-16 bg-gray-900/80 rounded-xl p-4 mx-auto mb-6 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="text-green-400 text-xs uppercase tracking-wider">ENERGY LEVEL</div>
                <div className="text-green-400 text-sm animate-pulse">92%</div>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-energy-fill"></div>
              </div>
            </div>
            
            {/* Reverse Progress Bar */}
            <div className="w-80 h-3 bg-gray-800 rounded-full mt-6 overflow-hidden mx-auto relative">
              <div className="h-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-full animate-gym-progress-reverse"></div>
              {/* Weight markers */}
              <div className="absolute top-0 left-0 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse-reverse"></div>
              <div className="absolute top-0 left-1/4 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse-reverse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-0 left-1/2 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse-reverse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-0 left-3/4 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse-reverse" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute top-0 right-0 w-1 h-4 bg-green-300 -mt-0.5 animate-marker-pulse-reverse" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Container with Enhanced Glassmorphism Effect */}
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
                    src="src/assets/Kyrie-fitness gym.jpg" 
                    alt="ASH-FIT Logo" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                  />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-widest uppercase animate-text-glow-slow">
                ASH<span className="text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">FIT</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-2 font-light tracking-wide animate-fade-in-slow">
            Build Your Legacy, One Rep at a Time
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
                <i className="fas fa-id-card mr-2"></i>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-user text-green-400 text-sm"></i>
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                <i className="fas fa-envelope mr-2"></i>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-at text-green-400 text-sm"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm"
                  placeholder="yourname@example.com"
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
                  placeholder="•••••••• (min 6 characters)"
                  required
                  minLength={6}
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
                    <span className="text-sm tracking-wide font-semibold">BUILDING...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-dumbbell mr-3 text-sm group-hover:animate-bounce relative z-10"></i>
                  <span className="relative z-10">CONTINUE</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning}
                className="text-green-400 font-bold hover:text-green-300 transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden px-4 py-2 rounded-lg bg-green-400/10 hover:bg-green-400/20"
              >
                <span className="relative z-10 flex items-center">
                  SIGN IN
                  <i className="fas fa-running ml-3 text-sm group-hover:animate-pulse transition-transform duration-300"></i>
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
              <span className="text-xs uppercase tracking-widest font-semibold">Secure Registration</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="flex items-center text-gray-400">
              <i className="fas fa-bolt text-sm mr-2"></i>
              <span className="text-xs uppercase tracking-widest">Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes treadmill-run {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes running-left {
          0%, 100% { 
            transform: translateX(0px) translateY(0px) rotate(0deg);
            left: 20%;
          }
          25% { 
            transform: translateX(40px) translateY(-10px) rotate(-5deg);
            left: 20%;
          }
          50% { 
            transform: translateX(80px) translateY(0px) rotate(0deg);
            left: 20%;
          }
          75% { 
            transform: translateX(120px) translateY(-10px) rotate(5deg);
            left: 20%;
          }
        }
        
        @keyframes running-right {
          0%, 100% { 
            transform: translateX(0px) translateY(0px) rotate(0deg);
            left: 60%;
          }
          25% { 
            transform: translateX(40px) translateY(-10px) rotate(5deg);
            left: 60%;
          }
          50% { 
            transform: translateX(80px) translateY(0px) rotate(0deg);
            left: 60%;
          }
          75% { 
            transform: translateX(120px) translateY(-10px) rotate(-5deg);
            left: 60%;
          }
        }
        
        @keyframes weight-lift {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-15px); }
          50% { transform: translateY(-30px); }
          75% { transform: translateY(-15px); }
        }
        
        @keyframes energy-fill {
          0% { width: 0%; }
          25% { width: 25%; }
          50% { width: 50%; }
          75% { width: 75%; }
          100% { width: 92%; }
        }
        
        @keyframes gym-progress-reverse {
          0% { width: 100%; }
          25% { width: 75%; }
          50% { width: 50%; }
          75% { width: 25%; }
          100% { width: 0%; }
        }
        
        @keyframes marker-pulse-reverse {
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
        
        .animate-treadmill-run {
          animation: treadmill-run 1.5s linear infinite;
        }
        
        .animate-running-left {
          animation: running-left 1.5s ease-in-out infinite;
        }
        
        .animate-running-right {
          animation: running-right 1.5s ease-in-out infinite;
          animation-delay: 0.75s;
        }
        
        .animate-weight-lift {
          animation: weight-lift 2s ease-in-out infinite;
        }
        
        .animate-energy-fill {
          animation: energy-fill 2s ease-out forwards;
        }
        
        .animate-gym-progress-reverse {
          animation: gym-progress-reverse 2s ease-out forwards;
        }
        
        .animate-marker-pulse-reverse {
          animation: marker-pulse-reverse 1s ease-in-out infinite;
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
      `}</style>
    </div>
  );
};

export default Register;