"use client";

import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import Avatar from "@/components/_ui/avatar";
import Button from "@/components/_ui/button";
import { Checkbox } from "@/components/_ui/checkbox";
import Field from "@/components/_ui/field";
import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";
import {
  MoonIcon,
  SunIcon,
} from "@/features/app/components/sidebar/sidebar-icons";
import { signOutSession } from "@/features/auth/lib/session";
import { CURRENT_USER } from "@/features/home/data/companies";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import SettingsHeader from "./header";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(CURRENT_USER.name);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [saved, setSaved] = useState(false);
  const [digest, setDigest] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  function logout() {
    signOutSession();
    void navigate({ to: "/login" });
  }

  return (
    <section id="settings" className="flex min-h-0 min-w-0 flex-1 flex-col">
      <SettingsHeader />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[36em] flex-col gap-10 px-6 py-8">
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h2>Profile</h2>
              <p className="text-subtle">
                How you appear across the workspace.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar
                src={CURRENT_USER.avatar}
                alt=""
                className="size-12 outline-line-strong"
              />
              <div className="min-w-0">
                <p className="truncate font-medium">{CURRENT_USER.name}</p>
                <p className="caption-style text-subtle mt-1.5 truncate">
                  {CURRENT_USER.role}
                </p>
              </div>
            </div>
            <form className="flex flex-col gap-5" onSubmit={saveProfile}>
              <Field label="Name" htmlFor="settings-name">
                <Input
                  id="settings-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" htmlFor="settings-email">
                <Input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field label="Role" htmlFor="settings-role">
                <Input
                  id="settings-role"
                  value={CURRENT_USER.role}
                  readOnly
                  className="text-subtle"
                />
              </Field>
              <div>
                <Button variant="primary" size="md" type="submit">
                  {saved ? "Saved" : "Save changes"}
                </Button>
              </div>
            </form>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h2>Appearance</h2>
              <p className="text-subtle">
                Switch between dark and light for this browser.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
                className={cn(
                  "flex cursor-pointer flex-col gap-3 rounded-xl border p-3 text-left outline-none transition-[border-color,background-color] duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60",
                  theme === "dark"
                    ? "border-ring bg-muted"
                    : "border-border bg-secondary hover:border-line-strong",
                )}
              >
                <span className="flex h-16 items-end rounded-lg bg-[#161616] p-2">
                  <span className="h-6 w-8 rounded-sm bg-[#2a2a2a]" />
                  <span className="ml-1 h-6 flex-1 rounded-sm bg-[#1b1d20]" />
                </span>
                <span className="flex items-center gap-1.5 text-[13px] leading-none font-medium">
                  <MoonIcon />
                  Dark
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
                className={cn(
                  "flex cursor-pointer flex-col gap-3 rounded-xl border p-3 text-left outline-none transition-[border-color,background-color] duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60",
                  theme === "light"
                    ? "border-ring bg-muted"
                    : "border-border bg-secondary hover:border-line-strong",
                )}
              >
                <span className="flex h-16 items-end rounded-lg bg-[#f6f6f4] p-2">
                  <span className="h-6 w-8 rounded-sm bg-[#e7e7e3]" />
                  <span className="ml-1 h-6 flex-1 rounded-sm bg-white" />
                </span>
                <span className="flex items-center gap-1.5 text-[13px] leading-none font-medium">
                  <SunIcon />
                  Light
                </span>
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h2>Notifications</h2>
              <p className="text-subtle">
                Choose which updates reach you by email.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="settings-digest"
                className="flex cursor-pointer items-center gap-2.5 text-[14px] text-foreground"
              >
                <Checkbox
                  id="settings-digest"
                  checked={digest}
                  onCheckedChange={(value) => setDigest(value === true)}
                />
                Weekly pipeline digest
              </Label>
              <Label
                htmlFor="settings-deals"
                className="flex cursor-pointer items-center gap-2.5 text-[14px] text-foreground"
              >
                <Checkbox
                  id="settings-deals"
                  checked={dealAlerts}
                  onCheckedChange={(value) => setDealAlerts(value === true)}
                />
                Deal stage alerts
              </Label>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h2>Session</h2>
              <p className="text-subtle">
                Sign out of this browser. You can sign back in at any time.
              </p>
            </div>
            <div>
              <Button variant="muted" size="md" onClick={logout}>
                Log out
              </Button>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
