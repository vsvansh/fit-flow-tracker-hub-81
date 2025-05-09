
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Award, Trophy, Calendar, Users, Plus, CheckCircle, ArrowRight, Flag, Timer, Target, Check } from "lucide-react";
import BackToHome from "@/components/BackToHome";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { launchConfetti, celebrationConfetti } from "@/utils/confettiUtil";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "custom";
  progress: number;
  goal: number;
  unit: string;
  deadline?: string;
  participants?: number;
  completed: boolean;
  category?: string;
  joined?: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  score: number;
  isUser?: boolean;
}

const Challenges = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Morning Steps",
      description: "Walk 5,000 steps before 8 AM",
      type: "daily",
      progress: 3200,
      goal: 5000,
      unit: "steps",
      deadline: "Today, 8:00 AM",
      completed: false,
      category: "steps",
      joined: false,
    },
    {
      id: "2",
      title: "Weekly Distance Challenge",
      description: "Complete 50km this week",
      type: "weekly",
      progress: 37.5,
      goal: 50,
      unit: "km",
      deadline: "Sunday",
      participants: 8,
      completed: false,
      category: "distance",
      joined: false,
    },
    {
      id: "3",
      title: "Calorie Burn",
      description: "Burn 500 calories today",
      type: "daily",
      progress: 500,
      goal: 500,
      unit: "cal",
      deadline: "Today",
      completed: true,
      category: "calories",
      joined: true,
    },
    {
      id: "4",
      title: "Group Challenge: Step Masters",
      description: "Be the first team to reach 100,000 steps",
      type: "custom",
      progress: 64300,
      goal: 100000,
      unit: "steps",
      deadline: "3 days left",
      participants: 12,
      completed: false,
      category: "steps",
      joined: false,
    },
    {
      id: "5",
      title: "Weekend Warrior",
      description: "Complete 15,000 steps this weekend",
      type: "weekly",
      progress: 4200,
      goal: 15000,
      unit: "steps",
      deadline: "Sunday",
      completed: false,
      category: "steps",
      joined: false,
    },
    {
      id: "6",
      title: "Consistency Master",
      description: "Meet daily step goal for 5 consecutive days",
      type: "custom",
      progress: 4,
      goal: 5,
      unit: "days",
      deadline: "5 days left",
      completed: false,
      category: "streaks",
      joined: false,
    },
  ]);
  
  const [events, setEvents] = useState([
    {
      title: "Weekend Hiking Challenge",
      date: "April 13-14, 2025",
      desc: "Join the community hiking challenge and track your steps in nature.",
      icon: <Flag className="h-10 w-10 text-green-500" />,
      registered: false
    },
    {
      title: "Virtual 5K Run",
      date: "April 20, 2025",
      desc: "Complete a 5K run anywhere, anytime. Record your results and compare with others.",
      icon: <Timer className="h-10 w-10 text-brand-500" />,
      registered: false
    },
    {
      title: "Step Challenge Marathon",
      date: "May 1-31, 2025",
      desc: "A month-long step challenge with weekly milestones and amazing rewards.",
      icon: <Target className="h-10 w-10 text-purple-500" />,
      registered: false
    }
  ]);
  
  const allLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Mike Wilson", avatar: "/placeholder.svg", score: 12345 },
    { rank: 2, name: "Sarah Johnson", avatar: "/placeholder.svg", score: 11287 },
    { rank: 3, name: "Alex Thompson", avatar: "/placeholder.svg", score: 10932 },
    { rank: 4, name: "Emma Davis", avatar: "/placeholder.svg", score: 9876, isUser: true },
    { rank: 5, name: "James Rodriguez", avatar: "/placeholder.svg", score: 9432 },
    { rank: 6, name: "Olivia Martinez", avatar: "/placeholder.svg", score: 8761 },
    { rank: 7, name: "David Kim", avatar: "/placeholder.svg", score: 8245 },
    { rank: 8, name: "Sophie Chen", avatar: "/placeholder.svg", score: 7890 },
    { rank: 9, name: "Robert Garcia", avatar: "/placeholder.svg", score: 7654 },
    { rank: 10, name: "Lisa Wang", avatar: "/placeholder.svg", score: 7432 },
    { rank: 11, name: "Jordan Smith", avatar: "/placeholder.svg", score: 7210 },
    { rank: 12, name: "Mei Li", avatar: "/placeholder.svg", score: 6975 },
    { rank: 13, name: "Carlos Lopez", avatar: "/placeholder.svg", score: 6821 },
    { rank: 14, name: "Aisha Khan", avatar: "/placeholder.svg", score: 6654 },
    { rank: 15, name: "Daniel Park", avatar: "/placeholder.svg", score: 6432 },
  ];
  
  const leaderboard = showFullLeaderboard ? allLeaderboard : allLeaderboard.slice(0, 8);
  
  // Form state for new challenge
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    type: "daily",
    goal: 1000,
    unit: "steps",
    deadline: ""
  });

  // Handle new challenge input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewChallenge(prev => ({
      ...prev,
      [id]: id === "goal" ? parseInt(value) : value
    }));
  };

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setNewChallenge(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Filter challenges based on active tab
  const filteredChallenges = activeTab === "all" 
    ? challenges 
    : activeTab === "completed" 
      ? challenges.filter(c => c.completed)
      : challenges.filter(c => !c.completed);
      
  const joinChallenge = (id: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === id 
        ? { ...challenge, joined: true } 
        : challenge
    ));
    
    toast({
      title: "Challenge joined!",
      description: "You've successfully joined the challenge.",
    });
    
    launchConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#6366F1', '#EC4899', '#F59E0B']
    });
  };
  
  const createChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new challenge
    const newChallengeData: Challenge = {
      id: (challenges.length + 1).toString(),
      title: newChallenge.title,
      description: newChallenge.description,
      type: newChallenge.type as "daily" | "weekly" | "custom",
      progress: 0,
      goal: newChallenge.goal,
      unit: newChallenge.unit,
      deadline: newChallenge.deadline,
      completed: false,
      joined: false,
      category: newChallenge.unit === "steps" ? "steps" : 
               newChallenge.unit === "km" ? "distance" :
               newChallenge.unit === "cal" ? "calories" : "other"
    };
    
    setChallenges([...challenges, newChallengeData]);
    setDialogOpen(false);
    
    // Reset form
    setNewChallenge({
      title: "",
      description: "",
      type: "daily",
      goal: 1000,
      unit: "steps",
      deadline: ""
    });
    
    toast({
      title: "Challenge created!",
      description: "Your new challenge has been created successfully.",
    });
  };

  const registerForEvent = (index: number) => {
    const updatedEvents = [...events];
    updatedEvents[index].registered = true;
    setEvents(updatedEvents);
    
    toast({
      title: "Registration successful!",
      description: "You've registered for the event. We'll send you more details soon.",
    });
    
    launchConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#6366F1', '#EC4899', '#F59E0B']
    });
  };
  
  const toggleFullLeaderboard = () => {
    setShowFullLeaderboard(prev => !prev);
    
    if (!showFullLeaderboard) {
      toast({
        title: "Leaderboard",
        description: "Viewing complete leaderboard",
      });
    }
  };
  
  // Container animations
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

  return (
    <div className="container mx-auto px-4 pb-12">
      <BackToHome className="mb-4" />
      
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">Challenges & Competitions</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join challenges, compete with friends, and push your limits
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="shadow-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                Active Challenges
              </CardTitle>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="primary-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Challenge
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto my-4">
                  <DialogHeader>
                    <DialogTitle>Create New Challenge</DialogTitle>
                    <DialogDescription>
                      Set up a new challenge for yourself or invite others to compete.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={createChallenge}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Challenge Title</Label>
                        <Input 
                          id="title" 
                          placeholder="Enter challenge title" 
                          required 
                          value={newChallenge.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description" 
                          placeholder="Describe your challenge" 
                          required 
                          value={newChallenge.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select 
                          value={newChallenge.type}
                          onValueChange={(value) => handleSelectChange("type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select challenge type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="goal">Goal</Label>
                          <Input 
                            id="goal" 
                            type="number" 
                            min="1" 
                            placeholder="Goal amount" 
                            required 
                            value={newChallenge.goal}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Select 
                            value={newChallenge.unit}
                            onValueChange={(value) => handleSelectChange("unit", value)}
                          >
                            <SelectTrigger id="unit">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="steps">Steps</SelectItem>
                              <SelectItem value="km">Kilometers</SelectItem>
                              <SelectItem value="cal">Calories</SelectItem>
                              <SelectItem value="min">Minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input 
                          id="deadline" 
                          type="date" 
                          required 
                          value={newChallenge.deadline}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="public" />
                        <Label htmlFor="public">Make challenge public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="invite" />
                        <Label htmlFor="invite">Invite friends</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Challenge</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredChallenges.map((challenge) => (
                    <motion.div
                      key={challenge.id}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="challenge-card"
                    >
                      <Card className={`overflow-hidden border ${
                        challenge.completed 
                          ? "border-green-200 dark:border-green-900" 
                          : "border-gray-200 dark:border-gray-700"
                      }`}>
                        <div className={`h-2 ${
                          challenge.category === "steps" ? "bg-blue-500" :
                          challenge.category === "distance" ? "bg-green-500" :
                          challenge.category === "calories" ? "bg-orange-500" :
                          challenge.category === "streaks" ? "bg-purple-500" : "bg-brand-500"
                        }`}></div>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{challenge.title}</span>
                                {challenge.completed && (
                                  <CheckCircle className="ml-1 h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{challenge.type}</span>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Flag className="mr-1 h-3 w-3" />
                              <span>{challenge.deadline}</span>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                            {challenge.description}
                          </p>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{challenge.progress} {challenge.unit}</span>
                              <span>{challenge.goal} {challenge.unit}</span>
                            </div>
                            <Progress 
                              value={(challenge.progress / challenge.goal) * 100} 
                              className={`h-1.5 ${
                                challenge.completed 
                                  ? "[&>div]:bg-green-500" 
                                  : challenge.category === "steps" ? "[&>div]:bg-blue-500" :
                                    challenge.category === "distance" ? "[&>div]:bg-green-500" :
                                    challenge.category === "calories" ? "[&>div]:bg-orange-500" :
                                    challenge.category === "streaks" ? "[&>div]:bg-purple-500" : "[&>div]:bg-brand-500"
                              }`}
                            />
                            
                            <div className="flex justify-between items-center mt-4">
                              {challenge.participants && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{challenge.participants} participants</span>
                                </div>
                              )}
                              
                              {challenge.completed ? (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="pointer-events-none"
                                >
                                  Completed
                                </Button>
                              ) : challenge.joined ? (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-green-500 text-white hover:bg-green-600 border-green-500"
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  Joined Challenge
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="default" 
                                  onClick={() => joinChallenge(challenge.id)}
                                >
                                  Join Challenge
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <Trophy className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">No challenges found</p>
                    <Button variant="outline" className="mt-4" onClick={() => setDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Challenge
                    </Button>
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-brand-500" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
                      <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                      <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase">Steps</th>
                      <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {leaderboard.map((entry) => (
                      <tr 
                        key={entry.rank} 
                        className={`${entry.isUser ? "bg-blue-50 dark:bg-blue-900/20" : ""} 
                                   transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/70`}
                      >
                        <td className="py-3 px-4 text-sm">
                          {entry.rank <= 3 ? (
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                              entry.rank === 1 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300" : 
                              entry.rank === 2 ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300" : 
                              "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300"
                            }`}>
                              {entry.rank}
                            </span>
                          ) : (
                            entry.rank
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                              {entry.avatar ? (
                                <img src={entry.avatar} alt={entry.name} className="h-8 w-8 rounded-full" />
                              ) : (
                                entry.name.charAt(0)
                              )}
                            </div>
                            <span className={`text-sm ${entry.isUser ? "font-semibold" : ""}`}>
                              {entry.name} {entry.isUser && <span className="text-xs text-blue-600 dark:text-blue-400">(You)</span>}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-medium">
                          {entry.score.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {!entry.isUser && (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="flex flex-col space-y-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                      {entry.avatar ? (
                                        <img src={entry.avatar} alt={entry.name} className="h-12 w-12 rounded-full" />
                                      ) : (
                                        entry.name.charAt(0)
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">{entry.name}</h4>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">Rank #{entry.rank}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex flex-col space-y-1">
                                      <span className="text-gray-500 dark:text-gray-400">Steps</span>
                                      <span className="font-medium">{entry.score.toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <span className="text-gray-500 dark:text-gray-400">Distance</span>
                                      <span className="font-medium">{Math.round(entry.score / 1500)} km</span>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <span className="text-gray-500 dark:text-gray-400">Challenges</span>
                                      <span className="font-medium">{Math.floor(Math.random() * 10) + 2}</span>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                      <span className="text-gray-500 dark:text-gray-400">Completed</span>
                                      <span className="font-medium">{Math.floor(Math.random() * 8) + 1}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between space-x-2">
                                    <Button size="sm" variant="outline" className="w-full">
                                      <Users className="mr-1 h-3 w-3" />
                                      Follow
                                    </Button>
                                    <Button size="sm" className="w-full">
                                      <Trophy className="mr-1 h-3 w-3" />
                                      Challenge
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  onClick={toggleFullLeaderboard}
                >
                  {showFullLeaderboard ? "Show Less" : "View Complete Leaderboard"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-brand-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map((event, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center h-full">
                        <div className="mb-4 p-3 rounded-full bg-white dark:bg-gray-700">
                          {event.icon}
                        </div>
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{event.date}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{event.desc}</p>
                        {event.registered ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-auto bg-green-500 text-white hover:bg-green-600 border-green-500"
                          >
                            <Check className="mr-1 h-3 w-3" />
                            Registered
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => registerForEvent(idx)}
                            className="mt-auto hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            Register
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Challenges;
