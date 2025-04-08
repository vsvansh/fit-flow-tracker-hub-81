
export const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  age: 32,
  gender: "Male",
  height: 178, // cm
  weight: 82, // kg
  activityLevel: "moderate",
  joinDate: "Jan 2023",
  profilePic: "/placeholder.svg",
  goalWeight: 75, // in kg
  dietaryPreferences: ["Low carb", "High protein"],
  allergies: [],
  fitnessGoals: ["Build muscle", "Improve endurance"],
};

export const workoutHistory = [
  {
    id: 1,
    date: "2023-06-01",
    type: "Strength",
    duration: 45,
    caloriesBurned: 320,
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, weight: 70 },
      { name: "Squats", sets: 3, reps: 12, weight: 100 },
      { name: "Deadlifts", sets: 3, reps: 8, weight: 120 }
    ]
  },
  {
    id: 2,
    date: "2023-06-03",
    type: "Cardio",
    duration: 30,
    caloriesBurned: 280,
    exercises: [
      { name: "Running", distance: 5, pace: "5:30" },
    ]
  },
  {
    id: 3,
    date: "2023-06-05",
    type: "Strength",
    duration: 50,
    caloriesBurned: 350,
    exercises: [
      { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
      { name: "Shoulder Press", sets: 3, reps: 10, weight: 45 },
      { name: "Rows", sets: 3, reps: 12, weight: 60 }
    ]
  }
];

export const nutritionHistory = [
  {
    date: "2023-06-01",
    calories: 2100,
    protein: 140,
    carbs: 180,
    fat: 70,
    water: 2000,
    meals: [
      {
        name: "Breakfast",
        foods: [
          { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 2.5 },
          { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 }
        ]
      },
      {
        name: "Lunch",
        foods: [
          { name: "Chicken Salad", calories: 350, protein: 30, carbs: 10, fat: 20 },
          { name: "Whole Grain Bread", calories: 80, protein: 3, carbs: 15, fat: 1 }
        ]
      }
    ]
  },
  {
    date: "2023-06-02",
    calories: 1950,
    protein: 130,
    carbs: 160,
    fat: 65,
    water: 2200,
    meals: []
  },
  {
    date: "2023-06-03",
    calories: 2200,
    protein: 145,
    carbs: 190,
    fat: 75,
    water: 1800,
    meals: []
  }
];

export const weightHistory = [
  { date: "2023-05-01", weight: 85 },
  { date: "2023-05-08", weight: 84.5 },
  { date: "2023-05-15", weight: 84 },
  { date: "2023-05-22", weight: 83.2 },
  { date: "2023-05-29", weight: 82.7 },
  { date: "2023-06-05", weight: 82 }
];

// Updated fitnessGoals to include name and target properties
export const fitnessGoals = [
  { 
    id: 1, 
    title: "Lose 5kg", 
    description: "Reach target weight of 77kg",
    startDate: "2023-05-01",
    targetDate: "2023-08-01",
    progress: 60,
    metrics: {
      current: 82,
      target: 77,
      unit: "kg"
    },
    name: "Daily Steps",
    target: 10000
  },
  { 
    id: 2, 
    title: "Run 10km", 
    description: "Complete a 10km run without stopping",
    startDate: "2023-05-15",
    targetDate: "2023-07-15",
    progress: 70,
    metrics: {
      current: 7,
      target: 10,
      unit: "km"
    },
    name: "Calories Burned",
    target: 500
  },
  { 
    id: 3, 
    title: "Bench Press 100kg", 
    description: "Increase strength to bench press 100kg",
    startDate: "2023-06-01",
    targetDate: "2023-09-01",
    progress: 40,
    metrics: {
      current: 80,
      target: 100,
      unit: "kg"
    },
    name: "Distance",
    target: 8
  },
  { 
    id: 4, 
    title: "Improve Endurance", 
    description: "Increase active minutes",
    startDate: "2023-06-01",
    targetDate: "2023-09-01",
    progress: 40,
    metrics: {
      current: 40,
      target: 60,
      unit: "mins"
    },
    name: "Active Minutes",
    target: 60
  }
];

export const upcomingWorkouts = [
  {
    id: 1,
    title: "Upper Body Strength",
    date: "2023-06-10T09:00:00",
    duration: 45,
    type: "Strength",
    description: "Focus on chest, shoulders, and triceps"
  },
  {
    id: 2,
    title: "HIIT Cardio",
    date: "2023-06-12T18:30:00",
    duration: 30,
    type: "Cardio",
    description: "High intensity interval training"
  },
  {
    id: 3,
    title: "Lower Body Strength",
    date: "2023-06-14T09:00:00",
    duration: 50,
    type: "Strength",
    description: "Focus on quads, hamstrings, and calves"
  }
];

export const activitySummary = {
  weeklyCaloriesBurned: 1850,
  weeklyWorkouts: 4,
  weeklyActiveMinutes: 280,
  monthlyTrend: "+12%"
};

export const achievements = [
  {
    id: 1,
    title: "Early Bird",
    description: "Complete 5 workouts before 8am",
    icon: "sunrise",
    dateEarned: "2023-05-20",
    progress: 100
  },
  {
    id: 2,
    title: "Consistency King",
    description: "Work out 4 times per week for a month",
    icon: "calendar",
    dateEarned: "2023-06-01",
    progress: 100
  },
  {
    id: 3,
    title: "Strength Milestone",
    description: "Deadlift 150kg",
    icon: "dumbbell",
    dateEarned: null,
    progress: 80
  },
  {
    id: 4,
    title: "Marathon Runner",
    description: "Run a total of 100km",
    icon: "running",
    dateEarned: null,
    progress: 65
  }
];

// Add missing functions needed by components
export const dailyActivities = [
  { date: "2023-05-25", steps: 7500, caloriesBurned: 320, distance: 5.2 },
  { date: "2023-05-26", steps: 8200, caloriesBurned: 350, distance: 5.7 },
  { date: "2023-05-27", steps: 6800, caloriesBurned: 290, distance: 4.8 },
  { date: "2023-05-28", steps: 9100, caloriesBurned: 380, distance: 6.3 },
  { date: "2023-05-29", steps: 8500, caloriesBurned: 360, distance: 5.9 },
  { date: "2023-05-30", steps: 7900, caloriesBurned: 340, distance: 5.5 },
  { date: "2023-05-31", steps: 8700, caloriesBurned: 370, distance: 6.1 },
  { date: "2023-06-01", steps: 9300, caloriesBurned: 400, distance: 6.5 },
  { date: "2023-06-02", steps: 8100, caloriesBurned: 345, distance: 5.6 },
  { date: "2023-06-03", steps: 8900, caloriesBurned: 375, distance: 6.2 },
  { date: "2023-06-04", steps: 9500, caloriesBurned: 410, distance: 6.7 },
  { date: "2023-06-05", steps: 7800, caloriesBurned: 330, distance: 5.4 }
];

export const getTodayActivity = () => {
  // Return the most recent activity
  return {
    steps: 9500,
    caloriesBurned: 410,
    distance: 6.7,
    activeMinutes: 65
  };
};

export const getStreakCount = () => {
  // Simulate a streak count
  return 12;
};

export const getWeeklyStats = () => {
  return {
    totalSteps: 59800,
    totalCaloriesBurned: 2250,
    totalDistance: 41.5,
    totalActiveMinutes: 385,
    workoutsCompleted: 4,
    bestDay: "Thursday"
  };
};

export const calculateCompletion = (current: number, goal: number) => {
  return Math.min(100, Math.round((current / goal) * 100));
};
