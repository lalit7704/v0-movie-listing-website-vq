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

/* ---------------- SOUTH INDIAN DATA ---------------- */

export const southindianVideos: Video[] = [
{
  "id": "5001",
  "title": "Robinhood - South Indian Action Drama Movie | Full Movie HD",
  "slug": "robinhood-south-indian-action-drama-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/B8XMLMz0pvk",
  "downloadUrl": "https://t.me/onemoviedownloa/53",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/robinhood_south_indian_movie.png?v=1778141777",
  "description": "Robinhood एक South Indian action drama फिल्म है, जिसमें एक साहसी व्यक्ति अमीरों से लड़कर गरीबों की मदद करता है। कहानी में अन्याय, भ्रष्टाचार और समाज के कमजोर लोगों के लिए न्याय की लड़ाई को दिखाया गया है। फिल्म में दमदार एक्शन, इमोशनल मोमेंट्स और मनोरंजन का शानदार मिश्रण देखने को मिलता है, जो दर्शकों को अंत तक बांधे रखता है।",
  "category": "South Indian",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Action", "Drama"],
  "language": "Telugu",
  "quality": "HD"
},
{
  "id": "5002",
  "title": "Jana Nayagan - South Indian Action Drama Movie",
  "slug": "jana-nayagan-south-indian-action-drama-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/isbjM9kXd70",
  "downloadUrl": "https://t.me/onemoviedownloa/68",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Jana_Nayagan.png?v=1778393835",
  "description": "Jana Nayagan एक दमदार South Indian action drama फिल्म है, जो शक्ति, न्याय, राजनीति और जनता की आवाज़ के संघर्ष को बड़े स्तर पर प्रस्तुत करती है। फिल्म की कहानी एक ऐसे व्यक्ति के इर्द-गिर्द घूमती है जो समाज में फैले भ्रष्टाचार, अन्याय और सत्ता के दुरुपयोग के खिलाफ खड़ा होता है। शुरुआत में वह एक साधारण इंसान की तरह अपनी जिंदगी जी रहा होता है, लेकिन जब वह अपने आसपास गरीबों और कमजोर लोगों पर होने वाले अत्याचार को देखता है, तब वह अन्याय के खिलाफ लड़ने का फैसला करता है। धीरे-धीरे वह लोगों की उम्मीद बन जाता है और जनता उसे अपना नेता मानने लगती है। इसी वजह से उसे ‘Jana Nayagan’ यानी जनता का नायक कहा जाता है।\n\nफिल्म में राजनीति और सत्ता के खेल को बहुत प्रभावशाली तरीके से दिखाया गया है। कहानी में कई शक्तिशाली और भ्रष्ट नेता होते हैं जो अपने फायदे के लिए जनता का शोषण करते हैं। मुख्य किरदार उनके खिलाफ आवाज उठाता है और सच को सामने लाने की कोशिश करता है। जैसे-जैसे वह लोगों के बीच लोकप्रिय होता जाता है, उसके दुश्मन भी बढ़ते जाते हैं। उसे धमकियाँ दी जाती हैं, उसके करीबियों को नुकसान पहुँचाने की कोशिश की जाती है और उसे रोकने के लिए कई साजिशें रची जाती हैं। लेकिन वह हर मुश्किल का सामना साहस और दृढ़ निश्चय के साथ करता है।\n\nJana Nayagan में जबरदस्त action sequences देखने को मिलते हैं, जो फिल्म को और भी रोमांचक बनाते हैं। बड़े स्तर की लड़ाइयाँ, intense chase scenes और powerful dialogues दर्शकों को पूरी फिल्म के दौरान बांधे रखते हैं। इसके साथ ही फिल्म केवल action तक सीमित नहीं रहती, बल्कि इसमें emotional moments भी देखने को मिलते हैं। परिवार, दोस्ती, विश्वास और बलिदान जैसे विषय कहानी को गहराई प्रदान करते हैं। मुख्य किरदार की यात्रा केवल एक लड़ाई नहीं बल्कि लोगों के अधिकारों और न्याय के लिए एक आंदोलन बन जाती है।\n\nफिल्म का background music और cinematic visuals इसे और भी भव्य बनाते हैं। South Indian cinema की खास शैली में फिल्म को बड़े पैमाने पर प्रस्तुत किया गया है, जिसमें mass entertainment और strong social message दोनों का बेहतरीन मिश्रण देखने को मिलता है। कहानी में कई प्रेरणादायक पल हैं, जहाँ मुख्य किरदार लोगों को डर के खिलाफ खड़े होने और अपने अधिकारों के लिए लड़ने की प्रेरणा देता है।\n\nJana Nayagan उन दर्शकों के लिए एक शानदार फिल्म साबित होती है जो action, drama और powerful storytelling पसंद करते हैं। यह फिल्म केवल मनोरंजन नहीं देती, बल्कि समाज और राजनीति से जुड़े कई महत्वपूर्ण मुद्दों पर सोचने के लिए भी प्रेरित करती है। दमदार अभिनय, भावनात्मक कहानी, शानदार action और प्रेरणादायक संदेश के कारण यह फिल्म दर्शकों के लिए एक यादगार cinematic experience बन जाती है।",
  "category": "South Indian",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Action", "Drama"],
  "language": "Tamil",
  "quality": "HD",
  "featured": true
},
{
  "id": "5003",
  "title": "Nee Forever - Romantic Drama Movie | Full Movie HD",
  "slug": "nee-forever-romantic-drama-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/S3PAyk2mAE4",
  "downloadUrl": "https://t.me/onemoviedownloa/71",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_3_39cb1d9e-5247-41a9-93b1-bbaeef58573a.png?v=1778393814",
  "description": "Nee Forever एक emotional romantic drama फिल्म है, जो सच्चे प्यार, रिश्तों और जीवन की भावनात्मक यात्रा को दर्शाती है। कहानी दो लोगों के इर्द-गिर्द घूमती है, जो अलग-अलग परिस्थितियों में मिलने के बाद एक-दूसरे के जीवन का महत्वपूर्ण हिस्सा बन जाते हैं। लेकिन समय, गलतफहमियाँ और परिस्थितियाँ उनके रिश्ते की परीक्षा लेती हैं। फिल्म में प्रेम, त्याग, विश्वास और रिश्तों की अहमियत को खूबसूरती से प्रस्तुत किया गया है। শানদার संगीत, ভাবনাত্মক দৃশ্য এবং দিল ছু লেনে বালি কহানি ইসে romantic drama",
  "category": "South Indian",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Romance", "Drama"],
  "language": "Telugu",
  "quality": "HD"
},
{
  "id": "5004",
  "title": "Bhartha Mahasayulaku Wignyapthi - Telugu Drama Movie | Full Movie HD",
  "slug": "bhartha-mahasayulaku-wignyapthi-telugu-drama-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/oHdPb53Qhao",
  "downloadUrl": "https://t.me/onemoviedownloa/69",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Bhartha_Mahasayulaku_Wignyapthi.png?v=1778393948",
  "description": "Bhartha Mahasayulaku Wignyapthi एक emotional Telugu drama फिल्म है, जो परिवार, रिश्तों और वैवाहिक जीवन की जटिलताओं को दर्शाती है। कहानी एक ऐसे परिवार के इर्द-गिर्द घूमती है जहाँ पति-पत्नी के बीच गलतफहमियाँ, सामाजिक दबाव और जीवन की चुनौतियाँ उनके रिश्ते को प्रभावित करती हैं। फिल्म में भावनात्मक संघर्ष, पारिवारिक मूल्य और रिश्तों की अहमियत को संवेदनशील तरीके से दिखाया गया है। दमदार अभिनय और दिल छू लेने वाली कहानी के साथ यह फिल्म दर्शकों को भावुक और प्रेरित दोनों करती है।",
  "category": "South Indian",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Drama", "Family"],
  "language": "Telugu",
  "quality": "HD"
},
{
    "id": "5005",
    "title": "Seetha Payanam (2026) Hindi Dubbed",
    "slug": generateSlug("Seetha Payanam (2026) Hindi Dubbed"),
    "videoUrl": "https://youtu.be/72czhVw48s0",
    "downloadUrl": "https://youtu.be/72czhVw48s0",
    "poster": "https://m.media-amazon.com/images/M/MV5BNWFiN2I5YWEtNTkyOS00NTE1LWE5NDEtMTNhMzY3ZmRkOWNiXkEyXkFqcGc@._V1_FMjpg_UY600_.jpg",
    "description": "Chef Seetha survives an accident and seeks to thank her saviors. She falls for stranger Abhishek, who hides a secret. When truth surfaces, she must choose between love, honesty, and her future.",
    "category": "South Indian",
    "year": 2026,
    "duration": "2h 30m",
    "rating": 5.6,
    "genre": ["Action", "Drama"],
    "language": "Telugu",
    "quality": "4K"
  },
  {
    "id": "5006",
    "title": "Dragon",
    "slug": generateSlug("Dragon"),
    "videoUrl": "https://youtu.be/qIBZlbJ7NUE",
    "downloadUrl": "https://t.me/onemoviedownloa/4",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download.png?v=1776877280",
    "description": "After a devastating breakup, a troubled student drops out of college and enters the dangerous world of financial fraud, chasing money and power while getting trapped in deception.",
    "category": "South Indian",
    "year": 2025,
    "duration": "2h 35m",
    "rating": 7.8,
    "genre": ["Drama", "Comedy", "Romance"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "5007",
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
];

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return southindianVideos.filter(
    (v) => v.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
};

export const getFeaturedVideos = (): Video[] => {
  return southindianVideos.filter((v) => v.featured);
};

export const getLatestVideos = (): Video[] => {
  return [...southindianVideos].sort((a, b) => b.year - a.year);
};

export const getTrendingVideos = (): Video[] => {
  return [...southindianVideos].sort((a, b) => b.rating - a.rating);
};

export const getTopRatedVideos = (): Video[] => {
  return [...southindianVideos].sort((a, b) => b.rating - a.rating);
};

export const getVideoById = (id: string): Video | undefined => {
  return southindianVideos.find((v) => v.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return southindianVideos.find((v) => v.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return southindianVideos.map((v) => v.slug);
};