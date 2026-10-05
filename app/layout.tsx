import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TextFix — Your Textbooks, Perfected | Ethiopia's New Curriculum Corrections",
  description:
    "Evidence-based, transparent corrections for Ethiopia's New Curriculum textbooks (Grades 9–12). Researched with scientific rigor, human-verified, and openly published for Ethiopian students and educators.",
  keywords: [
    "Ethiopian New Curriculum",
    "Grade 11 Biology corrections",
    "Ethiopia textbook errors",
    "TextFix Ethiopia",
    "Ministry of Education Ethiopia textbooks",
    "Grade 9 10 11 12 textbooks",
    "educational research Ethiopia",
  ],
  authors: [{ name: "TextFix Research Team" }],
  openGraph: {
    title: "TextFix — Evidence-Based Corrections for Ethiopia's New Curriculum",
    description: "Your Textbooks, Perfected. Transparent, scientific corrections for Ethiopian high school textbooks.",
    url: "https://textfix.org",
    siteName: "TextFix",
    images: [
      {
        url: "/images/hero-floating.jpg",
        width: 1200,
        height: 630,
        alt: "TextFix — Your Textbooks, Perfected",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
