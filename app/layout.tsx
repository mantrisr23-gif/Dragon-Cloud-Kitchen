import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart"; // Added the provider

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Dragon Cloud Kitchen",
  description: "Biryani that makes you come back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSerifDisplay.variable} ${dmSans.variable} ${bebasNeue.variable} font-sans antialiased bg-obsidian text-ivory`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}