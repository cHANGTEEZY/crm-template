import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/features/home/page";
import { SITE_DESCRIPTION, canonicalLink, headMeta } from "@/lib/seo";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
  head: () => ({
    meta: headMeta({
      title: "Companies",
      description: SITE_DESCRIPTION,
      path: "/",
    }),
    links: canonicalLink("/"),
  }),
});
