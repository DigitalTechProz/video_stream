"use client";

import React from 'react';
import { Home, BookOpen, Tv, Film, Search, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  className?: string;
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isExpanded,
  toggleSidebar
}) => {
  const sidebarItems = [
    { icon: Home, label: 'Home' },
    { icon: BookOpen, label: 'Watchlist' },
    { icon: Tv, label: 'Series' },
    { icon: Film, label: 'Movies' },
    { icon: Search, label: 'Discover' },
    { icon: PlusCircle, label: 'Your Library' },
  ];

  return (
    <div 
      className={`bg-gray-900 text-white h-screen transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } ${className} fixed left-0 top-0 z-40 lg:relative`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {isExpanded && <span className="text-2xl font-bold">BuzzSA</span>}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
        <ul className="space-y-2 flex-grow">
          {sidebarItems.map((item, index) => (
            <li key={index} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-800 transition-colors duration-200">
              <item.icon size={24} />
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;