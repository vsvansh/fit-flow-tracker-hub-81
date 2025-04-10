import React, { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, LineChart, AreaChart, PieChart, ResponsiveContainer, 
  Bar, Line, Area, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from "recharts";
import { 
  ChevronDown, ChevronUp, Download, Share2, PieChart as PieChartIcon,
  BarChart2, LineChart as LineChartIcon, Activity, RefreshCw
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Sample data for nutrition charts
const weeklyCaloriesData = [
  { name: "Mon", calories: 1950, protein: 82, carbs: 235, fat: 65 },
  { name: "Tue", calories: 2100, protein: 95, carbs: 250, fat: 70 },
  { name: "Wed", calories: 1850, protein: 78, carbs: 220, fat: 62 },
  { name: "Thu", calories: 2200, protein: 100, carbs: 265, fat: 75 },
  { name: "Fri", calories: 2050, protein: 90, carbs: 245, fat: 68 },
  { name: "Sat", calories: 1900, protein: 80, carbs: 225, fat: 65 },
  { name: "Sun", calories: 1800, protein: 75, carbs: 210, fat: 60 }
];

const macroDistributionData = [
  { name: "Carbs", value: 250, color: "#3b82f6" },
  { name: "Protein", value: 120, color: "#ef4444" },
  { name: "Fat", value: 70, color: "#f59e0b" },
];

const nutrientIntakeData = [
  { name: "Vit A", goal: 100, actual: 85 },
  { name: "Vit C", goal: 100, actual: 120 },
  { name: "Vit D", goal: 100, actual: 60 },
  { name: "Calcium", goal: 100, actual: 95 },
  { name: "Iron", goal: 100, actual: 75 },
  { name: "Potassium", goal: 100, actual: 80 },
];

const monthlyTrendsData = [
  { name: "Week 1", calories: 1950, weight: 180 },
  { name: "Week 2", calories: 2050, weight: 179 },
  { name: "Week 3", calories: 1900, weight: 178 },
  { name: "Week 4", calories: 1850, weight: 176.5 },
];

const NutritionCharts = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    calories: true,
    macros: true,
    nutrients: true,
    trends: true
  });
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Trigger data refresh
  const refreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Chart data has been updated with the latest information."
    });
  };
  
  // Handle chart download
  const downloadChart = (chartName: string) => {
    toast({
      title: "Chart Downloaded",
      description: `The ${chartName} chart has been downloaded.`
    });
  };
  
  // Handle chart sharing
  const shareChart = (chartName: string) => {
    toast({
      title: "Share Link Generated",
      description: `A link to share the ${chartName} chart has been copied to your clipboard.`
    });
  };
  
  // Custom tooltip for the pie chart
  // Fixed typing issue by properly handling the parameters
  const handlePieChartClick = (data: any) => {
    if (data && data.name) {
      toast({
        title: "Macro Details",
        description: `${data.name}: ${data.value}g (${Math.round((data.value / (250 + 120 + 70)) * 100)}% of total)`
      });
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Nutrition Analysis</CardTitle>
            <CardDescription>Visualize and analyze your nutrition data</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="weekly" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="custom">Custom Range</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => downloadChart("All")}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => shareChart("All")}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="weekly" className="space-y-6">
            {/* Daily Calories Section */}
            <div className="border rounded-lg">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-800"
                onClick={() => toggleSection("calories")}
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Daily Calorie Intake</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    downloadChart("Calories");
                  }}>
                    <Download className="h-4 w-4" />
                  </Button>
                  {expandedSections.calories ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
              </div>
              
              {expandedSections.calories && (
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={weeklyCaloriesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="calories" 
                        fill="#3b82f6" 
                        name="Calories" 
                        onClick={(data, index) => {
                          toast({
                            title: `${data.name} Calorie Details`,
                            description: `You consumed ${data.calories} calories with ${data.protein}g protein, ${data.carbs}g carbs, and ${data.fat}g fat.`
                          });
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-3 text-sm text-muted-foreground text-center">
                    Click on any bar for detailed information about that day
                  </div>
                </div>
              )}
            </div>
            
            {/* Macro Distribution Section */}
            <div className="border rounded-lg">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-800"
                onClick={() => toggleSection("macros")}
              >
                <div className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Macronutrient Distribution</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    shareChart("Macros");
                  }}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  {expandedSections.macros ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
              </div>
              
              {expandedSections.macros && (
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={macroDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        onClick={(data) => handlePieChartClick(data)}
                      >
                        {macroDistributionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            style={{ cursor: 'pointer' }}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3 text-sm text-muted-foreground text-center">
                    Click on any segment for detailed information
                  </div>
                </div>
              )}
            </div>
            
            {/* Nutrient Intake Section */}
            <div className="border rounded-lg">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-800"
                onClick={() => toggleSection("nutrients")}
              >
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-purple-500" />
                  <h3 className="font-medium">Micronutrient Intake</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    downloadChart("Nutrients");
                  }}>
                    <Download className="h-4 w-4" />
                  </Button>
                  {expandedSections.nutrients ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
              </div>
              
              {expandedSections.nutrients && (
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={nutrientIntakeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 150]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="actual" 
                        fill="#8884d8" 
                        name="% of Daily Goal"
                        onClick={(data) => {
                          toast({
                            title: `${data.name} Details`,
                            description: `You've reached ${data.actual}% of your daily ${data.name} goal.`
                          });
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                      <Bar dataKey="goal" fill="#82ca9d" name="Target (100%)" opacity={0.2} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-3 text-sm text-muted-foreground text-center">
                    Click on any nutrient for detailed information
                  </div>
                </div>
              )}
            </div>
            
            {/* Trends Section */}
            <div className="border rounded-lg">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-800"
                onClick={() => toggleSection("trends")}
              >
                <div className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Nutrition vs. Weight Trends</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    shareChart("Trends");
                  }}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  {expandedSections.trends ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </div>
              </div>
              
              {expandedSections.trends && (
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={monthlyTrendsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="calories" 
                        stroke="#8884d8" 
                        name="Avg. Daily Calories" 
                        activeDot={{ 
                          r: 8, 
                          onClick: (data) => {
                            const payload = data.payload;
                            if (payload) {
                              toast({
                                title: `${payload.name} Calories`,
                                description: `Average daily calories: ${payload.calories}`
                              });
                            }
                          }
                        }}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#82ca9d" 
                        name="Weight (lbs)"
                        activeDot={{ 
                          r: 8, 
                          onClick: (data) => {
                            const payload = data.payload;
                            if (payload) {
                              toast({
                                title: `${payload.name} Weight`,
                                description: `Weight: ${payload.weight} lbs`
                              });
                            }
                          }
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-3 text-sm text-muted-foreground text-center">
                    Click on any point for detailed information
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="border rounded-lg p-6 flex items-center justify-center h-72 bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <h3 className="font-medium mb-2">Monthly Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track your nutrition trends over longer periods
                </p>
                <Button onClick={() => {
                  toast({
                    title: "Monthly Data",
                    description: "Monthly nutrition data is being generated."
                  });
                }}>
                  Generate Monthly Report
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="border rounded-lg p-6 flex items-center justify-center h-72 bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <h3 className="font-medium mb-2">Custom Date Range</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select specific dates to analyze your nutrition data
                </p>
                <Button onClick={() => {
                  toast({
                    title: "Custom Range",
                    description: "Feature coming soon! You'll be able to select custom date ranges."
                  });
                }}>
                  Select Date Range
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NutritionCharts;
