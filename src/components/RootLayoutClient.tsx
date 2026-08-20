"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRoundPage = pathname.startsWith("/round/");

  // Round pages are full-screen game apps — no mobile container or bottom nav
  if (isRoundPage) {
    return <>{children}</>;
  }

  return (
    <div className="pb-16">
      <div className="w-full max-w-md mx-auto relative min-h-screen bg-background border-x border-white/5 shadow-2xl">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
