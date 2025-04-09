
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
import WaterTracker from "./WaterTracker";
import NotificationCenter from "./NotificationCenter";
import { 
  Calendar, Heart, Clock, Footprints, Award, Bell, Settings, 
  Trophy, Zap, Users
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const todayActivity = getTodayActivity();
  const streakCount = getStreakCount();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Find goals
  const stepsGoal = fitnessGoals.find(goal => goal.name === "Daily Steps")?.target || 10000;
  const caloriesGoal = fitnessGoals.find(goal => goal.name === "Calories Burned")?.target || 500;
  const distanceGoal = fitnessGoals.find(goal => goal.name === "Distance")?.target || 8;
  const activeMinutesGoal = fitnessGoals.find(goal => goal.name === "Active Minutes")?.target || 60;
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl transition-all duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Fitness Dashboard</h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{today}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
          <Button
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 h-9"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="hidden sm:inline">{theme === "light" ? "Dark" : "Light"} Mode</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 h-9"
            onClick={() => navigate("/profile")}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 h-9 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
            onClick={() => navigate("/settings")}
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>
          
          <NotificationCenter />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800/50 rounded-lg shadow p-4 flex items-center justify-between dashboard-stats-card blue-glow">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-3 mr-3">
              <Footprints className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Steps</p>
              <p className="font-bold text-blue-700 dark:text-blue-300 text-xl">{todayActivity.steps.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round((todayActivity.steps / stepsGoal) * 100)}% of goal</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800/50 rounded-lg shadow p-4 flex items-center justify-between dashboard-stats-card orange-glow">
          <div className="flex items-center">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/40 p-3 mr-3">
              <Heart className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
              <p className="font-bold text-red-600 dark:text-red-300 text-xl">{todayActivity.caloriesBurned}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round((todayActivity.caloriesBurned / caloriesGoal) * 100)}% of goal</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50 rounded-lg shadow p-4 flex items-center justify-between dashboard-stats-card green-glow">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-3 mr-3">
              <Footprints className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
              <p className="font-bold text-green-700 dark:text-green-300 text-xl">{todayActivity.distance} km</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round((todayActivity.distance / distanceGoal) * 100)}% of goal</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800/50 rounded-lg shadow p-4 flex items-center justify-between dashboard-stats-card purple-glow">
          <div className="flex items-center">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/40 p-3 mr-3">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
              <p className="font-bold text-amber-700 dark:text-amber-300 text-xl">{streakCount} days</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Keep it going!</p>
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
                <div className="space-y-6">
                  <UserProfile />
                  <WaterTracker />
                </div>
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

      <div className="mt-8 pb-8">
        <Separator />
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>FitFlow Tracker © {new Date().getFullYear()} | Your Daily Fitness Companion</p>
          <p className="mt-1 text-xs">Privacy Policy • Terms of Service • Help Center</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
