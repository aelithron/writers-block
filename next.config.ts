import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
      port: "",
      pathname: "/a/**",
    },
    {
      protocol: "https",
      hostname: "cdn.discordapp.com",
      port: "",
      pathname: "/avatars/**",
    }]
  },
  output: "standalone",
};

export default nextConfig;
