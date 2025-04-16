
import confetti, { Options } from 'canvas-confetti';

export const launchConfetti = (options: Options = {}) => {
  const defaultOptions: Options = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  };

  confetti({
    ...defaultOptions,
    ...options
  });
};

// Add the missing celebrationConfetti function
export const celebrationConfetti = () => {
  // Create a more elaborate confetti effect for celebrations
  const duration = 3000;
  const end = Date.now() + duration;

  // Run the animation until the duration is complete
  const interval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    // Random confetti burst with varying origins
    confetti({
      particleCount: 15,
      angle: Math.random() * 60 + 60,
      spread: 70,
      origin: { 
        x: Math.random(), 
        y: Math.random() - 0.2 
      },
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
      zIndex: 9999,
      disableForReducedMotion: true
    });

    // Create opposite side confetti for balance
    confetti({
      particleCount: 15,
      angle: Math.random() * 60 + 240,
      spread: 70,
      origin: { 
        x: Math.random(), 
        y: Math.random() - 0.2 
      },
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
      zIndex: 9999,
      disableForReducedMotion: true
    });
  }, 250);
};
