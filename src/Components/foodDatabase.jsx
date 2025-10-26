// foodDatabase.js

// Comprehensive food database organized by fitness goals
const foodDatabase = {
  // Bulking and Muscle Gain Foods (High calorie, high protein)
  bulking: {
    breakfast: [
      { name: 'Oatmeal with Peanut Butter', caloriesPerServing: 450, proteinPerServing: 20, carbsPerServing: 60, fatPerServing: 15, category: 'complex carbs' },
      { name: 'Whole Egg Scramble (4 eggs)', caloriesPerServing: 360, proteinPerServing: 24, carbsPerServing: 2, fatPerServing: 28, category: 'protein' },
      { name: 'Greek Yogurt with Honey and Nuts', caloriesPerServing: 350, proteinPerServing: 25, carbsPerServing: 30, fatPerServing: 15, category: 'protein' },
      { name: 'Protein Pancakes', caloriesPerServing: 400, proteinPerServing: 30, carbsPerServing: 45, fatPerServing: 8, category: 'complex carbs' },
      { name: 'Avocado Toast with Eggs', caloriesPerServing: 420, proteinPerServing: 18, carbsPerServing: 35, fatPerServing: 22, category: 'healthy fats' }
    ],
    lunch: [
      { name: 'Chicken Breast with Brown Rice', caloriesPerServing: 500, proteinPerServing: 45, carbsPerServing: 60, fatPerServing: 8, category: 'protein' },
      { name: 'Lean Beef with Sweet Potato', caloriesPerServing: 550, proteinPerServing: 40, carbsPerServing: 65, fatPerServing: 12, category: 'protein' },
      { name: 'Salmon with Quinoa', caloriesPerServing: 520, proteinPerServing: 35, carbsPerServing: 45, fatPerServing: 20, category: 'healthy fats' },
      { name: 'Turkey Sandwich Whole Wheat', caloriesPerServing: 480, proteinPerServing: 35, carbsPerServing: 55, fatPerServing: 12, category: 'protein' },
      { name: 'Tuna Salad with Whole Grain Bread', caloriesPerServing: 460, proteinPerServing: 38, carbsPerServing: 40, fatPerServing: 15, category: 'protein' }
    ],
    dinner: [
      { name: 'Steak with Roasted Potatoes', caloriesPerServing: 600, proteinPerServing: 50, carbsPerServing: 55, fatPerServing: 22, category: 'protein' },
      { name: 'Grilled Chicken with Pasta', caloriesPerServing: 580, proteinPerServing: 48, carbsPerServing: 70, fatPerServing: 10, category: 'protein' },
      { name: 'Pork Chops with Vegetables', caloriesPerServing: 520, proteinPerServing: 42, carbsPerServing: 25, fatPerServing: 28, category: 'protein' },
      { name: 'Baked Cod with Rice', caloriesPerServing: 480, proteinPerServing: 40, carbsPerServing: 50, fatPerServing: 12, category: 'protein' },
      { name: 'Lamb Chops with Couscous', caloriesPerServing: 620, proteinPerServing: 45, carbsPerServing: 45, fatPerServing: 30, category: 'protein' }
    ],
    snacks: [
      { name: 'Protein Shake', caloriesPerServing: 200, proteinPerServing: 30, carbsPerServing: 10, fatPerServing: 2, category: 'protein' },
      { name: 'Mixed Nuts (1 cup)', caloriesPerServing: 320, proteinPerServing: 12, carbsPerServing: 12, fatPerServing: 28, category: 'healthy fats' },
      { name: 'Cottage Cheese with Fruit', caloriesPerServing: 180, proteinPerServing: 20, carbsPerServing: 15, fatPerServing: 4, category: 'protein' },
      { name: 'Beef Jerky', caloriesPerServing: 120, proteinPerServing: 18, carbsPerServing: 5, fatPerServing: 3, category: 'protein' },
      { name: 'Peanut Butter Sandwich', caloriesPerServing: 350, proteinPerServing: 15, carbsPerServing: 35, fatPerServing: 18, category: 'healthy fats' }
    ]
  },

  // Cutting and Weight Loss Foods (Low calorie, high protein)
  cutting: {
    breakfast: [
      { name: 'Egg White Scramble', caloriesPerServing: 180, proteinPerServing: 20, carbsPerServing: 5, fatPerServing: 6, category: 'protein' },
      { name: 'Greek Yogurt with Berries', caloriesPerServing: 150, proteinPerServing: 18, carbsPerServing: 12, fatPerServing: 3, category: 'protein' },
      { name: 'Protein Oatmeal', caloriesPerServing: 220, proteinPerServing: 25, carbsPerServing: 25, fatPerServing: 3, category: 'complex carbs' },
      { name: 'Cottage Cheese Bowl', caloriesPerServing: 160, proteinPerServing: 22, carbsPerServing: 8, fatPerServing: 4, category: 'protein' },
      { name: 'Veggie Egg Muffins', caloriesPerServing: 140, proteinPerServing: 15, carbsPerServing: 6, fatPerServing: 6, category: 'protein' }
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', caloriesPerServing: 280, proteinPerServing: 35, carbsPerServing: 10, fatPerServing: 12, category: 'protein' },
      { name: 'Turkey Lettuce Wraps', caloriesPerServing: 240, proteinPerServing: 30, carbsPerServing: 8, fatPerServing: 10, category: 'protein' },
      { name: 'Tuna Salad (Light Mayo)', caloriesPerServing: 220, proteinPerServing: 28, carbsPerServing: 5, fatPerServing: 10, category: 'protein' },
      { name: 'Shrimp Stir-fry', caloriesPerServing: 260, proteinPerServing: 32, carbsPerServing: 12, fatPerServing: 8, category: 'protein' },
      { name: 'Lean Ground Beef with Veggies', caloriesPerServing: 300, proteinPerServing: 35, carbsPerServing: 15, fatPerServing: 12, category: 'protein' }
    ],
    dinner: [
      { name: 'Baked Salmon with Asparagus', caloriesPerServing: 320, proteinPerServing: 34, carbsPerServing: 8, fatPerServing: 18, category: 'healthy fats' },
      { name: 'Chicken Breast with Broccoli', caloriesPerServing: 280, proteinPerServing: 40, carbsPerServing: 10, fatPerServing: 8, category: 'protein' },
      { name: 'Turkey Meatballs with Zucchini', caloriesPerServing: 260, proteinPerServing: 32, carbsPerServing: 12, fatPerServing: 10, category: 'protein' },
      { name: 'White Fish with Green Beans', caloriesPerServing: 240, proteinPerServing: 36, carbsPerServing: 6, fatPerServing: 8, category: 'protein' },
      { name: 'Lean Pork with Cauliflower', caloriesPerServing: 300, proteinPerServing: 38, carbsPerServing: 10, fatPerServing: 12, category: 'protein' }
    ],
    snacks: [
      { name: 'Protein Shake (Water)', caloriesPerServing: 120, proteinPerServing: 25, carbsPerServing: 3, fatPerServing: 1, category: 'protein' },
      { name: 'Vegetable Sticks with Hummus', caloriesPerServing: 100, proteinPerServing: 4, carbsPerServing: 12, fatPerServing: 4, category: 'vegetables' },
      { name: 'Hard Boiled Eggs (2)', caloriesPerServing: 140, proteinPerServing: 12, carbsPerServing: 1, fatPerServing: 10, category: 'protein' },
      { name: 'Greek Yogurt (Low-fat)', caloriesPerServing: 100, proteinPerServing: 18, carbsPerServing: 6, fatPerServing: 0, category: 'protein' },
      { name: 'Apple with Almond Butter', caloriesPerServing: 180, proteinPerServing: 4, carbsPerServing: 20, fatPerServing: 10, category: 'healthy fats' }
    ]
  },

  // Lean Muscle and Toning Foods (Balanced macros)
  leanMuscle: {
    breakfast: [
      { name: 'Oatmeal with Protein Powder', caloriesPerServing: 350, proteinPerServing: 30, carbsPerServing: 45, fatPerServing: 6, category: 'complex carbs' },
      { name: 'Scrambled Eggs (2 whole + 2 whites)', caloriesPerServing: 240, proteinPerServing: 22, carbsPerServing: 3, fatPerServing: 14, category: 'protein' },
      { name: 'Greek Yogurt Parfait', caloriesPerServing: 280, proteinPerServing: 25, carbsPerServing: 25, fatPerServing: 8, category: 'protein' },
      { name: 'Whole Wheat Toast with Avocado', caloriesPerServing: 300, proteinPerServing: 10, carbsPerServing: 30, fatPerServing: 16, category: 'healthy fats' },
      { name: 'Protein Smoothie Bowl', caloriesPerServing: 320, proteinPerServing: 28, carbsPerServing: 35, fatPerServing: 8, category: 'protein' }
    ],
    lunch: [
      { name: 'Chicken Quinoa Bowl', caloriesPerServing: 420, proteinPerServing: 38, carbsPerServing: 45, fatPerServing: 10, category: 'protein' },
      { name: 'Turkey and Avocado Wrap', caloriesPerServing: 380, proteinPerServing: 32, carbsPerServing: 35, fatPerServing: 14, category: 'protein' },
      { name: 'Salmon Salad', caloriesPerServing: 350, proteinPerServing: 30, carbsPerServing: 15, fatPerServing: 18, category: 'healthy fats' },
      { name: 'Lean Beef with Brown Rice', caloriesPerServing: 440, proteinPerServing: 36, carbsPerServing: 40, fatPerServing: 14, category: 'protein' },
      { name: 'Tofu Stir-fry with Vegetables', caloriesPerServing: 320, proteinPerServing: 25, carbsPerServing: 30, fatPerServing: 12, category: 'plant protein' }
    ],
    dinner: [
      { name: 'Grilled Chicken with Sweet Potato', caloriesPerServing: 400, proteinPerServing: 42, carbsPerServing: 35, fatPerServing: 8, category: 'protein' },
      { name: 'Baked Cod with Quinoa', caloriesPerServing: 380, proteinPerServing: 35, carbsPerServing: 40, fatPerServing: 10, category: 'protein' },
      { name: 'Pork Tenderloin with Vegetables', caloriesPerServing: 360, proteinPerServing: 38, carbsPerServing: 20, fatPerServing: 12, category: 'protein' },
      { name: 'Shrimp Scampi with Whole Wheat Pasta', caloriesPerServing: 420, proteinPerServing: 32, carbsPerServing: 45, fatPerServing: 12, category: 'protein' },
      { name: 'Lean Steak with Roasted Veggies', caloriesPerServing: 450, proteinPerServing: 40, carbsPerServing: 25, fatPerServing: 20, category: 'protein' }
    ],
    snacks: [
      { name: 'Protein Bar', caloriesPerServing: 200, proteinPerServing: 20, carbsPerServing: 15, fatPerServing: 6, category: 'protein' },
      { name: 'Cottage Cheese with Pineapple', caloriesPerServing: 160, proteinPerServing: 20, carbsPerServing: 12, fatPerServing: 3, category: 'protein' },
      { name: 'Almonds (1/4 cup)', caloriesPerServing: 160, proteinPerServing: 6, carbsPerServing: 6, fatPerServing: 14, category: 'healthy fats' },
      { name: 'Rice Cakes with Peanut Butter', caloriesPerServing: 180, proteinPerServing: 8, carbsPerServing: 20, fatPerServing: 8, category: 'healthy fats' },
      { name: 'Greek Yogurt with Granola', caloriesPerServing: 220, proteinPerServing: 18, carbsPerServing: 20, fatPerServing: 6, category: 'protein' }
    ]
  },

  // Athletic Performance Foods (High carb, moderate protein)
  athleticPerformance: {
    breakfast: [
      { name: 'Banana Pancakes with Syrup', caloriesPerServing: 480, proteinPerServing: 18, carbsPerServing: 75, fatPerServing: 12, category: 'complex carbs' },
      { name: 'Oatmeal with Banana and Honey', caloriesPerServing: 420, proteinPerServing: 15, carbsPerServing: 80, fatPerServing: 6, category: 'complex carbs' },
      { name: 'Breakfast Burrito', caloriesPerServing: 450, proteinPerServing: 22, carbsPerServing: 55, fatPerServing: 16, category: 'protein' },
      { name: 'French Toast with Berries', caloriesPerServing: 400, proteinPerServing: 20, carbsPerServing: 60, fatPerServing: 10, category: 'complex carbs' },
      { name: 'Cereal with Milk and Fruit', caloriesPerServing: 380, proteinPerServing: 16, carbsPerServing: 70, fatPerServing: 6, category: 'complex carbs' }
    ],
    lunch: [
      { name: 'Chicken Pasta with Marinara', caloriesPerServing: 520, proteinPerServing: 35, carbsPerServing: 65, fatPerServing: 12, category: 'protein' },
      { name: 'Turkey Sandwich with Whole Grain', caloriesPerServing: 480, proteinPerServing: 32, carbsPerServing: 60, fatPerServing: 14, category: 'protein' },
      { name: 'Rice Bowl with Chicken and Veggies', caloriesPerServing: 550, proteinPerServing: 38, carbsPerServing: 75, fatPerServing: 10, category: 'protein' },
      { name: 'Potato with Grilled Chicken', caloriesPerServing: 500, proteinPerServing: 40, carbsPerServing: 60, fatPerServing: 10, category: 'protein' },
      { name: 'Quinoa Salad with Salmon', caloriesPerServing: 480, proteinPerServing: 35, carbsPerServing: 50, fatPerServing: 16, category: 'healthy fats' }
    ],
    dinner: [
      { name: 'Spaghetti with Meat Sauce', caloriesPerServing: 580, proteinPerServing: 38, carbsPerServing: 75, fatPerServing: 15, category: 'protein' },
      { name: 'Chicken Curry with Rice', caloriesPerServing: 520, proteinPerServing: 35, carbsPerServing: 65, fatPerServing: 14, category: 'protein' },
      { name: 'Beef Stir-fry with Noodles', caloriesPerServing: 560, proteinPerServing: 42, carbsPerServing: 70, fatPerServing: 16, category: 'protein' },
      { name: 'Fish Tacos with Corn Tortillas', caloriesPerServing: 480, proteinPerServing: 32, carbsPerServing: 55, fatPerServing: 15, category: 'protein' },
      { name: 'Pizza with Lean Toppings', caloriesPerServing: 540, proteinPerServing: 30, carbsPerServing: 65, fatPerServing: 18, category: 'complex carbs' }
    ],
    snacks: [
      { name: 'Banana with Peanut Butter', caloriesPerServing: 280, proteinPerServing: 8, carbsPerServing: 35, fatPerServing: 12, category: 'healthy fats' },
      { name: 'Energy Bars', caloriesPerServing: 220, proteinPerServing: 10, carbsPerServing: 30, fatPerServing: 6, category: 'complex carbs' },
      { name: 'Fruit Smoothie', caloriesPerServing: 200, proteinPerServing: 8, carbsPerServing: 40, fatPerServing: 2, category: 'fruits' },
      { name: 'Trail Mix', caloriesPerServing: 300, proteinPerServing: 8, carbsPerServing: 30, fatPerServing: 18, category: 'healthy fats' },
      { name: 'Bagel with Cream Cheese', caloriesPerServing: 320, proteinPerServing: 12, carbsPerServing: 45, fatPerServing: 10, category: 'complex carbs' }
    ]
  },

  // Maintenance Foods (Balanced for overall health)
  maintenance: {
    breakfast: [
      { name: 'Whole Grain Cereal with Milk', caloriesPerServing: 300, proteinPerServing: 15, carbsPerServing: 45, fatPerServing: 8, category: 'complex carbs' },
      { name: 'Scrambled Eggs with Toast', caloriesPerServing: 320, proteinPerServing: 20, carbsPerServing: 25, fatPerServing: 15, category: 'protein' },
      { name: 'Yogurt with Granola and Fruit', caloriesPerServing: 280, proteinPerServing: 16, carbsPerServing: 35, fatPerServing: 8, category: 'protein' },
      { name: 'Oatmeal with Nuts and Berries', caloriesPerServing: 350, proteinPerServing: 12, carbsPerServing: 50, fatPerServing: 12, category: 'complex carbs' },
      { name: 'Smoothie with Protein', caloriesPerServing: 250, proteinPerServing: 20, carbsPerServing: 25, fatPerServing: 6, category: 'protein' }
    ],
    lunch: [
      { name: 'Chicken Salad Sandwich', caloriesPerServing: 380, proteinPerServing: 28, carbsPerServing: 35, fatPerServing: 14, category: 'protein' },
      { name: 'Quinoa Bowl with Vegetables', caloriesPerServing: 350, proteinPerServing: 15, carbsPerServing: 45, fatPerServing: 12, category: 'plant protein' },
      { name: 'Turkey and Cheese Wrap', caloriesPerServing: 400, proteinPerServing: 25, carbsPerServing: 40, fatPerServing: 16, category: 'protein' },
      { name: 'Lentil Soup with Bread', caloriesPerServing: 320, proteinPerServing: 18, carbsPerServing: 45, fatPerServing: 8, category: 'plant protein' },
      { name: 'Tuna Melt', caloriesPerServing: 420, proteinPerServing: 30, carbsPerServing: 30, fatPerServing: 20, category: 'protein' }
    ],
    dinner: [
      { name: 'Baked Chicken with Roasted Veggies', caloriesPerServing: 400, proteinPerServing: 35, carbsPerServing: 25, fatPerServing: 18, category: 'protein' },
      { name: 'Salmon with Quinoa and Greens', caloriesPerServing: 450, proteinPerServing: 32, carbsPerServing: 35, fatPerServing: 20, category: 'healthy fats' },
      { name: 'Vegetable Stir-fry with Tofu', caloriesPerServing: 350, proteinPerServing: 20, carbsPerServing: 40, fatPerServing: 12, category: 'plant protein' },
      { name: 'Lean Beef with Mashed Potatoes', caloriesPerServing: 480, proteinPerServing: 38, carbsPerServing: 35, fatPerServing: 20, category: 'protein' },
      { name: 'Pasta with Chicken and Vegetables', caloriesPerServing: 420, proteinPerServing: 28, carbsPerServing: 45, fatPerServing: 14, category: 'protein' }
    ],
    snacks: [
      { name: 'Apple with Cheese', caloriesPerServing: 180, proteinPerServing: 8, carbsPerServing: 20, fatPerServing: 8, category: 'fruits' },
      { name: 'Hummus with Veggies', caloriesPerServing: 150, proteinPerServing: 5, carbsPerServing: 15, fatPerServing: 8, category: 'vegetables' },
      { name: 'Greek Yogurt', caloriesPerServing: 120, proteinPerServing: 17, carbsPerServing: 8, fatPerServing: 3, category: 'protein' },
      { name: 'Mixed Nuts (small handful)', caloriesPerServing: 200, proteinPerServing: 6, carbsPerServing: 8, fatPerServing: 16, category: 'healthy fats' },
      { name: 'Rice Cakes with Avocado', caloriesPerServing: 160, proteinPerServing: 3, carbsPerServing: 15, fatPerServing: 10, category: 'healthy fats' }
    ]
  }
};

