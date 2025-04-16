
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BackToHome from "@/components/BackToHome";
import ChatBox from "@/components/ChatBox";
import NotificationCenter from "@/components/NotificationCenter";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { launchConfetti } from "@/utils/confettiUtil";
import { 
  Users, MessageSquare, Heart, MoreHorizontal, Image as ImageIcon, 
  Camera, Send, Award, Activity, Search, Bell, Calendar, 
  UserPlus, Smile, PlusCircle, Heart as HeartIcon, MessageCircle,
  Clock, Trophy, Dumbbell
} from "lucide-react";

// Sample data for the social feed
const socialPosts = [
  {
    id: 1,
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      handle: "@emmawilson"
    },
    content: "Just completed my 10,000 steps goal! 🏃‍♀️ Feeling energized and ready for tomorrow's workout.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    activityType: "Steps Challenge"
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      handle: "@mikechen"
    },
    content: "New personal record on bench press today! 💪 Consistency is key. Who's joining me for tomorrow's gym session?",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 8,
    activityType: "Strength Training"
  },
  {
    id: 3,
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      handle: "@sarahj"
    },
    content: "Morning yoga session with the sunrise. Starting the day with mindfulness and stretching. 🧘‍♀️",
    timestamp: "8 hours ago",
    likes: 37,
    comments: 4,
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    activityType: "Yoga"
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      handle: "@davidk"
    },
    content: "Just signed up for the Virtual 5K Race next month! Anyone else participating? Let's form a team! 🏃‍♂️",
    timestamp: "Yesterday",
    likes: 18,
    comments: 12,
    activityType: "Running Event"
  }
];

// Sample data for challenges
const challenges = [
  {
    id: 1,
    title: "30-Day Step Challenge",
    description: "Complete 10,000 steps daily for 30 days",
    participants: 245,
    timeLeft: "18 days remaining",
    joined: false
  },
  {
    id: 2,
    title: "Summer Fitness Sprint",
    description: "Log a workout every day for 2 weeks",
    participants: 178,
    timeLeft: "5 days remaining",
    joined: false
  },
  {
    id: 3,
    title: "Hydration Challenge",
    description: "Drink 8 glasses of water daily for a week",
    participants: 312,
    timeLeft: "3 days remaining",
    joined: false
  }
];

// Sample data for friends
const friends = [
  {
    id: 1,
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    status: "active",
    lastActive: "Now"
  },
  {
    id: 2,
    name: "Jessica Lee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    status: "active",
    lastActive: "5m ago"
  },
  {
    id: 3,
    name: "Ryan Martinez",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    status: "inactive",
    lastActive: "2h ago"
  },
  {
    id: 4,
    name: "Olivia Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    status: "inactive",
    lastActive: "1d ago"
  }
];

// Sample data for friend suggestions
const friendSuggestions = [
  {
    id: 1,
    name: "Jamie Scott",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 3
  },
  {
    id: 2,
    name: "Morgan Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 5
  },
  {
    id: 3,
    name: "Taylor Diaz",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    mutualFriends: 2
  }
];

