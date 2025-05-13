/**
 * Utility functions for handling profile image persistence
 */

/**
 * Save profile image to localStorage
 * @param {string} imageData - Base64 image data or URL
 */
export const saveProfileImage = (imageData) => {
  if (!imageData) return;
  
  try {
    // Store the image data in localStorage
    localStorage.setItem('profileImage', imageData);
    console.log('Profile image saved to localStorage');
    
    // Update the timestamp to help with cache busting
    localStorage.setItem('profileImageTimestamp', Date.now().toString());
  } catch (error) {
    console.error('Error saving profile image to localStorage:', error);
  }
};

/**
 * Get profile image from various sources with priority
 * 1. From props/parameter
 * 2. From Redux store
 * 3. From localStorage
 * 
 * @param {string} profilePic - Profile image from props
 * @param {object} authUser - User object from Redux store
 * @returns {string} - Image URL or data URL
 */
export const getProfileImage = (profilePic, authUser) => {
  // Priority 1: Use the provided profilePic parameter if it's not empty
  if (profilePic && profilePic.length > 10) { // Simple validation to ensure it's not an empty string
    return addCacheBusting(profilePic);
  }
  
  // Priority 2: Use the Redux store's user profile pic
  if (authUser?.ProfilePic && authUser.ProfilePic.length > 10) {
    return addCacheBusting(authUser.ProfilePic);
  }
  
  // Priority 3: Use localStorage as a fallback
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    return addCacheBusting(savedImage);
  }
  
  // No image found
  return null;
};

/**
 * Add cache busting to an image URL
 * @param {string} url - Image URL or data URL
 * @returns {string} - URL with cache busting parameter
 */
export const addCacheBusting = (url) => {
  if (!url) return null;
  
  // If it's a data URL, return as is
  if (url.startsWith('data:image')) {
    return url;
  }
  
  // Add a timestamp parameter to prevent caching
  const timestamp = localStorage.getItem('profileImageTimestamp') || Date.now();
  return url.includes('?') ? `${url}&t=${timestamp}` : `${url}?t=${timestamp}`;
};

/**
 * Initialize profile image from localStorage when the app loads
 * This should be called in App.jsx or during initial auth setup
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} updateUserInfo - Redux action
 */
export const initializeProfileImage = (dispatch, updateUserInfo) => {
  try {
    const savedImage = localStorage.getItem('profileImage');
    if (!savedImage) {
      console.log('No saved profile image found in localStorage');
      return;
    }
    
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      console.log('No user found in localStorage');
      return;
    }
    
    const user = JSON.parse(userStr);
    console.log('Initializing profile image from localStorage');
    
    // Check if we need to update the user data with our saved image
    const shouldUpdateUserData = !user.ProfilePic || user.ProfilePic !== savedImage;
    
    if (shouldUpdateUserData) {
      console.log('Updating user data with saved profile image');
      
      // Update localStorage with the saved image
      const updatedUser = {
        ...user,
        ProfilePic: savedImage
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // If Redux is available, update the store
      if (dispatch && updateUserInfo) {
        dispatch(updateUserInfo({ ProfilePic: savedImage }));
      }
    } else {
      console.log('User already has the correct profile image');
    }
  } catch (error) {
    console.error('Error initializing profile image:', error);
  }
}; 