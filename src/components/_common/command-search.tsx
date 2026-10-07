"use client";

import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ExpandingSearch } from "@/components/arc/expanding-search/expanding-search";
import Button from "@/components/_ui/button";
import { useUiStore } from "@/features/app/stores/ui-store";
import { useCompaniesStore } from "@/features/home/stores/companies-store";
import { cn } from "@/lib/utils";
import SearchIcon from "@/public/assets/images/_common/search.svg?react";

const COMMAND_ITEM_ID = "open-command-palette";

type CommandSearchProps = {
  placeholder?: string;
  className?: string;
};

export default function CommandSearch({
  placeholder = "Search…",
  className,
}: CommandSearchProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const companies = useCompaniesStore((state) => state.companies);
  const openDetail = useCompaniesStore((state) => state.openDetail);

  const items = companies.map((company) => ({
    id: company.id,
    title: company.name,
    meta: company.owner,
    group: "Companies",
    keywords: [...company.tags],
  }));

  function openCommand() {
    setSearchOpen(true);
  }

  function goHome() {
    if (pathname !== "/") void navigate({ to: "/" });
  }

  return (
    <>
      <div
        className={cn(
          "max-sm:hidden min-w-[36px] sm:max-w-[20em] sm:flex-1",
          className,
        )}
      >
        <ExpandingSearch
          label={placeholder}
          placeholder={placeholder}
          items={items}
          suggestions={[
            {
              id: COMMAND_ITEM_ID,
              title: "Open command palette",
              meta: "⌘K",
              group: "Actions",
            },
          ]}
          suggestionsLabel="Quick actions"
          anchor="end"
          expandedWidth={320}
          emptyHint="Try a company name, or press ⌘K."
          onSelect={(item) => {
            if (item.id === COMMAND_ITEM_ID) {
              openCommand();
              return;
            }
            openDetail(item.id);
            goHome();
          }}
        />
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="sm:hidden"
        aria-label="Search"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={openCommand}
      >
        <SearchIcon aria-hidden className="size-3.5" />
      </Button>
    </>
  );
}
