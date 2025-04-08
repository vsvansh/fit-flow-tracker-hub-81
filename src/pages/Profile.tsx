
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, User, Activity, Bell, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { userProfile } from "@/utils/fitnessData";
import ProfilePhotoUpload from "@/components/ProfilePhotoUpload";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: userProfile.name,
    email: userProfile.email || "user@example.com",
    height: userProfile.height || 175,
    weight: userProfile.weight || 70,
    age: userProfile.age || 30,
    activityLevel: userProfile.activityLevel || "moderate",
    goalWeight: userProfile.goalWeight || 65,
    goalDate: "2025-12-31"
  });
  const [profileImage, setProfileImage] = useState<string>(userProfile.profilePic || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
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
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and preferences
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="flex justify-center mb-4">
                  <ProfilePhotoUpload 
                    initialImage={profileImage} 
                    onImageChange={setProfileImage}
                    size="xl" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Physical Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This helps us calculate your calories and fitness goals
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={profileData.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Current Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={profileData.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={profileData.age}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">Fitness Goals</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set your targets to track your progress
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="activityLevel">Activity Level</Label>
                      <select
                        id="activityLevel"
                        name="activityLevel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={profileData.activityLevel}
                        onChange={handleInputChange}
                      >
                        <option value="sedentary">Sedentary</option>
                        <option value="light">Lightly Active</option>
                        <option value="moderate">Moderately Active</option>
                        <option value="active">Active</option>
                        <option value="veryActive">Very Active</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                      <Input
                        id="goalWeight"
                        name="goalWeight"
                        type="number"
                        value={profileData.goalWeight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goalDate">Target Date</Label>
                      <Input
                        id="goalDate"
                        name="goalDate"
                        type="date"
                        value={profileData.goalDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Preferences</CardTitle>
              <CardDescription>
                Customize your activity tracking and workout preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Preferred Activities</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Select your favorite activities for personalized recommendations
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {["Running", "Walking", "Cycling", "Swimming", "Yoga", "Weight Training", "HIIT", "Pilates", "Dance", "Basketball"].map((activity) => (
                    <Button
                      key={activity}
                      variant="outline"
                      className="m-1"
                      onClick={() => {
                        toast({
                          title: `${activity} added to favorites`,
                          description: "Your activity preferences have been updated."
                        });
                      }}
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Workout Schedule</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Set your regular workout days for reminders
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <Button
                      key={day}
                      variant="outline"
                      className="m-1"
                      onClick={() => {
                        toast({
                          title: `${day} added to workout schedule`,
                          description: "Your workout schedule has been updated."
                        });
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    
                    {["Workout Reminders", "Goal Achievements", "Friend Activity", "New Challenges", "Water Reminders"].map((notif) => (
                      <div key={notif} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={notif.replace(/\s+/g, '-').toLowerCase()}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <Label htmlFor={notif.replace(/\s+/g, '-').toLowerCase()}>{notif}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    {["Email", "Push Notifications", "SMS", "In-app"].map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={channel.replace(/\s+/g, '-').toLowerCase()}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked={channel === "Email" || channel === "In-app"}
                        />
                        <Label htmlFor={channel.replace(/\s+/g, '-').toLowerCase()}>{channel}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-6"
                onClick={() => {
                  toast({
                    title: "Notification settings updated",
                    description: "Your notification preferences have been saved."
                  });
                }}
              >
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
