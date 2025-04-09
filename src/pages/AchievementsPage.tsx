
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Medal, Star, Award, Crown, ArrowLeft, Home, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const achievementData = [
  {
    id: 1,
    title: "Step Master",
    description: "Walk 10,000 steps in a single day",
    progress: 100,
    icon: <Trophy className="h-5 w-5 text-blue-500" />,
    date: "Achieved: April 2, 2025",
    color: "blue",
    complete: true,
    category: "steps"
  },
  {
    id: 2,
    title: "Calorie Crusher",
    description: "Burn 500 calories in one workout",
    progress: 75,
    icon: <Medal className="h-5 w-5 text-amber-500" />,
    date: "In progress: 375/500",
    color: "amber",
    complete: false,
    category: "calories"
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Complete a workout before 8 AM",
    progress: 100,
    icon: <Star className="h-5 w-5 text-green-500" />,
    date: "Achieved: March 29, 2025",
    color: "green",
    complete: true,
    category: "workout"
  },
  {
    id: 4,
    title: "Marathon Runner",
    description: "Run a total of 42.2 km",
    progress: 65,
    icon: <Award className="h-5 w-5 text-purple-500" />,
    date: "In progress: 27.4/42.2 km",
    color: "purple",
    complete: false,
    category: "distance"
  },
  {
    id: 5,
    title: "Consistency King",
    description: "Log activity for 7 days in a row",
    progress: 85,
    icon: <Crown className="h-5 w-5 text-red-500" />,
    date: "In progress: 6/7 days",
    color: "red",
    complete: false,
    category: "streak"
  },
  {
    id: 6,
    title: "Weekend Warrior",
    description: "Complete 3 workouts on a weekend",
    progress: 67,
    icon: <Star className="h-5 w-5 text-orange-500" />,
    date: "In progress: 2/3",
    color: "orange",
    complete: false,
    category: "workout"
  },
  {
    id: 7,
    title: "Hydration Hero",
    description: "Log 8 glasses of water for 5 days in a row",
    progress: 100,
    icon: <Medal className="h-5 w-5 text-blue-500" />,
    date: "Achieved: March 25, 2025",
    color: "blue",
    complete: true,
    category: "hydration"
  },
  {
    id: 8,
    title: "Nutrition Novice",
    description: "Log your meals for 3 days in a row",
    progress: 100,
    icon: <Award className="h-5 w-5 text-green-500" />,
    date: "Achieved: April 1, 2025",
    color: "green",
    complete: true,
    category: "nutrition"
  },
  {
    id: 9,
    title: "Sleep Champion",
    description: "Get 8 hours of sleep for 7 days in a row",
    progress: 40,
    icon: <Crown className="h-5 w-5 text-purple-500" />,
    date: "In progress: 3/7 days",
    color: "purple",
    complete: false,
    category: "sleep"
  },
  {
    id: 10,
    title: "High Climber",
    description: "Climb the equivalent of 100 floors",
    progress: 80,
    icon: <Trophy className="h-5 w-5 text-amber-500" />,
    date: "In progress: 80/100 floors",
    color: "amber",
    complete: false,
    category: "steps"
  },
  {
    id: 11,
    title: "Social Butterfly",
    description: "Connect with 5 fitness friends",
    progress: 100,
    icon: <Star className="h-5 w-5 text-blue-500" />,
    date: "Achieved: March 30, 2025",
    color: "blue",
    complete: true,
    category: "social"
  },
  {
    id: 12,
    title: "First Challenge",
    description: "Complete your first fitness challenge",
    progress: 100,
    icon: <Medal className="h-5 w-5 text-green-500" />,
    date: "Achieved: March 15, 2025",
    color: "green",
    complete: true,
    category: "challenges"
  },
];

const AchievementsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [tabValue, setTabValue] = useState("all");
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filteredAchievements = achievementData
    .filter(achievement => {
      // Handle search term
      if (searchTerm) {
        return (
          achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    })
    .filter(achievement => {
      // Handle completion filter
      if (filter === "completed") {
        return achievement.complete;
      } else if (filter === "inprogress") {
        return !achievement.complete;
      }
      return true;
    })
    .filter(achievement => {
      // Handle category filter
      if (tabValue !== "all") {
        return achievement.category === tabValue;
      }
      return true;
    });
    
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex items-center mb-6 space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
          </Button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-300">Achievements</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mt-4 mb-8 text-center bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            Badges & Achievements
          </h1>
        </motion.div>
        
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input 
              placeholder="Search achievements..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <ToggleGroup 
              type="single" 
              value={filter}
              onValueChange={(value) => value && setFilter(value)}
              className="justify-start"
            >
              <ToggleGroupItem value="all" className="text-xs">All</ToggleGroupItem>
              <ToggleGroupItem value="completed" className="text-xs">Completed</ToggleGroupItem>
              <ToggleGroupItem value="inprogress" className="text-xs">In Progress</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        <Card className="shadow mb-6">
          <CardContent className="pt-6">
            <Tabs defaultValue={tabValue} onValueChange={setTabValue}>
              <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="calories">Calories</TabsTrigger>
                <TabsTrigger value="distance">Distance</TabsTrigger>
                <TabsTrigger value="workout">Workouts</TabsTrigger>
                <TabsTrigger value="streak">Streaks</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="hydration">Hydration</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>
              
              <TabsContent value={tabValue}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredAchievements.length > 0 ? filteredAchievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className={`achievement-card achievement-card-${achievement.color}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col items-center text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className={`h-16 w-16 rounded-full bg-${achievement.color}-100 dark:bg-${achievement.color}-900/40 flex items-center justify-center mb-3`}>
                          {achievement.icon}
                        </div>
                        <h3 className="font-medium text-base mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                        <div className="w-full mb-1">
                          <Progress value={achievement.progress} className={`h-2 bg-${achievement.color}-100 dark:bg-${achievement.color}-900/30`} />
                        </div>
                        <div className="flex items-center justify-center mt-2">
                          {achievement.complete ? (
                            <Badge variant="outline" className={`text-xs bg-${achievement.color}-100 dark:bg-${achievement.color}-900/30 text-${achievement.color}-700 dark:text-${achievement.color}-300 border-${achievement.color}-200 dark:border-${achievement.color}-700`}>
                              {achievement.date}
                            </Badge>
                          ) : (
                            <p className={`text-xs text-${achievement.color}-600 dark:text-${achievement.color}-400`}>{achievement.date}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="col-span-full flex items-center justify-center py-12">
                      <div className="text-center">
                        <Trophy className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium">No achievements found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try changing your search or filter settings</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Keep tracking your fitness activities to unlock more achievements!
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/challenges")} 
            className="gap-2"
          >
            <Trophy className="h-4 w-4" /> Join Challenges to Earn More Badges
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
