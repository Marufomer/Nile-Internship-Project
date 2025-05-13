import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBell, FiCheck, FiTrash2, FiX, FiInfo, FiCalendar, FiMail, FiDollarSign } from 'react-icons/fi';
import { MdAssignment } from 'react-icons/md';
import { markAsRead, markAllAsRead, deleteNotification } from '../features/Notification';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notification);
  const [displayCount, setDisplayCount] = useState(5);

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'system':
        return <FiInfo className="text-blue-500" />;
      case 'academic':
        return <MdAssignment className="text-green-500" />;
      case 'payment':
        return <FiDollarSign className="text-purple-500" />;
      case 'message':
        return <FiMail className="text-yellow-500" />;
      case 'calendar':
        return <FiCalendar className="text-red-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} min ago`;
      }
      return `${diffHours} hr ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Mark a notification as read
  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  // Delete a notification
  const handleDeleteNotification = (id) => {
    dispatch(deleteNotification(id));
  };

  // Load more notifications
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 5);
  };

  // Get visible notifications
  const visibleNotifications = notifications.slice(0, displayCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-3 px-4 text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <FiBell /> 
                Notifications 
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 ml-1">
                    {unreadCount}
                  </span>
                )}
              </h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-2 py-1 flex items-center gap-1 transition-colors"
                  >
                    <FiCheck className="text-xs" /> Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FiX />
                </button>
              </div>
            </div>
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {visibleNotifications.length > 0 ? (
              visibleNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    notification.status === 'unread' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex p-3">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type || 'system')}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className={`text-sm font-medium ${
                          notification.status === 'unread' ? 'text-blue-900' : 'text-gray-800'
                        }`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex gap-2 mt-1.5">
                        {notification.status === 'unread' && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification._id)}
                          className="text-xs text-red-600 hover:text-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <FiBell className="mx-auto text-gray-300 text-3xl mb-2" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
            
            {notifications.length > displayCount && (
              <div className="p-2 text-center">
                <button
                  onClick={handleLoadMore}
                  className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Load more
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 py-2 px-4 border-t border-gray-100">
            <Link
              to={`/admin/notifications`}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors block text-center"
              onClick={onClose}
            >
              View all notifications
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown; 