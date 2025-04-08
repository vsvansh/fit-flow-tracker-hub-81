
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeeklyStats, getStreakCount } from "@/utils/fitnessData";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Award, TrendingUp, Zap, BarChart as BarChartIcon } from "lucide-react";

const StatsInsight = () => {
  const weeklyStats = getWeeklyStats();
  const streakCount = getStreakCount();

  // Find best performing day based on steps
  const getBestDay = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const dayLabels = Array(7).fill(0).map((_, idx) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - idx));
      return days[d.getDay()];
    });
    
    return dayLabels[6]; // For demo, we'll just return the last day
  };

  // Performance data for the chart
  const performanceData = [
    { name: 'Steps', target: 10000, current: weeklyStats.averageSteps, fill: "#3B82F6" },
    { name: 'Calories', target: 500, current: weeklyStats.averageCalories, fill: "#F97316" },
    { name: 'Distance', target: 8, current: weeklyStats.averageDistance * 10, fill: "#10B981" }
  ];

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Insights & Analytics</CardTitle>
          <BarChartIcon className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <p className="text-2xl font-bold mt-1">{streakCount} days</p>
            <p className="text-xs text-gray-500">Goal achievement</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Best Day</span>
            </div>
            <p className="text-2xl font-bold mt-1">{getBestDay()}</p>
            <p className="text-xs text-gray-500">Highest steps</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-sm font-medium">Weekly Avg</span>
            </div>
            <p className="text-2xl font-bold mt-1">{weeklyStats.averageSteps}</p>
            <p className="text-xs text-gray-500">Daily steps</p>
          </div>
        </div>
        
        <div className="h-40 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip 
                formatter={(value, name) => [value, `${name} ${name === 'Distance' ? '(km)' : ''}`]} 
                labelFormatter={() => 'Average'} 
              />
              <Bar dataKey="current" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-200 mr-1"></div>
              <span>Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsInsight;
