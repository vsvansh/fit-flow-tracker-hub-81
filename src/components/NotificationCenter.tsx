
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "reminder" | "achievement" | "alert" | "update";
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
    },
    {
      id: "2",
      title: "Goal Achievement",
      description: "You've reached your daily step goal!",
      time: "2 hours ago",
      read: false,
      type: "achievement",
    },
    {
      id: "3",
      title: "New Challenge Available",
      description: "Check out the new weekly challenge",
      time: "Yesterday",
      read: true,
      type: "update",
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
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative h-9 w-9"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
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
                <div 
                  key={notification.id}
                  className={`p-3 ${notification.read ? "" : "bg-blue-50 dark:bg-blue-900/20"} ${
                    index !== notifications.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-sm">{notification.title}</span>
                        {!notification.read && (
                          <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.description}
                      </p>
                    </div>
                    <div>
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] ${
                          notification.type === "achievement" 
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" 
                            : notification.type === "alert"
                            ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                            : notification.type === "reminder"
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                            : "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                        }`}
                      >
                        {notification.type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
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
            onClick={() => {}}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
