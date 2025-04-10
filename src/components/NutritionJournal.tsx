
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Book, Calendar, Edit, Image, Plus, Search, Trash2, BarChart, Star, MessageSquare, Heart, List } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface JournalEntry {
  id: number;
  date: string;
  content: string;
  mood: "great" | "good" | "okay" | "bad";
  tags: string[];
  images?: string[];
}

interface MealEntry {
  id: number;
  name: string;
  time: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  notes?: string;
  image?: string;
}

const NutritionJournal = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [searchQuery, setSearchQuery] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryMood, setNewEntryMood] = useState<"great" | "good" | "okay" | "bad">("good");
  const [newEntryTags, setNewEntryTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [createEntryOpen, setCreateEntryOpen] = useState(false);
  const [viewEntryOpen, setViewEntryOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Sample journal entries
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: "2025-04-08",
      content: "I'm making good progress with my nutrition goals! Today I managed to eat 5 servings of vegetables and kept my sugar intake low. I noticed I have more energy throughout the day when I eat better.",
      mood: "great",
      tags: ["progress", "vegetables", "energy"],
    },
    {
      id: 2,
      date: "2025-04-07",
      content: "Found it difficult to stick to my meal plan today. Had a work lunch where healthy options were limited. Need to plan better for these situations in the future.",
      mood: "okay",
      tags: ["challenge", "work", "planning"],
    },
    {
      id: 3,
      date: "2025-04-05",
      content: "Started tracking my macros more carefully today. I realized I've been underestimating my protein intake. Going to focus on getting at least 100g daily from now on.",
      mood: "good",
      tags: ["macros", "protein", "tracking"],
      images: ["/placeholder.svg"],
    },
  ]);

  // Sample meal entries
  const [meals, setMeals] = useState<MealEntry[]>([
    {
      id: 1,
      name: "Breakfast: Protein Oatmeal",
      time: "07:30",
      calories: 420,
      proteins: 28,
      carbs: 52,
      fats: 12,
      notes: "Added an extra scoop of protein powder and some berries",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Lunch: Chicken Salad",
      time: "12:15",
      calories: 550,
      proteins: 45,
      carbs: 30,
      fats: 25,
      notes: "Used olive oil and balsamic dressing",
    },
    {
      id: 3,
      name: "Snack: Greek Yogurt",
      time: "15:30",
      calories: 180,
      proteins: 22,
      carbs: 8,
      fats: 5,
      notes: "Added some honey and walnuts",
    },
  ]);

  // Add a new journal entry
  const handleAddEntry = () => {
    if (!newEntryContent.trim()) {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something in your journal entry.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1,
      date: format(new Date(), "yyyy-MM-dd"),
      content: newEntryContent,
      mood: newEntryMood,
      tags: newEntryTags,
    };

    setEntries([newEntry, ...entries]);
    setNewEntryContent("");
    setNewEntryMood("good");
    setNewEntryTags([]);
    setCreateEntryOpen(false);

    toast({
      title: "Journal entry added",
      description: "Your nutrition journal entry has been saved.",
    });
  };

  // Delete a journal entry
  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setViewEntryOpen(false);
    }

    toast({
      title: "Entry deleted",
      description: "Your journal entry has been removed.",
      variant: "destructive",
    });
  };

  // Add tag to new entry
  const handleAddTag = () => {
    if (tagInput.trim() && !newEntryTags.includes(tagInput.trim())) {
      setNewEntryTags([...newEntryTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove tag from new entry
  const handleRemoveTag = (tag: string) => {
    setNewEntryTags(newEntryTags.filter(t => t !== tag));
  };

  // View entry details
  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setViewEntryOpen(true);
  };

  // Filter entries based on search query
  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get mood emoji
  const getMoodEmoji = (mood: "great" | "good" | "okay" | "bad") => {
    switch (mood) {
      case "great": return "😄";
      case "good": return "🙂";
      case "okay": return "😐";
      case "bad": return "😔";
      default: return "🙂";
    }
  };

  // Get mood color
  const getMoodColor = (mood: "great" | "good" | "okay" | "bad") => {
    switch (mood) {
      case "great": return "text-green-500";
      case "good": return "text-blue-500";
      case "okay": return "text-amber-500";
      case "bad": return "text-red-500";
      default: return "text-blue-500";
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Book className="h-5 w-5 mr-2 text-blue-500" />
            <CardTitle className="text-xl font-bold">Nutrition Journal</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search entries..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={createEntryOpen} onOpenChange={setCreateEntryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add Journal Entry</DialogTitle>
                  <DialogDescription>
                    Record your nutrition insights, challenges, and victories.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>How are you feeling about your nutrition today?</Label>
                    <div className="flex justify-between items-center">
                      {(["great", "good", "okay", "bad"] as const).map((mood) => (
                        <Button
                          key={mood}
                          type="button"
                          variant={mood === newEntryMood ? "default" : "outline"}
                          className="flex-1 mx-1"
                          onClick={() => setNewEntryMood(mood)}
                        >
                          <span className="mr-1">{getMoodEmoji(mood)}</span>
                          <span className="capitalize">{mood}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="journal-entry">Journal Entry</Label>
                    <Textarea
                      id="journal-entry"
                      placeholder="What's on your mind regarding your nutrition today?"
                      className="min-h-[150px]"
                      value={newEntryContent}
                      onChange={(e) => setNewEntryContent(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newEntryTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-1">
                          {tag}
                          <button 
                            onClick={() => handleRemoveTag(tag)} 
                            className="ml-1 text-xs hover:text-red-500"
                          >
                            ✕
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex">
                      <Input
                        placeholder="Add tags (e.g., protein, meal prep, snacks)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        className="ml-2" 
                        onClick={handleAddTag}
                        disabled={!tagInput.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Add Image (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Image className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateEntryOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEntry}>Save Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="entries">Journal Entries</TabsTrigger>
            <TabsTrigger value="meals">Meal Log</TabsTrigger>
          </TabsList>
          <TabsContent value="entries">
            <div className="space-y-4">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(entry => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleViewEntry(entry)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="flex flex-col items-center mr-3">
                          <span className={`text-2xl ${getMoodColor(entry.mood)}`}>
                            {getMoodEmoji(entry.mood)}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {format(new Date(entry.date), "MMM d")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm line-clamp-2">{entry.content}</p>
                          {entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {entry.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEntry(entry.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                    </div>
                    {entry.images && entry.images.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {entry.images.map((img, idx) => (
                          <div key={idx} className="w-16 h-16 rounded overflow-hidden">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Book className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium">No journal entries found</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-1">
                    {searchQuery
                      ? "No entries match your search query. Try a different search term."
                      : "Start tracking your nutrition journey by adding your first entry."}
                  </p>
                  {!searchQuery && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setCreateEntryOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Entry
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="meals">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Recent Meals</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Meal
                </Button>
              </div>
              <div className="divide-y">
                {meals.map(meal => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-4 flex items-start space-x-4"
                  >
                    <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      {meal.image ? (
                        <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <Image className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{meal.name}</h4>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Today</span>
                            <span className="mx-1">•</span>
                            <span>{meal.time}</span>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-4 gap-2">
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-center">
                          <div className="text-sm font-medium">{meal.calories}</div>
                          <div className="text-xs text-gray-500">calories</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{meal.proteins}g</div>
                          <div className="text-xs text-gray-500">protein</div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded text-center">
                          <div className="text-sm font-medium text-amber-600 dark:text-amber-400">{meal.carbs}g</div>
                          <div className="text-xs text-gray-500">carbs</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-center">
                          <div className="text-sm font-medium text-purple-600 dark:text-purple-400">{meal.fats}g</div>
                          <div className="text-xs text-gray-500">fats</div>
                        </div>
                      </div>
                      {meal.notes && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="italic">{meal.notes}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Entry View Dialog */}
        <Dialog open={viewEntryOpen} onOpenChange={setViewEntryOpen}>
          <DialogContent className="sm:max-w-[550px]">
            {selectedEntry && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle>Journal Entry</DialogTitle>
                    <div className="flex items-center">
                      <span className={`text-2xl mr-2 ${getMoodColor(selectedEntry.mood)}`}>
                        {getMoodEmoji(selectedEntry.mood)}
                      </span>
                      <Badge variant="outline">
                        {format(new Date(selectedEntry.date), "MMMM d, yyyy")}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm whitespace-pre-line">{selectedEntry.content}</p>

                  {selectedEntry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {selectedEntry.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {selectedEntry.images && selectedEntry.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedEntry.images.map((img, idx) => (
                          <div key={idx} className="rounded overflow-hidden">
                            <img src={img} alt="" className="w-full h-auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDeleteEntry(selectedEntry.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button variant="outline" onClick={() => setViewEntryOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default NutritionJournal;
