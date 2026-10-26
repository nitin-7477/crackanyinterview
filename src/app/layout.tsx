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
  title: "Crack Any Interview — Free Frontend & Mobile SDE Interview Prep",
  description: "Master JavaScript, React, React Native, tricky output challenges, and algorithms with curated day-by-day sheets and mock interviews.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`dark ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--ink)] antialiased transition-colors duration-200">
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("app-theme")||"dark";document.documentElement.setAttribute("data-theme",t);if(t==="dark"){document.documentElement.classList.add("dark");document.documentElement.classList.remove("light");}else{document.documentElement.classList.add("light");document.documentElement.classList.remove("dark");}}catch(e){}})()`,
          }}
        />
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
