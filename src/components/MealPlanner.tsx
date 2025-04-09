import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar, Clock, Utensils, ChevronRight, 
  Plus, Filter, FileDown, Printer, Star,
  RefreshCcw, SaveAll, Send, Search, Settings
} from "lucide-react";
import confetti from "canvas-confetti";

const mealPlanData = {
  days: [
    {
      day: "Monday",
      meals: [
        {
          type: "Breakfast",
          name: "Greek Yogurt Parfait",
          ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"],
          calories: 350,
          protein: 20,
          carbs: 45,
          fat: 10,
          prepTime: "10 mins"
        },
        {
          type: "Lunch",
          name: "Quinoa Bowl with Grilled Chicken",
          ingredients: ["Quinoa", "Grilled chicken", "Avocado", "Cherry tomatoes", "Cucumber", "Lemon dressing"],
          calories: 450,
          protein: 35,
          carbs: 40,
          fat: 15,
          prepTime: "20 mins"
        },
        {
          type: "Dinner",
          name: "Baked Salmon with Roasted Vegetables",
          ingredients: ["Salmon fillet", "Broccoli", "Bell peppers", "Carrots", "Olive oil", "Herbs"],
          calories: 580,
          protein: 40,
          carbs: 30,
          fat: 25,
          prepTime: "30 mins"
        },
        {
          type: "Snack",
          name: "Apple with Almond Butter",
          ingredients: ["Apple", "Almond butter"],
          calories: 200,
          protein: 5,
          carbs: 25,
          fat: 10,
          prepTime: "5 mins"
        }
      ],
      totalCalories: 1580,
      totalProtein: 100,
      totalCarbs: 140,
      totalFat: 60
    },
    {
      day: "Tuesday",
      meals: [
        {
          type: "Breakfast",
          name: "Veggie Omelette with Toast",
          ingredients: ["Eggs", "Spinach", "Bell peppers", "Onions", "Whole grain toast"],
          calories: 380,
          protein: 25,
          carbs: 25,
          fat: 20,
          prepTime: "15 mins"
        },
        {
          type: "Lunch",
          name: "Mediterranean Salad with Grilled Chicken",
          ingredients: ["Mixed greens", "Grilled chicken", "Feta cheese", "Olives", "Cucumbers", "Cherry tomatoes", "Balsamic vinaigrette"],
          calories: 420,
          protein: 35,
          carbs: 20,
          fat: 22,
          prepTime: "15 mins"
        },
        {
          type: "Dinner",
          name: "Turkey Meatballs with Zucchini Noodles",
          ingredients: ["Ground turkey", "Zucchini", "Marinara sauce", "Parmesan cheese", "Herbs"],
          calories: 450,
          protein: 40,
          carbs: 15,
          fat: 25,
          prepTime: "25 mins"
        },
        {
          type: "Snack",
          name: "Greek Yogurt with Berries",
          ingredients: ["Greek yogurt", "Mixed berries", "Honey"],
          calories: 150,
          protein: 15,
          carbs: 20,
          fat: 2,
          prepTime: "5 mins"
        }
      ],
      totalCalories: 1400,
      totalProtein: 115,
      totalCarbs: 80,
      totalFat: 69
    }
  ],
  dietary: {
    preferences: ["High Protein", "Low Carb"],
    restrictions: ["No Dairy"]
  }
};

