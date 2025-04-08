
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Heart, Share2, Award, Activity } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

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
}

const SocialFeed = () => {
  const [feed, setFeed] = useState<FeedItem[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
      },
      content: "Just completed my daily 10,000 steps goal!",
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
      content: "Burned 750 calories during today's HIIT workout!",
      timestamp: "3 hours ago",
      likes: 23,
      comments: 7,
      liked: false,
      type: "workout",
    },
  ]);

  const toggleLike = (id: string) => {
    setFeed(
      feed.map((item) => {
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

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Activity Feed</CardTitle>
          <Users className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feed.map((item) => (
            <div key={item.id} className="p-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
              <div className="flex items-start">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.user.name}</p>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <div className="mt-2">
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
                    
                    <div className="flex items-center mt-3 space-x-4">
                      <button
                        className={`flex items-center text-xs ${item.liked ? 'text-red-500' : 'text-muted-foreground'}`}
                        onClick={() => toggleLike(item.id)}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${item.liked ? 'fill-red-500' : ''}`} />
                        <span>{item.likes}</span>
                      </button>
                      <button className="flex items-center text-xs text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{item.comments}</span>
                      </button>
                      <button className="flex items-center text-xs text-muted-foreground">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center">
            <Button variant="outline">View More</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialFeed;
