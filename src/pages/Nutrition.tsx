
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BackToHome from "@/components/BackToHome";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Salad,
  CircleSlash,
  Utensils,
  Pizza,
  Apple,
  Coffee,
  Sandwich,
  ChevronDown,
  Plus,
  Calendar,
  Trash2,
  Edit,
  SearchIcon,
  Beef,
  Fish,
  Egg,
  Milk,
  Carrot,
  Check,
  PlusCircle
} from "lucide-react";

// Sample meal data
const meals = [
  {
    id: 1,
    name: "Scrambled Eggs",
    calories: 220,
    protein: 12,
    carbs: 2,
    fat: 16,
    category: "breakfast"
  },
  {
    id: 2,
    name: "Greek Yogurt with Berries",
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 5,
    category: "breakfast"
  },
  {
    id: 3,
    name: "Grilled Chicken Salad",
    calories: 350,
    protein: 35,
    carbs: 10,
    fat: 15,
    category: "lunch"
  },
  {
    id: 4,
    name: "Salmon with Vegetables",
    calories: 430,
    protein: 40,
    carbs: 15,
    fat: 20,
    category: "dinner"
  },
  {
    id: 5,
    name: "Protein Shake",
    calories: 160,
    protein: 25,
    carbs: 5,
    fat: 2,
    category: "snack"
  },
  {
    id: 6,
    name: "Almonds (1oz)",
    calories: 160,
    protein: 6,
    carbs: 6,
    fat: 14,
    category: "snack"
  },
  {
    id: 7,
    name: "Quinoa Bowl",
    calories: 380,
    protein: 15,
    carbs: 65,
    fat: 8,
    category: "lunch"
  },
  {
    id: 8,
    name: "Turkey Sandwich",
    calories: 320,
    protein: 22,
    carbs: 35,
    fat: 8,
    category: "lunch"
  },
  {
    id: 9,
    name: "Oatmeal with Fruit",
    calories: 240,
    protein: 8,
    carbs: 40,
    fat: 5,
    category: "breakfast"
  },
  {
    id: 10,
    name: "Steak with Sweet Potato",
    calories: 450,
    protein: 40,
    carbs: 30,
    fat: 18,
    category: "dinner"
  }
];

// Sample meal plans
const mealPlans = [
  {
    id: 1,
    name: "Muscle Building Plan",
    description: "High protein meal plan for muscle growth",
    calories: 2800,
    protein: 180,
    carbs: 300,
    fat: 80,
    meals: [1, 7, 10, 5, 6]
  },
  {
    id: 2,
    name: "Weight Loss Plan",
    description: "Calorie-controlled plan for fat loss",
    calories: 1800,
    protein: 150,
    carbs: 150,
    fat: 60,
    meals: [2, 3, 4, 6]
  },
  {
    id: 3,
    name: "Balanced Nutrition",
    description: "Well-balanced macros for general health",
    calories: 2200,
    protein: 120,
    carbs: 220,
    fat: 70,
    meals: [9, 8, 4, 5]
  }
];

