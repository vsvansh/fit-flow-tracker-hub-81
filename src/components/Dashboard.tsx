
import { format } from "date-fns";
import { getTodayActivity, fitnessGoals, getStreakCount } from "@/utils/fitnessData";
import ActivitySummary from "./ActivitySummary";
import ActivityChart from "./ActivityChart";
import GoalsSetting from "./GoalsSetting";
import UserProfile from "./UserProfile";
import StatsInsight from "./StatsInsight";
import Achievements from "./Achievements";
import Challenges from "./Challenges";
import HabitTracker from "./HabitTracker";
import SocialFeed from "./SocialFeed";
import AIRecommendations from "./AIRecommendations";
import { Calendar, Heart, Clock, Footprints, TrendingUp, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const todayActivity = getTodayActivity();
  const streakCount = getStreakCount();
  
  // Find goals
  const stepsGoal = fitnessGoals.find(goal => goal.name === "Daily Steps")?.target || 10000;
  const caloriesGoal = fitnessGoals.find(goal => goal.name === "Calories Burned")?.target || 500;
  const distanceGoal = fitnessGoals.find(goal => goal.name === "Distance")?.target || 8;
  const activeMinutesGoal = fitnessGoals.find(goal => goal.name === "Active Minutes")?.target || 60;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-blue-700">Fitness Dashboard</h1>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{today}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Steps</p>
              <p className="font-bold text-blue-700 dark:text-blue-300">{todayActivity.steps.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg shadow-sm">
            <Heart className="w-5 h-5 text-red-500 dark:text-red-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
              <p className="font-bold text-red-600 dark:text-red-300">{todayActivity.caloriesBurned}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg shadow-sm">
            <Footprints className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
              <p className="font-bold text-green-700 dark:text-green-300">{todayActivity.distance} km</p>
            </div>
          </div>
          
          <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg shadow-sm">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
              <p className="font-bold text-amber-700 dark:text-amber-300">{streakCount} days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ActivitySummary 
          steps={todayActivity.steps}
          caloriesBurned={todayActivity.caloriesBurned}
          distance={todayActivity.distance}
          activeMinutes={todayActivity.activeMinutes || 0}
          stepsGoal={stepsGoal}
          caloriesGoal={caloriesGoal}
          distanceGoal={distanceGoal}
          activeMinutesGoal={activeMinutesGoal}
        />
        
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="habits">Habits</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ActivityChart />
              </div>
              <div className="md:col-span-1">
                <UserProfile />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatsInsight />
              <div className="grid grid-cols-1 gap-6">
                <GoalsSetting />
              </div>
            </div>
            
            <AIRecommendations />
            <Achievements />
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-6">
            <Challenges />
          </TabsContent>
          
          <TabsContent value="habits" className="space-y-6">
            <HabitTracker />
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <SocialFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
