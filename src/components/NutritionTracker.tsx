import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Utensils, Coffee, GlassWater, Search, Scan, BarChart, Mic, Settings, Plus, Check } from 'lucide-react';
import { motion } from "framer-motion";
import { launchConfetti } from "@/utils/confettiUtil";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data = [
  { name: 'Carbs', value: 400 },
  { name: 'Protein', value: 300 },
  { name: 'Fat', value: 300 },
  { name: 'Other', value: 200 },
];

const NutritionTracker = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("food");
  const [waterAmount, setWaterAmount] = useState(1200);
  const [waterTarget, setWaterTarget] = useState(2000);
  const [isWaterDialogOpen, setIsWaterDialogOpen] = useState(false);
  const [tempWaterTarget, setTempWaterTarget] = useState(waterTarget);
  const [isBarcodeScanActive, setIsBarcodeScanActive] = useState(false);
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false);
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);
  
  const handleWaterIntake = (amount: number) => {
    setWaterAmount(prevAmount => Math.min(prevAmount + amount, waterTarget));
    
    toast({
      title: "Hydration Updated",
      description: `You've logged ${amount}ml of water`,
    });
  };
  
  const handleOpenWaterDialog = () => {
    setIsWaterDialogOpen(true);
    setTempWaterTarget(waterTarget);
  };
  
  const handleCloseWaterDialog = () => {
    setIsWaterDialogOpen(false);
  };

  const setDailyWaterTarget = (value: number) => {
    setWaterTarget(value);
    setIsWaterDialogOpen(false);
    
    toast({
      title: "Water Target Updated",
      description: `Your daily water target is now set to ${value}ml`,
    });
    
    launchConfetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 }
    });
  };
  
  const handleOpenFoodDialog = () => {
    setIsFoodDialogOpen(true);
  };
  
  const handleCloseFoodDialog = () => {
    setIsFoodDialogOpen(false);
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Nutrition Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="food" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="food" className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Food</span>
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center space-x-2">
              <GlassWater className="h-4 w-4" />
              <span>Water</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Summary</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="food" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Log Food</h3>
              <Button size="sm" variant="outline" onClick={handleOpenFoodDialog}>
                <Plus className="h-4 w-4 mr-2" /> Add Food
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
                <CardContent className="p-4 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => toast({
                      title: "Manual entry",
                      description: "Opening manual food entry",
                    })}
                  >
                    <Utensils className="h-6 w-6 mb-2 text-blue-500" />
                    <span className="text-sm">Manual Entry</span>
                  </motion.button>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
                <CardContent className="p-4 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsBarcodeScanActive(true)}
                  >
                    <Scan className="h-6 w-6 mb-2 text-green-500" />
                    <span className="text-sm">Scan Barcode</span>
                  </motion.button>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
                <CardContent className="p-4 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsVoiceInputActive(true)}
                  >
                    <Mic className="h-6 w-6 mb-2 text-orange-500" />
                    <span className="text-sm">Voice Input</span>
                  </motion.button>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
                <CardContent className="p-4 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => toast({
                      title: "Search food",
                      description: "Opening food search",
                    })}
                  >
                    <Search className="h-6 w-6 mb-2 text-purple-500" />
                    <span className="text-sm">Search Food</span>
                  </motion.button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="water" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Water Intake</h3>
              <Button size="sm" variant="outline" onClick={handleOpenWaterDialog}>
                <Settings className="h-4 w-4 mr-2" /> Set Target
              </Button>
            </div>
            
            <div className="relative h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: 'Water', value: waterAmount }, { name: 'Remaining', value: Math.max(0, waterTarget - waterAmount) }]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    stroke="none"
                  >
                    <Cell key="water" fill="#3B82F6" />
                    <Cell key="remaining" fill="#E5E7EB" />
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}ml`, name]} 
                    labelFormatter={() => 'Water Intake'} 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{
                      borderRadius: "0.5rem", 
                      border: "none", 
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-2xl font-bold">{waterAmount}ml</p>
                <p className="text-sm text-gray-500">/{waterTarget}ml</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[200, 300, 500].map(amount => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleWaterIntake(amount)}
                >
                  <GlassWater className="h-5 w-5 mb-2 text-blue-500" />
                  <span>{amount}ml</span>
                </motion.button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="summary">
            <h3 className="text-lg font-semibold">Daily Summary</h3>
            <p className="text-sm text-gray-500">A summary of your daily nutrition intake.</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}g`, name]} 
                    labelFormatter={() => 'Nutrient'} 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{
                      borderRadius: "0.5rem", 
                      border: "none", 
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Water Target Dialog */}
        <Dialog open={isWaterDialogOpen} onOpenChange={setIsWaterDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set Daily Water Target</DialogTitle>
              <DialogDescription>
                Adjust your daily water intake goal.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="waterTarget" className="text-right">
                  Target (ml)
                </Label>
                <Input 
                  id="waterTarget" 
                  value={tempWaterTarget.toString()} 
                  onChange={(e) => setTempWaterTarget(Number(e.target.value))}
                  className="col-span-3" 
                  type="number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={handleCloseWaterDialog}>
                Cancel
              </Button>
              <Button type="submit" onClick={() => setDailyWaterTarget(tempWaterTarget)}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Add Food Dialog */}
        <Dialog open={isFoodDialogOpen} onOpenChange={setIsFoodDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Food</DialogTitle>
              <DialogDescription>
                Log your food intake for today.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="foodName" className="text-right">
                  Food Name
                </Label>
                <Input 
                  id="foodName" 
                  placeholder="Enter food name"
                  className="col-span-3" 
                  type="text"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories
                </Label>
                <Input 
                  id="calories" 
                  placeholder="Enter calories"
                  className="col-span-3" 
                  type="number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={handleCloseFoodDialog}>
                Cancel
              </Button>
              <Button type="submit" onClick={() => {
                setIsFoodDialogOpen(false);
                toast({
                  title: "Food Logged",
                  description: "Your food intake has been logged.",
                });
              }}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default NutritionTracker;
