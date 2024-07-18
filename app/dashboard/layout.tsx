"use client";

import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../dashboard/components/DashboardNavbar';
import Sidebar from '../dashboard/components/Sidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        toggleSidebar={toggleSidebar}
        className={isMobile && !isSidebarExpanded ? 'hidden' : ''}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-hidden bg-gray-100">
          {children}
        </main>
      </div>
      {isMobile && isSidebarExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;