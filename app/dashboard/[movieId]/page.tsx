"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from "../../types/movie";
import MovieContentList from "../../dashboard/components/MovieContentList";
import { fetchMovies } from '../../../utils/fetchMovies';

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const fetchedMovies = await fetchMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      
      <div className="flex-grow overflow-y-auto">
        <MovieContentList movies={movies} />
      </div>
    </div>
  );
}
