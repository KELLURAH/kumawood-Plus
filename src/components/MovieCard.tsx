import React, { useState, useEffect } from 'react';
import { Star, Play, Mic2, MoreVertical, Heart, Smile } from 'lucide-react';
import type { Movie } from '../types';
import { fetchMoviePoster } from '../services/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, isFavorite, onToggleFavorite }) => {
  const [imageSrc, setImageSrc] = useState<string>(movie.image);
  
  // Use explicit contentType or fallback to presence of artist for music/skits
  const isWideCard = movie.contentType === 'music' || movie.contentType === 'skit' || Boolean(movie.artist);

  // TMDb Integration Hook
  useEffect(() => {
    let isMounted = true;
    
    // 1. Reset image to default (dummy) when the movie prop changes to avoid stale images.
    setImageSrc(movie.image);

    // We only fetch for movies, not music videos or skits
    if (isWideCard) return;

    const loadRealPoster = async () => {
      // Use the service to get the poster (service now handles normalization and TV fallback)
      const realPoster = await fetchMoviePoster(movie.title, movie.year);
      
      if (isMounted && realPoster) {
        setImageSrc(realPoster);
      }
    };

    loadRealPoster();

    return () => {
      isMounted = false;
    };
  }, [movie.id, movie.title, movie.year, movie.image, isWideCard]); 

  // Handler to pass the currently displayed image (TMDb or default) to the parent
  const handleClick = () => {
    if (onClick) {
      onClick({ ...movie, image: imageSrc });
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(movie);
    }
  };

  if (isWideCard) {
    return (
      <div 
        className="flex-none w-[280px] md:w-[340px] group cursor-pointer relative animate-slide-up"
        onClick={handleClick}
      >
        {/* 16:9 Thumbnail Container */}
        <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-3 shadow-lg bg-gray-800 border border-white/5">
          <img
            src={movie.image} // Music/Skits keep original image
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Duration Badge (Bottom Right) */}
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium rounded">
            {movie.duration || '3:00'}
          </div>

          {/* Favorite Button Overlay (Top Right) */}
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all z-20 ${
                isFavorite ? 'bg-red-500/20 text-red-500' : 'bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60'
            }`}
          >
             <Heart size={16} className={isFavorite ? "fill-current" : ""} />
          </button>

          {/* Play Overlay (Center) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
             <div className="w-12 h-12 md:w-14 md:h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 border border-white/10 shadow-xl">
                <Play size={20} fill="white" className="text-white ml-1" />
             </div>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="px-1 flex gap-3">
          <div className="flex-1 min-w-0">
             <h3 className="text-white font-semibold text-sm md:text-base leading-tight mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                {movie.title}
             </h3>
             <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-1">
                <span className="truncate hover:text-gray-200 transition-colors">{movie.artist}</span>
             </div>
             <div className="flex items-center gap-2 text-gray-500 text-[10px] md:text-xs">
                 {movie.views && (
                   <>
                    <span>{movie.views}</span>
                    <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />
                   </>
                 )}
                 <span>{movie.year || '2024'}</span>
             </div>
          </div>
          
          {/* More Actions Icon */}
          <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1 p-1">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Standard Vertical Movie Card
  return (
    <div 
      className="flex-none w-[140px] md:w-[200px] group cursor-pointer relative animate-slide-up"
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] rounded-2xl md:rounded-3xl overflow-hidden mb-3 md:mb-4 shadow-lg bg-gray-800">
        <img
          src={imageSrc} // Uses state variable which might update to TMDb poster
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={() => setImageSrc(movie.image)} // Fallback to original if new URL fails
        />
        
        {/* Favorite Button Overlay (Top Right) */}
        <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all z-20 ${
                isFavorite ? 'bg-red-500/20 text-red-500' : 'bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60'
            }`}
        >
            <Heart size={16} className={isFavorite ? "fill-current" : ""} />
        </button>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
               <Play size={18} fill="white" className="text-white ml-1 md:w-5 md:h-5" />
            </div>
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="text-white font-semibold text-sm md:text-base mb-1 truncate group-hover:text-blue-400 transition-colors">
            {movie.title}
        </h3>
        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 font-medium">
          <span>{movie.year}</span>
          {movie.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={10} fill="currentColor" className="md:w-3 md:h-3" />
              <span className="text-gray-300">{movie.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
