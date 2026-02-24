import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { ModeProvider } from "@/lib/mode";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";
import StatusBar from "@/components/StatusBar";
import TerminalEgg from "@/components/TerminalEgg";
import Galaxy from "@/components/Galaxy";

export const metadata: Metadata = {
  title: "Kumaran K | Software Developer & Data Analyst",
  description:
    "Final-year CSE student at Panimalar Engineering College (CGPA 8.5). Passionate about web development, data analytics, and machine learning. Open to internships & full-time roles.",
  keywords: "Kumaran K, Software Developer, CSE Student, React, Python, Data Analyst, Portfolio, Tamil Nadu",
  authors: [{ name: "Kumaran K" }],
  openGraph: {
    title: "Kumaran K | Software Developer",
    description:
      "Pre-Final-year CSE student passionate about web dev, data analytics & ML. Open to opportunities.",
    url: "https://kumaran-portfolio.vercel.app",
    siteName: "Kumaran K Portfolio",
    type: "website",
    images: [{ url: "/kumaran-profile.jpg", width: 800, height: 900, alt: "Kumaran K" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumaran K | Software Developer",
    description: "Pre-Final-year CSE student passionate about web dev & ML. Open to opportunities.",
    images: ["/kumaran-profile.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-inter)' }}>
        {/* Galaxy Background - Fixed full screen behind everything */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          <Galaxy
            starSpeed={0.2}
            density={1.5}
            hueShift={180}
            speed={1}
            glowIntensity={0.7}
            saturation={3.0}
            mouseRepulsion={true}
            repulsionStrength={1.5}
            twinkleIntensity={0.5}
            rotationSpeed={0.15}
            transparent={false}
          />
        </div>

        <ThemeProvider>
          <ModeProvider>
            <div className="relative z-10">
              <StatusBar />
              <CursorGlow />
              {children}
              <BackToTop />
              <TerminalEgg />
            </div>
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
