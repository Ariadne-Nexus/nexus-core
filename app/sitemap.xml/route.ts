import { getSiteUrl } from "@/lib/site";

export const revalidate = 86_400;

export function GET() {
  const baseUrl = getSiteUrl();
  const lastModified = new Date().toISOString();
  const entries = [
    `${baseUrl}/`,
    `${baseUrl}/privacy`,
    `${baseUrl}/terms`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
      </url>`,
      )
      .join("\n")}
  </urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
