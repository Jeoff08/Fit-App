// // Example component using workout images
// import React from 'react';
// import { getPopularWorkouts, getWorkoutImage } from './workouts.js';
// import WorkoutImage from './WorkoutImage';

// const PopularWorkoutsList = () => {
//   const popularWorkouts = getPopularWorkouts();
  
//   return (
//     <div className="popular-workouts">
//       <h2>Popular Workouts</h2>
//       <div className="workouts-grid">
//         {popularWorkouts.map(workout => (
//           <div key={workout.id} className="workout-card">
//             <WorkoutImage 
//               workout={workout} 
//               className="workout-card-image"
//             />
//             <div className="workout-card-content">
//               <h3>{workout.name}</h3>
//               <p>{workout.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularWorkoutsList;