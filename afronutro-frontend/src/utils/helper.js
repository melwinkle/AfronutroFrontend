// Calculate BMI (Body Mass Index)
export const calculateBMI = (height, weight) => {
  if (!height || !weight) return 0;
  return (weight / (height / 100) ** 2).toFixed(2); // Height in cm
};
// Helper function to categorize BMI
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
// Formula: TDEE = BMR * Activity Level (simplified example)
export const calculateTDEE = (weight, height, age, gender, activity_level) => {
  if (!weight || !height || !age || !gender) return 0;

  // Harris-Benedict BMR formula
  const BMR =
    gender === "Male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityLevel = activity_level; // Moderate exercise (example)
  return (BMR * activityLevel).toFixed(0);
};
export const getBmiBorderColor = (bmiCategory) => {
  switch (bmiCategory) {
    case "Underweight":
      return "afro-blue";
    case "Normal weight":
      return "afro-mint";
    case "Overweight":
      return "afro-yellow";
    case "Obesity":
      return "afro-red";
    default:
      return "afro-gray";
  }
};


export const getActivityLevel = (activitylevel) => {
  if (activitylevel==1.2) return "Sedentary";
  else if (activitylevel==1.375) return "Lightly Active";
  else if (activitylevel==1.55) return "Moderately Active";
  else if (activitylevel==1.725) return "Very Active";
  else return "Extra Active";
};

export const getActivityLevels = (activitylevel) => {
  if (activitylevel=="SED") return "Sedentary";
  else if (activitylevel=="LIG") return "Lightly Active";
  else if (activitylevel=="MOD") return "Moderately Active";
  else if (activitylevel=="VER") return "Very Active";
  else return "Extra Active";
};

export const getActivityLevelV = (activitylevel) => {
  if (activitylevel=="SED") return 1.2;
  else if (activitylevel=="LIG") return 1.375;
  else if (activitylevel=="MOD") return 1.55;
  else if (activitylevel=="VER") return 1.725;
  else return 1.9;
};

const preferenceArray = [
  { value: 'GLU', label: 'Gluten-Free' },
  { value: 'VGT', label: 'Vegetarian' },
  { value: 'VEG', label: 'Vegan' },
  { value: 'DF', label: 'Dairy-Free' },
  { value: 'NUT', label: 'Nut-Free' },
  { value: 'KET', label: 'Keto' },
  { value: 'PAL', label: 'Paleo' },
  { value: 'LAC', label: 'Lactose-Free' },
  { value: 'SHE', label: 'Shellfish-Free' },
  { value: 'EGG', label: 'Egg-Free' },
  { value: 'SOY', label: 'Soy-Free' },
  { value: 'PEA', label: 'Peanut-Free' },
  { value: 'KOS', label: 'Kosher' },
  { value: 'HAL', label: 'Halal' },
  { value: 'LSU', label: 'Low Sugar' },
  { value: 'DIA', label: 'Diabetic' },
  { value: 'SPI', label: 'Spicy Food' },
  { value: 'SWE', label: 'Sweet Food' },
  { value: 'SAV', label: 'Savory Food' },
  { value: 'ORG', label: 'Organic' },
  { value: 'HPR', label: 'High Protein' },
  { value: 'LCA', label: 'Low Carb' },
  { value: 'HFI', label: 'High Fiber' }
];

// Function to get label by value
export const getLabelByValue = (value) => {
  const preference = preferenceArray.find((pref) => pref.value === value);
  return preference ? preference.label : 'Label not found';
};



const goalsArray = [
  { value: 'LOS', label: 'Lose Weight' },
  { value: 'MAI', label: 'Maintain Weight' },
  { value: 'GAI', label: 'Gain Weight' },
  { value: 'FIT', label: 'Improve Fitness' },
  { value: 'MUS', label: 'Increase Muscle' },
];

// Function to get label by value
export const getGoalLabelByValue = (value) => {
  const goal = goalsArray.find((g) => g.value === value);
  return goal ? goal.label : 'Label not found';
};


export const round_to_two_decimal_places=(number)=>{
  return Math.round(number * 100) / 100;
}

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

export const validateUsername = (username) => {
  // Alphanumeric, 3-20 characters
  const re = /^[a-zA-Z0-9]{3,20}$/;
  return re.test(username);
};

export const calculateAverageRating = (ratings = []) => {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return {
      averageRating: 0,
      totalRatings: 0,
    };
  }

  const validRatings = ratings.filter((r) => typeof r.rating === "number");
  const sum = validRatings.reduce((acc, curr) => acc + curr.rating, 0);
  const average = validRatings.length > 0 ? sum / validRatings.length : 0;

  return {
    averageRating: Number(average.toFixed(1)),
    totalRatings: validRatings.length,
  };
};

/**
 * Formats the rating for display
 * @param {number} rating - The rating value
 * @param {number} totalRatings - Total number of ratings
 * @returns {string} Formatted rating string
 */
export const formatRating = (rating, totalRatings) => {
  if (totalRatings === 0) return "No ratings yet";
  return `${rating} (${totalRatings} ${
    totalRatings === 1 ? "rating" : "ratings"
  })`;
};



export const  calculateTotalNutrients=(nutritionalComposition)=>{
  // Initialize totals
  let totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Iterate over each meal type in the nutritional composition
  for (const mealType in nutritionalComposition) {
    const nutrients = nutritionalComposition[mealType];
    totals.calories += nutrients.calories || 0;
    totals.protein += nutrients.protein || 0;
    totals.carbs += nutrients.carbs || 0;
    totals.fat += nutrients.fat || 0;
  }

  return totals;
}




export const organizeMealsByType=(mealsStructure, mealsArray)=>{
  // Create a mapping of meal names to their full data for quick lookup
  const mealsDataMap = mealsArray.reduce((map, meal) => {
    map[meal.name] = meal;
    return map;
  }, {});

  // Structure the meals based on meal types in meals_structure
  const organizedMeals = {};
  for (const [mealType, mealNames] of Object.entries(mealsStructure)) {
    organizedMeals[mealType] = mealNames.map(name => mealsDataMap[name]).filter(Boolean);
  }

  return organizedMeals;
}