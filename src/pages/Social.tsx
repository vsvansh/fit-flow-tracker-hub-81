
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, Heart, Share2, Award, Activity, MoreHorizontal, Send, Image as ImageIcon, PlusCircle, Medal, Calendar } from "lucide-react";
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
        avatar: "/placeholder.svg",
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
        avatar: "/placeholder.svg",
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
        avatar: "/placeholder.svg",
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
  
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
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
      avatar: "/placeholder.svg",
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
      avatar: "/placeholder.svg",
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
      avatar: "/placeholder.svg",
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
      avatar: "/placeholder.svg",
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
    
    const newPost: FeedItem = {
      id: `new-${Date.now()}`,
      user: {
        name: "Alex Thompson", // Current user
        avatar: "/placeholder.svg",
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
    
    toast({
      title: "Post created!",
      description: "Your post has been shared with your friends.",
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
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="Your avatar" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="flex-grow space-y-3">
                  <Textarea 
                    placeholder="Share your fitness journey, achievements or updates..." 
                    className="min-h-20 resize-none"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Medal className="h-4 w-4 mr-1" />
                        Achievement
                      </Button>
                    </div>
                    <Button onClick={submitPost} className="primary-button">
                      <Send className="h-4 w-4 mr-1" />
                      Post
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
                <Card key={item.id} className="shadow-card overflow-hidden">
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
                          <div className="flex items-center text-amber-600 mb-2">
                            <Award className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Achievement Unlocked</span>
                          </div>
                        )}
                        {item.type === "milestone" && (
                          <div className="flex items-center text-green-600 mb-2">
                            <Award className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Milestone Reached</span>
                          </div>
                        )}
                        {item.type === "challenge" && (
                          <div className="flex items-center text-purple-600 mb-2">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Challenge Invitation</span>
                          </div>
                        )}
                        {item.type === "workout" && (
                          <div className="flex items-center text-blue-600 mb-2">
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
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <div className="flex space-x-6">
                          <button
                            className={`flex items-center ${item.liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => toggleLike(item.id)}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                            <span className="text-sm">{item.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-sm">{item.comments}</span>
                          </button>
                        </div>
                        
                        <button 
                          className="flex items-center text-gray-500 hover:text-gray-700"
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
                          <AvatarImage src="/placeholder.svg" alt="Your avatar" />
                          <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow flex">
                          <Input 
                            placeholder="Write a comment..." 
                            className="h-9 rounded-r-none"
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
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-4 mt-0">
              {feedItems.filter(item => item.type === "achievement").length > 0 ? (
                feedItems
                  .filter(item => item.type === "achievement")
                  .map(item => (
                    <Card key={item.id} className="shadow-card">
                      {/* Same structure as above */}
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
                    <Card key={item.id} className="shadow-card">
                      {/* Same structure as above */}
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
                    <Card key={item.id} className="shadow-card">
                      {/* Same structure as above */}
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
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-brand-500" />
                Friends Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-5">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between">
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
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Find Friends
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-brand-500" />
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
                  <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
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
                    <Button variant="outline" size="sm" className="h-8">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Medal className="h-5 w-5 mr-2 text-brand-500" />
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
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl mb-2">
                      {badge.icon}
                    </div>
                    <p className="text-xs font-medium">{badge.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Social;
