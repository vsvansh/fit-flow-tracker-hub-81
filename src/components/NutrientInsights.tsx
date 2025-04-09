
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart2, Heart, ArrowRight, Info, Calendar, 
  TrendingUp, TrendingDown, BarChart, PieChart, Activity
} from "lucide-react";
import { launchConfetti } from "@/utils/confettiUtil";

// Sample nutrient data
const nutrientData = [
  { name: "Vitamin A", value: 80, goal: 100, unit: "μg", category: "Fat-soluble Vitamins" },
  { name: "Vitamin C", value: 65, goal: 90, unit: "mg", category: "Water-soluble Vitamins" },
  { name: "Vitamin D", value: 10, goal: 20, unit: "μg", category: "Fat-soluble Vitamins" },
  { name: "Vitamin E", value: 12, goal: 15, unit: "mg", category: "Fat-soluble Vitamins" },
  { name: "Vitamin K", value: 70, goal: 120, unit: "μg", category: "Fat-soluble Vitamins" },
  { name: "Vitamin B1", value: 1.1, goal: 1.2, unit: "mg", category: "Water-soluble Vitamins" },
  { name: "Vitamin B2", value: 1.2, goal: 1.3, unit: "mg", category: "Water-soluble Vitamins" },
  { name: "Vitamin B3", value: 14, goal: 16, unit: "mg", category: "Water-soluble Vitamins" },
  { name: "Vitamin B6", value: 1.6, goal: 1.7, unit: "mg", category: "Water-soluble Vitamins" },
  { name: "Vitamin B12", value: 2.2, goal: 2.4, unit: "μg", category: "Water-soluble Vitamins" },
  { name: "Folate", value: 320, goal: 400, unit: "μg", category: "Water-soluble Vitamins" },
  { name: "Calcium", value: 850, goal: 1000, unit: "mg", category: "Minerals" },
  { name: "Iron", value: 14, goal: 18, unit: "mg", category: "Minerals" },
  { name: "Magnesium", value: 310, goal: 400, unit: "mg", category: "Minerals" },
  { name: "Zinc", value: 9, goal: 11, unit: "mg", category: "Minerals" },
  { name: "Potassium", value: 3200, goal: 4700, unit: "mg", category: "Minerals" },
  { name: "Sodium", value: 1800, goal: 2300, unit: "mg", category: "Minerals" },
  { name: "Selenium", value: 50, goal: 55, unit: "μg", category: "Minerals" },
  { name: "Fiber", value: 22, goal: 30, unit: "g", category: "Other" },
  { name: "Omega-3", value: 1.2, goal: 1.6, unit: "g", category: "Other" }
];

// Weekly trends
const weeklyTrends = [
  { nutrient: "Calcium", trend: "+12%", direction: "up" },
  { nutrient: "Vitamin D", trend: "+20%", direction: "up" },
  { nutrient: "Iron", trend: "-5%", direction: "down" },
  { nutrient: "Fiber", trend: "+8%", direction: "up" },
  { nutrient: "Sodium", trend: "-10%", direction: "down" },
];

// Recommendations based on data
const recommendations = [
  {
    nutrient: "Vitamin D",
    message: "Your Vitamin D levels are improving but still below optimal. Consider more sunlight exposure or supplementation.",
    actions: ["Add fatty fish to diet", "15 min daily sunlight", "Consider supplements"]
  },
  {
    nutrient: "Iron",
    message: "Your iron intake has decreased this week. Add more iron-rich foods to prevent deficiency.",
    actions: ["Add leafy greens", "Include lean meat", "Pair with Vitamin C for absorption"]
  },
  {
    nutrient: "Fiber",
    message: "Great progress on fiber intake! Keep including whole grains and vegetables in your meals.",
    actions: ["Continue with whole grains", "Add more vegetables", "Stay hydrated"]
  }
];

