
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
