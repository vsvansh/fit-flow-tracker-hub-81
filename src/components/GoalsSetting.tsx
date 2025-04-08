
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fitnessGoals } from "@/utils/fitnessData";
import { Dumbbell } from "lucide-react";

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

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Dumbbell className="w-5 h-5 mr-2 text-blue-500" />
        <h2 className="text-lg font-semibold">Fitness Goals</h2>
      </div>
      <div className="space-y-4">
        {goals.map((goal) => (
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
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleSaveClick(goal.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    goal.name === "Daily Steps"
                      ? "bg-blue-500"
                      : goal.name === "Calories Burned"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (goal.current / goal.target) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {goal.current} of {goal.target} {goal.unit} (
                {Math.round((goal.current / goal.target) * 100)}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsSetting;
