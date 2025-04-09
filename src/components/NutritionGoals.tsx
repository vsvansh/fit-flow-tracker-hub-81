
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Target, Medal, ChevronRight, PlusCircle, Bell, 
  Calendar, Dumbbell, Scale, BarChart2, Save, Trash2,
  ArrowRight, Lock, Settings, Users, RefreshCcw
} from "lucide-react";

// Sample nutrition goals
const currentGoals = {
  calories: { current: 2000, target: 2200 },
  protein: { current: 95, target: 120, unit: 'g' },
  carbs: { current: 225, target: 250, unit: 'g' },
  fat: { current: 65, target: 75, unit: 'g' },
  fiber: { current: 22, target: 30, unit: 'g' }
};

// Sample progress data
const progressData = [
  { name: "Week 1", calories: 2400, protein: 90, carbs: 280, fat: 80 },
  { name: "Week 2", calories: 2300, protein: 100, carbs: 260, fat: 75 },
  { name: "Week 3", calories: 2200, protein: 110, carbs: 240, fat: 70 },
  { name: "Week 4", calories: 2150, protein: 115, carbs: 230, fat: 68 }
];

// Sample achievements
const achievements = [
  { id: 1, name: "Protein Champion", description: "Reach your protein goal for 7 consecutive days", progress: 85, icon: "🥩" },
  { id: 2, name: "Fiber Master", description: "Consume at least 25g of fiber daily for 5 days in a row", progress: 60, icon: "🥦" },
  { id: 3, name: "Water Wizard", description: "Drink 8 cups of water every day for a week", progress: 100, icon: "💧" },
  { id: 4, name: "Sugar Reducer", description: "Keep added sugar under 25g for 10 days", progress: 30, icon: "🍭" }
];

// Sample goal templates
const goalTemplates = [
  { id: 1, name: "Weight Loss", description: "1800 calories, high protein, moderate carbs, low fat", calories: 1800, protein: 150, carbs: 150, fat: 50 },
  { id: 2, name: "Muscle Gain", description: "2500 calories, very high protein, high carbs, moderate fat", calories: 2500, protein: 180, carbs: 300, fat: 70 },
  { id: 3, name: "Maintenance", description: "2200 calories, balanced macros for weight maintenance", calories: 2200, protein: 120, carbs: 250, fat: 75 },
  { id: 4, name: "Low Carb", description: "1900 calories, high protein, low carbs, high fat", calories: 1900, protein: 140, carbs: 100, fat: 105 }
];

