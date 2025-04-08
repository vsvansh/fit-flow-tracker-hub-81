
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Bell, Settings, LogIn, Moon, Sun, 
  Menu, X, Home, User, ChevronDown,
  Footprints, BarChart3, Award, Users, Utensils
} from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userProfile } from "@/utils/fitnessData";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Activity", path: "/activity", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
    { name: "Nutrition", path: "/nutrition", icon: <Utensils className="w-4 h-4 mr-2" /> },
    { name: "Challenges", path: "/challenges", icon: <Award className="w-4 h-4 mr-2" /> },
    { name: "Social", path: "/social", icon: <Users className="w-4 h-4 mr-2" /> },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome to FitFlow Tracker!",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
  };

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-10">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 mr-2">
              <Footprints className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              <span className="font-bold text-xl hidden sm:inline-block gradient-text">FitFlow</span>
            </Link>
            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <Footprints className="h-6 w-6 text-brand-600" />
                      <span className="font-bold text-xl">FitFlow</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {isLoggedIn && (
                    <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
                        <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{userProfile.name}</p>
                        <p className="text-xs text-muted-foreground">View Profile</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <Link 
                          to={item.path}
                          className={cn(
                            "flex items-center py-2 px-3 text-sm rounded-md w-full",
                            location.pathname === item.path
                              ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 font-medium"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <SheetClose asChild>
                      <Link 
                        to="/profile"
                        className="flex items-center py-2 px-3 text-sm rounded-md w-full
                          text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        to="/settings"
                        className="flex items-center py-2 px-3 text-sm rounded-md w-full
                          text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        App Settings
                      </Link>
                    </SheetClose>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                        {theme === "light" ? "Dark Mode" : "Light Mode"}
                      </Button>
                      {isLoggedIn ? (
                        <Button variant="destructive" size="sm" onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}>
                          Sign Out
                        </Button>
                      ) : (
                        <Button variant="default" size="sm" onClick={() => {
                          handleLogin();
                          setMobileMenuOpen(false);
                        }}>
                          Sign In
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop navigation links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400 flex items-center",
                  location.pathname === item.path 
                    ? "text-brand-700 dark:text-brand-400"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-500"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
              3
            </Badge>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-9 p-1 flex items-center gap-2" aria-label="User menu">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline-block text-sm font-medium">{userProfile.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" onClick={handleLogin} className="primary-button">
              <LogIn className="h-4 w-4 mr-2" /> Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
