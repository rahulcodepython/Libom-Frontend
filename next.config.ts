import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        BASE_API_URL: process.env.BASE_API_URL
    },
    output: 'standalone',
};

export default nextConfig;
