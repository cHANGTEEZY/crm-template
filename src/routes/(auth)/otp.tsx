import { createFileRoute } from "@tanstack/react-router";
import OtpPage from "@/features/auth/otp";
import { authHead } from "@/features/auth/lib/head";

const TITLE = "Verify email";
const DESCRIPTION = "Enter the 6-digit code sent to your email.";

export type OtpSearch = {
  email?: string;
  intent?: "verify" | "reset";
};

export const Route = createFileRoute("/(auth)/otp")({
  validateSearch: (search: Record<string, unknown>): OtpSearch => ({
    email: typeof search.email === "string" ? search.email : undefined,
    intent: search.intent === "reset" ? "reset" : undefined,
  }),
  component: OtpRoute,
  head: () => authHead(TITLE, DESCRIPTION, "/otp"),
});

function OtpRoute() {
  const { email, intent } = Route.useSearch();
  return <OtpPage email={email ?? ""} intent={intent ?? "verify"} />;
}
