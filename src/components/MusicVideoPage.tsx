import React, { useState } from 'react';
import Hero from './Hero';
import MovieRow from './MovieRow';
import { 
  MUSIC_HERO, 
  MUSIC_TRENDING, 
  MUSIC_AFROBEATS, 
  MUSIC_GOSPEL, 
  MUSIC_THROWBACK 
} from '../constants';
import type { Movie } from '../types';

interface MusicVideoPageProps {
  onPlay: (movie: Movie) => void;
}

const MusicVideoPage: React.FC<MusicVideoPageProps> = ({ onPlay }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All', 'Gh Music', 'Afrobeats', 'Hiplife', 'Gospel', 'Amapiano', 'Naija Hits', 'Old School', 'Top Charts'
  ];

  return (
    <div className="flex-1 w-full pb-12 animate-fade-in">
      
      {/* A. Page Header */}
      <div className="px-4 md:px-8 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
          Music Videos <span className="text-yellow-500">.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-6">
          Discover the best music from Ghana and across Africa.
        </p>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300
                ${activeFilter === filter 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/50 scale-105' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* B. Featured Music Video Banner */}
      <div className="px-4 md:px-8 mb-10">
        <Hero movies={MUSIC_HERO} onPlay={onPlay} />
      </div>

      {/* C. Music Video Carousels */}
      <div className="space-y-2 px-4 md:px-8">
        <MovieRow 
          title="Trending in Ghana Today 🇬🇭" 
          movies={MUSIC_TRENDING} 
          onMovieClick={onPlay}
        />
        
        <MovieRow 
          title="Afrobeats Essentials 🌍" 
          movies={MUSIC_AFROBEATS} 
          onMovieClick={onPlay}
        />
        
        <MovieRow 
          title="Gospel & Inspirational Hits 🙏" 
          movies={MUSIC_GOSPEL} 
          onMovieClick={onPlay}
        />
        
        <MovieRow 
          title="Throwback Vibes (Old School Highlife) 🎺" 
          movies={MUSIC_THROWBACK} 
          onMovieClick={onPlay}
        />

        <MovieRow 
          title="New Releases This Week 🔥" 
          movies={[...MUSIC_AFROBEATS, ...MUSIC_TRENDING].reverse()} 
          onMovieClick={onPlay}
        />
      </div>
    </div>
  );
};

export default MusicVideoPage;