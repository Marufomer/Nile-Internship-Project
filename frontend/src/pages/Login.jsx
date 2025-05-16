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
import { useDarkMode } from "../context/DarkModeContext";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMeState] = useState(getRememberMePreference() || false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

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
        // toast.success('Login successful!');
        
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

  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;

    console.log(credential)
    // try {
    //   const res = await axios.post("http://localhost:5000/api/auth/google", {
    //     idToken: credential
    //   });

    //   console.log("Logged in:", res.data);
    //   // Save res.data.token to localStorage or cookie
    // } catch (err) {
    //   console.error("Login failed:", err);
    // }
  };

  return (
    <div
      className={`h-screen fixed inset-0 overflow-hidden font-poppins ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gray-200 text-gray-800"
      } flex flex-col transition-colors duration-300`}
    >
      <AuthNavbar />

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Simple gradient background */}
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-br from-blue-900/30 to-purple-900/20"
              : "bg-gradient-to-br from-gray-300/30 to-gray-400/20"
          }`}
        ></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="smallGrid"
                width="15"
                height="15"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 15 0 L 0 0 0 15"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="0.5"
                />
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
          <div
            className={`${
              darkMode
                ? "bg-gray-800/50 border-gray-700/50"
                : "bg-gray-100/90 border-gray-300/50"
            } backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border transition-colors duration-300`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex justify-center mb-5 sm:mb-6">
                <img
                  src={CampanyLogo}
                  alt="Logo"
                  className="h-14 sm:h-16 w-auto"
                />
              </div>

              <motion.div
                variants={itemVariants}
                className="text-center mb-5 sm:mb-6"
              >
                <h2
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Welcome Back
                </h2>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } text-sm`}
                >
                  Please sign in to continue
                </p>
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
                  <label
                    className={`block ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm mb-1 font-medium`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2.5 sm:p-3 ${
                      darkMode
                        ? "bg-gray-700/50 border-gray-600 text-white"
                        : "bg-gray-200/70 border-gray-300 text-gray-800"
                    } border rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="mb-5">
                  <label
                    className={`block ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm mb-1 font-medium`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full p-2.5 sm:p-3 ${
                        darkMode
                          ? "bg-gray-700/50 border-gray-600 text-white"
                          : "bg-gray-200/70 border-gray-300 text-gray-800"
                      } border rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between mb-5"
                >
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        className="w-4 h-4 border border-gray-500 rounded bg-gray-700 focus:ring-3 focus:ring-green-400"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } font-medium cursor-pointer`}
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="text-sm font-medium text-green-400 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center my-4"
                >
                  <hr
                    className={`flex-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  />
                  <span
                    className={`mx-4 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    or
                  </span>
                  <hr
                    className={`flex-1 ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className={`w-full py-2.5 px-4 border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700/30 text-white hover:bg-gray-700/50"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    } rounded-lg font-medium flex items-center justify-center transition-colors duration-300`}
                  >
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => console.log("Login Failed")}
                    />
                  </button>
                </motion.div>
              </form>

              <motion.p
                variants={itemVariants}
                className={`mt-5 text-center text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-green-400 hover:underline"
                >
                  Register
                </Link>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
