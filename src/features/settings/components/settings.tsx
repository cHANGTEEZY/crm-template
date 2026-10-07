"use client";

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ConfirmMorph } from "@/components/arc/confirm-morph/confirm-morph";
import { HoldToConfirm } from "@/components/arc/hold-to-confirm/hold-to-confirm";
import AppearanceSwitch from "@/components/_common/appearance-switch";
import Avatar from "@/components/_ui/avatar";
import { Checkbox } from "@/components/_ui/checkbox";
import Field from "@/components/_ui/field";
import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";
import { useUiStore } from "@/features/app/stores/ui-store";
import { signOutSession } from "@/features/auth/lib/session";
import { CURRENT_USER } from "@/features/home/data/companies";
import SettingsHeader from "./header";

export default function Settings() {
  const navigate = useNavigate();
  const showToast = useUiStore((state) => state.showToast);
  const [name, setName] = useState(CURRENT_USER.name);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [digest, setDigest] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);

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
            <form
              className="flex flex-col gap-5"
              onSubmit={(event) => event.preventDefault()}
            >
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
                <ConfirmMorph
                  label="Save changes"
                  prompt="Save profile updates?"
                  confirmLabel="Save"
                  cancelLabel="Cancel"
                  pendingLabel="Saving"
                  doneLabel="Saved"
                  tone="neutral"
                  onConfirm={() => {
                    showToast({
                      title: "Profile saved",
                      description: "Your workspace profile is up to date.",
                    });
                  }}
                />
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
            <div>
              <AppearanceSwitch variant="reveal" />
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
              <HoldToConfirm
                label="Hold to log out"
                confirmedLabel="Signed out"
                tone="danger"
                onConfirm={logout}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
