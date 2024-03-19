import generated from "@next/mdx";

const withMDX = generated({
  extension: /\.mdx?$/,
});

/**
 * @type {import("next").NextConfig}
 **/
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src"],
  },
  transpilePackages: [
    "@rosestack/docs"
  ],
};

export default withMDX(nextConfig);