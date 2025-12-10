 import { Home, Heart,  TrendingUp, Music, HelpCircle,  Video } from 'lucide-react';
import type { NavItem, Movie, Category, User } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, active: true },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'skits', label: 'Ghanaian Skits', icon: Video },
  { id: 'music-videos', label: 'Music Videos', icon: Music },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

export const CONTINUE_WATCHING: Movie[] = [
  {
    id: '1',
    title: 'Arcane: League of Legends',
    image: 'https://picsum.photos/seed/arcane/300/180',
    episodes: 'S1:E6',
    match: 55,
    progress: 55,
    fullSynopsis: 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.',
  },
  {
    id: '2',
    title: 'Blade Runner 2049',
    image: 'https://picsum.photos/seed/blade/300/180',
    duration: '1h 25min',
    match: 55,
    progress: 70,
  },
  {
    id: '3',
    title: 'The Martian',
    image: 'https://picsum.photos/seed/martian/300/180',
    duration: '38min',
    match: 34,
    progress: 30,
  },
];

export const HERO_MOVIES: Movie[] = [
  {
    id: 'hero-ghana',
    title: 'A Country Called Ghana',
    image: 'https://images.unsplash.com/photo-1535683577123-74b868962035?q=80&w=2600&auto=format&fit=crop',
    duration: '2h 15min',
    genre: ['Comedy', 'Culture', '2024'],
    ageRating: 'PG',
    summary: 'A hilarious yet poignant look at the cultural clashes and unity within the nation. Tradition meets modernity.',
    fullSynopsis: 'When a group of western volunteers arrive in a remote Ghanaian village, their attempts to "modernize" the locals lead to a series of uproarious misunderstandings and cultural clashes. "A Country Called Ghana" explores the beauty of tradition and the comedy of errors that ensues when different worlds collide.',
    year: '2024',
    tagline: 'When cultures collide, comedy ensues.',
    cast: [
      { name: 'Lil Win', role: 'Lead' },
      { name: 'Ramsey Nouah', role: 'Guest Star' }
    ],
    director: 'Frank Fiifi Gharbin'
  },
  {
    id: 'hero-sidechick',
    title: 'Side Chick',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2600&auto=format&fit=crop',
    duration: '1h 50min',
    genre: ['Drama', 'Romance', '2023'],
    ageRating: '16+',
    summary: 'Relationships get complicated when secrets start to spill. A gripping tale of love, betrayal, and consequences.',
    fullSynopsis: 'Three women, fed up with their partners\' infidelity, decide to take matters into their own hands. But their quest for revenge leads them down a path of unexpected twists, turning their lives upside down in this dramatic thriller.',
    year: '2023',
    tagline: 'Every secret has a price.',
    director: 'Jones Agyemang',
    cast: [
      { name: 'Nana Ama McBrown', role: 'Lead' },
      { name: 'Sika Osei', role: 'Lead' },
      { name: 'Lydia Forson', role: 'Lead' }
    ]
  },
  {
    id: 'hero-ghana-here',
    title: 'Ghana Here I Am',
    image: 'https://images.unsplash.com/photo-1543333995-a78aea22d505?q=80&w=2600&auto=format&fit=crop',
    duration: '1h 45min',
    genre: ['Documentary', 'Travel', '2023'],
    ageRating: 'PG',
    summary: 'A compelling documentary following the journey of diasporans returning to their roots.',
    fullSynopsis: 'This inspiring film captures the emotional and transformative journey of individuals from the African diaspora as they travel to Ghana for the first time. It explores themes of identity, belonging, and the vibrant culture of modern Ghana.',
    year: '2023',
    tagline: 'A journey of discovery and return.',
    director: 'Unknown'
  },
  {
    id: 'hero-royal-rules',
    title: 'Royal Rules of Ohio',
    image: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?q=80&w=2600&auto=format&fit=crop',
    duration: '45min',
    genre: ['Reality', 'Documentary', '2024'],
    ageRating: '16+',
    summary: 'The daughters of a Ghanaian king navigate life in Ohio.',
    fullSynopsis: 'The Agyekum sisters live lavish lives in Columbus, Ohio, as the daughters of a wealthy Ghanaian king. But behind the glitz and glamour, they face the pressure of living up to their royal lineage while balancing relationships, careers, and family expectations in America.',
    year: '2024',
    tagline: 'Three sisters. Two cultures. One royal legacy.'
  }
];

