import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock notifications data for initial state
const mockNotifications = [
  {
    _id: '1',
    title: 'Welcome to Smart School System',
    message: 'Welcome to your new school management dashboard. Start exploring the features!',
    type: 'system',
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: 'unread'
  },
  {
    _id: '2',
    title: 'New Assignment Added',
    message: 'A new assignment has been added to Mathematics class. Due date is next Friday.',
    type: 'academic',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: 'unread'
  },
  {
    _id: '3',
    title: 'Payment Reminder',
    message: 'This is a reminder that the term fee payment is due next week.',
    type: 'payment',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    status: 'read'
  },
  {
    _id: '4',
    title: 'School Holiday Announced',
    message: 'The school will be closed on Monday for Republic Day. Classes will resume on Tuesday.',
    type: 'calendar',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    status: 'read'
  },
  {
    _id: '5',
    title: 'Teacher Meeting Scheduled',
    message: 'A teacher-parent meeting has been scheduled for next Thursday at 3pm.',
    type: 'message',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    status: 'read'
  }
];

// Async thunks for API calls
export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      // This will be replaced with real API call when backend is ready
      // const response = await axios.get('/api/notifications');
      // return response.data;
      return mockNotifications;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNotification = createAsyncThunk(
  'notification/createNotification',
  async (notificationData, { rejectWithValue }) => {
    try {
      // In a real app, this would send data to the backend
      // const response = await axios.post('/api/notifications', notificationData);
      // return response.data;
      return {
        ...notificationData,
        _id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'unread'
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNotificationStatus = createAsyncThunk(
  'notification/updateNotificationStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // In a real app, this would update the status on the backend
      // const response = await axios.patch(`/api/notifications/${id}`, { status });
      // return response.data;
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notification/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      // In a real app, this would delete the notification on the backend
      // await axios.delete(`/api/notifications/${id}`);
      // return id;
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  },
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n._id === action.payload);
      if (notification && notification.status === 'unread') {
        notification.status = 'read';
        state.unreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.status = 'read';
      });
      state.unreadCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => n.status === 'unread').length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch notifications';
      })
      
      // Create notification
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
        state.unreadCount += 1;
      })
      
      // Update notification status
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const notification = state.notifications.find(n => n._id === id);
        if (notification) {
          const previousStatus = notification.status;
          notification.status = status;
          
          if (previousStatus === 'unread' && status === 'read') {
            state.unreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0;
          } else if (previousStatus === 'read' && status === 'unread') {
            state.unreadCount += 1;
          }
        }
      })
      
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const deletedNotification = state.notifications.find(n => n._id === action.payload);
        state.notifications = state.notifications.filter(n => n._id !== action.payload);
        
        if (deletedNotification && deletedNotification.status === 'unread') {
          state.unreadCount = state.unreadCount > 0 ? state.unreadCount - 1 : 0;
        }
      });
  }
});

export const { markAsRead, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer; 