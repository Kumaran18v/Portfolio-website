import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { ModeProvider } from "@/lib/mode";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";
import StatusBar from "@/components/StatusBar";
import TerminalEgg from "@/components/TerminalEgg";

export const metadata: Metadata = {
  title: "Kumaran K | Software Developer & Data Analyst",
  description:
    "Final-year CSE student at Panimalar Engineering College (CGPA 8.5). Passionate about web development, data analytics, and machine learning. Open to internships & full-time roles.",
  keywords: "Kumaran K, Software Developer, CSE Student, React, Python, Data Analyst, Portfolio, Tamil Nadu",
  authors: [{ name: "Kumaran K" }],
  openGraph: {
    title: "Kumaran K | Software Developer",
    description:
      "Final-year CSE student passionate about web dev, data analytics & ML. Open to opportunities.",
    url: "https://kumaran-portfolio.vercel.app",
    siteName: "Kumaran K Portfolio",
    type: "website",
    images: [{ url: "/kumaran-profile.jpg", width: 800, height: 900, alt: "Kumaran K" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumaran K | Software Developer",
    description: "Final-year CSE student passionate about web dev & ML. Open to opportunities.",
    images: ["/kumaran-profile.jpg"],
  },
  robots: { index: true, follow: true },
};

import { Inter, Fira_Code } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-inter)' }}>
        <ThemeProvider>
          <ModeProvider>
            <StatusBar />
            <CursorGlow />
            {children}
            <BackToTop />
            <TerminalEgg />
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
