import { createFileRoute } from "@tanstack/react-router";
import ResetPasswordPage from "@/features/auth/reset-password";
import { authHead } from "@/features/auth/lib/head";

const TITLE = "Reset password";
const DESCRIPTION = "Reset your Sales CRM password with a 6-digit code.";

export type ResetPasswordSearch = {
  email?: string;
  step?: "email" | "password";
};

export const Route = createFileRoute("/(auth)/reset-password")({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => ({
    email: typeof search.email === "string" ? search.email : undefined,
    step: search.step === "password" ? "password" : undefined,
  }),
  component: ResetPasswordRoute,
  head: () => authHead(TITLE, DESCRIPTION, "/reset-password"),
});

function ResetPasswordRoute() {
  const { email, step } = Route.useSearch();
  return <ResetPasswordPage email={email ?? ""} step={step ?? "email"} />;
}
