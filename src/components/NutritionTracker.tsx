
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Beef, Apple, Egg, Droplet, Utensils,
  BarChart, ArrowRight, Info, Filter, Carrot, Cherry,
  PlusCircle, Clock, CalendarDays, ArrowUp, ArrowDown,
  TrendingUp, TrendingDown, Heart, FileText, Star,
  Activity, Check
} from "lucide-react";
import confetti from "canvas-confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// Update the nutrition data to ensure unit is always defined
const nutritionData = {
  calories: { consumed: 1650, goal: 2200, unit: "kcal" },
  protein: { consumed: 75, goal: 110, unit: "g" },
  carbs: { consumed: 180, goal: 250, unit: "g" },
  fat: { consumed: 60, goal: 73, unit: "g" },
  fiber: { consumed: 18, goal: 30, unit: "g" }
};

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
