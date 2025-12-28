import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit:'100MB',
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'play.min.io'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: '6b3f0748-731e-4c7b-a0b9-1516ab2e77fd.658be3462fe46cafdc26bba0ffe1973d.r2.cloudflarestorage.com'
      },
      
     
    ]
  }
};

export default nextConfig;
