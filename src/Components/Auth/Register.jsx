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
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions to register');
      return;
    }
    
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

      // Create user document in Firestore with terms acceptance
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email,
        createdAt: new Date(),
        agreedToTerms: true,
        termsAcceptedAt: new Date(),
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
      {/* Dynamic Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/Kyrie-fitness gym.jpg" 
          alt="Gym background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-90 backdrop-filter backdrop-blur-sm"></div>
      </div>
      
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
      
      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-green-500/30 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col sm:p-8">
            {/* Header */}
            <div className="text-center mb-6 flex-shrink-0">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-file-contract text-green-400 text-2xl mr-3"></i>
                <h3 className="text-xl font-bold text-white">Terms & Conditions</h3>
              </div>
            </div>
            
            {/* Terms Content */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-green-500/30 flex-1 overflow-y-auto mb-6">
              <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                <div>
                  <h4 className="text-green-400 font-bold text-lg mb-2">IMPORTANT LEGAL DISCLAIMER</h4>
                  <p className="mb-3">
                    <strong>Please read these terms and conditions carefully before using ASH-FIT.</strong> By creating an account, you acknowledge that you have read, understood, and agree to be bound by all terms outlined below.
                  </p>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">1. User Responsibility & Accuracy of Information</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>You are solely responsible for the accuracy and completeness of all personal information, health data, fitness levels, and medical history provided to ASH-FIT</li>
                    <li>All fitness recommendations, workout plans, nutritional guidance, and health suggestions are generated based EXCLUSIVELY on the information you provide</li>
                    <li>Any misrepresentation, omission, or false information provided by you may result in inappropriate, ineffective, or potentially harmful recommendations</li>
                    <li>ASH-FIT cannot be held responsible for outcomes resulting from inaccurate or incomplete user-provided information</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">2. Medical Disclaimer</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>ASH-FIT is NOT a medical service, healthcare provider, or substitute for professional medical advice</li>
                    <li>You MUST consult with qualified healthcare professionals before starting any fitness or nutrition program</li>
                    <li>If you have pre-existing medical conditions, injuries, or concerns, you are required to obtain medical clearance before using our services</li>
                    <li>Stop exercising immediately and seek medical attention if you experience pain, dizziness, shortness of breath, or any unusual symptoms</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">3. Assumption of Risk</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>You voluntarily assume all risks and dangers associated with physical exercise and dietary changes</li>
                    <li>You accept full responsibility for any injury, loss, or damage that may occur during or as a result of using ASH-FIT recommendations</li>
                    <li>You understand that results vary based on individual factors including genetics, commitment, and adherence to programs</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">4. System Output Disclaimer</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>All recommendations, workout plans, nutritional advice, fitness assessments, and health guidance provided by ASH-FIT are generated SOLELY based on the personal information you input into the system</li>
                    <li>The quality, accuracy, safety, and effectiveness of ASH-FIT's output is DIRECTLY DEPENDENT on the accuracy, completeness, and truthfulness of the information you provide</li>
                    <li>ASH-FIT functions as an information processing system - it cannot verify, validate, or confirm the truthfulness of user-provided data</li>
                    <li>You acknowledge that the system's recommendations are only as reliable as the data you supply, and any false information will produce correspondingly unreliable results</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">5. Liability Limitation</h5>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>ASH-FIT, its developers, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the application</li>
                    <li>This includes but is not limited to personal injury, property damage, financial loss, or any other damages arising from reliance on our recommendations</li>
                    <li>You agree to indemnify and hold harmless ASH-FIT from any claims resulting from your use of the service or violation of these terms</li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">6. Age Requirement</h5>
                  <p>You must be at least 18 years old to use ASH-FIT. Users under 18 require parental consent and supervision.</p>
                </div>

                <div>
                  <h5 className="text-green-300 font-semibold mb-2">7. Data Accuracy Acknowledgement</h5>
                  <p className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
                    <strong>SPECIFIC ACKNOWLEDGEMENT:</strong> I understand that by providing inaccurate health information or lying about my medical conditions, fitness level, or capabilities, I assume full responsibility for any negative consequences. ASH-FIT's recommendations are only as accurate as the information I provide. The system outputs exactly what it calculates from my inputs, and I accept complete responsibility for ensuring my inputs are truthful and accurate.
                  </p>
                </div>

                <div className="text-xs text-gray-400 mt-6">
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                  <p>By checking the agreement box, you confirm your understanding and acceptance of these terms.</p>
                </div>
              </div>
            </div>
            
            {/* Agreement Checkbox */}
            <div className="flex items-start mb-6 p-3 bg-gray-800/30 rounded-lg border border-green-500/20 flex-shrink-0">
              <input
                type="checkbox"
                id="termsAgree"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2 mt-1 flex-shrink-0"
              />
              <label htmlFor="termsAgree" className="ml-3 text-sm text-gray-300">
                I have read, understood, and agree to all terms and conditions outlined above. I accept full responsibility for my health and fitness journey and acknowledge that ASH-FIT's recommendations are based solely on the accuracy of my provided information. I understand that the system outputs exactly what it calculates from my inputs, and I am solely responsible for ensuring my information is truthful and complete.
              </label>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 flex-shrink-0">
              <button
                onClick={() => setShowTerms(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (agreedToTerms) {
                    setShowTerms(false);
                  } else {
                    setError('Please agree to the terms to continue');
                  }
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                disabled={!agreedToTerms}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Container with Enhanced Glassmorphism Effect */}
      <div className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-green-500/30 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/90 z-20 transition-all duration-500 hover:scale-[1.01] overflow-hidden sm:max-w-md sm:p-8 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-slide-glow"></div>

        {/* Header with Enhanced Animated Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:space-x-3 sm:mb-4">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-full shadow-2xl shadow-green-400/30 transform hover:rotate-12 transition-transform duration-300 animate-float-slow sm:p-4">
                <div className="bg-black p-1.5 rounded-full sm:p-2">
                  <img 
                    src="/images/Kyrie-fitness gym.jpg" 
                    alt="ASH-FIT Logo" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-400 sm:w-16 sm:h-16"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-widest uppercase animate-text-glow-slow sm:text-5xl">
                ASH<span className="text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">FIT</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-300 text-xs mt-1 font-light tracking-wide animate-fade-in-slow sm:text-sm sm:mt-2">
            Build Your Legacy, One Rep at a Time
          </p>
        </div>
        
        {/* System Disclaimer Banner */}
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-400 text-xs">
            <i className="fas fa-info-circle"></i>
            <span className="font-semibold">SYSTEM DISCLAIMER:</span>
            <span>All recommendations are based solely on your provided information</span>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="space-y-4 sm:space-y-6">
          {error && (
            <div className="p-3 bg-red-600/20 text-red-300 rounded-xl border border-red-600/50 text-xs flex items-center animate-fade-in sm:p-4 sm:text-sm">
              <i className="fas fa-exclamation-triangle mr-2 text-red-400 text-sm sm:mr-3 sm:text-lg"></i>
              <span>{error}</span>
            </div>
          )}
          
          {/* Terms Agreement Section */}
          <div className="bg-gray-800/30 p-4 rounded-xl border border-green-500/20">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="registerAgree"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2 mt-1 flex-shrink-0"
              />
              <div>
                <label htmlFor="registerAgree" className="text-xs text-gray-300 cursor-pointer sm:text-sm">
                  I agree to the ASH-FIT Terms & Conditions and acknowledge that I am solely responsible for the accuracy of my health information. 
                  <button 
                    onClick={() => setShowTerms(true)}
                    className="text-green-400 hover:text-green-300 underline ml-1 font-semibold"
                  >
                    View Full Terms
                  </button>
                </label>
                <p className="text-xs text-gray-400 mt-1">
                  You must agree to continue with registration
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-id-card mr-1 sm:mr-2"></i>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-user text-green-400 text-xs sm:text-sm"></i>
                </div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-envelope mr-1 sm:mr-2"></i>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-at text-green-400 text-xs sm:text-sm"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="yourname@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-green-400 mb-1 uppercase tracking-wider sm:text-sm sm:mb-2">
                <i className="fas fa-lock mr-1 sm:mr-2"></i>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pl-4">
                  <i className="fas fa-key text-green-400 text-xs sm:text-sm"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/80 border-2 border-gray-700/60 text-white rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:border-green-400/50 backdrop-blur-sm sm:pl-12 sm:pr-4 sm:py-4 sm:text-sm"
                  placeholder="•••••••• (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center shadow-2xl shadow-green-500/40 mt-4 animate-pulse-soft group relative overflow-hidden sm:py-4 sm:text-sm sm:mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {loading ? (
                <>
                  <div className="flex items-center space-x-2 relative z-10 sm:space-x-3">
                    <span className="relative inline-flex items-center justify-center h-5 w-5 animate-spin sm:h-6 sm:w-6">
                      <i className="fas fa-dumbbell text-white text-sm sm:text-lg"></i>
                    </span>
                    <span className="text-xs tracking-wide font-semibold sm:text-sm">BUILDING...</span>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-dumbbell mr-2 text-xs group-hover:animate-bounce relative z-10 sm:mr-3 sm:text-sm"></i>
                  <span className="relative z-10">CONTINUE</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center sm:mt-8">
            <p className="text-gray-400 text-xs sm:text-sm">
              Already have an account?{' '}
              <button
                onClick={handleToggleAuthMode}
                disabled={isTransitioning || !agreedToTerms}
                className="text-green-400 font-bold hover:text-green-300 transition-all duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden px-3 py-1.5 rounded-lg bg-green-400/10 hover:bg-green-400/20 sm:px-4 sm:py-2"
              >
                <span className="relative z-10 flex items-center text-xs sm:text-sm">
                  SIGN IN
                  <i className="fas fa-running ml-2 text-xs group-hover:animate-pulse transition-transform duration-300 sm:ml-3 sm:text-sm"></i>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </button>
            </p>
          </div>
        </div>
        
        {/* Enhanced Footer with Security Message */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-900/80 to-black/90 border-t border-green-500/20 mt-6 -mx-6 -mb-6 rounded-b-2xl sm:px-8 sm:py-6 sm:mt-8 sm:-mx-8 sm:-mb-8">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <div className="flex items-center text-green-400">
              <i className="fas fa-shield-alt text-sm animate-pulse mr-1 sm:text-lg sm:mr-2"></i>
              <span className="text-xs uppercase tracking-widest font-semibold sm:text-sm">Secure Registration</span>
            </div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping sm:w-2 sm:h-2"></div>
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