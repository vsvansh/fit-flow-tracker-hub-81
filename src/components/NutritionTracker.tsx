
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
  FileText,
  Salad,
  Pizza,
  Droplet,
  Brain as BrainIcon,
  Lightbulb
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

  // Fix for the Input component props - replace prefix prop with a proper InputPrefix implementation
  const SearchInput = ({ placeholder, className }: { placeholder: string, className?: string }) => {
    return (
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder={placeholder} className={`pl-8 ${className}`} />
      </div>
    );
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
                {/* Replace the Input with prefix prop to use our SearchInput component */}
                <SearchInput placeholder="Search foods..." className="w-60" />
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
                  <div className="h-72 flex justify-center items-center">
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
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {macroDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Percentage']}
                          contentStyle={{
                            borderRadius: "0.5rem",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                            backgroundColor: "var(--background)",
                            color: "var(--foreground)"
                          }}
                        />
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
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={nutrientData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
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
                          <Bar dataKey="current" fill="#4ADE80" name="Current" />
                          <Bar dataKey="goal" fill="#94A3B8" name="Goal" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Nutrient Analysis</h3>
                      
                      {nutrientData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.name}</span>
                            <span>{item.current} / {item.goal}g</span>
                          </div>
                          <div className="flex items-center">
                            <Progress 
                              value={(item.current / item.goal) * 100}
                              className={`h-2 flex-1 ${
                                index === 0 ? "bg-blue-100 dark:bg-blue-900/30 [&>div]:bg-blue-500" :
                                index === 1 ? "bg-amber-100 dark:bg-amber-900/30 [&>div]:bg-amber-500" :
                                index === 2 ? "bg-red-100 dark:bg-red-900/30 [&>div]:bg-red-500" :
                                "bg-green-100 dark:bg-green-900/30 [&>div]:bg-green-500"
                              }`}
                            />
                            <Badge variant="outline" className="ml-2 bg-gray-50 dark:bg-gray-800 text-xs">
                              {Math.round((item.current / item.goal) * 100)}%
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {
                              (item.current / item.goal) < 0.7 ? "Below target range" :
                              (item.current / item.goal) > 1.1 ? "Above target range" :
                              "Within target range"
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Nutrition Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nutritionTips.map((tip, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-start">
                          <div className={`
                            p-2 rounded-full mr-3 flex-shrink-0
                            ${tip.tag === 'recovery' ? 'bg-blue-50 dark:bg-blue-900/20' :
                              tip.tag === 'hydration' ? 'bg-cyan-50 dark:bg-cyan-900/20' :
                              'bg-amber-50 dark:bg-amber-900/20'}
                          `}>
                            {tip.tag === 'recovery' ? (
                              <Heart className={`h-4 w-4 text-blue-600 dark:text-blue-400`} />
                            ) : tip.tag === 'hydration' ? (
                              <Droplet className={`h-4 w-4 text-cyan-600 dark:text-cyan-400`} />
                            ) : (
                              <BrainIcon className={`h-4 w-4 text-amber-600 dark:text-amber-400`} />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{tip.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tip.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center text-xs">
                          <Badge variant={tip.tag === 'recovery' ? 'success' : tip.tag === 'hydration' ? 'success' : 'warning'} className="mr-2">
                            {tip.tag}
                          </Badge>
                          <span className="text-gray-500 dark:text-gray-400">Based on your recent activity</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center">
                      <Button variant="outline" onClick={handleViewFullAnalysis}>
                        View Full Analysis <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Recommended Foods</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {recommendedFoods.map((food, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <div className={`
                                p-2 rounded-full mr-3 flex-shrink-0
                                ${food.category === 'protein' ? 'bg-red-50 dark:bg-red-900/20' :
                                  food.category === 'vegetable' ? 'bg-green-50 dark:bg-green-900/20' :
                                  food.category === 'fruit' ? 'bg-purple-50 dark:bg-purple-900/20' :
                                  food.category === 'grain' ? 'bg-amber-50 dark:bg-amber-900/20' :
                                  'bg-blue-50 dark:bg-blue-900/20'}
                              `}>
                                {food.category === 'protein' ? (
                                  <Beef className={`h-4 w-4 text-red-600 dark:text-red-400`} />
                                ) : food.category === 'vegetable' ? (
                                  <Carrot className={`h-4 w-4 text-green-600 dark:text-green-400`} />
                                ) : food.category === 'fruit' ? (
                                  <Apple className={`h-4 w-4 text-purple-600 dark:text-purple-400`} />
                                ) : food.category === 'grain' ? (
                                  <Salad className={`h-4 w-4 text-amber-600 dark:text-amber-400`} />
                                ) : (
                                  <Egg className={`h-4 w-4 text-blue-600 dark:text-blue-400`} />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{food.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{food.benefits}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleBookmarkFood(index)}>
                              <Bookmark className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Popular Recipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 dark:bg-gray-800 h-40 flex items-center justify-center">
                        <Salad className="h-16 w-16 text-green-500 opacity-50" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Mediterranean Quinoa Bowl</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>25 mins</span>
                          <span className="mx-2">•</span>
                          <span>420 calories</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">High Protein</Badge>
                          <Badge variant="outline" className="text-xs">Vegetarian</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Recipe
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 dark:bg-gray-800 h-40 flex items-center justify-center">
                        <Pizza className="h-16 w-16 text-amber-500 opacity-50" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Protein-Packed Turkey Chili</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>45 mins</span>
                          <span className="mx-2">•</span>
                          <span>380 calories</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">High Protein</Badge>
                          <Badge variant="outline" className="text-xs">Gluten Free</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Recipe
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 dark:bg-gray-800 h-40 flex items-center justify-center">
                        <Coffee className="h-16 w-16 text-purple-500 opacity-50" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Berry Protein Smoothie Bowl</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>10 mins</span>
                          <span className="mx-2">•</span>
                          <span>320 calories</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">High Protein</Badge>
                          <Badge variant="outline" className="text-xs">Breakfast</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Recipe
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 dark:bg-gray-800 h-40 flex items-center justify-center">
                        <Egg className="h-16 w-16 text-blue-500 opacity-50" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Sheet Pan Salmon & Vegetables</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>30 mins</span>
                          <span className="mx-2">•</span>
                          <span>450 calories</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">Omega-3</Badge>
                          <Badge variant="outline" className="text-xs">Low Carb</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Recipe
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Browse All Recipes
                  </Button>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full mr-3">
                            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Understanding Macros</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              A beginner's guide to macronutrients
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center">
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full mr-3">
                            <Book className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Meal Prep 101</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              How to prepare a week's worth of meals
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center">
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full mr-3">
                            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Nutrition & Performance</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              How diet affects your workout results
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Nutrition Coaches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <div className="bg-gray-200 dark:bg-gray-700 h-full w-full rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">JS</span>
                            </div>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Dr. Julia Smith</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Sports Nutrition Specialist
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Profile
                        </Button>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <div className="bg-gray-200 dark:bg-gray-700 h-full w-full rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">MB</span>
                            </div>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Michael Brown</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Performance Dietitian
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Journal Tab */}
          <TabsContent value="journal" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-indigo-500" />
                    <CardTitle>Nutrition Journal</CardTitle>
                  </div>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Entry
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {journalEntries.map((entry, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-lg">{entry.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</p>
                        </div>
                        <Badge variant="outline" className={`
                          ${entry.mood === 'energetic' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                            entry.mood === 'positive' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                            'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}
                        `}>
                          {entry.mood}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{entry.content}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full mr-2">
                            <Droplet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Water Intake</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{entry.waterIntake} glasses</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-full mr-2">
                            <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Sleep</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{entry.sleepHours} hours</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <CardTitle>Nutrition Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h3 className="font-medium mb-2 text-amber-800 dark:text-amber-300">Pattern Recognition</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Based on your journal entries, you appear to have more energy on days following higher protein breakfasts. Consider maintaining this habit to sustain morning energy levels.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Hydration Impact</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Your journal shows a correlation between higher water intake (8+ glasses) and more positive mood ratings. Aim to consistently meet your hydration goals.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-medium mb-2 text-green-800 dark:text-green-300">Sleep & Nutrition Connection</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      You've noted improved portion control on days following 7+ hours of sleep. Consider prioritizing consistent sleep schedules to support your nutrition goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="daily-goal">Daily Calorie Goal</Label>
                    <Input id="daily-goal" type="number" placeholder="e.g. 2000" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Macronutrient Targets</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="protein-goal" className="text-xs">Protein (g)</Label>
                        <Input id="protein-goal" type="number" placeholder="e.g. 150" />
                      </div>
                      <div>
                        <Label htmlFor="carbs-goal" className="text-xs">Carbs (g)</Label>
                        <Input id="carbs-goal" type="number" placeholder="e.g. 200" />
                      </div>
                      <div>
                        <Label htmlFor="fat-goal" className="text-xs">Fat (g)</Label>
                        <Input id="fat-goal" type="number" placeholder="e.g. 65" />
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
                  
                  <div className="space-y-2">
                    <Label>Food Allergies & Restrictions</Label>
                    <Input placeholder="Add allergies or restrictions..." />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="meal-reminders" />
                      <Label htmlFor="meal-reminders">Meal Time Reminders</Label>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Remind me" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min before</SelectItem>
                        <SelectItem value="30">30 min before</SelectItem>
                        <SelectItem value="60">1 hour before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="water-reminders" />
                      <Label htmlFor="water-reminders">Water Intake Reminders</Label>
                    </div>
                    <Select defaultValue="60">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">Every 30 min</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                        <SelectItem value="90">Every 1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="journal-reminders" />
                    <Label htmlFor="journal-reminders">Daily Journal Reminders</Label>
                  </div>
                  
                  <Button className="w-full">Save Preferences</Button>
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
