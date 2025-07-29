import React, { useState } from 'react';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;