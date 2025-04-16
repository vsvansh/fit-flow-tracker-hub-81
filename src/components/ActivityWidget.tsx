
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Award, 
  Heart, 
  Users, 
  Zap, 
  Flame, 
  Dumbbell, 
  Timer,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';

const ActivityWidget = () => {
  const [activeTab, setActiveTab] = useState<'popular' | 'friends' | 'nearby'>('popular');
  
  return (
    <Card className="border shadow-sm mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Flame className="h-5 w-5 mr-2 text-orange-500" />
          Trending Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Button 
            variant={activeTab === 'popular' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab('popular')}
          >
            <Flame className="h-4 w-4 mr-1" />
            Popular
          </Button>
          <Button 
            variant={activeTab === 'friends' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab('friends')}
          >
            <Users className="h-4 w-4 mr-1" />
            Friends
          </Button>
          <Button 
            variant={activeTab === 'nearby' ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveTab('nearby')}
          >
            <Zap className="h-4 w-4 mr-1" />
            Nearby
          </Button>
        </div>
        
        <div className="space-y-3">
          {activeTab === 'popular' && (
            <>
              <ActivityItem 
                title="Morning HIIT Challenge"
                category="Workout"
                participants={245}
                avatar="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMGd5bXxlbnwwfHwwfHx8MA%3D%3D"
                timestamp="2 hours ago"
                icon={<Dumbbell className="h-5 w-5 text-blue-500" />}
                hot={true}
              />
              <ActivityItem 
                title="Central Park 5K Run"
                category="Running"
                participants={128}
                avatar="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D"
                timestamp="3 hours ago"
                icon={<Timer className="h-5 w-5 text-green-500" />}
              />
              <ActivityItem 
                title="30-Day Pushup Challenge"
                category="Challenge"
                participants={1204}
                avatar="https://images.unsplash.com/photo-1598971639058-b08fb0cbd3a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHdvcmtvdXR8ZW58MHx8MHx8fDA%3D"
                timestamp="1 day ago"
                icon={<Award className="h-5 w-5 text-amber-500" />}
                hot={true}
              />
            </>
          )}
          
          {activeTab === 'friends' && (
            <>
              <ActivityItem 
                title="Emma's Yoga Class"
                category="Yoga"
                participants={12}
                avatar="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D"
                timestamp="Just now"
                icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
                friends={["Alex", "Sarah", "Mike"]}
              />
              <ActivityItem 
                title="Sarah's Weekend Hike"
                category="Outdoor"
                participants={8}
                avatar="https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlraW5nfGVufDB8fDB8fHww"
                timestamp="1 hour ago"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                friends={["Emma", "James"]}
              />
              <ActivityItem 
                title="Mike's Strength Training"
                category="Gym"
                participants={4}
                avatar="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww"
                timestamp="3 hours ago"
                icon={<Dumbbell className="h-5 w-5 text-blue-500" />}
                friends={["Lisa", "James"]}
              />
            </>
          )}
          
          {activeTab === 'nearby' && (
            <>
              <ActivityItem 
                title="Downtown Fitness Club"
                category="Group Fitness"
                participants={32}
                avatar="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3ltfGVufDB8fDB8fHww"
                timestamp="Live now"
                icon={<Zap className="h-5 w-5 text-red-500" />}
                distance="0.5 miles away"
                hot={true}
              />
              <ActivityItem 
                title="Riverside Park Run Club"
                category="Running"
                participants={18}
                avatar="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D"
                timestamp="Starting in 30m"
                icon={<Calendar className="h-5 w-5 text-green-500" />}
                distance="1.2 miles away"
              />
              <ActivityItem 
                title="Community Yoga"
                category="Yoga"
                participants={24}
                avatar="https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHlvZ2F8ZW58MHx8MHx8fDA%3D"
                timestamp="Tomorrow, 8 AM"
                icon={<Clock className="h-5 w-5 text-purple-500" />}
                distance="0.8 miles away"
              />
            </>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          View All Trending Activities
        </Button>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  title: string;
  category: string;
  participants: number;
  avatar: string;
  timestamp: string;
  icon: React.ReactNode;
  hot?: boolean;
  friends?: string[];
  distance?: string;
}

const ActivityItem = ({ 
  title, 
  category, 
  participants, 
  avatar, 
  timestamp, 
  icon,
  hot,
  friends,
  distance
}: ActivityItemProps) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={title} />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
          {icon}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h4 className="font-medium text-sm truncate">{title}</h4>
          {hot && (
            <Badge variant="warning" className="ml-2 py-0 h-5">
              <Flame className="h-3 w-3 mr-1" /> Hot
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          <span className="truncate">{category}</span>
          <span className="mx-1">•</span>
          <Users className="h-3 w-3 mr-0.5" />
          <span>{participants}</span>
          
          {distance && (
            <>
              <span className="mx-1">•</span>
              <span>{distance}</span>
            </>
          )}
        </div>
        
        {friends && friends.length > 0 && (
          <div className="flex items-center mt-1 text-xs">
            <span className="text-blue-600 dark:text-blue-400">
              {friends.join(", ")} {friends.length > 1 ? 'are' : 'is'} joining
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-7 w-7 p-0 rounded-full ${liked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default ActivityWidget;