export const CATEGORIES: Category[] = [
  { id: 'trending', label: 'Trending' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'action', label: 'Action' },
  { id: 'comedy', label: 'Comedy' },
  { id: 'crime', label: 'Crime' },
  { id: 'drama', label: 'Drama' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'horror', label: 'Horror' },
];

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Lilo & Stitch',
    year: '2025',
    rating: 7.2,
    image: 'https://picsum.photos/seed/stitch/300/450',
  },
  {
    id: 'm2',
    title: 'Straume',
    year: '2024',
    rating: 7.9,
    image: 'https://picsum.photos/seed/straume/300/450',
  },
  {
    id: 'm3',
    title: 'Mission: Impossible',
    year: '2025',
    rating: 8.2,
    image: 'https://picsum.photos/seed/mission/300/450',
  },
  {
    id: 'm4',
    title: 'Mufasa: The Lion King',
    year: '2024',
    rating: 6.6,
    image: 'https://picsum.photos/seed/mufasa/300/450',
  },
  {
    id: 'm5',
    title: 'Dune: Part Two',
    year: '2024',
    rating: 8.5,
    image: 'https://picsum.photos/seed/dune/300/450',
  },
  {
    id: 'm6',
    title: 'Shogun',
    year: '2024',
    rating: 9.0,
    image: 'https://picsum.photos/seed/shogun/300/450',
  },
];

export const USER: User = {
  name: 'Dr. Frank',
  avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=256&auto=format&fit=crop',
  status: 'Premium',
};

// --- New Categories ---

export const LOGIN_SLIDER_MOVIES: Movie[] = [
  { id: 'lm1', title: 'Azali', year: '2018', image: 'https://picsum.photos/seed/azali/300/450' },
  { id: 'lm2', title: 'Keteke', year: '2017', image: 'https://picsum.photos/seed/keteke/300/450' },
  { id: 'lm3', title: 'My Very Ghanaian Wedding', year: '2024', image: 'https://picsum.photos/seed/ghwedding/300/450' },
  { id: 'lm4', title: 'Azumah', year: '2018', image: 'https://picsum.photos/seed/azumah/300/450' },
  { id: 'lm5', title: 'Gold Coast Lounge', year: '2020', image: 'https://picsum.photos/seed/goldcoast/300/450' },
  { id: 'lm6', title: 'Beasts of No Nation', year: '2015', image: 'https://picsum.photos/seed/beasts/300/450' },
  { id: 'lm7', title: 'The African Doctor', year: '2016', image: 'https://picsum.photos/seed/africandoctor/300/450' },
  { id: 'lm8', title: 'African Storm: A Continent Under Influence', year: '2017', image: 'https://picsum.photos/seed/africanstorm/300/450' },
];

