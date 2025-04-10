import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Utensils, LineChart, BarChart2, Calendar, Heart, 
  BookOpen, TrendingUp, Target, Clock, ShoppingBag, 
  Clipboard, Activity, LayoutGrid, 
  Bell, Filter, Settings2, RefreshCw, PlusCircle, Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Import all the nutrition components
import NutritionGoals from "./NutritionGoals";
import NutrientInsights from "./NutrientInsights";
import FoodNutritionTracker from "./FoodNutritionTracker";
import InteractiveNutritionCharts from "./InteractiveNutritionCharts";
import NutritionCharts from "./NutritionCharts";

// Initialize user avatar
import { initializeAvatar } from "@/utils/avatarUpdateHandler";

const features = [
  { 
    id: "tracker", 
    name: "Tracker", 
    icon: Activity, 
    description: "Track your daily nutrition intake",
    component: FoodNutritionTracker,
    tag: "original"
  },
  { 
    id: "goals", 
    name: "Goals", 
    icon: Target, 
    description: "Set and monitor your nutrition goals",
    component: NutritionGoals,
    tag: "original"
  },
  { 
    id: "insights", 
    name: "Insights", 
    icon: TrendingUp, 
    description: "Get insights into your nutrition patterns",
    component: NutrientInsights,
    tag: "original"
  },
  { 
    id: "charts", 
    name: "Charts", 
    icon: BarChart2, 
    description: "Interactive nutrition charts and visualizations",
    component: NutritionCharts,
    tag: "enhanced"
  },
  { 
    id: "interactive-charts", 
    name: "Interactive Charts", 
    icon: LineChart, 
    description: "Detailed interactive nutrition analysis",
    component: InteractiveNutritionCharts,
    tag: "enhanced"
  },
  // Placeholder features that can be implemented in future iterations
  { 
    id: "journal", 
    name: "Journal", 
    icon: BookOpen, 
    description: "Keep a log of your meals and nutrition",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Journal</CardTitle>
          <CardDescription>Track your daily meals and food intake</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Recent Entries</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-3 w-3" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Search className="h-3 w-3" />
                  <span>Search</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { time: "8:30 AM", meal: "Breakfast", items: ["Oatmeal with berries", "Greek yogurt"], notes: "Felt energized after this meal" },
                { time: "12:15 PM", meal: "Lunch", items: ["Grilled chicken salad", "Whole grain bread"], notes: "Light and satisfying" },
                { time: "3:30 PM", meal: "Snack", items: ["Apple", "Handful of almonds"], notes: "" }
              ].map((entry, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">{entry.meal}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{entry.time}</span>
                  </div>
                  <ul className="mt-1 text-sm">
                    {entry.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                  {entry.notes && (
                    <p className="mt-2 text-xs text-muted-foreground italic">
                      Note: {entry.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <Button className="w-full" onClick={() => {
              toast({
                title: "New Journal Entry",
                description: "Add details about your meal to create a new journal entry."
              });
            }}>
              <PlusCircle className="h-4 w-4 mr-2" /> Create New Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "patterns", 
    name: "Patterns", 
    icon: LayoutGrid, 
    description: "Discover your eating patterns",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Patterns</CardTitle>
          <CardDescription>Analyze your eating habits over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Meal Timing Analysis</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Breakfast</span>
                    <span className="text-sm">Usually between 7:30 - 8:15 AM</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span>Lunch</span>
                    <span className="text-sm">Usually between 12:00 - 1:15 PM</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span>Dinner</span>
                    <span className="text-sm">Usually between 6:30 - 7:45 PM</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                    <div className="bg-amber-500 h-3 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span>Snacks</span>
                    <span className="text-sm">Usually between 3:00 - 4:30 PM</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Most Frequent Foods</h3>
              <div className="space-y-2">
                {[
                  { food: "Eggs", count: 12, percentage: 80 },
                  { food: "Chicken Breast", count: 10, percentage: 70 },
                  { food: "Spinach", count: 9, percentage: 60 },
                  { food: "Greek Yogurt", count: 8, percentage: 55 },
                  { food: "Oatmeal", count: 7, percentage: 45 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 text-sm">{item.food}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-10 text-right text-sm text-muted-foreground">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
              <h3 className="font-medium text-amber-800 dark:text-amber-400 flex items-center">
                <Bell className="h-4 w-4 mr-1" />
                Pattern Insight
              </h3>
              <p className="text-sm mt-1 text-amber-700 dark:text-amber-300">
                You tend to eat more carbohydrates in the evening, which may affect your sleep quality.
                Consider shifting some carb intake to earlier in the day.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={() => {
                  toast({
                    title: "Pattern Analysis",
                    description: "A detailed analysis of your eating patterns has been generated."
                  });
                }}
              >
                See Detailed Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "meal-planner", 
    name: "Meal Planner", 
    icon: Calendar, 
    description: "Plan your meals ahead of time",
    component: () => (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Meal Planner</CardTitle>
              <CardDescription>Schedule your meals for the week</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => {
                toast({
                  title: "Meal Plan",
                  description: "Your meal plan has been refreshed."
                });
              }} className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Settings2 className="h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Meal Plan Preferences</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vegetarian" />
                        <Label htmlFor="vegetarian">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gluten-free" />
                        <Label htmlFor="gluten-free">Gluten-Free</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dairy-free" />
                        <Label htmlFor="dairy-free">Dairy-Free</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="low-carb" />
                        <Label htmlFor="low-carb">Low Carb</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calories">Daily Calorie Target</Label>
                      <Input id="calories" defaultValue="2000" type="number" />
                    </div>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Preferences Saved",
                        description: "Your meal planning preferences have been updated."
                      });
                    }}>Save Preferences</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs defaultValue="monday" className="w-full">
              <TabsList className="w-full grid grid-cols-7">
                <TabsTrigger value="monday" className="text-xs">Mon</TabsTrigger>
                <TabsTrigger value="tuesday" className="text-xs">Tue</TabsTrigger>
                <TabsTrigger value="wednesday" className="text-xs">Wed</TabsTrigger>
                <TabsTrigger value="thursday" className="text-xs">Thu</TabsTrigger>
                <TabsTrigger value="friday" className="text-xs">Fri</TabsTrigger>
                <TabsTrigger value="saturday" className="text-xs">Sat</TabsTrigger>
                <TabsTrigger value="sunday" className="text-xs">Sun</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monday" className="space-y-4 pt-4">
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1.5">
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="font-medium">Breakfast</span>
                    </div>
                    <Badge variant="outline">420 cal</Badge>
                  </div>
                  <p className="mt-2 text-sm">Oatmeal with berries and greek yogurt</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">Protein: 24g</Badge>
                    <Badge variant="secondary" className="text-xs">Carbs: 65g</Badge>
                    <Badge variant="secondary" className="text-xs">Fat: 8g</Badge>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      toast({
                        title: "Meal Edited",
                        description: "You can now modify this meal."
                      });
                    }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => {
                      toast({
                        title: "Recipe View",
                        description: "Viewing recipe details and preparation instructions."
                      });
                    }}>Recipe</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1.5">
                        <Clock className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="font-medium">Lunch</span>
                    </div>
                    <Badge variant="outline">580 cal</Badge>
                  </div>
                  <p className="mt-2 text-sm">Grilled chicken salad with avocado and lemon dressing</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">Protein: 35g</Badge>
                    <Badge variant="secondary" className="text-xs">Carbs: 25g</Badge>
                    <Badge variant="secondary" className="text-xs">Fat: 32g</Badge>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      toast({
                        title: "Meal Edited",
                        description: "You can now modify this meal."
                      });
                    }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => {
                      toast({
                        title: "Recipe View",
                        description: "Viewing recipe details and preparation instructions."
                      });
                    }}>Recipe</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-1.5">
                        <Clock className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="font-medium">Dinner</span>
                    </div>
                    <Badge variant="outline">650 cal</Badge>
                  </div>
                  <p className="mt-2 text-sm">Baked salmon with roasted vegetables and quinoa</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">Protein: 42g</Badge>
                    <Badge variant="secondary" className="text-xs">Carbs: 45g</Badge>
                    <Badge variant="secondary" className="text-xs">Fat: 28g</Badge>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      toast({
                        title: "Meal Edited",
                        description: "You can now modify this meal."
                      });
                    }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => {
                      toast({
                        title: "Recipe View",
                        description: "Viewing recipe details and preparation instructions."
                      });
                    }}>Recipe</Button>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline" onClick={() => {
                  toast({
                    title: "Shopping List",
                    description: "A shopping list has been generated based on your meal plan."
                  });
                }}>Generate Shopping List</Button>
              </TabsContent>
              
              <TabsContent value="tuesday" className="space-y-4 pt-4">
                <div className="flex items-center justify-center h-36">
                  <div className="text-center">
                    <p className="text-muted-foreground">Tap to add meals for Tuesday</p>
                    <Button className="mt-2" onClick={() => {
                      toast({
                        title: "Add Meal",
                        description: "Create a new meal plan for Tuesday."
                      });
                    }}>
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Meal
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Other days would have similar content or placeholders */}
              {["wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                <TabsContent key={day} value={day} className="space-y-4 pt-4">
                  <div className="flex items-center justify-center h-36">
                    <div className="text-center">
                      <p className="text-muted-foreground">Tap to add meals for {day.charAt(0).toUpperCase() + day.slice(1)}</p>
                      <Button className="mt-2" onClick={() => {
                        toast({
                          title: "Add Meal",
                          description: `Create a new meal plan for ${day.charAt(0).toUpperCase() + day.slice(1)}.`
                        });
                      }}>
                        <PlusCircle className="h-4 w-4 mr-1" /> Add Meal
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "recipes", 
    name: "Recipes", 
    icon: Utensils, 
    description: "Browse healthy recipe suggestions",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Healthy Recipes</CardTitle>
          <CardDescription>Discover nutritious meal ideas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Recipe Collection</h3>
                <p className="text-sm text-muted-foreground">Browse recipes by category</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-3 w-3" />
                  <span>Filter</span>
                </Button>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input className="max-w-[180px] pl-7" placeholder="Search recipes..." />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  name: "Mediterranean Bowl", 
                  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300&q=80", 
                  calories: 520, 
                  time: "25 min",
                  category: "lunch",
                  rating: 4.8
                },
                { 
                  name: "Protein Pancakes", 
                  image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300&q=80", 
                  calories: 380, 
                  time: "15 min",
                  category: "breakfast",
                  rating: 4.6
                },
                { 
                  name: "Teriyaki Salmon", 
                  image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300&q=80", 
                  calories: 450, 
                  time: "30 min",
                  category: "dinner",
                  rating: 4.9
                },
                { 
                  name: "Green Smoothie Bowl", 
                  image: "https://images.unsplash.com/photo-1490323950700-58dc631e5cdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300&q=80", 
                  calories: 310, 
                  time: "10 min",
                  category: "breakfast",
                  rating: 4.5
                }
              ].map((recipe, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="h-36 w-full overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{recipe.name}</h4>
                      <Badge>{recipe.category}</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{recipe.calories} cal</Badge>
                        <Badge variant="outline">{recipe.time}</Badge>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(recipe.rating) ? 'fill-current' : 'stroke-current fill-none'}`}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                        <span className="text-xs ml-1">{recipe.rating}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600" 
                        onClick={() => {
                          toast({
                            title: "Recipe Details",
                            description: `Viewing details for ${recipe.name}.`
                          });
                        }}
                      >
                        View Recipe
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          toast({
                            title: "Recipe Saved",
                            description: `${recipe.name} has been saved to your favorites.`
                          });
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full" onClick={() => {
              toast({
                title: "Browse Recipes",
                description: "Exploring our full recipe collection."
              });
            }}>
              Browse All Recipes
            </Button>
          </div>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "shopping-list", 
    name: "Shopping List", 
    icon: ShoppingBag, 
    description: "Generate shopping lists based on your meal plan",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Shopping List</CardTitle>
          <CardDescription>Create shopping lists from your meal plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Current List</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Shopping List Generated",
                    description: "A new shopping list has been created based on your meal plan."
                  });
                }}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  <span>Generate from Meal Plan</span>
                </Button>
                <Button variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  <span>Add Item</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="rounded-lg border p-3">
                <h4 className="font-medium">Produce</h4>
                <div className="mt-2 space-y-1">
                  {[
                    { name: "Spinach", quantity: "1 bag", checked: false },
                    { name: "Avocado", quantity: "2", checked: false },
                    { name: "Bell Peppers", quantity: "3", checked: true },
                    { name: "Sweet Potatoes", quantity: "4", checked: false },
                    { name: "Broccoli", quantity: "1 head", checked: true }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox id={`item-${index}`} checked={item.checked} />
                      <Label 
                        htmlFor={`item-${index}`}
                        className={`flex-1 text-sm flex justify-between ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                      >
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.quantity}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <h4 className="font-medium">Proteins</h4>
                <div className="mt-2 space-y-1">
                  {[
                    { name: "Chicken Breast", quantity: "1.5 lbs", checked: false },
                    { name: "Salmon", quantity: "1 lb", checked: false },
                    { name: "Greek Yogurt", quantity: "32 oz", checked: true },
                    { name: "Eggs", quantity: "1 dozen", checked: false }
                  ].map((item, index) => (
                    <div key={index + "p"} className="flex items-center gap-2">
                      <Checkbox id={`item-p-${index}`} checked={item.checked} />
                      <Label 
                        htmlFor={`item-p-${index}`}
                        className={`flex-1 text-sm flex justify-between ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                      >
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.quantity}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <h4 className="font-medium">Grains & Pantry</h4>
                <div className="mt-2 space-y-1">
                  {[
                    { name: "Quinoa", quantity: "1 bag", checked: false },
                    { name: "Oats", quantity: "1 container", checked: true },
                    { name: "Olive Oil", quantity: "1 bottle", checked: false },
                    { name: "Almonds", quantity: "8 oz", checked: false }
                  ].map((item, index) => (
                    <div key={index + "g"} className="flex items-center gap-2">
                      <Checkbox id={`item-g-${index}`} checked={item.checked} />
                      <Label 
                        htmlFor={`item-g-${index}`}
                        className={`flex-1 text-sm flex justify-between ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                      >
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.quantity}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1"
