// WorkoutImage.jsx
import React from 'react';

// Image mapping based on exercise names
const getWorkoutImage = (exerciseName) => {
  if (!exerciseName) return '';
  
  const name = exerciseName.toLowerCase();
  
  // Empty image mapping - ready for you to add images
  const imageMap = {
    // Chest exercises
    'cable chest press': 'src/GIF2.0/Seated-Cable-Chest-Press.gif',
    'bench press': 'src/WorkoutsImage/barbell-bench-press.gif',
    'barbell bench press': 'src/WorkoutsImage/barbell-bench-press.gif',
    'incline barbell press': 'src/WorkoutsImage/Barbell-Incline-Bench-Press_Chest.gif',
    'incline bench press': 'src/WorkoutsImage/Barbell-Incline-Bench-Press_Chest.gif',
    'decline barbell press': 'src/WorkoutsImage/BB_DEC_BP.gif',
    'decline bench press': 'src/WorkoutsImage/BB_DEC_BP.gif',
    'dumbbell press': 'src/GIF/Dumbbell-Press.gif',
    'dumbbell bench press': 'src/GIF/Dumbbell-Press.gif',
    'incline dumbbell press': 'src/WorkoutsImage/dumbbell-incline-chest-press.gif',
    'Machine Dip': 'src/WorkoutsImage/machine dip.gif',
    'dumbbell flyes': 'src/WorkoutsImage/dumbbell-chest-fly-muscles.gif',
    'incline dumbbell flyes': 'src/WorkoutsImage/Incline-dumbbell-Fly.gif',
    'cable crossover': 'src/WorkoutsImage/cable-standing-crossover.gif',
    'cable pushdown': 'src/GIF/v-bar-tricep-pushdown.gif',
    'band crossover': 'src/WorkoutsImage/band crossover.gif',
    'plate press': 'src/WorkoutsImage/svend-press.gif',
    'dips': 'src/WorkoutsImage/dips.gif',
    'bench dips': 'src/WorkoutsImage/bench dips.gif',
    'pec deck flyes': 'src/WorkoutsImage/pec-deck-butterfly-exercice-musculation.webp',
    'cable fly': 'src/WorkoutsImage/cable-standing-crossover.gif',
    'barbell floor press': 'src/WorkoutsImage/barbell-floor-press.gif',
    'flat barbell press': 'src/WorkoutsImage/barbell-bench-press.gif',
    'reverse pec-deck flyes': 'src/GIF/seated-reverse-fly.gif',    
    'chest press machine': 'src/GIF/DEC_CHEST_MAC.gif',
    'Hammer Strength Press': 'src/GIF/hammer strength press.gif',
    'Machine Shoulder Press': 'src/GIF/Lever-Shoulder-Press.gif',
    'board press': 'src/GIF/board-press-muscles-1024x685.png',
    'spoto press': 'src/GIF/bench-press-powerlifting.gif',
    'tempo squat': 'src/GIF/tempo.gif',
    'pin press': 'src/GIF/pin press.gif',
    'pec deck machine': 'src/WorkoutsImage/pec deck machine.gif',
    'butterfly machine': 'src/WorkoutsImage/pec-deck-butterfly-exercice-musculation.webp',
    'push ups': 'src/GIF/push ups.gif',


    // Shoulder exercises
    'Arnold press': 'src/GIF/arnold-presses.gif',
    'dumbbell shoulder press': 'src/GIF/SEAT_DB_SHD_PRESS (1).gif',
    'dumbbell reverse fly': 'src/GIF/dumbbell-reverse-fly.gif',
    'overhead press': 'src/WorkoutsImage/Overhead-Press.webp',
    'military press': 'src/GIF/military-press.gif',
    'standing press': 'src/GIF/military-press.gif',
    'seated dumbbell shoulder press': 'src/WorkoutsImage/SEAT_DB_SHD_PRESS.gif',
    'push press': 'src/GIF/PUSH_PRESS.gif',
    'lateral raise': 'src/WorkoutsImage/anim-dumbbell-lateral-raise.gif',
    'front raise': 'src/WorkoutsImage/front raises.gif',
    'rear delt fly': 'src/GIF/seated-reverse-fly.gif',
    'machine lateral raises': 'src/WorkoutsImage/machine lateral.gif',
    'face pull': 'src/WorkoutsImage/Animation-FP-stehend-beiarmig.gif',
    'cable lateral raises': 'src/WorkoutsImage/CABLE_LAT_RAISE.gif',
    'front cable raises': 'src/WorkoutsImage/cable-front-raise-movement.gif',
    'shrug': 'src/WorkoutsImage/shrug.gif',
    'seated barbell press': 'src/WorkoutsImage/SEAT_BB_SHD_PRESS.gif',
    'seated dumbbell press': 'src/WorkoutsImage/SEAT_DB_SHD_PRESS.gif',
    'bent-over laterals ': 'src/WorkoutsImage/DB_BO_LAT_RAISE.gif',
    'front barbell raises': 'src/WorkoutsImage/BB_FRONT_RAISE.gif',
    'behind neck press': 'src/WorkoutsImage/Seated-Behind-the-Neck-Press.gif',
    'Front Dumbbell Raises': 'src/WorkoutsImage/front raises.gif',
    'bent-over lateral raises': 'src/GIF/bent-over-lateral-raise-nasil-yapilir.gif',
    'bent over lateral raises': 'src/WorkoutsImage/DB_BO_LAT_RAISE.gif',
    'plate raises': 'src/WorkoutsImage/plate lateral.gif',
    'cable front raises': 'src/WorkoutsImage/CABLE_FRONT_RAISE.gif',
    'plate front raises': 'src/WorkoutsImage/plate raises.gif',
    'barbell front raises': 'src/WorkoutsImage/BB_FRONT_RAISE (1).gif',
    'band face pulls': 'src/WorkoutsImage/Face-pull.gif',
    'cable external rotation': 'src/WorkoutsImage/rotation pull.gif',
    'bent over rear delt flyes': 'src/WorkoutsImage/Bent-Over-Dumbbell-Rear-Delt-Raise-With-Head-On-Bench.gif',
    'reverse pec deck': 'src/GIF/REV_PEC_DECK_MC.gif',
    'dumbbell shrugs': 'src/GIF2.0/DB_SHRUG.gif',
    'machine shrugs': 'src/GIF2.0/SM_SHRUG.gif',
    'barbell shrugs': 'src/GIF2.0/barbell-shrug-muscles.gif',
    'upright rows': 'src/GIF2.0/Barbell-Upright-Row.gif',
    'dumbbell floor press': 'src/GIF2.0/dumbbell-floor-press.gif',
    
    // Back exercises
    'kettlebell rows': 'src/GIF2.0/anim-kettlebell-bent-over-rows.gif',    
    'assisted pull-ups': 'src/GIF/Assisted-Pull-up.gif',
    'negative pull-ups': 'src/GIF2.0/negative pull-up.gif',
    'deadlift': 'src/WorkoutsImage/deadlift.gif',
    'inverted rows': 'src/WorkoutsImage/inverted rows.gif',
    'bent over row': 'src/GIF/Bent-Over-Barbell-Rows.webp',
    'barbell row': 'src/WorkoutsImage/pendlay-row.gif',
    't-bar row': 'src/WorkoutsImage/t-bar-row-muscles.gif',
    'seated row': '',
    'wide grip rows': 'src/GIF/cable-wide-grip-row.gif',
    'lat pulldown': 'src/WorkoutsImage/cable-lat-pulldown.gif',
    'pull-ups': 'src/WorkoutsImage/pull-up.gif',
    'pull ups': 'src/WorkoutsImage/pull-up.gif',
    'assisted pull ups': 'src/GIF/Assisted-Pull-up.gif',
    'machine row': 'src/GIF/Chest-Supported-Machine-Row.webp',
    'single arm row machine': 'src/GIF/cable-one-arm-seated-row.gif',
    'Standing Single Arm Cable Rows': 'src/GIF/One-arm-Cable-Row.gif',
    'Single Arm Cable Pullover': 'src/GIF/Cable-One-Arm-Pulldown.gif',
    'good morning': '',
    'barbell rows': 'src/WorkoutsImage/Barbell-Bent-Over-Row.gif',
    'kettlebell deadlift': 'src/GIF/kettlebell.gif',
    'dumbbell deadlift': 'src/GIF2.0/anim-dumbbell-deadlifts.gif',
    'dumbbell row': 'src/WorkoutsImage/Dumbbell-Row.webp',
    'seated cable rows': 'src/WorkoutsImage/SEATED_CABLE_ROW.gif',
    'rack pull': 'src/WorkoutsImage/smith-machine-rack-pull.gif',
    'straight-arm pulldowns': 'src/WorkoutsImage/CABLE_ARM_PULL_DOWN.gif',
    'dumbbell pullovers': 'src/WorkoutsImage/pullover-haltere1.gif',
    'Machine Pulldowns': 'src/WorkoutsImage/cable-lat-pulldown.gif',
    'straight arm pulldown (FST-7)': 'src/WorkoutsImage/CABLE_ARM_PULL_DOWN.gif',
    'sumo deadlift': 'src/GIF/sumo-deadlift-from-blocks.gif',
    'block pulls': 'src/GIF/block0pull.gif',
    'Reverse Band Bench': 'src/GIF/reverse band.gif',
    'trap bar deadlift': 'src/GIF/trap bar.gif',
    
    
    // Leg exercises
    'landmine squat': 'src/GIF2.0/landmine-squat.gif',
    'barbell seated calf raises': 'src/GIF2.0/Barbell-Seated-Calf-Raise.gif',
    'dumbbell seated calf raises': 'src/GIF2.0/seated-calf-raise-dumbbell.gif',
    'good mornings': 'src/GIF2.0/Smith-Machine-Good-Morning.gif',
    'swiss ball leg curl': 'src/GIF2.0/leg-curl-on-stability-ball.gif',
    'squat': 'src/WorkoutsImage/barbell-full-squat.gif',
    'barbell squat': 'src/WorkoutsImage/barbell-full-squat.gif',
    'front squat': 'src/WorkoutsImage/front-squat.gif',
    'barbell calf raises': 'src/GIF2.0/BB_STD_CALF_RAISE.gif',
    'single leg calf raises': 'src/GIF2.0/single-leg-calf-raise.gif',
    'leg press': 'src/WorkoutsImage/leg-press.gif',
    'leg extension': 'src/WorkoutsImage/legs extension.gif',
    'leg curl': 'src/WorkoutsImage/Lying-leg-curl-gif.gif',
    'lying leg curl': 'src/WorkoutsImage/Lying-leg-curl-gif.gif',
    'lunges': 'src/WorkoutsImage/lunges.gif',
    'dumbbell lunges': 'src/WorkoutsImage/dumbbell-lunges.gif',
    'calf raises': 'src/GIF2.0/standing-calf-raise.gif',
    'walking lunges': '',
    'farmer Walk': 'src/GIF2.0/FARMER_WALK.gif',
    'dumbbell skull crusher': 'src/GIF2.0/Dumbbell-Skull-Crusher.gif',
    'machine calf raises': 'src/GIF2.0/Bench-Press-Machine-Standing-Calf-Raise.gif',
    'romanian deadlift': 'src/WorkoutsImage/barbell-romanian-deadlift-movement.gif',
    'romanian deadlifts': 'src/WorkoutsImage/barbell-romanian-deadlift-movement.gif',
    'dumbbell squat': 'src/GIF/dumbbell-front-squat.webp',
    'calf raise': 'src/WorkoutsImage/cable-standing-calf-raise.gif',
    'bodyweight sissy squat': 'src/WorkoutsImage/sissy squat.gif',
    'seated calf raises': 'src/GIF/SEAT_CALF_RAISE.gif',
    'hack squat': 'src/WorkoutsImage/reverse-hack-squat.gif',
    'hack squats': 'src/WorkoutsImage/hack-squat-min.gif',
    'bulgarian split squat': 'src/GIF2.0/BSS.gif',
    'machine squat': 'src/GIF/smith-machine-squat-benefits.gif',
    'goblet squat': 'src/GIF/explosive-goblet-squat.gif',
    'reverse lunges': 'src/GIF/reverse-deficit-lunge.gif',
    'split squats': 'src/GIF/dumbbell-split-squat.gif',
    'step ups': 'src/GIF/WEI_STEP_UP.gif',
    'leg press calf raises': 'src/GIF2.0/leg-press-calf-raise.gif',
    'donkey calf raises': 'src/GIF2.0/donkey-calf-raise.gif',
    'machine seated calf raises': 'src/GIF/Seated-Calf-Press-on-Leg-Press-Machine.gif',
    'competition squat': 'src/WorkoutsImage/Barbell-Squat.webp',
    'pause squat': 'src/WorkoutsImage/barbell-pin-squat.gif',
    'box squat': 'src/WorkoutsImage/box-squat-muscles-used.gif',
    'Seated Leg Hamstring Curl': 'src/GIF/SEAT_SL_LEG_CURL.gif',
    'Lying Hamstring Curl': 'src/WorkoutsImage/Lying-leg-curl-gif.gif',
    'Cable RDL': 'src/GIF/Stiff-Leg-Cable-Deadlift.webp',
    'hip thrusts': 'src/GIF/10601301-Barbell-Hip-Thrust_Hips_360.gif',
    'zercher squat': 'src/GIF/zercher-squat.gif',
    'belt squat': 'src/GIF/belt-squat.gif',
    'pause front squat': 'src/WorkoutsImage/front-squat.gif',
    'seated hip abduction': 'src/GIF/abductor.gif',
    'safety bar squat': 'src/GIF/safety bar squat.gif',
    
    // Arm exercises
    'machine triceps extension': 'src/GIF2.0/TRI_EXT_MC.gif',
    'dumbbell overhead extension': 'src/GIF/SEAT_DB_TRI_EXT.gif',
    'barbell overhead extension': 'src/GIF2.0/bb-overhead.gif',
    'cable overhead extension': 'src/WorkoutsImage/CABLE_OHT_EXT.gif',
    'biceps curl': 'src/WorkoutsImage/barbell-curl.gif',
    'barbell curl': 'src/WorkoutsImage/barbell-curl.gif',
    'dumbbell curl': 'src/WorkoutsImage/inner-bicep-curl.gif',
    'hammer curl': 'src/WorkoutsImage/hammer curl.gif',
    'preacher curl': 'src/WorkoutsImage/ez-bar-preacher-curl.gif',
    'concentration curl': 'src/WorkoutsImage/concentration.gif',
    'overhead tricep extension': 'src/WorkoutsImage/CABLE_OHT_EXT.gif',
    'tricep extension': 'src/GIF/v-bar-tricep-pushdown.gif',
    'triceps pushdown': 'src/WorkoutsImage/02411301-Cable-Triceps-Pushdown-V-bar-attachment_Upper-Arms_360.gif',
    'tricep pushdowns': 'src/WorkoutsImage/02411301-Cable-Triceps-Pushdown-V-bar-attachment_Upper-Arms_360.gif',
    'skull crusher': 'src/WorkoutsImage/flat-bench-skull-crusher.gif',
    'close grip bench press': 'src/WorkoutsImage/Close-Grip-Barbell-Bench-Press.webp',
    'machine curl': 'src/GIF/machine curl.gif',
    'cable curl': 'src/GIF/CABLE_CURL.gif',
    'rope hammer curl': 'src/GIF2.0/rope-hammer-curl-machine.gif',
    'barbell hammer curl': 'src/GIF2.0/tricep-bar-hammer-curl.gif',
    'Zottman curl': 'src/GIF2.0/Zottman-Curl.webp',
    'incline dumbbell curls': 'src/WorkoutsImage/INC_DB_CURL.gif',
    'overhead triceps extension': 'src/WorkoutsImage/Kneeling-Overhead-Cable-Tricep-Extension.webp',
    'wrist curl': 'src/WorkoutsImage/REV_DB_WRIST_CURL.gif',
    'Overhead Cable Triceps Extension': 'src/WorkoutsImage/CABLE_OHT_EXT.gif',
    'incline dumbbell curl': 'src/WorkoutsImage/INC_DB_CURL.gif',
    'dumbbell triceps extension': 'src/GIF2.0/dumbbell-triceps-extension.gif',
    'machine preacher curl': 'src/GIF/machine curl.gif',
    
    
    
    // Core/Ab exercises
    'plate crunches': 'src/WorkoutsImage/weighted-knee-crunch.gif',
    'sit-ups': 'src/GIF/anim-sit-ups.gif',
    'sit-up': '',
    'leg raises': 'src/GIF/captains-chair-knee-raise.gif',
    'hanging leg raises': 'src/GIF/hanging-leg-raise-movement.gif',
    'plank': '',
    'russian twist': '',
    'mountain climber': '',
    'cable crunches': 'src/GIF/Kneeling-Cable-Crunch.gif',
    'machine crunches': 'src/GIF/Seated-Ab-Crunch-Machine.gif',
    'reverse crunches': 'src/WorkoutsImage/REV_CRUNCH.gif',
    'ab wheel': '',
    'woodchopper': '',
    'side plank': '',
    'bicycle crunch': '',
    'abdominal crunches': 'src/WorkoutsImage/ab workout.gif',
    'cable rope crunches': 'src/GIF/CABLE_CRUNCH.gif',
    
    // Cardio exercises
    'running': '',
    'treadmill': '',
    'cycling': '',
    'stationary bike': 'src/GIF/Bike.gif',
    'jumping jacks': '',
    'burpees': '',
    'jump rope': '',
    'rowing': '',
    'elliptical': '',
    'stair climber': '',
    'sprinting': '',
    'hamstring curl': 'src/WorkoutsImage/Lying-leg-curl-gif.gif',
    
    // Full body/Compound exercises
    'cat-cow stretch': 'src/GIF2.0/cats crow.gif',
    'pelvic tilts': 'src/GIF2.0/pelvic tilts.gif',
    'bird-dog': 'src/GIF2.0/bird dog.gif',
    'dead bug': 'src/GIF2.0/Dead-Bug.gif',
    'walking': 'src/GIF2.0/walking.gif',
    'medicine ball slam': '',
    
    // Machine exercises
    'chest press machine': 'src/GIF/DEC_CHEST_MAC.gif',
    'machine chest press': 'src/WorkoutsImage/Incline-Chest-Press-Machine.gif',
    'shoulder press machine': '',
    'leg press machine': '',
    'cable machine': '',
    'smith machine': '',
    'machine preacher curls': 'src/GIF/PREA_CURL_MAC.gif',
    
    
    // Bodyweight exercises
    'close grip push ups': 'src/GIF2.0/-Close-Grip-Push-up_Upper-Arms_360.gif',
    'push-ups': 'src/GIF/anim-push-ups.gif',
    'dip': '',
    'planche lean': 'src/GIF2.0/lean planche.gif',
    'side plank': 'src/GIF2.0/Side-Plank.gif',
    'plank': 'src/GIF2.0/plank.gif',
    'knee raises': 'src/GIF2.0/Knee-Raises.gif',
    'pike push-ups': 'src/GIF2.0/Pike-Push-up.gif',
    'chin-ups': 'src/GIF/chin-ups.gif',
    'bodyweight squat': '',
    'negative chin-ups': 'src/GIF2.0/CHIN_UP.gif',
    'oblique crunch': 'src/GIF2.0/oblique.gif',
    'russian twists': 'src/GIF2.0/kettlebell-russian-twist.gif',
    'pistol squats': 'src/GIF/Pistol-Squat-to-Box.gif',
    'handstand push-ups': 'src/GIF/handstand-push-up.gif',
    'handstand walk': 'src/GIF/handstand-walk.gif',
    'muscle-ups': 'src/GIF/muscle-ups-movement.gif',
    'L-sit': 'src/GIF/L-Sit.gif',
    'front lever': 'src/GIF/front level.gif',
    'planche':'src/GIF/Muscles-Planche.001-1.jpeg',
    'human flag': 'src/GIF/Human-Flag.gif',
    'archer push-ups': 'src/GIF/Archer-Push-Up.webp',
    'dragon flag': 'src/GIF/dragon-flag.gif',
    'handstand hold': 'src/GIF/Handstand-Hold-1024x573.jpg',
    'bulgarian split squats': 'src/GIF/bulgarian-split-spuat.gif',
    'back lever': 'src/GIF/back-lever.webp',
    'one-arm push-ups': 'src/GIF/Single-Arm-Push-up.gif',
    'muscle-up progressions': 'src/GIF/muscle-ups-movement.gif',
    'planche push-up progressions': 'src/GIF/meia-prancha.gif',
    'pseudo planche push-ups': 'src/GIF/pseudo.gif',
    '90° push-ups': 'src/GIF/90 degree.gif',
    'one-arm pull-up progressions': 'src/GIF/Weighted-One-Arm-Pull-up.gif',
    'ring push-ups': 'src/GIF/ring-push-ups.gif',
    'ring row': 'src/GIF/Ring-Inverted-Row.gif',
    'tapping push-ups': 'src/GIF/Shoulder-Tap-Push-up.gif',
    'decline push-ups': 'src/GIF2.0/Decline-Push-Up.gif',
    'wall handstand': 'src/GIF2.0/wall handstand.gif',
    'stability ball push-ups': 'src/GIF2.0/ball push up.gif',
    'suspension trainer push-ups': 'src/GIF/ring-push-ups.gif',
    'clap push-ups': 'src/GIF2.0/clapping-push-ups.gif',


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