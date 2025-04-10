
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Apple, Utensils, PlusCircle, Filter, BarChart, FileText, Heart } from "lucide-react";
import BackToHome from "@/components/BackToHome";
import NutritionJournal from "@/components/NutritionJournal";
import NutritionInsights from "@/components/NutritionInsights";
import { motion } from "framer-motion";

interface NutritionLog {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  category: string;
}

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  frequency?: string;
  isFavorite?: boolean;
}

const Nutrition = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Nutrition goals
  const nutritionGoals = {
    calories: { current: 1750, target: 2000 },
    protein: { current: 130, target: 150 },
    carbs: { current: 220, target: 250 },
    fat: { current: 55, target: 65 }
  };
  
  // Sample food data
  const foodLog: NutritionLog[] = [
    { id: 1, name: "Breakfast - Oatmeal with Berries", calories: 320, protein: 12, carbs: 45, fat: 8, time: "7:30 AM", category: "breakfast" },
    { id: 2, name: "Morning Snack - Greek Yogurt", calories: 150, protein: 15, carbs: 8, fat: 3, time: "10:15 AM", category: "snack" },
    { id: 3, name: "Lunch - Grilled Chicken Salad", calories: 410, protein: 38, carbs: 25, fat: 18, time: "12:30 PM", category: "lunch" },
    { id: 4, name: "Afternoon Snack - Apple with Almond Butter", calories: 220, protein: 5, carbs: 22, fat: 12, time: "3:45 PM", category: "snack" },
    { id: 5, name: "Dinner - Salmon with Quinoa and Vegetables", calories: 650, protein: 45, carbs: 60, fat: 25, time: "7:00 PM", category: "dinner" },
  ];
  
  // Frequently eaten foods
  const frequentFoods: FoodItem[] = [
    { id: 1, name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 3, category: "breakfast", frequency: "5x this week" },
    { id: 2, name: "Greek Yogurt", calories: 100, protein: 15, carbs: 6, fat: 0, category: "snack", frequency: "4x this week" },
    { id: 3, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, category: "protein", frequency: "3x this week" },
    { id: 4, name: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 22, category: "fats", frequency: "3x this week" },
    { id: 5, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: "fruit", frequency: "3x this week" },
  ];
  
  // Favorite foods
  const favoriteFoods: FoodItem[] = [
    { id: 1, name: "Salmon Fillet", calories: 206, protein: 22, carbs: 0, fat: 13, category: "protein", isFavorite: true },
    { id: 2, name: "Sweet Potato", calories: 180, protein: 4, carbs: 41, fat: 0.2, category: "carbs", isFavorite: true },
    { id: 3, name: "Almond Butter", calories: 98, protein: 3.4, carbs: 3, fat: 8.9, category: "fats", isFavorite: true },
    { id: 4, name: "Blueberries", calories: 85, protein: 1.1, carbs: 21, fat: 0.5, category: "fruit", isFavorite: true },
  ];
  
  // Calculate total nutrition for the day
  const dailyTotals = foodLog.reduce((acc, food) => {
    acc.calories += food.calories;
    acc.protein += food.protein;
    acc.carbs += food.carbs;
    acc.fat += food.fat;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  
  // Calculate percentage of goals
  const percentages = {
    calories: Math.round((dailyTotals.calories / nutritionGoals.calories.target) * 100),
    protein: Math.round((dailyTotals.protein / nutritionGoals.protein.target) * 100),
    carbs: Math.round((dailyTotals.carbs / nutritionGoals.carbs.target) * 100),
    fat: Math.round((dailyTotals.fat / nutritionGoals.fat.target) * 100)
  };
  
  // Calculate macro distribution for the day (as percentages)
  const caloriesFromProtein = dailyTotals.protein * 4;
  const caloriesFromCarbs = dailyTotals.carbs * 4;
  const caloriesFromFat = dailyTotals.fat * 9;
  const totalCalories = caloriesFromProtein + caloriesFromCarbs + caloriesFromFat;
  
  const macroDistribution = {
    protein: Math.round((caloriesFromProtein / totalCalories) * 100) || 0,
    carbs: Math.round((caloriesFromCarbs / totalCalories) * 100) || 0,
    fat: Math.round((caloriesFromFat / totalCalories) * 100) || 0
  };
  
  // Food category colors
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "breakfast": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "lunch": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "dinner": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "snack": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "protein": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "carbs": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "fats": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "fruit": return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
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
        <h1 className="text-3xl font-bold mb-2 gradient-text">Nutrition Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your nutrition, track meals, and achieve your health goals
        </p>
      </motion.div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="log">Food Log</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
          </TabsList>
          
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span>Report</span>
            </Button>
            <Button size="sm" className="flex items-center gap-1.5">
              <PlusCircle className="h-4 w-4" />
              <span>Add Food</span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mb-2">
                  <Utensils className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">{dailyTotals.calories}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">calories</span>
                  <Badge variant="outline" className="text-xs">
                    {percentages.calories}% of goal
                  </Badge>
                </div>
                <Progress 
                  value={percentages.calories} 
                  className="h-1.5 mt-2 w-full max-w-[120px]" 
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full mb-2">
                  <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold">{dailyTotals.protein}g</h3>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">protein</span>
                  <Badge variant="outline" className="text-xs">
                    {percentages.protein}% of goal
                  </Badge>
                </div>
                <Progress 
                  value={percentages.protein} 
                  className="h-1.5 mt-2 w-full max-w-[120px]" 
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-full mb-2">
                  <Apple className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold">{dailyTotals.carbs}g</h3>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">carbs</span>
                  <Badge variant="outline" className="text-xs">
                    {percentages.carbs}% of goal
                  </Badge>
                </div>
                <Progress 
                  value={percentages.carbs} 
                  className="h-1.5 mt-2 w-full max-w-[120px]" 
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full mb-2">
                  <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">{dailyTotals.fat}g</h3>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">fat</span>
                  <Badge variant="outline" className="text-xs">
                    {percentages.fat}% of goal
                  </Badge>
                </div>
                <Progress 
                  value={percentages.fat} 
                  className="h-1.5 mt-2 w-full max-w-[120px]" 
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Meals</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-3">
                  {foodLog.map((food) => (
                    <div key={food.id} className="flex justify-between items-start p-3 border rounded-lg">
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-3">
                          <div className="text-xs text-gray-500">{food.time}</div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{food.name}</h4>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className={`text-xs ${getCategoryColor(food.category)}`}>
                              {food.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{food.calories} cal</div>
                        <div className="text-xs text-gray-500">
                          P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Food
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Macronutrient Distribution</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Protein ({macroDistribution.protein}%)</span>
                    <span className="text-sm text-gray-500">{dailyTotals.protein}g / {nutritionGoals.protein.target}g</span>
                  </div>
                  <Progress value={percentages.protein} className="h-2 mb-4" />
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Carbs ({macroDistribution.carbs}%)</span>
                    <span className="text-sm text-gray-500">{dailyTotals.carbs}g / {nutritionGoals.carbs.target}g</span>
                  </div>
                  <Progress value={percentages.carbs} className="h-2 mb-4" />
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Fat ({macroDistribution.fat}%)</span>
                    <span className="text-sm text-gray-500">{dailyTotals.fat}g / {nutritionGoals.fat.target}g</span>
                  </div>
                  <Progress value={percentages.fat} className="h-2" />
                  
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your current macronutrient ratio is {macroDistribution.protein}/{macroDistribution.carbs}/{macroDistribution.fat} 
                      (protein/carbs/fat). Your target is 30/45/25.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Add Favorites</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {favoriteFoods.map((food) => (
                      <div key={food.id} className="flex justify-between items-center p-2 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{food.name}</h4>
                          <p className="text-xs text-gray-500">{food.calories} cal</p>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <PlusCircle className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <NutritionInsights />
        </TabsContent>
        
        <TabsContent value="log" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search foods..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Food
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Foods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {frequentFoods.map((food) => (
                    <div key={food.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${getCategoryColor(food.category)} flex items-center justify-center mr-3`}>
                          <Apple className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{food.name}</h4>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs mr-2">
                              {food.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{food.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{food.calories} cal</div>
                        <div className="text-xs text-gray-500">
                          P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Meal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Today's Meal Plan</h3>
                    <div className="space-y-3">
                      {["Breakfast", "Morning Snack", "Lunch", "Afternoon Snack", "Dinner"].map((meal, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Badge variant="outline" className={`mr-2 ${getCategoryColor(meal.toLowerCase())}`}>
                              {meal}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Track Water Intake</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm mb-1">Today's water intake</p>
                        <Progress value={60} className="h-2 w-40" />
                        <p className="text-xs text-gray-500 mt-1">1.5 / 2.5 liters</p>
                      </div>
                      <Button size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Water
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="journal" className="space-y-6">
          <NutritionJournal />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