const groceryList = {
  produce: [
    { name: "Spinach", amount: "1 bag", checked: false },
    { name: "Bell peppers", amount: "3", checked: false },
    { name: "Cucumbers", amount: "2", checked: true },
    { name: "Cherry tomatoes", amount: "1 pint", checked: true },
    { name: "Avocado", amount: "2", checked: false },
    { name: "Broccoli", amount: "1 head", checked: false },
    { name: "Carrots", amount: "1 bag", checked: false },
    { name: "Zucchini", amount: "2", checked: false },
    { name: "Lemons", amount: "2", checked: true },
    { name: "Apples", amount: "4", checked: false },
    { name: "Mixed berries", amount: "2 containers", checked: false }
  ],
  proteins: [
    { name: "Chicken breast", amount: "2 lbs", checked: false },
    { name: "Salmon fillets", amount: "1 lb", checked: false },
    { name: "Ground turkey", amount: "1 lb", checked: false },
    { name: "Eggs", amount: "1 dozen", checked: true }
  ],
  dairy: [
    { name: "Greek yogurt", amount: "32 oz container", checked: false },
    { name: "Feta cheese", amount: "1 block", checked: false },
    { name: "Parmesan cheese", amount: "1 small block", checked: false }
  ],
  grains: [
    { name: "Quinoa", amount: "1 box", checked: true },
    { name: "Whole grain bread", amount: "1 loaf", checked: false },
    { name: "Granola", amount: "1 bag", checked: false }
  ],
  other: [
    { name: "Olive oil", amount: "1 bottle", checked: true },
    { name: "Almond butter", amount: "1 jar", checked: false },
    { name: "Honey", amount: "1 bottle", checked: true },
    { name: "Marinara sauce", amount: "1 jar", checked: false },
    { name: "Olives", amount: "1 jar", checked: false },
    { name: "Balsamic vinaigrette", amount: "1 bottle", checked: false }
  ]
};

const mealPlans = [
  { id: 1, name: "High Protein Plan", description: "2000 calories, 150g protein", active: true },
  { id: 2, name: "Low Carb", description: "1800 calories, 30% carbs", active: false },
  { id: 3, name: "Mediterranean Diet", description: "2200 calories, balanced macros", active: false },
  { id: 4, name: "Vegetarian", description: "1900 calories, plant-based", active: false }
];

