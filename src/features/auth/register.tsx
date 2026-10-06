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

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  async function finishSocial() {
    signInSession();
    await navigate({ to: "/" });
  }

  async function handleSocial() {
    if (pending) return;
    setPending(true);
    await wait();
    await finishSocial();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextErrors: Record<string, string> = {};
    if (name.trim().length === 0) nextErrors.name = "Enter your full name";
    if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address";
    if (!isValidPassword(password)) {
      nextErrors.password = "Use at least 8 characters";
    }
    if (confirm !== password) nextErrors.confirm = "Passwords must match";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const order = ["name", "email", "password", "confirm"];
      const first = order.find((key) => nextErrors[key]);
      if (first) document.getElementById(`register-${first}`)?.focus();
      return;
    }

    setPending(true);
    await wait();
    await navigate({
      to: "/otp",
      search: { email: email.trim(), intent: "verify" },
    });
  }

  function update(field: string, value: string) {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirm") setConfirm(value);
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <AuthHeading
        title="Create your account"
        description="Start using Sales CRM with your work email."
      />

      <SocialAuth
        pending={pending}
        onGoogle={handleSocial}
        onApple={handleSocial}
      />

      <AuthDivider />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <AuthField
          id="register-name"
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          error={errors.name}
          disabled={pending}
          onChange={(event) => update("name", event.target.value)}
        />
        <AuthField
          id="register-email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          error={errors.email}
          disabled={pending}
          onChange={(event) => update("email", event.target.value)}
        />
        <PasswordField
          id="register-password"
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          error={errors.password}
          disabled={pending}
          onChange={(event) => update("password", event.target.value)}
        />
        <PasswordField
          id="register-confirm"
          label="Confirm password"
          name="confirm"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={confirm}
          error={errors.confirm}
          disabled={pending}
          onChange={(event) => update("confirm", event.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          size="none"
          className="h-11 w-full text-[14px]"
          disabled={pending}
          aria-busy={pending}
        >
          Create account
        </Button>
      </form>

      <AuthFooterLink
        prompt="Already have an account?"
        to="/login"
        label="Sign in"
      />
    </div>
  );
}
