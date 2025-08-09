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
    <div className="min-h-screen bg-background flex">
      <div className="print:hidden">
        <AppSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="print:hidden">
          <Header toggleSidebar={toggleSidebar} />
        </div>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;