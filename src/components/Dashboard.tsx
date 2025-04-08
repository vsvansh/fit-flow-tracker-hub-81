
import { format } from "date-fns";
import { getTodayActivity, fitnessGoals } from "@/utils/fitnessData";
import ActivitySummary from "./ActivitySummary";
import ActivityChart from "./ActivityChart";
import GoalsSetting from "./GoalsSetting";
import { Calendar, Dumbbell, Heart, Stopwatch } from "lucide-react";

const Dashboard = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const todayActivity = getTodayActivity();
  
  // Find goals
  const stepsGoal = fitnessGoals.find(goal => goal.name === "Daily Steps")?.target || 10000;
  const caloriesGoal = fitnessGoals.find(goal => goal.name === "Calories Burned")?.target || 500;
  const distanceGoal = fitnessGoals.find(goal => goal.name === "Distance")?.target || 8;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Fitness Dashboard</h1>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{today}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex items-center">
            <Stopwatch className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Today's Activity</p>
              <p className="font-bold">{todayActivity.steps.toLocaleString()} steps</p>
            </div>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Calories</p>
              <p className="font-bold">{todayActivity.caloriesBurned} cal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ActivitySummary 
          steps={todayActivity.steps}
          caloriesBurned={todayActivity.caloriesBurned}
          distance={todayActivity.distance}
          stepsGoal={stepsGoal}
          caloriesGoal={caloriesGoal}
          distanceGoal={distanceGoal}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ActivityChart />
          </div>
          <div className="md:col-span-1">
            <GoalsSetting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
