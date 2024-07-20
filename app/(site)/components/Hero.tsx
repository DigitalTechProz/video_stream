"use client";

import React, { useEffect, useState } from 'react';
import { fetchMovieThumbnails } from '@/utils/fetchThumbnail';
import AuthModal from '@/app/components/AuthModal';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { Movie } from '@/app/types/movie';

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useAuthModal();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const thumbnails = await fetchMovieThumbnails();
        setThumbnails(thumbnails);
      } catch (error) {
        console.error('Error fetching thumbnails:', error);
      }
    };

    fetchThumbnails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [thumbnails]);

  const handleOpenBuzzStream = () => {
    if (user) {
      router.push(`/dashboard/${movie.apiVideoId}`);
    } else {
      onOpen();
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt="Movie Thumbnail"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
      </div>
      <div className="relative z-10 p-4 sm:p-8 md:p-12 lg:p-16 text-white max-w-3xl">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4">
          Wanna watch your favorite Buzz SA Series?
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl">
          Enjoy your favorite Buzz SA series and movies.<br />
          You can start watching right now. Create your free account.
        </p>
        <button 
          onClick={handleOpenBuzzStream}
          className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-black rounded-full text-sm sm:text-lg"
        >
          Open BuzzSA Stream
        </button>
      </div>
      <AuthModal isOpen={isOpen} onChange={(open) => !open && onClose()} />
    </div>
  );
};

export default Hero;
