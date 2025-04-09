import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeeklyStats, getStreakCount } from "@/utils/fitnessData";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Award, TrendingUp, Zap, BarChart as BarChartIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { launchConfetti } from "@/utils/confettiUtil";

const StatsInsight = () => {
  const weeklyStats = getWeeklyStats();
  const streakCount = getStreakCount();
  const [activeBar, setActiveBar] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const performanceData = [{
    name: 'Steps',
    target: 10000,
    current: weeklyStats.averageSteps,
    fill: "#3B82F6"
  }, {
    name: 'Calories',
    target: 500,
    current: weeklyStats.averageCalories,
    fill: "#F97316"
  }, {
    name: 'Distance',
    target: 8,
    current: weeklyStats.averageDistance * 10,
    fill: "#10B981"
  }];

  const handleBarHover = (name: string, index: number) => {
    setActiveBar(name);
    setHoveredIndex(index);
  };

  const handleBarClick = (name: string) => {
    setActiveBar(name);
    launchConfetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.5 }
    });
  };
  
  const customBarLabel = ({ x, y, width, height, value, index }: any) => {
    return (
      <text 
        x={x + width / 2} 
        y={y - 8} 
        fill={hoveredIndex === index ? "#000" : "#666"}
        textAnchor="middle" 
        dominantBaseline="middle"
        className="text-xs font-medium"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="shadow transform transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Insights & Analytics</CardTitle>
          <BarChartIcon className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Streak</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-slate-950 dark:text-slate-100">{streakCount} days</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Goal achievement</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-green-500 dark:text-green-400">Best Day</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-slate-950 dark:text-slate-100">{getBestDay()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Highest steps</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-orange-500 dark:text-orange-400">Weekly Avg</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-slate-950 dark:text-slate-100">{weeklyStats.averageSteps}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Daily steps</p>
          </div>
        </div>
        
        <div className="h-40 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={performanceData} 
              margin={{
                top: 25,
                right: 20,
                left: 0,
                bottom: 5
              }}
              onMouseLeave={() => {
                setActiveBar(null);
                setHoveredIndex(null);
              }}
            >
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis hide />
              <Tooltip 
                formatter={(value, name) => [value, `${name} ${name === 'Distance' ? '(km)' : ''}`]} 
                labelFormatter={() => 'Average'} 
                cursor={{fill: 'transparent'}}
                contentStyle={{
                  borderRadius: "0.5rem", 
                  border: "none", 
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)"
                }}
              />
              <Bar 
                dataKey="current" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]} 
                className="transition-all duration-300"
                label={customBarLabel}
                onMouseEnter={(data, index) => handleBarHover(data.name, index)}
                onClick={(data) => handleBarClick(data.name)}
                style={{
                  cursor: 'pointer',
                  filter: activeBar ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' : 'none',
                }}
              />
              <Bar 
                dataKey="target" 
                className="dark:fill-gray-700"
                fill="#E5E7EB" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 mr-1"></div>
              <span>Target</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsInsight;