export const TRENDING_GHANA: Movie[] = [
  { 
    id: 'tg1', 
    title: 'Aloevera', 
    year: '2024', 
    rating: 9.2, 
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
    summary: 'A story of two communities divided by a color line, finding love against all odds.'
  },
  { 
    id: 'tg2', 
    title: 'Azali', 
    year: '2024', 
    rating: 8.8, 
    image: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=600&auto=format&fit=crop',
    summary: 'A young girl flees an arranged marriage only to find herself struggling in the slums of Accra.' 
  },
  { 
    id: 'tg3', 
    title: 'The Burial of Kojo', 
    year: '2023', 
    rating: 9.5, 
    image: 'https://images.unsplash.com/photo-1628518928688-662586716a50?q=80&w=600&auto=format&fit=crop',
    summary: 'A man is trapped in a mine shaft by his vengeful brother while his daughter travels a magical land to rescue him.' 
  },
  { 
    id: 'tg4', 
    title: 'Keteke', 
    year: '2023', 
    rating: 8.9, 
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=600&auto=format&fit=crop',
    summary: 'A couple desperate to get to the city for their child\'s birth miss their train and get stranded in the middle of nowhere.'
  },
  { 
    id: 'tg5', 
    title: 'Sidechic Gang', 
    year: '2024', 
    rating: 8.5, 
    image: 'https://images.unsplash.com/photo-1571217628867-0c7da794de4f?q=80&w=600&auto=format&fit=crop',
    summary: 'Three friends quit their jobs to expose cheating husbands for a living.'
  },
  { 
    id: 'tg6', 
    title: 'Gold Coast Lounge', 
    year: '2023', 
    rating: 8.7, 
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=600&auto=format&fit=crop',
    summary: 'A crime family has to clean up their act before the government shuts down their lounge.'
  },
  { 
    id: 'tg7', 
    title: 'Terminator 3 (Local)', 
    year: '2024', 
    rating: 8.1, 
    image: 'https://images.unsplash.com/photo-1605218427306-022ba8c69c3a?q=80&w=600&auto=format&fit=crop',
    summary: 'The local adaptation of the classic action thriller, packed with Kumawood humor and effects.'
  },
];

export const GHANAIAN_CLASSICS: Movie[] = [
  { id: 'gc1', title: 'I Told You So', year: '1970', rating: 9.8, image: 'https://picsum.photos/seed/itoldyouso/300/450' },
  { id: 'gc2', title: 'Kukurantumi', year: '1983', rating: 9.5, image: 'https://picsum.photos/seed/kukurantumi/300/450' },
  { id: 'gc3', title: 'Heritage Africa', year: '1989', rating: 9.4, image: 'https://picsum.photos/seed/heritage/300/450' },
  { id: 'gc4', title: 'Deadly Voyage', year: '1996', rating: 9.2, image: 'https://picsum.photos/seed/deadly/300/450' },
  { id: 'gc5', title: 'Sankofa', year: '1993', rating: 9.6, image: 'https://picsum.photos/seed/sankofa/300/450' },
  { id: 'gc6', title: 'Love Brewed in African Pot', year: '1980', rating: 9.3, image: 'https://picsum.photos/seed/lovebrewed/300/450' },
];

export const AFRICAN_STORIES: Movie[] = [
  { id: 'as1', title: 'The Wedding Party', year: '2016', rating: 8.9, image: 'https://picsum.photos/seed/weddingparty/300/450' },
  { id: 'as2', title: 'Tsotsi', year: '2005', rating: 9.1, image: 'https://picsum.photos/seed/tsotsi/300/450' },
  { id: 'as3', title: 'Queen Sono', year: '2020', rating: 8.7, image: 'https://picsum.photos/seed/queensono/300/450' },
  { id: 'as4', title: 'Rafiki', year: '2018', rating: 8.6, image: 'https://picsum.photos/seed/rafiki/300/450' },
  { id: 'as5', title: 'Atlantics', year: '2019', rating: 9.0, image: 'https://picsum.photos/seed/atlantics/300/450' },
  { id: 'as6', title: 'Cook Off', year: '2017', rating: 8.4, image: 'https://picsum.photos/seed/cookoff/300/450' },
];

export const RECOMMENDED_FOR_YOU: Movie[] = [
  { id: 'rec1', title: 'Black Panther', year: '2018', rating: 9.5, image: 'https://picsum.photos/seed/wakanda/300/450' },
  { id: 'rec2', title: 'The Woman King', year: '2022', rating: 9.2, image: 'https://picsum.photos/seed/womanking/300/450' },
  { id: 'rec3', title: 'Beasts of No Nation', year: '2015', rating: 9.3, image: 'https://picsum.photos/seed/beasts/300/450' },
  { id: 'rec4', title: 'Coming to America', year: '1988', rating: 8.8, image: 'https://picsum.photos/seed/comingtoamerica/300/450' },
  { id: 'rec5', title: 'Hotel Rwanda', year: '2004', rating: 9.4, image: 'https://picsum.photos/seed/rwanda/300/450' },
];

