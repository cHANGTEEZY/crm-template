"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Kbd,
} from "@/components/_ui/command";
import { CommandCompanyRow, CommandTableHeader } from "./command-table";
import { useUiStore } from "@/features/app/stores/ui-store";
import { useCompaniesStore } from "@/features/home/stores/companies-store";
import PlusIcon from "@/public/assets/images/_common/plus.svg?react";

export default function CommandMenu() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const open = useUiStore((state) => state.searchOpen);
  const setOpen = useUiStore((state) => state.setSearchOpen);
  const companies = useCompaniesStore((state) => state.companies);
  const openDetail = useCompaniesStore((state) => state.openDetail);
  const setNewCompanyOpen = useCompaniesStore(
    (state) => state.setNewCompanyOpen,
  );
  const [query, setQuery] = useState("");
  const actionRan = useRef(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k") return;
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) {
        return;
      }
      event.preventDefault();
      const { searchOpen, setSearchOpen } = useUiStore.getState();
      setSearchOpen(!searchOpen);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function goHome(action: () => void) {
    actionRan.current = true;
    setOpen(false);
    action();
    if (pathname !== "/") void navigate({ to: "/" });
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search"
      description="Search companies by name, owner, segment or stage"
      className="max-w-[960px]"
      onCloseAutoFocus={(event) => {
        if (actionRan.current) event.preventDefault();
        actionRan.current = false;
        setQuery("");
      }}
    >
      <Command>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search companies, owners, stages…"
          trailing={<Kbd>Esc</Kbd>}
        />
        <CommandTableHeader />
        <CommandList>
          <CommandEmpty>No results for “{query}”</CommandEmpty>
          <CommandGroup>
            {companies.map((company) => (
              <CommandCompanyRow
                key={company.id}
                company={company}
                onSelect={() => goHome(() => openDetail(company.id))}
              />
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem
              value="new-company"
              keywords={["New Company", "Add", "Create"]}
              onSelect={() => goHome(() => setNewCompanyOpen(true))}
            >
              <span className="bg-muted flex size-6 shrink-0 items-center justify-center rounded-md shadow-[0px_0px_0px_1px_#232323]">
                <PlusIcon aria-hidden className="text-soft size-3" />
              </span>
              New Company
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandFooter>
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>↵</Kbd>
            Open
          </span>
        </CommandFooter>
      </Command>
    </CommandDialog>
  );
}
