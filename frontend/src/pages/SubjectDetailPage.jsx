import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TopNavbar from '../components/Topnavbar';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiBookOpen, FiUsers, FiMapPin, FiFileText, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

function SubjectDetailPage() {
  const { subjectId } = useParams();
  
  const [subjectData] = useState({
    subjectName: "Mathematics 101",
    subjectCode: "MATH101",
    description: "Introduction to advanced mathematics covering calculus, linear algebra, and statistics.",
    assignedBy: {
      name: "Dr. Sarah Johnson",
      role: "Department Head",
      department: "Mathematics",
      assignedDate: "2024-01-01"
    },
    schedule: [
      {
        day: "Monday",
        time: "09:00 AM - 10:30 AM",
        room: "Room 301",
        type: "Lecture"
      },
      {
        day: "Wednesday",
        time: "09:00 AM - 10:30 AM",
        room: "Room 301",
        type: "Lecture"
      },
      {
        day: "Friday",
        time: "02:00 PM - 03:30 PM",
        room: "Lab 205",
        type: "Practical"
      }
    ],
    classDetails: {
      totalStudents: 45,
      sections: ["A", "B"],
      level: "Undergraduate",
      semester: "Spring 2024"
    },
    courseObjectives: [
      "Understand fundamental mathematical concepts",
      "Develop problem-solving skills",
      "Apply mathematical principles to real-world scenarios",
      "Master calculus and linear algebra basics"
    ],
    prerequisites: [
      "Basic Algebra",
      "Pre-Calculus",
      "Statistics 101"
    ],
    resources: [
      {
        type: "Textbook",
        title: "Advanced Mathematics",
        author: "John Smith",
        edition: "3rd Edition"
      },
      {
        type: "Online Platform",
        title: "Math Learning Portal",
        url: "https://mathportal.example.com"
      },
      {
        type: "Software",
        title: "Mathematical Analysis Tool",
        version: "2.0"
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
                <Link to="/teacher/TeacherSubject" className="mr-4 text-gray-600 hover:text-gray-800">
                  <FiArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{subjectData.subjectName}</h1>
                  <p className="text-gray-600">Code: {subjectData.subjectCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FiUsers className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-xl font-bold">{subjectData.classDetails.totalStudents}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <FiBookOpen className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sections</p>
                  <p className="text-xl font-bold">{subjectData.classDetails.sections.join(", ")}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full mr-4">
                  <FiAward className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="text-xl font-bold">{subjectData.classDetails.level}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Assignment */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Course Assignment</h2>
            <div className="flex items-start">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <FiUser className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Assigned By</h3>
                <p className="text-gray-600">{subjectData.assignedBy.name}</p>
                <p className="text-sm text-gray-500">{subjectData.assignedBy.role} - {subjectData.assignedBy.department}</p>
                <p className="text-sm text-gray-500 mt-1">Assigned on: {subjectData.assignedBy.assignedDate}</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Schedule</h2>
            <div className="space-y-4">
              {subjectData.schedule.map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <FiCalendar className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.day}</h3>
                        <p className="text-sm text-gray-500">{item.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{item.time}</p>
                        <p className="text-sm text-gray-500">{item.room}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Course Objectives</h2>
              <ul className="space-y-3">
                {subjectData.courseObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="p-1 bg-green-100 rounded-full mr-3 mt-1">
                      <FiFileText className="text-green-600" />
                    </div>
                    <span className="text-gray-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Prerequisites</h2>
              <ul className="space-y-3">
                {subjectData.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <div className="p-1 bg-orange-100 rounded-full mr-3 mt-1">
                      <FiBookOpen className="text-orange-600" />
                    </div>
                    <span className="text-gray-600">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Course Resources</h2>
            <div className="space-y-4">
              {subjectData.resources.map((resource, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <FiFileText className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{resource.type}</h3>
                    <p className="text-gray-600">{resource.title}</p>
                    {resource.author && <p className="text-sm text-gray-500">By {resource.author}</p>}
                    {resource.edition && <p className="text-sm text-gray-500">{resource.edition}</p>}
                    {resource.version && <p className="text-sm text-gray-500">Version {resource.version}</p>}
                    {resource.url && (
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Access Resource
                      </a>
                    )}
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

export default SubjectDetailPage; 