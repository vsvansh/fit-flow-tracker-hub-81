
import NutritionHub from "./NutritionHub";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Award, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NutritionPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Header section with motivational content */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Nutrition Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your nutrition, set goals, and improve your dietary habits with our comprehensive tools.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Meal Tracking
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  Nutrition Analysis
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                  Goal Setting
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                  Meal Planning
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-green-600" />
                <span>Complete your nutrition profile to unlock personalized insights</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-green-600" />
                Nutrition Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "Eating a rainbow of colored fruits and vegetables ensures you're getting a wide variety of nutrients and antioxidants."
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <LineChart className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Daily nutrition streak: 7 days</span>
                </div>
                <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1">
                  More tips 
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      {/* Main nutrition hub component */}
      <NutritionHub />
    </div>
  );
};

export default NutritionPage;
