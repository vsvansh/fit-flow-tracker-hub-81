
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import {
  BarChart2, PieChart as PieChartIcon, TrendingUp, 
  Info, Calendar, ChevronDown, ArrowUp, ArrowDown, 
  AlertCircle, HelpCircle, Download, Filter
} from "lucide-react";

// Sample nutrient data
const nutrientSummaryData = {
  macros: [
    { name: "Protein", value: 95, goal: 120, unit: "g" },
    { name: "Carbs", value: 180, goal: 250, unit: "g" },
    { name: "Fat", value: 62, goal: 70, unit: "g" },
    { name: "Fiber", value: 22, goal: 30, unit: "g" }
  ],
  vitamins: [
    { name: "Vitamin A", value: 850, goal: 900, unit: "μg" },
    { name: "Vitamin C", value: 85, goal: 90, unit: "mg" },
    { name: "Vitamin D", value: 12, goal: 20, unit: "μg" },
    { name: "Vitamin E", value: 10, goal: 15, unit: "mg" },
    { name: "Vitamin K", value: 95, goal: 120, unit: "μg" },
    { name: "Vitamin B12", value: 2.8, goal: 2.4, unit: "μg" }
  ],
  minerals: [
    { name: "Calcium", value: 950, goal: 1200, unit: "mg" },
    { name: "Iron", value: 12, goal: 18, unit: "mg" },
    { name: "Magnesium", value: 320, goal: 400, unit: "mg" },
    { name: "Potassium", value: 3200, goal: 4700, unit: "mg" },
    { name: "Zinc", value: 9, goal: 11, unit: "mg" }
  ],
  others: [
    { name: "Omega-3", value: 1.2, goal: 1.6, unit: "g" },
    { name: "Sodium", value: 1850, goal: 2300, unit: "mg" },
    { name: "Cholesterol", value: 210, goal: 300, unit: "mg" }
  ]
};

// Sample historical data for charts
const weeklyNutrientData = [
  { day: "Mon", protein: 88, carbs: 210, fat: 60, fiber: 20, calories: 1850 },
  { day: "Tue", protein: 92, carbs: 190, fat: 58, fiber: 22, calories: 1780 },
  { day: "Wed", protein: 105, carbs: 170, fat: 65, fiber: 25, calories: 1920 },
  { day: "Thu", protein: 85, carbs: 200, fat: 55, fiber: 18, calories: 1740 },
  { day: "Fri", protein: 95, carbs: 180, fat: 62, fiber: 22, calories: 1820 },
  { day: "Sat", protein: 110, carbs: 220, fat: 70, fiber: 28, calories: 2050 },
  { day: "Sun", protein: 100, carbs: 240, fat: 68, fiber: 24, calories: 2120 }
];

// Data for macro distribution pie chart
const macroPieData = [
  { name: "Protein", value: 95 * 4 },  // Protein (4 calories per gram)
  { name: "Carbs", value: 180 * 4 },   // Carbs (4 calories per gram)
  { name: "Fat", value: 62 * 9 }       // Fat (9 calories per gram)
];

// Food source data
const foodSourceData = [
  { name: "Vegetables", percentage: 22, status: "good" },
  { name: "Fruits", percentage: 15, status: "good" },
  { name: "Grains", percentage: 25, status: "neutral" },
  { name: "Protein Foods", percentage: 20, status: "good" },
  { name: "Dairy", percentage: 10, status: "neutral" },
  { name: "Oils & Fats", percentage: 8, status: "warning" }
];

// Trends and insights
const trendsData = [
  { 
    metric: "Protein Intake", 
    trend: "up", 
    description: "Your protein intake has increased by 15% over the past 2 weeks.", 
    action: "Maintain this level to support muscle maintenance and recovery."
  },
  { 
    metric: "Fiber Intake", 
    trend: "down", 
    description: "Your fiber intake has decreased by 10% compared to last week.", 
    action: "Try to increase your consumption of whole grains, fruits, and vegetables."
  },
  { 
    metric: "Vitamin D", 
    trend: "down", 
    description: "Your Vitamin D levels are consistently below recommended amounts.", 
    action: "Consider more sun exposure, fatty fish, or supplements."
  },
  { 
    metric: "Water Intake", 
    trend: "up", 
    description: "Your average water intake has increased to 7.5 cups per day.", 
    action: "Great job! Try to reach 8 cups consistently."
  }
];

