/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rb.gy",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
