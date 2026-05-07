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

/* ---------------- HOLLYWOOD DATA ---------------- */

export const webSeriesVideos: Video[] = [
  {
    "id": "78",
    "title": "Game of Thrones Season 1 - Fantasy Drama Series | Full Episodes HD",
    "slug": "game-of-thrones-season-1-fantasy-drama-series-full-episodes-hd",
    "videoUrl": "https://youtu.be/bjqEWgDVPe0",
    "downloadUrl": "https://t.me/onemoviedownloa/40",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_1.png?v=1777396272",
    "description": "Game of Thrones Season 1 एक epic fantasy drama series है, जो Westeros की दुनिया में सत्ता, राजनीति और युद्ध की कहानी दिखाती है। इसमें अलग-अलग परिवार Iron Throne पर कब्जा करने के लिए संघर्ष करते हैं। कहानी में betrayal, power struggles और रहस्यमयी तत्वों का मिश्रण देखने को मिलता है, जो इसे बेहद रोमांचक बनाता है। यह सीजन पूरी सीरीज की मजबूत नींव रखता है और दर्शकों को एक अलग ही दुनिया में ले जाता है।",
    "category": "Web Series",
    "year": 2011,
    "duration": "1 Season (10 Episodes)",
    "rating": 9,
    "genre": ["Action", "Adventure", "Drama", "Fantasy"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "79",
    "title": "Game of Thrones Season 2 - War of the Five Kings | Full Episodes HD",
    "slug": "game-of-thrones-season-2-war-of-the-five-kings-full-episodes-hd",
    "videoUrl": "https://youtu.be/AlhHGUfCYw4",
    "downloadUrl": "https://t.me/onemoviedownloa/41",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_2.png?v=1777396281",
    "description": "Game of Thrones Season 2 में Westeros में War of the Five Kings शुरू होता है, जहाँ अलग-अलग राजा Iron Throne पर कब्जा करने के लिए युद्ध करते हैं। Tyrion Lannister King's Landing की रक्षा करता है, जबकि Daenerys Targaryen अपनी ताकत बढ़ाने के लिए संघर्ष करती है। इस सीजन में राजनीति, युद्ध और शक्ति के लिए संघर्ष और भी गहरा हो जाता है, जो कहानी को और रोमांचक बनाता है।",
    "category": "Web Series",
    "year": 2012,
    "duration": "2 Season (10 Episodes)",
    "rating": 9,
    "genre": ["Action", "Adventure", "Drama", "Fantasy"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "80",
    "title": "Game of Thrones Season 3 - Rise of Power & Betrayal | Full Episodes HD",
    "slug": "game-of-thrones-season-3-rise-of-power-betrayal-full-episodes-hd",
    "videoUrl": "https://youtu.be/nblUgAMoOvU",
    "downloadUrl": "https://t.me/onemoviedownloa/42",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_3.png?v=1777396420",
    "description": "Game of Thrones Season 3 में सत्ता के लिए संघर्ष और भी तीव्र हो जाता है। Daenerys Targaryen अपनी सेना मजबूत करती है, जबकि Jon Snow North में नई चुनौतियों का सामना करता है। इस सीजन में राजनीति, विश्वासघात और शक्ति की लड़ाई अपने चरम पर पहुँचती है, जिसमें कुछ चौंकाने वाली घटनाएँ कहानी को नया मोड़ देती हैं। यह सीजन अपने बड़े ट्विस्ट और इमोशनल मोमेंट्स के लिए खास माना जाता है।",
    "category": "Web Series",
    "year": 2013,
    "duration": "3 Season (10 Episodes)",
    "rating": 9,
    "genre": ["Action", "Adventure", "Drama", "Fantasy"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "81",
    "title": "Game of Thrones Season 4 - Power, Revenge & War | Full Episodes HD",
    "slug": "game-of-thrones-season-4-power-revenge-war-full-episodes-hd",
    "videoUrl": "https://youtu.be/xZY43QSx3Fk",
    "downloadUrl": "https://t.me/onemoviedownloa/43",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Game_of_Thrones_Season_4.png?v=1777396437",
    "description": "Game of Thrones Season 4 में Westeros में सत्ता की लड़ाई और भी खतरनाक हो जाती है। Tyrion Lannister पर गंभीर आरोप लगते हैं, जबकि Oberyn Martell बदले की भावना के साथ King's Landing पहुँचता है। इस सीजन में राजनीति, बदला और युद्ध के साथ कई बड़े ट्विस्ट देखने को मिलते हैं, जो कहानी को और भी रोमांचक बना देते हैं। यह सीजन अपने इमोशनल और शॉकिंग मोमेंट्स के लिए बेहद लोकप्रिय है।",
    "category": "Web Series",
    "year": 2014,
    "duration": "4 Season (10 Episodes)",
    "rating": 9,
    "genre": ["Action", "Adventure", "Drama", "Fantasy"],
    "language": "English",
    "quality": "HD"
  },
  {
    id: "69",
    title: "Paatal Lok Season 1 - Crime Thriller Web Series | Full Episodes HD",
    slug: generateSlug("Paatal Lok Season 1 - Crime Thriller Web Series | Full Episodes HD"),
    videoUrl: "https://youtu.be/cNwWMW4mxO8",
    downloadUrl: "https://t.me/onemoviedownloa/37",
    poster: "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_5.png?v=1777316951",
    description: "Paatal Lok Season 1 एक gripping crime thriller web series है, जिसमें एक पुलिस इंस्पेक्टर को एक हाई-प्रोफाइल केस की जांच सौंपी जाती है। जैसे-जैसे जांच आगे बढ़ती है, वह समाज के तीन स्तरों — स्वर्ग लोक, धरती लोक और पाताल लोक — के बीच छिपे गहरे रहस्यों और अपराधों को उजागर करता है। यह सीरीज सस्पेंस, थ्रिल और डार्क रियलिटी से भरपूर है, जो दर्शकों को अंत तक बांधे रखती है।",
    category: "Web Series",
    year: 2020,
    duration: "1 Season (9 Episodes)",
    rating: 8.5,
    genre: ["Crime", "Drama", "Thriller"],
    language: "Hindi",
    quality: "HD"
  }
];

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return webSeriesVideos.filter(
    (v) => v.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
};

export const getFeaturedVideos = (): Video[] => {
  return webSeriesVideos.filter((v) => v.featured);
};

export const getLatestVideos = (): Video[] => {
  return [...webSeriesVideos].sort((a, b) => b.year - a.year);
};

export const getTrendingVideos = (): Video[] => {
  return [...webSeriesVideos].sort((a, b) => b.rating - a.rating);
};

export const getTopRatedVideos = (): Video[] => {
  return [...webSeriesVideos].sort((a, b) => b.rating - a.rating);
};

export const getVideoById = (id: string): Video | undefined => {
  return webSeriesVideos.find((v) => v.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return webSeriesVideos.find((v) => v.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return webSeriesVideos.map((v) => v.slug);
};