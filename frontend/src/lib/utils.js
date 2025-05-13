/**
 * Utility functions for authentication and general use
 */

/**
 * Safely gets authenticated user data from localStorage
 * @returns {Object|null} User data or null if not available
 */
export const getSafeUserData = () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    
    const parsedData = JSON.parse(userData);
    
    // Add timestamp to ProfilePic URL to avoid caching issues
    if (parsedData && parsedData.ProfilePic) {
      const timestamp = Date.now();
      // Only add timestamp if it doesn't already have one
      if (!parsedData.ProfilePic.includes('?t=')) {
        parsedData.ProfilePic = `${parsedData.ProfilePic}?t=${timestamp}`;
      }
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    // Clear invalid data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
};

/**
 * Safely stores user data in localStorage
 * @param {Object} userData User data to store
 * @returns {boolean} Success status
 */
export const storeUserData = (userData) => {
  try {
    if (!userData) {
      console.error('Attempted to store empty user data');
      return false;
    }
    
    // Create a copy to avoid modifying the original object
    const userDataToStore = { ...userData };
    
    // Make sure we're not losing any ProfilePic data
    const existingUserData = getSafeUserData();
    if (!userDataToStore.ProfilePic && existingUserData?.ProfilePic) {
      console.log('Preserving existing ProfilePic in localStorage');
      userDataToStore.ProfilePic = existingUserData.ProfilePic;
    }
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userDataToStore));
    
    // Store token separately if provided
    if (userDataToStore.token) {
      localStorage.setItem('token', userDataToStore.token);
    }
    
    console.log('User data stored successfully:', userDataToStore);
    return true;
  } catch (error) {
    console.error('Error storing user data in localStorage:', error);
    return false;
  }
};

/**
 * Clears all auth-related data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('authUser');
};

/**
 * Normalizes role strings for consistent comparison
 * @param {string} role Role string to normalize
 * @returns {string} Normalized role
 */
export const normalizeRole = (role) => {
  if (!role || typeof role !== 'string') return '';
  
  const roleStr = role.toLowerCase().trim();
  
  if (['admin', 'administrator'].includes(roleStr)) return 'admin';
  if (['manager', 'administrative'].includes(roleStr)) return 'manager';
  if (['teacher', 'instructor', 'faculty'].includes(roleStr)) return 'teacher';
  if (['student', 'learner', 'pupil'].includes(roleStr)) return 'student';
  
  return roleStr;
};

/**
 * Gets redirect path based on user role
 * @param {string} role User role
 * @returns {string} Path to redirect to
 */
export const getRedirectPathByRole = (role) => {
  const normalizedRole = normalizeRole(role);
  
  switch (normalizedRole) {
    case 'admin':
      return '/admin/admindashboard';
    case 'teacher':
      return '/teacher/dashboard';
    case 'student':
      return '/student/home';
    case 'manager':
      return '/admin/manage';
    default:
      return '/';
  }
}; 