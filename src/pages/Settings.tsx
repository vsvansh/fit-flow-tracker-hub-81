
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Home, BellDot, Lock, UserCog, Monitor, Moon, SunMedium, Languages, Bell, Globe, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { launchConfetti } from "@/utils/confettiUtil";

const Settings = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Example settings state - in a real app, these would be fetched from your backend
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    activityReminders: true,
    challengeNotifications: true,
    
    // Privacy
    profileVisibility: "public",
    shareActivity: true,
    showInLeaderboards: true,
    dataSharing: "minimal",
    
    // Preferences
    theme: "system",
    language: "en",
    units: "metric",
    dateFormat: "mm/dd/yyyy",
    
    // Accessibility
    fontScale: [1],
    reduceMotion: false,
    highContrast: false,
    screenReader: false
  });
  
  const saveSettings = () => {
    setIsUpdating(true);
    
    // Simulate an API request
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
      
      // Show confetti when settings are saved
      launchConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 800);
  };
  
  // Handle settings changes
  const handleSwitchChange = (field: string) => {
    setSettings({
      ...settings,
      [field]: !settings[field as keyof typeof settings]
    });
  };
  
  const handleRadioChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };
  
  const handleSliderChange = (field: string, value: number[]) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex items-center mb-6 space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
          </Button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-300">Settings</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mt-4 mb-8 text-center gradient-text">
            Account Settings
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-6 gap-8"
        >
          <Card className="md:col-span-6">
            <Tabs defaultValue="notifications" className="w-full">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy">
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="accessibility">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Accessibility</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="notifications" className="p-4">
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center mb-4">
                    <BellDot className="mr-2 h-5 w-5 text-blue-500" />
                    Notification Settings
                  </h2>
                  
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>Manage your email notification preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications" className="flex-1">
                            Receive email notifications
                          </Label>
                          <Switch 
                            id="email-notifications" 
                            checked={settings.emailNotifications} 
                            onCheckedChange={() => handleSwitchChange('emailNotifications')}
                          />
                        </div>
                        
                        {settings.emailNotifications && (
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="email-settings">
                              <AccordionTrigger>Email settings</AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2">
                                  <div className="space-y-1">
                                    <Label htmlFor="email-frequency">Frequency</Label>
                                    <Select defaultValue="daily">
                                      <SelectTrigger id="email-frequency">
                                        <SelectValue placeholder="Select frequency" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="immediate">Immediate</SelectItem>
                                        <SelectItem value="daily">Daily digest</SelectItem>
                                        <SelectItem value="weekly">Weekly summary</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Push Notifications</CardTitle>
                        <CardDescription>Control push notifications to your devices</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notifications" className="flex-1">
                            Enable push notifications
                          </Label>
                          <Switch 
                            id="push-notifications" 
                            checked={settings.pushNotifications} 
                            onCheckedChange={() => handleSwitchChange('pushNotifications')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="activity-reminders" className="flex-1">
                            Activity reminders
                          </Label>
                          <Switch 
                            id="activity-reminders" 
                            checked={settings.activityReminders} 
                            onCheckedChange={() => handleSwitchChange('activityReminders')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="challenge-notifications" className="flex-1">
                            Challenge updates
                          </Label>
                          <Switch 
                            id="challenge-notifications" 
                            checked={settings.challengeNotifications} 
                            onCheckedChange={() => handleSwitchChange('challengeNotifications')}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="privacy" className="p-4">
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center mb-4">
                    <Lock className="mr-2 h-5 w-5 text-blue-500" />
                    Privacy Settings
                  </h2>
                  
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Visibility</CardTitle>
                        <CardDescription>Control who can see your profile</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup 
                          defaultValue={settings.profileVisibility}
                          onValueChange={(value) => handleRadioChange('profileVisibility', value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="profile-public" />
                            <Label htmlFor="profile-public">Public - Anyone can view your profile</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friends" id="profile-friends" />
                            <Label htmlFor="profile-friends">Friends Only - Only your connections can view</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="profile-private" />
                            <Label htmlFor="profile-private">Private - Only you can view your profile</Label>
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Activity Sharing</CardTitle>
                        <CardDescription>Control how your activity data is shared</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="share-activity" className="flex-1">
                            Share your activity data
                          </Label>
                          <Switch 
                            id="share-activity" 
                            checked={settings.shareActivity} 
                            onCheckedChange={() => handleSwitchChange('shareActivity')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-leaderboards" className="flex-1">
                            Show on leaderboards
                          </Label>
                          <Switch 
                            id="show-leaderboards" 
                            checked={settings.showInLeaderboards} 
                            onCheckedChange={() => handleSwitchChange('showInLeaderboards')}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="data-sharing">Data sharing level</Label>
                          <Select 
                            defaultValue={settings.dataSharing}
                            onValueChange={(value) => handleSelectChange('dataSharing', value)}
                          >
                            <SelectTrigger id="data-sharing">
                              <SelectValue placeholder="Select data sharing level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minimal">Minimal - Basic activity metrics only</SelectItem>
                              <SelectItem value="standard">Standard - Most activity data</SelectItem>
                              <SelectItem value="detailed">Detailed - All activity and fitness data</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="preferences" className="p-4">
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center mb-4">
                    <UserCog className="mr-2 h-5 w-5 text-blue-500" />
                    Preferences
                  </h2>
                  
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Display Settings</CardTitle>
                        <CardDescription>Customize your app appearance</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1">
                          <Label htmlFor="theme-selector">Theme</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <Button 
                              variant={settings.theme === "light" ? "default" : "outline"} 
                              className="w-full justify-start"
                              onClick={() => handleRadioChange('theme', 'light')}
                            >
                              <SunMedium className="mr-2 h-4 w-4" /> Light
                            </Button>
                            <Button 
                              variant={settings.theme === "dark" ? "default" : "outline"} 
                              className="w-full justify-start"
                              onClick={() => handleRadioChange('theme', 'dark')}
                            >
                              <Moon className="mr-2 h-4 w-4" /> Dark
                            </Button>
                            <Button 
                              variant={settings.theme === "system" ? "default" : "outline"} 
                              className="w-full justify-start"
                              onClick={() => handleRadioChange('theme', 'system')}
                            >
                              <Monitor className="mr-2 h-4 w-4" /> System
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="language-selector">Language</Label>
                          <Select 
                            defaultValue={settings.language}
                            onValueChange={(value) => handleSelectChange('language', value)}
                          >
                            <SelectTrigger id="language-selector">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="ja">日本語</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Measurement Units</CardTitle>
                        <CardDescription>Customize how measurements are displayed</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1">
                          <Label htmlFor="units-selector">Unit System</Label>
                          <Select 
                            defaultValue={settings.units}
                            onValueChange={(value) => handleSelectChange('units', value)}
                          >
                            <SelectTrigger id="units-selector">
                              <SelectValue placeholder="Select unit system" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="metric">Metric (km, kg)</SelectItem>
                              <SelectItem value="imperial">Imperial (mi, lb)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select 
                            defaultValue={settings.dateFormat}
                            onValueChange={(value) => handleSelectChange('dateFormat', value)}
                          >
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="yyyy/mm/dd">YYYY/MM/DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="accessibility" className="p-4">
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center mb-4">
                    <Eye className="mr-2 h-5 w-5 text-blue-500" />
                    Accessibility
                  </h2>
                  
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Visual Settings</CardTitle>
                        <CardDescription>Adjust the visual presentation</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="font-scale">Font Size</Label>
                            <span className="text-sm text-muted-foreground">{settings.fontScale[0]}x</span>
                          </div>
                          <Slider
                            id="font-scale"
                            min={0.75}
                            max={1.5}
                            step={0.05}
                            defaultValue={settings.fontScale}
                            onValueChange={(value) => handleSliderChange('fontScale', value)}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Smaller</span>
                            <span>Normal</span>
                            <span>Larger</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <Label htmlFor="high-contrast" className="flex-1">
                            High contrast mode
                          </Label>
                          <Switch 
                            id="high-contrast" 
                            checked={settings.highContrast} 
                            onCheckedChange={() => handleSwitchChange('highContrast')}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Motion Settings</CardTitle>
                        <CardDescription>Adjust animations and transitions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="reduce-motion" className="flex-1">
                            Reduce motion
                          </Label>
                          <Switch 
                            id="reduce-motion" 
                            checked={settings.reduceMotion} 
                            onCheckedChange={() => handleSwitchChange('reduceMotion')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="screen-reader" className="flex-1">
                            Optimize for screen readers
                          </Label>
                          <Switch 
                            id="screen-reader" 
                            checked={settings.screenReader} 
                            onCheckedChange={() => handleSwitchChange('screenReader')}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end p-4 border-t">
              <Button 
                className="ml-auto" 
                disabled={isUpdating}
                onClick={saveSettings}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
