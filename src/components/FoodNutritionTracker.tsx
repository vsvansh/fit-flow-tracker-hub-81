
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Utensils, Coffee, Salad, Pizza, Apple, Droplet, Hamburger, 
  Scanner, Mic, Plus, Search, Clock, BarChart3 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Sample food database
const sampleFoods = [
  { id: 1, name: "Oatmeal", calories: 150, carbs: 27, protein: 5, fat: 2.5, category: "breakfast" },
  { id: 2, name: "Scrambled Eggs", calories: 140, carbs: 1, protein: 12, fat: 9, category: "breakfast" },
  { id: 3, name: "Greek Yogurt", calories: 100, carbs: 5, protein: 15, fat: 0, category: "breakfast" },
  { id: 4, name: "Chicken Salad", calories: 350, carbs: 10, protein: 30, fat: 20, category: "lunch" },
  { id: 5, name: "Turkey Sandwich", calories: 320, carbs: 35, protein: 20, fat: 8, category: "lunch" },
  { id: 6, name: "Grilled Salmon", calories: 280, carbs: 0, protein: 32, fat: 15, category: "dinner" },
  { id: 7, name: "Quinoa Bowl", calories: 420, carbs: 65, protein: 15, fat: 10, category: "dinner" },
  { id: 8, name: "Apple", calories: 95, carbs: 25, protein: 0.5, fat: 0.3, category: "snack" },
  { id: 9, name: "Mixed Nuts", calories: 170, carbs: 6, protein: 5, fat: 14, category: "snack" },
];

// Interface for food items
interface FoodItem {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  category: "breakfast" | "lunch" | "dinner" | "snack";
  quantity?: number;
}

// Interface for a daily food log
interface DailyLog {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snack: FoodItem[];
}

const FoodNutritionTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("log");
  const [selectedCategory, setSelectedCategory] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  });
  
  // Daily targets
  const dailyCalorieTarget = 2000;
  const dailyCarbsTarget = 250; // grams
  const dailyProteinTarget = 120; // grams
  const dailyFatTarget = 65; // grams
  
  // Calculate current totals
  const calculateTotalNutrients = () => {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    
    Object.values(dailyLog).forEach(mealItems => {
      mealItems.forEach(item => {
        const quantity = item.quantity || 1;
        totalCalories += item.calories * quantity;
        totalCarbs += item.carbs * quantity;
        totalProtein += item.protein * quantity;
        totalFat += item.fat * quantity;
      });
    });
    
    return { totalCalories, totalCarbs, totalProtein, totalFat };
  };
  
  const { totalCalories, totalCarbs, totalProtein, totalFat } = calculateTotalNutrients();
  
  // Search foods from database
  const searchFoods = () => {
    if (searchTerm.trim() === "") return [];
    
    return sampleFoods.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Add food to daily log
  const addFoodToLog = (food: FoodItem) => {
    const updatedLog = {...dailyLog};
    const existingItemIndex = updatedLog[selectedCategory].findIndex(item => item.id === food.id);
    
    if (existingItemIndex >= 0) {
      // Increment quantity if already exists
      updatedLog[selectedCategory][existingItemIndex].quantity = 
        (updatedLog[selectedCategory][existingItemIndex].quantity || 1) + 1;
    } else {
      // Add new item with quantity = 1
      updatedLog[selectedCategory].push({...food, quantity: 1});
    }
    
    setDailyLog(updatedLog);
    
    toast({
      title: "Food added",
      description: `${food.name} added to your ${selectedCategory} log.`,
    });
    
    setSearchTerm("");
  };
  
  // Remove food from daily log
  const removeFoodFromLog = (category: "breakfast" | "lunch" | "dinner" | "snack", foodId: number) => {
    const updatedLog = {...dailyLog};
    updatedLog[category] = updatedLog[category].filter(item => item.id !== foodId);
    setDailyLog(updatedLog);
    
    toast({
      title: "Food removed",
      description: "Item removed from your food log.",
      variant: "destructive"
    });
  };
  
  // Simulate barcode scanning
  const handleBarcodeScanner = () => {
    toast({
      title: "Barcode Scanner",
      description: "Scanning for food product... (Feature simulation)",
    });
    
    // Simulate finding a product after scanning
    setTimeout(() => {
      const randomFood = sampleFoods[Math.floor(Math.random() * sampleFoods.length)];
      addFoodToLog(randomFood);
    }, 1500);
  };
  
  // Simulate voice input
  const handleVoiceInput = () => {
    toast({
      title: "Voice Input Active",
      description: "Listening for food description... (Feature simulation)",
    });
    
    // Simulate voice recognition result
    setTimeout(() => {
      const randomFood = sampleFoods[Math.floor(Math.random() * sampleFoods.length)];
      setSearchTerm(randomFood.name);
    }, 1500);
  };
  
  // Get meal icon based on category
  const getMealIcon = (category: string) => {
    switch (category) {
      case "breakfast": return <Coffee className="h-5 w-5 text-orange-500" />;
      case "lunch": return <Salad className="h-5 w-5 text-green-500" />;
      case "dinner": return <Utensils className="h-5 w-5 text-blue-500" />;
      case "snack": return <Apple className="h-5 w-5 text-red-500" />;
      default: return <Pizza className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Food & Nutrition Tracker</CardTitle>
            <CardDescription>Log meals and track your nutrition</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 flex items-center justify-center">
            <Utensils className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="log">Food Log</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {(["breakfast", "lunch", "dinner", "snack"] as const).map((category) => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`flex items-center justify-center gap-2 capitalize ${
                    selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getMealIcon(category)}
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 mt-4 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for foods..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={handleBarcodeScanner} title="Scan Barcode">
                <Scanner className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleVoiceInput} title="Voice Input">
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            
            {searchTerm && (
              <div className="border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                <p className="text-sm text-muted-foreground">Search results:</p>
                {searchFoods().length > 0 ? (
                  searchFoods().map(food => (
                    <div key={food.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{food.name}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {food.calories} cal
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            C: {food.carbs}g | P: {food.protein}g | F: {food.fat}g
                          </span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => addFoodToLog(food)}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-center py-3">No foods found. Try a different search term.</p>
                )}
              </div>
            )}
            
            <div className="mt-4">
              <h3 className="font-medium flex items-center gap-2 mb-2 capitalize">
                {getMealIcon(selectedCategory)} {selectedCategory} Items
              </h3>
              
              {dailyLog[selectedCategory].length > 0 ? (
                <div className="border rounded-lg divide-y">
                  {dailyLog[selectedCategory].map(food => (
                    <div key={food.id} className="flex items-center justify-between p-3">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{food.name}</p>
                          {food.quantity && food.quantity > 1 && (
                            <Badge variant="outline" className="ml-2">
                              x{food.quantity}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {food.calories * (food.quantity || 1)} cal
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            C: {food.carbs * (food.quantity || 1)}g | P: {food.protein * (food.quantity || 1)}g | F: {food.fat * (food.quantity || 1)}g
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                        onClick={() => removeFoodFromLog(selectedCategory, food.id)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">No {selectedCategory} items added yet.</p>
                  <Button variant="outline" className="mt-2" onClick={() => setSearchTerm("a")}>
                    <Plus className="h-4 w-4 mr-1" /> Add Food
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Daily Calories</p>
                  <div className="flex items-center">
                    <span className="font-medium text-xl">{totalCalories}</span>
                    <span className="text-sm text-muted-foreground ml-1">/ {dailyCalorieTarget} cal</span>
                  </div>
                </div>
                <Progress value={(totalCalories / dailyCalorieTarget) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{Math.round((totalCalories / dailyCalorieTarget) * 100)}% consumed</span>
                  <span>{dailyCalorieTarget}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium flex items-center text-blue-600">
                      <Badge className="mr-1 bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200">C</Badge>
                      Carbs
                    </p>
                    <span className="text-sm">{totalCarbs}g / {dailyCarbsTarget}g</span>
                  </div>
                  <Progress value={(totalCarbs / dailyCarbsTarget) * 100} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium flex items-center text-red-600">
                      <Badge className="mr-1 bg-red-100 text-red-600 hover:bg-red-200 border-red-200">P</Badge>
                      Protein
                    </p>
                    <span className="text-sm">{totalProtein}g / {dailyProteinTarget}g</span>
                  </div>
                  <Progress value={(totalProtein / dailyProteinTarget) * 100} className="h-2 bg-red-100 [&>div]:bg-red-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium flex items-center text-amber-600">
                      <Badge className="mr-1 bg-amber-100 text-amber-600 hover:bg-amber-200 border-amber-200">F</Badge>
                      Fat
                    </p>
                    <span className="text-sm">{totalFat}g / {dailyFatTarget}g</span>
                  </div>
                  <Progress value={(totalFat / dailyFatTarget) * 100} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1 text-blue-600" /> 
                  Macronutrient Distribution
                </h4>
                <div className="h-6 w-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${Math.round((totalCarbs * 4 / totalCalories) * 100) || 0}%` }}
                  ></div>
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${Math.round((totalProtein * 4 / totalCalories) * 100) || 0}%` }}
                  ></div>
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${Math.round((totalFat * 9 / totalCalories) * 100) || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-blue-600">{Math.round((totalCarbs * 4 / totalCalories) * 100) || 0}% Carbs</span>
                  <span className="text-red-600">{Math.round((totalProtein * 4 / totalCalories) * 100) || 0}% Protein</span>
                  <span className="text-amber-600">{Math.round((totalFat * 9 / totalCalories) * 100) || 0}% Fat</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(dailyLog).map(([category, foods]) => {
                  const categoryCalories = foods.reduce((sum, food) => sum + food.calories * (food.quantity || 1), 0);
                  return (
                    <Card key={category} className="border shadow-sm">
                      <CardHeader className="p-3 pb-0">
                        <CardTitle className="text-sm flex items-center capitalize">
                          {getMealIcon(category)} {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <p className="text-lg font-medium">{categoryCalories} cal</p>
                        <Progress 
                          value={(categoryCalories / dailyCalorieTarget) * 100} 
                          className="h-1.5 mt-1" 
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg space-y-1 bg-green-50 dark:bg-green-900/10">
                <h3 className="font-medium">Calorie Budget</h3>
                {totalCalories < dailyCalorieTarget ? (
                  <p className="text-sm">
                    You have {dailyCalorieTarget - totalCalories} calories remaining for today.
                  </p>
                ) : (
                  <p className="text-sm text-red-500">
                    You've exceeded your daily calorie budget by {totalCalories - dailyCalorieTarget} calories.
                  </p>
                )}
              </div>
              
              <div className="p-4 border rounded-lg space-y-1">
                <h3 className="font-medium">Smart Insights</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex">
                    <span className="text-blue-500 mr-2">•</span>
                    Your protein intake is at {Math.round((totalProtein / dailyProteinTarget) * 100)}% of your daily goal.
                  </li>
                  <li className="flex">
                    <span className="text-blue-500 mr-2">•</span>
                    At this pace, you're likely to meet your weekly nutrition targets.
                  </li>
                  <li className="flex">
                    <span className="text-blue-500 mr-2">•</span>
                    Consider adding more vegetables to increase your fiber intake.
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Recent Trends</h3>
                <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-end justify-between p-4">
                  {[1180, 1420, 1650, 1890, 2100, 1940, totalCalories].map((cal, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" 
                        style={{ height: `${(cal / dailyCalorieTarget) * 100}px`, maxHeight: '100px' }}
                      ></div>
                      <span className="text-xs mt-1">{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground">Last 7 days calorie intake</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Meal Timing
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Most calories consumed during lunch (42%)
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Droplet className="h-4 w-4 mr-1" /> Hydration
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    5 of 8 glasses consumed today
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" className="text-sm">
          View Detailed Reports
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Add New Food
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodNutritionTracker;
