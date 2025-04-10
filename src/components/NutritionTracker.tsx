
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Flame, Beef, Apple, Egg, Droplet, Utensils,
  BarChart, ArrowRight, Info, Filter, Carrot, Cherry,
  PlusCircle, Clock, CalendarDays, ArrowUp, ArrowDown,
  TrendingUp, TrendingDown, Heart, FileText, Star, Search,
  Activity, Check, AlignLeft, List, BookOpen, Salad, BookText
} from "lucide-react";

// Update the nutrition data to ensure unit is always defined
const nutritionData = {
  calories: { consumed: 1650, goal: 2200, unit: "kcal" },
  protein: { consumed: 75, goal: 110, unit: "g" },
  carbs: { consumed: 180, goal: 250, unit: "g" },
  fat: { consumed: 60, goal: 73, unit: "g" },
  fiber: { consumed: 18, goal: 30, unit: "g" }
};

// Sample journal entries
const journalEntries = [
  {
    id: 1,
    date: "2025-04-10",
    title: "Meal Prep Success",
    content: "Prepped all my meals for the week today. Grilled chicken, roasted vegetables, and quinoa. Feeling prepared for a healthy week!",
    mood: "Energetic",
    tags: ["meal prep", "organization", "healthy habits"]
  },
  {
    id: 2,
    date: "2025-04-09",
    title: "New Recipe Try",
    content: "Tried a new protein smoothie recipe with spinach, banana, protein powder, and almond milk. It was surprisingly delicious and kept me full until lunch.",
    mood: "Satisfied",
    tags: ["recipe", "protein", "breakfast"]
  },
  {
    id: 3,
    date: "2025-04-08",
    title: "Restaurant Challenge",
    content: "Went out to eat with friends. Managed to stick to my nutrition goals by ordering grilled fish with steamed vegetables. Proud of making a healthy choice!",
    mood: "Proud",
    tags: ["eating out", "willpower", "balance"]
  }
];

// Sample insights data
const insightData = [
  {
    title: "Protein Intake Trend",
    description: "Your protein intake has increased by 15% over the past week. Keep it up!",
    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    actionable: "Try to maintain at least 100g of protein daily for optimal muscle recovery."
  },
  {
    title: "Hydration Status",
    description: "You've been consistently meeting your water intake goals. Great job staying hydrated!",
    icon: <Droplet className="h-5 w-5 text-blue-500" />,
    actionable: "Continue drinking 8-10 cups of water daily."
  },
  {
    title: "Carb Cycling Pattern",
    description: "We've noticed you naturally cycle your carbs - higher on workout days, lower on rest days.",
    icon: <BarChart className="h-5 w-5 text-purple-500" />,
    actionable: "This pattern supports your activity level. Consider formalizing this approach."
  },
  {
    title: "Fiber Improvement Needed",
    description: "Your fiber intake is consistently below your target. This could affect digestive health.",
    icon: <TrendingDown className="h-5 w-5 text-orange-500" />,
    actionable: "Try adding more vegetables, fruits, and whole grains to reach 30g daily."
  }
];

// Food log data
const foodLogData = [
  { id: 1, name: "Breakfast - Oatmeal with Berries", calories: 320, protein: 12, carbs: 45, fat: 8, time: "7:30 AM", category: "breakfast" },
  { id: 2, name: "Morning Snack - Greek Yogurt", calories: 150, protein: 15, carbs: 8, fat: 3, time: "10:15 AM", category: "snack" },
  { id: 3, name: "Lunch - Grilled Chicken Salad", calories: 410, protein: 38, carbs: 25, fat: 18, time: "12:30 PM", category: "lunch" },
  { id: 4, name: "Afternoon Snack - Apple with Almond Butter", calories: 220, protein: 5, carbs: 22, fat: 12, time: "3:45 PM", category: "snack" },
  { id: 5, name: "Dinner - Salmon with Quinoa and Vegetables", calories: 650, protein: 45, carbs: 60, fat: 25, time: "7:00 PM", category: "dinner" }
];

