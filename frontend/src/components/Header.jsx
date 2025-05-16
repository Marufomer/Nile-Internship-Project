import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../assets/logo.png";
import { FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '../context/DarkModeContext';

const Header = () => {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  // Helper classes for light/dark mode
  const navBg = darkMode
    ? 'bg-gradient-to-r from-gray-900 to-gray-800'
    : 'bg-gray-100';
  const textMain = darkMode ? 'text-white' : 'text-black';
  const textSubtle = darkMode ? 'text-gray-300' : 'text-black';
  const featuresSectionText = darkMode ? 'text-white' : 'text-gray-800'; // Keep features section gray in light mode
  const btnBg = darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-black hover:bg-gray-300';

  return (
    <div>
      <nav className={`fixed top-0 left-0 w-full ${navBg} shadow-lg h-24 pt-5 px-5 z-50 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <img src={Logo} alt="Logo" className="h-20 w-18 object-contain" />
              <span className={`font-semibold ${textMain} text-lg`}>
                School Smart Management System
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`py-2 px-4 font-semibold hover:text-green-400 transition duration-300 ${textMain}`}
              >
                Home
              </Link>
              <Link
                to="/#features"
                className={`py-2 px-4 font-semibold hover:text-green-400 transition duration-300 ${featuresSectionText}`}
              >
                Features
              </Link>
              <button
                onClick={() => setShowContactForm(true)}
                className={`py-2 px-4 font-semibold hover:text-green-400 transition duration-300 ${textMain}`}
              >
                Contact
              </button>
            </div>

            {/* Login & Register Buttons + Dark Mode Toggle */}
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`p-2 rounded-full shadow transition-colors duration-200 ${btnBg}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
              </button>
              <button
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white w-32 h-10 hover:from-green-600 hover:to-blue-600 rounded-lg transition-colors duration-300 text-sm"
                onClick={() => navigate('/register')}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pt-24">
          <div
            style={{
              background: darkMode
                ? 'linear-gradient(to right, rgba(22, 28, 36, 0.9), rgba(48, 54, 61, 0.9))'
                : 'linear-gradient(to right, rgba(243,244,246,0.97), rgba(229,231,235,0.97))'
            }}
            className="backdrop-blur-md rounded-lg p-6 max-w-sm w-full mx-4 relative"
          >
            {/* Close Button */}
            <button
              className={`absolute top-2 right-2 ${textSubtle} hover:text-black dark:hover:text-white text-2xl font-bold`}
              onClick={() => setShowContactForm(false)}
            >
              ×
            </button>

            <div className="text-center mb-4">
              <h1 className={`text-2xl font-bold ${textMain}`}>Contact Us</h1>
              <p className={`${textSubtle} text-sm`}>We are here to help you.</p>
            </div>

            {/* Contact Form */}
            <form
              className={`space-y-3 p-6 rounded-lg shadow-2xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
              style={{
                background: darkMode
                  ? 'linear-gradient(to right, rgba(31, 41, 55, 0.8), rgba(38, 47, 61, 0.8))'
                  : 'linear-gradient(to right, rgba(243,244,246,0.95), rgba(229,231,235,0.95))'
              }}
            >
              <div>
                <label className={`block text-sm mb-1 ${textSubtle}`}>Name:</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400' : 'border-gray-300 bg-gray-200/70 text-black placeholder-gray-500'} rounded-md shadow-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm`}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className={`block text-sm mb-1 ${textSubtle}`}>Email:</label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400' : 'border-gray-300 bg-gray-200/70 text-black placeholder-gray-500'} rounded-md shadow-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm`}
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className={`block text-sm mb-1 ${textSubtle}`}>Phone:</label>
                <div className="flex">
                  <select className={`py-2 border ${darkMode ? 'border-gray-600 bg-gray-800/50 text-white' : 'border-gray-300 bg-white text-black'} text-sm rounded-l-md focus:ring-2 focus:ring-green-400 focus:border-green-400`}>
                    <option value="+251">Ethiopia(+251)</option>
                    <option value="+1">USA(+1)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+91">India (+91)</option>
                    <option value="+61">Australia (+61)</option>
                    <option value="+49">Germany (+49)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+81">Japan (+81)</option>
                    <option value="+55">Brazil (+55)</option>
                    <option value="+234">Nigeria (+234)</option>
                    <option value="+27">South Africa (+27)</option>
                    <option value="+1">Canada (+1)</option>
                    <option value="+52">Mexico (+52)</option>
                    <option value="+31">Netherlands (+31)</option>
                    <option value="+39">Italy (+39)</option>
                    <option value="+34">Spain (+34)</option>
                    <option value="+47">Norway (+47)</option>
                    <option value="+7">Russia (+7)</option>
                  </select>
                  <input
                    type="tel"
                    className={`w-full px-3 py-2 border border-l-0 ${darkMode ? 'border-gray-600 bg-gray-800/50 text-white' : 'border-gray-300 bg-white text-black'} text-sm rounded-r-md focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-gray-400`}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-1 ${textSubtle}`}>Details:</label>
                <textarea
                  className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400' : 'border-gray-300 bg-gray-200/70 text-black placeholder-gray-500'} rounded-md shadow-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm`}
                  rows="3"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-md hover:from-green-600 hover:to-blue-600 transition-colors text-sm shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
