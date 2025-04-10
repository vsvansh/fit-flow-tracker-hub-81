
/**
 * Utility functions to handle avatar updates across the application
 */

// Default profile image URL
const DEFAULT_AVATAR_URL = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

// Update avatar in localStorage and dispatch an event to notify components
export const updateUserAvatar = (avatarUrl: string) => {
  // Store the avatar URL in localStorage for persistence
  localStorage.setItem('userAvatar', avatarUrl);
  
  // Dispatch a custom event that components can listen for
  const avatarUpdateEvent = new Event('avatarUpdate');
  window.dispatchEvent(avatarUpdateEvent);
  
  // Also trigger a storage event for components that listen to storage
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'userAvatar',
    newValue: avatarUrl
  }));
};

// Get the current avatar from localStorage or return the default
export const getCurrentAvatar = (): string => {
  return localStorage.getItem('userAvatar') || DEFAULT_AVATAR_URL;
};

// Set default avatar on first load if not already set
export const initializeAvatar = () => {
  if (!localStorage.getItem('userAvatar')) {
    updateUserAvatar(DEFAULT_AVATAR_URL);
  }
};
