// types/kitchen.ts

export interface SocialLinks {
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

export interface KitchenConfig {
  name: string;
  tagline: string;
  location: string;
  whatsappNumber: string; // e.g., "919123456789" (Format required for the wa.me link)
  deliveryRadiusKm: number;
  openingTime: string; // e.g., "10:00" (24-hour format makes logic easier)
  closingTime: string; // e.g., "20:00"
  currencySymbol: string; // e.g., "₹"
  logo: string;
  socialLinks: SocialLinks;
}