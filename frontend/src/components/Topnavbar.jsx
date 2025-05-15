import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiSettings, FiLogOut, FiUser, FiSun, FiMoon } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../features/Authentication";
import toast from 'react-hot-toast';
import NotificationDropdown from './NotificationDropdown';
import ProfilePicture from './ProfilePicture';
import { useDarkMode } from '../context/DarkModeContext';

function TopNavbar() {
  const { Authuser } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notification);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [profileImageKey, setProfileImageKey] = useState(Date.now());  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useDarkMode();

  // Debug the Authuser object
  useEffect(() => {
    console.log("Authuser in TopNavbar:", Authuser);
    // Force a re-render of the profile image when Authuser changes
    setProfileImageKey(Date.now());
  }, [Authuser]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      // toast.success('Logged out successfully');
      // Redirect to login page with a slight delay to ensure state is updated
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 200);
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    }
  };

  // Format name for display
  const getDisplayName = () => {
    if (!Authuser) return 'User';
    
    return Authuser.firstName 
      ? `${Authuser.firstName} ${Authuser.lastName || ''}`
      : Authuser.email?.split('@')[0] || 'User';
  };

  // Get user role with first letter capitalized
  const getUserRole = () => {
    if (!Authuser || !Authuser.role) return '';
    return Authuser.role.charAt(0).toUpperCase() + Authuser.role.slice(1).toLowerCase();
  };

  // Toggle notifications dropdown
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  return (
    <div className='bg-white dark:bg-gray-800 shadow-md z-50 fixed top-0 left-0 right-0'>
      <nav className='w-full h-12 flex items-center justify-between px-2 sm:px-3'>
        {/* Left side - Welcome message */}
        <div className="pl-1">
          <motion.h1 
            className='text-sm sm:text-base md:text-lg font-semibold text-black dark:text-white truncate max-w-[120px] sm:max-w-[180px] md:max-w-none'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome, {getDisplayName()}
          </motion.h1>
        </div>
        
        {/* Right side - Search, notifications, profile */}
        <div className='flex items-center space-x-1 sm:space-x-2 md:space-x-4'>
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='p-1 text-black dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
          >
            {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          {/* Search */}
          <div className='relative hidden md:block'>
            <input 
              type="text" 
              placeholder="Search..." 
              className="py-1 pl-8 pr-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
            />
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400" />
          </div>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              className='relative p-1 text-black dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors'
              onClick={toggleNotifications}
            >
              <FiBell className="text-lg" />
              {unreadCount > 0 && (
                <span className='absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            <NotificationDropdown 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </div>
          
          {/* Profile dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center space-x-1 sm:space-x-2 focus:outline-none'
            >
              <div className='relative w-7 h-7 sm:w-8 sm:h-8 overflow-hidden border-2 border-blue-500 rounded-full'>
                <ProfilePicture 
                  profilePic={Authuser?.ProfilePic}
                  firstName={Authuser?.firstName}
                  size="small"
                  editable={false}
                  key={profileImageKey}
                />
              </div>
              <div className='hidden md:block text-left'>
                <h2 className='text-black dark:text-white font-medium text-xs sm:text-sm'>{getDisplayName()}</h2>
                <p className='text-gray-600 dark:text-gray-400 text-xs'>{getUserRole()}</p>
              </div>
            </button>
            
            {/* Dropdown menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-700'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/${Authuser?.role?.toLowerCase()}/account`} className='flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                    <FiUser className="mr-3 text-gray-500 dark:text-gray-400" />
                    My Profile
                  </Link>
                  <Link to={`/${Authuser?.role?.toLowerCase()}/settings`} className='flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                    <FiSettings className="mr-3 text-gray-500 dark:text-gray-400" />
                    Settings
                  </Link>
                  <Link to={`/${Authuser?.role?.toLowerCase()}/notifications`} className='flex items-center px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                    <FiBell className="mr-3 text-gray-500 dark:text-gray-400" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <hr className='my-1 border-gray-100 dark:border-gray-700' />
                  <button 
                    onClick={handleLogout}
                    className='w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
                  >
                    <FiLogOut className="mr-3" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      <hr className='border-gray-200 dark:border-gray-700' />
    </div>
  );
}

export default TopNavbar;