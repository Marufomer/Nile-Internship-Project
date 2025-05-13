import React, { useState, useRef, useEffect } from 'react';
import { FiCamera, FiUser } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../features/Authentication';
import toast from 'react-hot-toast';
import { getImageUrlWithCacheBusting } from '../lib/imageUtils';
import { cacheProfileImage } from '../lib/sessionPersistence';

/**
 * A specialized component for handling profile image upload in account settings
 */
const AccountProfileImage = ({ profileImage, firstName, onUpdate }) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [localImage, setLocalImage] = useState(null);
  const [showFallback, setShowFallback] = useState(true);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Initialize from props
  useEffect(() => {
    if (profileImage) {
      setLocalImage(profileImage);
      setShowFallback(false);
      console.log('AccountProfileImage: setting image from props:', profileImage);
    } else {
      setShowFallback(true);
    }
  }, [profileImage]);

  const handleFileSelect = () => {
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      
      // Update UI immediately
      setLocalImage(dataUrl);
      setShowFallback(false);
      
      try {
        setIsUploading(true);
        
        // Store in sessionStorage for persistence
        cacheProfileImage(dataUrl);
        
        // Send to server via Redux
        await dispatch(updateProfile({ ProfilePic: dataUrl })).unwrap();
        
        // Notify parent component
        if (onUpdate) {
          onUpdate(dataUrl);
        }
        
        toast.success('Profile image updated successfully');
      } catch (error) {
        console.error('Failed to update profile image:', error);
        toast.error('Failed to update profile image');
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    
    reader.readAsDataURL(file);
  };

  const handleImageError = () => {
    console.error('Failed to load profile image:', localImage);
    setShowFallback(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={imageContainerRef}
        className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 relative cursor-pointer group"
        onClick={handleFileSelect}
      >
        {!showFallback && localImage ? (
          <img
            ref={imageRef}
            src={localImage}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {firstName ? firstName.charAt(0).toUpperCase() : <FiUser className="text-4xl" />}
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <FiCamera className="text-white text-2xl" />
        </div>
        
        {/* Loading overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <button
        type="button"
        onClick={handleFileSelect}
        className="mt-3 text-blue-600 text-sm hover:underline focus:outline-none"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Change Photo'}
      </button>
    </div>
  );
};

export default AccountProfileImage; 