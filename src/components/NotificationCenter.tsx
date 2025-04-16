
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell, CheckCircle, Award, Calendar, MessageSquare, Users, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "achievement",
    title: "New Achievement Unlocked",
    description: "You've completed your 7-day streak!",
    time: "Just now",
    read: false,
    icon: <Award className="h-5 w-5 text-amber-500" />
  },
  {
    id: 2,
    type: "challenge",
    title: "Challenge Update",
    description: "You're halfway through the 10K steps challenge.",
    time: "2 hours ago",
    read: false,
    icon: <CheckCircle className="h-5 w-5 text-green-500" />
  },
  {
    id: 3,
    type: "social",
    title: "New Friend Request",
    description: "Jessica Lee sent you a friend request.",
    time: "5 hours ago",
    read: true,
    icon: <Users className="h-5 w-5 text-blue-500" />
  },
  {
    id: 4,
    type: "event",
    title: "Upcoming Event Reminder",
    description: "Virtual 5K Run starts tomorrow at 8 AM.",
    time: "Yesterday",
    read: true,
    icon: <Calendar className="h-5 w-5 text-purple-500" />
  },
  {
    id: 5,
    type: "social",
    title: "New Comment",
    description: "Michael commented on your recent workout post.",
    time: "2 days ago",
    read: true,
    icon: <MessageSquare className="h-5 w-5 text-pink-500" />
  },
  {
    id: 6,
    type: "social",
    title: "Likes on Your Post",
    description: "15 people liked your morning run update.",
    time: "3 days ago",
    read: true,
    icon: <Heart className="h-5 w-5 text-red-500" />
  }
];

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationItems, setNotificationItems] = useState(notifications);
  
  const unreadCount = notificationItems.filter(item => !item.read).length;
  
  const markAllAsRead = () => {
    setNotificationItems(notificationItems.map(item => ({ ...item, read: true })));
  };
  
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative h-9 w-9"
        onClick={() => setIsOpen(true)}
        data-notification-trigger="true"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Notifications</DialogTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            </div>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 pt-2">
              {notificationItems.map((notification) => (
                <div key={notification.id}>
                  <div className={`flex space-x-4 p-2 rounded-lg transition-colors ${
                    notification.read ? "" : "bg-blue-50 dark:bg-blue-900/20"
                  }`}>
                    <div className="flex-shrink-0 mt-0.5">
                      {notification.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          notification.read ? "" : "text-blue-900 dark:text-blue-100"
                        }`}>
                          {notification.title}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${
                            notification.read ? "bg-gray-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                          }`}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationCenter;
