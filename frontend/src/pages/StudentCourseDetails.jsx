import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiUsers, FiClock, FiCalendar, FiFileText, FiDownload, FiUpload, FiCheckCircle } from 'react-icons/fi';
import TopNavbar from '../components/Topnavbar';

const mockCourses = [
  { id: '1', name: 'Mathematics 101', code: 'MATH101', teacher: 'Dr. Sarah Johnson', schedule: 'Mon, Wed 10:00 AM - 11:30 AM', description: 'Introduction to calculus, linear algebra, and statistics' },
  { id: '2', name: 'Introduction to Physics', code: 'PHYS201', teacher: 'Prof. Michael Chen', schedule: 'Tue, Thu 1:00 PM - 2:30 PM', description: 'Fundamental principles of mechanics, thermodynamics, and electromagnetism' },
  { id: '3', name: 'World History', code: 'HIST101', teacher: 'Dr. Emily Rodriguez', schedule: 'Wed, Fri 9:00 AM - 10:30 AM', description: 'A survey of world civilizations from ancient times to the present' },
];

function StudentCourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse({
        id: courseId,
        title: "Mathematics 101",
        instructor: "Dr. Sarah Johnson",
        description: "An introductory course covering fundamental mathematical concepts including algebra, calculus, and statistics.",
        schedule: {
          days: "Monday, Wednesday, Friday",
          time: "10:00 AM - 11:30 AM",
          room: "Room 101"
        },
        progress: 65,
        assignments: [
          {
            id: 1,
            title: "Algebra Basics Quiz",
            dueDate: "2024-03-20",
            status: "completed",
            grade: 95
          },
          {
            id: 2,
            title: "Calculus Project",
            dueDate: "2024-03-25",
            status: "pending",
            grade: null
          },
          {
            id: 3,
            title: "Statistics Assignment",
            dueDate: "2024-03-28",
            status: "upcoming",
            grade: null
          }
        ],
        materials: [
          {
            id: 1,
            title: "Course Syllabus",
            type: "pdf",
            size: "2.5 MB",
            uploadedAt: "2024-03-01"
          },
          {
            id: 2,
            title: "Week 1 Lecture Notes",
            type: "pdf",
            size: "1.8 MB",
            uploadedAt: "2024-03-05"
          },
          {
            id: 3,
            title: "Practice Problems Set 1",
            type: "pdf",
            size: "1.2 MB",
            uploadedAt: "2024-03-07"
          }
        ],
        announcements: [
          {
            id: 1,
            title: "Midterm Exam Schedule",
            content: "The midterm exam will be held on March 15th in Room 101.",
            date: "2024-03-10"
          },
          {
            id: 2,
            title: "Office Hours Update",
            content: "Office hours have been extended to include Friday afternoons.",
            date: "2024-03-08"
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="p-6 md:p-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
              <p className="text-gray-600">Instructor: {course.instructor}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">{course.progress}% Complete</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">{course.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiCalendar className="text-blue-600 mr-3" />
                  <span className="text-gray-700">{course.schedule.days}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="text-blue-600 mr-3" />
                  <span className="text-gray-700">{course.schedule.time}</span>
                </div>
                <div className="flex items-center">
                  <FiBook className="text-blue-600 mr-3" />
                  <span className="text-gray-700">{course.schedule.room}</span>
                </div>
              </div>
            </motion.div>

            {/* Assignments Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignments</h2>
              <div className="space-y-4">
                {course.assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="flex items-center">
                      {assignment.status === 'completed' ? (
                        <span className="flex items-center text-green-600">
                          <FiCheckCircle className="mr-1" />
                          {assignment.grade}%
                        </span>
                      ) : (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          {assignment.status === 'pending' ? 'Submit' : 'View'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Materials Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Materials</h2>
              <div className="space-y-3">
                {course.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{material.title}</h3>
                      <p className="text-sm text-gray-600">{material.size}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiDownload className="text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Announcements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Announcements</h2>
              <div className="space-y-4">
                {course.announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-800 mb-1">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                    <p className="text-xs text-gray-500">{announcement.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourseDetails; 