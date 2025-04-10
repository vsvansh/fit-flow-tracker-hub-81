
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, PieChart, Flame, Apple, Heart, Utensils, Plus, 
  ArrowRight, Coffee, AlertCircle, Lightbulb, Star 
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { motion } from "framer-motion";

// Data for nutrition trends
const weeklyNutritionData = [
  { day: "Mon", calories: 2100, protein: 120, carbs: 220, fat: 70 },
  { day: "Tue", calories: 1950, protein: 115, carbs: 200, fat: 65 },
  { day: "Wed", calories: 2250, protein: 135, carbs: 230, fat: 75 },
  { day: "Thu", calories: 2000, protein: 125, carbs: 210, fat: 65 },
  { day: "Fri", calories: 2300, protein: 140, carbs: 240, fat: 80 },
  { day: "Sat", calories: 2500, protein: 150, carbs: 260, fat: 85 },
  { day: "Sun", calories: 2150, protein: 130, carbs: 220, fat: 70 },
];

// Data for macronutrient breakdown
const macrosData = [
  { name: "Protein", value: 130, color: "#3B82F6" },
  { name: "Carbs", value: 220, color: "#F59E0B" },
  { name: "Fat", value: 70, color: "#8B5CF6" },
];

// Nutrient intake data
const nutrientData = [
  { name: "Protein", amount: 130, goal: 140, unit: "g", percent: 93 },
  { name: "Carbs", amount: 220, goal: 250, unit: "g", percent: 88 },
  { name: "Fat", amount: 70, goal: 80, unit: "g", percent: 88 },
  { name: "Fiber", amount: 28, goal: 35, unit: "g", percent: 80 },
  { name: "Sugar", amount: 45, goal: 50, unit: "g", percent: 90 },
  { name: "Sodium", amount: 1800, goal: 2300, unit: "mg", percent: 78 },
  { name: "Calcium", amount: 950, goal: 1200, unit: "mg", percent: 79 },
  { name: "Iron", amount: 14, goal: 18, unit: "mg", percent: 78 },
  { name: "Vitamin D", amount: 15, goal: 20, unit: "mcg", percent: 75 },
  { name: "Vitamin C", amount: 85, goal: 90, unit: "mg", percent: 94 },
];

