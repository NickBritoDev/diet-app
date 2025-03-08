export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserInfo {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose' | 'maintain' | 'gain';
  targetWeight: number;
}

export interface DietPlan {
  dailyCalories: number;
  weeklyWeightChange: number;
  timeToGoal: number;
  protein: number;
  carbs: number;
  fats: number;
}