const NutrientInsights = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("list");
  
  // Filter nutrients based on selected category
  const filteredNutrients = selectedCategory === "All" 
    ? nutrientData 
    : nutrientData.filter(nutrient => nutrient.category === selectedCategory);
  
  // Categories for filtering
  const categories = ["All", ...new Set(nutrientData.map(item => item.category))];
  
  // Handle clicking on a nutrient for more info
  const handleNutrientClick = (nutrient: typeof nutrientData[0]) => {
    const percentage = Math.round((nutrient.value / nutrient.goal) * 100);
    
    toast({
      title: `${nutrient.name} Details`,
      description: `Current: ${nutrient.value}${nutrient.unit} (${percentage}% of daily goal)`,
    });
    
    // Launch confetti for nutrients at 100% or more
    if (percentage >= 100) {
      launchConfetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-md overflow-hidden border-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardHeader className="pb-2 relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <CardTitle className="text-xl font-bold flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
              Nutrient Insights
            </CardTitle>
            <CardDescription>
              Track your micronutrient intake and discover patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="w-full">
                  {categories.map(category => (
                    <TabsTrigger key={category} value={category} className="flex-1">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="flex space-x-2 ml-4">
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-2"
                >
                  <BarChart className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "chart" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setViewMode("chart")}
                  className="h-8 px-2"
                >
                  <PieChart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {viewMode === "list" ? (
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredNutrients.map((nutrient, idx) => (
                  <motion.div 
                    key={nutrient.name} 
                    className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer hover:border-purple-200 dark:hover:border-purple-700"
                    onClick={() => handleNutrientClick(nutrient)}
                    variants={itemVariants}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{nutrient.name}</div>
                      <Badge className={
                        (nutrient.value / nutrient.goal) >= 1 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        (nutrient.value / nutrient.goal) >= 0.8 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                        (nutrient.value / nutrient.goal) >= 0.5 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }>
                        {Math.round((nutrient.value / nutrient.goal) * 100)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">{nutrient.value} / {nutrient.goal} {nutrient.unit}</span>
                    </div>
                    <Progress 
                      value={(nutrient.value / nutrient.goal) * 100} 
                      className={`h-2 ${
                        (nutrient.value / nutrient.goal) >= 1 ? '[&>div]:bg-green-500' :
                        (nutrient.value / nutrient.goal) >= 0.8 ? '[&>div]:bg-blue-500' :
                        (nutrient.value / nutrient.goal) >= 0.5 ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-red-500'
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex justify-center items-center h-80 mt-4">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Activity className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive nutrient chart view coming soon!</p>
                  <Button className="mt-4" onClick={() => setViewMode("list")}>
                    Switch to List View
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Weekly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyTrends.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <div className="flex items-center">
                      {item.direction === "up" ? (
                        <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mr-2">
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/30 mr-2">
                          <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                      )}
                      <span>{item.nutrient}</span>
                    </div>
                    <Badge className={
                      item.direction === "up" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }>
                      {item.trend}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20">
                View Detailed Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-md bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center">
                <Heart className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <motion.div 
                    key={idx} 
                    className="border border-green-100 dark:border-green-900/30 rounded-lg p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-lg p-3 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium flex items-center">
                        <Badge className="mr-2 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
                          {rec.nutrient}
                        </Badge>
                      </div>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                      {rec.message}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {rec.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20">
                Get More Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
              Upcoming Nutrient Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  title: "Weekly Summary", 
                  description: "Review of this week's nutrient intake",
                  date: "Sunday",
                  status: "upcoming"
                },
                { 
                  title: "Monthly Analysis", 
                  description: "Detailed nutritional patterns and trends",
                  date: "May 1",
                  status: "scheduled"
                },
                { 
                  title: "Quarterly Review", 
                  description: "Long-term progress and recommendations",
                  date: "June 30",
                  status: "planned"
                }
              ].map((report, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline">
                      {report.date}
                    </Badge>
                    <Badge className={
                      report.status === "upcoming" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                      report.status === "scheduled" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                    }>
                      {report.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NutrientInsights;
