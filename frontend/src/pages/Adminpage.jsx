import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";

function Adminpage() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { Authuser } = useSelector((state) => state.auth);

  // Check if on mobile and auto-close sidebar if needed
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && isOpen) {
        setIsOpen(false);
      } else if (!mobile && !isOpen) {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  // Simulate loading state
  useEffect(() => {
    // Short timeout to simulate loading and allow for animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!Authuser) {
    return <LoadingScreen />;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div 
          className="flex min-h-screen bg-gray-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sidebar */}
          <div 
            className={`fixed z-20 h-full transition-all duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          
          {/* Overlay for mobile */}
          <AnimatePresence>
            {isOpen && isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-10 lg:hidden"
                onClick={() => setIsOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Main content shifts with sidebar */}
          <motion.div
            className={`flex-1 transition-all duration-300 ease-in-out pt-14 ${
              isOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Loading screen component
function LoadingScreen() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
        }}
        className="text-white text-4xl mb-4"
      >
        <FiLoader />
      </motion.div>
      <motion.h2 
        className="text-black text-2xl font-bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading Dashboard...
      </motion.h2>
      <p className="text-blue-200 mt-2">Please wait while we prepare your experience</p>
    </motion.div>
  );
}

export default Adminpage;
