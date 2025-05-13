/**
 * Utility functions for handling images
 */

/**
 * Compress an image file and return a base64 string
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.maxWidth - Maximum width of the image (default: 1024)
 * @param {number} options.maxHeight - Maximum height of the image (default: 1024)
 * @param {number} options.quality - JPEG quality from 0 to 1 (default: 0.8)
 * @returns {Promise<string>} - A promise that resolves to a compressed base64 image string
 */
export const compressImage = (file, options = {}) => {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.8
  } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.match(/image.*/)) {
      reject(new Error('Not an image file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        // Calculate new dimensions
        let width = image.width;
        let height = image.height;
        
        if (width > maxWidth) {
          height = Math.round(height * maxWidth / width);
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = Math.round(width * maxHeight / height);
          height = maxHeight;
        }
        
        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        
        // Get base64 data URL with specified quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        resolve(dataUrl);
      };
      
      image.onerror = (error) => {
        reject(error);
      };
      
      image.src = readerEvent.target.result;
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Estimates the file size of a base64 string in bytes
 * @param {string} base64String - The base64 string to check
 * @returns {number} - The estimated file size in bytes
 */
export const getBase64Size = (base64String) => {
  // Remove the data URL part if it exists
  const base64 = base64String.split(',')[1] || base64String;
  
  // Calculate the size in bytes
  return Math.ceil((base64.length * 3) / 4);
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param {number} bytes - The size in bytes
 * @returns {string} - Human-readable size
 */
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

/**
 * Adds cache-busting parameters to image URLs
 * @param {string} imageUrl - The original image URL
 * @param {boolean} forceRefresh - Whether to force a new timestamp
 * @returns {string} - URL with cache-busting parameters
 */
export const getImageUrlWithCacheBusting = (imageUrl, forceRefresh = false) => {
  if (!imageUrl) return '';
  
  // Generate a cache-busting timestamp
  const timestamp = forceRefresh ? Date.now() : sessionStorage.getItem('imageCacheKey') || Date.now();
  
  // Store the timestamp in session storage for consistent use
  if (forceRefresh || !sessionStorage.getItem('imageCacheKey')) {
    sessionStorage.setItem('imageCacheKey', timestamp);
  }
  
  // Add cache-busting parameter
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}t=${timestamp}`;
}; 