import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, Clapperboard } from 'lucide-react';
import { LOGIN_SLIDER_MOVIES } from '../constants';
import type { Movie } from '../types';
import { fetchMoviePoster } from '../services/tmdb';

interface LoginProps {
  onLogin: () => void;
}

// Sub-component to handle individual poster fetching
const LoginPoster: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [imageSrc, setImageSrc] = useState(movie.image);

  useEffect(() => {
    let isMounted = true;
    const loadPoster = async () => {
      const poster = await fetchMoviePoster(movie.title, movie.year);
      if (isMounted && poster) {
        setImageSrc(poster);
      }
    };
    loadPoster();
    return () => { isMounted = false; };
  }, [movie.title, movie.year]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 aspect-[2/3]">
      <img 
        src={imageSrc} 
        className="w-full h-full object-cover" 
        alt={movie.title} 
        loading="lazy" 
      />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        onLogin();
    }, 500);
  };

  const rotateArray = (arr: Movie[], offset: number) => {
    const len = arr.length;
    const shift = offset % len; 
    return [...arr.slice(shift), ...arr.slice(0, shift)];
  };

  // Use the specific login list instead of trending
  const denseList = [...LOGIN_SLIDER_MOVIES, ...LOGIN_SLIDER_MOVIES, ...LOGIN_SLIDER_MOVIES, ...LOGIN_SLIDER_MOVIES];

  const col1 = denseList;
  const col2 = rotateArray(denseList, 2);
  const col3 = rotateArray(denseList, 4);

  return (
    <div className="flex h-screen w-full bg-[#0d0e12] text-white font-sans overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full lg:w-[45%] flex flex-col p-8 md:p-12 lg:p-20 justify-center relative z-20 bg-[#0d0e12] border-r border-white/5 shadow-2xl">
            
            <div className="max-w-md w-full mx-auto mt-4 lg:mt-0">
                <div className="mb-8">
                    <div className="flex items-center gap-3 text-yellow-400 mb-8">
                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black shadow-lg shadow-yellow-400/20">
                          <Clapperboard size={24} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-wide">Kumawood +</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-white">
                        Welcome back
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Kumawood + provides the best Ghanaian and African movies, series, and music videos in one place.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="yourmail@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#16181e] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all text-white placeholder-gray-600 shadow-inner"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#16181e] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all text-white placeholder-gray-600 pr-12 shadow-inner"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label 
                            className="flex items-center gap-3 cursor-pointer group select-none"
                            onClick={() => setRememberMe(!rememberMe)}
                        >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${rememberMe ? 'bg-yellow-500 border-yellow-500' : 'border-white/20 bg-[#16181e] group-hover:border-yellow-500/50'}`}>
                                {rememberMe && <Check size={14} className="text-black stroke-[3]" />}
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-300">Remember me</span>
                        </label>
                        <button type="button" className="text-sm text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                            Forgot Password?
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg rounded-xl py-4 hover:shadow-lg hover:shadow-yellow-500/20 hover:translate-y-[-1px] transition-all active:translate-y-[1px] mt-4"
                    >
                        Sign in
                    </button>

                    <div className="relative flex items-center justify-center py-4 my-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <span className="relative bg-[#0d0e12] px-4 text-sm text-gray-500 font-medium">Or continue with</span>
                    </div>

                    <button 
                        type="button" 
                        className="w-full bg-white/5 border border-white/10 text-white font-medium rounded-xl py-4 hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
                    >
                        <div className="p-0.5 bg-white rounded-full">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        </div>
                        <span className="group-hover:text-white text-gray-200 transition-colors">Sign in with Google</span>
                    </button>
                </form>

                <p className="mt-10 text-center text-gray-400 text-sm">
                    New to Kumawood +? <button className="text-yellow-500 font-bold hover:underline ml-1">Create new account</button>
                </p>
            </div>
            
            <div className="mt-auto pt-8 text-xs text-gray-600 flex gap-4 justify-center md:justify-start">
                <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-400">Terms of Service</a>
            </div>
        </div>

        {/* Right Section - Image Grid */}
        <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-[#050608]">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d0e12] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12]/80 via-transparent to-[#0d0e12]/20 z-10 pointer-events-none"></div>
            
            <div className="grid grid-cols-3 gap-5 p-4 transform -rotate-6 scale-110 origin-center h-[150%] -mt-20 opacity-60 grayscale-[30%] hover:grayscale-0 transition-all duration-1000">
                
                {/* Column 1 - Scroll Up */}
                <div className="space-y-5 animate-scroll-up">
                    {[...col1, ...col1].map((m, i) => (
                        <LoginPoster key={`c1-${i}`} movie={m} />
                    ))}
                </div>
                
                {/* Column 2 - Scroll Down */}
                <div className="space-y-5 animate-scroll-down">
                    {[...col2, ...col2].map((m, i) => (
                        <LoginPoster key={`c2-${i}`} movie={m} />
                    ))}
                </div>

                {/* Column 3 - Scroll Up */}
                <div className="space-y-5 animate-scroll-up">
                    {[...col3, ...col3].map((m, i) => (
                        <LoginPoster key={`c3-${i}`} movie={m} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
