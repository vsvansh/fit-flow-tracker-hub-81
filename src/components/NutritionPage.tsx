import NutritionHub from "./NutritionHub";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Award, LineChart, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Add these imports
import { 
  BookOpen, Calendar, Clock, Activity, Brain, 
  Scale, Salad, Utensils, Heart
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const NutritionPage = () => {
  const { toast } = useToast();

  // Add new nutrition log data
  const nutritionLog = [
    {
      date: '2025-04-16',
      meals: [
        { id: 1, name: 'Breakfast', calories: 450, protein: 25, carbs: 45, fat: 15 },
        { id: 2, name: 'Lunch', calories: 650, protein: 35, carbs: 65, fat: 25 },
        { id: 3, name: 'Dinner', calories: 550, protein: 30, carbs: 55, fat: 20 }
      ],
      mood: 'Energetic',
      notes: 'Felt great today, good energy levels throughout'
    },
    // ... more log entries would go here
  ];

  // Add sample data for additional insights
  const weeklyNutritionData = [
    { day: 'Mon', calories: 1850, protein: 95, carbs: 220, fat: 65 },
    { day: 'Tue', calories: 2100, protein: 110, carbs: 240, fat: 70 },
    { day: 'Wed', calories: 1950, protein: 105, carbs: 230, fat: 68 },
    { day: 'Thu', calories: 2200, protein: 115, carbs: 250, fat: 73 },
    { day: 'Fri', calories: 1850, protein: 100, carbs: 215, fat: 64 },
    { day: 'Sat', calories: 2050, protein: 108, carbs: 235, fat: 69 },
    { day: 'Sun', calories: 2000, protein: 105, carbs: 225, fat: 67 }
  ];

  // Enhanced handler for feature button 
  const handleShowNewFeature = () => {
    toast({
      title: "New Feature",
      description: "This new feature is coming soon! Stay tuned for updates.",
      duration: 3000,
    });
  };

  // Add handlers for journal actions
  const handleAddEntry = () => {
    toast({
      title: "New Journal Entry",
      description: "Creating a new nutrition journal entry",
      duration: 3000,
    });
  };

  const handleSaveEntry = () => {
    toast({
      title: "Entry Saved",
      description: "Your journal entry has been saved successfully",
      duration: 3000,
    });
  };

  const handleDeleteEntry = () => {
    toast({
      title: "Entry Deleted",
      description: "Journal entry has been removed",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header section with motivational content */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Nutrition Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your nutrition, set goals, and improve your dietary habits with our comprehensive tools.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Meal Tracking
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  Nutrition Analysis
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                  Goal Setting
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                  Meal Planning
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-green-600" />
                <span>Complete your nutrition profile to unlock personalized insights</span>
              </div>
              {/* Add button to try new features */}
              <Button 
                variant="outline" 
                className="w-full mt-4 border-green-200 hover:bg-green-50 text-green-700"
                onClick={handleShowNewFeature}
              >
                Show New Feature
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex-1 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-green-600" />
                Nutrition Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "Eating a rainbow of colored fruits and vegetables ensures you're getting a wide variety of nutrients and antioxidants."
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <LineChart className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Daily nutrition streak: 7 days</span>
                </div>
                <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1">
                  More tips 
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      {/* Main nutrition hub component */}
      <Tabs defaultValue="track" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="analyze">Analyze</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="insights">Advanced Insights</TabsTrigger>
          <TabsTrigger value="plan">Meal Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="track">
          <NutritionHub />
        </TabsContent>

        {/* Fix the Analyze tab spacing */}
        <TabsContent value="analyze">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Nutrient Goal Comparison</CardTitle>
                <CardDescription>Compare your actual nutrient intake with your goals</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { name: 'Protein', actual: 90, goal: 100 },
                        { name: 'Carbs', actual: 120, goal: 100 },
                        { name: 'Fat', actual: 80, goal: 100 },
                        { name: 'Fiber', actual: 75, goal: 100 },
                        { name: 'Water', actual: 90, goal: 100 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f680" name="Actual" />
                      <Area type="monotone" dataKey="goal" stroke="#10b981" fill="#10b98180" name="Goal" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Meal Timing Distribution</CardTitle>
                <CardDescription>When you consume calories throughout the day</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { time: 'Morning', calories: 450 },
                        { time: 'Mid-day', calories: 650 },
                        { time: 'Afternoon', calories: 250 },
                        { time: 'Evening', calories: 550 },
                        { time: 'Night', calories: 100 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="calories" stroke="#8b5cf6" fill="url(#colorMeals)" name="Calories" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Journal Tab */}
        <TabsContent value="journal">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Nutrition Journal</CardTitle>
                    <CardDescription>Track your daily meals and reflections</CardDescription>
                  </div>
                  <Button onClick={handleAddEntry}>Add New Entry</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {nutritionLog.map((entry, index) => (
                    <Card key={index} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium">{entry.date}</h4>
                            <p className="text-sm text-muted-foreground">{entry.mood}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleSaveEntry}>
                              Save
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500"
                              onClick={handleDeleteEntry}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {entry.meals.map((meal) => (
                            <div key={meal.id} className="flex justify-between items-center p-2 bg-background rounded">
                              <div>
                                <p className="font-medium">{meal.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {meal.calories} cal · P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Edit Meal",
                                    description: `Editing ${meal.name}`,
                                    duration: 3000,
                                  });
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm italic">{entry.notes}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Add Advanced Insights Tab */}
        <TabsContent value="insights">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Weekly Nutrition Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyNutritionData}>
                      <defs>
                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="calories" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorCalories)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Nutrient Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Protein', value: 30 },
                          { name: 'Carbs', value: 45 },
                          { name: 'Fat', value: 25 }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Protein</Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">Carbs</Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700">Fat</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plan">
          <div>Meal Plan Tab Content</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionPage;
