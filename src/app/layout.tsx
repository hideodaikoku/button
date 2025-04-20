import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Doto } from "next/font/google"; // Import Doto font
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dotoFont = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
});

export const metadata: Metadata = {
  title: "button",
  description: "a website that takes you to a random hacker news article",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${dotoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}