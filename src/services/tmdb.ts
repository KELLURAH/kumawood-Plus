interface TmdbResult {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string; // For movies
  name?: string;  // For TV shows
  release_date?: string;
  first_air_date?: string;
}

interface TmdbSearchResponse {
  results: TmdbResult[];
}

interface PosterCache {
  [key: string]: string | null; // Key is "title-year-type", value is URL
}

const CACHE_KEY = 'kumawood_poster_cache_v6'; // Bumped version
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280'; // Higher res for Hero

// 2. Title Normalization Map
const TITLE_NORMALIZATION_MAP: Record<string, string> = {
  "Aloevera": "Aloe Vera",
  "The Burial of Kojo": "The Burial of Kojo",
  "A Country Called Ghana": "A Country Called Ghana",
};

/**
 * Normalizes a movie title to match TMDb entries better.
 */
const normalizeTitle = (title: string): string => {
  const trimmed = title.trim();
  return TITLE_NORMALIZATION_MAP[trimmed] ?? trimmed;
};

// Helper to get API key from various env configurations safely
const getApiKey = (): string => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TMDB_API_KEY) {
       // @ts-ignore
       return import.meta.env.VITE_TMDB_API_KEY;
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env) {
      const envKey = process.env.REACT_APP_TMDB_API_KEY || process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;
      if (envKey) return envKey;
    }
  } catch (e) {}
  
  return '73d3d76e751d3c184dfac7790fd02267';
};

const getCache = (): PosterCache => {
  try {
    const item = localStorage.getItem(CACHE_KEY);
    return item ? JSON.parse(item) : {};
  } catch {
    return {};
  }
};

const saveToCache = (cacheKey: string, url: string | null) => {
  try {
    const cache = getCache();
    cache[cacheKey] = url;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to save to cache', e);
  }
};

/**
 * Generic fetcher for Poster or Backdrop
 */
const fetchTmdbImage = async (originalTitle: string, type: 'poster' | 'backdrop', year?: string, fallbackToPoster: boolean = false): Promise<string | null> => {
  const apiKey = getApiKey();
  const title = normalizeTitle(originalTitle);

  const safeTitle = title.toLowerCase().trim();
  const cacheKey = `${safeTitle}-${year || 'any'}-${type}`;
  const cache = getCache();

  if (cacheKey in cache) {
    return cache[cacheKey];
  }

  try {
    const query = encodeURIComponent(title);
    const movieUrl = `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${query}`;
    const movieRes = await fetch(movieUrl);

    let bestResult: TmdbResult | undefined;

    if (movieRes.ok) {
      const movieData: TmdbSearchResponse = await movieRes.json();
      bestResult = movieData.results?.find(r => type === 'poster' ? r.poster_path : r.backdrop_path);
    }

    if (!bestResult) {
      const tvUrl = `${TMDB_BASE_URL}/search/tv?api_key=${apiKey}&query=${query}`;
      const tvRes = await fetch(tvUrl);
      if (tvRes.ok) {
        const tvData: TmdbSearchResponse = await tvRes.json();
        bestResult = tvData.results?.find(r => type === 'poster' ? r.poster_path : r.backdrop_path);
      }
    }

    if (bestResult) {
      const path = type === 'poster' ? bestResult.poster_path : bestResult.backdrop_path;
      if (path) {
        const baseUrl = type === 'poster' ? IMAGE_BASE_URL : BACKDROP_BASE_URL;
        const fullUrl = `${baseUrl}${path}`;
        saveToCache(cacheKey, fullUrl);
        return fullUrl;
      }
    }

    if (fallbackToPoster && type === 'backdrop') {
      return fetchTmdbImage(originalTitle, 'poster', year);
    }

    saveToCache(cacheKey, null);
    return null;

  } catch (error) {
    console.error(`[TMDb] Error fetching ${type} for "${title}":`, error);
    return null;
  }
};

export const fetchMoviePoster = (title: string, year?: string) => fetchTmdbImage(title, 'poster', year);
export const fetchMovieBackdrop = (title: string, year?: string) => fetchTmdbImage(title, 'backdrop', year, true);
