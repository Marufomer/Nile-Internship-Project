import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/Topnavbar';
import { FiArrowLeft, FiStar, FiMessageSquare, FiFilter, FiSearch, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

function StudentFeedback() {
  const [feedbackData] = useState({
    overallRating: 4.5,
    totalFeedback: 156,
    sentimentAnalysis: {
      positive: 75,
      neutral: 20,
      negative: 5
    },
    feedback: [
      {
        id: 1,
        student: "John Doe",
        class: "Mathematics 101",
        rating: 5,
        comment: "Excellent teaching methods and very engaging classes. The teacher explains complex concepts in a way that's easy to understand.",
        date: "2024-01-15",
        sentiment: "positive",
        helpful: 12
      },
      {
        id: 2,
        student: "Jane Smith",
        class: "Physics 201",
        rating: 4,
        comment: "Great explanations and helpful feedback on assignments. Could use more interactive examples.",
        date: "2024-01-14",
        sentiment: "positive",
        helpful: 8
      },
      {
        id: 3,
        student: "Mike Johnson",
        class: "Chemistry 101",
        rating: 3,
        comment: "The course content is good, but sometimes the pace is too fast. More practice problems would be helpful.",
        date: "2024-01-13",
        sentiment: "neutral",
        helpful: 5
      },
      {
        id: 4,
        student: "Sarah Wilson",
        class: "Biology 101",
        rating: 2,
        comment: "The lectures are not well organized and it's difficult to follow the material. Need more structure.",
        date: "2024-01-12",
        sentiment: "negative",
        helpful: 3
      }
    ],
    commonThemes: [
      "Clear explanations",
      "Engaging teaching style",
      "Helpful feedback",
      "Good course organization",
      "Accessible outside class"
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
                <Link to="/teacher/review" className="mr-4 text-gray-600 hover:text-gray-800">
                  <FiArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Student Feedback</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FiFilter className="mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overall Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">{feedbackData.overallRating}/5</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FiStar className="text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Feedback</p>
                  <p className="text-2xl font-bold text-blue-500">{feedbackData.totalFeedback}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiMessageSquare className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Positive Feedback</p>
                  <p className="text-2xl font-bold text-green-500">{feedbackData.sentimentAnalysis.positive}%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FiThumbsUp className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Negative Feedback</p>
                  <p className="text-2xl font-bold text-red-500">{feedbackData.sentimentAnalysis.negative}%</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <FiThumbsDown className="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Common Themes */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Common Themes</h2>
            <div className="flex flex-wrap gap-3">
              {feedbackData.commonThemes.map((theme, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Feedback</h2>
            <div className="space-y-6">
              {feedbackData.feedback.map((item) => (
                <div key={item.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.student}</h3>
                      <p className="text-sm text-gray-500">{item.class}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                        item.sentiment === 'neutral' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{item.comment}</p>
                  <div className="flex items-center mt-3">
                    <button className="flex items-center text-gray-500 hover:text-blue-600">
                      <FiThumbsUp className="mr-1" />
                      <span className="text-sm">{item.helpful}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentFeedback; 