
import { useState, useEffect } from 'react';
import WaterTracker from './WaterTracker';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Edit2 } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Slider } from './ui/slider';

const WaterTrackerWithEdit = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalGlasses, setTotalGlasses] = useState(8);
  const [inputValue, setInputValue] = useState('8');

  // Pass totalGlasses to WaterTracker
  useEffect(() => {
    // This effect passes the updated totalGlasses value to the WaterTracker component
    // This would be handled with context or props in a real application
  }, [totalGlasses]);

  const handleSave = () => {
    const newTotal = parseInt(inputValue, 10);
    if (isNaN(newTotal) || newTotal < 1) {
      toast({
        title: "Invalid value",
        description: "Please enter a valid number of glasses (minimum 1)",
        variant: "destructive",
      });
      return;
    }
    
    setTotalGlasses(newTotal);
    setIsDialogOpen(false);
    
    toast({
      title: "Water goal updated",
      description: `Your daily water goal is now ${newTotal} glasses`,
    });
  };

  return (
    <div className="relative water-tracker-container">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-3 right-3 z-10 water-tracker-edit-button"
        onClick={() => setIsDialogOpen(true)}
      >
        <Edit2 className="h-4 w-4 text-muted-foreground" />
      </Button>
      
      <WaterTracker dailyGoal={totalGlasses} />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] my-4">
          <DialogHeader>
            <DialogTitle>Edit Daily Water Goal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="glasses" className="col-span-2">
                Number of glasses
              </Label>
              <Input
                id="glasses"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-2"
                min="1"
                max="20"
              />
            </div>
            <div className="py-2">
              <Label className="mb-2 block">Quick select:</Label>
              <Slider 
                value={[parseInt(inputValue) || 8]} 
                min={1} 
                max={20} 
                step={1}
                onValueChange={(value) => setInputValue(value[0].toString())}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaterTrackerWithEdit;
