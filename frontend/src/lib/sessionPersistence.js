/**
 * Session Persistence Utilities
 * These utilities help maintain user data across sessions and page refreshes
 */

import { getImageUrlWithCacheBusting } from './imageUtils';

// Key for storing profile image in sessionStorage
const PROFILE_IMAGE_KEY = 'cachedProfileImage';
const PROFILE_IMAGE_TIMESTAMP = 'profileImageTimestamp';

/**
 * Caches a profile image URL to ensure it persists across page refreshes
 * @param {string} imageUrl - The profile image URL to cache
 */
export const cacheProfileImage = (imageUrl) => {
  if (!imageUrl) return;
  
  try {
    // Store the clean URL (without timestamps)
    const cleanUrl = imageUrl.split('?')[0];
    sessionStorage.setItem(PROFILE_IMAGE_KEY, cleanUrl);
    sessionStorage.setItem(PROFILE_IMAGE_TIMESTAMP, Date.now().toString());
    console.log('Profile image cached:', cleanUrl);
  } catch (error) {
    console.error('Error caching profile image:', error);
  }
};

/**
 * Retrieves the cached profile image URL with a fresh timestamp
 * @returns {string|null} The cached image URL or null if not found
 */
export const getCachedProfileImage = () => {
  try {
    const cachedImage = sessionStorage.getItem(PROFILE_IMAGE_KEY);
    if (!cachedImage) return null;
    
    // Return with cache busting
    return getImageUrlWithCacheBusting(cachedImage, true);
  } catch (error) {
    console.error('Error retrieving cached profile image:', error);
    return null;
  }
};

/**
 * Ensures the Redux state has the most recent profile image
 * @param {object} state - The current Redux state
 * @returns {object} Updated state with persisted profile image
 */
export const ensureProfileImagePersistence = (state) => {
  if (!state || !state.auth || !state.auth.Authuser) return state;
  
  try {
    const cachedImage = getCachedProfileImage();
    const currentImage = state.auth.Authuser.ProfilePic;
    
    // If there's no current image but we have a cached one, use the cached one
    if (!currentImage && cachedImage) {
      return {
        ...state,
        auth: {
          ...state.auth,
          Authuser: {
            ...state.auth.Authuser,
            ProfilePic: cachedImage
          }
        }
      };
    }
    
    // If we have a current image, make sure it's cached
    if (currentImage) {
      cacheProfileImage(currentImage);
    }
    
    return state;
  } catch (error) {
    console.error('Error ensuring profile image persistence:', error);
    return state;
  }
};

/**
 * Add this to your application's startup code to initialize session persistence
 */
export const initSessionPersistence = () => {
  // Listen for storage events to sync across tabs
  window.addEventListener('storage', (event) => {
    if (event.key === PROFILE_IMAGE_KEY) {
      console.log('Profile image updated in another tab');
      // You could dispatch a Redux action here to update the state
    }
  });
  
  console.log('Session persistence initialized');
}; 