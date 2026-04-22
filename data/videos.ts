export interface Video {
  id: string;
  title: string;
  slug: string;
  videoUrl: string;
  downloadUrl: string;
  poster: string;
  description: string;
  seoDescription?: string;
  category: string;
  year: number;
  duration: string;
  rating: number;
  genre: string[];
  language: string;
  quality: string;
  featured?: boolean;
  director?: string;
  cast?: string[];
  keywords?: string[];
}

/**
 * Helper function to generate SEO-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const videos: Video[] = [
  {
    id: "1",
    title: "Furiosa: A Mad Max Saga (2024)",
    slug: generateSlug("Furiosa: A Mad Max Saga"),
    videoUrl: "https://youtu.be/XJMuhwVlca4",
    downloadUrl: "https://t.me/HINDIHDNEWMOVIES12/292",
    poster: "https://image.tmdb.org/t/p/w780/q8IEFmEGGSGmAWfwRs23XDwdFN4.jpg",
    description: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
    category: "Hollywood",
    year: 2024,
    duration: "2h 28m",
    rating: 7.5,
    genre: ["Action", "Adventure"],
    language: "Hindi",
    quality: "HD",
    featured: true
  },
  {
    id: "2",
    title: "Dhurandhar: The Revenge",
    slug: generateSlug("Dhurandhar: The Revenge"),
    videoUrl: "https://youtu.be/NHk7scrb_9I",
    downloadUrl: "https://t.me/onemoviedownloa/8",
    poster: "https://m.media-amazon.com/images/M/MV5BNDhjNThiMjQtNTc0ZS00MjAxLTgyODItNDFkZjI5YjU0MDJhXkEyXkFqcGc@._V1_FMjpg_UY631_.jpg",
    description: "As rival gangs, corrupt officials and a ruthless Major Iqbal close in, Hamza’s mission for his country spirals into a bloody personal war where the line between patriot and monster disappears in the streets of Lyari.",
    category: "Bollywood",
    year: 2026,
    duration: "3h 50m",
    rating: 8.5,
    genre: ["Action", "Thriller", "Crime"],
    language: "Hindi",
    quality: "HD",
    featured: true
  },
  {
    id: "3",
    title: "Seetha Payanam (2026) Hindi Dubbed",
    slug: generateSlug("Seetha Payanam (2026) Hindi Dubbed"),
    videoUrl: "https://youtu.be/72czhVw48s0",
    downloadUrl: "https://youtu.be/72czhVw48s0",
    poster: "https://m.media-amazon.com/images/M/MV5BNWFiN2I5YWEtNTkyOS00NTE1LWE5NDEtMTNhMzY3ZmRkOWNiXkEyXkFqcGc@._V1_FMjpg_UY600_.jpg",
    description: "Chef Seetha survives an accident and seeks to thank her saviors. She falls for stranger Abhishek, who hides a secret. When truth surfaces, she must choose between love, honesty, and her future.",
    category: "South Indian",
    year: 2026,
    duration: "2h 30m",
    rating: 5.6,
    genre: ["Action", "Drama"],
    language: "Telugu",
    quality: "4K",
    featured: true
  },
  {
    id: "4",
    title: "Bhooth Bangla",
    slug: generateSlug("Bhooth Bangla"),
    videoUrl: "https://youtu.be/XW1RkKiRnsg",
    downloadUrl: "https://youtu.be/XW1RkKiRnsg",
    poster: "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Bhooth_Bangla_poster.png?v=1775497649",
    description: "Bhooth Bangla is an upcoming Indian Hindi-language fantasy horror comedy film directed by Priyadarshan and produced by Akshay Kumar",
    category: "Bollywood",
    year: 2026,
    duration: "2h 53m",
    rating: 9.1,
    genre: ["Drama", "Action", "Thriller"],
    language: "Hindi",
    quality: "4K",
    featured: true
  },
  {
    id: "5",
    title: "Pushpa 2: The Rule",
    slug: generateSlug("Pushpa 2: The Rule"),
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
    slug: generateSlug("The Comedy Night"),
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
    slug: generateSlug("Jawan: The Guardian"),
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
    slug: generateSlug("Avengers: Secret Wars"),
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
    slug: generateSlug("KGF Chapter 3"),
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
    slug: generateSlug("The Last Laugh"),
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
    slug: generateSlug("Dunki: The Migration"),
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
    slug: generateSlug("Dune: Messiah"),
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
    slug: generateSlug("Salaar: Ceasefire"),
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
    slug: generateSlug("The Matrix Resurrection"),
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
    slug: generateSlug("Fighter: The Airforce"),
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
    category: "Cartoon",
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
    category: "Cartoon",
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
    category: "Cartoon",
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
    category: "Cartoon",
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
    "id": "46",
    "title": "Ramayan EP 1 - श्री राम भगवान्‌ का जन्म और बाललीला | Ram Janam Special Episode",
    "videoUrl": "https://youtu.be/RG3Hqth0Eus",
    "downloadUrl": "https://youtu.be/RG3Hqth0Eus",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 1 में भगवान श्री राम के दिव्य जन्म (Ram Janam) और उनकी बाल लीलाओं का अद्भुत वर्णन किया गया है। अयोध्या के राजा दशरथ और उनकी रानियों के जीवन में खुशी तब आती है जब भगवान विष्णु श्री राम के रूप में अवतार लेते हैं। इस एपिसोड में राम जी के बचपन की प्यारी झलकियाँ, भक्ति, धर्म और आदर्श जीवन के संदेश को दर्शाया गया है। Ramayan का यह पहला एपिसोड एक पवित्र और प्रेरणादायक शुरुआत है, जिसे हर भक्त और दर्शक जरूर देखना चाहिए।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 1 (Full Episode)",
    "rating": 9,
    "genre": ["Animation", "Action", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "47",
    "title": "Ramayan EP 2 - दशरथ अ��ने चारों पुत्रों को आश्रम भेजा | Ram Lakshman Bharat Shatrughna Gurukul Yatra",
    "videoUrl": "https://youtu.be/UdLXlTC-bFY",
    "downloadUrl": "https://youtu.be/UdLXlTC-bFY",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 2 में राजा दशरथ अपने चारों पुत्रों श्री राम, लक्ष्मण, भरत और शत्रुघ्न को शिक्षा प्राप्त करने के लिए गुरुकुल (आश्रम) भेजते हैं। इस एपिसोड में गुरु वशिष्ठ के आश्रम का वातावरण, शिक्षा, अनुशासन और संस्कारों का महत्व दर्शाया गया है। राम और उनके भाइयों के बीच प्रेम, समर्पण और आदर्श जीवन के मूल्यों की झलक देखने को मिलती है। यह एपिसोड धर्म, शिक्षा और भारतीय परंपराओं की गहराई को दर्शाता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 2 (Full Episode)",
    "rating": 9,
    "genre": ["Drama", "Action"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "48",
    "title": "Ramayan EP 3 - अनुशासन में रहकर शिक्षा ग्रहण की | Gurukul Life & Values of Shri Ram",
    "videoUrl": "https://youtu.be/kHi1S_W4RQw",
    "downloadUrl": "https://youtu.be/kHi1S_W4RQw",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 3 में श्री राम, लक्ष्मण, भरत और शत्रुघ्न गुरुकुल में रहकर अनुशासन, ज्ञान और जीवन के महत्वपूर्ण मूल्यों की शिक्षा ग्रहण करते हैं। गुरु वशिष्ठ के मार्गदर्शन में वे धर्म, कर्तव्य और आदर्श जीवन जीने के सिद्धांत सीखते हैं। इस एपिसोड में गुरुकुल जीवन की सादगी, नियम और संस्कारों का सुंदर चित्रण किया गया है, जो जीवन को सही दिशा देने की प्रेरणा देता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 3 (Full Episode)",
    "rating": 9,
    "genre": ["Mythology", "Drama", "Spiritual", "Adventure"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "49",
    "title": "Ramayan EP 4 - शिक्षा पूर्ण कर अयोध्या लौटे | Shri Ram Returns to Ayodhya After Gurukul",
    "videoUrl": "https://youtu.be/sXgjMisiaiQ",
    "downloadUrl": "https://youtu.be/sXgjMisiaiQ",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 4 में श्री राम, लक्ष्मण, भरत और शत्रुघ्न गुरुकुल में अपनी शिक्षा पूर्ण करने के बाद अयोध्या लौटते हैं। राजा दशरथ और अयोध्यावासी उनके स्वागत में आनंद और उत्साह से भर उठते हैं। इस एपिसोड में शिक्षा के बाद जीवन में कर्तव्य निभाने की शुरुआत, परिवार के प्रति प्रेम और आदर्श राजकुमार के रूप में श्री राम के गुणों को दर्शाया गया है। यह एपिसोड खुशी, संस्कार और नई जिम्मेदारियों की सुंदर झलक प्रस्तुत करता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 4 (Full Episode)",
    "rating": 9,
    "genre": ["Mythology", "Drama", "Spiritual", "Adventure"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "50",
    "title": "Ramayan EP 5 - ताड़का वध | विश्वामित्र-यज्ञ की रक्षा | Shri Ram Kills Tadaka",
    "videoUrl": "https://youtu.be/oMA6zgnk13c",
    "downloadUrl": "https://youtu.be/oMA6zgnk13c",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 5 में महर्षि विश्वामित्र, श्री राम और लक्ष्मण को अपने यज्ञ की रक्षा के लिए वन में ले जाते हैं। इस दौरान श्री राम राक्षसी ताड़का का वध करते हैं और धर्म की रक्षा करते हैं। यह एपिसोड श्री राम के साहस, वीरता और धर्म के प्रति उनकी निष्ठा को दर्शाता है। साथ ही इसमें गुरु के आदेश का पालन और अधर्म पर धर्म की विजय का महत्वपूर्ण संदेश दिया गया है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 5 (Full Episode)",
    "rating": 9,
    "genre": ["Mythology", "Drama", "Spiritual", "Adventure", "Action"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "51",
    "title": "Ramayan EP 6 - राम-लक्ष्मण सहित विश्वामित्र जनकपुर प्रवेश | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/8YXPOOMccD4?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/8YXPOOMccD4?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 6 में श्री राम और लक्ष्मण, महर्षि विश्वामित्र के साथ जनकपुर में प्रवेश करते हैं। इस दौरान उनकी यात्रा और मार्ग में होने वाली घटनाएँ दर्शाई जाती हैं, जो आगे चलकर सीता स्वयंवर की भूमिका तैयार करती हैं। यह एपिसोड रोमांच, संस्कृति और आदर्श जीवन मूल्यों से भरपूर है। साथ ही इसमें भक्ति से जुड़े संदर्भ जैसे हनुमान जी की महिमा और संकटमोचन स्तुति का महत्व भी बताया गया है, जो दर्शकों को आध्यात्मिक प्रेरणा प्रदान करता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 6 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Fantasy", "Family"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "52",
    "title": "Ramayan EP 7 - सीता स्वयंवर | राजाओं से धनुष न उठना | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/bqRGuT8kxs0?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/bqRGuT8kxs0?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 7 में जनकपुर में सीता स्वयंवर का भव्य आयोजन किया जाता है, जहाँ अनेक राजा और योद्धा भगवान शिव के धनुष को उठाने का प्रयास करते हैं, लेकिन कोई भी सफल नहीं हो पाता। इस एपिसोड में शक्ति, अहंकार और सच्चे पराक्रम के बीच का अंतर दर्शाया गया है। साथ ही यह कथा आगे श्री राम के दिव्य कार्य और सीता जी से उनके मिलन की भूमिका तैयार करती है। यह एपिसोड रोमांच, परंपरा और आदर्श मूल्यों से भरपूर है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 7 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Fantasy", "Family"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "53",
    "title": "Ramayan EP 8 - श्री राम द्वारा धनुषभंग | जयमाला पहनाना | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/1Szvvq4H-uI?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/1Szvvq4H-uI?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 8 में श्री राम भगवान शिव के धनुष को उठाकर उसे भंग कर देते हैं, जिससे पूरा जनकपुर आश्चर्यचकित रह जाता है। इसके बाद माता सीता, श्री राम को जयमाला पहनाती हैं और उनके दिव्य मिलन की शुरुआत होती है। यह एपिसोड साहस, भाग्य और सच्चे प्रेम की शक्ति को दर्शाता है। साथ ही इसमें परंपरा, मर्यादा और आदर्श जीवन मूल्यों की सुंदर झलक देखने को मिलती है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 8 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Fantasy", "Family"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "54",
    "title": "Ramayan EP 9 - दशरथजी के पास जनकजी का दूत भेजना | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/g9Gg1mT6FLA?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/g9Gg1mT6FLA?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 9 में राजा जनक, श्री राम द्वारा धनुषभंग के बाद अयोध्या में राजा दशरथ को विवाह का संदेश भेजने के लिए दूत प्रेषित करते हैं। इस एपिसोड में जनकपुर और अयोध्या के बीच संबंध, परंपराओं का पालन और विवाह की तैयारियों की शुरुआत को दर्शाया गया है। यह कथा परिवार, सम्मान और संस्कारों की गहराई को उजागर करती है और आगे होने वाले शुभ मिलन की भूमिका तैयार करती है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 9 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "55",
    "title": "Ramayan EP 10 - श्री सीता-राम विवाह | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/_TChAsBRmlA?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/_TChAsBRmlA?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 10 में श्री राम और माता सीता का भव्य विवाह समारोह जनकपुर में सम्पन्न होता है। इस पावन अवसर पर अयोध्या और जनकपुर के राजपरिवारों का मिलन होता है और पूरे वातावरण में उत्सव का माहौल छा जाता है। यह एपिसोड प्रेम, संस्कार, परंपरा और आदर्श वैवाहिक जीवन के मूल्यों को दर्शाता है। साथ ही इसमें भारतीय संस्कृति और रीति-रिवाजों की सुंदर झलक देखने को मिलती है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 10 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "56",
    "title": "Ramayan EP 11 - बारात का अयोध्या लौटना और अयोध्या में आनंद | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/wrB8x8vRZfY?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/wrB8x8vRZfY?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 11 में श्री राम, माता सीता और उनके साथ पूरी बारात अयोध्या लौटती है। अयोध्या में उनके स्वागत के लिए भव्य उत्सव का आयोजन किया जाता है और पूरा नगर खुशी और उल्लास से भर जाता है। इस एपिसोड में परिवार, प्रेम और परंपराओं की सुंदर झलक देखने को मिलती है, जहाँ सभी लोग इस शुभ अवसर का आनंद लेते हैं। यह कथा भारतीय संस्कृति, आदर्श जीवन और पारिवारिक मूल्यों को दर्शाती है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 11 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "57",
    "title": "Ramayan EP 12 - भरत-शत्रुघ्न कैकेयी प्रदेश जाते हैं | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/g9fiHHF0m3s?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/g9fiHHF0m3s?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 12 में भरत और शत्रुघ्न अपनी माता कैकेयी के साथ उनके मायके (कैकेयी प्रदेश) के लिए प्रस्थान करते हैं। इस दौरान अयोध्या में परिवार के बीच बिछड़ने का भाव और प्रेम की गहराई को दर्शाया गया है। यह एपिसोड आगे आने वाली घटनाओं की भूमिका तैयार करता है, जहाँ परिवार, कर्तव्य और रिश्तों की परीक्षा देखने को मिलेगी।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 12 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "58",
    "title": "Ramayan EP 13 - श्री राम के राज्याभिषेक की तैयारी | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/0Pbd4hrqjq8?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/0Pbd4hrqjq8?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 13 में अयोध्या में श्री राम के राज्याभिषेक की तैयारियाँ शुरू होती हैं। राजा दशरथ और अयोध्यावासी इस शुभ अवसर के लिए उत्साहित हैं और पूरे नगर में उत्सव का माहौल छा जाता है। यह एपिसोड खुशी, आशा और आदर्श शासन की शुरुआत को दर्शाता है, जहाँ श्री राम के गुणों और उनके प्रति जनता के प्रेम की झलक देखने को मिलती है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 13 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  }
  , {
    "id": "59",
    "title": "Ramayan EP 14 - कैकेयी का कोप भवन में जाना | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/SM6IFkuLpl4?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/SM6IFkuLpl4?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 14 में मंथरा के प्रभाव में आकर रानी कैकेयी कोप भवन में चली जाती हैं और राजा दशरथ से अपने दो वरदान मांगने का निश्चय करती हैं। यह एपिसोड कहानी में एक महत्वपूर्ण मोड़ लाता है, जहाँ प्रेम और विश्वास के बीच संदेह और स्वार्थ की भावना जन्म लेती है। इस कथा में रिश्तों की जटिलता, भावनाओं का संघर्ष और आने वाले बड़े परिवर्तन की झलक देखने को मिलती है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 14 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "60",
    "title": "Ramayan EP 15 - श्रीराम-कौशल्या संवाद | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/TRqsWkdDgT8?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/TRqsWkdDgT8?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 15 में श्री राम और माता कौशल्या के बीच भावुक संवाद दर्शाया गया है। जब राम को वनवास का निर्णय स्वीकार करना पड़ता है, तब माता कौशल्या के साथ उनका यह संवाद प्रेम, त्याग और कर्तव्य का अद्भुत उदाहरण प्रस्तुत करता है। इस एपिसोड में पारिवारिक भावनाओं की गहराई, धर्म के प्रति समर्पण और आदर्श पुत्र के रूप में श्री राम के चरित्र की महानता दिखाई गई है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 15 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "61",
    "title": "Ramayan EP 16 - श्रीराम-सीता-लक्ष्मण का वन गमन | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/ocZozmGgy94?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/ocZozmGgy94?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 16 में श्री राम, माता सीता और लक्ष्मण वनवास के लिए अयोध्या छोड़कर वन की ओर प्रस्थान करते हैं। यह एपिसोड त्याग, समर्पण और कर्तव्य की महान भावना को दर्शाता है, जहाँ श्री राम अपने पिता के वचन को निभाने के लिए सब कुछ त्याग देते हैं। सीता और लक्ष्मण का साथ देना उनके प्रेम और निष्ठा को दर्शाता है। यह कथा भावनाओं, धर्म और आदर्श जीवन के मूल्यों से भरपूर है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 16 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "62",
    "title": "Ramayan EP 17 - राम का श्रृंगवेरपुर पहुँचना | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/3nYKp-qLxPE?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/3nYKp-qLxPE?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 17 में श्री राम, माता सीता और लक्ष्मण वन यात्रा के दौरान श्रृंगवेरपुर पहुँचते हैं, जहाँ उनकी भेंट निषादराज गुह से होती है। गुह श्री राम के प्रति अपनी गहरी भक्ति और समर्पण व्यक्त करते हैं और उनकी सेवा में लग जाते हैं। यह एपिसोड सच्ची मित्रता, भक्ति और समानता का संदेश देता है, जहाँ राजा और सामान्य व्यक्ति के बीच का भेद मिट जाता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 17 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "63",
    "title": "Ramayan EP 18 - केवट का प्रेम और श्री राम का गंगा पार जाना | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/fOSwvgpPYK0?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/fOSwvgpPYK0?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 18 में श्री राम, माता सीता और लक्ष्मण गंगा नदी पार करने के लिए केवट से सहायता लेते हैं। केवट अपने प्रेम और भक्ति के साथ भगवान राम की सेवा करता है और उन्हें गंगा पार कराता है। यह एपिसोड सच्ची भक्ति, विनम्रता और समर्पण का अद्भुत उदाहरण प्रस्तुत करता है, जहाँ एक साधारण व्यक्ति का प्रेम भगवान के प्रति उसकी श्रद्धा को दर्शाता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 18 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "64",
    "title": "Ramayan EP 19 - श्रीराम-वाल्मीकि संवाद | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/LnKofsPV7Oc?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/LnKofsPV7Oc?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 19 में श्री राम, माता सीता और लक्ष्मण महर्षि वाल्मीकि के आश्रम में पहुँचते हैं और उनके साथ महत्वपूर्ण संवाद होता है। महर्षि वाल्मीकि उन्हें वन में रहने के लिए उचित स्थान और मार्गदर्शन प्रदान करते हैं। यह एपिसोड ज्ञान, मार्गदर्शन और साधना के महत्व को दर्शाता है, जहाँ गुरु के उपदेश जीवन को सही दिशा देने का कार्य करते हैं।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 19 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "65",
    "title": "Ramayan EP 20 - श्रवण कुमार प्रसंग | दशरथ मरण | HQ Widescreen | English Subtitles",
    "videoUrl": "https://youtu.be/QEWKgoGyeys?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "downloadUrl": "https://youtu.be/QEWKgoGyeys?list=PLFr_jkwUp0hj606Y_dGpOuPF9WJ2CRe_t",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 20 में श्रवण कुमार की करुण कथा और उससे जुड़ा राजा दशरथ का अतीत दर्शाया गया है। इस प्रसंग के माध्यम से दशरथ के जीवन की वह घटना सामने आती है, जिसने उनके भविष्य को प्रभावित किया। अंततः पुत्र वियोग के दुःख में राजा दशरथ का निधन हो जाता है। यह एपिसोड भावनाओं, पश्चाताप और कर्मों के परिणाम का गहरा संदेश देता है, जो दर्शकों को जीवन के मूल्यों पर विचार करने के लिए प्रेरित करता है।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 20 (Full Episode)",
    "rating": 9,
    "genre": ["Adventure", "Drama", "Family", "Fantasy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    id: "66",
    title: "Dragon",
    slug: generateSlug("Dragon"),
    videoUrl: "https://youtu.be/qIBZlbJ7NUE",
    downloadUrl: "https://t.me/onemoviedownloa/4",
    poster: "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download.png?v=1776877280",
    description: "After a devastating breakup, a troubled student drops out of college and enters the dangerous world of financial fraud, chasing money and power while getting trapped in deception.",
    category: "Comedy",
    year: 2025,
    duration: "2h 35m",
    rating: 7.8,
    genre: ["Drama", "Comedy", "Romance"],
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


export const getRamayanVideos = (): Video[] => {
  return videos.filter(video => video.category === 'Ramayan');
};

/**
 * Get video by slug for SEO-optimized routing
 */
export const getVideoBySlug = (slug: string): Video | undefined => {
  return videos.find(video => video.slug === slug);
};

/**
 * Get all video slugs for static generation
 */
export const getAllVideoSlugs = (): string[] => {
  return videos.map(video => video.slug);
};

