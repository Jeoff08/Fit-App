// Comprehensive Fitness and Health Knowledge Base with Sentence Understanding and Meal Planning
export const fitnessHealthData = {
  greetings: {
    patterns: [
      /hello/i,
      /hi/i,
      /hey/i,
      /good morning/i,
      /good afternoon/i,
      /good evening/i,
      /what's up/i,
      /how are you/i,
      /yo/i,
      /what's good/i,
      /how's it going/i,
      /greetings/i,
    ],
    responses: [
      "Hello! Ready to talk about fitness and health? 💪",
      "Hi there! How can I help with your fitness journey today?",
      "Hey! Let's discuss health and wellness! 🏃‍♂️",
      "Hello! I'm here to help with all your fitness and health questions!",
      "Hi! Excited to help you achieve your health goals today! 🌟",
      "Hey! What fitness questions can I answer for you today? 🏋️‍♂️",
    ],
  },

  // NEW: Science-Based Lift Workouts
  scienceBasedLiftWorkouts: {
    patterns: [
      /sciencebased lift workout/i,
      /science based lift workout/i,
      /scientific lift workout/i,
      /research based lift workout/i,
      /evidence based lift workout/i,
      /provide me a sciencebasedlift workout/i,
      /sciencebased strength workout/i,
      /evidence based strength training/i,
      /research backed lifting/i,
      /scientific strength program/i,
    ],
    responses: [
      `**🔬 SCIENCE-BASED LIFT WORKOUT PROGRAM 🔬**\n\n**Based on Peer-Reviewed Research:**\n\n**Strength Focus (3-4 days/week):**\n\n**Day 1: Lower Body Strength**\n• Barbell Back Squats: 4x5-8 (80-85% 1RM)\n• Romanian Deadlifts: 3x6-10\n• Leg Press: 3x8-12\n• Standing Calf Raises: 4x10-15\n• Plank: 3x60 seconds\n\n**Day 2: Upper Body Strength**\n• Bench Press: 4x5-8 (80-85% 1RM)\n• Bent Over Barbell Rows: 4x6-10\n• Overhead Press: 3x6-10\n• Pull-ups: 3x6-10\n• Face Pulls: 3x15-20\n\n**Day 3: Full Body Power**\n• Deadlifts: 3x3-5 (85-90% 1RM)\n• Front Squats: 3x5-8\n• Incline Bench Press: 3x8-12\n• Lat Pulldowns: 3x8-12\n• Ab Rollout: 3x10-15\n\n**Research-Based Principles:**\n• **Progressive Overload:** Increase weight weekly\n• **Time Under Tension:** 2-3 seconds per rep\n• **Volume:** 10-20 sets per muscle group weekly\n• **Frequency:** 2-3x per week per muscle group\n• **Rest Periods:** 2-3 minutes for compounds`,

      `**📊 SCIENCE-BASED LIFTING PROTOCOLS 📊**\n\n**Evidence-Based Strength Program:**\n\n**Based on Meta-Analysis Data:**\n\n**Phase 1: Strength Accumulation (Weeks 1-4)**\n• Focus: 70-80% 1RM\n• Reps: 6-10\n• Sets: 3-4\n• Rest: 2-3 minutes\n\n**Key Lifts (3x/week):**\n• Squat Variation: 4x6-8\n• Bench Variation: 4x6-8\n• Deadlift Variation: 3x5-8\n• Row Variation: 3x8-10\n• Overhead Press: 3x8-10\n\n**Phase 2: Strength Intensification (Weeks 5-8)**\n• Focus: 80-90% 1RM\n• Reps: 3-6\n• Sets: 4-5\n• Rest: 3-5 minutes\n\n**Key Lifts (3x/week):**\n• Heavy Squats: 5x3-5\n• Heavy Bench: 5x3-5\n• Heavy Deadlifts: 3x3-5\n• Weighted Pull-ups: 4x4-6\n• Military Press: 4x4-6\n\n**Science-Based Recovery:**\n• 48-72 hours between sessions\n• 7-9 hours sleep nightly\n• 1.6-2.2g protein per kg bodyweight\n• Carb intake around workouts`,

      `**🧪 SCIENCE-BASED LIFTING TECHNIQUES 🧪**\n\n**Optimal Training Variables (Research-Based):**\n\n**Volume (Schoenfeld et al.):**\n• **Beginners:** 10-15 sets/muscle/week\n• **Intermediate:** 15-20 sets/muscle/week\n• **Advanced:** 20-25 sets/muscle/week\n\n**Intensity (Rhea et al.):**\n• **Strength:** 80-90% 1RM for 3-6 reps\n• **Hypertrophy:** 70-80% 1RM for 8-12 reps\n• **Endurance:** 50-70% 1RM for 15-20 reps\n\n**Frequency (Bret Contreras Analysis):**\n• **2x/week:** 3.1% more growth than 1x\n• **3x/week:** 6.8% more growth than 1x\n\n**Sample Science-Based Split:**\n\n**Day 1: Heavy Compounds**\n• Squats: 4x5 (85% 1RM)\n• Bench Press: 4x5 (85% 1RM)\n• Rows: 4x8 (75% 1RM)\n\n**Day 2: Dynamic Effort**\n• Speed Squats: 8x2 (60% 1RM)\n• Speed Bench: 8x3 (60% 1RM)\n• Pull-ups: 5x5\n• Face Pulls: 3x15\n\n**Day 3: Volume Accumulation**\n• Front Squats: 3x8 (70% 1RM)\n• Incline Press: 3x10 (70% 1RM)\n• Romanian Deadlifts: 3x10\n• Lat Pulldowns: 3x12\n\n**Progressive Overload Protocol:**\n• Week 1: Master form with 70-75% 1RM\n• Week 2: Increase to 75-80% 1RM\n• Week 3: Increase to 80-85% 1RM\n• Week 4: Deload at 60-65% 1RM`,
    ],
  },

  // NEW: Workout Scheduling System
  workoutScheduling: {
    patterns: [
      /schedule|available|availability|workout days|training days/i,
      /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i,
      /what days.*workout|when.*train|available.*train/i,
      /create.*schedule|make.*schedule|design.*schedule/i,
      /workout.*plan.*days|training.*schedule/i,
      /my days are|i am available|i can train/i,
      /schedule.*workout|workout.*schedule/i,
      /days.*available|available.*days/i,
      /plan.*workout.*days|design.*workout.*days/i,
      /custom.*schedule|personalized.*schedule/i,
      /help.*schedule|create.*routine.*days/i,
      /merge.*ppl.*upper.*lower/i,
      /combine.*ppl.*upper.*lower/i,
      /mixed.*split/i,
      /hybrid.*split/i,
      /custom.*split/i,
    ],
    responses: [
      "I can create a custom workout schedule for you! Tell me which days you're available and your preferred workout style (PPL, Upper/Lower, Bro Split, or Mixed).",

      "Let me design your perfect workout schedule! Please specify:\n• Your available days (e.g., Monday, Wednesday, Friday)\n• Your preferred training style (PPL, Upper/Lower, Bro Split, or Mixed)\n• Your experience level (beginner, intermediate, advanced)",

      "I'll build a customized workout plan for your schedule! Just tell me:\n• Which days you can train\n• What type of split you prefer\n• Your fitness level\n\nExample: 'I'm available Monday, Wednesday, Friday and prefer PPL/Upper Lower mix as an intermediate'",
    ],
  },

  // NEW: Comprehensive Beginner Workout Section
  beginnerWorkouts: {
    patterns: [
      /beginner workout/i,
      /workout for beginner/i,
      /starting out/i,
      /new to fitness/i,
      /just starting/i,
      /beginner routine/i,
      /first time gym/i,
      /never worked out/i,
      /how to start working out/i,
      /beginner exercise/i,
      /easy workout/i,
      /simple workout/i,
      /basic workout/i,
      /workout for newbie/i,
      /fitness beginner/i,
      /just begun/i,
      /starting fitness/i,
      /novice workout/i,
      /entry level workout/i,
      /what.*beginner/i,
      /how.*beginner/i,
      /best.*beginner/i,
      /recommend.*beginner/i,
      /suggest.*beginner/i,
      /beginner.*start/i,
      /beginner.*program/i,
      /beginner.*plan/i,
      /beginner.*routine/i,
      /first.*workout/i,
      /new.*workout/i,
      /never.*exercise/i,
      /never.*train/i,
      /just.*started/i,
      /just.*begin/i,
      /where.*start/i,
      /how.*start/i,
      /what.*start/i,
      /beginner friendly/i,
      /easy.*start/i,
      /simple.*start/i,
      /basic.*start/i,
      /first time.*gym/i,
      /first time.*workout/i,
      /gym beginner/i,
      /exercise beginner/i,
      /training beginner/i,
      /fitness newbie/i,
      /workout newbie/i,
      /gym newbie/i,
      /exercise newbie/i,
      /training newbie/i,
    ],
    responses: [
      `**🏋️‍♂️ COMPLETE BEGINNER WORKOUT GUIDE 🏋️‍♂️**\n\n**Starting Point: Full Body Workouts (3 days/week)**\n\n**Why Full Body?**\n• Builds overall strength foundation\n• Teaches proper movement patterns\n• Allows adequate recovery between sessions\n• Perfect for learning basic exercises\n\n**Sample Beginner Full Body Workout:**\n\n**Workout A:**\n• Goblet Squats: 3x10-12\n• Push-ups (knee or wall if needed): 3x8-12\n• Bent Over Dumbbell Rows: 3x10-12\n• Plank: 3x30-60 seconds\n• Bodyweight Lunges: 3x10 per leg\n• Bird Dogs: 3x10 per side\n\n**Workout B:**\n• Bodyweight Squats: 3x15-20\n• Dumbbell Bench Press: 3x10-12\n• Lat Pulldowns: 3x10-12\n• Glute Bridges: 3x12-15\n• Dumbbell Shoulder Press: 3x10-12\n• Lying Leg Raises: 3x12-15\n\n**Schedule:** Mon-A, Wed-B, Fri-A (next week: Mon-B, Wed-A, Fri-B)`,

      `**🚀 BEGINNER WORKOUT PROGRAM 🚀**\n\n**Phase 1: Foundation Building (Weeks 1-4)**\n\n**Full Body Workout (3x/week):**\n• Squats: 3x10-15\n• Push-ups: 3x8-12\n• Rows: 3x10-12\n• Plank: 3x30-45 sec\n• Lunges: 3x10 per leg\n• Glute Bridges: 3x12-15\n\n**Key Principles for Beginners:**\n1. **Focus on Form:** Quality over quantity\n2. **Start Light:** Use manageable weights\n3. **Consistency:** 3 days/week is perfect\n4. **Progressive Overload:** Add weight/reps gradually\n5. **Rest:** 48 hours between workouts\n6. **Listen to Your Body:** Some soreness is normal\n\n**Progression:**\n• Week 1-2: Master form with light weights\n• Week 3-4: Gradually increase weight\n• Week 5+: Consider moving to Upper/Lower split`,

      `**🌟 BEGINNER-FRIENDLY WORKOUT OPTIONS 🌟**\n\n**Option 1: Bodyweight Only (Home)**\n• Squats: 3x15-20\n• Push-ups: 3x8-15\n• Plank: 3x30-60 sec\n• Lunges: 3x10-12 per leg\n• Glute Bridges: 3x15-20\n• Bird Dogs: 3x10 per side\n• Superman: 3x12-15\n\n**Option 2: Gym Machine Circuit**\n• Leg Press: 3x12-15\n• Chest Press Machine: 3x10-12\n• Lat Pulldown: 3x10-12\n• Leg Curl: 3x12-15\n• Shoulder Press Machine: 3x10-12\n• Seated Row: 3x10-12\n\n**Option 3: Dumbbell Focus**\n• Goblet Squats: 3x10-12\n• Dumbbell Bench Press: 3x10-12\n• Dumbbell Rows: 3x10-12 per arm\n• Dumbbell Lunges: 3x8-10 per leg\n• Dumbbell Shoulder Press: 3x10-12\n• Dumbbell Curls: 3x10-12\n\n**Beginner Tips:**\n• Start with 2-3 sets of 10-15 reps\n• Rest 60-90 seconds between sets\n• Always warm up 5-10 minutes\n• Cool down with light stretching`,

      `**📊 BEGINNER WORKOUT PROGRESSION PLAN 📊**\n\n**Month 1: Learning Phase**\n**Focus:** Master basic movements, build consistency\n**Frequency:** 3 days/week full body\n**Key Exercises:** Squat, Push, Pull, Hinge, Carry\n\n**Sample Workout:**\n1. **Squat Variation:** Bodyweight Squats or Goblet Squats\n2. **Push Variation:** Push-ups or Bench Press\n3. **Pull Variation:** Rows or Lat Pulldowns\n4. **Hinge Variation:** Romanian Deadlifts or Good Mornings\n5. **Core:** Plank, Bird Dogs, Dead Bugs\n\n**Month 2: Building Phase**\n**Focus:** Increase intensity, add volume\n**Frequency:** 3-4 days/week\n**Changes:** Add 1-2 exercises, increase weight\n\n**Month 3: Progress Phase**\n**Focus:** Solidify routine, consider split\n**Options:** Continue full body or try Upper/Lower\n\n**Beginner Mistakes to Avoid:**\n• Starting too heavy\n• Skipping warm-ups\n• Poor form\n• Inconsistency\n• Comparing to others`,

      `**💡 BEGINNER WORKOUT TIPS & STRATEGIES 💡**\n\n**Getting Started Right:**\n\n**1. Start Simple:**\n• 3 workouts per week\n• 6-8 exercises per session\n• Full body each time\n• 45-60 minutes per workout\n\n**2. Exercise Selection:**\n• Compound movements first\n• Machines are great for beginners\n• Bodyweight exercises build foundation\n• Focus on movement patterns\n\n**3. Progressive Overload Made Simple:**\n• Week 1: Focus on perfect form\n• Week 2: Add 1-2 reps per set\n• Week 3: Add small amount of weight\n• Week 4: Master new weight\n\n**4. Recovery for Beginners:**\n• Sleep 7-9 hours nightly\n• Eat enough protein\n• Stay hydrated\n• Active recovery on off days\n\n**5. Common Questions Answered:**\n• **Soreness?** Normal for first 2-3 weeks\n• **Weight selection?** Light enough for perfect form\n• **When to advance?** After 4-6 weeks of consistency\n• **Cardio?** 2-3 days of light cardio on off days\n\n**Remember:** Every expert was once a beginner! Focus on consistency over perfection. 🎯`,
    ],
  },

  // NEW: Intermediate Level Workouts
  intermediateWorkouts: {
    patterns: [
      /intermediate workout/i,
      /workout for intermediate/i,
      /been working out for a while/i,
      /past beginner stage/i,
      /intermediate routine/i,
      /what.*intermediate/i,
      /how.*intermediate/i,
      /best.*intermediate/i,
      /recommend.*intermediate/i,
      /suggest.*intermediate/i,
      /intermediate.*program/i,
      /intermediate.*plan/i,
      /intermediate.*routine/i,
      /6 months.*training/i,
      /1 year.*training/i,
      /2 years.*training/i,
      /experienced.*workout/i,
      /not a beginner/i,
      /beyond beginner/i,
      /intermediate level/i,
      /mid level workout/i,
      /moderate experience/i,
    ],
    responses: [
      `**💪 INTERMEDIATE WORKOUT PROGRAM (6 months - 2 years training) 💪**\n\n**Upper/Lower Split (4 days/week)**\n\n**Upper Body A (Strength Focus):**\n• Bench Press: 4x6-8\n• Bent Over Rows: 4x6-8\n• Overhead Press: 3x8-10\n• Pull-ups: 3x6-10\n• Incline Dumbbell Press: 3x8-12\n• Face Pulls: 3x15-20\n\n**Lower Body A (Strength Focus):**\n• Squats: 4x6-8\n• Romanian Deadlifts: 3x8-10\n• Leg Press: 3x10-12\n• Leg Curls: 3x10-12\n• Calf Raises: 4x12-15\n\n**Upper Body B (Hypertrophy Focus):**\n• Incline Bench Press: 4x8-12\n• Lat Pulldowns: 4x8-12\n• Dumbbell Shoulder Press: 3x10-12\n• Chest Supported Rows: 3x10-12\n• Lateral Raises: 3x12-15\n• Tricep/Bicep Superset: 3x10-12\n\n**Lower Body B (Hypertrophy Focus):**\n• Deadlifts: 3x5-8\n• Front Squats: 3x8-10\n• Bulgarian Split Squats: 3x10-12 per leg\n• Leg Extensions: 3x12-15\n• Seated Calf Raises: 4x15-20\n\n**Schedule:** Mon-Upper A, Tue-Lower A, Wed-Rest, Thu-Upper B, Fri-Lower B, Weekend-Rest`,

      `**🔥 INTERMEDIATE PPL VARIATION 🔥**\n\n**Push Day:**\n• Bench Press: 4x6-10\n• Overhead Press: 3x8-12\n• Incline Dumbbell Press: 3x10-12\n• Lateral Raises: 4x12-15\n• Tricep Pushdowns: 3x12-15\n• Overhead Tricep Extensions: 3x10-12\n\n**Pull Day:**\n• Deadlifts: 3x5-8\n• Pull-ups: 4x6-10\n• Barbell Rows: 4x8-10\n• Face Pulls: 3x15-20\n• Bicep Curls: 3x10-12\n• Hammer Curls: 3x10-12\n\n**Legs Day:**\n• Squats: 4x6-10\n• Romanian Deadlifts: 3x8-10\n• Leg Press: 3x10-15\n• Leg Curls: 3x12-15\n• Calf Raises: 4x15-20\n• Lunges: 3x10-12 per leg\n\n**Intermediate Training Principles:**\n• Focus on progressive overload\n• Incorporate periodization\n• Train each muscle 2x/week\n• Increase training volume gradually\n• Master exercise variations`,

      `**🎯 INTERMEDIATE PROGRESSION STRATEGIES 🎯**\n\n**Phase 1: Volume Accumulation (4-6 weeks)**\n• Focus on 8-12 rep range\n• Increase sets gradually\n• Perfect exercise form\n• Build work capacity\n\n**Phase 2: Strength Focus (4-6 weeks)**\n• Focus on 4-8 rep range\n• Increase intensity\n• Maintain volume\n• Focus on compound lifts\n\n**Phase 3: Intensity Techniques (4 weeks)**\n• Dropsets on last sets\n• Rest-pause training\n• Supersets for smaller muscles\n• Controlled negatives\n\n**Key Intermediate Metrics:**\n• Bench Press: 1x body weight\n• Squat: 1.5x body weight\n• Deadlift: 2x body weight\n• Train 4-5 days/week\n• Recovery becomes crucial`,
    ],
  },

  // NEW: Advanced Level Workouts
  advancedWorkouts: {
    patterns: [
      /advanced workout/i,
      /workout for advanced/i,
      /been training for years/i,
      /advanced routine/i,
      /what.*advanced/i,
      /how.*advanced/i,
      /best.*advanced/i,
      /recommend.*advanced/i,
      /suggest.*advanced/i,
      /advanced.*program/i,
      /advanced.*plan/i,
      /advanced.*routine/i,
      /3 years.*training/i,
      /5 years.*training/i,
      /expert.*workout/i,
      /high level workout/i,
      /elite workout/i,
      /competitive.*training/i,
      /bodybuilder workout/i,
      /powerlifter workout/i,
      /athlete workout/i,
    ],
    responses: [
      `**🏆 ADVANCED WORKOUT PROGRAM (2-5+ years training) 🏆**\n\n**High Frequency PPL (6 days/week)**\n\n**Push Day A (Heavy):**\n• Bench Press: 5x3-5\n• Close Grip Bench Press: 4x6-8\n• Military Press: 4x6-8\n• Weighted Dips: 3x8-10\n• Plate Loaded Shoulder Press: 3x8-10\n\n**Pull Day A (Heavy):**\n• Deadlifts: 3x3-5\n• Weighted Pull-ups: 4x6-8\n• Pendlay Rows: 4x6-8\n• Chest Supported Rows: 3x8-10\n• Barbell Curls: 4x8-10\n\n**Legs Day A (Heavy):**\n• Low Bar Squats: 5x3-5\n• Power Cleans: 5x3\n• Bulgarian Split Squats: 3x8-10 per leg\n• Good Mornings: 3x8-10\n• Standing Calf Raises: 4x10-12\n\n**Push Day B (Volume):**\n• Incline Dumbbell Press: 4x8-12\n• Dumbbell Shoulder Press: 4x10-12\n• Cable Flyes: 3x15-20\n• Lateral Raises: 4x15-20\n• Tricep Extensions: 3x12-15\n\n**Pull Day B (Volume):**\n• T-Bar Rows: 4x8-12\n• Wide Grip Pulldowns: 3x10-15\n• Single Arm Dumbbell Rows: 3x12-15 per arm\n• Reverse Flyes: 3x15-20\n• Preacher Curls: 3x10-12\n\n**Legs Day B (Volume):**\n• Front Squats: 4x8-12\n• Romanian Deadlifts: 3x10-12\n• Hack Squats: 3x10-15\n• Leg Extensions: 4x15-20\n• Lying Leg Curls: 3x12-15\n• Seated Calf Raises: 5x15-20`,

      `**💀 ADVANCED SPECIALIZATION PROGRAMS 💀**\n\n**Strength Focus (Powerlifting Style):**\n• **Day 1:** Heavy Squats + accessories\n• **Day 2:** Heavy Bench + accessories\n• **Day 3:** Heavy Deadlifts + accessories\n• **Day 4:** Volume variants + weaknesses\n• **Key:** Low reps, high intensity, long rest periods\n\n**Hypertrophy Focus (Bodybuilding Style):**\n• **Chest/Back:** High volume, multiple angles\n• **Shoulders/Arms:** Isolation focus, pumps\n• **Legs:** Quad/Hamstring/Glute focus\n• **Key:** Moderate reps, high volume, shorter rest\n\n**Athletic Performance:**\n• **Power:** Olympic lifts, explosive movements\n• **Strength:** Basic compounds heavy\n• **Conditioning:** Sport-specific cardio\n• **Mobility:** Dynamic stretching, recovery`,

      `**⚡ ADVANCED TRAINING TECHNIQUES ⚡**\n\n**Intensity Methods:**\n• **Dropsets:** Reduce weight after failure\n• **Rest-Pause:** Brief rest then continue set\n• **Supersets:** Back-to-back exercises\n• **Giant Sets:** 4+ exercises consecutively\n• **Partial Reps:** Beyond failure with partial ROM\n\n**Advanced Periodization:**\n• **Daily Undulating:** Change intensity daily\n• **Block Periodization:** Focus on one quality\n• **Conjugate System:** Train multiple qualities\n• **Auto-regulation:** Adjust based on daily performance\n\n**Recovery Protocols:**\n• **Active Recovery:** Light movement on rest days\n• **Mobility Work:** Daily stretching routine\n• **Nutrition Timing:** Pre/during/post workout nutrition\n• **Sleep Optimization:** 8+ hours with quality cycles`,
    ],
  },

  // NEW: Elite Level Workouts
  eliteWorkouts: {
    patterns: [
      /elite workout/i,
      /workout for elite/i,
      /professional athlete/i,
      /competitive bodybuilder/i,
      /powerlifter routine/i,
      /olympic lifter/i,
      /what.*elite/i,
      /how.*elite/i,
      /best.*elite/i,
      /recommend.*elite/i,
      /suggest.*elite/i,
      /elite.*program/i,
      /elite.*plan/i,
      /elite.*routine/i,
      /5\+ years.*training/i,
      /10 years.*training/i,
      /professional.*training/i,
      /competition.*prep/i,
      /peak.*performance/i,
      /world class/i,
      /champion workout/i,
    ],
    responses: [
      `**👑 ELITE ATHLETE TRAINING PROGRAMS 👑**\n\n**Elite Powerlifting Program:**\n\n**Day 1: Competition Squat**\n• Squats: 8x2-5 (varying intensities)\n• Competition Pause Squats: 5x3\n• Belt Squats: 4x8-12\n• Leg Extensions: 5x15-20\n• Abs: 5x20-30\n\n**Day 2: Competition Bench**\n• Bench Press: 8x2-5 (varying intensities)\n• Competition Pause Bench: 5x3\n• Close Grip Bench: 4x6-8\n• Tricep Extensions: 5x12-15\n• Face Pulls: 5x20-25\n\n**Day 3: Competition Deadlift**\n• Deadlifts: 8x1-3 (varying intensities)\n• Deficit Deadlifts: 5x3\n• Romanian Deadlifts: 4x6-8\n• Lat Pulldowns: 5x8-12\n• Rows: 5x8-12\n\n**Day 4: Accessory/Weak Points**\n• Focus on individual weaknesses\n• Corrective exercises\n• Mobility and recovery work\n\n**Elite Bodybuilding Split:**\n\n**Day 1: Chest**\n• Incline Barbell: 6x6-12\n• Flat Dumbbell: 5x8-15\n• Decline Machine: 4x10-15\n• Cable Crossovers: 4x15-20\n• Pec Deck: 4x15-20\n\n**Day 2: Back**\n• Deadlifts: 5x3-8\n• Weighted Pull-ups: 5x6-10\n• T-Bar Rows: 5x8-12\n• Single Arm Rows: 4x10-15\n• Straight Arm Pulldowns: 4x15-20\n\n**Day 3: Shoulders**\n• Military Press: 6x6-12\n• Lateral Raises: 6x12-20\n• Rear Delt Flyes: 5x15-20\n• Front Raises: 4x12-15\n• Shrugs: 5x12-20\n\n**Day 4: Arms**\n• Close Grip Bench: 5x8-12\n• Barbell Curls: 5x8-12\n• Tricep Dips: 4x10-15\n• Preacher Curls: 4x10-15\n• Overhead Extensions: 4x12-15\n• Concentration Curls: 4x12-15\n\n**Day 5: Legs**\n• Squats: 6x6-12\n• Leg Press: 5x10-20\n• Hack Squats: 4x10-15\n• Leg Extensions: 5x15-25\n• Leg Curls: 5x12-20\n• Calf Raises: 8x15-25`,

      `**🏅 ELITE PERFORMANCE PRINCIPLES 🏅**\n\n**Training Variables Mastery:**\n• **Volume:** 20-30+ sets per muscle weekly\n• **Intensity:** 60-95% 1RM regularly\n• **Frequency:** 2-3x per muscle weekly\n• **Density:** More work in less time\n• **Specificity:** Sport-specific adaptations\n\n**Recovery Optimization:**\n• **Sleep:** 9+ hours with tracking\n• **Nutrition:** Precise macro/micro management\n• **Hydration:** Electrolyte balance\n• **Active Recovery:** Structured deloads\n• **Therapies:** Massage, cryo, compression\n\n**Mental Performance:**\n• **Visualization:** Mental rehearsal\n• **Focus Training:** Concentration drills\n• **Stress Management:** Cortisol control\n• **Mind-Muscle Connection:** Enhanced activation`,

      `**🌡️ ELITE PERIODIZATION MODELS 🌡️**\n\n**Competition Peak Program:**\n\n**Phase 1: Accumulation (8 weeks)**\n• High volume, moderate intensity\n• Build work capacity\n• Address weaknesses\n• Focus on hypertrophy\n\n**Phase 2: Intensification (6 weeks)**\n• Moderate volume, high intensity\n• Increase strength\n• Maintain muscle mass\n• Practice competition lifts\n\n**Phase 3: Peaking (4 weeks)**\n• Low volume, very high intensity\n• Practice competition attempts\n• Perfect technique\n• Mental preparation\n\n**Phase 4: Taper (1-2 weeks)**\n• Very low volume, moderate intensity\n• Supercompensation\n• Full recovery\n• Peak performance\n\n**Elite Recovery Protocols:**\n• **Daily:** Mobility work, contrast showers\n• **Weekly:** Massage, active recovery sessions\n• **Monthly:** Deload weeks, performance testing\n• **Seasonal:** Extended breaks, rehabilitation`,
    ],
  },

  // NEW: Science-Based Workouts
  scienceBasedWorkouts: {
    patterns: [
      /science based workout/i,
      /evidence based workout/i,
      /research based workout/i,
      /scientific workout/i,
      /what does science say/i,
      /proven workout/i,
      /effective workout research/i,
      /workout based on studies/i,
      /peer reviewed workout/i,
      /academic workout/i,
      /university study workout/i,
      /meta analysis workout/i,
      /scientifically proven/i,
      /evidence based training/i,
      /research backed workout/i,
      /optimal workout science/i,
      /most effective workout research/i,
      /workout efficiency studies/i,
    ],
    responses: [
      `**🔬 SCIENCE-BASED TRAINING PRINCIPLES 🔬**\n\n**Evidence-Based Volume Recommendations:**\n\n**Based on Schoenfeld Meta-Analysis (2017):**\n• **Beginners:** 10-15 sets/muscle/week\n• **Intermediate:** 15-20 sets/muscle/week\n• **Advanced:** 20-25+ sets/muscle/week\n• **Key Finding:** 10+ sets/week showed 40% more growth\n\n**Optimal Rep Ranges (Science):**\n• **Strength:** 1-6 reps (85-100% 1RM)\n• **Hypertrophy:** 6-15 reps (65-85% 1RM)\n• **Endurance:** 15+ reps (<65% 1RM)\n• **Mixed Approach:** Periodize through all ranges\n\n**Frequency Research (Bret Contreras):**\n• **2x/week:** 3.1% more growth than 1x\n• **3x/week:** 6.8% more growth than 1x\n• **Key:** Higher frequency = better results\n• **Practical:** Train each muscle 2-3x weekly`,

      `**📊 SCIENCE-BASED WORKOUT STRUCTURES 📊**\n\n**Research-Backed PPL Program:**\n\n**Push Day (Evidence-Based):**\n• Bench Press: 3x5-8 (strength)\n• Incline Dumbbell: 3x8-12 (hypertrophy)\n• Overhead Press: 3x6-10 (strength)\n• Lateral Raises: 4x12-15 (metabolic stress)\n• Tricep Pushdowns: 3x12-15 (pump)\n\n**Pull Day (Evidence-Based):**\n• Deadlifts: 2x3-5 (strength)\n• Pull-ups: 4x6-10 (hypertrophy)\n• Barbell Rows: 4x8-10 (hypertrophy)\n• Face Pulls: 3x15-20 (prehab)\n• Bicep Curls: 3x10-15 (pump)\n\n**Legs Day (Evidence-Based):**\n• Squats: 3x5-8 (strength)\n• Romanian Deadlifts: 3x8-12 (hypertrophy)\n• Leg Press: 3x10-15 (volume)\n• Leg Curls: 3x12-15 (isolation)\n• Calf Raises: 4x15-20 (endurance)\n\n**Science-Based Schedule:**\n• **Frequency:** Each muscle 2x/week\n• **Volume:** 15-20 sets/muscle/week\n• **Intensity:** Vary 65-85% 1RM\n• **Progression:** 2.5-5% weekly increase`,

      `**🧪 ADVANCED SCIENCE-BASED TECHNIQUES 🧪**\n\n**Time Under Tension (TUT) Research:**\n• **Optimal TUT:** 40-70 seconds per set\n• **Concentric:** 1-3 seconds\n• **Eccentric:** 2-4 seconds (most important)\n• **Isometric:** 0-2 seconds\n• **Total:** 6-10 reps at this tempo\n\n**Rest Period Science:**\n• **Strength (heavy compounds):** 3-5 minutes\n• **Hypertrophy (moderate):** 60-90 seconds\n• **Endurance (light):** 30-60 seconds\n• **Supersets:** 60-120 seconds between pairs\n\n**Progressive Overload Evidence:**\n• **Weekly Progression:** 2.5-5% increase\n• **Volume Landmarks:** Add sets at sticking points\n• **Intensity Cycling:** Wave loading patterns\n• **Autoregulation:** RPE-based training\n\n**Recovery Science:**\n• **Protein Timing:** 20-40g every 3-4 hours\n• **Sleep Quality:** 7-9 hours with deep cycles\n• **Nutrient Timing:** Carbs around training\n• **Hydration:** 3-5L daily, more if training hard`,

      `**🎯 SCIENCE-BASED SPECIALIZATION 🎯**\n\n**Research-Backed Strength Program:**\n\n**Based on Russian Sports Science:**\n• **Volume:** 15-25 reps total at 80-90% 1RM\n• **Frequency:** 3-4x weekly per lift\n• **Variation:** Different exercises same pattern\n• **Deload:** Every 4-6 weeks\n\n**Evidence-Based Hypertrophy:**\n\n**Based on Multiple Meta-Analyses:**\n• **Volume:** 10-20 sets/muscle/week\n• **Intensity:** 6-15 reps (65-85% 1RM)\n• **Frequency:** 2-3x weekly per muscle\n• **Progression:** Add reps, then weight, then sets\n\n**Optimal Exercise Selection (Science):**\n• **Chest:** Incline press shows most activation\n• **Back:** Rows and pulldowns equally effective\n• **Legs:** Squats and deadlifts complementary\n• **Shoulders:** Overhead press + lateral raises\n\n**Practical Application:**\n• **Track Everything:** Volume, intensity, progress\n• **Test Regularly:** Strength markers monthly\n• **Adjust Based on Recovery:** Auto-regulation\n• **Periodize:** Change focus every 4-8 weeks`,
    ],
  },

  // COMPREHENSIVE: Enhanced workout category with sentence patterns
  workouts: {
    patterns: [
      /workout/i,
      /exercise/i,
      /training/i,
      /cardio/i,
      /strength/i,
      /weight lifting/i,
      /gym/i,
      /running/i,
      /push.?up/i,
      /squat/i,
      /deadlift/i,
      /bench press/i,
      /pull.?up/i,
      /crunch/i,
      /plank/i,
      /burpee/i,
      /lunges?/i,
      /shoulder press/i,
      /bicep curl/i,
      /tricep extension/i,
      /leg press/i,
      /lat pulldown/i,
      /row.?ing/i,
      /fitness routine/i,
      /training program/i,
      /exercise plan/i,
      /how to (workout|exercise|train)/i,
      /best exercise/i,
      /effective workout/i,
      /what.*exercise/i,
      /how.*train/i,
      /which.*workout/i,
      /recommend.*exercise/i,
      /suggest.*workout/i,
      /create.*routine/i,
      /build.*program/i,
      /start.*exercising/i,
      /begin.*working out/i,
      /new.*fitness/i,
      /home workout/i,
      /gym routine/i,
      /daily exercise/i,
      /workout plan/i,
      /training schedule/i,
      /fitness plan/i,
      /exercise routine/i,
    ],
    responses: [
      "For beginners, start with 3 days of strength training and 2 days of cardio per week.",
      "A balanced workout routine should include strength training, cardio, and flexibility exercises.",
      "Remember to warm up for 5-10 minutes before workouts and cool down afterward!",
      "Progressive overload is key - gradually increase weight or reps to keep making gains.",
      "Focus on compound movements like squats, deadlifts, and bench presses for maximum efficiency.",
      "Proper form is more important than heavy weights - always prioritize technique!",
      "Mix up your routine every 4-6 weeks to prevent plateaus and keep making progress.",
      "Don't forget to include mobility work and stretching in your routine for injury prevention.",
    ],
  },

  // ENHANCED: Workout Split Comparison with sentence patterns
  workoutComparison: {
    patterns: [
      /is (ppl|push.?pull.?legs?) good/i,
      /is (upper.?lower|upper lower) good/i,
      /is (bro.?split|bro split) good/i,
      /which (split|workout) (is best|should I do)/i,
      /compare (ppl|upper.?lower|bro.?split)/i,
      /(ppl|upper.?lower|bro.?split) vs\.? (ppl|upper.?lower|bro.?split)/i,
      /best (split|routine|workout)/i,
      /should I do (ppl|push.?pull.?legs?|upper.?lower|bro.?split)/i,
      /(ppl|upper.?lower|bro.?split).*good/i,
      /good.*(ppl|upper.?lower|bro.?split)/i,
      /is (ppl|push.?pull.?legs?) good for (beginners|intermediate|advanced)/i,
      /is (upper.?lower|upper lower) good for (beginners|intermediate|advanced)/i,
      /is (bro.?split|bro split) good for (beginners|intermediate|advanced)/i,
      /should (beginners|intermediate|advanced) do (ppl|push.?pull.?legs?|upper.?lower|bro.?split)/i,
      /(ppl|upper.?lower|bro.?split) for (beginners|intermediate|advanced)/i,
      /(beginners|intermediate|advanced).*(ppl|upper.?lower|bro.?split)/i,
      /which.*better.*(ppl|upper.?lower|bro.?split)/i,
      /difference between.*(ppl|upper.?lower|bro.?split)/i,
      /what.*difference.*(ppl|upper.?lower|bro.?split)/i,
      /how.*choose.*(split|routine)/i,
      /which one.*should.*choose/i,
      /recommend.*split/i,
      /suggest.*routine/i,
      /what.*best.*for.*(beginners|intermediate|advanced)/i,
      /help.*choose.*workout/i,
      /can't decide.*split/i,
      /confused.*which.*routine/i,
      /what.*difference.*(ppl|upper lower|bro split)/i,
      /which.*better/i,
      /compare.*workouts?/i,
      /workout.*comparison/i,
      /routine.*compare/i,
    ],
    responses: [
      "**PPL (Push/Pull/Legs) - Great for:**\n• Intermediate to advanced lifters\n• Training each muscle 2x per week\n• Balanced frequency and volume\n• Good for both strength and hypertrophy\n• Flexible scheduling (3-6 days/week)\n\n**Upper/Lower - Great for:**\n• Beginners to intermediate lifters\n• Training each muscle 2x per week\n• Balanced approach\n• Good for strength building\n• 4 days/week is optimal\n\n**Bro Split - Great for:**\n• Advanced bodybuilders\n• High volume per muscle group\n• Experienced lifters with good recovery\n• Focus on one muscle group per day\n• 5-6 days/week schedule\n\n**Recommendation:**\n• **Beginners:** Start with Upper/Lower or Full Body\n• **Intermediate:** PPL or Upper/Lower work well\n• **Advanced:** PPL or Bro Split depending on goals",

      "**Which split is right for you?**\n\n**PPL:** Best if you can train 3-6 days/week and want balanced frequency. Great for most people!\n\n**Upper/Lower:** Perfect if you prefer 4 days/week training. Excellent for strength and balanced development.\n\n**Bro Split:** Ideal if you're advanced, have great recovery, and want maximum volume per muscle group.\n\n**All three are effective** when properly programmed and consistent! The best split is the one you'll stick with long-term.",

      "**Workout Split Effectiveness:**\n\n✅ **PPL:** Very effective for most people - hits each muscle 2x/week with good volume\n\n✅ **Upper/Lower:** Highly effective - great frequency and balanced approach\n\n✅ **Bro Split:** Effective for advanced lifters - allows high volume per session\n\n**Key Factors:**\n• Your training experience\n• Recovery ability\n• Schedule availability\n• Personal preferences\n• Specific goals (strength vs. hypertrophy)\n\n**Bottom Line:** Consistency and progressive overload matter more than the specific split!",
    ],
  },

  // ENHANCED: PPL Workout Plans with multiple variations and alternative phrasing
  pplWorkouts: {
    patterns: [
      /ppl workout/i,
      /push pull legs? workout/i,
      /provide.*ppl/i,
      /give.*ppl/i,
      /show.*ppl/i,
      /create.*ppl/i,
      /make.*ppl/i,
      /design.*ppl/i,
      /ppl routine/i,
      /push pull legs? routine/i,
      /ppl program/i,
      /push pull legs? program/i,
      /ppl training/i,
      /push pull legs? training/i,
      /ppl split workout/i,
      /push pull legs? split workout/i,
      /i want ppl/i,
      /need ppl workout/i,
      /looking for ppl/i,
      /suggest ppl/i,
      /recommend ppl/i,
      /can you.*ppl/i,
      /want.*ppl/i,
      /get.*ppl/i,
      /need.*push pull/i,
      /want.*push pull/i,
      /show.*push pull/i,
      /give.*push pull/i,
      /create.*push pull/i,
      /make.*push pull/i,
      /design.*push pull/i,
      /ppl plan/i,
      /push pull legs? plan/i,
      /ppl schedule/i,
      /push pull legs? schedule/i,
      /ppl split/i,
      /push pull legs? split/i,
      /i need a ppl/i,
      /can i get ppl/i,
      /hook me up with ppl/i,
      /ppl workout plan/i,
      /push pull legs? workout plan/i,
    ],
    responses: [
      `**PPL Workout Variation 1 - Balanced Strength & Hypertrophy**\n\n**Push Day (Chest, Shoulders, Triceps):**\n• Barbell Bench Press: 4x8-12\n• Overhead Press: 3x8-12\n• Incline Dumbbell Press: 3x10-15\n• Lateral Raises: 3x12-15\n• Tricep Pushdowns: 3x12-15\n• Skull Crushers: 3x10-12\n\n**Pull Day (Back, Biceps):**\n• Pull-ups/Lat Pulldowns: 4x8-12\n• Barbell Rows: 4x8-12\n• Face Pulls: 3x15-20\n• Bicep Curls: 3x10-15\n• Hammer Curls: 3x10-15\n• Seated Cable Rows: 3x10-12\n\n**Legs Day (Quads, Hamstrings, Glutes, Calves):**\n• Squats: 4x6-10\n• Deadlifts: 3x5-8\n• Leg Press: 3x10-15\n• Leg Curls: 3x12-15\n• Calf Raises: 4x15-20\n• Lunges: 3x10-12 per leg\n\n**Schedule:** Mon-Push, Tue-Pull, Wed-Legs, Thu-Rest, Fri-Push, Sat-Pull, Sun-Rest`,

      `**PPL Workout Variation 2 - Hypertrophy Focus**\n\n**Push Day:**\n• Dumbbell Bench Press: 4x10-15\n• Incline Barbell Press: 3x10-12\n• Cable Crossovers: 3x15-20\n• Dumbbell Shoulder Press: 3x10-15\n• Cable Lateral Raises: 4x15-20\n• Overhead Tricep Extensions: 3x12-15\n• Dips: 3x failure\n\n**Pull Day:**\n• T-Bar Rows: 4x10-12\n• Wide Grip Pulldowns: 3x10-15\n• Single Arm Dumbbell Rows: 3x12-15 per arm\n• Reverse Flyes: 3x15-20\n• Preacher Curls: 3x10-12\n• Concentration Curls: 3x12-15\n\n**Legs Day:**\n• Front Squats: 4x8-12\n• Romanian Deadlifts: 3x10-12\n• Hack Squats: 3x10-15\n• Leg Extensions: 4x15-20\n• Lying Leg Curls: 3x12-15\n• Seated Calf Raises: 5x15-20\n\n**Schedule:** Push-Pull-Legs-Rest-Repeat`,

      `**PPL Workout Variation 3 - Strength Focus**\n\n**Push Day:**\n• Bench Press: 5x5 (heavy)\n• Close Grip Bench Press: 4x6-8\n• Military Press: 4x6-8\n• Weighted Dips: 3x8-10\n• Plate Loaded Shoulder Press: 3x8-10\n• JM Press: 3x8-10\n\n**Pull Day:**\n• Deadlifts: 3x3-5 (heavy)\n• Weighted Pull-ups: 4x6-8\n• Pendlay Rows: 4x6-8\n• Chest Supported Rows: 3x8-10\n• Barbell Curls: 4x8-10\n• Reverse Curls: 3x10-12\n\n**Legs Day:**\n• Low Bar Squats: 5x5 (heavy)\n• Power Cleans: 5x3\n• Bulgarian Split Squats: 3x8-10 per leg\n• Good Mornings: 3x8-10\n• Standing Calf Raises: 4x10-12\n\n**Schedule:** Push-Rest-Pull-Rest-Legs-Rest-Rest`,

      `**PPL Workout Variation 4 - Beginner Friendly**\n\n**Push Day:**\n• Machine Chest Press: 3x10-15\n• Machine Shoulder Press: 3x10-15\n• Push-ups: 3x failure\n• Dumbbell Lateral Raises: 3x12-15\n• Tricep Rope Pushdowns: 3x12-15\n• Bench Dips: 3x failure\n\n**Pull Day:**\n• Lat Pulldown Machine: 3x10-15\n• Seated Row Machine: 3x10-15\n• Assisted Pull-ups: 3x failure\n• Face Pulls: 3x15-20\n• Machine Bicep Curls: 3x12-15\n• Band Pull-aparts: 3x15-20\n\n**Legs Day:**\n• Goblet Squats: 3x10-15\n• Leg Press Machine: 3x12-15\n• Lying Leg Curls: 3x12-15\n• Leg Extensions: 3x12-15\n• Bodyweight Lunges: 3x10-12 per leg\n• Bodyweight Calf Raises: 4x15-20\n\n**Schedule:** Mon-Push, Tue-Pull, Wed-Legs, Thu-Rest, Repeat`,

      `**PPL Workout Variation 5 - Advanced Volume**\n\n**Push Day:**\n• Bench Press: 4x8-12\n• Incline Dumbbell Press: 4x10-12\n• Decline Bench Press: 3x10-12\n• Cable Flyes: 3x15-20\n• Arnold Press: 4x10-12\n• Lateral Raise Dropsets: 3x failure\n• Rope Pushdowns: 4x12-15\n• Overhead Cable Extensions: 3x12-15\n\n**Pull Day:**\n• Deadlifts: 3x5-8\n• Pull-ups: 4x failure\n• Barbell Rows: 4x8-12\n• Single Arm Cable Rows: 3x12-15\n• Straight Arm Pulldowns: 3x15-20\n• Incline Dumbbell Curls: 4x10-12\n• Hammer Curls: 3x12-15\n• Reverse Curls: 3x15-20\n\n**Legs Day:**\n• Squats: 4x8-12\n• Leg Press: 4x12-15\n• Walking Lunges: 3x20 steps per leg\n• Stiff Leg Deadlifts: 3x10-12\n• Leg Extensions: 4x15-20\n• Seated Leg Curls: 3x15-20\n• Calf Raises: 5x20-25\n\n**Schedule:** Push-Pull-Legs-Push-Pull-Legs-Rest`,
    ],
  },

  // ENHANCED: Upper/Lower Workout Plans with multiple variations and alternative phrasing
  upperLowerWorkouts: {
    patterns: [
      /upper lower workout/i,
      /upper.?lower workout/i,
      /provide.*upper lower/i,
      /give.*upper lower/i,
      /show.*upper lower/i,
      /create.*upper lower/i,
      /make.*upper lower/i,
      /design.*upper lower/i,
      /upper lower routine/i,
      /upper.?lower routine/i,
      /upper lower program/i,
      /upper.?lower program/i,
      /upper lower training/i,
      /upper.?lower training/i,
      /upper lower split workout/i,
      /upper.?lower split workout/i,
      /i want upper lower/i,
      /need upper lower workout/i,
      /looking for upper lower/i,
      /suggest upper lower/i,
      /recommend upper lower/i,
      /can you.*upper lower/i,
      /want.*upper lower/i,
      /get.*upper lower/i,
      /need.*upper lower/i,
      /want.*upper lower/i,
      /show.*upper lower/i,
      /give.*upper lower/i,
      /create.*upper lower/i,
      /make.*upper lower/i,
      /design.*upper lower/i,
      /upper lower plan/i,
      /upper.?lower plan/i,
      /upper lower schedule/i,
      /upper.?lower schedule/i,
      /upper lower split/i,
      /upper.?lower split/i,
      /i need an upper lower/i,
      /can i get upper lower/i,
      /hook me up with upper lower/i,
      /upper lower workout plan/i,
      /upper.?lower workout plan/i,
      /upper body lower body/i,
      /upper and lower/i,
      /upper lower body/i,
    ],
    responses: [
      `**Upper/Lower Workout Variation 1 - Balanced Strength**\n\n**Upper Body Day A:**\n• Bench Press: 4x8-12\n• Bent Over Rows: 4x8-12\n• Overhead Press: 3x8-12\n• Pull-ups: 3x failure\n• Incline Dumbbell Press: 3x10-12\n• Face Pulls: 3x15-20\n\n**Lower Body Day A:**\n• Squats: 4x6-10\n• Romanian Deadlifts: 3x8-12\n• Leg Press: 3x10-15\n• Leg Curls: 3x12-15\n• Calf Raises: 4x15-20\n\n**Upper Body Day B:**\n• Incline Bench Press: 4x8-12\n• Lat Pulldowns: 4x8-12\n• Dumbbell Shoulder Press: 3x10-12\n• Chest Supported Rows: 3x10-12\n• Lateral Raises: 3x15-20\n• Tricep/Bicep Superset: 3x12-15\n\n**Lower Body Day B:**\n• Deadlifts: 3x5-8\n• Front Squats: 3x8-12\n• Bulgarian Split Squats: 3x10-12 per leg\n• Glute Bridges: 3x12-15\n• Seated Calf Raises: 4x15-20\n\n**Schedule:** Mon-Upper A, Tue-Lower A, Wed-Rest, Thu-Upper B, Fri-Lower B, Weekend-Rest`,

      `**Upper/Lower Workout Variation 2 - Hypertrophy Focus**\n\n**Upper Body Day A:**\n• Dumbbell Bench Press: 4x10-15\n• Cable Rows: 4x10-15\n• Arnold Press: 3x10-12\n• Wide Grip Pulldowns: 3x10-15\n• Incline Dumbbell Flyes: 3x15-20\n• Cable Crossovers: 3x15-20\n\n**Lower Body Day A:**\n• Back Squats: 4x8-12\n• Leg Press: 4x12-15\n• Lying Leg Curls: 3x12-15\n• Leg Extensions: 3x15-20\n• Standing Calf Raises: 4x15-20\n• Hip Thrusts: 3x12-15\n\n**Upper Body Day B:**\n• Close Grip Bench Press: 4x10-12\n• T-Bar Rows: 4x10-12\n• Lateral Raises: 4x15-20\n• Reverse Flyes: 3x15-20\n• Skull Crushers: 3x10-12\n• Preacher Curls: 3x10-12\n\n**Lower Body Day B:**\n• Sumo Deadlifts: 3x8-10\n• Hack Squats: 3x10-15\n• Romanian Deadlifts: 3x10-12\n• Seated Leg Curls: 3x12-15\n• Calf Press: 4x20-25\n• Walking Lunges: 3x20 steps\n\n**Schedule:** Upper-Lower-Rest-Upper-Lower-Rest-Rest`,

      `**Upper/Lower Workout Variation 3 - Strength Focus**\n\n**Upper Body Day A:**\n• Bench Press: 5x5\n• Pendlay Rows: 4x6-8\n• Standing Military Press: 4x6-8\n• Weighted Pull-ups: 4x6-8\n• Close Grip Bench: 3x8-10\n• Barbell Curls: 3x8-10\n\n**Lower Body Day A:**\n• Squats: 5x5\n• Conventional Deadlifts: 3x3-5\n• Bulgarian Split Squats: 3x8-10\n• Good Mornings: 3x8-10\n• Calf Raises: 4x10-12\n\n**Upper Body Day B:**\n• Incline Bench Press: 4x6-8\n• Chest Supported Rows: 4x6-8\n• Push Press: 4x5\n• Face Pulls: 3x15-20\n• Tricep Extensions: 3x8-10\n• Hammer Curls: 3x8-10\n\n**Lower Body Day B:**\n• Front Squats: 4x6-8\n• Romanian Deadlifts: 3x8-10\n• Leg Press: 3x10-12\n• Glute Ham Raises: 3x8-10\n• Seated Calf Raises: 4x12-15\n\n**Schedule:** Upper A-Rest-Lower A-Rest-Upper B-Rest-Lower B`,

      `**Upper/Lower Workout Variation 4 - Beginner Friendly**\n\n**Upper Body Day A:**\n• Machine Chest Press: 3x10-15\n• Machine Rows: 3x10-15\n• Machine Shoulder Press: 3x10-15\n• Assisted Pull-ups: 3x failure\n• Push-ups: 3x failure\n• Band Pull-aparts: 3x15-20\n\n**Lower Body Day A:**\n• Goblet Squats: 3x10-15\n• Leg Press: 3x12-15\n• Leg Curls: 3x12-15\n• Leg Extensions: 3x12-15\n• Bodyweight Calf Raises: 4x15-20\n• Bodyweight Glute Bridges: 3x15-20\n\n**Upper Body Day B:**\n• Incline Machine Press: 3x10-15\n• Lat Pulldown Machine: 3x10-15\n• Dumbbell Shoulder Press: 3x10-15\n• Machine Rows: 3x10-15\n• Dumbbell Curls: 3x12-15\n• Tricep Pushdowns: 3x12-15\n\n**Lower Body Day B:**\n• Bodyweight Squats: 3x15-20\n• Romanian Deadlifts (light): 3x10-12\n• Lunges: 3x10-12 per leg\n• Calf Raises: 4x15-20\n• Planks: 3x30-60 seconds\n\n**Schedule:** Mon-Upper A, Tue-Lower A, Wed-Rest, Thu-Upper B, Fri-Lower B, Weekend Active Recovery`,
    ],
  },

  // ENHANCED: Bro Split Workout Plans with multiple variations and alternative phrasing
  broSplitWorkouts: {
    patterns: [
      /bro split workout/i,
      /bro.?split workout/i,
      /body.?part split workout/i,
      /provide.*bro split/i,
      /give.*bro split/i,
      /show.*bro split/i,
      /create.*bro split/i,
      /make.*bro split/i,
      /design.*bro split/i,
      /bro split routine/i,
      /bro.?split routine/i,
      /bro split program/i,
      /bro.?split program/i,
      /bro split training/i,
      /bro.?split training/i,
      /body.?part split routine/i,
      /i want bro split/i,
      /need bro split workout/i,
      /looking for bro split/i,
      /suggest bro split/i,
      /recommend bro split/i,
      /can you.*bro split/i,
      /want.*bro split/i,
      /get.*bro split/i,
      /need.*bro split/i,
      /want.*bro split/i,
      /show.*bro split/i,
      /give.*bro split/i,
      /create.*bro split/i,
      /make.*bro split/i,
      /design.*bro split/i,
      /bro split plan/i,
      /bro.?split plan/i,
      /bro split schedule/i,
      /bro.?split schedule/i,
      /bro split/i,
      /bro.?split/i,
      /i need a bro split/i,
      /can i get bro split/i,
      /hook me up with bro split/i,
      /bro split workout plan/i,
      /bro.?split workout plan/i,
      /body part split/i,
      /muscle group split/i,
      /one muscle per day/i,
      /chest back shoulders arms legs/i,
    ],
    responses: [
      `**Bro Split Variation 1 - Classic Bodybuilding**\n\n**Monday: Chest**\n• Bench Press: 4x8-12\n• Incline Dumbbell Press: 3x10-12\n• Cable Flyes: 3x12-15\n• Push-ups: 3x failure\n• Chest Dips: 3x10-15\n\n**Tuesday: Back**\n• Deadlifts: 3x5-8\n• Pull-ups: 4x failure\n• Barbell Rows: 3x8-12\n• Lat Pulldowns: 3x10-12\n• Seated Rows: 3x10-12\n• Straight Arm Pulldowns: 3x15-20\n\n**Wednesday: Shoulders**\n• Overhead Press: 4x8-12\n• Lateral Raises: 4x12-15\n• Front Raises: 3x12-15\n• Rear Delt Flyes: 3x15-20\n• Shrugs: 4x12-15\n• Face Pulls: 3x15-20\n\n**Thursday: Arms**\n• Barbell Curls: 4x10-12\n• Tricep Pushdowns: 4x12-15\n• Hammer Curls: 3x10-12\n• Overhead Tricep Extensions: 3x12-15\n• Preacher Curls: 3x10-12\n• Skull Crushers: 3x10-12\n• Concentration Curls: 3x12-15\n\n**Friday: Legs**\n• Squats: 4x8-12\n• Leg Press: 3x10-15\n• Leg Extensions: 3x12-15\n• Leg Curls: 3x12-15\n• Calf Raises: 5x15-20\n• Lunges: 3x10-12 per leg\n\n**Weekend:** Rest or Active Recovery`,

      `**Bro Split Variation 2 - Advanced Volume**\n\n**Monday: Chest & Calves**\n• Incline Barbell Press: 4x8-12\n• Flat Dumbbell Press: 4x10-12\n• Decline Bench Press: 3x10-12\n• Cable Crossovers: 3x15-20\n• Pec Deck: 3x12-15\n• Calf Raises: 5x15-20\n\n**Tuesday: Back & Abs**\n• Deadlifts: 3x5-8\n• Wide Grip Pull-ups: 4x failure\n• T-Bar Rows: 4x8-12\n• Single Arm Dumbbell Rows: 3x10-12\n• Hyperextensions: 3x15-20\n• Cable Crunches: 4x15-20\n• Leg Raises: 3x15-20\n\n**Wednesday: Shoulders & Traps**\n• Military Press: 4x8-12\n• Dumbbell Lateral Raises: 4x12-15\n• Cable Lateral Raises: 3x15-20\n• Bent Over Lateral Raises: 3x12-15\n• Barbell Shrugs: 4x12-15\n• Upright Rows: 3x10-12\n\n**Thursday: Arms**\n• Close Grip Bench Press: 4x8-12\n• Barbell Curls: 4x8-12\n• Tricep Dips: 3x failure\n• Incline Dumbbell Curls: 3x10-12\n• Overhead Rope Extensions: 3x12-15\n• Preacher Curls: 3x10-12\n• Kickbacks: 3x12-15\n\n**Friday: Legs**\n• Squats: 4x8-12\n• Leg Press: 4x12-15\n• Romanian Deadlifts: 3x10-12\n• Leg Extensions: 4x15-20\n• Lying Leg Curls: 3x12-15\n• Seated Calf Raises: 5x15-20\n• Walking Lunges: 3x20 steps\n\n**Weekend:** Complete Rest`,

      `**Bro Split Variation 3 - Powerbuilding Style**\n\n**Monday: Chest & Triceps**\n• Bench Press: 5x5\n• Incline Dumbbell Press: 4x8-12\n• Weighted Dips: 3x8-10\n• Cable Flyes: 3x15-20\n• Close Grip Bench: 3x8-10\n• Tricep Pushdowns: 3x12-15\n\n**Tuesday: Back & Biceps**\n• Deadlifts: 3x3-5\n• Weighted Pull-ups: 4x6-8\n• Barbell Rows: 4x8-12\n• Lat Pulldowns: 3x10-12\n• Barbell Curls: 4x8-10\n• Hammer Curls: 3x10-12\n\n**Wednesday: Shoulders & Abs**\n• Overhead Press: 5x5\n• Arnold Press: 3x8-12\n• Lateral Raises: 4x12-15\n• Rear Delt Flyes: 3x15-20\n• Hanging Leg Raises: 3x15-20\n• Russian Twists: 3x20\n\n**Thursday: Legs**\n• Squats: 5x5\n• Romanian Deadlifts: 3x8-10\n• Leg Press: 4x10-15\n• Leg Curls: 3x12-15\n• Calf Raises: 5x15-20\n• Bulgarian Split Squats: 3x10-12\n\n**Friday: Arms & Calves**\n• Close Grip Bench: 4x8-12\n• Barbell Curls: 4x8-12\n• Skull Crushers: 3x10-12\n• Preacher Curls: 3x10-12\n• Tricep Dips: 3x failure\n• Concentration Curls: 3x12-15\n• Seated Calf Raises: 5x15-20\n\n**Weekend:** Active Recovery`,

      `**Bro Split Variation 4 - High Frequency Modified**\n\n**Monday: Chest & Back**\n• Bench Press: 4x8-12\n• Pull-ups: 4x failure\n• Incline Dumbbell Press: 3x10-12\n• Barbell Rows: 3x8-12\n• Cable Crossovers: 3x15-20\n• Lat Pulldowns: 3x10-12\n\n**Tuesday: Shoulders & Arms**\n• Overhead Press: 4x8-12\n• Lateral Raises: 4x12-15\n• Barbell Curls: 3x10-12\n• Tricep Pushdowns: 3x12-15\n• Rear Delt Flyes: 3x15-20\n• Hammer Curls: 3x10-12\n\n**Wednesday: Legs**\n• Squats: 4x8-12\n• Romanian Deadlifts: 3x8-12\n• Leg Press: 3x10-15\n• Leg Curls: 3x12-15\n• Calf Raises: 5x15-20\n• Lunges: 3x10-12\n\n**Thursday: Chest & Back**\n• Incline Bench Press: 4x8-12\n• T-Bar Rows: 4x8-12\n• Dumbbell Flyes: 3x12-15\n• Seated Rows: 3x10-12\n• Push-ups: 3x failure\n• Straight Arm Pulldowns: 3x15-20\n\n**Friday: Shoulders & Arms**\n• Dumbbell Shoulder Press: 4x10-12\n• Cable Lateral Raises: 4x15-20\n• Preacher Curls: 3x10-12\n• Overhead Tricep Extensions: 3x12-15\n• Front Raises: 3x12-15\n• Concentration Curls: 3x12-15\n\n**Weekend:** Rest`,
    ],
  },

  // ENHANCED: Pre-Workout Nutrition with alternative phrasing
  preWorkoutNutrition: {
    patterns: [
      /eat before workout/i,
      /before workout food/i,
      /pre workout nutrition/i,
      /pre workout meal/i,
      /food before gym/i,
      /what to eat before training/i,
      /best food before workout/i,
      /pre workout fueling/i,
      /meal before exercise/i,
      /nutrition before workout/i,
      /what.*eat.*before.*workout/i,
      /food.*before.*training/i,
      /best.*before.*gym/i,
      /pre.*workout.*meal/i,
      /fuel.*before.*workout/i,
      /eating.*before.*workout/i,
      /food.*pre workout/i,
      /meal.*before.*gym/i,
      /what.*eat.*pre workout/i,
      /best.*pre workout/i,
      /pre workout food/i,
      /pre workout eating/i,
      /nutrition.*before.*gym/i,
      /fuel.*before.*gym/i,
      /eating.*before.*gym/i,
      /food.*before.*exercise/i,
      /meal.*before.*exercise/i,
      /what.*eat.*before.*gym/i,
      /best.*before.*workout/i,
      /pre workout.*nutrition/i,
      /pre workout.*food/i,
      /pre workout.*meal/i,
      /before.*workout.*eat/i,
      /before.*gym.*eat/i,
      /before.*training.*eat/i,
    ],
    responses: [
      `**Pre-Workout Nutrition Guide** 🍌\n\n**2-3 Hours Before Workout (Full Meal):**\n• Complex carbs + lean protein + healthy fats\n• Examples:\n  - Chicken breast with brown rice and vegetables\n  - Oatmeal with protein powder and nuts\n  - Sweet potato with grilled fish and avocado\n  - Whole grain toast with eggs and avocado\n\n**30-60 Minutes Before Workout (Light Snack):**\n• Fast-digesting carbs + small protein\n• Examples:\n  - Banana with almond butter\n  - Greek yogurt with berries\n  - Rice cakes with honey\n  - Protein shake with fruit\n  - Energy bar\n\n**Key Principles:**\n• Carbs provide energy for your workout\n• Protein helps prevent muscle breakdown\n• Avoid heavy fats that slow digestion\n• Stay hydrated with water\n• Time your meal based on your digestion\n\n**Sample Pre-Workout Meals:**\n• **Strength Training:** Oats + whey protein + banana\n• **Cardio:** Toast + honey + small protein shake\n• **Endurance:** Sweet potato + chicken + light vegetables`,

      `**Optimal Pre-Workout Nutrition Timing** ⏰\n\n**Large Meal (3-4 hours before):**\n• Balanced meal with carbs, protein, and fats\n• Gives time for proper digestion\n• Sustained energy release\n\n**Medium Meal (2-3 hours before):**\n• Moderate portion size\n• Focus on carbs and protein\n• Example: Turkey sandwich on whole grain\n\n**Small Snack (30-60 minutes before):**\n• Easily digestible carbs\n• Minimal fat and fiber\n• Example: Banana or energy gel\n\n**Immediately Before (0-30 minutes):**\n• Liquid nutrition only\n• Fast-absorbing carbs\n• Example: Sports drink or BCAA's\n\n**Foods to Avoid Before Training:**\n• High-fat foods (slow digestion)\n• High-fiber foods (gas/bloating)\n• Spicy foods (stomach discomfort)\n• Large amounts of protein (heavy digestion)\n• Sugary junk food (energy crash)`,
    ],
  },

  // ENHANCED: Post-Workout Nutrition with alternative phrasing
  postWorkoutNutrition: {
    patterns: [
      /eat after workout/i,
      /after workout food/i,
      /post workout nutrition/i,
      /post workout meal/i,
      /food after gym/i,
      /what to eat after training/i,
      /best food after workout/i,
      /post workout recovery/i,
      /meal after exercise/i,
      /nutrition after workout/i,
      /what.*eat.*after.*workout/i,
      /food.*after.*training/i,
      /best.*after.*gym/i,
      /post.*workout.*meal/i,
      /recovery.*after.*workout/i,
      /eating.*after.*workout/i,
      /food.*post workout/i,
      /meal.*after.*gym/i,
      /what.*eat.*post workout/i,
      /best.*post workout/i,
      /post workout food/i,
      /post workout eating/i,
      /nutrition.*after.*gym/i,
      /recovery.*after.*gym/i,
      /eating.*after.*gym/i,
      /food.*after.*exercise/i,
      /meal.*after.*exercise/i,
      /what.*eat.*after.*gym/i,
      /best.*after.*workout/i,
      /post workout.*nutrition/i,
      /post workout.*food/i,
      /post workout.*meal/i,
      /after.*workout.*eat/i,
      /after.*gym.*eat/i,
      /after.*training.*eat/i,
      /recovery meal/i,
      /recovery food/i,
    ],
    responses: [
      `**Post-Workout Nutrition Guide** 🥗\n\n**The Anabolic Window (30-60 minutes post-workout):**\n• Fast-digesting protein + simple carbs\n• Critical for muscle recovery and growth\n• Examples:\n  - Whey protein shake with dextrose/maltodextrin\n  - Chocolate milk (excellent recovery drink)\n  - Greek yogurt with honey and fruit\n  - Rice cakes with jam and protein powder\n\n**Full Meal (1-2 hours after workout):**\n• Balanced meal with protein + complex carbs\n• Replenishes glycogen stores\n• Supports muscle repair\n• Examples:\n  - Grilled chicken with quinoa and roasted vegetables\n  - Salmon with sweet potato and asparagus\n  - Lean steak with brown rice and broccoli\n  - Tofu stir-fry with brown rice\n\n**Key Nutrients for Recovery:**\n• **Protein:** 20-40g for muscle repair\n• **Carbs:** 0.5-0.7g per kg bodyweight for glycogen\n• **Fats:** Small amount of healthy fats\n• **Hydration:** Water + electrolytes\n\n**Sample Post-Workout Combinations:**\n• **Mass Building:** Chicken + rice + vegetables\n• **Fat Loss:** Fish + sweet potato + greens\n• **Vegetarian:** Tofu + quinoa + mixed vegetables\n• **Quick Option:** Protein shake + banana + nuts`,

      `**Post-Workout Recovery Nutrition** 💪\n\n**Immediate Recovery (0-30 minutes):**\n• Liquid nutrition is optimal\n• Fast-absorbing protein (whey)\n• Simple carbs to spike insulin\n• Rehydration with electrolytes\n\n**Solid Meal (1-2 hours):**\n• Whole food protein source\n• Complex carbohydrates\n• Vegetables for micronutrients\n• Healthy fats in moderation\n\n**Ideal Protein Sources:**\n• Whey protein (fast absorption)\n• Chicken breast or turkey\n• Fish (salmon, tuna)\n• Eggs or egg whites\n• Greek yogurt or cottage cheese\n• Lean red meat\n\n**Ideal Carb Sources:**\n• Sweet potatoes\n• Brown rice or quinoa\n• Oats\n• Whole grain bread/pasta\n• Fruits (bananas, berries)\n• Potatoes\n\n**Recovery Tips:**\n• Eat within 2 hours of training\n• Include anti-inflammatory foods\n• Stay hydrated\n• Consider BCAA's if training fasted\n• Get adequate sleep for optimal recovery`,
    ],
  },

  // ENHANCED: Supplements and Creatine Guide with alternative phrasing
  supplements: {
    patterns: [
      /supplements?/i,
      /creatine/i,
      /protein powder/i,
      /whey/i,
      /bcaa/i,
      /pre workout/i,
      /post workout/i,
      /cutting supplements?/i,
      /bulking supplements?/i,
      /supplement stack/i,
      /workout supplements?/i,
      /fitness supplements?/i,
      /bodybuilding supplements?/i,
      /mass gainer/i,
      /fat burner/i,
      /what supplements?/i,
      /best supplements?/i,
      /recommend supplements?/i,
      /supplement plan/i,
      /tell me about creatine/i,
      /creatine info/i,
      /what is creatine/i,
      /creatine dosage/i,
      /how to use creatine/i,
      /when to take creatine/i,
      /creatine timing/i,
      /supplement stack for cutting/i,
      /cutting supplements/i,
      /fat loss supplements/i,
      /supplements for cutting/i,
      /bulking supplements guide/i,
      /supplements for bulking/i,
      /mass gain supplements/i,
      /bulking stack/i,
      /pre workout nutrition timing/i,
      /when to take pre workout/i,
      /pre workout timing/i,
      /protein powder types/i,
      /whey vs casein/i,
      /best protein powder/i,
      /supplement timing/i,
      /when to take supplements/i,
      /supplement schedule/i,
    ],
    responses: [
      `**Comprehensive Supplement Guide** 💊\n\n**ESSENTIAL SUPPLEMENTS:**\n\n**1. Protein Powder**\n• **Whey Protein:** Fast absorption, post-workout\n• **Casein Protein:** Slow release, before bed\n• **Plant Protein:** Vegan alternative\n• **Dosage:** 20-40g per serving\n\n**2. Creatine Monohydrate**\n• **Benefits:** Increases strength, power, muscle mass\n• **Dosage:** 5g daily\n• **Loading (optional):** 20g/day for 5-7 days\n• **Timing:** Anytime, consistent daily use\n• **Note:** Most researched supplement, very safe\n\n**3. Pre-Workout**\n• **Contains:** Caffeine, beta-alanine, citrulline\n• **Benefits:** Energy, focus, pump, endurance\n• **Dosage:** Follow product instructions\n• **Alternative:** Coffee + beta-alanine\n\n**BULKING SUPPLEMENT STACK:**\n• **Whey Protein** - Post-workout recovery\n• **Creatine** - Strength and size gains\n• **Pre-Workout** - Training performance\n• **Mass Gainer** (if struggling to eat enough)\n• **Multivitamin** - Overall health support\n\n**CUTTING SUPPLEMENT STACK:**\n• **Whey Protein** - Muscle preservation\n• **Creatine** - Maintain strength\n• **Caffeine** - Energy and fat burning\n• **L-Carnitine** - Fat metabolism\n• **Green Tea Extract** - Thermogenic effect\n• **BCAAs** - Training fasted`,

      `**Advanced Supplement Strategies** 🔬\n\n**CREATINE DETAILED GUIDE:**\n• **Form:** Creatine Monohydrate (most effective)\n• **Dosage:** 3-5g daily\n• **Timing:** Anytime, consistency matters most\n• **Loading Phase:** Optional (20g/day for 5-7 days)\n• **With Carbs:** Take with juice for better absorption\n• **Hydration:** Drink plenty of water\n• **Benefits Proven by Science:**\n  - Increases strength 5-15%\n  - Boosts muscle growth\n  - Improves high-intensity performance\n  - Enhances brain function\n\n**PROTEIN POWDER TYPES:**\n\n**Whey Concentrate:**\n• 70-80% protein\n• Contains some lactose\n• Good value\n\n**Whey Isolate:**\n• 90%+ protein\n• Low lactose\n• Faster absorption\n\n**Casein:**\n• Slow digestion\n• Ideal before bed\n• Anti-catabolic\n\n**BULKING vs CUTTING SPECIFICS:**\n\n**For Bulking:**\n• Mass gainers (if needed)\n• Creatine for water retention in muscles\n• Carbohydrate powders for extra calories\n• Omega-3s for joint health\n\n**For Cutting:**\n• Fat burners (caffeine-based)\n• Appetite suppressants\n• Diuretics (natural)\n• Fiber supplements for fullness\n\n**STACK RECOMMENDATIONS:**\n\n**Beginner Stack:**\n1. Whey Protein\n2. Creatine\n3. Multivitamin\n\n**Intermediate Stack:**\n1. Whey Protein\n2. Creatine\n3. Pre-Workout\n4. BCAA's\n5. Omega-3\n\n**Advanced Stack:**\n1. Whey + Casein Protein\n2. Creatine\n3. Pre-Workout\n4. Post-Workout Carbs\n5. Testosterone Support\n6. Joint Supplement`,

      `**Supplement Timing & Cycling** ⏱️\n\n**DAILY SUPPLEMENT SCHEDULE:**\n\n**Morning:**\n• Multivitamin with breakfast\n• Omega-3 fish oil\n• Vitamin D (if deficient)\n\n**Pre-Workout (30-60 min before):**\n• Caffeine (100-200mg)\n• Beta-Alanine (2-3g)\n• Citrulline Malate (6-8g)\n• Creatine (5g) - if taking pre-workout\n\n**During Workout (optional):**\n• BCAA's (5-10g)\n• Electrolytes\n• Carbohydrate powder (for endurance)\n\n**Post-Workout (within 30 min):**\n• Whey Protein (20-40g)\n• Fast Carbs (dextrose/maltodextrin)\n• Creatine (5g) - if not taken earlier\n\n**Evening/Bedtime:**\n• Casein Protein (20-30g)\n• ZMA (Zinc/Magnesium)\n• Omega-3\n\n**CYCLING RECOMMENDATIONS:**\n\n**Pre-Workout:**\n• Cycle off 1 week every 4-8 weeks\n• Prevents caffeine tolerance\n\n**Creatine:**\n• No cycling necessary\n• Can be used year-round\n\n**Fat Burners:**\n• Cycle 8 weeks on, 4 weeks off\n• Prevents adaptation\n\n**SAFETY CONSIDERATIONS:**\n• Buy from reputable brands\n• Check for third-party testing\n• Start with lower doses\n• Consult doctor if on medication\n• Stay hydrated with all supplements`,
    ],
  },

  // COMPREHENSIVE: Enhanced nutrition category with sentence patterns
  nutrition: {
    patterns: [
      /diet/i,
      /nutrition/i,
      /food/i,
      /eat/i,
      /meal/i,
      /protein/i,
      /carbs/i,
      /calories/i,
      /vegetable/i,
      /fruit/i,
      /healthy eating/i,
      /meal plan/i,
      /diet plan/i,
      /what to eat/i,
      /healthy food/i,
      /nutrition plan/i,
      /macros/i,
      /macronutrients/i,
      /micronutrients/i,
      /vitamins/i,
      /minerals/i,
      /fiber/i,
      /water/i,
      /hydration/i,
      /supplements/i,
      /pre.?workout/i,
      /post.?workout/i,
      /breakfast/i,
      /lunch/i,
      /dinner/i,
      /snack/i,
      /what.*eat/i,
      /how.*eat/i,
      /when.*eat/i,
      /best.*food/i,
      /healthy.*diet/i,
      /proper.*nutrition/i,
      /diet.*advice/i,
      /nutrition.*tips/i,
      /meal.*prep/i,
      /cooking.*healthy/i,
      /grocery.*list/i,
      /shopping.*food/i,
      /weight loss.*diet/i,
      /muscle gain.*food/i,
      /protein.*sources/i,
      /carbs.*sources/i,
      /fats.*sources/i,
      /vitamin.*sources/i,
      /mineral.*sources/i,
    ],
    responses: [
      "A balanced diet should include lean proteins, complex carbs, healthy fats, and plenty of vegetables.",
      "Stay hydrated! Drink at least 8 glasses of water daily, more if you're active.",
      "Focus on whole foods and limit processed foods for better health results.",
      "Protein is essential for muscle repair - aim for 1.6-2.2g per kg of body weight.",
      "Include a variety of colorful fruits and vegetables for different vitamins and minerals.",
      "Complex carbs like whole grains, oats, and sweet potatoes provide sustained energy.",
      "Healthy fats from avocados, nuts, and olive oil support hormone production and brain health.",
      "Timing matters: Eat a balanced meal 2-3 hours before workouts and protein-rich food after.",
      "Don't skip meals - consistent eating patterns help maintain energy and metabolism.",
    ],
  },

  // ENHANCED: Meal Planning and Dissection Category with alternative phrasing
  mealPlanning: {
    patterns: [
      /dissect.*food.*(\d+).*meal/i,
      /split.*food.*(\d+).*meal/i,
      /divide.*food.*(\d+).*meal/i,
      /break.*down.*food.*(\d+).*meal/i,
      /meal.*plan.*(\d+).*meal/i,
      /distribute.*food.*(\d+).*meal/i,
      /portion.*food.*(\d+).*meal/i,
      /dissect.*(\d+).*meal.*(\d+).*calorie/i,
      /split.*(\d+).*meal.*(\d+).*calorie/i,
      /divide.*(\d+).*meal.*(\d+).*calorie/i,
      /meal.*plan.*(\d+).*calorie/i,
      /(\d+).*meal.*(\d+).*calorie/i,
      /(\d+).*meal.*plan.*(\d+).*calorie/i,
      /dissect.*(\d+).*meal.*(\d+).*protein/i,
      /split.*(\d+).*meal.*(\d+).*protein/i,
      /divide.*(\d+).*meal.*(\d+).*protein/i,
      /meal.*plan.*(\d+).*protein/i,
      /(\d+).*meal.*(\d+).*protein/i,
      /create.*meal.*plan/i,
      /make.*meal.*plan/i,
      /design.*meal.*plan/i,
      /food.*distribution/i,
      /meal.*distribution/i,
      /daily.*meal.*plan/i,
      /nutrition.*plan/i,
      /split.*(\d+).*meals.*(\d+).*calories/i,
      /divide.*(\d+).*meals.*(\d+).*calories/i,
      /break down.*(\d+).*meals.*(\d+).*calories/i,
      /distribute.*(\d+).*meals.*(\d+).*calories/i,
      /portion.*(\d+).*meals.*(\d+).*calories/i,
      /meal plan.*(\d+).*meals.*(\d+).*calories/i,
      /create.*(\d+).*meal.*plan.*(\d+).*calories/i,
      /make.*(\d+).*meal.*plan.*(\d+).*calories/i,
      /design.*(\d+).*meal.*plan.*(\d+).*calories/i,
      /split.*food.*(\d+).*meals.*(\d+).*calories/i,
      /divide.*food.*(\d+).*meals.*(\d+).*calories/i,
      /break down.*food.*(\d+).*meals.*(\d+).*calories/i,
      /distribute.*food.*(\d+).*meals.*(\d+).*calories/i,
      /portion.*food.*(\d+).*meals.*(\d+).*calories/i,
      /meal plan.*(\d+).*meals.*(\d+).*protein/i,
      /create.*(\d+).*meal.*plan.*(\d+).*protein/i,
      /make.*(\d+).*meal.*plan.*(\d+).*protein/i,
      /design.*(\d+).*meal.*plan.*(\d+).*protein/i,
      /split.*(\d+).*meals.*(\d+).*protein/i,
      /divide.*(\d+).*meals.*(\d+).*protein/i,
      /break down.*(\d+).*meals.*(\d+).*protein/i,
      /distribute.*(\d+).*meals.*(\d+).*protein/i,
      /portion.*(\d+).*meals.*(\d+).*protein/i,
    ],
    responses: [
      "I'll help you create a customized meal plan! Please provide:\n• Number of meals (3-6)\n• Total daily calories\n• Protein target (grams)\n• Optional: Carb and fat targets\n\nExample: 'Dissect into 4 meals with 2500 calories and 180g protein'",

      "Ready to create your meal plan! I need:\n• Meals per day (3-6)\n• Daily calorie target\n• Protein requirement\n• Optional carb/fat goals\n\nJust tell me your numbers! 🍽️",

      "Let me create your perfect meal plan! I'll need:\n• How many meals per day (3-6)\n• Your daily calorie goal\n• Your protein target\n• Any carb/fat preferences\n\nGive me your targets and I'll build your plan! 📊",
    ],
  },

  // ENHANCED: Weekly Meal Planning Category with alternative phrasing
  weeklyMealPlanning: {
    patterns: [
      /weekly.*meal.*plan/i,
      /week.*meal.*plan/i,
      /7.*day.*meal.*plan/i,
      /seven.*day.*meal.*plan/i,
      /whole.*week.*meal/i,
      /entire.*week.*food/i,
      /weekly.*food.*plan/i,
      /meal.*plan.*week/i,
      /food.*plan.*week/i,
      /nutrition.*plan.*week/i,
      /diet.*plan.*week/i,
      /create.*weekly.*plan/i,
      /make.*weekly.*meal/i,
      /design.*weekly.*nutrition/i,
      /weekly plan/i,
      /week plan/i,
      /7 day plan/i,
      /seven day plan/i,
      /whole week plan/i,
      /entire week plan/i,
      /weekly meal/i,
      /week meal/i,
      /7 day meal/i,
      /seven day meal/i,
      /whole week meal/i,
      /entire week meal/i,
      /weekly food/i,
      /week food/i,
      /7 day food/i,
      /seven day food/i,
      /whole week food/i,
      /entire week food/i,
      /weekly nutrition/i,
      /week nutrition/i,
      /7 day nutrition/i,
      /seven day nutrition/i,
      /whole week nutrition/i,
      /entire week nutrition/i,
      /weekly diet/i,
      /week diet/i,
      /7 day diet/i,
      /seven day diet/i,
      /whole week diet/i,
      /entire week diet/i,
      /create.*weekly/i,
      /make.*weekly/i,
      /design.*weekly/i,
      /build.*weekly/i,
    ],
    responses: [
      "I'll create a comprehensive weekly meal plan for you! Please provide:\n• Daily calorie target\n• Protein requirement (grams)\n• Number of meals per day (3-6)\n• Optional: Any dietary preferences or restrictions\n\nExample: 'Create a weekly meal plan with 2500 calories and 180g protein for 4 meals daily'",

      "Ready to design your weekly nutrition plan! I need:\n• Daily calories\n• Daily protein target\n• Meals per day\n• Any food preferences/allergies\n\nLet's build your perfect week of eating! 📅",

      "I'd love to create your weekly meal plan! Just tell me:\n• Your daily calorie goal\n• How much protein you need daily\n• How many meals you want per day\n• Any foods you love or want to avoid\n\nGive me these details and I'll craft your ideal week! 🍽️",
    ],
  },

  // COMPREHENSIVE: Enhanced weight loss category with sentence patterns
  weightLoss: {
    patterns: [
      /lose weight/i,
      /weight loss/i,
      /burn fat/i,
      /slim down/i,
      /weight management/i,
      /calorie deficit/i,
      /fat loss/i,
      /get lean/i,
      /reduce weight/i,
      /weight reduction/i,
      /shed pounds/i,
      /drop weight/i,
      /body fat/i,
      /belly fat/i,
      /lose belly/i,
      /trim down/i,
      /get skinny/i,
      /weight control/i,
      /how.*lose weight/i,
      /what.*weight loss/i,
      /best way.*lose fat/i,
      /tips.*lose weight/i,
      /advice.*weight loss/i,
      /help.*lose weight/i,
      /want to lose weight/i,
      /trying to lose weight/i,
      /struggling.*lose weight/i,
      /can't lose weight/i,
      /plateau.*weight loss/i,
      /metabolism.*weight/i,
      /diet.*weight loss/i,
      /exercise.*weight loss/i,
      /cardio.*fat loss/i,
      /strength training.*weight loss/i,
    ],
    responses: [
      "Weight loss requires a calorie deficit through diet and exercise. Aim for 1-2 lbs per week.",
      "Combine cardio with strength training for effective fat loss while preserving muscle.",
      "Track your food intake and stay consistent with your workout routine!",
      "Focus on sustainable habits rather than quick fixes for long-term weight management.",
      "Create a 300-500 calorie deficit daily through diet and exercise for steady weight loss.",
      "High-intensity interval training (HIIT) is very effective for fat burning.",
      "Build muscle through strength training - more muscle means higher resting metabolism.",
      "Be patient! Sustainable weight loss takes time - aim for consistency over perfection.",
    ],
  },

  // COMPREHENSIVE: Enhanced muscle gain category with sentence patterns
  muscleGain: {
    patterns: [
      /build muscle/i,
      /muscle gain/i,
      /get bigger/i,
      /bulk up/i,
      /strength gain/i,
      /gain mass/i,
      /muscle growth/i,
      /hypertrophy/i,
      /get stronger/i,
      /increase muscle/i,
      /muscle building/i,
      /bulking/i,
      /mass gain/i,
      /size gain/i,
      /get muscular/i,
      /how.*build muscle/i,
      /what.*muscle gain/i,
      /best way.*gain muscle/i,
      /tips.*muscle growth/i,
      /advice.*build muscle/i,
      /help.*gain muscle/i,
      /want to build muscle/i,
      /trying to gain muscle/i,
      /struggling.*gain muscle/i,
      /can't gain muscle/i,
      /plateau.*muscle gain/i,
      /diet.*muscle gain/i,
      /nutrition.*muscle growth/i,
      /protein.*muscle/i,
      /workout.*muscle gain/i,
      /strength training.*muscle/i,
    ],
    responses: [
      "For muscle growth, focus on progressive overload in your strength training.",
      "Eat in a slight calorie surplus with adequate protein (1.6-2.2g per kg of body weight).",
      "Allow 48 hours recovery between working the same muscle groups.",
      "Compound exercises like squats, deadlifts, and bench presses are great for building mass.",
      "Aim for 8-12 reps per set for hypertrophy with 60-90 seconds rest between sets.",
      "Consistency is key - stick to your training and nutrition plan for at least 3 months.",
      "Get enough sleep! Muscle growth happens during recovery, not just in the gym.",
      "Track your progress with measurements and photos, not just scale weight.",
    ],
  },

  // Additional categories with sentence patterns...
  recovery: {
    patterns: [
      /recovery/i,
      /rest/i,
      /sleep/i,
      /overtraining/i,
      /sore/i,
      /stretch/i,
      /flexibility/i,
      /yoga/i,
      /rest day/i,
      /days off/i,
      /muscle sore/i,
      /DOMS/i,
      /fatigue/i,
      /tired/i,
      /overtrained/i,
      /burnout/i,
      /rest period/i,
      /active recovery/i,
      /foam roll/i,
      /massage/i,
      /mobility/i,
      /how.*recover/i,
      /what.*recovery/i,
      /best way.*recover/i,
      /tips.*recovery/i,
      /help.*recover/i,
      /sore muscles/i,
      /muscle pain/i,
      /body ache/i,
      /improve recovery/i,
      /better sleep/i,
      /sleep quality/i,
      /rest days/i,
      /overtraining symptoms/i,
      /prevent overtraining/i,
    ],
    responses: [
      "Aim for 7-9 hours of quality sleep nightly for optimal recovery.",
      "Active recovery like walking or light stretching can help with muscle soreness.",
      "Listen to your body - rest days are crucial for progress!",
      "Stretching and foam rolling can improve flexibility and reduce injury risk.",
      "Signs of overtraining: persistent fatigue, decreased performance, mood changes, frequent illness.",
      "Take 1-2 complete rest days per week, or do active recovery on those days.",
      "Proper nutrition and hydration significantly impact your recovery speed.",
      "Consider deload weeks every 6-8 weeks where you reduce training volume by 40-60%.",
    ],
  },

  motivation: {
    patterns: [
      /motivation/i,
      /stuck/i,
      /plateau/i,
      /give up/i,
      /hard/i,
      /difficult/i,
      /demotivated/i,
      /lose motivation/i,
      /not motivated/i,
      /can't continue/i,
      /want to quit/i,
      /frustrated/i,
      /discouraged/i,
      /progress stopped/i,
      /not seeing results/i,
      /bored with workout/i,
      /exercise boredom/i,
      /routine stale/i,
      /how.*stay motivated/i,
      /what.*motivation/i,
      /tips.*motivation/i,
      /help.*motivated/i,
      /losing motivation/i,
      /can't stay consistent/i,
      /want to give up/i,
      /frustrated with progress/i,
      /not seeing results/i,
      /bored of workout/i,
      /routine getting boring/i,
      /how to keep going/i,
      /stay consistent/i,
    ],
    responses: [
      "Progress takes time! Celebrate small victories and stay consistent.",
      "Mix up your routine to overcome plateaus - try new exercises or intensity techniques.",
      "Remember why you started! Every workout brings you closer to your goals. 💪",
      "Find a workout buddy or track your progress to stay motivated long-term.",
      "Plateaus are normal! Change one variable: intensity, volume, exercise selection, or rest periods.",
      "Focus on the process, not just the outcome. Enjoy the journey of getting stronger and healthier.",
      "Set small, achievable goals and reward yourself when you reach them.",
      "Remember how far you've come! Look back at old photos or fitness logs to see your progress.",
    ],
  },

  // Keyword-based fallback for any health/fitness question
  generalHealth: {
    patterns: [
      /health/i,
      /wellness/i,
      /healthy/i,
      /lifestyle/i,
      /fitness/i,
      /well.?being/i,
      /healthy lifestyle/i,
      /wellness tips/i,
      /health advice/i,
      /stay healthy/i,
      /health benefits/i,
      /fitness benefits/i,
      /why exercise/i,
      /importance of fitness/i,
      /healthier life/i,
      /improve health/i,
      /better health/i,
      /health goals/i,
      /fitness goals/i,
      /lifestyle changes/i,
      /healthy habits/i,
      /wellness routine/i,
    ],
    responses: [
      "Regular exercise and balanced nutrition are key to overall health.",
      "Don't forget mental health - stress management and adequate sleep are crucial!",
      "Consistency in healthy habits leads to long-term wellness success.",
      "A holistic approach including exercise, nutrition, and mental wellness is best.",
      "Small, consistent healthy choices create big results over time.",
      "Balance is key - allow yourself flexibility while maintaining overall healthy habits.",
      "Physical health supports mental health and vice versa - they're interconnected.",
      "Make health a lifestyle, not a temporary fix for lasting results.",
    ],
  },
};

