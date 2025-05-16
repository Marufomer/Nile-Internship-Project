import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/Topnavbar';
import { FiArrowLeft, FiTrendingUp, FiUsers, FiStar, FiMessageSquare, FiCalendar, FiAward, FiBarChart2, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';

function PerformanceReview() {
  const [performanceData] = useState({
    overallMetrics: {
      teachingEffectiveness: 92,
      studentEngagement: 88,
      assessmentQuality: 90,
      communication: 85
    },
    monthlyTrends: [
      { month: 'Jan', effectiveness: 85, engagement: 82, assessment: 88, communication: 80 },
      { month: 'Feb', effectiveness: 88, engagement: 85, assessment: 90, communication: 82 },
      { month: 'Mar', effectiveness: 90, engagement: 87, assessment: 92, communication: 85 },
      { month: 'Apr', effectiveness: 92, engagement: 88, assessment: 90, communication: 85 }
    ],
    strengths: [
      "Excellent classroom management",
      "Strong subject knowledge",
      "Effective communication with students",
      "Innovative teaching methods"
    ],
    areasForImprovement: [
      "Time management in class",
      "Use of technology in teaching",
      "Parent communication",
      "Assessment variety"
    ],
    recommendations: [
      "Implement more interactive teaching methods",
      "Increase use of educational technology",
      "Develop more comprehensive assessment strategies",
      "Enhance parent-teacher communication"
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
                <h1 className="text-2xl font-bold text-gray-800">Performance Review</h1>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Download Report
              </button>
            </div>
          </div>

          {/* Overall Metrics */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Overall Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(performanceData.overallMetrics).map(([metric, value]) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-gray-800 font-medium">{value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Monthly Performance Trends</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effectiveness</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Communication</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceData.monthlyTrends.map((trend) => (
                    <tr key={trend.month}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {trend.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${trend.effectiveness}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{trend.effectiveness}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${trend.engagement}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{trend.engagement}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${trend.assessment}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{trend.assessment}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-full bg-yellow-500 rounded-full"
                              style={{ width: `${trend.communication}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{trend.communication}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Key Strengths</h2>
              <ul className="space-y-3">
                {performanceData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-3 mt-1">
                      <FiAward className="text-green-600" />
                    </div>
                    <span className="text-gray-600">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Areas for Improvement</h2>
              <ul className="space-y-3">
                {performanceData.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <div className="p-1 bg-orange-100 rounded-full mr-3 mt-1">
                      <FiTrendingUp className="text-orange-600" />
                    </div>
                    <span className="text-gray-600">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Recommendations</h2>
            <div className="space-y-4">
              {performanceData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <FiBarChart2 className="text-blue-600" />
                  </div>
                  <span className="text-gray-600">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PerformanceReview; 