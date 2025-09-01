import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
