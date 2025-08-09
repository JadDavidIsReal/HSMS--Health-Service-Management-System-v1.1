import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AppSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { title: 'Dashboard', url: '/dashboard', roles: ['nurse', 'doctor'] },
      { title: 'Appointments', url: '/appointments', roles: ['nurse', 'doctor'] },
      { title: 'Search', url: '/patients', roles: ['nurse'] },
      { title: 'Nurses by Campus', url: '/nurses-by-campus', roles: ['doctor'] },
      { title: 'Stocks', url: '/stocks', roles: ['nurse'] },
      { title: 'Clinic History', url: '/history', roles: ['nurse', 'doctor', 'patient'] },
      { title: 'Analytics', url: '/reports', roles: ['nurse'] },
      { title: 'Prescriptions', url: '/prescriptions', roles: ['nurse'] },
      { title: 'Chat', url: '/chat', roles: ['nurse', 'doctor'] },
      { title: 'Create Consultation', url: '/book-appointment', roles: ['patient'] },
      { title: 'About', url: '/about', roles: ['nurse', 'doctor', 'patient'] },
    ];

    return baseItems.filter(item => item.roles.includes(user?.role || ''));
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
        w-64 flex-shrink-0 flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="text-lg font-bold text-gray-800">HSMS</h1>
              <p className="text-xs text-gray-500">Health Services</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors
                ${isActive(item.url)
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }
              `}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
            >
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full justify-start text-gray-500 hover:text-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;