// --- MUSIC VIDEO DATA ---

export const MUSIC_HERO: Movie[] = [
  {
    id: 'mv-hero-1',
    title: 'Kwaku The Traveller',
    artist: 'Black Sherif',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2600&auto=format&fit=crop',
    duration: '3:45',
    genre: ['Hip Hop', 'Drill', '2023'],
    ageRating: 'PG',
    summary: 'The global smash hit that redefined the Ghanaian drill scene. Black Sherif delivers a powerful performance about life\'s journey.',
    fullSynopsis: 'Black Sherif performs his chart-topping single "Kwaku The Traveller". The video depicts his struggles and eventual rise to fame, resonating with youth across the continent.',
    year: '2023',
    views: '15M views',
    isExplicit: true,
    label: 'Blacko Empire',
    artistBio: 'Mohammed Ismail Sherif, known professionally as Black Sherif, is a Ghanaian singer and rapper. He gained popularity in 2021 with his song "First Sermon".',
    artistImage: 'https://picsum.photos/seed/blacko/200/200',
    lyrics: `Kwaku Killa, Kweku the traveler
I pull up in a rari, I pull up in a lambo
See the boy is active, see the boy is active
I say, Kweku Killa, Kweku the traveler...

(Verse 1)
I remember when I was young, I used to dream big
Now I'm living the dream, I'm doing it big
From the streets of Konongo to the world stage
I'm writing my story, turning a new page...`,
    contentType: 'music',
    youtubeId: 'e-gC-q1e2-Q'
  },
  {
    id: 'mv-hero-2',
    title: 'Last Last',
    artist: 'Burna Boy',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2600&auto=format&fit=crop',
    duration: '3:10',
    genre: ['Afrobeats', 'Pop', '2022'],
    ageRating: 'PG',
    summary: 'The African Giant brings the heat with this summer anthem. A visual spectacle of heartbreak and celebration.',
    year: '2022',
    views: '250M views',
    label: 'Atlantic Records',
    artistBio: 'Damini Ebunoluwa Ogulu, known professionally as Burna Boy, is a Nigerian singer, songwriter and record producer.',
    lyrics: `E don cast, last last, na everybody go chop breakfast...`,
    contentType: 'music',
    youtubeId: '421w1j87fHs'
  }
];

export const MUSIC_TRENDING: Movie[] = [
  { 
    id: 'mt1', title: 'Terminator', artist: 'King Promise', year: '2023', duration: '3:20', image: 'https://picsum.photos/seed/terminator/300/450',
    views: '22M views', label: 'Legacy Life',
    lyrics: "I'm a terminator, I'm a terminator...",
    contentType: 'music',
    youtubeId: 'K7o7e7k7k7k' // Placeholder
  },
  { 
    id: 'mt2', title: 'Sugarcane Remix', artist: 'Camidoh ft. King Promise', year: '2023', duration: '4:10', image: 'https://picsum.photos/seed/sugarcane/300/450',
    views: '100M views', label: 'Grind Don\'t Stop',
    contentType: 'music',
    youtubeId: '888888888'
  },
  { 
    id: 'mt3', title: 'Into the Future', artist: 'Stonebwoy', year: '2023', duration: '3:30', image: 'https://picsum.photos/seed/stonebwoy/300/450',
    views: '12M views', label: 'Burniton Music',
    contentType: 'music',
    youtubeId: '777777777'
  },
  { 
    id: 'mt4', title: 'Country Side', artist: 'Sarkodie ft. Black Sherif', year: '2023', duration: '3:45', image: 'https://picsum.photos/seed/sarkodie/300/450',
    views: '18M views', label: 'SarkCess Music',
    contentType: 'music',
    youtubeId: '666666666'
  },
  { 
    id: 'mt5', title: 'Soweto', artist: 'Victony', year: '2023', duration: '2:55', image: 'https://picsum.photos/seed/soweto/300/450',
    views: '45M views',
    contentType: 'music',
    youtubeId: '555555555'
  },
];

