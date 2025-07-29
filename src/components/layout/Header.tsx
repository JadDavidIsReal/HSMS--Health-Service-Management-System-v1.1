import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RealTimeClock from './RealTimeClock';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            UIC - School Clinic
          </h2>
          <p className="text-sm text-gray-500">
            Welcome back, {user?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <RealTimeClock />
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
              <div className="py-2">
                <div className="flex items-center px-4 py-2 border-b">
                  <p className="text-sm">You have a new message from Dr. Foster.</p>
                </div>
                <div className="flex items-center px-4 py-2 border-b">
                  <p className="text-sm">Your appointment with John Doe has been confirmed.</p>
                </div>
                <div className="flex items-center px-4 py-2">
                  <p className="text-sm">A new patient has been registered.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;