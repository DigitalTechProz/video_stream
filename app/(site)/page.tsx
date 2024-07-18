import React from "react";

import Navbar from "../components/Navbar";
import Hero from "./components/Hero";
import MovieSection from "../components/MovieSection";
import { Movie } from "../types/movie";
import { fetchMovies } from "@/utils/fetchMovies";



export default async function Home() {
  let movies: Movie[] = [];

  try {
    movies = await fetchMovies();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
    
      <div className="flex-grow overflow-y-auto">
        <Hero />
        <MovieSection movies={movies} />
        
      </div>
      
    </div>
    
  );
}