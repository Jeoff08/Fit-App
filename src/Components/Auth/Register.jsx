// Register.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Framer Motion variants for Terms Modal
  const termsModalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -30,
      transition: { duration: 0.3 }
    }
  };

  const backdropVariants = {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const checkboxVariants = {
    unchecked: { scale: 1, borderColor: "#4B5563" },
    checked: { 
      scale: 1.05, 
      borderColor: "#10B981",
      backgroundColor: "#10B981",
      transition: { type: "spring", stiffness: 300 }
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions to register');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email,
        createdAt: new Date(),
        agreedToTerms: true,
        termsAcceptedAt: new Date(),
        fitnessData: null
      });

      onRegisterSuccess(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAuthMode = () => {
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions before proceeding');
      return;
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      onToggleAuthMode();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black overflow-hidden relative font-sans text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/Kyrie-fitness gym.jpg" 
          alt="Gym background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-90 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
      {/* Mobile-Optimized Terms and Conditions Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Blurry Background */}
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            
            {/* Compact Modal Container */}
            <motion.div
              className="relative w-full max-w-sm mx-auto bg-gray-900/95 border border-green-500/30 rounded-xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col z-50 backdrop-blur-sm"
              variants={termsModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <motion.div 
                className="text-center p-3 bg-gradient-to-r from-green-600/10 to-green-500/5 border-b border-green-500/20 flex-shrink-0"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30"
                    whileHover={{ scale: 1.1 }}
                  >
                    <i className="fas fa-file-contract text-green-400 text-sm"></i>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Terms & Conditions</h3>
                    <p className="text-green-400 text-xs">Legal Agreement</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Terms Content - Compact */}
              <motion.div 
                className="p-3 flex-1 overflow-y-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <div className="text-gray-300 text-xs leading-relaxed space-y-3">
                  {[
                    {
                      title: "IMPORTANT LEGAL DISCLAIMER",
                      content: "Please read these terms carefully before using ASH-FIT. By creating an account, you agree to be bound by all terms outlined below.",
                      icon: "fa-scale-balanced",
                      emphasis: true
                    },
                    {
                      title: "User Responsibility",
                      content: "You are solely responsible for the accuracy of all personal information, health data, and medical history provided to ASH-FIT.",
                      icon: "fa-user-check"
                    },
                    {
                      title: "Medical Disclaimer",
                      content: "ASH-FIT is NOT a medical service. Consult healthcare professionals before starting any fitness program.",
                      icon: "fa-heart-pulse"
                    },
                    {
                      title: "Assumption of Risk",
                      content: "You voluntarily assume all risks associated with physical exercise and dietary changes.",
                      icon: "fa-triangle-exclamation"
                    },
                    {
                      title: "Liability Limitation",
                      content: "ASH-FIT shall not be liable for any direct, indirect, incidental, or consequential damages.",
                      icon: "fa-shield-halved"
                    }
                  ].map((section, index) => (
                    <motion.div
                      key={section.title}
                      variants={itemVariants}
                      className={`p-2 rounded-lg border ${
                        section.emphasis
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-gray-800/30 border-green-500/20'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <i className={`fas ${section.icon} text-green-400 text-xs mt-0.5 flex-shrink-0`} />
                        <div className="flex-1">
                          <h4 className="font-bold text-green-300 text-xs mb-1">{section.title}</h4>
                          <p className="text-gray-300">{section.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Agreement Checkbox */}
              <motion.div 
                className="p-3 bg-gray-800/50 border-t border-green-500/20 flex-shrink-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  className="flex items-start space-x-2 cursor-pointer"
                  onClick={() => setAgreedToTerms(!agreedToTerms)}
                >
                  <motion.div
                    variants={checkboxVariants}
                    animate={agreedToTerms ? "checked" : "unchecked"}
                    className="relative mt-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={() => {}}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-2 border-gray-600 rounded focus:ring-green-500 cursor-pointer"
                    />
                    {agreedToTerms && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <i className="fas fa-check text-white text-xs"></i>
                      </motion.div>
                    )}
                  </motion.div>
                  <label className="text-xs text-gray-300 cursor-pointer flex-1">
                    <span className="font-semibold text-green-400">I AGREE:</span> I have read and agree to all terms and conditions.
                  </label>
                </div>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div 
                className="flex space-x-2 p-3 bg-gradient-to-r from-green-600/5 to-green-500/10 border-t border-green-500/20 flex-shrink-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={() => setShowTerms(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-700/50 text-white py-2 rounded-lg font-semibold text-xs border border-gray-600/50"
                >
                  Close
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (agreedToTerms) {
                      setShowTerms(false);
                    } else {
                      setError('Please agree to the terms to continue');
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg font-semibold text-xs border border-green-500/30 disabled:opacity-50"
                  disabled={!agreedToTerms}
                >
                  Accept & Continue
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Gym-Themed Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
          <div className="relative w-full max-w-sm px-4">
            {/* Treadmill Running Animation */}
            <div className="w-48 h-20 mb-6 mx-auto relative sm:w-64 sm:h-24 sm:mb-8">
              {/* Treadmill Base */}
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl shadow-2xl sm:h-8"></div>
              
              {/* Moving Treadmill Belt */}
              <div className="absolute bottom-6 left-0 w-full h-3 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-lg animate-treadmill-run sm:bottom-8 sm:h-4"></div>
              
              {/* Running Shoes */}
              <div className="absolute bottom-9 w-6 h-5 bg-gradient-to-br from-green-500 to-green-700 rounded-lg animate-running-left shadow-lg sm:bottom-12 sm:w-8 sm:h-6"></div>
              <div className="absolute bottom-9 w-6 h-5 bg-gradient-to-br from-green-500 to-green-700 rounded-lg animate-running-right shadow-lg sm:bottom-12 sm:w-8 sm:h-6"></div>
            </div>
            
            {/* Weight Stack Animation */}
            <div className="flex justify-center space-x-1 mb-6 sm:space-x-2 sm:mb-8">
              {[1, 2, 3, 4, 5].map((weight) => (
                <div 
                  key={weight}
                  className="relative w-6 h-6 bg-gradient-to-b from-green-500 to-green-700 rounded-full border-2 border-green-300 shadow-xl animate-weight-lift sm:w-10 sm:h-10 sm:border-4"
                  style={{ animationDelay: `${weight * 0.2}s` }}
                >
                  <div className="absolute inset-0.5 bg-gradient-to-b from-green-400 to-green-600 rounded-full opacity-80 sm:inset-1"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-green-200 rounded-full sm:w-2 sm:h-2"></div>
                </div>
              ))}
            </div>
            
            {/* Gym Text Animation */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-green-400 text-lg font-bold tracking-widest animate-text-glow sm:text-2xl">
                RETURNING TO ASH-FIT LOGIN
              </h3>
              <p className="text-gray-300 text-xs mt-1 font-light tracking-wide animate-pulse sm:text-sm sm:mt-2">
                Preparing sign-in experience...
              </p>
            </div>
            
            {/* Fitness Stats Monitor */}
            <div className="w-48 h-14 bg-gray-900/80 rounded-xl p-3 mx-auto mb-4 border border-green-500/30 sm:w-64 sm:h-16 sm:p-4 sm:mb-6">
              <div className="flex items-center justify-between">
                <div className="text-green-400 text-xs uppercase tracking-wider">ENERGY LEVEL</div>
                <div className="text-green-400 text-xs animate-pulse sm:text-sm">92%</div>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden sm:h-2 sm:mt-2">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-energy-fill"></div>
              </div>
            </div>
            
            {/* Reverse Progress Bar */}
            <div className="w-full max-w-xs h-2 bg-gray-800 rounded-full mt-4 overflow-hidden mx-auto relative sm:w-80 sm:h-3 sm:mt-6">
              <div className="h-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-full animate-gym-progress-reverse"></div>
              {/* Weight markers */}
              <div className="absolute top-0 left-0 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse-reverse sm:h-4"></div>
              <div className="absolute top-0 left-1/4 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse-reverse sm:h-4" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-0 left-1/2 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse-reverse sm:h-4" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-0 left-3/4 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse-reverse sm:h-4" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute top-0 right-0 w-1 h-3 bg-green-300 -mt-0.5 animate-marker-pulse-reverse sm:h-4" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Container with Enhanced Glassmorphism Effect */}
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
                ASH<span className="text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">FIT</span>
              </motion.h1>
            </div>
          </motion.div>
          <motion.p 
            className="text-gray-300 text-xs mt-1 font-light tracking-wide animate-fade-in-slow sm:text-sm sm:mt-2"
            variants={itemVariants}
          >
            Build Your Legacy, One Rep at a Time
          </motion.p>
        </motion.div>
        
        {/* System Disclaimer Banner */}
        <motion.div 
          className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center space-x-2 text-blue-400 text-xs">
            <motion.i 
              className="fas fa-info-circle"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-semibold">SYSTEM DISCLAIMER:</span>
            <span>All recommendations are based solely on your provided information</span>
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
          
          {/* Terms Agreement Section */}
          <motion.div 
            className="bg-gray-800/30 p-4 rounded-xl border border-green-500/20"
            variants={itemVariants}
          >
            <div className="flex items-start space-x-3">
              <motion.input
                type="checkbox"
                id="registerAgree"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2 mt-1 flex-shrink-0 cursor-pointer"
                whileTap={{ scale: 0.9 }}
              />
              <div>
                <label htmlFor="registerAgree" className="text-xs text-gray-300 cursor-pointer sm:text-sm">
                  I agree to the ASH-FIT Terms & Conditions and acknowledge that I am solely responsible for the accuracy of my health information. 
                  <motion.button 
                    onClick={() => setShowTerms(true)}
                    className="text-green-400 hover:text-green-300 underline ml-1 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Full Terms
                  </motion.button>
                </label>
                <p className="text-xs text-gray-400 mt-1">
                  You must agree to continue with registration
                </p>
              </div>
            </div>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-id-card mr-1 sm:mr-2"></i>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-user text-green-400 text-xs sm:text-sm"></i>
                </div>
                <motion.input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="Enter your full name"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-envelope mr-1 sm:mr-2"></i>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-at text-green-400 text-xs sm:text-sm"></i>
                </div>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="yourname@example.com"
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
                  placeholder="•••••••• (min 6 characters)"
                  required
                  minLength={6}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>
            
            <motion.button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-2xl shadow-green-500/40 mt-4 animate-pulse-soft group relative overflow-hidden sm:py-4 sm:text-sm sm:mt-6"
              whileHover={{ scale: loading || !agreedToTerms ? 1 : 1.02 }}
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
                    <span className="text-xs tracking-wide font-semibold sm:text-sm">BUILDING...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-dumbbell mr-2 text-xs group-hover:animate-bounce relative z-10 sm:mr-3 sm:text-sm"></i>
                  <span className="relative z-10">CONTINUE</span>
                </>
              )}
            </motion.button>
          </form>
          
          <motion.div 
            className="mt-6 text-center sm:mt-8"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-xs sm:text-sm">
              Already have an account?{' '}
              <motion.button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning || !agreedToTerms}
                className="text-green-400 font-bold hover:text-green-300 transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden px-3 py-1.5 rounded-lg bg-green-400/10 hover:bg-green-400/20 sm:px-4 sm:py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center text-xs sm:text-sm">
                  SIGN IN
                  <i className="fas fa-running ml-2 text-xs group-hover:animate-pulse transition-transform duration-300 sm:ml-3 sm:text-sm"></i>
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
              <span className="text-xs uppercase tracking-widest font-semibold sm:text-sm">Secure Registration</span>
            </div>
            <motion.div 
              className="w-1.5 h-1.5 bg-green-400 rounded-full sm:w-2 sm:h-2"
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="flex items-center text-gray-400">
              <i className="fas fa-bolt text-xs mr-1 sm:text-sm sm:mr-2"></i>
              <span className="text-xs uppercase tracking-widest sm:text-sm">Encrypted</span>
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-gray-500 text-xs">
              All system outputs are based solely on your provided information
            </p>
          </div>
        </motion.div>
      </motion.div>

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
            transform: translateX(30px) translateY(-8px) rotate(-5deg);
            left: 20%;
          }
          50% { 
            transform: translateX(60px) translateY(0px) rotate(0deg);
            left: 20%;
          }
          75% { 
            transform: translateX(90px) translateY(-8px) rotate(5deg);
            left: 20%;
          }
        }
        
        @keyframes running-right {
          0%, 100% { 
            transform: translateX(0px) translateY(0px) rotate(0deg);
            left: 60%;
          }
          25% { 
            transform: translateX(30px) translateY(-8px) rotate(5deg);
            left: 60%;
          }
          50% { 
            transform: translateX(60px) translateY(0px) rotate(0deg);
            left: 60%;
          }
          75% { 
            transform: translateX(90px) translateY(-8px) rotate(-5deg);
            left: 60%;
          }
        }
        
        @keyframes weight-lift {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-10px); }
          50% { transform: translateY(-20px); }
          75% { transform: translateY(-10px); }
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