// ENHANCED: Food database with specific gram amounts and detailed nutrition info
const foodDatabase = {
  proteins: [
    {
      name: "Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      type: "lean",
      typicalPortion: 170,
    },
    {
      name: "Salmon",
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 13,
      type: "fatty",
      typicalPortion: 170,
    },
    {
      name: "Lean Beef",
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 15,
      type: "lean",
      typicalPortion: 170,
    },
    {
      name: "Eggs",
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      type: "balanced",
      typicalPortion: 100,
    },
    {
      name: "Greek Yogurt",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      type: "lean",
      typicalPortion: 170,
    },
    {
      name: "Tofu",
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fat: 4.8,
      type: "plant",
      typicalPortion: 120,
    },
    {
      name: "Turkey Breast",
      calories: 135,
      protein: 30,
      carbs: 0,
      fat: 1,
      type: "lean",
      typicalPortion: 170,
    },
    {
      name: "Tuna",
      calories: 132,
      protein: 30,
      carbs: 0,
      fat: 1,
      type: "lean",
      typicalPortion: 120,
    },
    {
      name: "Cottage Cheese",
      calories: 98,
      protein: 11,
      carbs: 3.4,
      fat: 4.3,
      type: "lean",
      typicalPortion: 170,
    },
    {
      name: "Whey Protein",
      calories: 120,
      protein: 24,
      carbs: 3,
      fat: 1,
      type: "supplement",
      typicalPortion: 30,
    },
    {
      name: "Lentils",
      calories: 116,
      protein: 9,
      carbs: 20,
      fat: 0.4,
      type: "plant",
      typicalPortion: 100,
    },
    {
      name: "Chickpeas",
      calories: 164,
      protein: 9,
      carbs: 27,
      fat: 2.6,
      type: "plant",
      typicalPortion: 100,
    },
    {
      name: "Pork Tenderloin",
      calories: 143,
      protein: 26,
      carbs: 0,
      fat: 3.5,
      type: "lean",
      typicalPortion: 170,
    },
    {
      name: "Shrimp",
      calories: 99,
      protein: 24,
      carbs: 0.2,
      fat: 0.3,
      type: "lean",
      typicalPortion: 150,
    },
  ],

  carbs: [
    {
      name: "Brown Rice",
      calories: 112,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      type: "complex",
      typicalPortion: 100,
    },
    {
      name: "Sweet Potato",
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      type: "complex",
      typicalPortion: 150,
    },
    {
      name: "Oats",
      calories: 66,
      protein: 2.4,
      carbs: 12,
      fat: 1.4,
      type: "complex",
      typicalPortion: 40,
    },
    {
      name: "Quinoa",
      calories: 120,
      protein: 4.4,
      carbs: 21,
      fat: 1.9,
      type: "complex",
      typicalPortion: 100,
    },
    {
      name: "Whole Wheat Bread",
      calories: 79,
      protein: 3.1,
      carbs: 13,
      fat: 1,
      type: "complex",
      typicalPortion: 50,
    },
    {
      name: "Pasta",
      calories: 131,
      protein: 5,
      carbs: 25,
      fat: 1,
      type: "complex",
      typicalPortion: 85,
    },
    {
      name: "Banana",
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.4,
      type: "fruit",
      typicalPortion: 118,
    },
    {
      name: "Apple",
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      type: "fruit",
      typicalPortion: 182,
    },
    {
      name: "Berries",
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      type: "fruit",
      typicalPortion: 140,
    },
    {
      name: "Potato",
      calories: 77,
      protein: 2,
      carbs: 17,
      fat: 0.1,
      type: "complex",
      typicalPortion: 150,
    },
    {
      name: "Corn",
      calories: 96,
      protein: 3.4,
      carbs: 21,
      fat: 1.5,
      type: "complex",
      typicalPortion: 100,
    },
    {
      name: "Beans",
      calories: 127,
      protein: 8.7,
      carbs: 22,
      fat: 0.5,
      type: "complex",
      typicalPortion: 100,
    },
  ],

  fats: [
    {
      name: "Avocado",
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      type: "healthy",
      typicalPortion: 100,
    },
    {
      name: "Almonds",
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      type: "nuts",
      typicalPortion: 28,
    },
    {
      name: "Olive Oil",
      calories: 119,
      protein: 0,
      carbs: 0,
      fat: 14,
      type: "oil",
      typicalPortion: 14,
    },
    {
      name: "Peanut Butter",
      calories: 188,
      protein: 8,
      carbs: 6,
      fat: 16,
      type: "nuts",
      typicalPortion: 32,
    },
    {
      name: "Walnuts",
      calories: 185,
      protein: 4.3,
      carbs: 3.9,
      fat: 18,
      type: "nuts",
      typicalPortion: 28,
    },
    {
      name: "Chia Seeds",
      calories: 137,
      protein: 4.4,
      carbs: 12,
      fat: 9,
      type: "seeds",
      typicalPortion: 28,
    },
    {
      name: "Flax Seeds",
      calories: 150,
      protein: 5,
      carbs: 8,
      fat: 12,
      type: "seeds",
      typicalPortion: 28,
    },
    {
      name: "Coconut Oil",
      calories: 121,
      protein: 0,
      carbs: 0,
      fat: 14,
      type: "oil",
      typicalPortion: 14,
    },
    {
      name: "Cheese",
      calories: 113,
      protein: 7,
      carbs: 0.4,
      fat: 9,
      type: "dairy",
      typicalPortion: 28,
    },
    {
      name: "Dark Chocolate",
      calories: 155,
      protein: 2,
      carbs: 13,
      fat: 11,
      type: "treat",
      typicalPortion: 28,
    },
  ],

  vegetables: [
    {
      name: "Broccoli",
      calories: 55,
      protein: 3.7,
      carbs: 11,
      fat: 0.6,
      type: "green",
      typicalPortion: 150,
    },
    {
      name: "Spinach",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      type: "green",
      typicalPortion: 100,
    },
    {
      name: "Carrots",
      calories: 41,
      protein: 0.9,
      carbs: 10,
      fat: 0.2,
      type: "root",
      typicalPortion: 100,
    },
    {
      name: "Bell Peppers",
      calories: 31,
      protein: 1,
      carbs: 6,
      fat: 0.3,
      type: "colorful",
      typicalPortion: 120,
    },
    {
      name: "Cauliflower",
      calories: 25,
      protein: 2,
      carbs: 5,
      fat: 0.3,
      type: "white",
      typicalPortion: 100,
    },
    {
      name: "Kale",
      calories: 49,
      protein: 4.3,
      carbs: 9,
      fat: 0.9,
      type: "green",
      typicalPortion: 100,
    },
    {
      name: "Zucchini",
      calories: 17,
      protein: 1.2,
      carbs: 3.1,
      fat: 0.3,
      type: "summer",
      typicalPortion: 180,
    },
    {
      name: "Asparagus",
      calories: 20,
      protein: 2.2,
      carbs: 3.9,
      fat: 0.1,
      type: "green",
      typicalPortion: 130,
    },
  ],
};

