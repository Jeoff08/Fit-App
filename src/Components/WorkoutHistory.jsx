// import React, { useState } from 'react';

// const WorkoutHistory = ({ completedWorkouts = [], onClearHistory, onWorkoutComplete }) => {
//   const [expandedWorkout, setExpandedWorkout] = useState(null);

//   const toggleWorkout = (index) => {
//     if (expandedWorkout === index) {
//       setExpandedWorkout(null);
//     } else {
//       setExpandedWorkout(index);
//     }
//   };

//   const formatDuration = (duration) => {
//     if (typeof duration === 'string') {
//       return duration;
//     }
//     if (typeof duration === 'number') {
//       const minutes = Math.floor(duration / 60);
//       const seconds = duration % 60;
//       return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     }
//     return '00:00';
//   };

//   // Function to handle when a workout is marked as complete
//   const handleWorkoutComplete = (workout) => {
//     if (onWorkoutComplete) {
//       // Add current date and time to the workout
//       const now = new Date();
//       const completedWorkout = {
//         ...workout,
//         completionDate: now.toISOString().split('T')[0], // YYYY-MM-DD format
//         completionTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//         dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }) // Full day name
//       };
//       onWorkoutComplete(completedWorkout);
//     }
//   };

//   if (!completedWorkouts || completedWorkouts.length === 0) {
//     return (
//       <div className="bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800">
//         <div className="flex items-center justify-between mb-4 md:mb-6">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 md:p-3 rounded-full mr-3 md:mr-4 shadow-lg">
//               <i className="fas fa-history text-white text-lg md:text-xl"></i>
//             </div>
//             <h2 className="text-xl md:text-2xl font-bold text-white">Workout History</h2>
//           </div>
//         </div>
//         <div className="text-center py-6 md:py-8">
//           <i className="fas fa-clipboard-list text-3xl md:text-4xl text-gray-600 mb-3 md:mb-4"></i>
//           <p className="text-gray-400 text-sm md:text-base">No completed workouts yet.</p>
//           <p className="text-xs md:text-sm text-gray-500 mt-2">
//             Complete your first workout to see it here!
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 border border-gray-800">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
//         <div className="flex items-center">
//           <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 md:p-3 rounded-full mr-3 md:mr-4 shadow-lg">
//             <i className="fas fa-history text-white text-lg md:text-xl"></i>
//           </div>
//           <div>
//             <h2 className="text-xl md:text-2xl font-bold text-white">Workout History</h2>
//             <p className="text-gray-400 text-xs md:text-sm">
//               {completedWorkouts.length} completed workout{completedWorkouts.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={onClearHistory}
//           className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full md:w-auto"
//         >
//           <i className="fas fa-trash mr-2"></i>
//           Clear History
//         </button>
//       </div>

//       <div className="space-y-3 md:space-y-4">
//         {completedWorkouts.map((workout, index) => (
//           <div
//             key={index}
//             className="bg-gray-800 border border-gray-700 rounded-2xl p-4 md:p-5 hover:shadow-xl transition-all duration-300"
//           >
//             <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
//               <div className="flex items-start">
//                 <div className="bg-gradient-to-r from-green-600 to-teal-600 p-1.5 md:p-2 rounded-lg mr-2 md:mr-3">
//                   <i className="fas fa-dumbbell text-white text-xs md:text-sm"></i>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-bold text-white text-base md:text-lg">
//                     {workout.dayName}
//                   </h4>
//                   {workout.influencer && (
//                     <p className="text-orange-300 text-xs md:text-sm font-medium mt-1">
//                       By {workout.influencer}
//                     </p>
//                   )}
//                   <p className="text-gray-400 text-xs mt-1">
//                     {workout.completionDate} at {workout.completionTime}
//                   </p>
//                   {workout.dayOfWeek && (
//                     <p className="text-blue-300 text-xs mt-1">
//                       {workout.dayOfWeek}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-col items-end gap-2">
//                 <span className="bg-gradient-to-r from-green-900 to-teal-900 text-green-200 text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full">
//                   {workout.isPartial ? 'Partial' : 'Completed'}
//                 </span>
//                 <span className="text-green-400 text-xs font-medium">
//                   {formatDuration(workout.duration)}
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 text-xs md:text-sm mb-3 md:mb-4">
//               <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-2 md:p-3 rounded-xl text-center border border-gray-600 shadow-inner">
//                 <div className="text-green-400 font-bold text-base md:text-lg">
//                   {workout.exercises.length}
//                 </div>
//                 <div className="text-gray-400 text-xs mt-1">Exercises</div>
//               </div>
//               <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-2 md:p-3 rounded-xl text-center border border-gray-600 shadow-inner">
//                 <div className="text-green-400 font-bold text-base md:text-lg">
//                   {workout.totalSets}
//                 </div>
//                 <div className="text-gray-400 text-xs mt-1">Total Sets</div>
//               </div>
//               <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-2 md:p-3 rounded-xl text-center border border-gray-600 shadow-inner">
//                 <div className="text-green-400 font-bold text-base md:text-lg">
//                   {workout.exercises.reduce((total, ex) => total + parseInt(ex.reps || 0) * parseInt(ex.sets || 0), 0)}
//                 </div>
//                 <div className="text-gray-400 text-xs mt-1">Total Reps</div>
//               </div>
//               <div className="bg-gradient-to-b from-green-900 to-teal-900 p-2 md:p-3 rounded-xl text-center border border-green-700 shadow-inner">
//                 <div className="text-green-300 font-bold text-base md:text-lg">
//                   {workout.splitName ? workout.splitName.substring(0, 8) + '...' : 'Custom'}
//                 </div>
//                 <div className="text-green-300 text-xs mt-1">Program</div>
//               </div>
//             </div>

//             {expandedWorkout === index && (
//               <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700 animate-fadeIn">
//                 <h5 className="text-green-400 font-semibold mb-2 md:mb-3 flex items-center text-sm md:text-base">
//                   <i className="fas fa-list-ol mr-2"></i>
//                   Exercises Completed
//                 </h5>
//                 <div className="space-y-2 md:space-y-3">
//                   {workout.exercises.map((exercise, exIndex) => (
//                     <div
//                       key={exIndex}
//                       className="bg-gray-750 p-2 md:p-3 rounded-xl border border-gray-600"
//                     >
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
//                         <span className="text-white font-medium text-sm md:text-base">
//                           {exercise.name}
//                         </span>
//                         <span className="text-green-400 text-xs md:text-sm">
//                           {exercise.sets} sets × {exercise.reps} reps
//                         </span>
//                       </div>
//                       {exercise.suggestedWeight && (
//                         <div className="text-orange-300 text-xs mt-1">
//                           Suggested: {exercise.suggestedWeight} kg
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700 gap-2">
//               <div className="text-xs text-gray-400 flex items-center">
//                 <i className="fas fa-clock text-green-500 mr-1"></i>
//                 Completed in {formatDuration(workout.duration)}
//                 {workout.influencer && (
//                   <span className="ml-2 text-orange-300">
//                     • {workout.influencer}
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={() => toggleWorkout(index)}
//                 className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center justify-center"
//               >
//                 <i
//                   className={`fas ${expandedWorkout === index ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}
//                 ></i>
//                 {expandedWorkout === index ? 'Hide' : 'Show'} Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkoutHistory;