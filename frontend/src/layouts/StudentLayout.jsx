import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNavbar from '../components/Topnavbar';
import { FiHome, FiBook, FiClipboard, FiCalendar, FiUser, FiSettings, FiBell } from 'react-icons/fi';

function StudentLayout() {
  const navigate = useNavigate();
  const { Authuser } = useSelector((state) => state.auth);

  const navigation = [
    { name: 'Dashboard', icon: FiHome, path: '/student/dashboard' },
    { name: 'Courses', icon: FiBook, path: '/student/courses' },
    { name: 'Assignments', icon: FiClipboard, path: '/student/assignments' },
    { name: 'Timetable', icon: FiCalendar, path: '/student/timetable' },
    { name: 'Grades', icon: FiClipboard, path: '/student/grades' },
  ];

  const userNavigation = [
    { name: 'Account', icon: FiUser, path: '/student/account' },
    { name: 'Settings', icon: FiSettings, path: '/student/settings' },
    { name: 'Notifications', icon: FiBell, path: '/student/notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4">
                <h2 className="text-xl font-semibold text-gray-800">Student Portal</h2>
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full"
                      >
                        <Icon className="mr-3 h-6 w-6" />
                        {item.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src={Authuser?.ProfilePic || 'https://via.placeholder.com/40'}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{Authuser?.firstName} {Authuser?.lastName}</p>
                    <p className="text-xs font-medium text-gray-500">Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentLayout; 