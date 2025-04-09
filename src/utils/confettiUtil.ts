
// A utility file for canvas-confetti configurations and helpers
import confetti from 'canvas-confetti';

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  [key: string]: any;
}

export const launchConfetti = (options?: ConfettiOptions) => {
  const defaultOptions: ConfettiOptions = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  };
  
  confetti({
    ...defaultOptions,
    ...options
  });
};

export const celebrationConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    
    const particleCount = 50 * (timeLeft / duration);
    
    // Use random colors for each burst of confetti
    confetti({
      particleCount,
      origin: { 
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2
      },
      colors: ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#6366F1']
    });
    
    confetti({
      particleCount,
      origin: { 
        x: randomInRange(0.7, 0.9),
        y: Math.random() - 0.2
      },
      colors: ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#6366F1']
    });
  }, 250);
};
