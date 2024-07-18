"use client";

import React, { useState } from 'react';
import { Movie } from '../../types/movie';
import MovieCard from './MovieCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface MovieContentListProps {
  title: string;
  movies: Movie[];
}

const MovieContentList: React.FC<MovieContentListProps> = ({ movies }) => {
  const [expandedMovie, setExpandedMovie] = useState<Movie | null>(null);

  const groupMoviesByTags = (movies: Movie[]) => {
    return movies.reduce<{ [key: string]: Movie[] }>((acc, movie) => {
      const tags = movie.tags;
      if (tags && tags.length > 0) {
        // If no tags, categorize under "Animation series"
        const defaultCategory = 'Animation series';
        if (!acc[defaultCategory]) {
          acc[defaultCategory] = [];
        }
        acc[defaultCategory].push(movie);
      }
      return acc;
    }, {});
  };

  const groupedMovies = groupMoviesByTags(movies);

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(groupedMovies).map(([categoryName, movies]) => (
        <div key={categoryName}>
          <h2 className="flex items-center text-2xl font-bold text-white mb-3">
            {categoryName}
            <ChevronRightIcon className="ml-2 h-6 w-6 text-gray-400" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map(movie => (
              <MovieCard
                key={movie.apiVideoId}
                movie={movie}
                onExpand={setExpandedMovie}
                isExpanded={expandedMovie === movie}
                CategoryName={categoryName}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieContentList;
