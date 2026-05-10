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

export const ramayanVideos = [
{
    "id": "6001",
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
    "id": "6002",
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
    "id": "6003",
    "title": "Ramayan EP 3 - अनुशासन में रहकर शिक्षा ग्रहण की | Gurukul Life & Values of Shri Ram",
    "videoUrl": "https://youtu.be/kHi1S_W4RQw",
    "downloadUrl": "https://youtu.be/kHi1S_W4RQw",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 3 में श्री राम, लक्ष्मण, भरत और शत्रुघ्न गुरुकुल में रहकर अनुशासन, ज्ञान और जीवन के महत्वपूर्ण मूल्यों की शिक्षा ग्रहण करते हैं। गुरु वशिष्ठ के मार्गदर्शन में वे धर्म, कर्तव्य और आदर्श जीवन जीने के सिद्धांत सीखते हैं। इस एपिसोड में गुरुकुल जीवन की सादगी, নিয়ম ঔর সংস্কারের সুন্দর চিত্রণ করা হয়েছে, যা জীবনকে সঠিক দিকে নিয়ে যাওয়ার প্রেরণা দেয়।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 3 (Full Episode)",
    "rating": 9,
    "genre": ["Mythology", "Drama", "Spiritual", "Adventure"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "6004",
    "title": "Ramayan EP 4 - शिक्षा पूर्ण कर अयोध्या लौटे | Shri Ram Returns to Ayodhya After Gurukul",
    "videoUrl": "https://youtu.be/sXgjMisiaiQ",
    "downloadUrl": "https://youtu.be/sXgjMisiaiQ",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 4 में श्री राम, लक्ष्मण, भरत और शत्रुघ्न गुरुकुल में अपनी शिक्षा पूर्ण करने के बाद अयोध्या लौटते हैं। राजा दशरथ और अयोध्यावासी उनके स्वागत में आनंद और उत्साह से भर उठते हैं। इस एपिसोड में शिक्षा के बाद जीवन में कर्तव्य निभाने की शुरुआत, परिवार के प्रति प्रेम और আদর্শ রাজকুমার কে রূপে শ্রী রাম কে গুণগুলি দেখায়া গিয়াছে। এইটি খুশি, সংস্কার এবং নতুন দায়িত্বের সুন্দর ঝলক প্রস্তুত করে।",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 4 (Full Episode)",
    "rating": 9,
    "genre": ["Mythology", "Drama", "Spiritual", "Adventure"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "6005",
    "title": "Ramayan EP 5 - ताड़का वध | विश्वामित्र-यज्ञ की रक्षा | Shri Ram Kills Tadaka",
    "videoUrl": "https://youtu.be/oMA6zgnk13c",
    "downloadUrl": "https://youtu.be/oMA6zgnk13c",
    "poster": "https://m.media-amazon.com/images/I/815A4kgFnJL._UF1000,1000_QL80_.jpg",
    "description": "Ramayan Episode 5 में महर्षि विश्वामित्र, श्री राम और लक्ष्मण को अपने यज्ञ की रक्षा के लिए वन में ले जाते हैं। इस दौरान श्री राम राक्षसी ताड़का का वध करते हैं और धर्म की रक्षा करते हैं। যহ এপিসোড শ্রী রাম কে সাহস, বীরতা এবং ধর্মের প্রতি উনাকে নিষ্ঠা দেখায়া গিয়াছে। साथ ही இஸ் எபிசோட் மீது ஗ுரு கார்யம் மற்றும் அதர்மத்தில் ஧ர்மத்தின் விஜயம் என்ற பெரிய சந்தேகம் கொண்டுள்ளது。",
    "category": "ramayan",
    "year": 1987,
    "duration": "Episode 5 (Full Episode)",
    "rating": 9,
    "genre": ["Mythology", "Drama", "Spiritual", "Adventure", "Action"],
    "language": "Hindi",
    "quality": "HD"
  },
  {
    "id": "6006",
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
    "id": "6007",
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
    "id": "6008",
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
    "id": "6009",
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
    "id": "6010",
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
    "id": "6012",
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
    "id": "6013",
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
    "id": "6014",
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
    "id": "6015",
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
    "id": "6016",
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
    "id": "6017",
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
    "id": "6018",
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
    "id": "6019",
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
    "id": "6020",
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
  }
];



