// WorkoutImage.jsx
import React from 'react';

// Image mapping based on exercise names
const getWorkoutImage = (exerciseName) => {
  if (!exerciseName) return '';
  
  const name = exerciseName.toLowerCase();
  
  // Empty image mapping - ready for you to add images
  const imageMap = {
    // Chest exercises
    'cable chest press': '/GIF2.0/Seated-Cable-Chest-Press.gif',
    'bench press': '/WorkoutsImage/barbell-bench-press.gif',
    'barbell bench press': '/WorkoutsImage/barbell-bench-press.gif',
    'incline barbell press': '/WorkoutsImage/Barbell-Incline-Bench-Press_Chest.gif',
    'incline bench press': '/WorkoutsImage/Barbell-Incline-Bench-Press_Chest.gif',
    'decline barbell press': '/WorkoutsImage/BB_DEC_BP.gif',
    'decline bench press': '/WorkoutsImage/BB_DEC_BP.gif',
    'dumbbell press': '/GIF/Dumbbell-Press.gif',
    'dumbbell bench press': '/GIF/Dumbbell-Press.gif',
    'incline dumbbell press': '/WorkoutsImage/dumbbell-incline-chest-press.gif',
    'Machine Dip': '/WorkoutsImage/machine dip.gif',
    'dumbbell flyes': '/WorkoutsImage/dumbbell-chest-fly-muscles.gif',
    'incline dumbbell flyes': '/WorkoutsImage/Incline-dumbbell-Fly.gif',
    'cable crossover': '/WorkoutsImage/cable-standing-crossover.gif',
    'cable pushdown': '/GIF/v-bar-tricep-pushdown.gif',
    'band crossover': '/WorkoutsImage/band crossover.gif',
    'plate press': '/WorkoutsImage/svend-press.gif',
    'dips': '/WorkoutsImage/dips.gif',
    'bench dips': '/WorkoutsImage/bench dips.gif',
    'pec deck flyes': '/WorkoutsImage/pec-deck-butterfly-exercice-musculation.webp',
    'cable fly': '/WorkoutsImage/cable-standing-crossover.gif',
    'barbell floor press': '/WorkoutsImage/barbell-floor-press.gif',
    'flat barbell press': '/WorkoutsImage/barbell-bench-press.gif',
    'reverse pec-deck flyes': '/GIF/seated-reverse-fly.gif',    
    'chest press machine': '/GIF/DEC_CHEST_MAC.gif',
    'Hammer Strength Press': '/GIF/hammer strength press.gif',
    'Machine Shoulder Press': '/GIF/Lever-Shoulder-Press.gif',
    'board press': '/GIF/board-press-muscles-1024x685.png',
    'spoto press': '/GIF/bench-press-powerlifting.gif',
    'tempo squat': '/GIF/tempo.gif',
    'pin press': '/GIF/pin press.gif',
    'pec deck machine': '/WorkoutsImage/pec deck machine.gif',
    'butterfly machine': '/WorkoutsImage/pec-deck-butterfly-exercice-musculation.webp',
    'push ups': '/GIF/push ups.gif',


    // Shoulder exercises
    'Arnold press': '/GIF/arnold-presses.gif',
    'dumbbell shoulder press': '/GIF/SEAT_DB_SHD_PRESS (1).gif',
    'dumbbell reverse fly': '/GIF/dumbbell-reverse-fly.gif',
    'overhead press': '/WorkoutsImage/Overhead-Press.webp',
    'military press': '/GIF/military-press.gif',
    'standing press': '/GIF/military-press.gif',
    'seated dumbbell shoulder press': '/WorkoutsImage/SEAT_DB_SHD_PRESS.gif',
    'push press': '/GIF/PUSH_PRESS.gif',
    'lateral raise': '/WorkoutsImage/anim-dumbbell-lateral-raise.gif',
    'front raise': '/WorkoutsImage/front raises.gif',
    'rear delt fly': '/GIF/seated-reverse-fly.gif',
    'machine lateral raises': '/WorkoutsImage/machine lateral.gif',
    'face pull': '/WorkoutsImage/Animation-FP-stehend-beiarmig.gif',
    'cable lateral raises': '/WorkoutsImage/CABLE_LAT_RAISE.gif',
    'front cable raises': '/WorkoutsImage/cable-front-raise-movement.gif',
    'shrug': '/WorkoutsImage/shrug.gif',
    'seated barbell press': '/WorkoutsImage/SEAT_BB_SHD_PRESS.gif',
    'seated dumbbell press': '/WorkoutsImage/SEAT_DB_SHD_PRESS.gif',
    'bent-over laterals ': '/WorkoutsImage/DB_BO_LAT_RAISE.gif',
    'front barbell raises': '/WorkoutsImage/BB_FRONT_RAISE.gif',
    'behind neck press': '/WorkoutsImage/Seated-Behind-the-Neck-Press.gif',
    'Front Dumbbell Raises': '/WorkoutsImage/front raises.gif',
    'bent-over lateral raises': '/GIF/bent-over-lateral-raise-nasil-yapilir.gif',
    'bent over lateral raises': '/WorkoutsImage/DB_BO_LAT_RAISE.gif',
    'plate raises': '/WorkoutsImage/plate lateral.gif',
    'cable front raises': '/WorkoutsImage/CABLE_FRONT_RAISE.gif',
    'plate front raises': '/WorkoutsImage/plate raises.gif',
    'barbell front raises': '/WorkoutsImage/BB_FRONT_RAISE (1).gif',
    'band face pulls': '/WorkoutsImage/Face-pull.gif',
    'cable external rotation': '/WorkoutsImage/rotation pull.gif',
    'bent over rear delt flyes': '/WorkoutsImage/Bent-Over-Dumbbell-Rear-Delt-Raise-With-Head-On-Bench.gif',
    'reverse pec deck': '/GIF/REV_PEC_DECK_MC.gif',
    'dumbbell shrugs': '/GIF2.0/DB_SHRUG.gif',
    'machine shrugs': '/GIF2.0/SM_SHRUG.gif',
    'barbell shrugs': '/GIF2.0/barbell-shrug-muscles.gif',
    'upright rows': '/GIF2.0/Barbell-Upright-Row.gif',
    'dumbbell floor press': '/GIF2.0/dumbbell-floor-press.gif',
    
    // Back exercises
    'kettlebell rows': '/GIF2.0/anim-kettlebell-bent-over-rows.gif',    
    'assisted pull-ups': '/GIF/Assisted-Pull-up.gif',
    'negative pull-ups': '/GIF2.0/negative pull-up.gif',
    'deadlift': '/WorkoutsImage/deadlift.gif',
    'inverted rows': '/WorkoutsImage/inverted rows.gif',
    'bent over row': '/GIF/Bent-Over-Barbell-Rows.webp',
    'barbell row': '/WorkoutsImage/pendlay-row.gif',
    't-bar row': '/WorkoutsImage/t-bar-row-muscles.gif',
    'seated row': '',
    'wide grip rows': '/GIF/cable-wide-grip-row.gif',
    'lat pulldown': '/WorkoutsImage/cable-lat-pulldown.gif',
    'pull-ups': '/WorkoutsImage/pull-up.gif',
    'pull ups': '/WorkoutsImage/pull-up.gif',
    'assisted pull ups': '/GIF/Assisted-Pull-up.gif',
    'machine row': '/GIF/Chest-Supported-Machine-Row.webp',
    'single arm row machine': '/GIF/cable-one-arm-seated-row.gif',
    'Standing Single Arm Cable Rows': '/GIF/One-arm-Cable-Row.gif',
    'Single Arm Cable Pullover': '/GIF/Cable-One-Arm-Pulldown.gif',
    'good morning': '',
    'barbell rows': '/WorkoutsImage/Barbell-Bent-Over-Row.gif',
    'kettlebell deadlift': '/GIF/kettlebell.gif',
    'dumbbell deadlift': '/GIF2.0/anim-dumbbell-deadlifts.gif',
    'dumbbell row': '/WorkoutsImage/Dumbbell-Row.webp',
    'seated cable rows': '/WorkoutsImage/SEATED_CABLE_ROW.gif',
    'rack pull': '/WorkoutsImage/smith-machine-rack-pull.gif',
    'straight-arm pulldowns': '/WorkoutsImage/CABLE_ARM_PULL_DOWN.gif',
    'dumbbell pullovers': '/WorkoutsImage/pullover-haltere1.gif',
    'Machine Pulldowns': '/WorkoutsImage/cable-lat-pulldown.gif',
    'straight arm pulldown (FST-7)': '/WorkoutsImage/CABLE_ARM_PULL_DOWN.gif',
    'sumo deadlift': '/GIF/sumo-deadlift-from-blocks.gif',
    'block pulls': '/GIF/block0pull.gif',
    'Reverse Band Bench': '/GIF/reverse band.gif',
    'trap bar deadlift': '/GIF/trap bar.gif',
    
    
    // Leg exercises
    'landmine squat': '/GIF2.0/landmine-squat.gif',
    'barbell seated calf raises': '/GIF2.0/Barbell-Seated-Calf-Raise.gif',
    'dumbbell seated calf raises': '/GIF2.0/seated-calf-raise-dumbbell.gif',
    'good mornings': '/GIF2.0/Smith-Machine-Good-Morning.gif',
    'swiss ball leg curl': '/GIF2.0/leg-curl-on-stability-ball.gif',
    'squat': '/WorkoutsImage/barbell-full-squat.gif',
    'barbell squat': '/WorkoutsImage/barbell-full-squat.gif',
    'front squat': '/WorkoutsImage/front-squat.gif',
    'barbell calf raises': '/GIF2.0/BB_STD_CALF_RAISE.gif',
    'single leg calf raises': '/GIF2.0/single-leg-calf-raise.gif',
    'leg press': '/WorkoutsImage/leg-press.gif',
    'leg extension': '/WorkoutsImage/legs extension.gif',
    'leg curl': '/WorkoutsImage/Lying-leg-curl-gif.gif',
    'lying leg curl': '/WorkoutsImage/Lying-leg-curl-gif.gif',
    'lunges': '/WorkoutsImage/lunges.gif',
    'dumbbell lunges': '/WorkoutsImage/dumbbell-lunges.gif',
    'calf raises': '/GIF2.0/standing-calf-raise.gif',
    'walking lunges': '',
    'farmer Walk': '/GIF2.0/FARMER_WALK.gif',
    'dumbbell skull crusher': '/GIF2.0/Dumbbell-Skull-Crusher.gif',
    'machine calf raises': '/GIF2.0/Bench-Press-Machine-Standing-Calf-Raise.gif',
    'romanian deadlift': '/WorkoutsImage/barbell-romanian-deadlift-movement.gif',
    'romanian deadlifts': '/WorkoutsImage/barbell-romanian-deadlift-movement.gif',
    'dumbbell squat': '/GIF/dumbbell-front-squat.webp',
    'calf raise': '/WorkoutsImage/cable-standing-calf-raise.gif',
    'bodyweight sissy squat': '/WorkoutsImage/sissy squat.gif',
    'seated calf raises': '/GIF/SEAT_CALF_RAISE.gif',
    'hack squat': '/WorkoutsImage/reverse-hack-squat.gif',
    'hack squats': '/WorkoutsImage/hack-squat-min.gif',
    'bulgarian split squat': '/GIF2.0/BSS.gif',
    'machine squat': '/GIF/smith-machine-squat-benefits.gif',
    'goblet squat': '/GIF/explosive-goblet-squat.gif',
    'reverse lunges': '/GIF/reverse-deficit-lunge.gif',
    'split squats': '/GIF/dumbbell-split-squat.gif',
    'step ups': '/GIF/WEI_STEP_UP.gif',
    'leg press calf raises': '/GIF2.0/leg-press-calf-raise.gif',
    'donkey calf raises': '/GIF2.0/donkey-calf-raise.gif',
    'machine seated calf raises': '/GIF/Seated-Calf-Press-on-Leg-Press-Machine.gif',
    'competition squat': '/WorkoutsImage/Barbell-Squat.webp',
    'pause squat': '/WorkoutsImage/barbell-pin-squat.gif',
    'box squat': '/WorkoutsImage/box-squat-muscles-used.gif',
    'Seated Leg Hamstring Curl': '/GIF/SEAT_SL_LEG_CURL.gif',
    'Lying Hamstring Curl': '/WorkoutsImage/Lying-leg-curl-gif.gif',
    'Cable RDL': '/GIF/Stiff-Leg-Cable-Deadlift.webp',
    'hip thrusts': '/GIF/10601301-Barbell-Hip-Thrust_Hips_360.gif',
    'zercher squat': '/GIF/zercher-squat.gif',
    'belt squat': '/GIF/belt-squat.gif',
    'pause front squat': '/WorkoutsImage/front-squat.gif',
    'seated hip abduction': '/GIF/abductor.gif',
    'safety bar squat': '/GIF/safety bar squat.gif',
    
    // Arm exercises
    'machine triceps extension': '/GIF2.0/TRI_EXT_MC.gif',
    'dumbbell overhead extension': '/GIF/SEAT_DB_TRI_EXT.gif',
    'barbell overhead extension': '/GIF2.0/bb-overhead.gif',
    'cable overhead extension': '/WorkoutsImage/CABLE_OHT_EXT.gif',
    'biceps curl': '/WorkoutsImage/barbell-curl.gif',
    'barbell curl': '/WorkoutsImage/barbell-curl.gif',
    'dumbbell curl': '/WorkoutsImage/inner-bicep-curl.gif',
    'hammer curl': '/WorkoutsImage/hammer curl.gif',
    'preacher curl': '/WorkoutsImage/ez-bar-preacher-curl.gif',
    'concentration curl': '/WorkoutsImage/concentration.gif',
    'overhead tricep extension': '/WorkoutsImage/CABLE_OHT_EXT.gif',
    'tricep extension': '/GIF/v-bar-tricep-pushdown.gif',
    'triceps pushdown': '/WorkoutsImage/02411301-Cable-Triceps-Pushdown-V-bar-attachment_Upper-Arms_360.gif',
    'tricep pushdowns': '/WorkoutsImage/02411301-Cable-Triceps-Pushdown-V-bar-attachment_Upper-Arms_360.gif',
    'skull crusher': '/WorkoutsImage/flat-bench-skull-crusher.gif',
    'close grip bench press': '/WorkoutsImage/Close-Grip-Barbell-Bench-Press.webp',
    'machine curl': '/GIF/machine curl.gif',
    'cable curl': '/GIF/CABLE_CURL.gif',
    'rope hammer curl': '/GIF2.0/rope-hammer-curl-machine.gif',
    'barbell hammer curl': '/GIF2.0/tricep-bar-hammer-curl.gif',
    'Zottman curl': '/GIF2.0/Zottman-Curl.webp',
    'incline dumbbell curls': '/WorkoutsImage/INC_DB_CURL.gif',
    'overhead triceps extension': '/WorkoutsImage/Kneeling-Overhead-Cable-Tricep-Extension.webp',
    'wrist curl': '/WorkoutsImage/REV_DB_WRIST_CURL.gif',
    'Overhead Cable Triceps Extension': '/WorkoutsImage/CABLE_OHT_EXT.gif',
    'incline dumbbell curl': '/WorkoutsImage/INC_DB_CURL.gif',
    'dumbbell triceps extension': '/GIF2.0/dumbbell-triceps-extension.gif',
    'machine preacher curl': '/GIF/machine curl.gif',
    
    
    
    // Core/Ab exercises
    'plate crunches': '/WorkoutsImage/weighted-knee-crunch.gif',
    'sit-ups': '/GIF/anim-sit-ups.gif',
    'sit-up': '',
    'leg raises': '/GIF/captains-chair-knee-raise.gif',
    'hanging leg raises': '/GIF/hanging-leg-raise-movement.gif',
    'russian twist': '',
    'mountain climber': '',
    'cable crunches': '/GIF/Kneeling-Cable-Crunch.gif',
    'machine crunches': '/GIF/Seated-Ab-Crunch-Machine.gif',
    'reverse crunches': '/WorkoutsImage/REV_CRUNCH.gif',
    'ab wheel': '',
    'woodchopper': '',
    'bicycle crunch': '',
    'abdominal crunches': '/WorkoutsImage/ab workout.gif',
    'cable rope crunches': '/GIF/CABLE_CRUNCH.gif',
    
    // Cardio exercises
    'running': '',
    'treadmill': '',
    'cycling': '',
    'stationary bike': '/GIF/Bike.gif',
    'jumping jacks': '',
    'burpees': '',
    'jump rope': '',
    'rowing': '',
    'elliptical': '',
    'stair climber': '',
    'sprinting': '',
    'hamstring curl': '/WorkoutsImage/Lying-leg-curl-gif.gif',
    
    // Full body/Compound exercises
    'cat-cow stretch': '/GIF2.0/cats crow.gif',
    'pelvic tilts': '/GIF2.0/pelvic tilts.gif',
    'bird-dog': '/GIF2.0/bird dog.gif',
    'dead bug': '/GIF2.0/Dead-Bug.gif',
    'walking': '/GIF2.0/walking.gif',
    'medicine ball slam': '',
    
    // Machine exercises
    'chest press machine': '/GIF/DEC_CHEST_MAC.gif',
    'incline machine chest press': '/WorkoutsImage/Incline-Chest-Press-Machine.gif',
    'shoulder press machine': '',
    'leg press machine': '',
    'cable machine': '',
    'smith machine': '',
    'machine preacher curls': '/GIF/PREA_CURL_MAC.gif',
    
    
    // Bodyweight exercises
    'close grip push ups': '/GIF2.0/-Close-Grip-Push-up_Upper-Arms_360.gif',
    'push-ups': '/GIF/anim-push-ups.gif',
    'dip': '',
    'planche lean': '/GIF2.0/lean planche.gif',
    'side plank': '/GIF2.0/Side-Plank.gif',
    'planking': '/GIF2.0/plank.gif',
    'knee raises': '/GIF2.0/Knee-Raises.gif',
    'pike push-ups': '/GIF2.0/Pike-Push-up.gif',
    'chin-ups': '/GIF/chin-ups.gif',
    'bodyweight squat': '',
    'negative chin-ups': '/GIF2.0/CHIN_UP.gif',
    'oblique crunch': '/GIF2.0/oblique.gif',
    'russian twists': '/GIF2.0/kettlebell-russian-twist.gif',
    'pistol squats': '/GIF/Pistol-Squat-to-Box.gif',
    'handstand push-ups': '/GIF/handstand-push-up.gif',
    'handstand walk': '/GIF/handstand-walk.gif',
    'muscle-ups': '/GIF/muscle-ups-movement.gif',
    'L-sit': '/GIF/L-Sit.gif',
    'front lever': '/GIF/front level.gif',
    'planche':'/GIF/Muscles-Planche.001-1.jpeg',
    'human flag': '/GIF/Human-Flag.gif',
    'archer push-ups': '/GIF/Archer-Push-Up.webp',
    'dragon flag': '/GIF/dragon-flag.gif',
    'handstand hold': '/GIF/Handstand-Hold-1024x573.jpg',
    'bulgarian split squats': '/GIF/bulgarian-split-spuat.gif',
    'back lever': '/GIF/back-lever.webp',
    'one-arm push-ups': '/GIF/Single-Arm-Push-up.gif',
    'muscle-up progressions': '/GIF/muscle-ups-movement.gif',
    'planche push-up progressions': '/GIF/meia-prancha.gif',
    'pseudo planche push-ups': '/GIF/pseudo.gif',
    '90° push-ups': '/GIF/90 degree.gif',
    'one-arm pull-up progressions': '/GIF/Weighted-One-Arm-Pull-up.gif',
    'ring push-ups': '/GIF/ring-push-ups.gif',
    'ring row': '/GIF/Ring-Inverted-Row.gif',
    'tapping push-ups': '/GIF/Shoulder-Tap-Push-up.gif',
    'decline push-ups': '/GIF2.0/Decline-Push-Up.gif',
    'wall handstand': '/GIF2.0/wall handstand.gif',
    'stability ball push-ups': '/GIF2.0/ball push up.gif',
    'suspension trainer push-ups': '/GIF/ring-push-ups.gif',
    'clap push-ups': '/GIF2.0/clapping-push-ups.gif',


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