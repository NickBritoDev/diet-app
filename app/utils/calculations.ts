export const calculateBMR = (info: {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
}) => {
  if (info.gender === 'male') {
    return 88.362 + (13.397 * info.weight) + (4.799 * info.height) - (5.677 * info.age);
  }
  return 447.593 + (9.247 * info.weight) + (3.098 * info.height) - (4.330 * info.age);
};

export const getActivityMultiplier = (level: string) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9,
  };
  return multipliers[level as keyof typeof multipliers];
};

export const calculateDietPlan = (userInfo: any) => {
  const bmr = calculateBMR({
    weight: userInfo.weight,
    height: userInfo.height,
    age: userInfo.age,
    gender: userInfo.gender,
  });

  const tdee = bmr * getActivityMultiplier(userInfo.activityLevel);
  let dailyCalories = tdee;
  let weeklyWeightChange = 0;

  if (userInfo.goal === 'lose') {
    dailyCalories = tdee - 500;
    weeklyWeightChange = -0.5;
  } else if (userInfo.goal === 'gain') {
    dailyCalories = tdee + 500;
    weeklyWeightChange = 0.5;
  }

  const weightDifference = Math.abs(userInfo.targetWeight - userInfo.weight);
  const timeToGoal = weeklyWeightChange !== 0 
    ? Math.ceil(weightDifference / Math.abs(weeklyWeightChange))
    : 0;

  return {
    dailyCalories: Math.round(dailyCalories),
    weeklyWeightChange,
    timeToGoal,
    protein: Math.round(userInfo.weight * 2), // 2g per kg
    carbs: Math.round((dailyCalories * 0.4) / 4), // 40% of calories
    fats: Math.round((dailyCalories * 0.3) / 9), // 30% of calories
  };
};