import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  
  // Remove experimental features temporarily
  // experimental: {
  //   optimizePackageImports: ["lucide-react", "@radix-ui/react-tabs"],
  // },
  
  // Keep only essential optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
    ],
  },
});

export default withMDX(nextConfig);