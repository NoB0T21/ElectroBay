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
    ],
    domains: [
      "dsiwprmwzkvgdcdhzhwa.supabase.co",
      "yxbboqcacbihxherpisb.supabase.co",
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
