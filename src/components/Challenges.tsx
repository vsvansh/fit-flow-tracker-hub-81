
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Target, Users, Plus, CheckCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "custom";
  progress: number;
  goal: number;
  unit: string;
  deadline?: string;
  participants?: number;
  completed: boolean;
}

const Challenges = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Morning Steps",
      description: "Walk 5,000 steps before 8 AM",
      type: "daily",
      progress: 3200,
      goal: 5000,
      unit: "steps",
      deadline: "Today, 8:00 AM",
      completed: false,
    },
    {
      id: "2",
      title: "Weekly Distance Challenge",
      description: "Complete 50km this week",
      type: "weekly",
      progress: 37.5,
      goal: 50,
      unit: "km",
      deadline: "Sunday",
      participants: 8,
      completed: false,
    },
    {
      id: "3",
      title: "Calorie Burn",
      description: "Burn 500 calories today",
      type: "daily",
      progress: 500,
      goal: 500,
      unit: "cal",
      deadline: "Today",
      completed: true,
    },
    {
      id: "4",
      title: "Group Challenge: Step Masters",
      description: "Be the first team to reach 100,000 steps",
      type: "custom",
      progress: 64300,
      goal: 100000,
      unit: "steps",
      deadline: "3 days left",
      participants: 12,
      completed: false,
    },
  ];
  
  const filteredChallenges = filter === "all" 
    ? challenges 
    : filter === "completed" 
      ? challenges.filter(c => c.completed)
      : challenges.filter(c => !c.completed);

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Challenges & Missions</CardTitle>
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <ToggleGroup 
            type="single" 
            value={filter}
            onValueChange={(value) => value && setFilter(value)}
            className="justify-start"
          >
            <ToggleGroupItem value="all" className="text-xs">All</ToggleGroupItem>
            <ToggleGroupItem value="active" className="text-xs">Active</ToggleGroupItem>
            <ToggleGroupItem value="completed" className="text-xs">Completed</ToggleGroupItem>
          </ToggleGroup>
          
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-3.5 w-3.5 mr-1" /> New Challenge
          </Button>
        </div>
        
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className={`p-3 rounded-lg border ${challenge.completed ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {challenge.type === "daily" ? (
                      <Award className="h-4 w-4 text-blue-500" />
                    ) : challenge.type === "weekly" ? (
                      <Target className="h-4 w-4 text-purple-500" />
                    ) : (
                      <Users className="h-4 w-4 text-amber-500" />
                    )}
                    <h3 className="font-medium">{challenge.title}</h3>
                    {challenge.completed && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {challenge.deadline}
                  {challenge.participants && (
                    <div className="flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{challenge.participants}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{challenge.progress} {challenge.unit}</span>
                  <span>{challenge.goal} {challenge.unit}</span>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.goal) * 100} 
                  className={`h-1.5 ${
                    challenge.completed 
                      ? "bg-gray-100 [&>div]:bg-green-500" 
                      : "bg-gray-100 [&>div]:bg-blue-500"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        
        {filteredChallenges.length === 0 && (
          <div className="text-center py-8">
            <Trophy className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-muted-foreground">No challenges found</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="h-3.5 w-3.5 mr-1" /> Create Challenge
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Challenges;
