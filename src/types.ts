import type { ElementType } from 'react';

export interface CastMember {
  name: string;
  role: string;
  image?: string;
}

export interface Movie {
  id: string;
  title: string;
  image: string;
  year?: string;
  rating?: number;
  progress?: number; // 0-100 for continue watching
  episodes?: string;
  match?: number; // Match percentage
  duration?: string;
  genre?: string[];
  ageRating?: string;
  summary?: string;
  tagline?: string; // New field for Hero Sliders
  artist?: string; // New field for Music Videos
  contentType?: 'movie' | 'series' | 'music' | 'skit'; // Explicit content type
  youtubeId?: string; // YouTube Video ID for Skits/Music
  
  // Extended Details
  fullSynopsis?: string;
  director?: string;
  cast?: CastMember[];
  languages?: string[];
  subtitles?: string[];

  // Music Specific
  lyrics?: string;
  artistBio?: string;
  artistImage?: string;
  label?: string;
  views?: string;
  isExplicit?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: ElementType;
  active?: boolean;
}

export interface User {
  name: string;
  avatar: string;
  status: 'Premium' | 'Free';
}

export interface Category {
  id: string;
  label: string;  
  name: string;
  icon?: string;
}