import React, { useState, useEffect } from 'react';
import TopNavbar from '../components/Topnavbar';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiClock, FiUser, FiBarChart2, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const StudentCourses = () => {
  // Simulated courses data - would come from API in real implementation
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Mathematics 101',
      code: 'MATH101',
      teacher: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
      progress: 78,
      grade: 'B+',
      description: 'Introduction to calculus, linear algebra, and statistics',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'Introduction to Physics',
      code: 'PHYS201',
      teacher: 'Prof. Michael Chen',
      schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
      progress: 92,
      grade: 'A',
      description: 'Fundamental principles of mechanics, thermodynamics, and electromagnetism',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'World History',
      code: 'HIST101',
      teacher: 'Dr. Emily Rodriguez',
      schedule: 'Wed, Fri 9:00 AM - 10:30 AM',
      progress: 65,
      grade: 'B',
      description: 'A survey of world civilizations from ancient times to the present',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 4,
      name: 'English Literature',
      code: 'ENGL202',
      teacher: 'Prof. David Wilson',
      schedule: 'Mon, Fri 2:00 PM - 3:30 PM',
      progress: 88,
      grade: 'A-',
      description: 'Analysis of classic and contemporary works of literature',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 5,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      teacher: 'Dr. James Lee',
      schedule: 'Tue, Thu 10:30 AM - 12:00 PM',
      progress: 73,
      grade: 'B',
      description: 'Fundamentals of programming, algorithms, and data structures',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 6,
      name: 'Chemistry Fundamentals',
      code: 'CHEM101',
      teacher: 'Prof. Lisa Morgan',
      schedule: 'Mon, Wed 3:00 PM - 4:30 PM',
      progress: 81,
      grade: 'B+',
      description: 'Basic principles of atomic structure, chemical bonding, and reactions',
      color: 'from-rose-500 to-red-600'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Filter courses based on search term and filter option
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOption === 'all') return matchesSearch;
    if (filterOption === 'inProgress') return matchesSearch && course.progress < 100;
    if (filterOption === 'completed') return matchesSearch && course.progress === 100;
    if (filterOption === 'highGrade') return matchesSearch && (course.grade === 'A' || course.grade === 'A-' || course.grade === 'A+');
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Courses</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
              <FiBookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Filter Dropdown */}
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Courses</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="highGrade">High Grades (A)</option>
            </select>
          </div>
        </motion.div>
        
        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Course Header with Gradient */}
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                
                <div className="p-6">
                  {/* Course Title & Code */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.code}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                        course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.grade}
                      </span>
                    </div>
                  </div>
                  
                  {/* Course Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Course Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2 text-gray-400" />
                      <span className="text-sm">{course.teacher}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span className="text-sm">{course.schedule}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  {/* Course Actions */}
                  <div className="pt-2 mt-4 border-t border-gray-100 flex justify-between">
                    <Link to={`/student/course/${course.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      View Details <FiBarChart2 className="ml-1" />
                    </Link>
                    <Link to={`/student/course/${course.id}/assignments`} className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                      Assignments <FiFileText className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <FiBookOpen className="mx-auto text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentCourses; 