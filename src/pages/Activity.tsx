
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dailyActivities } from "@/utils/fitnessData";
import { format, subDays } from "date-fns";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity as ActivityIcon, BarChart as ChartIcon, Calendar, PieChart } from "lucide-react";
import ActivitySummary from "@/components/ActivitySummary";
import BackToHome from "@/components/BackToHome";
import { motion } from "framer-motion";

const Activity = () => {
  const [period, setPeriod] = useState("week");
  const [chartType, setChartType] = useState("bar");
  
  // Get data based on selected period
  const getActivityData = () => {
    const today = new Date();
    const daysToShow = period === "week" ? 7 : 30;
    
    // Generate dates for the past days
    const dates = Array.from({ length: daysToShow }, (_, i) => {
      return format(subDays(today, daysToShow - i - 1), "yyyy-MM-dd");
    });
    
    // Find matching activities or generate default values
    const data = dates.map(date => {
      const found = dailyActivities.find(a => a.date === date);
      if (found) return found;
      return {
        date: date,
        steps: Math.floor(Math.random() * 5000) + 3000,
        caloriesBurned: Math.floor(Math.random() * 200) + 200,
        distance: Math.floor((Math.random() * 3) + 2),
        activeMinutes: Math.floor(Math.random() * 30) + 15
      };
    });
    
    return data;
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MMM d");
  };
  
  // Prepare data for charts
  const chartData = getActivityData().map(activity => ({
    ...activity,
    date: formatDate(activity.date),
  }));
  
  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <BackToHome className="mb-4" />
      
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">Activity History</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and analyze your fitness progress over time
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center">
                  <ActivityIcon className="mr-2 h-5 w-5 text-brand-500" />
                  Activity Overview
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" ? (
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                      <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                      <Tooltip 
                        contentStyle={{ borderRadius: "0.5rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                        wrapperStyle={{ outline: "none" }}
                      />
                      <Bar yAxisId="left" dataKey="steps" name="Steps" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="caloriesBurned" name="Calories Burned" fill="#F97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : (
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                      <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                      <Tooltip 
                        contentStyle={{ borderRadius: "0.5rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                        wrapperStyle={{ outline: "none" }}
                      />
                      <Line yAxisId="left" type="monotone" dataKey="steps" name="Steps" stroke="#4F46E5" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="caloriesBurned" name="Calories Burned" stroke="#F97316" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center space-x-8 mt-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-brand-600 mr-2"></div>
                  <span className="text-sm">Steps</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-sm">Calories</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-brand-500" />
                Daily Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="steps" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="steps">Steps</TabsTrigger>
                  <TabsTrigger value="calories">Calories</TabsTrigger>
                  <TabsTrigger value="distance">Distance</TabsTrigger>
                  <TabsTrigger value="active">Active Time</TabsTrigger>
                </TabsList>
                <TabsContent value="steps" className="pt-2">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.slice(-7)} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="steps" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="calories" className="pt-2">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.slice(-7)} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="caloriesBurned" fill="#F97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="distance" className="pt-2">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.slice(-7)} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="distance" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="active" className="pt-2">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.slice(-7)} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="activeMinutes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-brand-500" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActivitySummary
                steps={8431}
                caloriesBurned={423}
                distance={6.2}
                activeMinutes={42}
                stepsGoal={10000}
                caloriesGoal={500}
                distanceGoal={8}
                activeMinutesGoal={60}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Activity;
