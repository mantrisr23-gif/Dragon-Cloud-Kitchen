// types/menu.ts

export type MenuCategory = 
  | "ALL" 
  | "BIRYANI" 
  | "CHICKEN" 
  | "STARTERS" 
  | "CHINESE" 
  | "VEG" 
  | "COMBOS";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory[]; // Array allows an item to be in multiple categories (e.g., ["CHICKEN", "STARTERS"])
  description: string;
  price: number;
  image: string; // Path to image in public folder
  isVeg: boolean;
  isAvailable: boolean;
  isFeatured?: boolean; // For the "Dragon Picks" section
}

export interface ComboItem {
  id: string;
  name: string;
  description: string; // e.g., "Chicken Biryani + Chicken Lollipop"
  price: number;
  image: string;
  isAvailable: boolean;
}