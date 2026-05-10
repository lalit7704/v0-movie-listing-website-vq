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

/* ---------------- SLUG HELPER ---------------- */

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------------- WEB SERIES DATA ---------------- */

export const webSeriesVideos: Video[] = [
  {
    id: "78",
    title: "Game of Thrones Season 1 - Fantasy Drama Series | Full Episodes HD",
    slug: generateSlug(
      "Game of Thrones Season 1 - Fantasy Drama Series | Full Episodes HD"
    ),
    videoUrl: "https://youtu.be/bjqEWgDVPe0",
    downloadUrl: "https://t.me/onemoviedownloa/40",
    poster:
      "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_1.png?v=1777396272",
    description:
      "Game of Thrones Season 1 एक epic fantasy drama series है, जो Westeros की दुनिया में सत्ता, राजनीति और युद्ध की कहानी दिखाती है। इसमें अलग-अलग परिवार Iron Throne पर कब्जा करने के लिए संघर्ष करते हैं। कहानी में betrayal, power struggles और रहस्यमयी तत्वों का मिश्रण देखने को मिलता है।",
    category: "Web Series",
    year: 2011,
    duration: "Season 1 (10 Episodes)",
    rating: 9,
    genre: ["Action", "Adventure", "Drama", "Fantasy"],
    language: "English",
    quality: "HD",
    featured: true,
  },

  {
    id: "79",
    title: "Game of Thrones Season 2 - War of the Five Kings | Full Episodes HD",
    slug: generateSlug(
      "Game of Thrones Season 2 - War of the Five Kings | Full Episodes HD"
    ),
    videoUrl: "https://youtu.be/AlhHGUfCYw4",
    downloadUrl: "https://t.me/onemoviedownloa/41",
    poster:
      "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_2.png?v=1777396281",
    description:
      "Game of Thrones Season 2 में Westeros में War of the Five Kings शुरू होता है, जहाँ अलग-अलग राजा Iron Throne पर कब्जा करने के लिए युद्ध करते हैं।",
    category: "Web Series",
    year: 2012,
    duration: "Season 2 (10 Episodes)",
    rating: 9,
    genre: ["Action", "Adventure", "Drama", "Fantasy"],
    language: "English",
    quality: "HD",
    featured: true,
  },

  {
    id: "80",
    title: "Game of Thrones Season 3 - Rise of Power & Betrayal | Full Episodes HD",
    slug: generateSlug(
      "Game of Thrones Season 3 - Rise of Power & Betrayal | Full Episodes HD"
    ),
    videoUrl: "https://youtu.be/nblUgAMoOvU",
    downloadUrl: "https://t.me/onemoviedownloa/42",
    poster:
      "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_3.png?v=1777396420",
    description:
      "Game of Thrones Season 3 में सत्ता के लिए संघर्ष और भी तीव्र हो जाता है। इस सीजन में राजनीति, विश्वासघात और शक्ति की लड़ाई अपने चरम पर पहुँचती है।",
    category: "Web Series",
    year: 2013,
    duration: "Season 3 (10 Episodes)",
    rating: 9,
    genre: ["Action", "Adventure", "Drama", "Fantasy"],
    language: "English",
    quality: "HD",
  },

  {
    id: "81",
    title: "Game of Thrones Season 4 - Power, Revenge & War | Full Episodes HD",
    slug: generateSlug(
      "Game of Thrones Season 4 - Power, Revenge & War | Full Episodes HD"
    ),
    videoUrl: "https://youtu.be/xZY43QSx3Fk",
    downloadUrl: "https://t.me/onemoviedownloa/43",
    poster:
      "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_4.png?v=1777396437",
    description:
      "Game of Thrones Season 4 में Westeros में सत्ता की लड़ाई और भी खतरनाक हो जाती है। इस सीजन में राजनीति, बदला और युद्ध के साथ कई बड़े ट्विस्ट देखने को मिलते हैं।",
    category: "Web Series",
    year: 2014,
    duration: "Season 4 (10 Episodes)",
    rating: 9,
    genre: ["Action", "Adventure", "Drama", "Fantasy"],
    language: "English",
    quality: "HD",
  },

  {
    id: "69",
    title: "Paatal Lok Season 1 - Crime Thriller Web Series | Full Episodes HD",
    slug: generateSlug(
      "Paatal Lok Season 1 - Crime Thriller Web Series | Full Episodes HD"
    ),
    videoUrl: "https://youtu.be/cNwWMW4mxO8",
    downloadUrl: "https://t.me/onemoviedownloa/37",
    poster:
      "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_5.png?v=1777316951",
    description:
      "Paatal Lok Season 1 एक gripping crime thriller web series है, जिसमें एक पुलिस इंस्पेक्टर को एक हाई-प्रोफाइल केस की जांच सौंपी जाती है।",
    category: "Web Series",
    year: 2020,
    duration: "Season 1 (9 Episodes)",
    rating: 8.5,
    genre: ["Crime", "Drama", "Thriller"],
    language: "Hindi",
    quality: "HD",
    featured: true,
  },

  {
    id: "3001",
    title: "Sapne Vs Everyone Season 1 - Drama Web Series | Full Episodes HD",
    slug: generateSlug(
      "Sapne Vs Everyone Season 1 - Drama Web Series | Full Episodes HD"
    ),
    videoUrl: "https://youtu.be/FhaWbyoRKNM",
    downloadUrl: "https://t.me/onemoviedownloa/61",
    poster:
      "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Sapne_Vs_Everyone_s1.png?v=1778141459",
    description:
      "Sapne Vs Everyone Season 1 एक emotional drama web series है, जो सपनों, संघर्ष और जीवन की कठोर सच्चाइयों को दर्शाती है।",
    category: "Web Series",
    year: 2023,
    duration: "Season 1 (5 Episodes)",
    rating: 8,
    genre: ["Drama"],
    language: "Hindi",
    quality: "HD",
  },
];

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (
  category: string
): Video[] => {
  return webSeriesVideos.filter(
    (video) =>
      video.category.toLowerCase().replace(/\s+/g, "") ===
      category.toLowerCase().replace(/\s+/g, "")
  );
};

export const getFeaturedVideos = (): Video[] => {
  return webSeriesVideos.filter(
    (video) => video.featured === true
  );
};

export const getLatestVideos = (): Video[] => {
  return [...webSeriesVideos].sort(
    (a, b) => b.year - a.year
  );
};

export const getTrendingVideos = (): Video[] => {
  return [...webSeriesVideos].sort(
    (a, b) => b.rating - a.rating
  );
};

export const getTopRatedVideos = (): Video[] => {
  return [...webSeriesVideos].sort(
    (a, b) => b.rating - a.rating
  );
};

export const getVideoById = (
  id: string
): Video | undefined => {
  return webSeriesVideos.find(
    (video) => video.id === id
  );
};

export const getVideoBySlug = (
  slug: string
): Video | undefined => {
  return webSeriesVideos.find(
    (video) => video.slug === slug
  );
};

export const getAllVideoSlugs = (): string[] => {
  return webSeriesVideos.map(
    (video) => video.slug
  );
};