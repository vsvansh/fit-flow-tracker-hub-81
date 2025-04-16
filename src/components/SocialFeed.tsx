
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/providers/ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  MessageCircle,
  Heart,
  Award,
  Share2,
  PlusCircle,
  ThumbsUp,
  Image as ImageIcon,
  BarChart2,
  Search,
  Bell,
  UserPlus,
  Calendar,
  Clock,
  Camera,
  Dumbbell,
  Zap,
  MapPin,
  Trophy,
  Check,
  MoreHorizontal,
  Send,
  Smile,
  ChevronDown,
  Filter,
  Bookmark
} from 'lucide-react';

// Sample user data
const users = [
  { id: 1, name: "Emma Wilson", username: "emma_fit", avatar: "/placeholder.svg", isFollowing: true },
  { id: 2, name: "Alex Thompson", username: "alex_runs", avatar: "/placeholder.svg", isFollowing: false },
  { id: 3, name: "Sarah Johnson", username: "sarahj", avatar: "/placeholder.svg", isFollowing: true },
  { id: 4, name: "Michael Brown", username: "mike_lifts", avatar: "/placeholder.svg", isFollowing: false },
  { id: 5, name: "Sophie Chen", username: "sophie_c", avatar: "/placeholder.svg", isFollowing: true },
];

// Sample posts data
const posts = [
  {
    id: 1,
    user: { name: "Emma Wilson", username: "emma_fit", avatar: "/placeholder.svg" },
    content: "Just completed my morning run! 🏃‍♀️ 5 miles in 40 minutes - a new personal best! #MorningRun #FitnessGoals",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    shares: 2,
    workout: { type: "Running", duration: "40 minutes", distance: "5 miles" }
  },
  {
    id: 2,
    user: { name: "Alex Thompson", username: "alex_runs", avatar: "/placeholder.svg" },
    content: "Hit a new PR on bench press today! 💪 Been following the 5x5 program for 6 weeks now and seeing real progress. #GymLife #StrongerEveryDay",
    image: "https://images.unsplash.com/photo-1534368786749-b63e05c92712?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 8,
    shares: 3,
    workout: { type: "Weight Training", duration: "60 minutes", weights: "Bench Press 185lbs 5x5" }
  },
  {
    id: 3,
    user: { name: "Sarah Johnson", username: "sarahj", avatar: "/placeholder.svg" },
    content: "Morning yoga session completed ✅ Starting the day with mindfulness and stretching makes such a difference to my energy levels throughout the day. Anyone else love morning yoga? #Yoga #MorningRoutine",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
    timestamp: "1 day ago",
    likes: 38,
    comments: 12,
    shares: 4,
    workout: { type: "Yoga", duration: "30 minutes", focus: "Flexibility & Balance" }
  }
];

// Sample achievements
const achievements = [
  { 
    id: 1, 
    title: "5K Runner", 
    description: "Completed a 5K run under 25 minutes", 
    icon: <Trophy className="h-6 w-6 text-amber-500" />, 
    earned: true,
    date: "April 10, 2025",
    progress: 100
  },
  { 
    id: 2, 
    title: "Gym Regular", 
    description: "Visited the gym 20 times in a month", 
    icon: <Dumbbell className="h-6 w-6 text-blue-500" />, 
    earned: false,
    progress: 75,
    current: "15/20 visits"
  },
  { 
    id: 3, 
    title: "Early Bird", 
    description: "Worked out before 7 AM for a week straight", 
    icon: <Clock className="h-6 w-6 text-green-500" />, 
    earned: true,
    date: "March 28, 2025",
    progress: 100
  },
  { 
    id: 4, 
    title: "Strength Master", 
    description: "Lifted 200% of body weight", 
    icon: <Zap className="h-6 w-6 text-purple-500" />, 
    earned: false,
    progress: 80,
    current: "180% achieved"
  },
];

// Sample workout data for stats
const workoutData = [
  { day: "Mon", hours: 1.5, intensity: 7 },
  { day: "Tue", hours: 1.0, intensity: 8 },
  { day: "Wed", hours: 0.5, intensity: 5 },
  { day: "Thu", hours: 1.2, intensity: 9 },
  { day: "Fri", hours: 0.8, intensity: 6 },
  { day: "Sat", hours: 2.0, intensity: 8 },
  { day: "Sun", hours: 0.0, intensity: 0 },
];

