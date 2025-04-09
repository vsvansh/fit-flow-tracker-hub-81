
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CalendarCell, CalendarGrid, CalendarHeader, CalendarHeading, CalendarMonth, CalendarNav, CalendarNextButton, CalendarPrevButton, CalendarRoot } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import {
  CalendarDays, FileText, Utensils, Plus, Search, Filter, 
  Clock, Calendar as CalendarIcon, Star, BarChart2, Heart
} from "lucide-react";

// Sample journal entries
const sampleEntries = [
  {
    id: 1,
    date: new Date(),
    meals: [
      { 
        id: 1, 
        type: "Breakfast", 
        time: "7:30 AM", 
        foods: ["Oatmeal with berries", "Greek yogurt", "Coffee"], 
        calories: 420,
        mood: "Energetic"
      },
      { 
        id: 2, 
        type: "Lunch", 
        time: "12:30 PM", 
        foods: ["Grilled chicken salad", "Whole grain bread", "Sparkling water"], 
        calories: 550,
        mood: "Satisfied"
      },
      { 
        id: 3, 
        type: "Snack", 
        time: "3:30 PM", 
        foods: ["Apple", "Handful of almonds"], 
        calories: 180,
        mood: "Content"
      },
      { 
        id: 4, 
        type: "Dinner", 
        time: "7:00 PM", 
        foods: ["Salmon", "Quinoa", "Roasted vegetables"], 
        calories: 650,
        mood: "Full"
      }
    ],
    notes: "Felt good most of the day. Had some hunger cravings around 2 PM but managed with a healthy snack. Drank 8 cups of water throughout the day.",
    totalCalories: 1800,
    water: 8,
    ratings: { energy: 4, hunger: 2, digestion: 5, mood: 4 }
  },
  {
    id: 2,
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    meals: [
      { 
        id: 1, 
        type: "Breakfast", 
        time: "8:00 AM", 
        foods: ["Scrambled eggs", "Toast", "Orange juice"], 
        calories: 450,
        mood: "Neutral"
      },
      { 
        id: 2, 
        type: "Lunch", 
        time: "1:00 PM", 
        foods: ["Turkey sandwich", "Apple", "Yogurt"], 
        calories: 520,
        mood: "Satisfied"
      },
      { 
        id: 3, 
        type: "Dinner", 
        time: "6:30 PM", 
        foods: ["Pasta with meatballs", "Garden salad", "Garlic bread"], 
        calories: 780,
        mood: "Overfull"
      }
    ],
    notes: "Felt tired in the afternoon. Might be from the heavy lunch. Should add more vegetables tomorrow.",
    totalCalories: 1750,
    water: 6,
    ratings: { energy: 3, hunger: 2, digestion: 3, mood: 3 }
  }
];

// List of moods
const moodOptions = ["Energetic", "Satisfied", "Neutral", "Tired", "Hungry", "Content", "Full", "Overfull"];