const NutritionTracker = () => {
  const { toast } = useToast();
  const [calories, setCalories] = useState(nutritionData.calories.consumed);
  const [protein, setProtein] = useState(nutritionData.protein.consumed);
  const [carbs, setCarbs] = useState(nutritionData.carbs.consumed);
  const [fat, setFat] = useState(nutritionData.fat.consumed);
  const [fiber, setFiber] = useState(nutritionData.fiber.consumed);
  const [waterIntake, setWaterIntake] = useState(5);
  const [showGlowEffect, setShowGlowEffect] = useState(false);
  const [showCalorieDialog, setShowCalorieDialog] = useState(false);
  const [newCalories, setNewCalories] = useState(calories);
  const [templateSaved, setTemplateSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [journalEntry, setJournalEntry] = useState({ title: "", content: "", mood: "", tags: "" });
  const [entries, setEntries] = useState(journalEntries);
  const [foodLog, setFoodLog] = useState(foodLogData);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (showGlowEffect) {
      const timer = setTimeout(() => setShowGlowEffect(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showGlowEffect]);

  const handleInputChange = (nutrient: string, value: number) => {
    switch (nutrient) {
      case "calories":
        setCalories(value);
        break;
      case "protein":
        setProtein(value);
        break;
      case "carbs":
        setCarbs(value);
        break;
      case "fat":
        setFat(value);
        break;
      case "fiber":
        setFiber(value);
        break;
      default:
        break;
    }
  };

  const handleAddWater = () => {
    if (waterIntake < 8) {
      setWaterIntake(waterIntake + 1);
      setShowGlowEffect(true);
      toast({
        title: "Water intake updated",
        description: `You've logged ${waterIntake + 1} cups of water today.`,
      });
      
      // Trigger a small confetti effect when reaching 8 cups
      if (waterIntake === 7) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleSaveCalories = () => {
    setCalories(newCalories);
    setShowCalorieDialog(false);
    toast({
      title: "Calories updated",
      description: `Your daily calorie intake has been updated to ${newCalories} kcal.`,
    });
  };

  const handleSaveTemplate = () => {
    setTemplateSaved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast({
      title: "Template saved",
      description: "Your meal template has been saved successfully.",
    });
  };

  const handleJournalEntryChange = (field: string, value: string) => {
    setJournalEntry({
      ...journalEntry,
      [field]: value
    });
  };

  const handleAddJournalEntry = () => {
    if (journalEntry.title.trim() === "" || journalEntry.content.trim() === "") {
      toast({
        title: "Missing information",
        description: "Please provide a title and content for your journal entry.",
        variant: "destructive"
      });
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: journalEntry.title,
      content: journalEntry.content,
      mood: journalEntry.mood || "Neutral",
      tags: journalEntry.tags ? journalEntry.tags.split(',').map(tag => tag.trim()) : []
    };

    setEntries([newEntry, ...entries]);
    setJournalEntry({ title: "", content: "", mood: "", tags: "" });
    setShowNewEntryForm(false);

    toast({
      title: "Journal entry added",
      description: "Your nutrition journal entry has been saved.",
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const filterJournalEntries = () => {
    if (!searchQuery) return entries;
    
    return entries.filter(entry => 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleAddFood = () => {
    toast({
      title: "Add food",
      description: "The food adding interface would appear here.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Helper function to get category colors
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "breakfast": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "lunch": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "dinner": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "snack": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      className={`space-y-6 ${showGlowEffect ? 'animate-pulse' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {showGlowEffect && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-400 dark:bg-blue-600 blur-xl opacity-20 z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="logs">Food Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <Card className="shadow-md overflow-hidden border-0 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 h-32 w-32 bg-green-400 dark:bg-green-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                  Nutrition Overview
                </CardTitle>
                <CardDescription>
                  Track your daily macronutrient and water intake
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(nutritionData).filter(([key]) => key !== 'calories').map(([key, data]) => (
                    <motion.div key={key} className="flex flex-col items-center" variants={itemVariants}>
                      <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                        {key === 'protein' && <Beef className="h-5 w-5 text-green-600 dark:text-green-400" />}
                        {key === 'carbs' && <Apple className="h-5 w-5 text-green-600 dark:text-green-400" />}
                        {key === 'fat' && <Egg className="h-5 w-5 text-green-600 dark:text-green-400" />}
                        {key === 'fiber' && <Carrot className="h-5 w-5 text-green-600 dark:text-green-400" />}
                      </div>
                      <h3 className="text-lg font-medium capitalize mb-1">{key}</h3>
                      <div className="text-3xl font-bold mb-2">
                        {key === 'protein' ? protein : key === 'carbs' ? carbs : key === 'fat' ? fat : fiber}
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{data.unit}</span>
                      </div>
                      <Progress
                        value={((key === 'protein' ? protein : key === 'carbs' ? carbs : key === 'fat' ? fat : fiber) / data.goal) * 100}
                        className="h-2 w-full mb-1 transition-all duration-300 hover:h-3"
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {key === 'protein' ? protein : key === 'carbs' ? carbs : key === 'fat' ? fat : fiber} / {data.goal} {data.unit}
                      </div>
                    </motion.div>
                  ))}

                  <motion.div className="flex flex-col items-center" variants={itemVariants}>
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
                      <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium capitalize mb-1">Water</h3>
                    <div className="text-3xl font-bold mb-2">
                      {waterIntake}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">cups</span>
                    </div>
                    <Progress
                      value={(waterIntake / 8) * 100}
                      className="h-2 w-full mb-1 transition-all duration-300 hover:h-3"
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {waterIntake} / 8 cups
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-6"
          >
            <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Daily Progress
                </CardTitle>
                <CardDescription>
                  Monitor your daily nutrient intake and stay on track
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <h3 className="font-medium mb-2">Calorie Intake</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Consumed</span>
                      <span className="text-sm font-medium">{calories} kcal</span>
                    </div>
                    <Button
                      onClick={() => setShowCalorieDialog(true)}
                      className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
                    >
                      <span className="relative z-10">Update Calories</span>
                      <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300 rounded"></span>
                    </Button>
                    <Progress 
                      value={(calories / nutritionData.calories.goal) * 100} 
                      className="h-2 transition-all duration-300 hover:h-3" 
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>0 kcal</span>
                      <span>{nutritionData.calories.goal} kcal</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="font-medium mb-2">Water Intake</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Consumed</span>
                      <span className="text-sm font-medium">{waterIntake} cups</span>
                    </div>
                    <Button 
                      onClick={handleAddWater} 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
                    >
                      <span className="relative z-10">Add Water</span>
                      <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300 rounded"></span>
                    </Button>
                    <Progress 
                      value={(waterIntake / 8) * 100} 
                      className="h-2 mt-3 transition-all duration-300 hover:h-3" 
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>0 cups</span>
                      <span>8 cups</span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="journal">
          <Card className="shadow-md border-0">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <BookText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Nutrition Journal
                  </CardTitle>
                  <CardDescription>
                    Track your food habits, reflections, and nutrition journey
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setShowNewEntryForm(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {showNewEntryForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border rounded-lg p-4 mb-6"
                  >
                    <h3 className="font-medium mb-3">New Journal Entry</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input 
                          placeholder="Enter a title for your entry"
                          value={journalEntry.title}
                          onChange={(e) => handleJournalEntryChange('title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <Textarea 
                          placeholder="What are your thoughts on your nutrition today?"
                          className="min-h-32"
                          value={journalEntry.content}
                          onChange={(e) => handleJournalEntryChange('content', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Mood</label>
                          <Input 
                            placeholder="How are you feeling? (e.g., Energetic, Tired)"
                            value={journalEntry.mood}
                            onChange={(e) => handleJournalEntryChange('mood', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tags</label>
                          <Input 
                            placeholder="Enter tags separated by commas"
                            value={journalEntry.tags}
                            onChange={(e) => handleJournalEntryChange('tags', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="outline" onClick={() => setShowNewEntryForm(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddJournalEntry}>
                          Save Entry
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search journal entries..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="ml-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {filterJournalEntries().length > 0 ? (
                <div className="space-y-4">
                  {filterJournalEntries().map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{entry.title}</h3>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {entry.date}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{entry.content}</p>
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(entry.tags) && entry.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          Mood: {entry.mood}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border rounded-lg">
                  <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="font-medium text-lg mb-1">No journal entries found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {searchQuery ? "No entries match your search" : "Start writing about your nutrition journey"}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setShowNewEntryForm(true)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create First Entry
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="shadow-md border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Activity className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Nutrition Insights
              </CardTitle>
              <CardDescription>
                Personalized analysis and recommendations based on your nutrition data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <Star className="h-4 w-4 mr-2 text-amber-500" />
                    Key Insights
                  </h3>
                  
                  <div className="space-y-3">
                    {insightData.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3">
                            {insight.icon}
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {insight.description}
                            </p>
                            <div className="text-xs bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded">
                              <span className="font-medium">Tip:</span> {insight.actionable}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                    Weekly Nutrition Trends
                  </h3>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Macronutrient Distribution</h4>
                    <div className="h-40 bg-gray-50 dark:bg-gray-800 rounded flex items-end justify-between p-3">
                      {/* Simulated chart bars */}
                      {[0.65, 0.8, 0.55, 0.9, 0.7, 0.85, 0.75].map((height, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: `${height * 120}px` }}></div>
                          <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-2">
                      <Badge className="mx-1 bg-green-100 text-green-800">Protein</Badge>
                      <Badge className="mx-1 bg-blue-100 text-blue-800">Carbs</Badge>
                      <Badge className="mx-1 bg-amber-100 text-amber-800">Fat</Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Nutrient Quality Score</h4>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold">78</span>
                      <span className="text-sm text-gray-500 ml-2">/ 100</span>
                      <Badge className="ml-auto">Good</Badge>
                    </div>
                    <Progress value={78} className="h-2 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your diet is well-balanced but could use more variety in vegetables and whole grains.
                    </p>
                  </div>
                  
                  <Card className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Increase fiber intake by adding more vegetables and fruits</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Consider adding omega-3 rich foods like salmon or flaxseeds</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Try to distribute protein intake more evenly throughout the day</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-3">
                      <Button variant="outline" className="w-full">
                        View Detailed Analysis
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="shadow-md border-0">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Food Logs
                  </CardTitle>
                  <CardDescription>
                    Track your meals and monitor your daily nutrition intake
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleAddFood}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Food
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search foods..."
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" className="ml-2">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <h3 className="font-medium">Today's Food Log</h3>
                <div className="space-y-3">
                  {foodLog.map((food) => (
                    <motion.div
                      key={food.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between items-start p-3 border rounded-lg hover:shadow-sm transition-shadow"
                    >
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
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div>
                      <h4 className="font-medium">Daily Total</h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        5 items logged
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {foodLog.reduce((sum, food) => sum + food.calories, 0)} cal
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        P: {foodLog.reduce((sum, food) => sum + food.protein, 0)}g • 
                        C: {foodLog.reduce((sum, food) => sum + food.carbs, 0)}g • 
                        F: {foodLog.reduce((sum, food) => sum + food.fat, 0)}g
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
                  <Button variant="outline" onClick={handleSaveTemplate}>
                    <FileText className="h-4 w-4 mr-2" />
                    Save as Meal Template
                  </Button>
                  
                  <Button onClick={() => toast({
                    title: "Feature coming soon",
                    description: "The meal planning feature will be available in the next update."
                  })}>
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Plan Next Week's Meals
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showCalorieDialog} onOpenChange={setShowCalorieDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Calorie Intake</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Daily Calories</label>
              <Input
                type="number"
                value={newCalories}
                onChange={(e) => setNewCalories(parseInt(e.target.value) || 0)}
                className="w-full"
              />
            </div>
            <div className="text-sm text-gray-500">
              Your recommended daily intake is {nutritionData.calories.goal} kcal based on your profile.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalorieDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCalories}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default NutritionTracker;