// ENHANCED: Workout Scheduling System with Mixed Splits
const workoutSchedulingSystem = {
  // Available workout splits with their characteristics
  splits: {
    ppl: {
      name: "Push/Pull/Legs",
      description: "Focuses on movement patterns rather than muscle groups",
      daysNeeded: 3,
      frequency: "Each muscle group 2x/week",
      bestFor: "Intermediate to advanced, balanced development",
    },
    upperLower: {
      name: "Upper/Lower",
      description: "Balanced approach training upper and lower body separately",
      daysNeeded: 4,
      frequency: "Each muscle group 2x/week",
      bestFor: "Beginners to intermediate, strength building",
    },
    broSplit: {
      name: "Bro Split",
      description: "Focuses on one muscle group per day",
      daysNeeded: 5,
      frequency: "Each muscle group 1x/week",
      bestFor: "Advanced, high volume per session",
    },
    mixed: {
      name: "Mixed PPL/Upper Lower",
      description: "Combines PPL and Upper/Lower principles",
      daysNeeded: 4,
      frequency: "Each muscle group 2x/week",
      bestFor: "Intermediate to advanced, balanced approach",
    },
  },

  // Exercise database for different splits
  exercises: {
    push: [
      "Bench Press",
      "Overhead Press",
      "Incline Dumbbell Press",
      "Chest Flyes",
      "Lateral Raises",
      "Tricep Pushdowns",
      "Skull Crushers",
      "Dips",
    ],
    pull: [
      "Pull-ups",
      "Barbell Rows",
      "Lat Pulldowns",
      "Face Pulls",
      "Bicep Curls",
      "Hammer Curls",
      "Seated Rows",
      "Shrugs",
    ],
    legs: [
      "Squats",
      "Deadlifts",
      "Leg Press",
      "Lunges",
      "Leg Curls",
      "Leg Extensions",
      "Calf Raises",
      "Hip Thrusts",
    ],
    upper: [
      "Bench Press",
      "Overhead Press",
      "Pull-ups",
      "Barbell Rows",
      "Lateral Raises",
      "Bicep Curls",
      "Tricep Extensions",
      "Face Pulls",
    ],
    lower: [
      "Squats",
      "Deadlifts",
      "Leg Press",
      "Bulgarian Split Squats",
      "Romanian Deadlifts",
      "Leg Curls",
      "Calf Raises",
      "Lunges",
    ],
    chest: [
      "Bench Press",
      "Incline Dumbbell Press",
      "Cable Flyes",
      "Push-ups",
      "Chest Dips",
      "Decline Bench Press",
      "Pec Deck",
      "Cable Crossovers",
    ],
    back: [
      "Deadlifts",
      "Pull-ups",
      "Barbell Rows",
      "Lat Pulldowns",
      "T-Bar Rows",
      "Seated Rows",
      "Hyperextensions",
      "Straight Arm Pulldowns",
    ],
    shoulders: [
      "Overhead Press",
      "Lateral Raises",
      "Front Raises",
      "Rear Delt Flyes",
      "Arnold Press",
      "Upright Rows",
      "Face Pulls",
      "Shrugs",
    ],
    arms: [
      "Barbell Curls",
      "Tricep Pushdowns",
      "Hammer Curls",
      "Overhead Tricep Extensions",
      "Preacher Curls",
      "Skull Crushers",
      "Concentration Curls",
      "Dips",
    ],
  },

  // Generate workout based on available days and preferred split
  generateWorkoutSchedule: function (
    availableDays,
    preferredSplit,
    experienceLevel
  ) {
    const days = availableDays.map((day) => day.toLowerCase());
    const split = preferredSplit.toLowerCase();
    const level = experienceLevel.toLowerCase();

    let schedule = {};

    // Assign workouts based on split type and available days
    if (
      split.includes("ppl") &&
      split.includes("upper") &&
      split.includes("lower")
    ) {
      schedule = this.generateMixedPPLUpperLowerSchedule(days, level);
    } else if (split.includes("ppl") || split.includes("push pull")) {
      schedule = this.generatePPLSchedule(days, level);
    } else if (split.includes("upper") && split.includes("lower")) {
      schedule = this.generateUpperLowerSchedule(days, level);
    } else if (split.includes("bro") || split.includes("body part")) {
      schedule = this.generateBroSplitSchedule(days, level);
    } else {
      // Default to mixed approach
      schedule = this.generateMixedPPLUpperLowerSchedule(days, level);
    }

    return this.formatScheduleOutput(
      schedule,
      availableDays,
      preferredSplit,
      experienceLevel
    );
  },

  // NEW: Generate Mixed PPL/Upper Lower Schedule
  generateMixedPPLUpperLowerSchedule: function (days, level) {
    const schedule = {};
    const workoutTypes = ["Push", "Pull", "Upper", "Lower", "Legs"];

    // Create a balanced mixed schedule
    days.forEach((day, index) => {
      let workoutType;

      if (days.length === 3) {
        // 3-day schedule: Push, Pull, Legs
        workoutType = ["Push", "Pull", "Legs"][index % 3];
      } else if (days.length === 4) {
        // 4-day schedule: Push, Pull, Upper, Lower
        workoutType = ["Push", "Pull", "Upper", "Lower"][index % 4];
      } else if (days.length === 5) {
        // 5-day schedule: Push, Pull, Upper, Lower, Full Body
        workoutType = ["Push", "Pull", "Upper", "Lower", "Full Body"][
          index % 5
        ];
      } else {
        // Default to rotating through available types
        workoutType = workoutTypes[index % workoutTypes.length];
      }

      schedule[day] = this.generateWorkout(workoutType, level);
    });

    return schedule;
  },

  // Generate PPL schedule
  generatePPLSchedule: function (days, level) {
    const workouts = ["Push", "Pull", "Legs"];
    const schedule = {};

    // Rotate through PPL based on available days
    days.forEach((day, index) => {
      const workoutType = workouts[index % workouts.length];
      schedule[day] = this.generateWorkout(workoutType, level);
    });

    return schedule;
  },

  // Generate Upper/Lower schedule
  generateUpperLowerSchedule: function (days, level) {
    const schedule = {};
    let upperCount = 0;
    let lowerCount = 0;

    // Alternate between upper and lower body
    days.forEach((day) => {
      if (upperCount <= lowerCount) {
        schedule[day] = this.generateWorkout("Upper", level);
        upperCount++;
      } else {
        schedule[day] = this.generateWorkout("Lower", level);
        lowerCount++;
      }
    });

    return schedule;
  },

  // Generate Bro Split schedule
  generateBroSplitSchedule: function (days, level) {
    const muscleGroups = ["Chest", "Back", "Shoulders", "Legs", "Arms"];
    const schedule = {};

    // Assign different muscle groups to each day
    days.forEach((day, index) => {
      const muscleGroup = muscleGroups[index % muscleGroups.length];
      schedule[day] = this.generateWorkout(muscleGroup, level);
    });

    return schedule;
  },

  // Generate Hybrid schedule (mixes different approaches)
  generateHybridSchedule: function (days, level) {
    const schedule = {};

    // Create a balanced hybrid schedule
    days.forEach((day, index) => {
      let workoutType;

      switch (index % 5) {
        case 0:
          workoutType = "Push";
          break;
        case 1:
          workoutType = "Pull";
          break;
        case 2:
          workoutType = "Legs";
          break;
        case 3:
          workoutType = "Upper";
          break;
        case 4:
          workoutType = "Lower";
          break;
      }

      schedule[day] = this.generateWorkout(workoutType, level);
    });

    return schedule;
  },

  // Generate specific workout based on type and experience level
  generateWorkout: function (type, level) {
    let exercises = [];

    // Get appropriate exercises based on workout type
    if (type === "Full Body") {
      exercises = [
        ...this.exercises.push.slice(0, 2),
        ...this.exercises.pull.slice(0, 2),
        ...this.exercises.legs.slice(0, 2),
      ];
    } else {
      exercises = this.exercises[type.toLowerCase()] || this.exercises.push;
    }

    const workout = [];

    // Determine number of exercises based on experience level
    let exerciseCount;
    switch (level) {
      case "beginner":
        exerciseCount = 4;
        break;
      case "intermediate":
        exerciseCount = 5;
        break;
      case "advanced":
        exerciseCount = 6;
        break;
      default:
        exerciseCount = 5;
    }

    // Select random exercises
    const selectedExercises = this.shuffleArray([...exercises]).slice(
      0,
      exerciseCount
    );

    // Add sets and reps based on level
    selectedExercises.forEach((exercise) => {
      let sets, reps;

      switch (level) {
        case "beginner":
          sets = 3;
          reps = "10-12";
          break;
        case "intermediate":
          sets = 3;
          reps = "8-12";
          break;
        case "advanced":
          sets = 4;
          reps = "6-10";
          break;
        default:
          sets = 3;
          reps = "8-12";
      }

      workout.push(`${exercise}: ${sets}x${reps}`);
    });

    return {
      type: type,
      exercises: workout,
      totalExercises: exerciseCount,
      focus: this.getWorkoutFocus(type),
    };
  },

  // Get workout focus description
  getWorkoutFocus: function (type) {
    const focuses = {
      push: "Chest, Shoulders, Triceps",
      pull: "Back, Biceps, Rear Delts",
      legs: "Quads, Hamstrings, Glutes, Calves",
      upper: "Full Upper Body",
      lower: "Full Lower Body",
      chest: "Chest Development",
      back: "Back Development",
      shoulders: "Shoulder Development",
      arms: "Biceps and Triceps",
      "full body": "Full Body Compound Movements",
    };

    return focuses[type.toLowerCase()] || "Full Body";
  },

  // Format the final schedule output
  formatScheduleOutput: function (
    schedule,
    availableDays,
    preferredSplit,
    experienceLevel
  ) {
    let output = `🏋️‍♂️ **CUSTOM WORKOUT SCHEDULE** 🏋️‍♂️\n\n`;
    output += `**Your Schedule:** ${availableDays.join(", ")}\n`;
    output += `**Preferred Split:** ${preferredSplit}\n`;
    output += `**Experience Level:** ${experienceLevel}\n\n`;

    output += `**WEEKLY WORKOUT PLAN:**\n\n`;

    Object.keys(schedule).forEach((day) => {
      const workout = schedule[day];
      output += `**${day.charAt(0).toUpperCase() + day.slice(1)}:** ${
        workout.type
      } Day\n`;
      output += `• Focus: ${workout.focus}\n`;
      workout.exercises.forEach((exercise) => {
        output += `• ${exercise}\n`;
      });
      output += `\n`;
    });

    output += `**TRAINING TIPS:**\n`;
    output += `• Warm up for 5-10 minutes before each workout\n`;
    output += `• Rest 60-90 seconds between sets\n`;
    output += `• Focus on proper form over heavy weights\n`;
    output += `• Stay hydrated and fuel properly\n`;
    output += `• Get adequate sleep for recovery\n\n`;

    output += `**PROGRESSION:**\n`;
    output += `• Increase weight when you can complete all reps with good form\n`;
    output += `• Track your workouts to monitor progress\n`;
    output += `• Consider deloading every 6-8 weeks\n`;

    return output;
  },

  // Utility function to shuffle array
  shuffleArray: function (array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
};

// Track used items to avoid redundancy
let usedItems = {
  foods: {
    daily: new Set(),
    weekly: new Set(),
  },
  workouts: {
    ppl: -1,
    upperLower: -1,
    broSplit: -1,
    beginner: -1,
    intermediate: -1,
    advanced: -1,
    elite: -1,
    scienceBased: -1,
    scienceBasedLift: -1,
  },
};

// Enhanced response system with keyword matching, sentence understanding, and meal planning
export const getBotResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();

  // Special case for empty messages
  if (!message) {
    return "Hello! I'm your fitness assistant. What would you like to know about health and fitness today? 💪";
  }

  // Check for workout scheduling requests first
  const scheduleResponse = handleWorkoutSchedulingRequest(message);
  if (scheduleResponse) {
    return scheduleResponse;
  }

  // Check for weekly meal planning requests
  const weeklyMealPlanResponse = handleWeeklyMealPlanningRequest(message);
  if (weeklyMealPlanResponse) {
    return weeklyMealPlanResponse;
  }

  // Check for daily meal planning requests
  const mealPlanResponse = handleMealPlanningRequest(message);
  if (mealPlanResponse) {
    return mealPlanResponse;
  }

  // Check for workout plan requests
  const workoutPlanResponse = handleWorkoutPlanRequest(message);
  if (workoutPlanResponse) {
    return workoutPlanResponse;
  }

  // Track matches and their confidence scores
  const matches = [];

  // Check each category for pattern matches
  for (const [category, data] of Object.entries(fitnessHealthData)) {
    if (data.patterns) {
      let categoryScore = 0;
      let matchedPatterns = [];

      for (const pattern of data.patterns) {
        if (pattern.test(message)) {
          matchedPatterns.push(pattern);
          // Score based on pattern specificity and match quality
          const patternScore = calculatePatternScore(pattern, message);
          categoryScore += patternScore;
        }
      }

      if (matchedPatterns.length > 0) {
        matches.push({
          category,
          score: categoryScore,
          responses: data.responses,
        });
      }
    }
  }

  // Sort matches by score (highest first)
  matches.sort((a, b) => b.score - a.score);

  // If we have high-confidence matches, return the best one
  if (matches.length > 0 && matches[0].score > 0.5) {
    const bestMatch = matches[0];
    const randomIndex = Math.floor(Math.random() * bestMatch.responses.length);
    return bestMatch.responses[randomIndex];
  }

  // If no strong pattern matches, use keyword-based understanding
  return getKeywordBasedResponse(message);
};

