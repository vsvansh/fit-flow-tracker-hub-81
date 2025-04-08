
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { dailyActivities } from "@/utils/fitnessData";
import { BarChart as ChartIcon } from "lucide-react";

type ChartPeriod = "week" | "month";
type ChartType = "bar" | "line";

const ActivityChart = () => {
  const [period, setPeriod] = useState<ChartPeriod>("week");
  const [chartType, setChartType] = useState<ChartType>("bar");
  
  // Get days based on selected period
  const getDaysData = () => {
    const data = [...dailyActivities];
    return period === "week" ? data.slice(-7) : data;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  };

  // Format data for the chart
  const chartData = getDaysData().map(activity => ({
    ...activity,
    date: formatDate(activity.date),
  }));

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ChartIcon className="w-5 h-5 mr-2 text-blue-500" />
            <CardTitle className="text-xl font-bold">Activity History</CardTitle>
          </div>
          <div className="flex space-x-2">
            <div className="flex rounded-md overflow-hidden border">
              <button 
                className={`px-3 py-1 text-xs ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setPeriod('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1 text-xs ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setPeriod('month')}
              >
                Month
              </button>
            </div>
            <div className="flex rounded-md overflow-hidden border">
              <button 
                className={`px-3 py-1 text-xs ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setChartType('bar')}
              >
                Bar
              </button>
              <button 
                className={`px-3 py-1 text-xs ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setChartType('line')}
              >
                Line
              </button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                <Tooltip 
                  contentStyle={{ borderRadius: "0.5rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                  wrapperStyle={{ outline: "none" }}
                />
                <Bar yAxisId="left" dataKey="steps" name="Steps" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="caloriesBurned" name="Calories Burned" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                <Tooltip 
                  contentStyle={{ borderRadius: "0.5rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                  wrapperStyle={{ outline: "none" }}
                />
                <Line yAxisId="left" type="monotone" dataKey="steps" name="Steps" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="caloriesBurned" name="Calories Burned" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-sm">Steps</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
            <span className="text-sm">Calories</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
