// UserProfile.jsx
import React, { useState, useEffect } from "react";
import { db } from "../Config/firebaseconfig";
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const UserProfile = ({ userData }) => {
  const [profileData, setProfileData] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [userId, setUserId] = useState(null);

  // Initialize auth and listen for user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to real-time Firestore updates
  useEffect(() => {
    if (!userId) return;

    const userDocRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setProfileData(userData);

        // Save to localStorage for persistence
        localStorage.setItem("userFitnessProfile", JSON.stringify(userData));

        // Set registration date if not exists
        const savedRegistrationDate = localStorage.getItem(
          "userRegistrationDate"
        );
        if (!savedRegistrationDate) {
          const currentDate = new Date().toISOString();
          localStorage.setItem("userRegistrationDate", currentDate);
          setRegistrationDate(currentDate);
        } else {
          setRegistrationDate(savedRegistrationDate);
        }
      }
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    // Load profile data from localStorage on component mount as fallback
    const savedProfile = localStorage.getItem("userFitnessProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }

    // Load registration date from localStorage
    const savedRegistrationDate = localStorage.getItem("userRegistrationDate");
    if (savedRegistrationDate) {
      setRegistrationDate(savedRegistrationDate);
    }
  }, []);

  useEffect(() => {
    // Update profile data when userData prop changes
    if (userData) {
      setProfileData(userData);
      // Save to localStorage
      localStorage.setItem("userFitnessProfile", JSON.stringify(userData));

      // Set registration date only if it doesn't exist (first time registration)
      const savedRegistrationDate = localStorage.getItem(
        "userRegistrationDate"
      );
      if (!savedRegistrationDate) {
        const currentDate = new Date().toISOString();
        localStorage.setItem("userRegistrationDate", currentDate);
        setRegistrationDate(currentDate);
      }
    }
  }, [userData]);

  // Add listener for localStorage changes (for cross-component updates)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userFitnessProfile" && e.newValue) {
        setProfileData(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Format registration date for display
  const formatRegistrationDate = () => {
    if (!registrationDate) {
      return new Date().toLocaleDateString();
    }
    return new Date(registrationDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-green-300 text-lg font-semibold">
            Loading your fitness profile...
          </p>
          <p className="text-green-200 mt-2">
            Please complete the user form to see your profile
          </p>
        </div>
      </div>
    );
  }

  // Helper function to format labels
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Helper function to get display value
  const getDisplayValue = (key, value) => {
    if (key === "gender") {
      return value === "male" ? "Male ♂" : "Female ♀";
    }

    if (key === "fitnessGoal") {
      const goals = {
        weightLoss: "Fat Loss 🔥",
        cutting: "Cutting Phase ✂️",
        leanMuscle: "Lean Muscle 💪",
        muscleGain: "Mass Building 🏋️",
        bulking: "Bulking Phase 📈",
        muscleTone: "Toning ✨",
        maintenance: "Maintenance ⚖️",
        performance: "Athletic Performance 🏃",
      };
      return goals[value] || value;
    }

    if (key === "activityLevel") {
      const levels = {
        sedentary: "Desk Job 💺",
        light: "Light Active 🚶",
        moderate: "Moderately Active 🏃",
        active: "Very Active 🚴",
      };
      return levels[value] || value;
    }

    if (key === "workoutPreference") {
      const preferences = {
        bodybuilding: "Bodybuilding 🏋️",
        powerlifting: "Powerlifting 💪",
        calisthenics: "Calisthenics 🤸",
      };
      return preferences[value] || value;
    }

    if (key === "fitnessLevel") {
      const levels = {
        beginner: "New Starter 🌱",
        intermediate: "Regular Trainee 🌿",
        advanced: "Advanced Lifter 🦾",
        elite: "Elite Athlete 🏆",
      };
      return levels[value] || value;
    }

    if (key === "hasMedicalConditions") {
      return value ? "Yes 🏥" : "No ✅";
    }

    if (key === "selectedDays") {
      return value && value.length > 0 ? value.join(", ") : "No days selected";
    }

    if (key === "preferredWorkoutDays") {
      return value ? `${value} day${value > 1 ? "s" : ""} per week` : "Not set";
    }

    if (key === "medicalConditions" && !profileData.hasMedicalConditions) {
      return "None reported";
    }

    return value || "Not set";
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/Kyrie-fitness gym.jpg(1).jpg"
          alt="Gym background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-green-900/20 to-black/90 backdrop-blur-sm"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/90 via-green-900/60 to-gray-900/90 rounded-3xl p-6 md:p-8 mb-6 border border-green-500/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-full shadow-lg shadow-green-500/50 border border-green-400/50">
                <img
                  src="/images/Kyrie-fitness gym.jpg"
                  alt="ASH-FIT Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-300 tracking-wider">
                  FITNESS PROFILE
                </h1>
                <p className="text-green-300 text-sm font-bold tracking-wide">
                  ASH<span className="text-green-400">FIT</span> Personal
                  Training
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-2 rounded-xl border border-green-400/30">
                <p className="text-white text-sm font-bold">Member Since</p>
                <p className="text-green-200 font-semibold">
                  {formatRegistrationDate()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info & Stats */}
          <div className="space-y-6">
            {/* Personal Information Card */}
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border border-green-500/30 shadow-xl">
              <h2 className="text-xl font-bold text-green-300 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-3">
                  👤
                </span>
                PERSONAL INFORMATION
              </h2>
              <div className="space-y-4">
                {["age", "weight", "height", "gender"].map((field) => (
                  <div
                    key={field}
                    className="flex justify-between items-center py-2 border-b border-green-500/20"
                  >
                    <span className="text-green-200 font-semibold text-sm">
                      {formatLabel(field)}
                    </span>
                    <span className="text-white font-bold">
                      {getDisplayValue(field, profileData[field])}
                      {field === "weight" && " kg"}
                      {field === "height" && " cm"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fitness Stats Card */}
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border border-green-500/30 shadow-xl">
              <h2 className="text-xl font-bold text-green-300 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-3">
                  📊
                </span>
                FITNESS STATS
              </h2>
              <div className="space-y-4">
                {[
                  "fitnessGoal",
                  "activityLevel",
                  "fitnessLevel",
                  "workoutPreference",
                ].map((field) => (
                  <div
                    key={field}
                    className="flex justify-between items-center py-2 border-b border-green-500/20"
                  >
                    <span className="text-green-200 font-semibold text-sm">
                      {formatLabel(field)}
                    </span>
                    <span className="text-white font-bold text-right text-sm">
                      {getDisplayValue(field, profileData[field])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Workout Schedule */}
          <div className="space-y-6">
            {/* Workout Schedule Card */}
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border border-green-500/30 shadow-xl h-full">
              <h2 className="text-xl font-bold text-green-300 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-3">
                  📅
                </span>
                WORKOUT SCHEDULE
              </h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-200 font-semibold">
                    Training Frequency
                  </span>
                  <span className="text-white font-bold bg-gradient-to-r from-green-600 to-green-800 px-3 py-1 rounded-lg text-sm">
                    {getDisplayValue(
                      "preferredWorkoutDays",
                      profileData.preferredWorkoutDays
                    )}
                  </span>
                </div>

                {/* Mobile-friendly workout days grid */}
                <div className="workout-days-grid">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day, index) => {
                    const isSelected =
                      profileData.selectedDays &&
                      profileData.selectedDays.includes(day);
                    return (
                      <div
                        key={day}
                        className={`workout-day-item ${
                          isSelected
                            ? "workout-day-selected"
                            : "workout-day-unselected"
                        }`}
                      >
                        <div className="workout-day-abbr">
                          {day.slice(0, 3)}
                        </div>
                        <div className="workout-day-full">{day}</div>
                        <div className="workout-day-number">{index + 1}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-4">
                  <p className="text-green-300 font-bold bg-gradient-to-r from-green-900/50 to-black/50 p-2 rounded-lg text-sm">
                    SELECTED:{" "}
                    {(profileData.selectedDays &&
                      profileData.selectedDays.length) ||
                      0}
                    /{profileData.preferredWorkoutDays || 0} DAYS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Medical Information */}
          <div className="space-y-6">
            {/* Medical Information Card */}
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border border-green-500/30 shadow-xl">
              <h2 className="text-xl font-bold text-green-300 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-3">
                  🏥
                </span>
                MEDICAL INFORMATION
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                  <span className="text-green-200 font-semibold text-sm">
                    Medical Conditions
                  </span>
                  <span className="text-white font-bold">
                    {getDisplayValue(
                      "hasMedicalConditions",
                      profileData.hasMedicalConditions
                    )}
                  </span>
                </div>

                {profileData.hasMedicalConditions &&
                  profileData.medicalConditions && (
                    <div className="mt-4">
                      <span className="text-green-200 font-semibold text-sm block mb-2">
                        Condition Details:
                      </span>
                      <div className="bg-gradient-to-b from-gray-800 to-black p-4 rounded-xl border border-green-500/20">
                        <p className="text-white text-sm">
                          {profileData.medicalConditions}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Workout Plan Info Card */}
            <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl p-6 border border-green-500/30 shadow-xl">
              <h2 className="text-xl font-bold text-green-300 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-green-500 to-green-700 p-1 rounded-lg mr-3">
                  💪
                </span>
                WORKOUT PLAN
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                  <span className="text-green-200 font-semibold text-sm">
                    Plan Status
                  </span>
                  <span className="text-white font-bold">
                    {profileData.generatedWorkoutPlan
                      ? "Active ✅"
                      : "Not Set ❌"}
                  </span>
                </div>

                {profileData.generatedWorkoutPlan &&
                  profileData.lastWorkoutPlanUpdate && (
                    <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                      <span className="text-green-200 font-semibold text-sm">
                        Last Updated
                      </span>
                      <span className="text-white font-bold text-sm">
                        {new Date(
                          profileData.lastWorkoutPlanUpdate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                {profileData.generatedWorkoutPlan && (
                  <div className="mt-4">
                    <span className="text-green-200 font-semibold text-sm block mb-2">
                      Plan Details:
                    </span>
                    <div className="bg-gradient-to-b from-gray-800 to-black p-4 rounded-xl border border-green-500/20">
                      <p className="text-white text-sm">
                        {profileData.generatedWorkoutPlan.length || 0} workout
                        days
                      </p>
                      <p className="text-green-400 text-xs mt-1">
                        Customized for{" "}
                        {profileData.fitnessLevel || "your level"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bg-gradient-to-br from-gray-900/95 to-black/95 {
          animation: fadeIn 0.6s ease-out;
        }

        .shadow-xl {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Workout Schedule Mobile Styles */
        .workout-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 1rem;
        }

        .workout-day-item {
          padding: 8px 4px;
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 60px;
          justify-content: center;
        }

        .workout-day-selected {
          background: linear-gradient(135deg, #059669, #065f46);
          border: 1px solid rgba(34, 197, 94, 0.5);
          color: white;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .workout-day-unselected {
          background: linear-gradient(to bottom, #1f2937, #000);
          border: 1px solid rgba(5, 150, 105, 0.3);
          color: #bbf7d0;
        }

        .workout-day-abbr {
          font-weight: bold;
          font-size: 0.75rem;
          margin-bottom: 2px;
        }

        .workout-day-full {
          display: none;
          font-size: 0.7rem;
          opacity: 0.9;
        }

        .workout-day-number {
          font-size: 0.7rem;
          opacity: 0.8;
          margin-top: 2px;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .workout-days-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
          }

          .workout-day-item {
            padding: 10px 6px;
            min-height: 70px;
          }

          .workout-day-abbr {
            font-size: 0.8rem;
          }

          .workout-day-number {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .workout-days-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }

          .workout-day-item {
            padding: 12px 8px;
            min-height: 75px;
          }

          .workout-day-abbr {
            font-size: 0.85rem;
          }

          .workout-day-full {
            display: block;
          }

          .workout-day-number {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .workout-days-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .workout-day-item {
            padding: 14px 8px;
            min-height: 80px;
          }

          .workout-day-abbr {
            font-size: 0.9rem;
          }

          .workout-day-full {
            font-size: 0.75rem;
          }

          .workout-day-number {
            font-size: 0.8rem;
          }
        }

        /* For very small screens */
        @media (max-width: 320px) {
          .workout-days-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }

          .workout-day-item {
            padding: 10px 6px;
            min-height: 70px;
          }

          .workout-day-abbr {
            font-size: 0.8rem;
          }

          .workout-day-full {
            font-size: 0.7rem;
          }
        }

        /* Desktop styles */
        @media (min-width: 769px) {
          .workout-days-grid {
            gap: 8px;
          }

          .workout-day-item {
            padding: 12px 8px;
            min-height: 80px;
          }

          .workout-day-abbr {
            font-size: 0.9rem;
          }

          .workout-day-full {
            display: block;
          }

          .workout-day-number {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