// NEW: Workout Scheduling Request Handler
const handleWorkoutSchedulingRequest = (message) => {
  // Check if this is a scheduling request
  const hasScheduleKeywords =
    /schedule|available|availability|workout days|training days/i.test(message);
  const hasDayKeywords =
    /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(message);

  if (hasScheduleKeywords || hasDayKeywords) {
    return generateWorkoutScheduleFromMessage(message);
  }

  return null;
};

// NEW: Generate workout schedule from user message
const generateWorkoutScheduleFromMessage = (message) => {
  // Extract available days
  const days = [];
  const dayPatterns = {
    monday: /monday/i,
    tuesday: /tuesday/i,
    wednesday: /wednesday/i,
    thursday: /thursday/i,
    friday: /friday/i,
    saturday: /saturday/i,
    sunday: /sunday/i,
  };

  Object.keys(dayPatterns).forEach((day) => {
    if (dayPatterns[day].test(message)) {
      days.push(day);
    }
  });

  // If no specific days mentioned, use default schedule
  const availableDays =
    days.length > 0 ? days : ["monday", "wednesday", "friday"];

  // Extract preferred split
  let preferredSplit = "Mixed";
  if (
    /ppl|push.?pull/i.test(message) &&
    /upper.?lower|upper lower/i.test(message)
  ) {
    preferredSplit = "Mixed PPL/Upper Lower";
  } else if (/ppl|push.?pull/i.test(message)) {
    preferredSplit = "PPL";
  } else if (/upper.?lower|upper lower/i.test(message)) {
    preferredSplit = "Upper/Lower";
  } else if (/bro.?split|bro split/i.test(message)) {
    preferredSplit = "Bro Split";
  }

  // Extract experience level
  let experienceLevel = "Intermediate";
  if (/beginner|starting|new/i.test(message)) {
    experienceLevel = "Beginner";
  } else if (/intermediate|experienced/i.test(message)) {
    experienceLevel = "Intermediate";
  } else if (/advanced|expert/i.test(message)) {
    experienceLevel = "Advanced";
  }

  // Generate the workout schedule
  return workoutSchedulingSystem.generateWorkoutSchedule(
    availableDays,
    preferredSplit,
    experienceLevel
  );
};

