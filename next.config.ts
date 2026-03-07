import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.46.147.155", "10.46.147.155:3000", "localhost", "localhost:3000"]
};

export default withNextIntl(nextConfig);