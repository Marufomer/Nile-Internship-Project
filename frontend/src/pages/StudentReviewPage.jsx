import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import TopNavbar from '../components/Topnavbar';
import { FiUser, FiCalendar, FiBook, FiBarChart2, FiCheckCircle, FiXCircle, FiClock, FiFileText } from 'react-icons/fi';
import { fetchAllStudents } from '../features/Student';

const StudentReviewPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { students } = useSelector(state => state.Student);
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    out: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    // Fetch students if not already loaded
    if (!students || students.length === 0) {
      dispatch(fetchAllStudents());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, students]);

  useEffect(() => {
    if (students && students.length > 0) {
      const foundStudent = students.find(s => s._id === studentId);
      setStudent(foundStudent);
      setIsLoading(false);
    }
  }, [studentId, students]);

  // Mock data - would be replaced with actual data from API
  const attendanceData = [
    { date: '2023-10-01', status: 'present', subject: 'Mathematics' },
    { date: '2023-10-02', status: 'present', subject: 'Science' },
    { date: '2023-10-03', status: 'absent', subject: 'History', note: 'Sick leave' },
    { date: '2023-10-04', status: 'present', subject: 'English' },
    { date: '2023-10-05', status: 'late', subject: 'Physical Education', note: 'Arrived 10 minutes late' },
    { date: '2023-10-08', status: 'present', subject: 'Mathematics' },
    { date: '2023-10-09', status: 'present', subject: 'Science' },
    { date: '2023-10-10', status: 'present', subject: 'History' },
  ];

  const gradesData = [
    { subject: 'Mathematics', grade: 'A', percentage: 92, term: 'First', year: '2023' },
    { subject: 'Science', grade: 'B+', percentage: 88, term: 'First', year: '2023' },
    { subject: 'History', grade: 'B', percentage: 83, term: 'First', year: '2023' },
    { subject: 'English', grade: 'A-', percentage: 90, term: 'First', year: '2023' },
    { subject: 'Physical Education', grade: 'A', percentage: 95, term: 'First', year: '2023' },
  ];

  const assignmentsData = [
    { id: 1, title: 'Algebra Homework', subject: 'Mathematics', dueDate: '2023-10-15', status: 'completed', grade: 'A', score: '18/20' },
    { id: 2, title: 'Solar System Model', subject: 'Science', dueDate: '2023-10-18', status: 'completed', grade: 'B+', score: '85/100' },
    { id: 3, title: 'Essay on American Revolution', subject: 'History', dueDate: '2023-10-20', status: 'pending', grade: null, score: null },
    { id: 4, title: 'Book Report', subject: 'English', dueDate: '2023-10-25', status: 'pending', grade: null, score: null },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssignmentStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceRate = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(record => record.status === 'present' || record.status === 'late').length;
    return Math.round((present / total) * 100);
  };

  const getGradeAverage = () => {
    if (gradesData.length === 0) return 0;
    const sum = gradesData.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / gradesData.length);
  };

  const getCompletionRate = () => {
    const total = assignmentsData.length;
    const completed = assignmentsData.filter(assignment => assignment.status === 'completed').length;
    return Math.round((completed / total) * 100);
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

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold text-red-500">Student not found</h1>
            <p className="mt-2 text-gray-600">The student you are looking for does not exist or you don't have permission to view their details.</p>
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
      
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {/* Header with back button */}
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
            <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <button 
              onClick={() => navigate('/admin/students')} 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-2"
            >
              Back to Students
            </button>
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Print Report
            </button>
          </div>
        </div>

        {/* Student info card */}
        <motion.div className="bg-white rounded-lg shadow-md overflow-hidden mb-6" variants={itemVariants}>
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                  {student.profileImage ? (
                    <img src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="text-gray-400 text-3xl" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{student.firstName} {student.lastName}</h2>
                  <p className="text-gray-600">{student.email}</p>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {student.status || 'Active'}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">ID: {student._id.substring(0, 8)}</span>
                  </div>
                </div>
              </div>

              <div className="ml-0 md:ml-auto grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Attendance</p>
                  <p className="text-xl font-bold text-blue-600">{getAttendanceRate()}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Grade Average</p>
                  <p className="text-xl font-bold text-green-600">{getGradeAverage()}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Assignments</p>
                  <p className="text-xl font-bold text-indigo-600">{getCompletionRate()}%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div className="bg-white rounded-lg shadow-md overflow-hidden mb-6" variants={itemVariants}>
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
                  activeTab === 'attendance' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('attendance')}
              >
                Attendance
              </button>
              <button
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === 'grades' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('grades')}
              >
                Grades
              </button>
              <button
                className={`py-4 px-6 font-medium focus:outline-none ${
                  activeTab === 'assignments' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('assignments')}
              >
                Assignments
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Attendance Overview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <FiCalendar className="text-blue-600 text-xl mr-2" />
                      <h3 className="font-medium text-gray-800">Attendance Overview</h3>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className="text-sm font-medium">{getAttendanceRate()}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${getAttendanceRate()}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-full bg-green-100">
                          <FiCheckCircle className="text-green-600" />
                        </div>
                        <p className="text-xs text-gray-500">Present</p>
                        <p className="font-medium">{attendanceData.filter(a => a.status === 'present').length}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-full bg-red-100">
                          <FiXCircle className="text-red-600" />
                        </div>
                        <p className="text-xs text-gray-500">Absent</p>
                        <p className="font-medium">{attendanceData.filter(a => a.status === 'absent').length}</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-full bg-yellow-100">
                          <FiClock className="text-yellow-600" />
                        </div>
                        <p className="text-xs text-gray-500">Late</p>
                        <p className="font-medium">{attendanceData.filter(a => a.status === 'late').length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Grade Overview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <FiBarChart2 className="text-green-600 text-xl mr-2" />
                      <h3 className="font-medium text-gray-800">Grade Overview</h3>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Average Grade</span>
                      <span className="text-sm font-medium">{getGradeAverage()}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-green-600 rounded-full" 
                        style={{ width: `${getGradeAverage()}%` }}
                      ></div>
                    </div>
                    <div className="space-y-2">
                      {gradesData.slice(0, 3).map((grade, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{grade.subject}</span>
                          <span className="font-medium">{grade.grade} ({grade.percentage}%)</span>
                        </div>
                      ))}
                      {gradesData.length > 3 && (
                        <button 
                          onClick={() => setActiveTab('grades')}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View all grades
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Assignment Overview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <FiFileText className="text-indigo-600 text-xl mr-2" />
                      <h3 className="font-medium text-gray-800">Assignment Overview</h3>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="text-sm font-medium">{getCompletionRate()}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${getCompletionRate()}%` }}
                      ></div>
                    </div>
                    <div className="space-y-2">
                      {assignmentsData.slice(0, 3).map((assignment, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 truncate">{assignment.title}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getAssignmentStatusColor(assignment.status)}`}>
                            {assignment.status}
                          </span>
                        </div>
                      ))}
                      {assignmentsData.length > 3 && (
                        <button 
                          onClick={() => setActiveTab('assignments')}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View all assignments
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{student.firstName} {student.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{student.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{student.Dateofbirth ? formatDate(student.Dateofbirth) : 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{student.gender || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{student.Address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Attendance Records</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Date</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Subject</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((record, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 border">{formatDate(record.date)}</td>
                          <td className="py-3 px-4 border">{record.subject}</td>
                          <td className="py-3 px-4 border">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 border">{record.note || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Academic Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Subject</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Grade</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Percentage</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Term</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Academic Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradesData.map((grade, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 border">{grade.subject}</td>
                          <td className="py-3 px-4 border font-medium">{grade.grade}</td>
                          <td className="py-3 px-4 border">{grade.percentage}%</td>
                          <td className="py-3 px-4 border">{grade.term} Term</td>
                          <td className="py-3 px-4 border">{grade.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Assignment Submissions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Assignment</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Subject</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Due Date</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="py-3 px-4 border text-left text-sm font-medium text-gray-600">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignmentsData.map((assignment, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 border">{assignment.title}</td>
                          <td className="py-3 px-4 border">{assignment.subject}</td>
                          <td className="py-3 px-4 border">{formatDate(assignment.dueDate)}</td>
                          <td className="py-3 px-4 border">
                            <span className={`px-2 py-1 rounded-full text-xs ${getAssignmentStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 border">
                            {assignment.grade ? (
                              <div>
                                <span className="font-medium">{assignment.grade}</span>
                                {assignment.score && <span className="text-gray-500 text-sm ml-2">({assignment.score})</span>}
                              </div>
                            ) : (
                              <span className="text-gray-500">Not graded</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentReviewPage; 