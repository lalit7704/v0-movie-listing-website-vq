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
    videoUrl: "https://youtu.be/29nqGdZYsWw",
    downloadUrl: "https://youtu.be/29nqGdZYsWw",
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
    category: "ramayan",
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
    category: "ramayan",
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
    poster: "https://cdn.sweetescape.com/images/blogs/article-covers/619/231694be-5d00-4531-9022-99cd091a365b-1920.jpg",
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
  },
  // Cartoon Shows & Movies
  {
    id: "29",
    title: "Tom and Jerry: The Movie",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=600&fit=crop",
    description: "The iconic cat and mouse duo embark on their biggest adventure yet in this hilarious animated feature film.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 41m",
    rating: 7.2,
    genre: ["Animation", "Comedy", "Family"],
    language: "English",
    quality: "HD"
  },
  {
    id: "30",
    title: "Shinchan: Jungle Adventure",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&h=600&fit=crop",
    description: "Shinchan and the Kasukabe Defense Group go on a wild jungle expedition filled with laughs and surprises.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 35m",
    rating: 8.1,
    genre: ["Animation", "Comedy", "Family"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "31",
    title: "Doraemon: Nobita's Space War",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    description: "Doraemon and Nobita travel to space to save an alien civilization from destruction in this epic adventure.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 48m",
    rating: 8.4,
    genre: ["Animation", "Adventure", "Sci-Fi"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "32",
    title: "SpongeBob: The Cosmic Shake",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=400&h=600&fit=crop",
    description: "SpongeBob and Patrick embark on an interdimensional adventure to save Bikini Bottom from cosmic chaos.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 32m",
    rating: 7.8,
    genre: ["Animation", "Comedy", "Adventure"],
    language: "English",
    quality: "HD"
  },
  {
    id: "33",
    title: "Chhota Bheem: Himalayan Quest",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=600&fit=crop",
    description: "Bheem and his friends travel to the Himalayas to find a mystical artifact and save their village from danger.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 28m",
    rating: 7.6,
    genre: ["Animation", "Adventure", "Action"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "34",
    title: "Motu Patlu: Robot World",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    description: "Motu and Patlu accidentally travel to a world ruled by robots and must find their way back home.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 22m",
    rating: 7.3,
    genre: ["Animation", "Comedy", "Sci-Fi"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "35",
    title: "Pokemon: The New Journey",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=600&fit=crop",
    description: "A new Pokemon trainer sets off on an epic journey across multiple regions to become a Pokemon Master.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 55m",
    rating: 8.5,
    genre: ["Animation", "Adventure", "Action"],
    language: "English",
    quality: "4K"
  },
  {
    id: "36",
    title: "Ben 10: Ultimate Alien Movie",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop",
    description: "Ben Tennyson faces his greatest challenge yet as an alien invasion threatens to destroy Earth.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 38m",
    rating: 8.0,
    genre: ["Animation", "Action", "Sci-Fi"],
    language: "English",
    quality: "HD"
  },
  {
    id: "37",
    title: "Dragon Ball Super: Universe War",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=400&h=600&fit=crop",
    description: "Goku and the Z Fighters must defend their universe against the most powerful warriors from across all universes.",
    category: "Cartoon",
    year: 2024,
    duration: "2h 5m",
    rating: 9.0,
    genre: ["Animation", "Action", "Adventure"],
    language: "Japanese",
    quality: "4K"
  },
  {
    id: "38",
    title: "Oggy and the Cockroaches Movie",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&h=600&fit=crop",
    description: "Oggy chases the mischievous cockroaches across time and space in this hilarious animated adventure.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 25m",
    rating: 7.4,
    genre: ["Animation", "Comedy"],
    language: "English",
    quality: "HD"
  },
  {
    id: "39",
    title: "Naruto: The Final Battle",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=600&fit=crop",
    description: "Naruto faces his ultimate enemy in an epic battle that will determine the fate of the ninja world.",
    category: "Cartoon",
    year: 2024,
    duration: "2h 15m",
    rating: 9.2,
    genre: ["Animation", "Action", "Adventure"],
    language: "Japanese",
    quality: "4K"
  },
  {
    id: "40",
    title: "Paw Patrol: The Mighty Movie",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=600&fit=crop",
    description: "The Paw Patrol pups gain superpowers and must use them to save Adventure City from a new villain.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 35m",
    rating: 7.0,
    genre: ["Animation", "Adventure", "Family"],
    language: "English",
    quality: "HD"
  },
  {
    id: "41",
    title: "One Piece Film: Red",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=400&h=600&fit=crop",
    description: "Luffy and the Straw Hat Pirates face a powerful new enemy with a mysterious connection to Shanks.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 55m",
    rating: 8.8,
    genre: ["Animation", "Action", "Adventure"],
    language: "Japanese",
    quality: "4K"
  },
  {
    id: "42",
    title: "Kiteretsu: Time Machine Adventure",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400&h=600&fit=crop",
    description: "Kiteretsu and Korosuke travel through time to save history from being altered by a villainous inventor.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 42m",
    rating: 7.9,
    genre: ["Animation", "Adventure", "Sci-Fi"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "43",
    title: "Ninja Hattori: Ninja Wars",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    description: "Hattori and Kenichi must save Japan from an army of evil ninjas planning to take over the country.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 30m",
    rating: 7.7,
    genre: ["Animation", "Action", "Comedy"],
    language: "Hindi",
    quality: "HD"
  },
  {
    id: "44",
    title: "My Hero Academia: Rising",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
    description: "Deku and Class 1-A face their most dangerous villain yet in an epic battle to protect innocent lives.",
    category: "Cartoon",
    year: 2024,
    duration: "1h 50m",
    rating: 8.7,
    genre: ["Animation", "Action", "Adventure"],
    language: "Japanese",
    quality: "4K"
  },
  {
    id: "45",
    title: "Demon Slayer: Infinity Castle",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    downloadUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
    description: "Tanjiro and the Demon Slayer Corps infiltrate the Infinity Castle for the final battle against Muzan.",
    category: "Cartoon",
    year: 2025,
    duration: "2h 10m",
    rating: 9.3,
    genre: ["Animation", "Action", "Fantasy"],
    language: "Japanese",
    quality: "4K"
  },
  {
    id: "46",
    title: "Ramayan (All Episodes)",
    videoUrl: "https://youtu.be/RG3Hqth0Eus",
    downloadUrl: "https://youtu.be/RG3Hqth0Eus",
    poster: "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    description: "Ramayan is an epic Indian mythological television series based on the ancient Sanskrit epic Ramayana. It follows the journey of Lord Rama, Sita, and Lakshman, showcasing devotion, duty, and the victory of good over evil.",
    category: "ramayan",
    year: 1987,
    duration: "1 Season (78 Episodes)",
    rating: 9,
    genre: ["Mythology", "Drama", "Adventure"],
    language: "Hindi",
    quality: "HD"
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

export const getCartoonVideos = (): Video[] => {
  return videos.filter(video => video.category === 'Cartoon');
};

export const getAnimeVideos = (): Video[] => {
  return videos.filter(video =>
    video.category === 'Cartoon' &&
    (video.language === 'Japanese' || video.genre.includes('Animation'))
  ).filter(v =>
    v.title.includes('Dragon Ball') ||
    v.title.includes('Naruto') ||
    v.title.includes('One Piece') ||
    v.title.includes('My Hero') ||
    v.title.includes('Demon Slayer') ||
    v.title.includes('Pokemon')
  );
};

export const getKidsCartoons = (): Video[] => {
  return videos.filter(video =>
    video.category === 'Cartoon' &&
    video.genre.includes('Family')
  );
};


