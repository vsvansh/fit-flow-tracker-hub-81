
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Check,
  ChevronDown,
  BarChart,
  PieChart,
  Apple,
  Beef,
  Egg,
  Coffee,
  ArrowRight,
  Upload,
  Utensils,
  CalendarDays,
  Carrot,
  Bookmark,
  Heart,
  Check as CheckIcon,
  Book,
  FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useNavigate } from "react-router-dom";

const NutritionTracker = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("meal-plan");
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [showCreatePlanDialog, setShowCreatePlanDialog] = useState(false);

  // Sample nutrient data
  const nutrientData = [
    { name: 'Protein', goal: 150, current: 95 },
    { name: 'Carbs', goal: 200, current: 170 },
    { name: 'Fat', goal: 65, current: 42 },
    { name: 'Fiber', goal: 30, current: 18 },
  ];

  // Sample meal plan data
  const mealPlan = [
    {
      day: "Monday",
      meals: [
        { id: 1, name: "Overnight Oats", time: "8:00 AM", calories: 350, protein: 15, carbs: 45, fat: 12 },
        { id: 2, name: "Grilled Chicken Salad", time: "12:30 PM", calories: 420, protein: 35, carbs: 25, fat: 15 },
        { id: 3, name: "Greek Yogurt & Berries", time: "4:00 PM", calories: 180, protein: 12, carbs: 18, fat: 5 },
        { id: 4, name: "Salmon with Quinoa", time: "7:00 PM", calories: 520, protein: 38, carbs: 40, fat: 22 }
      ]
    },
    {
      day: "Tuesday",
      meals: [
        { id: 5, name: "Protein Smoothie", time: "7:30 AM", calories: 310, protein: 25, carbs: 35, fat: 8 },
        { id: 6, name: "Turkey Wrap", time: "1:00 PM", calories: 450, protein: 30, carbs: 48, fat: 15 },
        { id: 7, name: "Cottage Cheese & Fruit", time: "3:30 PM", calories: 200, protein: 14, carbs: 20, fat: 4 },
        { id: 8, name: "Vegetable Stir Fry", time: "6:30 PM", calories: 380, protein: 22, carbs: 45, fat: 12 }
      ]
    }
  ];

  // Sample food log data
  const foodLog = [
    { 
      date: "Today", 
      totalCalories: 1470, 
      totalProtein: 100, 
      totalCarbs: 128, 
      totalFat: 54,
      items: [
        { name: "Overnight Oats", mealType: "Breakfast", time: "8:00 AM", calories: 350, protein: 15, carbs: 45, fat: 12 },
        { name: "Grilled Chicken Salad", mealType: "Lunch", time: "12:30 PM", calories: 420, protein: 35, carbs: 25, fat: 15 },
        { name: "Greek Yogurt & Berries", mealType: "Snack", time: "4:00 PM", calories: 180, protein: 12, carbs: 18, fat: 5 },
        { name: "Salmon with Quinoa", mealType: "Dinner", time: "7:00 PM", calories: 520, protein: 38, carbs: 40, fat: 22 }
      ]
    },
    { 
      date: "Yesterday", 
      totalCalories: 1340, 
      totalProtein: 91, 
      totalCarbs: 148, 
      totalFat: 39,
      items: [
        { name: "Protein Smoothie", mealType: "Breakfast", time: "7:30 AM", calories: 310, protein: 25, carbs: 35, fat: 8 },
        { name: "Turkey Wrap", mealType: "Lunch", time: "1:00 PM", calories: 450, protein: 30, carbs: 48, fat: 15 },
        { name: "Cottage Cheese & Fruit", mealType: "Snack", time: "3:30 PM", calories: 200, protein: 14, carbs: 20, fat: 4 },
        { name: "Vegetable Stir Fry", mealType: "Dinner", time: "6:30 PM", calories: 380, protein: 22, carbs: 45, fat: 12 }
      ]
    }
  ];

  // Sample journal entries
  const journalEntries = [
    {
      date: "April 15, 2025",
      title: "Progress Tracking",
      content: "Today I felt more energetic after implementing the new meal plan. The higher protein breakfast really helped sustain my energy throughout the morning workout. I noticed less cravings for sugary snacks around 3pm.",
      mood: "energetic",
      waterIntake: 8,
      sleepHours: 7.5,
      tags: ["protein", "energy", "improvement"]
    },
    {
      date: "April 14, 2025",
      title: "Nutrition Challenges",
      content: "Struggled with portion control at dinner. Need to be more mindful about eating slowly and recognizing fullness cues. Meal prepping on Sunday helped me stay on track during the workday though.",
      mood: "neutral",
      waterIntake: 6,
      sleepHours: 6.5,
      tags: ["portion control", "meal prep", "mindfulness"]
    },
    {
      date: "April 12, 2025",
      title: "Weekend Reflections",
      content: "Restaurant dining was challenging but I managed to make good choices by checking the menu beforehand. Prepped meals for the upcoming week focusing on increasing my vegetable intake and reducing processed carbs.",
      mood: "positive",
      waterIntake: 7,
      sleepHours: 8,
      tags: ["planning", "vegetables", "dining out"]
    }
  ];

  // Sample recommended foods
  const recommendedFoods = [
    { name: "Greek Yogurt", benefits: "High protein, probiotics", category: "dairy" },
    { name: "Salmon", benefits: "Omega-3 fatty acids, lean protein", category: "protein" },
    { name: "Blueberries", benefits: "Antioxidants, fiber", category: "fruit" },
    { name: "Spinach", benefits: "Iron, vitamins A & C", category: "vegetable" },
    { name: "Quinoa", benefits: "Complete protein, fiber", category: "grain" },
    { name: "Avocado", benefits: "Healthy fats, potassium", category: "fruit" },
  ];

  // Sample nutrition tips
  const nutritionTips = [
    {
      title: "Protein Timing",
      description: "Consuming protein within 30 minutes after exercise can help optimize muscle recovery and growth.",
      tag: "recovery"
    },
    {
      title: "Hydration Impact",
      description: "Even mild dehydration can impact your workout performance. Aim to drink water consistently throughout the day.",
      tag: "hydration"
    },
    {
      title: "Carb Cycling",
      description: "Consider eating more carbohydrates on intense workout days, and fewer on rest days to optimize energy and recovery.",
      tag: "energy"
    }
  ];

  // Sample analysis data
  const calorieData = [
    { name: 'Mon', intake: 1850, goal: 2000 },
    { name: 'Tue', intake: 1950, goal: 2000 },
    { name: 'Wed', intake: 2100, goal: 2000 },
    { name: 'Thu', intake: 1750, goal: 2000 },
    { name: 'Fri', intake: 1900, goal: 2000 },
    { name: 'Sat', intake: 2200, goal: 2000 },
    { name: 'Sun', intake: 1800, goal: 2000 },
  ];

  const macroDistribution = [
    { name: 'Protein', value: 30 },
    { name: 'Carbs', value: 45 },
    { name: 'Fat', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Function handlers
  const handleCreateMealPlan = () => {
    setShowCreatePlanDialog(false);
    toast({
      title: "Meal Plan Created",
      description: "Your custom meal plan has been created successfully.",
    });
  };

  const handleAddMeal = () => {
    setShowAddMealDialog(false);
    toast({
      title: "Meal Added",
      description: "Your meal has been added to your plan.",
    });
  };

  const handleSaveFood = () => {
    toast({
      title: "Food Logged",
      description: "Your food has been added to your log.",
    });
  };

  const handleSaveJournalEntry = () => {
    toast({
      title: "Journal Entry Saved",
      description: "Your nutrition journal entry has been saved.",
    });
  };

  const handleBookmarkFood = (index: number) => {
    toast({
      title: "Food Bookmarked",
      description: `${recommendedFoods[index].name} has been added to your favorites.`,
    });
  };

  const handleViewFullAnalysis = () => {
    navigate('/activity');
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-green-500" />
            Nutrition Tracker
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Upload className="h-4 w-4 mr-1" />
              Import Data
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              April 2025
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="food-log">Food Log</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Meal Plan Tab */}
          <TabsContent value="meal-plan" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Select defaultValue="current">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Plan</SelectItem>
                    <SelectItem value="high-protein">High Protein Plan</SelectItem>
                    <SelectItem value="low-carb">Low Carb Plan</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian Plan</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
              <Dialog open={showCreatePlanDialog} onOpenChange={setShowCreatePlanDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:hover:bg-green-800/30 dark:text-green-400 border-green-200 dark:border-green-800">
                    Create Custom Plan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Custom Meal Plan</DialogTitle>
                    <DialogDescription>
                      Customize a meal plan based on your preferences and goals.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="plan-name">Plan Name</Label>
                      <Input id="plan-name" placeholder="e.g. High Protein Weekdays" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="daily-calories">Daily Calories</Label>
                      <Input id="daily-calories" type="number" placeholder="e.g. 2000" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Macronutrient Split</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="protein" className="text-xs">Protein (%)</Label>
                          <Input id="protein" type="number" placeholder="30" />
                        </div>
                        <div>
                          <Label htmlFor="carbs" className="text-xs">Carbs (%)</Label>
                          <Input id="carbs" type="number" placeholder="40" />
                        </div>
                        <div>
                          <Label htmlFor="fat" className="text-xs">Fat (%)</Label>
                          <Input id="fat" type="number" placeholder="30" />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Dietary Preferences</Label>
                      <div className="flex flex-wrap gap-2">
                        {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo'].map((pref) => (
                          <Badge key={pref} variant="outline" className="cursor-pointer hover:bg-primary/10">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="meals-per-day">Meals Per Day</Label>
                        <Select defaultValue="4">
                          <SelectTrigger id="meals-per-day">
                            <SelectValue placeholder="Select meals" />
                          </SelectTrigger>
                          <SelectContent>
                            {[3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="plan-duration">Duration (days)</Label>
                        <Select defaultValue="7">
                          <SelectTrigger id="plan-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 3, 5, 7, 14, 28].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-generate" />
                      <Label htmlFor="auto-generate">Auto-generate meal suggestions</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCreatePlanDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateMealPlan}>Create Plan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {mealPlan.map((day, dayIndex) => (
                <div key={dayIndex} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-lg">{day.day}</h3>
                    <div className="flex gap-2">
                      <Dialog open={showAddMealDialog} onOpenChange={setShowAddMealDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Meal</DialogTitle>
                            <DialogDescription>
                              Add a new meal to your plan for {day.day}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="meal-name">Meal Name</Label>
                              <Input id="meal-name" placeholder="e.g. Grilled Chicken Salad" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="meal-time">Time</Label>
                                <Input id="meal-time" type="time" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="meal-type">Meal Type</Label>
                                <Select defaultValue="lunch">
                                  <SelectTrigger id="meal-type">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="breakfast">Breakfast</SelectItem>
                                    <SelectItem value="lunch">Lunch</SelectItem>
                                    <SelectItem value="dinner">Dinner</SelectItem>
                                    <SelectItem value="snack">Snack</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Nutrition Information</Label>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="calories" className="text-xs">Calories</Label>
                                  <Input id="calories" type="number" placeholder="e.g. 350" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="protein" className="text-xs">Protein (g)</Label>
                                  <Input id="protein" type="number" placeholder="e.g. 25" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="carbs" className="text-xs">Carbs (g)</Label>
                                  <Input id="carbs" type="number" placeholder="e.g. 30" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="fat" className="text-xs">Fat (g)</Label>
                                  <Input id="fat" type="number" placeholder="e.g. 12" />
                                </div>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="meal-notes">Notes (optional)</Label>
                              <Input id="meal-notes" placeholder="e.g. Use low-sodium ingredients" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowAddMealDialog(false)}>Cancel</Button>
                            <Button onClick={handleAddMeal}>Add Meal</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="divide-y">
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="py-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg mr-3">
                            {meal.time.includes("AM") ? (
                              <Coffee className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : mealIndex === 1 ? (
                              <Beef className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : mealIndex === 2 ? (
                              <Apple className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <Egg className="h-4 w-4 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{meal.name}</p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{meal.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">{meal.calories} cal</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g</p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Daily Totals</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {day.meals.reduce((sum, meal) => sum + meal.calories, 0)} cal | 
                        P: {day.meals.reduce((sum, meal) => sum + meal.protein, 0)}g | 
                        C: {day.meals.reduce((sum, meal) => sum + meal.carbs, 0)}g | 
                        F: {day.meals.reduce((sum, meal) => sum + meal.fat, 0)}g
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Meal
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4" variant="outline">
              View More Days
            </Button>
          </TabsContent>
          
          {/* Food Log Tab */}
          <TabsContent value="food-log" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search foods..." 
                  className="w-60" 
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Today
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Log Food
              </Button>
            </div>
            
            {foodLog.map((day, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">{day.date}</h3>
                  <div className="text-sm text-muted-foreground">
                    {day.totalCalories} calories | P: {day.totalProtein}g | C: {day.totalCarbs}g | F: {day.totalFat}g
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="text-lg font-bold">{day.totalCalories}</p>
                      <p className="text-xs text-muted-foreground">of 2000 goal</p>
                    </div>
                    <Progress value={(day.totalCalories / 2000) * 100} className="h-1.5 mt-2" />
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Protein</p>
                      <p className="text-lg font-bold">{day.totalProtein}g</p>
                      <p className="text-xs text-muted-foreground">of 150g goal</p>
                    </div>
                    <Progress value={(day.totalProtein / 150) * 100} className="h-1.5 mt-2 [&>div]:bg-blue-500" />
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Carbs</p>
                      <p className="text-lg font-bold">{day.totalCarbs}g</p>
                      <p className="text-xs text-muted-foreground">of 200g goal</p>
                    </div>
                    <Progress value={(day.totalCarbs / 200) * 100} className="h-1.5 mt-2 [&>div]:bg-amber-500" />
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Fat</p>
                      <p className="text-lg font-bold">{day.totalFat}g</p>
                      <p className="text-xs text-muted-foreground">of 65g goal</p>
                    </div>
                    <Progress value={(day.totalFat / 65) * 100} className="h-1.5 mt-2 [&>div]:bg-green-500" />
                  </div>
                </div>
                
                <div className="divide-y border rounded-lg overflow-hidden">
                  {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((mealType, mealIndex) => {
                    const mealItems = day.items.filter(item => item.mealType === mealType);
                    
                    return (
                      <div key={mealIndex} className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">{mealType}</h4>
                          <Button variant="ghost" size="sm" onClick={handleSaveFood}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Food
                          </Button>
                        </div>
                        
                        {mealItems.length > 0 ? (
                          <div className="space-y-2">
                            {mealItems.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                                <div className="flex items-center">
                                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg mr-3">
                                    {mealType === 'Breakfast' ? (
                                      <Coffee className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    ) : mealType === 'Lunch' ? (
                                      <Beef className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    ) : mealType === 'Snack' ? (
                                      <Apple className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{item.time}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">{item.calories} cal</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-muted-foreground text-sm">
                            No {mealType.toLowerCase()} logged
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </TabsContent>
          
          {/* Analyze Tab */}
          <TabsContent value="analyze" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Calorie Intake Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={calorieData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "0.5rem",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                            backgroundColor: "var(--background)",
                            color: "var(--foreground)"
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="intake" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} name="Actual" />
                        <Line type="monotone" dataKey="goal" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" name="Goal" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Macronutrient Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={macroDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {macroDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Nutrient Goal Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64" style={{ width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={nutrientData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "0.5rem",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                          backgroundColor: "var(--background)",
                          color: "var(--foreground)"
                        }}
                      />
                      <Legend />
                      <Bar dataKey="goal" name="Goal" fill="#9CA3AF" />
                      <Bar dataKey="current" name="Current" fill="#3B82F6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Top Foods by Protein</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: "Grilled Chicken Breast", amount: "35g protein per serving" },
                      { name: "Greek Yogurt", amount: "20g protein per cup" },
                      { name: "Salmon", amount: "22g protein per 3oz" },
                      { name: "Eggs", amount: "6g protein each" },
                      { name: "Lentils", amount: "18g protein per cup" }
                    ].map((food, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="mr-2 text-gray-400">{index + 1}.</div>
                          <span>{food.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{food.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Nutrition Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { insight: "Protein intake is consistent on workout days", impact: "Positive", icon: <Check className="h-4 w-4 text-green-500" /> },
                      { insight: "Fiber intake is below recommended levels", impact: "Needs attention", icon: <ArrowRight className="h-4 w-4 text-amber-500" /> },
                      { insight: "Hydration levels are optimal", impact: "Positive", icon: <Check className="h-4 w-4 text-green-500" /> },
                      { insight: "Vitamin D may be insufficient", impact: "Needs attention", icon: <ArrowRight className="h-4 w-4 text-amber-500" /> }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-md border">
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.insight}</span>
                        </div>
                        <Badge variant={item.impact === "Positive" ? "success" : "warning"}>
                          {item.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recommended Foods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendedFoods.map((food, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg mr-3">
                            {food.category === 'fruit' ? (
                              <Apple className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : food.category === 'vegetable' ? (
                              <Carrot className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : food.category === 'protein' ? (
                              <Beef className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : food.category === 'dairy' ? (
                              <Coffee className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{food.benefits}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 h-8 w-8 p-0"
                          onClick={() => handleBookmarkFood(index)}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Nutrition Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nutritionTips.map((tip, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{tip.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {tip.tag}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{tip.description}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400" onClick={handleViewFullAnalysis}>
                          View Full Analysis
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View More Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Meal Prepping Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Batch Cooking 101", desc: "Learn how to efficiently prepare multiple meals at once for the week ahead.", type: "Guide" },
                    { title: "Food Storage Tips", desc: "Maximize the shelf life of your prepped meals with these storage techniques.", type: "Tips" },
                    { title: "Budget-Friendly Meal Prep", desc: "Save money while eating healthy with these cost-effective strategies.", type: "Guide" }
                  ].map((resource, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{resource.title}</h3>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.desc}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                        Read More <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* New Journal Tab */}
          <TabsContent value="journal" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search entries..." 
                  className="w-60" 
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  This Week
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    New Journal Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Nutrition Journal Entry</DialogTitle>
                    <DialogDescription>
                      Track your diet, mood, and progress to identify patterns and insights.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="entry-title">Entry Title</Label>
                        <Input id="entry-title" placeholder="e.g. Weekly Meal Plan Reflection" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="entry-date">Date</Label>
                        <Input id="entry-date" type="date" className="mt-1" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="entry-content">Journal Entry</Label>
                      <textarea 
                        id="entry-content" 
                        className="w-full mt-1 min-h-[150px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Share your thoughts on your nutrition, challenges, successes, or plans..."
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mood">Mood</Label>
                        <Select defaultValue="neutral">
                          <SelectTrigger id="mood" className="mt-1">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="positive">Positive</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="tired">Tired</SelectItem>
                            <SelectItem value="sluggish">Sluggish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="water-intake">Water Intake (glasses)</Label>
                        <Input id="water-intake" type="number" min="0" max="20" placeholder="e.g. 8" className="mt-1" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="entry-tags">Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['meal prep', 'protein', 'energy', 'cravings', 'hydration', 'sleep', 'portion control', 'vegetables', 'snacking', 'progress', 'mindful eating'].map((tag) => (
                          <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                        <Input placeholder="Add custom tag..." className="w-32" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="track-in-stats" />
                      <Label htmlFor="track-in-stats">Include in nutrition analytics</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveJournalEntry}>Save Entry</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Journal Entries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-4">
                        {journalEntries.map((entry, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-lg">{entry.title}</h3>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                {entry.date}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{entry.content}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex items-center">
                                <Heart className="h-3 w-3 mr-1 text-red-500" />
                                Mood: {entry.mood}
                              </div>
                              <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex items-center">
                                Water: {entry.waterIntake} glasses
                              </div>
                              <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex items-center">
                                Sleep: {entry.sleepHours} hrs
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex justify-end mt-3">
                              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Nutrition Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium flex items-center text-blue-700 dark:text-blue-300">
                          <Brain className="h-4 w-4 mr-2" />
                          Pattern Recognition
                        </h4>
                        <p className="mt-1 text-sm">
                          Based on your journal, you have better energy levels on days with higher protein intake in the morning.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">Mood & Nutrition Correlation</h4>
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { day: "Mon", mood: 7, protein: 90 },
                              { day: "Tue", mood: 8, protein: 110 },
                              { day: "Wed", mood: 6, protein: 70 },
                              { day: "Thu", mood: 9, protein: 120 },
                              { day: "Fri", mood: 7, protein: 95 }
                            ]}>
                              <XAxis dataKey="day" />
                              <YAxis yAxisId="left" orientation="left" />
                              <YAxis yAxisId="right" orientation="right" />
                              <Tooltip />
                              <Line yAxisId="left" type="monotone" dataKey="mood" stroke="#8884d8" name="Mood" />
                              <Line yAxisId="right" type="monotone" dataKey="protein" stroke="#82ca9d" name="Protein" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Common Success Factors</h4>
                        {[
                          { factor: "Meal prepping on Sundays", frequency: "85%" },
                          { factor: "Eating breakfast within 1 hour of waking", frequency: "72%" },
                          { factor: "Drinking water before meals", frequency: "68%" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm p-2 border-b">
                            <div className="flex items-center">
                              <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                              {item.factor}
                            </div>
                            <span>{item.frequency}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Improvement Areas</h4>
                        {[
                          "Mindful eating practice",
                          "Consistent meal timing",
                          "Vegetable variety"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center text-sm p-2 border-b">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Nutrition Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Weekly Goals</h4>
                        <Button variant="outline" size="sm">
                          Set Goals
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          { goal: "Add one vegetable to each meal", progress: 60, color: "green" },
                          { goal: "Track macros for 7 days straight", progress: 85, color: "blue" },
                          { goal: "Limit processed foods to 2 servings/day", progress: 40, color: "amber" }
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.goal}</span>
                              <span>{item.progress}%</span>
                            </div>
                            <Progress 
                              value={item.progress} 
                              className={`h-1.5 [&>div]:bg-${item.color}-500`} 
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-2 border-t">
                        <h4 className="font-medium mb-2">Resources</h4>
                        <div className="space-y-2">
                          {[
                            { title: "Meal Planning Template", icon: <FileText className="h-4 w-4" /> },
                            { title: "Food Emotions Tracker", icon: <Heart className="h-4 w-4" /> },
                            { title: "Weekly Reflection Guide", icon: <Book className="h-4 w-4" /> }
                          ].map((resource, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center">
                                {resource.icon}
                                <span className="ml-2 text-sm">{resource.title}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Nutrition Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Nutritional Goals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="daily-calories">Daily Calories</Label>
                        <Input id="daily-calories" type="number" defaultValue="2000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="protein-goal">Protein (g)</Label>
                        <Input id="protein-goal" type="number" defaultValue="150" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carbs-goal">Carbohydrates (g)</Label>
                        <Input id="carbs-goal" type="number" defaultValue="200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fat-goal">Fat (g)</Label>
                        <Input id="fat-goal" type="number" defaultValue="65" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Macronutrient Distribution</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Protein: 30%</Label>
                          <span className="text-sm">150g</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={5} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Carbohydrates: 40%</Label>
                          <span className="text-sm">200g</span>
                        </div>
                        <Slider defaultValue={[40]} max={100} step={5} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Fat: 30%</Label>
                          <span className="text-sm">65g</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={5} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Dietary Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="vegetarian">Vegetarian</Label>
                        <Switch id="vegetarian" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="vegan">Vegan</Label>
                        <Switch id="vegan" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="gluten-free">Gluten-Free</Label>
                        <Switch id="gluten-free" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dairy-free">Dairy-Free</Label>
                        <Switch id="dairy-free" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="keto">Keto</Label>
                        <Switch id="keto" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Meal Reminders</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="breakfast">Breakfast</Label>
                          <Input id="breakfast" type="time" defaultValue="07:00" />
                        </div>
                        <div className="flex items-center mt-7">
                          <Switch id="breakfast-reminder" defaultChecked />
                          <Label htmlFor="breakfast-reminder" className="ml-2">Remind me</Label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="lunch">Lunch</Label>
                          <Input id="lunch" type="time" defaultValue="12:30" />
                        </div>
                        <div className="flex items-center mt-7">
                          <Switch id="lunch-reminder" defaultChecked />
                          <Label htmlFor="lunch-reminder" className="ml-2">Remind me</Label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dinner">Dinner</Label>
                          <Input id="dinner" type="time" defaultValue="19:00" />
                        </div>
                        <div className="flex items-center mt-7">
                          <Switch id="dinner-reminder" defaultChecked />
                          <Label htmlFor="dinner-reminder" className="ml-2">Remind me</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Data & Privacy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-data">Share nutrition data with trainers</Label>
                        <Switch id="share-data" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-analytics">Use data for improved recommendations</Label>
                        <Switch id="data-analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-sync">Auto-sync with fitness devices</Label>
                        <Switch id="auto-sync" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NutritionTracker;
