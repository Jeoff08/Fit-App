// Login.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebaseconfig';

const Login = ({ onToggleAuthMode, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Show warning modal when component mounts
  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('ashfit-warning-seen');
    if (!hasSeenWarning) {
      setTimeout(() => setShowWarningModal(true), 1000);
    }
  }, []);

  const handleAcceptWarning = () => {
    localStorage.setItem('ashfit-warning-seen', 'true');
    setShowWarningModal(false);
  };

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

  // Framer Motion variants for compact modal
  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalContentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const warningIconVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      rotate: [0, -3, 3, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.3
      }
    })
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { scale: 0.98 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden relative font-sans text-white">
      {/* Dynamic Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/Kyrie-fitness gym.jpg" 
          className="w-full h-full object-cover"
          alt="Gym Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-90 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
      {/* Compact Warning Modal Popup - Smaller size */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Blurry Background */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Compact Modal Content - Smaller size */}
            <motion.div
              className="relative w-full max-w-xs mx-auto rounded-xl border border-amber-500/40 bg-gray-900/95 backdrop-filter backdrop-blur-sm shadow-xl overflow-hidden z-50 max-h-[70vh] flex flex-col"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ maxWidth: '320px' }} // Smaller width
            >
              {/* Compact Modal Header */}
              <motion.div 
                className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 border-b border-amber-500/20 p-3 relative"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    variants={warningIconVariants}
                    animate="pulse"
                    className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30"
                  >
                    <i className="fas fa-exclamation-triangle text-amber-400 text-xs"></i>
                  </motion.div>
                  <div>
                    <h2 className="text-sm font-bold text-amber-400">Important Notice</h2>
                    <p className="text-amber-300 text-xs">Personalized Fitness Guidance</p>
                  </div>
                </div>
              </motion.div>

              {/* Compact Modal Content */}
              <motion.div 
                className="p-3 flex-1 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="space-y-3 text-amber-300">
                  {[
                    {
                      title: "PERSONALIZED CONTENT",
                      content: "All fitness recommendations, workout plans, and nutritional guidance provided in this app are based on your profile data and information. The content is tailored specifically for you.",
                      icon: "fa-user-circle"
                    },
                    {
                      title: "MEDICAL CONSULTATION REQUIRED",
                      content: "If you have any medical conditions, pre-existing injuries, or health concerns, please consult with your doctor or healthcare professional before starting any fitness program.",
                      icon: "fa-heart-pulse"
                    },
                    {
                      title: "USER RESPONSIBILITY",
                      content: "You are responsible for your health and safety during workouts. Listen to your body and stop immediately if you experience pain, dizziness, or discomfort.",
                      icon: "fa-user-shield"
                    },
                    {
                      title: "ACKNOWLEDGEMENT",
                      content: "By clicking 'I UNDERSTAND & ACCEPT', you acknowledge that all content is personalized based on your data and accept full responsibility for your fitness journey.",
                      icon: "fa-signature"
                    }
                  ].map((section, index) => (
                    <motion.div
                      key={section.title}
                      custom={index}
                      variants={sectionVariants}
                      className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20"
                    >
                      <div className="flex items-start space-x-2">
                        <i className={`fas ${section.icon} text-amber-400 text-xs mt-0.5 flex-shrink-0`} />
                        <div>
                          <h3 className="text-amber-400 font-bold text-xs mb-1">{section.title}</h3>
                          <p className="text-xs leading-relaxed">{section.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Compact Modal Footer */}
              <motion.div 
                className="bg-gradient-to-r from-amber-600/5 to-amber-500/10 border-t border-amber-500/20 p-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col gap-2">
                  <motion.button
                    onClick={() => window.close()}
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full px-3 py-2 bg-gray-600/50 text-gray-300 rounded-lg border border-gray-500/30 text-xs font-semibold"
                  >
                    <i className="fas fa-times mr-1"></i>
                    Exit Application
                  </motion.button>
                  <motion.button
                    onClick={handleAcceptWarning}
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg border border-amber-500/30 text-xs font-bold shadow-lg shadow-amber-500/20"
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    I Understand & Accept
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Gym-Themed Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
          <div className="relative w-full max-w-sm px-4">
            {/* Weightlifting Animation */}
            <div className="relative w-36 h-24 mb-6 mx-auto sm:w-48 sm:h-32 sm:mb-8">
              {/* Barbell */}
              <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full shadow-lg animate-barbell-rotate sm:h-3"></div>
              
              {/* Weight Plates */}
              <div className="absolute top-1/2 -left-3 w-6 h-12 bg-gradient-to-b from-green-500 via-green-400 to-green-600 rounded-lg shadow-xl animate-plate-swing-left sm:-left-4 sm:w-8 sm:h-16"></div>
              <div className="absolute top-1/2 -right-3 w-6 h-12 bg-gradient-to-b from-green-500 via-green-400 to-green-600 rounded-lg shadow-xl animate-plate-swing-right sm:-right-4 sm:w-8 sm:h-16"></div>
              
              {/* Additional Plates */}
              <div className="absolute top-1/2 -left-8 w-4 h-8 bg-gradient-to-b from-green-600 via-green-500 to-green-700 rounded-md shadow-lg animate-plate-swing-left-delayed sm:-left-12 sm:w-6 sm:h-12"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-8 bg-gradient-to-b from-green-600 via-green-500 to-green-700 rounded-md shadow-lg animate-plate-swing-right-delayed sm:-right-12 sm:w-6 sm:h-12"></div>
            </div>
            
            {/* Muscle Flex Animation */}
            <div className="flex justify-center space-x-2 mb-4 sm:space-x-4 sm:mb-6">
              {[1, 2, 3].map((muscle) => (
                <div 
                  key={muscle}
                  className="relative w-8 h-8 bg-gradient-to-br from-green-400 to-green-700 rounded-full animate-muscle-flex sm:w-12 sm:h-12"
                  style={{ animationDelay: `${muscle * 0.3}s` }}
                >
                  <div className="absolute inset-0.5 bg-gradient-to-br from-green-300 to-green-600 rounded-full opacity-70 sm:inset-1"></div>
                </div>
              ))}
            </div>
            
            {/* Gym Text Animation */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-green-400 text-lg font-bold tracking-widest animate-text-glow sm:text-2xl">
                ENTERING ASH-FIT SIGNUP
              </h3>
              <p className="text-gray-300 text-xs mt-1 font-light tracking-wide animate-pulse sm:text-sm sm:mt-2">
                Preparing your fitness journey...
              </p>
            </div>
            
            {/* Heart Rate Monitor */}
            <div className="w-48 h-14 bg-gray-900/80 rounded-xl p-3 mx-auto mb-4 border border-green-500/30 sm:w-64 sm:h-16 sm:p-4 sm:mb-6">
              <div className="flex items-center justify-between">
                <div className="text-green-400 text-xs uppercase tracking-wider">HEART RATE</div>
                <div className="text-green-400 text-xs animate-pulse sm:text-sm">85 BPM</div>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden sm:h-2 sm:mt-2">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-heart-rate"></div>
              </div>
            </div>
            
            {/* Progress Bar with Weight Indicators */}
            <div className="w-full max-w-xs h-2 bg-gray-800 rounded-full mt-4 overflow-hidden mx-auto relative sm:w-80 sm:h-3 sm:mt-6">
              <div className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full animate-gym-progress"></div>
              {/* Weight markers */}
              <div className="absolute top-0 left-0 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse sm:h-4"></div>
              <div className="absolute top-0 left-1/4 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse sm:h-4" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-0 left-1/2 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse sm:h-4" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-0 left-3/4 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse sm:h-4" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute top-0 right-0 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse sm:h-4" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Container with Enhanced Glassmorphism Effect */}
      <motion.div 
        className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-green-500/30 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/90 z-20 transition-all duration-500 hover:scale-[1.01] overflow-hidden sm:max-w-md sm:p-8 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-slide-glow"></div>

        {/* Header with Enhanced Animated Logo */}
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center justify-center space-x-2 mb-3 sm:space-x-3 sm:mb-4"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-full shadow-2xl shadow-green-400/30 transform hover:rotate-12 transition-transform duration-300 animate-float-slow sm:p-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-black p-1.5 rounded-full sm:p-2">
                  <img 
                    src="/images/Kyrie-fitness gym.jpg" 
                    alt="ASH-FIT Logo" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-400 sm:w-16 sm:h-16"
                  />
                </div>
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold text-white tracking-widest uppercase animate-text-glow-slow sm:text-5xl"
                variants={itemVariants}
              >
                ASH-<span className="text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">FIT</span>
              </motion.h1>
            </div>
          </motion.div>
          <motion.p 
            className="text-gray-300 text-xs mt-1 font-light tracking-wide animate-fade-in-slow sm:text-sm sm:mt-2"
            variants={itemVariants}
          >
            
          </motion.p>
        </motion.div>
        
        {/* System Reminder Section (Smaller version) */}
        <motion.div 
          className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-4 mb-4 sm:mb-6"
          variants={itemVariants}
        >
          <div className="flex items-start space-x-3">
            <motion.i 
              className="fas fa-exclamation-triangle text-yellow-400 text-sm mt-0.5 flex-shrink-0 sm:text-base"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div>
              <h4 className="text-yellow-400 font-bold text-xs mb-1 uppercase tracking-wide sm:text-sm">Safety Reminder</h4>
              <p className="text-yellow-300 text-xs leading-relaxed sm:text-sm">
                All content is personalized based on your profile data. Consult healthcare professionals before starting new fitness programs.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Form Section */}
        <motion.div 
          className="space-y-4 sm:space-y-6"
          variants={containerVariants}
        >
          {error && (
            <motion.div 
              className="p-3 bg-red-600/20 text-red-300 rounded-xl border border-red-600/50 text-xs flex items-center animate-fade-in sm:p-4 sm:text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <i className="fas fa-exclamation-triangle mr-2 text-red-400 text-sm sm:mr-3 sm:text-lg"></i>
              <span>{error}</span>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-envelope mr-1 sm:mr-2"></i>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-user text-green-400 text-xs sm:text-sm"></i>
                </div>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="Email"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-lock mr-1 sm:mr-2"></i>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-key text-green-400 text-xs sm:text-sm"></i>
                </div>
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="••••••••"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
            
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-2xl shadow-green-500/40 mt-4 animate-pulse-soft group relative overflow-hidden sm:py-4 sm:text-sm sm:mt-6"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {loading ? (
                <>
                  <div className="flex items-center space-x-2 relative z-10 sm:space-x-3">
                    <motion.span 
                      className="relative inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <i className="fas fa-dumbbell text-white text-sm sm:text-lg"></i>
                    </motion.span>
                    <span className="text-xs tracking-wide font-semibold sm:text-sm">ENTERING...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-running mr-2 text-xs group-hover:animate-bounce relative z-10 sm:mr-3 sm:text-sm"></i>
                  <span className="relative z-10">ENTER GYM</span>
                </>
              )}
            </motion.button>
          </form>
          
          <motion.div 
            className="mt-6 text-center sm:mt-8"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-xs sm:text-sm">
              Don't have an account?{' '}
              <motion.button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning}
                className="text-green-400 font-bold hover:text-green-300 transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden px-3 py-1.5 rounded-lg bg-green-400/10 hover:bg-green-400/20 sm:px-4 sm:py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center text-xs sm:text-sm">
                  SIGN UP
                  <i className="fas fa-dumbbell ml-2 text-xs group-hover:animate-pulse transition-transform duration-300 sm:ml-3 sm:text-sm"></i>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Footer with Security Message */}
        <motion.div 
          className="px-6 py-4 bg-gradient-to-r from-gray-900/80 to-black/90 border-t border-green-500/20 mt-6 -mx-6 -mb-6 rounded-b-2xl sm:px-8 sm:py-6 sm:mt-8 sm:-mx-8 sm:-mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <div className="flex items-center text-green-400">
              <motion.i 
                className="fas fa-shield-alt text-sm animate-pulse mr-1 sm:text-lg sm:mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs uppercase tracking-widest font-semibold sm:text-sm">Secure Login</span>
            </div>
            <motion.div 
              className="w-1.5 h-1.5 bg-green-400 rounded-full sm:w-2 sm:h-2"
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="flex items-center text-gray-400">
              <i className="fas fa-bolt text-xs mr-1 sm:text-sm sm:mr-2"></i>
              <span className="text-xs uppercase tracking-widest sm:text-sm">24/7 Access</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes barbell-rotate {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          25% { transform: translateY(-60%) rotate(-5deg); }
          50% { transform: translateY(-70%) rotate(0deg); }
          75% { transform: translateY(-60%) rotate(5deg); }
        }
        
        @keyframes plate-swing-left {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          25% { transform: translateY(-60%) rotate(-15deg); }
          50% { transform: translateY(-70%) rotate(0deg); }
          75% { transform: translateY(-60%) rotate(15deg); }
        }
        
        @keyframes plate-swing-right {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          25% { transform: translateY(-60%) rotate(15deg); }
          50% { transform: translateY(-70%) rotate(0deg); }
          75% { transform: translateY(-60%) rotate(-15deg); }
        }
        
        @keyframes plate-swing-left-delayed {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          25% { transform: translateY(-55%) rotate(-10deg); }
          50% { transform: translateY(-65%) rotate(0deg); }
          75% { transform: translateY(-55%) rotate(10deg); }
        }
        
        @keyframes plate-swing-right-delayed {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          25% { transform: translateY(-55%) rotate(10deg); }
          50% { transform: translateY(-65%) rotate(0deg); }
          75% { transform: translateY(-55%) rotate(-10deg); }
        }
        
        @keyframes muscle-flex {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1.1); }
          75% { transform: scale(1.3); }
        }
        
        @keyframes heart-rate {
          0%, 100% { width: 0%; }
          25% { width: 25%; }
          50% { width: 50%; }
          75% { width: 75%; }
          100% { width: 85%; }
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
          33% { transform: translateY(-6px) rotate(-2deg); }
          66% { transform: translateY(-3px) rotate(2deg); }
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
      `}</style>
    </div>
  );
};

export default Login;