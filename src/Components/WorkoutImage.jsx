// WorkoutImage.jsx
import React from 'react';

// Image mapping based on exercise names
const getWorkoutImage = (exerciseName) => {
  if (!exerciseName) return '';
  
  const name = exerciseName.toLowerCase();
  
  // Empty image mapping - ready for you to add images
  const imageMap = {
    // Chest exercises
    'cable chest press': '/public/GIF2.0/Seated-Cable-Chest-Press.gif',
    'bench press': '/public/WorkoutsImage/barbell-bench-press.gif',
    'barbell bench press': '/public/WorkoutsImage/barbell-bench-press.gif',
    'incline barbell press': '/public/WorkoutsImage/Barbell-Incline-Bench-Press_Chest.gif',
    'incline bench press': '/public/WorkoutsImage/Barbell-Incline-Bench-Press_Chest.gif',
    'decline barbell press': '/public/WorkoutsImage/BB_DEC_BP.gif',
    'decline bench press': '/public/WorkoutsImage/BB_DEC_BP.gif',
    'dumbbell press': '/public/GIF/Dumbbell-Press.gif',
    'dumbbell bench press': '/public/GIF/Dumbbell-Press.gif',
    'incline dumbbell press': '/public/WorkoutsImage/dumbbell-incline-chest-press.gif',
    'Machine Dip': '/public/WorkoutsImage/machine dip.gif',
    'dumbbell flyes': '/public/WorkoutsImage/dumbbell-chest-fly-muscles.gif',
    'incline dumbbell flyes': '/public/WorkoutsImage/Incline-dumbbell-Fly.gif',
    'cable crossover': '/public/WorkoutsImage/cable-standing-crossover.gif',
    'cable pushdown': '/public/GIF/v-bar-tricep-pushdown.gif',
    'band crossover': '/public/WorkoutsImage/band crossover.gif',
    'plate press': '/public/WorkoutsImage/svend-press.gif',
    'dips': '/public/WorkoutsImage/dips.gif',
    'bench dips': '/public/WorkoutsImage/bench dips.gif',
    'pec deck flyes': '/public/WorkoutsImage/pec-deck-butterfly-exercice-musculation.webp',
    'cable fly': '/public/WorkoutsImage/cable-standing-crossover.gif',
    'barbell floor press': '/public/WorkoutsImage/barbell-floor-press.gif',
    'flat barbell press': '/public/WorkoutsImage/barbell-bench-press.gif',
    'reverse pec-deck flyes': '/public/GIF/seated-reverse-fly.gif',    
    'chest press machine': '/public/GIF/DEC_CHEST_MAC.gif',
    'Hammer Strength Press': '/public/GIF/hammer strength press.gif',
    'Machine Shoulder Press': '/public/GIF/Lever-Shoulder-Press.gif',
    'board press': '/public/GIF/board-press-muscles-1024x685.png',
    'spoto press': '/public/GIF/bench-press-powerlifting.gif',
    'tempo squat': '/public/GIF/tempo.gif',
    'pin press': '/public/GIF/pin press.gif',
    'pec deck machine': '/public/WorkoutsImage/pec deck machine.gif',
    'butterfly machine': '/public/WorkoutsImage/pec-deck-butterfly-exercice-musculation.webp',
    'push ups': '/public/GIF/push ups.gif',


    // Shoulder exercises
    'Arnold press': '/public/GIF/arnold-presses.gif',
    'dumbbell shoulder press': '/public/GIF/SEAT_DB_SHD_PRESS (1).gif',
    'dumbbell reverse fly': '/public/GIF/dumbbell-reverse-fly.gif',
    'overhead press': '/public/WorkoutsImage/Overhead-Press.webp',
    'military press': '/public/GIF/military-press.gif',
    'standing press': '/public/GIF/military-press.gif',
    'seated dumbbell shoulder press': '/public/WorkoutsImage/SEAT_DB_SHD_PRESS.gif',
    'push press': '/public/GIF/PUSH_PRESS.gif',
    'lateral raise': '/public/WorkoutsImage/anim-dumbbell-lateral-raise.gif',
    'front raise': '/public/WorkoutsImage/front raises.gif',
    'rear delt fly': '/public/GIF/seated-reverse-fly.gif',
    'machine lateral raises': '/public/WorkoutsImage/machine lateral.gif',
    'face pull': '/public/WorkoutsImage/Animation-FP-stehend-beiarmig.gif',
    'cable lateral raises': '/public/WorkoutsImage/CABLE_LAT_RAISE.gif',
    'front cable raises': '/public/WorkoutsImage/cable-front-raise-movement.gif',
    'shrug': '/public/WorkoutsImage/shrug.gif',
    'seated barbell press': '/public/WorkoutsImage/SEAT_BB_SHD_PRESS.gif',
    'seated dumbbell press': '/public/WorkoutsImage/SEAT_DB_SHD_PRESS.gif',
    'bent-over laterals ': '/public/WorkoutsImage/DB_BO_LAT_RAISE.gif',
    'front barbell raises': '/public/WorkoutsImage/BB_FRONT_RAISE.gif',
    'behind neck press': '/public/WorkoutsImage/Seated-Behind-the-Neck-Press.gif',
    'Front Dumbbell Raises': '/public/WorkoutsImage/front raises.gif',
    'bent-over lateral raises': '/public/GIF/bent-over-lateral-raise-nasil-yapilir.gif',
    'bent over lateral raises': '/public/WorkoutsImage/DB_BO_LAT_RAISE.gif',
    'plate raises': '/public/WorkoutsImage/plate lateral.gif',
    'cable front raises': '/public/WorkoutsImage/CABLE_FRONT_RAISE.gif',
    'plate front raises': '/public/WorkoutsImage/plate raises.gif',
    'barbell front raises': '/public/WorkoutsImage/BB_FRONT_RAISE (1).gif',
    'band face pulls': '/public/WorkoutsImage/Face-pull.gif',
    'cable external rotation': '/public/WorkoutsImage/rotation pull.gif',
    'bent over rear delt flyes': '/public/WorkoutsImage/Bent-Over-Dumbbell-Rear-Delt-Raise-With-Head-On-Bench.gif',
    'reverse pec deck': '/public/GIF/REV_PEC_DECK_MC.gif',
    'dumbbell shrugs': '/public/GIF2.0/DB_SHRUG.gif',
    'machine shrugs': '/public/GIF2.0/SM_SHRUG.gif',
    'barbell shrugs': '/public/GIF2.0/barbell-shrug-muscles.gif',
    'upright rows': '/public/GIF2.0/Barbell-Upright-Row.gif',
    'dumbbell floor press': '/public/GIF2.0/dumbbell-floor-press.gif',
    
    // Back exercises
    'kettlebell rows': '/public/GIF2.0/anim-kettlebell-bent-over-rows.gif',    
    'assisted pull-ups': '/public/GIF/Assisted-Pull-up.gif',
    'negative pull-ups': '/public/GIF2.0/negative pull-up.gif',
    'deadlift': '/public/WorkoutsImage/deadlift.gif',
    'inverted rows': '/public/WorkoutsImage/inverted rows.gif',
    'bent over row': '/public/GIF/Bent-Over-Barbell-Rows.webp',
    'barbell row': '/public/WorkoutsImage/pendlay-row.gif',
    't-bar row': '/public/WorkoutsImage/t-bar-row-muscles.gif',
    'seated row': '',
    'wide grip rows': '/public/GIF/cable-wide-grip-row.gif',
    'lat pulldown': '/public/WorkoutsImage/cable-lat-pulldown.gif',
    'pull-ups': '/public/WorkoutsImage/pull-up.gif',
    'pull ups': '/public/WorkoutsImage/pull-up.gif',
    'assisted pull ups': '/public/GIF/Assisted-Pull-up.gif',
    'machine row': '/public/GIF/Chest-Supported-Machine-Row.webp',
    'single arm row machine': '/public/GIF/cable-one-arm-seated-row.gif',
    'Standing Single Arm Cable Rows': '/public/GIF/One-arm-Cable-Row.gif',
    'Single Arm Cable Pullover': '/public/GIF/Cable-One-Arm-Pulldown.gif',
    'good morning': '',
    'barbell rows': '/public/WorkoutsImage/Barbell-Bent-Over-Row.gif',
    'kettlebell deadlift': '/public/GIF/kettlebell.gif',
    'dumbbell deadlift': '/public/GIF2.0/anim-dumbbell-deadlifts.gif',
    'dumbbell row': '/public/WorkoutsImage/Dumbbell-Row.webp',
    'seated cable rows': '/public/WorkoutsImage/SEATED_CABLE_ROW.gif',
    'rack pull': '/public/WorkoutsImage/smith-machine-rack-pull.gif',
    'straight-arm pulldowns': '/public/WorkoutsImage/CABLE_ARM_PULL_DOWN.gif',
    'dumbbell pullovers': '/public/WorkoutsImage/pullover-haltere1.gif',
    'Machine Pulldowns': '/public/WorkoutsImage/cable-lat-pulldown.gif',
    'straight arm pulldown (FST-7)': '/public/WorkoutsImage/CABLE_ARM_PULL_DOWN.gif',
    'sumo deadlift': '/public/GIF/sumo-deadlift-from-blocks.gif',
    'block pulls': '/public/GIF/block0pull.gif',
    'Reverse Band Bench': '/public/GIF/reverse band.gif',
    'trap bar deadlift': '/public/GIF/trap bar.gif',
    
    
    // Leg exercises
    'landmine squat': '/public/GIF2.0/landmine-squat.gif',
    'barbell seated calf raises': '/public/GIF2.0/Barbell-Seated-Calf-Raise.gif',
    'dumbbell seated calf raises': '/public/GIF2.0/seated-calf-raise-dumbbell.gif',
    'good mornings': '/public/GIF2.0/Smith-Machine-Good-Morning.gif',
    'swiss ball leg curl': '/public/GIF2.0/leg-curl-on-stability-ball.gif',
    'squat': '/public/WorkoutsImage/barbell-full-squat.gif',
    'barbell squat': '/public/WorkoutsImage/barbell-full-squat.gif',
    'front squat': '/public/WorkoutsImage/front-squat.gif',
    'barbell calf raises': '/public/GIF2.0/BB_STD_CALF_RAISE.gif',
    'single leg calf raises': '/public/GIF2.0/single-leg-calf-raise.gif',
    'leg press': '/public/WorkoutsImage/leg-press.gif',
    'leg extension': '/public/WorkoutsImage/legs extension.gif',
    'leg curl': '/public/WorkoutsImage/Lying-leg-curl-gif.gif',
    'lying leg curl': '/public/WorkoutsImage/Lying-leg-curl-gif.gif',
    'lunges': '/public/WorkoutsImage/lunges.gif',
    'dumbbell lunges': '/public/WorkoutsImage/dumbbell-lunges.gif',
    'calf raises': '/public/GIF2.0/standing-calf-raise.gif',
    'walking lunges': '',
    'farmer Walk': '/public/GIF2.0/FARMER_WALK.gif',
    'dumbbell skull crusher': '/public/GIF2.0/Dumbbell-Skull-Crusher.gif',
    'machine calf raises': '/public/GIF2.0/Bench-Press-Machine-Standing-Calf-Raise.gif',
    'romanian deadlift': '/public/WorkoutsImage/barbell-romanian-deadlift-movement.gif',
    'romanian deadlifts': '/public/WorkoutsImage/barbell-romanian-deadlift-movement.gif',
    'dumbbell squat': '/public/GIF/dumbbell-front-squat.webp',
    'calf raise': '/public/WorkoutsImage/cable-standing-calf-raise.gif',
    'bodyweight sissy squat': '/public/WorkoutsImage/sissy squat.gif',
    'seated calf raises': '/public/GIF/SEAT_CALF_RAISE.gif',
    'hack squat': '/public/WorkoutsImage/reverse-hack-squat.gif',
    'hack squats': '/public/WorkoutsImage/hack-squat-min.gif',
    'bulgarian split squat': '/public/GIF2.0/BSS.gif',
    'machine squat': '/public/GIF/smith-machine-squat-benefits.gif',
    'goblet squat': '/public/GIF/explosive-goblet-squat.gif',
    'reverse lunges': '/public/GIF/reverse-deficit-lunge.gif',
    'split squats': '/public/GIF/dumbbell-split-squat.gif',
    'step ups': '/public/GIF/WEI_STEP_UP.gif',
    'leg press calf raises': '/public/GIF2.0/leg-press-calf-raise.gif',
    'donkey calf raises': '/public/GIF2.0/donkey-calf-raise.gif',
    'machine seated calf raises': '/public/GIF/Seated-Calf-Press-on-Leg-Press-Machine.gif',
    'competition squat': '/public/WorkoutsImage/Barbell-Squat.webp',
    'pause squat': '/public/WorkoutsImage/barbell-pin-squat.gif',
    'box squat': '/public/WorkoutsImage/box-squat-muscles-used.gif',
    'Seated Leg Hamstring Curl': '/public/GIF/SEAT_SL_LEG_CURL.gif',
    'Lying Hamstring Curl': '/public/WorkoutsImage/Lying-leg-curl-gif.gif',
    'Cable RDL': '/public/GIF/Stiff-Leg-Cable-Deadlift.webp',
    'hip thrusts': '/public/GIF/10601301-Barbell-Hip-Thrust_Hips_360.gif',
    'zercher squat': '/public/GIF/zercher-squat.gif',
    'belt squat': '/public/GIF/belt-squat.gif',
    'pause front squat': '/public/WorkoutsImage/front-squat.gif',
    'seated hip abduction': '/public/GIF/abductor.gif',
    'safety bar squat': '/public/GIF/safety bar squat.gif',
    
    // Arm exercises
    'machine triceps extension': '/public/GIF2.0/TRI_EXT_MC.gif',
    'dumbbell overhead extension': '/public/GIF/SEAT_DB_TRI_EXT.gif',
    'barbell overhead extension': '/public/GIF2.0/bb-overhead.gif',
    'cable overhead extension': '/public/WorkoutsImage/CABLE_OHT_EXT.gif',
    'biceps curl': '/public/WorkoutsImage/barbell-curl.gif',
    'barbell curl': '/public/WorkoutsImage/barbell-curl.gif',
    'dumbbell curl': '/public/WorkoutsImage/inner-bicep-curl.gif',
    'hammer curl': '/public/WorkoutsImage/hammer curl.gif',
    'preacher curl': '/public/WorkoutsImage/ez-bar-preacher-curl.gif',
    'concentration curl': '/public/WorkoutsImage/concentration.gif',
    'overhead tricep extension': '/public/WorkoutsImage/CABLE_OHT_EXT.gif',
    'tricep extension': '/public/GIF/v-bar-tricep-pushdown.gif',
    'triceps pushdown': '/public/WorkoutsImage/02411301-Cable-Triceps-Pushdown-V-bar-attachment_Upper-Arms_360.gif',
    'tricep pushdowns': '/public/WorkoutsImage/02411301-Cable-Triceps-Pushdown-V-bar-attachment_Upper-Arms_360.gif',
    'skull crusher': '/public/WorkoutsImage/flat-bench-skull-crusher.gif',
    'close grip bench press': '/public/WorkoutsImage/Close-Grip-Barbell-Bench-Press.webp',
    'machine curl': '/public/GIF/machine curl.gif',
    'cable curl': '/public/GIF/CABLE_CURL.gif',
    'rope hammer curl': '/public/GIF2.0/rope-hammer-curl-machine.gif',
    'barbell hammer curl': '/public/GIF2.0/tricep-bar-hammer-curl.gif',
    'Zottman curl': '/public/GIF2.0/Zottman-Curl.webp',
    'incline dumbbell curls': '/public/WorkoutsImage/INC_DB_CURL.gif',
    'overhead triceps extension': '/public/WorkoutsImage/Kneeling-Overhead-Cable-Tricep-Extension.webp',
    'wrist curl': '/public/WorkoutsImage/REV_DB_WRIST_CURL.gif',
    'Overhead Cable Triceps Extension': '/public/WorkoutsImage/CABLE_OHT_EXT.gif',
    'incline dumbbell curl': '/public/WorkoutsImage/INC_DB_CURL.gif',
    'dumbbell triceps extension': '/public/GIF2.0/dumbbell-triceps-extension.gif',
    'machine preacher curl': '/public/GIF/machine curl.gif',
    
    
    
    // Core/Ab exercises
    'plate crunches': '/public/WorkoutsImage/weighted-knee-crunch.gif',
    'sit-ups': '/public/GIF/anim-sit-ups.gif',
    'sit-up': '',
    'leg raises': '/public/GIF/captains-chair-knee-raise.gif',
    'hanging leg raises': '/public/GIF/hanging-leg-raise-movement.gif',
    'russian twist': '',
    'mountain climber': '',
    'cable crunches': '/public/GIF/Kneeling-Cable-Crunch.gif',
    'machine crunches': '/public/GIF/Seated-Ab-Crunch-Machine.gif',
    'reverse crunches': '/public/WorkoutsImage/REV_CRUNCH.gif',
    'ab wheel': '',
    'woodchopper': '',
    'bicycle crunch': '',
    'abdominal crunches': '/public/WorkoutsImage/ab workout.gif',
    'cable rope crunches': '/public/GIF/CABLE_CRUNCH.gif',
    
    // Cardio exercises
    'running': '',
    'treadmill': '',
    'cycling': '',
    'stationary bike': '/public/GIF/Bike.gif',
    'jumping jacks': '',
    'burpees': '',
    'jump rope': '',
    'rowing': '',
    'elliptical': '',
    'stair climber': '',
    'sprinting': '',
    'hamstring curl': '/public/WorkoutsImage/Lying-leg-curl-gif.gif',
    
    // Full body/Compound exercises
    'cat-cow stretch': '/public/GIF2.0/cats crow.gif',
    'pelvic tilts': '/public/GIF2.0/pelvic tilts.gif',
    'bird-dog': '/public/GIF2.0/bird dog.gif',
    'dead bug': '/public/GIF2.0/Dead-Bug.gif',
    'walking': '/public/GIF2.0/walking.gif',
    'medicine ball slam': '',
    
    // Machine exercises
    'chest press machine': '/public/GIF/DEC_CHEST_MAC.gif',
    'incline machine chest press': '/public/WorkoutsImage/Incline-Chest-Press-Machine.gif',
    'shoulder press machine': '',
    'leg press machine': '',
    'cable machine': '',
    'smith machine': '',
    'machine preacher curls': '/public/GIF/PREA_CURL_MAC.gif',
    
    
    // Bodyweight exercises
    'close grip push ups': '/public/GIF2.0/-Close-Grip-Push-up_Upper-Arms_360.gif',
    'push-ups': '/public/GIF/anim-push-ups.gif',
    'dip': '',
    'planche lean': '/public/GIF2.0/lean planche.gif',
    'side plank': '/public/GIF2.0/Side-Plank.gif',
    'planking': '/public/GIF2.0/plank.gif',
    'knee raises': '/public/GIF2.0/Knee-Raises.gif',
    'pike push-ups': '/public/GIF2.0/Pike-Push-up.gif',
    'chin-ups': '/public/GIF/chin-ups.gif',
    'bodyweight squat': '',
    'negative chin-ups': '/public/GIF2.0/CHIN_UP.gif',
    'oblique crunch': '/public/GIF2.0/oblique.gif',
    'russian twists': '/public/GIF2.0/kettlebell-russian-twist.gif',
    'pistol squats': '/public/GIF/Pistol-Squat-to-Box.gif',
    'handstand push-ups': '/public/GIF/handstand-push-up.gif',
    'handstand walk': '/public/GIF/handstand-walk.gif',
    'muscle-ups': '/public/GIF/muscle-ups-movement.gif',
    'L-sit': '/public/GIF/L-Sit.gif',
    'front lever': '/public/GIF/front level.gif',
    'planche':'/public/GIF/Muscles-Planche.001-1.jpeg',
    'human flag': '/public/GIF/Human-Flag.gif',
    'archer push-ups': '/public/GIF/Archer-Push-Up.webp',
    'dragon flag': '/public/GIF/dragon-flag.gif',
    'handstand hold': '/public/GIF/Handstand-Hold-1024x573.jpg',
    'bulgarian split squats': '/public/GIF/bulgarian-split-spuat.gif',
    'back lever': '/public/GIF/back-lever.webp',
    'one-arm push-ups': '/public/GIF/Single-Arm-Push-up.gif',
    'muscle-up progressions': '/public/GIF/muscle-ups-movement.gif',
    'planche push-up progressions': '/public/GIF/meia-prancha.gif',
    'pseudo planche push-ups': '/public/GIF/pseudo.gif',
    '90° push-ups': '/public/GIF/90 degree.gif',
    'one-arm pull-up progressions': '/public/GIF/Weighted-One-Arm-Pull-up.gif',
    'ring push-ups': '/public/GIF/ring-push-ups.gif',
    'ring row': '/public/GIF/Ring-Inverted-Row.gif',
    'tapping push-ups': '/public/GIF/Shoulder-Tap-Push-up.gif',
    'decline push-ups': '/public/GIF2.0/Decline-Push-Up.gif',
    'wall handstand': '/public/GIF2.0/wall handstand.gif',
    'stability ball push-ups': '/public/GIF2.0/ball push up.gif',
    'suspension trainer push-ups': '/public/GIF/ring-push-ups.gif',
    'clap push-ups': '/public/GIF2.0/clapping-push-ups.gif',


    // Stretching and mobility
    'stretch': '',
    'yoga': '',
    'pilates': '',
    'dynamic stretch': '',
    'static stretch': ''
  };

  // First, check for exact match
  if (imageMap[name]) {
    return imageMap[name];
  }

  // Then check for partial matches
  for (const [key, image] of Object.entries(imageMap)) {
    if (name.includes(key.toLowerCase()) || key.toLowerCase().includes(name)) {
      return image;
    }
  }

  // Additional fallback logic for common exercise patterns
  if (name.includes('press') && (name.includes('chest') || name.includes('bench'))) {
    return '';
  }
  if (name.includes('press') && name.includes('shoulder')) {
    return '';
  }
  if (name.includes('press') && name.includes('overhead')) {
    return '';
  }
  if (name.includes('curl') && name.includes('bicep')) {
    return '';
  }
  if (name.includes('extension') && name.includes('tricep')) {
    return '';
  }
  if (name.includes('row')) {
    return '';
  }
  if (name.includes('squat')) {
    return '';
  }
  if (name.includes('lunge')) {
    return '';
  }
  if (name.includes('raise')) {
    return '';
  }
  if (name.includes('deadlift')) {
    return '';
  }
  if (name.includes('pull') && name.includes('up')) {
    return '';
  }
  if (name.includes('push') && name.includes('up')) {
    return '';
  }
  if (name.includes('dip')) {
    return '';
  }
  if (name.includes('crunch')) {
    return '';
  }
  if (name.includes('plank')) {
    return '';
  }

  return '';
};

const WorkoutImage = ({ 
  exerciseName, 
  className = "", 
  alt = "", 
  width = "300",
  height = "200",
  ...props 
}) => {
  const imageSrc = getWorkoutImage(exerciseName);
  const imageAlt = alt || exerciseName || 'Workout image';
  
  return (
    <div className="workout-image-container">
      <img 
        src={imageSrc} 
        alt={imageAlt}
        width={width}
        height={height}
        className={`workout-image rounded-2xl shadow-lg object-cover ${className}`}
        onError={(e) => {
          // Fallback to default image if the specific one doesn't exist
          console.warn(`Image not found: ${imageSrc}, falling back to default`);
          e.target.src = '';
        }}
        loading="lazy"
        {...props}
      />
      {exerciseName && (
        <div className="exercise-name text-center mt-2 text-sm font-medium text-gray-700">
          {exerciseName}
        </div>
      )}
    </div>
  );
};

export default WorkoutImage;