
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { 
  TrendingUp, Flame, Calendar, BarChart2, Brain, Activity, 
  Heart, Target, AlertCircle, Zap 
} from 'lucide-react';
import confetti from "canvas-confetti";

const FitnessInsights = () => {
  const [currentDay] = useState(new Date());
  
  // Weekly stats (for demonstration)
  const weeklyStats = {
    caloriesBurned: 12450,
    caloriesConsumed: 14200,
    averageSteps: 9823,
    workoutMinutes: 235,
    weeklyGoal: 15000,
    weightChangeGoal: -1.5, // kg per week
    actualWeightChange: -0.8,
    weightTrend: [82.3, 82.1, 81.8, 81.5, 81.9, 81.6, 81.5],
    calorieDeficit: 250 // per day
  };

  // Weight prediction calculation
  const calculateWeightPrediction = () => {
    const weeklyDeficit = weeklyStats.calorieDeficit * 7;
    const weeksTillGoal = Math.abs(weeklyStats.weightChangeGoal) / (weeklyDeficit / 7700);
    const goalDate = new Date(currentDay);
    goalDate.setDate(goalDate.getDate() + Math.round(weeksTillGoal * 7));
    
    return {
      weeks: Math.round(weeksTillGoal),
      date: goalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };
  
  const prediction = calculateWeightPrediction();

  // Calculate nutrient density score (simplified demo)
  const nutrientDensityScore = 82; // out of 100

  const handleVegetableRecipes = () => {
    toast({
      title: "Vegetable Recipes",
      description: "Loading vegetable recipes based on your preferences...",
    });
  };

  const handleCreateMealSchedule = () => {
    toast({
      title: "Meal Schedule",
      description: "Creating your personalized meal schedule...",
    });
  };

  const handleSetWaterReminders = () => {
    toast({
      title: "Water Reminders",
      description: "Water reminder notifications have been set for every 2 hours.",
    });
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <Card className="shadow hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Smart Insights & Analysis</CardTitle>
          <Brain className="h-5 w-5 text-purple-500" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Goal Prediction</h3>
            </div>
            <p className="text-sm mb-2">At your current pace:</p>
            <p className="text-xl font-bold">
              You'll hit your weight goal in ~{prediction.weeks} weeks
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Estimated goal date: {prediction.date}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-amber-100 dark:hover:shadow-amber-900/20">
            <div className="flex items-center mb-2">
              <Flame className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
              <h3 className="font-medium text-amber-800 dark:text-amber-300">Calorie Balance</h3>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Consumed</span>
              <span className="text-sm font-medium">{weeklyStats.caloriesConsumed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Burned</span>
              <span className="text-sm font-medium">{weeklyStats.caloriesBurned.toLocaleString()}</span>
            </div>
            <div className="h-px bg-amber-200 dark:bg-amber-700 my-2" />
            <div className="flex justify-between font-medium">
              <span>Weekly Balance</span>
              <span className={weeklyStats.caloriesConsumed > weeklyStats.caloriesBurned ? "text-red-500" : "text-green-500"}>
                {weeklyStats.caloriesConsumed - weeklyStats.caloriesBurned > 0 ? "+" : ""}
                {(weeklyStats.caloriesConsumed - weeklyStats.caloriesBurned).toLocaleString()} cal
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium flex items-center">
            <Activity className="h-4 w-4 mr-2 text-green-600" />
            Progress Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border p-3 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Weight Change Goal</span>
                <span className="text-sm font-medium">{weeklyStats.weightChangeGoal} kg/week</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Actual Change</span>
                <span className="text-sm font-medium">{weeklyStats.actualWeightChange} kg/week</span>
              </div>
              <Progress 
                value={(Math.abs(weeklyStats.actualWeightChange) / Math.abs(weeklyStats.weightChangeGoal)) * 100} 
                className="h-1.5 mt-2 transition-all duration-300 hover:h-2.5" 
              />
              <p className="text-xs text-right mt-1">
                {Math.round((Math.abs(weeklyStats.actualWeightChange) / Math.abs(weeklyStats.weightChangeGoal)) * 100)}% of goal pace
              </p>
            </div>
            
            <div className="border p-3 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Nutrient Density Score</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Good</Badge>
              </div>
              <div className="flex items-center">
                <div className="w-full mr-4">
                  <Progress value={nutrientDensityScore} className="h-2 transition-all duration-300 hover:h-3" />
                </div>
                <span className="font-bold text-lg">{nutrientDensityScore}</span>
              </div>
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                Your diet contains mostly whole foods with high nutrient content
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium flex items-center mb-3">
            <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
            Key Observations
          </h3>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded mr-3">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Activity level increased by 15% this week</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Keep up the momentum to reach your goals faster
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded mr-3">
                <Heart className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Your resting heart rate is improving</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Down by 3 BPM over the past month
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded mr-3">
                <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Protein intake is below your target</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Consider adding more protein-rich foods to your diet
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={handleVegetableRecipes}
            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-[1.02]">
            View Vegetable Recipes
          </Button>
          <Button 
            onClick={handleCreateMealSchedule}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-[1.02]">
            Create Meal Schedule
          </Button>
          <Button 
            onClick={handleSetWaterReminders}
            className="bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-300 transform hover:scale-[1.02]">
            Set Water Reminders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FitnessInsights;
