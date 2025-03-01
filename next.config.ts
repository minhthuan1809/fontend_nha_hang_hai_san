import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "scontent.fhan17-1.fna.fbcdn.net",
      },
      {
        hostname: "res.cloudinary.com",
        port: "", // Thêm port nếu cần thiết
        pathname: "/**", // Thêm pathname để cho phép tất cả các đường dẫn
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "dev.mypagevn.com",
      },
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "thegioihaisan.vn",
      },
      {
        hostname: "res.cloudinary.com", // Đảm bảo hostname này được thêm vào
        pathname: "/**", // Thêm pathname để cho phép tất cả các đường dẫn
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
