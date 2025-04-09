
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Footprints, Menu, X, Bell, Settings, LogOut, 
  User, Home, Activity, Utensils, Medal, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentAvatar } from "@/utils/avatarUpdateHandler";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { mockUser } from "@/utils/fitnessData"; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState(getCurrentAvatar());
  const [notificationCount, setNotificationCount] = useState(3);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    navigate('/login');
  };
  
  const handleNotificationsClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications"
    });
    setNotificationCount(0);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Listen for avatar updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatar(getCurrentAvatar());
    };
    
    window.addEventListener('avatarUpdate', handleAvatarUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'userAvatar') {
        setAvatar(getCurrentAvatar());
      }
    });
    
    return () => {
      window.removeEventListener('avatarUpdate', handleAvatarUpdate);
      window.removeEventListener('storage', handleAvatarUpdate);
    };
  }, []);
  
  const navLinks = [
    { name: "Dashboard", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Activity", path: "/activity", icon: <Activity className="h-4 w-4 mr-2" /> },
    { name: "Nutrition", path: "/nutrition", icon: <Utensils className="h-4 w-4 mr-2" /> },
    { name: "Challenges", path: "/challenges", icon: <Medal className="h-4 w-4 mr-2" /> },
    { name: "Social", path: "/social", icon: <Users className="h-4 w-4 mr-2" /> },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Footprints className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              <span className="font-bold text-xl gradient-text">FitFlow</span>
            </Link>
            
            <nav className="hidden md:flex items-center ml-10 space-x-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md flex items-center transition-colors ${
                    isActive(link.path)
                      ? "bg-gray-100 dark:bg-gray-800 text-brand-600 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative rounded-full"
              onClick={handleNotificationsClick}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt="Profile" />
                    <AvatarFallback className="bg-brand-600 text-white">VS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                      {mockUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center">
                    <Footprints className="h-6 w-6 text-brand-600 dark:text-brand-400 mr-2" />
                    <span className="gradient-text">FitFlow</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-1">
                    {navLinks.map((link, index) => (
                      <SheetClose asChild key={index}>
                        <Link
                          to={link.path}
                          className={`flex items-center py-2 px-3 rounded-md mb-1 text-sm ${
                            isActive(link.path)
                              ? "bg-gray-100 dark:bg-gray-800 text-brand-600 dark:text-brand-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {link.icon}
                          <span>{link.name}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <SheetClose asChild>
                      <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
