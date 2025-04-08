import { useState, useRef } from "react";
import { userProfile } from "@/utils/fitnessData";
import BackToHome from "@/components/BackToHome";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  User,
  Settings,
  Bell,
  Shield,
  Key,
  Smile,
  UserCircle,
  Upload,
  Camera
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Activity, Trophy, Flame, Award } from "lucide-react";
import ExerciseIntegration from "@/components/ExerciseIntegration";
import FitnessInsights from "@/components/FitnessInsights";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  bio: z.string().optional(),
  gender: z.enum(["male", "female", "other"]),
  birthDate: z.string().optional(),
  height: z.coerce.number().min(100, { message: "Height must be at least 100 cm" }),
  weight: z.coerce.number().min(30, { message: "Weight must be at least 30 kg" }),
  activityLevel: z.enum(["sedentary", "light", "moderate", "intense"]),
  healthGoal: z.string().optional(),
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  dailyReminders: z.boolean().default(true),
  weeklyReports: z.boolean().default(true),
  achievementAlerts: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name,
      email: "john.smith@example.com",
      bio: "Fitness enthusiast, runner, and health-conscious individual looking to improve my overall wellbeing.",
      gender: "male",
      birthDate: "1985-06-15",
      height: userProfile.height,
      weight: userProfile.weight,
      activityLevel: userProfile.activityLevel,
      healthGoal: "Weight maintenance and improved cardiovascular fitness",
    },
  });
  
  const notificationsForm = useForm({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      dailyReminders: true,
      weeklyReports: true,
      achievementAlerts: true,
      marketingEmails: false,
    },
  });
  
  function onSubmit(values: z.infer<typeof profileSchema>) {
    toast({
      title: "Profile updated",
      description: "Your profile details have been saved.",
    });
    console.log(values);
  }
  
  function onNotificationsSubmit(values: z.infer<typeof notificationsSchema>) {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
    console.log(values);
  }
  
  function handleProfileImageClick() {
    fileInputRef.current?.click();
  }
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        
        toast({
          title: "Profile picture updated",
          description: "Your new profile picture has been set.",
        });
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 space-y-8">
      <BackToHome />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
          <div 
            className="relative group cursor-pointer" 
            onClick={handleProfileImageClick}
          >
            <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile picture" />
              ) : (
                <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  {userProfile.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="text-white h-8 w-8" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{userProfile.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Member since January 2025
            </p>
            <div className="flex gap-2 mt-2">
              <Badge icon={Award}>Gold Level</Badge>
              <Badge icon={Flame}>15-Day Streak</Badge>
              <Badge icon={Trophy}>Top Performer</Badge>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5" /> Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" />
                            </FormControl>
                            <FormDescription>
                              Used to calculate your age
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <RadioGroup
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                className="flex space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <RadioGroupItem value="male" />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer">
                                    Male
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <RadioGroupItem value="female" />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer">
                                    Female
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer">
                                    Other
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us a bit about yourself"
                              className="min-h-24"
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed on your profile
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="activityLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Activity Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select activity level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sedentary">
                                  Sedentary
                                </SelectItem>
                                <SelectItem value="light">
                                  Light Activity
                                </SelectItem>
                                <SelectItem value="moderate">
                                  Moderate Activity
                                </SelectItem>
                                <SelectItem value="intense">
                                  Intense Activity
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Used to calculate your daily calorie needs
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="healthGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Health Goal</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g., Lose weight, build muscle, improve fitness"
                            />
                          </FormControl>
                          <FormDescription>
                            This helps us tailor recommendations to your goals
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" /> Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Manage how your information is displayed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-gray-500">
                        Who can see your profile
                      </p>
                    </div>
                    <Select defaultValue="friends">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Activity Sharing</h4>
                      <p className="text-sm text-gray-500">
                        Share your activities on the feed
                      </p>
                    </div>
                    <Select defaultValue="selected">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Activities</SelectItem>
                        <SelectItem value="selected">Selected Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Collection</h4>
                      <p className="text-sm text-gray-500">
                        Allow us to analyze your data for improvements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" /> Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Button variant="outline" className="w-full mb-2">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full mb-2">
                      Connect Social Accounts
                    </Button>
                    <Button variant="outline" className="w-full mb-2">
                      Export Your Data
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Danger Zone</h4>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() =>
                        toast({
                          title: "Account action",
                          description: "This action would require confirmation.",
                          variant: "destructive",
                        })
                      }
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity & Performance</CardTitle>
                <CardDescription>
                  View your workout history and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StatsDisplay />
                <ExerciseIntegration />
                <FitnessInsights />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage how and when we contact you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel>General Updates</FormLabel>
                            <FormDescription>
                              Receive general updates about new features
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="weeklyReports"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel>Weekly Reports</FormLabel>
                            <FormDescription>
                              Get weekly summaries of your progress
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel>Marketing Emails</FormLabel>
                            <FormDescription>
                              Receive promotional offers and newsletters
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium">Push Notifications</h3>
                    
                    <FormField
                      control={notificationsForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel>Enable Push Notifications</FormLabel>
                            <FormDescription>
                              Master switch for all push notifications
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="dailyReminders"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel>Daily Reminders</FormLabel>
                            <FormDescription>
                              Reminders to complete your daily goals
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="achievementAlerts"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-2">
                          <div>
                            <FormLabel>Achievement Alerts</FormLabel>
                            <FormDescription>
                              Get notified when you earn new achievements
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Preferences</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

// Simple Badge component for profile
const Badge = ({ children, icon: Icon }: { children: React.ReactNode, icon: React.ElementType }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
      <Icon className="w-3 h-3 mr-1" />
      {children}
    </span>
  );
};

// Simple stats display
const StatsDisplay = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="p-4 border rounded-lg text-center">
      <h3 className="text-sm text-muted-foreground">Total Workouts</h3>
      <p className="text-3xl font-bold">38</p>
    </div>
    <div className="p-4 border rounded-lg text-center">
      <h3 className="text-sm text-muted-foreground">Avg. Daily Steps</h3>
      <p className="text-3xl font-bold">8,947</p>
    </div>
    <div className="p-4 border rounded-lg text-center">
      <h3 className="text-sm text-muted-foreground">Streak</h3>
      <p className="text-3xl font-bold">15 days</p>
    </div>
  </div>
);

export default Profile;
