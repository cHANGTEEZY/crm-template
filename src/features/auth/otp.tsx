"use client";

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import Button from "@/components/_ui/button";
import AuthHeading from "./components/auth-heading";
import OtpField from "./components/otp-field";
import { DEMO_OTP, isDemoOtp, signInSession, wait } from "./lib/session";

type OtpPageProps = {
  email: string;
  intent: "verify" | "reset";
};

export default function OtpPage({ email, intent }: OtpPageProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  const destination = email || "your email";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      document.getElementById("otp-code")?.focus();
      return;
    }

    if (!isDemoOtp(code)) {
      setError("That code is incorrect. Try 123456.");
      document.getElementById("otp-code")?.focus();
      return;
    }

    setPending(true);
    setError("");
    await wait();

    if (intent === "reset") {
      await navigate({
        to: "/reset-password",
        search: { email, step: "password" },
      });
      return;
    }

    signInSession();
    await navigate({ to: "/" });
  }

  async function handleResend() {
    if (pending) return;
    setPending(true);
    setError("");
    await wait();
    setCode("");
    setStatus(`A new code was sent to ${destination}. Use ${DEMO_OTP}.`);
    setPending(false);
    document.getElementById("otp-code")?.focus();
  }

  return (
    <div className="flex flex-col gap-8">
      <AuthHeading
        title="Check your email"
        description={`Enter the 6-digit code sent to ${destination}. For this demo, use ${DEMO_OTP}.`}
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <OtpField
          id="otp-code"
          value={code}
          error={error}
          disabled={pending}
          onChange={(value) => {
            setCode(value);
            if (error) setError("");
          }}
        />

        {status ? (
          <p role="status" className="caption-style text-soft">
            {status}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="none"
          className="h-11 w-full text-[14px]"
          disabled={pending}
          aria-busy={pending}
        >
          Verify code
        </Button>
      </form>

      <div className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground text-center">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            className="text-foreground underline decoration-from-font underline-offset-2 hover:text-soft disabled:opacity-50"
            disabled={pending}
            onClick={handleResend}
          >
            Resend
          </button>
        </p>
        <Link
          to="/login"
          className="caption-style text-soft hover:text-foreground underline decoration-from-font underline-offset-2"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
