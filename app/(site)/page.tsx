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

  // Select the first movie from the fetched list or a default one
  const selectedMovie: Movie = movies.length > 0 ? movies[0] : {
    title: 'Default Movie Title',
    description: 'Default Movie Description',
    apiVideoId: "",
    duration: "",
    uploadDate: "",
    categories: [],
    nowPlaying: [],
    moreSeries: [],
    newMovies: []
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar movie={selectedMovie} />
      <div className="flex-grow overflow-y-auto">
        <Hero movie={selectedMovie} />
        <MovieSection movies={movies} />
      </div>
    </div>
  );
}
