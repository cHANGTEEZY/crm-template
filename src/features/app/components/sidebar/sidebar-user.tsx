"use client";

import { useNavigate } from "@tanstack/react-router";
import Avatar from "@/components/_ui/avatar";
import Button from "@/components/_ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_ui/dropdown-menu";
import { signOutSession } from "@/features/auth/lib/session";
import { CURRENT_USER } from "@/features/home/data/companies";
import { useUiStore } from "@/features/app/stores/ui-store";
import { useTheme } from "@/hooks/use-theme";
import type { Theme } from "@/lib/theme";
import ChevronDownIcon from "@/public/assets/images/_common/chevron-down.svg?react";
import { GearIcon, LogoutIcon } from "./sidebar-icons";

export default function SidebarUser() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  function closeMobile() {
    setSidebarOpen(false);
  }

  function openSettings() {
    closeMobile();
    void navigate({ to: "/settings" });
  }

  function logout() {
    signOutSession();
    closeMobile();
    void navigate({ to: "/login" });
  }

  return (
    <div className="border-sidebar-border shrink-0 border-t p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label={`Account menu for ${CURRENT_USER.name}`}
            className="group h-auto w-full items-center justify-start gap-2 rounded-lg px-1.5 py-1.5 data-[state=open]:bg-sidebar-primary"
          >
            <Avatar
              src={CURRENT_USER.avatar}
              alt=""
              className="size-8 outline-sidebar-border"
            />
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[13px] leading-none font-medium text-foreground">
                {CURRENT_USER.name}
              </span>
              <span className="caption-style text-subtle mt-1.5 block truncate">
                {CURRENT_USER.role}
              </span>
            </span>
            <ChevronDownIcon
              aria-hidden
              className="text-subtle size-3 shrink-0 transition-transform duration-200 ease-power3-out group-data-[state=open]:rotate-180"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          sideOffset={8}
          className="z-[80] w-(--radix-dropdown-menu-trigger-width)"
        >
          <div className="px-2 py-1.5">
            <p className="truncate text-[13px] leading-none font-medium">
              {CURRENT_USER.name}
            </p>
            <p className="caption-style text-subtle mt-1.5 truncate">
              {CURRENT_USER.email}
            </p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={openSettings}>
            <GearIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as Theme)}
          >
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={logout}
            className="text-danger data-[highlighted]:text-danger"
          >
            <LogoutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
