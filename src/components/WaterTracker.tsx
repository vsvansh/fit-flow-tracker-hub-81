
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Droplet, Plus, Minus, Settings, Check, X
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { launchConfetti } from '@/utils/confettiUtil';

interface WaterTrackerProps {
  dailyGoal?: number;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ dailyGoal = 8 }) => {
  const [waterIntake, setWaterIntake] = useState(3);
  const [dailyWaterTarget, setDailyWaterTarget] = useState(dailyGoal);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(dailyGoal.toString());
  
  // Update dailyWaterTarget when dailyGoal prop changes
  useEffect(() => {
    setDailyWaterTarget(dailyGoal);
    setEditValue(dailyGoal.toString());
  }, [dailyGoal]);
  
  const addWater = () => {
    if (waterIntake < dailyWaterTarget) {
      setWaterIntake(prev => prev + 1);
      toast({
        title: "Water added",
        description: "One glass of water added to your tracker. Stay hydrated!",
      });
      
      if (waterIntake + 1 === dailyWaterTarget) {
        launchConfetti();
        toast({
          title: "Goal reached!",
          description: "You've reached your daily water intake goal! 💧",
        });
      }
    } else {
      toast({
        title: "Daily goal reached",
        description: "Congratulations! You've reached your daily water intake goal.",
      });
    }
  };
  
  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
      toast({
        description: "One glass of water removed from your tracker.",
      });
    }
  };
  
  const handleEditTarget = () => {
    setIsEditing(true);
    setEditValue(dailyWaterTarget.toString());
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
  };
  
  const saveTarget = () => {
    const targetValue = parseInt(editValue);
    
    if (isNaN(targetValue) || targetValue <= 0) {
      toast({
        title: "Invalid value",
        description: "Please enter a positive number.",
        variant: "destructive"
      });
      return;
    }
    
    setDailyWaterTarget(targetValue);
    setIsEditing(false);
    
    toast({
      title: "Target updated",
      description: `Water intake target updated to ${targetValue} glasses.`,
    });
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Droplet className="h-5 w-5 mr-2 text-blue-500" />
            Water Tracker
          </CardTitle>
          
          {isEditing ? (
            <div className="flex items-center space-x-1">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-green-500 hover:text-green-600 hover:bg-green-50"
                onClick={saveTarget}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={cancelEdit}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7" 
              onClick={handleEditTarget}
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 text-center">
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-24 h-24 mb-2">
            <div className="w-full h-full rounded-full border-4 border-gray-100 dark:border-gray-700"></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="#e2e8f0" 
                strokeWidth="8"
                className="dark:stroke-gray-700" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray={`${(waterIntake / dailyWaterTarget) * 251.2} 251.2`}
                transform="rotate(-90 50 50)"
                className="progress-animate"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Droplet className="h-6 w-6 text-blue-500 mx-auto mb-1 animate-bounce" />
                <p className="text-sm font-semibold">{waterIntake}/{dailyWaterTarget}</p>
              </div>
            </div>
          </div>
          
          {isEditing ? (
            <div className="mt-2 mb-3">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-sm">Target:</span>
                <Input 
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-16 h-7 text-center px-1"
                  min="1"
                />
                <span className="text-sm">glasses</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1 mb-3">
              {Math.round((waterIntake / dailyWaterTarget) * 100)}% of daily goal
            </p>
          )}
          
          <div className="flex justify-center space-x-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-9 w-9 p-0 rounded-full"
              onClick={removeWater}
              disabled={waterIntake <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              className="h-9 w-9 p-0 rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={addWater}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <Progress
            value={(waterIntake / dailyWaterTarget) * 100}
            className="h-1"
          />
          <p className="text-xs text-center text-gray-500 mt-1">
            Stay hydrated throughout the day!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
