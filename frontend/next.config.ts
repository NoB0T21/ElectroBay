import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "dsiwprmwzkvgdcdhzhwa.supabase.co",
      },
    ],
    domains: ['dsiwprmwzkvgdcdhzhwa.supabase.co'], // allow images from Supabase
  },
};

export default nextConfig;
