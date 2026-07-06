import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Free Enneagram Test",
  description:
    "Take a free Enneagram personality test. Discover your type, wing, and score breakdown — entirely in your browser, nothing stored.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-stone-50 font-sans text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}