// NEW: Workout Plan Request Handler
const handleWorkoutPlanRequest = (message) => {
  // Check for science-based lift workout requests first
  if (
    fitnessHealthData.scienceBasedLiftWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("scienceBasedLift");
  }

  // Check for beginner workout requests
  if (
    fitnessHealthData.beginnerWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("beginner");
  }

  // Check for intermediate workout requests
  if (
    fitnessHealthData.intermediateWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("intermediate");
  }

  // Check for advanced workout requests
  if (
    fitnessHealthData.advancedWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("advanced");
  }

  // Check for elite workout requests
  if (
    fitnessHealthData.eliteWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("elite");
  }

  // Check for science-based workout requests
  if (
    fitnessHealthData.scienceBasedWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("scienceBased");
  }

  // Check for PPL workout requests
  if (
    fitnessHealthData.pplWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("ppl");
  }

  // Check for Upper/Lower workout requests
  if (
    fitnessHealthData.upperLowerWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("upperLower");
  }

  // Check for Bro Split workout requests
  if (
    fitnessHealthData.broSplitWorkouts.patterns.some((pattern) =>
      pattern.test(message)
    )
  ) {
    return getNonRedundantWorkout("broSplit");
  }

  return null;
};

// NEW: Get non-redundant workout plan
const getNonRedundantWorkout = (workoutType) => {
  const workoutData = {
    beginner: fitnessHealthData.beginnerWorkouts,
    intermediate: fitnessHealthData.intermediateWorkouts,
    advanced: fitnessHealthData.advancedWorkouts,
    elite: fitnessHealthData.eliteWorkouts,
    scienceBased: fitnessHealthData.scienceBasedWorkouts,
    scienceBasedLift: fitnessHealthData.scienceBasedLiftWorkouts,
    ppl: fitnessHealthData.pplWorkouts,
    upperLower: fitnessHealthData.upperLowerWorkouts,
    broSplit: fitnessHealthData.broSplitWorkouts,
  };

  const data = workoutData[workoutType];
  if (!data || !data.responses) return null;

  let lastIndex = usedItems.workouts[workoutType];
  let randomIndex;

  // Ensure we get a different workout than last time
  do {
    randomIndex = Math.floor(Math.random() * data.responses.length);
  } while (randomIndex === lastIndex && data.responses.length > 1);

  usedItems.workouts[workoutType] = randomIndex;
  return data.responses[randomIndex];
};

