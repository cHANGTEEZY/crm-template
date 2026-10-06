import Sidebar from "@/features/home/components/sidebar/sidebar";
import Companies from "@/features/home/components/companies";

export default function Home() {
  return (
    <main className="flex h-dvh max-w-full overflow-hidden">
      <Sidebar />
      <Companies />
    </main>
  );
}
