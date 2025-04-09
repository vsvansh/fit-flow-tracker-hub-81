
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Heart, Share2, Award, Activity, ThumbsUp, Send, Clock, Plus, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initial?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  type: "achievement" | "milestone" | "workout" | "challenge";
  media?: string;
}

const SocialFeed = () => {
  const [feed, setFeed] = useState<FeedItem[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        initial: "S",
      },
      content: "Just completed my daily 10,000 steps goal! Feeling energized and ready for tomorrow's challenge.",
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
        initial: "M",
      },
      content: "Earned the 'Early Bird' badge for completing 5,000 steps before 8 AM! Morning walks are becoming my favorite part of the day.",
      timestamp: "45 minutes ago",
      likes: 8,
      comments: 2,
      liked: true,
      type: "achievement",
      media: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "3",
      user: {
        name: "Emma Davis",
        initial: "E",
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
        initial: "A",
      },
      content: "Burned 750 calories during today's HIIT workout! Who wants to join me for tomorrow's session?",
      timestamp: "3 hours ago",
      likes: 23,
      comments: 7,
      liked: false,
      type: "workout",
    },
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedFilter, setFeedFilter] = useState<'all' | 'achievements' | 'workouts' | 'challenges'>('all');

  const toggleLike = (id: string) => {
    setFeed(
      feed.map((item) => {
        if (item.id === id) {
          const newLiked = !item.liked;
          return {
            ...item,
            liked: newLiked,
            likes: newLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };
  
  const handleComment = (id: string) => {
    if (activeCommentId === id) {
      // Submit comment
      if (newComment.trim()) {
        setFeed(
          feed.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                comments: item.comments + 1,
              };
            }
            return item;
          })
        );
        toast({
          title: "Comment added",
          description: "Your comment has been posted successfully",
        });
        setNewComment("");
        setActiveCommentId(null);
      }
    } else {
      // Open comment input
      setActiveCommentId(id);
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 100);
    }
  };
  
  const handleShare = (id: string) => {
    toast({
      title: "Post shared",
      description: "This post has been shared with your connections",
    });
  };

  const handleJoinChallenge = () => {
    toast({
      title: "Challenge joined",
      description: "You have successfully joined the challenge!",
    });
  };

  const handleFindFriends = () => {
    toast({
      title: "Finding friends",
      description: "Searching for friends with similar fitness interests...",
    });
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
            initial: "J",
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
            initial: "R",
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
      setFeed([...feed, ...newPosts]);
      setIsLoading(false);
      
      toast({
        title: "New posts loaded",
        description: "Showing latest activities from your network",
      });
    }, 1500);
  };

  const FilterButtons = () => (
    <div className="flex mb-4 overflow-x-auto py-2 gap-2">
      <Button 
        variant={feedFilter === 'all' ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => setFeedFilter('all')}
      >
        All
      </Button>
      <Button 
        variant={feedFilter === 'achievements' ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => setFeedFilter('achievements')}
      >
        <Award className="w-4 h-4 mr-1" />
        Achievements
      </Button>
      <Button 
        variant={feedFilter === 'workouts' ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => setFeedFilter('workouts')}
      >
        <Activity className="w-4 h-4 mr-1" />
        Workouts
      </Button>
      <Button 
        variant={feedFilter === 'challenges' ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => setFeedFilter('challenges')}
      >
        <Users className="w-4 h-4 mr-1" />
        Challenges
      </Button>
    </div>
  );
  
  const filteredFeed = feed.filter(item => {
    if (feedFilter === 'all') return true;
    if (feedFilter === 'achievements') return item.type === 'achievement';
    if (feedFilter === 'workouts') return item.type === 'workout';
    if (feedFilter === 'challenges') return item.type === 'challenge';
    return true;
  });
  
  useEffect(() => {
    // Add auto-scroll to social feed
    const container = document.getElementById('social-feed-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [feed]);

  return (
    <Card className="shadow hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Activity Feed
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent id="social-feed-container" className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="mb-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Your profile" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <Input 
              placeholder="Share your fitness journey..." 
              className="bg-transparent border border-gray-200 dark:border-gray-700 focus-visible:ring-1 focus-visible:ring-offset-1"
            />
            <Button size="sm" className="rounded-full bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <FilterButtons />
        
        <div className="space-y-4">
          {filteredFeed.length > 0 ? (
            filteredFeed.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800/40 backdrop-blur-sm"
              >
                <div className="flex items-start">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.user.avatar} alt={item.user.name} />
                    <AvatarFallback>{item.user.initial || item.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.user.name}</p>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">{item.timestamp}</span>
                      </div>
                    </div>
                    <div className="mt-2">
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
                            variant="outline" 
                            size="sm" 
                            className="ml-2 h-6 text-xs bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100"
                            onClick={handleJoinChallenge}
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
                      
                      {item.media && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <img 
                            src={item.media} 
                            alt="Post media" 
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center mt-3 space-x-4">
                        <button
                          className={`flex items-center text-xs ${item.liked ? 'text-red-500' : 'text-muted-foreground'} hover:scale-110 transition-transform`}
                          onClick={() => toggleLike(item.id)}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                          <span>{item.likes}</span>
                        </button>
                        <button 
                          className="flex items-center text-xs text-muted-foreground hover:scale-110 transition-transform"
                          onClick={() => handleComment(item.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{item.comments}</span>
                        </button>
                        <button 
                          className="flex items-center text-xs text-muted-foreground hover:scale-110 transition-transform"
                          onClick={() => handleShare(item.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          <span>Share</span>
                        </button>
                      </div>
                      
                      {activeCommentId === item.id && (
                        <div className="mt-3 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Your profile" />
                            <AvatarFallback>Y</AvatarFallback>
                          </Avatar>
                          <Input
                            ref={commentInputRef}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="text-xs h-8"
                          />
                          <Button size="sm" className="h-8 px-2" onClick={() => handleComment(item.id)}>
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              {feedFilter === 'all' ? (
                <>
                  <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2">No posts to display</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Follow more friends to see their activity</p>
                </>
              ) : (
                <>
                  {feedFilter === 'achievements' && <Award className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />}
                  {feedFilter === 'workouts' && <Activity className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />}
                  {feedFilter === 'challenges' && <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />}
                  <p className="text-gray-500 dark:text-gray-400 mb-2">No {feedFilter} posts to display</p>
                  <Button variant="outline" size="sm" onClick={() => setFeedFilter('all')}>
                    View all posts
                  </Button>
                </>
              )}
            </div>
          )}
          
          <div className="flex justify-center">
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
                  <Plus className="h-4 w-4" />
                  Load More
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialFeed;