// NEW: Weekly Meal Planning Functionality
const handleWeeklyMealPlanningRequest = (message) => {
  const hasWeeklyKeywords =
    /weekly|week|7.*day|seven.*day|whole.*week|entire.*week/i.test(message);

  if (hasWeeklyKeywords) {
    // Extract nutritional targets from message
    const calorieMatch = message.match(/(\d+)\s*calories?/i);
    const proteinMatch =
      message.match(/(\d+)\s*g\s*protein/i) ||
      message.match(/protein.*?(\d+)/i);
    const mealMatch = message.match(/(\d+)\s*meals/i);

    const dailyCalories = calorieMatch ? parseInt(calorieMatch[1]) : 2500;
    const dailyProtein = proteinMatch ? parseInt(proteinMatch[1]) : 180;
    const mealsPerDay = mealMatch ? parseInt(mealMatch[1]) : 4;

    return generateWeeklyMealPlan(dailyCalories, dailyProtein, mealsPerDay);
  }

  return null;
};

// NEW: Generate Weekly Meal Plan
const generateWeeklyMealPlan = (dailyCalories, dailyProtein, mealsPerDay) => {
  // Calculate daily targets
  const dailyTargets = calculateDailyTargets(dailyCalories, dailyProtein);

  let plan = `📅 **7-DAY MEAL PLAN** 📅\n\n`;
  plan += `**Daily Targets:**\n`;
  plan += `• Calories: ${dailyCalories}\n`;
  plan += `• Protein: ${dailyProtein}g\n`;
  plan += `• Meals: ${mealsPerDay} per day\n\n`;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  days.forEach((day) => {
    plan += `**${day}:**\n`;
    const dayPlan = generateDailyMealPlan(dailyTargets, mealsPerDay);
    dayPlan.meals.forEach((meal, index) => {
      plan += `• **Meal ${index + 1}:** ${meal.description} (${
        meal.calories
      } cal, ${meal.protein}g protein)\n`;
    });
    plan += `\n`;
  });

  plan += `**Weekly Shopping List:**\n`;
  plan += `• Proteins: Chicken breast, salmon, eggs, Greek yogurt, lean beef, tuna\n`;
  plan += `• Carbs: Brown rice, sweet potatoes, oats, quinoa, whole grain bread\n`;
  plan += `• Fats: Avocado, almonds, olive oil, peanut butter\n`;
  plan += `• Vegetables: Broccoli, spinach, carrots, bell peppers, cauliflower\n`;
  plan += `• Fruits: Bananas, apples, berries, oranges\n\n`;

  plan += `**Meal Prep Tips:**\n`;
  plan += `• Cook proteins in bulk on Sunday\n`;
  plan += `• Pre-portion snacks and meals\n`;
  plan += `• Wash and chop vegetables\n`;
  plan += `• Make overnight oats for breakfast\n`;

  return plan;
};

