import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import MusicVideoPage from './components/MusicVideoPage';
import MusicVideoDetail from './components/MusicVideoDetail';
import FavoritesPage from './components/FavoritesPage';
import SkitsPage from './components/SkitsPage';
import SkitDetail from './components/SkitDetail';
import Login from './components/Login';
import { 
  NAV_ITEMS, 
  CONTINUE_WATCHING, 
  CATEGORIES, 
  MOVIES, 
  USER,
  TRENDING_GHANA,
  GHANAIAN_CLASSICS,
  AFRICAN_STORIES,
  RECOMMENDED_FOR_YOU,
  MUSIC_HERO,
  MUSIC_TRENDING,
  MUSIC_AFROBEATS,
  SKITS_TRENDING
} from './constants';
import { heroSlides } from './data/heroSlides'; 
import { getGeminiRecommendations } from './services/geminiService';
import type { Movie } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('trending');
  const [activeNavId, setActiveNavId] = useState('home');
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>(MOVIES);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // Favorites State
  const [favorites, setFavorites] = useState<Movie[]>([
    ...CONTINUE_WATCHING, 
    MUSIC_TRENDING[0]
  ]);

  // Convert HeroSlide[] to Movie[] for the Hero component
  const heroMovies: Movie[] = heroSlides.map(slide => ({
    id: slide.id,
    title: slide.movieTitle,
    image: slide.imageUrl,
    summary: slide.description,
    tagline: slide.tagline,
    duration: 'Feature Film',
    year: '2024',
    genre: ['Trending', 'Ghana'],
    ageRating: 'PG-13'
  }));

  const handleSearch = async (query: string) => {
    if (selectedMovie) setSelectedMovie(null);
    
    if (!query.trim()) {
       setIsSearching(false);
       setDisplayedMovies(MOVIES);
       return;
    }

    setIsSearching(true);
    
    // Attempt AI Search first
    const aiResults = await getGeminiRecommendations(query);
    
    if (aiResults.length > 0) {
        setDisplayedMovies(aiResults);
    } else {
        // Fallback to local filtering if AI fails or no key
        console.log("Using local search fallback");
        setTimeout(() => {
           const allContent = [
             ...MOVIES, 
             ...TRENDING_GHANA, 
             ...AFRICAN_STORIES,
             ...GHANAIAN_CLASSICS,
             ...MUSIC_TRENDING,
             ...SKITS_TRENDING
           ];
           
           const filtered = allContent.filter(m => 
             m.title.toLowerCase().includes(query.toLowerCase()) ||
             m.artist?.toLowerCase().includes(query.toLowerCase())
           );
           
           // Remove duplicates by ID
           const uniqueFiltered = Array.from(new Map(filtered.map(item => [item.id, item])).values());
           
           setDisplayedMovies(uniqueFiltered.length ? uniqueFiltered : []);
        }, 500);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    setActiveNavId(id);
    setSelectedMovie(null); 
    setIsSearching(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedMovie(null);
    setActiveNavId('home');
  };

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === movie.id);
      if (exists) {
        return prev.filter(m => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const isMovieFavorite = (movieId: string) => favorites.some(m => m.id === movieId);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Routing for Detail Views
  if (selectedMovie) {
    if (selectedMovie.contentType === 'skit') {
       return (
         <SkitDetail 
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
            onPlay={handleMovieClick}
            relatedSkits={SKITS_TRENDING}
         />
       );
    }
    
    // Fallback: check artist presence for music videos if contentType is missing
    if (selectedMovie.contentType === 'music' || (!selectedMovie.contentType && selectedMovie.artist)) {
        return (
            <MusicVideoDetail 
              movie={selectedMovie}
              onBack={() => setSelectedMovie(null)}
              onPlay={handleMovieClick}
              relatedMovies={{
                moreByArtist: MUSIC_TRENDING,
                trending: MUSIC_AFROBEATS,
                fansAlsoWatched: MUSIC_HERO
              }}
            />
        );
    }

    return (
        <MovieDetail 
            movie={selectedMovie} 
            onBack={() => setSelectedMovie(null)}
            onMovieClick={handleMovieClick}
            relatedMovies={{
            similar: RECOMMENDED_FOR_YOU,
            moreGhana: TRENDING_GHANA,
            africanStories: AFRICAN_STORIES
            }}
        />
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0d0e12] overflow-hidden selection:bg-blue-500/30">
      <Sidebar 
        navItems={NAV_ITEMS} 
        continueWatching={CONTINUE_WATCHING} 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onMovieClick={handleMovieClick}
        activeNavId={activeNavId}
        onNavClick={handleNavClick}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
        
          <div className="flex-1 overflow-y-auto no-scrollbar animate-fade-in flex flex-col">
              <div className="max-w-[1600px] mx-auto w-full p-4 md:p-8 pt-2">
                  <Header 
                    user={USER} 
                    onSearch={handleSearch} 
                    isSearching={isSearching}
                    onOpenMenu={() => setMobileMenuOpen(true)}
                    onLogout={handleLogout}
                  />
                  
                  {isSearching ? (
                    <div className="animate-fade-in">
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Search Results</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                          {displayedMovies.map((movie) => (
                            <MovieCard 
                                key={movie.id} 
                                movie={movie} 
                                onClick={handleMovieClick}
                                isFavorite={isMovieFavorite(movie.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                          ))}
                      </div>
                      {displayedMovies.length === 0 && (
                          <div className="text-center py-20 text-gray-500">
                              <p>No results found.</p>
                          </div>
                      )}
                    </div>
                  ) : activeNavId === 'favorites' ? (
                    <FavoritesPage 
                        favorites={favorites} 
                        onPlay={handleMovieClick} 
                        onToggleFavorite={handleToggleFavorite}
                    />
                  ) : activeNavId === 'music-videos' ? (
                     <MusicVideoPage onPlay={handleMovieClick} />
                  ) : activeNavId === 'skits' ? (
                     <SkitsPage onPlay={handleMovieClick} />
                  ) : (
                    /* HOME DASHBOARD */
                    <>
                      <Hero movies={heroMovies} onPlay={handleMovieClick} />
                      <CategoryTabs
                        categories={CATEGORIES}
                        activeId={activeCategory}
                        onSelect={setActiveCategory}
                      />
                      <div className="pb-12 animate-fade-in space-y-2">
                         {[
                            { title: "Trending in Ghana Today", data: TRENDING_GHANA },
                            { title: "Ghanaian Classics We All Grew Up With", data: GHANAIAN_CLASSICS },
                            { title: "African Stories Worth Watching", data: AFRICAN_STORIES },
                            { title: "We Think You'll Love This", data: RECOMMENDED_FOR_YOU },
                         ].map((section) => (
                             <div key={section.title} className="mb-10 md:mb-14">
                                <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
                                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                    {section.title}
                                    </h2>
                                </div>
                                <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory scroll-smooth">
                                    {section.data.map((movie) => (
                                    <div key={movie.id} className="snap-start shrink-0">
                                        <MovieCard 
                                            movie={movie} 
                                            onClick={handleMovieClick}
                                            isFavorite={isMovieFavorite(movie.id)}
                                            onToggleFavorite={handleToggleFavorite}
                                        />
                                    </div>
                                    ))}
                                    <div className="w-1 shrink-0 md:hidden" />
                                </div>
                             </div>
                         ))}
                      </div>
                    </>
                  )}
              </div>
          </div>
      </main>
    </div>
  );
};

export default App;