export const MUSIC_AFROBEATS: Movie[] = [
  { id: 'af1', title: 'Essence', artist: 'Wizkid ft. Tems', year: '2021', duration: '4:00', image: 'https://picsum.photos/seed/essence/300/450', views: '150M views', contentType: 'music', youtubeId: 'jipQpjUA_o8' },
  { id: 'af2', title: 'Calm Down', artist: 'Rema', year: '2022', duration: '3:40', image: 'https://picsum.photos/seed/rema/300/450', views: '600M views', contentType: 'music', youtubeId: 'LPjOe7w9t8' },
  { id: 'af3', title: 'Unavailable', artist: 'Davido', year: '2023', duration: '3:15', image: 'https://picsum.photos/seed/davido/300/450', views: '80M views', contentType: 'music', youtubeId: 'osKk7j77j7j' },
  { id: 'af4', title: 'Rush', artist: 'Ayra Starr', year: '2022', duration: '3:05', image: 'https://picsum.photos/seed/ayrastarr/300/450', views: '200M views', contentType: 'music', youtubeId: 'cr4j9k9k9k' },
];

export const MUSIC_GOSPEL: Movie[] = [
  { id: 'mg1', title: 'Way Maker', artist: 'Sinach', year: '2019', duration: '5:00', image: 'https://picsum.photos/seed/waymaker/300/450', views: '200M views', contentType: 'music', youtubeId: 'n4XWfwLHeLM' },
  { id: 'mg2', title: 'Waye Me Yie', artist: 'Piesie Esther', year: '2022', duration: '4:30', image: 'https://picsum.photos/seed/piesie/300/450', views: '5M views', contentType: 'music', youtubeId: 'PiesieId1' },
  { id: 'mg3', title: 'Olorun Agbaye', artist: 'Nathaniel Bassey', year: '2021', duration: '6:00', image: 'https://picsum.photos/seed/nathaniel/300/450', views: '10M views', contentType: 'music', youtubeId: 'NathanielId1' },
];

export const MUSIC_THROWBACK: Movie[] = [
  { id: 'tb1', title: 'Ahomka Womu', artist: 'VIP', year: '2003', duration: '4:00', image: 'https://picsum.photos/seed/vip/300/450', views: '2M views', contentType: 'music', youtubeId: 'VIPId1' },
  { id: 'tb2', title: 'Aben Wo Ha', artist: 'Daddy Lumba', year: '1999', duration: '5:00', image: 'https://picsum.photos/seed/daddylumba/300/450', views: '3M views', contentType: 'music', youtubeId: 'DLId1' },
  { id: 'tb3', title: 'Klu Blofo', artist: 'Buk Bak', year: '2004', duration: '3:50', image: 'https://picsum.photos/seed/bukbak/300/450', views: '1M views', contentType: 'music', youtubeId: 'BukBakId1' },
  { id: 'tb4', title: 'Iron Boy', artist: 'Amakye Dede', year: '1998', duration: '4:20', image: 'https://picsum.photos/seed/amakye/300/450', views: '4M views', contentType: 'music', youtubeId: 'AmakyeId1' },
];

// --- SKITS DATA ---
// Added contentType: 'skit'
export const SKITS_TRENDING: Movie[] = [
  { id: 'st1', title: 'The Barber Shop Wahala', artist: 'Dr. Likee', duration: '4:20', year: '2024', image: 'https://picsum.photos/seed/likee1/600/340', views: '500K views', contentType: 'skit', youtubeId: 'w2N9g0Z-1oQ' }, // Example Dr Likee ID
  { id: 'st2', title: 'Pay Day Confusion', artist: 'Kyekyeku', duration: '3:15', year: '2024', image: 'https://picsum.photos/seed/kyekyeku1/600/340', views: '250K views', contentType: 'skit', youtubeId: '5pXz-1oQ' }, // Example ID
  { id: 'st3', title: 'Date Rush Gone Wrong', artist: 'Made In Ghana', duration: '5:00', year: '2024', image: 'https://picsum.photos/seed/mgh1/600/340', views: '300K views', contentType: 'skit', youtubeId: 'x3Y1-2pW' }, // Example ID
  { id: 'st4', title: 'Akrobeto News', artist: 'Akrobeto', duration: '2:45', year: '2024', image: 'https://picsum.photos/seed/akrobeto1/600/340', views: '1M views', contentType: 'skit', youtubeId: 'Ewz1L8-3e4o' }, // Real News ID
  { id: 'st5', title: 'Village Champion', artist: 'Lil Win', duration: '6:30', year: '2024', image: 'https://picsum.photos/seed/lilwin1/600/340', views: '450K views', contentType: 'skit', youtubeId: 'u7I1-5qR' }, // Example ID
];

