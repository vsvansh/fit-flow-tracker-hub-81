import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { 
  PlusCircle, Trash2, Search, ArrowDown, Check, X, Apple, Carrot, Beef, Coffee, Pizza, 
  Egg, Fish, Salad, Clock, Plus, Utensils, Activity, BarChart2, LineChart, Zap, Droplets,
  Heart, Brain, Smile, Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import BackToHome from "@/components/BackToHome";

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

const Nutrition = () => {
  const [showNewFeatures, setShowNewFeatures] = useState(false);
  const [mealItems, setMealItems] = useState<MealItem[]>([
    {
      id: '1',
      name: 'Oatmeal with Berries',
      calories: 320,
      protein: 12,
      carbs: 58,
      fat: 6,
      timestamp: '2025-04-10T08:30:00',
      category: 'breakfast'
    },
    {
      id: '2',
      name: 'Chicken Salad',
      calories: 450,
      protein: 35,
      carbs: 25,
      fat: 22,
      timestamp: '2025-04-10T12:30:00',
      category: 'lunch'
    },
    {
      id: '3',
      name: 'Protein Bar',
      calories: 220,
      protein: 18,
      carbs: 24,
      fat: 8,
      timestamp: '2025-04-10T16:00:00',
      category: 'snack'
    }
  ]);
  
  // Food database
  const foodDatabase: FoodItem[] = [
    { id: '1', name: 'Chicken Breast (4oz)', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '4 oz' },
    { id: '2', name: 'Brown Rice (1 cup)', calories: 215, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup' },
    { id: '3', name: 'Avocado (1/2)', calories: 160, protein: 2, carbs: 8, fat: 15, serving: '1/2 fruit' },
    { id: '4', name: 'Oatmeal (1 cup)', calories: 166, protein: 6, carbs: 28, fat: 3, serving: '1 cup' },
    { id: '5', name: 'Salmon (4oz)', calories: 233, protein: 25, carbs: 0, fat: 15, serving: '4 oz' },
    { id: '6', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium' },
    { id: '7', name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.5, serving: '3/4 cup' },
    { id: '8', name: 'Almonds', calories: 160, protein: 6, carbs: 6, fat: 14, serving: '1 oz (23 almonds)' },
    { id: '9', name: 'Sweet Potato', calories: 112, protein: 2, carbs: 26, fat: 0, serving: '1 medium' },
    { id: '10', name: 'Spinach (raw)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, serving: '1 cup' }
  ];
  
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  
  // Diet plan types for the new features
  const dietPlans = [
    { id: 'balanced', name: 'Balanced Diet', description: 'A balanced approach to nutrition with all food groups', calorieRange: '2000-2500' },
    { id: 'keto', name: 'Ketogenic', description: 'High-fat, adequate-protein, low-carb diet', calorieRange: '1800-2200' },
    { id: 'vegan', name: 'Vegan', description: 'Plant-based diet with no animal products', calorieRange: '1800-2300' },
    { id: 'paleo', name: 'Paleo', description: 'Based on foods similar to what might have been eaten during the Paleolithic era', calorieRange: '1900-2400' },
    { id: 'mediterranean', name: 'Mediterranean', description: 'Based on the traditional cuisines of Mediterranean countries', calorieRange: '2000-2500' }
  ];
  
  const [selectedDietPlan, setSelectedDietPlan] = useState('balanced');
  
  // Water tracking state
  const [waterIntake, setWaterIntake] = useState(4);
  const waterGoal = 8;
  
  // Daily nutritional goals
  const nutritionGoals = {
    calories: 2200,
    protein: 120,
    carbs: 250,
    fat: 70
  };

  // New analysis tab states
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('macros');
  const [activeTrendsTimeframe, setActiveTrendsTimeframe] = useState('week');
  
  // Diet routine state
  const [selectedDay, setSelectedDay] = useState('monday');
  const [activeRoutineTab, setActiveRoutineTab] = useState('meal-plan');

  // Calculate totals from meal items
  const calculateTotals = () => {
    return mealItems.reduce((acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fat += item.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };
  
  const totals = calculateTotals();
  
  // Handle food search
  useEffect(() => {
    if (searchTerm.length > 1) {
      setFilteredFoods(foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredFoods([]);
    }
  }, [searchTerm]);
  
  // Add meal item
  const addMealItem = (food: FoodItem, category: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const newMealItem: MealItem = {
      id: Date.now().toString(),
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      timestamp: new Date().toISOString(),
      category
    };
    
    setMealItems([...mealItems, newMealItem]);
    setSearchTerm('');
    setFilteredFoods([]);
    
    toast({
      title: "Food Added",
      description: `${food.name} added to your ${category}`,
    });
  };
  
  // Remove meal item
  const removeMealItem = (id: string) => {
    setMealItems(mealItems.filter(item => item.id !== id));
    
    toast({
      title: "Food Removed",
      description: "The food item has been removed from your log.",
      variant: "destructive"
    });
  };
  
  // Add water
  const addWater = () => {
    if (waterIntake < waterGoal) {
      setWaterIntake(waterIntake + 1);
      toast({
        title: "Water Added",
        description: `${waterIntake + 1} of ${waterGoal} glasses consumed`,
      });
    }
  };
  
  // Generate meal plan based on selected diet
  const generateMealPlan = () => {
    toast({
      title: "Meal Plan Generated",
      description: `Your ${dietPlans.find(plan => plan.id === selectedDietPlan)?.name} plan has been created.`,
    });
  };

  // Sample weekly nutrition data for trends
  const weeklyNutritionData = [
    { day: 'Mon', calories: 1850, protein: 95, carbs: 220, fat: 65 },
    { day: 'Tue', calories: 2100, protein: 110, carbs: 240, fat: 70 },
    { day: 'Wed', calories: 1950, protein: 105, carbs: 230, fat: 68 },
    { day: 'Thu', calories: 2200, protein: 115, carbs: 250, fat: 73 },
    { day: 'Fri', calories: 1850, protein: 100, carbs: 215, fat: 64 },
    { day: 'Sat', calories: 2050, protein: 108, carbs: 235, fat: 69 },
    { day: 'Sun', calories: totals.calories, protein: totals.protein, carbs: totals.carbs, fat: totals.fat },
  ];

  // Sample micronutrient data
  const micronutrientData = [
    { name: 'Vitamin A', value: 65, goal: 100, unit: 'mcg' },
    { name: 'Vitamin C', value: 85, goal: 100, unit: 'mg' },
    { name: 'Vitamin D', value: 45, goal: 100, unit: 'mcg' },
    { name: 'Calcium', value: 70, goal: 100, unit: 'mg' },
    { name: 'Iron', value: 60, goal: 100, unit: 'mg' },
    { name: 'Potassium', value: 55, goal: 100, unit: 'mg' },
    { name: 'Magnesium', value: 65, goal: 100, unit: 'mg' },
  ];

  // Diet routines data
  const dietRoutines = {
    monday: {
      breakfast: { meal: 'Oatmeal with berries and nuts', calories: 420, protein: 15, carbs: 65, fat: 10 },
      lunch: { meal: 'Grilled chicken salad with avocado', calories: 580, protein: 40, carbs: 25, fat: 32 },
      dinner: { meal: 'Baked salmon with roasted vegetables', calories: 650, protein: 38, carbs: 35, fat: 38 },
      snacks: [
        { meal: 'Greek yogurt with honey', calories: 150, protein: 15, carbs: 12, fat: 0 },
        { meal: 'Apple with almond butter', calories: 200, protein: 5, carbs: 25, fat: 10 }
      ]
    },
    tuesday: {
      breakfast: { meal: 'Green smoothie with protein powder', calories: 380, protein: 25, carbs: 45, fat: 8 },
      lunch: { meal: 'Quinoa bowl with roasted vegetables', calories: 520, protein: 25, carbs: 70, fat: 18 },
      dinner: { meal: 'Lean beef stir fry with brown rice', calories: 680, protein: 45, carbs: 65, fat: 20 },
      snacks: [
        { meal: 'Protein bar', calories: 220, protein: 20, carbs: 25, fat: 7 },
        { meal: 'Mixed nuts', calories: 180, protein: 6, carbs: 5, fat: 16 }
      ]
    },
    wednesday: {
      breakfast: { meal: 'Egg white omelet with vegetables', calories: 340, protein: 28, carbs: 15, fat: 18 },
      lunch: { meal: 'Turkey and avocado wrap', calories: 560, protein: 35, carbs: 45, fat: 25 },
      dinner: { meal: 'Baked chicken with sweet potato', calories: 620, protein: 42, carbs: 55, fat: 22 },
      snacks: [
        { meal: 'Cottage cheese with berries', calories: 180, protein: 24, carbs: 10, fat: 3 },
        { meal: 'Rice cakes with peanut butter', calories: 210, protein: 7, carbs: 22, fat: 12 }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <BackToHome className="mb-4" />
      
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Nutrition Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your meals and nutritional intake
            </p>
          </div>
          
          <div className="flex items-center">
            <Label htmlFor="feature-toggle" className="mr-2">Show New Features</Label>
            <Switch 
              id="feature-toggle" 
              checked={showNewFeatures} 
              onCheckedChange={setShowNewFeatures} 
            />
          </div>
        </div>
      </motion.div>
      
      <Tabs defaultValue="track" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="analyze">Analyze</TabsTrigger>
          <TabsTrigger value="plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="routine">Diet Routine</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="track">
          {!showNewFeatures ? (
            /* Original Nutrition Page */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="col-span-1 md:col-span-3">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Today's Meals</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        {totals.calories} / {nutritionGoals.calories} cal
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="breakfast" className="space-y-4">
                      <TabsList>
                        <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                        <TabsTrigger value="lunch">Lunch</TabsTrigger>
                        <TabsTrigger value="dinner">Dinner</TabsTrigger>
                        <TabsTrigger value="snack">Snacks</TabsTrigger>
                      </TabsList>
                      
                      {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                        <TabsContent key={mealType} value={mealType} className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input 
                              placeholder={`Search and add food to ${mealType}`}
                              className="pl-10"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                            {filteredFoods.length > 0 && (
                              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-auto">
                                {filteredFoods.map(food => (
                                  <div 
                                    key={food.id}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                                    onClick={() => addMealItem(food, mealType as any)}
                                  >
                                    <div>
                                      <div className="font-medium">{food.name}</div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {food.calories} cal | {food.serving}
                                      </div>
                                    </div>
                                    <PlusCircle className="h-5 w-5 text-green-500" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            {mealItems
                              .filter(item => item.category === mealType)
                              .map(item => (
                                <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 flex space-x-3">
                                      <span>{item.calories} cal</span>
                                      <span>P: {item.protein}g</span>
                                      <span>C: {item.carbs}g</span>
                                      <span>F: {item.fat}g</span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeMealItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              ))}
                              
                            {mealItems.filter(item => item.category === mealType).length === 0 && (
                              <div className="text-center py-8 border border-dashed rounded-lg border-gray-300 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400">No {mealType} items added yet</p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => setSearchTerm(`Example ${mealType}`)}
                                >
                                  <PlusCircle className="h-4 w-4 mr-1" /> Add Food Item
                                </Button>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Daily Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Calories</span>
                            <span className="text-sm">{totals.calories} / {nutritionGoals.calories}</span>
                          </div>
                          <Progress value={(totals.calories / nutritionGoals.calories) * 100} />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Protein</span>
                            <span className="text-sm">{totals.protein}g / {nutritionGoals.protein}g</span>
                          </div>
                          <Progress 
                            value={(totals.protein / nutritionGoals.protein) * 100}
                            className="bg-blue-100 dark:bg-blue-900/30 [&>div]:bg-blue-500"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Carbs</span>
                            <span className="text-sm">{totals.carbs}g / {nutritionGoals.carbs}g</span>
                          </div>
                          <Progress 
                            value={(totals.carbs / nutritionGoals.carbs) * 100}
                            className="bg-amber-100 dark:bg-amber-900/30 [&>div]:bg-amber-500"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Fat</span>
                            <span className="text-sm">{totals.fat}g / {nutritionGoals.fat}g</span>
                          </div>
                          <Progress 
                            value={(totals.fat / nutritionGoals.fat) * 100}
                            className="bg-red-100 dark:bg-red-900/30 [&>div]:bg-red-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <div className="w-5 h-5 rounded-full bg-blue-500 mr-2"></div>
                        Water Tracker
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center">
                        <div className="grid grid-cols-4 gap-2">
                          {Array.from({ length: waterGoal }).map((_, index) => (
                            <div 
                              key={index}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index < waterIntake ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                              }`}
                            >
                              {index < waterIntake ? <Check className="h-4 w-4" /> : index + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline" onClick={addWater} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          Add Glass
                        </Button>
                        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                          {waterIntake} of {waterGoal} glasses
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-medium mb-1">Macronutrient Ratio</h3>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex mt-2">
                        <div 
                          style={{ width: `${(totals.protein * 4 / (totals.calories || 1)) * 100}%` }}
                          className="h-full bg-blue-500"
                        ></div>
                        <div 
                          style={{ width: `${(totals.carbs * 4 / (totals.calories || 1)) * 100}%` }}
                          className="h-full bg-amber-500"
                        ></div>
                        <div 
                          style={{ width: `${(totals.fat * 9 / (totals.calories || 1)) * 100}%` }}
                          className="h-full bg-red-500"
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Protein {Math.round((totals.protein * 4 / (totals.calories || 1)) * 100)}%</span>
                        <span>Carbs {Math.round((totals.carbs * 4 / (totals.calories || 1)) * 100)}%</span>
                        <span>Fat {Math.round((totals.fat * 9 / (totals.calories || 1)) * 100)}%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-medium mb-1">Calorie Balance</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium">{nutritionGoals.calories - totals.calories}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">calories remaining</p>
                        </div>
                        <ArrowDown className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                          <span>Goal</span>
                          <span>{nutritionGoals.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food</span>
                          <span>- {totals.calories}</span>
                        </div>
                        <div className="flex justify-between border-t mt-1 pt-1">
                          <span>Remaining</span>
                          <span>{nutritionGoals.calories - totals.calories}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h3 className="font-medium mb-1">Weekly Trend</h3>
                      <div className="flex items-end justify-between h-20 mt-2">
                        {[1800, 2100, 1950, 2200, 1850, 2050, totals.calories].map((cal, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div 
                              className={`w-6 rounded-t-sm ${i === 6 ? 'bg-purple-500' : 'bg-purple-300 dark:bg-purple-700'}`} 
                              style={{ height: `${(cal / 2500) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* New Features */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Meal Planning</CardTitle>
                    <CardDescription>Create and manage your personalized meal plans</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Select Diet Type</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {dietPlans.map((plan) => (
                            <div
                              key={plan.id}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                selectedDietPlan === plan.id
                                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                  : "hover:border-green-300 dark:hover:border-green-700"
                              }`}
                              onClick={() => setSelectedDietPlan(plan.id)}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{plan.name}</h4>
                                {selectedDietPlan === plan.id && (
                                  <Check className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {plan.description}
                              </p>
                              <p className="text-xs mt-1">
                                <Badge variant="outline" className="font-normal">
                                  {plan.calorieRange} calories
                                </Badge>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Diet Features</h3>
                        
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Auto Calorie Calculation</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Based on your activity level and goals
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Macro Distribution</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Optimized macronutrient ratio for your diet type
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Weekly Meal Planner</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Get a full week of planned meals
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">Shopping List</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Auto-generated shopping list for ingredients
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white" 
                          onClick={generateMealPlan}
                        >
                          Generate Meal Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Food Categories</CardTitle>
                    <CardDescription>Recommended foods for your selected diet</CardDescription>
                  </CardHeader>
                  <CardContent>
