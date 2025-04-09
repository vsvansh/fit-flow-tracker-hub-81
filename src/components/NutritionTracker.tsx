
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Search, Plus, Utensils, Clock, ArrowRight, 
  Droplet, Flame, BarChart2, Filter, Heart
} from "lucide-react";

// Sample data for today's nutrition
const todayNutrition = {
  calories: { consumed: 1200, goal: 2200 },
  carbs: { consumed: 135, goal: 250, unit: 'g' },
  protein: { consumed: 75, goal: 120, unit: 'g' },
  fat: { consumed: 40, goal: 70, unit: 'g' },
  water: { consumed: 5, goal: 8, unit: 'cups' }
};

// Sample food database
const foodDatabase = [
  { id: 1, name: "Apple", calories: 95, carbs: 25, protein: 0.5, fat: 0.3, serving: "1 medium" },
  { id: 2, name: "Grilled Chicken Breast", calories: 165, carbs: 0, protein: 31, fat: 3.6, serving: "3 oz" },
  { id: 3, name: "Brown Rice", calories: 215, carbs: 45, protein: 5, fat: 1.8, serving: "1 cup cooked" },
  { id: 4, name: "Avocado", calories: 240, carbs: 12, protein: 3, fat: 22, serving: "1 medium" },
  { id: 5, name: "Greek Yogurt", calories: 100, carbs: 6, protein: 17, fat: 0.5, serving: "6 oz" }
];

// Sample logged meals for today
const loggedMeals = [
  { 
    id: 1, 
    time: "7:30 AM", 
    name: "Breakfast", 
    foods: [
      { id: 5, name: "Greek Yogurt", calories: 100, carbs: 6, protein: 17, fat: 0.5, serving: "6 oz" },
      { id: 1, name: "Apple", calories: 95, carbs: 25, protein: 0.5, fat: 0.3, serving: "1 medium" }
    ],
    totalCalories: 195
  },
  { 
    id: 2, 
    time: "12:15 PM", 
    name: "Lunch", 
    foods: [
      { id: 2, name: "Grilled Chicken Breast", calories: 165, carbs: 0, protein: 31, fat: 3.6, serving: "3 oz" },
      { id: 3, name: "Brown Rice", calories: 215, carbs: 45, protein: 5, fat: 1.8, serving: "1 cup cooked" }
    ],
    totalCalories: 380
  },
  { 
    id: 3, 
    time: "3:00 PM", 
    name: "Snack", 
    foods: [
      { id: 1, name: "Apple", calories: 95, carbs: 25, protein: 0.5, fat: 0.3, serving: "1 medium" }
    ],
    totalCalories: 95
  }
];

