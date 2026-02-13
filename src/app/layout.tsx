import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicPlayer } from "@/components/music-player";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brooklyn 99 Trivia Battle",
  description:
    "Battle through 6 Brooklyn Nine-Nine bosses in this Pokemon-style trivia gauntlet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} font-sans antialiased`}>
        <TooltipProvider>
          {children}
          <MusicPlayer />
        </TooltipProvider>
      </body>
    </html>
  );
}
