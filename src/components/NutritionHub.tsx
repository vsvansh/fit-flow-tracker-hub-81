
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Utensils, LineChart, BarChart2, Calendar, Heart, 
  BookOpen, TrendingUp, Target, Clock, ShoppingBag, 
  Clipboard, Activity, LayoutGrid, 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Import all the nutrition components
import NutritionGoals from "./NutritionGoals";
import NutrientInsights from "./NutrientInsights";
import FoodNutritionTracker from "./FoodNutritionTracker";
import InteractiveNutritionCharts from "./InteractiveNutritionCharts";
import NutritionCharts from "./NutritionCharts";

const features = [
  { 
    id: "tracker", 
    name: "Tracker", 
    icon: Activity, 
    description: "Track your daily nutrition intake",
    component: FoodNutritionTracker,
    tag: "original"
  },
  { 
    id: "goals", 
    name: "Goals", 
    icon: Target, 
    description: "Set and monitor your nutrition goals",
    component: NutritionGoals,
    tag: "original"
  },
  { 
    id: "insights", 
    name: "Insights", 
    icon: TrendingUp, 
    description: "Get insights into your nutrition patterns",
    component: NutrientInsights,
    tag: "original"
  },
  { 
    id: "charts", 
    name: "Charts", 
    icon: BarChart2, 
    description: "Interactive nutrition charts and visualizations",
    component: NutritionCharts,
    tag: "enhanced"
  },
  { 
    id: "interactive-charts", 
    name: "Interactive Charts", 
    icon: LineChart, 
    description: "Detailed interactive nutrition analysis",
    component: InteractiveNutritionCharts,
    tag: "enhanced"
  },
  // Placeholder features that can be implemented in future iterations
  { 
    id: "journal", 
    name: "Journal", 
    icon: BookOpen, 
    description: "Keep a log of your meals and nutrition",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Journal</CardTitle>
          <CardDescription>Track your daily meals and food intake</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-10 text-muted-foreground">
            Journal feature coming soon! You'll be able to log and track all your meals here.
          </p>
          <Button className="w-full">Create First Entry</Button>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "patterns", 
    name: "Patterns", 
    icon: LayoutGrid, 
    description: "Discover your eating patterns",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Patterns</CardTitle>
          <CardDescription>Analyze your eating habits over time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-10 text-muted-foreground">
            Patterns analysis coming soon! This feature will help you identify trends in your nutrition habits.
          </p>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "meal-planner", 
    name: "Meal Planner", 
    icon: Calendar, 
    description: "Plan your meals ahead of time",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Meal Planner</CardTitle>
          <CardDescription>Schedule your meals for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-10 text-muted-foreground">
            Meal planning feature coming soon! You'll be able to plan your meals and generate shopping lists.
          </p>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "recipes", 
    name: "Recipes", 
    icon: Utensils, 
    description: "Browse healthy recipe suggestions",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Healthy Recipes</CardTitle>
          <CardDescription>Discover nutritious meal ideas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-10 text-muted-foreground">
            Recipe database coming soon! You'll have access to thousands of healthy recipes.
          </p>
        </CardContent>
      </Card>
    ),
    tag: "original"
  },
  { 
    id: "shopping-list", 
    name: "Shopping List", 
    icon: ShoppingBag, 
    description: "Generate shopping lists based on your meal plan",
    component: () => (
      <Card>
        <CardHeader>
          <CardTitle>Shopping List</CardTitle>
          <CardDescription>Create shopping lists from your meal plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-10 text-muted-foreground">
            Shopping list feature coming soon! This will help you prepare for your planned meals.
          </p>
        </CardContent>
      </Card>
    ),
    tag: "planned"
  },
];

const NutritionHub = () => {
  const [activeFeature, setActiveFeature] = useState("tracker");
  const [showEnhanced, setShowEnhanced] = useState(false);
  
  // Filter features based on toggle state
  const filteredFeatures = showEnhanced 
    ? features
    : features.filter(feature => feature.tag !== "enhanced");
  
  const ActiveComponent = features.find(f => f.id === activeFeature)?.component || (() => <div>Feature not found</div>);
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nutrition Center</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Enhanced Features</span>
          <Switch 
            checked={showEnhanced} 
            onCheckedChange={setShowEnhanced} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Nutrition Features
              </CardTitle>
              <CardDescription>
                Explore all nutrition tools
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-1">
                {filteredFeatures.map(feature => (
                  <Button 
                    key={feature.id} 
                    variant={activeFeature === feature.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <feature.icon className="h-4 w-4 mr-2" />
                    <span>{feature.name}</span>
                    {feature.tag === "enhanced" && (
                      <Badge variant="outline" className="ml-2 text-xs">Enhanced</Badge>
                    )}
                    {feature.tag === "planned" && (
                      <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          key={activeFeature}
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default NutritionHub;
