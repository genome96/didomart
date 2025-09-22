/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-domain.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    NEXT_PUBLIC_CLIENT_URL:
      process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+254700000000",
    NEXT_PUBLIC_BUSINESS_NAME:
      process.env.NEXT_PUBLIC_BUSINESS_NAME || "Your Business",
    NEXT_PUBLIC_BUSINESS_EMAIL:
      process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@yourbusiness.com",
    NEXT_PUBLIC_BUSINESS_PHONE:
      process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+254700000000",
    NEXT_PUBLIC_BUSINESS_ADDRESS:
      process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Your Business Address",
  },
};

module.exports = nextConfig;
