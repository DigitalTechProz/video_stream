"use client";

import React from 'react';
import { Movie } from '@/app/types/movie';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import MovieRow from './MovieRow';

interface MovieSectionProps {
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ movies }) => {

  const categorizedMovies = movies.reduce((acc, movie) => {
    movie.categories.forEach((category) => {
      if (!acc[category.name]) {
        acc[category.name] = [];
      }
      acc[category.name].push(movie);
    });
    return acc;
  }, {} as Record<string, Movie[]>);


  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {Object.entries(categorizedMovies).map(([category, movies]) => (
          <MovieRow key={category} title={category} movies={movies} />
        ))}
        <div className="my-8">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Categories</h2>
            <ChevronRightIcon className="w-6 h-6 text-white ml-2" />
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.keys(categorizedMovies).map((category, index) => (
              <button key={index} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors duration-300">
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
