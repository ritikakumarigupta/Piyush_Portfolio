import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyush Kumar Gupta | Karmayog Studio - Video Editor & Motion Designer",
  description: "Piyush Kumar Gupta - Video Editor, Motion Graphics Designer & AI Video Creator. Professional Video Editing, Motion Graphics & AI Video Content for YouTube, Reels, Ads & Corporate projects.",
  keywords: [
    "Piyush Kumar Gupta",
    "Karmayog Studio",
    "Video Editor",
    "Motion Graphics Designer",
    "AI Video Creator",
    "YouTube Video Editor",
    "Instagram Reels Editor",
    "Commercial Ads",
    "DaVinci Resolve",
    "Premiere Pro",
    "After Effects",
  ],
  authors: [{ name: "Piyush Kumar Gupta" }],
  openGraph: {
    title: "Piyush Kumar Gupta | Video Editor & Motion Graphics Designer",
    description: "3+ years turning raw footage into videos people actually watch till the end. Karmayog Studio.",
    url: "https://karmayogstudio.com",
    siteName: "Karmayog Studio",
    images: [
      {
        url: "/assets/portrait-hero-transparent.png",
        width: 1200,
        height: 630,
        alt: "Piyush Kumar Gupta - Karmayog Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/assets/karmayog-logo.svg",
    apple: "/assets/karmayog-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#EDEDED] antialiased min-h-screen selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
