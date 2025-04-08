
import { userProfile } from './fitnessData';

// Extend user profile with additional properties
export const extendedUserProfile = {
  ...userProfile,
  profilePic: "/placeholder.svg",
  goalWeight: 75, // in kg
  dietaryPreferences: ["Low carb", "High protein"],
  allergies: [],
  fitnessGoals: ["Build muscle", "Improve endurance"],
};
