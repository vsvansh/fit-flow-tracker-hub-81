
import { userProfile } from "@/utils/fitnessData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Activity, Ruler, Weight, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const UserProfile = () => {
  const getActivityLevelProgress = () => {
    const levels = {
      sedentary: 25,
      light: 50,
      moderate: 75,
      intense: 100
    };
    return levels[userProfile.activityLevel] || 0;
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Profile</CardTitle>
            <CardDescription>Your fitness information</CardDescription>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">{userProfile.name}</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">Age: {userProfile.age}</span>
              </div>
              <div className="flex items-center">
                <Ruler className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">Height: {userProfile.height} cm</span>
              </div>
              <div className="flex items-center">
                <Weight className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">Weight: {userProfile.weight} kg</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Activity className="h-4 w-4 mr-1 text-orange-500" /> 
                    Activity Level
                  </span>
                  <span className="text-sm font-medium capitalize text-blue-600">
                    {userProfile.activityLevel}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-gradient-to-r from-blue-300 to-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${getActivityLevelProgress()}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Sedentary</span>
                  <span>Light</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
