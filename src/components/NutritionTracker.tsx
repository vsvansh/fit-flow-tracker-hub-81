
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
import { motion, AnimatePresence } from "framer-motion";
import { launchConfetti } from "@/utils/confettiUtil";
import {
  Search, Plus, Utensils, Clock, ArrowRight, 
  Droplet, Flame, BarChart2, Filter, Heart,
  RefreshCw, Check, X, AlertCircle, Info
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
  { id: 5, name: "Greek Yogurt", calories: 100, carbs: 6, protein: 17, fat: 0.5, serving: "6 oz" },
  { id: 6, name: "Salmon", calories: 206, carbs: 0, protein: 22, fat: 13, serving: "3 oz" },
  { id: 7, name: "Quinoa", calories: 222, carbs: 39, protein: 8, fat: 4, serving: "1 cup cooked" },
  { id: 8, name: "Almonds", calories: 164, carbs: 6, protein: 6, fat: 14, serving: "1 oz (23 nuts)" },
  { id: 9, name: "Banana", calories: 105, carbs: 27, protein: 1.3, fat: 0.4, serving: "1 medium" },
  { id: 10, name: "Eggs", calories: 72, carbs: 0.6, protein: 6, fat: 5, serving: "1 large" }
];

// Sample logged meals for today
const initialLoggedMeals = [
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
  const [meals, setMeals] = useState(initialLoggedMeals);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [highlightMacros, setHighlightMacros] = useState<string | null>(null);

  // Calculate totals
  const totalConsumed = meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  const caloriesPercent = Math.min(100, Math.round((totalConsumed / todayNutrition.calories.goal) * 100));

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredFoods([]);
      setShowSearchResults(false);
      return;
    }
    
    setLoadingSearch(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const results = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setFilteredFoods(results);
      setShowSearchResults(true);
      setLoadingSearch(false);
    }, 600);
  };

  const addFood = (food: typeof foodDatabase[0]) => {
    // Create a new meal for demonstration
    const newMeal = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: "Snack",
      foods: [food],
      totalCalories: food.calories
    };
    
    setMeals([...meals, newMeal]);
    
    toast({
      title: "Food added",
      description: `Added ${food.name} to your log.`,
    });
    
    setSearchQuery("");
    setShowSearchResults(false);
    
    launchConfetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const addWater = () => {
    if (water < todayNutrition.water.goal) {
      setWater(water + 1);
      
      toast({
        title: "Water added",
        description: `You've logged ${water + 1} cups of water today.`,
      });
      
      if (water + 1 === todayNutrition.water.goal) {
        toast({
          title: "Daily water goal reached! 🎉",
          description: "Great job staying hydrated today!",
        });
        
        launchConfetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const removeWater = () => {
    if (water > 0) {
      setWater(water - 1);
      
      toast({
        title: "Water removed",
        description: `You've now logged ${water - 1} cups of water today.`,
      });
    }
  };

  const removeMeal = (mealId: number) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
    
    toast({
      title: "Meal removed",
      description: "The meal has been removed from your log.",
    });
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Nutrition Summary */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-orange-400 to-red-400 dark:from-orange-700 dark:to-red-700 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
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
                <div 
                  className={`space-y-1 ${highlightMacros === 'calories' ? 'animate-pulse' : ''}`}
                  onMouseEnter={() => setHighlightMacros('calories')}
                  onMouseLeave={() => setHighlightMacros(null)}
                >
                  <div className="flex justify-between text-sm font-medium">
                    <span className="capitalize">calories</span>
                    <span>
                      {totalConsumed} / {todayNutrition.calories.goal}
                    </span>
                  </div>
                  <motion.div 
                    className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="h-full bg-orange-500 dark:bg-orange-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${caloriesPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </motion.div>
                  <div className="flex text-xs justify-end text-gray-500 dark:text-gray-400">
                    {caloriesPercent}% of daily goal
                  </div>
                </div>
                
                {Object.entries(todayNutrition).slice(1, 4).map(([key, data]) => (
                  <div 
                    key={key} 
                    className={`space-y-1 ${highlightMacros === key ? 'animate-pulse' : ''}`}
                    onMouseEnter={() => setHighlightMacros(key)}
                    onMouseLeave={() => setHighlightMacros(null)}
                  >
                    <div className="flex justify-between text-sm font-medium">
                      <span className="capitalize">{key}</span>
                      <span>
                        {data.consumed} / {data.goal} {data.unit || ''}
                      </span>
                    </div>
                    <motion.div 
                      className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className={`h-full rounded-full ${
                          key === 'carbs' ? 'bg-blue-500 dark:bg-blue-600' : 
                          key === 'protein' ? 'bg-purple-500 dark:bg-purple-600' : 
                          'bg-yellow-500 dark:bg-yellow-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.consumed / data.goal) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </motion.div>
                    <div className="flex text-xs justify-end text-gray-500 dark:text-gray-400">
                      {Math.round((data.consumed / data.goal) * 100)}% of daily goal
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center mt-6 justify-between">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      className="flex gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                      onClick={() => {
                        toast({
                          title: "Nutrition report generated",
                          description: "Your detailed nutrition report is ready to view."
                        });
                      }}
                    >
                      <BarChart2 className="h-4 w-4" />
                      <span>Nutrition Report</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                      onClick={() => setShowSearchResults(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Log Food
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Water and Search */}
        <div className="space-y-6">
          {/* Water Tracker */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-700 dark:to-cyan-700 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
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
                  <div className="flex space-x-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        onClick={removeWater} 
                        variant="outline" 
                        className="h-10 w-10 p-0 border-red-300 dark:border-red-800"
                        disabled={water <= 0}
                      >
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        onClick={addWater} 
                        variant="outline" 
                        className="border-blue-300 dark:border-blue-700"
                      >
                        <Plus className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Add Water
                      </Button>
                    </motion.div>
                  </div>
                </div>
                
                <div className="relative w-full h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(water / todayNutrition.water.goal) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-blue-800 dark:text-blue-200 font-medium">
                    {Math.round((water / todayNutrition.water.goal) * 100)}% of daily goal
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  {Array.from({ length: todayNutrition.water.goal }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className={`h-8 w-8 rounded-full flex items-center justify-center 
                        ${i < water 
                          ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400'
                        }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        if (i < water) {
                          setWater(i);
                          toast({
                            title: "Water adjusted",
                            description: `Updated to ${i} cups of water.`,
                          });
                        } else if (i === water) {
                          addWater();
                        }
                      }}
                    >
                      <Droplet className="h-4 w-4" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Quick Food Search */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-400 to-emerald-400 dark:from-green-700 dark:to-emerald-700 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        onClick={handleSearch}
                        disabled={loadingSearch}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                      >
                        {loadingSearch ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Search"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {showSearchResults && (
                      <motion.div 
                        className="mt-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {filteredFoods.length > 0 ? (
                          <div className="border rounded-md max-h-60 overflow-y-auto shadow-md">
                            {filteredFoods.map((food, idx) => (
                              <motion.div 
                                key={food.id} 
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-between items-center border-b last:border-b-0"
                                variants={listItemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={idx}
                                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                              >
                                <div>
                                  <p className="font-medium">{food.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {food.calories} cal, {food.serving}
                                  </p>
                                </div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => addFood(food)}
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm border rounded-md shadow-inner">
                            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                            <p>No foods found. Try a different search term.</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Recent</span>
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-green-600 dark:text-green-400"
                      onClick={() => {
                        toast({
                          title: "Viewing all recent foods",
                          description: "Your complete food history is now visible."
                        });
                      }}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Chicken Breast", "Oatmeal", "Banana", "Greek Yogurt", "Eggs"].map((food, idx) => (
                      <motion.div 
                        key={food}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => {
                            setSearchQuery(food);
                            handleSearch();
                          }}
                        >
                          {food}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Today's Log */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-green-400 to-teal-400 dark:from-green-700 dark:to-teal-700 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
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
                    <AnimatePresence>
                      {meals.map((meal, index) => (
                        <motion.div 
                          key={meal.id} 
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ delay: index * 0.1 }}
                          layout
                        >
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
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                                {meal.totalCalories} kcal
                              </Badge>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeMeal(meal.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                          
                          <div className="pl-10">
                            <div className="space-y-2">
                              {meal.foods.map((food, idx) => (
                                <motion.div 
                                  key={idx} 
                                  className="flex justify-between items-center"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + (idx * 0.1) }}
                                >
                                  <div className="text-sm">
                                    <span className="font-medium">{food.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                                      {food.serving}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-300">
                                    {food.calories} cal
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-3 flex justify-end">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 text-green-600 dark:text-green-400 hover:text-green-700"
                                  onClick={() => {
                                    setSearchQuery("");
                                    setShowSearchResults(true);
                                    toast({
                                      title: "Add food to meal",
                                      description: `Adding food to ${meal.name}`,
                                    });
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Food
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03 }} 
                      whileTap={{ scale: 0.97 }}
                      className="mt-4"
                    >
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                        onClick={() => {
                          const mealNames = ["Breakfast", "Morning Snack", "Lunch", "Afternoon Snack", "Dinner", "Evening Snack"];
                          const nextMeal = {
                            id: Date.now(),
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            name: mealNames[meals.length % mealNames.length],
                            foods: [],
                            totalCalories: 0
                          };
                          
                          setMeals([...meals, nextMeal]);
                          setSearchQuery("");
                          setShowSearchResults(true);
                          
                          toast({
                            title: "New meal added",
                            description: `${nextMeal.name} has been added to your log.`,
                          });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Meal
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Utensils className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
                    <h3 className="mt-4 font-medium">No meals logged yet</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Start logging your meals to track your nutrition
                    </p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      className="mt-4"
                    >
                      <Button
                        onClick={() => {
                          const firstMeal = {
                            id: Date.now(),
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            name: "Breakfast",
                            foods: [],
                            totalCalories: 0
                          };
                          
                          setMeals([firstMeal]);
                          setSearchQuery("");
                          setShowSearchResults(true);
                          
                          toast({
                            title: "First meal added",
                            description: "Let's start tracking your nutrition!",
                          });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Log Your First Meal
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="timeline" className="pt-4">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  
                  <AnimatePresence>
                    {meals.map((meal, idx) => (
                      <motion.div 
                        key={meal.id} 
                        className="relative pl-10 pb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div 
                          className="absolute left-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center z-10"
                          whileHover={{ scale: 1.2 }}
                        >
                          <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </motion.div>
                        
                        <motion.div 
                          className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                          whileHover={{ scale: 1.02 }}
                        >
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
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  <motion.div 
                    className="relative pl-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center z-10 border-2 border-dashed border-gray-400 dark:border-gray-500">
                      <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button 
                        variant="outline" 
                        className="border-dashed w-full"
                        onClick={() => {
                          const mealNames = ["Breakfast", "Morning Snack", "Lunch", "Afternoon Snack", "Dinner", "Evening Snack"];
                          const nextMeal = {
                            id: Date.now(),
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            name: mealNames[meals.length % mealNames.length],
                            foods: [],
                            totalCalories: 0
                          };
                          
                          setMeals([...meals, nextMeal]);
                          setSearchQuery("");
                          setShowSearchResults(true);
                          
                          toast({
                            title: "New meal added",
                            description: `${nextMeal.name} has been added to your log.`,
                          });
                        }}
                      >
                        Add Next Meal
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrients" className="pt-4">
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4">
                    <h3 className="font-medium">Macronutrient Balance</h3>
                    <div className="flex items-center">
                      <div className="w-32 text-sm">Carbs (55%)</div>
                      <div className="flex-grow h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 dark:bg-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: "55%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm">Protein (25%)</div>
                      <div className="flex-grow h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-purple-500 dark:bg-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: "25%" }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm">Fat (20%)</div>
                      <div className="flex-grow h-5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-yellow-500 dark:bg-yellow-600"
                          initial={{ width: 0 }}
                          animate={{ width: "20%" }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        ></motion.div>
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
                        <motion.div 
                          key={idx} 
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <div className="text-sm font-medium flex items-center">
                            <Info className="h-3 w-3 mr-1 text-gray-400" />
                            {nutrient.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{nutrient.amount}</div>
                            <div className="w-16 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-green-500 dark:bg-green-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${nutrient.percent}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.1 * idx }}
                              ></motion.div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{nutrient.percent}%</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                        onClick={() => {
                          toast({
                            title: "Nutrition report generated",
                            description: "Your detailed nutrition report is ready to view."
                          });
                          
                          launchConfetti({
                            particleCount: 30,
                            spread: 60,
                            origin: { y: 0.6 }
                          });
                        }}
                      >
                        <BarChart2 className="h-4 w-4 mr-2" />
                        View Full Nutrition Report
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NutritionTracker;
