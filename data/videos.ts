export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  downloadUrl: string;
  poster: string;
  description: string;
  category: string;
  year: number;
  duration: string;
  rating: number;
  genre: string[];
  language: string;
  quality: string;
  featured?: boolean;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "The Dark Knight Returns",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
    description: "When Gotham's most dangerous criminals are released, an aging Bruce Wayne must don the cape once more to save his city from chaos and destruction.",
    category: "Hollywood",
    year: 2024,
    duration: "2h 35m",
    rating: 8.9,
    genre: ["Action", "Drama", "Thriller"],
    language: "English",
    quality: "HD",
    featured: true
  },
  {
    id: "2",
    title: "Pathaan: The Spy",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    description: "A fearless Indian spy embarks on a dangerous mission across continents to protect his nation from a deadly terrorist organization.",
    category: "Bollywood",
    year: 2024,
    duration: "2h 26m",
    rating: 7.8,
    genre: ["Action", "Thriller"],
    language: "Hindi",
    quality: "HD",
    featured: true
  },
  {
    id: "3",
    title: "RRR: Rise Roar Revolt",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    description: "A fictional tale of two legendary revolutionaries and their journey far away from home during the British Raj in India.",
    category: "South Indian",
    year: 2023,
    duration: "3h 7m",
    rating: 8.5,
    genre: ["Action", "Drama"],
    language: "Telugu",
    quality: "4K",
    featured: true
  },
  {
    id: "4",
    title: "Inception: The Dream",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    description: "A skilled thief who enters people's dreams to steal their secrets is offered a chance at redemption through an impossible task.",
    category: "Hollywood",
    year: 2024,
    duration: "2h 28m",
    rating: 9.1,
    genre: ["Sci-Fi", "Action", "Thriller"],
    language: "English",
    quality: "4K",
    featured: true
  },
  {
    id: "5",
    title: "Pushpa 2: The Rule",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=400&h=600&fit=crop",
    description: "The rise of a laborer in the smuggling syndicate continues as he battles powerful enemies and protects his territory.",
    category: "South Indian",
    year: 2024,
    duration: "2h 58m",
    rating: 8.2,
    genre: ["Action", "Drama"],
    language: "Telugu",
    quality: "HD"
  },
  {
    id: "6",
    title: "The Comedy Night",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    description: "A hilarious journey of a stand-up comedian who discovers that making people laugh is the key to his own happiness.",
    category: "Comedy",
    year: 2024,
    duration: "1h 52m",
    rating: 7.5,
    genre: ["Comedy"],
    language: "English",
    quality: "HD"
  },
  {
    id: "7",
    title: "Jawan: The Guardian",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    description: "A prison warden recruits inmates to execute a vigilante plan to expose corrupt politicians who have destroyed their lives.",
    category: "Bollywood",
    year: 2024,
    duration: "2h 49m",
    rating: 8.1,
    genre: ["Action", "Thriller", "Drama"],
    language: "Hindi",
    quality: "4K"
  },
  {
    id: "8",
    title: "Avengers: Secret Wars",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    description: "Earth's mightiest heroes unite across the multiverse to face the greatest threat the cosmos has ever known.",
    category: "Hollywood",
    year: 2025,
    duration: "3h 2m",
    rating: 9.0,
    genre: ["Action", "Sci-Fi", "Adventure"],
    language: "English",
    quality: "4K"
  },
  {
    id: "9",
    title: "KGF Chapter 3",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    description: "The saga of Rocky continues as he faces new enemies and old allies in his quest for ultimate power.",
    category: "South Indian",
    year: 2025,
    duration: "2h 45m",
    rating: 8.7,
    genre: ["Action", "Drama", "Thriller"],
    language: "Kannada",
    quality: "4K"
  },
  {
    id: "10",
    title: "The Last Laugh",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    description: "Two retired comedians escape their nursing home to chase their dreams of performing one last time in Las Vegas.",
    category: "Comedy",
    year: 2024,
    duration: "1h 38m",
    rating: 7.2,
    genre: ["Comedy", "Drama"],
    language: "English",
    quality: "HD"
  },
  {
    id: "11",
    title: "Dunki: The Migration",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=600&fit=crop",
    description: "A heartwarming story about a group of friends who take an unconventional route to immigrate to a foreign land.",
    category: "Bollywood",
    year: 2024,
    duration: "2h 41m",
    rating: 7.9,
    genre: ["Drama", "Comedy"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "12",
    title: "Dune: Messiah",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    description: "Paul Atreides must navigate the treacherous political landscape as ruler of the known universe while facing cosmic prophecies.",
    category: "Hollywood",
    year: 2025,
    duration: "2h 55m",
    rating: 8.8,
    genre: ["Sci-Fi", "Drama", "Adventure"],
    language: "English",
    quality: "4K"
  },
  {
    id: "13",
    title: "Salaar: Ceasefire",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1460881680093-7c8e5e1b5e04?w=400&h=600&fit=crop",
    description: "A violent man goes on a journey to save his childhood friend while battling a powerful crime syndicate.",
    category: "South Indian",
    year: 2024,
    duration: "2h 55m",
    rating: 8.0,
    genre: ["Action", "Thriller"],
    language: "Telugu",
    quality: "HD"
  },
  {
    id: "14",
    title: "The Matrix Resurrection",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    description: "Neo must return to the Matrix to free humanity from a new threat that seeks to enslave all of reality.",
    category: "Hollywood",
    year: 2024,
    duration: "2h 28m",
    rating: 7.6,
    genre: ["Sci-Fi", "Action"],
    language: "English",
    quality: "4K"
  },
  {
    id: "15",
    title: "Fighter: The Airforce",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
    description: "An elite group of Indian Air Force pilots engage in a thrilling aerial battle to protect their nation from enemy forces.",
    category: "Bollywood",
    year: 2024,
    duration: "2h 46m",
    rating: 7.8,
    genre: ["Action", "Drama"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "16",
    title: "Wedding Crashers 2",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1512070679279-8988d32161be?w=400&h=600&fit=crop",
    description: "The legendary wedding crashers are back with new schemes and even bigger wedding disasters.",
    category: "Comedy",
    year: 2024,
    duration: "1h 55m",
    rating: 7.1,
    genre: ["Comedy"],
    language: "English",
    quality: "HD"
  },
  {
    id: "17",
    title: "Animal 2",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop",
    description: "The continuation of a son's intense love for his father and his brutal journey for vengeance against those who wronged him.",
    category: "Bollywood",
    year: 2025,
    duration: "3h 12m",
    rating: 8.3,
    genre: ["Action", "Drama", "Thriller"],
    language: "Hindi",
    quality: "4K"
  },
  {
    id: "18",
    title: "Devara: The Storm",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    description: "A fierce warrior rises from the coastal regions to protect his people from ruthless smugglers and their deadly operations.",
    category: "South Indian",
    year: 2024,
    duration: "2h 48m",
    rating: 8.1,
    genre: ["Action", "Drama"],
    language: "Telugu",
    quality: "HD"
  },
  {
    id: "19",
    title: "Mission Impossible: Final",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=600&fit=crop",
    description: "Ethan Hunt faces his most dangerous mission yet as he races against time to prevent a global catastrophe.",
    category: "Hollywood",
    year: 2025,
    duration: "2h 43m",
    rating: 8.6,
    genre: ["Action", "Thriller", "Adventure"],
    language: "English",
    quality: "4K"
  },
  {
    id: "20",
    title: "Game Night Chaos",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=600&fit=crop",
    description: "A group of friends' weekly game night takes a wild turn when they become unwitting participants in a real crime mystery.",
    category: "Comedy",
    year: 2024,
    duration: "1h 48m",
    rating: 7.4,
    genre: ["Comedy", "Thriller"],
    language: "English",
    quality: "HD"
  },
  {
    id: "21",
    title: "Sacred Games: Season 3",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=400&h=600&fit=crop",
    description: "The epic conclusion to the crime saga that shook Mumbai, revealing the final truth behind the conspiracy.",
    category: "Web Series",
    year: 2024,
    duration: "8 Episodes",
    rating: 8.7,
    genre: ["Crime", "Drama", "Thriller"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "22",
    title: "The Crown: Season 7",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=400&h=600&fit=crop",
    description: "The final season chronicles the British Royal Family through the modern era and its contemporary challenges.",
    category: "Web Series",
    year: 2024,
    duration: "10 Episodes",
    rating: 8.5,
    genre: ["Drama", "History"],
    language: "English",
    quality: "4K"
  },
  {
    id: "23",
    title: "Money Heist: India",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1611945003072-9e84fe7e41f4?w=400&h=600&fit=crop",
    description: "A mastermind criminal plans the biggest heist in Indian history, targeting the Reserve Bank with a team of specialists.",
    category: "Web Series",
    year: 2024,
    duration: "12 Episodes",
    rating: 8.2,
    genre: ["Crime", "Thriller", "Drama"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "24",
    title: "Mirzapur: Season 4",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=400&h=600&fit=crop",
    description: "The battle for the throne of Mirzapur intensifies as new alliances form and old enemies resurface.",
    category: "Web Series",
    year: 2024,
    duration: "10 Episodes",
    rating: 8.4,
    genre: ["Crime", "Action", "Drama"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "25",
    title: "The Emotional Journey",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    description: "A touching story about a family torn apart by circumstances and their journey to find their way back to each other.",
    category: "Drama",
    year: 2024,
    duration: "2h 15m",
    rating: 8.0,
    genre: ["Drama"],
    language: "English",
    quality: "HD"
  },
  {
    id: "26",
    title: "The Silent Witness",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    description: "A deaf woman becomes the sole witness to a murder and must find a way to bring the killer to justice.",
    category: "Drama",
    year: 2024,
    duration: "2h 5m",
    rating: 7.9,
    genre: ["Drama", "Thriller"],
    language: "English",
    quality: "HD"
  },
  {
    id: "27",
    title: "John Wick 5",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    description: "The legendary assassin returns for one final mission that will determine the fate of the underworld.",
    category: "Action",
    year: 2025,
    duration: "2h 35m",
    rating: 8.8,
    genre: ["Action", "Thriller"],
    language: "English",
    quality: "4K"
  },
  {
    id: "28",
    title: "Fast & Furious 11",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    description: "The family faces their most impossible challenge yet in this explosive finale to the legendary saga.",
    category: "Action",
    year: 2025,
    duration: "2h 22m",
    rating: 7.5,
    genre: ["Action", "Adventure"],
    language: "English",
    quality: "4K"
  }
];

// Helper functions to filter videos by category
export const getVideosByCategory = (category: string): Video[] => {
  return videos.filter(video => video.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedVideos = (): Video[] => {
  return videos.filter(video => video.featured);
};

export const getLatestVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.year - a.year).slice(0, 10);
};

export const getTrendingVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getPopularVideos = (): Video[] => {
  return [...videos].filter(v => v.rating >= 7.5).slice(0, 10);
};

export const getTopRatedVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getVideosByGenre = (genre: string): Video[] => {
  return videos.filter(video => video.genre.includes(genre));
};

export const getVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id);
};

export const getRecommendedVideos = (currentVideoId: string): Video[] => {
  const currentVideo = getVideoById(currentVideoId);
  if (!currentVideo) return videos.slice(0, 10);
  
  return videos
    .filter(video => video.id !== currentVideoId)
    .filter(video => 
      video.category === currentVideo.category || 
      video.genre.some(g => currentVideo.genre.includes(g))
    )
    .slice(0, 10);
};

export const getUpcomingVideos = (): Video[] => {
  return videos.filter(video => video.year >= 2025).slice(0, 10);
};

export const getHindiDubbedVideos = (): Video[] => {
  return videos.filter(video => 
    video.language !== 'Hindi' && 
    (video.category === 'Hollywood' || video.category === 'South Indian')
  ).slice(0, 10);
};
