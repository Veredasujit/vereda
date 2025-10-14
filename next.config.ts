import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','vereda.co.in'], // ✅ allow Cloudinary images
  },
};

export default nextConfig;

