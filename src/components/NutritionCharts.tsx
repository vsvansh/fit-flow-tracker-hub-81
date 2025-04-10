
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChartContainer,
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart2, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  TrendingUp, 
  Calendar, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from "lucide-react";

// Weekly nutrient data
const weeklyNutrientData = [
  { day: "Mon", vitaminA: 75, vitaminC: 60, vitaminD: 8, calcium: 800, iron: 12 },
  { day: "Tue", vitaminA: 78, vitaminC: 65, vitaminD: 10, calcium: 820, iron: 14 },
  { day: "Wed", vitaminA: 80, vitaminC: 62, vitaminD: 9, calcium: 850, iron: 13 },
  { day: "Thu", vitaminA: 82, vitaminC: 70, vitaminD: 11, calcium: 870, iron: 15 },
  { day: "Fri", vitaminA: 79, vitaminC: 68, vitaminD: 12, calcium: 900, iron: 16 },
  { day: "Sat", vitaminA: 83, vitaminC: 72, vitaminD: 14, calcium: 920, iron: 15 },
  { day: "Sun", vitaminA: 80, vitaminC: 65, vitaminD: 10, calcium: 850, iron: 14 }
];

// Nutrient distribution data
const nutrientDistributionData = [
  { name: "Fat-soluble Vitamins", value: 28, color: "#8884d8" },
  { name: "Water-soluble Vitamins", value: 32, color: "#82ca9d" },
  { name: "Minerals", value: 30, color: "#ffc658" },
  { name: "Other", value: 10, color: "#ff8042" }
];

// Goal achievement data
const goalAchievementData = [
  { name: "Vitamin A", achieved: 80, target: 100 },
  { name: "Vitamin C", achieved: 65, target: 90 },
  { name: "Vitamin D", achieved: 10, target: 20 },
  { name: "Vitamin E", achieved: 12, target: 15 },
  { name: "Calcium", achieved: 850, target: 1000 },
  { name: "Iron", achieved: 14, target: 18 },
];

// Nutrient intake time distribution
const intakeTimeData = [
  { time: "Morning", percentage: 35, color: "#ffc658" },
  { time: "Afternoon", percentage: 40, color: "#8884d8" },
  { time: "Evening", percentage: 25, color: "#82ca9d" },
];

const NutritionCharts = () => {
  const { toast } = useToast();
  const [activeChart, setActiveChart] = useState("trends");
  const [selectedNutrient, setSelectedNutrient] = useState("vitaminA");

  const chartConfig = {
    vitaminA: { color: "#8884d8", label: "Vitamin A" },
    vitaminC: { color: "#82ca9d", label: "Vitamin C" },
    vitaminD: { color: "#ffc658", label: "Vitamin D" },
    calcium: { color: "#ff8042", label: "Calcium" },
    iron: { color: "#0088FE", label: "Iron" },
  };

  const handleDataPointClick = (data: any) => {
    toast({
      title: `${data.day} Details`,
      description: `Vitamin A: ${data.vitaminA}μg, Vitamin C: ${data.vitaminC}mg, Vitamin D: ${data.vitaminD}μg`,
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
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <Card className="shadow-md bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-0">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-xl">
              <BarChart2 className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
              Nutrition Analytics
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant={activeChart === "trends" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveChart("trends")}
                className="h-8"
              >
                <LineChartIcon className="h-4 w-4 mr-1" />
                Trends
              </Button>
              <Button 
                variant={activeChart === "distribution" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveChart("distribution")}
                className="h-8"
              >
                <PieChartIcon className="h-4 w-4 mr-1" />
                Distribution
              </Button>
              <Button 
                variant={activeChart === "goals" ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveChart("goals")}
                className="h-8"
              >
                <Activity className="h-4 w-4 mr-1" />
                Goals
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeChart === "trends" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Weekly Nutrient Trends</h3>
                <div className="flex gap-2">
                  {Object.entries(chartConfig).map(([key, config]) => (
                    <Badge 
                      key={key}
                      variant={selectedNutrient === key ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedNutrient(key)}
                      style={{ backgroundColor: selectedNutrient === key ? config.color : undefined }}
                    >
                      {config.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="h-80 w-full">
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    data={weeklyNutrientData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartConfig[selectedNutrient as keyof typeof chartConfig].color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={chartConfig[selectedNutrient as keyof typeof chartConfig].color} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey={selectedNutrient} 
                      stroke={chartConfig[selectedNutrient as keyof typeof chartConfig].color} 
                      fillOpacity={1} 
                      fill="url(#colorUv)" 
                      activeDot={{ 
                        r: 8, 
                        onClick: (_, index) => handleDataPointClick(weeklyNutrientData[index]) 
                      }}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(chartConfig).map(([key, config]) => {
                  const lastIndex = weeklyNutrientData.length - 1;
                  const currentValue = weeklyNutrientData[lastIndex][key as keyof typeof weeklyNutrientData[0]] as number;
                  const previousValue = weeklyNutrientData[lastIndex - 1][key as keyof typeof weeklyNutrientData[0]] as number;
                  const change = ((currentValue - previousValue) / previousValue) * 100;
                  
                  return (
                    <Card key={key} className="bg-white dark:bg-gray-800">
                      <CardContent className="pt-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">{config.label}</p>
                            <p className="text-2xl font-bold mt-1">
                              {currentValue}
                              <span className="text-xs font-normal ml-1">
                                {key === 'vitaminA' || key === 'vitaminD' ? 'μg' : key === 'vitaminC' ? 'mg' : 'mg'}
                              </span>
                            </p>
                          </div>
                          <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change >= 0 ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-xs font-medium">{Math.abs(change).toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          {activeChart === "distribution" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Nutrient Category Distribution</h3>
                  <div className="h-64 w-full">
                    <ChartContainer config={{}}>
                      <PieChart>
                        <Pie
                          data={nutrientDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {nutrientDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Nutrient Intake By Time of Day</h3>
                  <div className="h-64 w-full">
                    <ChartContainer config={{}}>
                      <PieChart>
                        <Pie
                          data={intakeTimeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="percentage"
                          label={({ time, percentage }) => `${time}: ${percentage}%`}
                        >
                          {intakeTimeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>
              
              <Card className="bg-blue-50 dark:bg-blue-900/20 p-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 mr-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Distribution Insight</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      Your nutrient intake is well-balanced across categories. For optimal absorption, consider spacing 
                      out your mineral intake throughout the day rather than concentrating in the afternoon.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeChart === "goals" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="font-medium mb-3">Nutrient Goal Achievement</h3>
              <div className="h-80 w-full">
                <ChartContainer config={{}}>
                  <BarChart
                    data={goalAchievementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barGap={0}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Achieved" dataKey="achieved" fill="#8884d8" />
                    <Bar name="Target" dataKey="target" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goalAchievementData.map((item, index) => {
                  const percentage = Math.round((item.achieved / item.target) * 100);
                  return (
                    <Card key={index} className="bg-white dark:bg-gray-800">
                      <CardContent className="pt-5">
                        <div className="space-y-2">
                          <p className="font-medium">{item.name}</p>
                          <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <div 
                              className={`h-full rounded-full ${
                                percentage >= 100 ? 'bg-green-500' : 
                                percentage >= 80 ? 'bg-blue-500' : 
                                percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{item.achieved} / {item.target}</span>
                            <span>{percentage}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-purple-600 border-purple-300 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-700 dark:hover:bg-purple-900/20"
            >
              <Calendar className="h-4 w-4 mr-1" />
              View Historical Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NutritionCharts;
