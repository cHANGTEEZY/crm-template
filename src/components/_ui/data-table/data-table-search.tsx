"use client";

import { useEffect, useId, useState, type ComponentProps } from "react";
import { SearchField } from "@/components/arc/search-field/search-field";
import { useDeferredCallback } from "@/hooks/use-deferred-callback";
import { cn } from "@/lib/utils";

export const TABLE_SEARCH_DEBOUNCE_MS = 300;

type DataTableSearchProps = Omit<
  ComponentProps<"input">,
  "value" | "onChange" | "type" | "placeholder" | "size"
> & {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md";
  debounce?: boolean;
  debounceMs?: number;
  throttle?: boolean;
  throttleMs?: number;
};

export default function DataTableSearch({
  value,
  onValueChange,
  placeholder = "Search…",
  size = "sm",
  debounce = true,
  debounceMs = TABLE_SEARCH_DEBOUNCE_MS,
  throttle = false,
  throttleMs = 200,
  id,
  className,
  name = "search",
  ...props
}: DataTableSearchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [query, setQuery] = useState(value);
  const label = props["aria-label"] ?? placeholder;

  const emit = useDeferredCallback(onValueChange, {
    debounceMs: debounce ? debounceMs : 0,
    throttleMs: throttle ? throttleMs : 0,
  });

  useEffect(() => {
    if (value === "") setQuery("");
  }, [value]);

  function update(next: string) {
    setQuery(next);
    emit(next);
  }

  return (
    <div
      className={cn(
        "min-w-0 [&>div]:gap-0 [&>div>label]:sr-only",
        size === "sm" && "[--control-height-md:30px]",
        className,
      )}
    >
      <SearchField
        {...props}
        id={inputId}
        name={name}
        label={label}
        value={query}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        onValueChange={update}
      />
    </div>
  );
}
