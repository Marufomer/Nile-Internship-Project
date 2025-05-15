import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CampanyLogo from '../assets/logo.png';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '../context/DarkModeContext';

const AuthNavbar = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  
  return (
    <motion.div 
      className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'} fixed top-0 left-0 right-0 z-50 shadow-lg border-b transition-colors duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={CampanyLogo} alt="School Management System" className="h-8 sm:h-10 w-auto" />
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'} font-bold hidden sm:inline-block transition-colors duration-300`}>School Management</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors duration-300`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            <Link 
              to="/login" 
              className={`${darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'} px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthNavbar; 