import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, ChevronRight, Award, Target, Footprints, 
  Heart, Clock, Zap, Calendar, Users, Trophy 
} from "lucide-react";
import { getTodayActivity, fitnessGoals, getStreakCount, getWeeklyStats } from "@/utils/fitnessData";

import ActivitySummary from "@/components/ActivitySummary";
import ActivityChart from "@/components/ActivityChart";
import GoalsSetting from "@/components/GoalsSetting";
import UserProfile from "@/components/UserProfile";
import StatsInsight from "@/components/StatsInsight";
import Achievements from "@/components/Achievements";
import Challenges from "@/components/Challenges";
import HabitTracker from "@/components/HabitTracker";
import SocialFeed from "@/components/SocialFeed";
import AIRecommendations from "@/components/AIRecommendations";
import WaterTracker from "@/components/WaterTracker";
import { motion } from "framer-motion";
import { launchConfetti } from "@/utils/confetti";

const Index = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("activity");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  
  const todayActivity = getTodayActivity();
  const streakCount = getStreakCount();
  const weeklyStats = getWeeklyStats();
  
  // Find goals
  const stepsGoal = fitnessGoals.find(goal => goal.name === "Daily Steps")?.target || 10000;
  const caloriesGoal = fitnessGoals.find(goal => goal.name === "Calories Burned")?.target || 500;
  const distanceGoal = fitnessGoals.find(goal => goal.name === "Distance")?.target || 8;
  const activeMinutesGoal = fitnessGoals.find(goal => goal.name === "Active Minutes")?.target || 60;
  
  // Dashboard animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  useEffect(() => {
    // Show welcome toast when the app loads
    toast({
      title: "Welcome to FitFlow Tracker",
      description: "Track your fitness journey and achieve your goals!",
    });
  }, []);

  const handleJoinChallenge = () => {
    launchConfetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 }
    });
    
    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the challenge. Good luck!",
    });
  };
  
  const handleViewDetailedReport = () => {
    navigate("/activity");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1 gradient-text">Your Fitness Dashboard</h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{formattedDate}</span>
                <Badge variant="outline" className="ml-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                  {streakCount} Day Streak 🔥
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                onClick={() => navigate("/profile")}
              >
                <span>View Profile</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <Card className="fitness-card flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-2 flex flex-row items-start">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-sm font-medium text-gray-500">Today's Steps</CardTitle>
                  <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {todayActivity.steps.toLocaleString()}
                  </div>
                </div>
                <div className="ml-auto rounded-full w-8 h-8 bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
                  <Footprints className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((todayActivity.steps / stepsGoal) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                  {Math.round((todayActivity.steps / stepsGoal) * 100)}% of daily goal
                </p>
              </CardContent>
            </Card>
        
            <Card className="fitness-card flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-2 flex flex-row items-start">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-sm font-medium text-gray-500">Calories</CardTitle>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {todayActivity.caloriesBurned}
                  </div>
                </div>
                <div className="ml-auto rounded-full w-8 h-8 bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((todayActivity.caloriesBurned / caloriesGoal) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                  {Math.round((todayActivity.caloriesBurned / caloriesGoal) * 100)}% of daily goal
                </p>
              </CardContent>
            </Card>
        
            <Card className="fitness-card flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-2 flex flex-row items-start">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-sm font-medium text-gray-500">Distance</CardTitle>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {todayActivity.distance} km
                  </div>
                </div>
                <div className="ml-auto rounded-full w-8 h-8 bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((todayActivity.distance / distanceGoal) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                  {Math.round((todayActivity.distance / distanceGoal) * 100)}% of daily goal
                </p>
              </CardContent>
            </Card>
        
            <Card className="fitness-card flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="pb-2 flex flex-row items-start">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Minutes</CardTitle>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {todayActivity.activeMinutes || 42}
                  </div>
                </div>
                <div className="ml-auto rounded-full w-8 h-8 bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round(((todayActivity.activeMinutes || 42) / activeMinutesGoal) * 100))}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                  {Math.round(((todayActivity.activeMinutes || 42) / activeMinutesGoal) * 100)}% of daily goal
                </p>
              </CardContent>
            </Card>
          </motion.div>

          
          <motion.div variants={itemVariants} className="mb-6">
            <ActivitySummary 
              steps={todayActivity.steps}
              caloriesBurned={todayActivity.caloriesBurned}
              distance={todayActivity.distance}
              activeMinutes={todayActivity.activeMinutes || 42}
              stepsGoal={stepsGoal}
              caloriesGoal={caloriesGoal}
              distanceGoal={distanceGoal}
              activeMinutesGoal={activeMinutesGoal}
            />
          </motion.div>
          
          
          <motion.div variants={itemVariants}>
            <Tabs 
              defaultValue="activity" 
              value={selectedTab} 
              onValueChange={setSelectedTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="activity" className="flex items-center gap-1">
                  <Zap className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Activity</span>
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Challenges</span>
                </TabsTrigger>
                <TabsTrigger value="habits" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Habits</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-1">
                  <Users className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Social</span>
                </TabsTrigger>
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
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-8 mb-2 grid sm:grid-cols-3 gap-6"
          >
            <Card className="fitness-card col-span-full md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>
                  Your stats this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Weekly Average Steps</span>
                      <span className="font-medium text-brand-600">{weeklyStats.averageSteps.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.round((weeklyStats.averageSteps / 10000) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Weekly Average Calories</span>
                      <span className="font-medium text-orange-600">{weeklyStats.averageCalories}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.round((weeklyStats.averageCalories / 500) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Best Day This Week</span>
                      <span className="font-medium text-green-600">Thursday</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      12,543 steps · 625 calories · 9.2 km
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleViewDetailedReport}
                  >
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="fitness-card col-span-full md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Upcoming Events & Challenges
                </CardTitle>
                <CardDescription>
                  Stay motivated with these activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Weekend Hiking Challenge",
                      date: "April 13-14, 2025",
                      desc: "Join the community hiking challenge and track your steps in nature.",
                      icon: <Footprints className="h-6 w-6 text-green-500" />,
                      color: "bg-green-50 dark:bg-green-900/20",
                    },
                    {
                      title: "Virtual 5K Run",
                      date: "April 20, 2025",
                      desc: "Complete a 5K run anywhere, anytime. Record your results and compare with others.",
                      icon: <Clock className="h-6 w-6 text-brand-500" />,
                      color: "bg-blue-50 dark:bg-blue-900/20",
                    },
                  ].map((event, idx) => (
                    <Card key={idx} className={`border-none shadow-none ${event.color}`}>
                      <CardContent className="p-4 flex">
                        <div className="mr-3 p-3 rounded-full bg-white dark:bg-gray-800">
                          {event.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{event.title}</h3>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{event.date}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{event.desc}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 h-7 text-xs"
                            onClick={handleJoinChallenge}
                          >
                            Join Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/challenges")}
                >
                  View All Challenges
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
