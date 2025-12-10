
export type HeroSlide = {
  id: string;
  movieTitle: string;
  tagline: string;
  description: string;
  imageUrl: string;
  movieId?: string | number;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    movieTitle: 'A Country Called Ghana',
    tagline: 'When cultures collide, comedy ensues.',
    description: 'A hilarious yet poignant look at the cultural clashes and unity within the nation when western volunteers arrive in a remote village.',
    imageUrl: 'https://images.unsplash.com/photo-1535683577123-74b868962035?q=80&w=2600&auto=format&fit=crop',
    movieId: 'hero-ghana'
  },
  {
    id: 'slide-4',
    movieTitle: 'Royal Rules of Ohio',
    tagline: 'Three sisters. Two cultures. One royal legacy.',
    description: 'Follow the lives of three Ghanaian sisters living in Columbus, Ohio, as they navigate their royal heritage and modern American lives.',
    imageUrl: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?q=80&w=2600&auto=format&fit=crop',
    movieId: 'hero-royal-rules'
  },
  {
    id: 'slide-2',
    movieTitle: 'Side Chick',
    tagline: 'Every secret has a price.',
    description: 'Three women, fed up with their partners\' infidelity, decide to take matters into their own hands in this gripping tale of love and betrayal.',
    imageUrl: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2600&auto=format&fit=crop',
    movieId: 'hero-sidechick'
  },
  {
    id: 'slide-3',
    movieTitle: 'Ghana Here I Am',
    tagline: 'A journey of discovery and return.',
    description: 'A compelling documentary following the journey of diasporans returning to their roots, exploring the beauty, challenges, and spirit of modern Ghana.',
    imageUrl: 'https://images.unsplash.com/photo-1543333995-a78aea22d505?q=80&w=2600&auto=format&fit=crop',
    movieId: 'hero-ghana-here'
  }
];