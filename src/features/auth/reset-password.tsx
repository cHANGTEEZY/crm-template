"use client";

import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import Button from "@/components/_ui/button";
import AuthDivider from "./components/auth-divider";
import AuthField from "./components/auth-field";
import AuthFooterLink from "./components/auth-footer-link";
import AuthHeading from "./components/auth-heading";
import PasswordField from "./components/password-field";
import SocialAuth from "./components/social-auth";
import {
  isValidEmail,
  isValidPassword,
  signInSession,
  wait,
} from "./lib/session";

type ResetStep = "email" | "password";

type ResetPasswordPageProps = {
  email: string;
  step: ResetStep;
};

export default function ResetPasswordPage({
  email: initialEmail,
  step,
}: ResetPasswordPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSocial() {
    if (pending) return;
    setPending(true);
    await wait();
    signInSession();
    await navigate({ to: "/" });
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      document.getElementById("reset-email")?.focus();
      return;
    }

    setPending(true);
    await wait();
    await navigate({
      to: "/otp",
      search: { email: email.trim(), intent: "reset" },
    });
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextPasswordError = isValidPassword(password)
      ? ""
      : "Use at least 8 characters";
    const nextConfirmError =
      confirm === password ? "" : "Passwords must match";

    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);

    if (nextPasswordError || nextConfirmError) {
      const first = nextPasswordError ? "reset-password" : "reset-confirm";
      document.getElementById(first)?.focus();
      return;
    }

    setPending(true);
    await wait();
    signInSession();
    await navigate({ to: "/" });
  }

  if (step === "password") {
    return (
      <div className="flex flex-col gap-8">
        <AuthHeading
          title="Choose a new password"
          description="Use at least 8 characters. You'll be signed in after you save it."
        />

        <form
          className="flex flex-col gap-5"
          onSubmit={handlePasswordSubmit}
          noValidate
        >
          <PasswordField
            id="reset-password"
            label="New password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            error={passwordError}
            disabled={pending}
            onChange={(event) => {
              setPassword(event.target.value);
              if (passwordError) setPasswordError("");
            }}
          />
          <PasswordField
            id="reset-confirm"
            label="Confirm password"
            name="confirm"
            autoComplete="new-password"
            placeholder="Repeat password"
            value={confirm}
            error={confirmError}
            disabled={pending}
            onChange={(event) => {
              setConfirm(event.target.value);
              if (confirmError) setConfirmError("");
            }}
          />
          <Button
            type="submit"
            variant="primary"
            size="none"
            className="h-11 w-full text-[14px]"
            disabled={pending}
            aria-busy={pending}
          >
            Save password
          </Button>
        </form>

        <AuthFooterLink prompt="Remember it?" to="/login" label="Sign in" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AuthHeading
        title="Reset your password"
        description="Enter the email on your account. We'll send a 6-digit code."
      />

      <SocialAuth
        pending={pending}
        onGoogle={handleSocial}
        onApple={handleSocial}
      />

      <AuthDivider />

      <form
        className="flex flex-col gap-5"
        onSubmit={handleEmailSubmit}
        noValidate
      >
        <AuthField
          id="reset-email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          error={emailError}
          disabled={pending}
          onChange={(event) => {
            setEmail(event.target.value);
            if (emailError) setEmailError("");
          }}
        />
        <Button
          type="submit"
          variant="primary"
          size="none"
          className="h-11 w-full text-[14px]"
          disabled={pending}
          aria-busy={pending}
        >
          Send code
        </Button>
      </form>

      <AuthFooterLink prompt="Remember it?" to="/login" label="Sign in" />
    </div>
  );
}
