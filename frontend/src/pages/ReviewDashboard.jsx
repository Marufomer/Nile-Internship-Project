import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/Topnavbar';
import { FiArrowLeft, FiTrendingUp, FiUsers, FiStar, FiMessageSquare, FiCalendar, FiAward, FiBarChart2, FiBookOpen, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ReviewDashboard() {
  const [reviewData] = useState({
    overallRating: 4.5,
    totalClasses: 156,
    totalStudents: 120,
    attendanceRate: 92,
    pendingReviews: 5,
    completedReviews: 28,
    upcomingReviews: 3,
    recentActivity: [
      {
        id: 1,
        type: 'review',
        title: 'Class 10 Mathematics Review',
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'feedback',
        title: 'Student Feedback Analysis',
        date: '2024-01-14',
        status: 'pending'
      },
      {
        id: 3,
        type: 'assessment',
        title: 'Performance Assessment',
        date: '2024-01-13',
        status: 'upcoming'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto px-4 py-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link to="/teacher/dashboard" className="mr-4 text-gray-600 hover:text-gray-800">
                  <FiArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Review Dashboard</h1>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Reviews</p>
                  <p className="text-2xl font-bold text-orange-500">{reviewData.pendingReviews}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <FiFileText className="text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed Reviews</p>
                  <p className="text-2xl font-bold text-green-500">{reviewData.completedReviews}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FiCheckCircle className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Upcoming Reviews</p>
                  <p className="text-2xl font-bold text-blue-500">{reviewData.upcomingReviews}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiCalendar className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overall Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">{reviewData.overallRating}/5</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FiStar className="text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Review Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Link to="/teacher/review/performance" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FiBarChart2 className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Performance Review</h2>
              </div>
              <p className="text-gray-600">Analyze teaching performance metrics and class statistics</p>
            </Link>
            <Link to="/teacher/review/feedback" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <FiMessageSquare className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Student Feedback</h2>
              </div>
              <p className="text-gray-600">View and analyze student feedback and comments</p>
            </Link>
            <Link to="/teacher/review/classes" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full mr-4">
                  <FiBookOpen className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold">Class Reviews</h2>
              </div>
              <p className="text-gray-600">Review individual class performance and metrics</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {reviewData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 ${
                      activity.type === 'review' ? 'bg-blue-100' :
                      activity.type === 'feedback' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {activity.type === 'review' ? <FiFileText className="text-blue-600" /> :
                       activity.type === 'feedback' ? <FiMessageSquare className="text-green-600" /> :
                       <FiBarChart2 className="text-purple-600" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ReviewDashboard; 