const NutritionTracker = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState<typeof foodDatabase>([]);
  const [water, setWater] = useState(todayNutrition.water.consumed);
  const [meals, setMeals] = useState(loggedMeals);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredFoods([]);
      setShowSearchResults(false);
      return;
    }
    
    const results = foodDatabase.filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredFoods(results);
    setShowSearchResults(true);
  };

  const addFood = (food: typeof foodDatabase[0]) => {
    toast({
      title: "Food added",
      description: `Added ${food.name} to your log.`,
    });
    
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const addWater = () => {
    if (water < todayNutrition.water.goal) {
      setWater(water + 1);
      
      toast({
        title: "Water added",
        description: `You've logged ${water + 1} cups of water today.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nutrition Summary */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold flex items-center">
              <Flame className="h-5 w-5 mr-2 text-orange-500" />
              Today's Nutrition
            </CardTitle>
            <CardDescription>
              Track your daily macronutrient intake
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(todayNutrition).slice(0, 4).map(([key, data]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="capitalize">{key}</span>
                    <span>
                      {data.consumed} / {data.goal} {data.unit || ''}
                    </span>
                  </div>
                  <Progress 
                    value={(data.consumed / data.goal) * 100} 
                    className={`h-2 ${
                      key === 'calories' ? '[&>div]:bg-orange-500' :
                      key === 'carbs' ? '[&>div]:bg-blue-500' : 
                      key === 'protein' ? '[&>div]:bg-purple-500' : 
                      '[&>div]:bg-yellow-500'
                    }`}
                  />
                  <div className="flex text-xs justify-end text-gray-500 dark:text-gray-400">
                    {Math.round((data.consumed / data.goal) * 100)}% of daily goal
                  </div>
                </div>
              ))}
              
              <div className="flex items-center mt-6 justify-between">
                <Button variant="outline" className="flex gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>Nutrition Report</span>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Food
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Water and Search */}
        <div className="space-y-6">
          {/* Water Tracker */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-bold">
                  {water} <span className="text-sm text-gray-500 dark:text-gray-400">/ {todayNutrition.water.goal} cups</span>
                </div>
                <Button onClick={addWater} variant="outline" className="border-blue-300 dark:border-blue-700">
                  <Plus className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Add Water
                </Button>
              </div>
              
              <div className="relative w-full h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                  style={{ width: `${(water / todayNutrition.water.goal) * 100}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-blue-800 dark:text-blue-200 font-medium">
                  {Math.round((water / todayNutrition.water.goal) * 100)}% of daily goal
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                {Array.from({ length: todayNutrition.water.goal }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-8 w-8 rounded-full flex items-center justify-center 
                      ${i < water 
                        ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400'
                      }`}
                  >
                    <Droplet className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Food Search */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Quick Add Food</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search foods..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <Search className="h-4 w-4" />
                    </div>
                  </div>
                  <Button onClick={handleSearch}>Search</Button>
                </div>
                
                {showSearchResults && (
                  <div className="mt-3">
                    {filteredFoods.length > 0 ? (
                      <div className="border rounded-md max-h-60 overflow-y-auto">
                        {filteredFoods.map(food => (
                          <div key={food.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-between items-center border-b last:border-b-0">
                            <div>
                              <p className="font-medium">{food.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {food.calories} cal, {food.serving}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => addFood(food)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                        No foods found. Try a different search term.
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Recent</span>
                  <Button variant="link" className="h-auto p-0 text-green-600 dark:text-green-400">View All</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Chicken Breast", "Oatmeal", "Banana", "Greek Yogurt", "Eggs"].map(food => (
                    <Badge key={food} variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Today's Log */}
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Today's Food Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="meals">
            <TabsList className="w-full">
              <TabsTrigger value="meals">Meals</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="meals" className="pt-4">
              {meals.length > 0 ? (
                <div className="space-y-4">
                  {meals.map(meal => (
                    <div key={meal.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-2">
                            <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{meal.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{meal.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                          {meal.totalCalories} kcal
                        </Badge>
                      </div>
                      
                      <div className="pl-10">
                        <div className="space-y-2">
                          {meal.foods.map((food, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <div className="text-sm">
                                <span className="font-medium">{food.name}</span>
                                <span className="text-gray-500 dark:text-gray-400 ml-2">
                                  {food.serving}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {food.calories} cal
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Button variant="ghost" size="sm" className="h-8 text-green-600 dark:text-green-400 hover:text-green-700">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Food
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Meal
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Utensils className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
                  <h3 className="mt-4 font-medium">No meals logged yet</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Start logging your meals to track your nutrition
                  </p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Your First Meal
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="timeline" className="pt-4">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                
                {meals.map((meal, idx) => (
                  <div key={meal.id} className="relative pl-10 pb-6">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center z-10">
                      <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{meal.name}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {meal.time}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                          {meal.totalCalories} kcal
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {meal.foods.map((food, foodIdx) => (
                          <span key={foodIdx}>
                            {food.name}
                            {foodIdx < meal.foods.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="relative pl-10">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center z-10 border-2 border-dashed border-gray-400 dark:border-gray-500">
                    <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  
                  <Button variant="outline" className="border-dashed w-full">
                    Add Next Meal
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrients" className="pt-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Macronutrient Balance</h3>
                  <div className="flex items-center">
                    <div className="w-32 text-sm">Carbs (55%)</div>
                    <div className="flex-grow h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 dark:bg-blue-600" 
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-32 text-sm">Protein (25%)</div>
                    <div className="flex-grow h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 dark:bg-purple-600" 
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-32 text-sm">Fat (20%)</div>
                    <div className="flex-grow h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 dark:bg-yellow-600" 
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Micronutrients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Vitamin A", amount: "750μg", percent: 83 },
                      { name: "Vitamin C", amount: "45mg", percent: 50 },
                      { name: "Vitamin D", amount: "10μg", percent: 66 },
                      { name: "Calcium", amount: "800mg", percent: 61 },
                      { name: "Iron", amount: "12mg", percent: 75 },
                      { name: "Potassium", amount: "2500mg", percent: 53 }
                    ].map((nutrient, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="text-sm font-medium">{nutrient.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{nutrient.amount}</div>
                          <div className="w-16 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 dark:bg-green-600"
                              style={{ width: `${nutrient.percent}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{nutrient.percent}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    View Full Nutrition Report
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTracker;
