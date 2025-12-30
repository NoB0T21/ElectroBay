import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dsiwprmwzkvgdcdhzhwa.supabase.co",
      },
      {
        protocol: "https",
        hostname: "yxbboqcacbihxherpisb.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    domains: [
      "dsiwprmwzkvgdcdhzhwa.supabase.co",
      "yxbboqcacbihxherpisb.supabase.co",
      "lh3.googleusercontent.com"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TS errors during build
  },
};

export default nextConfig;
