
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/Switch";
import {
  Apple, Coffee, Droplet, PlusCircle, Utensils, FileText,
  BarChart, ChevronRight, Clock, CalendarDays, ArrowRight,
  ArrowUp, ArrowDown, Info, Filter, Flame, Carrot, Cherry,
  Beef, Egg, Bookmark, Plus, RefreshCcw, Layers
} from "lucide-react";
import BackToHome from "@/components/BackToHome";
import NutritionTracker from "@/components/NutritionTracker";
import FoodJournal from "@/components/FoodJournal";
import MealPlanner from "@/components/MealPlanner";
import NutrientInsights from "@/components/NutrientInsights";
import NutritionGoals from "@/components/NutritionGoals";
import { motion } from "framer-motion";

const macroData = {
  calories: { current: 1850, goal: 2200, unit: "kcal" },
  protein: { current: 85, goal: 110, unit: "g" },
  carbs: { current: 210, goal: 250, unit: "g" },
  fat: { current: 65, goal: 70, unit: "g" }
};

const recentMeals = [
  {
    id: 1,
    name: "Breakfast",
    time: "7:30 AM",
    calories: 420,
    items: ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
  },
  {
    id: 2,
    name: "Morning Snack",
    time: "10:15 AM",
    calories: 180,
    items: ["Apple", "Handful of almonds"]
  },
  {
    id: 3,
    name: "Lunch",
    time: "12:45 PM",
    calories: 650,
    items: ["Grilled chicken salad", "Whole grain bread", "Sparkling water"]
  }
];

const waterIntake = {
  current: 5,
  goal: 8,
  unit: 'cups'
};

const nutrientData = [
  { name: 'Vitamin C', value: 85, goal: 90, unit: 'mg' },
  { name: 'Calcium', value: 750, goal: 1000, unit: 'mg' },
  { name: 'Iron', value: 12, goal: 18, unit: 'mg' },
  { name: 'Fiber', value: 22, goal: 25, unit: 'g' }
];

