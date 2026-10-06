"use client";

import Button from "@/components/_ui/button";
import { useUiStore } from "@/features/app/stores/ui-store";
import MenuIcon from "@/public/assets/images/_common/menu.svg?react";
import ActiveDot from "@/public/assets/images/companies/header/active-dot.svg?react";

export default function UsersHeader() {
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <header className="border-border shrink-0 border-b">
      <div className="flex items-center justify-between gap-2 px-4 py-[14px]">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon aria-hidden className="size-3.5" />
          </Button>
          <h1 className="truncate">Users</h1>
          <span className="caption-style bg-muted inline-flex shrink-0 items-center gap-0.5 rounded-full border border-[#363636] py-[3px] pr-[5px] pl-[3px]">
            <ActiveDot aria-hidden className="size-3" />
            Active
          </span>
        </div>
      </div>
    </header>
  );
}
