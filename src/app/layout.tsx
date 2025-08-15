import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skeleton Loader Generator - Transform UI Mockups into Code",
  description:
    "Transform your UI mockups into production-ready skeleton loaders in seconds. No coding required! Visual editor with instant code generation for React and CSS.",
  keywords:
    "skeleton loader, UI mockup, code generator, React, CSS, frontend development",
  openGraph: {
    title: "Skeleton Loader Generator - Transform UI Mockups into Code",
    description:
      "Transform your UI mockups into production-ready skeleton loaders in seconds. No coding required!",
    url: "https://skeleton-loader-generator-ashwani.vercel.app/",
    siteName: "Skeleton Loader Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skeleton Loader Generator - Transform UI Mockups into Code",
    description:
      "Transform your UI mockups into production-ready skeleton loaders in seconds. No coding required!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
