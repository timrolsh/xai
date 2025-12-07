import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "me7aitdbxq.ufs.sh", // Keeping this just in case, though I'll prefer Unsplash
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com", // X/Twitter profile images
      },
      {
        protocol: "https",
        hostname: "imgen.x.ai", // xAI generated images
      },
    ],
  },
};

export default nextConfig;
