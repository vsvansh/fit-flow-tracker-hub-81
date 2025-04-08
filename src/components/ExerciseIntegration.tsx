
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Activity, Dumbbell, Timer, Calendar, Plus, Clock, 
  Smartphone, BarChart, Trash2, Heart, Flame, PlayCircle 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Sample exercises
const sampleExercises = [
  { id: 1, name: 'Running', calories: 12, intensities: ['low', 'moderate', 'high'] },
  { id: 2, name: 'Cycling', calories: 10, intensities: ['low', 'moderate', 'high'] },
  { id: 3, name: 'Swimming', calories: 11, intensities: ['moderate', 'high'] },
  { id: 4, name: 'Walking', calories: 5, intensities: ['low', 'moderate'] },
  { id: 5, name: 'Weight Training', calories: 8, intensities: ['moderate', 'high'] },
  { id: 6, name: 'Yoga', calories: 4, intensities: ['low', 'moderate'] },
  { id: 7, name: 'HIIT', calories: 15, intensities: ['high'] },
  { id: 8, name: 'Pilates', calories: 7, intensities: ['low', 'moderate'] },
  { id: 9, name: 'Boxing', calories: 13, intensities: ['moderate', 'high'] },
  { id: 10, name: 'Dancing', calories: 9, intensities: ['low', 'moderate', 'high'] },
];

// Sample workout history
const sampleWorkoutHistory = [
  { id: 1, name: 'Morning Run', type: 'Running', date: '2025-04-07', duration: 45, intensity: 'high', calories: 540 },
  { id: 2, name: 'Strength Training', type: 'Weight Training', date: '2025-04-06', duration: 60, intensity: 'moderate', calories: 480 },
  { id: 3, name: 'Evening Walk', type: 'Walking', date: '2025-04-06', duration: 30, intensity: 'low', calories: 150 },
  { id: 4, name: 'Yoga Session', type: 'Yoga', date: '2025-04-05', duration: 45, intensity: 'low', calories: 180 },
  { id: 5, name: 'Swimming Laps', type: 'Swimming', date: '2025-04-03', duration: 40, intensity: 'moderate', calories: 440 },
];

// Sample connected devices
const connectedDevices = [
  { id: 1, name: 'Fitbit Versa 3', type: 'tracker', status: 'connected', lastSync: '2025-04-08 10:23 AM' },
  { id: 2, name: 'Apple Health', type: 'app', status: 'connected', lastSync: '2025-04-08 11:15 AM' },
];

interface WorkoutData {
  id: number;
  name: string;
  type: string;
  date: string;
  duration: number;
  intensity: 'low' | 'moderate' | 'high';
  calories: number;
}

