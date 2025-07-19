import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    domains: ['dsiwprmwzkvgdcdhzhwa.supabase.co','yxbboqcacbihxherpisb.supabase.co'], // allow images from Supabase
  },
};

export default nextConfig;