const NutritionGoals = () => {
  const { toast } = useToast();
  const [userGoals, setUserGoals] = useState(currentGoals);
  const [editMode, setEditMode] = useState(false);
  
  // Form state for editing goals
  const [formGoals, setFormGoals] = useState({
    calories: currentGoals.calories.target,
    protein: currentGoals.protein.target,
    carbs: currentGoals.carbs.target,
    fat: currentGoals.fat.target,
    fiber: currentGoals.fiber.target
  });
  
  // Dialog state
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormGoals(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };
  
  // Handle slider changes
  const handleSliderChange = (name: string, value: number[]) => {
    setFormGoals(prev => ({
      ...prev,
      [name]: value[0]
    }));
  };
  
  // Save updated goals
  const saveGoals = () => {
    setUserGoals({
      calories: { ...userGoals.calories, target: formGoals.calories },
      protein: { ...userGoals.protein, target: formGoals.protein },
      carbs: { ...userGoals.carbs, target: formGoals.carbs },
      fat: { ...userGoals.fat, target: formGoals.fat },
      fiber: { ...userGoals.fiber, target: formGoals.fiber }
    });
    
    setEditMode(false);
    
    toast({
      title: "Goals updated",
      description: "Your nutrition goals have been updated successfully.",
    });
  };
  
  // Apply goal template
  const applyTemplate = () => {
    if (selectedTemplate !== null) {
      const template = goalTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setFormGoals({
          calories: template.calories,
          protein: template.protein,
          carbs: template.carbs,
          fat: template.fat,
          fiber: 30 // Default fiber goal
        });
        
        setShowTemplateDialog(false);
        
        toast({
          title: "Template applied",
          description: `Applied the ${template.name} template to your goals.`,
        });
      }
    }
  };
  
  // Calculate current progress percentages
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Nutrition Goals
              </CardTitle>
              <CardDescription>
                Track and manage your daily nutrition targets
              </CardDescription>
            </div>
            
            <div className="space-x-2">
              {editMode ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditMode(false);
                      setFormGoals({
                        calories: userGoals.calories.target,
                        protein: userGoals.protein.target,
                        carbs: userGoals.carbs.target,
                        fat: userGoals.fat.target,
                        fiber: userGoals.fiber.target
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveGoals} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Goals
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList className="mb-4">
              <TabsTrigger value="current">Current Goals</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-6">
              {!editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="shadow-sm md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Daily Nutrient Targets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {Object.entries(userGoals).map(([key, data]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="font-medium capitalize">{key}</span>
                                {key === 'calories' && <span className="text-sm ml-1 text-gray-500 dark:text-gray-400">/ day</span>}
                              </div>
                              <span className="font-medium">
                                {data.target} {data.unit || ''}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex-grow">
                                <Progress 
                                  value={calculateProgress(data.current, data.target)} 
                                  className={`h-2 ${
                                    key === 'calories' ? '[&>div]:bg-blue-500' :
                                    key === 'protein' ? '[&>div]:bg-purple-500' :
                                    key === 'carbs' ? '[&>div]:bg-green-500' :
                                    key === 'fat' ? '[&>div]:bg-yellow-500' :
                                    '[&>div]:bg-orange-500'
                                  }`}
                                />
                              </div>
                              <span className="text-sm w-16 text-right">
                                {data.current} / {data.target} {data.unit || ''}
                              </span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h3 className="font-medium mb-2">Goal Insights</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Your current macronutrient split is approximately 25% protein, 50% carbs, and 25% fat,
                            which aligns well with a balanced nutrition approach. Your fiber goal supports good digestive health.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Goal Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Target Type</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Maintenance</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Started On</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">March 15, 2025</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Dumbbell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">Activity Level</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Moderately Active</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">Reminders</h3>
                              <Switch defaultChecked />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daily at 8:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <RefreshCcw className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Choose a Goal Template</DialogTitle>
                          <DialogDescription>
                            Select a predefined goal template to quickly set your nutrition targets.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-3 py-4">
                          <RadioGroup value={selectedTemplate?.toString()} onValueChange={(value) => setSelectedTemplate(parseInt(value))}>
                            {goalTemplates.map(template => (
                              <div key={template.id} className="flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                <RadioGroupItem value={template.id.toString()} id={`template-${template.id}`} className="mt-1" />
                                <Label htmlFor={`template-${template.id}`} className="flex-grow cursor-pointer">
                                  <div className="font-medium">{template.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{template.description}</div>
                                  <div className="flex space-x-3 text-xs">
                                    <span>{template.calories} cal</span>
                                    <span>{template.protein}g protein</span>
                                    <span>{template.carbs}g carbs</span>
                                    <span>{template.fat}g fat</span>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Cancel</Button>
                          <Button onClick={applyTemplate} disabled={selectedTemplate === null}>Apply Template</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="calories" className="font-medium">Daily Calories</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Slider
                            id="calories-slider"
                            defaultValue={[formGoals.calories]}
                            max={3000}
                            min={1200}
                            step={50}
                            className="flex-grow"
                            onValueChange={(value) => handleSliderChange('calories', value)}
                          />
                          <Input
                            type="number"
                            name="calories"
                            value={formGoals.calories}
                            onChange={handleInputChange}
                            className="w-20"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="protein" className="font-medium">Protein (g)</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Slider
                            id="protein-slider"
                            defaultValue={[formGoals.protein]}
                            max={250}
                            min={50}
                            step={5}
                            className="flex-grow"
                            onValueChange={(value) => handleSliderChange('protein', value)}
                          />
                          <Input
                            type="number"
                            name="protein"
                            value={formGoals.protein}
                            onChange={handleInputChange}
                            className="w-20"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="carbs" className="font-medium">Carbohydrates (g)</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Slider
                            id="carbs-slider"
                            defaultValue={[formGoals.carbs]}
                            max={400}
                            min={50}
                            step={10}
                            className="flex-grow"
                            onValueChange={(value) => handleSliderChange('carbs', value)}
                          />
                          <Input
                            type="number"
                            name="carbs"
                            value={formGoals.carbs}
                            onChange={handleInputChange}
                            className="w-20"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="fat" className="font-medium">Fat (g)</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Slider
                            id="fat-slider"
                            defaultValue={[formGoals.fat]}
                            max={150}
                            min={20}
                            step={5}
                            className="flex-grow"
                            onValueChange={(value) => handleSliderChange('fat', value)}
                          />
                          <Input
                            type="number"
                            name="fat"
                            value={formGoals.fat}
                            onChange={handleInputChange}
                            className="w-20"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="fiber" className="font-medium">Fiber (g)</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Slider
                            id="fiber-slider"
                            defaultValue={[formGoals.fiber]}
                            max={50}
                            min={15}
                            step={1}
                            className="flex-grow"
                            onValueChange={(value) => handleSliderChange('fiber', value)}
                          />
                          <Input
                            type="number"
                            name="fiber"
                            value={formGoals.fiber}
                            onChange={handleInputChange}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Macronutrient Breakdown</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <div 
                          className="h-4 rounded-l-full bg-purple-500" 
                          style={{ 
                            width: `${(formGoals.protein * 4 / (formGoals.protein * 4 + formGoals.carbs * 4 + formGoals.fat * 9)) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="h-4 bg-green-500" 
                          style={{ 
                            width: `${(formGoals.carbs * 4 / (formGoals.protein * 4 + formGoals.carbs * 4 + formGoals.fat * 9)) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="h-4 rounded-r-full bg-yellow-500" 
                          style={{ 
                            width: `${(formGoals.fat * 9 / (formGoals.protein * 4 + formGoals.carbs * 4 + formGoals.fat * 9)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                            <span>Protein</span>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {Math.round((formGoals.protein * 4 / (formGoals.protein * 4 + formGoals.carbs * 4 + formGoals.fat * 9)) * 100)}%
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                            <span>Carbs</span>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {Math.round((formGoals.carbs * 4 / (formGoals.protein * 4 + formGoals.carbs * 4 + formGoals.fat * 9)) * 100)}%
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                            <span>Fat</span>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {Math.round((formGoals.fat * 9 / (formGoals.protein * 4 + formGoals.carbs * 4 + formGoals.fat * 9)) * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Additional Settings</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="activity-level">Activity Level</Label>
                        <Select defaultValue="moderate">
                          <SelectTrigger id="activity-level">
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="light">Lightly Active</SelectItem>
                            <SelectItem value="moderate">Moderately Active</SelectItem>
                            <SelectItem value="very">Very Active</SelectItem>
                            <SelectItem value="extreme">Extremely Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="goal-type">Goal Type</Label>
                        <Select defaultValue="maintain">
                          <SelectTrigger id="goal-type">
                            <SelectValue placeholder="Select goal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lose">Weight Loss</SelectItem>
                            <SelectItem value="maintain">Maintenance</SelectItem>
                            <SelectItem value="gain">Muscle Gain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reminder" className="cursor-pointer">Enable Daily Reminder</Label>
                        <Switch id="reminder" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditMode(false);
                        setFormGoals({
                          calories: userGoals.calories.target,
                          protein: userGoals.protein.target,
                          carbs: userGoals.carbs.target,
                          fat: userGoals.fat.target,
                          fiber: userGoals.fiber.target
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={saveGoals} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Progress Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Calorie Intake Trend</h3>
                      <div className="h-40 flex items-end space-x-2">
                        {progressData.map((week, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${(week.calories / 2500) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-2">{week.name}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-500">Goal: {userGoals.calories.target} cal</span>
                        <span className="text-sm text-green-600 dark:text-green-400">-11% from Week 1</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Macronutrient Progress</h3>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Protein</span>
                            <span>{progressData[progressData.length - 1].protein}g / {userGoals.protein.target}g</span>
                          </div>
                          <Progress 
                            value={(progressData[progressData.length - 1].protein / userGoals.protein.target) * 100}
                            className="h-2 [&>div]:bg-purple-500"
                          />
                          <div className="text-xs text-right text-green-600 dark:text-green-400">
                            +{progressData[progressData.length - 1].protein - progressData[0].protein}g from Week 1
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Carbs</span>
                            <span>{progressData[progressData.length - 1].carbs}g / {userGoals.carbs.target}g</span>
                          </div>
                          <Progress 
                            value={(progressData[progressData.length - 1].carbs / userGoals.carbs.target) * 100}
                            className="h-2 [&>div]:bg-green-500"
                          />
                          <div className="text-xs text-right text-green-600 dark:text-green-400">
                            -{progressData[0].carbs - progressData[progressData.length - 1].carbs}g from Week 1
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Fat</span>
                            <span>{progressData[progressData.length - 1].fat}g / {userGoals.fat.target}g</span>
                          </div>
                          <Progress 
                            value={(progressData[progressData.length - 1].fat / userGoals.fat.target) * 100}
                            className="h-2 [&>div]:bg-yellow-500"
                          />
                          <div className="text-xs text-right text-green-600 dark:text-green-400">
                            -{progressData[0].fat - progressData[progressData.length - 1].fat}g from Week 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-medium mb-2">Progress Summary</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You've made consistent progress toward your nutrition goals over the past 4 weeks. 
                      Calorie intake has decreased by 11%, while protein intake has increased by 28%. 
                      These changes align well with your fitness goals.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Consistency Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Goal Adherence Score</h3>
                        <div className="flex items-center gap-4">
                          <div className="h-24 w-24 relative">
                            <svg className="h-full w-full" viewBox="0 0 100 100">
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="#e0e0e0" 
                                strokeWidth="10" 
                              />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="#22c55e" 
                                strokeWidth="10" 
                                strokeDasharray="282.7" 
                                strokeDashoffset="56.54"
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                              />
                              <text 
                                x="50" 
                                y="50" 
                                dominantBaseline="middle" 
                                textAnchor="middle" 
                                className="text-2xl font-medium"
                                fill="currentColor"
                              >
                                80%
                              </text>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              You've maintained 80% adherence to your nutrition goals over the past month, 
                              which is considered excellent progress.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Best Adherence Days</h3>
                        <div className="grid grid-cols-7 gap-1">
                          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                            <div 
                              key={i} 
                              className={`h-8 rounded-full flex items-center justify-center text-xs ${
                                [0, 2, 4].includes(i) 
                                  ? "bg-green-500 text-white" 
                                  : [1, 5].includes(i)
                                    ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          You tend to stay on track better on Monday, Wednesday, and Friday.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Challenge Areas</h3>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Weekend Protein</span>
                            <span className="text-amber-600 dark:text-amber-400">-20%</span>
                          </div>
                          <Progress value={60} className="h-1.5 [&>div]:bg-amber-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Evening Snacking</span>
                            <span className="text-red-600 dark:text-red-400">+35%</span>
                          </div>
                          <Progress value={35} className="h-1.5 [&>div]:bg-red-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Meal Prepping",
                          description: "Based on your weekend adherence patterns, preparing meals ahead of time for Saturday and Sunday could help maintain protein intake.",
                          action: "View Meal Prep Guide"
                        },
                        {
                          title: "Evening Alternatives",
                          description: "Replace high-calorie evening snacks with protein-rich options to stay within your goals while satisfying cravings.",
                          action: "Healthy Snack Ideas"
                        },
                        {
                          title: "Carb Cycling",
                          description: "Consider adjusting carb intake based on your activity level each day for more flexibility.",
                          action: "Learn About Carb Cycling"
                        }
                      ].map((rec, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.description}</p>
                          <Button variant="link" className="h-auto p-0 text-green-600 dark:text-green-400">
                            {rec.action} <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nutrition Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-grow">
                              <h3 className="font-medium">{achievement.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {achievement.description}
                              </p>
                              <div className="mt-2">
                                <Progress 
                                  value={achievement.progress} 
                                  className={`h-2 ${
                                    achievement.progress === 100
                                      ? '[&>div]:bg-green-500'
                                      : '[&>div]:bg-blue-500'
                                  }`}
                                />
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {achievement.progress}% complete
                                  </span>
                                  {achievement.progress === 100 && (
                                    <span className="text-xs text-green-600 dark:text-green-400">Completed!</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button className="w-full">
                        <Medal className="h-4 w-4 mr-2" />
                        View All Achievements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Challenges & Streaks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">30-Day Protein Challenge</h3>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Meet your protein goal every day for 30 days straight.
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Current Progress</span>
                            <span>13/30 days</span>
                          </div>
                          <Progress value={43} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Current Streaks</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <div className="flex items-center">
                              <div className="text-xl mr-3">🔥</div>
                              <div>
                                <h4 className="text-sm font-medium">Logging Streak</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Logged meals daily</p>
                              </div>
                            </div>
                            <div className="text-lg font-bold">18</div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                            <div className="flex items-center">
                              <div className="text-xl mr-3">💧</div>
                              <div>
                                <h4 className="text-sm font-medium">Water Tracking</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">8+ cups daily</p>
                              </div>
                            </div>
                            <div className="text-lg font-bold">7</div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                            <div className="flex items-center">
                              <div className="text-xl mr-3">🥦</div>
                              <div>
                                <h4 className="text-sm font-medium">Veggie Intake</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">5+ servings daily</p>
                              </div>
                            </div>
                            <div className="text-lg font-bold">4</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Join New Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Community Leaderboard</CardTitle>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Find Friends
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border">
                      <table className="min-w-full divide-y">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal Adherence</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y">
                          {[
                            { id: 1, name: "Sarah J.", avatar: "/placeholder.svg", adherence: 95, streak: 42, isCurrentUser: false },
                            { id: 2, name: "Michael T.", avatar: "/placeholder.svg", adherence: 92, streak: 36, isCurrentUser: false },
                            { id: 3, name: "You", avatar: "/placeholder.svg", adherence: 80, streak: 18, isCurrentUser: true },
                            { id: 4, name: "David K.", avatar: "/placeholder.svg", adherence: 78, streak: 21, isCurrentUser: false },
                            { id: 5, name: "Emma R.", avatar: "/placeholder.svg", adherence: 75, streak: 14, isCurrentUser: false }
                          ].map((user) => (
                            <tr 
                              key={user.id} 
                              className={`${user.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : ''} hover:bg-gray-50 dark:hover:bg-gray-800`}
                            >
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm">{user.id}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8">
                                    <Avatar>
                                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="ml-3">
                                    <div className={`text-sm font-medium ${user.isCurrentUser ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                      {user.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-sm mr-2">{user.adherence}%</span>
                                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div 
                                      className="bg-green-500 h-1.5 rounded-full" 
                                      style={{ width: `${user.adherence}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm mr-1">{user.streak}</div>
                                  <div className="text-sm">days</div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="link" className="text-gray-500">View Full Leaderboard</Button>
                      <Button variant="outline">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Challenge a Friend
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionGoals;
