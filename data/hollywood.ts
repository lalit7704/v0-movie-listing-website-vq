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

export const hollywoodVideos: Video[] = [
  {
    id: "4",
    title: "Furiosa: A Mad Max Saga (2024)",
    slug: generateSlug("Furiosa: A Mad Max Saga"),
    videoUrl: "https://youtu.be/XJMuhwVlca4",
    downloadUrl: "https://t.me/onemoviedownloa/3",
    poster: "https://image.tmdb.org/t/p/w780/q8IEFmEGGSGmAWfwRs23XDwdFN4.jpg",
    description: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
    category: "Hollywood",
    year: 2024,
    duration: "2h 28m",
    rating: 7.5,
    genre: ["Action", "Adventure"],
    language: "Hindi",
    quality: "HD"
    
  },
  {
      "id": "3",
      "title": "Chappie (2015) - AI Robot Learns Humanity | Sci-Fi Action Movie HD",
      "slug": "chappie-2015-ai-robot-learns-humanity-sci-fi-action-movie-hd",
      "videoUrl": "https://youtu.be/lyy7y0QOK-0",
      "downloadUrl": "https://t.me/onemoviedownloa/39",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Chappie_2015.png?v=1777396650",
      "description": "Chappie (2015) एक futuristic sci-fi फिल्म है जिसमें एक पुलिस robot को artificial intelligence देकर उसे इंसानों की तरह सोचने और महसूस करने की क्षमता दी जाती है। Chappie नाम का यह robot धीरे-धीरे इंसानी भावनाओं और दुनिया को समझना शुरू करता है, लेकिन उसे अपराध और खतरों का भी सामना करना पड़ता है। फिल्म में टेक्नोलॉजी, मानवता और नैतिकता के बीच संघर्ष को दिखाया गया है, जो इसे एक unique और thought-provoking कहानी बनाता है।",
      "category": "hollywood",
      "year": 2015,
      "duration": "2h 0m",
      "rating": 7,
      "genre": ["Action", "Sci-Fi", "Drama"],
      "language": "English",
      "quality": "HD"
      
    },
    {
    "id": "67",
    "title": "Iron Man (2008) - Tony Stark Becomes Iron Man | Full Movie HD",
    "slug": generateSlug("Iron Man (2008) - Tony Stark Becomes Iron Man | Full Movie HD"),
    "videoUrl": "https://youtu.be/_xu02V1kM1w",
    "downloadUrl": "https://t.me/onemoviedownloa/20",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_1.png?v=1777317514",
    "description": "Iron Man (2008) एक Action और Sci-Fi फिल्म है जिसमें Tony Stark, एक अरबपति जीनियस और हथियार निर्माता, आतंकवादियों द्वारा अपहरण के बाद अपनी जिंदगी बदल देता है। कैद में रहते हुए वह एक हाई-टेक सूट बनाता है और खुद को Iron Man के रूप में बदलकर दुनिया को बचाने का फैसला करता है। यह फिल्म Marvel Cinematic Universe की शुरुआत करती है और इसमें टेक्नोलॉजी, एक्शन और सुपरहीरो की शानदार कहानी देखने को मिलती है।",
    "category": "hollywood",
    "year": 2008,
    "duration": "2h 6m",
    "rating": 8,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "language": "English",
    "quality": "HD"
  },

  {
    "id": "70",
    "title": "Iron Man 2 (2010) - Tony Stark vs Whiplash | Full Movie HD",
    "slug": generateSlug("Iron Man 2 (2010) - Tony Stark vs Whiplash | Full Movie HD"),
    "videoUrl": "https://youtu.be/DjfJJ9Cnmzs",
    "downloadUrl": "https://t.me/onemoviedownloa/18",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_2.png?v=1777317530",
    "description": "Iron Man 2 (2010) में Tony Stark अपनी पहचान Iron Man के रूप में दुनिया के सामने लाने के बाद नई चुनौतियों का सामना करता है। सरकार उसके सूट की तकनीक को हासिल करना चाहती है, जबकि एक नया दुश्मन Whiplash उसे खत्म करने की योजना बनाता है। इस फिल्म में जबरदस्त एक्शन, एडवांस टेक्नोलॉजी और Marvel Universe के विस्तार की झलक देखने को मिलती है, जहाँ दोस्ती, जिम्मेदारी और शक्ति का सही उपयोग मुख्य विषय हैं।",
    "category": "hollywood",
    "year": 2010,
    "duration": "2h 4m",
    "rating": 7,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "71",
    "title": "Iron Man 3 (2013) - Tony Stark vs Mandarin | Full Movie HD",
    "slug": generateSlug("Iron Man 3 (2013) - Tony Stark vs Mandarin | Full Movie HD"),
    "videoUrl": "https://youtu.be/zoWMW2O2rzc",
    "downloadUrl": "https://t.me/onemoviedownloa/17",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_3.png?v=1777317529",
    "description": "Iron Man 3 (2013) में Tony Stark एक खतरनाक दुश्मन Mandarin का सामना करता है, जो दुनिया भर में आतंक फैला रहा है। Avengers की घटनाओं के बाद Tony मानसिक दबाव और डर से जूझ रहा होता है, लेकिन वह अपनी बुद्धिमत्ता और तकनीक की मदद से हर चुनौती का सामना करता है। यह फिल्म एक्शन, इमोशन और शानदार टेक्नोलॉजी का मिश्रण है, जिसमें Tony Stark के चरित्र का गहरा विकास दिखाया गया है।",
    "category": "hollywood",
    "year": 2013,
    "duration": "2h 10m",
    "rating": 7,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "72",
    "title": "Avengers: Age of Ultron (2015) - Avengers vs Ultron | Full Movie HD",
    "slug": generateSlug("Avengers: Age of Ultron (2015) - Avengers vs Ultron | Full Movie HD"),
    "videoUrl": "https://youtu.be/tmeOjFno6Do",
    "downloadUrl": "https://t.me/onemoviedownloa/19",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_6.png?v=1777318432",
    "description": "Avengers: Age of Ultron (2015) में Tony Stark और Bruce Banner एक कृत्रिम बुद्धिमत्ता Ultron का निर्माण करते हैं, जो बाद में मानवता के लिए सबसे बड़ा खतरा बन जाता है। Avengers टीम को Ultron को रोकने के लिए एकजुट होकर लड़ना पड़ता है। इस फिल्म में जबरदस्त एक्शन, एडवांस टेक्नोलॉजी और टीमवर्क की शानदार झलक देखने को मिलती है। साथ ही इसमें नए सुपरहीरो जैसे Scarlet Witch और Vision की एंट्री भी दिखाई गई है।",
    "category": "hollywood",
    "year": 2015,
    "duration": "2h 21m",
    "rating": 7,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "73",
    "title": "Avengers: Infinity War (2018) - Avengers vs Thanos | Full Movie HD",
    "slug": generateSlug("Avengers: Infinity War (2018) - Avengers vs Thanos | Full Movie HD"),
    "videoUrl": "https://youtu.be/6ZfuNTqbHE8",
    "downloadUrl": "https://t.me/onemoviedownloa/16",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_7.png?v=1777318696",
    "description": "Avengers: Infinity War (2018) में Marvel के सभी सुपरहीरो एक साथ मिलकर शक्तिशाली विलेन Thanos का सामना करते हैं, जो सभी Infinity Stones को इकट्ठा कर ब्रह्मांड पर नियंत्रण करना चाहता है। यह फिल्म जबरदस्त एक्शन, इमोशन और बड़े स्तर की लड़ाइयों से भरपूर है, जहाँ Avengers को अपनी सबसे बड़ी चुनौती का सामना करना पड़ता है। कहानी में बलिदान, टीमवर्क और अस्तित्व की लड़ाई को शानदार तरीके से दिखाया गया है।",
    "category": "hollywood",
    "year": 2018,
    "duration": "2h 29m",
    "rating": 8,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "74",
    "title": "Mad Max: Fury Road (2015)",
    "slug": generateSlug("Mad Max: Fury Road (2015) - Post Apocalyptic Action Thriller | Full Movie HD"),
    "videoUrl": "https://youtu.be/hEJnMQG9ev8",
    "downloadUrl": "https://t.me/onemoviedownloa/34",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_9.png?v=1777319286",
    "description": "Mad Max: Fury Road (2015) एक हाई-ऑक्टेन एक्शन फिल्म है जो एक पोस्ट-अपोकैलिप्टिक दुनिया में सेट है, जहाँ पानी और ईंधन के लिए संघर्ष चलता है। Max Rockatansky और Imperator Furiosa एक खतरनाक तानाशाह Immortan Joe से भागते हैं और एक साहसी पीछा शुरू होता है। फिल्म में तेज रफ्तार एक्शन, शानदार विजुअल्स और दमदार कहानी देखने को मिलती है, जो इसे एक आइकॉनिक एक्शन मूवी बनाती है।",
    "category": "hollywood",
    "year": 2015,
    "duration": "2h 0m",
    "rating": 8,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "language": "English",
    "quality": "HD",
    "featured": true
  },
  {
  "id": "143",
  "title": "The Mummy (2026) - Lee Cronin Horror Movie | Hindi Dubbed | Full Movie HD",
  "slug": "the-mummy-2026-lee-cronin-horror-movie-hindi-dubbed-full-movie-hd",
  "videoUrl": "https://youtu.be/XJ0uv-phsDk",
  "downloadUrl": "https://t.me/onemoviedownloa/48",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/The_Mummy_2026_Lee_Cronin_Horror_Movie_Hindi_Dubbed.png?v=1778142020",
  "description": "The Mummy (2026) एक डरावनी supernatural horror फिल्म है, जिसे Lee Cronin ने निर्देशित किया है। फिल्म में एक प्राचीन ममी के जागने के बाद शुरू होने वाली भयावह और रहस्यमयी घटनाओं को दिखाया गया है। जैसे-जैसे अंधेरी शक्तियाँ फैलती हैं, लोगों को अपने अस्तित्व के लिए संघर्ष करना पड़ता है। यह फिल्म suspense, horror और supernatural thrills से भरपूर है, जो दर्शकों को अंत तक रोमांचित और भयभीत रखती है।",
  "category": "hollywood",
  "year": 2026,
  "duration": "2h 14m",
  "rating": 0,
  "genre": ["Horror", "Thriller"],
  "language": "Hindi",
  "quality": "HD"
}
];

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return hollywoodVideos.filter(
    (v) => v.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
};

export const getFeaturedVideos = (): Video[] => {
  return hollywoodVideos.filter((v) => v.featured);
};

export const getLatestVideos = (): Video[] => {
  return [...hollywoodVideos].sort((a, b) => b.year - a.year);
};

export const getTrendingVideos = (): Video[] => {
  return [...hollywoodVideos].sort((a, b) => b.rating - a.rating);
};

export const getTopRatedVideos = (): Video[] => {
  return [...hollywoodVideos].sort((a, b) => b.rating - a.rating);
};

export const getVideoById = (id: string): Video | undefined => {
  return hollywoodVideos.find((v) => v.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return hollywoodVideos.find((v) => v.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return hollywoodVideos.map((v) => v.slug);
};