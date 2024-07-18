import React from "react";

import { Movie } from "../../types/movie";
import { fetchMovies } from "@/utils/fetchMovies";
import DashboardNavbar from "../components/DashboardNavbar";
import MovieContentList from "../components/MovieContentList";
import { Sidebar } from "lucide-react";


export default async function MovieContentPage() {

  let movies: Movie[] = [];

  try {
    movies = await fetchMovies();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  return (
    <div className="bg-gray-800 min-h-screen">
    
      <div className="flex">
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold">Home</h1>
            <div className="flex space-x-4 mt-4">
              <span className="text-yellow-500 border-b-2 border-yellow-500 pb-2">Home</span>
              <span className="text-gray-400">Trending</span>
              <span className="text-gray-400">Activity</span>
              <span className="text-gray-400">Recently Released</span>
              <span className="text-gray-400">My Profile</span>
            </div>
          </div>
          
          <MovieContentList title="New Movies"  movies={movies}/>
          <MovieContentList title="Now Playing" movies={movies}/>
          <MovieContentList title="More Series" movies={movies}/>
        </main>
      </div>
      
    </div>
    
  );
}