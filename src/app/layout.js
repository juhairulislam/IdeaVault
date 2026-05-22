import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@/components/ThemeProvider';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault – Startup Idea Sharing Platform",
  description: "IdeaVault is a web-based platform where users can share innovative startup ideas, explore ideas posted by others, and engage through comments, and discussions. The system encourages creativity, collaboration, and validation of ideas through community interaction",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        </ThemeProvider>
        </body>
    </html>
  );
}
