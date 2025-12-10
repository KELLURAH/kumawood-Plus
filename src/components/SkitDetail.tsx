import React, { useState } from 'react';
import { 
  Play, 
  ArrowLeft, 
  Share2, 
  Plus, 
  ThumbsUp,
  Bell
} from 'lucide-react';
import type { Movie } from '../types';
import MovieRow from './MovieRow';

interface SkitDetailProps {
  movie: Movie;
  onBack: () => void;
  onPlay: (movie: Movie) => void;
  relatedSkits: Movie[];
}

const SkitDetail: React.FC<SkitDetailProps> = ({ movie, onBack, onPlay, relatedSkits }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#0d0e12] animate-fade-in relative z-50">
      
      {/* Back Navigation */}
      <div className="absolute top-6 left-6 z-30">
        <button 
          onClick={onBack}
          className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* A. Video Player Section */}
      <div className="w-full bg-black relative aspect-video md:max-h-[60vh] lg:max-h-[70vh] flex items-center justify-center group mx-auto max-w-7xl">
         {isPlaying ? (
            <div className="w-full h-full flex items-center justify-center bg-black">
               {movie.youtubeId ? (
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&rel=0&modestbranding=1`} 
                   title={movie.title} 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                   className="w-full h-full"
                 ></iframe>
               ) : (
                 <div className="text-center">
                   <p className="text-gray-500 mb-2">Video source not found.</p>
                   <button onClick={() => setIsPlaying(false)} className="text-yellow-500 hover:underline">Go back</button>
                 </div>
               )}
            </div>
         ) : (
            <>
               <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-full object-contain bg-[#1a1c22]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-transparent" />
               
               {/* Play Button Overlay */}
               <button 
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center z-20 group-hover:scale-105 transition-transform"
               >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-500/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                     <Play size={40} fill="black" className="ml-2 text-black" />
                  </div>
               </button>
            </>
         )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
         
         <div className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-white/5 pb-8">
            <div className="flex-1 space-y-4">
                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                    {movie.title}
                </h1>
                
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 overflow-hidden border-2 border-transparent group-hover:border-yellow-500 transition-all">
                            <img 
                                src={movie.artistImage || movie.image} 
                                alt={movie.artist} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <span className="block text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{movie.artist}</span>
                            <span className="text-xs text-gray-400">1.2M Subscribers</span>
                        </div>
                    </button>
                    
                    <button className="ml-2 px-4 py-1.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                        <Bell size={14} /> Subscribe
                    </button>
                </div>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center gap-3 bg-[#1a1c22] p-2 rounded-xl border border-white/5">
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isLiked ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-white/5 text-gray-300'}`}
                >
                    <ThumbsUp size={20} className={isLiked ? "fill-current" : ""} />
                    <span className="font-medium text-sm">Like</span>
                </button>
                <div className="w-px h-6 bg-white/10"></div>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg text-gray-300 transition-colors">
                    <Share2 size={20} />
                    <span className="font-medium text-sm">Share</span>
                </button>
                <div className="w-px h-6 bg-white/10"></div>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg text-gray-300 transition-colors">
                    <Plus size={20} />
                    <span className="font-medium text-sm">Save</span>
                </button>
            </div>
         </div>

         {/* Info Block */}
         <div className="py-6 space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="text-white font-medium">{movie.views || '150K views'}</span>
                <span>•</span>
                <span>{movie.year || '2 days ago'}</span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white border border-white/10">Skit</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-3xl">
                {movie.summary || movie.fullSynopsis || "Enjoy this hilarious skit! Don't forget to like, share, and subscribe for more daily comedy content from Ghana's finest creators."}
            </p>
         </div>

      </div>

      {/* Related Skits */}
      <div className="bg-[#0a0b0e] py-10 px-4 md:px-8 border-t border-white/5 space-y-10">
         <MovieRow title="More from this Creator" movies={relatedSkits} onMovieClick={onPlay} />
         <MovieRow title="Recommended for You" movies={[...relatedSkits].reverse()} onMovieClick={onPlay} />
      </div>
    </div>
  );
};

export default SkitDetail;