const Social = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFriend, setChatFriend] = useState({ name: "", avatar: "" });
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);
  const [newPost, setNewPost] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const navigate = useNavigate();
  
  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };
  
  const handleStartChat = (friend: { name: string; avatar: string }) => {
    setChatFriend(friend);
    setChatOpen(true);
  };
  
  const handleCloseChat = () => {
    setChatOpen(false);
  };
  
  const handleCreatePost = () => {
    if (newPost.trim()) {
      toast({
        title: "Post created",
        description: "Your post has been shared with your friends",
      });
      setNewPost("");
      setShowUploadOptions(false);
    }
  };
  
  const handleJoinChallenge = (challengeId: number) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId]);
      
      // Launch confetti effect
      launchConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "Challenge joined!",
        description: "You've successfully joined the challenge.",
      });
    }
  };
  
  const viewChallenge = (challengeId: number) => {
    navigate('/challenges');
  };

  // Functions for the Stats, Photo, and Workout buttons
  const handleStats = () => {
    toast({
      title: "Stats Shared",
      description: "Your fitness stats have been shared with your followers",
    });
  };

  const handlePhoto = () => {
    toast({
      title: "Photo Upload",
      description: "Photo has been uploaded to your feed",
    });
  };

  const handleWorkout = () => {
    toast({
      title: "Workout Shared",
      description: "Your workout has been shared with your followers",
    });
  };
  
  return (
    <div className="container mx-auto px-4 pb-12">
      <BackToHome className="mb-4" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Social Community</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with friends, join challenges, and share your fitness journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post creation card */}
          <Card className="shadow">
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Your profile" />
                  <AvatarFallback>YP</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Input 
                    placeholder="Share your fitness journey..." 
                    className="w-full" 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onFocus={() => setShowUploadOptions(true)}
                  />
                  
                  {showUploadOptions && (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={handlePhoto}
                        >
                          <Camera className="h-4 w-4" />
                          <span>Photo</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={handleStats}
                        >
                          <Activity className="h-4 w-4" />
                          <span>Stats</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={handleWorkout}
                        >
                          <Dumbbell className="h-4 w-4" />
                          <span>Workout</span>
                        </Button>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          className="gap-1"
                          onClick={handleCreatePost}
                        >
                          <Send className="h-4 w-4" />
                          <span>Post</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Social feed */}
          <div className="space-y-4">
            {socialPosts.map((post) => (
              <Card key={post.id} className="shadow">
                <CardContent className="pt-6 px-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{post.user.name}</h3>
                          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                            {post.user.handle}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
                      <Badge variant="outline" className="h-6 text-xs">
                        {post.activityType}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm">{post.content}</p>
                  </div>
                  
                  {post.image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={post.image} 
                        alt="Post attachment" 
                        className="w-full object-cover"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 text-sm">
                    <div className="flex space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-8 gap-1 ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                        <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>
            
            <TabsContent value="friends" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Friends</h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => {
                      const notificationButton = document.querySelector('[data-notification-trigger="true"]');
                      if (notificationButton) {
                        (notificationButton as HTMLButtonElement).click();
                      }
                    }}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {friends.map((friend) => (
                  <div 
                    key={friend.id} 
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          friend.status === 'active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}></span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{friend.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {friend.lastActive}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleStartChat(friend)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Suggested Friends</h3>
                <div className="space-y-2">
                  {friendSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id} 
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                          <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{suggestion.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {suggestion.mutualFriends} mutual friends
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Active Challenges</h3>
                <Button variant="outline" size="sm" onClick={() => navigate('/challenges')}>
                  <Trophy className="h-4 w-4 mr-1" />
                  All Challenges
                </Button>
              </div>
              
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="shadow-sm border">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Award className="h-5 w-5 mr-2 text-amber-500" />
                            <h4 className="font-medium">{challenge.title}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {challenge.timeLeft}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {challenge.description}
                        </p>
                        
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        
                        <div className="flex justify-between pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewChallenge(challenge.id)}
                          >
                            View Challenge
                          </Button>
                          
                          <Button 
                            size="sm"
                            className={joinedChallenges.includes(challenge.id) ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleJoinChallenge(challenge.id)}
                            disabled={joinedChallenges.includes(challenge.id)}
                          >
                            {joinedChallenges.includes(challenge.id) ? (
                              <>Joined Challenge</>
                            ) : (
                              <>Join Challenge</>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discover" className="space-y-4 mt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input placeholder="Search for people or groups" className="h-8" />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["#MorningWorkout", "#RunningMotivation", "#HealthyEating", 
                    "#FitnessTips", "#WeekendChallenge", "#YogaEveryday"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-medium">Upcoming Events</h3>
                <div className="space-y-2">
                  {[
                    {
                      title: "Virtual 5K Run",
                      date: "April 23 - 25, 2025",
                      participants: 156
                    },
                    {
                      title: "Yoga Workshop",
                      date: "April 30, 2025",
                      participants: 78
                    }
                  ].map((event, idx) => (
                    <div key={idx} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Chat box */}
      {chatOpen && (
        <ChatBox 
          friendName={chatFriend.name}
          friendAvatar={chatFriend.avatar}
          isOpen={chatOpen}
          onClose={handleCloseChat}
        />
      )}

      {/* Hidden NotificationCenter component for notifications button to click */}
      <div className="hidden">
        <NotificationCenter />
      </div>
    </div>
  );
};

export default Social;
