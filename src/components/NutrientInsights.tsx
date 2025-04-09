
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart4, PieChart as PieChartIcon, Activity, Info, ChevronRight, 
  Apple, Carrot, Beef, Fish, Egg, Coffee, Cherry, Leaf, Droplet
} from "lucide-react";

// Sample data for vitamins and minerals
const nutrientData = [
  // Fat-soluble vitamins
  { name: "Vitamin A", category: "fat-soluble", percent: 85, info: "Important for vision, immune function, and cell growth", sources: ["Sweet potatoes", "Carrots", "Spinach"] },
  { name: "Vitamin D", category: "fat-soluble", percent: 60, info: "Regulates calcium absorption and bone growth", sources: ["Sunlight", "Fatty fish", "Fortified foods"] },
  { name: "Vitamin E", category: "fat-soluble", percent: 70, info: "Acts as an antioxidant to protect cells", sources: ["Nuts", "Seeds", "Vegetable oils"] },
  { name: "Vitamin K", category: "fat-soluble", percent: 95, info: "Essential for blood clotting and bone health", sources: ["Leafy greens", "Broccoli", "Brussels sprouts"] },
  
  // Water-soluble vitamins
  { name: "Vitamin C", category: "water-soluble", percent: 120, info: "Important for immune function and iron absorption", sources: ["Citrus fruits", "Bell peppers", "Strawberries"] },
  { name: "Vitamin B1", category: "water-soluble", percent: 90, info: "Helps convert food into energy", sources: ["Whole grains", "Pork", "Beans"] },
  { name: "Vitamin B2", category: "water-soluble", percent: 85, info: "Supports energy production and cell function", sources: ["Milk", "Yogurt", "Eggs"] },
  { name: "Vitamin B3", category: "water-soluble", percent: 110, info: "Essential for metabolism and DNA repair", sources: ["Chicken", "Tuna", "Peanuts"] },
  { name: "Vitamin B5", category: "water-soluble", percent: 75, info: "Helps create coenzyme A for metabolism", sources: ["Avocados", "Mushrooms", "Yogurt"] },
  { name: "Vitamin B6", category: "water-soluble", percent: 90, info: "Important for brain development and function", sources: ["Poultry", "Fish", "Potatoes"] },
  { name: "Vitamin B7", category: "water-soluble", percent: 65, info: "Helps metabolize fats and carbohydrates", sources: ["Eggs", "Nuts", "Whole grains"] },
  { name: "Vitamin B9", category: "water-soluble", percent: 80, info: "Essential for cell division and DNA synthesis", sources: ["Leafy greens", "Beans", "Citrus fruits"] },
  { name: "Vitamin B12", category: "water-soluble", percent: 95, info: "Critical for nerve function and blood cell formation", sources: ["Meat", "Fish", "Dairy"] },
  
  // Minerals
  { name: "Calcium", category: "mineral", percent: 75, info: "Essential for bone health and muscle function", sources: ["Dairy products", "Leafy greens", "Fortified foods"] },
  { name: "Iron", category: "mineral", percent: 60, info: "Needed for oxygen transport in the blood", sources: ["Red meat", "Beans", "Spinach"] },
  { name: "Magnesium", category: "mineral", percent: 65, info: "Important for muscle and nerve function", sources: ["Nuts", "Seeds", "Whole grains"] },
  { name: "Zinc", category: "mineral", percent: 80, info: "Supports immune function and wound healing", sources: ["Meat", "Shellfish", "Legumes"] },
  { name: "Potassium", category: "mineral", percent: 70, info: "Regulates fluid balance and nerve signals", sources: ["Bananas", "Potatoes", "Beans"] },
  { name: "Selenium", category: "mineral", percent: 90, info: "Acts as an antioxidant and supports thyroid function", sources: ["Brazil nuts", "Fish", "Eggs"] },
  { name: "Phosphorus", category: "mineral", percent: 95, info: "Component of bones and cell membranes", sources: ["Dairy", "Meat", "Fish"] }
];

// Pie chart data for nutrient breakdown
const nutritionBreakdownData = [
  { name: "Protein", value: 25, color: "#4ade80" },
  { name: "Carbohydrates", value: 45, color: "#60a5fa" },
  { name: "Fat", value: 30, color: "#f59e0b" }
];

// Pie chart data for vitamin sources
const vitaminSourcesData = [
  { name: "Fruits & Vegetables", value: 45, color: "#4ade80" },
  { name: "Animal Products", value: 30, color: "#f87171" },
  { name: "Grains & Legumes", value: 15, color: "#fbbf24" },
  { name: "Nuts & Seeds", value: 10, color: "#8b5cf6" }
];

