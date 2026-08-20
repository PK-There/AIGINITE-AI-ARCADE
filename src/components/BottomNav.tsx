"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Swords, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const NAV_LINKS = [
    { name: "Home", href: "/", icon: Home },
    { name: "Arena", href: "/competition", icon: Swords },
    { name: "Ranks", href: "/leaderboard", icon: Trophy },
    { name: "Profile", href: "/dashboard", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 border-t border-white/10 bg-black/80 backdrop-blur-xl pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? "bg-primary/20" : "bg-transparent"}`}>
                <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : ""}`} />
              </div>
              <span className="text-[10px] font-medium tracking-wide">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
