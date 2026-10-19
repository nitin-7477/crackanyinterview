import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { StudyProvider } from "@/context/StudyContext.jsx";
import { ThemeProvider } from "@/context/ThemeContext";
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
  title: "Crack Any Interview — LeetCode & TUF Style Frontend SDE Prep",
  description: "Prepare for JavaScript, React, and Frontend SDE interviews with curated sheets, LeetCode-style practice, and mock tests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${plexMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("app-theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <StudyProvider>
              {children}
            </StudyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
