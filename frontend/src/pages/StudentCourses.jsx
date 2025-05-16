import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiCalendar, FiBarChart2, FiFileText } from 'react-icons/fi';

const mockCourses = [
  {
    id: '1',
    name: 'Mathematics 101',
    code: 'MATH101',
    teacher: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    description: 'Introduction to calculus, linear algebra, and statistics',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: '2',
    name: 'Introduction to Physics',
    code: 'PHYS201',
    teacher: 'Prof. Michael Chen',
    schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
    description: 'Fundamental principles of mechanics, thermodynamics, and electromagnetism',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    name: 'World History',
    code: 'HIST101',
    teacher: 'Dr. Emily Rodriguez',
    schedule: 'Wed, Fri 9:00 AM - 10:30 AM',
    description: 'A survey of world civilizations from ancient times to the present',
    color: 'from-amber-500 to-orange-500'
  }
];

const StudentCourses = () => {
  const [courses] = useState(mockCourses);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{course.code}</p>
                <div className="flex items-center text-gray-600 mb-1">
                  <FiUser className="mr-2 text-gray-400" />
                  <span className="text-sm">{course.teacher}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span className="text-sm">{course.schedule}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between pt-2 mt-4 border-t border-gray-100">
                  <Link to={`/student/course/${course.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    View Details <FiBarChart2 className="ml-1" />
                  </Link>
                  <Link to={`/student/course/${course.id}/assignments`} className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                    Assignments <FiFileText className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses; 