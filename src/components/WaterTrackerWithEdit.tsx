
import { useState, useEffect } from 'react';
import WaterTracker from './WaterTracker';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Edit2, Droplet } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Slider } from './ui/slider';
import { launchConfetti } from '@/utils/confettiUtil';
import { motion, AnimatePresence } from 'framer-motion';

const WaterTrackerWithEdit = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalGlasses, setTotalGlasses] = useState(8);
  const [inputValue, setInputValue] = useState('8');
  const [showGlowEffect, setShowGlowEffect] = useState(false);

  // Add glow effect when reaching water goal
  useEffect(() => {
    if (showGlowEffect) {
      const timer = setTimeout(() => setShowGlowEffect(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showGlowEffect]);

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
    setShowGlowEffect(true);
    
    toast({
      title: "Water goal updated",
      description: `Your daily water goal is now ${newTotal} glasses`,
    });
    
    launchConfetti({
      particleCount: 50,
      spread: 70,
      decay: 0.95,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div 
      className={`relative water-tracker-container ${showGlowEffect ? 'animate-pulse' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {showGlowEffect && (
          <motion.div 
            className="absolute inset-0 rounded-xl bg-blue-400 dark:bg-blue-600 blur-xl opacity-20 z-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="absolute top-3 right-3 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="water-tracker-edit-button bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
          onClick={() => setIsDialogOpen(true)}
        >
          <Edit2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </Button>
      </motion.div>
      
      <WaterTracker dailyGoal={totalGlasses} />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] my-4 border-0 shadow-lg bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl opacity-10 -mr-10 -mt-10 pointer-events-none"></div>
          
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Droplet className="h-5 w-5 mr-2 text-blue-500" />
              Edit Daily Water Goal
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="glasses" className="col-span-2 text-blue-800 dark:text-blue-200">
                Number of glasses
              </Label>
              <Input
                id="glasses"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-2 border-blue-200 dark:border-blue-800 focus:ring-blue-500"
                min="1"
                max="20"
              />
            </div>
            
            <div className="py-2">
              <Label className="mb-2 block text-blue-800 dark:text-blue-200">Quick select:</Label>
              <Slider 
                value={[parseInt(inputValue) || 8]} 
                min={1} 
                max={20} 
                step={1}
                onValueChange={(value) => setInputValue(value[0].toString())}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-blue-500 dark:text-blue-400 mt-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>
            
            <motion.div 
              className="w-full flex justify-center my-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex space-x-2">
                {Array.from({ length: parseInt(inputValue) || 8 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                  >
                    <Droplet className="h-3 w-3 text-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default WaterTrackerWithEdit;
