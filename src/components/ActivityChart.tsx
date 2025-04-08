
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { dailyActivities } from "@/utils/fitnessData";

const ActivityChart = () => {
  const [chartData, setChartData] = useState(dailyActivities.slice(-7));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  };

  // Format data for the chart
  const formattedData = chartData.map(activity => ({
    ...activity,
    date: formatDate(activity.date),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Activity History</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
