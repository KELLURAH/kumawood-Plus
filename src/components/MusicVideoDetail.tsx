import React, { useState } from 'react';
import { 
  Play, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Plus, 
  Download, 
  MessageSquare, 
  Mic2,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ThumbsUp,
  Eye,
  Disc
} from 'lucide-react';
import type { Movie } from '../types';
import MovieRow from './MovieRow';

interface MusicVideoDetailProps {
  movie: Movie;
  onBack: () => void;
  onPlay: (movie: Movie) => void;
  relatedMovies: {
    moreByArtist: Movie[];
    trending: Movie[];
    fansAlsoWatched: Movie[];
  };
}

const MusicVideoDetail: React.FC<MusicVideoDetailProps> = ({ movie, onBack, onPlay, relatedMovies }) => {
  const [showLyrics, setShowLyrics] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
      <div className="w-full bg-black relative aspect-video md:max-h-[70vh] flex items-center justify-center group">
         {isPlaying ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
               <p className="text-gray-500">Video Player Component Placeholder</p>
            </div>
         ) : (
            <>
               <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-full object-cover opacity-80"
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
               
               {/* Floating Controls Overlay */}
               <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-20 bg-gradient-to-t from-black/90 to-transparent pt-20">
                  <div className="flex items-center gap-4">
                     <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10">
                        <Heart size={20} />
                     </button>
                     <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10">
                        <Plus size={20} />
                     </button>
                     <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10">
                        <Share2 size={20} />
                     </button>
                  </div>
                  <div className="flex items-center gap-4">
                      <span className="bg-black/60 px-2 py-1 rounded text-xs font-mono text-white border border-white/10">HD</span>
                  </div>
               </div>
            </>
         )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Left Column: Info, Lyrics, Comments */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* B. Song & Artist Info Block */}
            <div className="space-y-4">
               <div className="flex items-start justify-between">
                  <div>
                     <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                        {movie.title}
                     </h1>
                     <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                           <img 
                              src={movie.artistImage || movie.image} 
                              alt={movie.artist} 
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <span className="text-xl md:text-2xl font-bold">{movie.artist}</span>
                     </button>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white lg:hidden">
                     <MoreVertical size={24} />
                  </button>
               </div>

               <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                  <span className="text-gray-400">{movie.year}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="text-gray-400">{(movie.genre || []).join(' • ')}</span>
                  {movie.label && (
                     <>
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-gray-400">{movie.label}</span>
                     </>
                  )}
                  {movie.isExplicit && (
                     <span className="px-1.5 py-0.5 border border-gray-600 rounded text-[10px] text-gray-400 uppercase tracking-wide ml-2">
                        Explicit
                     </span>
                  )}
               </div>

               {movie.fullSynopsis && (
                  <p className="text-gray-300 leading-relaxed max-w-2xl">
                     {movie.fullSynopsis}
                  </p>
               )}
            </div>

            {/* C. Engagement Section */}
            <div className="flex items-center gap-6 py-4 border-y border-white/5">
               <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors">
                     <ThumbsUp size={18} />
                     <span>1.2M</span>
                  </button>
               </div>
               <div className="flex items-center gap-2 text-gray-400">
                  <Eye size={18} />
                  <span className="text-sm font-medium">{movie.views || '1M views'}</span>
               </div>
               <div className="flex-1" />
               <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                  <Download size={18} /> Download Audio
               </button>
            </div>

            {/* D. Lyrics Section */}
            <div className="bg-[#13151a] rounded-2xl border border-white/5 overflow-hidden">
               <button 
                  onClick={() => setShowLyrics(!showLyrics)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
               >
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Mic2 size={20} />
                     </div>
                     <h3 className="text-lg font-bold text-white">Lyrics</h3>
                  </div>
                  {showLyrics ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
               </button>
               
               {showLyrics && (
                  <div className="px-6 pb-8 animate-fade-in">
                     <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                        <p className="text-gray-300 whitespace-pre-line leading-loose font-medium text-lg text-center md:text-left">
                           {movie.lyrics || "Lyrics not available for this track yet."}
                        </p>
                     </div>
                  </div>
               )}
            </div>

            {/* G. Comments (Teaser) */}
            <div className="pt-4">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare size={18} /> 482 Comments
               </h3>
               <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0" />
                  <div>
                     <p className="text-sm font-bold text-white mb-1">Kwame Eugene Fan</p>
                     <p className="text-sm text-gray-300">This video is pure art! The visuals are on another level. 🔥🇬🇭</p>
                  </div>
               </div>
               <button className="mt-4 text-sm text-blue-400 font-medium hover:underline">
                  View all comments
               </button>
            </div>
         </div>

         {/* Right Column: Artist & Related */}
         <div className="space-y-8">
            
            {/* E. Artist Spotlight Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 shadow-xl">
               <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-[#0d0e12] shadow-lg mb-4 overflow-hidden">
                     <img 
                        src={movie.artistImage || movie.image} 
                        alt={movie.artist} 
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{movie.artist}</h3>
                  <p className="text-sm text-gray-400 mb-4">2.4M Followers</p>
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                     {movie.artistBio || `One of the most influential artists in the ${movie.genre?.[0] || 'Afrobeats'} scene, bringing authentic African sounds to the global stage.`}
                  </p>
                  
                  <div className="w-full flex gap-3">
                     <button className="flex-1 py-2.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                        Follow
                     </button>
                     <button className="flex-1 py-2.5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors border border-white/10">
                        View Profile
                     </button>
                  </div>
               </div>
            </div>

            {/* H. Technical Details (Small) */}
            <div className="bg-[#13151a] rounded-xl p-4 border border-white/5">
               <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">File Details</h4>
               <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                     <span>Resolution</span>
                     <span className="text-white">4K Ultra HD</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Audio</span>
                     <span className="text-white">Dolby Atmos</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* F. Related Videos / Recommendations */}
      <div className="bg-[#0a0b0e] py-10 px-4 md:px-8 border-t border-white/5 space-y-10">
         <MovieRow title={`More from ${movie.artist}`} movies={relatedMovies.moreByArtist} onMovieClick={onPlay} />
         <MovieRow title="Trending Afrobeats Now" movies={relatedMovies.trending} onMovieClick={onPlay} />
         <MovieRow title="Fans Also Watched" movies={relatedMovies.fansAlsoWatched} onMovieClick={onPlay} />
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default MusicVideoDetail;