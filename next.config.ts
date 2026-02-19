import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for local images
  images: {
    formats: ["image/webp"],
  },
  // SCSS modules work out of the box with sass installed
};

export default nextConfig;
