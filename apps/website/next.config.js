import generated from "@next/mdx";

const withMDX = generated({
  extension: /\.mdx?$/,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcMinify: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [ "src" ],
  },
  transpilePackages: [
    "@rosestack/components",
    "~/software",
  ],
};

export default withMDX(nextConfig);