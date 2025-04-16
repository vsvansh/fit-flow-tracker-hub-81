import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, AreaChart, Area } from "@/components/ui/chart";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Info, Activity, Lightbulb } from "lucide-react";

// Sample data for different charts
const weeklyCalorieData = [{
  day: "Mon",
  calories: 2000,
  protein: 120,
  carbs: 210,
  fat: 65
}, {
  day: "Tue",
  calories: 1950,
  protein: 115,
  carbs: 200,
  fat: 60
}, {
  day: "Wed",
  calories: 2250,
  protein: 140,
  carbs: 230,
  fat: 75
}, {
  day: "Thu",
  calories: 2100,
  protein: 130,
  carbs: 220,
  fat: 70
}, {
  day: "Fri",
  calories: 2300,
  protein: 145,
  carbs: 235,
  fat: 80
}, {
  day: "Sat",
  calories: 2500,
  protein: 155,
  carbs: 250,
  fat: 85
}, {
  day: "Sun",
  calories: 2150,
  protein: 125,
  carbs: 225,
  fat: 75
}];
const macroDistributionData = [{
  name: "Protein",
  value: 25,
  color: "#3B82F6"
},
// ~25% of calories
{
  name: "Carbs",
  value: 45,
  color: "#F59E0B"
},
// ~45% of calories
{
  name: "Fat",
  value: 30,
  color: "#8B5CF6"
} // ~30% of calories
];
const nutrientComparisonData = [{
  name: "Vitamin A",
  actual: 80,
  target: 100
}, {
  name: "Vitamin C",
  actual: 65,
  target: 90
}, {
  name: "Vitamin D",
  actual: 10,
  target: 20
}, {
  name: "Iron",
  actual: 14,
  target: 18
}, {
  name: "Calcium",
  actual: 850,
  target: 1000
}, {
  name: "Zinc",
  actual: 9,
  target: 11
}];
const mealTimingData = [{
  time: "6-9 AM",
  calories: 500,
  name: "Breakfast"
}, {
  time: "9-11 AM",
  calories: 200,
  name: "Snack"
}, {
  time: "12-2 PM",
  calories: 700,
  name: "Lunch"
}, {
  time: "2-5 PM",
  calories: 150,
  name: "Snack"
}, {
  time: "6-8 PM",
  calories: 600,
  name: "Dinner"
}, {
  time: "8-10 PM",
  calories: 100,
  name: "Snack"
}];

// Custom tooltip for charts
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="p-3 bg-white dark:bg-gray-800 border shadow-md rounded-lg">
        <p className="text-sm font-medium mb-1">{`${label}`}</p>
        {payload.map((entry: any, index: number) => <p key={`item-${index}`} className="text-xs flex items-center" style={{
        color: entry.color
      }}>
            <span className="h-2 w-2 rounded-full mr-1" style={{
          backgroundColor: entry.color
        }}></span>
            <span>{`${entry.name}: ${entry.value} ${entry.unit || ""}`}</span>
          </p>)}
      </div>;
  }
  return null;
};

// Chart configuration (colors, labels, etc.)
const chartConfig = {
  calories: {
    color: "#3B82F6",
    label: "Calories"
  },
  protein: {
    color: "#10B981",
    label: "Protein"
  },
  carbs: {
    color: "#F59E0B",
    label: "Carbs"
  },
  fat: {
    color: "#8B5CF6",
    label: "Fat"
  },
  actual: {
    color: "#3B82F6",
    label: "Actual"
  },
  target: {
    color: "#10B981",
    label: "Target"
  }
};
const InteractiveNutritionCharts = () => {
  const {
    toast
  } = useToast();
  const handleChartClick = (data: any) => {
    toast({
      title: `${data.activeLabel || 'Data'} Details`,
      description: `Calories: ${data.activePayload?.[0]?.value || 'N/A'}`
    });
  };
  const getTotalCalories = () => {
    return mealTimingData.reduce((sum, item) => sum + item.calories, 0);
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Weekly Calorie Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <AreaChart data={weeklyCalorieData} margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20
              }} onClick={handleChartClick}>
                  <defs>
                    <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="calories" name="Calories" stroke="#3B82F6" fillOpacity={1} fill="url(#calorieGradient)" activeDot={{
                  r: 6
                }} />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="text-xs text-center text-gray-500 mt-1">Click on data points for details</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Macro Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={{}}>
                <PieChart>
                  <Pie data={macroDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" nameKey="name" label={({
                  name,
                  percent
                }) => `${name}: ${(percent * 100).toFixed(0)}%`} onClick={data => {
                  toast({
                    title: `${data.name} Details`,
                    description: `${data.name} makes up ${data.value}% of your daily calories`
                  });
                }}>
                    {macroDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {macroDistributionData.map((entry, index) => <div key={index} className="flex items-center gap-1 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{
                backgroundColor: entry.color
              }}></div>
                  <span>{entry.name}: {entry.value}%</span>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Nutrient Goal Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer config={chartConfig}>
              <BarChart data={nutrientComparisonData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="actual" name="Current" fill="#3B82F6" radius={[0, 4, 4, 0]} onClick={data => {
                const percentage = Math.round(data.actual / data.target * 100);
                toast({
                  title: `${data.name}`,
                  description: `Current intake: ${data.actual} (${percentage}% of target)`
                });
              }} />
                <Bar dataKey="target" name="Target" fill="#10B981" radius={[0, 4, 4, 0]} onClick={data => {
                toast({
                  title: `${data.name} Target`,
                  description: `Your daily target is ${data.target}`
                });
              }} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm col-span-2 my-[171px] mx-0 px-0 py-[38px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Meal Timing Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={{}}>
                <BarChart data={mealTimingData} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25
              }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="calories" name="Calories" fill="#3B82F6" radius={[4, 4, 0, 0]} onClick={data => {
                  const percentage = Math.round(data.calories / getTotalCalories() * 100);
                  toast({
                    title: data.name,
                    description: `${data.calories} calories (${percentage}% of daily total)`
                  });
                }} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm my-[173px]">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg font-medium">Nutrition Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your evening meals tend to be lower in protein. Consider adding a protein source to optimize recovery.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex">
                  <Activity className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your overall nutrient distribution is well-balanced compared to your goals.
                  </p>
                </div>
              </div>
              <Button className="w-full text-sm" variant="outline" onClick={() => {
              toast({
                title: "Nutrition Report",
                description: "Generating your comprehensive nutrition report..."
              });
            }}>
                View Full Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>;
};
export default InteractiveNutritionCharts;