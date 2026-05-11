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

const rawEpisodes = [
  { id: "QyngcJHDbzA", title: "युधिष्ठिर को युवराज घोषित करना" },
  { id: "I0zxTqoM7Fk", title: "लाक्षागृह के निर्माण की साज़िश" },
  { id: "VyluM4CBXws", title: "पांडव अपनी माता कुंती के साथ पहुँचे वारणाव्रत" },
  { id: "E6-ke6PxvY4", title: "लाक्षागृह से पांडवों को निकलने की योजना" },
  { id: "f8w_e2Q0pdg", title: "लाक्षागृह जलकर हुआ राख" },
  { id: "ISMgjWyZGqA", title: "पांडवों के लाक्षागृह में मरने की फैली खबर" },
  { id: "dm7uT8zEW4s", title: "विदुर ने भीष्म को बताया पाण्डवों के जीवित होने का रहस्य" },
  { id: "GzXzR8dFAOs", title: "कुंती ने क्यों बनाया भीम को राक्षस का भोजन" },
  { id: "OAy5ZWHyLyM", title: "पांडव पहुँचे द्रौपदी के स्वयंवर में" },
  { id: "JqEDWOMyrT8", title: "द्रौपदी ने किया कर्ण को पति के रूप में अस्वीकार" },
  { id: "_rBWPB1P4bc", title: "अर्जुन ने भेदी मछली की आँख" },
  { id: "Un9kkEYeuZg", title: "पांडवों के जीवित होने के समाचार मिला धृतराष्ट्र को" },
  { id: "uqjZG84Sy6Y", title: "श्री कृष्ण ने धृतराष्ट्र से माँगा पांडवों का अधिकार" },
  { id: "B-VIS_k4P_M", title: "दैत्य शिल्पी पाण्डवों को लेकर पहुँचे खाण्डव वन के ख़ज़ाने तक" },
  { id: "xc8FOi5GDsc", title: "खाण्डव वन बना इंद्रप्रस्थ" },
  { id: "Qll5lBHqqxQ", title: "युधिष्ठिर बने इंद्रप्रस्थ के राजा" },
  { id: "HtoVubWj2RQ", title: "श्री कृष्ण की जरासंध को मारने की योजना" },
  { id: "j7OV-L_wfOU", title: "भीम ने किया जरासंध का वध" },
  { id: "_mUjT1BVlXc", title: "श्री कृष्ण ने जरासंध के बंदी राजाओं को किया मुक्त" },
  { id: "BREiGec2hjI", title: "श्री कृष्ण की अग्रपूजा और शिशुपाल का वध" },
  { id: "ZADVlq2JBmA", title: "बलराम ने दुर्योधन को दिया गदा युद्ध की शिक्षा" },
  { id: "MQyLgwx0hQ8", title: "रुक्मिणी और अर्जुन का हुआ शिकार के दौरान हुआ मिलन" },
  { id: "9Mgx76NGVwE", title: "अर्जुन ने सुभद्रा की हाथी से बचाई जान" },
  { id: "hj8dljAdbIQ", title: "दुर्योधन और सुभद्रा का विवाह करने की शकुनि साज़िश" },
  { id: "T7nPL-MSfOw", title: "श्री कृष्ण ने रची सुभद्रा और अर्जुन को मिलाने की लीला" },
  { id: "ci7a4wv51fc", title: "अर्जुन और सुभद्रा में हुआ प्रेम" },
  { id: "DGogmYyo_20", title: "सुभद्रा और अर्जुन के विवाह की बात कही रुक्मिणी ने" },
  { id: "CW3u6h4QJ0s", title: "शकुनि ने बलराम के सामने सुभद्रा और दुर्योधन के विवाह की रखी बात" },
  { id: "5WL0o5lSd-0", title: "बलराम ने सुभद्रा और दुर्योधन के रिश्ते की बात बताई श्री कृष्ण को" },
  { id: "qvi0PEd5f5o", title: "दुर्योधन से सुभद्रा के विवाह की बात सुन अर्जुन और सुभद्रा हुए दुखी" },
  { id: "5tIxE7p6thw", title: "श्री कृष्ण ने अर्जुन से सुभद्रा का हरण करने को कहा" },
  { id: "ntCvs5ivun8", title: "अर्जुन ने किया सुभद्रा का हरण" },
  { id: "34apZONWaHk", title: "कौरव पांडवों के बीच द्यूत क्रीड़ा" },
  { id: "7ZJ7B2GCEWI", title: "दुर्योधन ने द्यूत क्रीड़ा में धोखा कर द्रौपदी को बनाया अपनी दासी" },
  { id: "FDDdKfPorng", title: "द्रौपदी ने अपनी लाज बचाने के लिए लगाई सभा में गुहार" },
  { id: "9326Z9ofG58", title: "श्री कृष्ण ने बचाई द्रौपदी की लाज" },
  { id: "6rzRtqOCvQw", title: "पाण्डवों को वनवास मिलने के बाद कुंती ने भी छोड़ा धृतराष्ट्र का महल" },
  { id: "eB7J6oJWPkw", title: "श्री कृष्ण ने पाण्डवों को अपने वनवास का सही इस्तेमाल करने की दिखाई राह" },
  { id: "rDAECvgzBzM", title: "उर्वशी ने अर्जुन को दिया नपुंसक होने का श्राप" },
  { id: "_DDd4aX714w", title: "अर्जुन ने पाया महादेव से पाशुप्तास्त्र" },
  { id: "Vqe9Iec9_Ao", title: "पाण्डवों का वनवास हुआ पूर्ण" },
  { id: "2NeAihrVo54", title: "पाण्डवों ने दुर्योधन से माँगा अपना राज्य वापस" },
  { id: "_83l2YlveX8", title: "दुर्योधन ने पाण्डवों को उनकी नगरी लौटने से किया माना" },
  { id: "nhZPifUmLNg", title: "श्री कृष्ण पांडवों के दूत बनकर पहुँचे धृतराष्ट्र की सभा में" },
  { id: "esffaMPnoKE", title: "दुर्योधन ने श्री कृष्ण को बनाना चाहा बंदी" },
  { id: "jPpfP1zlsq0", title: "पांडवों और कौरव पहुँचे श्री कृष्ण से मदद माँगने" },
  { id: "K4H67U076tI", title: "कर्ण ने सुनाई अपने सुत पुत्र के कहलाने के पीछे की कथा" },
  { id: "oJ6KKVfyBtU", title: "सुत पुत्र कर्ण ने सुनाई दुर्योधन को अपने नाम के पीछे की कहानी" },
  { id: "lIytebfXOUE", title: "भीष्म बने कौरवों के सेनापति" },
  { id: "CsMDHBknge8", title: "कौरव और पांडवों की युद्ध की तैयारी" },
  { id: "GSitqH1ThQo", title: "ऋषि वेदव्यास जी ने धृतराष्ट्र को युद्ध न ना करने के दी सलाह" },
  { id: "zw8H2_r04J0", title: "अर्जुन ने यज्ञ कर माँ दुर्गा से पाई शक्तियाँ" },
  { id: "qLwJVWLw5ew", title: "महाभारत के युद्ध का संजय ने दिया धृतराष्ट्र को वर्णन" },
  { id: "31qHCsV-ySU", title: "अर्जुन हुआ युद्ध से पहले विचलित" },
  { id: "cxm_j4OUW5I", title: "श्री कृष्ण ने अर्जुन को याद दिलाया द्रौपदी का अपमान" },
  { id: "HJHNj5dLvcY", title: "श्री कृष्ण ने अर्जुन को बताया की युद्ध तुम्हारा धर्म है" },
  { id: "jzkdQmzFdUw", title: "श्री कृष्ण ने अर्जुन को दिया कर्म और धर्म का ज्ञान" },
  { id: "sRO4wojxiDc", title: "श्री कृष्ण ने अर्जुन को बताया आत्मा अमर है" },
  { id: "r4voujw9aV0", title: "श्री कृष्ण ने अर्जुन को कर्त्तव्य का महत्व बताया" },
  { id: "18xxcr8f6zs", title: "श्री कृष्ण ने अर्जुन को मृत्यु के डर से किया मुक्त" },
  { id: "KSrTSA7zB2Y", title: "अर्जुन को हुए श्री कृष्ण के विराट स्वरूप के दर्शन" },
  { id: "VM95TnJqjSE", title: "श्री कृष्ण से गीता का ज्ञान पाकर अर्जुन ने उठाए शस्त्र" },
  { id: "BqjYTZF4CbQ", title: "युधिष्ठिर ने पितामह भीष्म से माँगी युद्ध की आज्ञा" },
  { id: "I0s7oU9L_2w", title: "युधिष्ठिर ने गुरू द्रोणाचार्य, कुल गुरू और अपने मामा शैलय से लिया आशीर्वाद" },
  { id: "EIAQnqk-fo8", title: "महाभारत का युद्ध हुआ आरंभ" },
  { id: "qsf5LgDlfjU", title: "भीम ने युद्ध के पहले दिन में मचाया कोहराम" },
  { id: "0rsUp2PFK10", title: "अर्जुन आया पितामह भीष्म से युद्ध करने" },
  { id: "EOzhDoTOL04", title: "विराट नरेश के पुत्र उत्तर का हुआ वध" },
  { id: "uTFSt859Ozs", title: "अर्जुन ने कौरव सेना पर किया पूरी क्षमता से प्रहार" },
  { id: "uuaEMuVL7eU", title: "पितामह भीष्म का युद्ध को लेकर चिंता" },
  { id: "viMgI7-6D2A", title: "पितामह भीष्म और अर्जुन युद्ध में आये आमने सामने" },
  { id: "-_bp63kxIn0", title: "घायल पितामह भीष्म से मिलने रात्रि में आया अर्जुन" },
  { id: "4lnLT22GxY0", title: "दुर्योधन ने पितामह भीष्म के युद्ध लड़ने की नीति पर उठाए प्रश्न" },
  { id: "VPLWs2qQ5ew", title: "श्री कृष्ण ने महाभारत के युद्ध में उठाए शस्त्र" },
  { id: "jwa3_6Z-ZEs", title: "पितामह भीष्म की प्रतिज्ञा के कारण श्री कृष्ण ने उठाए शस्त्र" },
  { id: "3J4aa-mZsJ0", title: "श्री कृष्ण ने द्रौपदी को उनके युद्ध में सुदर्शन धारण करने का कारण" },
  { id: "eHTHsLF3u2Q", title: "अलंबूस और घटोत्कच में हुआ युद्ध" },
  { id: "WRCtAcUXn6A", title: "भीम ने धृतराष्ट्र की पुत्रों का किया वध" },
  { id: "1CryegzTOJY", title: "गांधारी और धृतराष्ट्र अपने पुत्रों की मृत्यु पर शोक" },
  { id: "Azn7wsPKTSw", title: "भीष्म की पांडवों का वध करने की प्रतिज्ञा" },
  { id: "iWirH7H1VrY", title: "भीष्म ने दिया द्रौपदी को सदा सुहागन होने का आशीर्वाद" },
  { id: "NPx5gsasPLQ", title: "पितामह भीष्म ने अपने वचन को पूर्ण करने का पांडवों को बताया रास्ता" },
  { id: "mDd8ZmRpsVg", title: "दुशासन और दुर्योधन का युद्ध हुआ अर्जुन से" },
  { id: "odIsTBiRJUw", title: "अर्जुन शिखंडी को ढाल बनाकर पितामह भीष्म से युद्ध करने पहुँचा" },
  { id: "0pxCVTghZqk", title: "पितामह भीष्म की बाणों की शैया" },
  { id: "94yrOPLE-3I", title: "माँ गंगा ने बाणों की शैया पर लेटे भीष्म को दिया दर्शन" },
  { id: "xuHCQl0RasY", title: "पितामह भीष्म ने दुर्योधन को पांडवों से युद्ध समाप्त करने की दी सलाह" },
  { id: "DpmBFpC4i7o", title: "कौरवों के सेनापति बने गुरु द्रोणाचार्य तो पांडवों को हुई चिंता" },
  { id: "SO0Kdyord1w", title: "महाभारत के युद्ध में सूर्य देव और इंद्र देव को हुई अपने पुत्रों की चिंता" },
  { id: "iTTP6uIH8rM", title: "दानवीर कर्ण ने दान किए अपने कवच और कुंडल" },
  { id: "pCFW8edQnNw", title: "देवेंद्र ने कर्ण की दान भावना देख वरदान में दी दिव्य शक्ति" },
  { id: "Fl4wRJkF2yk", title: "कौरवों ने पांडवों को मारने के लिए चक्रव्यूह का किया प्रयोग" },
  { id: "w65aRH_a24A", title: "अभिमन्यु ने चक्रव्यूह में अकेले मचाया कोहराम" },
  { id: "SS8537yxOxI", title: "अभिमन्यु ने किया दुर्योधन के पुत्र लक्ष्मण का वध" },
  { id: "6lojzen894E", title: "अभिमन्यु हुआ वीरगति को प्राप्त" },
  { id: "v2jZnNk9-Ek", title: "अर्जुन ने जयदरथ के वध की ली प्रतिज्ञा" },
  { id: "c6kpptrAYz4", title: "अभिमन्यु की मृत्यु पर मंदोदरी कुंती और सुभद्रा का शोक" },
  { id: "IMRo4Pleozw", title: "जयदरथ को अर्जुन से बचाने की कौरवों की योजना" },
  { id: "2b-jNbXsCHo", title: "जयदरथ की चिंता को लेकर दुशाला पहुँची अपने पिता धृतराष्ट्र के पास" }
];