const FoodJournal = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState(sampleEntries);
  const [showAddMealDialog, setShowAddMealDialog] = useState(false);
  const [newMeal, setNewMeal] = useState({
    type: "Breakfast",
    time: format(new Date(), "h:mm a"),
    foods: "",
    calories: 0,
    mood: "Neutral"
  });
  
  // Find current entry for the selected date
  const currentEntry = entries.find(entry => 
    format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  
  // Handle adding a new meal
  const handleAddMeal = () => {
    if (!newMeal.foods || !newMeal.calories) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry = {
      id: entries.length + 1,
      date: date,
      meals: [
        {
          id: 1,
          type: newMeal.type,
          time: newMeal.time,
          foods: newMeal.foods.split(",").map(food => food.trim()),
          calories: newMeal.calories,
          mood: newMeal.mood
        }
      ],
      notes: "",
      totalCalories: newMeal.calories,
      water: 0,
      ratings: { energy: 3, hunger: 3, digestion: 3, mood: 3 }
    };
    
    if (currentEntry) {
      // Update existing entry
      const updatedEntries = entries.map(entry => {
        if (format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) {
          return {
            ...entry,
            meals: [
              ...entry.meals,
              {
                id: entry.meals.length + 1,
                type: newMeal.type,
                time: newMeal.time,
                foods: newMeal.foods.split(",").map(food => food.trim()),
                calories: newMeal.calories,
                mood: newMeal.mood
              }
            ],
            totalCalories: entry.totalCalories + newMeal.calories
          };
        }
        return entry;
      });
      
      setEntries(updatedEntries);
    } else {
      // Create new entry
      setEntries([...entries, newEntry]);
    }
    
    setShowAddMealDialog(false);
    
    // Reset form
    setNewMeal({
      type: "Breakfast",
      time: format(new Date(), "h:mm a"),
      foods: "",
      calories: 0,
      mood: "Neutral"
    });
    
    toast({
      title: "Meal added",
      description: `Added ${newMeal.type} to your journal.`,
    });
  };
  
  // Handle adding a note to the entry
  const handleAddNote = (note: string) => {
    const updatedEntries = entries.map(entry => {
      if (format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) {
        return {
          ...entry,
          notes: note
        };
      }
      return entry;
    });
    
    setEntries(updatedEntries);
    
    toast({
      title: "Note updated",
      description: "Your journal note has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Food Journal
          </CardTitle>
          <CardDescription>
            Keep track of meals, moods, and thoughts about your nutrition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                  {format(date, "MMMM d, yyyy")}
                </h3>
                
                <div className="flex flex-col text-sm space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Calories:</span>
                    <span className="font-medium">{currentEntry?.totalCalories || 0} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meals:</span>
                    <span className="font-medium">{currentEntry?.meals.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Water:</span>
                    <span className="font-medium">{currentEntry?.water || 0} cups</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowAddMealDialog(true)} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Meal
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Calendar</h3>
                <Calendar
                  className="border rounded-lg p-2"
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
                
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {entries.slice(0, 3).map((entry, idx) => (
                      <Badge 
                        key={idx} 
                        className="cursor-pointer" 
                        variant="outline"
                        onClick={() => setDate(entry.date)}
                      >
                        {format(entry.date, "MMM d")}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">How I Felt Today</h3>
                {currentEntry ? (
                  <div className="space-y-3">
                    {Object.entries(currentEntry.ratings).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key}</span>
                          <span>{value}/5</span>
                        </div>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div 
                              key={i} 
                              className={`h-2 flex-1 rounded-full ${i <= value ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <Textarea 
                      placeholder="Add your notes here..." 
                      value={currentEntry.notes}
                      onChange={(e) => handleAddNote(e.target.value)}
                      className="mt-4"
                    />
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    <p>No entry for this date</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setShowAddMealDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Create Entry
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="journal">
                <TabsList className="w-full">
                  <TabsTrigger value="journal">Journal</TabsTrigger>
                  <TabsTrigger value="patterns">Patterns</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                
                <TabsContent value="journal" className="pt-4">
                  {currentEntry ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Meals for {format(date, "MMMM d, yyyy")}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 text-green-600">
                            <Star className="h-3 w-3 mr-1" />
                            Save as Template
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <Filter className="h-3 w-3 mr-1" />
                            Filter
                          </Button>
                        </div>
                      </div>
                      
                      {currentEntry.meals.map(meal => (
                        <div key={meal.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3 mt-0.5">
                                <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">{meal.type}</h3>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {meal.mood}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{meal.time}</span>
                                </div>
                                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                                  {meal.foods.map((food, idx) => (
                                    <li key={idx}>{food}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
                              {meal.calories} kcal
                            </Badge>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => setShowAddMealDialog(true)} 
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Meal
                      </Button>
                      
                      <div className="border rounded-lg p-4 mt-6">
                        <h3 className="font-medium mb-2">Journal Notes</h3>
                        {currentEntry.notes ? (
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg whitespace-pre-wrap">
                            {currentEntry.notes}
                          </div>
                        ) : (
                          <Textarea
                            placeholder="How did you feel today? Any observations about your eating habits or energy levels?"
                            className="min-h-[100px]"
                            onChange={(e) => handleAddNote(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
                      <h3 className="mt-4 font-medium">No journal entry for this date</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Start tracking your meals to create an entry
                      </p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => setShowAddMealDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Meal
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="patterns" className="pt-4">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Meal Timing Patterns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-end justify-between">
                            {["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"].map((time, i) => (
                              <div key={i} className="flex flex-col items-center">
                                <div className="h-6 w-6 bg-green-500 rounded-full mb-2"></div>
                                <div 
                                  className="w-2 bg-green-200 dark:bg-green-900/40 rounded-t-sm"
                                  style={{ height: [20, 40, 30, 15, 35, 25][i] }}
                                ></div>
                                <span className="text-xs mt-2">{time}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>Your most consistent meal times are around 8AM and 6PM. You tend to have smaller snacks around 3PM.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Most Common Foods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {[
                              { food: "Eggs", count: 8, category: "Protein" },
                              { food: "Greek Yogurt", count: 6, category: "Dairy" },
                              { food: "Chicken", count: 5, category: "Protein" },
                              { food: "Oatmeal", count: 5, category: "Grain" },
                              { food: "Apples", count: 4, category: "Fruit" }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Badge 
                                    className={
                                      item.category === "Protein" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" :
                                      item.category === "Dairy" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" :
                                      item.category === "Grain" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" :
                                      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                    }
                                    variant="secondary"
                                  >
                                    {item.category}
                                  </Badge>
                                  <span className="ml-2">{item.food}</span>
                                </div>
                                <span className="text-sm text-gray-500">{item.count}x</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Mood & Energy Correlation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>After Breakfast</span>
                                <span className="text-green-600 dark:text-green-400">High Energy</span>
                              </div>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div 
                                    key={i} 
                                    className={`h-2 flex-1 rounded-full ${i <= 4 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>After Lunch</span>
                                <span className="text-amber-600 dark:text-amber-400">Medium Energy</span>
                              </div>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div 
                                    key={i} 
                                    className={`h-2 flex-1 rounded-full ${i <= 3 ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>After Dinner</span>
                                <span className="text-blue-600 dark:text-blue-400">Relaxed</span>
                              </div>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div 
                                    key={i} 
                                    className={`h-2 flex-1 rounded-full ${i <= 2 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <p>You tend to feel most energetic after a protein-rich breakfast, and experience an energy dip after lunch.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="insights" className="pt-4">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-3">
                              <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">Most Balanced Day</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">April 5, 2025</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-3">
                              <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">Highest Energy</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">April 2, 2025</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-purple-100 dark:bg-purple-900/40 p-3">
                              <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">Journal Streak</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">5 days</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-0">
                        <CardTitle className="text-lg">Recommendations Based on Your Journal</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          {[
                            {
                              title: "Add More Vegetables",
                              description: "Your journal shows limited vegetable intake over the past week. Try adding a vegetable to each meal.",
                              action: "View Vegetable Recipes"
                            },
                            {
                              title: "Consistent Meal Timing",
                              description: "You report higher energy when you eat at consistent times. Try to maintain your meal schedule.",
                              action: "Create Meal Schedule"
                            },
                            {
                              title: "Increase Water Intake",
                              description: "Days when you drink 8+ cups of water correlate with better mood and energy in your journal.",
                              action: "Set Water Reminders"
                            }
                          ].map((recommendation, idx) => (
                            <div key={idx} className="border rounded-lg p-4">
                              <h3 className="font-medium">{recommendation.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {recommendation.description}
                              </p>
                              <Button variant="outline" size="sm" className="mt-3">
                                {recommendation.action}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <Dialog open={showAddMealDialog} onOpenChange={setShowAddMealDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>
                  Record what you ate, when, and how you felt.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meal Type</label>
                    <Select 
                      defaultValue={newMeal.type}
                      onValueChange={(value) => setNewMeal({...newMeal, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input 
                      value={newMeal.time}
                      onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Foods (comma separated)</label>
                  <Textarea 
                    placeholder="E.g., Oatmeal, Blueberries, Almond milk"
                    value={newMeal.foods}
                    onChange={(e) => setNewMeal({...newMeal, foods: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estimated Calories</label>
                    <Input 
                      type="number"
                      value={newMeal.calories || ''}
                      onChange={(e) => setNewMeal({...newMeal, calories: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">How I Felt</label>
                    <Select 
                      defaultValue={newMeal.mood}
                      onValueChange={(value) => setNewMeal({...newMeal, mood: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {moodOptions.map(mood => (
                          <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddMealDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMeal} className="bg-green-600 hover:bg-green-700">
                  Add Meal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodJournal;