// Sample food log data
const initialFoodLog = [
  {
    id: 1,
    mealName: "Breakfast",
    foods: [
      { id: 1, name: "Scrambled Eggs", calories: 220, protein: 12, carbs: 2, fat: 16 },
      { id: 2, name: "Whole Grain Toast", calories: 80, protein: 3, carbs: 15, fat: 1 },
      { id: 3, name: "Avocado (1/4)", calories: 80, protein: 1, carbs: 4, fat: 8 }
    ]
  },
  {
    id: 2,
    mealName: "Lunch",
    foods: [
      { id: 4, name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { id: 5, name: "Mixed Greens Salad", calories: 35, protein: 2, carbs: 7, fat: 0 },
      { id: 6, name: "Balsamic Vinaigrette (1 tbsp)", calories: 60, protein: 0, carbs: 3, fat: 5 }
    ]
  },
  {
    id: 3,
    mealName: "Snack",
    foods: [
      { id: 7, name: "Greek Yogurt", calories: 100, protein: 18, carbs: 5, fat: 0 },
      { id: 8, name: "Blueberries (1/2 cup)", calories: 40, protein: 0.5, carbs: 10, fat: 0 }
    ]
  },
  {
    id: 4,
    mealName: "Dinner",
    foods: [
      { id: 9, name: "Baked Salmon (4oz)", calories: 180, protein: 24, carbs: 0, fat: 9 },
      { id: 10, name: "Quinoa (1/2 cup)", calories: 110, protein: 4, carbs: 20, fat: 1.5 },
      { id: 11, name: "Roasted Vegetables", calories: 80, protein: 2, carbs: 15, fat: 2 }
    ]
  }
];

// More sample meals for today's meals
const additionalMeals = [
  {
    id: 5,
    mealName: "Pre-Workout",
    foods: [
      { id: 12, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
      { id: 13, name: "Protein Bar", calories: 180, protein: 15, carbs: 18, fat: 6 }
    ]
  },
  {
    id: 6,
    mealName: "Post-Workout",
    foods: [
      { id: 14, name: "Protein Shake", calories: 160, protein: 25, carbs: 5, fat: 2 },
      { id: 15, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 }
    ]
  },
];

// Sample weekly meal routine
const initialWeeklyMealRoutine = {
  monday: {
    breakfast: "Oatmeal with Berries",
    lunch: "Grilled Chicken Salad",
    dinner: "Baked Salmon with Quinoa"
  },
  tuesday: {
    breakfast: "Protein Smoothie",
    lunch: "Turkey Sandwich with Vegetables",
    dinner: "Stir-fried Tofu with Brown Rice"
  },
  wednesday: {
    breakfast: "Egg White Omelette",
    lunch: "Tuna Salad Wrap",
    dinner: "Lean Beef Stir-fry"
  }
};

const Nutrition = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [foodLog, setFoodLog] = useState(initialFoodLog.concat(additionalMeals));
  const [weeklyMealRoutine, setWeeklyMealRoutine] = useState(initialWeeklyMealRoutine);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealPlan, setSelectedMealPlan] = useState<number | null>(null);
  const [newMealPlan, setNewMealPlan] = useState({
    name: "",
    description: "",
    calories: 2000,
    protein: 120,
    carbs: 200,
    fat: 65
  });
  const [createPlanDialogOpen, setCreatePlanDialogOpen] = useState(false);
  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false);
  const [mealBeingEdited, setMealBeingEdited] = useState<number | null>(null);

  // Filter meals based on search query
  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate total macros for the day
  const dailyTotals = foodLog.reduce(
    (acc, meal) => {
      const mealTotals = meal.foods.reduce(
        (mealAcc, food) => {
          return {
            calories: mealAcc.calories + food.calories,
            protein: mealAcc.protein + food.protein,
            carbs: mealAcc.carbs + food.carbs,
            fat: mealAcc.fat + food.fat
          };
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
      
      return {
        calories: acc.calories + mealTotals.calories,
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fat: acc.fat + mealTotals.fat
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  
  // Goals for the day
  const dailyGoals = {
    calories: 2200,
    protein: 140,
    carbs: 220,
    fat: 73
  };
  
  // Calculate percentages for progress bars
  const calculatePercentage = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const handleAddFoodToLog = (mealId: number, food: any) => {
    setFoodLog(prevLog => {
      return prevLog.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: [...meal.foods, { ...food, id: Date.now() }]
          };
        }
        return meal;
      });
    });
    
    toast({
      title: "Food added",
      description: `${food.name} added to your food log.`
    });
    
    setAddMealDialogOpen(false);
  };
  
  const handleRemoveFoodFromLog = (mealId: number, foodId: number) => {
    setFoodLog(prevLog => {
      return prevLog.map(meal => {
        if (meal.id === mealId) {
          return {
            ...meal,
            foods: meal.foods.filter(food => food.id !== foodId)
          };
        }
        return meal;
      });
    });
    
    toast({
      title: "Food removed",
      description: "Item removed from your food log."
    });
  };
  
  const handleCreateMealPlan = () => {
    const newPlan = {
      id: mealPlans.length + 1,
      ...newMealPlan,
      meals: [] // No meals selected by default
    };
    
    toast({
      title: "Meal plan created",
      description: `${newPlan.name} has been created successfully.`
    });
    
    // Reset form and close dialog
    setNewMealPlan({
      name: "",
      description: "",
      calories: 2000,
      protein: 120,
      carbs: 200,
      fat: 65
    });
    setCreatePlanDialogOpen(false);
  };

  const handleAddDayToRoutine = () => {
    const newRoutine = { ...weeklyMealRoutine };
    
    // Add Thursday
    if (!newRoutine.hasOwnProperty('thursday')) {
      newRoutine.thursday = {
        breakfast: "Protein Pancakes",
        lunch: "Mediterranean Salad",
        dinner: "Grilled Fish with Vegetables"
      };
    }
    // Add Friday
    else if (!newRoutine.hasOwnProperty('friday')) {
      newRoutine.friday = {
        breakfast: "Avocado Toast",
        lunch: "Chicken Wrap",
        dinner: "Vegetable Stir-fry"
      };
    }
    // Add Saturday
    else if (!newRoutine.hasOwnProperty('saturday')) {
      newRoutine.saturday = {
        breakfast: "Greek Yogurt with Granola",
        lunch: "Quinoa Bowl",
        dinner: "Lean Steak with Sweet Potato"
      };
    }
    // Add Sunday
    else if (!newRoutine.hasOwnProperty('sunday')) {
      newRoutine.sunday = {
        breakfast: "Fruit Smoothie Bowl",
        lunch: "Salmon Salad",
        dinner: "Turkey Chili"
      };
    }
    
    setWeeklyMealRoutine(newRoutine);
    
    toast({
      title: "Day added",
      description: "New day added to your weekly meal routine."
    });
  };
  
  return (
    <div className="container mx-auto px-4 pb-12">
      <BackToHome className="mb-4" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Nutrition Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your meals, manage nutritional intake, and plan your diet
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="track">Today's Meals</TabsTrigger>
          <TabsTrigger value="mealplans">Meal Plans</TabsTrigger>
          <TabsTrigger value="routine">Diet Routine</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Utensils className="mr-2 h-5 w-5 text-blue-500" />
                    Nutrition Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Calories</Label>
                      <span className="text-sm font-medium">
                        {dailyTotals.calories} / {dailyGoals.calories} kcal
                      </span>
                    </div>
                    <Progress value={calculatePercentage(dailyTotals.calories, dailyGoals.calories)} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">Protein</Label>
                        <span className="text-sm font-medium">
                          {dailyTotals.protein}g
                        </span>
                      </div>
                      <Progress value={calculatePercentage(dailyTotals.protein, dailyGoals.protein)} className="h-2 [&>div]:bg-red-500" />
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                        Goal: {dailyGoals.protein}g
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">Carbs</Label>
                        <span className="text-sm font-medium">
                          {dailyTotals.carbs}g
                        </span>
                      </div>
                      <Progress value={calculatePercentage(dailyTotals.carbs, dailyGoals.carbs)} className="h-2 [&>div]:bg-yellow-500" />
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                        Goal: {dailyGoals.carbs}g
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">Fat</Label>
                        <span className="text-sm font-medium">
                          {dailyTotals.fat}g
                        </span>
                      </div>
                      <Progress value={calculatePercentage(dailyTotals.fat, dailyGoals.fat)} className="h-2 [&>div]:bg-blue-500" />
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                        Goal: {dailyGoals.fat}g
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Macro Distribution</h4>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Target: 25% P / 50% C / 25% F
                      </div>
                    </div>
                    
                    <div className="h-4 w-full flex rounded-full overflow-hidden">
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${(dailyTotals.protein * 4 / (dailyTotals.calories || 1)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${(dailyTotals.carbs * 4 / (dailyTotals.calories || 1)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${(dailyTotals.fat * 9 / (dailyTotals.calories || 1)) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                        <span className="text-xs">Protein</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                        <span className="text-xs">Carbs</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span className="text-xs">Fat</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Apple className="mr-2 h-5 w-5 text-green-500" />
                    Food Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm flex items-center">
                          <Beef className="mr-1 h-4 w-4 text-red-600" />
                          Protein
                        </Label>
                        <Badge>80%</Badge>
                      </div>
                      <Progress value={80} className="h-2 [&>div]:bg-red-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm flex items-center">
                          <Carrot className="mr-1 h-4 w-4 text-orange-500" />
                          Vegetables
                        </Label>
                        <Badge>65%</Badge>
                      </div>
                      <Progress value={65} className="h-2 [&>div]:bg-orange-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm flex items-center">
                          <Apple className="mr-1 h-4 w-4 text-green-500" />
                          Fruits
                        </Label>
                        <Badge>50%</Badge>
                      </div>
                      <Progress value={50} className="h-2 [&>div]:bg-green-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm flex items-center">
                          <Sandwich className="mr-1 h-4 w-4 text-yellow-600" />
                          Grains
                        </Label>
                        <Badge>70%</Badge>
                      </div>
                      <Progress value={70} className="h-2 [&>div]:bg-yellow-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm flex items-center">
                          <Milk className="mr-1 h-4 w-4 text-blue-500" />
                          Dairy
                        </Label>
                        <Badge>45%</Badge>
                      </div>
                      <Progress value={45} className="h-2 [&>div]:bg-blue-500" />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Consider increasing your fruit intake</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Your protein intake is optimal for muscle recovery</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Try to include more dairy or calcium-rich alternatives</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pizza className="mr-2 h-5 w-5 text-red-500" />
                  Recent Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {foodLog.slice(0, 4).map(meal => (
                      <div key={meal.id} className="border rounded-lg p-3">
                        <h3 className="font-medium text-sm mb-2">{meal.mealName}</h3>
                        <ul className="text-sm space-y-1">
                          {meal.foods.map(food => (
                            <li key={food.id} className="flex justify-between items-center">
                              <span className="text-gray-700 dark:text-gray-300">{food.name}</span>
                              <span className="text-gray-500 dark:text-gray-400">{food.calories} kcal</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 pt-2 border-t text-xs text-gray-500 dark:text-gray-400">
                          {meal.foods.reduce((acc, food) => acc + food.calories, 0)} kcal total
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-2">
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={() => setSelectedTab("track")}
                    >
                      View All Meals
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Track Tab */}
          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Today's Food Log</CardTitle>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => {
                        const newMeal = {
                          id: Math.max(...foodLog.map(m => m.id)) + 1,
                          mealName: "New Meal",
                          foods: []
                        };
                        setFoodLog([...foodLog, newMeal]);
                        toast({
                          title: "Meal added",
                          description: "New meal added to your food log"
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Meal
                    </Button>
                    <Dialog open={addMealDialogOpen} onOpenChange={setAddMealDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Add Food
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add Food to Log</DialogTitle>
                          <DialogDescription>
                            Search for food or select from common items
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex items-center pb-4">
                          <div className="relative flex-1">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                              placeholder="Search foods..."
                              className="pl-9"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Select 
                            value={mealBeingEdited ? mealBeingEdited.toString() : null} 
                            onValueChange={(value) => setMealBeingEdited(parseInt(value))}
                          >
                            <SelectTrigger className="w-[180px] ml-2">
                              <SelectValue placeholder="Select meal" />
                            </SelectTrigger>
                            <SelectContent>
                              {foodLog.map((meal) => (
                                <SelectItem key={meal.id} value={meal.id.toString()}>
                                  {meal.mealName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">Common Foods</h3>
                            <ScrollArea className="h-72">
                              <div className="space-y-1">
                                {filteredMeals.map((food) => (
                                  <div 
                                    key={food.id} 
                                    className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                                    onClick={() => {
                                      if (mealBeingEdited) {
                                        handleAddFoodToLog(mealBeingEdited, food);
                                      } else {
                                        toast({
                                          title: "Select a meal",
                                          description: "Please select which meal to add this food to",
                                          variant: "destructive"
                                        });
                                      }
                                    }}
                                  >
                                    <div>
                                      <div className="font-medium text-sm">{food.name}</div>
                                      <div className="text-xs text-gray-500">
                                        {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Food Categories</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { name: "Proteins", icon: <Beef className="h-4 w-4" /> },
                                { name: "Fruits", icon: <Apple className="h-4 w-4" /> },
                                { name: "Vegetables", icon: <Carrot className="h-4 w-4" /> },
                                { name: "Dairy", icon: <Milk className="h-4 w-4" /> },
                                { name: "Grains", icon: <Sandwich className="h-4 w-4" /> },
                                { name: "Beverages", icon: <Coffee className="h-4 w-4" /> }
                              ].map((category, idx) => (
                                <Button 
                                  key={idx} 
                                  variant="outline" 
                                  className="justify-start"
                                >
                                  {category.icon}
                                  <span className="ml-2">{category.name}</span>
                                </Button>
                              ))}
                            </div>
                            
                            <div className="mt-4">
                              <h3 className="text-sm font-medium mb-2">Recently Added</h3>
                              <div className="space-y-1">
                                {meals.slice(0, 5).map((food) => (
                                  <div 
                                    key={food.id} 
                                    className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                                    onClick={() => {
                                      if (mealBeingEdited) {
                                        handleAddFoodToLog(mealBeingEdited, food);
                                      } else {
                                        toast({
                                          title: "Select a meal",
                                          description: "Please select which meal to add this food to",
                                          variant: "destructive"
                                        });
                                      }
                                    }}
                                  >
                                    <div>
                                      <div className="font-medium text-sm">{food.name}</div>
                                      <div className="text-xs text-gray-500">
                                        {food.calories} kcal
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {foodLog.map((meal) => (
                    <div key={meal.id}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium flex items-center">
                          {meal.mealName === "Breakfast" && <Coffee className="h-4 w-4 mr-2 text-amber-500" />}
                          {meal.mealName === "Lunch" && <Utensils className="h-4 w-4 mr-2 text-green-500" />}
                          {meal.mealName === "Dinner" && <Pizza className="h-4 w-4 mr-2 text-blue-500" />}
                          {meal.mealName === "Snack" && <Apple className="h-4 w-4 mr-2 text-red-500" />}
                          {meal.mealName === "Pre-Workout" && <Dumbbell className="h-4 w-4 mr-2 text-purple-500" />}
                          {meal.mealName === "Post-Workout" && <Activity className="h-4 w-4 mr-2 text-orange-500" />}
                          {meal.mealName}
                        </h3>
                        <div className="text-sm">
                          <span className="font-medium">
                            {meal.foods.reduce((acc, food) => acc + food.calories, 0)}
                          </span> kcal
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-6">
                        {meal.foods.length > 0 ? (
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {meal.foods.map((food) => (
                              <div 
                                key={food.id} 
                                className="py-2 flex justify-between items-center"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{food.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="text-sm font-medium mr-4">{food.calories} kcal</div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-gray-500 hover:text-red-500"
                                    onClick={() => handleRemoveFoodFromLog(meal.id, food.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-2 text-center text-gray-500 dark:text-gray-400">
                            <CircleSlash className="h-5 w-5 mx-auto mb-1" />
                            <p className="text-sm">No foods added</p>
                          </div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 w-full"
                          onClick={() => {
                            setMealBeingEdited(meal.id);
                            setAddMealDialogOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Food to {meal.mealName}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Meal Plans Tab */}
          <TabsContent value="mealplans" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Meal Plans</CardTitle>
                  <Dialog open={createPlanDialogOpen} onOpenChange={setCreatePlanDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-1" />
                        Create Custom Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Meal Plan</DialogTitle>
                        <DialogDescription>
                          Customize a meal plan that fits your nutritional goals
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="plan-name">Plan Name</Label>
                          <Input 
                            id="plan-name" 
                            placeholder="e.g., High Protein Plan"
                            value={newMealPlan.name}
                            onChange={(e) => setNewMealPlan({...newMealPlan, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="plan-description">Description</Label>
                          <Input 
                            id="plan-description" 
                            placeholder="Brief description of your meal plan"
                            value={newMealPlan.description}
                            onChange={(e) => setNewMealPlan({...newMealPlan, description: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Daily Targets</Label>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Calories</span>
                                <span>{newMealPlan.calories} kcal</span>
                              </div>
                              <Input 
                                type="range" 
                                min={1000} 
                                max={3500} 
                                step={50}
                                value={newMealPlan.calories}
                                onChange={(e) => setNewMealPlan({...newMealPlan, calories: parseInt(e.target.value)})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Protein</span>
                                <span>{newMealPlan.protein}g</span>
                              </div>
                              <Input 
                                type="range" 
                                min={50} 
                                max={250} 
                                step={5}
                                value={newMealPlan.protein}
                                onChange={(e) => setNewMealPlan({...newMealPlan, protein: parseInt(e.target.value)})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Carbs</span>
                                <span>{newMealPlan.carbs}g</span>
                              </div>
                              <Input 
                                type="range" 
                                min={50} 
                                max={400} 
                                step={5}
                                value={newMealPlan.carbs}
                                onChange={(e) => setNewMealPlan({...newMealPlan, carbs: parseInt(e.target.value)})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Fat</span>
                                <span>{newMealPlan.fat}g</span>
                              </div>
                              <Input 
                                type="range" 
                                min={20} 
                                max={150} 
                                step={5}
                                value={newMealPlan.fat}
                                onChange={(e) => setNewMealPlan({...newMealPlan, fat: parseInt(e.target.value)})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setCreatePlanDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateMealPlan}>
                          Create Plan
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mealPlans.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`border rounded-lg p-4 transition-all cursor-pointer ${
                        selectedMealPlan === plan.id 
                          ? 'border-blue-500 ring-2 ring-blue-500/20' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedMealPlan(plan.id)}
                    >
                      <div className="mb-2">
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Calories:</span>
                          <span className="font-medium">{plan.calories} kcal</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Protein:</span>
                          <span className="font-medium">{plan.protein}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Carbs:</span>
                          <span className="font-medium">{plan.carbs}g</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Fat:</span>
                          <span className="font-medium">{plan.fat}g</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t">
                        <h4 className="text-sm font-medium mb-1">Included Meals</h4>
                        <div className="flex flex-wrap gap-1">
                          {plan.meals.map((mealId) => {
                            const meal = meals.find(m => m.id === mealId);
                            return meal ? (
                              <Badge key={mealId} variant="secondary" className="text-xs">
                                {meal.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Diet Routine Tab */}
          <TabsContent value="routine" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Weekly Meal Routine</CardTitle>
                  <Button onClick={handleAddDayToRoutine}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Day
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(weeklyMealRoutine).map(([day, meals]) => (
                    <div key={day} className="border rounded-lg">
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-medium capitalize">{day}</h3>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center text-amber-500 mb-2">
                              <Coffee className="h-4 w-4 mr-1" />
                              <h4 className="font-medium text-sm">Breakfast</h4>
                            </div>
                            <p className="text-sm">{meals.breakfast}</p>
                          </div>
                          
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center text-green-500 mb-2">
                              <Salad className="h-4 w-4 mr-1" />
                              <h4 className="font-medium text-sm">Lunch</h4>
                            </div>
                            <p className="text-sm">{meals.lunch}</p>
                          </div>
                          
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center text-blue-500 mb-2">
                              <Utensils className="h-4 w-4 mr-1" />
                              <h4 className="font-medium text-sm">Dinner</h4>
                            </div>
                            <p className="text-sm">{meals.dinner}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Nutrition;
