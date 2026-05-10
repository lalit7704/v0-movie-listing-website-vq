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

/* ---------------- BOLLYWOOD DATA ---------------- */

export const bollywoodVideos: Video[] = [
  {
  "id": "2001",
  "title": "Bhooth Bangla Horror Comedy Movie",
  "slug": "bhooth-bangla-1965-horror-comedy-movie-mehmood-full-movie-hd",
  "videoUrl": "https://youtu.be/WgAOa4bvOB4",
  "downloadUrl": "https://t.me/onemoviedownloa/50",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Bhooth_Bangla.png?v=1777485339",
  "description": "Bhooth Bangla (1965) एक classic horror comedy फिल्म है जिसमें एक रहस्यमयी बंगले में घटने वाली अजीब और डरावनी घटनाओं को मजेदार अंदाज में दिखाया गया है। Mehmood की शानदार कॉमेडी और फिल्म का सस्पेंस इसे खास बनाता है। कहानी में भूतिया माहौल के साथ हास्य का बेहतरीन मिश्रण देखने को मिलता है, जो दर्शकों को डराने के साथ-साथ हंसाता भी है।",
  "category": "bollywood",
  "year": 2026,
  "duration": "2h 20m",
  "rating": 9.5,
  "genre": ["Comedy", "Horror", "Mystery"],
  "language": "Hindi",
  "quality": "HD",
  featured: true
},
{
    id: "2002",
    title: "Dhurandhar: The Revenge",
    slug: generateSlug("Dhurandhar: The Revenge"),
    videoUrl: "https://youtu.be/NHk7scrb_9I",
    downloadUrl: "https://t.me/onemoviedownloa/8",
    poster: "https://m.media-amazon.com/images/M/MV5BNDhjNThiMjQtNTc0ZS00MjAxLTgyODItNDFkZjI5YjU0MDJhXkEyXkFqcGc@._V1_FMjpg_UY631_.jpg",
    description: "As rival gangs, corrupt officials and a ruthless Major Iqbal close in, Hamza’s mission for his country spirals into a bloody personal war where the line between patriot and monster disappears in the streets of Lyari.",
    category: "bollywood",
    year: 2026,
    duration: "3h 50m",
    rating: 8.5,
    genre: ["Action", "Thriller", "Crime"],
    language: "Hindi",
    quality: "HD",
    featured: true
  },

{
  "id": "2003",
  "title": "Matka King (2026)",
  "slug": "matka-king-2025-crime-drama-movie-full-movie-hindi-hd",
  "videoUrl": "https://youtu.be/xLSdbndJGF0",
  "downloadUrl": "https://t.me/onemoviedownloa/49",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Matka_King.png?v=1777485242",
  "description": "Matka King (2025) एक crime drama फिल्म है, जो मुंबई के मटका जुआ के अंडरवर्ल्ड पर आधारित कहानी को दर्शाती है। फिल्म में सत्ता, पैसे और अपराध की दुनिया का गहरा चित्रण किया गया है, जहाँ एक आम आदमी मटका किंग बनकर उभरता है। कहानी में संघर्ष, धोखा और सत्ता की लड़ाई को रोमांचक तरीके से दिखाया गया है, जो दर्शकों को अंत तक बांधे रखती है।",
  "category": "bollywood",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Crime", "Drama"],
  "language": "Hindi",
  "quality": "HD",
  featured: true
},
{
    "id": "2004",
    "title": "Sister Midnight - Mystery Thriller | Full Movie HD",
    "slug": "sister-midnight-mystery-thriller-full-movie-hd",
    "videoUrl": "https://youtu.be/g2hiY3SNplw",
    "downloadUrl": "https://t.me/onemoviedownloa/45",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Sister_Midnight.png?v=1777482728",
    "description": "Sister Midnight एक संभावित mystery thriller प्रोजेक्ट के रूप में जाना जाता है, जिसमें रहस्य, अंधेरे सच और अनजानी शक्तियों की कहानी हो सकती है। हालांकि इस फिल्म या सीरीज की आधिकारिक जानकारी, कास्ट और रिलीज़ डिटेल्स अभी स्पष्ट नहीं हैं। यह एंट्री केवल placeholder और जानकारी के उद्देश्य से दी गई है।",
    "category": "bollywood",
    "year": 2024,
    "duration": "1h 50m",
    "rating": 0,
    "genre": ["Thriller", "Mystery"],
    "language": "Hindi",
    "quality": "HD"
  },
   {
    "id": "2005",
    "title": "120 Bahadur - Action Drama Movie | Full Movie HD",
    "slug": "120-bahadur-action-drama-movie-full-movie-hd",
    "videoUrl": "https://youtu.be/52eEa2nrs4E",
    "downloadUrl": "https://t.me/onemoviedownloa/44",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/120_Bahadur.png?v=1777482534",
    "description": "120 Bahadur ek patriotic war drama film hai jo Indian soldiers ki bravery aur sacrifice ko highlight karti hai.",
    "category": "bollywood",
    "year": 2025,
    "duration": "2h 17m",
    "rating": 0,
    "genre": ["Action", "Drama"],
    "language": "Hindi",
    "quality": "HD"
  },
    {
      "id": "2006",
      "title": "Border 2 (2026) - Indian War Drama Movie | Sunny Deol | Full Movie HD",
      "slug": "border-2-2026-indian-war-drama-movie-sunny-deol-full-movie-hd",
      "videoUrl": "https://youtu.be/XXWFhs84tkQ",
      "downloadUrl": "https://t.me/onemoviedownloa/38",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Border_2.png?v=1777397094",
      "description": "Border 2 (2026) एक भारतीय war drama फिल्म है, जो 1971 के भारत-पाक युद्ध पर आधारित है। इस फिल्म में भारतीय सेना के बहादुर सैनिकों की वीरता, त्याग और देशभक्ति को दर्शाया गया है। Sunny Deol, Varun Dhawan और Diljit Dosanjh जैसे कलाकार इसमें मुख्य भूमिका निभाते हैं। यह फिल्म एक्शन, इमोशन और देशभक्ति से भरपूर है, जो दर्शकों को सैनिकों के साहस और বলিদান की যাদ दिलाती है।",
      "category": "bollywood",
      "year": 2026,
      "duration": "3h 19m",
      "rating": 8,
      "genre": ["Action", "Drama"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2007",
      "title": "Mardaani 2 (2019) - Crime Thriller Movie | Rani Mukerji | Full Movie HD",
      "slug": "mardaani-2-2019-crime-thriller-movie-rani-mukerji-full-movie-hd",
      "videoUrl": "https://youtu.be/dKeRIOA28Jk",
      "downloadUrl": "https://t.me/HINDIHDNEWMOVIES12/269",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Mardaani_2.png?v=1777398606",
      "description": "Mardaani 2 (2019) एक intense crime thriller फिल्म है जिसमें Rani Mukerji एक सख्त पुलिस अधिकारी Shivani Shivaji Roy का किरदार निभाती हैं। वह एक खतरनाक अपराधी का पीछा करती हैं, जो महिलाओं के खिलाफ गंभीर अपराध करता है। फिल्म में न्याय, साहस और अपराध के खिलाफ लड़ाई को शक्तिशाली तरीके से दिखाया गया है, जो दर्शकों को अंत तक बांधे रखती है।",
      "category": "bollywood",
      "year": 2019,
      "duration": "1h 43m",
      "rating": 7,
      "genre": ["Crime", "Drama", "Thriller"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2008",
      "title": "Gully Boy (2019) - Rap & Street Life Drama | Ranveer Singh | Full Movie HD",
      "slug": "gully-boy-2019-rap-street-life-drama-ranveer-singh-full-movie-hd",
      "videoUrl": "https://youtu.be/JfbxcD6biOk",
      "downloadUrl": "https://t.me/HINDIHDNEWMOVIES12/292",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Gully_Boy.jpg?v=1777399141",
      "description": "Gully Boy (2019) एक inspiring drama फिल्म है जिसमें Ranveer Singh एक साधारण लड़के Murad का किरदार निभाते हैं, जो मुंबई की गलियों से उठकर एक rapper बनने का सपना देखता है। कठिन परिस्थितियों और सामाजिक बाधाओं के बावजूद, वह अपने टैलेंट और मेहनत से अपनी पहचान बनाता है। फिल्म में music, struggle और self-belief का शानदार मिश्रण देखने को मिलता है, जो युवाओं को अपने सपनों का पीछा करने के लिए प्रेरित करता है।",
      "category": "bollywood",
      "year": 2019,
      "duration": "2h 34m",
      "rating": 8,
      "genre": ["Drama", "Music"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2009",
      "title": "Gulabo Sitabo (2020) - Comedy Drama Movie | Amitabh Bachchan | Ayushmann Khurrana | Full Movie HD",
      "slug": "gulabo-sitabo-2020-comedy-drama-movie-amitabh-bachchan-ayushmann-khurrana-full-movie-hd",
      "videoUrl": "https://youtu.be/o0qeQ_yHqtA",
      "downloadUrl": "https://t.me/onemoviedownloa/29",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Gulabo_Sitabo.png?v=1777399375",
      "description": "Gulabo Sitabo (2020) एक हल्की-फुल्की comedy drama फिल्म है जिसमें एक लालची मकान मालिक और उसके किरायेदार के बीच मजेदार टकराव दिखाया गया है। Amitabh Bachchan और Ayushmann Khurrana की शानदार अदाकारी इस फिल्म को खास बनाती है। कहानी में हास्य, चालाकी और मानवीय स्वभाव की झलक देखने को मिलती है, जो दर्शकों को मनोरंजन के साथ-साथ सोचने पर भी मजबूर करती है।",
      "category": "bollywood",
      "year": 2020,
      "duration": "2h 4m",
      "rating": 7,
      "genre": ["Comedy", "Drama"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2011",
      "title": "Chhalaang (2020) - Sports Comedy Drama Movie | Rajkummar Rao | Full Movie HD",
      "slug": "chhalaang-2020-sports-comedy-drama-movie-rajkummar-rao-full-movie-hd",
      "videoUrl": "https://youtu.be/BY-0SbSF2dE",
      "downloadUrl": "https://t.me/onemoviedownloa/28",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Chhalaang.png?v=1777399759",
      "description": "Chhalaang (2020) एक हल्की-फुल्की sports comedy drama फिल्म है जिसमें Rajkummar Rao एक PT teacher का किरदार निभाते हैं, जो शुरुआत में अपने काम को गंभीरता से नहीं लेता। लेकिन एक नए शिक्षक के आने के बाद वह खुद को साबित करने और छात्रों को जीत दिलाने के लिए मेहनत करता है। फिल्म में हास्य, प्रेरणा और self-improvement का अच्छा मिश्रण देखने को मिलता है, जो दर्शकों को प्रेरित करता है।",
      "category": "bollywood",
      "year": 2020,
      "duration": "2h 16m",
      "rating": 7,
      "genre": ["Comedy", "Drama", "Sport"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2012",
      "title": "Bhoot Part One: The Haunted Ship (2020) - Horror Thriller Movie | Vicky Kaushal | Full Movie HD",
      "slug": "bhoot-part-one-the-haunted-ship-2020-horror-thriller-movie-vicky-kaushal-full-movie-hd",
      "videoUrl": "https://youtu.be/ELcRnZ3kP08",
      "downloadUrl": "https://t.me/onemoviedownloa/27",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Bhoot_Part_One.png?v=1777400073",
      "description": "Bhoot Part One: The Haunted Ship (2020) एक डरावनी horror thriller फिल्म है जिसमें Vicky Kaushal एक शिप ऑफिसर का किरदार निभाते हैं, जो एक रहस्यमयी और भूतिया जहाज की जांच करता है। जैसे-जैसे वह सच्चाई के करीब पहुंचता है, उसे डरावनी घटनाओं और अलौकिक शक्तियों का सामना करना पड़ता है। फिल्म में सस्पेंस, डर और रहस्य का शानदार मिश्रण देखने को मिलता है, जो दर्शकों को अंत तक बांधे रखता है।",
      "category": "bollywood",
      "year": 2020,
      "duration": "1h 54m",
      "rating": 6,
      "genre": ["Horror", "Thriller"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2013",
      "title": "Arjun Patiala (2019) - Comedy Crime Movie | Diljit Dosanjh | Full Movie HD",
      "slug": "arjun-patiala-2019-comedy-crime-movie-diljit-dosanjh-full-movie-hd",
      "videoUrl": "https://youtu.be/nR7ETMS7Eo0",
      "downloadUrl": "https://t.me/onemoviedownloa/26",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Arjun_Patiala.png?v=1777400261",
      "description": "Arjun Patiala (2019) एक हल्की-फुल्की comedy crime फिल्म है जिसमें Diljit Dosanjh एक मजाकिया पुलिस अधिकारी का किरदार निभाते हैं। वह अपने अनोखे और मजेदार तरीकों से अपराधियों को पकड़ने की कोशिश करता है, जिससे कई हास्यपूर्ण स्थितियाँ पैदा होती हैं। फिल्म में comedy, crime और entertainment का अच्छा मिश्रण देखने को मिलता है, जो दर्शकों को हंसाने के साथ-साथ मनोरंजन करता है।",
      "category": "bollywood",
      "year": 2019,
      "duration": "1h 47m",
      "rating": 5,
      "genre": ["Comedy", "Crime"],
      "language": "Hindi",
      "quality": "HD"
    },
    {
      "id": "2014",
      "title": "Motichoor Chaknachoor (2019) - Romantic Comedy Movie | Nawazuddin Siddiqui | Full Movie HD",
      "slug": "motichoor-chaknachoor-2019-romantic-comedy-movie-nawazuddin-siddiqui-full-movie-hd",
      "videoUrl": "https://youtu.be/U6J_Pkqk5Fs",
      "downloadUrl": "https://t.me/onemoviedownloa/25",
      "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Motichoor_Chaknachoor.png?v=1777400502",
      "description": "Motichoor Chaknachoor (2019) एक मजेदार romantic comedy फिल्म है जिसमें Nawazuddin Siddiqui एक ऐसे व्यक्ति का किरदार निभाते हैं जो शादी के लिए संघर्ष कर रहा होता है। उसकी मुलाकात एक ऐसी लड़की से होती है जो विदेश जाने का सपना देखती है, और दोनों की शादी के इरादे अलग-अलग कारणों से बनते हैं। फिल्म में हास्य, रिश्तों और सामाजिक अपेक्षाओं का हल्का-फुल्का চিত্রণ কিয়া গয়া হৈ, যা দর্শকদের মনোরঞ্জন এবং হাসি প্রদান করে।",
      "category": "bollywood",
      "year": 2019,
      "duration": "2h 30m",
      "rating": 6,
      "genre": ["Comedy", "Romance"],
      "language": "Hindi",
      "quality": "HD"
    },
      {
    "id": "2015",
    "title": "Jolly LLB 3 (2025) -  Drama Movie | Akshay Kumar & Arshad Warsi",
    "slug": generateSlug("Jolly LLB 3 (2025) -  Drama Movie | Akshay Kumar & Arshad Warsi"),
    "videoUrl": "https://youtu.be/eSgJ8PfSUSk",
    "downloadUrl": "https://t.me/onemoviedownloa/32",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_10.png?v=1777319402",
    "description": "Jolly LLB 3 (2025) एक upcoming courtroom drama फिल्म है, जिसमें Akshay Kumar और Arshad Warsi एक साथ नजर आ सकते हैं। यह फिल्म Jolly LLB सीरीज की अगली कड़ी होगी, जिसमें न्याय व्यवस्था, कानून और समाज से जुड़े महत्वपूर्ण मुद्दों को मनोरंजक और व्यंग्यात्मक अंदाज में दिखाया जाएगा। हालांकि फिल्म की कहानी और रिलीज डेट की पूरी जानकारी अभी सामने नहीं आई है।",
    "category": "bollywood",
    "year": 2025,
    "duration": "TBA",
    "rating": 0,
    "genre": ["Drama", "Comedy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "2016",
    "title": "Jolly LLB 2 (2017) - Courtroom Drama | Akshay Kumar | Full Movie HD",
    "slug": generateSlug("Jolly LLB 2 (2017) - Courtroom Drama | Akshay Kumar | Full Movie HD"),
    "videoUrl": "https://youtu.be/VGRScQyQoFg",
    "downloadUrl": "https://t.me/onemoviedownloa/31",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_11.png?v=1777319728",
    "description": "Jolly LLB 2 (2017) एक दमदार courtroom drama फिल्म है जिसमें Akshay Kumar एक वकील जगदीश मिश्रा (जॉली) का किरदार निभाते हैं, जो एक बड़े केस में न्याय दिलाने के लिए सिस्टम से लड़ता है। फिल्म में भ्रष्टाचार, न्याय व्यवस्था और सच्चाई की लड़ाई को मनोरंजक और प्रभावशाली तरीके से दिखाया गया है। यह फिल्म इमोशन, कॉमेडी और सामाजिक संदेश का बेहतरीन मिश्रण है।",
    "category": "bollywood",
    "year": 2017,
    "duration": "2h 20m",
    "rating": 7,
    "genre": ["Drama", "Comedy"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "2017",
    "title": "Ramaiya Vastavaiya (2013) - Romantic Drama Movie | Full Movie HD",
    "slug": generateSlug("Ramaiya Vastavaiya (2013) - Romantic Drama Movie | Full Movie HD"),
    "videoUrl": "https://youtu.be/fVAaYZQ31TE",
    "downloadUrl": "https://t.me/onemoviedownloa/30",
    "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_12.png?v=1777319897",
    "description": "Ramaiya Vastavaiya (2013) एक खूबसूरत romantic drama फिल्म है जिसमें एक अमीर लड़का एक गांव की सादगी भरी लड़की से प्यार कर बैठता है। अपने प्यार को पाने के लिए उसे गांव में रहकर कड़ी मेहनत और जीवन की सच्चाईयों का सामना करना पड़ता है। फिल्म में प्रेम, संघर्ष और पारिवारिक मूल्यों को भावनात्मक तरीके से दिखाया गया है, जो दर्शकों को एक दिल छू लेने वाली कहानी का অনুভব করাতি হৈ।",
    "category": "bollywood",
    "year": 2013,
    "duration": "2h 28m",
    "rating": 6,
    "genre": ["Romance", "Drama"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    id: "2018",
    title: "Masti 4 (Mastiii 4) (2025) - Comedy Movie | Full Movie HD",
    slug: generateSlug("Masti 4 (Mastiii 4) (2025) - Comedy Movie | Full Movie HD"),
    videoUrl: "https://youtu.be/m43HC9T9YM8",
    downloadUrl: "https://t.me/onemoviedownloa/36",
    poster: "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/download_4.png?v=1777316699",
    description: "Masti 4 (2025) एक upcoming कॉमेडी फिल्म के रूप में चर्चाओं में है, जो Masti फिल्म सीरीज की अगली कड़ी मानी जा रही है। इस फिल्म में दोस्ती, मस्ती और मजेदार घटनाओं का सिलसिला देखने को मिल सकता है। हालांकि, इस प्रोजेक्ट की आधिकारिक घोषणा या रिलीज़ डेट अभी तक सामने नहीं आई है। यह एंट्री केवल जानकारी और मनोरंजन के उद्देश्य से दी गई है।",
    category: "bollywood",
    year: 2025,
    duration: "TBA",
    rating: 0,
    genre: ["Comedy"],
    language: "Hindi",
    quality: "HD"
  },
  {
  "id": "2019",
  "title": "Bhool Bhulaiyaa (2007) - Horror Comedy Movie | Akshay Kumar | Full Movie HD",
  "slug": "bhool-bhulaiyaa-2007-horror-comedy-movie-akshay-kumar-full-movie-hd",
  "videoUrl": "https://youtu.be/ss-7iGf1xE8",
  "downloadUrl": "https://t.me/onemoviedownloa/66",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Bhool_Bhulaiyaa.png?v=1778140662",
  "description": "Bhool Bhulaiyaa (2007) एक शानदार horror comedy फिल्म है जिसमें एक पुराने महल में रहस्यमयी और डरावनी घटनाएँ होने लगती हैं। Akshay Kumar एक मनोवैज्ञानिक डॉक्टर के रूप में सच्चाई का पता लगाने की कोशिश करते हैं। फिल्म में कॉमेडी, सस्पेंस और हॉरर का बेहतरीन मिश्रण देखने को मिलता है, जबकि कहानी मानसिक रहस्यों और अंधविश्वास के बीच के अंतर को भी दर्शाती है।",
  "category": "bollywood",
  "year": 2007,
  "duration": "2h 39m",
  "rating": 7,
  "genre": ["Comedy", "Horror"],
  "language": "Hindi",
  "quality": "HD"
},
{
  "id": "2020",
  "title": "Odela 2 (2025) - Supernatural Thriller Movie | Full Movie HD",
  "slug": "odela-2-2025-supernatural-thriller-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/oX7VhSpm8Lc",
  "downloadUrl": "https://t.me/onemoviedownloa/65",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Odela_2.png?v=1778140803",
  "description": "Odela 2 (2025) एक supernatural thriller फिल्म है, जो रहस्य, डर और अलौकिक घटनाओं से भरपूर कहानी प्रस्तुत करती है। फिल्म में एक छोटे गांव में घटने वाली रहस्यमयी घटनाओं और बुरी शक्तियों के आतंक को दिखाया गया है। कहानी में suspense, horror और spiritual elements का बेहतरीन मिश्रण देखने को मिलता है, जो दर्शकों को अंत तक रोमांचित बनाए रखता है।",
  "category": "bollywood",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Thriller", "Horror"],
  "language": "Telugu",
  "quality": "HD"
},
{
  "id": "2021",
  "title": "Odela Railway Station (2022) - Crime Thriller Movie | Full Movie HD",
  "slug": "odela-railway-station-2022-crime-thriller-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/1_Ytts7pcFY",
  "downloadUrl": "https://t.me/onemoviedownloa/64",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/odela_railway_station.png?v=1778140967",
  "description": "Odela Railway Station (2022) एक gripping crime thriller फिल्म है, जो एक छोटे गांव में होने वाली रहस्यमयी हत्याओं की कहानी दिखाती है। जब गांव में लगातार अपराध होने लगते हैं, तब पुलिस और स्थानीय लोग सच्चाई का पता लगाने की कोशिश करते हैं। फिल्म में suspense, crime investigation और psychological tension का शानदार मिश्रण देखने को मिलता है, जो दर्शकों को अंत तक बांधे रखता है।",
  "category": "bollywood",
  "year": 2022,
  "duration": "1h 31m",
  "rating": 6,
  "genre": ["Crime", "Thriller"],
  "language": "Telugu",
  "quality": "HD"
},
{
  "id": "2022",
  "title": "Toonpur Ka Superrhero (2010) - Action Adventure Comedy Movie | Ajay Devgn | Full Movie HD",
  "slug": "toonpur-ka-superrhero-2010-action-adventure-comedy-movie-ajay-devgn-full-movie-hd",
  "videoUrl": "https://youtu.be/7IYwHJUQqkY",
  "downloadUrl": "https://t.me/onemoviedownloa/63",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Toonpur_Ka_Superrhero.png?v=1778141023",
  "description": "Toonpur Ka Superrhero (2010) एक entertaining live-action और animation आधारित फिल्म है जिसमें Ajay Devgn एक फिल्म स्टार का किरदार निभाते हैं, जो जादुई दुनिया Toonpur में पहुंच जाता है। वहाँ उसे बुरी शक्तियों से लड़कर cartoon characters को बचाना पड़ता है। फिल्म में adventure, comedy और fantasy का शानदार मिश्रण देखने को मिलता है, जो बच्चों और परिवार दोनों के लिए मजेदार अनुभव बनाता है।",
  "category": "bollywood",
  "year": 2010,
  "duration": "1h 55m",
  "rating": 5,
  "genre": ["Action", "Adventure", "Comedy"],
  "language": "Hindi",
  "quality": "HD"
},
{
  "id": "2023",
  "title": "Raja Shivaji - Historical Action Drama Movie",
  "slug": "raja-shivaji-historical-action-drama-movie-full-movie-hd",
  "videoUrl": "https://youtu.be/Bgy00eaFyhE",
  "downloadUrl": "https://t.me/onemoviedownloa/62",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Raja_Shivaji.png?v=1778141243",
  "description": "Raja Shivaji एक historical action drama फिल्म है, जो महान योद्धा और मराठा साम्राज्य के संस्थापक Chhatrapati Shivaji Maharaj के जीवन, साहस और नेतृत्व को दर्शाती है। फिल्म में युद्ध, रणनीति और देशभक्ति की प्रेरणादायक कहानी दिखाई गई है। यह कहानी वीरता, सम्मान और स्वराज्य के संघर्ष को शानदार तरीके से प्रस्तुत करती है।",
  "category": "bollywood",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Action", "Drama", "History"],
  "language": "Hindi",
  "quality": "HD",
  "featured": true
},
{
  "id": "2024",
  "title": "God Tussi Great Ho (2008) - Fantasy Comedy Drama Movie | Salman Khan | Full Movie HD",
  "slug": "god-tussi-great-ho-2008-fantasy-comedy-drama-movie-salman-khan-full-movie-hd",
  "videoUrl": "https://youtu.be/REVa2yT8AQk",
  "downloadUrl": "https://t.me/onemoviedownloa/59",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/God_Tussi_Great_Ho.png?v=1778141645",
  "description": "God Tussi Great Ho (2008) एक fantasy comedy drama फिल्म है जिसमें Salman Khan एक ऐसे व्यक्ति का किरदार निभाते हैं जो अपनी परेशानियों के लिए भगवान को जिम्मेदार मानता है। जब भगवान उसे अपनी शक्तियाँ कुछ समय के लिए दे देते हैं, तब उसकी जिंदगी पूरी तरह बदल जाती है। फिल्म में कॉमेडी, भावनाएँ और जीवन से जुड़ा संदेश देखने को मिलता है, जो मनोरंजन के साथ-साथ प्रेरणा भी देता है।",
  "category": "bollywood",
  "year": 2008,
  "duration": "2h 32m",
  "rating": 5,
  "genre": ["Comedy", "Drama", "Fantasy"],
  "language": "Hindi",
  "quality": "HD"
},
{
  "id": "2025",
  "title": "Sitaare Zameen Par - Bollywood Drama Movie | Aamir Khan | Full Movie HD",
  "slug": "sitaare-zameen-par-bollywood-drama-movie-aamir-khan-full-movie-hd",
  "videoUrl": "https://youtu.be/YH6k5weqwy8",
  "downloadUrl": "https://t.me/onemoviedownloa/70",
  "poster": "https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Sitaare_Zameen_Par.png?v=1778394002",
  "description": "Sitaare Zameen Par एक emotional Bollywood drama फिल्म है, जिसमें इंसानी भावनाओं, सपनों और रिश्तों की गहराई को खूबसूरती से प्रस्तुत किया गया है। फिल्म की कहानी उन लोगों के संघर्ष और आत्मविश्वास पर आधारित है, जो जीवन की कठिन परिस्थितियों के बावजूद अपने सपनों को पूरा करने की कोशिश करते हैं। इसमें परिवार, दोस्ती, प्रेरणा और आत्मविश्वास जैसे विषयों को भावनात्मक अंदाज में दिखाया गया है। Aamir Khan की दमदार मौजूदगी और ফিল্ম কি সংবেদনশীল কহানী এইটি দর্শকদের জন্য খাস বানাতি হয়। যেহ ফিল্ম মনোরঞ্জন করে সাথে-সাথে সমাজকে সকারাত্মক সংদেশ দেওয়ার প্রয়াস করে এবং দর্শকদের ভাবুক এবং प्रेरিত ദുഇടി കരുതുന്നു।",
  "category": "bollywood",
  "year": 2025,
  "duration": "TBA",
  "rating": 0,
  "genre": ["Drama", "Family"],
  "language": "Hindi",
  "quality": "HD"
},

];

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return bollywoodVideos.filter(
    (v) => v.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
};

export const getFeaturedVideos = (): Video[] => {
  return bollywoodVideos.filter((v) => v.featured);
};

export const getLatestVideos = (): Video[] => {
  return [...bollywoodVideos].sort((a, b) => b.year - a.year);
};

export const getTrendingVideos = (): Video[] => {
  return [...bollywoodVideos].sort((a, b) => b.rating - a.rating);
};

export const getTopRatedVideos = (): Video[] => {
  return [...bollywoodVideos].sort((a, b) => b.rating - a.rating);
};

export const getVideoById = (id: string): Video | undefined => {
  return bollywoodVideos.find((v) => v.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return bollywoodVideos.find((v) => v.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return bollywoodVideos.map((v) => v.slug);
};