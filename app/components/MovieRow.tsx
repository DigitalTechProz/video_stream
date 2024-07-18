import { ChevronRightIcon } from "lucide-react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieRowProps {
    title: string;
    movies: Movie[];
  }
  
  const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => (
    <div className="my-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title} Animation</h2>
        <ChevronRightIcon className="w-6 h-6 text-white ml-2" />
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.apiVideoId} movie={movie} />
  
        ))}
      </div>
    </div>
  );

export default MovieRow;  