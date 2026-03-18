import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import Header from "@/Component/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElectroBay",
  description: "Powering your tech needs — from gadgets to gear, all in one smart store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <Header/>
        {children}
        <footer className="hidden md:block border-t border-border py-8">
          <div className="container text-center text-sm text-muted-foreground">
            <p className="font-display text-base text-foreground mb-1">ElectroBay</p>
            <p>Supporting your neighborhood, one purchase at a time.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