const NutrientInsights = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
  const [hoveredNutrient, setHoveredNutrient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNutrients = nutrientData.filter(nutrient => {
    // First filter by category
    const categoryMatch = selectedCategory === "all" || nutrient.category === selectedCategory;
    
    // Then filter by search query if present
    const queryMatch = searchQuery === "" || 
      nutrient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nutrient.sources.some(source => source.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && queryMatch;
  });

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <BarChart4 className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Nutrient Analysis
              </CardTitle>
              <CardDescription>
                Track your vitamin and mineral intake
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap justify-start gap-3 mb-4">
                  <ToggleGroup type="single" value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || "all")}>
                    <ToggleGroupItem value="all" aria-label="All nutrients" className="px-4 py-2 rounded-full">
                      All
                    </ToggleGroupItem>
                    <ToggleGroupItem value="fat-soluble" aria-label="Fat-soluble vitamins" className="px-4 py-2 rounded-full">
                      Fat Soluble
                    </ToggleGroupItem>
                    <ToggleGroupItem value="water-soluble" aria-label="Water-soluble vitamins" className="px-4 py-2 rounded-full">
                      Water Soluble
                    </ToggleGroupItem>
                    <ToggleGroupItem value="mineral" aria-label="Minerals" className="px-4 py-2 rounded-full">
                      Minerals
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-4">
                  <ScrollArea className="h-[400px] pr-4">
                    {filteredNutrients.map((nutrient, index) => (
                      <div 
                        key={index}
                        className={`p-4 mb-3 rounded-lg border ${
                          hoveredNutrient === nutrient.name 
                            ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/30'
                            : 'border-gray-200 dark:border-gray-700'
                        } transition-all duration-200`}
                        onMouseEnter={() => setHoveredNutrient(nutrient.name)}
                        onMouseLeave={() => setHoveredNutrient(null)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-2 ${
                              nutrient.category === 'fat-soluble' 
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' 
                                : nutrient.category === 'water-soluble' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                            }`}>
                              {nutrient.category === 'fat-soluble' && <Cherry className="h-4 w-4" />}
                              {nutrient.category === 'water-soluble' && <Droplet className="h-4 w-4" />}
                              {nutrient.category === 'mineral' && <Leaf className="h-4 w-4" />}
                            </div>
                            <h3 className="font-medium">{nutrient.name}</h3>
                          </div>
                          <Badge 
                            className={`${
                              nutrient.percent >= 100 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                                : nutrient.percent >= 75 
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                            }`}
                          >
                            {nutrient.percent}%
                          </Badge>
                        </div>
                        
                        <Progress 
                          value={Math.min(nutrient.percent, 100)} 
                          className={`h-2 mb-2 ${
                            nutrient.percent >= 100 
                              ? '[&>div]:bg-green-500' 
                              : nutrient.percent >= 75 
                              ? '[&>div]:bg-yellow-500'
                              : '[&>div]:bg-red-500'
                          }`}
                        />
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {nutrient.info}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {nutrient.sources.map((source, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-md border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <PieChartIcon className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Nutrient Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="macros">
                <TabsList className="mb-4 grid grid-cols-2 h-auto w-full">
                  <TabsTrigger value="macros" className="text-xs sm:text-sm py-2">Macronutrients</TabsTrigger>
                  <TabsTrigger value="sources" className="text-xs sm:text-sm py-2">Vitamin Sources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="macros">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutritionBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {nutritionBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      Protein: Essential for muscle building and repair
                    </p>
                    <p>
                      Carbohydrates: Primary energy source for the body
                    </p>
                    <p>
                      Fat: Important for hormone production and nutrient absorption
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="sources">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vitaminSourcesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {vitaminSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                      Most of your vitamins and minerals come from a variety of food sources.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        toast({
                          title: "Food recommendations",
                          description: "Based on your nutritional gaps, we recommend increasing your intake of leafy greens and nuts."
                        });
                      }}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Get Food Recommendations
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <Activity className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Nutrition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 mr-2">
                      <Apple className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium">Increase Fruit Intake</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Try to have at least 2 servings of fruit daily to boost your vitamin C and antioxidant levels.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 mr-2">
                      <Carrot className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium">Eat More Vegetables</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Include a variety of colorful vegetables in each meal for optimal micronutrient intake.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-amber-100 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 mr-2">
                      <Beef className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium">Iron-Rich Foods</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your iron levels are slightly low. Consider adding more lean meats, beans and spinach to your diet.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    toast({
                      title: "Personalized nutrition plan",
                      description: "Your personalized nutrition plan has been updated based on your current nutrient levels.",
                    });
                  }}
                >
                  Get Personalized Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NutrientInsights;
