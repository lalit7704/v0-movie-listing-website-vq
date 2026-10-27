import {
  Baby,
  BatteryCharging,
  Car,
  CupSoda,
  Dumbbell,
  Gem,
  Headphones,
  HeartPulse,
  PawPrint,
  PlugZap,
  ScanFace,
  Scissors,
  Shirt,
  Smartphone,
  Sparkles,
  Speaker,
  Utensils,
  Watch,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

/*
 * Homepage "Trending Products" section.
 *
 * To change a product, edit its `title`, `url` and `image`. The icon is only
 * shown when there is no image or the image fails to load. Remove a product by
 * deleting its block; the section follows the order of this list.
 *
 * Amazon Associates: put your tracking id (e.g. "onemovie-21") in
 * `productSection.affiliateTag` and it is added to every amazon.in link.
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  url: string;
  icon: LucideIcon;
  /** Product photo; the icon is shown when it is missing or fails to load. */
  image?: string;
  /** Optional button label for this product only. */
  buttonText?: string;
}

export const productSection = {
  title: "Trending Products",
  subtitle: "Best-selling picks on Amazon India",
  buttonText: "Amazon par dekhein",
  affiliateTag: "",
  disclosure: "Some of these links may be affiliate links; we may earn a commission at no extra cost to you.",
};

