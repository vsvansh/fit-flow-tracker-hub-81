
interface DailyActivity {
  date: string;
  steps: number;
  caloriesBurned: number;
  distance: number;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
}

// Mock daily activity data
export const dailyActivities: DailyActivity[] = [
  { date: "2025-04-01", steps: 8234, caloriesBurned: 320, distance: 6.2 },
  { date: "2025-04-02", steps: 10128, caloriesBurned: 412, distance: 7.9 },
  { date: "2025-04-03", steps: 7403, caloriesBurned: 290, distance: 5.6 },
  { date: "2025-04-04", steps: 12507, caloriesBurned: 502, distance: 9.5 },
  { date: "2025-04-05", steps: 6209, caloriesBurned: 245, distance: 4.7 },
  { date: "2025-04-06", steps: 9125, caloriesBurned: 375, distance: 6.9 },
  { date: "2025-04-07", steps: 11432, caloriesBurned: 462, distance: 8.7 },
  { date: "2025-04-08", steps: 8742, caloriesBurned: 349, distance: 6.6 }
];

// Mock fitness goals
export const fitnessGoals: Goal[] = [
  { id: "1", name: "Daily Steps", target: 10000, current: 8742, unit: "steps" },
  { id: "2", name: "Calories Burned", target: 500, current: 349, unit: "cal" },
  { id: "3", name: "Distance", target: 8, current: 6.6, unit: "km" }
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
