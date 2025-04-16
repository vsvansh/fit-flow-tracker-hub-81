
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
  Heart, Brain, Smile, Moon, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import BackToHome from "@/components/BackToHome";
import InteractiveNutritionCharts from '@/components/InteractiveNutritionCharts';

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
                    <div className="space-y-3">
                      {selectedDietPlan === 'balanced' && (
                        <>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Apple className="h-5 w-5 text-red-500 mr-3" />
                            <span>Fruits & Vegetables (5+ servings)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Egg className="h-5 w-5 text-amber-500 mr-3" />
                            <span>Lean Proteins (25% of plate)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Salad className="h-5 w-5 text-green-500 mr-3" />
                            <span>Whole Grains (25% of plate)</span>
                          </div>
                        </>
                      )}
                      
                      {selectedDietPlan === 'keto' && (
                        <>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Beef className="h-5 w-5 text-red-700 mr-3" />
                            <span>High-Fat Proteins (60-75%)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Carrot className="h-5 w-5 text-orange-500 mr-3" />
                            <span>Low-Carb Vegetables (5-10%)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <X className="h-5 w-5 text-red-500 mr-3" />
                            <span>Avoid: Grains, Sugar, Fruits</span>
                          </div>
                        </>
                      )}
                      
                      {selectedDietPlan === 'vegan' && (
                        <>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Apple className="h-5 w-5 text-red-500 mr-3" />
                            <span>Fruits & Vegetables (unlimited)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Salad className="h-5 w-5 text-green-500 mr-3" />
                            <span>Plant Proteins (legumes, tofu)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <X className="h-5 w-5 text-red-500 mr-3" />
                            <span>Avoid: Animal Products</span>
                          </div>
                        </>
                      )}
                      
                      {selectedDietPlan === 'paleo' && (
                        <>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Beef className="h-5 w-5 text-red-700 mr-3" />
                            <span>Lean Meats & Fish</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Apple className="h-5 w-5 text-red-500 mr-3" />
                            <span>Fruits & Vegetables</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <X className="h-5 w-5 text-red-500 mr-3" />
                            <span>Avoid: Grains, Dairy, Processed Foods</span>
                          </div>
                        </>
                      )}
                      
                      {selectedDietPlan === 'mediterranean' && (
                        <>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Fish className="h-5 w-5 text-blue-500 mr-3" />
                            <span>Fish & Seafood (2+ times weekly)</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <Salad className="h-5 w-5 text-green-500 mr-3" />
                            <span>Plant-based Foods, Olive Oil</span>
                          </div>
                          <div className="p-3 border rounded-lg flex items-center">
                            <X className="h-5 w-5 text-red-500 mr-3" />
                            <span>Limit: Red Meat, Processed Foods</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="analyze">
          <InteractiveNutritionCharts />
        </TabsContent>
        
        <TabsContent value="plan">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-500" />
                  <CardTitle>Weekly Meal Planning</CardTitle>
                </div>
                <CardDescription>Plan your meals for the week ahead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Meal Templates</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex items-center">
                          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-3">
                            <Activity className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">High Protein Plan</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              2500 cal, 180g protein
                            </p>
                          </div>
                        </div>
                        <Plus className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                            <Salad className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Plant-Based Plan</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              2000 cal, high fiber
                            </p>
                          </div>
                        </div>
                        <Plus className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">Performance Plan</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              3000 cal, balanced macros
                            </p>
                          </div>
                        </div>
                        <Plus className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      <Plus className="h-4 w-4 mr-1" /> Create Custom Plan
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Shopping List</h3>
                    <div className="border rounded-lg divide-y">
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 border border-gray-300 dark:border-gray-600 rounded mr-3"></div>
                          <span>Chicken Breast (1.5 lbs)</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Protein</Badge>
                      </div>
                      
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 border border-gray-300 dark:border-gray-600 rounded mr-3"></div>
                          <span>Sweet Potatoes (3)</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Carbs</Badge>
                      </div>
                      
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 border border-gray-300 dark:border-gray-600 rounded mr-3"></div>
                          <span>Avocados (2)</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Fats</Badge>
                      </div>
                      
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 border border-gray-300 dark:border-gray-600 rounded mr-3"></div>
                          <span>Spinach (1 bag)</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Vegetable</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Input placeholder="Add item..." className="w-3/4" />
                      <Button>Add</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="routine">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <CardTitle>Diet Routine</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={selectedDay === 'monday' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}
                      onClick={() => setSelectedDay('monday')}
                    >
                      Mon
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={selectedDay === 'tuesday' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}
                      onClick={() => setSelectedDay('tuesday')}
                    >
                      Tue
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={selectedDay === 'wednesday' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : ''}
                      onClick={() => setSelectedDay('wednesday')}
                    >
                      Wed
                    </Button>
                  </div>
                </div>
                <CardDescription>Your daily nutrition schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeRoutineTab} onValueChange={setActiveRoutineTab} className="space-y-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="meal-plan" className="flex-1">Meal Plan</TabsTrigger>
                    <TabsTrigger value="nutrition" className="flex-1">Nutrition</TabsTrigger>
                    <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="meal-plan" className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium flex items-center">
                            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-xs px-2 py-1 rounded mr-2">Breakfast</span>
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.meal}
                          </h3>
                          <Badge variant="outline">{dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.calories} cal</Badge>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex space-x-4">
                          <span>P: {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.protein}g</span>
                          <span>C: {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.carbs}g</span>
                          <span>F: {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.fat}g</span>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium flex items-center">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 text-xs px-2 py-1 rounded mr-2">Lunch</span>
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.meal}
                          </h3>
                          <Badge variant="outline">{dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.calories} cal</Badge>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex space-x-4">
                          <span>P: {dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.protein}g</span>
                          <span>C: {dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.carbs}g</span>
                          <span>F: {dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.fat}g</span>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium flex items-center">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs px-2 py-1 rounded mr-2">Dinner</span>
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.meal}
                          </h3>
                          <Badge variant="outline">{dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.calories} cal</Badge>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex space-x-4">
                          <span>P: {dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.protein}g</span>
                          <span>C: {dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.carbs}g</span>
                          <span>F: {dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.fat}g</span>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-sm text-gray-600 dark:text-gray-300 mt-2">Snacks</h4>
                      
                      {dietRoutines[selectedDay as keyof typeof dietRoutines].snacks.map((snack, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-sm">{snack.meal}</h3>
                            <Badge variant="outline">{snack.calories} cal</Badge>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex space-x-3">
                            <span>P: {snack.protein}g</span>
                            <span>C: {snack.carbs}g</span>
                            <span>F: {snack.fat}g</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nutrition" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-4">Daily Nutrition Totals</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Calories</span>
                              <span className="text-sm">
                                {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.calories + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.calories + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.calories +
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].snacks.reduce((sum, item) => sum + item.calories, 0)
                                } / 2200
                              </span>
                            </div>
                            <Progress value={90} />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Protein</span>
                              <span className="text-sm">
                                {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.protein + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.protein + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.protein +
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].snacks.reduce((sum, item) => sum + item.protein, 0)
                                }g / 120g
                              </span>
                            </div>
                            <Progress value={80} className="bg-blue-100 dark:bg-blue-900/30 [&>div]:bg-blue-500" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Carbs</span>
                              <span className="text-sm">
                                {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.carbs + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.carbs + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.carbs +
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].snacks.reduce((sum, item) => sum + item.carbs, 0)
                                }g / 250g
                              </span>
                            </div>
                            <Progress value={75} className="bg-amber-100 dark:bg-amber-900/30 [&>div]:bg-amber-500" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Fat</span>
                              <span className="text-sm">
                                {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.fat + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.fat + 
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.fat +
                                  dietRoutines[selectedDay as keyof typeof dietRoutines].snacks.reduce((sum, item) => sum + item.fat, 0)
                                }g / 70g
                              </span>
                            </div>
                            <Progress value={85} className="bg-purple-100 dark:bg-purple-900/30 [&>div]:bg-purple-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border rounded-lg">
                        <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                          7AM
                        </div>
                        <div>
                          <h4 className="font-medium">Breakfast</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].breakfast.meal}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 border rounded-lg">
                        <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                          10AM
                        </div>
                        <div>
                          <h4 className="font-medium">Morning Snack</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].snacks[0].meal}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 border rounded-lg">
                        <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                          1PM
                        </div>
                        <div>
                          <h4 className="font-medium">Lunch</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].lunch.meal}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 border rounded-lg">
                        <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                          4PM
                        </div>
                        <div>
                          <h4 className="font-medium">Afternoon Snack</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].snacks[1].meal}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 border rounded-lg">
                        <div className="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                          7PM
                        </div>
                        <div>
                          <h4 className="font-medium">Dinner</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dietRoutines[selectedDay as keyof typeof dietRoutines].dinner.meal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <CardTitle>Nutrition Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3 flex-shrink-0">
                      <Info className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Protein Intake Analysis</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        Your protein intake has been consistently higher than recommended for your goals. Consider reducing slightly and increasing complex carbohydrates.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex">
                    <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-full mr-3 flex-shrink-0">
                      <Activity className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">Meal Timing</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                        You tend to consume most of your calories in the evening. Consider a more balanced distribution throughout the day for better energy levels.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3 flex-shrink-0">
                      <Heart className="h-4 w-4 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-300">Nutrient Balance</h4>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                        Your diet is rich in vitamins A and C but could benefit from more vitamin D and calcium sources for improved long-term health outcomes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex">
                    <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full mr-3 flex-shrink-0">
                      <Droplets className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-800 dark:text-purple-300">Hydration Status</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                        Your water intake is below the recommended level. Aim for at least 8 glasses per day, especially on workout days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Smile className="h-5 w-5 text-green-500" />
                    <CardTitle>Health Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Increase Omega-3 Intake</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add fatty fish like salmon or sardines twice weekly, or consider a supplement.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Add More Fiber</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Include more beans, whole grains, and vegetables to reach 25-30g daily.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Optimize Pre-Workout Nutrition</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Consume a balanced meal with carbs and protein about 1-2 hours before exercise.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Vitamin D Supplementation</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Consider a vitamin D supplement during winter months or if sun exposure is limited.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                        <Moon className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Evening Nutrition Strategy</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Avoid heavy meals within 2 hours of bedtime for better sleep quality.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
