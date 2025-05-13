import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';
import { getSafeUserData, storeUserData, clearAuthData } from "../lib/utils";

const initialState = {
  Authuser: getSafeUserData() || null, 
  isUserSignup: false,
  staffuser: null,
  manageruser: null,
  adminuser: null,
  isUserLogin: false,
  token: localStorage.getItem("token") || null,
  isUpdatingUserInfo: false,
};


export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Signup request payload:', credentials);
      const response = await axiosInstance.post("auth/signup", credentials, { withCredentials: true });
      console.log('Signup API response:', response.data);
      
      if (response.data && response.data.savedUser) {
        storeUserData(response.data.savedUser);
      }
      
      return response.data;
    } catch (error) {
      console.error('Signup API error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        "Signup failed. Please check your information and try again."
      );
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Login request payload:', credentials);
      const response = await axiosInstance.post("auth/login", credentials, { withCredentials: true });
      console.log('Login API response:', response.data);
      
      if (response.data && response.data.user) {
        const user = response.data.user;
        console.log('User role from API:', user.role, 'User ID:', user.id);
        
        storeUserData(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login API error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        "Login failed. Please check your credentials and try again."
      );
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      clearAuthData();
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        return rejectWithValue('User not authenticated. Please log in again.');
      }

      // If this update includes a profile picture, save it to localStorage as well
      if (userData.ProfilePic && userData.ProfilePic.startsWith('data:image')) {
        // Store profile image in localStorage to ensure persistence
        localStorage.setItem('profileImage', userData.ProfilePic);
        console.log('Saved profile image to localStorage');
      }

      const response = await axiosInstance.put(
        'auth/updateUserInfo',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = response.data;

      if (updatedData && updatedData.updatedUser) {
        // If this update was for a profile image, ensure it's saved with the user data
        if (userData.ProfilePic) {
          updatedData.updatedUser.ProfilePic = userData.ProfilePic;
        }
        
        // Update localStorage with the complete user data
        localStorage.setItem('user', JSON.stringify(updatedData.updatedUser));
        
        return updatedData.updatedUser;
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Update user info error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile information'
      );
    }
  }
);

export const removeusers=createAsyncThunk("auth/removeuser",async(UserId,{rejectWithValue})=>{
  try {

    const response=await axiosInstance.delete(`auth/removeuser/${UserId}`,UserId,{ withCredentials: true });

    return response.data

  } catch (error) {
     return rejectWithValue(error.response?.data?.message || 'Failed to delete  user');
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(signup.pending, (state) => {
        state.isUserSignup = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isUserSignup = false;
        state.Authuser = action.payload.savedUser; 
        state.token = action.payload.token; 
        toast.success("Signup successful!")
      })
      .addCase(signup.rejected, (state, action) => {
        state.isUserSignup = false;
        toast.error(action.payload || "Error in signup")
      })

      
      .addCase(login.pending, (state) => {
        state.isUserLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUserLogin = false;
        state.Authuser = action.payload.user; 
        state.token = action.payload.token; 
        toast.success("Login successfully")
 
      })
      .addCase(login.rejected, (state, action) => {
        state.isUserLogin = false;
        toast.error(action.payload || "Error in login")
      })

    
      .addCase(logout.fulfilled, (state) => {
        state.Authuser = null;
        state.token = null;
        toast.success("Successfully logged out!");
      })
      .addCase(logout.rejected, (state, action) => {
     
      })

      .addCase(updateUserInfo.pending, (state) => {
        state.isUpdatingUserInfo = true;
      })
      
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isUpdatingUserInfo = false;
        state.Authuser = {
          ...state.Authuser,
          ...action.payload
        };
        toast.success("Profile information updated successfully");
      })
      
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isUpdatingUserInfo = false;
        toast.error(action.payload || "Failed to update profile information");
      })

      

      


      
     
    
      
    



  
  },
});

export default authSlice.reducer;