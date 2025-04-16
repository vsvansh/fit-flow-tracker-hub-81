
// Sample user profile data
export const userProfile = {
  name: "Alex Johnson",
  username: "alexj",
  email: "alex.johnson@example.com",
  goal: "Lose Weight",
  height: 175, // cm
  weight: 80, // kg
  age: 32,
  gender: "Male",
  activityLevel: "Moderate",
  joinDate: "2025-01-15",
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
};

// Sample daily activities data
export const dailyActivities = [
  {
    date: "2025-04-01",
    steps: 7820,
    caloriesBurned: 320,
    distance: 5.2,
    activeMinutes: 42
  },
  {
    date: "2025-04-02",
    steps: 9150,
    caloriesBurned: 380,
    distance: 6.1,
    activeMinutes: 55
  },
  {
    date: "2025-04-03",
    steps: 10340,
    caloriesBurned: 420,
    distance: 6.9,
    activeMinutes: 62
  },
  {
    date: "2025-04-04",
    steps: 8470,
    caloriesBurned: 350,
    distance: 5.6,
    activeMinutes: 48
  },
  {
    date: "2025-04-05",
    steps: 11230,
    caloriesBurned: 460,
    distance: 7.5,
    activeMinutes: 70
  },
  {
    date: "2025-04-06",
    steps: 6540,
    caloriesBurned: 270,
    distance: 4.3,
    activeMinutes: 35
  },
  {
    date: "2025-04-07",
    steps: 9780,
    caloriesBurned: 400,
    distance: 6.5,
    activeMinutes: 58
  },
  {
    date: "2025-04-08",
    steps: 8920,
    caloriesBurned: 370,
    distance: 5.9,
    activeMinutes: 52
  }
];

// Sample fitness goals
export const fitnessGoals = [
  {
    id: 1,
    name: "Daily Steps",
    target: 10000,
    progress: 8920,
    unit: "steps",
    achievementRate: 89
  },
  {
    id: 2,
    name: "Calories Burned",
    target: 500,
    progress: 370,
    unit: "calories",
    achievementRate: 74
  },
  {
    id: 3,
    name: "Distance",
    target: 8,
    progress: 5.9,
    unit: "km",
    achievementRate: 74
  },
  {
    id: 4,
    name: "Active Minutes",
    target: 60,
    progress: 52,
    unit: "minutes",
    achievementRate: 87
  },
  {
    id: 5,
    name: "Workouts Per Week",
    target: 4,
    progress: 3,
    unit: "workouts",
    achievementRate: 75
  }
];

// Get today's activity
export const getTodayActivity = () => {
  // Return the last entry as "today"
  return dailyActivities[dailyActivities.length - 1];
};

// Calculate goal completion percentage
export const calculateCompletion = (current: number, target: number): number => {
  return Math.min(Math.round((current / target) * 100), 100);
};

// Get streak count (consecutive days with activity)
export const getStreakCount = (): number => {
  // For demonstration purposes, return a fixed number
  return 7;
};

// Add the missing getWeeklyStats function
export const getWeeklyStats = () => {
  // Calculate average stats from the last 7 days of activities
  const lastSevenDays = dailyActivities.slice(-7);
  
  const averageSteps = Math.round(
    lastSevenDays.reduce((sum, day) => sum + day.steps, 0) / lastSevenDays.length
  );
  
  const averageCalories = Math.round(
    lastSevenDays.reduce((sum, day) => sum + day.caloriesBurned, 0) / lastSevenDays.length
  );
  
  const averageDistance = parseFloat(
    (lastSevenDays.reduce((sum, day) => sum + day.distance, 0) / lastSevenDays.length).toFixed(1)
  );
  
  const averageActiveMinutes = Math.round(
    lastSevenDays.reduce((sum, day) => sum + day.activeMinutes, 0) / lastSevenDays.length
  );
  
  return {
    averageSteps,
    averageCalories,
    averageDistance,
    averageActiveMinutes
  };
};