// Food recommendations
const recommendations = [
  {
    title: "Add More Leafy Greens",
    description: "You're low on vitamin K and folate. Try adding kale or spinach to your diet.",
    icon: <Apple className="h-5 w-5 text-green-500" />,
    type: "nutrient"
  },
  {
    title: "Increase Protein at Breakfast",
    description: "Your protein intake is lower in the morning. Try adding eggs or Greek yogurt.",
    icon: <Utensils className="h-5 w-5 text-blue-500" />,
    type: "timing"
  },
  {
    title: "Hydration Reminder",
    description: "Your water tracking shows under 60% of your daily goal. Try setting reminders.",
    icon: <Coffee className="h-5 w-5 text-cyan-500" />,
    type: "hydration"
  },
  {
    title: "Reduce Added Sugars",
    description: "Your sugar intake is trending up this week. Check food labels for hidden sugars.",
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    type: "warning"
  },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white dark:bg-gray-800 border shadow-md rounded">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} ${entry.unit || ""}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const NutritionInsights = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [selectedNutrient, setSelectedNutrient] = useState("All");

  // Filter nutrients based on selection
  const filteredNutrients = selectedNutrient === "All" 
    ? nutrientData 
    : selectedNutrient === "Macros"
      ? nutrientData.filter(n => ["Protein", "Carbs", "Fat"].includes(n.name))
      : selectedNutrient === "Vitamins"
        ? nutrientData.filter(n => n.name.includes("Vitamin"))
        : selectedNutrient === "Minerals"
          ? nutrientData.filter(n => ["Calcium", "Iron", "Sodium"].includes(n.name))
          : nutrientData;

  // Button colors for recommendation types
  const getRecommendationColor = (type: string) => {
    switch (type) {
      case "nutrient": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "timing": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "hydration": return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
      case "warning": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
            <CardTitle className="text-xl font-bold">Nutrition Insights</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="nutrients">Nutrient Tracking</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Weekly Calorie Intake</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={weeklyNutritionData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="calories" 
                        name="Calories" 
                        fill="#3B82F6" 
                        radius={[4, 4, 0, 0]} 
                        unit="kcal"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Macronutrient Breakdown</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={macrosData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {macrosData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Protein Intake by Day</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={weeklyNutritionData}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                          dataKey="protein" 
                          name="Protein" 
                          fill="#8B5CF6" 
                          radius={[4, 4, 0, 0]} 
                          unit="g"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Weekly Insight</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      Your protein intake is consistently higher on workout days. Keep up the good work with your 
                      post-workout nutrition. Consider slightly increasing carbs on workout days for optimal recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrients">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Nutrient Tracking</h3>
                <div className="flex space-x-2">
                  {["All", "Macros", "Vitamins", "Minerals"].map((filter) => (
                    <Badge
                      key={filter}
                      variant={selectedNutrient === filter ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedNutrient(filter)}
                    >
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNutrients.map((nutrient) => (
                  <motion.div
                    key={nutrient.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="font-medium">{nutrient.name}</span>
                        {nutrient.percent < 70 && (
                          <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-700">
                            Low
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {nutrient.amount} / {nutrient.goal} {nutrient.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          nutrient.percent < 70 
                            ? "bg-amber-500" 
                            : nutrient.percent > 100 
                              ? "bg-blue-500" 
                              : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(nutrient.percent, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{nutrient.percent}%</span>
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                      >
                        {nutrient.percent < 70 ? "Needs attention" : 
                         nutrient.percent < 90 ? "Good" : "Excellent"}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Daily Macro Balance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="block text-sm text-gray-600 dark:text-gray-300">Protein</span>
                    <span className="block text-xl font-bold text-blue-600 dark:text-blue-400">28%</span>
                    <span className="block text-xs text-gray-500">130g / 1950 cal</span>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span className="block text-sm text-gray-600 dark:text-gray-300">Carbs</span>
                    <span className="block text-xl font-bold text-orange-600 dark:text-orange-400">45%</span>
                    <span className="block text-xs text-gray-500">220g / 1950 cal</span>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="block text-sm text-gray-600 dark:text-gray-300">Fat</span>
                    <span className="block text-xl font-bold text-purple-600 dark:text-purple-400">27%</span>
                    <span className="block text-xs text-gray-500">70g / 1950 cal</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium">Daily Target: 1950 calories</span>
                  <Progress value={92} className="h-2 mt-1" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1750 calories consumed</span>
                    <span>92% of daily goal</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Personalized Recommendations</h3>
                <div className="grid grid-cols-1 gap-4">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 mr-3 ${getRecommendationColor(rec.type)}`}>
                          {rec.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{rec.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {rec.description}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-blue-600 dark:text-blue-400">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Top Foods to Add</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: "Salmon", benefits: "Omega-3, Protein", icon: <Heart className="h-4 w-4 text-red-500" /> },
                    { name: "Spinach", benefits: "Iron, Vitamin K", icon: <Apple className="h-4 w-4 text-green-500" /> },
                    { name: "Greek Yogurt", benefits: "Protein, Calcium", icon: <Star className="h-4 w-4 text-amber-500" /> },
                    { name: "Blueberries", benefits: "Antioxidants", icon: <Apple className="h-4 w-4 text-blue-500" /> },
                    { name: "Almonds", benefits: "Healthy Fats, Vitamin E", icon: <Flame className="h-4 w-4 text-orange-500" /> },
                    { name: "Quinoa", benefits: "Fiber, Complete Protein", icon: <Apple className="h-4 w-4 text-amber-500" /> },
                  ].map((food, index) => (
                    <div key={index} className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
                          {food.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{food.name}</h4>
                          <p className="text-xs text-gray-500">{food.benefits}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                    <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-300">Nutrition Tip of the Day</h4>
                    <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                      Try the "plate method" for easy portion control: fill half your plate with vegetables, 
                      one quarter with lean protein, and one quarter with whole grains or starchy vegetables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NutritionInsights;
