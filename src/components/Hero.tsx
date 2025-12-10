
import React, { useState, useEffect } from 'react';
import { Play, Heart } from 'lucide-react';
import type { Movie } from '../types';
import { fetchMovieBackdrop } from '../services/tmdb';

interface HeroProps {
  movies: Movie[];
  onPlay?: (movie: Movie) => void;
}

// Sub-component to handle individual slide logic & image fetching
const HeroSlide: React.FC<{ movie: Movie; isActive: boolean; onPlay?: (m: Movie) => void }> = ({ movie, isActive, onPlay }) => {
  const [imageSrc, setImageSrc] = useState(movie.image);

  useEffect(() => {
    let isMounted = true;
    const loadBackdrop = async () => {
      // Attempt to fetch a high-res backdrop from TMDb
      // We pass the year if available to help accuracy
      const backdrop = await fetchMovieBackdrop(movie.title, movie.year);
      if (isMounted && backdrop) {
        setImageSrc(backdrop);
      }
    };
    loadBackdrop();
    return () => { isMounted = false; };
  }, [movie.title, movie.year]);

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={movie.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end items-start z-10">
        
        <div className={`transition-all duration-700 delay-300 transform w-full ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
            {movie.tagline && (
                <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-yellow-500/20 backdrop-blur-md text-[10px] md:text-xs font-bold text-yellow-400 border border-yellow-500/20 uppercase tracking-wider">
                  Featured
                </span>
            )}
            <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] md:text-xs font-medium text-white border border-white/10">
                {movie.duration}
            </span>
            {movie.genre?.slice(0, 2).map((g) => (
              <span key={g} className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] md:text-xs font-medium text-gray-200 border border-white/5">
                {g}
              </span>
            ))}
            {movie.ageRating && (
                <span className="hidden md:inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-gray-200 border border-white/5">
                  {movie.ageRating}
                </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-2 tracking-tight leading-tight max-w-2xl drop-shadow-lg">
            {movie.title}
          </h1>
          
          {/* Tagline */}
          {movie.tagline && (
            <h2 className="text-lg md:text-xl font-medium text-yellow-400 mb-2 md:mb-4 drop-shadow-md">
              {movie.tagline}
            </h2>
          )}

          {/* Summary */}
          {movie.summary && (
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 drop-shadow-md">
              {movie.summary}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => onPlay && onPlay({ ...movie, image: imageSrc })}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-semibold transition-all group border border-white/10"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play size={12} className="fill-black text-black ml-0.5 md:w-3.5 md:h-3.5" />
              </div>
              <span className="flex flex-col items-start leading-none gap-0.5 md:gap-1">
                <span className="text-sm md:text-base">Play trailer</span>
                <span className="text-[10px] text-gray-300 font-normal hidden md:inline">2:30</span>
              </span>
            </button>
            
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 transition-all">
              <Heart size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ movies, onPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className="relative w-full h-[70vh] md:h-[500px] rounded-2xl md:rounded-[32px] overflow-hidden group shadow-2xl shadow-black/50">
      {movies.map((movie, index) => (
        <HeroSlide 
          key={movie.id} 
          movie={movie} 
          isActive={index === currentIndex} 
          onPlay={onPlay} 
        />
      ))}

      {/* Slider Indicators */}
      <div className="absolute bottom-6 right-6 md:top-8 md:right-8 flex gap-2 z-20">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-6 md:w-8' : 'bg-white/30 w-3 md:w-4 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;
