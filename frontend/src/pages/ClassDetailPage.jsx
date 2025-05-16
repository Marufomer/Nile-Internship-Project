import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TopNavbar from '../components/Topnavbar';
import { FiClock, FiUsers, FiBook, FiTarget, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ClassDetailPage() {
  const { classId } = useParams();

  // This would typically come from an API or context
  const classDetails = {
    1: {
      title: "Math - Advanced Algebra",
      time: new Date(Date.now() + 3600000 * 2),
      room: "Room 101",
      students: 30,
      description: "Advanced algebraic concepts including quadratic equations and functions",
      topic: "Quadratic Functions",
      materials: ["Textbook Chapter 5", "Practice Problems Set 3"],
      objectives: ["Understand quadratic functions", "Solve complex equations", "Apply concepts to real-world problems"]
    },
    2: {
      title: "Science Lab - Chemical Reactions",
      time: new Date(Date.now() + 3600000 * 5),
      room: "Science Lab",
      students: 28,
      description: "Hands-on experiment demonstrating chemical reactions and their properties",
      topic: "Chemical Bonding",
      materials: ["Lab Manual", "Safety Equipment", "Chemical Reagents"],
      objectives: ["Understand chemical bonding", "Perform safe experiments", "Record observations"]
    },
    3: {
      title: "History - World War II",
      time: new Date(Date.now() + 3600000 * 24),
      room: "Room 203",
      students: 25,
      description: "In-depth study of World War II events and their global impact",
      topic: "Major Battles",
      materials: ["History Textbook", "Documentary Materials", "Primary Sources"],
      objectives: ["Analyze key battles", "Understand historical context", "Evaluate impact"]
    }
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const cls = classDetails[classId];

  if (!cls) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="container mx-auto px-4 py-8 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Class not found</h2>
            <Link to="/teacher/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="container mx-auto px-4 py-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <Link to="/teacher/dashboard" className="mr-4 text-gray-600 hover:text-gray-800">
                <FiArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">{cls.title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FiClock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-600">{formatDateTime(cls.time)}</span>
              </div>
              <div className="flex items-center">
                <FiUsers className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-600">{cls.students} Students</span>
              </div>
              <div className="flex items-center">
                <FiBook className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-600">{cls.room}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Class Description</h2>
            <p className="text-gray-600">{cls.description}</p>
          </div>

          {/* Topic and Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Today's Topic</h2>
              <p className="text-gray-600">{cls.topic}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Required Materials</h2>
              <ul className="list-disc list-inside text-gray-600">
                {cls.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
            <ul className="space-y-2">
              {cls.objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <FiTarget className="w-5 h-5 text-green-600 mr-2 mt-1" />
                  <span className="text-gray-600">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ClassDetailPage; 