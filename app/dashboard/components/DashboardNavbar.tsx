import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, PenTool, Cast, Menu, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';

interface DashboardNavbarProps {
  toggleSidebar: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();


  useEffect(() => {
  

    if (!user) {
      router.push('/'); // Redirect to home page if not logged in
      
      toast.error('You must be logged in to access this page.')
    }
  }, [router, toast]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
    }
    if (user) {
      router.push('/');
    }
  };

  return (
    <div className="sticky top-0 z-50 px-4 py-2">
      <nav className="bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-lg text-white rounded-md shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              className="text-white lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            
            <Link href="/" className="text-2xl font-bold">
              BuzzSA Stream
            </Link>
            
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 bg-opacity-50 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hidden sm:block hover:bg-yellow-400 transition-colors duration-200">
              Go Premium
            </button>
            
            <PenTool className="text-gray-400 hover:text-white cursor-pointer hidden sm:block transition-colors duration-200" size={20} />
            <Cast className="text-gray-400 hover:text-white cursor-pointer hidden sm:block transition-colors duration-200" size={20} />
            
            {user ? (
              <div className="relative">
                <div 
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-400 transition-colors duration-200">
                    <User className="text-white" size={20} />
                  </div>
                  <svg className="w-4 h-4 text-gray-400 hidden sm:block group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="mr-2" size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
                  ) : (
                <button className="bg-gray-500 text-white px-4 py-2 rounded-full font-semibold hidden sm:block hover:bg-gray-400 transition-colors duration-200">
                  Sign In
                </button>
              )}
              </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;