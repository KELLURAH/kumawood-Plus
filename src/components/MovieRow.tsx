import React from 'react';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  id?: string;
  onMovieClick?: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, id, onMovieClick }) => {
  return (
    <div className="mb-10 md:mb-14" id={id}>
      <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        <button className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
          View All 
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory scroll-smooth">
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start shrink-0">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
        
        {/* Spacer for right padding on mobile */}
        <div className="w-1 shrink-0 md:hidden" />
      </div>
    </div>
  );
};

export default MovieRow;