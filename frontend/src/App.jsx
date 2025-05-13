import './index.css'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Landingpage from './pages/Landingpage';
import Teacherpage from './pages/Teacherpage';
import TeacherDashboardpage from './pages/TeacherDashboardpage'; 
import TeacherAccountdetail from './pages/TeacherAccountdetail';
import Notificationpage from './pages/Notificationpage';
import TeacherSubject from './pages/TeacherSubject'
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'
import Attendancepage from './pages/Attendancepage'
import Timetable from './pages/Timetable';
import toast, { Toaster } from 'react-hot-toast';
import AdminTeacher from './pages/AdminTeacher';
import Adminpage from './pages/Adminpage'
import TimeTable from './features/TimeTable';
import TeachersAssignmentpage from "./pages/TeachersAssignmentpage"
import FeePage from './pages/FeePage';
import StudentManagement from './pages/StudentManagement';
import AccountSettings from './pages/AccountSettings';
import StudentDashboard from './pages/StudentDashboard';
import StudentCourses from './pages/StudentCourses';
import StudentGradeReport from './pages/StudentGradeReport';
import { initializeProfileImage } from './lib/profileImageUtils';
import { updateUserInfo } from './features/Authentication';

function App() {
  const dispatch = useDispatch();
  const { Authuser } = useSelector((state) => state.auth);

  // Initialize profile image on app load
  useEffect(() => {
    if (Authuser) {
      console.log('App mounted with authenticated user, initializing profile image');
      initializeProfileImage(dispatch, updateUserInfo);
    }
  }, []);

  // Ensure profile image persistence when user or profile changes
  useEffect(() => {
    if (Authuser?.ProfilePic) {
      console.log('User profile updated, ensuring image persistence');
      
      // Store image in localStorage to ensure it persists
      localStorage.setItem('profileImage', Authuser.ProfilePic);
      
      // Update timestamp to help with cache busting
      localStorage.setItem('profileImageTimestamp', Date.now().toString());
    }
  }, [Authuser?.ProfilePic]);

  // Ensure the user object always has the latest ProfilePic
  useEffect(() => {
    if (Authuser) {
      const savedImage = localStorage.getItem('profileImage');
      const currentUserStr = localStorage.getItem('user');
      
      if (savedImage && currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr);
          
          // Check if localStorage user's profile pic doesn't match the saved image
          if (currentUser.ProfilePic !== savedImage) {
            console.log('Synchronizing profile image with user data');
            const updatedUser = { ...currentUser, ProfilePic: savedImage };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error('Error synchronizing profile image:', error);
        }
      }
    }
  }, [Authuser]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Navigate to="/login" replace />} />
        
        <Route path='/teacher' element={<Teacherpage />}>
          <Route path='dashboard' element={<TeacherDashboardpage />} />
          <Route path='account' element={<AccountSettings />} />
          <Route path='settings' element={<AccountSettings />} />
          <Route path='timetable' element={<Timetable />} />
          <Route path='TeachersAssignmentpage' element={<TeachersAssignmentpage />} />
          <Route path='notifications' element={<Notificationpage />} />
          <Route path='Attendancepage' element={<Attendancepage/>}/>
          <Route path='TeacherSubject' element={<TeacherSubject/>}/>
        </Route>

        <Route path='/Admin' element={<Adminpage/>}>
          <Route index element={<AdminDashboard />} />
          <Route path='admindashboard' element={<AdminDashboard />} />
          <Route path='AdminTeacher' element={<AdminTeacher/>} />
          <Route path='Timetable' element={<Timetable/>} />
          <Route path='fee' element={<FeePage/>} />
          <Route path='students' element={<StudentManagement/>} />
          <Route path='account' element={<AccountSettings />} />
          <Route path='settings' element={<AccountSettings />} />
          <Route path='notifications' element={<Notificationpage />} />
        </Route>

        {/* Student routes */}
        <Route path='/student' element={<Adminpage/>}>
          <Route index element={<StudentDashboard />} />
          <Route path='home' element={<StudentDashboard />} />
          <Route path='courses' element={<StudentCourses />} />
          <Route path='assignments' element={<TeachersAssignmentpage />} />
          <Route path='grades' element={<StudentGradeReport />} />
          <Route path='timetable' element={<Timetable />} />
          <Route path='account' element={<AccountSettings />} />
          <Route path='settings' element={<AccountSettings />} />
          <Route path='notifications' element={<Notificationpage />} />
        </Route>
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
