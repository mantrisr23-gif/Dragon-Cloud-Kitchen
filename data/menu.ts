import { MenuItem } from "../types/menu";

export const featuredItems: MenuItem[] = [
  // ... (Keep existing Phase 4A items here)
];

export const fullMenu: MenuItem[] = [
  {
    id: "m1",
    name: "Dragon Chicken",
    description: "Crispy chicken tossed in our signature sauce.",
    price: 180,
    image: "/images/menu/dragon-chicken.webp",
    category: ["CHICKEN", "STARTERS", "CHINESE"],
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "m2",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with juicy chicken & spices.",
    price: 160,
    image: "/images/menu/chicken-biryani.webp",
    category: ["BIRYANI", "CHICKEN"],
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "m3",
    name: "Veg Fried Rice",
    description: "Wok-tossed rice with fresh seasonal vegetables.",
    price: 110,
    image: "/images/menu/veg-fried-rice.webp",
    category: ["CHINESE", "VEG"],
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m4",
    name: "Chilli Paneer",
    description: "Spicy & tangy paneer cubes with bell peppers.",
    price: 140,
    image: "/images/menu/chilli-paneer.webp",
    category: ["STARTERS", "CHINESE", "VEG"],
    isVeg: true,
    isAvailable: false, // Testing SOLD OUT state
  },
  {
    id: "m5",
    name: "Chicken Lollipop",
    description: "Juicy drumsticks, crispy outside & bursting with flavour.",
    price: 150,
    image: "/images/menu/chicken-lollipop.webp",
    category: ["CHICKEN", "STARTERS"],
    isVeg: false,
    isAvailable: true,
  }
];