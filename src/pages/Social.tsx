
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BackToHome from "@/components/BackToHome";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import SocialFeed from "@/components/SocialFeed";
import {
  Users, MessageCircle, Heart, Award, Share2, Settings, Bell,
  BarChart2, Filter, Search, Calendar, Clock, ArrowRight, MapPin,
  Dumbbell, Star, Image as ImageIcon, User, Camera, BookOpen
} from 'lucide-react';

const Social = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("feed");
  
  // Sample user data
  const userData = {
    name: "Alex Johnson",
    username: "alex_fitness",
    avatar: "/placeholder.svg",
    bio: "Fitness enthusiast, marathon runner, and health coach. Sharing my journey and helping others reach their goals!",
    followers: 1.2, // in thousands
    following: 453,
    posts: 86,
    workouts: [
      { day: "Mon", duration: 55, type: "Strength" },
      { day: "Tue", duration: 40, type: "Cardio" },
      { day: "Wed", duration: 0, type: "Rest" },
      { day: "Thu", duration: 60, type: "Strength" },
      { day: "Fri", duration: 45, type: "Cardio" },
      { day: "Sat", duration: 90, type: "Hiking" },
      { day: "Sun", duration: 30, type: "Recovery" }
    ],
    latestPhotos: [
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1434596922112-19c563067271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D"
    ],
    achievements: [
      { title: "5K Master", date: "Apr 12, 2025", icon: <Award className="h-5 w-5 text-amber-500" /> },
      { title: "30-Day Streak", date: "Mar 28, 2025", icon: <Star className="h-5 w-5 text-purple-500" /> },
      { title: "100 Workouts", date: "Feb 15, 2025", icon: <Dumbbell className="h-5 w-5 text-blue-500" /> },
    ]
  };

  // Sample friends data
  const friendsData = [
    { name: "Emma Wilson", avatar: "/placeholder.svg", lastActive: "2h ago" },
    { name: "James Rodriguez", avatar: "/placeholder.svg", lastActive: "5h ago" },
    { name: "Sarah Chen", avatar: "/placeholder.svg", lastActive: "1d ago" },
    { name: "Mike Brown", avatar: "/placeholder.svg", lastActive: "Just now" },
    { name: "Lisa Taylor", avatar: "/placeholder.svg", lastActive: "3h ago" },
  ];

  // Sample events data
  const eventsData = [
    { title: "Weekend Trail Run", date: "Apr 15, 2025", participants: 24, location: "Central Park" },
    { title: "Group HIIT Session", date: "Apr 18, 2025", participants: 12, location: "Fitness Hub Gym" },
    { title: "5K Charity Run", date: "Apr 25, 2025", participants: 156, location: "Downtown" },
  ];

  const handleUploadPhoto = () => {
    toast({
      title: "Upload Photo",
      description: "Photo upload functionality initiated.",
    });
  };
  
  const handleShareWorkout = () => {
    toast({
      title: "Share Workout",
      description: "Workout share functionality initiated.",
    });
  };
  
  const handleShareStats = () => {
    toast({
      title: "Share Stats",
      description: "Stats share functionality initiated.",
    });
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <BackToHome className="mb-4" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Social Community</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with fitness friends, share your progress, and stay motivated together
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SocialFeed />
        </div>
        
        <div className="space-y-6">
          <Card className="shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{userData.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">@{userData.username}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                  <Settings className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-3 text-center border-y py-3 mb-4">
                <div>
                  <p className="font-bold">{userData.posts}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                </div>
                <div>
                  <p className="font-bold">{userData.followers}k</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="font-bold">{userData.following}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Camera className="h-4 w-4 mr-1 text-blue-500" />
                    Latest Photos
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {userData.latestPhotos.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-md overflow-hidden">
                        <img src={photo} alt="Activity" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2" onClick={handleUploadPhoto}>
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Upload Photo
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-amber-500" />
                    Recent Achievements
                  </h4>
                  <div className="space-y-2">
                    {userData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          {achievement.icon}
                          <span className="ml-2 text-sm">{achievement.title}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1 text-blue-500" />
                    Weekly Activity
                  </h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userData.workouts}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="duration" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={handleShareWorkout}>
                      <Dumbbell className="h-4 w-4 mr-1" />
                      Workout
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShareStats}>
                      <BarChart2 className="h-4 w-4 mr-1" />
                      Stats
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Friends</CardTitle>
                <Button variant="ghost" size="sm">See All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search friends..." className="pl-8" />
              </div>
              <div className="space-y-2">
                {friendsData.map((friend, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{friend.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{friend.lastActive}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
                <Button variant="ghost" size="sm">All Events</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventsData.map((event, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{event.participants} participants</span>
                      <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                        Details <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Social;
