
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Droplet, Coffee, Moon, Footprints, 
  Dumbbell, Apple, CheckCircle, PlusCircle
} from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: React.ReactNode;
  streak: number;
  today: boolean;
  color: string;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: "1", 
      name: "Drink Water", 
      icon: <Droplet className="h-4 w-4" />, 
      streak: 7, 
      today: true,
      color: "text-blue-500" 
    },
    { 
      id: "2", 
      name: "Morning Exercise", 
      icon: <Dumbbell className="h-4 w-4" />, 
      streak: 3, 
      today: true,
      color: "text-purple-500" 
    },
    { 
      id: "3", 
      name: "10K Steps", 
      icon: <Footprints className="h-4 w-4" />, 
      streak: 5, 
      today: false,
      color: "text-green-500" 
    },
    { 
      id: "4", 
      name: "Eat Fruit", 
      icon: <Apple className="h-4 w-4" />, 
      streak: 2, 
      today: false,
      color: "text-orange-500" 
    },
    { 
      id: "5", 
      name: "Sleep 8 Hours", 
      icon: <Moon className="h-4 w-4" />, 
      streak: 4, 
      today: false,
      color: "text-indigo-500" 
    },
  ]);
  
  // Days of the week for the habit tracker view
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Toggle habit completion for today
  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, today: !habit.today } : habit
      )
    );
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Daily Habits</CardTitle>
          <Calendar className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <div 
                key={habit.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`rounded-full p-2 ${habit.today ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <span className={habit.color}>{habit.icon}</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{habit.name}</p>
                    <div className="flex items-center mt-0.5">
                      <span className="text-xs text-muted-foreground">Streak:</span>
                      <Badge variant="outline" className="ml-1 h-5 px-1.5 text-xs bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                        {habit.streak} days
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant={habit.today ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 rounded-full ${habit.today ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  onClick={() => toggleHabit(habit.id)}
                >
                  {habit.today ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <PlusCircle className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Weekly Progress</h3>
              <span className="text-xs text-muted-foreground">April 2-8, 2025</span>
            </div>
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-center">
                <thead>
                  <tr>
                    <th className="w-1/3 text-left text-xs font-medium text-muted-foreground">Habit</th>
                    {days.map((day) => (
                      <th key={day} className="text-xs font-medium text-muted-foreground">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {habits.map((habit) => (
                    <tr key={habit.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 text-left">
                        <div className="flex items-center">
                          <span className={`mr-2 ${habit.color}`}>{habit.icon}</span>
                          <span className="text-xs">{habit.name}</span>
                        </div>
                      </td>
                      {days.map((day, i) => (
                        <td key={`${habit.id}-${day}`} className="py-2">
                          {/* Randomly populate completed days for demo */}
                          {Math.random() > 0.3 || (i === 6 && habit.today) ? (
                            <div className="mx-auto h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            </div>
                          ) : (
                            <div className="mx-auto h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