// Enhanced meal planning functionality
const handleMealPlanningRequest = (message) => {
  // Check for meal planning patterns
  const hasDissectPattern =
    /dissect|split|divide|break.*down|distribute|portion/i.test(message);
  const hasMealPattern = /meal.*plan|food.*distribution|nutrition.*plan/i.test(
    message
  );
  const hasNumberPattern = /(\d+)\s*meal/i.test(message);

  if (hasDissectPattern || hasMealPattern || hasNumberPattern) {
    // Extract numbers from message
    const mealMatch = message.match(/(\d+)\s*meal/i);
    const calorieMatch = message.match(/(\d+)\s*calories?/i);
    const proteinMatch =
      message.match(/(\d+)\s*g\s*protein/i) ||
      message.match(/protein.*?(\d+)/i);

    const meals = mealMatch ? parseInt(mealMatch[1]) : 4;
    const totalCalories = calorieMatch ? parseInt(calorieMatch[1]) : 2500;
    const totalProtein = proteinMatch ? parseInt(proteinMatch[1]) : 180;

    return generateMealPlan(meals, totalCalories, totalProtein);
  }

  return null;
};

// Generate meal plan based on user specifications
const generateMealPlan = (numberOfMeals, totalCalories, totalProtein) => {
  const targets = calculateMealTargets(
    numberOfMeals,
    totalCalories,
    totalProtein
  );

  let plan = `🍽️ **CUSTOM MEAL PLAN** 🍽️\n\n`;
  plan += `**Daily Totals:**\n`;
  plan += `• ${numberOfMeals} meals\n`;
  plan += `• ${totalCalories} calories\n`;
  plan += `• ${totalProtein}g protein\n\n`;

  plan += `**Meal Breakdown:**\n`;

  for (let i = 0; i < numberOfMeals; i++) {
    const meal = generateMeal(
      targets.perMeal.calories,
      targets.perMeal.protein,
      i,
      numberOfMeals
    );
    plan += `• **Meal ${i + 1}:** ${meal.description} (${meal.calories} cal, ${
      meal.protein
    }g protein)\n`;
  }

  plan += `\n**Nutrition Summary:**\n`;
  plan += `• Protein: ${targets.total.protein}g (${Math.round(
    ((targets.total.protein * 4) / totalCalories) * 100
  )}%)\n`;
  plan += `• Carbs: ${targets.total.carbs}g (${Math.round(
    ((targets.total.carbs * 4) / totalCalories) * 100
  )}%)\n`;
  plan += `• Fat: ${targets.total.fat}g (${Math.round(
    ((targets.total.fat * 9) / totalCalories) * 100
  )}%)\n\n`;

  plan += `**Meal Timing Tips:**\n`;
  if (numberOfMeals === 3) {
    plan += `• Breakfast (7-8 AM), Lunch (12-1 PM), Dinner (6-7 PM)\n`;
  } else if (numberOfMeals === 4) {
    plan += `• Breakfast (7-8 AM), Lunch (12-1 PM), Snack (3-4 PM), Dinner (6-7 PM)\n`;
  } else if (numberOfMeals === 5) {
    plan += `• Breakfast (7-8 AM), Snack (10 AM), Lunch (12-1 PM), Snack (3-4 PM), Dinner (6-7 PM)\n`;
  } else if (numberOfMeals === 6) {
    plan += `• Breakfast (7-8 AM), Snack (10 AM), Lunch (12-1 PM), Snack (3-4 PM), Dinner (6-7 PM), Evening (9 PM)\n`;
  }

  return plan;
};

