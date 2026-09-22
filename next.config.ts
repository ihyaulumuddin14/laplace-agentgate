import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Plugins are referenced by name so they stay serializable for Turbopack.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
