import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Google from "../assets/icons8-google.svg";
import CampanyLogo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login, setRememberMe } from "../features/Authentication";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import { normalizeRole, getRedirectPathByRole, getRememberMePreference } from "../lib/utils";
import AuthNavbar from "../components/AuthNavbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMeState] = useState(getRememberMePreference() || false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Authuser, isUserLogin } = useSelector((state) => state.auth);
 
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Clear any login errors when inputs change
  useEffect(() => {
    if (loginError) setLoginError("");
    if (errors.email && email) setErrors(prev => ({ ...prev, email: "" }));
    if (errors.password && password) setErrors(prev => ({ ...prev, password: "" }));
  }, [email, password, loginError]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    console.log('Remember me checkbox changed:', isChecked);
    setRememberMeState(isChecked);
    dispatch(setRememberMe(isChecked));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoginError("");
    
    try {
      console.log('Remember me value before login dispatch:', rememberMe);
      const resultAction = await dispatch(login({ email, password, rememberMe }));
      
      if (login.fulfilled.match(resultAction)) {
        // Login successful
        toast.success('Login successful!');
        
        const user = resultAction.payload.user;
        if (!user || !user.role) {
          setLoginError("Login succeeded but user data is incomplete. Please try again.");
          return;
        }
        
        const userRole = user.role;
        
        // Get redirect path based on user role
        let redirectPath;
        
        // Directly handling role-based navigation to ensure admin goes to dashboard
        if (userRole.toLowerCase() === 'admin') {
          redirectPath = '/admin/admindashboard';
        } else {
          redirectPath = getRedirectPathByRole(userRole);
        }
        
        navigate(redirectPath);
      } else if (login.rejected.match(resultAction)) {
        // Login failed
        const errorMessage = resultAction.payload || "Invalid email or password. Please try again.";
        setLoginError(errorMessage);
        toast.error('Login failed: ' + errorMessage);
      }
    } catch (error) {
      console.error("Error in Login:", error);
      setLoginError("Network error. Please check your connection and try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="h-screen fixed inset-0 overflow-hidden font-poppins bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      <AuthNavbar />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/20"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow items-center justify-center pt-20 pb-8 overflow-auto px-4 sm:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700/50">
            <div className="p-5 sm:p-6">
              <div className="flex justify-center mb-5 sm:mb-6">
                <img src={CampanyLogo} alt="Logo" className="h-14 sm:h-16 w-auto" />
              </div>
              
              <motion.div variants={itemVariants} className="text-center mb-5 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">Welcome Back</h2>
                <p className="text-gray-300 text-sm">Please sign in to continue</p>
              </motion.div>

              {/* Login Error Message */}
              {loginError && (
                <motion.div 
                  className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-300 text-sm">{loginError}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="mb-4">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 sm:p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2.5 sm:p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      className="h-4 w-4 border-gray-600 rounded bg-gray-700 focus:ring-green-400"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="text-green-400 hover:text-green-300 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isUserLogin}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isUserLogin ? 1 : 1.03 }}
                    whileTap={{ scale: isUserLogin ? 1 : 0.98 }}
                  >
                    {isUserLogin ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </span>
                    ) : "Sign In"}
                  </motion.button>
                </motion.div>

                {/* Google Login Button */}
                <motion.div variants={itemVariants} className="mt-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center bg-gray-700/70 hover:bg-gray-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300"
                  >
                    <img src={Google} alt="Google" className="h-5 w-5 mr-2" />
                    Sign in with Google
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-400 hover:text-green-300 font-medium">
                      Sign up
                    </Link>
                  </p>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