// Function to get food database based on fitness goal
export const getFoodDatabase = (fitnessGoal) => {
  const goalMapping = {
    weightLoss: 'cutting',
    cutting: 'cutting',
    leanMuscle: 'leanMuscle',
    muscleTone: 'leanMuscle',
    maintenance: 'maintenance',
    muscleGain: 'bulking',
    bulking: 'bulking',
    athleticPerformance: 'athleticPerformance'
  };

  const databaseKey = goalMapping[fitnessGoal] || 'maintenance';
  return foodDatabase[databaseKey];
};

// Function to get all food categories
export const getFoodCategories = () => {
  return {
    protein: ['Chicken', 'Turkey', 'Beef', 'Fish', 'Eggs', 'Greek Yogurt', 'Cottage Cheese', 'Protein Powder', 'Tofu'],
    'complex carbs': ['Oatmeal', 'Brown Rice', 'Quinoa', 'Sweet Potato', 'Whole Wheat Bread', 'Whole Grain Pasta'],
    'healthy fats': ['Avocado', 'Nuts', 'Seeds', 'Olive Oil', 'Nut Butters', 'Fatty Fish'],
    vegetables: ['Broccoli', 'Spinach', 'Kale', 'Bell Peppers', 'Carrots', 'Cauliflower', 'Asparagus'],
    fruits: ['Berries', 'Bananas', 'Apples', 'Oranges', 'Grapes', 'Melons']
  };
};

// Function to search foods by category and nutritional requirements
export const searchFoods = (fitnessGoal, category, maxCalories = null, minProtein = null) => {
  const database = getFoodDatabase(fitnessGoal);
  let foods = [];
  
  // Combine all meal types
  Object.values(database).forEach(mealType => {
    foods = foods.concat(mealType);
  });
  
  // Filter by category if specified
  if (category) {
    foods = foods.filter(food => food.category === category);
  }
  
  // Filter by max calories if specified
  if (maxCalories !== null) {
    foods = foods.filter(food => food.caloriesPerServing <= maxCalories);
  }
  
  // Filter by min protein if specified
  if (minProtein !== null) {
    foods = foods.filter(food => food.proteinPerServing >= minProtein);
  }
  
  return foods;
};

export default foodDatabase;