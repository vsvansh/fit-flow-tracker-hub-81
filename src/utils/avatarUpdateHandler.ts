
/**
 * Utility functions to handle avatar updates across the application
 */

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
  return localStorage.getItem('userAvatar') || '/placeholder.svg';
};
