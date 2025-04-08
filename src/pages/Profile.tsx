
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/Switch";
import BackToHome from "@/components/BackToHome";
import { toast } from "@/components/ui/use-toast";
import ProfilePhotoUpload from "@/components/ProfilePhotoUpload";
import { extendedUserProfile } from "@/utils/profileExtension";

export default function Profile() {
  const [profile, setProfile] = useState(extendedUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFitnessGoals, setSelectedFitnessGoals] = useState<string[]>(profile.fitnessGoals || []);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>(profile.dietaryPreferences || []);
  const [formValues, setFormValues] = useState({
    name: profile.name,
    email: profile.email,
    age: profile.age,
    gender: profile.gender,
    height: profile.height,
    weight: profile.weight,
    goalWeight: profile.goalWeight,
  });
  
  const handleProfileUpdate = () => {
    const updatedProfile = {
      ...profile,
      ...formValues,
    };
    
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [id]: id === 'age' || id === 'height' || id === 'weight' || id === 'goalWeight' ? Number(value) : value
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    const updatedProfile = { ...profile, profilePic: imageUrl };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };
  
  const calculateBMI = () => {
    const heightInM = formValues.height / 100;
    return (formValues.weight / (heightInM * heightInM)).toFixed(1);
  };
  
  const toggleFitnessGoal = (goal: string) => {
    setSelectedFitnessGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal);
      } else {
        return [...prev, goal];
      }
    });
  };
  
  const toggleDietaryPreference = (preference: string) => {
    setSelectedDietaryPreferences(prev => {
      if (prev.includes(preference)) {
        return prev.filter(p => p !== preference);
      } else {
        return [...prev, preference];
      }
    });
  };
  
  const savePreferences = () => {
    const updatedProfile = {
      ...profile,
      goalWeight: formValues.goalWeight,
      fitnessGoals: selectedFitnessGoals,
      dietaryPreferences: selectedDietaryPreferences
    };
    
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    toast({
      title: "Preferences updated",
      description: "Your goals and preferences have been saved."
    });
  };

  useEffect(() => {
    // Load profile from localStorage on component mount if available
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setFormValues({
        name: parsedProfile.name,
        email: parsedProfile.email,
        age: parsedProfile.age,
        gender: parsedProfile.gender,
        height: parsedProfile.height,
        weight: parsedProfile.weight,
        goalWeight: parsedProfile.goalWeight,
      });
      setSelectedFitnessGoals(parsedProfile.fitnessGoals || []);
      setSelectedDietaryPreferences(parsedProfile.dietaryPreferences || []);
    }
  }, []);

  return (
    <div className="container py-8">
      <BackToHome />
      
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:w-1/3">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProfilePhotoUpload 
                initialImage={profile.profilePic} 
                onImageChange={handleImageChange}
                size="xl"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-muted-foreground mt-1">Member since {profile.joinDate}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Health Overview</CardTitle>
              <CardDescription>Your current health stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-center">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Weight</p>
                  <p className="text-2xl font-bold">{formValues.weight} kg</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md text-center">
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Height</p>
                  <p className="text-2xl font-bold">{formValues.height} cm</p>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md text-center">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-300">BMI</p>
                  <p className="text-2xl font-bold">{calculateBMI()}</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md text-center">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Activity</p>
                  <p className="text-lg font-bold capitalize">{profile.activityLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="goals">Goals & Preferences</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <Button 
                      variant={isEditing ? "ghost" : "outline"} 
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={formValues.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formValues.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}  
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        value={formValues.age}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}  
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input 
                        id="gender" 
                        value={formValues.gender}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}  
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input 
                        id="height" 
                        type="number" 
                        value={formValues.height}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}  
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        value={formValues.weight}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}  
                      />
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button onClick={handleProfileUpdate}>Save Changes</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle>Goals & Preferences</CardTitle>
                  <CardDescription>Set your fitness goals and dietary preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                      <Input 
                        id="goalWeight" 
                        type="number" 
                        value={formValues.goalWeight}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fitness Goals</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Lose weight", "Build muscle", "Improve endurance", "Maintain health"].map(goal => (
                          <div 
                            key={goal} 
                            className={`p-3 border rounded-md text-center cursor-pointer transition-colors ${
                              selectedFitnessGoals.includes(goal) 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-background hover:bg-muted"
                            }`}
                            onClick={() => toggleFitnessGoal(goal)}
                          >
                            {goal}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dietary Preferences</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Low carb", "High protein", "Vegetarian", "Vegan", "Keto", "Paleo"].map(diet => (
                          <div 
                            key={diet} 
                            className={`p-3 border rounded-md text-center cursor-pointer transition-colors ${
                              selectedDietaryPreferences.includes(diet) 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-background hover:bg-muted"
                            }`}
                            onClick={() => toggleDietaryPreference(diet)}
                          >
                            {diet}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={savePreferences}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive push notifications on this device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Workout Reminders</h4>
                        <p className="text-sm text-muted-foreground">Get reminded about upcoming scheduled workouts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Privacy</h4>
                        <p className="text-sm text-muted-foreground">Allow sharing anonymized fitness data for improvements</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset All Settings</Button>
                  <Button onClick={() => {
                    toast({
                      title: "Settings saved",
                      description: "Your account settings have been updated."
                    });
                  }}>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
