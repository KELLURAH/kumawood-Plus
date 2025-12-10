import React, { useState, useMemo } from 'react';
import { Heart, Film, Tv, Music, Video, Search } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../types';

interface FavoritesPageProps {
  favorites: Movie[];
  onPlay: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onPlay, onToggleFavorite }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Added');

  const filters = [
    { label: 'All', icon: null },
    { label: 'Movies', icon: Film },
    { label: 'Series', icon: Tv },
    { label: 'Skits', icon: Video },
    { label: 'Music Videos', icon: Music },
  ];

  // Logic to filter and sort favorites
  const processedFavorites = useMemo(() => {
    let result = [...favorites];

    // 1. Filter
    if (activeFilter !== 'All') {
      if (activeFilter === 'Music Videos') {
        result = result.filter(m => Boolean(m.artist));
      } else if (activeFilter === 'Movies') {
        // Simple heuristic: if no artist and not a series format (usually)
        result = result.filter(m => !m.artist && !m.episodes);
      } else if (activeFilter === 'Series') {
        result = result.filter(m => Boolean(m.episodes));
      } else {
        // Skits/Other - Fallback
        result = result.filter(m => !m.artist && !m.episodes);
      }
    }

    // 2. Sort
    switch (sortBy) {
      case 'A–Z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Highest Rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Recently Added':
      default:
        // Assuming the list order is insertion order (newest last). 
        // We reverse to show newest first.
        result.reverse();
        break;
    }

    return result;
  }, [favorites, activeFilter, sortBy]);

  return (
    <div className="flex-1 w-full pb-12 animate-fade-in p-4 md:p-8">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight flex items-center gap-3">
            My Favorites <Heart className="text-red-500 fill-red-500" size={32} />
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {favorites.length} items saved
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden md:block">Sort by:</span>
            <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1a1c22] text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 outline-none focus:border-white/20 appearance-none cursor-pointer hover:bg-white/5 transition-colors"
            >
                <option>Recently Added</option>
                <option>A–Z</option>
                <option>Highest Rated</option>
            </select>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 mb-8 border-b border-white/5">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.label;
          const Icon = filter.icon;
          return (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2
                ${isActive 
                  ? 'border-yellow-500 text-white bg-white/5' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}
              `}
            >
              {Icon && <Icon size={16} />}
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* 3. Empty State */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
           <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Heart size={40} className="text-gray-600" />
           </div>
           <h2 className="text-xl font-bold text-white mb-2">You haven't saved anything yet</h2>
           <p className="text-gray-400 max-w-md mb-8">
             Tap the heart icon on movies, series, or music videos to add them to your personal collection.
           </p>
           <button 
             onClick={() => window.location.reload()} // Just a placeholder refresh or nav logic
             className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
           >
             Browse Content
           </button>
        </div>
      ) : processedFavorites.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
             <Search size={48} className="text-gray-600 mb-4" />
             <h3 className="text-lg font-medium text-white">No items found</h3>
             <p className="text-gray-500">Try changing your filters.</p>
         </div>
      ) : (
        /* 4. Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 animate-slide-up">
          {processedFavorites.map((movie) => (
            <div key={movie.id} className="relative group">
                <MovieCard 
                    movie={movie} 
                    onClick={onPlay} 
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;