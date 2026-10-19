import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { StudyProvider } from "@/context/StudyContext.jsx";
import "@/css/styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interview Prep — JS, Output, React, React Native",
  description: "Prepare for JavaScript, React, and React Native frontend interviews with structured day-wise plans and mock tests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <AuthProvider>
          <StudyProvider>
            {children}
          </StudyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
