import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://adama-komi.dev/sitemap.xml",
    host: "https://adama-komi.dev",
  };
}
