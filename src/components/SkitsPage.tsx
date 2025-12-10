import React, { useState } from 'react';
import MovieRow from './MovieRow';
import { 
  SKITS_TRENDING, 
  SKITS_LIKEE, 
  SKITS_RELATIONSHIP, 
  SKITS_OFFICE,
  SKITS_CHURCH 
} from '../constants';
import type { Movie } from '../types';
import { Smile } from 'lucide-react';

interface SkitsPageProps {
  onPlay: (movie: Movie) => void;
}

const SkitsPage: React.FC<SkitsPageProps> = ({ onPlay }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All', 
    'Trending', 
    'New This Week', 
    'Dr. Likee & Friends', 
    'Relationship Skits', 
    'Office & Street Skits', 
    'Family & Church Skits', 
    'Dark Humor'
  ];

  // Helper to check if any data exists to handle empty state (mock check)
  const hasData = SKITS_TRENDING.length > 0;

  return (
    <div className="flex-1 w-full pb-12 animate-fade-in">
      
      {/* A. Page Header */}
      <div className="px-4 md:px-8 py-6 md:py-8 bg-gradient-to-b from-[#13151a] to-[#0d0e12]">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight flex items-center gap-3">
          Ghanaian Skits <span className="text-yellow-500"><Smile size={32} strokeWidth={2.5} /></span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-6 font-medium">
          Quick laughs from your favorite Ghanaian creators.
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
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105 font-bold' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {!hasData ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Smile size={48} className="text-gray-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Skits are loading...</h2>
            <p className="text-gray-400 text-lg">Our comedians are warming up backstage.</p>
        </div>
      ) : (
        /* B. Skit Carousels */
        <div className="space-y-2 px-4 md:px-8 mt-6">
            
            <MovieRow 
            title="Trending Skits in Ghana 🔥" 
            movies={SKITS_TRENDING} 
            onMovieClick={onPlay}
            />
            
            <MovieRow 
            title="New Skits This Week 🆕" 
            movies={[...SKITS_OFFICE, ...SKITS_RELATIONSHIP]} 
            onMovieClick={onPlay}
            />
            
            <MovieRow 
            title="Dr. Likee & Friends ⭐" 
            movies={SKITS_LIKEE} 
            onMovieClick={onPlay}
            />

            <MovieRow 
            title="Short But Very Funny (Under 2 min) ⚡" 
            movies={SKITS_TRENDING.slice(0, 3)} 
            onMovieClick={onPlay}
            />
            
            <MovieRow 
            title="Relationship & Dating Skits ❤️" 
            movies={SKITS_RELATIONSHIP} 
            onMovieClick={onPlay}
            />
            
            <MovieRow 
            title="Family, Church & Village Life ⛪" 
            movies={SKITS_CHURCH} 
            onMovieClick={onPlay}
            />

            <MovieRow 
            title="Office & Street Wahala 💼" 
            movies={SKITS_OFFICE} 
            onMovieClick={onPlay}
            />

            <MovieRow 
            title="Because You Laughed At 'The Barber Shop Wahala'" 
            movies={SKITS_TRENDING.slice(2, 5)} 
            onMovieClick={onPlay}
            />
        </div>
      )}
    </div>
  );
};

export default SkitsPage;