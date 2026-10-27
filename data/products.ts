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
 * To change where a product goes, replace its `url` (an Amazon product page,
 * affiliate link, or your own store). To show a product photo instead of the
 * icon, add `image: "https://..."`. Remove a product by deleting its line;
 * the section follows the order of this list.
 */

export interface Product {
  id: string;
  title: string;
  category: string;
  url: string;
  icon: LucideIcon;
  /** Optional product photo; the icon is shown when it is missing. */
  image?: string;
  /** Optional button label for this product only. */
  buttonText?: string;
}

export const productSection = {
  title: "Trending Products",
  subtitle: "Best-selling picks on Amazon India",
  buttonText: "Amazon par dekhein",
  disclosure: "Some of these links may be affiliate links; we may earn a commission at no extra cost to you.",
};

/** Placeholder links: an Amazon India search for each product. */
const search = (query: string) => `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;

export const trendingProducts: Product[] = [
  { id: "p01", title: "Bluetooth speaker (portable)", category: "Electronics", icon: Speaker, url: search("portable bluetooth speaker") },
  { id: "p02", title: "TWS earbuds / neckband", category: "Electronics", icon: Headphones, url: search("tws earbuds") },
  { id: "p03", title: "Smartwatch / fitness band", category: "Wearables", icon: Watch, url: search("smartwatch") },
  { id: "p04", title: "Power bank (10,000-20,000 mAh)", category: "Mobile accessories", icon: BatteryCharging, url: search("power bank 20000mah") },
  { id: "p05", title: "3-in-1 magnetic wireless charger", category: "Mobile accessories", icon: Zap, url: search("3 in 1 magnetic wireless charger") },
  { id: "p06", title: "Phone cases (custom print)", category: "Mobile accessories", icon: Smartphone, url: search("custom printed phone case") },
  { id: "p07", title: "Car phone mount", category: "Auto accessories", icon: Car, url: search("car phone mount") },
  { id: "p08", title: "Mini handheld car vacuum", category: "Auto accessories", icon: Wind, url: search("mini handheld car vacuum cleaner") },
  { id: "p09", title: "Hair trimmer", category: "Personal care", icon: Scissors, url: search("hair trimmer for men") },
  { id: "p10", title: "K-beauty / organic skincare balm stick", category: "Beauty", icon: Sparkles, url: search("skincare balm stick") },
  { id: "p11", title: "LED face therapy mask", category: "Beauty", icon: ScanFace, url: search("led face therapy mask") },
  { id: "p12", title: "Portable blender bottle", category: "Kitchen / Fitness", icon: CupSoda, url: search("portable blender bottle") },
  { id: "p13", title: "Kitchen organizers / storage", category: "Home & Kitchen", icon: Utensils, url: search("kitchen organizer storage") },
  { id: "p14", title: "Smart Wi-Fi plug / LED strip", category: "Smart home", icon: PlugZap, url: search("smart wifi plug") },
  { id: "p15", title: "Mini massage gun", category: "Wellness", icon: HeartPulse, url: search("mini massage gun") },
  { id: "p16", title: "Yoga mat + resistance bands", category: "Fitness", icon: Dumbbell, url: search("yoga mat resistance bands") },
  { id: "p17", title: "Oversized cotton T-shirt", category: "Fashion", icon: Shirt, url: search("oversized cotton t-shirt") },
  { id: "p18", title: "Minimalist / personalized jewelry", category: "Fashion", icon: Gem, url: search("minimalist personalized jewelry") },
  { id: "p19", title: "Pet grooming kit / smart feeder", category: "Pet supplies", icon: PawPrint, url: search("pet grooming kit") },
  { id: "p20", title: "Baby safety products", category: "Baby", icon: Baby, url: search("baby safety products") },
];
