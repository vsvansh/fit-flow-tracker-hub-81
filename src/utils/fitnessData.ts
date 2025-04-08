
import { subDays, format, addDays } from "date-fns";

// Generate dynamic fitness data for the past 30 days
const generateDailyActivity = (days: number = 30) => {
  const today = new Date();
  const dailyActivities = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const formattedDate = format(date, "yyyy-MM-dd");
    
    // Generate somewhat realistic data with some variance
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Base values
    let steps = Math.floor(Math.random() * 3000) + 7000; // 7000-10000 base steps
    
    // Add variance based on weekday/weekend
    if (isWeekend) {
      steps += Math.floor(Math.random() * 2000); // More active on weekends
    } else if (dayOfWeek === 1 || dayOfWeek === 5) {
      steps -= Math.floor(Math.random() * 1500); // Less active on Monday and Friday
    }
    
    // Most recent days tend to have more data (improvement trend)
    if (i < 7) {
      steps += Math.floor(Math.random() * 1500);
    }
    
    // Randomize a bit
    steps = Math.max(3000, Math.min(15000, steps + Math.floor(Math.random() * 2000 - 1000)));
    
    // Calculate derived metrics
    const distance = parseFloat((steps * 0.0008).toFixed(1)); // km
    const caloriesBurned = Math.floor(steps * 0.05); // calories
    const activeMinutes = Math.floor(steps / 200); // active minutes
    
    dailyActivities.push({
      date: formattedDate,
      steps,
      distance,
      caloriesBurned,
      activeMinutes,
    });
  }

  return dailyActivities;
};

// User profile data
export const userProfile = {
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  gender: "male" as const,
  age: 32,
  height: 178, // cm
  weight: 76, // kg
  activityLevel: "moderate" as const,
  joinDate: "2023-11-15",
};

// Fitness goals
export const fitnessGoals = [
  {
    id: "1",
    name: "Daily Steps",
    target: 10000,
    current: 8431,
    unit: "steps",
    period: "daily",
  },
  {
    id: "2",
    name: "Calories Burned",
    target: 500,
    current: 423,
    unit: "cal",
    period: "daily",
  },
  {
    id: "3",
    name: "Distance",
    target: 8,
    current: 6.2,
    unit: "km",
    period: "daily",
  },
  {
    id: "4",
    name: "Active Minutes",
    target: 60,
    current: 42,
    unit: "min",
    period: "daily",
  },
  {
    id: "5",
    name: "Weekly Distance",
    target: 40,
    current: 28.5,
    unit: "km",
    period: "weekly",
  },
];

// Generate the daily activities
export const dailyActivities = generateDailyActivity();

// Get today's activity
export const getTodayActivity = () => {
  // This could fetch from API in a real app
  return {
    steps: 8431,
    distance: 6.2,
    caloriesBurned: 423,
    activeMinutes: 42,
  };
};

// Get streak count
export const getStreakCount = () => {
  // This would be calculated based on real data
  return 7;
};

// Calculate completion percentage
export const calculateCompletion = (current: number, goal: number) => {
  return Math.min(100, Math.round((current / goal) * 100));
};

// Get weekly statistics
export const getWeeklyStats = () => {
  const lastSevenDays = dailyActivities.slice(-7);
  
  const totalSteps = lastSevenDays.reduce((sum, day) => sum + day.steps, 0);
  const totalCalories = lastSevenDays.reduce((sum, day) => sum + day.caloriesBurned, 0);
  const totalDistance = lastSevenDays.reduce((sum, day) => sum + day.distance, 0);
  
  return {
    totalSteps,
    totalCalories,
    totalDistance,
    averageSteps: Math.round(totalSteps / 7),
    averageCalories: Math.round(totalCalories / 7),
    averageDistance: parseFloat((totalDistance / 7).toFixed(1)),
  };
};

// Get best performing day of the week
export const getBestDay = () => {
  const lastSevenDays = dailyActivities.slice(-7);
  let bestDay = lastSevenDays[0];
  
  for (const day of lastSevenDays) {
    if (day.steps > bestDay.steps) {
      bestDay = day;
    }
  }
  
  const date = new Date(bestDay.date);
  return format(date, "EEEE"); // Return day name
};

// Additional data generators for future use
export const getFutureChallenges = () => {
  const today = new Date();
  
  return [
    {
      id: "c1",
      title: "Spring Step Challenge",
      description: "Reach 300,000 steps in the next 30 days",
      startDate: format(today, "yyyy-MM-dd"),
      endDate: format(addDays(today, 30), "yyyy-MM-dd"),
      goal: 300000,
      unit: "steps",
      participants: 156,
      joined: false,
    },
    {
      id: "c2",
      title: "Weekend Warrior",
      description: "Complete 30,000 steps this weekend",
      startDate: format(addDays(today, 5 - today.getDay()), "yyyy-MM-dd"), // Next Saturday
      endDate: format(addDays(today, 6 - today.getDay()), "yyyy-MM-dd"), // Next Sunday
      goal: 30000,
      unit: "steps",
      participants: 47,
      joined: true,
    },
    {
      id: "c3",
      title: "Marathon Prep",
      description: "Log 100km of distance over the next 2 weeks",
      startDate: format(today, "yyyy-MM-dd"),
      endDate: format(addDays(today, 14), "yyyy-MM-dd"),
      goal: 100,
      unit: "km",
      participants: 28,
      joined: false,
    },
  ];
};
