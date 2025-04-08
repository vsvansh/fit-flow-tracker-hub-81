
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { fitnessGoals } from "@/utils/fitnessData";
import { Target, Check, X } from "lucide-react";

const GoalsSetting = () => {
  const [goals, setGoals] = useState(fitnessGoals);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<number>(0);

  const handleEditClick = (goalId: string, currentTarget: number) => {
    setEditingGoalId(goalId);
    setEditTarget(currentTarget);
  };

  const handleSaveClick = (goalId: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId ? { ...goal, target: editTarget } : goal
      )
    );
    setEditingGoalId(null);
  };

  const handleCancelClick = () => {
    setEditingGoalId(null);
  };

  // Filter goals to show only daily ones
  const dailyGoals = goals.filter(goal => goal.period === "daily");

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Daily Goals</CardTitle>
          <Target className="w-5 h-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyGoals.map((goal) => (
            <div key={goal.id} className="border-b pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{goal.name}</h3>
                  {editingGoalId !== goal.id ? (
                    <p className="text-sm text-gray-600">
                      Target: {goal.target} {goal.unit}
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
                      />
                      <span className="ml-2 text-xs text-gray-500">{goal.unit}</span>
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
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{goal.current} {goal.unit}</span>
                  <span>{goal.target} {goal.unit}</span>
                </div>
                <Progress 
                  value={Math.min((goal.current / goal.target) * 100, 100)}
                  className={`h-2 ${
                    goal.name === "Daily Steps"
                      ? "bg-gray-100 [&>div]:bg-blue-500"
                      : goal.name === "Calories Burned"
                      ? "bg-gray-100 [&>div]:bg-orange-500"
                      : goal.name === "Distance"
                      ? "bg-gray-100 [&>div]:bg-green-500"
                      : "bg-gray-100 [&>div]:bg-purple-500"
                  }`}
                />
                <p className="text-xs text-right mt-1 font-medium">
                  {Math.round((goal.current / goal.target) * 100)}% completed
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsSetting;
