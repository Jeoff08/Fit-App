import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBotResponse } from '../AI-data/Fitness&Health';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Fitness & Health Assistant. Ask me about workouts, nutrition, weight loss, or general health! 💪",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  // Check system preference and screen size on initial load
  useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isSystemDark);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('fitnessChatHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert string timestamps back to Date objects
        const historyWithDates = parsedHistory.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp),
          id: item.id || Date.now() + Math.random()
        }));
        setChatHistory(historyWithDates);
      } catch (error) {
        console.error('Error loading chat history:', error);
        setChatHistory([]);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('fitnessChatHistory', JSON.stringify(chatHistory));
    } else {
      localStorage.removeItem('fitnessChatHistory');
    }
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add to chat history with proper timestamp
    const newHistoryEntry = {
      question: inputMessage,
      timestamp: new Date(),
      id: Date.now() + Math.random()
    };

    setChatHistory(prev => [...prev, newHistoryEntry]);

    // Simulate API delay for better UX
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update history with bot response
      setChatHistory(prev => {
        const updatedHistory = [...prev];
        if (updatedHistory.length > 0) {
          updatedHistory[updatedHistory.length - 1] = {
            ...updatedHistory[updatedHistory.length - 1],
            answer: botResponse
          };
        }
        return updatedHistory;
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('fitnessChatHistory');
    // Reset to initial message when clearing history
    setMessages([
      {
        text: "Hello! I'm your Fitness & Health Assistant. Ask me about workouts, nutrition, weight loss, or general health! 💪",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const loadHistoryItem = (historyItem) => {
    const userMessage = {
      text: historyItem.question,
      isUser: true,
      timestamp: new Date(historyItem.timestamp)
    };

    const botMessage = {
      text: historyItem.answer,
      isUser: false,
      timestamp: new Date(historyItem.timestamp.getTime() + 1000)
    };

    setMessages([
      {
        text: "Hello! I'm your Fitness & Health Assistant. Ask me about workouts, nutrition, weight loss, or general health! 💪",
        isUser: false,
        timestamp: new Date()
      },
      userMessage, 
      botMessage
    ]);
    setShowHistory(false);
  };

  const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return '--:--';
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Enhanced animation variants with mobile optimizations
  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 10 : 20,
      scale: isMobile ? 0.9 : 0.8,
      filter: "blur(2px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: isMobile ? 300 : 400,
        damping: isMobile ? 25 : 30,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      x: isMobile ? -50 : -100,
      filter: "blur(2px)",
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.1
      }
    }
  };

  const typingVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const dotVariants = {
    animate: {
      y: ["0%", "-100%", "0%"],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const historyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const floatingElements = [
    { size: "w-3 h-3 sm:w-4 sm:h-4", color: "bg-orange-400", delay: 0, duration: 4 },
    { size: "w-2 h-2 sm:w-3 sm:h-3", color: "bg-green-500", delay: 0.5, duration: 5 },
    { size: "w-4 h-4 sm:w-5 sm:h-5", color: "bg-green-600", delay: 1, duration: 6 },
    { size: "w-2 h-2 sm:w-3 sm:h-3", color: "bg-orange-500", delay: 1.5, duration: 4.5 },
  ];

  // Theme classes with mobile optimizations
  const themeClasses = {
    container: isDarkMode 
      ? 'bg-gray-900 border-green-800' 
      : 'bg-white border-green-200',
    header: isDarkMode
      ? 'bg-gradient-to-br from-green-800 via-green-700 to-orange-700 border-green-900'
      : 'bg-gradient-to-br from-green-700 via-green-600 to-orange-600 border-green-800',
    messagesBg: isDarkMode
      ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800'
      : 'bg-gradient-to-br from-green-50 via-white to-orange-50',
    inputBg: isDarkMode
      ? 'bg-gray-800 border-green-700'
      : 'bg-white border-green-200',
    inputText: isDarkMode
      ? 'text-white placeholder-gray-400'
      : 'text-gray-800 placeholder-gray-500',
    inputBorder: isDarkMode
      ? 'border-green-600 focus:border-green-500'
      : 'border-green-300 focus:border-green-500',
    messageUser: isDarkMode
      ? 'bg-gradient-to-br from-orange-600 to-orange-800 text-white'
      : 'bg-gradient-to-br from-orange-500 to-orange-700 text-white',
    messageBot: isDarkMode
      ? 'bg-gray-800 text-white border-green-700'
      : 'bg-white text-gray-800 border-green-200',
    messageTimeUser: isDarkMode
      ? 'text-orange-200'
      : 'text-orange-100',
    messageTimeBot: isDarkMode
      ? 'text-gray-400'
      : 'text-gray-500',
    typingBg: isDarkMode
      ? 'bg-gray-800 border-green-700'
      : 'bg-white border-green-200',
    typingText: isDarkMode
      ? 'text-gray-300'
      : 'text-gray-600',
    hintBg: isDarkMode
      ? 'bg-gray-800 border-green-700 text-gray-300'
      : 'bg-green-50 border-green-200 text-gray-600',
    buttonBg: isDarkMode
      ? 'bg-gradient-to-br from-green-700 to-green-900 border-green-800 hover:from-green-800 hover:to-green-950'
      : 'bg-gradient-to-br from-green-600 to-green-800 border-green-700 hover:from-green-700 hover:to-green-900',
    buttonDisabled: isDarkMode
      ? 'bg-gray-700 cursor-not-allowed'
      : 'bg-gray-400 cursor-not-allowed',
    historyBg: isDarkMode
      ? 'bg-gray-800 border-green-700'
      : 'bg-white border-green-200',
    historyText: isDarkMode
      ? 'text-gray-200'
      : 'text-gray-800',
    historyItemBg: isDarkMode
      ? 'bg-gray-700 hover:bg-gray-600 border-green-600'
      : 'bg-green-50 hover:bg-green-100 border-green-200'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className={`w-full h-full max-w-4xl mx-auto rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden flex flex-col border sm:border-2 md:border-4 relative transition-colors duration-300 ${themeClasses.container}`}
      style={{ 
        height: '100dvh',
        maxHeight: '-webkit-fill-available'
      }}
    >
      {/* Animated background elements - Mobile optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} ${element.color} rounded-full ${isDarkMode ? 'opacity-5' : 'opacity-10'}`}
            initial={{
              x: Math.random() * (isMobile ? 60 : 80) - (isMobile ? 30 : 40),
              y: Math.random() * (isMobile ? 60 : 80) - (isMobile ? 30 : 40),
            }}
            animate={{
              x: [null, Math.random() * (isMobile ? 60 : 80) - (isMobile ? 30 : 40), Math.random() * (isMobile ? 60 : 80) - (isMobile ? 30 : 40)],
              y: [null, Math.random() * (isMobile ? 60 : 80) - (isMobile ? 30 : 40), Math.random() * (isMobile ? 60 : 80) - (isMobile ? 30 : 40)],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: element.delay,
            }}
            style={{
              left: `${isMobile ? 10 + index * 20 : 15 + index * 25}%`,
              top: `${isMobile ? 20 + index * 15 : 25 + index * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Header - Mobile Optimized */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-white p-3 sm:p-4 md:p-5 lg:p-6 relative overflow-hidden border-b sm:border-b-2 md:border-b-4 transition-colors duration-300 ${themeClasses.header}`}
      >
        {/* Animated header background pattern */}
        <motion.div 
          className="absolute inset-0"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'white'} 2px, transparent 0)`,
            backgroundSize: isMobile ? '30px 30px' : '40px 40px',
            opacity: isDarkMode ? 0.05 : 0.1
          }}
        />
        
        <div className="relative z-10 flex items-center justify-between">
          {/* Left side - Dark Mode Toggle and History Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 shadow ${
                isDarkMode 
                  ? 'bg-orange-500 border-orange-300' 
                  : 'bg-green-500 border-green-300'
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>

            {/* History Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleHistory}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 shadow ${
                isDarkMode 
                  ? 'bg-green-600 border-green-400' 
                  : 'bg-green-500 border-green-300'
              }`}
              aria-label="View chat history"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.button>
          </div>

          {/* Center - Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow border ${isDarkMode ? 'border-orange-300' : 'border-white'}`}>
                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl">🏋️</span>
              </div>
            </motion.div>
            
            <div className="flex-1 min-w-0 text-center max-w-[120px] sm:max-w-none">
              <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
                className="text-sm sm:text-lg md:text-xl lg:text-3xl font-bold mb-0 sm:mb-1 md:mb-2 drop-shadow truncate"
              >
                {isMobile ? 'Fitness Pro' : 'Fitness & Health Pro'}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="opacity-95 font-medium text-green-100 text-xs sm:text-sm md:text-base truncate hidden sm:block"
              >
                Your personal AI trainer & nutritionist
              </motion.p>
            </div>
          </div>

          {/* Right side - Close Button (Orange, Green, Black) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm border-2 transition-all duration-300 shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-br from-orange-600 via-green-600 to-black border-orange-400 hover:from-orange-700 hover:via-green-700 hover:to-gray-900' 
                : 'bg-gradient-to-br from-orange-500 via-green-500 to-gray-800 border-orange-300 hover:from-orange-600 hover:via-green-600 hover:to-gray-900'
            }`}
            aria-label="Close chatbot"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
        
        {/* Animated decorative elements - Mobile optimized */}
        <motion.div 
          className={`absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full opacity-20 ${
            isDarkMode ? 'bg-orange-400' : 'bg-orange-500'
          }`}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className={`absolute -bottom-6 -left-6 sm:-bottom-7 sm:-left-7 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full opacity-30 ${
            isDarkMode ? 'bg-green-900' : 'bg-green-800'
          }`}
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Chat History Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            variants={historyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute inset-0 z-50 flex flex-col ${themeClasses.historyBg} border sm:border-2 md:border-4 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl`}
          >
            {/* History Header */}
            <div className={`p-3 sm:p-4 md:p-5 lg:p-6 border-b sm:border-b-2 md:border-b-4 ${themeClasses.header}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-orange-500' : 'bg-orange-400'}`}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                      Chat History
                    </h3>
                    <p className="text-green-100 text-xs sm:text-sm">
                      {chatHistory.length} conversation{chatHistory.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {chatHistory.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearHistory}
                      className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-red-600 hover:bg-red-700 border-red-400 text-white' 
                          : 'bg-red-500 hover:bg-red-600 border-red-300 text-white'
                      }`}
                    >
                      Clear All
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleHistory}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-orange-600 border-orange-400 hover:bg-orange-700' 
                        : 'bg-orange-500 border-orange-300 hover:bg-orange-600'
                    }`}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* History Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6">
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                  }`}>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 ${themeClasses.historyText}`}>
                    No History Yet
                  </h3>
                  <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                    Your chat history will appear here. Start a conversation to see your questions and answers!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {[...chatHistory].reverse().map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => loadHistoryItem(item)}
                      className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${themeClasses.historyItemBg}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold text-sm sm:text-base ${themeClasses.historyText} line-clamp-2 flex-1 mr-2`}>
                          {item.question}
                        </h4>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex-shrink-0`}>
                          {formatTime(item.timestamp)}
                        </span>
                      </div>
                      {item.answer && (
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                          {item.answer}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {formatDate(item.timestamp)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDarkMode 
                            ? 'bg-green-800 text-green-200' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.answer ? 'Answered' : 'Pending...'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container - Mobile Optimized */}
      <div className={`flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 lg:p-6 relative transition-colors duration-300 ${themeClasses.messagesBg}`}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2 sm:space-y-3 md:space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                layout
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ 
                    scale: isMobile ? 1.01 : 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-5 shadow-md sm:shadow-lg md:shadow-xl transition-colors duration-300 ${
                    message.isUser
                      ? themeClasses.messageUser
                      : themeClasses.messageBot
                  }`}
                >
                  {/* Message tail - Hidden on very small screens */}
                  <div className="hidden xs:block">
                    {!message.isUser && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -left-1 sm:-left-1.5 md:-left-2 top-0 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 transform rotate-45 ${
                          isDarkMode 
                            ? 'bg-gray-800 border-l border-b border-green-700' 
                            : 'bg-white border-l border-b border-green-200'
                        }`}
                      />
                    )}
                    {message.isUser && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 sm:-right-1.5 md:-right-2 top-0 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-orange-600 transform rotate-45"
                      />
                    )}
                  </div>
                  
                  <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm md:text-base">{message.text}</p>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-[10px] sm:text-xs mt-1 sm:mt-2 md:mt-3 block font-medium ${
                      message.isUser ? themeClasses.messageTimeUser : themeClasses.messageTimeBot
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Enhanced Typing Indicator - Mobile optimized */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-start"
            >
              <div className={`relative max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-xl sm:rounded-2xl md:rounded-3xl rounded-bl-sm p-2 sm:p-3 md:p-4 lg:p-5 shadow-md sm:shadow-lg border transition-colors duration-300 ${themeClasses.typingBg}`}>
                {/* Typing tail - Hidden on very small screens */}
                <div className={`hidden xs:block absolute -left-1 sm:-left-1.5 md:-left-2 top-0 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 transform rotate-45 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-l border-b border-green-700' 
                    : 'bg-white border-l border-b border-green-200'
                }`} />
                
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <motion.div 
                    className="flex space-x-1"
                    variants={typingVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div 
                      variants={dotVariants}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-500 rounded-full"
                    ></motion.div>
                    <motion.div 
                      variants={dotVariants}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-orange-500 rounded-full"
                    ></motion.div>
                    <motion.div 
                      variants={dotVariants}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-green-600 rounded-full"
                    ></motion.div>
                  </motion.div>
                  <span className={`text-xs sm:text-sm md:text-base font-medium ${themeClasses.typingText}`}>
                    Thinking...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </motion.div>
      </div>

      {/* Input Area - Mobile Optimized */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`p-2 sm:p-3 md:p-4 lg:p-6 border-t sm:border-t-2 md:border-t-4 transition-colors duration-300 ${themeClasses.container}`}
      >
        <form onSubmit={handleSendMessage} className="flex space-x-2 sm:space-x-3 md:space-x-4">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about workouts, nutrition, health..."
            className={`flex-1 rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-sm ${themeClasses.inputBg} ${themeClasses.inputText} ${themeClasses.inputBorder}`}
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            disabled={isLoading || !inputMessage.trim()}
            className={`rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white border-2 transition-all duration-300 shadow-sm flex items-center justify-center min-w-[60px] sm:min-w-[80px] md:min-w-[100px] ${
              isLoading || !inputMessage.trim() 
                ? themeClasses.buttonDisabled 
                : themeClasses.buttonBg
            } ${
              isDarkMode 
                ? 'border-green-600' 
                : 'border-green-500'
            }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <span className="flex items-center space-x-1 sm:space-x-2">
                <span>Send</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </motion.button>
        </form>
        
        {/* Quick Action Hints - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center"
        >
          {[
            "Weight loss tips",
            "Beginner workout",
            "Healthy recipes",
            "Muscle building"
          ].map((hint, index) => (
            <motion.button
              key={hint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setInputMessage(hint);
                // Auto-send after a brief delay
                setTimeout(() => {
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }, 100);
              }}
              className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-md ${themeClasses.hintBg}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              {hint}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Chatbot;