const SocialFeed = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("feed");
  const [postContent, setPostContent] = useState("");
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [comments, setComments] = useState<Record<number, string[]>>({
    1: ["Great job on the run!", "Keep up the good work!"],
    2: ["Impressive progress!", "What's your max?"],
    3: ["Love morning yoga too!"]
  });
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      toast({
        title: "Post Created",
        description: "Your post has been published to your feed.",
      });
      setPostContent("");
    }
  };

  const handleLike = (postId: number) => {
    setIsLiked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    toast({
      title: isLiked[postId] ? "Post Unliked" : "Post Liked",
      description: isLiked[postId] ? "You've unliked this post." : "You've liked this post.",
    });
  };

  const handleShare = (postId: number) => {
    toast({
      title: "Post Shared",
      description: "Post has been shared with your followers.",
    });
  };

  const handleFollow = (userId: number) => {
    toast({
      title: "User Followed",
      description: `You are now following this user.`,
    });
  };

  const handleComment = (postId: number) => {
    if (commentText[postId]?.trim()) {
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), commentText[postId]]
      }));
      setCommentText(prev => ({
        ...prev,
        [postId]: ""
      }));
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the post.",
      });
    }
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handlePostPhoto = () => {
    toast({
      title: "Photo Upload",
      description: "Photo upload functionality initiated.",
    });
  };

  const handlePostWorkout = () => {
    toast({
      title: "Workout Post",
      description: "Workout post functionality initiated.",
    });
  };

  const handlePostStats = () => {
    toast({
      title: "Stats Post",
      description: "Stats sharing functionality initiated.",
    });
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Social Community
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Bell className="h-4 w-4 mr-1" />
            Notifications
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
          
          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-4">
            <Card className="border shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Input 
                      placeholder="Share your fitness journey..." 
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handlePostPhoto}>
                        <Camera className="h-4 w-4 mr-1" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePostWorkout}>
                        <Dumbbell className="h-4 w-4 mr-1" />
                        Workout
                      </Button>
                      <Button variant="outline" size="sm" onClick={handlePostStats}>
                        <BarChart2 className="h-4 w-4 mr-1" />
                        Stats
                      </Button>
                      <Button size="sm" className="ml-auto" onClick={handlePostSubmit}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-2">
                          <AvatarImage src={post.user.avatar} alt={post.user.name} />
                          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.timestamp}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm">{post.content}</p>
                      
                      {post.workout && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 flex items-center text-sm">
                          <Dumbbell className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <div>
                            <span className="font-medium">{post.workout.type}</span>
                            <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
                            <span>{post.workout.duration}</span>
                            {post.workout.distance && (
                              <>
                                <span className="text-gray-500 dark:text-gray-400 mx-2">•</span>
                                <span>{post.workout.distance}</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {post.image && (
                        <div className="rounded-md overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post" 
                            className="w-full h-auto object-cover rounded-md" 
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`flex items-center space-x-1 ${isLiked[post.id] ? 'text-red-500' : ''}`}
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart className={`h-4 w-4 ${isLiked[post.id] ? 'fill-current' : ''}`} />
                            <span>{isLiked[post.id] ? post.likes + 1 : post.likes}</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center space-x-1"
                            onClick={() => toggleComments(post.id)}
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{comments[post.id]?.length || 0}</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center space-x-1"
                            onClick={() => handleShare(post.id)}
                          >
                            <Share2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {showComments[post.id] && (
                        <div className="pt-3 border-t space-y-3">
                          {comments[post.id]?.map((comment, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm flex-1">
                                <p>{comment}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback>Y</AvatarFallback>
                            </Avatar>
                            <Input
                              placeholder="Write a comment..."
                              className="text-sm py-1"
                              value={commentText[post.id] || ""}
                              onChange={(e) => setCommentText({
                                ...commentText,
                                [post.id]: e.target.value
                              })}
                            />
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="p-0 h-8 w-8"
                              onClick={() => handleComment(post.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-8" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select connection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Connections</SelectItem>
                    <SelectItem value="following">Following</SelectItem>
                    <SelectItem value="followers">Followers</SelectItem>
                    <SelectItem value="suggested">Suggested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Suggested Friends</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                  <Card key={user.id} className="border">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-3">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</div>
                        </div>
                      </div>
                      <Button 
                        variant={user.isFollowing ? "outline" : "default"} 
                        size="sm"
                        onClick={() => handleFollow(user.id)}
                      >
                        {user.isFollowing ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Follow
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <h3 className="font-medium mt-6">Activity from Friends</h3>
              <div className="space-y-3">
                {[
                  { user: "Sarah Johnson", activity: "completed a 10K run", time: "1 hour ago" },
                  { user: "Alex Thompson", activity: "achieved a new personal record in bench press", time: "3 hours ago" },
                  { user: "Emma Wilson", activity: "shared a new workout routine", time: "Yesterday" },
                  { user: "Michael Brown", activity: "joined the 30-Day Challenge", time: "2 days ago" },
                ].map((activity, index) => (
                  <div key={index} className="p-3 border rounded-md flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3">
                      <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="mx-1">{activity.activity}</span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Your Achievements</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`border ${achievement.earned ? 'border-green-200 dark:border-green-800' : ''} hover:shadow-md transition-shadow`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full mr-3 ${
                          achievement.earned 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium flex items-center">
                            {achievement.title}
                            {achievement.earned && (
                              <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Earned
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {achievement.earned ? (
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Earned on {achievement.date}
                      </div>
                    ) : (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress: {achievement.progress}%</span>
                          <span>{achievement.current}</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1.5" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <h3 className="font-medium mt-6">Weekly Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">7.0</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Hours Active</div>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">5</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Workouts</div>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">43%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Improvement</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "10K Steps Daily (30 Days)", progress: 70, days: "21/30" },
                      { name: "Weight Training Master", progress: 45, days: "9/20" },
                      { name: "Marathon Ready", progress: 30, days: "6/20" }
                    ].map((challenge, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">{challenge.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{challenge.days} days</div>
                        </div>
                        <Progress value={challenge.progress} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Active Challenges</h3>
              <Button>
                <PlusCircle className="h-4 w-4 mr-1" />
                Join Challenge
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  title: "30-Day Steps Challenge", 
                  participants: 128, 
                  duration: "15 days left",
                  description: "Hit 10,000 steps every day for 30 days.",
                  progress: 50,
                  position: "5th place",
                  type: "group"
                },
                { 
                  title: "Weekly 5K", 
                  participants: 76, 
                  duration: "3 days left",
                  description: "Run a 5K each week and track your improvement.",
                  progress: 75,
                  position: "12th place",
                  type: "individual"
                }
              ].map((challenge, index) => (
                <Card key={index} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{challenge.title}</h4>
                      <Badge variant="outline">
                        {challenge.type === "group" ? "Group" : "Individual"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>
                    
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {challenge.participants} participants
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {challenge.duration}
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span>Your progress: {challenge.progress}%</span>
                        <span className="text-blue-600 dark:text-blue-400">{challenge.position}</span>
                      </div>
                      <Progress value={challenge.progress} className="h-1.5" />
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      View Challenge
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <h3 className="font-medium mt-6">Upcoming Challenges</h3>
            <div className="space-y-3">
              {[
                { 
                  title: "Summer Fitness Showdown", 
                  start: "Starts in 5 days",
                  description: "Complete daily challenges for points and rewards.",
                  participants: 203,
                  location: "Global"
                },
                { 
                  title: "Virtual Marathon", 
                  start: "Starts in 2 weeks",
                  description: "Complete a full marathon distance over the course of a month.",
                  participants: 188,
                  location: "Virtual"
                }
              ].map((challenge, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{challenge.title}</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{challenge.start}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{challenge.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center mr-3">
                      <Users className="h-3 w-3 mr-1" />
                      {challenge.participants} interested
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {challenge.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-2">
              Browse All Challenges
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialFeed;