// Colors for pie chart
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const NutrientInsights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  
  // Calculate overall nutrient score (simple average of all nutrients compared to goals)
  const calculateNutrientScore = () => {
    const allNutrients = [
      ...nutrientSummaryData.macros,
      ...nutrientSummaryData.vitamins,
      ...nutrientSummaryData.minerals
    ];
    
    const sum = allNutrients.reduce((acc, nutrient) => {
      return acc + (nutrient.value / nutrient.goal) * 100;
    }, 0);
    
    return Math.round(sum / allNutrients.length);
  };
  
  const nutrientScore = calculateNutrientScore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Overall Nutrient Score</p>
                <p className="text-2xl font-bold">{nutrientScore}%</p>
              </div>
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <Progress
              value={nutrientScore}
              className="h-2 mt-2"
            />
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Based on your daily nutrient targets</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Protein Quality</p>
                <p className="text-2xl font-bold">Good</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <PieChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <Progress
              value={85}
              className="h-2 mt-2 [&>div]:bg-blue-500"
            />
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Varied sources with complete proteins</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fiber Intake</p>
                <p className="text-2xl font-bold">73%</p>
              </div>
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <Progress
              value={73}
              className="h-2 mt-2 [&>div]:bg-green-500"
            />
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">22g of 30g daily target</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Micronutrient Diversity</p>
                <p className="text-2xl font-bold">Very Good</p>
              </div>
              <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <Progress
              value={88}
              className="h-2 mt-2 [&>div]:bg-amber-500"
            />
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Good variety of nutrient sources</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Nutrient Analysis</h2>
        <div className="flex items-center gap-2">
          <Select
            defaultValue={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="macros">Macronutrients</TabsTrigger>
          <TabsTrigger value="vitamins">Vitamins & Minerals</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Nutrient Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyNutrientData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderRadius: '0.5rem',
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
                        }} 
                      />
                      <Bar dataKey="protein" name="Protein (g)" fill="#8884d8" />
                      <Bar dataKey="carbs" name="Carbs (g)" fill="#82ca9d" />
                      <Bar dataKey="fat" name="Fat (g)" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Macro Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {macroPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} calories`, 'Energy']}
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderRadius: '0.5rem',
                          border: '1px solid var(--border)',
                          color: 'var(--foreground)'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-1"></div>
                    <span className="text-sm">Protein</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-1"></div>
                    <span className="text-sm">Carbs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#ffc658] mr-1"></div>
                    <span className="text-sm">Fat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Key Nutrients at a Glance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nutrientSummaryData.macros.map((nutrient, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{nutrient.name}</h3>
                      <Badge variant="outline" className={
                        nutrient.value / nutrient.goal >= 0.9 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        nutrient.value / nutrient.goal >= 0.7 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }>
                        {Math.round((nutrient.value / nutrient.goal) * 100)}%
                      </Badge>
                    </div>
                    <Progress 
                      value={(nutrient.value / nutrient.goal) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{nutrient.value} {nutrient.unit}</span>
                      <span>{nutrient.goal} {nutrient.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Food Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodSourceData.map((source, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-2 ${
                          source.status === 'good' ? 'bg-green-500 dark:bg-green-400' :
                          source.status === 'neutral' ? 'bg-blue-500 dark:bg-blue-400' :
                          'bg-yellow-500 dark:bg-yellow-400'
                        }`}></div>
                        <span>{source.name}</span>
                      </div>
                      <span className="text-sm">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="macros" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Macronutrient Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Protein Section */}
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">Protein</h3>
                    <Badge>95g / 120g</Badge>
                  </div>
                  <Progress 
                    value={(95 / 120) * 100}
                    className="h-2 mb-4 [&>div]:bg-purple-500"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Top Sources</h4>
                      <div className="space-y-2">
                        {[
                          { name: "Chicken Breast", amount: "25g", percentage: 26 },
                          { name: "Greek Yogurt", amount: "15g", percentage: 16 },
                          { name: "Eggs", amount: "12g", percentage: 13 },
                          { name: "Salmon", amount: "10g", percentage: 11 },
                          { name: "Lentils", amount: "9g", percentage: 9 }
                        ].map((source, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-sm">{source.name}</span>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{source.amount}</span>
                              <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-500 dark:bg-purple-400" 
                                  style={{ width: `${source.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Protein Quality</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Complete Proteins</span>
                          <span className="text-sm">75%</span>
                        </div>
                        <Progress 
                          value={75}
                          className="h-1.5 [&>div]:bg-green-500"
                        />
                        
                        <div className="flex justify-between mt-3">
                          <span className="text-sm">Plant Proteins</span>
                          <span className="text-sm">25%</span>
                        </div>
                        <Progress 
                          value={25}
                          className="h-1.5 [&>div]:bg-blue-500"
                        />
                        
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mt-3">
                          <p className="text-sm">
                            Your protein intake is well-distributed, with a good balance of animal and plant proteins.
                            Consider adding more legumes for additional fiber and micronutrients.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Carbs Section */}
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">Carbohydrates</h3>
                    <Badge>180g / 250g</Badge>
                  </div>
                  <Progress 
                    value={(180 / 250) * 100}
                    className="h-2 mb-4 [&>div]:bg-green-500"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Carb Types</h4>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Details
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Complex Carbs</span>
                            <span>65%</span>
                          </div>
                          <Progress 
                            value={65}
                            className="h-1.5 [&>div]:bg-green-500"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Simple Sugars</span>
                            <span>25%</span>
                          </div>
                          <Progress 
                            value={25}
                            className="h-1.5 [&>div]:bg-amber-500"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Fiber</span>
                            <span>10%</span>
                          </div>
                          <Progress 
                            value={10}
                            className="h-1.5 [&>div]:bg-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Glycemic Load</h4>
                      <div className="flex items-center space-x-4">
                        <div className="h-24 w-24 relative">
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
                              strokeDashoffset={282.7 * (1 - 75/100)}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                            <text 
                              x="50" 
                              y="50" 
                              dominantBaseline="middle" 
                              textAnchor="middle" 
                              className="text-xl font-medium"
                              fill="currentColor"
                            >
                              75
                            </text>
                          </svg>
                        </div>
                        <div>
                          <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Medium</Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Your glycemic load is in the medium range, which helps maintain stable blood sugar levels.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Fats Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">Fats</h3>
                    <Badge>62g / 70g</Badge>
                  </div>
                  <Progress 
                    value={(62 / 70) * 100}
                    className="h-2 mb-4 [&>div]:bg-yellow-500"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Fat Types</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Unsaturated Fats</span>
                            <span>70%</span>
                          </div>
                          <Progress 
                            value={70}
                            className="h-1.5 [&>div]:bg-green-500"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Saturated Fats</span>
                            <span>25%</span>
                          </div>
                          <Progress 
                            value={25}
                            className="h-1.5 [&>div]:bg-amber-500"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Trans Fats</span>
                            <span>5%</span>
                          </div>
                          <Progress 
                            value={5}
                            className="h-1.5 [&>div]:bg-red-500"
                          />
                        </div>
                        
                        <div className="flex justify-between text-sm pt-2">
                          <span>Omega-3 to Omega-6 Ratio</span>
                          <span>1:6</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Top Sources</h4>
                      <div className="space-y-2">
                        {[
                          { name: "Olive Oil", amount: "15g", percentage: 24 },
                          { name: "Avocado", amount: "12g", percentage: 19 },
                          { name: "Salmon", amount: "10g", percentage: 16 },
                          { name: "Nuts", amount: "8g", percentage: 13 },
                          { name: "Cheese", amount: "6g", percentage: 10 }
                        ].map((source, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-sm">{source.name}</span>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{source.amount}</span>
                              <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-500 dark:bg-yellow-400" 
                                  style={{ width: `${source.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mt-4">
                        <p className="text-sm">
                          Your fat profile is healthy, with a good emphasis on unsaturated fats.
                          Consider reducing processed foods to lower your trans fat intake.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vitamins" className="space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vitamins & Minerals</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vitamins">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
                  <TabsTrigger value="minerals">Minerals</TabsTrigger>
                  <TabsTrigger value="sources">Food Sources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="vitamins" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nutrientSummaryData.vitamins.map((vitamin, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <h3 className="font-medium">{vitamin.name}</h3>
                            <HelpCircle className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                          </div>
                          <Badge variant="outline" className={
                            vitamin.value / vitamin.goal >= 0.9 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                            vitamin.value / vitamin.goal >= 0.7 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          }>
                            {Math.round((vitamin.value / vitamin.goal) * 100)}%
                          </Badge>
                        </div>
                        <Progress 
                          value={(vitamin.value / vitamin.goal) * 100}
                          className={`h-2 ${
                            vitamin.value / vitamin.goal >= 0.9 ? "[&>div]:bg-green-500" :
                            vitamin.value / vitamin.goal >= 0.7 ? "[&>div]:bg-yellow-500" :
                            "[&>div]:bg-red-500"
                          }`}
                        />
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{vitamin.value} {vitamin.unit}</span>
                          <span>{vitamin.goal} {vitamin.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Vitamin Insights</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Your vitamin D levels are consistently below recommendations. Consider spending more time outdoors
                          in the sun or adding fatty fish, egg yolks, or fortified foods to your diet. Supplementation
                          may also be beneficial, especially during winter months.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="minerals" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nutrientSummaryData.minerals.map((mineral, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <h3 className="font-medium">{mineral.name}</h3>
                            <HelpCircle className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                          </div>
                          <Badge variant="outline" className={
                            mineral.value / mineral.goal >= 0.9 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                            mineral.value / mineral.goal >= 0.7 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          }>
                            {Math.round((mineral.value / mineral.goal) * 100)}%
                          </Badge>
                        </div>
                        <Progress 
                          value={(mineral.value / mineral.goal) * 100}
                          className={`h-2 ${
                            mineral.value / mineral.goal >= 0.9 ? "[&>div]:bg-green-500" :
                            mineral.value / mineral.goal >= 0.7 ? "[&>div]:bg-yellow-500" :
                            "[&>div]:bg-red-500"
                          }`}
                        />
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{mineral.value} {mineral.unit}</span>
                          <span>{mineral.goal} {mineral.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Mineral Insights</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Your iron intake is meeting about 67% of your needs. Since iron from plant sources is less 
                          bioavailable, consider pairing iron-rich foods with vitamin C sources to enhance absorption.
                          Potassium is also below target - incorporate more leafy greens, bananas, and potatoes.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="sources" className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Top Sources of Vitamins</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Bell Peppers", vitamins: ["Vitamin C", "Vitamin A", "Vitamin B6"] },
                          { name: "Leafy Greens", vitamins: ["Vitamin K", "Vitamin A", "Folate"] },
                          { name: "Berries", vitamins: ["Vitamin C", "Vitamin K", "Manganese"] },
                          { name: "Eggs", vitamins: ["Vitamin D", "Vitamin B12", "Choline"] }
                        ].map((food, idx) => (
                          <div key={idx} className="p-3 border rounded-lg">
                            <h4 className="font-medium">{food.name}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {food.vitamins.map((vitamin, vidx) => (
                                <Badge key={vidx} variant="outline" className="text-xs">
                                  {vitamin}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Top Sources of Minerals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Nuts & Seeds", minerals: ["Magnesium", "Zinc", "Selenium"] },
                          { name: "Legumes", minerals: ["Iron", "Potassium", "Phosphorus"] },
                          { name: "Dairy", minerals: ["Calcium", "Phosphorus", "Potassium"] },
                          { name: "Seafood", minerals: ["Iodine", "Selenium", "Zinc"] }
                        ].map((food, idx) => (
                          <div key={idx} className="p-3 border rounded-lg">
                            <h4 className="font-medium">{food.name}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {food.minerals.map((mineral, midx) => (
                                <Badge key={midx} variant="outline" className="text-xs">
                                  {mineral}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Recommended Foods to Add</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Based on your nutrient gaps, consider adding these foods to your diet:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Fatty fish (salmon, mackerel) for vitamin D</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Leafy greens for iron and calcium</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Bananas and potatoes for potassium</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Citrus fruits for vitamin C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendsData.map((trend, idx) => (
              <Card key={idx} className="shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${
                      trend.trend === 'up' 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-amber-100 dark:bg-amber-900/30'
                    }`}>
                      {trend.trend === 'up' 
                        ? <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" /> 
                        : <ArrowDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium">{trend.metric}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {trend.description}
                      </p>
                      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                        <span className="font-medium">Recommendation:</span> {trend.action}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nutrient Correlation Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Energy Levels & Nutrient Patterns</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Analysis shows that your energy levels are highest on days when your diet includes at least 
                    25g of protein at breakfast and maintains a balanced carbohydrate intake throughout the day.
                    Consider maintaining this pattern for optimal energy.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Sleep Quality & Evening Nutrients</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Days with higher magnesium intake (>300mg) correlate with better reported sleep quality.
                    Foods you consumed that are high in magnesium include spinach, almonds, and whole grains.
                    Additionally, limiting caffeine after 2PM has shown a positive impact on your sleep patterns.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Workout Performance & Nutrition Timing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your workout performance ratings are higher when you consume a balanced meal with 
                    approximately 20g of protein and 30g of carbohydrates within 2 hours before exercise.
                    Post-workout recovery appears optimized when protein is consumed within 30 minutes after
                    finishing your session.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutrientInsights;
