import { createFileRoute } from "@tanstack/react-router";
import UsersPage from "@/features/users/page";
import { canonicalLink, headMeta } from "@/lib/seo";

const TITLE = "Users";
const DESCRIPTION = "Manage user accounts and permissions.";

export const Route = createFileRoute("/_app/users")({
  component: UsersPage,
  head: () => ({
    meta: headMeta({
      title: TITLE,
      description: DESCRIPTION,
      path: "/users",
    }),
    links: canonicalLink("/users"),
  }),
});