const Nutrition = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'classic' | 'new'>('classic');
  const [activeTab, setActiveTab] = useState('overview');

  const toggleViewMode = () => {
    setViewMode(viewMode === 'classic' ? 'new' : 'classic');
    toast({
      title: `Switched to ${viewMode === 'classic' ? 'new' : 'classic'} view`,
      description: `Now showing the ${viewMode === 'classic' ? 'new' : 'classic'} nutrition interface.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      <BackToHome className="mb-4" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Nutrition Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your food intake, plan meals, and achieve your nutrition goals
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-3 rounded-full shadow-md">
          <span className={`text-sm font-medium transition-colors ${viewMode === 'classic' ? 'text-green-800 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'}`}>
            Classic View
          </span>
          <Switch
            checked={viewMode === 'new'}
            onCheckedChange={toggleViewMode}
            size="lg"
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-600 data-[state=checked]:to-emerald-500 data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-gray-400 data-[state=unchecked]:to-gray-300 relative overflow-hidden group"
          />
          <span className={`text-sm font-medium transition-colors ${viewMode === 'new' ? 'text-green-800 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'}`}>
            New Interface
          </span>
          
          <div className="absolute inset-0 -z-10 bg-green-300 dark:bg-green-700 opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-700"></div>
        </div>
      </div>
      
      {viewMode === 'classic' ? (
        <ClassicNutritionView activeTab={activeTab} setActiveTab={setActiveTab} />
      ) : (
        <NewNutritionView />
      )}
    </div>
  );
};

const ClassicNutritionView = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const { toast } = useToast();
  const [water, setWater] = useState(waterIntake.current);
  
  const addWater = () => {
    if (water < waterIntake.goal) {
      setWater(water + 1);
      toast({
        title: "Water intake updated",
        description: `You've logged ${water + 1} cups of water today.`,
      });
    }
  };

  const handleViewFullWeekPlan = () => {
    toast({
      title: "Full Week Plan",
      description: "Viewing your complete meal plan for the week.",
    });
  };

  const handleCustomizeMealPlan = () => {
    toast({
      title: "Customize Meal Plan",
      description: "Opening meal plan customization options.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(macroData).map(([key, data]) => (
          <Card key={key} className="shadow hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                  {key === 'calories' && <Flame className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {key === 'protein' && <Beef className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {key === 'carbs' && <Apple className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {key === 'fat' && <Egg className="h-5 w-5 text-green-600 dark:text-green-400" />}
                </div>
                <h3 className="text-lg font-medium capitalize mb-1">{key}</h3>
                <div className="text-3xl font-bold mb-2">
                  {data.current}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    {data.unit}
                  </span>
                </div>
                <Progress 
                  value={(data.current / data.goal) * 100} 
                  className="h-2 w-full mb-1"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {data.current} / {data.goal} {data.unit}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <FileText className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Food Journal
              </CardTitle>
              <CardDescription>
                Recent meals and daily intake
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeals.map(meal => (
                  <div key={meal.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
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
                        {meal.calories} kcal
                      </Badge>
                    </div>
                    <div className="pl-10">
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {meal.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    toast({
                      title: "Log New Meal",
                      description: "Opening form to log a new meal."
                    });
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Log New Meal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Droplet className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Water Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-bold">
                  {water} <span className="text-sm text-gray-500 dark:text-gray-400">/ {waterIntake.goal} cups</span>
                </div>
                <Button onClick={addWater} variant="outline" className="border-blue-300 dark:border-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Add Water
                </Button>
              </div>
              
              <div className="relative w-full h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                  style={{ width: `${(water / waterIntake.goal) * 100}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-blue-800 dark:text-blue-200 font-medium">
                  {Math.round((water / waterIntake.goal) * 100)}% of daily goal
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                {Array.from({ length: waterIntake.goal }).map((_, i) => (
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
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Try to drink 8 cups of water daily for optimal hydration.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                Micronutrients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nutrientData.map(nutrient => (
                  <div key={nutrient.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{nutrient.name}</span>
                      <span>
                        {nutrient.value} / {nutrient.goal} {nutrient.unit}
                      </span>
                    </div>
                    <Progress 
                      value={(nutrient.value / nutrient.goal) * 100} 
                      className={`h-2 ${
                        nutrient.name === 'Vitamin C' ? '[&>div]:bg-orange-500' :
                        nutrient.name === 'Calcium' ? '[&>div]:bg-blue-500' :
                        nutrient.name === 'Iron' ? '[&>div]:bg-red-500' :
                        '[&>div]:bg-green-500'
                      }`}
                    />
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => {
                  toast({
                    title: "Nutrient Analysis",
                    description: "Opening detailed nutrient analysis."
                  });
                }}
              >
                <Info className="mr-2 h-4 w-4" />
                Detailed Nutrient Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChevronRight className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Nutrition Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Daily Intake Breakdown</h3>
                  <div className="h-40 w-40 mx-auto relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd" strokeWidth="20" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="50.24" transform="rotate(-90 50 50)" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="125.6" transform="rotate(-90 50 50)" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="188.4" transform="rotate(-90 50 50)" />
                      <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="currentColor" className="text-sm font-medium">
                        1850/2200
                      </text>
                    </svg>
                  </div>
                  <div className="flex justify-center mt-4 space-x-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-xs">Carbs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs">Protein</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-xs">Fat</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Weekly Trends</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-24 text-sm">Calories</div>
                      <div className="flex-grow h-8 bg-gray-100 dark:bg-gray-800 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full bg-green-200 dark:bg-green-900/40 rounded-full" style={{ width: '80%' }}></div>
                        <div className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-600 rounded-full" style={{ width: '70%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs text-gray-700 dark:text-gray-300">1850 / 2200 avg</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-24 text-sm">Protein</div>
                      <div className="flex-grow h-8 bg-gray-100 dark:bg-gray-800 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full bg-blue-200 dark:bg-blue-900/40 rounded-full" style={{ width: '85%' }}></div>
                        <div className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs text-gray-700 dark:text-gray-300">85g / 110g avg</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-24 text-sm">Carbs</div>
                      <div className="flex-grow h-8 bg-gray-100 dark:bg-gray-800 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full bg-purple-200 dark:bg-purple-900/40 rounded-full" style={{ width: '90%' }}></div>
                        <div className="absolute top-0 left-0 h-full bg-purple-500 dark:bg-purple-600 rounded-full" style={{ width: '85%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs text-gray-700 dark:text-gray-300">210g / 250g avg</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-24 text-sm">Fat</div>
                      <div className="flex-grow h-8 bg-gray-100 dark:bg-gray-800 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full bg-yellow-200 dark:bg-yellow-900/40 rounded-full" style={{ width: '95%' }}></div>
                        <div className="absolute top-0 left-0 h-full bg-yellow-500 dark:bg-yellow-600 rounded-full" style={{ width: '90%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs text-gray-700 dark:text-gray-300">65g / 70g avg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Upcoming Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { meal: "Breakfast", time: "7:30 AM", content: "Avocado toast with eggs", calories: 450 },
                  { meal: "Lunch", time: "12:30 PM", content: "Quinoa bowl with vegetables", calories: 580 },
                  { meal: "Dinner", time: "6:30 PM", content: "Grilled salmon with sweet potatoes", calories: 620 }
                ].map((meal, idx) => (
                  <Card key={idx} className="shadow-sm border">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{meal.meal}</h3>
                          <Badge variant="outline">{meal.time}</Badge>
                        </div>
                        <p className="text-sm">{meal.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{meal.calories} kcal</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => {
                              toast({
                                title: "Recipe Details",
                                description: `Viewing detailed recipe for ${meal.content}.`
                              });
                            }}
                          >
                            Details <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handleCustomizeMealPlan}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Customize Meal Plan
                </Button>
                <Button
                  onClick={handleViewFullWeekPlan}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  View Full Week Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="meal-plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Meal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} className="border rounded-lg p-2">
                    <div className="font-medium text-center mb-2">{day}</div>
                    <div className="space-y-2">
                      {["Breakfast", "Lunch", "Dinner"].map(mealType => (
                        <div 
                          key={mealType} 
                          className="border border-dashed rounded p-2 text-center text-sm hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer transition-colors"
                          onClick={() => {
                            toast({
                              title: `${mealType} on ${day}`,
                              description: "Opening meal editor."
                            });
                          }}
                        >
                          {mealType}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">Meal Plan Templates</h3>
                <div className="flex flex-wrap gap-2">
                  {["Weight Loss", "Muscle Gain", "Vegetarian", "Keto", "Balanced"].map(plan => (
                    <Badge 
                      key={plan} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20"
                      onClick={() => {
                        toast({
                          title: `${plan} Plan Selected`,
                          description: `Applying the ${plan} meal plan template.`
                        });
                      }}
                    >
                      {plan}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Plan Saved",
                      description: "Your current meal plan has been saved."
                    });
                  }}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save Current Plan
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "New Plan Generated",
                      description: "A new meal plan has been generated based on your preferences."
                    });
                  }}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Generate New Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recipes" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recommended Recipes</h2>
            <div className="relative">
              <Input 
                placeholder="Search recipes..."
                className="pl-8 w-64"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Quinoa Veggie Bowl",
                image: "https://source.unsplash.com/random/300x200?quinoa",
                prepTime: "25 min",
                difficulty: "Easy",
                calories: 420,
                tags: ["Vegetarian", "High Protein"]
              },
              {
                title: "Grilled Salmon with Asparagus",
                image: "https://source.unsplash.com/random/300x200?salmon",
                prepTime: "30 min",
                difficulty: "Medium",
                calories: 380,
                tags: ["Keto", "Protein"]
              },
              {
                title: "Berry Protein Smoothie",
                image: "https://source.unsplash.com/random/300x200?smoothie",
                prepTime: "10 min",
                difficulty: "Easy",
                calories: 310,
                tags: ["Breakfast", "Quick"]
              }
            ].map((recipe, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center relative" 
                  style={{ backgroundImage: `url(${recipe.image})` }}
                >
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">{recipe.calories} kcal</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{recipe.title}</h3>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {recipe.prepTime}
                    </span>
                    <span>{recipe.difficulty}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recipe.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-3 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast({
                        title: recipe.title,
                        description: "Viewing detailed recipe instructions."
                      });
                    }}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "More Recipes",
                  description: "Loading additional recipe suggestions."
                });
              }}
            >
              Load More Recipes <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NewNutritionView = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="tracker" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="tracker">Tracker</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="meals">Meal Planner</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracker" className="space-y-6">
          <NutritionTracker />
        </TabsContent>
        
        <TabsContent value="journal" className="space-y-6">
          <FoodJournal />
        </TabsContent>
        
        <TabsContent value="meals" className="space-y-6">
          <MealPlanner />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6">
          <NutrientInsights />
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <NutritionGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
