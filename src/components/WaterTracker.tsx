
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

interface WaterTrackerProps {
  dailyGoal?: number;
}

const WaterTracker = ({ dailyGoal = 8 }: WaterTrackerProps) => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Update progress when water intake or goal changes
  useEffect(() => {
    const percentage = Math.min(100, Math.round((waterIntake / dailyGoal) * 100));
    setProgress(0); // Reset to trigger animation
    const timer = setTimeout(() => setProgress(percentage), 50);
    return () => clearTimeout(timer);
  }, [waterIntake, dailyGoal]);
  
  const addWater = () => {
    if (waterIntake < dailyGoal * 2) {  // Allow going over goal but cap at 2x
      setWaterIntake(prev => prev + 1);
      if (waterIntake + 1 >= dailyGoal) {
        toast({
          title: "Daily Water Goal Achieved!",
          description: "Great job staying hydrated today!",
        });
      }
    }
  };
  
  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
    }
  };
  
  const waterPercentage = Math.min(100, Math.round((waterIntake / dailyGoal) * 100));

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Water Tracker</CardTitle>
          <Droplet className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-32 mb-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
            <div 
              className="absolute bottom-0 w-full bg-gradient-to-b from-blue-400 to-blue-600 transition-all duration-1000 ease-in-out"
              style={{ height: `${waterPercentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <p className={`font-bold text-lg ${waterPercentage > 50 ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
                {waterIntake}/{dailyGoal}
              </p>
            </div>
          </div>
          
          <div className="space-x-2 mb-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={removeWater}
              className="h-8 w-8 p-0"
              disabled={waterIntake === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              onClick={addWater}
              className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-xs text-center mt-2 text-muted-foreground">
            {waterIntake} of {dailyGoal} glasses
          </p>
          <p className="text-xs text-center mt-1 text-muted-foreground">
            {waterPercentage}% of daily goal
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-center text-blue-600 dark:text-blue-400">
            💧 Staying hydrated improves energy and focus.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
