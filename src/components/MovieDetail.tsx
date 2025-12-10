import React from 'react';
import { 
  Play, 
  Plus, 
  Download, 
  Share2, 
  ThumbsUp, 
  ArrowLeft, 
  Star, 
  MessageCircle,
  Clock,
  Globe,
  Mic
} from 'lucide-react';
import type { Movie } from '../types';
import MovieRow from './MovieRow';

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
  relatedMovies: {
    similar: Movie[];
    moreGhana: Movie[];
    africanStories: Movie[];
  };
  onMovieClick: (movie: Movie) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBack, relatedMovies, onMovieClick }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#0d0e12] animate-fade-in relative z-50">
      
      {/* 1. Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e12]/90 via-[#0d0e12]/30 to-transparent" />
        </div>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-8 flex flex-col justify-end">
          <div className="max-w-3xl animate-slide-up">
            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm font-medium">
              {movie.match && (
                 <span className="text-green-400">{movie.match}% Match</span>
              )}
              <span className="text-gray-300">{movie.year || '2024'}</span>
              <span className="px-2 py-0.5 rounded bg-white/20 text-white text-xs border border-white/10">
                {movie.ageRating || '13+'}
              </span>
              <span className="text-gray-300">{movie.duration || '1h 45m'}</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                <span className="text-xs font-bold">HD</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight leading-none drop-shadow-2xl">
              {movie.title}
            </h1>

            {/* Short Description */}
            <p className="text-gray-300 text-base md:text-lg line-clamp-3 mb-8 max-w-2xl drop-shadow-md">
              {movie.summary || movie.fullSynopsis || "An epic journey that explores the depths of courage and the bonds of family in a world where nothing is as it seems."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-transform active:scale-95">
                <Play size={20} fill="currentColor" />
                <span>Play</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 backdrop-blur-md transition-all border border-white/10">
                <Plus size={20} />
                <span>My List</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 backdrop-blur-md transition-all border border-white/10 hidden sm:flex">
                <Download size={20} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Playback & Actions Area */}
      <div className="px-6 md:px-12 py-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-6 bg-[#0d0e12]">
        <div className="flex items-center gap-6">
           <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Play size={18} />
              <span className="text-sm font-medium">Trailer</span>
           </button>
           <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Share2 size={18} />
              <span className="text-sm font-medium">Share</span>
           </button>
           <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ThumbsUp size={18} />
              <span className="text-sm font-medium">Rate</span>
           </button>
        </div>
        
        {/* Match Score / Rating */}
        <div className="flex items-center gap-1.5 text-yellow-400">
           <Star size={18} fill="currentColor" />
           <Star size={18} fill="currentColor" />
           <Star size={18} fill="currentColor" />
           <Star size={18} fill="currentColor" />
           <Star size={18} className="text-gray-600" />
           <span className="text-white font-bold ml-2 text-lg">{movie.rating || 8.5}</span>
        </div>
      </div>

      {/* 3. Movie Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 px-6 md:px-12 py-10">
        {/* Left Column: Synopsis & Metadata */}
        <div className="lg:col-span-2 space-y-8">
           <div>
              <h3 className="text-xl font-bold text-white mb-3">Synopsis</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {movie.fullSynopsis || movie.summary || "This cinematic masterpiece takes you on a thrilling ride through emotion and spectacle. Experience the story that has captivated audiences across the continent."}
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                 <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Clock size={14} /> Duration
                 </h4>
                 <p className="text-white">{movie.duration || '1h 56m'}</p>
              </div>
              <div>
                 <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Globe size={14} /> Genres
                 </h4>
                 <div className="flex flex-wrap gap-2">
                   {(movie.genre || ['Drama', 'Thriller']).map(g => (
                     <span key={g} className="text-white">{g}{', '}</span>
                   ))}
                 </div>
              </div>
              <div>
                 <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Mic size={14} /> Audio
                 </h4>
                 <p className="text-white">{(movie.languages || ['English', 'Twi']).join(', ')}</p>
              </div>
              <div>
                 <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <MessageCircle size={14} /> Subtitles
                 </h4>
                 <p className="text-white">{(movie.subtitles || ['English']).join(', ')}</p>
              </div>
           </div>
        </div>

        {/* Right Column: Cast & Crew */}
        <div className="bg-[#13151a] rounded-2xl p-6 border border-white/5 h-fit">
           <h3 className="text-lg font-bold text-white mb-6">Cast & Crew</h3>
           
           <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    D
                 </div>
                 <div>
                    <p className="text-white font-medium">{movie.director || 'Unknown Director'}</p>
                    <p className="text-xs text-gray-500">Director</p>
                 </div>
              </div>

              <div className="h-px bg-white/5 my-4" />

              {(movie.cast || [
                { name: 'Adjetey Anang', role: 'Main Lead' },
                { name: 'Lydia Forson', role: 'Supporting' },
                { name: 'Majid Michel', role: 'Antagonist' }
              ]).map((actor, idx) => (
                <div key={idx} className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-xs overflow-hidden">
                      {actor.image ? <img src={actor.image} alt={actor.name} /> : actor.name.charAt(0)}
                   </div>
                   <div>
                      <p className="text-white font-medium text-sm">{actor.name}</p>
                      <p className="text-xs text-gray-500">{actor.role}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* 4. Related Content */}
      <div className="px-6 md:px-12 py-4 md:py-8 space-y-8 bg-gradient-to-b from-[#0d0e12] to-[#0a0b0e]">
         <MovieRow title="More Like This" movies={relatedMovies.similar} onMovieClick={onMovieClick} />
         <MovieRow title="More from Ghana" movies={relatedMovies.moreGhana} onMovieClick={onMovieClick} />
         <MovieRow title="African Stories You May Like" movies={relatedMovies.africanStories} onMovieClick={onMovieClick} />
      </div>

      {/* 5. User Social Layer (Comments) */}
      <div className="px-6 md:px-12 py-10 border-t border-white/5 bg-[#0a0b0e]">
         <div className="max-w-4xl">
            <h3 className="text-xl font-bold text-white mb-6">Community Thoughts</h3>
            
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500 shrink-0" />
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">Kwame D.</span>
                        <span className="text-gray-500 text-xs">2 days ago</span>
                     </div>
                     <p className="text-gray-400 text-sm">This was absolutely incredible. The cinematography reminded me so much of the classics but with a modern twist. Highly recommend!</p>
                     <div className="flex gap-4 mt-2">
                        <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1"><ThumbsUp size={12} /> 24</button>
                        <button className="text-xs text-gray-500 hover:text-white">Reply</button>
                     </div>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 shrink-0" />
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">Ama S.</span>
                        <span className="text-gray-500 text-xs">5 days ago</span>
                     </div>
                     <p className="text-gray-400 text-sm">A bit slow in the middle, but the ending made up for it. 4/5 stars from me.</p>
                     <div className="flex gap-4 mt-2">
                        <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1"><ThumbsUp size={12} /> 12</button>
                        <button className="text-xs text-gray-500 hover:text-white">Reply</button>
                     </div>
                  </div>
               </div>
            </div>
            
            <button className="mt-8 text-blue-400 text-sm font-medium hover:underline">
               View all 128 comments
            </button>
         </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-20" />
    </div>
  );
};

export default MovieDetail;