/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Mobile-biased breakpoints — most visitors land on small Android screens.
    deviceSizes: [360, 414, 600, 768, 1024, 1280, 1600],
  },
};

export default nextConfig;
