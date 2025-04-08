
import { useState } from 'react';
import WaterTracker from './WaterTracker';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Edit2 } from 'lucide-react';
import { toast } from './ui/use-toast';

const WaterTrackerWithEdit = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalGlasses, setTotalGlasses] = useState(8);
  const [inputValue, setInputValue] = useState('8');

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
      
      <WaterTracker />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
              />
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