// Calculate meal targets based on total calories and protein
const calculateMealTargets = (numberOfMeals, totalCalories, totalProtein) => {
  const perMealCalories = Math.round(totalCalories / numberOfMeals);
  const perMealProtein = Math.round(totalProtein / numberOfMeals);

  // Calculate remaining calories for carbs and fat
  const remainingCalories = totalCalories - totalProtein * 4;
  const carbCalories = remainingCalories * 0.5; // 50% carbs
  const fatCalories = remainingCalories * 0.5; // 50% fat

  return {
    perMeal: {
      calories: perMealCalories,
      protein: perMealProtein,
      carbs: Math.round(carbCalories / 4 / numberOfMeals),
      fat: Math.round(fatCalories / 9 / numberOfMeals),
    },
    total: {
      protein: totalProtein,
      carbs: Math.round(carbCalories / 4),
      fat: Math.round(fatCalories / 9),
    },
  };
};

// Calculate daily targets for weekly planning
const calculateDailyTargets = (dailyCalories, dailyProtein) => {
  const remainingCalories = dailyCalories - dailyProtein * 4;
  const carbCalories = remainingCalories * 0.5;
  const fatCalories = remainingCalories * 0.5;

  return {
    calories: dailyCalories,
    protein: dailyProtein,
    carbs: Math.round(carbCalories / 4),
    fat: Math.round(fatCalories / 9),
  };
};

// Generate a single meal
const generateMeal = (targetCalories, targetProtein, mealIndex, totalMeals) => {
  let mealType;
  if (totalMeals === 3) {
    mealType = ["Breakfast", "Lunch", "Dinner"][mealIndex];
  } else if (totalMeals === 4) {
    mealType = ["Breakfast", "Lunch", "Snack", "Dinner"][mealIndex];
  } else if (totalMeals === 5) {
    mealType = [
      "Breakfast",
      "Morning Snack",
      "Lunch",
      "Afternoon Snack",
      "Dinner",
    ][mealIndex];
  } else {
    mealType = `Meal ${mealIndex + 1}`;
  }

  // Select appropriate foods based on meal type and targets
  const proteinFoods = [...foodDatabase.proteins];
  const carbFoods = [...foodDatabase.carbs];
  const fatFoods = [...foodDatabase.fats];
  const vegetableFoods = [...foodDatabase.vegetables];

  // Create meal combinations
  let mealDescription = "";
  let totalCalories = 0;
  let totalProtein = 0;

  // Always include a protein source
  const proteinChoice = selectFood(proteinFoods, targetProtein, targetCalories);
  mealDescription += proteinChoice.name;
  totalCalories += proteinChoice.calories;
  totalProtein += proteinChoice.protein;

  // Add carb source for most meals (except maybe last meal if cutting)
  if (mealIndex < totalMeals - 1 || Math.random() > 0.3) {
    const carbChoice = selectFood(carbFoods, 0, targetCalories - totalCalories);
    mealDescription += ` + ${carbChoice.name}`;
    totalCalories += carbChoice.calories;
    totalProtein += carbChoice.protein;
  }

  // Add vegetable
  const vegetableChoice = selectFood(vegetableFoods, 0, 50);
  mealDescription += ` + ${vegetableChoice.name}`;
  totalCalories += vegetableChoice.calories;
  totalProtein += vegetableChoice.protein;

  // Add fat source if needed and there's room
  if (totalCalories < targetCalories - 100) {
    const fatChoice = selectFood(fatFoods, 0, targetCalories - totalCalories);
    mealDescription += ` + ${fatChoice.name}`;
    totalCalories += fatChoice.calories;
    totalProtein += fatChoice.protein;
  }

  return {
    description: mealDescription,
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein),
  };
};

// Generate daily meal plan
const generateDailyMealPlan = (dailyTargets, mealsPerDay) => {
  const meals = [];
  const mealTargets = {
    calories: Math.round(dailyTargets.calories / mealsPerDay),
    protein: Math.round(dailyTargets.protein / mealsPerDay),
  };

  for (let i = 0; i < mealsPerDay; i++) {
    meals.push(
      generateMeal(mealTargets.calories, mealTargets.protein, i, mealsPerDay)
    );
  }

  return { meals };
};

// Select appropriate food based on targets
const selectFood = (foodList, targetProtein, maxCalories) => {
  // Filter foods that fit within calorie limit
  const suitableFoods = foodList.filter(
    (food) => food.calories <= maxCalories || maxCalories === 0
  );

  // If we have protein target, prioritize high-protein foods
  if (targetProtein > 0 && suitableFoods.length > 0) {
    suitableFoods.sort((a, b) => b.protein - a.protein);
  }

  // Return random food from suitable options, or first food if none suitable
  const selectedFood =
    suitableFoods.length > 0
      ? suitableFoods[Math.floor(Math.random() * suitableFoods.length)]
      : foodList[0];

  return {
    name: selectedFood.name,
    calories: selectedFood.calories,
    protein: selectedFood.protein,
    carbs: selectedFood.carbs,
    fat: selectedFood.fat,
  };
};

// Enhanced pattern scoring system
const calculatePatternScore = (pattern, message) => {
  let score = 0;

  // Base score for any match
  score += 1;

  // Higher score for exact matches or more specific patterns
  if (pattern.source.includes("^") || pattern.source.includes("$")) {
    score += 2; // More specific pattern
  }

  // Check for multiple keyword matches in the pattern
  const patternKeywords = pattern.source
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
  let keywordMatches = 0;

  patternKeywords.forEach((keyword) => {
    if (message.includes(keyword.toLowerCase())) {
      keywordMatches++;
    }
  });

  score += (keywordMatches / patternKeywords.length) * 3;

  return score;
};

// Enhanced keyword-based response system
const getKeywordBasedResponse = (message) => {
  const keywords = {
    // Workout and exercise keywords
    workout: [
      "Try focusing on compound movements like squats, bench press, and deadlifts for maximum efficiency.",
      "Remember to warm up properly and cool down after your workouts!",
    ],
    exercise: [
      "Consistency is key with exercise - even short daily sessions add up over time.",
      "Mix up your routine to keep things interesting and challenge different muscle groups.",
    ],
    gym: [
      "Make the most of your gym time by having a plan before you go.",
      "Don't be afraid to ask gym staff for help with equipment or form!",
    ],

    // Nutrition keywords
    food: [
      "Focus on whole, unprocessed foods for optimal nutrition.",
      "Balance your plate with protein, complex carbs, and healthy fats at each meal.",
    ],
    eat: [
      "Listen to your body's hunger and fullness cues for better eating habits.",
      "Aim for consistent meal timing to maintain steady energy levels.",
    ],
    diet: [
      "The best diet is one you can maintain long-term - focus on sustainable habits.",
      "Include foods you enjoy in moderation for better adherence to your nutrition plan.",
    ],

    // Health and wellness keywords
    health: [
      "Remember that health includes physical, mental, and emotional wellbeing.",
      "Small, consistent healthy choices lead to big results over time.",
    ],
    sleep: [
      "Quality sleep is crucial for recovery, hormone balance, and overall health.",
      "Aim for 7-9 hours of sleep per night for optimal functioning.",
    ],
    stress: [
      "Manage stress through exercise, meditation, and proper work-life balance.",
      "Chronic stress can impact both physical and mental health - prioritize stress management.",
    ],

    // Goal-specific keywords
    weight: [
      "Sustainable weight management focuses on long-term habits, not quick fixes.",
      "Combine proper nutrition with consistent exercise for best weight management results.",
    ],
    muscle: [
      "Progressive overload and adequate protein are key for muscle growth.",
      "Allow 48 hours recovery between working the same muscle groups.",
    ],
    strength: [
      "Focus on compound lifts and progressive overload for strength gains.",
      "Proper form is more important than heavy weights for long-term strength development.",
    ],

    // Recovery keywords
    recovery: [
      "Active recovery like walking or light stretching can enhance recovery.",
      "Nutrition, hydration, and sleep are crucial components of recovery.",
    ],
    sore: [
      "Some muscle soreness is normal, especially when starting new exercises.",
      "Light movement and proper hydration can help reduce muscle soreness.",
    ],
  };

  // Calculate keyword scores
  const keywordScores = {};
  Object.keys(keywords).forEach((keyword) => {
    if (message.includes(keyword)) {
      // Score based on keyword importance and frequency
      let score = 1;

      // Higher score for more specific or important keywords
      if (["workout", "exercise", "diet", "nutrition"].includes(keyword)) {
        score += 2;
      }

      // Check for multiple occurrences
      const occurrences = (message.match(new RegExp(keyword, "gi")) || [])
        .length;
      score += occurrences * 0.5;

      keywordScores[keyword] = score;
    }
  });

  // Get the highest scoring keyword
  const sortedKeywords = Object.keys(keywordScores).sort(
    (a, b) => keywordScores[b] - keywordScores[a]
  );

  if (sortedKeywords.length > 0) {
    const bestKeyword = sortedKeywords[0];
    const responses = keywords[bestKeyword];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Default responses for general fitness/health questions
  const defaultResponses = [
    "I'd be happy to help with that! Could you provide more details about your fitness goals or questions?",
    "That's a great question! For more specific advice, could you tell me about your current fitness level and goals?",
    "I'd love to help you with that! What specific aspect of fitness or nutrition are you interested in?",
    "That's an important topic! Could you share more about your situation so I can provide better guidance?",
    "I'm here to help with all your fitness questions! What specific information are you looking for?",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Export the enhanced system
export { foodDatabase, workoutSchedulingSystem, usedItems };