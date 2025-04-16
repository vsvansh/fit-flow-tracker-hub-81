
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { fitnessGoals } from "@/utils/fitnessData";
import { Target, Check, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Add an interface to match the shape of the goals
interface Goal {
  id: number;
  name: string;
  target: number;
  progress: number;
  unit: string;
  achievementRate: number;
  // Adding the missing properties to make the type conversion work
  title?: string;
  description?: string;
  startDate?: string;
  targetDate?: string;
  metrics?: {
    current: number;
    target: number;
    unit: string;
  };
  period?: string;
  current?: number;
}

const GoalsSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [editTarget, setEditTarget] = useState<number>(0);
  const [animatedGoals, setAnimatedGoals] = useState<{ [key: number]: boolean }>({});

  // Load goals from localStorage or use default
  useEffect(() => {
    const savedGoals = localStorage.getItem('fitnessGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Transform fitnessGoals to match Goal type with metrics
      const transformedGoals = fitnessGoals.map(goal => ({
        ...goal,
        metrics: {
          current: goal.progress,
          target: goal.target,
          unit: goal.unit
        }
      }));
      setGoals(transformedGoals as Goal[]);
    }
  }, []);

  // Save goals to localStorage when they change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('fitnessGoals', JSON.stringify(goals));
    }
  }, [goals]);

  // Animate progress bars when they come into view
  useEffect(() => {
    const animationDelay = setTimeout(() => {
      const animatedState: { [key: number]: boolean } = {};
      goals.forEach(goal => {
        animatedState[goal.id] = true;
      });
      setAnimatedGoals(animatedState);
    }, 500);
    
    return () => clearTimeout(animationDelay);
  }, [goals]);

  const handleEditClick = (goalId: number, currentTarget: number) => {
    setEditingGoalId(goalId);
    setEditTarget(currentTarget);
  };

  const handleSaveClick = (goalId: number) => {
    if (editTarget <= 0) {
      toast({
        title: "Invalid target",
        description: "Target value must be greater than zero.",
        variant: "destructive"
      });
      return;
    }
    
    setGoals(
      goals.map((goal) =>
        goal.id === goalId ? { 
          ...goal, 
          target: editTarget,
          metrics: {
            ...goal.metrics,
            target: editTarget
          }
        } : goal
      )
    );
    
    setEditingGoalId(null);
    
    toast({
      title: "Goal updated",
      description: "Your fitness goal has been updated successfully."
    });
  };

  const handleCancelClick = () => {
    setEditingGoalId(null);
  };

  // Filter goals to show only daily ones, or show all if no period specified
  const dailyGoals = goals.filter(goal => goal.period === "daily" || !goal.period);

  return (
    <Card className="shadow hover:shadow-md transition-all duration-300 dark:bg-gray-800/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Daily Goals</CardTitle>
          <Target className="w-5 h-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyGoals.map((goal) => (
            <div key={goal.id} className="border-b pb-3 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  {editingGoalId !== goal.id ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Target: {goal.target} {goal.metrics?.unit || goal.unit}
                    </p>
                  ) : (
                    <div className="flex items-center mt-2">
                      <Label htmlFor={`goal-${goal.id}`} className="mr-2">
                        New target:
                      </Label>
                      <Input
                        id={`goal-${goal.id}`}
                        type="number"
                        value={editTarget}
                        onChange={(e) => setEditTarget(Number(e.target.value))}
                        className="w-24 h-8"
                        min="1"
                      />
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{goal.metrics?.unit || goal.unit}</span>
                    </div>
                  )}
                </div>
                <div>
                  {editingGoalId !== goal.id ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(goal.id, goal.target)}
                      className="h-8 px-3"
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSaveClick(goal.id)}
                        className="h-8 px-3 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelClick}
                        className="h-8 px-3"
                      >
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>{goal.metrics?.current || goal.progress} {goal.metrics?.unit || goal.unit}</span>
                  <span>{goal.target} {goal.metrics?.unit || goal.unit}</span>
                </div>
                <Progress 
                  value={animatedGoals[goal.id] ? Math.min(((goal.metrics?.current || goal.progress) / goal.target) * 100, 100) : 0}
                  className={`h-2 ${
                    goal.name === "Daily Steps"
                      ? "bg-gray-100 dark:bg-gray-700 [&>div]:bg-blue-500"
                      : goal.name === "Calories Burned"
                      ? "bg-gray-100 dark:bg-gray-700 [&>div]:bg-orange-500"
                      : goal.name === "Distance"
                      ? "bg-gray-100 dark:bg-gray-700 [&>div]:bg-green-500"
                      : "bg-gray-100 dark:bg-gray-700 [&>div]:bg-purple-500"
                  }`}
                />
                <div className="flex justify-end">
                  <p className="text-xs mt-1 font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
                    {Math.round(((goal.metrics?.current || goal.progress) / goal.target) * 100)}% completed
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsSetting;
