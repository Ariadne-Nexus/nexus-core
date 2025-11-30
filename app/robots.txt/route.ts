import { getSiteHostname, getSiteUrl } from "@/lib/site";

export const revalidate = 86_400;

export function GET() {
  const siteUrl = getSiteUrl();
  const hostname = getSiteHostname();
  const body = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
Host: ${hostname}`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
