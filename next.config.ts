import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'scontent.fhan17-1.fna.fbcdn.net',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'dev.mypagevn.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