const MealPlanner = () => {
  const { toast } = useToast();
  const [activePlan, setActivePlan] = useState(mealPlans[0]);
  const [activeDay, setActiveDay] = useState("Monday");
  const [groceries, setGroceries] = useState(groceryList);
  const [showCreatePlanDialog, setShowCreatePlanDialog] = useState(false);
  
  const toggleGroceryItem = (category: string, index: number) => {
    setGroceries(prev => {
      const newGroceries = { ...prev };
      const categoryItems = (newGroceries as any)[category];
      if (categoryItems && Array.isArray(categoryItems)) {
        categoryItems[index] = { 
          ...categoryItems[index], 
          checked: !categoryItems[index].checked 
        };
      }
      return newGroceries;
    });
  };
  
  const generateGroceryList = () => {
    toast({
      title: "Shopping list generated",
      description: "Your shopping list has been updated based on your meal plan.",
    });
  };
  
  const changeMealPlan = (id: number) => {
    const newPlan = mealPlans.find(plan => plan.id === id);
    if (newPlan) {
      setActivePlan(newPlan);
      
      const updatedPlans = mealPlans.map(plan => ({
        ...plan,
        active: plan.id === id
      }));
      
      toast({
        title: "Meal plan changed",
        description: `Switched to ${newPlan.name} meal plan.`,
      });
    }
  };

  const handleCreateNewPlan = () => {
    toast({
      title: "New meal plan created",
      description: "Your custom meal plan has been created successfully!",
    });
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  const handleViewRecipe = () => {
    toast({
      title: "Recipe details",
      description: "Detailed recipe and cooking instructions opened in a new tab.",
    });
  };
  
  const handleAddMeal = () => {
    toast({
      title: "Add meal",
      description: "New meal has been added to your plan.",
    });
  };
  
  const handleShareList = () => {
    toast({
      title: "List shared",
      description: "Your grocery list has been shared successfully.",
    });
  };
  
  const handleCustomize = () => {
    toast({
      title: "Customize options",
      description: "Customize your shopping list preferences.",
    });
  };
  
  const currentDayData = mealPlanData.days.find(day => day.day === activeDay) || mealPlanData.days[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Meal Plan: {activePlan.name}
                  </CardTitle>
                  <CardDescription>
                    {activePlan.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Plan exported",
                    description: "Your meal plan has been exported successfully."
                  })}>
                    <FileDown className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast({
                    title: "Print ready",
                    description: "Your meal plan is ready to print."
                  })}>
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </Button>
                </div>
              </div>
              
              <div className="flex overflow-x-auto py-2 space-x-2 mt-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <Button
                    key={day}
                    variant={activeDay === day ? "default" : "outline"}
                    className={activeDay === day ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setActiveDay(day)}
                  >
                    {day.substring(0, 3)}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {activeDay}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      {currentDayData.totalCalories} calories
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      {currentDayData.totalProtein}g protein
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
                      {currentDayData.totalCarbs}g carbs
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                      {currentDayData.totalFat}g fat
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Plan regenerated", 
                        description: "Your meal plan has been updated with new recommendations."
                      });
                    }}
                  >
                    <RefreshCcw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {currentDayData.meals.map((meal, index) => (
                    <Card key={index} className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                              <Utensils className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <Badge className="mr-2">{meal.type}</Badge>
                                <h3 className="font-medium">{meal.name}</h3>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Prep time: {meal.prepTime}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {meal.ingredients.map((ingredient, i) => (
                                  <Badge 
                                    key={i} 
                                    variant="outline" 
                                    className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  >
                                    {ingredient}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 ml-10 md:ml-0">
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center">
                                <div className="font-medium">{meal.calories}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">cal</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{meal.protein}g</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">protein</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{meal.carbs}g</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">carbs</div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleViewRecipe}
                            >
                              View Recipe
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Button className="w-full" onClick={handleAddMeal}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Meal Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="Search meal plans..." className="mb-3" />
                
                {mealPlans.map(plan => (
                  <div 
                    key={plan.id} 
                    className={`p-3 rounded-lg border ${
                      plan.active 
                        ? 'border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                        : ''
                    } cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                    onClick={() => changeMealPlan(plan.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {plan.description}
                        </p>
                      </div>
                      {plan.active && (
                        <Badge className="bg-green-500">Active</Badge>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleCreateNewPlan}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Plan
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Nutritional Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calories</span>
                    <span>{currentDayData.totalCalories} / 2000</span>
                  </div>
                  <Progress 
                    value={(currentDayData.totalCalories / 2000) * 100} 
                    className="h-2 [&>div]:bg-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-center">Protein</div>
                    <div className="h-20 w-20 mx-auto relative">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#e0e0e0" 
                          strokeWidth="10" 
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#9333ea" 
                          strokeWidth="10" 
                          strokeDasharray="282.7" 
                          strokeDashoffset={282.7 - (282.7 * (currentDayData.totalProtein / 120))}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <text 
                          x="50" 
                          y="50" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          className="text-lg font-medium"
                          fill="currentColor"
                        >
                          {Math.round((currentDayData.totalProtein / 120) * 100)}%
                        </text>
                      </svg>
                    </div>
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                      {currentDayData.totalProtein}g / 120g
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-center">Carbs</div>
                    <div className="h-20 w-20 mx-auto relative">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#e0e0e0" 
                          strokeWidth="10" 
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#22c55e" 
                          strokeWidth="10" 
                          strokeDasharray="282.7" 
                          strokeDashoffset={282.7 - (282.7 * (currentDayData.totalCarbs / 250))}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <text 
                          x="50" 
                          y="50" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          className="text-lg font-medium"
                          fill="currentColor"
                        >
                          {Math.round((currentDayData.totalCarbs / 250) * 100)}%
                        </text>
                      </svg>
                    </div>
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                      {currentDayData.totalCarbs}g / 250g
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-center">Fat</div>
                    <div className="h-20 w-20 mx-auto relative">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#e0e0e0" 
                          strokeWidth="10" 
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#eab308" 
                          strokeWidth="10" 
                          strokeDasharray="282.7" 
                          strokeDashoffset={282.7 - (282.7 * (currentDayData.totalFat / 70))}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <text 
                          x="50" 
                          y="50" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          className="text-lg font-medium"
                          fill="currentColor"
                        >
                          {Math.round((currentDayData.totalFat / 70) * 100)}%
                        </text>
                      </svg>
                    </div>
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                      {currentDayData.totalFat}g / 70g
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {mealPlanData.dietary.preferences.map((pref, i) => (
                      <Badge key={i} variant="outline" className="text-green-600 dark:text-green-400">
                        {pref}
                      </Badge>
                    ))}
                    {mealPlanData.dietary.restrictions.map((rest, i) => (
                      <Badge key={i} variant="outline" className="text-red-600 dark:text-red-400">
                        {rest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Shopping List</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={generateGroceryList}>
                <RefreshCcw className="h-4 w-4 mr-1" />
                Update List
              </Button>
              <Button 
                size="sm"
                onClick={() => toast({
                  title: "List exported",
                  description: "Your shopping list has been exported successfully."
                })}
              >
                <FileDown className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="groceries">
            <TabsList className="mb-4">
              <TabsTrigger value="groceries">Grocery List</TabsTrigger>
              <TabsTrigger value="recipes">Weekly Recipes</TabsTrigger>
              <TabsTrigger value="prep">Meal Prep Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="groceries">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groceries).map(([category, items]) => (
                  <div key={category} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 capitalize">{category}</h3>
                    <ScrollArea className="h-60">
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Checkbox 
                                id={`${category}-${idx}`} 
                                checked={item.checked}
                                onCheckedChange={() => toggleGroceryItem(category, idx)}
                                className="mr-2"
                              />
                              <label 
                                htmlFor={`${category}-${idx}`}
                                className={`text-sm ${item.checked ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}
                              >
                                {item.name}
                              </label>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleShareList}>
                    <Send className="h-4 w-4 mr-1" />
                    Share List
                  </Button>
                  <Button variant="outline" onClick={handleCustomize}>
                    <Settings className="h-4 w-4 mr-1" />
                    Customize
                  </Button>
                </div>
                <Button 
                  variant="destructive"
                  onClick={() => toast({
                    title: "Items cleared",
                    description: "Checked items have been removed from your list."
                  })}
                >
                  Clear Checked Items
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recipes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mealPlanData.days.flatMap(day => day.meals).slice(0, 6).map((recipe, idx) => (
                  <Card key={idx}>
                    <div className={`h-40 bg-cover bg-center rounded-t-lg`} 
                         style={{ backgroundImage: `url(https://source.unsplash.com/random/300x200?food=${idx+1})` }}>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{recipe.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Prep time: {recipe.prepTime}</span>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{recipe.calories} cal</span>
                        <span>{recipe.protein}g protein</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={handleViewRecipe}
                      >
                        View Recipe
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button onClick={() => toast({
                  title: "All recipes",
                  description: "Viewing all recipes for the week."
                })}>
                  View All Recipes
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="prep">
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Weekend Prep (1-2 hours)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Cook a batch of quinoa for Monday and Tuesday lunches</li>
                    <li>Grill chicken breasts for multiple meals</li>
                    <li>Wash and chop vegetables for quick assembly</li>
                    <li>Prepare sauces and dressings in small containers</li>
                    <li>Portion out snacks into grab-and-go containers</li>
                  </ol>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Daily Prep (15-20 mins)</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">Morning</div>
                      <ul className="list-disc list-inside text-sm ml-4 mt-1 text-gray-600 dark:text-gray-300">
                        <li>Assemble breakfast using pre-chopped ingredients</li>
                        <li>Pack lunch if going to work/school</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="font-medium">Evening</div>
                      <ul className="list-disc list-inside text-sm ml-4 mt-1 text-gray-600 dark:text-gray-300">
                        <li>Prepare dinner using pre-prepped ingredients</li>
                        <li>Set out ingredients needed for breakfast</li>
                        <li>Check grocery list for next day's meals</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Storage Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Refrigerator Storage (2-4 days)</div>
                      <ul className="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-300">
                        <li>Cooked proteins (chicken, fish)</li>
                        <li>Prepared salads (keep dressing separate)</li>
                        <li>Cut vegetables and fruits</li>
                        <li>Cooked grains and pasta</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="font-medium">Freezer Storage (1-3 months)</div>
                      <ul className="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-300">
                        <li>Portioned protein meals</li>
                        <li>Soups and stews</li>
                        <li>Cooked grains in individual portions</li>
                        <li>Smoothie packs with fruits and vegetables</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={() => toast({
                    title: "Print requested",
                    description: "Your meal prep guide is ready to print."
                  })}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print Meal Prep Guide
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

export default MealPlanner;
