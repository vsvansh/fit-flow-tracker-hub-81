
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, MessageSquare, Heart, Share2, Award, Activity, 
  MoreHorizontal, Send, ImageIcon, PlusCircle, Medal, 
  Calendar, Loader2, Search, Bell, UserPlus
} from "lucide-react";
import BackToHome from "@/components/BackToHome";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  type: "achievement" | "milestone" | "workout" | "challenge";
  media?: string;
}

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  active?: boolean;
  lastActive?: string;
  streak?: number;
  stats?: {
    steps: number;
    caloriesBurned: number;
  };
}

const Social = () => {
  const { toast } = useToast();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      content: "Just completed my daily 10,000 steps goal! Feeling energized and ready for the day.",
      timestamp: "10 minutes ago",
      likes: 14,
      comments: 3,
      liked: false,
      type: "milestone",
    },
    {
      id: "2",
      user: {
        name: "Mike Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      content: "Earned the 'Early Bird' badge for completing 5,000 steps before 8 AM!",
      timestamp: "45 minutes ago",
      likes: 8,
      comments: 2,
      liked: true,
      type: "achievement",
      media: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "3",
      user: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      content: "Just invited you to the '50K Weekly Steps' challenge. Join now!",
      timestamp: "2 hours ago",
      likes: 5,
      comments: 1,
      liked: false,
      type: "challenge",
    },
    {
      id: "4",
      user: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      content: "Burned 750 calories during today's HIIT workout! Loving the progress I'm seeing this month.",
      timestamp: "3 hours ago",
      likes: 23,
      comments: 7,
      liked: false,
      type: "workout",
      media: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ]);
  
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false);
  
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      active: true,
      streak: 7,
      stats: {
        steps: 8743,
        caloriesBurned: 423,
      },
    },
    {
      id: "2",
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      active: false,
      lastActive: "2h ago",
      streak: 12,
      stats: {
        steps: 6521,
        caloriesBurned: 312,
      },
    },
    {
      id: "3",
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      active: true,
      streak: 5,
      stats: {
        steps: 9112,
        caloriesBurned: 467,
      },
    },
    {
      id: "4",
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      active: false,
      lastActive: "1d ago",
      streak: 3,
      stats: {
        steps: 5280,
        caloriesBurned: 246,
      },
    },
    {
      id: "5",
      name: "Jessica Lee",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      active: true,
      streak: 15,
      stats: {
        steps: 11534,
        caloriesBurned: 578,
      },
    },
  ]);

  const toggleLike = (id: string) => {
    setFeedItems(
      feedItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            liked: !item.liked,
            likes: item.liked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };
  
  const sharePost = (id: string) => {
    toast({
      title: "Post shared!",
      description: "This post has been shared to your profile.",
    });
  };
  
  const submitPost = () => {
    if (postText.trim() === "") {
      toast({
        title: "Cannot post empty content",
        description: "Please write something or add an image.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newPost: FeedItem = {
        id: `new-${Date.now()}`,
        user: {
          name: "Alex Thompson", // Current user
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        content: postText,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        liked: false,
        type: "milestone",
      };
      
      setFeedItems([newPost, ...feedItems]);
      setPostText("");
      setIsLoading(false);
      
      toast({
        title: "Post created!",
        description: "Your post has been shared with your friends.",
      });
    }, 1000);
  };

  const handleFindFriends = () => {
    setFriendsLoading(true);
    
    setTimeout(() => {
      const newFriends: Friend[] = [
        {
          id: "6",
          name: "Robert Chen",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          active: true,
          streak: 4,
          stats: {
            steps: 7820,
            caloriesBurned: 380,
          },
        },
        {
          id: "7",
          name: "Olivia Smith",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          active: false,
          lastActive: "3h ago",
          streak: 9,
          stats: {
            steps: 9340,
            caloriesBurned: 452,
          },
        }
      ];
      
      setFriends([...friends, ...newFriends]);
      setFriendsLoading(false);
      
      toast({
        title: "Friends Found!",
        description: "We found 2 new friends with similar fitness goals.",
      });
    }, 2000);
  };

  const handleJoinEvent = (eventName: string) => {
    toast({
      title: `Joined ${eventName}!`,
      description: "You've successfully registered for this event.",
    });
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

  const loadMorePosts = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newPosts: FeedItem[] = [
        {
          id: "5",
          user: {
            name: "Jennifer Lopez",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          },
          content: "Just completed a 5K run in under 30 minutes! New personal best!",
          timestamp: "5 hours ago",
          likes: 18,
          comments: 5,
          liked: false,
          type: "milestone",
        },
        {
          id: "6",
          user: {
            name: "Robert Chen",
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
          },
          content: "Check out my new workout routine! It's perfect for building core strength.",
          timestamp: "7 hours ago",
          likes: 12,
          comments: 3,
          liked: false,
          type: "workout",
          media: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
      ];
      
      setFeedItems([...feedItems, ...newPosts]);
      setIsLoading(false);
      
      toast({
        title: "New posts loaded",
        description: "Showing latest activities from your network",
      });
    }, 1500);
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
        <h1 className="text-3xl font-bold mb-2 gradient-text">Social Feed</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with friends, share achievements, and stay motivated together
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
          <Card className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Your avatar" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="flex-grow space-y-3">
                  <Textarea 
                    placeholder="Share your fitness journey, achievements or updates..." 
                    className="min-h-20 resize-none border border-gray-200 dark:border-gray-700 focus-visible:ring-1 focus-visible:ring-offset-1"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ImageIcon className="h-4 w-4" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Medal className="h-4 w-4" />
                        Achievement
                      </Button>
                    </div>
                    <Button 
                      onClick={submitPost} 
                      className="primary-button px-4" 
                      disabled={isLoading || !postText.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" /> 
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-1" />
                          Post
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-0">
              {feedItems.map((item) => (
                <Card key={item.id} className="shadow-card overflow-hidden dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={item.user.avatar} alt={item.user.name} />
                            <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{item.user.name}</p>
                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-3">
                        {item.type === "achievement" && (
                          <div className="flex items-center text-amber-600 dark:text-amber-400 mb-2">
                            <Award className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Achievement Unlocked</span>
                          </div>
                        )}
                        {item.type === "milestone" && (
                          <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
                            <Award className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Milestone Reached</span>
                          </div>
                        )}
                        {item.type === "challenge" && (
                          <div className="flex items-center text-purple-600 dark:text-purple-400 mb-2">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Challenge Invitation</span>
                            <Button 
                              size="sm" 
                              className="ml-2 h-6 text-xs bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 rounded-full"
                              onClick={() => toast({
                                title: "Challenge joined!",
                                description: "You've joined the 50K Weekly Steps challenge"
                              })}
                            >
                              Join
                            </Button>
                          </div>
                        )}
                        {item.type === "workout" && (
                          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                            <Activity className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Workout Completed</span>
                          </div>
                        )}
                        
                        <p className="text-sm">{item.content}</p>
                      </div>
                      
                      {item.media && (
                        <div className="mt-3 rounded-md overflow-hidden">
                          <img 
                            src={item.media} 
                            alt="Post media" 
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t dark:border-gray-700">
                        <div className="flex space-x-6">
                          <button
                            className={`flex items-center ${item.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                            onClick={() => toggleLike(item.id)}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                            <span className="text-sm">{item.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-sm">{item.comments}</span>
                          </button>
                        </div>
                        
                        <button 
                          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() => sharePost(item.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Comment section */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Your avatar" />
                          <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow flex">
                          <Input 
                            placeholder="Write a comment..." 
                            className="h-9 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <Button size="sm" className="h-9 rounded-l-none">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline"
                  onClick={loadMorePosts}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Load More
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-4 mt-0">
              {feedItems.filter(item => item.type === "achievement").length > 0 ? (
                feedItems
                  .filter(item => item.type === "achievement")
                  .map(item => (
                    <Card key={item.id} className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={item.user.avatar} alt={item.user.name} />
                            <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{item.user.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                            </div>
                            <div className="flex items-center text-amber-600 dark:text-amber-400 mt-1 mb-2">
                              <Award className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Achievement Unlocked</span>
                            </div>
                            <p className="text-sm">{item.content}</p>
                            
                            {item.media && (
                              <div className="mt-3 rounded-lg overflow-hidden">
                                <img src={item.media} alt="Achievement" className="w-full h-auto object-cover" />
                              </div>
                            )}
                            
                            <div className="flex items-center mt-3 space-x-4">
                              <button
                                className={`flex items-center text-xs ${item.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
                                onClick={() => toggleLike(item.id)}
                              >
                                <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                                <span>{item.likes}</span>
                              </button>
                              <button className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{item.comments}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <Award className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">No achievements posts yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="workouts" className="space-y-4 mt-0">
              {feedItems.filter(item => item.type === "workout").length > 0 ? (
                feedItems
                  .filter(item => item.type === "workout")
                  .map(item => (
                    <Card key={item.id} className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={item.user.avatar} alt={item.user.name} />
                            <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{item.user.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                            </div>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 mt-1 mb-2">
                              <Activity className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Workout Completed</span>
                            </div>
                            <p className="text-sm">{item.content}</p>
                            
                            {item.media && (
                              <div className="mt-3 rounded-lg overflow-hidden">
                                <img src={item.media} alt="Workout" className="w-full h-auto object-cover" />
                              </div>
                            )}
                            
                            <div className="flex items-center mt-3 space-x-4">
                              <button
                                className={`flex items-center text-xs ${item.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
                                onClick={() => toggleLike(item.id)}
                              >
                                <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                                <span>{item.likes}</span>
                              </button>
                              <button className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{item.comments}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <Activity className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">No workout posts yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="challenges" className="space-y-4 mt-0">
              {feedItems.filter(item => item.type === "challenge").length > 0 ? (
                feedItems
                  .filter(item => item.type === "challenge")
                  .map(item => (
                    <Card key={item.id} className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={item.user.avatar} alt={item.user.name} />
                            <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{item.user.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                            </div>
                            <div className="flex items-center text-purple-600 dark:text-purple-400 mt-1 mb-2">
                              <Users className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Challenge Invitation</span>
                            </div>
                            <p className="text-sm">{item.content}</p>
                            
                            <Button 
                              className="mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                              onClick={() => toast({
                                title: "Challenge joined!",
                                description: "You've joined the 50K Weekly Steps challenge"
                              })}
                            >
                              Join Challenge
                            </Button>
                            
                            <div className="flex items-center mt-3 space-x-4">
                              <button
                                className={`flex items-center text-xs ${item.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
                                onClick={() => toggleLike(item.id)}
                              >
                                <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                                <span>{item.likes}</span>
                              </button>
                              <button className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{item.comments}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                  <p className="mt-4 text-gray-500 dark:text-gray-400">No challenge posts yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Friends Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-4 relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search friends..." 
                  className="pl-9"
                />
              </div>
              
              <div className="space-y-5">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {friend.active && (
                          <span className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-sm">{friend.name}</p>
                          {friend.streak && friend.streak > 3 && (
                            <div className="flex items-center ml-2 text-orange-500">
                              <span className="text-xs font-semibold">{friend.streak}</span>
                              <span className="text-orange-500 ml-0.5">🔥</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          {friend.active ? (
                            <span className="text-green-500">Active now</span>
                          ) : (
                            <span>{friend.lastActive}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-medium">{friend.stats?.steps.toLocaleString()} steps</p>
                      <p className="text-gray-500 dark:text-gray-400">{friend.stats?.caloriesBurned} cal</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleFindFriends}
                  disabled={friendsLoading}
                >
                  {friendsLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Finding...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Find Friends
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {[
                  {
                    title: "Weekend Hiking Challenge",
                    date: "April 13-14",
                    participants: 8,
                  },
                  {
                    title: "Virtual 5K Run",
                    date: "April 20",
                    participants: 24,
                  },
                  {
                    title: "Step Challenge Marathon",
                    date: "May 1-31",
                    participants: 56,
                  }
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-3 border-b dark:border-gray-700 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                        <span className="mx-1">•</span>
                        <Users className="h-3 w-3 mr-1" />
                        <span>{event.participants} participants</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleJoinEvent(event.title)}
                    >
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Medal className="h-5 w-5 mr-2 text-blue-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Step Master", icon: "🚶" },
                  { name: "Early Bird", icon: "🌅" },
                  { name: "Weekend Warrior", icon: "⚔️" },
                  { name: "Calorie Crusher", icon: "🔥" },
                  { name: "Distance Pro", icon: "🏃" },
                  { name: "Consistency King", icon: "👑" },
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center badge-card p-3 rounded-lg hover:scale-105 transition-transform duration-200">
                    <div className="h-12 w-12 rounded-full bg-gray-700/50 dark:bg-gray-600/50 flex items-center justify-center text-2xl mb-2">
                      {badge.icon}
                    </div>
                    <p className="text-xs font-medium text-gray-200">{badge.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 FitFlow • Privacy Policy • Terms of Service • Help Center</p>
        <div className="flex justify-center space-x-4 mt-3">
          <Button variant="ghost" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toast({ title: "Contact Us", description: "Our support team will get back to you soon!" })}>
            Contact Us
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toast({ title: "Feedback", description: "Thank you for your feedback!" })}>
            Send Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Social;
