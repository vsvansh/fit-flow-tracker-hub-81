
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, Search, Plus, Filter, BarChart2, Heart, Coffee, Apple, Egg, Pizza, Upload, 
  RotateCcw, ChevronRight, Mic, ChevronDown, Trash2, Camera, BookOpen, Star, AlertTriangle 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type FoodCategory = "breakfast" | "lunch" | "dinner" | "snack";

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  category: FoodCategory;
  time?: string;
  isFavorite?: boolean;
}

interface DailyNutrition {
  calories: {
    consumed: number;
    goal: number;
  };
  carbs: {
    consumed: number;
    goal: number;
  };
  protein: {
    consumed: number;
    goal: number;
  };
  fat: {
    consumed: number;
    goal: number;
  };
  water: {
    consumed: number;
    goal: number;
  };
}

const NutritionTracker = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  // Sample food data
  const defaultFoods: FoodItem[] = [
    { id: 1, name: "Oatmeal with banana", calories: 350, carbs: 60, protein: 15, fat: 7, category: "breakfast", time: "08:30", isFavorite: true },
    { id: 2, name: "Grilled chicken salad", calories: 420, carbs: 12, protein: 45, fat: 22, category: "lunch", time: "12:45" },
    { id: 3, name: "Protein shake", calories: 180, carbs: 5, protein: 30, fat: 3, category: "snack", time: "15:30", isFavorite: true },
    { id: 4, name: "Salmon with vegetables", calories: 520, carbs: 25, protein: 40, fat: 28, category: "dinner", time: "19:15" },
    { id: 5, name: "Greek yogurt", calories: 150, carbs: 8, protein: 15, fat: 4, category: "snack", time: "21:00" },
  ];
  
  // Food repository for search
  const foodRepository: FoodItem[] = [
    ...defaultFoods,
    { id: 6, name: "Avocado toast", calories: 320, carbs: 24, protein: 8, fat: 22, category: "breakfast" },
    { id: 7, name: "Quinoa bowl", calories: 380, carbs: 55, protein: 12, fat: 10, category: "lunch" },
    { id: 8, name: "Banana", calories: 105, carbs: 27, protein: 1, fat: 0, category: "snack" },
    { id: 9, name: "Chicken stir fry", calories: 450, carbs: 30, protein: 40, fat: 15, category: "dinner" },
    { id: 10, name: "Mixed nuts", calories: 170, carbs: 6, protein: 5, fat: 14, category: "snack" },
  ];
  
  const [foods, setFoods] = useState<FoodItem[]>(defaultFoods);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  
  // Daily nutrition data
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    calories: { consumed: 1620, goal: 2100 },
    carbs: { consumed: 110, goal: 260 },
    protein: { consumed: 145, goal: 160 },
    fat: { consumed: 64, goal: 70 },
    water: { consumed: 1500, goal: 2500 },
  });
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filteredResults = foodRepository.filter(
      food => food.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };
  
  // Add food item to today's log
  const addFoodItem = (food: FoodItem, category: FoodCategory) => {
    const newFood = {
      ...food,
      id: Date.now(),
      category,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setFoods([...foods, newFood]);
    
    // Update daily nutrition
    setDailyNutrition({
      ...dailyNutrition,
      calories: {
        ...dailyNutrition.calories,
        consumed: dailyNutrition.calories.consumed + food.calories
      },
      carbs: {
        ...dailyNutrition.carbs,
        consumed: dailyNutrition.carbs.consumed + food.carbs
      },
      protein: {
        ...dailyNutrition.protein,
        consumed: dailyNutrition.protein.consumed + food.protein
      },
      fat: {
        ...dailyNutrition.fat,
        consumed: dailyNutrition.fat.consumed + food.fat
      }
    });
    
    toast({
      title: "Food added",
      description: `${food.name} has been added to your ${category}.`
    });
    
    setSearchResults([]);
    setSearchQuery("");
  };
  
  // Remove food item
  const removeFoodItem = (foodId: number) => {
    const foodToRemove = foods.find(food => food.id === foodId);
    if (!foodToRemove) return;
    
    setFoods(foods.filter(food => food.id !== foodId));
    
    // Update daily nutrition
    setDailyNutrition({
      ...dailyNutrition,
      calories: {
        ...dailyNutrition.calories,
        consumed: dailyNutrition.calories.consumed - foodToRemove.calories
      },
      carbs: {
        ...dailyNutrition.carbs,
        consumed: dailyNutrition.carbs.consumed - foodToRemove.carbs
      },
      protein: {
        ...dailyNutrition.protein,
        consumed: dailyNutrition.protein.consumed - foodToRemove.protein
      },
      fat: {
        ...dailyNutrition.fat,
        consumed: dailyNutrition.fat.consumed - foodToRemove.fat
      }
    });
    
    toast({
      title: "Food removed",
      description: `${foodToRemove.name} has been removed from your log.`
    });
  };
  
  // Add water intake
  const addWater = (amount: number) => {
    setDailyNutrition({
      ...dailyNutrition,
      water: {
        ...dailyNutrition.water,
        consumed: Math.min(dailyNutrition.water.consumed + amount, dailyNutrition.water.goal)
      }
    });
    
    toast({
      title: "Water logged",
      description: `Added ${amount}ml to your water intake.`
    });
  };
  
  // Handle voice input
  const toggleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Please say the food you want to log."
      });
      
      // Simulate voice recognition after a delay
      setTimeout(() => {
        setIsRecording(false);
        setSearchQuery("Greek yogurt with honey");
        setSearchResults([
          { 
            id: 11, 
            name: "Greek yogurt with honey", 
            calories: 220, 
            carbs: 25, 
            protein: 20, 
            fat: 5, 
            category: "snack" 
          }
        ]);
        
        toast({
          title: "Voice input detected",
          description: "We found 'Greek yogurt with honey'."
        });
      }, 3000);
    } else {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Voice input cancelled."
      });
    }
  };
  
  // Handle barcode scanner
  const openBarcodeScanner = () => {
    toast({
      title: "Barcode scanner",
      description: "Camera opened. Please scan a food item barcode."
    });
    
    // Simulate scanning after a delay
    setTimeout(() => {
      toast({
        title: "Barcode scanned",
        description: "Found: Protein bar (200 calories)"
      });
      
      setSearchResults([
        { 
          id: 12, 
          name: "Protein bar", 
          calories: 200, 
          carbs: 20, 
          protein: 15, 
          fat: 8, 
          category: "snack" 
        }
      ]);
    }, 2000);
  };
  
  // Toggle favorite status
  const toggleFavorite = (foodId: number) => {
    setFoods(foods.map(food => 
      food.id === foodId ? { ...food, isFavorite: !food.isFavorite } : food
    ));
    
    const foodName = foods.find(food => food.id === foodId)?.name;
    toast({
      title: `${foodName}`,
      description: foods.find(food => food.id === foodId)?.isFavorite 
        ? "Removed from favorites" 
        : "Added to favorites"
    });
  };
  
  // Calculate macronutrient percentages
  const calculateMacroPercentage = () => {
    const totalCals = dailyNutrition.carbs.consumed * 4 + 
      dailyNutrition.protein.consumed * 4 + 
      dailyNutrition.fat.consumed * 9;
    
    if (totalCals === 0) return { carbs: 0, protein: 0, fat: 0 };
    
    return {
      carbs: Math.round((dailyNutrition.carbs.consumed * 4 / totalCals) * 100),
      protein: Math.round((dailyNutrition.protein.consumed * 4 / totalCals) * 100),
      fat: Math.round((dailyNutrition.fat.consumed * 9 / totalCals) * 100)
    };
  };
  
  const macroPercentages = calculateMacroPercentage();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold gradient-text">Food & Nutrition</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => toast({
              title: "Synced with fitness devices",
              description: "Your nutrition data has been updated."
            })}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button onClick={() => navigate("/nutrition/insights")}>
            <BarChart2 className="h-4 w-4 mr-2" />
            Insights
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="meals">Meals & Recipes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/40 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Add Food</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={toggleVoiceInput}
                        className={isRecording ? "bg-red-500/20 text-red-500" : ""}
                      >
                        <Mic className={`h-4 w-4 ${isRecording ? "animate-pulse" : ""}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={openBarcodeScanner}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search for a food..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {searchQuery && searchResults.length > 0 ? (
                    <div className="py-2 divide-y">
                      {searchResults.map((food) => (
                        <div key={food.id} className="flex items-center justify-between p-3 hover:bg-muted/30">
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {food.calories} cal • {food.carbs}g carbs • {food.protein}g protein • {food.fat}g fat
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Add <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => addFoodItem(food, "breakfast")}>
                                <Coffee className="mr-2 h-4 w-4" /> Breakfast
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => addFoodItem(food, "lunch")}>
                                <Utensils className="mr-2 h-4 w-4" /> Lunch
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => addFoodItem(food, "dinner")}>
                                <Utensils className="mr-2 h-4 w-4" /> Dinner
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => addFoodItem(food, "snack")}>
                                <Apple className="mr-2 h-4 w-4" /> Snack
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">No foods found matching "{searchQuery}"</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          toast({
                            title: "Custom food creation",
                            description: "You can create custom foods and recipes."
                          });
                        }}
                      >
                        Create custom food
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {["breakfast", "lunch", "dinner", "snack"].map((category) => {
                        const categoryFoods = foods.filter(food => food.category === category);
                        const categoryTotal = categoryFoods.reduce((sum, food) => sum + food.calories, 0);
                        const mealIcon = 
                          category === "breakfast" ? <Coffee className="h-5 w-5" /> :
                          category === "snack" ? <Apple className="h-5 w-5" /> : 
                          <Utensils className="h-5 w-5" />;
                        
                        return (
                          <div key={category} className="py-3 px-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="mr-3 text-muted-foreground">
                                  {mealIcon}
                                </div>
                                <div>
                                  <h3 className="font-medium capitalize">{category}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {categoryTotal} calories
                                  </p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  setSearchQuery("");
                                  toast({
                                    title: `Add food to ${category}`,
                                    description: "Search for a food or scan a barcode."
                                  });
                                }}
                              >
                                <Plus className="mr-1 h-3 w-3" /> Add Food
                              </Button>
                            </div>
                            
                            {categoryFoods.length > 0 ? (
                              <div className="space-y-2 pl-8">
                                {categoryFoods.map((food) => (
                                  <motion.div 
                                    key={food.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center justify-between group"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <span className="text-sm font-medium">{food.name}</span>
                                        {food.isFavorite && (
                                          <Star className="ml-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        )}
                                        <span className="text-xs text-muted-foreground ml-2">
                                          {food.time}
                                        </span>
                                      </div>
                                      <p className="text-xs text-muted-foreground">
                                        {food.calories} cal • {food.carbs}g C • {food.protein}g P • {food.fat}g F
                                      </p>
                                    </div>
                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => toggleFavorite(food.id)}
                                      >
                                        <Star className={`h-3.5 w-3.5 ${food.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-red-500"
                                        onClick={() => removeFoodItem(food.id)}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <div className="pl-8 py-2 text-sm text-muted-foreground italic">
                                No foods logged for {category}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="meals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Meals & Recipes</CardTitle>
                  <CardDescription>Create and manage your favorite meals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">My Saved Meals</h3>
                    <Button onClick={() => {
                      toast({
                        title: "Create new meal",
                        description: "Build a custom meal from your favorite foods."
                      });
                    }}>
                      <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Breakfast Bowl", calories: 420, items: ["Oatmeal", "Banana", "Almond Butter", "Chia Seeds"] },
                      { name: "Post-Workout Shake", calories: 310, items: ["Protein Powder", "Banana", "Almond Milk", "Spinach"] },
                      { name: "Chicken & Veggie Lunch", calories: 550, items: ["Grilled Chicken", "Mixed Vegetables", "Brown Rice", "Olive Oil"] },
                      { name: "Quick Protein Snack", calories: 180, items: ["Greek Yogurt", "Berries", "Honey"] },
                    ].map((meal, i) => (
                      <Card key={i} className="flex hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-1/3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <BookOpen className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="w-2/3 p-3">
                          <h4 className="font-medium">{meal.name}</h4>
                          <p className="text-sm text-muted-foreground">{meal.calories} calories</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {meal.items.join(", ")}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-3">Suggested Meals</h3>
                    <div className="border rounded-lg divide-y">
                      {[
                        { name: "High Protein Breakfast", calories: 480, type: "For muscle recovery" },
                        { name: "Low-carb Dinner Option", calories: 350, type: "For evening meals" },
                        { name: "Balanced Lunch Bowl", calories: 520, type: "Perfect macros distribution" },
                      ].map((suggestion, i) => (
                        <div key={i} className="p-3 flex justify-between items-center hover:bg-muted/20">
                          <div>
                            <p className="font-medium">{suggestion.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{suggestion.calories} calories</span>
                              <Badge variant="outline" className="ml-2 text-xs">{suggestion.type}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition History</CardTitle>
                  <CardDescription>View your past nutrition data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Recent Days</h3>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { date: "Yesterday", calories: 1950, target: 2100, status: "under" },
                        { date: "Monday, Apr 7", calories: 2250, target: 2100, status: "over" },
                        { date: "Sunday, Apr 6", calories: 1840, target: 2100, status: "under" },
                        { date: "Saturday, Apr 5", calories: 2080, target: 2100, status: "on-target" },
                        { date: "Friday, Apr 4", calories: 2340, target: 2100, status: "over" },
                      ].map((day, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{day.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {day.calories} / {day.target} calories
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {day.status === "over" && (
                              <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
                                <AlertTriangle className="h-3 w-3 mr-1" /> Over target
                              </Badge>
                            )}
                            {day.status === "under" && (
                              <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                                Under target
                              </Badge>
                            )}
                            {day.status === "on-target" && (
                              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                                On target
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              View <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Full History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Daily Summary</span>
                <Badge variant="outline" className="font-normal">
                  Apr 8, 2025
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm">
                    {dailyNutrition.calories.consumed} / {dailyNutrition.calories.goal}
                  </span>
                </div>
                <Progress 
                  value={(dailyNutrition.calories.consumed / dailyNutrition.calories.goal) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="space-y-1">
                  <span className="text-xs font-medium">Carbs</span>
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-md p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{macroPercentages.carbs}%</span>
                      <span className="text-xs text-blue-600 dark:text-blue-300">
                        {dailyNutrition.carbs.consumed}g
                      </span>
                    </div>
                    <Progress 
                      value={(dailyNutrition.carbs.consumed / dailyNutrition.carbs.goal) * 100} 
                      className="h-1.5 bg-blue-200 dark:bg-blue-800"
                      indicatorColor="bg-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs font-medium">Protein</span>
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-md p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-red-700 dark:text-red-400">{macroPercentages.protein}%</span>
                      <span className="text-xs text-red-600 dark:text-red-300">
                        {dailyNutrition.protein.consumed}g
                      </span>
                    </div>
                    <Progress 
                      value={(dailyNutrition.protein.consumed / dailyNutrition.protein.goal) * 100} 
                      className="h-1.5 bg-red-200 dark:bg-red-800"
                      indicatorColor="bg-red-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs font-medium">Fat</span>
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-md p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">{macroPercentages.fat}%</span>
                      <span className="text-xs text-yellow-600 dark:text-yellow-300">
                        {dailyNutrition.fat.consumed}g
                      </span>
                    </div>
                    <Progress 
                      value={(dailyNutrition.fat.consumed / dailyNutrition.fat.goal) * 100} 
                      className="h-1.5 bg-yellow-200 dark:bg-yellow-800"
                      indicatorColor="bg-yellow-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Water Intake</span>
                  <span className="text-sm">
                    {dailyNutrition.water.consumed} / {dailyNutrition.water.goal} ml
                  </span>
                </div>
                <Progress 
                  value={(dailyNutrition.water.consumed / dailyNutrition.water.goal) * 100} 
                  className="h-2 bg-blue-100 dark:bg-blue-900/30"
                  indicatorColor="bg-blue-500"
                />
                <div className="flex justify-between mt-3 gap-2">
                  {[200, 330, 500].map((amount) => (
                    <Button 
                      key={amount} 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => addWater(amount)}
                    >
                      +{amount}ml
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Calorie Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Base Metabolism</span>
                  <span className="text-sm font-medium">1,680 cal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">+ Activity</span>
                  <span className="text-sm font-medium">+420 cal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Food Intake</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">-{dailyNutrition.calories.consumed} cal</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Remaining</span>
                  <span className="text-base font-semibold">
                    {2100 - dailyNutrition.calories.consumed} cal
                  </span>
                </div>
                
                {dailyNutrition.calories.consumed > dailyNutrition.calories.goal && (
                  <div className="bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900 rounded-md p-2 mt-2 flex items-center text-red-800 dark:text-red-300">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs">
                      You've exceeded your daily calorie goal by {dailyNutrition.calories.consumed - dailyNutrition.calories.goal} calories.
                    </p>
                  </div>
                )}
                
                {dailyNutrition.calories.consumed < dailyNutrition.calories.goal * 0.5 && (
                  <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900 rounded-md p-2 mt-2 flex items-center text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs">
                      You're significantly under your daily calorie goal. Make sure you're eating enough.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Add</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => openBarcodeScanner()}>
                  <Camera className="mr-2 h-4 w-4" /> Scan Barcode
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => toggleVoiceInput()}>
                  <Mic className="mr-2 h-4 w-4" /> Voice Input
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate("/nutrition/upload")}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Photo
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate("/nutrition/recent")}>
                  <Heart className="mr-2 h-4 w-4" /> Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
