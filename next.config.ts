import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export, served by GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // GitHub-flavored markdown: tables, strikethrough, and footnotes for sourcing.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
