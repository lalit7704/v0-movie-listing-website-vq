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
    "id": "65",
    "title": "Ramayan EP 20 - श्रवण कुमार प्रसंग | दशरथ मरण | HQ Widescreen | English Subtitles",
    slug: generateSlug("Ramayan EP 20 - श्रवण कुमार प्रसंग | दशरथ मरण | HQ Widescreen | English Subtitles"),
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
    category: "South Indian",
    year: 2025,
    duration: "2h 35m",
    rating: 7.8,
    genre: ["Drama", "Comedy", "Romance"],
    language: "Hindi",
    quality: "HD"
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
    "title": "Mad Max: Fury Road (2015) - Post Apocalyptic Action Thriller | Full Movie HD",
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
    "quality": "HD"
  },

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
    "id": "93",
    "title": "Maharshi (2019) - Action Drama Movie | Mahesh Babu | Full Movie HD",
    "slug": "maharshi-2019-action-drama-movie-mahesh-babu-full-movie-hd",
    "videoUrl": "https://youtu.be/ByjXIbg4hjw",
    "downloadUrl": "https://t.me/onemoviedownloa/46",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Maharshi.png?v=1777482936",
    "description": "Maharshi (2019) एक प्रेरणादायक action drama फिल्म है जिसमें Mahesh Babu एक सफल बिजनेसमैन का किरदार निभाते हैं, जो अपने गांव लौटकर किसानों की समस्याओं को हल करने का प्रयास करता है। फिल्म में सफलता, दोस्ती और सामाजिक जिम्मेदारी का बेहतरीन मिश्रण देखने को मिलता है। यह कहानी संघर्ष, बदलाव और समाज के लिए कुछ करने की प्रेरणा देती है।",
    "category": "South Indian",
    "year": 2019,
    "duration": "2h 56m",
    "rating": 7,
    "genre": ["Action", "Drama"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "94",
    "title": "Michael (2026) - Michael Jackson Biopic | Jaafar Jackson | Full Movie HD",
    "slug": "michael-2026-michael-jackson-biopic-jaafar-jackson-full-movie-hd",
    "videoUrl": "https://youtu.be/3zOLzsbOleM",
    "downloadUrl": "https://t.me/onemoviedownloa/47",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Michael.png?v=1777483212",
    "description": "Michael (2026) एक biographical drama फिल्म है, जिसे Antoine Fuqua ने डायरेक्ट किया है। यह फिल्म पॉप आइकन Michael Jackson के जीवन पर आधारित है, जिसमें उनके Jackson 5 के दिनों से लेकर 1980s के अंत तक के करियर को दिखाया गया है। Jaafar Jackson, जो Michael Jackson के भतीजे हैं, इस फिल्म में मुख्य भूमिका निभाते हैं। फिल्म में उनकी संगीत यात्रा, संघर्ष और सुपरस्टार बनने की कहानी को विस्तार से प्रस्तुत किया गया है।",
    "category": "hollywood",
    "year": 2026,
    "duration": "2h 8m",
    "rating": 0,
    "genre": ["Drama", "Biography", "Music"],
    "language": "English",
    "quality": "HD"
  },
  {
    "id": "95",
    "title": "The Mummy (2026) - Horror Supernatural Movie | Lee Cronin | Full Movie HD",
    "slug": "the-mummy-2026-horror-supernatural-movie-lee-cronin-full-movie-hd",
    "videoUrl": "https://youtu.be/XJ0uv-phsDk",
    "downloadUrl": "https://t.me/onemoviedownloa/48",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Lee_Cronin_s_The_Mummy.png?v=1777483881",
    "description": "The Mummy (2026) एक horror supernatural फिल्म है, जिसे Lee Cronin द्वारा निर्देशित किया गया है। यह फिल्म एक प्राचीन ममी के जागने और उससे जुड़ी खतरनाक और डरावनी घटनाओं की कहानी दिखाती है। कहानी में रहस्य, अलौकिक शक्तियां और भय का गहरा माहौल देखने को मिलता है, जो दर्शकों को अंत तक रोमांचित और भयभीत रखता है।",
    "category": "hollywood",
    "year": 2026,
    "duration": "2h 14m",
    "rating": 0,
    "genre": ["Horror", "Supernatural"],
    "language": "English",
    "quality": "HD"
  },


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

