import type { ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-dvh max-w-full overflow-hidden">
      <Sidebar />
      {children}
    </main>
  );
}
