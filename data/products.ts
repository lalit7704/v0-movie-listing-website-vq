import {
  Baby,
  BatteryCharging,
  Candy,
  Car,
  Coins,
  CupSoda,
  Dumbbell,
  Flame,
  Flower,
  Flower2,
  Gem,
  Gift,
  Headphones,
  HeartPulse,
  LampCeiling,
  Lightbulb,
  Nut,
  Palette,
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
 * Homepage product rows ("Diwali Specials" and "Trending Products").
 *
 * To change a product, edit its `title`, `url` and `image`. The icon is only
 * shown when there is no image or the image fails to load. Remove a product by
 * deleting its block; each row follows the order of its list.
 *
 * To hide a whole row (e.g. Diwali Specials after the festival), delete it from
 * `productSections` at the bottom of this file.
 *
 * Amazon Associates: put your tracking id (e.g. "onemovie-21") in
 * `productSettings.affiliateTag` and it is added to every amazon.in link.
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

export interface ProductSection {
  /** Also the row's HTML id, so /#diwali-specials jumps to it. */
  id: string;
  title: string;
  subtitle: string;
  /** Show "#1", "#2"… badges, for lists that are a ranking. */
  ranked?: boolean;
  products: Product[];
}

export const productSettings = {
  buttonText: "View on Amazon",
  affiliateTag: "",
  disclosure: "Some of these links may be affiliate links; we may earn a commission at no extra cost to you.",
};

export const diwaliProducts: Product[] = [
  {
    id: "d01",
    title: "Desidiya 80 LED Diya Curtain Lights (10 x 3 ft)",
    category: "Lights",
    icon: Lightbulb,
    url: "https://www.amazon.in/dp/B0HBPZK81B",
    image: "https://m.media-amazon.com/images/I/715mHyWnsjL._SL400_.jpg",
  },
  {
    id: "d02",
    title: "One94Store Water Sensor LED Diyas (Pack of 12)",
    category: "Lights",
    icon: Flame,
    url: "https://www.amazon.in/dp/B09DDHXJN6",
    image: "https://m.media-amazon.com/images/I/71pTNvcF3QL._SL400_.jpg",
  },
  {
    id: "d03",
    title: "Collectible India Hand-Painted Clay Diyas",
    category: "Diyas",
    icon: Flame,
    url: "https://www.amazon.in/dp/B07Z2LGN1F",
    image: "https://m.media-amazon.com/images/I/71J2zPI6UNL._SL400_.jpg",
  },
  {
    id: "d04",
    title: "CraftVatika Rangoli Colour Kit (24 Tubes)",
    category: "Rangoli",
    icon: Palette,
    url: "https://www.amazon.in/dp/B08MD3GV6K",
    image: "https://m.media-amazon.com/images/I/719c9oJFUyL._SL400_.jpg",
  },
  {
    id: "d05",
    title: "Ascension Door Hanging Toran (36 inch)",
    category: "Decor",
    icon: Flower2,
    url: "https://www.amazon.in/dp/B07Y8K3JCZ",
    image: "https://m.media-amazon.com/images/I/71byjP3haRL._SL400_.jpg",
  },
  {
    id: "d06",
    title: "Printed Paper Lanterns (Pack of 10)",
    category: "Decor",
    icon: LampCeiling,
    url: "https://www.amazon.in/dp/B0FQ5BWXGW",
    image: "https://m.media-amazon.com/images/I/71a0NDyTjSL._SL400_.jpg",
  },
  {
    id: "d07",
    title: "Webelkart Diya-Shape Decorative Urli Bowl",
    category: "Decor",
    icon: Flower,
    url: "https://www.amazon.in/dp/B0BCKVS2GL",
    image: "https://m.media-amazon.com/images/I/81YmTQjv90L._SL400_.jpg",
  },
  {
    id: "d08",
    title: "Silver-Plated Lakshmi Ganesh Idol Set",
    category: "Puja",
    icon: Sparkles,
    url: "https://www.amazon.in/dp/B0HM38FT8X",
    image: "https://m.media-amazon.com/images/I/71XfPjw4UHL._SL400_.jpg",
  },
  {
    id: "d09",
    title: "Silver-Plated Pooja Thali Set (12 inch)",
    category: "Puja",
    icon: Sparkles,
    url: "https://www.amazon.in/dp/B01GX5513Q",
    image: "https://m.media-amazon.com/images/I/81rmFeGS2EL._SL400_.jpg",
  },
  {
    id: "d10",
    title: "Lakshmi Ganesh 999 Silver Coin (BIS Hallmarked)",
    category: "Dhanteras",
    icon: Coins,
    url: "https://www.amazon.in/dp/B0B8ZF5F8L",
    image: "https://m.media-amazon.com/images/I/71K+QX5kMGL._SL400_.jpg",
  },
  {
    id: "d11",
    title: "AuraDecor Aroma Diffuser & Tealight Gift Set",
    category: "Gifts",
    icon: Gift,
    url: "https://www.amazon.in/dp/B0C2J1BT96",
    image: "https://m.media-amazon.com/images/I/71QIUzqI5wL._SL400_.jpg",
  },
  {
    id: "d12",
    title: "Cadbury Celebrations Rich Dry Fruit Gift Pack",
    category: "Gifts",
    icon: Candy,
    url: "https://www.amazon.in/dp/B07F457TXN",
    image: "https://m.media-amazon.com/images/I/61opUoM+OwL._SL400_.jpg",
  },
  {
    id: "d13",
    title: "Haldiram's Dry Fruits Gift Box",
    category: "Gifts",
    icon: Nut,
    url: "https://www.amazon.in/dp/B09J3QYKD8",
    image: "https://m.media-amazon.com/images/I/715eBziKiiL._SL400_.jpg",
  },
];

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

/** Rows the homepage can show; app/page.tsx places each one by its id. */
export const productSections: ProductSection[] = [
  {
    id: "diwali-specials",
    title: "Diwali Specials",
    subtitle: "Lights, decor, puja essentials and gifts for Diwali",
    products: diwaliProducts,
  },
  {
    id: "trending-products",
    title: "Trending Products",
    subtitle: "Best-selling picks on Amazon India",
    ranked: true,
    products: trendingProducts,
  },
];
