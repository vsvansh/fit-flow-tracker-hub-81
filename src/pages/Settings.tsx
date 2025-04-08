import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Globe, Lock, Smartphone, Volume2, Droplet, Moon, Zap, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [units, setUnits] = useState({
    distance: "km",
    weight: "kg",
    height: "cm",
  });
  
  const handleUnitChange = (type: keyof typeof units, value: string) => {
    setUnits(prev => ({
      ...prev,
      [type]: value
    }));
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} unit updated`,
      description: `Your measurement preference has been changed to ${value}`,
    });
  };
  
  const handleToggle = (setting: string, value: boolean) => {
    toast({
      title: `${setting} ${value ? 'enabled' : 'disabled'}`,
      description: `You have ${value ? 'enabled' : 'disabled'} ${setting.toLowerCase()}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="connected">Connected Apps</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize how your dashboard looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Dark Mode</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={theme === "dark"}
                  onCheckedChange={(isChecked) => {
                    setTheme(isChecked ? "dark" : "light");
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Live Updates</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Show real-time updates on dashboard</p>
                </div>
                <Switch 
                  id="live-updates" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleToggle("Live updates", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Droplet className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Water Tracking Widget</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Show water intake tracker on dashboard</p>
                </div>
                <Switch 
                  id="water-widget" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleToggle("Water tracking widget", checked)}
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={() => toast({ title: "Settings saved", description: "Your display settings have been updated" })}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Units Preferences</CardTitle>
              <CardDescription>Choose your preferred measurement units</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="font-medium">Distance</div>
                <div className="flex space-x-2">
                  <Button 
                    variant={units.distance === "km" ? "default" : "outline"} 
                    className="w-full" 
                    onClick={() => handleUnitChange("distance", "km")}
                  >
                    Kilometers
                  </Button>
                  <Button 
                    variant={units.distance === "mi" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleUnitChange("distance", "mi")}
                  >
                    Miles
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium">Weight</div>
                <div className="flex space-x-2">
                  <Button 
                    variant={units.weight === "kg" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleUnitChange("weight", "kg")}
                  >
                    Kilograms
                  </Button>
                  <Button 
                    variant={units.weight === "lb" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleUnitChange("weight", "lb")}
                  >
                    Pounds
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium">Height</div>
                <div className="flex space-x-2">
                  <Button 
                    variant={units.height === "cm" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleUnitChange("height", "cm")}
                  >
                    Centimeters
                  </Button>
                  <Button 
                    variant={units.height === "ft" ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => handleUnitChange("height", "ft")}
                  >
                    Feet/Inches
                  </Button>
                </div>
              </div>
              
              <Button onClick={() => toast({ title: "Units saved", description: "Your measurement preferences have been updated" })}>
                Save Units
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Daily Reminders</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Get reminders about daily goals</p>
                  </div>
                  <Switch 
                    id="daily-reminders" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggle("Daily reminders", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Challenge Invites</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Get notified about new challenge invitations</p>
                  </div>
                  <Switch 
                    id="challenge-invites" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggle("Challenge invites", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Friend Activity</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Get updates when friends reach milestones</p>
                  </div>
                  <Switch 
                    id="friend-activity" 
                    onCheckedChange={(checked) => handleToggle("Friend activity notifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Weekly Reports</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive weekly progress summaries</p>
                  </div>
                  <Switch 
                    id="weekly-reports" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggle("Weekly reports", checked)}
                  />
                </div>
              </div>
              
              <Button onClick={() => toast({ title: "Notification settings saved", description: "Your notification preferences have been updated" })}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control who can see your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Public Profile</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                  </div>
                  <Switch 
                    id="public-profile"
                    onCheckedChange={(checked) => handleToggle("Public profile", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Show Activity on Feed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Share your activity on community feeds</p>
                  </div>
                  <Switch 
                    id="activity-feed" 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggle("Activity feed sharing", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Anonymous Mode</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Participate in challenges anonymously</p>
                  </div>
                  <Switch 
                    id="anonymous-mode"
                    onCheckedChange={(checked) => handleToggle("Anonymous mode", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Location Sharing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Share your workout locations</p>
                  </div>
                  <Switch 
                    id="location-sharing"
                    onCheckedChange={(checked) => handleToggle("Location sharing", checked)}
                  />
                </div>
              </div>
              
              <Button onClick={() => toast({ title: "Privacy settings saved", description: "Your privacy preferences have been updated" })}>
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your personal data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">You can download all your fitness data or delete your account permanently.</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => toast({
                    title: "Data download initiated",
                    description: "Your data will be sent to your email once ready."
                  })}
                >
                  Download My Data
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => toast({
                    title: "Account deletion requested",
                    description: "Please check your email to confirm account deletion.",
                    variant: "destructive"
                  })}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Apps</CardTitle>
              <CardDescription>Manage connected applications and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Google Fit</p>
                      <p className="text-sm text-muted-foreground">Connected since May 15, 2023</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Connected</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Volume2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Spotify</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ 
                        title: "Connecting to Spotify",
                        description: "You'll be redirected to authorize the connection."
                      })}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Apple Health</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({ 
                        title: "Connecting to Apple Health",
                        description: "You'll be redirected to authorize the connection."
                      })}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Settings</CardTitle>
              <CardDescription>Control how challenges work for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Automatic Challenge Suggestions</p>
                  <p className="text-sm text-muted-foreground">Get suggestions for new challenges based on your activity</p>
                </div>
                <Switch 
                  id="auto-challenges" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleToggle("Challenge suggestions", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Challenge Difficulty</p>
                  <p className="text-sm text-muted-foreground">How hard should challenges be?</p>
                </div>
                <Select defaultValue="medium" onValueChange={(value) => {
                  toast({
                    title: "Challenge difficulty updated",
                    description: `Difficulty set to ${value}`
                  });
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Friends Can Challenge Me</p>
                  <p className="text-sm text-muted-foreground">Allow friends to send you challenge invites</p>
                </div>
                <Switch 
                  id="friend-challenges" 
                  defaultChecked 
                  onCheckedChange={(checked) => handleToggle("Friend challenges", checked)}
                />
              </div>
              
              <Button onClick={() => toast({ title: "Challenge settings saved", description: "Your challenge preferences have been updated" })}>
                Save Challenge Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
