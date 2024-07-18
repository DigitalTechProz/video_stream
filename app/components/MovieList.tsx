"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/app/types/movie';
import MoviePlayer from './MoviePlayer';

import PlayerModal from './PlayerModal';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (!movies || movies.length === 0) {
    return <p className="text-center text-xl text-red-500">No movies available at the moment.</p>;
  }

  const formatUrl = (url: string) => {
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  const handleWatchNowClick = (movie: Movie) => {
    console.log(`Selected Movie ID: ${movie.apiVideoId}`); // Log the selected movie ID
    setSelectedMovie(movie);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.apiVideoId} className="bg-card-background p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            {movie.thumbnail ? (
              <Image 
                src={formatUrl(movie.thumbnail.url)}
                alt={movie.thumbnail.title || movie.title}
                width={300}
                height={200}
                className="object-cover mb-2 rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 mb-2 flex items-center justify-center rounded">
                No image available
              </div>
            )}
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">
              {new Date(movie.uploadDate).toLocaleDateString('en-CA')}
            </p>
            <button
              onClick={() => handleWatchNowClick(movie)}
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Watch Now
            </button>
          </div>
        ))}
      </div>
      
      {selectedMovie && (
        <PlayerModal show={!!selectedMovie} onClose={handleModalClose}>
          <MoviePlayer videoId={selectedMovie.apiVideoId} />
          <h2 className="text-2xl font-bold mt-4">{selectedMovie.title}</h2>
          <p className="text-gray-300">{selectedMovie.description}</p>
        </PlayerModal>
      )}
    </div>
  );
};

export default MovieList;
