import React from 'react';
import type { NavItem, Movie } from '../types';
import { Clapperboard, Play, X } from 'lucide-react';

interface SidebarProps {
  navItems: NavItem[];
  continueWatching: Movie[];
  isOpen: boolean;
  onClose: () => void;
  onMovieClick?: (movie: Movie) => void;
  activeNavId?: string;
  onNavClick?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  navItems, 
  continueWatching, 
  isOpen, 
  onClose, 
  onMovieClick,
  activeNavId = 'home',
  onNavClick 
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[280px] md:w-64 bg-[#0d0e12] md:bg-transparent
        flex flex-col p-6 pr-2 h-full transition-transform duration-300 ease-in-out border-r border-white/5 md:border-none
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} md:translate-x-0 md:static
      `}>
        
        {/* Header / Logo Area */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3 text-yellow-400">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black">
              <Clapperboard size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">Kumawood +</span>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mb-10 overflow-y-auto max-h-[40vh] md:max-h-none no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeNavId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onNavClick) onNavClick(item.id);
                  onClose();
                }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group flex-shrink-0 ${
                  isActive
                    ? 'bg-white/10 text-white font-medium shadow-lg backdrop-blur-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon
                  size={20}
                  className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Continue Watching Section */}
        <div className="mt-auto overflow-y-auto no-scrollbar pb-8 md:pb-4 flex-1">
          <h3 className="text-gray-400 text-sm font-medium mb-4 flex items-center gap-2 sticky top-0 bg-[#0d0e12] md:bg-transparent py-2 z-10">
            <Play size={14} className="fill-gray-400" />
            Continue Watching
          </h3>
          <div className="flex flex-col gap-4">
            {continueWatching.map((movie) => (
              <div 
                key={movie.id} 
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-gray-800 flex-shrink-0"
                onClick={() => onMovieClick && onMovieClick(movie)}
              >
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play size={16} fill="white" className="ml-1 text-white" />
                     </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${movie.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="p-3 relative z-10">
                  <h4 className="text-sm font-medium text-white truncate">{movie.title}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-400">
                      {movie.episodes || movie.duration}
                    </span>
                    {movie.match && (
                       <span className="text-xs font-semibold text-gray-500">{movie.match}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;