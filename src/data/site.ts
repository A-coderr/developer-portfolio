const fallbackLocalUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  return withProtocol.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Anzhelika Kostyuk Portfolio",
  author: "Anzhelika Kostyuk",
  title: "Anzhelika Kostyuk | Software Developer & Creative Technologist",
  description:
    "Anzhelika Kostyuk develops web applications, interactive 3D, and Unity/C# games. Explore her projects and experiments through Anzhelika Lab.",
  locale: "en_CA",
  ogImagePath: "/opengraph-image",
  url: normalizeSiteUrl(
    process.env.SITE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL ??
      fallbackLocalUrl,
  ),
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
