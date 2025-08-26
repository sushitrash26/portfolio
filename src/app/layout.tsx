import type { Metadata } from "next";
import { Geist, Geist_Mono, Ojuju, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ojuju = Ojuju({
  variable: "--font-ojuju",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Astitva Pathak",
  description: "Portfolio Website : Astitva Pathak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ojuju.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
