export const coaches = [
  {
    name: "Kayla Itsines",
    image: "public/images/kayla.jpg",
    style: "BBG - High-Intensity Circuit Training",
    description: "Circuit-based training with minimal rest for fat loss and endurance.",
    career: "Australian personal trainer, author, and entrepreneur. Co-founder of the fitness app Sweat with Kayla. Known for creating the Bikini Body Guide (BBG) program.",
    achievements: [
      "Created the massively popular Bikini Body Guide (BBG) program",
      "Co-founded the Sweat app with over 50 million downloads",
      "Named one of Time Magazine's 30 Most Influential People Online",
      "Forbes 30 Under 30 list in 2017"
    ],
    famousWorkout: "BBG 28-Minute Full Body Circuit",
    splits: [
      {
        name: "Full-Body Circuit (28 minutes AMRAP)",
        exercises: [
          { name: "Structure", sets: "Circuit", reps: "45s work / 15s rest", rest: "1-2min between circuits", notes: "Complete circuit as many times as possible in 28 minutes" },
          { name: "Jump Squats", sets: "-", reps: "45s", rest: "15s", notes: "" },
          { name: "Push-Ups", sets: "-", reps: "45s", rest: "15s", notes: "" },
          { name: "Burpees", sets: "-", reps: "45s", rest: "15s", notes: "" },
          { name: "Mountain Climbers", sets: "-", reps: "45s", rest: "15s", notes: "" },
          { name: "Alternating Lunges", sets: "-", reps: "45s", rest: "15s", notes: "" },
          { name: "Tricep Dips", sets: "-", reps: "45s", rest: "15s", notes: "" },
          { name: "Plank Hold", sets: "-", reps: "45s", rest: "15s", notes: "" }
        ]
      }
    ]
  },
  {
    name: "Joe Wicks",
    image: "public/images/joe.png",
    style: "HIIT & Hybrid Training",
    description: "Accessible, time-efficient HIIT combining strength and cardio.",
    career: "British fitness coach, author, and television presenter. Known as 'The Body Coach' for his popular HIIT workouts and Lean in 15 nutrition plan.",
    achievements: [
      "Sold over 3 million copies of his 'Lean in 15' book series",
      "Guinness World Record for largest HIIT workout (3,133 participants)",
      "Raised over £1 million for NHS charities during COVID-19 lockdown",
      "Multiple Sunday Times bestselling author"
    ],
    famousWorkout: "Lean in 15 HIIT Workouts",
    splits: [
      {
        name: "Full-Body HIIT Strength (Ladder)",
        exercises: [
          { name: "Structure", sets: "4 Rounds", reps: "40s work / 20s rest", rest: "Decreasing rest: 60s→45s→30s→15s", notes: "Ladder workout with decreasing rest each round" },
          { name: "Goblet Squats", sets: "-", reps: "40s", rest: "20s", notes: "" },
          { name: "Renegade Rows", sets: "-", reps: "40s", rest: "20s", notes: "" },
          { name: "Kettlebell Swings", sets: "-", reps: "40s", rest: "20s", notes: "" },
          { name: "Shoulder Taps", sets: "-", reps: "40s", rest: "20s", notes: "" }
        ]
      }
    ]
  },
  {
    name: "Michelle Lewin",
    image: "public/images/Michelle Lewin.jpg",
    style: "Glute & Aesthetic Focus",
    description: "Glute-focused training with emphasis on mind-muscle connection and progressive overload.",
    career: "Venezuelan fitness model, bodybuilder, and social media influencer. Known for her aesthetic physique and glute development expertise.",
    achievements: [
      "IFBB Fitness Olympia competitor",
      "Over 15 million Instagram followers",
      "Featured in major fitness magazines worldwide",
      "Successful fitness apparel and supplement lines"
    ],
    famousWorkout: "Glute Specialization Program",
    splits: [
      {
        name: "Glutes & Hamstrings",
        exercises: [
          { name: "Hip Thrusts", sets: 4, reps: "10-15", rest: "90s", notes: "Focus on glute contraction at top" },
          { name: "Romanian Deadlifts", sets: 4, reps: "12-15", rest: "90s", notes: "Feel the stretch in hamstrings" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10-12 each", rest: "75s", notes: "Great for glute development" },
          { name: "Cable Kickbacks", sets: 3, reps: "15-20 each", rest: "60s", notes: "Squeeze glutes at top" },
          { name: "Glute Bridges", sets: 3, reps: "15-20", rest: "60s", notes: "Burnout exercise" },
          { name: "Seated Leg Curls", sets: 3, reps: "12-15", rest: "60s", notes: "Isolate hamstrings" }
        ]
      }
    ]
  },
  {
    name: "Stephanie Buttermore",
    image: "public/images/stephanie.jpg",
    style: "Full-Body & Women's Training",
    description: "Balanced approach focusing on strength, hypertrophy, and sustainable training habits.",
    career: "PhD in Cancer Biology, fitness scientist, and content creator. Known for her 'All In' journey and evidence-based approach to training and nutrition.",
    achievements: [
      "PhD in Cancer Biology from Cornell University",
      "Pioneered the 'All In' approach to metabolic recovery",
      "Featured in major scientific and fitness publications",
      "International speaker on women's health and fitness"
    ],
    famousWorkout: "Full-Body Fundamentals Program",
    splits: [
      {
        name: "Full-Body Strength",
        exercises: [
          { name: "Squats", sets: 4, reps: "6-8", rest: "120s", notes: "Focus on depth and form" },
          { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s", notes: "Progressive overload focus" },
          { name: "Bent Over Rows", sets: 4, reps: "8-12", rest: "90s", notes: "Back thickness development" },
          { name: "Overhead Press", sets: 3, reps: "10-12", rest: "75s", notes: "Strict pressing" },
          { name: "Romanian Deadlifts", sets: 3, reps: "10-12", rest: "75s", notes: "Hamstring focus" },
          { name: "Pull-Ups", sets: 3, reps: "To Failure", rest: "60s", notes: "Lat width development" }
        ]
      }
    ]
  },
  {
  "name": "Greg Doucette (Coach Greg)",
  "image": "public/coaches/greg.webp",
  "style": "High Intensity, Full Body & High Frequency Splits, Training to Failure, HTLT Principle",
  "description": "An IFBB Pro and popular fitness influencer known for his 'Harder Than Last Time' (HTLT) training philosophy, advocating for training to failure, maximizing effort, and using a high training frequency to optimize muscle hypertrophy. He has programs for all levels (Beginner to Advanced).",
  "achievements": "IFBB Pro Bodybuilder, Guinness World Record holder, Powerlifter, B.S. and M.S. in Kinesiology, creator of the 'Harder Than Last Time' program and 'Anabolic' recipes/cookbooks.",
  "career": "Rose to fame for his aggressive, high-intensity training videos, direct coaching style, and focus on practical, sustainable fitness and diet advice. He offers various custom and pre-made programs.",
  "splits": [
    {
      "name": "Full Body Split (Example Session 1)",
      "exercises": [
        { "name": "Compound Leg Movement (e.g., Squat/Leg Press)", "sets": 4, "reps": "10-20", "rest": "60s-90s", "notes": "Train hard, focus on high reps for volume. Use partials/drop sets on the last set." },
        { "name": "Compound Upper Push (e.g., Bench Press/Machine Press)", "sets": 4, "reps": "10-20", "rest": "60s-90s", "notes": "Harder Than Last Time (HTLT). High intensity is key." },
        { "name": "Compound Upper Pull (e.g., Lat Pulldown/Row)", "sets": 4, "reps": "10-20", "rest": "60s-90s", "notes": "Focus on the squeeze and mind-muscle connection." },
        { "name": "Isolation Biceps (e.g., Dumbbell Curl)", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Often supersetted with triceps or trained with high frequency." },
        { "name": "Isolation Triceps (e.g., Pressdown/Skull Crusher)", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Train to absolute failure." },
        { "name": "Calves (e.g., Calf Press/Raise)", "sets": 3, "reps": "15-25+", "rest": "45s-60s", "notes": "High reps and intensity, frequently trained." },
        { "name": "Shoulders (e.g., Lateral Raise)", "sets": 3, "reps": "15-30", "rest": "30s-60s", "notes": "High volume for delts. Use drop sets frequently." }
      ]
    },
    {
      "name": "3-Day Split - Day 1 (Example)",
      "exercises": [
        { "name": "Biceps (e.g., Hammer Curls)", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Prioritize a challenging exercise. Train to failure." },
        { "name": "Shoulders (e.g., Machine/Dumbbell Press)", "sets": 4, "reps": "10-20", "rest": "60s-90s", "notes": "Focus on high volume and intensity. Use drop sets." },
        { "name": "Lateral Raise (Any Variation)", "sets": 4, "reps": "15-30", "rest": "30s-60s", "notes": "Extremely high frequency/intensity for side delts." },
        { "name": "Rear Delt Fly (e.g., Machine/Cable)", "sets": 3, "reps": "12-20", "rest": "60s", "notes": "Good mind-muscle connection." },
        { "name": "Calves (Seated or Standing Raise)", "sets": 4, "reps": "15-25+", "rest": "45s", "notes": "High volume and frequency. Often includes partials." }
      ]
    },
    {
      "name": "3-Day Split - Day 2 (Example)",
      "exercises": [
        { "name": "Chest (e.g., Bench Press/Machine Press)", "sets": 4, "reps": "10-20", "rest": "60s-90s", "notes": "Focus on main chest movement, high volume focus." },
        { "name": "Back (e.g., T-Bar Row/Seated Row)", "sets": 4, "reps": "10-20", "rest": "60s-90s", "notes": "Focus on thickness and high contraction." },
        { "name": "Triceps (e.g., Tricep Pressdown)", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "High volume, train to absolute failure with techniques." },
        { "name": "Chest Isolation (e.g., Pec Deck/Cable Fly)", "sets": 3, "reps": "12-20", "rest": "60s", "notes": "Isolation for maximum pump." },
        { "name": "Back Isolation (e.g., Straight Arm Pulldown)", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Lat isolation and stretch." }
      ]
    },
    {
      "name": "3-Day Split - Day 3 (Example)",
      "exercises": [
        { "name": "Legs (e.g., Squats/Hack Squat)", "sets": 4, "reps": "10-20", "rest": "90s-120s", "notes": "Foundation movement. High-rep working sets often used." },
        { "name": "Hamstrings (e.g., Leg Curl)", "sets": 4, "reps": "12-20", "rest": "60s-90s", "notes": "High intensity, drop sets often used on the last set." },
        { "name": "Quads (e.g., Leg Extension)", "sets": 3, "reps": "15-25", "rest": "60s", "notes": "Isolation for quad pump and detail." },
        { "name": "Deadlift Variation (e.g., RDL/Trap Bar)", "sets": 3, "reps": "10-15", "rest": "90s", "notes": "Volume work for posterior chain, focus on form." },
        { "name": "Abs/Core (Your Choice)", "sets": 3, "reps": "15-25+", "rest": "45s", "notes": "Trained frequently, high reps to failure." }
      ]
    },
    {
      "name": "The 'Harder Than Last Time' (HTLT) Principles (Core of All Splits - New/Current)",
      "exercises": [
        { "name": "Intensity/Effort", "sets": "All working sets", "reps": "0-2 RIR (Reps in Reserve)", "rest": "Standard", "notes": "Every set must be taken to or near muscular failure. Focus on **HTLT**." },
        { "name": "Training Frequency", "sets": "N/A", "reps": "2-3x per week per muscle", "rest": "N/A", "notes": "Training each muscle group multiple times per week (Full Body, Upper/Lower, or High-Frequency 3-Day Split)." },
        { "name": "Volume & Rep Range", "sets": "3-4 working sets", "reps": "8-30+", "rest": "Standard", "notes": "Medium to high volume, utilizing a wide rep range. Higher reps (15+) on isolation movements." },
        { "name": "Advanced Techniques", "sets": "Last set (Isolation)", "reps": "To Absolute Failure", "rest": "Minimal", "notes": "Frequent use of **Partials**, **Drop Sets**, **Supersets**, and **Rest-Pause** to maximize stimulus." },
        { "name": "Exercise Selection", "sets": "N/A", "reps": "Machine/Cable preference", "rest": "N/A", "notes": "Preference for machines/cables/dumbbells over barbells to minimize injury risk and maximize muscle focus (mind-muscle connection)." }
      ]
    }
  ]
},
  {
  "name": "Hany Rambod",
  "image": "public/coaches/hany.png",
  "style": "Fascia Stretch Training-7 (FST-7), Heavy Lifting + High Volume/Pump",
  "description": "Known as the 'Pro Creator,' Hany Rambod has trained numerous Mr. Olympia champions. His method, FST-7, involves heavy compound movements followed by high-volume, short-rest '7-sets' on isolation exercises to maximize the muscle pump and, theoretically, stretch the muscle fascia for new growth.",
  "achievements": "Trained over 20 Olympia winners, including multiple Mr. Olympia titleholders like Phil Heath (7x), Jay Cutler (2x), Hadi Choopan, and Derek Lunsford.",
  "career": "Founder of Evogen Nutrition and the FST-7 training system, he is one of the most successful coaches in professional bodybuilding history, known for his ability to bring out '3D' muscle quality in his athletes.",
  "splits": [
    {
      "name": "FST-7 Sample Split - Day 1: Chest & Abs",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s-120s", "notes": "Primary chest mass builder. Focus on heavy weight." },
        { "name": "Flat Dumbbell or Hammer Strength Press", "sets": 3, "reps": "8-12", "rest": "60s-90s", "notes": "Mid-chest thickness. Controlled negative." },
        { "name": "Incline Cable Fly (FST-7)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Upper/Inner Chest isolation. Maximize pump. **Crucial FST-7 sets.**" },
        { "name": "Hanging Leg Raises", "sets": 4, "reps": "30", "rest": "60s", "notes": "Lower abs focus. Strict form." },
        { "name": "Cable Rope Crunches", "sets": 4, "reps": "30", "rest": "60s", "notes": "Upper abs focus. Full contraction." }
      ]
    },
    {
      "name": "FST-7 Sample Split - Day 2: Back & Traps (Width Focus)",
      "exercises": [
        { "name": "Wide Grip Pull-Ups or Lat Pulldowns", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Focus on back width/lats. Use assisted if needed." },
        { "name": "Barbell or T-Bar Rows", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Back thickness and overall mass. Heavy lift." },
        { "name": "Reverse Grip Seated Cable Rows", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Lower lat thickness focus." },
        { "name": "Straight Arm Pulldown (FST-7)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Lat isolation and stretch. **Crucial FST-7 sets.**" },
        { "name": "Dumbbell Shrugs", "sets": 4, "reps": "10-12", "rest": "60s", "notes": "Upper traps mass." }
      ]
    },
    {
      "name": "FST-7 Sample Split - Day 3: Shoulders & Rear Delts",
      "exercises": [
        { "name": "Seated Dumbbell Shoulder Press", "sets": 4, "reps": "8-12", "rest": "90s-120s", "notes": "Primary shoulder mass builder. Controlled lift." },
        { "name": "Dumbbell or Machine Lateral Raises", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Medial head volume. Strict form." },
        { "name": "Prone Incline Dumbbell Front Raises", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Front delt isolation." },
        { "name": "Reverse Pec Deck Fly (FST-7)", "sets": 7, "reps": "12-15", "rest": "30s-45s", "notes": "Rear delt isolation. Maximize pump. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "FST-7 Sample Split - Day 4: Arms (Biceps & Triceps)",
      "exercises": [
        { "name": "Overhead Cable Triceps Extension", "sets": 4, "reps": "10-12", "rest": "60s", "notes": "Long head of triceps stretch." },
        { "name": "Close Grip Bench Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Triceps mass and strength." },
        { "name": "EZ-Bar Skull Crushers (FST-7 for Triceps)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Triceps isolation. **Crucial FST-7 sets.**" },
        { "name": "Standing Barbell Curl", "sets": 4, "reps": "8-12", "rest": "60s", "notes": "Primary biceps mass." },
        { "name": "Incline Dumbbell Curl", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Biceps long head stretch." },
        { "name": "Machine Preacher Curl (FST-7 for Biceps)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Biceps peak isolation. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "FST-7 Sample Split - Day 5: Quads, Hamstrings & Calves",
      "exercises": [
        { "name": "Leg Extensions", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Pre-exhaustion and quad isolation." },
        { "name": "Barbell Squats or Hack Squats", "sets": 4, "reps": "8-12", "rest": "120s-180s", "notes": "Foundation leg movement. Heavy lift." },
        { "name": "Leg Press (FST-7 for Quads)", "sets": 7, "reps": "12-15", "rest": "45s-60s", "notes": "Quad volume work. **Crucial FST-7 sets.**" },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "10-12", "rest": "60s-90s", "notes": "Hamstring peak contraction." },
        { "name": "Romanian Deadlifts (RDLs)", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Hamstring and glute stretch." },
        { "name": "Seated Leg Curls (FST-7 for Hamstrings)", "sets": 7, "reps": "12-15", "rest": "30s-45s", "notes": "Hamstring isolation and pump. **Crucial FST-7 sets.**" },
        { "name": "Standing Calf Raises (FST-7)", "sets": 7, "reps": "15-20", "rest": "30s", "notes": "Calf development. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "FST-7 Sample Split - Day 6: Back & Traps (Thickness Focus)",
      "exercises": [
        { "name": "Deadlifts", "sets": 4, "reps": "5-8", "rest": "120s-180s", "notes": "Heavy compound for overall back/spinal erector thickness. Only if form is perfect." },
        { "name": "Close-Grip V-Bar Pulldowns", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Focus on lower lats and thickness." },
        { "name": "Chest-Supported T-Bar Row", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Mid-back density and thickness. Controlled stretch." },
        { "name": "One-Arm Dumbbell Rows", "sets": 3, "reps": "8-12 (each arm)", "rest": "60s", "notes": "Focus on peak contraction and stretch on the lats." },
        { "name": "Seated Cable Rows (Wide-Grip FST-7)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Mid/Upper back pump. Focus on drawing shoulder blades together. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "FST-7 Sample Split - Day 7: Shoulders (Medial/Side Emphasis) & Abs",
      "exercises": [
        { "name": "Hammer Strength/Machine Shoulder Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Heavy press variation to save the rotator cuff." },
        { "name": "Standing Dumbbell Lateral Raises", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Volume work for medial head. Strict form, no swinging." },
        { "name": "Cable Lateral Raises (FST-7)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Constant tension on the side delts for the 3D look. **Crucial FST-7 sets.**" },
        { "name": "Band/Cable Face Pulls", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Rotator cuff and rear delt health/activation." },
        { "name": "Dumbbell Shrugs (Traps)", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Heavy shrugs for traps mass." },
        { "name": "Weighted Leg Raises", "sets": 4, "reps": "20", "rest": "60s", "notes": "Abs-Focus on lower abs." }
      ]
    },
    {
      "name": "FST-7 Core Principles (Applicable to All Workouts)",
      "exercises": [
        { "name": "Use of Compound Lifts", "sets": "Initial 3-4 sets", "reps": "8-12 (Heavy)", "rest": "1-2 minutes", "notes": "Build foundational strength and mass. Focus on progressive overload." },
        { "name": "Isolation Work & FST-7 Sets", "sets": "Final 7 sets", "reps": "10-12 (Moderate/Light)", "rest": "30-45 seconds", "notes": "Maximize muscle pump and expand the fascia. Use cables or machines for constant tension." },
        { "name": "Intra-set Hydration", "sets": "Between FST-7 sets", "reps": "N/A", "rest": "N/A", "notes": "Sip water or an intra-workout drink to aid the pump." },
        { "name": "Controlled Negative (Eccentric)", "sets": "All sets", "reps": "Slow/Controlled", "rest": "Standard", "notes": "Maximize time under tension and muscle fiber damage." }
      ]
    },
    {
      "name": "Student Workout - Chris Bumstead (Classic Physique Olympia) - Arms",
      "student": "Chris Bumstead",
      "exercises": [
        { "name": "Triceps Rope Pushdowns", "sets": 3, "reps": "Warm-up/15+", "rest": "60s", "notes": "Pre-fatigue and warm-up the elbows." },
        { "name": "Overhead Machine Triceps Extension", "sets": 4, "reps": "10-12", "rest": "60s-90s", "notes": "Focus on the long head of the triceps with a deep stretch." },
        { "name": "Plate-Loaded Machine Preacher Curls", "sets": 4, "reps": "8-10", "rest": "60s-90s", "notes": "Heavy bicep mass builder, focus on peak contraction." },
        { "name": "Prone Incline Spider Curls", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Focus on bicep peak and controlled negative." },
        { "name": "Standing Dual Cable Curls (FST-7 for Biceps)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Constant tension for maximum bicep pump. **Crucial FST-7 sets.**" },
        { "name": "Bodyweight Dips (FST-7 for Triceps)", "sets": 7, "reps": "To Failure", "rest": "30s-45s", "notes": "Triceps compound movement for extreme pump. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "Student Workout - Derek Lunsford (Mr. Olympia) - Upper Chest",
      "student": "Derek Lunsford",
      "exercises": [
        { "name": "Machine Incline Press", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Controlled warm-up with a slow tempo to avoid lockout." },
        { "name": "Incline Dumbbell Press (Neutral Grip)", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Heavy lift to bias the upper pecs." },
        { "name": "Low Cable Pulley Flyes", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Isolation for the clavicular (upper) chest fibers." },
        { "name": "Standing Machine Chest Flyes (FST-7)", "sets": 7, "reps": "10-15", "rest": "30s-45s", "notes": "Focus on peak contraction and stretch. **Crucial FST-7 sets.**" },
        { "name": "Lying Machine Flyes", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Finisher to hit the full chest with constant tension." }
      ]
    },
    {
      "name": "Student Workout - Phil Heath (7x Mr. Olympia) - Arms (Biceps/Triceps)",
      "student": "Phil Heath",
      "exercises": [
        { "name": "Alternate Dumbbell Curls", "sets": 3, "reps": "8-12", "rest": "60s-90s", "notes": "Heavy bicep mass builder." },
        { "name": "Machine Preacher Curl", "sets": 3, "reps": "8-12", "rest": "60s-90s", "notes": "Targeting the bicep peak." },
        { "name": "EZ-Bar Curl (FST-7 for Biceps)", "sets": 7, "reps": "8-12", "rest": "30s-45s", "notes": "Maximize bicep pump and fascia stretch. **Crucial FST-7 sets.**" },
        { "name": "Close-Grip Bench Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Heavy compound for triceps mass." },
        { "name": "Weighted or Machine Dip", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Mid-range triceps work." },
        { "name": "Overhead Cable Extension (FST-7 for Triceps)", "sets": 7, "reps": "8-12", "rest": "30s-45s", "notes": "Long head isolation and pump. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "Student Workout - Hadi Choopan (Mr. Olympia) - Back",
      "student": "Hadi Choopan",
      "exercises": [
        { "name": "Wide Grip Lat Pulldowns", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Focus on upper back width. High volume." },
        { "name": "Reverse Grip Barbell Rows", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Heavy lift for overall back thickness and lower lats." },
        { "name": "Hammer Strength Rows (Neutral Grip)", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Mid-back density with chest support." },
        { "name": "Bent Over Single Arm Dumbbell Rows", "sets": 3, "reps": "10-12 (per arm)", "rest": "60s", "notes": "Focus on deep stretch and contraction for lats." },
        { "name": "Straight Arm Pulldown (FST-7)", "sets": 7, "reps": "10-15", "rest": "30s-45s", "notes": "Pure lat isolation and pump. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "Student Workout - Jay Cutler (4x Mr. Olympia) - Chest",
      "student": "Jay Cutler",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "8-10", "rest": "90s-120s", "notes": "Primary mass builder for the upper chest." },
        { "name": "Flat Barbell Press or Machine Press", "sets": 3, "reps": "8-10", "rest": "90s", "notes": "Heavy lift for overall chest thickness." },
        { "name": "Dumbbell Flyes (Incline or Flat)", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Pre-stretch the chest fibers." },
        { "name": "Cable Crossovers (FST-7)", "sets": 7, "reps": "10-12", "rest": "30s-45s", "notes": "Focus on inner chest sweep and maximum pump. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "Student Workout - Jeremy Buendia (4x Men's Physique Olympia) - Quads/Legs",
      "student": "Jeremy Buendia",
      "exercises": [
        { "name": "Leg Extensions", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "High rep pre-exhaustion for the quads." },
        { "name": "Back Squats (or Smith Machine Squats)", "sets": 4, "reps": "8-12", "rest": "120s-180s", "notes": "Heavy compound for overall leg mass." },
        { "name": "Leg Press (FST-7 for Quads)", "sets": 7, "reps": "15-20", "rest": "45s-60s", "notes": "Maximize quad volume and pump. High-rep focus. **Crucial FST-7 sets.**" },
        { "name": "Seated or Lying Leg Curls", "sets": 4, "reps": "10-15", "rest": "60s-90s", "notes": "Hamstring isolation work." },
        { "name": "Standing Calf Raises (FST-7)", "sets": 7, "reps": "15-20", "rest": "30s", "notes": "Focus on peak contraction and controlled negative." }
      ]
    },
    {
      "name": "Student Workout - Breon Ansley (2x Classic Physique Olympia) - Shoulders",
      "student": "Breon Ansley",
      "exercises": [
        { "name": "Machine Shoulder Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Controlled lift, avoiding lockout for constant tension." },
        { "name": "Dumbbell Upright Row (Wide Grip)", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Focus on medial delt and trap development." },
        { "name": "Unilateral Cable Lateral Raises", "sets": 4, "reps": "12-15 (per arm)", "rest": "60s", "notes": "Isolation for the medial delt, focus on mind-muscle connection." },
        { "name": "Dumbbell Front Raises (Alternating)", "sets": 3, "reps": "10-12 (per arm)", "rest": "60s", "notes": "Anterior delt isolation." },
        { "name": "Reverse Pec Deck Fly (FST-7)", "sets": 7, "reps": "12-15", "rest": "30s-45s", "notes": "Maximize pump in the rear delts to enhance the V-Taper. **Crucial FST-7 sets.**" }
      ]
    },
    {
      "name": "Student Workout - Andrei Deiu (Men's Physique Pro) - Back (Width/Lats Focus)",
      "student": "Andrei Deiu",
      "exercises": [
        { "name": "Close Grip Lat Pulldown", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Focus on deep contraction in the lats, avoiding arm involvement." },
        { "name": "Chest Supported Row (Neutral Grip)", "sets": 4, "reps": "10-12", "rest": "60s-90s", "notes": "Minimize momentum; focus on mid-back squeeze and thickness." },
        { "name": "Low Cable Row (Wide Overhand Grip)", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Targeting upper back width." },
        { "name": "Straight Arm Pulldown (FST-7)", "sets": 7, "reps": "10-15", "rest": "30s-45s", "notes": "Pure lat isolation, maintaining constant tension. **Crucial FST-7 sets.**" },
        { "name": "Hyperextensions (Back Focus)", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Lower back pump and erector thickness." }
      ]
    },
    {
      "name": "Student Workout - Oksana Grishina (4x Fitness Olympia) - Shoulders/Triceps",
      "student": "Oksana Grishina",
      "exercises": [
        { "name": "Seated Dumbbell Shoulder Press", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Controlled, moderate weight for front and medial delts." },
        { "name": "Cable Lateral Raise (Unilateral)", "sets": 4, "reps": "15-20 (per arm)", "rest": "60s", "notes": "High volume for medial delts; strict form." },
        { "name": "Face Pulls (FST-7 for Rear Delts)", "sets": 7, "reps": "15-20", "rest": "30s-45s", "notes": "Focus on high reps and constant tension for rear delts. **Crucial FST-7 sets.**" },
        { "name": "EZ-Bar Skull Crushers", "sets": 4, "reps": "10-12", "rest": "60s-90s", "notes": "Triceps mass builder." },
        { "name": "Rope Overhead Triceps Extension (FST-7)", "sets": 7, "reps": "12-15", "rest": "30s-45s", "notes": "Maximize pump in the long head of the triceps. **Crucial FST-7 sets.**" }
      ]
    }
  ]
},
  {
    name: "Jeff Cavaffliere",
    image: "public/coaches/cavaliere.jpeg",
    style: "Athlean-X - Scientific Approach",
    description: "Evidence-based training focusing on muscle activation and injury prevention.",
    career: "Physical therapist, strength coach, and founder of Athlean-X. Former head physical therapist for the New York Mets.",
    achievements: [
      "Master's degree in Physical Therapy",
      "Former head physical therapist for the New York Mets",
      "Over 13 million YouTube subscribers",
      "Created the Athlean-X training system"
    ],
    famousWorkout: "Athlean-X Perfect Workout Series",
    splits: [
      {
        name: "Perfect Chest Workout",
        exercises: [
          { name: "Incline Bench Press", sets: 3, reps: "8-12", rest: "90s", notes: "30-degree incline for upper chest" },
          { name: "Decline Push-Ups", sets: 3, reps: "12-15", rest: "60s", notes: "Feet elevated for lower chest" },
          { name: "Cable Crossovers", sets: 3, reps: "15-20", rest: "60s", notes: "Squeeze at midline" },
          { name: "Dips", sets: 3, reps: "To Failure", rest: "90s", notes: "Lean forward for chest emphasis" }
        ]
      },
      {
        name: "Back Hypertrophy",
        exercises: [
          { name: "Pull-Ups", sets: 3, reps: "8-12", rest: "90s", notes: "Full range of motion" },
          { name: "Seated Rows", sets: 3, reps: "10-12", rest: "90s", notes: "Squeeze shoulder blades" },
          { name: "Lat Pulldowns", sets: 3, reps: "12-15", rest: "90s", notes: "Focus on lat stretch" },
          { name: "Face Pulls", sets: 3, reps: "15-20", rest: "60s", notes: "Shoulder health and rear delts" }
        ]
      },
      {
        name: "Shoulder Perfect Workout",
        exercises: [
          { name: "Standing Overhead Press", sets: 3, reps: "8-12", rest: "90s", notes: "Strict form, no leg drive" },
          { name: "Dumbbell Lateral Raises", sets: 3, reps: "12-15", rest: "60s", notes: "Light weight, perfect form" },
          { name: "Face Pulls", sets: 3, reps: "15-20", rest: "60s", notes: "Rear delt focus" },
          { name: "Front Plate Raises", sets: 3, reps: "12-15", rest: "60s", notes: "Anterior delt development" }
        ]
      },
      {
        name: "Arm Assault Workout",
        exercises: [
          { name: "Close Grip Bench Press", sets: 3, reps: "8-12", rest: "90s", notes: "Tricep emphasis" },
          { name: "Barbell Curls", sets: 3, reps: "10-12", rest: "90s", notes: "Full extension and contraction" },
          { name: "Skull Crushers", sets: 3, reps: "10-12", rest: "60s", notes: "Control negative" },
          { name: "Incline Dumbbell Curls", sets: 3, reps: "12-15", rest: "60s", notes: "Peak contraction" },
          { name: "Overhead Tricep Extensions", sets: 3, reps: "12-15", rest: "60s", notes: "Long head focus" }
        ]
      },
      {
        name: "Perfect Leg Workout",
        exercises: [
          { name: "Barbell Squats", sets: 4, reps: "6-10", rest: "120s", notes: "Full depth, controlled tempo" },
          { name: "Romanian Deadlifts", sets: 3, reps: "8-12", rest: "90s", notes: "Hamstring stretch" },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10-12 each", rest: "90s", notes: "Glute and quad focus" },
          { name: "Leg Press", sets: 3, reps: "12-15", rest: "90s", notes: "Controlled movement" },
          { name: "Calf Raises", sets: 4, reps: "15-20", rest: "60s", notes: "Full range of motion" }
        ]
      },
      {
        name: "Athlean-X Core Crusher",
        exercises: [
          { name: "Hanging Leg Raises", sets: 3, reps: "10-15", rest: "60s", notes: "Control the negative" },
          { name: "Plank", sets: 3, reps: "60-90s", rest: "60s", notes: "Perfect form" },
          { name: "Russian Twists", sets: 3, reps: "15-20 each", rest: "60s", notes: "Slow and controlled" },
          { name: "Cable Crunches", sets: 3, reps: "15-20", rest: "60s", notes: "Focus on contraction" },
          { name: "Pallof Press", sets: 3, reps: "10-12 each", rest: "60s", notes: "Anti-rotation core stability" }
        ]
      },
      {
        name: "Full Body Strength",
        exercises: [
          { name: "Deadlifts", sets: 4, reps: "5-8", rest: "120s", notes: "Perfect form, no rounding" },
          { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s", notes: "Touch and go" },
          { name: "Pull-Ups", sets: 4, reps: "To Failure", rest: "90s", notes: "Various grips" },
          { name: "Overhead Press", sets: 3, reps: "8-12", rest: "90s", notes: "Standing strict press" },
          { name: "Barbell Rows", sets: 3, reps: "8-12", rest: "90s", notes: "Back parallel to floor" }
        ]
      },
      {
        name: "Corrective Exercise Workout",
        exercises: [
          { name: "Face Pulls", sets: 3, reps: "15-20", rest: "60s", notes: "Shoulder health" },
          { name: "Band Pull-Aparts", sets: 3, reps: "15-20", rest: "60s", notes: "Posture correction" },
          { name: "Dead Bugs", sets: 3, reps: "10-12 each", rest: "60s", notes: "Core stability" },
          { name: "Glute Bridges", sets: 3, reps: "15-20", rest: "60s", notes: "Glute activation" },
          { name: "Wall Slides", sets: 3, reps: "10-12", rest: "60s", notes: "Shoulder mobility" }
        ]
      },
      {
        name: "Athlean-X Week Program",
        exercises: [
          { name: "Day 1: Chest & Triceps", sets: "-", reps: "-", rest: "-", notes: "Focus on perfect form and activation" },
          { name: "Day 2: Back & Biceps", sets: "-", reps: "-", rest: "-", notes: "Emphasis on back thickness and width" },
          { name: "Day 3: Shoulders & Core", sets: "-", reps: "-", rest: "-", notes: "Shoulder health and core stability" },
          { name: "Day 4: Legs", sets: "-", reps: "-", rest: "-", notes: "Full leg development with proper mechanics" },
          { name: "Day 5: Active Recovery", sets: "-", reps: "-", rest: "-", notes: "Corrective exercises and mobility" },
          { name: "Day 6: Full Body", sets: "-", reps: "-", rest: "-", notes: "Compound movements and strength" },
          { name: "Day 7: Rest", sets: "-", reps: "-", rest: "-", notes: "Complete recovery" }
        ]
      }
    ]
  },
  {
  "name": "Scott Herman",
  "image": "public/coaches/herman.jpg",
  "style": "Volume Training, Science-Based Bodybuilding, and Progressive Overload",
  "description": "The CEO of MuscularStrength, Scott Herman is known for his simple, no-nonsense, science-based approach to training. He emphasizes getting the basics right, pushing volume, and using progressive overload to ensure consistent muscle gain (often promoting his 'Guaranteed Gains' methodology).",
  "achievements": "Massive YouTube following ('ScottHermanFitness' with millions of subscribers), creator of MuscularStrength.com, and numerous successful workout programs like PPL, Upper/Lower, and the 'Ultimate Mass' series.",
  "career": "Began his career in fitness modeling and quickly became a highly respected online fitness coach, focusing on practical, actionable advice and programs for all fitness levels, with a special emphasis on bodybuilding and physique goals.",
  "splits": [
    {
      "name": "Guaranteed Gains - 4-Day Upper/Lower Split (Workout A)",
      "exercises": [
        { "name": "Barbell Bench Press", "sets": 3, "reps": "6-12", "rest": "90s-120s", "notes": "Primary compound chest movement. Focus on progressive overload." },
        { "name": "Barbell Row (Bent-Over)", "sets": 3, "reps": "6-12", "rest": "90s-120s", "notes": "Primary compound back movement for thickness." },
        { "name": "Seated Overhead Dumbbell Press", "sets": 3, "reps": "8-12", "rest": "60s-90s", "notes": "Shoulder mass builder." },
        { "name": "Pec Deck Fly (3-Second Negative)", "sets": 2, "reps": "10-12", "rest": "60s", "notes": "Isolation for chest stretch/contraction, with a controlled negative." },
        { "name": "V-Bar Lat Pulldown (3-Second Negative)", "sets": 2, "reps": "10-12", "rest": "60s", "notes": "Isolation for lats, focusing on time under tension." },
        { "name": "Side Lateral Raise (Dumbbell)", "sets": 2, "reps": "10-15", "rest": "45s-60s", "notes": "Medial head isolation for shoulder width." },
        { "name": "Cable Tricep Extensions (3-Second Negative)", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Triceps isolation." },
        { "name": "Cable Curls (3-Second Negative)", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Biceps isolation." }
      ]
    },
    {
      "name": "Guaranteed Gains - 4-Day Upper/Lower Split (Workout B)",
      "exercises": [
        { "name": "Back Squat", "sets": 3, "reps": "6-12", "rest": "120s-180s", "notes": "Primary compound leg movement. Focus on depth and form." },
        { "name": "Stiff-Leg Deadlift (Barbell)", "sets": 3, "reps": "8-12", "rest": "90s-120s", "notes": "Hamstring and glute stretch/development." },
        { "name": "Standing Calf Raise", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Calf development." },
        { "name": "Leg Extensions (3-Second Negative)", "sets": 2, "reps": "10-12", "rest": "60s", "notes": "Quad isolation with controlled negative." },
        { "name": "Seated Leg Curl (3-Second Negative)", "sets": 2, "reps": "10-12", "rest": "60s", "notes": "Hamstring isolation." },
        { "name": "Seated Cable Crunch", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Upper abdominal focus." },
        { "name": "Cable Pull-Through w/ Rope", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Glute and lower back development." }
      ]
    },
    {
      "name": "Scott's Bro Split (5-Day Body Part Split) - Chest Day",
      "exercises": [
        { "name": "Barbell Bench Press (Burn Set)", "sets": 3, "reps": "8-12", "rest": "90s-120s", "notes": "First set is often a 'Burn Set' (drop set) to push past failure." },
        { "name": "Incline Dumbbell Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Upper chest focus." },
        { "name": "Dumbbell Fly (Incline or Flat)", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Stretch and contraction isolation." },
        { "name": "Cable Crossover (Low-to-High)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Lower/inner chest contraction and pump." }
      ]
    },
    {
      "name": "Scott's Modern PPL Split - Pull Day (Back & Biceps)",
      "exercises": [
        { "name": "Deadlift (Conventional or Sumo)", "sets": 3, "reps": "5-8", "rest": "120s-180s", "notes": "Heavy compound for overall back/posterior chain strength." },
        { "name": "Wide Grip Lat Pulldown", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Focus on back width." },
        { "name": "Dumbbell Row (Single-Arm)", "sets": 3, "reps": "8-12 (per arm)", "rest": "90s", "notes": "Focus on back thickness and unilateral development." },
        { "name": "Straight-Arm Cable Pulldown", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Lat isolation and stretch." },
        { "name": "Standing Barbell Bicep Curl", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Biceps mass builder." },
        { "name": "Hammer Curl (Dumbbell or Cable)", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Focus on brachialis and forearm mass." }
      ]
    },
    {
      "name": "Scott's Training Principles (New)",
      "exercises": [
        { "name": "Progressive Overload", "sets": "All sets", "reps": "Varies", "rest": "N/A", "notes": "Systematically increasing weight, reps, or volume weekly for continuous gains." },
        { "name": "Burn Sets / Drop Sets", "sets": "Last set (often)", "reps": "To failure", "rest": "Minimal", "notes": "Used on isolation movements or main lifts to push beyond muscle failure and maximize fatigue." },
        { "name": "Form Over Weight", "sets": "All sets", "reps": "Strict", "rest": "N/A", "notes": "Emphasizes perfect, controlled form, especially the negative (eccentric) portion of the lift, before increasing weight." },
        { "name": "High Volume for Hypertrophy", "sets": "Many (typically 3-4 per exercise)", "reps": "8-12 (Hypertrophy)", "rest": "Moderate (60-90s)", "notes": "Total volume is a key driver for muscle growth across all his programs." }
      ]
    }
  ]
},
  {
  "name": "Vince Gironda (The Iron Guru)",
  "image": "public/coaches/vince.jpg",
  "style": "Old-School Bodybuilding, High-Density Training (8x8, 6x6), Emphasis on Symmetry and Definition",
  "description": "A legendary bodybuilding coach who pioneered concepts like low-carb dieting and high-intensity, short-rest training. His methods focused on density and form to achieve a dramatic V-taper and muscular definition, often running counter to mainstream advice of his time.",
  "achievements": "Trained numerous Mr. America, Mr. Olympia (Larry Scott), and Mr. Universe champions. Developed highly influential training protocols (8x8, 6x6) and controversial exercises (Gironda Neck Press, Sissy Squat).",
  "career": "Opened 'Vince's Gym' in North Hollywood, which became a mecca for bodybuilders in the 1950s-1980s. Was an outspoken authority on training and nutrition, believing that 'bodybuilding is 85% nutrition.'",
  "splits": [
    {
      "name": "The '8x8 Honest Workout' Split (4-Day Example)",
      "description": "A high-volume, high-density program (8 sets of 8 reps) designed purely for cosmetic/hypertrophy gains. The short rest periods (15-30 seconds) force the use of a 'humbling' light-to-moderate weight (approx. 60-70% 1RM) to maximize the pump and time under tension.",
      "exercises": [
        { "name": "Day 1: Upper Body (Chest, Back, Shoulders)", "sets": "8", "reps": "8", "rest": "15s-30s", "notes": "Choose 2-3 exercises per body part. Example: Neck Press, Chin-Ups to Sternum, Lateral Raises." },
        { "name": "Day 2: Lower Body (Thighs, Calves, Abs)", "sets": "8", "reps": "8", "rest": "15s-30s", "notes": "Choose 2-3 exercises per body part. Example: Hack Squat, Sissy Squat, Lying Leg Curl. Calves often 20 reps." },
        { "name": "Day 3: Rest", "sets": "N/A", "reps": "N/A", "rest": "Full Day", "notes": "Mandatory rest for recovery." },
        { "name": "Day 4: Upper Body (Arms, Back, Chest)", "sets": "8", "reps": "8", "rest": "15s-30s", "notes": "Focus on different exercises or prioritize arms. Example: Barbell Drag Curl, Close-Grip Bench Press, V-Bar Dips." }
      ]
    },
    {
      "name": "The '6x6' Protocol (Focus on Volume/Density)",
      "description": "Similar to 8x8 but with lower overall volume and slightly heavier weight (approx. 70% 1RM, or a 10-12RM weight). The goal remains maximal training density via very short rest periods.",
      "exercises": [
        { "name": "Compound Lift (e.g., Wide-Grip Pulldown)", "sets": 6, "reps": 6, "rest": "15s-30s", "notes": "Keep the rest strict to build cumulative fatigue." },
        { "name": "Isolation Lift (e.g., Seated Dumbbell Curl)", "sets": 6, "reps": 6, "rest": "15s-30s", "notes": "Maintain perfect form and tempo (e.g., 2-0-2 tempo)." },
        { "name": "Bodyweight/Auxiliary (e.g., Triceps Dip)", "sets": 6, "reps": 6, "rest": "15s-30s", "notes": "Add weight if necessary to hit 6 reps to failure range." }
      ]
    },
    {
      "name": "Gironda's 'Definition Routine' Split (Pre-Contest Example)",
      "description": "A 6-day split with a high-frequency upper/lower routine, often paired with his very strict high-protein/fat (low-carb) diet. Reps are cycled over 9 weeks (8x8 for 3 weeks, 6x6 for 3 weeks, 4x12 for 3 weeks).",
      "exercises": [
        { "name": "Day 1, 3, 5: Upper Body", "sets": "4-8", "reps": "6-12", "rest": "Short", "notes": "Includes exercises like Wide Parallel Dips, Seated Rows, Preacher Curls, Overhead Triceps Pull." },
        { "name": "Day 2, 4, 6: Lower Body & Abs", "sets": "4-8", "reps": "6-20", "rest": "Short", "notes": "Includes Hack Squats, Sissy Squats, Stiff-Legged Raises, and Calves (always 20 reps)." },
        { "name": "Day 7: Rest", "sets": "N/A", "reps": "N/A", "rest": "Full Day", "notes": "Recovery is essential for this high-frequency routine." }
      ]
    },
    {
      "name": "Vince Gironda's Core Training Principles (New)",
      "description": "Gironda's radical and time-tested training and nutrition commandments that defined his approach to bodybuilding.",
      "exercises": [
        { "name": "The Neck Press (Gironda Bench Press)", "sets": "4-8", "reps": "6-8", "rest": "Short", "notes": "Bar lowered to the neck/collarbone to target the upper chest, elbows flared. Preferred over standard Bench Press." },
        { "name": "Chin-Ups to Sternum", "sets": "4-8", "reps": "6-8", "rest": "Short", "notes": "Lean back and pull the upper chest to the bar to maximize lat/upper back contraction." },
        { "name": "Sissy Squat", "sets": "4-8", "reps": "8-20", "rest": "Short", "notes": "Favored over conventional squats to isolate the quadriceps and avoid hip/glute mass." },
        { "name": "Drag Curl", "sets": "4-8", "reps": "6-8", "rest": "Short", "notes": "Barbell dragged up the torso to minimize front deltoid involvement and maximize biceps contraction." },
        { "name": "High-Protein/Low-Carb Diet", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Believed diet was 85% of success. Used a low-carb diet of eggs, meat, and fats for definition and muscle growth." }
      ]
    }
  ]
},
  {
  "name": "Charles Glass",
  "image": "public/coaches/charles.jpg",
  "style": "Master Trainer, Precision Form, Mind-Muscle Connection, Injury Prevention",
  "description": "Legendary bodybuilding coach known as 'The Master' who has trained numerous champion bodybuilders. Focuses on perfect form, controlled movements, and intelligent training principles to maximize muscle growth while preventing injuries.",
  "achievements": "Trained multiple Mr. Olympia winners and champions including Ronnie Coleman, Jay Cutler, Flex Wheeler, Chris Cormier. Known for his scientific approach to bodybuilding and rehabilitation training.",
  "career": "Over 40 years of coaching experience, revolutionized training techniques with emphasis on form over weight. Specializes in bringing out muscle details and correcting imbalances through precise movement patterns.",
  "splits": [
    {
      "name": "Charles Glass Classic Chest Workout",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Emphasis on controlled negative, chest up, arch back slightly" },
        { "name": "Flat Bench Press (Barbell or Dumbbell)", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Focus on full range of motion, don't bounce bar off chest" },
        { "name": "Pec Deck Flyes", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Squeeze at contraction, controlled stretch" },
        { "name": "Cable Crossovers", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Focus on squeezing pecs together, constant tension" },
        { "name": "Dips (Chest Focus)", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Lean forward to target chest, controlled movement" }
      ]
    },
    {
      "name": "Charles Glass Back Specialization",
      "exercises": [
        { "name": "Wide-Grip Pull-ups", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Focus on pulling with back, not arms" },
        { "name": "Barbell Rows", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Keep back parallel to floor, pull to lower chest" },
        { "name": "Seated Cable Rows", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Squeeze shoulder blades together" },
        { "name": "Lat Pulldowns", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Focus on stretching lats at top" },
        { "name": "Straight-Arm Pulldowns", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Isolate lats, keep arms straight" }
      ]
    },
    {
      "name": "Glass Shoulder Precision Workout",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Controlled movement, don't lock out elbows" },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Slight bend in elbows, raise to shoulder height" },
        { "name": "Bent-Over Rear Delt Raises", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Focus on squeezing rear delts" },
        { "name": "Front Dumbbell Raises", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Alternate arms, controlled tempo" },
        { "name": "Upright Rows", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Wide grip to focus on delts, not traps" }
      ]
    },
    {
      "name": "Glass Arm Specialization (Arms)",
      "exercises": [
        { "name": "Standing Barbell Curls", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Strict form, no swinging" },
        { "name": "Incline Dumbbell Curls", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Full stretch at bottom" },
        { "name": "Preacher Curls", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Focus on peak contraction" },
        { "name": "Close-Grip Bench Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Elbows tucked, focus on triceps" },
        { "name": "Triceps Pushdowns", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Various attachments for complete development" },
        { "name": "Overhead Triceps Extensions", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Focus on long head stretch" }
      ]
    },
    {
      "name": "Charles Glass Legs Foundation",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Controlled descent, explosive concentric" },
        { "name": "Leg Press", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Full range of motion, different foot positions" },
        { "name": "Walking Lunges", "sets": 3, "reps": "10-12 per leg", "rest": "90s", "notes": "Controlled steps, deep stretch" },
        { "name": "Leg Extensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Squeeze at top, controlled negative" },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Focus on hamstring contraction" },
        { "name": "Standing Calf Raises", "sets": 5, "reps": "15-25", "rest": "45s", "notes": "Full stretch and contraction" }
      ]
    },
    {
      "name": "Ronnie Coleman Leg Day (Glass Influenced)",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "8-10", "rest": "120s", "notes": "Heavy but controlled with Glass form principles" },
        { "name": "Leg Press", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Used massive weights but with full range" },
        { "name": "Hack Squats", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Focus on quad sweep development" },
        { "name": "Leg Extensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "High reps for detail and separation" },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Hamstring focus with squeeze" },
        { "name": "Stiff-Leg Deadlifts", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Hamstring and glute development" }
      ]
    },
    {
      "name": "Jay Cutler Chest (Glass Precision)",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Glass-style controlled movements" },
        { "name": "Flat Bench Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Power movement with form focus" },
        { "name": "Cable Crossovers", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Glass-inspired squeeze and contraction" },
        { "name": "Pec Deck", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Focus on chest isolation" },
        { "name": "Incline Cable Flyes", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Upper chest emphasis" }
      ]
    },
    {
      "name": "Flex Wheeler Shoulders (Glass Perfected)",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Perfect Glass form with mind-muscle connection" },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "15-20", "rest": "75s", "notes": "Light weight, perfect form for capped delts" },
        { "name": "Bent-Over Rear Delt Raises", "sets": 3, "reps": "15-20", "rest": "75s", "notes": "Focus on rear delt development" },
        { "name": "Front Cable Raises", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Complete shoulder development" },
        { "name": "Machine Lateral Raises", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Constant tension on medial delts" }
      ]
    },
    {
      "name": "Ronnie Coleman Back Power Session",
      "exercises": [
        { "name": "Deadlifts", "sets": 3, "reps": "6-8", "rest": "180s", "notes": "Heavy compound with Glass form safety" },
        { "name": "T-Bar Rows", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Mass building with controlled tempo" },
        { "name": "Wide-Grip Pull-ups", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Bodyweight control and stretch" },
        { "name": "Seated Cable Rows", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Mid-back thickness" },
        { "name": "Straight-Arm Pulldowns", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Lat isolation and stretch" }
      ]
    },
    {
      "name": "Jay Cutler Quad Dominant Leg Day",
      "exercises": [
        { "name": "Leg Extensions", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Pre-exhaust with Glass precision" },
        { "name": "Barbell Squats", "sets": 4, "reps": "10-12", "rest": "120s", "notes": "Controlled depth and form" },
        { "name": "Hack Squats", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Quad sweep emphasis" },
        { "name": "Walking Lunges", "sets": 3, "reps": "10-12 per leg", "rest": "90s", "notes": "Unilateral development" },
        { "name": "Leg Press", "sets": 3, "reps": "15-20", "rest": "75s", "notes": "Volume work with different stances" }
      ]
    },
    {
      "name": "Flex Wheeler Arm Aesthetics",
      "exercises": [
        { "name": "Incline Dumbbell Curls", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Full stretch with mind-muscle connection" },
        { "name": "Preacher Curls", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Peak contraction focus" },
        { "name": "Concentration Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Bicep peak isolation" },
        { "name": "Rope Pushdowns", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Triceps detail and horseshoe" },
        { "name": "Overhead Dumbbell Extensions", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Long head development" },
        { "name": "Single Arm Reverse Pushdowns", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Triceps detail work" }
      ]
    },
    {
      "name": "The Glass Method Principles (New)",
      "exercises": [
        { "name": "Form Over Weight", "sets": "Every set", "reps": "Perfect form", "rest": "N/A", "notes": "Never sacrifice form for heavier weight" },
        { "name": "Mind-Muscle Connection", "sets": "Every rep", "reps": "Focused", "rest": "N/A", "notes": "Visualize and feel the target muscle working" },
        { "name": "Controlled Tempo", "sets": "All sets", "reps": "2-1-2 count", "rest": "N/A", "notes": "2 seconds negative, 1 second pause, 2 seconds positive" },
        { "name": "Full Range of Motion", "sets": "All exercises", "reps": "Complete", "rest": "N/A", "notes": "Utilize full stretch and full contraction" },
        { "name": "Strategic Exercise Selection", "sets": "Varied", "reps": "Varied", "rest": "N/A", "notes": "Choose exercises that work best for individual structure" }
      ]
    },
    {
      "name": "Glass Advanced Techniques (New)",
      "exercises": [
        { "name": "Partial Reps Technique", "sets": "Last set", "reps": "Burnout", "rest": "N/A", "notes": "After failure, continue with partial reps" },
        { "name": "Peak Contraction Holds", "sets": "Last rep", "reps": "2-3 second hold", "rest": "N/A", "notes": "Squeeze and hold at peak contraction" },
        { "name": "Stretch Position Emphasis", "sets": "All sets", "reps": "Emphasized", "rest": "N/A", "notes": "Focus on muscle stretch under load" },
        { "name": "Angle Variations", "sets": "Rotated", "reps": "Varied", "rest": "N/A", "notes": "Change angles to target different muscle fibers" }
      ]
    }
  ]
},
  {
  "name": "Ben Pakulski",
  "image": "public/coaches/Ben.jpg",
  "style": "Muscle Intelligence, MI40 Principle, Biomechanics, Hypertrophy Execution Mastery, Time Under Tension (TUT)",
  "description": "IFBB Pro Bodybuilder and founder of Muscle Intelligence and the MI40 (Mass Intentions 40) training system. Renowned for a highly scientific approach to bodybuilding, focusing on perfect exercise execution, muscle activation, proper joint mechanics, and manipulating variables like tempo and intensity to maximize muscle growth (hypertrophy) and minimize injury.",
  "achievements": "Competed in the Mr. Olympia and Arnold Classic. Creator of the globally successful MI40 series (Foundation, Xtreme, etc.). Coach to high-level bodybuilders, athletes, and fitness enthusiasts, focusing on optimizing health and performance.",
  "career": "Professional bodybuilding career emphasizing the largest muscle groups (legs, back). Transitioned into a highly respected coaching career, educating trainees on the 'how' and 'why' of muscle building using biomechanical precision.",
  "splits": [
    {
      "name": "MI40 Core Principles (The Pakulski Method)",
      "exercises": [
        { "name": "Hypertrophy Execution Mastery", "sets": "All sets", "reps": "Controlled", "rest": "N/A", "notes": "Focus on the working muscle, proper joint alignment, and maximum tension throughout the entire range of motion." },
        { "name": "Time Under Tension (TUT)", "sets": "All sets", "reps": "Varies", "rest": "N/A", "notes": "Sets typically last $\\approx 40-60$ seconds. Manipulate the tempo (e.g., $4-0-1-0$) to keep tension on the muscle. (Eccentric-Pause-Concentric-Pause)." },
        { "name": "Intent", "sets": "Every rep", "reps": "Focused", "rest": "N/A", "notes": "Move the weight with the **muscle**, not just by moving the joint. High mind-muscle connection." },
        { "name": "NOS/NOS-X Sets", "sets": "Final set", "reps": "High", "rest": "$10-20$s max", "notes": "Neurological Overload Sets (NOS): Drop sets with minimal rest to maximize cell swelling. NOS-X includes an intra-set stretch." },
        { "name": "CS-6 Sets", "sets": "Final set", "reps": "8 reps", "rest": "20s max", "notes": "Cell Swelling-6: Perform a set of 8 reps, rest $20$s max, drop weight by $10\\%$, repeat 6 times for maximum metabolic stress/pump." }
      ]
    },
    {
      "name": "Ben Pakulski's Quad Hypertrophy (Sample from MI40)",
      "exercises": [
        { "name": "Leg Extensions", "sets": 5, "reps": "10-12", "rest": "60s", "notes": "3-0-1-2 tempo (3s negative, 2s peak squeeze). Focus on contracting the quad at the top." },
        { "name": "Safety Bar Squats", "sets": 5, "reps": "8-10", "rest": "60s", "notes": "4-1-1-0 tempo. Controlled descent, focus on driving knees out and initiating with the quad/knee joint." },
        { "name": "Barbell Reverse Lunges (Superset B1 with B2)", "sets": 4, "reps": "10-12 per leg", "rest": "30s", "notes": "4-0-1-0 tempo. High step back for quad stretch and glute emphasis." },
        { "name": "Hack Squats (Quad Emphasis)", "sets": 3, "reps": "8 (CS-6 Set)", "rest": "75s", "notes": "Perform as a CS-6 set on the last set for extreme metabolic stress. Feet low on the platform." },
        { "name": "Dumbbell Quad Squats (Bottom Half Reps)", "sets": 2, "reps": "15-20", "rest": "60s", "notes": "Focus on the bottom half of the range for constant tension and stretch." }
      ]
    },
    {
      "name": "Ben Pakulski's Back Width & Thickness (Sample from MI40)",
      "exercises": [
        { "name": "45º Bent-Over, High Cable Pullovers", "sets": 4, "reps": "8-12", "rest": "60s", "notes": "3-1-1-2 tempo. Focus on the lats, keep arms straight, arch back slightly to feel the stretch." },
        { "name": "One-Arm Dumbbell Rows", "sets": 4, "reps": "8-10", "rest": "15s", "notes": "3-0-1-2 tempo. Initiate with the lat, not the arm. Focus on pulling the elbow back and squeezing the scapula." },
        { "name": "Bent Barbell Row (Overhand Grip)", "sets": 4, "reps": "8-12", "rest": "30s", "notes": "4-0-1-0 tempo. Focus on mid-back thickness, controlled negative." },
        { "name": "Overhand Wide-Grip Lat Pulldowns", "sets": 4, "reps": "8-12", "rest": "60s", "notes": "3-0-1-2 tempo. Focus on stretch at the top and pulling with the elbows." },
        { "name": "Prone Supported 'T-Bar' Rows", "sets": 4, "reps": "10-12 (NOS-X)", "rest": "60s", "notes": "Perform a NOS-X set on the last set. Maximize chest support to isolate the back." }
      ]
    },
    {
      "name": "MI40 Hams & Calves Specialization (Sample)",
      "exercises": [
        { "name": "Single-Leg Standing Leg Curls", "sets": 5, "reps": "4-6", "rest": "45s", "notes": "3-0-1-1 tempo. Focus on the peak contraction. High intensity/low reps." },
        { "name": "45º Back Extensions (Glute/Ham Focus)", "sets": 5, "reps": "10-12", "rest": "60s", "notes": "Focus on rounding the lower back and driving with the hips/glutes for maximum hamstring stretch and contraction." },
        { "name": "Romanian Deadlifts", "sets": 4, "reps": "10-12 (NOS Set)", "rest": "15s", "notes": "3-1-1-0 tempo. NOS set on the last set. Control the weight, get a deep hamstring stretch." },
        { "name": "Standing Calf Raises", "sets": 5, "reps": "8-10", "rest": "45s", "notes": "3-1-1-2 tempo. Full stretch at the bottom (1s pause), full contraction at the top (2s pause)." },
        { "name": "Seated Calf Raises", "sets": 5, "reps": "10-12", "rest": "15s", "notes": "2-1-1-2 tempo. Focus on the bent-knee gastrocnemius contraction." }
      ]
    },
    {
      "name": "Ben Pakulski's Chest & Delts (Sample from H.T.S. Week 1)",
      "exercises": [
        { "name": "Horizontal Cable Flyes / Crossovers", "sets": 4, "reps": "10-12", "rest": "60s", "notes": "3-0-1-2 tempo. Hands to chin-height at the top, maximize contraction, slow eccentric." },
        { "name": "Barbell Bench Press", "sets": 5, "reps": "8-10", "rest": "75s", "notes": "4-0-1-0 tempo. Controlled negative for maximal mechanical damage." },
        { "name": "Decline Machine / Hammer-Strength Chest Press", "sets": 5, "reps": "10-12", "rest": "60s", "notes": "3-0-1-1 tempo. Constant tension, no locking out." },
        { "name": "75º Incline Prone Supported DB Lateral Raises", "sets": 4, "reps": "10-12", "rest": "45s", "notes": "3-0-1-2 tempo. Focus on isolating the medial deltoid, minimal trap involvement." },
        { "name": "Dumbbell Overhead Press (Seated)", "sets": 4, "reps": "6-10", "rest": "45s", "notes": "3-0-1-0 tempo. Controlled, no resting at the bottom." },
        { "name": "Reverse Pec Flye (Rear Delts)", "sets": 4, "reps": "10-12", "rest": "45s", "notes": "3-0-1-1 tempo. Squeeze the rear delts, not the back." }
      ]
    },
    {
      "name": "Ben Pakulski's Student: Hypertrophy Split Example",
      "exercises": [
        { "name": "Day 1: Quads & Hams (Heavy/Mechanical)", "sets": "Varies", "reps": "Low-Moderate", "rest": "Longer (80-120s)", "notes": "Focus on compound lifts and controlled, heavy reps with a slow eccentric (e.g., $4-1-1-0$ tempo)." },
        { "name": "Day 2: Chest & Back (Heavy/Mechanical)", "sets": "Varies", "reps": "Low-Moderate", "rest": "Longer (75-90s)", "notes": "Includes exercises like heavy Barbell Press and Barbell/Dumbbell Rows with high tension focus." },
        { "name": "Day 3: Delts & Arms (High TUT/Cell Swelling)", "sets": "Varies", "reps": "Moderate-High", "rest": "Shorter (45-60s)", "notes": "Focus on isolation, NOS/CS-6 intensifiers, and constant tension with tempos like $3-0-1-2$." },
        { "name": "Day 4: Rest or Active Recovery", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Prioritize recovery, stretching, mobility, and nutrition (part of the Muscle Intelligence philosophy)." },
        { "name": "Day 5: Quads & Hams (High TUT/Cell Swelling)", "sets": "Varies", "reps": "Moderate-High", "rest": "Shorter (45-75s)", "notes": "Focus on machines and cables, higher reps, supersets, and finishing techniques for metabolic stress." },
        { "name": "Day 6: Chest & Back (High TUT/Cell Swelling)", "sets": "Varies", "reps": "Moderate-High", "rest": "Shorter (45-60s)", "notes": "Focus on flyes, pullovers, and cable movements. Lighter weights with maximal mind-muscle connection." },
        { "name": "Day 7: Delts & Arms (Heavy/Mechanical or Rest)", "sets": "Varies", "reps": "Moderate", "rest": "Moderate (60-75s)", "notes": "Varies by individual; might be an extra session for a lagging body part or full rest." }
      ]
    }
  ]
},
  {
  "name": "John Meadows (Mountain Dog Training)",
  "image": "public/coaches/john.webp",
  "style": "Mountain Dog Training, High-Intensity Bodybuilding, Phased Workouts, Longevity Focused",
  "description": "IFBB Pro bodybuilder and highly-regarded coach. His 'Mountain Dog' method uses a four-phase structure per workout—Activation, Explosive, Supramaximal Pump, and Loaded Stretching—to maximize muscle hypertrophy and minimize joint strain. He trained numerous pros and championed hamstrings-first leg days.",
  "achievements": "IFBB Pro, multiple competition wins, coached numerous professional bodybuilders, created the Mountain Dog Diet/Training system.",
  "career": "Competitor and elite coach known for his scientific, yet pragmatic, in-the-gym approach. Focused on exercise selection and intensity techniques like drop sets, partials, and rest-pause to push past failure.",
  "splits": [
    {
      "name": "Mountain Dog Training - Foundational Principles (The Four Phases)",
      "exercises": [
        { "name": "Phase 1: Pre-Pump/Activation", "sets": "Varied", "reps": "8-12", "rest": "Moderate", "notes": "Simple, non-complicated exercises to establish mind-muscle connection. Easy on the joints." },
        { "name": "Phase 2: Explosive/Power", "sets": "Varied", "reps": "3-8", "rest": "90s-180s", "notes": "Compound lifts (squats, presses, rows) with high intensity and focus on explosive concentric lift and controlled eccentric. Progressive overload is key." },
        { "name": "Phase 3: Supramaximal Pump", "sets": "1-3", "reps": "High/Failure", "rest": "Short", "notes": "Isolation exercises using high-intensity techniques like drop sets, partials, and rest-pause to force maximal blood into the muscle." },
        { "name": "Phase 4: High-Intensity Stretching", "sets": "1-3", "reps": "30-60 second hold", "rest": "60s", "notes": "Hold a stretch position under light load (e.g., bottom of a flye or leg curl) to promote fascial stretching and growth." }
      ]
    },
    {
      "name": "Mountain Dog Classic Push Workout (Chest, Shoulders, Triceps)",
      "exercises": [
        { "name": "Decline Dumbbell Press", "sets": "5-6", "reps": "2 x 20 (warm-up), 2-3 x 3-4 (heavy), 1 x 6-8 (failure)", "rest": "90s-120s", "notes": "Prioritize a full range of motion. Use the high-rep, heavy, failure scheme." },
        { "name": "Incline Dumbbell Press", "sets": "3", "reps": "1 x 10-15 (warm-up), 2 x 6-8", "rest": "90s", "notes": "Target the upper chest. Last set to failure." },
        { "name": "Pec Minor Dip (Chest Focused)", "sets": "3", "reps": "Failure", "rest": "60s", "notes": "A 'reverse shrug' dip to target the chest and pec minor." },
        { "name": "Overhead Smith Machine Press", "sets": "3", "reps": "8-10", "rest": "90s", "notes": "Use a staggered stance, press at a slight angle. Focus on shoulders." },
        { "name": "Incline Y-Raise (Lateral Delt Focus)", "sets": "3", "reps": "15", "rest": "60s", "notes": "A variation of the lateral raise for shoulder isolation." },
        { "name": "Dual Rope Tricep Extension", "sets": "3", "reps": "15", "rest": "60s", "notes": "Focus on high volume and full range of motion." },
        { "name": "Dual Rope Overhead Extension", "sets": "3", "reps": "15", "rest": "60s", "notes": "Finisher for the triceps, emphasizing the stretch." }
      ]
    },
    {
      "name": "Mountain Dog Classic Pull Workout (Back, Biceps, Rear Delts)",
      "exercises": [
        { "name": "Meadows Row (Single-Arm Barbell Row)", "sets": "3", "reps": "8-12", "rest": "90s", "notes": "Pronated grip on the thick part of the barbell. Drive elbow up, contract the back." },
        { "name": "Single Arm Barbell Row", "sets": "3", "reps": "8-12", "rest": "90s", "notes": "Alternate sides for isolation and deep stretch." },
        { "name": "Assisted Pull-Up / Lat Pulldown", "sets": "3", "reps": "8-12", "rest": "90s", "notes": "Focus on using the lats, not arms." },
        { "name": "Rear Delt Fly (Pec Deck or Dumbbell)", "sets": "3", "reps": "20-25", "rest": "60s", "notes": "High reps for rear delt detail and pump." },
        { "name": "Seated Hammer Curl", "sets": "3", "reps": "12-15", "rest": "60s", "notes": "Focus on forearms and long head of the bicep." },
        { "name": "Straight-Arm Pulldowns", "sets": "2", "reps": "15-20", "rest": "60s", "notes": "Lat isolation and stretch at the top." }
      ]
    },
    {
      "name": "Mountain Dog Classic Leg Workout (Hamstrings-First Focus)",
      "exercises": [
        { "name": "Lying Leg Curls", "sets": "3", "reps": "8", "rest": "60s", "notes": "*Final set includes a double drop set, followed by partials, and a 10-second iso-hold at contraction. Prioritizing hamstrings first." },
        { "name": "Spider Bar Squats / Safety Bar Squats", "sets": "6", "reps": "2 x 8 (warm-up), 3 x 3 (heavy), 1 x 6-8 (failure)", "rest": "120s", "notes": "Focus on a deep squat pattern. Power phase of the workout." },
        { "name": "A1. Inverted Leg Press (or Leg Press)", "sets": "3", "reps": "8", "rest": "60s", "notes": "Superset for quad focus. High tension." },
        { "name": "A2. Sissy Squat", "sets": "3", "reps": "8", "rest": "60s", "notes": "Superset for quad focus. High knee travel." },
        { "name": "Smith Machine Split Squat", "sets": "3", "reps": "8 per leg", "rest": "90s", "notes": "Unilateral work for balance and leg detail." }
      ]
    },
    {
      "name": "Mountain Dog Shoulder & Arm Assault (Volume Focused)",
      "exercises": [
        { "name": "Incline Bench Rear Delt Fly (Activation)", "sets": "2", "reps": "15-20", "rest": "60s", "notes": "Light weight, strict form to pre-activate the rear delts and warm the shoulder girdle." },
        { "name": "Seated Dumbbell Overhead Press (Explosive)", "sets": "4", "reps": "6-8", "rest": "90s", "notes": "Focus on driving the weight up explosively. Maintain a controlled negative." },
        { "name": "Machine Lateral Raise (Supramaximal Pump)", "sets": "3", "reps": "12-15", "rest": "45s", "notes": "*Final set is a rest-pause: hit 15 reps, rest 10s, hit 5-8 more, rest 10s, hit 3-5 more." },
        { "name": "A1. Dual-Rope Triceps Pushdown (Volume/Pump)", "sets": "3", "reps": "15", "rest": "30s", "notes": "High volume for triceps. Keep rest short." },
        { "name": "A2. Machine Preacher Curl (Volume/Pump)", "sets": "3", "reps": "12-15", "rest": "60s", "notes": "Superset with triceps pushdowns. Focus on peak contraction." },
        { "name": "Cable Overhead Tricep Extension (Loaded Stretch)", "sets": "2", "reps": "12", "rest": "60s", "notes": "Slow eccentric and a 30s loaded stretch on the last rep of the final set." }
      ]
    },
    {
      "name": "Mountain Dog Back & Traps Power Day (Density Focused)",
      "exercises": [
        { "name": "Standing Banded Pullover (Activation)", "sets": "2", "reps": "15-20", "rest": "60s", "notes": "Focus on feeling the lats pull down. Light resistance." },
        { "name": "Rack Pull (Heavy Explosive)", "sets": "5", "reps": "2 x 5 (warm-up), 3 x 3-5 (heavy)", "rest": "180s", "notes": "Start slightly below the knee. Aggressive concentric movement. Strict form." },
        { "name": "Wide Grip T-Bar Row (Explosive/Power)", "sets": "3", "reps": "6-8", "rest": "90s", "notes": "Focus on a big stretch at the bottom and a hard contraction at the top." },
        { "name": "Hammer Strength Pulldown (Supramaximal Pump)", "sets": "3", "reps": "10-12", "rest": "60s", "notes": "*Last set is a triple drop set to failure." },
        { "name": "Dumbbell Shrug (Density)", "sets": "3", "reps": "15-20", "rest": "45s", "notes": "High reps, short rest. Hold the contraction for 1 second on each rep." },
        { "name": "Hanging (Loaded Stretch)", "sets": "1", "reps": "60 second hang", "rest": "N/A", "notes": "Hang from a pull-up bar for a full minute to stretch the lats and spine." }
      ]
    },
    {
      "name": "Mountain Dog Quad-Dominant Leg Day (High-Frequency Method)",
      "exercises": [
        { "name": "Leg Extension (Activation/Pre-Exhaust)", "sets": "3", "reps": "15-20", "rest": "60s", "notes": "Use a light weight with a 2-second hold at the top for max quad contraction." },
        { "name": "Hack Squat (Power/Explosive)", "sets": "5", "reps": "2 x 10 (warm-up), 3 x 6-8 (heavy)", "rest": "120s", "notes": "Deep range of motion with a controlled negative and an explosive drive up." },
        { "name": "A1. Seated Leg Curl (Hamstring Isolation)", "sets": "3", "reps": "10-12", "rest": "45s", "notes": "Superset for a quick pump. Focus on the peak contraction." },
        { "name": "A2. Dumbbell Step-Up (Unilateral Quads)", "sets": "3", "reps": "10 per leg", "rest": "60s", "notes": "Controlled movement. Keep tension on the quad." },
        { "name": "Leg Press (Supramaximal Pump)", "sets": "1", "reps": "Failure + Partials", "rest": "N/A", "notes": "Load up the machine and go to absolute failure, immediately followed by 10-15 partial reps at the end of the range of motion." },
        { "name": "Reverse Band Stiff-Legged Deadlift (Loaded Stretch)", "sets": "2", "reps": "10-12", "rest": "90s", "notes": "Use bands to deload the bottom and focus on the hamstring stretch." }
      ]
    },
    {
      "name": "Mountain Dog Chest & Shoulder Pump (Density Focused)",
      "exercises": [
        { "name": "Cable Chest Fly (Activation)", "sets": "2", "reps": "15", "rest": "45s", "notes": "Focus on the pec minor contraction. High cable position." },
        { "name": "Flat Barbell Bench Press (Power/Explosive)", "sets": "5", "reps": "2 x 10 (warm-up), 3 x 4-6 (heavy)", "rest": "120s", "notes": "Use chains or bands if available for accommodating resistance. Focus on max power." },
        { "name": "Incline Dumbbell Press (Pump)", "sets": "3", "reps": "10-12", "rest": "60s", "notes": "Continuous tension, no lockout. Last set to failure." },
        { "name": "Dumbbell Lateral Raise (Pump Finisher)", "sets": "3", "reps": "15-20", "rest": "45s", "notes": "High rep work for the side delts. Use strict form." },
        { "name": "Machine Press (Loaded Stretch)", "sets": "1", "reps": "8", "rest": "N/A", "notes": "Use a machine that provides a deep stretch. Hold the stretched position for 30s on the last rep." }
      ]
    },
    {
      "name": "Mountain Dog Isolation Arms (Superset Hell)",
      "exercises": [
        { "name": "A1. Straight Bar Pushdown (Activation/Triceps)", "sets": "3", "reps": "15", "rest": "15s", "notes": "Warm up the elbows. Focus on a hard triceps contraction." },
        { "name": "A2. EZ-Bar Curl (Activation/Biceps)", "sets": "3", "reps": "15", "rest": "60s", "notes": "Superset with triceps. Focus on a hard bicep squeeze." },
        { "name": "Close Grip Smith Machine Bench Press (Power)", "sets": "4", "reps": "6-8", "rest": "90s", "notes": "Triceps focused compound lift. Controlled negative." },
        { "name": "Seated Dumbbell Hammer Curl (Pump)", "sets": "3", "reps": "10-12", "rest": "60s", "notes": "*Last set is a drop set: hit 12 reps, drop weight, hit 8 more." },
        { "name": "Cable Reverse Grip Curl (Pump Finisher)", "sets": "2", "reps": "15-20", "rest": "45s", "notes": "Focus on forearms and brachialis. Strict tempo." },
        { "name": "Lying Kettlebell Triceps Extension (Loaded Stretch)", "sets": "2", "reps": "10-12", "rest": "60s", "notes": "Use a kettlebell to maximize the stretch at the bottom of the movement." }
      ]
    }
  ]
},
{
  "name": "Dave \"Jumbo\" Palumbo",
  "image": "public/coaches/dave.png",
  "style": "High Intensity, Low Volume, Isolation Focus (Later Career), Advanced Body Part Specialization, Nutrition-First Coaching (Palumbo Diet)",
  "description": "IFBB Pro Bodybuilder, successful contest prep guru, and founder of RXMuscle. Known for his 'Palumbo Diet' (low-carb, high-fat/protein) and advocating for intense, short-duration workouts to maximize muscle damage and recovery. His training evolved to prioritize isolation and mind-muscle connection, especially for arms.",
  "achievements": "Competed as a Super Heavyweight, 2nd place at the 2003 NPC USA Championships. Coached numerous professional and amateur bodybuilders. Founder of Species Nutrition and RXMuscle.",
  "career": "Bodybuilder since the late 80s/early 90s, transitioned to full-time coach, nutritionist, and media personality. Advocated for a low-volume, high-intensity training split, often focusing on isolation movements to maximize muscle stimulation while minimizing central nervous system fatigue.",
  "splits": [
    {
      "name": "Dave Palumbo's Classic Split (1 Bodypart/Week)",
      "exercises": [
        { "name": "Day 1: Chest", "sets": "10-14 total", "reps": "8-12", "rest": "90s-120s", "notes": "Focus on 3-4 exercises (e.g., Incline Press, Dumbbell Press, Flyes). High intensity." },
        { "name": "Day 2: Back", "sets": "12-16 total", "reps": "8-12", "rest": "90s-120s", "notes": "Compound movements (Rows, Pulldowns) followed by isolation. Example: Deadlifts Off the Rack, Lat Pulldowns, Bent-Over Rows." },
        { "name": "Day 3: Shoulders", "sets": "10-14 total", "reps": "10-15", "rest": "60s-90s", "notes": "Focus on Deltoid heads (Presses, Lateral Raises, Rear Delt Work). Isolation emphasized." },
        { "name": "Day 4: Arms (Biceps & Triceps)", "sets": "10-12 per muscle", "reps": "10-15", "rest": "60s-90s", "notes": "Often favored isolation over compound movements (e.g., Preacher Curls, Cable Pushdowns) to maximize local stimulus." },
        { "name": "Day 5: Legs (Quads & Hams)", "sets": "12-18 total", "reps": "8-15", "rest": "90s-120s", "notes": "Heavy compounds (Squats, Leg Press) and isolation (Extensions, Curls). Jumbo Palumbo Legs were known for intensity." },
        { "name": "Day 6-7: Rest/Active Recovery", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Prioritizes recovery for intense muscle damage." }
      ]
    },
    {
      "name": "Jumbo Palumbo Back Focus (Example Routine)",
      "exercises": [
        { "name": "Lat Pulldowns (Wide-Grip)", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Focus on lats, controlled negative." },
        { "name": "Bent Over Barbell Rows", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "Heavy, focusing on mid-back thickness." },
        { "name": "One-Arm Dumbbell Rows", "sets": 3, "reps": "10-12 per side", "rest": "60s-90s", "notes": "Mind-muscle connection, pull deep into the side." },
        { "name": "Machine Rows (Various Grips)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Higher reps for a pump and detail." },
        { "name": "Deadlifts Off the Rack (Partial Range)", "sets": 3, "reps": "6-8", "rest": "120s", "notes": "Used to hit the upper back/traps heavy, less focus on hamstring stretch." },
        { "name": "Hyperextensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Lower back finishing work." }
      ]
    },
    {
      "name": "Palumbo's Advanced Arm Specialization (Isolation Focused)",
      "exercises": [
        { "name": "Preacher Curls (Bar or Dumbbell)", "sets": 4, "reps": "10-12", "rest": "60s", "notes": "Strict form, focus on peak contraction." },
        { "name": "Single-Arm Cable Curls", "sets": 3, "reps": "12-15 per side", "rest": "60s", "notes": "Maximize isolation and squeeze." },
        { "name": "Dumbbell Concentration Curls", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Focus on bicep peak and detail." },
        { "name": "Rope Pushdowns", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Triceps horseshoe focus, full extension." },
        { "name": "Overhead Dumbbell Triceps Extensions", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Focus on the long head of the tricep, full stretch." },
        { "name": "Single-Arm Reverse Grip Cable Pushdowns", "sets": 3, "reps": "15-20 per side", "rest": "60s", "notes": "Targeting different heads for full development." }
      ]
    },
    {
      "name": "Dave Palumbo Coaching & Training Principles",
      "exercises": [
        { "name": "Intensity Over Volume", "sets": "Low to Moderate", "reps": "Moderate", "rest": "N/A", "notes": "Train to *true* failure (concentric) on the last 1-2 working sets." },
        { "name": "Bro Split (Body part once a week)", "sets": "All workouts", "reps": "N/A", "rest": "N/A", "notes": "Maximal muscle damage requires maximum recovery time (5-8 days)." },
        { "name": "Mind-Muscle Connection", "sets": "Every rep", "reps": "Focused", "rest": "N/A", "notes": "Feel the muscle working, isolation is key." },
        { "name": "Strategic Isolation", "sets": "Many exercises", "reps": "N/A", "rest": "N/A", "notes": "Often favors isolation movements (e.g., cable/machine work) over compounds to direct stimulus to a specific area and reduce injury risk." },
        { "name": "Shock/Switching", "sets": "Infrequently", "reps": "Varied", "rest": "N/A", "notes": "Occasionally incorporating giant sets, supersets, or reversing exercise order to shock the body, but maintaining the core routine." }
      ]
    },
    {
      "name": "Palumbo's Chest Thickness Routine",
      "exercises": [
        { "name": "Incline Barbell or Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Heavy compound for upper chest, controlled tempo." },
        { "name": "Flat Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Focus on stretch and powerful contraction." },
        { "name": "Hammer Strength Incline Press", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Machine for constant tension and safe failure training." },
        { "name": "Cable Crossovers (Low Pulley)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Isolation for lower chest sweep and detail, maximum squeeze." },
        { "name": "Pec Deck/Machine Flyes", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "High intensity, high rep finisher for a deep pump." }
      ]
    },
    {
      "name": "Palumbo's Boulder Shoulders Workout",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Primary mass builder, strict form, no leg drive." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Strict form, focus on medial deltoid for width (caps)." },
        { "name": "Cable Lateral Raises (Single-Arm)", "sets": 3, "reps": "15-20 per side", "rest": "60s", "notes": "Isolation and constant tension for burnout." },
        { "name": "Bent-Over Dumbbell Rear Delt Raises", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Focus on rear deltoid and contraction, light weight." },
        { "name": "Barbell Shrugs (or Dumbbell)", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Heavy for traps, focus on vertical movement." }
      ]
    },
    {
      "name": "Jumbo Palumbo Legs (Quads & Hams Power)",
      "exercises": [
        { "name": "Leg Extensions", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Pre-exhaustion/warm-up for quads, deep squeeze at the top." },
        { "name": "Barbell Squats (Heavy)", "sets": 4, "reps": "8-10", "rest": "120s-180s", "notes": "Primary power movement, controlled descent." },
        { "name": "Leg Press", "sets": 3, "reps": "12-15", "rest": "90s", "notes": "High volume/intensity work, vary foot position." },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Focus on hamstring peak contraction." },
        { "name": "Stiff-Legged Dumbbell Deadlifts", "sets": 3, "reps": "12-15", "rest": "90s", "notes": "Hamstring stretch and glute tie-in." },
        { "name": "Standing Calf Raises (Superset with Seated)", "sets": 5, "reps": "15-25", "rest": "45s", "notes": "High volume for lower leg mass, focus on full stretch and peak contraction." }
      ]
    }
  ]
},
  {
  "name": "Chris Aceto",
  "image": "public/coaches/aceto.jpg",
  "style": "Nutrition-First Bodybuilding, Metabolic Manipulation, High-Volume Training, Strategic Supplementation",
  "description": "World-renowned bodybuilding nutritionist and coach, famous for his scientific approach to diet, contest preparation, and supplementation. While not a 'form guru' like Glass, his training principles are designed to work in synergy with his nutritional strategies to maximize muscle growth and fat loss.",
  "achievements": "Author of 'Championship Bodybuilding' and 'Everything You Need to Know About Fat Loss'. Coached numerous top-tier bodybuilders including Jay Cutler, Flex Wheeler, Nasser El Sonbaty, and many Olympia contenders. Known as one of the most sought-after nutrition experts in the sport's history.",
  "career": "For over 30 years, Aceto has been the 'secret weapon' behind countless champions, using his deep understanding of metabolism, nutrient timing, and hormonal response to craft winning physiques. His training advice is always given with the athlete's diet and recovery capacity in mind.",
  "splits": [
    {
      "name": "Aceto Fundamentals Chest Workout",
      "exercises": [
        { "name": "Incline Barbell Press", "sets": 4, "reps": "8-12", "rest": "90-120s", "notes": "Primary mass builder. Focus on controlled reps, not maximum weight." },
        { "name": "Flat Dumbbell Press", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Focus on stretch at the bottom. Good for overall chest development." },
        { "name": "Incline Dumbbell Flyes", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Stretch and isolate. Keep a slight bend in the elbows." },
        { "name": "Cable Crossovers (High to Low)", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Pump and detail movement. Squeeze at the bottom." }
      ]
    },
    {
      "name": "Aceto Back Width & Thickness",
      "exercises": [
        { "name": "Wide-Grip Front Pulldowns", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Builds lat width. Pull to chest, not behind the neck." },
        { "name": "Barbell Rows", "sets": 4, "reps": "8-10", "rest": "90-120s", "notes": "Primary thickness builder. Keep torso at 45-degree angle." },
        { "name": "Seated Cable Rows (Close Grip)", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Squeeze shoulder blades together for mid-back thickness." },
        { "name": "Straight-Arm Pulldowns", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Isolation for lat spread and detail. Use a full range of motion." }
      ]
    },
    {
      "name": "Aceto Shoulder Cap Builder",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Foundation for shoulder mass. Lower dumbbells to ear level." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Key for width. Use a weight that allows perfect form." },
        { "name": "Bent-Over Dumbbell Raises", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Targets rear delts for 3D shoulders." },
        { "name": "Cable Upright Rows", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Use a wider grip to focus on delts and minimize trap involvement." }
      ]
    },
    {
      "name": "Aceto Arm Specialization",
      "exercises": [
        { "name": "Standing EZ-Bar Curls", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Mass builder for biceps. Avoid using momentum." },
        { "name": "Incline Dumbbell Curls", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Excellent stretch. Rotate palms up as you curl." },
        { "name": "Preacher Curls", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Builds the biceps peak." },
        { "name": "Lying Triceps Extensions (Skull Crushers)", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Mass builder for the entire triceps." },
        { "name": "Triceps Pushdowns (V-Bar)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Focus on the lateral head of the triceps." },
        { "name": "Overhead Dumbbell Extensions", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Targets the long head for full triceps development." }
      ]
    },
    {
      "name": "Aceto Legs for Mass",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "10-15", "rest": "120s", "notes": "The cornerstone. Depth is key, but individual based on structure." },
        { "name": "Leg Press", "sets": 4, "reps": "12-20", "rest": "90s", "notes": "Volume work. Use different foot positions to target quads." },
        { "name": "Hack Squats", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Excellent for quad sweep." },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Isolate the hamstrings." },
        { "name": "Standing Leg Curls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Focus on the squeeze for hamstring detail." },
        { "name": "Standing Calf Raises", "sets": 5, "reps": "15-25", "rest": "45s", "notes": "Full range of motion is non-negotiable for calf growth." }
      ]
    },
    {
      "name": "Jay Cutler's Mass-Building Back (Aceto Era)",
      "exercises": [
        { "name": "Deadlifts", "sets": 3, "reps": "6-8", "rest": "180s", "notes": "Performed heavy but not to failure, especially in-season." },
        { "name": "T-Bar Rows", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "A Cutler staple for back thickness." },
        { "name": "Wide-Grip Pull-ups (or Assisted)", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "For lat width. Used weight assistance if needed to hit reps." },
        { "name": "Seated Cable Rows", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Squeeze for mid-back density." },
        { "name": "Hyperextensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "For lower back health and spinal erector development." }
      ]
    },
    {
      "name": "Flex Wheeler's Aesthetic Shoulder Routine",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Controlled pressing for overall delt cap development." },
        { "name": "Machine Lateral Raises", "sets": 4, "reps": "15-20", "rest": "75s", "notes": "Focus on constant tension and the burn." },
        { "name": "Bent-Over Cable Rear Delt Flyes", "sets": 3, "reps": "15-20", "rest": "75s", "notes": "Used cables for constant tension on rear delts." },
        { "name": "Single-Arm Cable Lateral Raises", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Isolation work to bring out striations." }
      ]
    },
    {
      "name": "Nasser El Sonbaty's High-Volume Chest",
      "exercises": [
        { "name": "Incline Smith Machine Press", "sets": 5, "reps": "10-15", "rest": "90s", "notes": "Allowed for stable, heavy loading on the upper chest." },
        { "name": "Flat Barbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "A power movement for overall mass." },
        { "name": "Dumbbell Flyes (Flat and Incline)", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Emphasized the stretch to expand the ribcage and chest." },
        { "name": "Pec Deck", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Finisher for a massive pump." }
      ]
    },
    {
      "name": "The Aceto Nutrition-Driven Training Principles",
      "exercises": [
        { "name": "Calories Dictate Volume", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "In a calorie deficit, volume may be reduced to prevent overtraining. In a surplus, volume can be higher." },
        { "name": "Frequency Over Extremity", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Hitting a muscle group 2x per week with moderate volume is often better than 1x with brutal volume." },
        { "name": "Listen to Your Energy Levels", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Your ability to recover is directly tied to your diet. Adjust intensity based on daily energy." },
        { "name": "Progressive Overload is Key", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Aim to add a small amount of weight or one more rep over time, as supported by your nutrition." },
        { "name": "Cardio is Part of the Program", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Uses cardio to create a calorie deficit, not to replace diet. Often prescribed post-workout or fasted." }
      ]
    },
    {
      "name": "Aceto's Common Training Splits",
      "exercises": [
        { "name": "4-Day Split (Common)", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Day 1: Chest/Triceps, Day 2: Back/Biceps, Day 3: Off, Day 4: Shoulders/Abs, Day 5: Legs, Day 6&7: Off" },
        { "name": "5-Day Split (Advanced)", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Day 1: Chest, Day 2: Back, Day 3: Shoulders, Day 4: Arms, Day 5: Legs, Day 6&7: Off" },
        { "name": "Push/Pull/Legs (PPL)", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Push (Chest/Shoulders/Triceps), Pull (Back/Biceps/Rear Delts), Legs. Can be run 3-on, 1-off or 6 days a week." }
      ]
    }
  ]
},
  {
  "name": "Tom Platz",
  "image": "public/coaches/plotz.jpg",
  "style": "High-Intensity, Beyond Failure, Deep Squats, Mental Fortitude, Unparalleled Volume",
  "description": "Legendary bodybuilder known as 'The Golden Eagle' and 'The Quad Father', famous for the most developed legs in bodybuilding history. His training philosophy was built on extreme intensity, pushing past failure, and a deep, unbreakable mind-muscle connection. He believed in training with maximum effort and emotional investment on every set.",
  "achievements": "IFBB Professional Bodybuilder, 1981 Mr. Universe Champion, 6th place at the 1981 Mr. Olympia. While his competitive record was limited, his legacy is defined by his legendary leg development and training intensity that has inspired generations of bodybuilders and strength athletes.",
  "career": "Competed from the late 1970s to the mid-1980s. Since retiring from competition, he has been a renowned coach, speaker, and author, spreading his philosophy of 'The Spirit of the Set'—the idea that maximum effort and emotional engagement are the true keys to growth.",
  "splits": [
    {
      "name": "The Legendary Platz Leg Day",
      "exercises": [
        { "name": "Barbell Squats", "sets": "8-10", "reps": "15-30+", "rest": "120-180s", "notes": "The cornerstone. Deep, ATG (Ass-to-Grass) reps. Famous for 500 lbs for 23 reps. Focus on total quad destruction, not just weight." },
        { "name": "Hack Squats", "sets": 5, "reps": "15-20", "rest": "90s", "notes": "Performed after squats to annihilate the quads further. Focus on constant tension and deep stretch." },
        { "name": "Leg Extensions", "sets": "8-10", "reps": "15-30", "rest": "60-75s", "notes": "Used for extreme pump and detail. Often performed as a 'feeder' set to flush the quads with blood between heavy compounds." },
        { "name": "Lying Leg Curls", "sets": 6, "reps": "10-15", "rest": "75s", "notes": "For hamstring development. Squeeze hard at the top for a full contraction." },
        { "name": "Stiff-Leg Deadlifts", "sets": 5, "reps": "10-12", "rest": "90s", "notes": "Focus on stretching the hamstrings and glutes. Keep a slight bend in the knees and a flat back." },
        { "name": "Standing Calf Raises", "sets": "8-10", "reps": "15-25", "rest": "45s", "notes": "Full range of motion, emphasizing the stretch at the bottom and peak contraction at the top." }
      ]
    },
    {
      "name": "Platz High-Intensity Chest Workout",
      "exercises": [
        { "name": "Incline Barbell Press", "sets": 5, "reps": "8-12", "rest": "90s", "notes": "Focus on power and control. Lower the bar slowly, explode up." },
        { "name": "Flat Dumbbell Press", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Focus on deep stretch at the bottom. Use a weight that allows for a full range of motion." },
        { "name": "Dumbbell Flyes (Incline or Flat)", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Focus on the stretch across the chest. Keep a slight bend in the elbows." },
        { "name": "Dips (Chest Focus)", "sets": 4, "reps": "To Failure", "rest": "75s", "notes": "Lean forward to target the chest. Go deep for a full stretch." },
        { "name": "Cable Crossovers", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Pump finisher. Squeeze the pecs hard at the midpoint of the movement." }
      ]
    },
    {
      "name": "Platz Back Destroyer",
      "exercises": [
        { "name": "Deadlifts", "sets": 4, "reps": "6-10", "rest": "120-180s", "notes": "Performed with intense focus on form and power. A core mass builder." },
        { "name": "T-Bar Rows", "sets": 5, "reps": "8-12", "rest": "90s", "notes": "For middle back thickness. Pull the weight into your torso and squeeze." },
        { "name": "Wide-Grip Pull-ups", "sets": 4, "reps": "To Failure", "rest": "90s", "notes": "For lat width. If needed, use a weighted belt or assisted machine to hit target reps." },
        { "name": "Seated Cable Rows (Close Grip)", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Squeeze the shoulder blades together at the peak of the movement." },
        { "name": "Straight-Arm Pulldowns", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Isolation for lats. Focus on stretching the lats at the top and squeezing at the bottom." }
      ]
    },
    {
      "name": "Platz Shoulder Blitz",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 5, "reps": "8-12", "rest": "90s", "notes": "Builds overall shoulder mass. Use a full range of motion." },
        { "name": "Dumbbell Lateral Raises", "sets": 5, "reps": "12-20", "rest": "75s", "notes": "Key for shoulder width. Use a slight swing to initiate, but control the weight strictly." },
        { "name": "Bent-Over Dumbbell Raises", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Crucial for rear delt development. Keep chest parallel to the floor." },
        { "name": "Front Dumbbell Raises", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Targets the anterior deltoid. Can be done alternating or simultaneously." },
        { "name": "Upright Rows (EZ-Bar)", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Use a wider grip to focus on delts and minimize wrist strain." }
      ]
    },
    {
      "name": "Platz Arm Attack",
      "exercises": [
        { "name": "Standing Barbell Curls", "sets": 5, "reps": "8-12", "rest": "75s", "notes": "The fundamental bicep mass builder. Strict form, no cheating." },
        { "name": "Incline Dumbbell Curls", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Allows for a deep stretch at the bottom. Focus on the mind-muscle connection." },
        { "name": "Concentration Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "For peak contraction. Squeeze hard at the top of each rep." },
        { "name": "Close-Grip Bench Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Mass builder for triceps. Elbows tucked in." },
        { "name": "Lying Triceps Extensions (Skull Crushers)", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Focus on stretching the long head of the triceps." },
        { "name": "Triceps Pushdowns (Rope)", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Pump finisher. Pull the rope apart at the bottom for a full contraction." }
      ]
    },
    {
      "name": "The Platz Squat Protocol (Famous Routine)",
      "exercises": [
        { "name": "Leg Extensions (Warm-up)", "sets": 3, "reps": "20-30", "rest": "60s", "notes": "To pre-fatigue and warm up the knees and quads." },
        { "name": "Barbell Squats (ATG)", "sets": 8, "reps": "15-30", "rest": "120-180s", "notes": "The main event. Start with 135 lbs for 20, then pyramid up in weight, aiming for high reps with maximum depth on every set." },
        { "name": "Leg Press", "sets": 5, "reps": "20-30", "rest": "90s", "notes": "Performed immediately after squats. Focus on different foot positions to target all areas of the quad." },
        { "name": "Leg Extensions (Burnout)", "sets": 5, "reps": "20-30", "rest": "60s", "notes": "Complete burnout. Use a weight that forces failure in the target rep range." },
        { "name": "Hack Squats", "sets": 4, "reps": "15-20", "rest": "90s", "notes": "Final compound movement to ensure total quad annihilation." }
      ]
    },
    {
      "name": "Platz Quad Isolation Day",
      "exercises": [
        { "name": "Sissy Squats", "sets": 5, "reps": "15-25", "rest": "75s", "notes": "For extreme quad sweep and teardrop development. Focus on balance and deep stretch." },
        { "name": "Leg Extensions (Dropsets)", "sets": 5, "reps": "15-20 + drops", "rest": "90s", "notes": "Perform a heavy set of 15-20, then immediately drop weight 2-3 times for 10+ reps each." },
        { "name": "Hack Squats (Close Stance)", "sets": 4, "reps": "15-20", "rest": "90s", "notes": "Feet close together to target the outer sweep of the quads." },
        { "name": "Walking Lunges", "sets": 4, "reps": "20 steps per leg", "rest": "90s", "notes": "For overall leg development and stability. Deep stretch on each step." },
        { "name": "One-Leg Extensions", "sets": 3, "reps": "15-20 per leg", "rest": "60s", "notes": "Address muscle imbalances and focus on peak contraction in each quad." }
      ]
    },
    {
      "name": "Platz Full-Body Intensity Circuit",
      "exercises": [
        { "name": "Power Cleans", "sets": 4, "reps": "5-8", "rest": "120s", "notes": "For explosive power and full-body coordination." },
        { "name": "Front Squats", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Emphasizes quads and core strength. Maintain upright torso." },
        { "name": "Weighted Pull-ups", "sets": 4, "reps": "6-10", "rest": "90s", "notes": "For back width and strength. Go full range of motion." },
        { "name": "Standing Overhead Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Core compound for shoulders. Use strict form." },
        { "name": "Barbell Rows", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Back thickness builder. Keep back parallel to floor." },
        { "name": "Romanian Deadlifts", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Hamstring and glute focus with stretch." }
      ]
    },
    {
      "name": "Platz Pre-Contest Cutting Workout",
      "exercises": [
        { "name": "High-Rep Squats", "sets": 5, "reps": "20-30", "rest": "60s", "notes": "Lighter weight, extreme reps for metabolic burn and muscle detail." },
        { "name": "Superset: Leg Press & Leg Extensions", "sets": 4, "reps": "15-20 each", "rest": "90s", "notes": "No rest between exercises. Maximize pump and calorie burn." },
        { "name": "Superset: Pull-ups & Push-ups", "sets": 4, "reps": "Max Reps Each", "rest": "75s", "notes": "Upper body metabolic conditioning. Maintain perfect form despite fatigue." },
        { "name": "Circuit: Lunges, Dips, Curls", "sets": 3, "reps": "15-20 each", "rest": "60s", "notes": "Complete all exercises back-to-back. Repeat circuit 3 times." },
        { "name": "Farmers Walks", "sets": 4, "reps": "40-50 yards", "rest": "60s", "notes": "Grip strength, core stability, and overall metabolic demand." }
      ]
    },
    {
      "name": "Platz Weak Point Training - Calves & Abs",
      "exercises": [
        { "name": "Donkey Calf Raises", "sets": 5, "reps": "20-30", "rest": "45s", "notes": "For calf mass and stretch. Focus on maximum range of motion." },
        { "name": "Seated Calf Raises", "sets": 5, "reps": "15-25", "rest": "45s", "notes": "Targets soleus muscle for calf thickness." },
        { "name": "Hanging Leg Raises", "sets": 4, "reps": "15-25", "rest": "60s", "notes": "For lower ab development. Raise legs to parallel or higher." },
        { "name": "Cable Crunches", "sets": 4, "reps": "20-30", "rest": "60s", "notes": "Focus on crunching abs, not pulling with arms." },
        { "name": "Oblique Side Bends", "sets": 3, "reps": "15-20 per side", "rest": "45s", "notes": "For waist development. Use controlled tempo." }
      ]
    },
    {
      "name": "Platz Mental Fortitude & Grip Day",
      "exercises": [
        { "name": "Rack Pulls (Above Knee)", "sets": 5, "reps": "5-8", "rest": "120s", "notes": "Extremely heavy weight to build mental toughness and back strength." },
        { "name": "Fat Bar Curls", "sets": 4, "reps": "8-12", "rest": "75s", "notes": "Builds forearm and grip strength while training biceps." },
        { "name": "Plate Pinches", "sets": 4, "reps": "30-60 second hold", "rest": "60s", "notes": "Grip strength development. Pinch two smooth plates together." },
        { "name": "Wrist Roller", "sets": 3, "reps": "2-3 full rolls", "rest": "60s", "notes": "Forearm burnout. Roll weight up and down completely." },
        { "name": "Dead Hang Holds", "sets": 3, "reps": "Max Time", "rest": "60s", "notes": "Grip endurance test. Hang from pull-up bar until failure." }
      ]
    },
    {
      "name": "The 'Spirit of the Set' Principles",
      "exercises": [
        { "name": "Intensity Over Weight", "sets": "Every Set", "reps": "Max Effort", "rest": "N/A", "notes": "The weight is a tool. It's the intensity and effort you bring to the set that matters most." },
        { "name": "The Mind-Muscle Link", "sets": "Every Rep", "reps": "Focused", "rest": "N/A", "notes": "Visualize the muscle working. Feel every fiber contract and stretch. Emotion is fuel." },
        { "name": "Train to Failure and Beyond", "sets": "Last Set", "reps": "Forced/Partial", "rest": "N/A", "notes": "True growth happens when you push past the point of voluntary failure using forced reps, partials, and dropsets." },
        { "name": "Full Range of Motion", "sets": "All exercises", "reps": "Complete", "rest": "N/A", "notes": "Especially on squats. Depth is non-negotiable for full development." },
        { "name": "The Pain is the Reward", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Embrace the burning sensation and muscle fatigue. It is a sign of a productive workout." }
      ]
    },
    {
      "name": "Platz Advanced Intensity Techniques",
      "exercises": [
        { "name": "Forced Reps", "sets": "Last set", "reps": "2-4 reps", "rest": "N/A", "notes": "Have a training partner help you complete 2-4 additional reps after reaching failure." },
        { "name": "Partial Reps", "sets": "After Failure", "reps": "5-10 reps", "rest": "N/A", "notes": "After full reps, continue the set by performing partials in the strongest part of the range of motion." },
        { "name": "Rest-Pause", "sets": "1 extended set", "reps": "Multiple clusters", "rest": "N/A", "notes": "Take a weight you can do for 6-8 reps. Do as many as you can, rest 15-20 seconds, and repeat until you hit a target total (e.g., 20 reps)." },
        { "name": "Dropsets", "sets": "Last set", "reps": "Multiple drops", "rest": "N/A", "notes": "Immediately reduce the weight after failure and continue repping out. Can be done for multiple drops." },
        { "name": "Feeder Sets", "sets": "Between heavy sets", "reps": "20-30", "rest": "60s", "notes": "On leg day, do a light set of leg extensions between heavy squat sets to increase blood flow and pump." }
      ]
    },
    {
      "name": "Platz-Inspired Training Split (Classic)",
      "exercises": [
        { "name": "Day 1: Legs", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "The most important day. High volume and intensity." },
        { "name": "Day 2: Chest", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Heavy pressing followed by flyes for a stretch." },
        { "name": "Day 3: Back", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Focus on both width (pull-ups) and thickness (rows, deadlifts)." },
        { "name": "Day 4: Rest", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Crucial for recovery after three intense days." },
        { "name": "Day 5: Shoulders", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "All three delt heads with high volume on lateral raises." },
        { "name": "Day 6: Arms", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Biceps and triceps, focusing on peak contraction." },
        { "name": "Day 7: Rest", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Full recovery before repeating the cycle." }
      ]
    },
    {
      "name": "Rich Gaspari - Platz-Inspired Leg Annihilation",
      "exercises": [
        { "name": "Leg Extensions (Pre-Exhaust)", "sets": 4, "reps": "25-30", "rest": "60s", "notes": "Platz method to pre-fatigue quads before heavy compounds." },
        { "name": "Barbell Squats (ATG)", "sets": 5, "reps": "15-20", "rest": "120s", "notes": "Full depth, high reps as taught by Platz for ultimate quad development." },
        { "name": "Hack Squats", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Focus on constant tension and squeezing at the top." },
        { "name": "Lunges", "sets": 4, "reps": "12-15 per leg", "rest": "90s", "notes": "For overall leg development and stability." },
        { "name": "Lying Leg Curls", "sets": 5, "reps": "12-15", "rest": "75s", "notes": "Hamstring focus with Platz-style intensity and squeeze." }
      ]
    },
    {
      "name": "Mike Quinn - Platz Power Building Routine",
      "exercises": [
        { "name": "Squats (Parallel)", "sets": 5, "reps": "5-8", "rest": "180s", "notes": "Heavy power building sets with Platz intensity but slightly higher weight." },
        { "name": "Leg Press (Platz Volume)", "sets": 5, "reps": "20-25", "rest": "90s", "notes": "High-rep volume work to stimulate growth after heavy squats." },
        { "name": "Stiff-Leg Deadlifts", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "For hamstring and glute development with strict form." },
        { "name": "Leg Extensions (Burnout)", "sets": 4, "reps": "20-30", "rest": "60s", "notes": "Complete quad burnout with partials after full reps." },
        { "name": "Seated Calf Raises", "sets": 5, "reps": "15-20", "rest": "45s", "notes": "Platz-style high volume for calf development." }
      ]
    },
    {
      "name": "Laura Creavalle - Platz Metabolic Conditioning",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "15-20", "rest": "90s", "notes": "High-rep metabolic work with perfect Platz form." },
        { "name": "Superset: Leg Extensions & Curls", "sets": 4, "reps": "15-20 each", "rest": "75s", "notes": "No rest between antagonist movements for maximum burn." },
        { "name": "Walking Lunges", "sets": 3, "reps": "20 steps per leg", "rest": "60s", "notes": "Metabolic conditioning with deep stretches." },
        { "name": "Leg Press (High Volume)", "sets": 3, "reps": "25-30", "rest": "75s", "notes": "Extreme reps for fat burning and muscle endurance." }
      ]
    },
    {
      "name": "John DeFendis - Platz Intensity Arm Training",
      "exercises": [
        { "name": "Standing Barbell Curls", "sets": 5, "reps": "8-12", "rest": "75s", "notes": "Strict form with Platz-level mental focus on each rep." },
        { "name": "Incline Dumbbell Curls", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Full stretch at bottom, peak contraction at top." },
        { "name": "Concentration Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Platz-style mind-muscle connection for peak development." },
        { "name": "Close-Grip Bench Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Triceps mass builder with controlled negatives." },
        { "name": "Triceps Pushdowns (Dropsets)", "sets": 4, "reps": "12-15 + drops", "rest": "75s", "notes": "Platz intensity technique to push past failure." },
        { "name": "Overhead Extensions", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Focus on long head stretch and contraction." }
      ]
    }
  ]
},
  {
  "name": "Mike O'Hearn",
  "image": "public/coaches/mike o'hearn.jpg",
  "style": "Power Bodybuilding, Functional Aesthetics, Heavy Compounds, Longevity Training, Joint Health",
  "description": "Iconic fitness model, bodybuilder, and powerlifter known for his legendary physique and incredible longevity. Creator of the 'Power Bodybuilding' system, which combines heavy compound lifting for strength with classic bodybuilding techniques for aesthetics. Focuses on perfect form, progressive overload, and training for a lifetime of health and performance.",
  "achievements": "4-time Mr. Natural Universe, Powerlifting Champion (700+ lb squat, 700+ lb deadlift, 500+ lb bench), renowned fitness model for decades (Titan series, multiple magazine covers), actor, and founder of the Power Bodybuilding system.",
  "career": "With a career spanning over 30 years, Mike O'Hearn has maintained a world-class physique while avoiding major injuries. He is a proponent of training smart, using proper form, and building a body that is not only impressive but also functional and resilient. He coaches clients from all walks of life, from celebrities to everyday fitness enthusiasts.",
  "splits": [
    {
      "name": "Power Bodybuilding Chest Day",
      "exercises": [
        { "name": "Barbell Bench Press", "sets": 5, "reps": "5-8", "rest": "120-180s", "notes": "The cornerstone power movement. Focus on powerful reps with perfect arch and leg drive." },
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Bodybuilding volume for upper chest. Control the negative, explode up." },
        { "name": "Weighted Dips", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "For lower chest and triceps. Lean forward slightly, go deep for a stretch." },
        { "name": "Cable Flyes (High to Low)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Stretch and squeeze for chest detail. Keep constant tension." },
        { "name": "Push-Ups (Burnout)", "sets": 2, "reps": "To Failure", "rest": "60s", "notes": "Finisher for a massive pump and blood flow." }
      ]
    },
    {
      "name": "Power Bodybuilding Back Day",
      "exercises": [
        { "name": "Deadlifts (Conventional or Sumo)", "sets": 3, "reps": "3-5", "rest": "180-240s", "notes": "The ultimate strength and mass builder. Perfect form is non-negotiable." },
        { "name": "Weighted Pull-Ups", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "For back width and strength. Use full range of motion." },
        { "name": "Barbell Rows", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "Builds back thickness. Keep torso at 45 degrees, pull to lower stomach." },
        { "name": "Seated Cable Rows (V-Grip)", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Squeeze shoulder blades together for mid-back detail." },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "For rear delts and upper back health. External rotation at peak." }
      ]
    },
    {
      "name": "Power Bodybuilding Shoulders",
      "exercises": [
        { "name": "Standing Overhead Press (Barbell)", "sets": 5, "reps": "5-8", "rest": "120s", "notes": "Core shoulder strength movement. Brace core, press overhead with power." },
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "For shoulder mass and development. Lower dumbbells to ear level." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Key for shoulder width. Slight bend in elbows, lead with elbows." },
        { "name": "Bent-Over Rear Delt Flyes", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Crucial for 3D shoulders and posture." },
        { "name": "Barbell Shrugs", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "For trap development. Squeeze at the top, controlled lower." }
      ]
    },
    {
      "name": "Power Bodybuilding Leg Day",
      "exercises": [
        { "name": "Barbell Squats (Low Bar)", "sets": 5, "reps": "5-8", "rest": "180s", "notes": "The king of leg exercises. Focus on depth and powerful drive out of the hole." },
        { "name": "Hack Squats", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Quad-focused volume. Different foot positions for complete development." },
        { "name": "Romanian Deadlifts (RDLs)", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "For hamstrings and glutes. Focus on the stretch, keep back flat." },
        { "name": "Leg Press", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Volume work. Use a full range of motion without locking out." },
        { "name": "Leg Extensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Quad isolation and pump. Squeeze at the top." },
        { "name": "Lying Leg Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Hamstring isolation. Focus on the contraction." }
      ]
    },
    {
      "name": "Power Bodybuilding Arms",
      "exercises": [
        { "name": "Close-Grip Bench Press", "sets": 4, "reps": "6-10", "rest": "90s", "notes": "Mass builder for triceps. Elbows tucked, bar to lower chest." },
        { "name": "Standing Barbell Curls", "sets": 4, "reps": "8-12", "rest": "75s", "notes": "Foundational bicep mass. Strict form, no swinging." },
        { "name": "Skull Crushers (EZ-Bar)", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Stretch the long head of the triceps. Control the negative." },
        { "name": "Incline Dumbbell Curls", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Deep stretch for the biceps. Rotate palms up during the curl." },
        { "name": "Triceps Pushdowns (Rope)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Pump finisher. Pull the rope apart at the bottom." },
        { "name": "Hammer Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "For brachialis and forearm development." }
      ]
    },
    {
      "name": "The O'Hearn Power Building Split (Classic)",
      "exercises": [
        { "name": "Day 1: Chest & Triceps", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Heavy bench press followed by volume work for chest and triceps." },
        { "name": "Day 2: Back & Biceps", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Deadlifts or heavy rows, followed by back volume and biceps." },
        { "name": "Day 3: Rest / Active Recovery", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Light cardio, stretching, or complete rest." },
        { "name": "Day 4: Legs", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Heavy squats followed by quad and hamstring volume." },
        { "name": "Day 5: Shoulders & Traps", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Overhead press followed by delt and trap volume." },
        { "name": "Day 6: Rest", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Full recovery." },
        { "name": "Day 7: Rest", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Full recovery before next cycle." }
      ]
    },
    {
      "name": "Mike O'Hearn's 'Titan' Full Body Workout",
      "exercises": [
        { "name": "Squats", "sets": 4, "reps": "8-10", "rest": "120s", "notes": "Start the workout with the most demanding movement." },
        { "name": "Bench Press", "sets": 4, "reps": "8-10", "rest": "120s", "notes": "Upper body power movement." },
        { "name": "Weighted Pull-Ups", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Vertical pulling for back width." },
        { "name": "Overhead Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Shoulder strength and development." },
        { "name": "Barbell Rows", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Horizontal pulling for back thickness." },
        { "name": "Dips", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Triceps and chest finisher." }
      ]
    },
    {
      "name": "O'Hearn Functional Core & Ab Circuit",
      "exercises": [
        { "name": "Hanging Leg Raises", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "For lower abs and hip flexor strength. Raise knees to chest." },
        { "name": "Ab Wheel Rollouts", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Advanced core stability. Do not let lower back sag." },
        { "name": "Cable Crunches", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Focus on crunching abs, not pulling with arms." },
        { "name": "Landmine 180s", "sets": 3, "reps": "8-10 per side", "rest": "60s", "notes": "Rotational core strength and obliques." },
        { "name": "Plank", "sets": 3, "reps": "60 second hold", "rest": "45s", "notes": "Total core stability. Keep body in a straight line." }
      ]
    },
    {
      "name": "The Power Bodybuilding Principles",
      "exercises": [
        { "name": "Strength is the Foundation", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "You can't build a powerful physique without being powerful. Get strong on the big lifts." },
        { "name": "Form is Everything", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Perfect form prevents injury and ensures the target muscles are working. Ego lifting is forbidden." },
        { "name": "Train for Longevity", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "The goal is to train for a lifetime. Listen to your body, manage joint health, and don't be reckless." },
        { "name": "Progressive Overload", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Consistently add small amounts of weight or reps over time. This is the law of growth." },
        { "name": "Balance Power and Volume", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Start with heavy, low-rep compound lifts, then follow with higher-rep bodybuilding work for volume." }
      ]
    },
    {
      "name": "O'Hearn's Joint Health & Mobility Protocol",
      "exercises": [
        { "name": "Shoulder Dislocations (Band)", "sets": 2, "reps": "10-12", "rest": "N/A", "notes": "Improve shoulder mobility and health before upper body days." },
        { "name": "Cat-Cow Stretch", "sets": 2, "reps": "10-12", "rest": "N/A", "notes": "Mobilize the spine before deadlifts and squats." },
        { "name": "Hip Circle Walks", "sets": 2, "reps": "10 steps each way", "rest": "N/A", "notes": "Activate glutes and warm up hips before leg day." },
        { "name": "Wrist Stretches", "sets": 2, "reps": "20 second holds", "rest": "N/A", "notes": "Crucial for bench press and overhead work." },
        { "name": "Deep Squat Hold", "sets": 2, "reps": "30 second hold", "rest": "N/A", "notes": "Improve ankle mobility and squat depth over time." }
      ]
    },
    {
      "name": "Client Workout: Celebrity Aesthetics Program",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Build a camera-ready upper chest with controlled reps." },
        { "name": "Lat Pulldowns (Wide Grip)", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Create the V-taper for a more dramatic silhouette." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "The number one exercise for shoulder width on camera." },
        { "name": "Barbell Squats", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Build legs with a focus on form and muscle engagement over max weight." },
        { "name": "Cable Crunches", "sets": 3, "reps": "20-25", "rest": "45s", "notes": "Develop defined abs for shirtless scenes." }
      ]
    },
    {
      "name": "Client Workout: Football Player Power Program",
      "exercises": [
        { "name": "Box Squats", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Develop explosive power out of the bottom position." },
        { "name": "Power Cleans", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "The ultimate exercise for full-body explosive power." },
        { "name": "Bench Press", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Raw upper body pushing strength." },
        { "name": "Pendlay Rows", "sets": 4, "reps": "5-8", "rest": "120s", "notes": "Explosive back strength from a dead stop." },
        { "name": "Farmers Walks", "sets": 4, "reps": "50 yards", "rest": "90s", "notes": "Grip strength, core stability, and overall toughness." }
      ]
    },
    {
      "name": "Client Workout: Busy Executive Fitness",
      "exercises": [
        { "name": "Goblet Squats", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Squat pattern with core engagement, easy on the spine." },
        { "name": "Dumbbell Bench Press", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Chest strength without a spotter." },
        { "name": "Dumbbell Rows", "sets": 4, "reps": "10-12 per arm", "rest": "75s", "notes": "Correct sitting posture and build back thickness." },
        { "name": "Walking Lunges", "sets": 3, "reps": "10 per leg", "rest": "60s", "notes": "Leg development and mobility." },
        { "name": "Plank", "sets": 3, "reps": "60 second hold", "rest": "45s", "notes": "Counteract sitting and build core stability." }
      ]
    },
    {
      "name": "Client Workout: Female Fitness Model Program",
      "exercises": [
        { "name": "Hip Thrusts", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Build glute strength and shape. Squeeze at the top." },
        { "name": "Romanian Deadlifts", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Lengthen and strengthen hamstrings and glutes." },
        { "name": "Sumo Deadlifts", "sets": 3, "reps": "8-10", "rest": "120s", "notes": "Inner thigh and glute focus." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Create the illusion of a smaller waist with wider shoulders." },
        { "name": "Pull-Assists (Machine)", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Build a strong back and improve posture." }
      ]
    },
    {
      "name": "O'Hearn Strength Phase - Heavy Doubles & Triples",
      "exercises": [
        { "name": "Bench Press (Heavy)", "sets": 6, "reps": "2-3", "rest": "180-240s", "notes": "Focus on maximal strength. Work up to heavy doubles or triples." },
        { "name": "Squats (Heavy)", "sets": 6, "reps": "2-3", "rest": "180-240s", "notes": "Low rep work to build raw leg strength. Perfect form is critical." },
        { "name": "Deadlifts (Heavy)", "sets": 5, "reps": "1-3", "rest": "180-300s", "notes": "Peak strength work. Stop each set with 1-2 reps in reserve for safety." },
        { "name": "Overhead Press (Heavy)", "sets": 5, "reps": "3-5", "rest": "120-180s", "notes": "Build pressing strength standing." },
        { "name": "Weighted Pull-Ups", "sets": 4, "reps": "3-5", "rest": "120s", "notes": "Heavy weighted pulling for back strength." }
      ]
    },
    {
      "name": "O'Hearn Density Training - Chest & Back Supersets",
      "exercises": [
        { "name": "Bench Press & Bent-Over Rows", "sets": 4, "reps": "8-10 each", "rest": "90s", "notes": "Superset pushing and pulling. Builds muscle and work capacity." },
        { "name": "Incline DB Press & T-Bar Rows", "sets": 4, "reps": "10-12 each", "rest": "90s", "notes": "Upper chest and mid-back focus. Controlled tempo." },
        { "name": "Dips & Pull-Ups", "sets": 3, "reps": "Max Reps Each", "rest": "75s", "notes": "Bodyweight strength and endurance superset." },
        { "name": "Cable Flyes & Face Pulls", "sets": 3, "reps": "15-20 each", "rest": "60s", "notes": "Chest stretch and rear delt prehab finisher." }
      ]
    },
    {
      "name": "O'Hearn Athletic Conditioning Circuit",
      "exercises": [
        { "name": "Kettlebell Swings", "sets": 4, "reps": "20", "rest": "60s", "notes": "Hip hinge power and cardiovascular endurance." },
        { "name": "Battle Ropes", "sets": 4, "reps": "30s work", "rest": "45s", "notes": "Upper body conditioning and shoulder endurance." },
        { "name": "Sled Push", "sets": 4, "reps": "40 yards", "rest": "60s", "notes": "Full-body power and leg drive." },
        { "name": "Medicine Ball Slams", "sets": 4, "reps": "15", "rest": "45s", "notes": "Core power and explosive conditioning." },
        { "name": "Farmer's Walks", "sets": 4, "reps": "50 yards", "rest": "60s", "notes": "Grip strength and total body stability." }
      ]
    },
    {
      "name": "O'Hearn Weak Point Training - Arms & Calves",
      "exercises": [
        { "name": "Spider Curls", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Isolate biceps with constant tension against incline bench." },
        { "name": "Overhead Cable Extensions", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Target long head of triceps with peak contraction." },
        { "name": "Reverse Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Forearm and brachialis development." },
        { "name": "Donkey Calf Raises", "sets": 5, "reps": "20-25", "rest": "45s", "notes": "Classic mass builder for calves with deep stretch." },
        { "name": "Seated Calf Raises", "sets": 5, "reps": "15-20", "rest": "45s", "notes": "Target soleus muscle for calf thickness." }
      ]
    },
    {
      "name": "O'Hearn Active Recovery & Mobility Day",
      "exercises": [
        { "name": "Light Prowler Push", "sets": 4, "reps": "40 yards", "rest": "60s", "notes": "Blood flow without muscular fatigue." },
        { "name": "Band Pull-Aparts", "sets": 3, "reps": "20", "rest": "30s", "notes": "Shoulder health and posture." },
        { "name": "Bodyweight Lunges", "sets": 3, "reps": "12 per leg", "rest": "45s", "notes": "Mobility and blood flow to legs." },
        { "name": "Foam Rolling", "sets": "Full Body", "reps": "30-60s per muscle", "rest": "N/A", "notes": "Myofascial release and recovery." },
        { "name": "Dynamic Stretching", "sets": "Full Body", "reps": "10-12 reps per movement", "rest": "N/A", "notes": "Improve range of motion and flexibility." }
      ]
    },
    {
      "name": "Client: MMA Fighter - Power & Endurance",
      "exercises": [
        { "name": "Clean and Press", "sets": 5, "reps": "3-5", "rest": "120s", "notes": "Full-body explosive power for takedowns and clinch work." },
        { "name": "Kettlebell Snatches", "sets": 4, "reps": "8 per arm", "rest": "90s", "notes": "Develop explosive hip power and grip endurance." },
        { "name": "Landmine Rotations", "sets": 4, "reps": "8 per side", "rest": "75s", "notes": "Core rotational strength for punches and throws." },
        { "name": "Sled Drags (Backwards)", "sets": 4, "reps": "40 yards", "rest": "60s", "notes": "Leg strength and cardio for sprawling." },
        { "name": "Battle Ropes (Alternating Waves)", "sets": 4, "reps": "45s work", "rest": "60s", "notes": "Shoulder endurance and grip for grappling." }
      ]
    },
    {
      "name": "Client: Basketball Player - Vertical & Agility",
      "exercises": [
        { "name": "Trap Bar Deadlifts", "sets": 5, "reps": "3-5", "rest": "120s", "notes": "Explosive leg and hip power with less spinal compression." },
        { "name": "Box Jumps", "sets": 5, "reps": "5", "rest": "90s", "notes": "Develop explosive vertical leap." },
        { "name": "Single-Leg RDLs", "sets": 4, "reps": "8 per leg", "rest": "75s", "notes": "Improve balance and unilateral leg strength." },
        { "name": "Lateral Band Walks", "sets": 3, "reps": "15 per side", "rest": "45s", "notes": "Glute medius strength for lateral movement and cutting." },
        { "name": "Depth Jumps", "sets": 4, "reps": "5", "rest": "90s", "notes": "Develop reactive strength for rebounds and quick jumps." }
      ]
    },
    {
      "name": "Client: Military Prep - Strength & Endurance",
      "exercises": [
        { "name": "Strict Pull-Ups", "sets": 5, "reps": "Max Reps", "rest": "90s", "notes": "Build to 20+ reps for military standards." },
        { "name": "Ruck March (Weighted Walks)", "sets": "N/A", "reps": "2-5 miles", "rest": "N/A", "notes": "Carry 45-65 lbs for distance to build endurance." },
        { "name": "Push-Up Pyramids", "sets": "5", "reps": "10-15-20-15-10", "rest": "60s", "notes": "Build push-up endurance and mental toughness." },
        { "name": "Sandbag Clean and Carry", "sets": 4, "reps": "50 yards", "rest": "90s", "notes": "Functional strength and grip for military tasks." },
        { "name": "Burpees", "sets": 4, "reps": "60s Max Effort", "rest": "90s", "notes": "Full-body conditioning and explosive movement." }
      ]
    },
    {
      "name": "Client: Mature Athlete (50+) - Longevity Focus",
      "exercises": [
        { "name": "Goblet Squats", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Safe squat pattern with anterior load to protect spine." },
        { "name": "Incline DB Press", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Shoulder-friendly chest movement." },
        { "name": "TRX Rows", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Scalable back exercise that's easy on the joints." },
        { "name": "Band Pull-Aparts", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Shoulder health and posture correction." },
        { "name": "Farmer's Walks (Light)", "sets": 3, "reps": "40 yards", "rest": "60s", "notes": "Grip strength, core stability, and functional carryover." }
      ]
    }
  ]
},
  {
  "name": "Kris Gethin",
  "image": "public/coaches/kris.jpg",
  "style": "High-Intensity Transformation, DTP Training, Extreme Volume, Mind Over Matter, Strategic Supplementation",
  "description": "World-renowned bodybuilding coach and transformation specialist famous for his brutal 12-week body transformation programs. His training philosophy is built on extreme intensity, high volume, and pushing beyond physical and mental limits. Known for DTP (Dramatic Transformation Principle) training and his 'mind over matter' approach to breaking through plateaus.",
  "achievements": "Creator of the famous 12-Week Hardcore Daily Video Trainer, multiple bodybuilding titles including WBFF Pro, bestselling author, former CEO of Kaged Muscle. Transformed thousands of people through his online coaching and video series.",
  "career": "Over 15 years as a top transformation coach, Kris Gethin has become synonymous with rapid, dramatic physical change. His methods combine scientific training principles with psychological warfare against one's own limitations, creating some of the most intense workout programs in the fitness industry.",
  "splits": [
    {
      "name": "Gethin 12-Week Chest Annihilation",
      "exercises": [
        { "name": "Incline Barbell Press", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Controlled tempo, squeeze at top. First exercise to target upper chest." },
        { "name": "Flat Dumbbell Press", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Full range of motion, deep stretch at bottom." },
        { "name": "Incline Dumbbell Flyes", "sets": 4, "reps": "12-15", "rest": "45s", "notes": "Stretch and squeeze, mind-muscle connection crucial." },
        { "name": "Cable Crossovers", "sets": 4, "reps": "15-20", "rest": "30s", "notes": "Pump finisher, constant tension, squeeze pecs together." },
        { "name": "Push-Ups", "sets": 3, "reps": "To Failure", "rest": "30s", "notes": "Blood flow and burnout. No excuses." }
      ]
    },
    {
      "name": "Gethin Back Destruction",
      "exercises": [
        { "name": "Wide-Grip Pull-Ups", "sets": 4, "reps": "To Failure", "rest": "60s", "notes": "If can't do bodyweight, use assisted machine. Go until failure every set." },
        { "name": "Barbell Rows", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Explosive pull, squeeze shoulder blades, controlled negative." },
        { "name": "Seated Cable Rows (Close Grip)", "sets": 4, "reps": "12-15", "rest": "45s", "notes": "Squeeze mid-back, don't use momentum." },
        { "name": "Straight-Arm Pulldowns", "sets": 4, "reps": "15-20", "rest": "30s", "notes": "Lat isolation, focus on stretch and squeeze." },
        { "name": "Hyperextensions", "sets": 3, "reps": "15-20", "rest": "30s", "notes": "Lower back development and spinal erectors." }
      ]
    },
    {
      "name": "Gethin Shoulder Torment",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Go heavy but controlled. Don't lock out to keep tension." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "15-20", "rest": "45s", "notes": "Light weight, perfect form. Raise to shoulder height." },
        { "name": "Bent-Over Rear Delt Raises", "sets": 4, "reps": "15-20", "rest": "45s", "notes": "Crucial for 3D shoulders. Squeeze rear delts." },
        { "name": "Front Plate Raises", "sets": 4, "reps": "15-20", "rest": "30s", "notes": "Anterior delt focus. Keep arms straight." },
        { "name": "Upright Rows (EZ-Bar)", "sets": 3, "reps": "12-15", "rest": "30s", "notes": "Wide grip to target delts. Pull to chin level." }
      ]
    },
    {
      "name": "Gethin Arm Annihilation",
      "exercises": [
        { "name": "Standing Barbell Curls", "sets": 4, "reps": "12-15", "rest": "45s", "notes": "Strict form, no swinging. Squeeze at top." },
        { "name": "Incline Dumbbell Curls", "sets": 4, "reps": "12-15", "rest": "45s", "notes": "Deep stretch at bottom, supinate during curl." },
        { "name": "Hammer Curls", "sets": 4, "reps": "12-15", "rest": "30s", "notes": "Brachialis development for arm thickness." },
        { "name": "Close-Grip Bench Press", "sets": 4, "reps": "12-15", "rest": "45s", "notes": "Mass builder for triceps. Elbows tucked." },
        { "name": "Triceps Pushdowns (Straight Bar)", "sets": 4, "reps": "15-20", "rest": "30s", "notes": "Squeeze triceps at bottom, controlled negative." },
        { "name": "Overhead Dumbbell Extensions", "sets": 4, "reps": "12-15", "rest": "30s", "notes": "Stretch long head of triceps." }
      ]
    },
    {
      "name": "Gethin Leg Torture",
      "exercises": [
        { "name": "Barbell Squats", "sets": 5, "reps": "12-15", "rest": "90s", "notes": "Go to parallel or below. Controlled descent, explosive up." },
        { "name": "Leg Press", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Different foot positions for complete quad development." },
        { "name": "Walking Lunges", "sets": 4, "reps": "12-15 per leg", "rest": "60s", "notes": "Deep stretch on each step, controlled movement." },
        { "name": "Leg Extensions", "sets": 4, "reps": "15-20", "rest": "45s", "notes": "Squeeze at top, controlled negative. Burnout." },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "12-15", "rest": "45s", "notes": "Hamstring focus, squeeze at top." },
        { "name": "Standing Calf Raises", "sets": 5, "reps": "20-25", "rest": "30s", "notes": "Full range of motion, stretch and squeeze." }
      ]
    },
    {
      "name": "DTP (Dramatic Transformation Principle) Chest",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": "1 giant set", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "Pyramid: 10 reps (heavy), 50 reps (light), 10 reps (heavy). One giant set = 70 total reps." },
        { "name": "Flat Bench Press", "sets": "1 giant set", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "Same protocol. Extreme volume and intensity." },
        { "name": "Cable Crossovers", "sets": "1 giant set", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "Finisher. Prepare for extreme muscle soreness." }
      ]
    },
    {
      "name": "DTP Back Obliteration",
      "exercises": [
        { "name": "Lat Pulldowns", "sets": "1 giant set", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "10 heavy reps, 50 light reps, 10 heavy reps per pyramid." },
        { "name": "Seated Cable Rows", "sets": "1 giant set", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "Squeeze with each rep. Mind-muscle connection crucial." },
        { "name": "Straight-Arm Pulldowns", "sets": "1 giant set", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "Lat isolation to complete the destruction." }
      ]
    },
    {
      "name": "Gethin Cardio Acceleration Protocol",
      "exercises": [
        { "name": "HIIT Sprints", "sets": "10-15", "reps": "30s sprint / 60s walk", "rest": "Active rest", "notes": "Post-workout fat burning. Maximum effort during sprints." },
        { "name": "Stairmaster", "sets": "1", "reps": "20-30 minutes", "rest": "N/A", "notes": "Steady state for endurance. Maintain 130-150 BPM heart rate." },
        { "name": "Battle Ropes", "sets": "10", "reps": "30s work / 30s rest", "rest": "Active rest", "notes": "Full-body metabolic conditioning." },
        { "name": "Air Bike", "sets": "1", "reps": "45 minutes", "rest": "N/A", "notes": "Low-impact fasted cardio in the morning." }
      ]
    },
    {
      "name": "Gethin Ab Shredding Circuit",
      "exercises": [
        { "name": "Hanging Leg Raises", "sets": 4, "reps": "15-20", "rest": "30s", "notes": "Knees to chest for lower abs. Controlled movement." },
        { "name": "Cable Crunches", "sets": 4, "reps": "20-25", "rest": "30s", "notes": "Crunch down, don't pull with arms. Squeeze abs." },
        { "name": "Russian Twists", "sets": 3, "reps": "20 per side", "rest": "30s", "notes": "Oblique work. Use weight for resistance." },
        { "name": "Plank", "sets": 3, "reps": "60 second hold", "rest": "30s", "notes": "Total core stability. Keep body straight." }
      ]
    },
    {
      "name": "Gethin's Training Principles",
      "exercises": [
        { "name": "Mind Over Matter", "sets": "Every workout", "reps": "Constant", "rest": "N/A", "notes": "Your mind will give up before your body. Push through the pain barrier." },
        { "name": "Progressive Overload", "sets": "Every session", "reps": "Increase weekly", "rest": "N/A", "notes": "Add weight, reps, or decrease rest time each week." },
        { "name": "No Comfort Zone", "sets": "All sets", "reps": "Beyond failure", "rest": "N/A", "notes": "Training should be uncomfortable. If it's easy, you're not growing." },
        { "name": "Strategic Intensity Techniques", "sets": "Last sets", "reps": "Varied", "rest": "N/A", "notes": "Use drop sets, forced reps, partials to extend sets beyond failure." },
        { "name": "Consistency is King", "sets": "Daily", "reps": "Non-negotiable", "rest": "N/A", "notes": "Missed workouts are missed opportunities. 100% compliance required." }
      ]
    },
    {
      "name": "Gethin Intensity Techniques",
      "exercises": [
        { "name": "Drop Sets", "sets": "Last set", "reps": "Continue after failure", "rest": "No rest", "notes": "Immediately reduce weight by 20-30% and continue to failure. Repeat 2-3 times." },
        { "name": "Forced Reps", "sets": "Last set", "reps": "2-4 extra reps", "rest": "N/A", "notes": "Training partner helps you complete 2-4 reps after failure." },
        { "name": "Rest-Pause", "sets": "1 extended set", "reps": "Multiple clusters", "rest": "15-20s", "notes": "Take 15-20 second breaks within a set to extend total reps." },
        { "name": "Partial Reps", "sets": "After failure", "reps": "5-10 reps", "rest": "N/A", "notes": "After full reps, continue with partials in strongest range of motion." },
        { "name": "Supersets", "sets": "All sets", "reps": "Back-to-back", "rest": "After pair", "notes": "Perform two exercises back-to-back with no rest between." }
      ]
    },
    {
      "name": "12-Week Transformation Split",
      "exercises": [
        { "name": "Day 1: Chest & Cardio", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Chest workout followed by 20 minutes HIIT cardio." },
        { "name": "Day 2: Back & Calves", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Back destruction with calf specialization." },
        { "name": "Day 3: Shoulders & Cardio", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Shoulder torment followed by 20 minutes HIIT." },
        { "name": "Day 4: Legs", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Leg torture - most demanding day." },
        { "name": "Day 5: Arms & Cardio", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Arm annihilation followed by 20 minutes HIIT." },
        { "name": "Day 6: Active Recovery", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Light cardio, stretching, foam rolling." },
        { "name": "Day 7: Rest", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Complete rest for recovery." }
      ]
    },
    {
      "name": "Client: Extreme Fat Loss Transformation",
      "exercises": [
        { "name": "Full Body Circuit (3 rounds)", "sets": 3, "reps": "15-20 each", "rest": "60s between rounds", "notes": "Squats, Bench Press, Bent-Over Rows, Overhead Press, Lunges. Maximum calorie burn." },
        { "name": "HIIT Cardio", "sets": "15", "reps": "30s sprint/60s walk", "rest": "Active rest", "notes": "Post-workout fat incineration." },
        { "name": "Ab Circuit", "sets": 3, "reps": "20 each exercise", "rest": "30s between exercises", "notes": "Crunches, Leg Raises, Plank (60s)." },
        { "name": "Fasted AM Cardio", "sets": "1", "reps": "45 minutes", "rest": "N/A", "notes": "Low-intensity steady state upon waking." }
      ]
    },
    {
      "name": "Client: Hardgainer Mass Program",
      "exercises": [
        { "name": "Heavy Compound Movements", "sets": "4-5", "reps": "6-8", "rest": "120s", "notes": "Squats, Deadlifts, Bench Press, Rows. Focus on progressive overload." },
        { "name": "Accessory Volume", "sets": "3-4", "reps": "10-12", "rest": "75s", "notes": "Isolation work after compounds for complete development." },
        { "name": "Limited Cardio", "sets": "2-3x weekly", "reps": "20 minutes", "rest": "N/A", "notes": "Just enough for cardiovascular health, not enough to burn excess calories." },
        { "name": "Gethin 8x8 Protocol", "sets": "8", "reps": "8", "rest": "45s", "notes": "For stubborn muscle groups. One weight for all 8 sets." }
      ]
    },
    {
      "name": "Client: Contest Prep Peak Week",
      "exercises": [
        { "name": "High-Rep Depletion Workouts", "sets": "4-5", "reps": "20-25", "rest": "45s", "notes": "Early week to deplete glycogen stores." },
        { "name": "Pose Practice", "sets": "Daily", "reps": "30-45 minutes", "rest": "N/A", "notes": "Mandatory posing practice to perfect mandatory poses." },
        { "name": "Light Pump Work", "sets": "2-3", "reps": "15-20", "rest": "60s", "notes": "Day before show - just enough to get a pump without fatigue." },
        { "name": "Carb Loading Protocol", "sets": "Strategic", "reps": "Timed", "rest": "N/A", "notes": "Precise carbohydrate timing to fill muscles for show day." }
      ]
    },
    {
      "name": "Client: Time-Crunch Executive Program",
      "exercises": [
        { "name": "DTP Full Body", "sets": "3 exercises", "reps": "10-50-10", "rest": "60s between pyramids", "notes": "One compound exercise per body part in DTP format for maximum efficiency." },
        { "name": "Metabolic Conditioning", "sets": "1", "reps": "20 minutes", "rest": "N/A", "notes": "Combined with weights for time efficiency." },
        { "name": "Superset Everything", "sets": "All exercises", "reps": "10-15", "rest": "45s after pair", "notes": "Push/pull supersets to cut workout time in half." },
        { "name": "Morning Fast Training", "sets": "N/A", "reps": "45 minutes total", "rest": "N/A", "notes": "Complete entire workout fasted first thing in morning." }
      ]
    },
    {
      "name": "Gethin Post-Injury Rehab Protocol",
      "exercises": [
        { "name": "Light Resistance Band Work", "sets": "3-4", "reps": "15-20", "rest": "60s", "notes": "Activate muscles without heavy loading." },
        { "name": "Blood Flow Restriction (BFR)", "sets": "4", "reps": "30-15-15-15", "rest": "30s", "notes": "Light weight with occlusion to stimulate growth without heavy loads." },
        { "name": "Full Range of Motion", "sets": "All exercises", "reps": "Controlled", "rest": "N/A", "notes": "Focus on perfect form and complete movement patterns." },
        { "name": "Gradual Progressive Overload", "sets": "Weekly", "reps": "Slight increases", "rest": "N/A", "notes": "Very small weight increases weekly to rebuild strength safely." }
      ]
    },
    {
      "name": "Gethin Mindset Training Protocol",
      "exercises": [
        { "name": "Visualization", "sets": "Daily", "reps": "10 minutes", "rest": "N/A", "notes": "Visualize successful workouts and your ideal physique." },
        { "name": "Goal Setting", "sets": "Weekly", "reps": "Specific targets", "rest": "N/A", "notes": "Set specific, measurable weekly goals." },
        { "name": "Positive Self-Talk", "sets": "During workouts", "reps": "Constant", "rest": "N/A", "notes": "Replace negative thoughts with positive affirmations." },
        { "name": "Embrace Discomfort", "sets": "Every set", "reps": "Accept pain", "rest": "N/A", "notes": "Learn to welcome and push through the burning sensation." }
      ]
    },
    {
      "name": "Gethin Full Body DTP Shock",
      "exercises": [
        { "name": "Barbell Squats (DTP)", "sets": "1 giant set", "reps": "10-50-10", "rest": "90s between pyramids", "notes": "Extreme leg volume. Prepare for maximum soreness." },
        { "name": "Bench Press (DTP)", "sets": "1 giant set", "reps": "10-50-10", "rest": "90s between pyramids", "notes": "Chest destruction with massive volume." },
        { "name": "Lat Pulldowns (DTP)", "sets": "1 giant set", "reps": "10-50-10", "rest": "90s between pyramids", "notes": "Back width and thickness in one brutal set." },
        { "name": "Overhead Press (DTP)", "sets": "1 giant set", "reps": "10-50-10", "rest": "90s between pyramids", "notes": "Shoulder annihilator. Light weight for 50 reps is brutal." }
      ]
    },
    {
      "name": "Gethin Metabolic Conditioning Circuit",
      "exercises": [
        { "name": "Kettlebell Swings", "sets": 4, "reps": "20", "rest": "30s", "notes": "Explosive hip hinge for posterior chain and cardio." },
        { "name": "Burpees", "sets": 4, "reps": "15", "rest": "30s", "notes": "Full body metabolic conditioner. No rest at bottom." },
        { "name": "Battle Ropes (Double Waves)", "sets": 4, "reps": "45s work", "rest": "30s", "notes": "Shoulder endurance and grip strength." },
        { "name": "Box Jumps", "sets": 4, "reps": "12", "rest": "30s", "notes": "Explosive power and leg endurance." },
        { "name": "Medicine Ball Slams", "sets": 4, "reps": "15", "rest": "30s", "notes": "Core power and full body extension." }
      ]
    },
    {
      "name": "Gethin Weak Point Training - Chest & Back",
      "exercises": [
        { "name": "Incline Barbell Press (Drop Sets)", "sets": 5, "reps": "10-12 + drops", "rest": "75s", "notes": "3 drop sets on final set. Destroy upper chest." },
        { "name": "Weighted Dips", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Lower chest focus. Go deep for stretch." },
        { "name": "Pec Deck Flyes (Rest-Pause)", "sets": 4, "reps": "15 + 3 clusters", "rest": "45s", "notes": "Rest-pause technique for maximum fiber recruitment." },
        { "name": "Wide-Grip Pull-Ups (Weighted)", "sets": 5, "reps": "6-10", "rest": "75s", "notes": "Back width builder. Add weight for progressive overload." },
        { "name": "T-Bar Rows", "sets": 4, "reps": "10-12", "rest": "60s", "notes": "Back thickness. Squeeze at top." },
        { "name": "Straight-Arm Pulldowns (Drop Sets)", "sets": 4, "reps": "15-20 + drops", "rest": "45s", "notes": "Lat isolation with drop sets on final set." }
      ]
    },
    {
      "name": "Gethin Weak Point Training - Arms",
      "exercises": [
        { "name": "Preacher Curls (21s)", "sets": 4, "reps": "21s method", "rest": "60s", "notes": "7 bottom half, 7 top half, 7 full reps. Bicep destroyer." },
        { "name": "Incline Dumbbell Curls (Drop Sets)", "sets": 4, "reps": "10-12 + drops", "rest": "60s", "notes": "Deep stretch with drop sets on final set." },
        { "name": "Concentration Curls", "sets": 3, "reps": "12-15", "rest": "45s", "notes": "Peak contraction. Squeeze hard at top." },
        { "name": "Close-Grip Bench Press (Rest-Pause)", "sets": 4, "reps": "8-10 + clusters", "rest": "75s", "notes": "Triceps mass builder with rest-pause." },
        { "name": "Overhead Rope Extensions", "sets": 4, "reps": "15-20", "rest": "45s", "notes": "Long head focus. Stretch at bottom." },
        { "name": "Reverse Grip Pushdowns", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Target medial head of triceps." }
      ]
    },
    {
      "name": "Gethin Pre-Contest Peak Week Training",
      "exercises": [
        { "name": "High-Rep Full Body Circuit", "sets": 3, "reps": "20-25 each", "rest": "30s between exercises", "notes": "Glycogen depletion workout early in peak week." },
        { "name": "Light Pump Work - Chest", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Day before show - just enough to get a pump." },
        { "name": "Light Pump Work - Back", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Focus on muscle-mind connection, not intensity." },
        { "name": "Light Pump Work - Arms", "sets": 2, "reps": "15-20", "rest": "45s", "notes": "Get a pump without causing fatigue." },
        { "name": "Posing Practice", "sets": "Multiple", "reps": "30-45 minutes", "rest": "As needed", "notes": "Mandatory poses until they're perfect." }
      ]
    },
    {
      "name": "Client: Female Bikini Competitor Program",
      "exercises": [
        { "name": "Glute Focused Lunges", "sets": 4, "reps": "15-20 per leg", "rest": "60s", "notes": "Deep stretch for glute activation." },
        { "name": "Hip Thrusts", "sets": 5, "reps": "12-15", "rest": "75s", "notes": "Glute builder. Squeeze at top for peak contraction." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "15-20", "rest": "45s", "notes": "Shoulder width for hourglass illusion." },
        { "name": "Lat Pulldowns", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Back development for V-taper." },
        { "name": "High-Rep Cardio", "sets": "Daily", "reps": "45-60 minutes", "rest": "N/A", "notes": "Steady state for fat loss without muscle loss." }
      ]
    },
    {
      "name": "Client: Masters Athlete (50+) Program",
      "exercises": [
        { "name": "Goblet Squats", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Knee-friendly squat variation with core engagement." },
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Shoulder-friendly chest movement." },
        { "name": "Seated Cable Rows", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Back thickness with supported position." },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Shoulder health and posture." },
        { "name": "Walking", "sets": "Daily", "reps": "30-45 minutes", "rest": "N/A", "notes": "Low-impact cardio for joint health." }
      ]
    },
    {
      "name": "Client: Strength Athlete Hybrid Program",
      "exercises": [
        { "name": "Heavy Squats", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Strength focus with low reps." },
        { "name": "Heavy Bench Press", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Powerlifting style with arch and leg drive." },
        { "name": "Bodybuilding Accessory Work", "sets": "3-4", "reps": "10-15", "rest": "60s", "notes": "Hypertrophy work after heavy compounds." },
        { "name": "Conditioning Work", "sets": "2-3 weekly", "reps": "20 minutes", "rest": "N/A", "notes": "Maintain cardiovascular health without interfering with recovery." }
      ]
    },
    {
      "name": "Client: Youth Athletic Development Program",
      "exercises": [
        { "name": "Bodyweight Squats", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Perfect form foundation." },
        { "name": "Push-Ups", "sets": 4, "reps": "Max Reps", "rest": "60s", "notes": "Upper body pushing strength." },
        { "name": "Bodyweight Rows", "sets": 4, "reps": "Max Reps", "rest": "60s", "notes": "Back development with bodyweight." },
        { "name": "Plank", "sets": 3, "reps": "60 second hold", "rest": "45s", "notes": "Core stability foundation." },
        { "name": "Jump Rope", "sets": "1", "reps": "10 minutes", "rest": "N/A", "notes": "Coordination and cardiovascular health." }
      ]
    }
  ]
},
  {
  "name": "Scott Abel",
  "image": "public/coaches/abel.jpg",
  "style": "Periodization Master, Anti-Adaptation, Strategic Overtraining, Hormonal Optimization, Mind-Body Connection",
  "description": "Renowned bodybuilding theorist and coach known for his intellectual, scientific approach to training. Developed the 'Abel Approach' focusing on periodization, avoiding muscle adaptation, and working with the body's hormonal and nervous system responses. Emphasizes training variability and strategic overtraining phases to trigger growth responses.",
  "achievements": "One of the most respected theorists in bodybuilding, coach to countless champions and professionals. Author of 'The Abel Approach' and numerous training publications. Known for revolutionizing how athletes think about training frequency, volume, and recovery.",
  "career": "Over 40 years of coaching experience, Scott Abel has become the 'coach's coach' - known for his deep understanding of training physiology and psychology. His methods often contradict conventional wisdom, focusing on individual response patterns rather than one-size-fits-all programs.",
  "splits": [
    {
      "name": "Abel Approach Chest - Neural Phase",
      "exercises": [
        { "name": "Incline Barbell Press", "sets": 3, "reps": "4-6", "rest": "180s", "notes": "Heavy neural work. Focus on power and speed of movement." },
        { "name": "Flat Dumbbell Press", "sets": 3, "reps": "6-8", "rest": "120s", "notes": "Moderate weight with perfect control. Stop 1-2 reps short of failure." },
        { "name": "Low Cable Crossovers", "sets": 2, "reps": "12-15", "rest": "60s", "notes": "Pump work only. Light weight for blood flow, not muscle damage." }
      ]
    },
    {
      "name": "Abel Approach Chest - Hypertrophy Phase",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Moderate weight with stretch focus. Control negative." },
        { "name": "Hammer Strength Press", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Machine for constant tension. Squeeze at top." },
        { "name": "Pec Deck Flyes", "sets": 3, "reps": "12-20", "rest": "60s", "notes": "High reps for metabolic stress. Focus on squeeze." },
        { "name": "Push-Ups", "sets": 2, "reps": "To Failure", "rest": "45s", "notes": "Finisher for complete exhaustion." }
      ]
    },
    {
      "name": "Abel Approach Back - Width Emphasis",
      "exercises": [
        { "name": "Wide-Grip Pull-Ups", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Focus on lat stretch at bottom, squeeze at top." },
        { "name": "Straight-Arm Pulldowns", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Lat isolation. Keep arms straight, focus on stretch." },
        { "name": "Reverse Grip Pulldowns", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Lower lats and biceps. Squeeze shoulder blades." },
        { "name": "Rack Pulls (Above Knee)", "sets": 3, "reps": "8-10", "rest": "120s", "notes": "Upper back and trap focus. Explosive concentric." }
      ]
    },
    {
      "name": "Abel Approach Back - Thickness Emphasis",
      "exercises": [
        { "name": "Barbell Rows", "sets": 4, "reps": "6-8", "rest": "120s", "notes": "Heavy for mid-back thickness. Maintain 45-degree angle." },
        { "name": "T-Bar Rows", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Squeeze at contraction. Controlled negative." },
        { "name": "Seated Cable Rows (Close Grip)", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Rhomboid and lower trap focus." },
        { "name": "Hyperextensions", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Lower back and spinal erectors. Bodyweight only for health." }
      ]
    },
    {
      "name": "Abel Approach Shoulders - Full Spectrum",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Overall delt mass. Don't lock out to keep tension." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "12-20", "rest": "60s", "notes": "Light weight, perfect form. Raise to shoulder height only." },
        { "name": "Bent-Over Rear Delt Raises", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Crucial for shoulder health and 3D appearance." },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Rear delt and rotator cuff health. External rotation." }
      ]
    },
    {
      "name": "Abel Approach Arms - Density Training",
      "exercises": [
        { "name": "Close-Grip Bench Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Triceps mass builder. Elbows tucked, bar to lower chest." },
        { "name": "Standing EZ-Bar Curls", "sets": 4, "reps": "8-12", "rest": "75s", "notes": "Bicep mass. Strict form, no swinging." },
        { "name": "Overhead Rope Extensions", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Long head focus. Stretch at bottom." },
        { "name": "Incline Dumbbell Curls", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Bicep stretch. Supinate during curl." },
        { "name": "Pushdowns (Various Attachments)", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Triceps detail. Change attachments weekly." }
      ]
    },
    {
      "name": "Abel Approach Legs - Quad Dominant",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Controlled depth. Explosive up, controlled down." },
        { "name": "Leg Press", "sets": 4, "reps": "12-20", "rest": "90s", "notes": "Volume work. Different foot positions each week." },
        { "name": "Leg Extensions", "sets": 4, "reps": "15-25", "rest": "60s", "notes": "Quad isolation. Squeeze at top, controlled negative." },
        { "name": "Walking Lunges", "sets": 3, "reps": "10-12 per leg", "rest": "75s", "notes": "Unilateral work. Deep stretch each step." },
        { "name": "Lying Leg Curls", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Hamstring complement. Squeeze at top." }
      ]
    },
    {
      "name": "Abel Approach Legs - Posterior Chain",
      "exercises": [
        { "name": "Romanian Deadlifts", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Hamstring and glute focus. Maintain flat back, feel stretch." },
        { "name": "Glute-Ham Raises", "sets": 4, "reps": "8-15", "rest": "90s", "notes": "Posterior chain developer. Use assistance if needed." },
        { "name": "Good Mornings", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Spinal erectors and hamstrings. Light weight, perfect form." },
        { "name": "Seated Leg Curls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Hamstring detail. Focus on contraction." },
        { "name": "45-Degree Back Extensions", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Glute and hamstring activation. Squeeze at top." }
      ]
    },
    {
      "name": "The Abel Approach Principles",
      "exercises": [
        { "name": "Avoid Adaptation", "sets": "Constant", "reps": "Varied", "rest": "N/A", "notes": "Change exercises, reps, sets, and intensity frequently to prevent muscle adaptation." },
        { "name": "Strategic Overtraining", "sets": "Planned phases", "reps": "High volume", "rest": "N/A", "notes": "Use short periods of overtraining to trigger supercompensation during deload." },
        { "name": "Hormonal Optimization", "sets": "Strategic", "reps": "Varied", "rest": "N/A", "notes": "Time training to work with natural hormone fluctuations rather than against them." },
        { "name": "Nervous System Management", "sets": "All training", "reps": "Appropriate", "rest": "N/A", "notes": "Heavy training taxes CNS - manage volume and frequency accordingly." },
        { "name": "Individual Response Patterns", "sets": "Personalized", "reps": "Personalized", "rest": "N/A", "notes": "There is no universal best program - only what works for the individual." }
      ]
    },
    {
      "name": "Abel Periodization Model",
      "exercises": [
        { "name": "Neural Phase (2-3 weeks)", "sets": "3-4", "reps": "4-8", "rest": "Long", "notes": "Heavy weights, low reps. Focus on strength and power." },
        { "name": "Hypertrophy Phase (3-4 weeks)", "sets": "3-4", "reps": "8-15", "rest": "Moderate", "notes": "Moderate weights, metabolic stress. Muscle growth focus." },
        { "name": "Density Phase (2 weeks)", "sets": "4-5", "reps": "15-25", "rest": "Short", "notes": "High volume, short rest. Muscle endurance and pump." },
        { "name": "Strategic Overtraining (1 week)", "sets": "5-6", "reps": "Varied", "rest": "Varied", "notes": "Extreme volume and frequency to trigger growth response." },
        { "name": "Deload (1 week)", "sets": "2-3", "reps": "10-15", "rest": "Long", "notes": "Light weights, low volume. Recovery and supercompensation." }
      ]
    },
    {
      "name": "Abel Training Frequency Model",
      "exercises": [
        { "name": "High Frequency (Advanced)", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Hit each muscle group 2-3x per week with varied volume and intensity." },
        { "name": "Moderate Frequency (Intermediate)", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Each muscle group 1.5x per week. Good for most trainees." },
        { "name": "Low Frequency (Beginner)", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Once per week frequency while learning form and recovering." },
        { "name": "Variable Frequency", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Change frequency every 4-6 weeks to prevent adaptation." }
      ]
    },
    {
      "name": "Abel Exercise Selection Principles",
      "exercises": [
        { "name": "Compound Foundations", "sets": "Priority", "reps": "Varied", "rest": "N/A", "notes": "Squats, presses, rows, pulls form the foundation." },
        { "name": "Isolation Supplement", "sets": "Secondary", "reps": "Higher", "rest": "N/A", "notes": "Use isolation work to target specific weak points." },
        { "name": "Exercise Rotation", "sets": "Frequent", "reps": "N/A", "rest": "N/A", "notes": "Change 30-50% of exercises every 2-4 weeks." },
        { "name": "Movement Patterns Over Exercises", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Focus on covering all movement patterns rather than specific exercises." }
      ]
    },
    {
      "name": "Client: Hardgainer Mass Program",
      "exercises": [
        { "name": "Lower Frequency Training", "sets": "3-4", "reps": "6-10", "rest": "120s", "notes": "Train each muscle group once weekly to allow maximum recovery." },
        { "name": "Heavy Compound Focus", "sets": "Priority", "reps": "Low", "rest": "Long", "notes": "Emphasis on squats, deadlifts, presses with progressive overload." },
        { "name": "Limited Accessory Work", "sets": "2-3", "reps": "10-15", "rest": "75s", "notes": "Just enough isolation work to support compound movements." },
        { "name": "Calorie Surplus", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Focus on nutrition - cannot out-train inadequate calories." }
      ]
    },
    {
      "name": "Client: Advanced Plateau Buster",
      "exercises": [
        { "name": "High Frequency Shock", "sets": "Varied", "reps": "Varied", "rest": "Varied", "notes": "Hit each muscle group 3x weekly with different rep ranges each session." },
        { "name": "Strategic Overtraining Week", "sets": "5-6", "reps": "10-20", "rest": "Short", "notes": "One week of extreme volume to trigger new growth." },
        { "name": "Exercise Complete Change", "sets": "All new", "reps": "Varied", "rest": "N/A", "notes": "Change 100% of exercises for 4 weeks to break adaptation." },
        { "name": "Intensity Techniques", "sets": "Last sets", "reps": "Beyond failure", "rest": "N/A", "notes": "Use drop sets, rest-pause, forced reps strategically." }
      ]
    },
    {
      "name": "Client: Masters Athlete (50+)",
      "exercises": [
        { "name": "Lower Volume", "sets": "2-3", "reps": "8-15", "rest": "90s", "notes": "Reduced volume to manage recovery capacity." },
        { "name": "Higher Frequency", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "More frequent, shorter sessions rather than marathon workouts." },
        { "name": "Joint-Friendly Exercises", "sets": "All", "reps": "Controlled", "rest": "N/A", "notes": "Machines, cables, dumbbells preferred over heavy barbells." },
        { "name": "Extended Warm-ups", "sets": "Thorough", "reps": "10-15", "rest": "N/A", "notes": "Longer warm-up sets and mobility work." }
      ]
    },
    {
      "name": "Client: Contest Prep Peak",
      "exercises": [
        { "name": "Maintain Strength Work", "sets": "2-3", "reps": "6-10", "rest": "120s", "notes": "Keep some heavy work to maintain muscle mass while dieting." },
        { "name": "High-Rep Pump Work", "sets": "3-4", "reps": "15-25", "rest": "45s", "notes": "Add high-rep work for muscle fullness and detail." },
        { "name": "Reduce Volume Gradually", "sets": "Decreasing", "reps": "Maintained", "rest": "N/A", "notes": "Lower volume weekly while maintaining intensity." },
        { "name": "Peak Week Manipulation", "sets": "Strategic", "reps": "Varied", "rest": "N/A", "notes": "Precise training, water, and carb manipulation for show day." }
      ]
    },
    {
      "name": "Abel Mind-Muscle Connection Protocol",
      "exercises": [
        { "name": "Visualization Pre-Set", "sets": "Every set", "reps": "Mental reps", "rest": "N/A", "notes": "Visualize the muscle working before each set." },
        { "name": "Light Activation Sets", "sets": "1-2", "reps": "15-20", "rest": "30s", "notes": "Very light sets to establish connection before working sets." },
        { "name": "Tempo Control", "sets": "All reps", "reps": "3-1-3", "rest": "N/A", "notes": "3 second negative, 1 second pause, 3 second positive." },
        { "name": "Touch Cues", "sets": "During sets", "reps": "As needed", "rest": "N/A", "notes": "Lightly touch target muscle to enhance mind-muscle connection." }
      ]
    },
    {
      "name": "Abel Recovery Enhancement Protocol",
      "exercises": [
        { "name": "Active Recovery Days", "sets": "Light", "reps": "12-15", "rest": "60s", "notes": "Very light workouts to promote blood flow without fatigue." },
        { "name": "Contrast Showers", "sets": "Daily", "reps": "3 cycles", "rest": "N/A", "notes": "Hot-cold contrast to improve circulation and recovery." },
        { "name": "Sleep Optimization", "sets": "Nightly", "reps": "7-9 hours", "rest": "N/A", "notes": "Prioritize sleep quality and duration for recovery." },
        { "name": "Strategic De-Loads", "sets": "Scheduled", "reps": "Reduced", "rest": "N/A", "notes": "Regular planned reduction in training stress." }
      ]
    },
    {
      "name": "Abel Weak Point Training System",
      "exercises": [
        { "name": "Priority Training", "sets": "First in workout", "reps": "Varied", "rest": "N/A", "notes": "Train weak points first when energy and focus are highest." },
        { "name": "Increased Frequency", "sets": "2-3x weekly", "reps": "Varied", "rest": "N/A", "notes": "Hit weak points more frequently than other body parts." },
        { "name": "Multiple Angles", "sets": "3-4 exercises", "reps": "Varied", "rest": "N/A", "notes": "Attack weak points from different angles in same workout." },
        { "name": "Extended Time Focus", "sets": "8-12 weeks", "reps": "N/A", "rest": "N/A", "notes": "Focus on weak points for extended periods before re-evaluating." }
      ]
    },
    {
      "name": "Abel Strategic Overtraining Protocol",
      "exercises": [
        { "name": "Planned Overtraining Week", "sets": "5-6", "reps": "10-20", "rest": "30-45s", "notes": "One week of extreme volume and frequency." },
        { "name": "Multiple Daily Sessions", "sets": "2x daily", "reps": "Varied", "rest": "N/A", "notes": "Split volume into two daily sessions during overtraining phase." },
        { "name": "High Exercise Variety", "sets": "6-8 exercises", "reps": "Varied", "rest": "N/A", "notes": "Use many different exercises to target muscles completely." },
        { "name": "Immediate Deload Following", "sets": "2-3", "reps": "10-15", "rest": "Long", "notes": "Follow overtraining week with immediate deload for supercompensation." }
      ]
    },
    {
      "name": "Client: Female Hormonal Optimization",
      "exercises": [
        { "name": "Cycle-Based Training", "sets": "Varied", "reps": "Varied", "rest": "N/A", "notes": "Adjust training intensity and volume based on menstrual cycle phases." },
        { "name": "Higher Rep Ranges", "sets": "3-4", "reps": "12-20", "rest": "60s", "notes": "Women often respond better to higher reps for hypertrophy." },
        { "name": "Glute Emphasis", "sets": "4-5", "reps": "8-15", "rest": "75s", "notes": "Priority training for glutes with multiple angles." },
        { "name": "Reduced Heavy CNS Work", "sets": "Limited", "reps": "5-8", "rest": "N/A", "notes": "Less frequent heavy neural work to manage stress hormones." }
      ]
    },
    {
      "name": "Client: Injury Prevention & Prehab",
      "exercises": [
        { "name": "Balanced Programming", "sets": "Equal push/pull", "reps": "Varied", "rest": "N/A", "notes": "Ensure equal volume for opposing muscle groups." },
        { "name": "Rotator Cuff Work", "sets": "2-3", "reps": "15-20", "rest": "45s", "notes": "Regular shoulder prehab with light, high-rep work." },
        { "name": "Core Stability", "sets": "3-4", "reps": "Various", "rest": "60s", "notes": "Focus on anti-rotation and stability exercises." },
        { "name": "Mobility Integration", "sets": "Daily", "reps": "10-15", "rest": "N/A", "notes": "Incorporate mobility work into warm-ups and cool-downs." }
      ]
    },
    {
      "name": "Abel Metabolic Density Training",
      "exercises": [
        { "name": "Circuit Training Format", "sets": "4-5 circuits", "reps": "15-20", "rest": "30s between exercises", "notes": "Minimal rest between exercises within circuit for metabolic effect." },
        { "name": "Compound Movement Focus", "sets": "All exercises", "reps": "High", "rest": "60s between circuits", "notes": "Squats, presses, rows in circuit format for maximum metabolic demand." },
        { "name": "Time Under Pressure", "sets": "Extended", "reps": "Continuous", "rest": "Limited", "notes": "Focus on keeping muscles under tension for extended periods." },
        { "name": "Cardiovascular Challenge", "sets": "Integrated", "reps": "N/A", "rest": "N/A", "notes": "Weights become cardio through density and minimal rest." }
      ]
    },
    {
      "name": "Abel Neural Activation Workout",
      "exercises": [
        { "name": "Explosive Movements", "sets": "5-6", "reps": "3-5", "rest": "180s", "notes": "Box jumps, power cleans, explosive presses for CNS activation." },
        { "name": "Heavy Compound Lifts", "sets": "4-5", "reps": "2-4", "rest": "180-240s", "notes": "Near-maximal weights on squats, deadlifts, bench press." },
        { "name": "Speed Work", "sets": "6-8", "reps": "3-5", "rest": "120s", "notes": "60-70% 1RM with maximum speed concentric, controlled eccentric." },
        { "name": "Minimal Accessory Work", "sets": "1-2", "reps": "8-10", "rest": "90s", "notes": "Just enough accessory work to maintain muscle balance." }
      ]
    },
    {
      "name": "Abel Full Body Integration Workout",
      "exercises": [
        { "name": "Upper/Lower Supersets", "sets": "4", "reps": "8-12 each", "rest": "90s after pair", "notes": "Superset upper body with lower body exercises for efficiency." },
        { "name": "Push/Pull/Core Circuit", "sets": "3 circuits", "reps": "12-15 each", "rest": "60s between circuits", "notes": "Complete push, pull, and core exercise in circuit format." },
        { "name": "Full Body Complexes", "sets": "4", "reps": "6-8 each movement", "rest": "120s", "notes": "Barbell complex: deadlift, row, clean, press, squat in sequence." },
        { "name": "Integration Finisher", "sets": "2", "reps": "10-15", "rest": "45s", "notes": "Full body movements like burpees or thrusters to finish." }
      ]
    },
    {
      "name": "Abel Mind-Body Integration Session",
      "exercises": [
        { "name": "Breathing Squats", "sets": "3", "reps": "5-8", "rest": "120s", "notes": "Focus on diaphragmatic breathing throughout movement pattern." },
        { "name": "Meditative Pull-Ups", "sets": "4", "reps": "5-8", "rest": "90s", "notes": "Slow, controlled tempo with focus on muscle connection." },
        { "name": "Yoga-Inspired Presses", "sets": "3", "reps": "10-12", "rest": "75s", "notes": "Combine pressing movements with yoga principles of alignment." },
        { "name": "Tai Chi Rows", "sets": "3", "reps": "12-15", "rest": "60s", "notes": "Fluid, continuous rowing motion with focus on energy flow." }
      ]
    },
    {
      "name": "Abel Deload & Recovery Protocol",
      "exercises": [
        { "name": "Reduced Volume", "sets": "2-3", "reps": "10-15", "rest": "90s", "notes": "50-60% of normal volume to promote recovery." },
        { "name": "Light Weight Only", "sets": "All sets", "reps": "Controlled", "rest": "N/A", "notes": "60-70% of normal training weight, focus on perfect form." },
        { "name": "Extended Warm-up", "sets": "Thorough", "reps": "15-20", "rest": "N/A", "notes": "Longer warm-up with dynamic stretching and mobility work." },
        { "name": "Active Recovery Emphasis", "sets": "Light", "reps": "Various", "rest": "N/A", "notes": "Walking, swimming, light cardio between sessions." }
      ]
    },
    {
      "name": "Client: Endurance Athlete Strength Program",
      "exercises": [
        { "name": "Low Volume, High Frequency", "sets": "2-3", "reps": "6-10", "rest": "90s", "notes": "Minimal interference with endurance training schedule." },
        { "name": "Explosive Power Development", "sets": "3-4", "reps": "3-5", "rest": "120s", "notes": "Power cleans, box jumps, medicine ball throws for athletic power." },
        { "name": "Unilateral Emphasis", "sets": "3-4", "reps": "8-12", "rest": "75s", "notes": "Single-leg squats, lunges, single-arm presses for stability." },
        { "name": "Injury Prevention Focus", "sets": "2-3", "reps": "12-15", "rest": "60s", "notes": "Rotator cuff, glute medius, core stability work." }
      ]
    },
    {
      "name": "Client: Post-Rehab Strength Rebuilding",
      "exercises": [
        { "name": "Pain-Free Range Only", "sets": "2-3", "reps": "12-15", "rest": "90s", "notes": "Never work through pain, respect current limitations." },
        { "name": "Progressive Range Expansion", "sets": "Gradual", "reps": "Controlled", "rest": "N/A", "notes": "Slowly increase range of motion as tissues adapt." },
        { "name": "Bilateral to Unilateral Transition", "sets": "Varied", "reps": "8-12", "rest": "75s", "notes": "Start with bilateral, progress to unilateral as strength returns." },
        { "name": "Proprioception Emphasis", "sets": "Integrated", "reps": "Various", "rest": "N/A", "notes": "Balance and stability work integrated with strength training." }
      ]
    },
    {
      "name": "Client: Stress Management Training Program",
      "exercises": [
        { "name": "Lower Intensity Workouts", "sets": "3-4", "reps": "10-15", "rest": "90s", "notes": "Avoid high-stress heavy training during high-life-stress periods." },
        { "name": "Mindful Movement Emphasis", "sets": "All exercises", "reps": "Controlled", "rest": "N/A", "notes": "Focus on movement quality and breathing rather than intensity." },
        { "name": "Reduced CNS Stress", "sets": "Limited", "reps": "Higher", "rest": "N/A", "notes": "Minimize heavy compound lifts that significantly stress CNS." },
        { "name": "Recovery Priority", "sets": "Emphasized", "reps": "N/A", "rest": "N/A", "notes": "Extra focus on sleep, nutrition, and stress management outside gym." }
      ]
    },
    {
      "name": "Client: Athletic Performance Peak",
      "exercises": [
        { "name": "Sport-Specific Patterns", "sets": "4-5", "reps": "3-5", "rest": "120s", "notes": "Mimic sport movements with resistance for specific adaptation." },
        { "name": "Power Development", "sets": "4-5", "reps": "3-5", "rest": "180s", "notes": "Olympic lifts, plyometrics for explosive power." },
        { "name": "Eccentric Emphasis", "sets": "3-4", "reps": "4-6", "rest": "120s", "notes": "Focus on controlled negatives for tendon and ligament strength." },
        { "name": "Recovery Integration", "sets": "Strategic", "reps": "Varied", "rest": "N/A", "notes": "Align training with competition schedule for peak performance." }
      ]
    }
  ]
},
  {
  "name": "Mark Carroll",
  "image": "public/coaches/caroll.jpg",
  "style": "Evidence-Based Training, Progressive Overload, Glute Specialization, Strategic Exercise Selection, Sustainable Results",
  "description": "World-renowned coach specializing in female physique transformation and bikini competition prep. Known for his scientific, no-nonsense approach to building the iconic 'bikini body' through strategic programming, progressive overload, and glute specialization. Focuses on sustainable methods that deliver long-term results rather than short-term fixes.",
  "achievements": "Creator of the legendary 'Building the Bikini Body' series, coach to countless IFBB Bikini Pros and champions. Revolutionized female training with his glute specialization protocols and evidence-based approach. Known for producing some of the most successful bikini competitors in the industry.",
  "career": "Former athlete turned highly sought-after coach, Mark Carroll has built a reputation for delivering exceptional results through intelligent programming. His methods are grounded in exercise science and practical application, making him one of the most respected coaches in the physique competition world.",
  "splits": [
    {
      "name": "MC Glute & Hamstring Specialization",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "The cornerstone exercise. Focus on peak contraction at the top, controlled eccentric." },
        { "name": "Romanian Deadlifts", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Hamstring and glute focus. Maintain flat back, feel the stretch." },
        { "name": "Cable Pull-Throughs", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Glute and hamstring activation with constant tension." },
        { "name": "Hyperextensions (Glute Focus)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Focus on squeezing glutes, not lower back. Can add weight." },
        { "name": "Cable Kickbacks", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Glute isolation. Squeeze at peak contraction." }
      ]
    },
    {
      "name": "MC Quad & Glute Development",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Controlled depth, explosive concentric. Focus on quad and glute engagement." },
        { "name": "Dumbbell Lunges", "sets": 3, "reps": "10-12 per leg", "rest": "90s", "notes": "Unilateral work for balanced development. Deep stretch." },
        { "name": "Leg Press (High Foot Placement)", "sets": 4, "reps": "12-15", "rest": "75s", "notes": "Feet high and wide to target glutes and hamstrings." },
        { "name": "Leg Extensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Quad isolation. Squeeze at top for detail." },
        { "name": "Banded Glute Bridges", "sets": 3, "reps": "20-25", "rest": "45s", "notes": "Pump finisher with constant tension from band." }
      ]
    },
    {
      "name": "MC Upper Body Push (Chest/Shoulders/Triceps)",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Upper chest development. Control negative, explode up." },
        { "name": "Seated Dumbbell Shoulder Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Shoulder mass builder. Don't lock out to keep tension." },
        { "name": "Dumbbell Lateral Raises", "sets": 4, "reps": "12-15", "rest": "60s", "notes": "Shoulder width. Light weight, perfect form." },
        { "name": "Cable Crossovers", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Chest squeeze and pump. Constant tension." },
        { "name": "Overhead Triceps Extensions", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Long head development. Stretch at bottom." },
        { "name": "Triceps Pushdowns", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Lateral head focus. Squeeze at bottom." }
      ]
    },
    {
      "name": "MC Upper Body Pull (Back/Biceps)",
      "exercises": [
        { "name": "Lat Pulldowns (Wide Grip)", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Back width development. Focus on stretching lats." },
        { "name": "Seated Cable Rows (Close Grip)", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Back thickness. Squeeze shoulder blades together." },
        { "name": "Straight-Arm Pulldowns", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Lat isolation. Keep arms straight, focus on stretch." },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Rear delt and upper back health. External rotation." },
        { "name": "Dumbbell Bicep Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Bicep mass. Strict form, no swinging." },
        { "name": "Hammer Curls", "sets": 3, "reps": "12-15", "rest": "45s", "notes": "Brachialis development for arm thickness." }
      ]
    },
    {
      "name": "MC Building the Bikini Body - Lower",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Progressive overload focus. Increase weight weekly when possible." },
        { "name": "Goblet Squats", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Quad and glute development with core engagement." },
        { "name": "Romanian Deadlifts", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Hamstring and glute focus. Perfect form is mandatory." },
        { "name": "Walking Lunges", "sets": 3, "reps": "12-15 per leg", "rest": "60s", "notes": "Unilateral development and stability." },
        { "name": "Cable Pull-Throughs", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Glute pump finisher. Focus on squeeze." }
      ]
    },
    {
      "name": "MC Building the Bikini Body - Upper",
      "exercises": [
        { "name": "Lat Pulldowns", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Create V-taper. Focus on mind-muscle connection." },
        { "name": "Seated Cable Rows", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Back thickness and posture. Squeeze shoulder blades." },
        { "name": "Dumbbell Shoulder Press", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Shoulder development for balanced physique." },
        { "name": "Dumbbell Lateral Raises", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Shoulder width. Light weight, high reps." },
        { "name": "Incline Dumbbell Press", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Upper chest development. Controlled tempo." },
        { "name": "Bicep Curls & Triceps Pushdowns", "sets": "3 each", "reps": "15-20", "rest": "45s", "notes": "Arm superset for pump and detail." }
      ]
    },
    {
      "name": "MC Progressive Overload Protocol",
      "exercises": [
        { "name": "Track Everything", "sets": "All workouts", "reps": "Recorded", "rest": "N/A", "notes": "Log weights, reps, and sets for every exercise." },
        { "name": "Small Incremental Increases", "sets": "Weekly", "reps": "2.5-5%", "rest": "N/A", "notes": "Add small amounts of weight weekly when reps target is hit." },
        { "name": "Rep Progression", "sets": "When stuck", "reps": "Increase reps", "rest": "N/A", "notes": "If can't increase weight, increase reps with same weight." },
        { "name": "Form Over Ego", "sets": "Every set", "reps": "Perfect", "rest": "N/A", "notes": "Never sacrifice form for heavier weight." },
        { "name": "Consistency is Key", "sets": "Long-term", "reps": "Sustainable", "rest": "N/A", "notes": "Small consistent improvements beat sporadic massive jumps." }
      ]
    },
    {
      "name": "MC Exercise Selection Principles",
      "exercises": [
        { "name": "Compound Movements First", "sets": "Priority", "reps": "Heavier", "rest": "N/A", "notes": "Hip thrusts, squats, rows, presses form the foundation." },
        { "name": "Strategic Isolation", "sets": "Secondary", "reps": "Higher", "rest": "N/A", "notes": "Use isolation work to target specific muscle groups after compounds." },
        { "name": "Movement Patterns Over Exercises", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Focus on covering hip hinge, squat, push, pull, lunge patterns." },
        { "name": "Individual Structure Consideration", "sets": "Personalized", "reps": "N/A", "rest": "N/A", "notes": "Choose exercises that work with individual biomechanics." }
      ]
    },
    {
      "name": "MC Glute Specialization Principles",
      "exercises": [
        { "name": "Hip Thrust is King", "sets": "2-3x weekly", "reps": "Progressive", "rest": "N/A", "notes": "Hip thrusts are the most important exercise for glute development." },
        { "name": "Multiple Angles", "sets": "Varied", "reps": "Varied", "rest": "N/A", "notes": "Attack glutes from different angles: thrusts, hinges, squats, abductions." },
        { "name": "Mind-Muscle Connection", "sets": "Every rep", "reps": "Focused", "rest": "N/A", "notes": "Focus on feeling the glutes work, not just moving weight." },
        { "name": "Progressive Overload Non-Negotiable", "sets": "Consistent", "reps": "Increasing", "rest": "N/A", "notes": "Must consistently add weight or reps to hip thrusts over time." }
      ]
    },
    {
      "name": "MC Training Split Examples",
      "exercises": [
        { "name": "3-Day Full Body", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Ideal for beginners: Full Body x3 weekly with progressive overload." },
        { "name": "4-Day Upper/Lower", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Upper, Lower, Rest, Upper, Lower, Rest, Rest. Most common split." },
        { "name": "5-Day Body Part Split", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Glutes/Hams, Back, Quads/Glutes, Chest/Shoulders, Arms/Abs. Advanced." },
        { "name": "Push/Pull/Legs", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Push, Pull, Legs, Rest, Repeat. Good for intermediate trainees." }
      ]
    },
    {
      "name": "Client: Bikini Competitor - Off Season Mass",
      "exercises": [
        { "name": "Heavy Hip Thrusts", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Progressive overload focus. Build glute mass." },
        { "name": "Barbell Squats", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Quad and overall leg development." },
        { "name": "Romanian Deadlifts", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Hamstring and glute focus." },
        { "name": "Wide-Grip Pull-ups", "sets": 4, "reps": "6-10", "rest": "90s", "notes": "Back width for V-taper." },
        { "name": "Dumbbell Shoulder Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Shoulder mass for balanced physique." }
      ]
    },
    {
      "name": "Client: Bikini Competitor - Contest Prep",
      "exercises": [
        { "name": "Maintain Strength", "sets": "3-4", "reps": "8-12", "rest": "90s", "notes": "Keep weights heavy to maintain muscle mass while dieting." },
        { "name": "Increase Volume Slightly", "sets": "Add 1 set", "reps": "12-15", "rest": "75s", "notes": "Slight volume increase to create muscle fullness." },
        { "name": "Mind-Muscle Connection Focus", "sets": "All sets", "reps": "Controlled", "rest": "N/A", "notes": "Enhanced focus on feeling the target muscle work." },
        { "name": "Reduce Frequency if Needed", "sets": "As needed", "reps": "N/A", "rest": "N/A", "notes": "May reduce to 4 days weekly if recovery is compromised." }
      ]
    },
    {
      "name": "Client: Male Physique Development",
      "exercises": [
        { "name": "Heavy Compounds", "sets": "4-5", "reps": "6-10", "rest": "120s", "notes": "Squats, deadlifts, bench press, rows for overall mass." },
        { "name": "Progressive Overload Focus", "sets": "All lifts", "reps": "Tracked", "rest": "N/A", "notes": "Systematic increases in weight or reps over time." },
        { "name": "Balanced Programming", "sets": "Equal push/pull", "reps": "Varied", "rest": "N/A", "notes": "Ensure equal volume for opposing muscle groups." },
        { "name": "Strategic Weak Point Training", "sets": "Priority", "reps": "Varied", "rest": "N/A", "notes": "Extra focus on lagging body parts with increased frequency." }
      ]
    },
    {
      "name": "Client: General Population Fat Loss",
      "exercises": [
        { "name": "Full Body Workouts", "sets": "3-4", "reps": "10-15", "rest": "60-75s", "notes": "Metabolic efficiency with compound movements." },
        { "name": "Progressive Overload Still Applies", "sets": "Tracked", "reps": "Increasing", "rest": "N/A", "notes": "Continue getting stronger even in calorie deficit." },
        { "name": "Cardio Strategic Implementation", "sets": "2-4x weekly", "reps": "20-40min", "rest": "N/A", "notes": "LISS or MISS cardio, not HIIT, to preserve recovery." },
        { "name": "Sustainability Focus", "sets": "Long-term", "reps": "Maintainable", "rest": "N/A", "notes": "Programs designed to be maintained long-term." }
      ]
    },
    {
      "name": "MC Weak Point Training - Glutes",
      "exercises": [
        { "name": "Hip Thrusts 2-3x Weekly", "sets": "4-5", "reps": "8-15", "rest": "90s", "notes": "Increased frequency with varied rep ranges." },
        { "name": "Multiple Stance Squats", "sets": "3-4", "reps": "10-15", "rest": "75s", "notes": "Wide stance, narrow stance, different foot angles." },
        { "name": "Hip Hinge Variations", "sets": "3-4", "reps": "10-15", "rest": "75s", "notes": "RDLs, Good Mornings, Pull-Throughs from different angles." },
        { "name": "Glute Isolation", "sets": "3-4", "reps": "15-25", "rest": "45s", "notes": "Kickbacks, hip abductions, glute-focused back extensions." }
      ]
    },
    {
      "name": "MC Weak Point Training - Shoulders",
      "exercises": [
        { "name": "Increased Shoulder Frequency", "sets": "2-3x weekly", "reps": "Varied", "rest": "N/A", "notes": "Hit shoulders multiple times weekly with different emphases." },
        { "name": "Heavy Pressing", "sets": "3-4", "reps": "6-10", "rest": "90s", "notes": "Overhead press variations for overall mass." },
        { "name": "High-Volume Lateral Raises", "sets": "4-5", "reps": "15-20", "rest": "45s", "notes": "Light weight, perfect form for shoulder width." },
        { "name": "Rear Delt Emphasis", "sets": "3-4", "reps": "15-20", "rest": "45s", "notes": "Face pulls, bent-over raises for balanced development." }
      ]
    },
    {
      "name": "MC Cardio Implementation Strategy",
      "exercises": [
        { "name": "LISS for Fat Loss", "sets": "3-5x weekly", "reps": "30-45min", "rest": "N/A", "notes": "Low-intensity steady state: walking, incline treadmill, bike." },
        { "name": "MISS for Maintenance", "sets": "2-3x weekly", "reps": "20-30min", "rest": "N/A", "notes": "Moderate-intensity steady state for general health." },
        { "name": "HIIT Limited Use", "sets": "1x weekly max", "reps": "15-20min", "rest": "N/A", "notes": "High-intensity intervals used sparingly to not interfere with recovery." },
        { "name": "Step Count Tracking", "sets": "Daily", "reps": "8-12k steps", "rest": "N/A", "notes": "Non-exercise activity thermogenesis (NEAT) is prioritized." }
      ]
    },
    {
      "name": "MC Deload & Recovery Protocol",
      "exercises": [
        { "name": "Scheduled Deloads", "sets": "Every 6-8 weeks", "reps": "Reduced", "rest": "N/A", "notes": "Planned reduction in volume and intensity for recovery." },
        { "name": "Volume Reduction", "sets": "50% reduction", "reps": "Same", "rest": "Same", "notes": "Cut volume in half while maintaining same exercises." },
        { "name": "Intensity Maintenance", "sets": "Same weight", "reps": "Easy", "rest": "N/A", "notes": "Use same weights but stop well short of failure." },
        { "name": "Active Recovery", "sets": "Light", "reps": "Walking/yoga", "rest": "N/A", "notes": "Light activity between sessions to promote recovery." }
      ]
    },
    {
      "name": "MC Nutrition Integration Principles",
      "exercises": [
        { "name": "Calorie Balance Dictates Goal", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Surplus for muscle growth, deficit for fat loss." },
        { "name": "Adequate Protein Intake", "sets": "All phases", "reps": "1g/lb bodyweight", "rest": "N/A", "notes": "Sufficient protein to support muscle growth and retention." },
        { "name": "Carbohydrate Timing", "sets": "Strategic", "reps": "Around workouts", "rest": "N/A", "notes": "Higher carbs around training for performance and recovery." },
        { "name": "Flexible Dieting Approach", "sets": "Sustainable", "reps": "80/20 rule", "rest": "N/A", "notes": "Mostly whole foods with flexibility for adherence." }
      ]
    },
    {
      "name": "Client: Post-Pregnancy Rebuilding",
      "exercises": [
        { "name": "Core Rehab First", "sets": "2-3", "reps": "15-20", "rest": "60s", "notes": "Focus on transverse abdominis and pelvic floor recovery." },
        { "name": "Gradual Progressive Overload", "sets": "Slow increases", "reps": "10-15", "rest": "N/A", "notes": "Very gradual weight increases to allow tissue adaptation." },
        { "name": "Compound Movement Foundation", "sets": "3-4", "reps": "8-12", "rest": "90s", "notes": "Hip thrusts, goblet squats, rows, presses as foundation." },
        { "name": "Diastasis Recti Considerations", "sets": "Avoid certain exercises", "reps": "N/A", "rest": "N/A", "notes": "Avoid crunches, planks if diastasis present until healed." }
      ]
    },
    {
      "name": "Client: Youth Athletic Development",
      "exercises": [
        { "name": "Movement Pattern Foundation", "sets": "3-4", "reps": "8-12", "rest": "90s", "notes": "Squat, hinge, push, pull, lunge patterns with perfect form." },
        { "name": "Bodyweight Mastery First", "sets": "Before weights", "reps": "15-20", "rest": "N/A", "notes": "Master bodyweight variations before adding external load." },
        { "name": "Progressive Overload with Technique", "sets": "Form first", "reps": "Quality over quantity", "rest": "N/A", "notes": "Only increase weight when technique is perfect." },
        { "name": "Athletic Skill Integration", "sets": "Integrated", "reps": "Sport-specific", "rest": "N/A", "notes": "Combine strength training with sport-specific skill work." }
      ]
    }
  ]
},
  {
  "name": "Bret Contreras",
  "image": "public/coaches/bret.jpg",
  "style": "Evidence-Based Glute Specialist, Hip Thrust Pioneer, Scientific Training, Progressive Overload, EMG Research",
  "description": "World-renowned strength coach and researcher known as 'The Glute Guy.' Famous for pioneering the hip thrust exercise and revolutionizing glute training through scientific research and EMG studies. Focuses on evidence-based methods, progressive overload, and optimizing training for maximum glute development.",
  "achievements": "PhD in Sports Science, author of 'The Glute Lab,' creator of the hip thrust exercise, renowned researcher in glute biomechanics. Coach to thousands of clients and athletes worldwide, transforming glute training through scientific principles.",
  "career": "Over 15 years of research and coaching experience, Bret Contreras has become the world's leading authority on glute training. His work combines academic research with practical application, making complex biomechanical principles accessible to coaches and lifters worldwide.",
  "splits": [
    {
      "name": "Contreras Glute-Focused Lower Body",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "The cornerstone exercise. Focus on peak contraction at the top, drive through heels." },
        { "name": "Barbell Squats", "sets": 3, "reps": "6-10", "rest": "120s", "notes": "Quad and glute focus. Controlled descent, explosive concentric." },
        { "name": "Romanian Deadlifts", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Hamstring and glute focus. Maintain flat back, feel the stretch." },
        { "name": "Banded Glute Bridges", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Pump finisher with constant tension from band." },
        { "name": "Cable Pull-Throughs", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Glute and hamstring activation with constant tension." }
      ]
    },
    {
      "name": "Contreras Full Body Strength",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Start with glutes when fresh for maximum activation." },
        { "name": "Barbell Squats", "sets": 3, "reps": "6-10", "rest": "120s", "notes": "Leg strength and development." },
        { "name": "Bench Press", "sets": 3, "reps": "6-10", "rest": "120s", "notes": "Upper body pushing strength." },
        { "name": "Pull-Ups", "sets": 3, "reps": "6-10", "rest": "90s", "notes": "Upper body pulling strength." },
        { "name": "Overhead Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Shoulder strength and development." }
      ]
    },
    {
      "name": "Contreras Glute Specialization",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 5, "reps": "8-12", "rest": "90s", "notes": "Heavy progressive overload focus. Increase weight weekly." },
        { "name": "American Deadlifts", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Glute-focused deadlift variation with stretch at bottom." },
        { "name": "Frog Pumps", "sets": 3, "reps": "20-30", "rest": "45s", "notes": "High-rep glute pump exercise. Focus on squeeze." },
        { "name": "Banded Clamshells", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Glute medius activation. Important for hip stability." },
        { "name": "Cable Kickbacks", "sets": 3, "reps": "15-20", "rest": "45s", "notes": "Glute max isolation. Squeeze at peak contraction." }
      ]
    },
    {
      "name": "Contreras Upper Body Push",
      "exercises": [
        { "name": "Bench Press", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Chest strength and development. Progressive overload focus." },
        { "name": "Overhead Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Shoulder strength. Stand or sit, focus on strict form." },
        { "name": "Incline Dumbbell Press", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Upper chest development. Control negative." },
        { "name": "Dumbbell Lateral Raises", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Shoulder width. Light weight, perfect form." },
        { "name": "Triceps Extensions", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Triceps development. Various angles." }
      ]
    },
    {
      "name": "Contreras Upper Body Pull",
      "exercises": [
        { "name": "Pull-Ups", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Back width and strength. Use assistance if needed." },
        { "name": "Barbell Rows", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Back thickness. Maintain torso angle." },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Rear delt and upper back health. External rotation." },
        { "name": "Lat Pulldowns", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Back width variation. Focus on stretch." },
        { "name": "Bicep Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Bicep development. Various grips." }
      ]
    },
    {
      "name": "The Glute Lab Principles",
      "exercises": [
        { "name": "Hip Thrust is Essential", "sets": "2-3x weekly", "reps": "Progressive", "rest": "N/A", "notes": "Hip thrusts provide the best glute activation of any exercise." },
        { "name": "Progressive Overload", "sets": "All exercises", "reps": "Tracked", "rest": "N/A", "notes": "Systematically increase stress over time through weight, reps, or sets." },
        { "name": "Varied Strength Curves", "sets": "Strategic", "reps": "Varied", "rest": "N/A", "notes": "Use exercises with different strength curves for complete development." },
        { "name": "Evidence-Based Exercise Selection", "sets": "Research-backed", "reps": "N/A", "rest": "N/A", "notes": "Choose exercises based on EMG research and biomechanical analysis." },
        { "name": "Individualization", "sets": "Personalized", "reps": "Personalized", "rest": "N/A", "notes": "Program based on individual structure, goals, and response." }
      ]
    },
    {
      "name": "Contreras Exercise Categories by Function",
      "exercises": [
        { "name": "Glute Dominant", "sets": "Hip thrusts, bridges", "reps": "8-20", "rest": "N/A", "notes": "Exercises where glutes are primary mover with hip extension." },
        { "name": "Quad Dominant", "sets": "Squats, lunges", "reps": "6-12", "rest": "N/A", "notes": "Exercises where quads are primary with knee extension." },
        { "name": "Hamstring Dominant", "sets": "Deadlifts, RDLs", "reps": "6-12", "rest": "N/A", "notes": "Exercises where hamstrings are primary with hip extension." },
        { "name": "Horizontal Pull", "sets": "Rows, face pulls", "reps": "8-15", "rest": "N/A", "notes": "Exercises pulling toward body horizontally." },
        { "name": "Vertical Pull", "sets": "Pull-ups, pulldowns", "reps": "6-12", "rest": "N/A", "notes": "Exercises pulling downward vertically." },
        { "name": "Horizontal Push", "sets": "Bench press, push-ups", "reps": "6-12", "rest": "N/A", "notes": "Exercises pushing away horizontally." },
        { "name": "Vertical Push", "sets": "Overhead press", "reps": "6-12", "rest": "N/A", "notes": "Exercises pushing upward vertically." }
      ]
    },
    {
      "name": "Contreras Frequency & Volume Recommendations",
      "exercises": [
        { "name": "Glutes: 2-6x weekly", "sets": "10-20 weekly sets", "reps": "Varied", "rest": "N/A", "notes": "Glutes recover quickly and respond well to high frequency." },
        { "name": "Other Muscle Groups: 2-3x weekly", "sets": "10-20 weekly sets", "reps": "Varied", "rest": "N/A", "notes": "Standard frequency for most muscle groups." },
        { "name": "Beginners: Lower frequency", "sets": "2-3x weekly", "reps": "N/A", "rest": "N/A", "notes": "Start with full body 3x weekly to build foundation." },
        { "name": "Advanced: Higher frequency", "sets": "4-6x weekly", "reps": "N/A", "rest": "N/A", "notes": "Advanced trainees can handle more frequent training." }
      ]
    },
    {
      "name": "Contreras Progressive Overload System",
      "exercises": [
        { "name": "Add Weight", "sets": "When possible", "reps": "Same", "rest": "N/A", "notes": "Increase weight while maintaining same reps and sets." },
        { "name": "Add Reps", "sets": "Same", "reps": "Increase", "rest": "N/A", "notes": "Increase reps with same weight and sets." },
        { "name": "Add Sets", "sets": "Increase", "reps": "Same", "rest": "N/A", "notes": "Add sets while maintaining same weight and reps." },
        { "name": "Improve Technique", "sets": "All", "reps": "Better form", "rest": "N/A", "notes": "Better mind-muscle connection and execution." },
        { "name": "Decrease Rest Periods", "sets": "Same", "reps": "Same", "rest": "Decrease", "notes": "Increase density with same volume." }
      ]
    },
    {
      "name": "Contreras Glute Activation Protocol",
      "exercises": [
        { "name": "Banded Glute Bridges", "sets": 2, "reps": "20", "rest": "30s", "notes": "Wake up glutes before heavy training." },
        { "name": "Clamshells", "sets": 2, "reps": "15 per side", "rest": "30s", "notes": "Activate glute medius for hip stability." },
        { "name": "Fire Hydrants", "sets": 2, "reps": "15 per side", "rest": "30s", "notes": "Glute medius and minimus activation." },
        { "name": "Donkey Kicks", "sets": 2, "reps": "15 per side", "rest": "30s", "notes": "Glute max activation in extended position." }
      ]
    },
    {
      "name": "Client: Female Glute Building Program",
      "exercises": [
        { "name": "Hip Thrusts 3x Weekly", "sets": "3-4", "reps": "8-15", "rest": "90s", "notes": "Varied rep ranges across the week for different adaptations." },
        { "name": "Squat Variations", "sets": "2-3", "reps": "6-12", "rest": "120s", "notes": "Back squats, front squats, goblet squats for quad and glute development." },
        { "name": "Hip Hinge Variations", "sets": "2-3", "reps": "8-12", "rest": "90s", "notes": "RDLs, deadlifts, good mornings for posterior chain." },
        { "name": "Abduction Work", "sets": "2-3", "reps": "15-20", "rest": "60s", "notes": "Banded work, machine abductions for glute medius." },
        { "name": "Upper Body Balance", "sets": "2-3", "reps": "8-15", "rest": "75s", "notes": "Push, pull, and shoulder work for balanced physique." }
      ]
    },
    {
      "name": "Client: Strength Athlete Program",
      "exercises": [
        { "name": "Heavy Hip Thrusts", "sets": "3-4", "reps": "3-6", "rest": "180s", "notes": "Low rep strength work for power development." },
        { "name": "Competition Lifts", "sets": "4-5", "reps": "1-5", "rest": "180-300s", "notes": "Squat, bench, deadlift practice with competition form." },
        { "name": "Accessory Work", "sets": "3-4", "reps": "8-12", "rest": "90s", "notes": "Bodybuilding style work for muscle balance and hypertrophy." },
        { "name": "Weak Point Training", "sets": "3-4", "reps": "8-15", "rest": "75s", "notes": "Extra focus on lagging muscle groups." }
      ]
    },
    {
      "name": "Client: General Population Fitness",
      "exercises": [
        { "name": "Full Body Workouts", "sets": "2-3", "reps": "8-15", "rest": "75-90s", "notes": "All major movement patterns in each session." },
        { "name": "Progressive Overload Focus", "sets": "Tracked", "reps": "Increasing", "rest": "N/A", "notes": "Simple progression system with tracked improvements." },
        { "name": "Movement Quality Emphasis", "sets": "All", "reps": "Perfect form", "rest": "N/A", "notes": "Focus on proper technique over heavy weights." },
        { "name": "Sustainable Programming", "sets": "2-4 weekly", "reps": "Maintainable", "rest": "N/A", "notes": "Programs designed for long-term adherence." }
      ]
    },
    {
      "name": "Client: Athletic Performance",
      "exercises": [
        { "name": "Power Development", "sets": "3-5", "reps": "3-5", "rest": "180s", "notes": "Explosive movements: power cleans, jumps, throws." },
        { "name": "Strength Foundation", "sets": "3-4", "reps": "4-8", "rest": "120s", "notes": "Basic strength exercises: squats, presses, pulls." },
        { "name": "Sport-Specific Transfer", "sets": "2-3", "reps": "6-10", "rest": "90s", "notes": "Exercises that directly transfer to sport performance." },
        { "name": "Injury Prevention", "sets": "2-3", "reps": "12-15", "rest": "60s", "notes": "Prehab work for common athletic injuries." }
      ]
    },
    {
      "name": "Contreras Advanced Glute Techniques",
      "exercises": [
        { "name": "Accommodating Resistance", "sets": "3-4", "reps": "6-10", "rest": "120s", "notes": "Bands or chains on hip thrusts for variable resistance." },
        { "name": "Cluster Sets", "sets": "Extended", "reps": "Multiple clusters", "rest": "15-20s", "notes": "Short rest periods within sets to increase volume." },
        { "name": "Drop Sets", "sets": "Last set", "reps": "Continue after failure", "rest": "No rest", "notes": "Immediate weight reduction to extend set beyond failure." },
        { "name": "Pre-Exhaustion", "sets": "Before compounds", "reps": "15-20", "rest": "60s", "notes": "Isolation work before compounds to enhance mind-muscle connection." }
      ]
    },
    {
      "name": "Contreras Research-Backed Glute Exercises",
      "exercises": [
        { "name": "Hip Thrusts (Highest Activation)", "sets": "Various", "reps": "Various", "rest": "N/A", "notes": "EMG research shows highest glute max activation of any exercise." },
        { "name": "Step-Ups", "sets": "3-4", "reps": "8-12", "rest": "75s", "notes": "Excellent for glute medius and functional strength." },
        { "name": "Lunges", "sets": "3-4", "reps": "8-12", "rest": "75s", "notes": "Varied stance positions for different emphasis." },
        { "name": "Cable Pull-Throughs", "sets": "3-4", "reps": "12-15", "rest": "60s", "notes": "Constant tension throughout range of motion." },
        { "name": "Back Extensions", "sets": "3-4", "reps": "12-15", "rest": "60s", "notes": "Glute-focused with rounded back, not hyperextension." }
      ]
    },
    {
      "name": "Contreras Periodization Models",
      "exercises": [
        { "name": "Linear Periodization", "sets": "Decreasing", "reps": "Decreasing", "rest": "Increasing", "notes": "Start with high reps, progress to low reps over mesocycle." },
        { "name": "Daily Undulating Periodization", "sets": "Varied daily", "reps": "Varied daily", "rest": "Varied daily", "notes": "Different rep ranges each training session throughout week." },
        { "name": "Block Periodization", "sets": "Focused blocks", "reps": "Block-specific", "rest": "Block-specific", "notes": "Concentrated training on specific qualities in sequential blocks." },
        { "name": "Flexible Nonlinear", "sets": "Auto-regulated", "reps": "Auto-regulated", "rest": "Auto-regulated", "notes": "Adjust based on daily recovery and performance." }
      ]
    },
    {
      "name": "Contreras Recovery & Deload Protocols",
      "exercises": [
        { "name": "Auto-Regulated Deloads", "sets": "When needed", "reps": "Reduced", "rest": "N/A", "notes": "Deload based on performance decline, not arbitrary schedule." },
        { "name": "Volume Reduction Deload", "sets": "50% reduction", "reps": "Same", "rest": "Same", "notes": "Cut volume in half for one week." },
        { "name": "Intensity Reduction Deload", "sets": "Same", "reps": "Same", "rest": "Same", "notes": "Use 60-70% of normal training weights." },
        { "name": "Active Recovery", "sets": "Light activity", "reps": "Walking, mobility", "rest": "N/A", "notes": "Light activity between sessions to promote recovery." }
      ]
    },
    {
      "name": "Contreras Nutrition for Muscle Growth",
      "exercises": [
        { "name": "Calorie Surplus for Growth", "sets": "Off-season", "reps": "250-500 surplus", "rest": "N/A", "notes": "Small surplus to maximize muscle growth while minimizing fat gain." },
        { "name": "Adequate Protein", "sets": "All phases", "reps": "0.8-1g/lb", "rest": "N/A", "notes": "Sufficient protein to support muscle protein synthesis." },
        { "name": "Carbohydrate Timing", "sets": "Around training", "reps": "Higher carbs", "rest": "N/A", "notes": "Higher carbohydrate intake around workouts for performance." },
        { "name": "Flexible Approach", "sets": "Sustainable", "reps": "80/20 rule", "rest": "N/A", "notes": "Mostly whole foods with flexibility for long-term adherence." }
      ]
    },
    {
      "name": "Client: Post-Injury Glute Rebuilding",
      "exercises": [
        { "name": "Pain-Free Range Only", "sets": "2-3", "reps": "15-20", "rest": "60s", "notes": "Never work through pain. Respect current limitations." },
        { "name": "Bodyweight Progressions", "sets": "2-3", "reps": "15-25", "rest": "45s", "notes": "Master bodyweight variations before external load." },
        { "name": "Gradual Load Progression", "sets": "Slow increases", "reps": "12-20", "rest": "N/A", "notes": "Very small weight increases to allow tissue adaptation." },
        { "name": "Stability Focus", "sets": "2-3", "reps": "15-20", "rest": "45s", "notes": "Glute medius and core stability work for joint protection." }
      ]
    },
    {
      "name": "Client: Mature Trainee Program",
      "exercises": [
        { "name": "Lower Volume", "sets": "2-3", "reps": "8-15", "rest": "90s", "notes": "Reduced volume to manage recovery capacity." },
        { "name": "Joint-Friendly Exercises", "sets": "All", "reps": "Controlled", "rest": "N/A", "notes": "Machines, cables, dumbbells preferred over heavy barbells." },
        { "name": "Higher Frequency", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "More frequent, shorter sessions rather than marathon workouts." },
        { "name": "Mobility Integration", "sets": "Daily", "reps": "10-15", "rest": "N/A", "notes": "Mobility work integrated into warm-ups and cool-downs." }
      ]
    }
  ]
},
  {
  "name": "Layne Norton",
  "image": "src/SciencebasedProf/layne.jpg",
  "style": "Scientific Powerbuilding, Periodization, Metabolic Damage Training, Evidence-Based Nutrition, Natural Bodybuilding",
  "description": "PhD in Nutritional Sciences, natural bodybuilder, world-record holding powerlifter, and renowned coach. Creator of the PH3 (Power Hypertrophy Hypothesis) program and Metabolic Damage training. Known for bridging the gap between scientific research and practical application in natural bodybuilding and strength training.",
  "achievements": "IFPA & NGA Natural Pro Bodybuilder, World Record Powerlifter (raw 2,303 lbs total), PhD in Nutritional Sciences, bestselling author, founder of BioLayne supplements. One of the most respected evidence-based coaches in the fitness industry.",
  "career": "Over 15 years as a competitive natural bodybuilder and powerlifter, Layne Norton has become a leading voice in evidence-based training and nutrition. His work demystifies complex scientific principles and makes them applicable for natural athletes seeking maximum results.",
  "splits": [
    {
      "name": "Norton Power Upper Body",
      "exercises": [
        { "name": "Bench Press", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Strength focus. Progressive overload with perfect form." },
        { "name": "Weighted Pull-Ups", "sets": 4, "reps": "3-6", "rest": "120s", "notes": "Back strength development. Use assistance if needed." },
        { "name": "Overhead Press", "sets": 4, "reps": "5-8", "rest": "120s", "notes": "Shoulder strength. Standing or seated with strict form." },
        { "name": "Barbell Rows", "sets": 4, "reps": "5-8", "rest": "120s", "notes": "Back thickness. Maintain torso angle, explosive pull." },
        { "name": "Dips", "sets": 3, "reps": "6-10", "rest": "90s", "notes": "Triceps and chest accessory. Add weight when possible." }
      ]
    },
    {
      "name": "Norton Power Lower Body",
      "exercises": [
        { "name": "Squats", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Low bar or high bar based on individual mechanics." },
        { "name": "Romanian Deadlifts", "sets": 4, "reps": "5-8", "rest": "120s", "notes": "Hamstring and glute focus. Controlled stretch." },
        { "name": "Leg Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Quad volume. Different foot positions." },
        { "name": "Leg Curls", "sets": 3, "reps": "8-12", "rest": "75s", "notes": "Hamstring isolation. Squeeze at top." },
        { "name": "Calf Raises", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Full range of motion, stretch and squeeze." }
      ]
    },
    {
      "name": "Norton Hypertrophy Upper Body",
      "exercises": [
        { "name": "Incline Dumbbell Press", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Upper chest focus. Control negative, explode up." },
        { "name": "Lat Pulldowns", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Back width. Various grips throughout mesocycle." },
        { "name": "Seated Dumbbell Press", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Shoulder hypertrophy. Don't lock out." },
        { "name": "Cable Rows", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Back thickness. Squeeze shoulder blades." },
        { "name": "Dumbbell Lateral Raises", "sets": 3, "reps": "12-20", "rest": "60s", "notes": "Shoulder width. Light weight, perfect form." },
        { "name": "Triceps & Biceps Superset", "sets": "3 each", "reps": "12-15", "rest": "60s", "notes": "Arms superset for efficiency and pump." }
      ]
    },
    {
      "name": "Norton Hypertrophy Lower Body",
      "exercises": [
        { "name": "Front Squats", "sets": 4, "reps": "8-12", "rest": "120s", "notes": "Quad focus and core engagement." },
        { "name": "Hack Squats", "sets": 3, "reps": "10-15", "rest": "90s", "notes": "Quad volume with spinal support." },
        { "name": "Leg Extensions", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Quad isolation. Squeeze at top." },
        { "name": "Lying Leg Curls", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Hamstring isolation. Focus on contraction." },
        { "name": "Standing Calf Raises", "sets": 4, "reps": "15-20", "rest": "45s", "notes": "Calf hypertrophy with full stretch." }
      ]
    },
    {
      "name": "Norton Deadlift Specialization",
      "exercises": [
        { "name": "Deadlifts", "sets": 5, "reps": "1-5", "rest": "180-300s", "notes": "Work up to heavy singles, doubles, or triples." },
        { "name": "Deficit Deadlifts", "sets": 3, "reps": "3-5", "rest": "180s", "notes": "Stand on plates to increase range of motion." },
        { "name": "Pause Deadlifts", "sets": 3, "reps": "3-5", "rest": "150s", "notes": "Pause just off floor to build explosive power." },
        { "name": "Barbell Rows", "sets": 3, "reps": "6-8", "rest": "120s", "notes": "Upper back strength for deadlift lockout." },
        { "name": "Abs & Grip Work", "sets": "3-4", "reps": "Various", "rest": "60s", "notes": "Core stability and grip strength development." }
      ]
    },
    {
      "name": "PH3 (Power Hypertrophy Hypothesis) Principles",
      "exercises": [
        { "name": "Concurrent Training", "sets": "All workouts", "reps": "Integrated", "rest": "N/A", "notes": "Train strength and hypertrophy qualities simultaneously." },
        { "name": "Systematic Progression", "sets": "Planned", "reps": "Increasing", "rest": "N/A", "notes": "Structured progression in weight, reps, or volume." },
        { "name": "Varied Rep Ranges", "sets": "Different days", "reps": "1-20+", "rest": "N/A", "notes": "Low reps for strength, moderate for hypertrophy, high for endurance." },
        { "name": "Exercise Rotation", "sets": "Mesocycle basis", "reps": "N/A", "rest": "N/A", "notes": "Change exercises every 4-8 weeks to prevent adaptation." },
        { "name": "Auto-Regulation", "sets": "As needed", "reps": "Adjustable", "rest": "N/A", "notes": "Adjust volume and intensity based on recovery and performance." }
      ]
    },
    {
      "name": "Norton Metabolic Damage Training",
      "exercises": [
        { "name": "High-Rep Squats", "sets": 3, "reps": "20-30", "rest": "60s", "notes": "Metabolic stress and muscle damage for growth signaling." },
        { "name": "Drop Set Bench Press", "sets": "2-3 drops", "reps": "Failure each drop", "rest": "No rest between drops", "notes": "Extreme metabolic stress and fatigue." },
        { "name": "Giant Set Back Work", "sets": "4 exercises", "reps": "12-15 each", "rest": "90s after giant set", "notes": "Multiple exercises back-to-back for massive pump." },
        { "name": "Rest-Pause Arms", "sets": "Extended sets", "reps": "Multiple clusters", "rest": "15-20s intra-set", "notes": "Extend sets beyond failure with short rest periods." }
      ]
    },
    {
      "name": "Norton Training Frequency Model",
      "exercises": [
        { "name": "High Frequency (4-6x weekly)", "sets": "Distributed volume", "reps": "Varied", "rest": "N/A", "notes": "Natural trainees benefit from higher frequency with lower volume per session." },
        { "name": "Upper/Lower Split", "sets": "4-5 days", "reps": "N/A", "rest": "N/A", "notes": "Most effective split for natural trainees. 2 upper, 2 lower, optional 5th day." },
        { "name": "Full Body (3x weekly)", "sets": "Balanced volume", "reps": "N/A", "rest": "N/A", "notes": "Good for beginners or during calorie restriction." },
        { "name": "Body Part Split (Advanced)", "sets": "5-6 days", "reps": "N/A", "rest": "N/A", "notes": "Only for advanced trainees with superior recovery capacity." }
      ]
    },
    {
      "name": "Norton Progressive Overload System",
      "exercises": [
        { "name": "Double Progression", "sets": "All exercises", "reps": "Target range", "rest": "N/A", "notes": "Hit top of rep range, then increase weight and work back up." },
        { "name": "Volume Progression", "sets": "Add sets", "reps": "Same", "rest": "N/A", "notes": "Add sets over time while maintaining same intensity." },
        { "name": "Intensity Progression", "sets": "Same", "reps": "Increase weight", "rest": "N/A", "notes": "Systematic weight increases over weeks/months." },
        { "name": "Density Progression", "sets": "Same", "reps": "Same", "rest": "Decrease", "notes": "Complete same work in less time." }
      ]
    },
    {
      "name": "Norton Exercise Selection Criteria",
      "exercises": [
        { "name": "Compound Movements First", "sets": "Priority", "reps": "Heavier", "rest": "N/A", "notes": "Squats, presses, rows, pulls for maximum stimulus." },
        { "name": "Individual Structure", "sets": "Personalized", "reps": "N/A", "rest": "N/A", "notes": "Choose exercises that work with individual biomechanics." },
        { "name": "Weak Point Focus", "sets": "Strategic", "reps": "Varied", "rest": "N/A", "notes": "Extra attention to lagging muscle groups." },
        { "name": "Movement Patterns", "sets": "Complete coverage", "reps": "N/A", "rest": "N/A", "notes": "Ensure all fundamental movement patterns are trained." }
      ]
    },
    {
      "name": "Client: Natural Bodybuilder Off-Season",
      "exercises": [
        { "name": "Strength Focus", "sets": "4-5", "reps": "3-6", "rest": "120-180s", "notes": "Build strength foundation with heavy compounds." },
        { "name": "Hypertrophy Volume", "sets": "3-4", "reps": "8-15", "rest": "60-90s", "notes": "Adequate volume for muscle growth." },
        { "name": "Progressive Overload", "sets": "Tracked", "reps": "Increasing", "rest": "N/A", "notes": "Systematic increases in weight and volume." },
        { "name": "Calorie Surplus", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Adequate nutrition to support muscle growth." }
      ]
    },
    {
      "name": "Client: Natural Bodybuilder Contest Prep",
      "exercises": [
        { "name": "Maintain Strength", "sets": "3-4", "reps": "5-8", "rest": "120s", "notes": "Keep weights heavy to preserve muscle mass." },
        { "name": "Increase Frequency", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "More frequent, shorter sessions as calories decrease." },
        { "name": "Metabolic Work", "sets": "1-2 sessions", "reps": "High", "rest": "Short", "notes": "Add metabolic sessions to increase calorie expenditure." },
        { "name": "Gradual Volume Reduction", "sets": "Decreasing", "reps": "Same", "rest": "N/A", "notes": "Reduce volume as contest approaches to manage fatigue." }
      ]
    },
    {
      "name": "Client: Powerlifter Program",
      "exercises": [
        { "name": "Competition Lifts", "sets": "3-5", "reps": "1-5", "rest": "180-300s", "notes": "Practice competition style with commands." },
        { "name": "Variations", "sets": "3-4", "reps": "3-8", "rest": "120-180s", "notes": "Address weak points with specific variations." },
        { "name": "Accessory Work", "sets": "3-4", "reps": "8-15", "rest": "60-90s", "notes": "Bodybuilding style for muscle balance and hypertrophy." },
        { "name": "Peaking Protocol", "sets": "Strategic", "reps": "Decreasing", "rest": "N/A", "notes": "Taper volume and increase intensity before competition." }
      ]
    },
    {
      "name": "Client: General Population Fat Loss",
      "exercises": [
        { "name": "Full Body Workouts", "sets": "3-4", "reps": "8-15", "rest": "60-75s", "notes": "Metabolic efficiency with compound movements." },
        { "name": "Progressive Overload Maintained", "sets": "Tracked", "reps": "Increasing", "rest": "N/A", "notes": "Continue getting stronger even in calorie deficit." },
        { "name": "Cardio Implementation", "sets": "2-4x weekly", "reps": "20-40min", "rest": "N/A", "notes": "LISS or MISS, not HIIT, to preserve recovery." },
        { "name": "Sustainability Focus", "sets": "Long-term", "reps": "Maintainable", "rest": "N/A", "notes": "Programs designed for long-term adherence." }
      ]
    },
    {
      "name": "Norton Deload Protocols",
      "exercises": [
        { "name": "Volume Deload", "sets": "50% reduction", "reps": "Same", "rest": "Same", "notes": "Cut volume in half for one week." },
        { "name": "Intensity Deload", "sets": "Same", "reps": "Same", "rest": "Same", "notes": "Use 60-70% of normal training weights." },
        { "name": "Frequency Deload", "sets": "Reduce sessions", "reps": "N/A", "rest": "N/A", "notes": "Train 2-3x instead of 4-5x for one week." },
        { "name": "Auto-Regulated Deload", "sets": "As needed", "reps": "Based on feel", "rest": "N/A", "notes": "Deload when performance decreases or fatigue is high." }
      ]
    },
    {
      "name": "Norton Nutrition Principles",
      "exercises": [
        { "name": "Calorie Balance Primary", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "Calories dictate weight loss/gain, macros dictate composition." },
        { "name": "Adequate Protein", "sets": "All phases", "reps": "1g/lb LBM", "rest": "N/A", "notes": "Sufficient protein for muscle preservation and growth." },
        { "name": "Flexible Dieting", "sets": "Sustainable", "reps": "IIFYM approach", "rest": "N/A", "notes": "Macro-based approach with mostly whole foods." },
        { "name": "Diet Breaks", "sets": "Strategic", "reps": "2 weeks maintenance", "rest": "N/A", "notes": "Periods at maintenance during extended fat loss phases." }
      ]
    },
    {
      "name": "Norton Weak Point Training System",
      "exercises": [
        { "name": "Priority Placement", "sets": "First in workout", "reps": "Varied", "rest": "N/A", "notes": "Train weak points when energy and focus are highest." },
        { "name": "Increased Frequency", "sets": "2-3x weekly", "reps": "Varied", "rest": "N/A", "notes": "Hit weak points more frequently than other body parts." },
        { "name": "Multiple Angles", "sets": "3-4 exercises", "reps": "Varied", "rest": "N/A", "notes": "Attack weak points from different angles in same workout." },
        { "name": "Extended Focus", "sets": "8-12 weeks", "reps": "N/A", "rest": "N/A", "notes": "Focus on weak points for extended periods before re-evaluating." }
      ]
    },
    {
      "name": "Norton Recovery Optimization",
      "exercises": [
        { "name": "Sleep Priority", "sets": "7-9 hours", "reps": "Nightly", "rest": "N/A", "notes": "Quality sleep is non-negotiable for recovery." },
        { "name": "Stress Management", "sets": "Daily", "reps": "Consistent", "rest": "N/A", "notes": "Manage life stress to improve recovery capacity." },
        { "name": "Nutrition Timing", "sets": "Around workouts", "reps": "Strategic", "rest": "N/A", "notes": "Adequate calories and protein around training sessions." },
        { "name": "Auto-Regulation", "sets": "Listen to body", "reps": "Adjust accordingly", "rest": "N/A", "notes": "Adjust training based on daily recovery status." }
      ]
    },
    {
      "name": "Client: Female Powerbuilder",
      "exercises": [
        { "name": "Strength Foundation", "sets": "4-5", "reps": "3-6", "rest": "120-180s", "notes": "Build strength with heavy compounds." },
        { "name": "Glute Emphasis", "sets": "3-4", "reps": "8-15", "rest": "75-90s", "notes": "Extra glute work with hip thrusts, RDLs, squats." },
        { "name": "Upper Body Balance", "sets": "3-4", "reps": "8-15", "rest": "60-90s", "notes": "Adequate upper body work for balanced development." },
        { "name": "Progressive Overload", "sets": "Tracked", "reps": "Increasing", "rest": "N/A", "notes": "Systematic progression in all lifts." }
      ]
    },
    {
      "name": "Client: Masters Athlete (40+)",
      "exercises": [
        { "name": "Lower Volume", "sets": "2-3", "reps": "6-12", "rest": "90-120s", "notes": "Reduced volume to manage recovery capacity." },
        { "name": "Higher Frequency", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "More frequent, shorter sessions." },
        { "name": "Joint-Friendly Exercises", "sets": "Priority", "reps": "Controlled", "rest": "N/A", "notes": "Machines, cables, dumbbells preferred over heavy barbells." },
        { "name": "Extended Warm-ups", "sets": "Thorough", "reps": "10-15", "rest": "N/A", "notes": "Longer warm-up sets and mobility work." }
      ]
    }
  ]
},
{
  "name": "Massy Arias",
  "image": "public/coaches/arias.webp",
  "style": "Functional Strength, HIIT, Holistic Wellness, Mind-Body Connection, Glute Building",
  "description": "Celebrity fitness trainer and holistic wellness coach known for her high-energy workouts and balanced approach to health. Focuses on building strong, functional physiques through a combination of heavy lifting, metabolic conditioning, and mindful recovery. Empowers clients to connect fitness with overall well-being.",
  "achievements": "Internationally recognized trainer, founder of the Train Like A Goddess program, featured in major publications like Women's Health, ESPN, and Shape. Built a massive global following by promoting a sustainable and empowering fitness lifestyle.",
  "career": "Over a decade in the fitness industry, transitioning from a passionate individual to a leading influencer and coach. Known for her signature 'Massy Method' which blends strength training, HIIT, and holistic practices to help clients achieve their physical and mental goals.",
  "splits": [
    {
      "name": "Massy's Signature Lower Body & Glute Day",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Her cornerstone glute exercise. Focus on squeezing at the top and controlled lowering." },
        { "name": "Barbell Squats", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "Emphasis on depth and form over heavy weight. Keep chest up and core tight." },
        { "name": "Romanian Deadlifts (RDLs)", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Focus on hamstring stretch and glute engagement. Maintain a flat back." },
        { "name": "Bulgarian Split Squats", "sets": 3, "reps": "10-12 per leg", "rest": "75s", "notes": "Excellent for unilateral strength and glute activation. Use dumbbells for added resistance." },
        { "name": "Cable Kickbacks", "sets": 3, "reps": "15-20 per leg", "rest": "60s", "notes": "Isolation move for glute definition. Squeeze hard at the top of the movement." }
      ]
    },
    {
      "name": "Massy's Upper Body Strength & Conditioning",
      "exercises": [
        { "name": "Dumbbell Bench Press", "sets": 4, "reps": "8-12", "rest": "75s", "notes": "Builds chest and shoulder strength. Control the descent." },
        { "name": "Bent-Over Dumbbell Rows", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Key for a strong back. Squeeze shoulder blades together at the top." },
        { "name": "Standing Overhead Press", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Develops shoulder strength and stability. Avoid arching the lower back." },
        { "name": "Pull-Ups or Lat Pulldowns", "sets": 3, "reps": "6-10 / 10-15", "rest": "75s", "notes": "Focus on driving with the back, not the arms." },
        { "name": "Dumbbell Bicep Curls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Strict form, no swinging. Superset with triceps exercise." },
        { "name": "Triceps Dips or Skull Crushers", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Focus on stretching and contracting the triceps." }
      ]
    },
    {
      "name": "Massy's Metabolic HIIT Finisher",
      "exercises": [
        { "name": "Burpees", "sets": 1, "reps": "45s ON, 15s OFF", "rest": "N/A", "notes": "Full body explosive movement. Modify by stepping back." },
        { "name": "Mountain Climbers", "sets": 1, "reps": "45s ON, 15s OFF", "rest": "N/A", "notes": "Fast-paced core and cardio burner." },
        { "name": "Kettlebell Swings", "sets": 1, "reps": "45s ON, 15s OFF", "rest": "N/A", "notes": "Power from the hips, not the arms." },
        { "name": "Jump Squats", "sets": 1, "reps": "45s ON, 15s OFF", "rest": "N/A", "notes": "Plyometric for power and heart rate." },
        { "name": "Plank", "sets": 1, "reps": "45s ON, 15s OFF", "rest": "N/A", "notes": "Active recovery while engaging the entire core." }
      ]
    },
    {
      "name": "Full Body Functional Strength",
      "exercises": [
        { "name": "Dumbbell Lunges", "sets": 4, "reps": "10-12 per leg", "rest": "75s", "notes": "Unilateral movement for balance and leg strength." },
        { "name": "Push-Ups", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Modify on knees if needed. Maintain a straight body line." },
        { "name": "Kettlebell Sumo Deadlifts", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Great for inner thighs and glutes. Keep back straight." },
        { "name": "Seated Cable Rows", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Focus on squeezing the mid-back." },
        { "name": "Plank to Downward Dog", "sets": 3, "reps": "10-12", "rest": "45s", "notes": "Dynamic movement for core, shoulders, and mobility." }
      ]
    },
    {
      "name": "Client Workout: Fat Loss & Toning (Beginner)",
      "exercises": [
        { "name": "Goblet Squats", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Beginner-friendly squat variation. Hold a dumbbell or kettlebell." },
        { "name": "Incline Push-Ups", "sets": 3, "reps": "10-12", "rest": "60s", "rest": "60s", "notes": "Easier variation to build chest and shoulder strength." },
        { "name": "Dumbbell RDLs", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Teach the hip hinge pattern with lighter weight." },
        { "name": "Bird-Dog", "sets": 3, "reps": "10-12 per side", "rest": "45s", "notes": "Develops core stability and coordination." },
        { "name": "Stationary Bike Sprints", "sets": 5, "reps": "30s ON, 60s OFF", "rest": "60s", "notes": "Low-impact cardio finisher." }
      ]
    },
    {
      "name": "Client Workout: Glute & Hamstring Focus (Intermediate)",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Progressive overload is key. Increase weight over time." },
        { "name": "KAS Glute Bridges", "sets": 3, "reps": "20-25", "rest": "60s", "notes": "Short-range pulses at the top to burn out the glutes." },
        { "name": "Deficit Reverse Lunges", "sets": 3, "reps": "10-12 per leg", "rest": "75s", "notes": "Increases range of motion for greater glute activation." },
        { "name": "Seated Leg Curls", "sets": 4, "reps": "15-20", "rest": "60s", "notes": "Isolate and fatigue the hamstrings." },
        { "name": "Cable Pull-Throughs", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Excellent for mind-muscle connection with glutes and hams." }
      ]
    },
    {
      "name": "The Massy Method Principles",
      "exercises": [
        { "name": "Consistency Over Intensity", "sets": "Lifestyle", "reps": "Daily", "rest": "N/A", "notes": "Showing up consistently is more important than occasional extreme effort." },
        { "name": "Holistic Health", "sets": "All Aspects", "reps": "Constant", "rest": "N/A", "notes": "Fitness is not just the gym; it's nutrition, sleep, and mental health." },
        { "name": "Mindful Movement", "sets": "Every workout", "reps": "Every rep", "rest": "N/A", "notes": "Be present in your workout. Feel the muscles working and control the movement." },
        { "name": "Progressive Overload", "sets": "Weekly/Monthly", "reps": "Tracked", "rest": "N/A", "notes": "Gradually increase weight, reps, or sets to keep making progress." },
        { "name": "Balance is Key", "sets": "Life", "reps": "Always", "rest": "N/A", "notes": "Train hard, but also enjoy life, eat foods you love in moderation, and rest." }
      ]
    },
    {
      "name": "Massy's Recovery & Mobility Session",
      "exercises": [
        { "name": "Foam Rolling (Full Body)", "sets": 1, "reps": "60s per muscle", "rest": "N/A", "notes": "Focus on quads, glutes, back, and lats." },
        { "name": "Pigeon Pose", "sets": 3, "reps": "30-45s per side", "rest": "N/A", "notes": "Deep stretch for glutes and hip flexors." },
        { "name": "90/90 Hip Stretch", "sets": 3, "reps": "30s per side", "rest": "N/A", "notes": "Improves internal and external hip rotation." },
        { "name": "Cat-Cow Stretch", "sets": 10, "reps": "Fluid reps", "rest": "N/A", "notes": "Mobilizes the spine and relieves back tension." },
        { "name": "Deep Breathing", "sets": 1, "reps": "5 mins", "rest": "N/A", "notes": "Activates the parasympathetic nervous system for recovery." }
      ]
    }
  ]
},
{
  "name": "Natacha Océane",
  "image": "public/coaches/natacha.jpg",
  "style": "Evidence-Based Training, Biomechanics, Performance-Focused, Hybrid Athlete, Macro-Nutrient Cycling",
  "description": "Scientist and elite fitness coach known for her deep-dive, evidence-based approach to training and nutrition. Focuses on building athletic, functional physiques through optimized programming that blends strength, power, hypertrophy, and conditioning. Promotes a 'food-first' philosophy and individualizes everything based on personal data and goals.",
  "achievements": "Creator of the highly popular Build, Cut, and Home training programs. Holds a Masters degree in Medical Sciences. Known for her YouTube channel where she debunks fitness myths and explains complex physiological concepts in an accessible way. Competes in fitness model categories and is a renowned hybrid athlete.",
  "career": "Transitioned from a career in cancer research to full-time fitness content creation and coaching. Built a global reputation by applying scientific rigor to fitness, focusing on measurable performance metrics, sustainable dieting, and intelligent program design that avoids dogma.",
  "splits": [
    {
      "name": "Natacha's Lower Body Strength & Power",
      "exercises": [
        { "name": "Barbell Back Squats", "sets": 5, "reps": "3-5", "rest": "180s", "notes": "Focus on maximal strength. Uses velocity-based training cues - 'explosive on the concentric'." },
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "6-8", "rest": "120s", "notes": "Heavy, progressive overload. Pause at the top for glute engagement." },
        { "name": "Deficit Reverse Lunges", "sets": 3, "reps": "8-10 per leg", "rest": "90s", "notes": "Unilateral stability and strength. Uses dumbbells or a barbell." },
        { "name": "Nordic Hamstring Curls", "sets": 3, "reps": "5-8", "rest": "120s", "notes": "Key for hamstring health, strength, and injury prevention." },
        { "name": "Plyometric Box Jumps", "sets": 4, "reps": "3-5", "rest": "120s", "notes": "Power development. Focus on quality of jump and soft landing." }
      ]
    },
    {
      "name": "Natacha's Upper Body Push & Pull",
      "exercises": [
        { "name": "Weighted Pull-Ups", "sets": 4, "reps": "4-6", "rest": "150s", "notes": "Primary back strength movement. Uses belt for added weight." },
        { "name": "Flat Barbell Bench Press", "sets": 4, "reps": "5-8", "rest": "150s", "notes": "Focus on technical proficiency and power off the chest." },
        { "name": "Standing Overhead Press (Barbell)", "sets": 3, "reps": "6-8", "rest": "120s", "notes": "Full body bracing. Strict form to avoid excessive lean." },
        { "name": "Seated Cable Rows", "sets": 3, "reps": "8-12", "rest": "75s", "notes": "Hypertrophy focus for the mid-back. Squeeze and hold." },
        { "name": "Dips (Weighted)", "sets": 3, "reps": "6-10", "rest": "90s", "notes": "Triceps and chest strength. Goes deep for full ROM." },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Pre-hab for shoulder health. External rotation emphasis." }
      ]
    },
    {
      "name": "Natacha's Conditioning & MetCon",
      "exercises": [
        { "name": "Assault Bike Sprints", "sets": 10, "reps": "30s ON, 60s OFF", "rest": "60s", "notes": "Max effort sprints. Measures and tracks output (calories/watts)." },
        { "name": "Sandbag Cleans", "sets": 5, "reps": "5", "rest": "90s", "notes": "Full-body power and conditioning. Focus on technique under fatigue." },
        { "name": "Burpee Box Jump Overs", "sets": 3, "reps": "60s AMRAP", "rest": "120s", "notes": "High-skill, high-output movement. Measures work capacity." },
        { "name": "Kettlebell Swings (Heavy)", "sets": 4, "reps": "15", "rest": "75s", "notes": "Hip-hinge power. Strict form to protect the back." },
        { "name": "Sled Push/Pull", "sets": 4, "reps": "40m", "rest": "90s", "notes": "Low-impact, high-effort finisher. Full body grind." }
      ]
    },
    {
      "name": "Natacha's Full Body Accessory & Pump",
      "exercises": [
        { "name": "Bulgarian Split Squats", "sets": 3, "reps": "10-15 per leg", "rest": "75s", "notes": "Mind-muscle connection with glutes and quads. Time under tension." },
        { "name": "Incline Dumbbell Press", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Upper chest hypertrophy. Controlled tempo." },
        { "name": "Lat Pulldowns (Close Grip)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Lat width and thickness. Stretch at the top." },
        { "name": "Cable Lateral Raises", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Isolation for medial delts. Constant tension." },
        { "name": "Cable Glute Kickbacks", "sets": 3, "reps": "15-20 per leg", "rest": "45s", "notes": "Glute isolation for a pump and mind-muscle connection." }
      ]
    },
    {
      "name": "Client Archetype: The 'Build' Program (Muscle & Strength Focus)",
      "exercises": [
        { "name": "Tempo Squats (3-1-1-0)", "sets": 4, "reps": "6-8", "rest": "150s", "notes": "Slow eccentric to build tension and technique." },
        { "name": "Pause Bench Press", "sets": 4, "reps": "6-8", "rest": "150s", "notes": "1-second pause at chest to build strength off the chest." },
        { "name": "Romanian Deadlifts (RDLs)", "sets": 3, "reps": "8-10", "rest": "120s", "notes": "Hamstring and glute development. Focus on stretch." },
        { "name": "Chin-Ups", "sets": 3, "reps": "6-10", "rest": "120s", "notes": "Builds biceps and back. Use assistance if needed." },
        { "name": "Dumbbell Overhead Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Unilateral stability and shoulder development." }
      ]
    },
    {
      "name": "Client Archetype: The 'Cut' Program (Maintenance & Conditioning)",
      "exercises": [
        { "name": "Front Squats", "sets": 4, "reps": "8-10", "rest": "120s", "notes": "Maintains leg strength with a core stability component." },
        { "name": "Bench Press", "sets": 4, "reps": "8-10", "rest": "120s", "notes": "Maintains pressing strength in a calorie deficit." },
        { "name": "Bent-Over Rows", "sets": 3, "reps": "10-12", "rest": "90s", "notes": "Maintains back thickness." },
        { "name": "Circuit: DB Snatch, Plank, Jump Squats", "sets": 3, "reps": "10/side, 45s, 12", "rest": "90s after circuit", "notes": "Conditioning circuit to preserve muscle and burn calories." }
      ]
    },
    {
      "name": "Client Archetype: The 'Home' Program (Minimal Equipment)",
      "exercises": [
        { "name": "Pistol Squat Progressions", "sets": 4, "reps": "5-8 per leg", "rest": "120s", "notes": "Maximizes leg development with bodyweight." },
        { "name": "Pull-Ups / Inverted Rows", "sets": 4, "reps": "Max / 10-15", "rest": "120s", "notes": "Uses a pull-up bar or table. Focus on full ROM." },
        { "name": "Push-Up Variations (Archer/Deficit)", "sets": 4, "reps": "8-15", "rest": "90s", "notes": "Increases difficulty without weight." },
        { "name": "Nordic Hamstring Curl Negatives", "sets": 3, "reps": "5", "rest": "120s", "notes": "Eccentric focus for hamstring development." },
        { "name": "Single-Leg Glute Bridges", "sets": 3, "reps": "12-15 per leg", "rest": "60s", "notes": "Glute activation and hypertrophy." }
      ]
    },
    {
      "name": "The 'Natacha Method' Principles",
      "exercises": [
        { "name": "Individualize Everything", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "No one-size-fits-all. Programs are tailored to individual structure, recovery, and goals." },
        { "name": "Progressive Overload is Mandatory", "sets": "All Sessions", "reps": "Tracked", "rest": "N/A", "notes": "Systematically increase weight, reps, or density over time." },
        { "name": "Track & Measure Performance", "sets": "Always", "reps": "Quantified", "rest": "N/A", "notes": "Uses metrics like velocity, RPE (Rate of Perceived Exertion), and volume to guide training." },
        { "name": "Fuel for Performance", "sets": "Nutrition", "reps": "Daily", "rest": "N/A", "notes": "Uses macro-nutrient cycling (e.g., more carbs on training days) to fuel workouts and recovery." },
        { "name": "Focus on Biomechanics", "sets": "Every Rep", "reps": "Perfect", "rest": "N/A", "notes": "Understands and optimizes movement patterns for efficiency and injury prevention." }
      ]
    },
    {
      "name": "Natacha's Mobility & Movement Prep",
      "exercises": [
        { "name": "Dynamic Cat-Cow", "sets": 1, "reps": "10 reps", "rest": "N/A", "notes": "Mobilizes the spine for squatting and pressing." },
        { "name": "World's Greatest Stretch", "sets": 1, "reps": "5 per side", "rest": "N/A", "notes": "Dynamic full-body stretch for hips, thorax, and hamstrings." },
        { "name": "Scapular Pull-Ups", "sets": 2, "reps": "10", "rest": "N/A", "notes": "Activates and controls the scapula for upper body days." },
        { "name": "Band-Resisted Hip Airplane", "sets": 2, "reps": "8 per side", "rest": "N/A", "notes": "Improves hip mobility and stability for lower body training." },
        { "name": "Ankle Rockers", "sets": 2, "reps": "10", "rest": "N/A", "notes": "Ensures adequate ankle dorsiflexion for deep squats." }
      ]
    }
  ]
},
{
  "name": "Jordan Syatt",
  "image": "public/coaches/syatt.jpg",
  "style": "Powerlifting, Strength & Conditioning, Sustainable Fitness, Fat Loss, Evidence-Based Coaching",
  "description": "World-record holding powerlifter and founder of Syatt Fitness. Known for a no-BS, evidence-based approach that prioritizes long-term progress, strength building, and sustainable fat loss over quick fixes. His coaching focuses on mastering fundamental movements and integrating fitness into a realistic lifestyle.",
  "achievements": "Holds the Guinness World Record for the Heviest Deadlift at 501 lbs (227 kg) at 132 lbs (60 kg) body weight. Has coached tens of thousands of clients online, including numerous celebrities. Renowned for debunking fitness myths and providing practical, actionable advice.",
  "career": "Over a decade in the fitness industry as a coach, content creator, and consultant. Previously the Director of Online Training for powerlifter Mark Bell's Super Training Gym. His YouTube channel and Instagram are dedicated to educating people on realistic training and nutrition.",
  "splits": [
    {
      "name": "Syatt Strength Foundation (3-Day Full Body)",
      "exercises": [
        { "name": "Barbell Squat", "sets": 3, "reps": "5", "rest": "120-180s", "notes": "Focus on perfect technique and progressive overload" },
        { "name": "Barbell Bench Press", "sets": 3, "reps": "5", "rest": "120-180s", "notes": "Control the weight, touch the chest lightly" },
        { "name": "Bent-Over Barbell Row", "sets": 3, "reps": "8", "rest": "90s", "notes": "Keep back flat, pull to lower chest/upper stomach" },
        { "name": "Overhead Press (Standing)", "sets": 3, "reps": "8", "rest": "90s", "notes": "Brace core, press directly overhead" },
        { "name": "Pull-ups or Lat Pulldowns", "sets": 3, "reps": "5-10", "rest": "90s", "notes": "Full range of motion, focus on lat engagement" },
        { "name": "Face Pulls", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Essential for shoulder health and posture" }
      ]
    },
    {
      "name": "Syatt Deadlift & Accessory Day",
      "exercises": [
        { "name": "Conventional or Sumo Deadlift", "sets": 1, "reps": "3-5", "rest": "180s+", "notes": "One heavy top set after warm-ups. Form is paramount." },
        { "name": "Pendlay Rows", "sets": 3, "reps": "5-8", "rest": "120s", "notes": "Explosive pull from a dead stop on the floor" },
        { "name": "Bulgarian Split Squats", "sets": 3, "reps": "8-10 per leg", "rest": "90s", "notes": "Excellent for unilateral leg strength and stability" },
        { "name": "Dumbbell Incline Press", "sets": 3, "reps": "8-12", "rest": "90s", "notes": "Focus on stretch and contraction" },
        { "name": "Plank", "sets": 3, "reps": "30-60s hold", "rest": "60s", "notes": "Full body bracing, no sagging hips" }
      ]
    },
    {
      "name": "Syatt Hypertrophy & Conditioning Day",
      "exercises": [
        { "name": "Goblet Squats", "sets": 3, "reps": "10-15", "rest": "75s", "notes": "Great for depth and core engagement" },
        { "name": "Dumbbell Rows", "sets": 3, "reps": "10-12 per arm", "rest": "75s", "notes": "Brace on bench, focus on squeezing the lat" },
        { "name": "Dumbbell Lateral Raises", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Light weight, controlled movement to failure" },
        { "name": "Tricep Rope Pushdowns", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Focus on squeezing the triceps at the bottom" },
        { "name": "Hammer Curls", "sets": 3, "reps": "10-12", "rest": "60s", "notes": "Strict form, no swinging" },
        { "name": "Farmer's Walks", "sets": 3, "reps": "40-50 meters", "rest": "90s", "notes": "Grip strength, core stability, and conditioning" }
      ]
    },
    {
      "name": "The 'Minimalist' Fat Loss Workout (Syatt Style)",
      "exercises": [
        { "name": "Barbell or Kettlebell Deadlift", "sets": 3, "reps": "8-10", "rest": "90s", "notes": "Full body compound movement" },
        { "name": "Push-ups (or Knees)", "sets": 3, "reps": "As Many As Possible (AMRAP)", "rest": "60s", "notes": "Go until you have 1-2 reps left in the tank" },
        { "name": "Bodyweight Rows or Inverted Rows", "sets": 3, "reps": "AMRAP", "rest": "60s", "notes": "Set up a bar in a rack, focus on back" },
        { "name": "Bodyweight Squats or Jump Squats", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Controlled or explosive for power" },
        { "name": "Plank", "sets": 3, "reps": "30-60s hold", "rest": "45s", "notes": "Maintain a straight line" }
      ]
    },
    {
      "name": "Syatt Fitness Principles (The Foundation)",
      "exercises": [
        { "name": "Progressive Overload", "sets": "Always", "reps": "Always", "rest": "N/A", "notes": "The cornerstone of all progress. Add weight, reps, or sets over time." },
        { "name": "Consistency Over Perfection", "sets": "Lifetime", "reps": "Daily", "rest": "N/A", "notes": "Showing up 80% of the time is better than 100% for 2 weeks then quitting." },
        { "name": "Master the Basics", "sets": "Forever", "reps": "Forever", "rest": "N/A", "notes": "You don't need fancy exercises. Get strong on Squats, Hinges, Presses, and Rows." },
        { "name": "Nutrition Determines Body Composition", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "You can't out-train a bad diet. Focus on protein intake and a sustainable calorie target." },
        { "name": "Track Your Food (Temporarily)", "sets": "2-4 weeks", "reps": "Daily", "rest": "N/A", "notes": "Not forever, but to learn portion sizes and calorie content of foods." }
      ]
    }
  ]
},
{
  "name": "Chris Heria",
  "image": "public/coaches/heria.png",
  "style": "Calisthenics, Street Workout, Skill-Based Training, High-Intensity Circuits, Bodyweight Mastery",
  "description": "Founder of ThenX and a leading figure in the modern calisthenics movement. Heria's style focuses on using bodyweight exercises to build impressive levels of strength, muscle, and skill. His training incorporates foundational movements, isometric holds, and dynamic skills to create a athletic and aesthetic physique.",
  "achievements": "Founder of the ThenX fitness brand and app. Built a massive global following through YouTube, popularizing advanced calisthenics. Known for performing and teaching skills like the Planche, Front Lever, and Muscle-Up. Has trained numerous athletes and individuals in bodyweight mastery.",
  "career": "Rose to prominence as a member of the BarStarzz calisthenics team. Founded ThenX to create a comprehensive platform for calisthenics training, offering programs for all levels. His content ranges from beginner tutorials to advanced skill breakdowns and high-intensity workouts.",
  "splits": [
    {
      "name": "Heria Full Body Calisthenics (ThenX Style)",
      "exercises": [
        { "name": "Pull-ups", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Use variations: wide grip, close grip, or mixed" },
        { "name": "Parallel Bar Dips", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Go deep for full chest and tricep engagement" },
        { "name": "Pistol Squat Progressions", "sets": 4, "reps": "8-10 per leg", "rest": "75s", "notes": "Use assistance if needed, focus on balance and depth" },
        { "name": "Push-ups", "sets": 4, "reps": "15-25", "rest": "60s", "notes": "Variations: decline, diamond, or archer for intensity" },
        { "name": "Bodyweight Rows (Australian Pull-ups)", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Keep body straight, pull chest to bar" },
        { "name": "L-sit or Hanging Knee Raises", "sets": 3, "reps": "30-60s hold or 10-15 reps", "rest": "60s", "notes": "Core finisher, focus on compression" }
      ]
    },
    {
      "name": "ThenX Push Day (Chest, Shoulders, Triceps)",
      "exercises": [
        { "name": "Weighted Dips", "sets": 4, "reps": "8-12", "rest": "90s", "notes": "Add weight with a belt or vest for progression" },
        { "name": "Planche Push-up Progressions", "sets": 4, "reps": "5-10", "rest": "120s", "notes": "e.g., Pseudo Planche Push-ups, lean forward significantly" },
        { "name": "Pike Push-ups", "sets": 4, "reps": "10-15", "rest": "75s", "notes": "Foundation for Handstand Push-ups" },
        { "name": "Bar Dips (Tricep Focus)", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Stay upright to target triceps" },
        { "name": "Handstand Hold (against wall)", "sets": 3, "reps": "30-60s hold", "rest": "90s", "notes": "Shoulder strength and balance practice" }
      ]
    },
    {
      "name": "ThenX Pull Day (Back, Biceps)",
      "exercises": [
        { "name": "Muscle-ups (or Pull-up to Chest)", "sets": 4, "reps": "3-8", "rest": "120s", "notes": "The ultimate calisthenics skill. Use bands for progression." },
        { "name": "Front Lever Progressions", "sets": 4, "reps": "10-30s hold", "rest": "120s", "notes": "e.g., Tuck Lever, Advanced Tuck, One-Leg Lever" },
        { "name": "Weighted Pull-ups", "sets": 4, "reps": "5-8", "rest": "90s", "notes": "Primary strength builder for the back" },
        { "name": "Front Pulls (Typewriter Pull-ups)", "sets": 3, "reps": "5-8 per side", "rest": "90s", "notes": "Advanced move for lat and core strength" },
        { "name": "Bodyweight Bicep Curls (Ring/TRX)", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Lean back to increase difficulty" }
      ]
    },
    {
      "name": "ThenX Legs & Core Day",
      "exercises": [
        { "name": "Pistol Squats", "sets": 4, "reps": "5-8 per leg", "rest": "90s", "notes": "The gold standard for single-leg bodyweight strength" },
        { "name": "Nordic Hamstring Curls", "sets": 4, "reps": "5-10", "rest": "90s", "notes": "Eccentric-focused for hamstring development" },
        { "name": "Jump Squats", "sets": 3, "reps": "15-20", "rest": "75s", "notes": "Plyometric for power and explosiveness" },
        { "name": "Shrimp Squats", "sets": 3, "reps": "8-10 per leg", "rest": "75s", "notes": "Alternative single-leg squat variation" },
        { "name": "Dragon Flags", "sets": 3, "reps": "5-10", "rest": "90s", "notes": "Advanced core strength builder" },
        { "name": "Hanging Leg Raises", "sets": 3, "reps": "10-15", "rest": "60s", "notes": "Full range of motion, touch the bar" }
      ]
    },
    {
      "name": "Beginner ThenX Foundation Workout",
      "exercises": [
        { "name": "Assisted Pull-ups (Bands)", "sets": 4, "reps": "5-8", "rest": "90s", "notes": "Build strength to perform a full pull-up" },
        { "name": "Knee Push-ups", "sets": 4, "reps": "10-15", "rest": "60s", "notes": "Master form before moving to full push-ups" },
        { "name": "Assisted Squats", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Hold onto a post for balance and depth" },
        { "name": "Incline Bodyweight Rows", "sets": 4, "reps": "8-12", "rest": "75s", "notes": "The more upright you are, the easier it is" },
        { "name": "Plank", "sets": 3, "reps": "20-40s hold", "rest": "45s", "notes": "Focus on a straight line from head to heels" }
      ]
    },
    {
      "name": "Advanced Skill Day (Heria Style)",
      "exercises": [
        { "name": "Strict Muscle-ups (on Rings/Bar)", "sets": 5, "reps": "1-3", "rest": "180s", "notes": "Focus on perfect, kip-free form" },
        { "name": "Planche Progressions Hold", "sets": 5, "reps": "10-20s hold", "rest": "120s", "notes": "e.g., Tuck Planche, Advanced Tuck Planche" },
        { "name": "Front Lever Hold", "sets": 5, "reps": "10-20s hold", "rest": "120s", "notes": "Max hold in your current progression" },
        { "name": "Handstand Push-up Progressions", "sets": 4, "reps": "3-8", "rest": "120s", "notes": "Against wall, focus on full range of motion" },
        { "name": "90-Degree Hold", "sets": 3, "reps": "5-15s hold", "rest": "150s", "notes": "Advanced core and shoulder strength" }
      ]
    },
    {
      "name": "ThenX High-Intensity Circuit (Fat Loss)",
      "exercises": [
        { "name": "Pull-ups", "sets": 1, "reps": "Max Reps", "rest": "30s", "notes": "Part of a circuit. Move quickly between exercises." },
        { "name": "Burpees", "sets": 1, "reps": "15", "rest": "30s", "notes": "Full body explosive movement" },
        { "name": "Dips", "sets": 1, "reps": "15-20", "rest": "30s", "notes": "Controlled tempo" },
        { "name": "Mountain Climbers", "sets": 1, "reps": "30 (per leg)", "rest": "30s", "notes": "Fast and controlled" },
        { "name": "Bodyweight Squats", "sets": 1, "reps": "20", "rest": "30s", "notes": "Focus on depth" },
        { "name": "Plank", "sets": 1, "reps": "60s hold", "rest": "60s", "notes": "Repeat the entire circuit 3-5 times." }
      ]
    },
    {
      "name": "Ring Training Specialization (Advanced)",
      "exercises": [
        { "name": "Ring Dips", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Stabilize rings, don't let them shake. Go deep." },
        { "name": "Ring Pull-ups", "sets": 4, "reps": "6-10", "rest": "120s", "notes": "Rings turn out at the top for greater ROM" },
        { "name": "Ring Push-ups", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Extreme chest stretch and core engagement" },
        { "name": "Ring Face Pulls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Crucial for shoulder health and rear delts" },
        { "name": "Ring L-sit Hold", "sets": 4, "reps": "20-40s hold", "rest": "90s", "notes": "Support hold and core compression" }
      ]
    },
    {
      "name": "The Heria Method Principles",
      "exercises": [
        { "name": "Progressive Overload", "sets": "Always", "reps": "Always", "rest": "N/A", "notes": "Increase reps, slow tempo, use harder variations (e.g., push-up -> archer push-up -> one-arm push-up)" },
        { "name": "Skill is Strength", "sets": "Dedicated Days", "reps": "Practice", "rest": "N/A", "notes": "Dedicate time to practicing skills like Planche and Front Lever, not just metabolic work." },
        { "name": "Consistency Over Intensity", "sets": "Lifetime", "reps": "Daily", "rest": "N/A", "notes": "Training regularly is more important than killing yourself in one session and burning out." },
        { "name": "Master the Basics", "sets": "Forever", "reps": "Perfectly", "rest": "N/A", "notes": "You can't do a Muscle-Up without a strong Pull-Up. Perfect your foundational movements first." },
        { "name": "Train for Function & Form", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "The goal is a capable, athletic body that looks as good as it performs." }
      ]
    }
  ]
},
{
  "name": "Hannah Bower",
  "image": "public/coaches/hannah.jpg",
  "style": "Functional Strength, Core Foundations, Pre/Postnatal Fitness, Mindful Movement, Glute & Back Development",
  "description": "Highly influential strength coach and fitness educator specializing in functional training, core rehabilitation, and safe, effective exercise for motherhood (pre/postnatal). Her methodology focuses on building a strong, resilient body from the inside out, with an emphasis on core and pelvic floor health, proper breathing, and compound movements.",
  "achievements": "Built a massive online community by educating on core recovery and safe training during and after pregnancy. Creator of the popular core guide and various training programs. Recognized as a leading voice in evidence-based, functional fitness for women.",
  "career": "Certified personal trainer and nutrition coach who gained prominence through her transparent and educational social media content. She shifted her focus to prenatal and postpartum fitness after her own experiences with motherhood, becoming a go-to resource for women worldwide seeking to train safely and effectively.",
  "splits": [
    {
      "name": "Hannah Bower Full Body Strength",
      "exercises": [
        { "name": "Barbell Squats", "sets": 4, "reps": "8-10", "rest": "90s", "notes": "Focus on depth and bracing, not max weight" },
        { "name": "Dumbbell Bench Press", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Controlled tempo, full range of motion" },
        { "name": "Bent-Over Barbell Rows", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Keep back flat, squeeze shoulder blades" },
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "12-15", "rest": "90s", "notes": "Focus on glute contraction at the top" },
        { "name": "Plank", "sets": 3, "reps": "30-45s hold", "rest": "60s", "notes": "Emphasis on full-body tension and breathing" }
      ]
    },
    {
      "name": "Hannah Bower Glute & Hamstring Day",
      "exercises": [
        { "name": "Barbell Hip Thrusts", "sets": 4, "reps": "10-15", "rest": "90s", "notes": "Primary movement, focus on mind-muscle connection" },
        { "name": "Romanian Deadlifts (RDLs)", "sets": 4, "reps": "10-12", "rest": "90s", "notes": "Focus on hamstring stretch, keep back neutral" },
        { "name": "Goblet Squats", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Deep squats to engage glutes fully" },
        { "name": "Cable Pull-Throughs", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Great for glute-hamstring tie-in and pelvic positioning" },
        { "name": "Banded Glute Bridges", "sets": 3, "reps": "20-25", "rest": "45s", "notes": "Burnout set for glute activation" }
      ]
    },
    {
      "name": "Hannah Bower Back & Core Focus",
      "exercises": [
        { "name": "Lat Pulldowns", "sets": 4, "reps": "10-12", "rest": "75s", "notes": "Focus on stretching lats, pull to chest" },
        { "name": "Seated Cable Rows", "sets": 3, "reps": "12-15", "rest": "75s", "notes": "Squeeze mid-back, avoid using momentum" },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Essential for shoulder health and posture" },
        { "name": "Dead Bugs", "sets": 3, "reps": "10-12 per side", "rest": "60s", "notes": "Core stabilization, prevent coning/doming" },
        { "name": "Bird-Dogs", "sets": 3, "reps": "10-12 per side", "rest": "60s", "notes": "Anti-rotation core work" }
      ]
    },
    {
      "name": "The Bower Core Foundation (Core 1.0)",
      "exercises": [
        { "name": "Breathing & Bracing Drill", "sets": 1, "reps": "5-10 breaths", "rest": "N/A", "notes": "Practice 360-degree expansion of the core without pelvic floor bearing down" },
        { "name": "Dead Bugs", "sets": 3, "reps": "8-10 per side", "rest": "60s", "notes": "Maintain rib cage down, press lower back into floor" },
        { "name": "Bird-Dogs", "sets": 3, "reps": "8-10 per side", "rest": "60s", "notes": "Slow and controlled, focus on stability" },
        { "name": "Pallof Press", "sets": 3, "reps": "8-10 per side", "rest": "60s", "notes": "Anti-rotation, resist the pull of the cable" },
        { "name": "Side Plank (or Modified)", "sets": 2, "reps": "20-30s hold per side", "rest": "45s", "notes": "Build oblique strength without flexion" }
      ]
    },
    {
      "name": "Prenatal Strength & Stability (Modified)",
      "exercises": [
        { "name": "Goblet Squats", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Wider stance if needed for belly comfort" },
        { "name": "Elevated Push-ups", "sets": 3, "reps": "8-12", "rest": "60s", "notes": "Use bench or wall to accommodate growing belly" },
        { "name": "Single-Arm Rows", "sets": 3, "reps": "10-12 per arm", "rest": "60s", "notes": "Brace on bench for support" },
        { "name": "Banded Glute Bridges", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Support glutes and pelvic alignment" },
        { "name": "Bird-Dogs", "sets": 3, "reps": "8-10 per side", "rest": "60s", "notes": "Safe core stability exercise" }
      ]
    },
    {
      "name": "Postpartum Return to Fitness (Phase 1)",
      "exercises": [
        { "name": "Diaphragmatic Breathing", "sets": "Daily", "reps": "5-10 mins", "rest": "N/A", "notes": "Reconnect with core and pelvic floor" },
        { "name": "Heel Slides", "sets": 2, "reps": "10-12 per side", "rest": "30s", "notes": "Gentle core re-engagement" },
        { "name": "Banded Glute Bridges", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Reactivate glutes without strain" },
        { "name": "Wall Push-ups", "sets": 3, "reps": "10-15", "rest": "45s", "notes": "Rebuild upper body strength gently" },
        { "name": "Short Walk", "sets": "Daily", "reps": "10-20 mins", "rest": "N/A", "notes": "Low-impact cardiovascular activity" }
      ]
    },
    {
      "name": "Strong & Stable Shoulders",
      "exercises": [
        { "name": "Seated Dumbbell Press", "sets": 3, "reps": "10-12", "rest": "75s", "notes": "Brace core, avoid overarching lower back" },
        { "name": "Dumbbell Lateral Raises", "sets": 3, "reps": "12-15", "rest": "60s", "notes": "Light weight, focus on form and control" },
        { "name": "Bent-Over Rear Delt Flyes", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "Squeeze rear delts for posture" },
        { "name": "Face Pulls", "sets": 3, "reps": "15-20", "rest": "60s", "notes": "The cornerstone of shoulder health" },
        { "name": "Scapular Wall Slides", "sets": 2, "reps": "10-12", "rest": "45s", "notes": "Mobility and scapular health" }
      ]
    },
    {
      "name": "The Bower Method Principles",
      "exercises": [
        { "name": "Brace, Don't Suck In", "sets": "Every lift", "reps": "Every rep", "rest": "N/A", "notes": "Create 360-degree intra-abdominal pressure to protect the spine and core" },
        { "name": "Form Over Everything", "sets": "All sets", "reps": "All reps", "rest": "N/A", "notes": "Never sacrifice form for more weight or reps. Quality is paramount." },
        { "name": "Listen to Your Body", "sets": "Daily", "reps": "Constantly", "rest": "N/A", "notes": "Distinguish between discomfort and pain. Adjust based on energy, cycle, and recovery." },
        { "name": "Core is More Than Abs", "sets": "N/A", "reps": "N/A", "rest": "N/A", "notes": "The core includes deep stabilizers, the pelvic floor, and the diaphragm. Train it as a system." },
        { "name": "Consistency Creates Change", "sets": "Lifetime", "reps": "Daily", "rest": "N/A", "notes": "Showing up and doing the work consistently, even if not perfect, yields long-term results." }
      ]
    }
  ]
},
];