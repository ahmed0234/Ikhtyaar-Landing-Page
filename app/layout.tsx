import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Righteous } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ikhtyaar",
  description: "Ikhtyaar landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable}  h-full antialiased`}
    >
      <link
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,501,700&display=swap"
        rel="stylesheet"
      />

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
