
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  Users, MessageSquare, Heart, Award, Dumbbell, Trophy, Share2, Send,
  ThumbsUp, MessageCircle, UserPlus, Search
} from "lucide-react";
import confetti from 'canvas-confetti';

const socialData = [
  {
    id: 1,
    user: {
      name: "Mike Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      handle: "@mike_fitness"
    },
    content: "Just crushed a 10K run in under 50 minutes! New personal best! 💪 #running #fitness #goals",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1470&auto=format&fit=crop",
    likes: 24,
    comments: 5,
    time: "2 hours ago",
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      handle: "@sarahj"
    },
    content: "Morning yoga session complete! Starting the day with mindfulness and stretching. Who else loves morning workouts?",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1364&auto=format&fit=crop",
    likes: 18,
    comments: 7,
    time: "5 hours ago",
    isLiked: false
  },
  {
    id: 3,
    user: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      handle: "@alex_fit"
    },
    content: "Hit a new deadlift PR today: 315 lbs! Hard work pays off. What's your recent fitness achievement?",
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=1470&auto=format&fit=crop",
    likes: 32,
    comments: 11,
    time: "Yesterday",
    isLiked: false
  }
];

const friendSuggestions = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "https://i.pravatar.cc/150?img=29",
    mutualFriends: 4
  },
  {
    id: 2,
    name: "David Miller",
    avatar: "https://i.pravatar.cc/150?img=53",
    mutualFriends: 2
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=25",
    mutualFriends: 7
  }
];

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

const SocialFeed = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState(socialData);
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (postContent.trim() === "") {
      toast({
        title: "Nothing to post",
        description: "Please write something before posting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate posting
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        user: {
          name: "You",
          avatar: localStorage.getItem('userAvatar') || "https://i.pravatar.cc/150?img=70",
          handle: "@you"
        },
        content: postContent,
        image: "",
        likes: 0,
        comments: 0,
        time: "Just now",
        isLiked: false
      };
      
      setPosts([newPost, ...posts]);
      setPostContent("");
      setIsLoading(false);
      
      toast({
        title: "Posted successfully!",
        description: "Your update has been shared with your fitness community."
      });
      
      // Trigger confetti effect
      triggerConfetti();
    }, 1000);
  };
  
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };
  
  const handleAddFriend = (friendId: number) => {
    toast({
      title: "Friend request sent!",
      description: "They'll receive your request shortly."
    });
  };
  
  const handleLoadMore = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const additionalPosts = [
        {
          id: posts.length + 1,
          user: {
            name: "Taylor Kim",
            avatar: "https://i.pravatar.cc/150?img=32",
            handle: "@taylor_fit"
          },
          content: "Finally tried that new HIIT class everyone's talking about. Totally worth it but I'm going to be sore tomorrow! #fitness #workout",
          image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
          likes: 12,
          comments: 3,
          time: "2 days ago",
          isLiked: false
        },
        {
          id: posts.length + 2,
          user: {
            name: "Jordan Patel",
            avatar: "https://i.pravatar.cc/150?img=8",
            handle: "@j_patel"
          },
          content: "Meal prep done for the week! Healthy eating is half the battle. #mealprep #nutrition #fitness",
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop",
          likes: 19,
          comments: 8,
          time: "3 days ago",
          isLiked: false
        }
      ];
      
      setPosts([...posts, ...additionalPosts]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <Users className="h-6 w-6 mr-2 text-blue-500" />
          Fitness Community
        </CardTitle>
        <CardDescription>Connect with other fitness enthusiasts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={localStorage.getItem('userAvatar') || "https://i.pravatar.cc/150?img=70"} />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Share your fitness journey..." 
                        className="resize-none"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button type="button" size="sm" variant="outline">
                        📷 Photo
                      </Button>
                      <Button type="button" size="sm" variant="outline">
                        🏋️ Workout
                      </Button>
                      <Button type="button" size="sm" variant="outline">
                        📊 Stats
                      </Button>
                    </div>
                    <Button type="submit" disabled={isLoading} className="flex items-center space-x-1">
                      {isLoading ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-1" /> Post
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
                <TabsTrigger value="achievements" onClick={() => setActiveTab("achievements")}>Achievements</TabsTrigger>
                <TabsTrigger value="workouts" onClick={() => setActiveTab("workouts")}>Workouts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="border shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{post.user.name}</p>
                            <p className="text-xs text-gray-500">{post.user.handle} • {post.time}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.5H7.5H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </Button>
                      </div>
                      
                      <p className="text-sm">{post.content}</p>
                      
                      {post.image && (
                        <div className="rounded-md overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post" 
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`flex items-center space-x-1 ${post.isLiked ? 'text-blue-500' : ''}`}
                            onClick={() => handleLike(post.id)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={handleLoadMore} 
                    className="px-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 text-amber-500 mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">Achievement Highlights</h3>
                      <p className="text-sm text-gray-500 mb-4">Share and celebrate your fitness milestones</p>
                      <Button>Share an Achievement</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="workouts">
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-center py-8">
                      <Dumbbell className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">Workout Feed</h3>
                      <p className="text-sm text-gray-500 mb-4">Share your workouts and see what others are doing</p>
                      <Button>Share a Workout</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Find Friends</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for friends..." className="pl-8" />
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {friendSuggestions.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{friend.name}</p>
                          <p className="text-xs text-gray-500">{friend.mutualFriends} mutual friends</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={() => handleAddFriend(friend.id)}
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Button variant="ghost" className="w-full text-blue-500 hover:text-blue-600">
                    View All Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Trending Challenges</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-3">
                  {[
                    { name: "10K Steps Daily", participants: 1245, icon: <Footprints className="h-4 w-4" /> },
                    { name: "30-Day Push-up", participants: 862, icon: <Dumbbell className="h-4 w-4" /> },
                    { name: "Weekend Warrior", participants: 543, icon: <Trophy className="h-4 w-4" /> }
                  ].map((challenge, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          {challenge.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{challenge.name}</p>
                          <p className="text-xs text-gray-500">{challenge.participants} participants</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialFeed;
