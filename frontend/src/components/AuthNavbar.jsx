import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CampanyLogo from '../assets/logo.png';

const AuthNavbar = () => {
  return (
    <motion.div 
      className="bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={CampanyLogo} alt="School Management System" className="h-8 sm:h-10 w-auto" />
            <span className="text-white font-bold hidden sm:inline-block">School Management</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link 
              to="/login" 
              className="text-gray-300 px-2 sm:px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors"
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