"use client";

import React, { useState, useEffect } from 'react';
import { HomeIcon, TvIcon, FilmIcon, GlobeEuropeAfricaIcon, MagnifyingGlassIcon, Bars3BottomRightIcon, XCircleIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import AuthModal from './AuthModal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Movie } from '../types/movie';

interface NavbarProps {
  movie: Movie;
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children, movie }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { isOpen, onOpen, onClose } = useAuthModal();
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const handleWatchNow = async () => {
      router.push(`/dashboard/${movie.apiVideoId}`);
  };

  const handleAuthModalOpen = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    onOpen();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AuthModal isOpen={isOpen} onChange={(open: boolean) => !open && onClose()}/>
      <nav className="bg-gray-900 bg-opacity-50 backdrop-blur-lg text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h3 className="h-8">BuzzSA Stream</h3>
            </div>
            <div className="relative flex-1 max-w-xs hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 text-white rounded-full px-4 py-2 w-full pr-10 focus:outline-none"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLinkWithIcon href="#" icon={<HomeIcon className="w-5 h-5" />} text="Home" />
            <NavLinkWithIcon href="#" icon={<TvIcon className="w-5 h-5" />} text="Latest Series" />
            <NavLinkWithIcon href="#" icon={<FilmIcon className="w-5 h-5" />} text="Buzz Movies" />
            <NavLinkWithIcon href="#" icon={<GlobeEuropeAfricaIcon className="w-5 h-5" />} text="Discover" />
            {user ? (
              <>
                <button onClick={handleWatchNow} className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full">Watch Now</button>
            
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => handleAuthModalOpen('signin')} className="bg-gray-500 text-white px-4 py-2 rounded-full">Sign In</button>
                <button onClick={() => handleAuthModalOpen('signup')} className="bg-yellow-500 text-white px-4 py-2 rounded-full">Sign Up</button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <XCircleIcon className="w-6 h-6 text-white" />
              ) : (
                <Bars3BottomRightIcon className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-lg text-white py-4 absolute w-full left-0 top-16 z-40"
          >
            <div className="container mx-auto flex flex-col space-y-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-800 text-white rounded-full px-4 py-2 w-full pr-10 focus:outline-none"
                />
                <MagnifyingGlassCircleIcon className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <NavLinkWithIcon href="#" icon={<HomeIcon className="w-5 h-5" />} text="Home" />
              <NavLinkWithIcon href="#" icon={<TvIcon className="w-5 h-5" />} text="Latest Series" />
              <NavLinkWithIcon href="#" icon={<FilmIcon className="w-5 h-5" />} text="Buzz Movies" />
              <NavLinkWithIcon href="#" icon={<GlobeEuropeAfricaIcon className="w-5 h-5" />} text="Discover" />
              {user ? (
                <>
                  <button onClick={handleWatchNow} className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full">Watch Now</button>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">P</span>
                  </div>
                  <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAuthModalOpen('signin')} className="bg-blue-500 text-white px-4 py-2 rounded-full">Sign In</button>
                  <button onClick={() => handleAuthModalOpen('signup')} className="bg-green-500 text-white px-4 py-2 rounded-full">Sign Up</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

const NavLinkWithIcon: React.FC<{ href: string; icon: JSX.Element; text: string }> = ({ href, icon, text }) => {
  const isActive = false; // Replace with logic to determine if link is active

  return (
    <a
      href={href}
      className={`relative flex items-center space-x-2 text-white ${
        isActive ? 'border-b-2 border-gray-300' : ''
      }`}
    >
      {icon}
      <span className={`hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded ${isActive ? 'font-bold' : ''}`}>
        {text}
      </span>
    </a>
  );
};

export default Navbar;
