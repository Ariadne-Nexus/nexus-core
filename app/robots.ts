import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/demo/view"],
      },
    ],
    sitemap: "https://ariadnenexus.com/sitemap.xml",
  };
}
