export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
  tags: string[];
  uploadDate: string;
  views: number;
  rating: number;
  author: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Movies, TV shows, and entertainment content',
    icon: '🎬',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'educational',
    name: 'Educational',
    description: 'Learning and educational videos',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Music videos and performances',
    icon: '🎵',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Sports highlights and content',
    icon: '⚽',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech reviews and tutorials',
    icon: '💻',
    color: 'from-gray-500 to-slate-500'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Gaming content and walkthroughs',
    icon: '🎮',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Lifestyle and wellness content',
    icon: '🌿',
    color: 'from-teal-500 to-green-500'
  },
  {
    id: 'documentary',
    name: 'Documentary',
    description: 'Documentaries and factual content',
    icon: '📽️',
    color: 'from-yellow-500 to-orange-500'
  }
];

export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Epic Mountain Adventure Documentary',
    description: 'Join us on an incredible journey through the world\'s most spectacular mountain ranges. Experience breathtaking landscapes and challenging expeditions.',
    thumbnail: 'https://placehold.co/1280x720?text=Epic+Mountain+Adventure+Documentary+with+stunning+alpine+landscapes',
    videoUrl: '/videos/sample1.mp4',
    duration: '45:32',
    category: 'documentary',
    tags: ['nature', 'adventure', 'mountains', 'travel', 'exploration'],
    uploadDate: '2024-01-15',
    views: 125000,
    rating: 4.8,
    author: 'Adventure Productions',
    featured: true
  },
  {
    id: '2',
    title: 'Advanced JavaScript Techniques',
    description: 'Master advanced JavaScript concepts with practical examples. Learn about closures, async/await, and modern ES6+ features.',
    thumbnail: 'https://placehold.co/1280x720?text=Advanced+JavaScript+Programming+Tutorial+with+code+examples',
    videoUrl: '/videos/sample2.mp4',
    duration: '28:15',
    category: 'educational',
    tags: ['javascript', 'programming', 'web development', 'tutorial', 'coding'],
    uploadDate: '2024-01-10',
    views: 89000,
    rating: 4.6,
    author: 'CodeMaster Academy'
  },
  {
    id: '3',
    title: 'Synthwave Music Mix 2024',
    description: 'The ultimate synthwave and retrowave music compilation. Perfect background music for coding, studying, or relaxing.',
    thumbnail: 'https://placehold.co/1280x720?text=Synthwave+Retrowave+Music+Mix+with+neon+cityscape+aesthetics',
    videoUrl: '/videos/sample3.mp4',
    duration: '1:12:45',
    category: 'music',
    tags: ['synthwave', 'retrowave', 'electronic', 'ambient', 'mix'],
    uploadDate: '2024-01-08',
    views: 234000,
    rating: 4.9,
    author: 'RetroBeats Studio',
    featured: true
  },
  {
    id: '4',
    title: 'Championship Football Highlights',
    description: 'The best moments from this season\'s championship matches. Incredible goals, saves, and game-changing plays.',
    thumbnail: 'https://placehold.co/1280x720?text=Championship+Football+Soccer+Match+Highlights+Action+Shots',
    videoUrl: '/videos/sample4.mp4',
    duration: '15:30',
    category: 'sports',
    tags: ['football', 'soccer', 'highlights', 'championship', 'sports'],
    uploadDate: '2024-01-05',
    views: 456000,
    rating: 4.7,
    author: 'Sports Central'
  },
  {
    id: '5',
    title: 'Next.js 15 Complete Guide',
    description: 'Everything you need to know about Next.js 15. From setup to deployment, covering all the latest features and best practices.',
    thumbnail: 'https://placehold.co/1280x720?text=Next.js+React+Web+Development+Tutorial+Complete+Guide',
    videoUrl: '/videos/sample5.mp4',
    duration: '52:18',
    category: 'technology',
    tags: ['nextjs', 'react', 'web development', 'tutorial', 'frontend'],
    uploadDate: '2024-01-03',
    views: 178000,
    rating: 4.8,
    author: 'WebDev Pro'
  },
  {
    id: '6',
    title: 'Epic RPG Game Walkthrough',
    description: 'Complete walkthrough of the latest fantasy RPG. Tips, strategies, and hidden secrets revealed.',
    thumbnail: 'https://placehold.co/1280x720?text=Fantasy+RPG+Game+Walkthrough+Medieval+Adventure+Gaming',
    videoUrl: '/videos/sample6.mp4',
    duration: '1:35:22',
    category: 'gaming',
    tags: ['rpg', 'gaming', 'walkthrough', 'fantasy', 'strategy'],
    uploadDate: '2024-01-01',
    views: 312000,
    rating: 4.5,
    author: 'GameGuide Masters'
  },
  {
    id: '7',
    title: 'Minimalist Home Design Ideas',
    description: 'Transform your living space with these stunning minimalist design concepts. Simple, elegant, and functional.',
    thumbnail: 'https://placehold.co/1280x720?text=Minimalist+Modern+Home+Interior+Design+Clean+Aesthetic',
    videoUrl: '/videos/sample7.mp4',
    duration: '22:40',
    category: 'lifestyle',
    tags: ['design', 'interior', 'minimalist', 'home', 'lifestyle'],
    uploadDate: '2023-12-28',
    views: 98000,
    rating: 4.4,
    author: 'Design Studio'
  },
  {
    id: '8',
    title: 'Blockbuster Movie Trailer',
    description: 'The most anticipated action thriller of the year. Get ready for an adrenaline-pumping cinematic experience.',
    thumbnail: 'https://placehold.co/1280x720?text=Action+Movie+Thriller+Blockbuster+Cinema+Entertainment',
    videoUrl: '/videos/sample8.mp4',
    duration: '2:45',
    category: 'entertainment',
    tags: ['movie', 'trailer', 'action', 'thriller', 'cinema'],
    uploadDate: '2023-12-25',
    views: 1200000,
    rating: 4.9,
    author: 'Epic Films',
    featured: true
  },
  {
    id: '9',
    title: 'Ocean Life Documentary',
    description: 'Explore the mysterious depths of our oceans. Discover incredible marine life and underwater ecosystems.',
    thumbnail: 'https://placehold.co/1280x720?text=Ocean+Marine+Life+Documentary+Underwater+Sea+Creatures',
    videoUrl: '/videos/sample9.mp4',
    duration: '38:55',
    category: 'documentary',
    tags: ['ocean', 'marine life', 'nature', 'documentary', 'underwater'],
    uploadDate: '2023-12-20',
    views: 167000,
    rating: 4.7,
    author: 'Nature Films'
  },
  {
    id: '10',
    title: 'Classical Piano Masterpieces',
    description: 'Beautiful classical piano performances of timeless masterpieces. Perfect for relaxation and concentration.',
    thumbnail: 'https://placehold.co/1280x720?text=Classical+Piano+Music+Concert+Hall+Elegant+Performance',
    videoUrl: '/videos/sample10.mp4',
    duration: '1:05:30',
    category: 'music',
    tags: ['classical', 'piano', 'music', 'concert', 'instrumental'],
    uploadDate: '2023-12-18',
    views: 203000,
    rating: 4.6,
    author: 'Classical Music Hub'
  }
];

export const getAllVideos = (): Video[] => sampleVideos;

export const getFeaturedVideos = (): Video[] => 
  sampleVideos.filter(video => video.featured);

export const getVideosByCategory = (categoryId: string): Video[] =>
  sampleVideos.filter(video => video.category === categoryId);

export const getVideoById = (id: string): Video | undefined =>
  sampleVideos.find(video => video.id === id);

export const getPopularTags = (): string[] => {
  const tagCounts = new Map<string, number>();
  
  sampleVideos.forEach(video => {
    video.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([tag]) => tag);
};