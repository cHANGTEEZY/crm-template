import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/features/auth/login";
import { authHead } from "@/features/auth/lib/head";

const TITLE = "Sign in";
const DESCRIPTION = "Sign in to Sales CRM.";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginPage,
  head: () => authHead(TITLE, DESCRIPTION, "/login"),
});
