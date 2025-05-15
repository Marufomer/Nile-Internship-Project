import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import TopNavbar from '../components/Topnavbar';
import { FiUser, FiCalendar, FiBookOpen, FiUsers, FiBarChart2, FiClock, FiCheckCircle, FiMessageSquare, FiFileText } from 'react-icons/fi';

const TeacherReviewPage = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch teacher data
    setTimeout(() => {
      const mockTeacher = {
        _id: teacherId || '12345',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@school.edu',
        profileImage: null,
        phone: '555-123-4567',
        gender: 'Male',
        joined: '2021-08-15',
        status: 'active',
        qualification: 'Ph.D. in Computer Science',
        experience: '8 years',
        specialty: 'Advanced Mathematics, Programming',
        classes: [
          { id: 'c1', name: 'Class 10 - Mathematics', students: 28, schedule: 'MWF 9:00 AM' },
          { id: 'c2', name: 'Class 11 - Computer Science', students: 24, schedule: 'TTh 11:00 AM' },
          { id: 'c3', name: 'Class 12 - Advanced Programming', students: 18, schedule: 'MWF 2:00 PM' }
        ]
      };
      
      setTeacher(mockTeacher);
      setIsLoading(false);
    }, 800);
  }, [teacherId]);

  // Mock data that would be fetched from API
  const classPerformance = [
    { classId: 'c1', name: 'Class 10 - Mathematics', averageGrade: 85, attendanceRate: 92, assignmentCompletion: 88 },
    { classId: 'c2', name: 'Class 11 - Computer Science', averageGrade: 78, attendanceRate: 85, assignmentCompletion: 76 },
    { classId: 'c3', name: 'Class 12 - Advanced Programming', averageGrade: 91, attendanceRate: 94, assignmentCompletion: 95 }
  ];

  const recentActivity = [
    { id: 1, type: 'assignment', title: 'Posted Assignment: Linear Algebra Homework', class: 'Class 10 - Mathematics', date: '2023-11-10' },
    { id: 2, type: 'grade', title: 'Graded Quiz: Introduction to Python', class: 'Class 11 - Computer Science', date: '2023-11-08' },
    { id: 3, type: 'attendance', title: 'Marked Attendance for Advanced Programming', class: 'Class 12 - Advanced Programming', date: '2023-11-07' },
    { id: 4, type: 'feedback', title: 'Provided Feedback: Term Project Proposals', class: 'Class 12 - Advanced Programming', date: '2023-11-05' }
  ];
  
  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', class: 'Class 10', topic: 'Quadratic Equations', date: '2023-11-15', time: '9:00 AM' },
    { id: 2, subject: 'Computer Science', class: 'Class 11', topic: 'Data Structures', date: '2023-11-15', time: '11:00 AM' },
    { id: 3, subject: 'Programming', class: 'Class 12', topic: 'Object-Oriented Design', date: '2023-11-16', time: '2:00 PM' }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <FiFileText className="text-blue-500" />;
      case 'grade':
        return <FiCheckCircle className="text-green-500" />;
      case 'attendance':
        return <FiCalendar className="text-purple-500" />;
      case 'feedback':
        return <FiMessageSquare className="text-orange-500" />;
      default:
        return <FiBarChart2 className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold text-red-500">Teacher not found</h1>
            <p className="mt-2 text-gray-600">The teacher you are looking for does not exist or you don't have permission to view their details.</p>
            <button 
              onClick={() => navigate(-1)} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 p-2 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Teacher Review</h1>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => navigate('/admin/AdminTeacher')} 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-2"
            >
              Back to Teachers
            </button>
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Print Report
            </button>
          </div>
        </div>

        {/* Teacher info card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                  {teacher.profileImage ? (
                    <img src={teacher.profileImage} alt={`${teacher.firstName} ${teacher.lastName}`} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="text-gray-400 text-3xl" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{teacher.firstName} {teacher.lastName}</h2>
                  <p className="text-gray-600">{teacher.email}</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {teacher.status || 'Active'}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">Joined: {formatDate(teacher.joined)}</span>
                  </div>
                </div>
              </div>

              <div className="ml-0 md:ml-auto mt-4 md:mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Classes</p>
                    <p className="text-xl font-bold text-blue-600">{teacher.classes ? teacher.classes.length : 0}</p>
                  </div>
                  <div className="text-center bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Students</p>
                    <p className="text-xl font-bold text-green-600">
                      {teacher.classes ? teacher.classes.reduce((sum, cls) => sum + cls.students, 0) : 0}
                    </p>
                  </div>
                  <div className="text-center bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Experience</p>
                    <p className="text-xl font-bold text-indigo-600">{teacher.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b">
            <nav className="flex">
              <button
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === 'overview' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === 'classes' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('classes')}
              >
                Classes
              </button>
              <button
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === 'performance' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('performance')}
              >
                Performance
              </button>
              <button
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === 'schedule' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('schedule')}
              >
                Schedule
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{teacher.firstName} {teacher.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{teacher.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{teacher.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{teacher.gender || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Qualification</p>
                        <p className="font-medium">{teacher.qualification || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Professional Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium">{teacher.experience || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Specialty</p>
                        <p className="font-medium">{teacher.specialty || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium capitalize">{teacher.status || 'Active'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Join Date</p>
                        <p className="font-medium">{formatDate(teacher.joined) || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Classes</p>
                        <p className="font-medium">{teacher.classes ? teacher.classes.length : 0} active classes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{activity.title}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{activity.class}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(activity.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Classes Tab */}
            {activeTab === 'classes' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Assigned Classes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teacher.classes && teacher.classes.map(cls => (
                    <div key={cls.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{cls.name}</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FiUsers className="mr-2" />
                            <span>{cls.students} Students</span>
                          </div>
                          <div className="flex items-center">
                            <FiClock className="mr-2" />
                            <span>{cls.schedule}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                          <button 
                            onClick={() => navigate(`/teacher/class/${cls.id}`)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Details
                          </button>
                          <button 
                            onClick={() => navigate(`/teacher/attendance?class=${cls.id}`)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Take Attendance
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Class Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Class Name</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Average Grade</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Attendance Rate</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Assignment Completion</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classPerformance.map((cls, index) => (
                        <tr key={cls.classId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 border font-medium">{cls.name}</td>
                          <td className="py-3 px-4 border">
                            <div className="flex items-center">
                              <div className="w-full max-w-xs mr-2">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${cls.averageGrade >= 90 ? 'bg-green-500' : cls.averageGrade >= 80 ? 'bg-blue-500' : cls.averageGrade >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${cls.averageGrade}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span>{cls.averageGrade}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border">
                            <div className="flex items-center">
                              <div className="w-full max-w-xs mr-2">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500 rounded-full" 
                                    style={{ width: `${cls.attendanceRate}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span>{cls.attendanceRate}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border">
                            <div className="flex items-center">
                              <div className="w-full max-w-xs mr-2">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${cls.assignmentCompletion}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span>{cls.assignmentCompletion}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border">
                            <button
                              onClick={() => navigate(`/teacher/class/${cls.classId}`)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Upcoming Classes</h3>
                <div className="space-y-4">
                  {upcomingClasses.map(cls => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                          <FiBookOpen className="text-xl" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-lg font-semibold text-gray-800">{cls.subject}</h4>
                            <div className="text-sm text-gray-500">
                              {cls.date} at {cls.time}
                            </div>
                          </div>
                          <p className="text-gray-600 mt-1">{cls.class} - {cls.topic}</p>
                          <div className="mt-3 flex space-x-3">
                            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                              <FiUsers className="mr-1" /> View Students
                            </button>
                            <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                              <FiCalendar className="mr-1" /> Take Attendance
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherReviewPage; 