"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Movie } from '@/app/types/movie';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();

  const formatUrl = (url: string) => {
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  };

  const handleCardClick = () => {
    router.push(`/dashboard/${movie.apiVideoId}`);
  };

  return (
    <div
      className="relative w-48 h-72 rounded-lg overflow-hidden group cursor-pointer bg-glassmorph backdrop-filter backdrop-blur-lg bg-opacity-20"
      onClick={handleCardClick}
    >
      {movie.thumbnail ? (
        <Image
          src={formatUrl(movie.thumbnail.url)}
          alt={movie.thumbnail.title || movie.title}
          fill
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
          No image available
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white font-bold truncate">{movie.title}</h3>
        <p className="text-gray-300 text-sm">{new Date(movie.uploadDate).getFullYear()}</p>
      </div>
    </div>
  );
};

export default MovieCard;
