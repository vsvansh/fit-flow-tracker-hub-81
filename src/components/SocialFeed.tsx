import { useState, useEffect } from "react";
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
import { launchConfetti } from "@/utils/confettiUtil";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Bookmark,
  X
} from 'lucide-react';

const users = [
  { id: 1, name: "Emma Wilson", username: "emma_fit", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", isFollowing: true },
  { id: 2, name: "Alex Thompson", username: "alex_runs", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", isFollowing: false },
  { id: 3, name: "Sarah Johnson", username: "sarahj", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", isFollowing: true },
  { id: 4, name: "Michael Brown", username: "mike_lifts", avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXJ8ZW58MHx8MHx8fDA%3D", isFollowing: false },
  { id: 5, name: "Sophie Chen", username: "sophie_c", avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D", isFollowing: true },
];

const posts = [
  {
    id: 1,
    user: { name: "Emma Wilson", username: "emma_fit", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
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
    user: { name: "Alex Thompson", username: "alex_runs", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
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
    user: { name: "Sarah Johnson", username: "sarahj", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" },
    content: "Morning yoga session completed ✅ Starting the day with mindfulness and stretching makes such a difference to my energy levels throughout the day. Anyone else love morning yoga? #Yoga #MorningRoutine",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
    timestamp: "1 day ago",
    likes: 38,
    comments: 12,
    shares: 4,
    workout: { type: "Yoga", duration: "30 minutes", focus: "Flexibility & Balance" }
  }
];

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
  const [following, setFollowing] = useState<Record<number, boolean>>({});
  const [thumbsUp, setThumbsUp] = useState<Record<number, boolean>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);
  const [selectedStats, setSelectedStats] = useState<boolean>(false);

  useEffect(() => {
    const initialFollowing: Record<number, boolean> = {};
    users.forEach(user => {
      initialFollowing[user.id] = user.isFollowing;
    });
    setFollowing(initialFollowing);
  }, []);

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
    setFollowing(prev => {
      const newState = { ...prev, [userId]: !prev[userId] };
      
      if (newState[userId]) {
        launchConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        toast({
          title: "User Followed",
          description: `You are now following this user.`,
        });
      } else {
        toast({
          title: "User Unfollowed",
          description: `You have unfollowed this user.`,
        });
      }
      
      return newState;
    });
  };
  
  const handleThumbsUp = (activityIndex: number) => {
    setThumbsUp(prev => {
      const newState = { ...prev, [activityIndex]: !prev[activityIndex] };
      return newState;
    });
    
    toast({
      title: "Activity Liked",
      description: "You've liked this activity.",
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
    setSelectedPhoto("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D");
    
    toast({
      title: "Photo Selected",
      description: "Photo ready to be shared in your post.",
    });
  };

  const handlePostWorkout = () => {
    setSelectedWorkout({
      type: "Strength Training",
      duration: "45 minutes",
      exercises: ["Squats", "Bench Press", "Deadlift"],
      sets: 3,
      reps: "8-12"
    });
    
    toast({
      title: "Workout Selected",
      description: "Workout details added to your post.",
    });
  };

  const handlePostStats = () => {
    setSelectedStats(true);
    
    toast({
      title: "Stats Selected",
      description: "Weekly progress stats added to your post.",
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
          
          <TabsContent value="feed" className="space-y-4">
            <Card className="border shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Input 
                      placeholder="Share your fitness journey..." 
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    
                    {(selectedPhoto || selectedWorkout || selectedStats) && (
                      <div className="mt-2 mb-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Post Preview</h4>
                        
                        {selectedPhoto && (
                          <div className="mb-2">
                            <div className="relative">
                              <img 
                                src={selectedPhoto} 
                                alt="Selected" 
                                className="w-full h-auto rounded-md max-h-40 object-cover" 
                              />
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                                onClick={() => setSelectedPhoto(null)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {selectedWorkout && (
                          <div className="mb-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md text-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Dumbbell className="h-4 w-4 text-blue-500 mr-1" />
                                <span className="font-medium">{selectedWorkout.type}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => setSelectedWorkout(null)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="mt-1 text-gray-600 dark:text-gray-300">
                              <div>Duration: {selectedWorkout.duration}</div>
                              <div>Exercises: {selectedWorkout.exercises.join(", ")}</div>
                              <div>{selectedWorkout.sets} sets × {selectedWorkout.reps} reps</div>
                            </div>
                          </div>
                        )}
                        
                        {selectedStats && (
                          <div className="mb-2 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-md text-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <BarChart2 className="h-4 w-4 text-purple-500 mr-1" />
                                <span className="font-medium">Weekly Progress</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => setSelectedStats(false)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="mt-1 text-gray-600 dark:text-gray-300">
                              <div>Workouts: 5 sessions</div>
                              <div>Total Duration: 4.5 hours</div>
                              <div>Calories Burned: ~2,200</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
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
                      <Button 
                        size="sm" 
                        className="ml-auto" 
                        onClick={handlePostSubmit}
                      >
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
                                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHx8fDA%3D" alt="Comment user" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm flex-1">
                                <p>{comment}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
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
                        variant={following[user.id] ? "outline" : "default"} 
                        size="sm"
                        className={following[user.id] ? "text-green-600 border-green-300 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30" : ""}
                        onClick={() => handleFollow(user.id)}
                      >
                        {following[user.id] ? (
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
                  { id: 1, user: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", activity: "completed a 10K run", time: "1 hour ago" },
                  { id: 2, user: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", activity: "achieved a new personal record in bench press", time: "3 hours ago" },
                  { id: 3, user: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8