export const mahabharatVideos: Video[] = rawEpisodes.map((item, index) => ({
  id: `700${index + 1}`,
  title: `Mahabharat EP ${index + 1} - ${item.title} | महाभारत एक धर्म युद्ध`,
  slug: generateSlug(`Mahabharat EP ${index + 1} - ${item.title} महाभारत एक धर्म युद्ध`),
  videoUrl: `https://youtu.be/${item.id}`,
  downloadUrl: `https://youtu.be/${item.id}`,
  poster: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
  description: `Mahabharat EP ${index + 1} - ${item.title} | महाभारत एक धर्म युद्ध का अत्यंत मार्मिक और प्रेरणादायक चित्रण है।`,
  category: "mahabharat",
  year: 1988,
  duration: `Episode ${index + 1}`,
  rating: 9.5,
  genre: ["Mythology", "Drama", "History"],
  language: "Hindi",
  quality: "HD"
}));

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return mahabharatVideos.filter(
    (v) => v.category.toLowerCase().trim() === category.toLowerCase().trim()
  );
};

export const getFeaturedVideos = (): Video[] => {
  return mahabharatVideos.filter((v) => v.featured);
};

export const getLatestVideos = (): Video[] => {
  return [...mahabharatVideos].sort((a, b) => b.year - a.year);
};

export const getTrendingVideos = (): Video[] => {
  return [...mahabharatVideos].sort((a, b) => b.rating - a.rating);
};

export const getTopRatedVideos = (): Video[] => {
  return [...mahabharatVideos].sort((a, b) => b.rating - a.rating);
};

export const getVideoById = (id: string): Video | undefined => {
  return mahabharatVideos.find((v) => v.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return mahabharatVideos.find((v) => v.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return mahabharatVideos.map((v) => v.slug);
};