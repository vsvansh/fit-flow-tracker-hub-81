
import { motion } from "framer-motion";
import FoodNutritionTracker from "@/components/FoodNutritionTracker";
import BackToHome from "@/components/BackToHome";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pizza, Apple, Utensils, Beef, Cookie, Leaf, Coffee } from "lucide-react";

const Nutrition = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <BackToHome />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Food & Nutrition Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your meals, monitor nutrients, and meet your dietary goals
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">Daily Calories</CardTitle>
                <Utensils className="h-4 w-4 text-green-500" />
              </div>
              <CardDescription className="text-2xl font-bold text-foreground">1,840</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">73% of 2,500 goal</p>
              <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">Carbs</CardTitle>
                <Pizza className="h-4 w-4 text-blue-500" />
              </div>
              <CardDescription className="text-2xl font-bold text-foreground">186g</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">69% of 270g goal</p>
              <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '69%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">Protein</CardTitle>
                <Beef className="h-4 w-4 text-red-500" />
              </div>
              <CardDescription className="text-2xl font-bold text-foreground">98g</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">82% of 120g goal</p>
              <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col justify-between hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fat</CardTitle>
                <Cookie className="h-4 w-4 text-amber-500" />
              </div>
              <CardDescription className="text-2xl font-bold text-foreground">53g</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">65% of 80g goal</p>
              <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <FoodNutritionTracker />
          
          <Tabs defaultValue="mealPlanner" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="mealPlanner">Meal Planner</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="preferences">Dietary Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mealPlanner">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coffee className="mr-2 h-5 w-5 text-muted-foreground" />
                    Weekly Meal Planner
                  </CardTitle>
                  <CardDescription>Plan your meals for the week ahead</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <Badge key={day} variant="outline" className="cursor-pointer hover:bg-muted">
                          {day}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
                        <div key={meal} className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-4">{meal}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border shadow-sm">
                              <CardHeader className="p-3 pb-0">
                                <CardTitle className="text-sm font-medium">Greek Yogurt Bowl</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3">
                                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                  <span>320 kcal</span>
                                  <span>15g protein</span>
                                </div>
                                <Button variant="ghost" size="sm" className="w-full text-xs h-7">
                                  View Recipe
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <Card className="border shadow-sm">
                              <CardHeader className="p-3 pb-0">
                                <CardTitle className="text-sm font-medium">Avocado Toast</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3">
                                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                  <span>280 kcal</span>
                                  <span>8g protein</span>
                                </div>
                                <Button variant="ghost" size="sm" className="w-full text-xs h-7">
                                  View Recipe
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <div className="flex items-center justify-center border rounded-lg border-dashed p-3">
                              <Button variant="ghost" size="sm" className="w-full text-xs">
                                + Add Meal
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recipes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Utensils className="mr-2 h-5 w-5 text-muted-foreground" />
                    Recipe Collection
                  </CardTitle>
                  <CardDescription>Browse and save your favorite recipes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="cursor-pointer">All</Badge>
                      <Badge variant="outline" className="cursor-pointer">Breakfast</Badge>
                      <Badge variant="outline" className="cursor-pointer">Lunch</Badge>
                      <Badge variant="outline" className="cursor-pointer">Dinner</Badge>
                      <Badge variant="outline" className="cursor-pointer">Snacks</Badge>
                      <Badge variant="outline" className="cursor-pointer">Desserts</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: "Chicken Quinoa Bowl", calories: 420, protein: 32, image: "/placeholder.svg" },
                        { name: "Veggie Stir Fry", calories: 350, protein: 18, image: "/placeholder.svg" },
                        { name: "Grilled Salmon", calories: 380, protein: 36, image: "/placeholder.svg" },
                        { name: "Mediterranean Salad", calories: 310, protein: 12, image: "/placeholder.svg" },
                        { name: "Protein Smoothie", calories: 280, protein: 24, image: "/placeholder.svg" },
                        { name: "Avocado Wrap", calories: 450, protein: 15, image: "/placeholder.svg" }
                      ].map((recipe, index) => (
                        <Card key={index} className="border overflow-hidden">
                          <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <img src={recipe.image} alt={recipe.name} className="object-cover w-full h-full" />
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-medium">{recipe.name}</h3>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>{recipe.calories} kcal</span>
                              <span>{recipe.protein}g protein</span>
                            </div>
                            <div className="flex justify-between mt-3">
                              <Button variant="ghost" size="sm" className="text-xs h-7">
                                View Recipe
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                Save
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-muted-foreground" />
                    Dietary Preferences
                  </CardTitle>
                  <CardDescription>Customize your nutrition settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Diet Type</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { name: "No Preference", selected: true },
                          { name: "Vegetarian", selected: false },
                          { name: "Vegan", selected: false },
                          { name: "Paleo", selected: false },
                          { name: "Keto", selected: false },
                          { name: "Mediterranean", selected: false },
                          { name: "Low Carb", selected: false },
                          { name: "Gluten Free", selected: false }
                        ].map(diet => (
                          <div 
                            key={diet.name}
                            className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                              diet.selected ? 
                              'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 
                              'hover:border-muted-foreground'
                            }`}
                          >
                            {diet.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Allergies & Restrictions</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: "Nuts", selected: false },
                          { name: "Dairy", selected: true },
                          { name: "Eggs", selected: false },
                          { name: "Soy", selected: false },
                          { name: "Seafood", selected: false },
                          { name: "Gluten", selected: false }
                        ].map(allergy => (
                          <Badge 
                            key={allergy.name} 
                            variant={allergy.selected ? "default" : "outline"}
                            className="cursor-pointer"
                          >
                            {allergy.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Nutrient Goals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm">Daily Calories</label>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="1200" 
                              max="4000" 
                              defaultValue="2500"
                              className="w-full" 
                            />
                            <span className="ml-2 font-medium">2,500</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Protein (%)</label>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="10" 
                              max="50" 
                              defaultValue="30"
                              className="w-full" 
                            />
                            <span className="ml-2 font-medium">30%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Carbs (%)</label>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="10" 
                              max="70" 
                              defaultValue="45"
                              className="w-full" 
                            />
                            <span className="ml-2 font-medium">45%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Fat (%)</label>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="10" 
                              max="60" 
                              defaultValue="25"
                              className="w-full" 
                            />
                            <span className="ml-2 font-medium">25%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Fiber (g)</label>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="15" 
                              max="50" 
                              defaultValue="30"
                              className="w-full" 
                            />
                            <span className="ml-2 font-medium">30g</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Sugar (g)</label>
                          <div className="flex items-center">
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              defaultValue="25"
                              className="w-full" 
                            />
                            <span className="ml-2 font-medium">25g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default Nutrition;
