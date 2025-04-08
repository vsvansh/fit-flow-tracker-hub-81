
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Water, Trophy, Zap } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "reminder" | "achievement" | "alert" | "update";
  icon?: React.ReactNode;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Hydration Reminder",
      description: "Time to drink a glass of water!",
      time: "Just now",
      read: false,
      type: "reminder",
      icon: <Water className="h-4 w-4 text-blue-500" />
    },
    {
      id: "2",
      title: "Goal Achievement",
      description: "You've reached your daily step goal!",
      time: "2 hours ago",
      read: false,
      type: "achievement",
      icon: <Trophy className="h-4 w-4 text-amber-500" />
    },
    {
      id: "3",
      title: "New Challenge Available",
      description: "Check out the new weekly challenge",
      time: "Yesterday",
      read: true,
      type: "update",
      icon: <Zap className="h-4 w-4 text-purple-500" />
    },
    {
      id: "4",
      title: "Inactivity Alert",
      description: "You've been inactive for over an hour",
      time: "Yesterday",
      read: true,
      type: "alert",
    },
  ]);
  
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    });
  };
  
  useEffect(() => {
    // Add scroll to top functionality for all page transitions
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
        scrollToTop();
      }
    });
    
    return () => {
      document.removeEventListener('click', scrollToTop);
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative h-9 w-9 hover:scale-105 transition-transform"
        >
          <Bell className="h-4 w-4" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification, index) => (
                <motion.div 
                  key={notification.id}
                  initial={{ opacity: 0.8, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 ${notification.read ? "" : "bg-blue-50 dark:bg-blue-900/20"} ${
                    index !== notifications.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""
                  } hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer transition-colors`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {notification.icon || (
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          notification.type === "achievement" 
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : notification.type === "alert"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            : notification.type === "reminder"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                        }`}>
                          {notification.type === "achievement" && <Trophy className="h-4 w-4" />}
                          {notification.type === "alert" && <Bell className="h-4 w-4" />}
                          {notification.type === "reminder" && <Water className="h-4 w-4" />}
                          {notification.type === "update" && <Zap className="h-4 w-4" />}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{notification.title}</span>
                        {!notification.read && (
                          <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
            </div>
          )}
        </div>
        <Separator />
        <div className="p-2 flex justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
