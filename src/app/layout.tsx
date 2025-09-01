import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

// import { Navbar } from "@/components/ui/Navbar";
import { StoreProvider } from "@/lip/StoreProvider";
import ProtectedLayout from "./protected-layout";
import DynamicMetadata from "@/components/DynamicMetadata";
// import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "نظام إدارة التدريب المتقدم",
  description: "منصة شاملة لإدارة البرامج التدريبية والمحتوى التعليمي والاختبارات الإلكترونية",
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicon-32x32.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: "نظام إدارة التدريب المتقدم",
    description: "منصة شاملة لإدارة البرامج التدريبية والمحتوى التعليمي والاختبارات الإلكترونية",
    images: [
      {
        url: '/favicon-32x32.png',
        width: 1200,
        height: 630,
        alt: 'نظام إدارة التدريب المتقدم',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "نظام إدارة التدريب المتقدم",
    description: "منصة شاملة لإدارة البرامج التدريبية والمحتوى التعليمي والاختبارات الإلكترونية",
    images: ['/favicon-32x32.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-gray-100`}
      >
        <StoreProvider>
          <ProtectedLayout>
            <DynamicMetadata />
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </ProtectedLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