export const trendingProducts: Product[] = [
  {
    id: "p01",
    title: "JBL Go Essential Portable Bluetooth Speaker",
    category: "Electronics",
    icon: Speaker,
    url: "https://www.amazon.in/dp/B09NCFVNK9",
    image: "https://m.media-amazon.com/images/I/71uji1ExbsL._SL400_.jpg",
  },
  {
    id: "p02",
    title: "OnePlus Nord Buds 3r TWS Earbuds",
    category: "Electronics",
    icon: Headphones,
    url: "https://www.amazon.in/dp/B0FMDL81GS",
    image: "https://m.media-amazon.com/images/I/51nBTTG3hNL._SL400_.jpg",
  },
  {
    id: "p03",
    title: "Noise ColorFit Pulse Air Smartwatch",
    category: "Wearables",
    icon: Watch,
    url: "https://www.amazon.in/dp/B0H3BXLJ3T",
    image: "https://m.media-amazon.com/images/I/61Vz7+rNAxL._SL400_.jpg",
  },
  {
    id: "p04",
    title: "Xiaomi Power Bank 4i 20000mAh, 33W",
    category: "Mobile accessories",
    icon: BatteryCharging,
    url: "https://www.amazon.in/dp/B0DCZ3WDTB",
    image: "https://m.media-amazon.com/images/I/41vBAaU8clL._SL400_.jpg",
  },
  {
    id: "p05",
    title: "eller santé 3-in-1 Magnetic Wireless Charger",
    category: "Mobile accessories",
    icon: Zap,
    url: "https://www.amazon.in/dp/B0CW6CKFG4",
    image: "https://m.media-amazon.com/images/I/514mMIQHLpL._SL400_.jpg",
  },
  {
    id: "p06",
    title: "Personalised Photo Mobile Cover (All Models)",
    category: "Mobile accessories",
    icon: Smartphone,
    url: "https://www.amazon.in/dp/B0GXYYXPHF",
    image: "https://m.media-amazon.com/images/I/61sU+3O8spL._SL400_.jpg",
  },
  {
    id: "p07",
    title: "OQTIQ Magnetic Car Phone Holder",
    category: "Auto accessories",
    icon: Car,
    url: "https://www.amazon.in/dp/B0H7PG7VL4",
    image: "https://m.media-amazon.com/images/I/61IvR4QAjlL._SL400_.jpg",
  },
  {
    id: "p08",
    title: "Svoko 4-in-1 Portable Car Vacuum Cleaner",
    category: "Auto accessories",
    icon: Wind,
    url: "https://www.amazon.in/dp/B0H6JFFM3P",
    image: "https://m.media-amazon.com/images/I/61UbQWDQbbL._SL400_.jpg",
  },
  {
    id: "p09",
    title: "Philips 9-in-1 Trimmer for Men",
    category: "Personal care",
    icon: Scissors,
    url: "https://www.amazon.in/dp/B0G6DVB6DG",
    image: "https://m.media-amazon.com/images/I/710+Q7e0H4L._SL400_.jpg",
  },
  {
    id: "p10",
    title: "VT Cosmetics PDRN Collagen Stick Balm",
    category: "Beauty",
    icon: Sparkles,
    url: "https://www.amazon.in/dp/B0F28NKKW7",
    image: "https://m.media-amazon.com/images/I/6119l8QKBiL._SL400_.jpg",
  },
  {
    id: "p11",
    title: "PROTOUCH 3-in-1 LED Face Mask",
    category: "Beauty",
    icon: ScanFace,
    url: "https://www.amazon.in/dp/B09WYQQVVD",
    image: "https://m.media-amazon.com/images/I/71z4QNQm3lL._SL400_.jpg",
  },
  {
    id: "p12",
    title: "Portable Blender Bottle, USB Rechargeable",
    category: "Kitchen / Fitness",
    icon: CupSoda,
    url: "https://www.amazon.in/dp/B0HF4GSVYL",
    image: "https://m.media-amazon.com/images/I/61ds5SPU0rL._SL400_.jpg",
  },
  {
    id: "p13",
    title: "12FOR Stainless Steel 2-Tier Kitchen Rack",
    category: "Home & Kitchen",
    icon: Utensils,
    url: "https://www.amazon.in/dp/B0BZ7TB3R8",
    image: "https://m.media-amazon.com/images/I/61TGmD48a3L._SL400_.jpg",
  },
  {
    id: "p14",
    title: "Wipro 16A Wi-Fi Smart Plug",
    category: "Smart home",
    icon: PlugZap,
    url: "https://www.amazon.in/dp/B08HN9Q2SZ",
    image: "https://m.media-amazon.com/images/I/61GRHX4pTaL._SL400_.jpg",
  },
  {
    id: "p15",
    title: "Uplayteck Mini Massage Gun",
    category: "Wellness",
    icon: HeartPulse,
    url: "https://www.amazon.in/dp/B09981MBY9",
    image: "https://m.media-amazon.com/images/I/61r7E-jicEL._SL400_.jpg",
  },
  {
    id: "p16",
    title: "Boldfit Anti-Slip Yoga Mat",
    category: "Fitness",
    icon: Dumbbell,
    url: "https://www.amazon.in/dp/B0B7599YRJ",
    image: "https://m.media-amazon.com/images/I/6110q8vCTgL._SL400_.jpg",
  },
  {
    id: "p17",
    title: "Veirdo Oversized Cotton T-Shirt",
    category: "Fashion",
    icon: Shirt,
    url: "https://www.amazon.in/dp/B0D7W55JS3",
    image: "https://m.media-amazon.com/images/I/71PdJftohoL._SL400_.jpg",
  },
  {
    id: "p18",
    title: "Personalised Name Heart Pendant Necklace",
    category: "Fashion",
    icon: Gem,
    url: "https://www.amazon.in/dp/B0DTYN18XY",
    image: "https://m.media-amazon.com/images/I/61GsBnOj27L._SL400_.jpg",
  },
  {
    id: "p19",
    title: "EVERSYS Pet Grooming Kit & Trimmer",
    category: "Pet supplies",
    icon: PawPrint,
    url: "https://www.amazon.in/dp/B0HB5ZHNM8",
    image: "https://m.media-amazon.com/images/I/61VoxC2TcpL._SL400_.jpg",
  },
  {
    id: "p20",
    title: "PROTOWARE Baby Safety Socket Guards (12 pcs)",
    category: "Baby",
    icon: Baby,
    url: "https://www.amazon.in/dp/B0829RL6Z5",
    image: "https://m.media-amazon.com/images/I/515VoKEat8L._SL400_.jpg",
  },
];