export const SKITS_LIKEE: Movie[] = [
  { id: 'sl1', title: 'Likee the Lecturer', artist: 'Dr. Likee', duration: '8:10', year: '2024', image: 'https://picsum.photos/seed/likee2/600/340', views: '800K views', contentType: 'skit', youtubeId: 'w2N9g0Z-1oQ' },
  { id: 'sl2', title: 'Taxi Driver', artist: 'Dr. Likee', duration: '5:45', year: '2023', image: 'https://picsum.photos/seed/likee3/600/340', views: '600K views', contentType: 'skit', youtubeId: 'w2N9g0Z-1oQ' },
  { id: 'sl3', title: 'Dubai Returnee', artist: 'Dr. Likee', duration: '4:50', year: '2023', image: 'https://picsum.photos/seed/likee4/600/340', views: '750K views', contentType: 'skit', youtubeId: 'w2N9g0Z-1oQ' },
];

export const SKITS_RELATIONSHIP: Movie[] = [
  { id: 'sr1', title: 'Side Chick Drama', artist: 'Kyekyeku & 39/40', duration: '3:30', year: '2024', image: 'https://picsum.photos/seed/rel1/600/340', views: '120K views', contentType: 'skit', youtubeId: 'KyekyekuId1' },
  { id: 'sr2', title: 'First Date Pressure', artist: 'Comedian Waris', duration: '2:15', year: '2024', image: 'https://picsum.photos/seed/rel2/600/340', views: '90K views', contentType: 'skit', youtubeId: 'WarisId1' },
  { id: 'sr3', title: 'Broken Heart', artist: 'Clemento Suarez', duration: '4:00', year: '2023', image: 'https://picsum.photos/seed/rel3/600/340', views: '200K views', contentType: 'skit', youtubeId: 'ClementoId1' },
];

export const SKITS_OFFICE: Movie[] = [
  { id: 'so1', title: 'Interview Prank', artist: 'Jacinta', duration: '3:00', year: '2024', image: 'https://picsum.photos/seed/off1/600/340', views: '50K views', contentType: 'skit', youtubeId: 'JacintaId1' },
  { id: 'so2', title: 'Boss is Coming', artist: 'OB Amponsah', duration: '1:50', year: '2024', image: 'https://picsum.photos/seed/off2/600/340', views: '70K views', contentType: 'skit', youtubeId: 'OBId1' },
  { id: 'so3', title: 'Salary Advance', artist: 'Foster Romanus', duration: '5:10', year: '2023', image: 'https://picsum.photos/seed/off3/600/340', views: '110K views', contentType: 'skit', youtubeId: 'FosterId1' },
];

export const SKITS_CHURCH: Movie[] = [
  { id: 'sc1', title: 'Collection Time', artist: 'Agya Koo', duration: '6:15', year: '2022', image: 'https://picsum.photos/seed/church1/600/340', views: '300K views', contentType: 'skit', youtubeId: 'AgyaKooId1' },
  { id: 'sc2', title: 'False Prophet', artist: 'Big Akwes', duration: '7:00', year: '2023', image: 'https://picsum.photos/seed/church2/600/340', views: '150K views', contentType: 'skit', youtubeId: 'BigAkwesId1' },
  { id: 'sc3', title: 'Sunday School', artist: 'Kwadwo Sheldon', duration: '2:30', year: '2024', image: 'https://picsum.photos/seed/church3/600/340', views: '500K views', contentType: 'skit', youtubeId: 'SheldonId1' },
];
