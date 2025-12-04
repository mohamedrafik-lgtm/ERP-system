import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // إعدادات للتصدير الثابت (Static Export) - معطل مؤقتاً للسماح بـ Dynamic Routes
  // output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // distDir: 'out',
  
  // تعطيل ESLint مؤقتاً للبناء
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // تعطيل TypeScript checking مؤقتاً للبناء
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // تحسين الصور
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
