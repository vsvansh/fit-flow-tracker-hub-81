
export interface DailyActivity {
  date: string;
  steps: number;
  caloriesBurned: number;
  distance: number;
  activeMinutes?: number;
  goalAchieved?: boolean;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  period?: "daily" | "weekly" | "monthly";
}

export interface UserProfile {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  height: number; // in cm
  weight: number; // in kg
  activityLevel: "sedentary" | "light" | "moderate" | "intense";
  picture?: string;
}

// Mock user profile data
export const userProfile: UserProfile = {
  name: "Alex Johnson",
  age: 32,
  gender: "male",
  height: 178,
  weight: 75,
  activityLevel: "moderate",
};

// Mock daily activity data
export const dailyActivities: DailyActivity[] = [
  { date: "2025-04-01", steps: 8234, caloriesBurned: 320, distance: 6.2, activeMinutes: 42, goalAchieved: false },
  { date: "2025-04-02", steps: 10128, caloriesBurned: 412, distance: 7.9, activeMinutes: 55, goalAchieved: true },
  { date: "2025-04-03", steps: 7403, caloriesBurned: 290, distance: 5.6, activeMinutes: 38, goalAchieved: false },
  { date: "2025-04-04", steps: 12507, caloriesBurned: 502, distance: 9.5, activeMinutes: 67, goalAchieved: true },
  { date: "2025-04-05", steps: 6209, caloriesBurned: 245, distance: 4.7, activeMinutes: 32, goalAchieved: false },
  { date: "2025-04-06", steps: 9125, caloriesBurned: 375, distance: 6.9, activeMinutes: 48, goalAchieved: false },
  { date: "2025-04-07", steps: 11432, caloriesBurned: 462, distance: 8.7, activeMinutes: 61, goalAchieved: true },
  { date: "2025-04-08", steps: 8742, caloriesBurned: 349, distance: 6.6, activeMinutes: 45, goalAchieved: false }
];

// Mock fitness goals
export const fitnessGoals: Goal[] = [
  { id: "1", name: "Daily Steps", target: 10000, current: 8742, unit: "steps", period: "daily" },
  { id: "2", name: "Calories Burned", target: 500, current: 349, unit: "cal", period: "daily" },
  { id: "3", name: "Distance", target: 8, current: 6.6, unit: "km", period: "daily" },
  { id: "4", name: "Active Minutes", target: 60, current: 45, unit: "mins", period: "daily" },
  { id: "5", name: "Weekly Distance", target: 50, current: 32.4, unit: "km", period: "weekly" }
];

// Get today's activity
export const getTodayActivity = (): DailyActivity => {
  return dailyActivities[dailyActivities.length - 1];
};

// Calculate percentage completion
export const calculateCompletion = (current: number, target: number): number => {
  const percentage = (current / target) * 100;
  return Math.min(percentage, 100);
};

// Calculate calories burned based on steps, weight and activity level
export const calculateCaloriesBurned = (
  steps: number,
  weight: number = 70,
  activityLevel: string = "moderate"
): number => {
  // Basic calculation (simplified)
  const caloriesPerStep = {
    sedentary: 0.04,
    light: 0.045,
    moderate: 0.05,
    intense: 0.06,
  };
  
  const multiplier = caloriesPerStep[activityLevel as keyof typeof caloriesPerStep] || 0.05;
  return Math.round(steps * multiplier * (weight / 70));
};

// Get streak count (consecutive days with achieved goals)
export const getStreakCount = (): number => {
  let streak = 0;
  
  // Count backwards from most recent day
  for (let i = dailyActivities.length - 1; i >= 0; i--) {
    if (dailyActivities[i].goalAchieved) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Calculate weekly stats
export const getWeeklyStats = () => {
  const weekData = dailyActivities.slice(-7);
  
  const totalSteps = weekData.reduce((sum, day) => sum + day.steps, 0);
  const totalCalories = weekData.reduce((sum, day) => sum + day.caloriesBurned, 0);
  const totalDistance = weekData.reduce((sum, day) => sum + day.distance, 0);
  
  return {
    totalSteps,
    totalCalories,
    totalDistance,
    averageSteps: Math.round(totalSteps / weekData.length),
    averageCalories: Math.round(totalCalories / weekData.length),
    averageDistance: parseFloat((totalDistance / weekData.length).toFixed(1)),
  };
};
