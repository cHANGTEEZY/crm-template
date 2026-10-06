export const SITE_NAME = "Sales CRM";
export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://example.com";
export const SITE_DESCRIPTION = "Company pipeline for the sales team.";
export const DEFAULT_OG_IMAGE = "/opengraph-image.jpg";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export const SITE_ROUTES: SiteRoute[] = [
  {
    path: "/",
    title: "Companies",
    description: SITE_DESCRIPTION,
    changeFrequency: "weekly",
    priority: 1,
  },
];

type PageHeadOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function headMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: PageHeadOptions) {
  const url = absoluteUrl(path);

  return [
    { title },
    { name: "description", content: description },
    { property: "og:locale", content: "en" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: absoluteUrl(image) },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteUrl(image) },
  ];
}

export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}
