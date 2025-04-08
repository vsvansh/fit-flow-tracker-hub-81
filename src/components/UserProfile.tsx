
import { userProfile } from "@/utils/fitnessData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Activity, Ruler, Weight, Calendar, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const getActivityLevelProgress = () => {
    const levels = {
      sedentary: 25,
      light: 50,
      moderate: 75,
      intense: 100
    };
    return levels[userProfile.activityLevel] || 0;
  };

  const calculateBMI = () => {
    const heightInMeters = userProfile.height / 100;
    const bmi = userProfile.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { label: "Normal weight", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obesity", color: "text-red-500" };
  };

  return (
    <Card className="shadow hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Profile</CardTitle>
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <CardDescription>Your fitness information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4 pb-4 border-b">
          <Avatar className="h-20 w-20 mb-3 border-4 border-white dark:border-gray-800 shadow-sm">
            {profileImage ? (
              <AvatarImage src={profileImage} alt="Profile picture" />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {userProfile.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{userProfile.name}</h3>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs">
              Gold Member
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                <p className="font-medium">{userProfile.age}</p>
              </div>
            </div>
            
            <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Ruler className="h-4 w-4 mr-2 text-green-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
                <p className="font-medium">{userProfile.height} cm</p>
              </div>
            </div>
            
            <div className="flex items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Weight className="h-4 w-4 mr-2 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                <p className="font-medium">{userProfile.weight} kg</p>
              </div>
            </div>
            
            <div className="flex items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Target className="h-4 w-4 mr-2 text-amber-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">BMI</p>
                <p className={`font-medium ${getBMICategory().color}`}>{calculateBMI()}</p>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <Activity className="h-4 w-4 mr-1 text-orange-500" /> 
                Activity Level
              </span>
              <span className="text-sm font-medium capitalize text-blue-600 dark:text-blue-400">
                {userProfile.activityLevel}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-1">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${getActivityLevelProgress()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Sedentary</span>
              <span>Light</span>
              <span>Moderate</span>
              <span>Intense</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/20"
            onClick={() => window.location.href = '/profile'}
          >
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