const ExerciseIntegration = () => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>(sampleWorkoutHistory);
  const [activeTab, setActiveTab] = useState('log');
  
  // New workout form state
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: '',
    duration: 30,
    intensity: 'moderate',
  });
  
  // Calculate total calories burned
  const calculateCalories = () => {
    const baseExercise = sampleExercises.find(ex => ex.name === newWorkout.type);
    if (!baseExercise) return 0;
    
    const intensityMultiplier = newWorkout.intensity === 'low' ? 0.8 : 
                               newWorkout.intensity === 'moderate' ? 1 : 1.2;
                               
    return Math.round(baseExercise.calories * newWorkout.duration * intensityMultiplier);
  };
  
  // Handle adding a new workout
  const handleAddWorkout = () => {
    if (!newWorkout.name || !newWorkout.type) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const calories = calculateCalories();
    const today = new Date().toISOString().split('T')[0];
    
    const workoutToAdd = {
      id: Math.max(0, ...workouts.map(w => w.id)) + 1,
      name: newWorkout.name,
      type: newWorkout.type,
      date: today,
      duration: newWorkout.duration,
      intensity: newWorkout.intensity as 'low' | 'moderate' | 'high',
      calories
    };
    
    setWorkouts([workoutToAdd, ...workouts]);
    
    // Reset form
    setNewWorkout({
      name: '',
      type: '',
      duration: 30,
      intensity: 'moderate'
    });
    
    toast({
      title: "Workout added",
      description: `${workoutToAdd.name} has been added to your log.`,
    });
  };
  
  // Handle removing a workout
  const handleRemoveWorkout = (id: number) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
    
    toast({
      title: "Workout removed",
      description: "The workout has been removed from your log.",
      variant: "destructive"
    });
  };
  
  // Handle connecting a new device
  const handleConnectDevice = () => {
    toast({
      title: "Connecting device",
      description: "Searching for devices... (Feature simulation)",
    });
    
    // Simulate device connection
    setTimeout(() => {
      toast({
        title: "Device connected",
        description: "Samsung Galaxy Watch has been connected successfully.",
      });
    }, 2000);
  };
  
  // Total calories burned today
  const getTotalCaloriesToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return workouts
      .filter(workout => workout.date === today)
      .reduce((total, workout) => total + workout.calories, 0);
  };
  
  // Intensity color
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'moderate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Exercise Integration</CardTitle>
            <CardDescription>Track and manage your workouts</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-800/40 flex items-center justify-center">
            <Dumbbell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="log">Workouts</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log" className="space-y-4">
            <Card className="border shadow-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">Log New Workout</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="workout-name">Workout Name</Label>
                    <Input 
                      id="workout-name" 
                      placeholder="e.g., Morning Run" 
                      value={newWorkout.name}
                      onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workout-type">Exercise Type</Label>
                    <Select 
                      value={newWorkout.type}
                      onValueChange={(value) => setNewWorkout({...newWorkout, type: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select exercise type" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleExercises.map(exercise => (
                          <SelectItem key={exercise.id} value={exercise.name}>
                            {exercise.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workout-duration">Duration (minutes)</Label>
                    <Input 
                      id="workout-duration" 
                      type="number"
                      min="5"
                      max="300"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({...newWorkout, duration: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workout-intensity">Intensity</Label>
                    <Select 
                      value={newWorkout.intensity}
                      onValueChange={(value: 'low' | 'moderate' | 'high') => setNewWorkout({...newWorkout, intensity: value})}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div>
                    <p className="text-sm">Estimated calories:</p>
                    <p className="text-xl font-bold">{calculateCalories()} cal</p>
                  </div>
                  <Button onClick={handleAddWorkout}>
                    <Plus className="h-4 w-4 mr-2" /> Add Workout
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="font-medium mb-3">Recent Workouts</h3>
              <div className="space-y-3">
                {workouts.length > 0 ? (
                  workouts.map(workout => (
                    <div key={workout.id} className="flex justify-between items-center border rounded-lg p-3">
                      <div className="flex items-start">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mr-3">
                          <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{workout.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(workout.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {workout.duration} min
                            </span>
                            <Badge className={`text-xs ${getIntensityColor(workout.intensity)}`}>
                              {workout.intensity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {workout.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right mr-2">
                          <p className="font-medium text-amber-600 dark:text-amber-400">{workout.calories} cal</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveWorkout(workout.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">No workouts logged yet</p>
                    <Button variant="outline" className="mt-2" onClick={() => setNewWorkout({...newWorkout, name: 'Morning Workout'})}>
                      <Plus className="h-4 w-4 mr-1" /> Add Your First Workout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mb-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold">{getTotalCaloriesToday()}</h3>
                  <p className="text-muted-foreground text-sm">Calories burned today</p>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mb-2">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {workouts.reduce((sum, workout) => sum + workout.duration, 0)} min
                  </h3>
                  <p className="text-muted-foreground text-sm">Total active minutes</p>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mb-2">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold">145 BPM</h3>
                  <p className="text-muted-foreground text-sm">Avg. heart rate (workouts)</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border shadow-sm">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-64 flex items-end justify-between">
                  {/* This would be better with a proper chart library, but using div bars for demonstration */}
                  {[380, 540, 0, 180, 440, 480, 690].map((calories, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex-grow flex items-end">
                        <div 
                          className={`w-12 rounded-t-md ${calories > 0 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} 
                          style={{ height: `${Math.min(calories / 10, 20)}0px` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-xs">{["M", "T", "W", "T", "F", "S", "S"][index]}</p>
                      <p className="text-xs font-medium">{calories > 0 ? calories : '-'}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border shadow-sm">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg">Exercise Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {['Running', 'Weight Training', 'Walking', 'Yoga', 'Swimming'].map((type, index) => {
                      const minutes = [120, 60, 75, 45, 80][index];
                      const percentage = Math.round((minutes / 380) * 100);
                      
                      return (
                        <div key={type} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{type}</span>
                            <span>{minutes} min ({percentage}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">Suggested Workouts</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      See All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {[
                      { name: '30-Min HIIT Session', calories: 450, duration: 30, difficulty: 'Hard' },
                      { name: 'Morning Yoga Flow', calories: 200, duration: 45, difficulty: 'Easy' },
                      { name: '5k Tempo Run', calories: 380, duration: 35, difficulty: 'Medium' }
                    ].map((workout, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-lg border">
                        <div className="flex items-center">
                          <div className="mr-3 bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                            <PlayCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{workout.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {workout.duration} min • {workout.calories} cal
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{workout.difficulty}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="devices" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Card className="border shadow-sm flex-1">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Connected Devices</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {connectedDevices.map(device => (
                      <div key={device.id} className="flex justify-between items-center border-b pb-3">
                        <div className="flex items-center">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded mr-3">
                            <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Last synced: {device.lastSync}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                          Connected
                        </Badge>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full" onClick={handleConnectDevice}>
                      <Plus className="h-4 w-4 mr-2" /> Connect New Device
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm flex-1">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Activity Sync</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="pb-3 border-b">
                      <p className="font-medium mb-2">Auto-sync Settings</p>
                      
                      <div className="flex justify-between items-center py-1">
                        <label className="text-sm flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Auto-sync workouts
                        </label>
                        <span className="text-xs text-gray-500">Every 30 min</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-1">
                        <label className="text-sm flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Sync heart rate data
                        </label>
                        <span className="text-xs text-gray-500">Continuous</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-1">
                        <label className="text-sm flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          Sync sleep data
                        </label>
                        <span className="text-xs text-gray-500">Daily</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Compatible Apps</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Apple Health', 'Google Fit', 'Fitbit', 'Garmin', 'Strava', 'Samsung Health'].map(app => (
                          <Badge key={app} variant="outline" className="justify-center">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <BarChart className="h-4 w-4 mr-2" /> Sync Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExerciseIntegration;
