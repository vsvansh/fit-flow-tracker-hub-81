
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const defaultGoals = {
  calories: { current: 1850, target: 2200, unit: 'kcal' },
  protein: { current: 85, target: 110, unit: 'g' },
  carbs: { current: 210, target: 250, unit: 'g' },
  fat: { current: 65, target: 73, unit: 'g' },
  fiber: { current: 22, target: 30, unit: 'g' }
};

// Fix for the unit property by ensuring it's always defined
const nutritionGoals = [
  { name: "Calories", current: 1850, target: 2200, unit: "kcal" },
  { name: "Protein", current: 85, target: 110, unit: "g" },
  { name: "Carbs", current: 210, target: 250, unit: "g" },
  { name: "Fat", current: 65, target: 73, unit: "g" },
  { name: "Fiber", current: 22, target: 30, unit: "g" }
];

const NutritionGoals = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState(nutritionGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenDialog = (index: number) => {
    setSelectedGoalIndex(index);
    setInputValue(goals[index].target.toString());
    setIsDialogOpen(true);
  };

  const handleSaveGoal = () => {
    const newTarget = parseInt(inputValue, 10);
    if (isNaN(newTarget) || newTarget <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number greater than zero.",
        variant: "destructive",
      });
      return;
    }

    const updatedGoals = goals.map((goal, index) =>
      index === selectedGoalIndex ? { ...goal, target: newTarget } : goal
    );

    setGoals(updatedGoals);
    setIsDialogOpen(false);
    setShowSuccess(true);

    toast({
      title: "Goal updated",
      description: `Your target for ${goals[selectedGoalIndex].name} has been updated to ${newTarget}.`,
    });

    // Reset success state after a delay
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleResetGoals = () => {
    setGoals(nutritionGoals);
    toast({
      title: "Goals reset",
      description: "Your nutrition goals have been reset to the default values.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-md overflow-hidden border-0 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
          <CardHeader className="pb-2 relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-orange-400 dark:bg-orange-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <CardTitle className="text-xl font-bold flex items-center">
              Nutrition Goals
            </CardTitle>
            <CardDescription>
              Set and track your daily nutrition targets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.name}
                className="flex items-center justify-between py-2 border-b border-yellow-200 dark:border-yellow-700 last:border-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center">
                  <span className="w-24 font-medium">{goal.name}</span>
                  <Progress
                    value={(goal.current / goal.target) * 100}
                    className="h-2 flex-grow mx-4"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {goal.current} / {goal.target} {goal.unit}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-300 dark:hover:bg-yellow-900/20"
                  onClick={() => handleOpenDialog(index)}
                >
                  Edit
                </Button>
              </motion.div>
            ))}
            <Button
              variant="secondary"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleResetGoals}
            >
              Reset to Defaults
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] my-4 border-0 shadow-lg bg-gradient-to-b from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950/30">
          <DialogHeader>
            <DialogTitle>Edit {goals[selectedGoalIndex]?.name} Goal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="target"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveGoal}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-md shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            Goal updated successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionGoals;
