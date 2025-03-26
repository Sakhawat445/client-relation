import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', "placehold.co", "flagcdn.com"], // Allow Cloudinary images
  },
};


export default nextConfig;
