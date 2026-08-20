"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Mocked Auth State
  const isLoggedIn = false;

  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Competition", href: "/competition" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Rules", href: "/rules" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold tracking-tight text-lg hidden sm:inline-block bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            AIGNITE AI ARCADE
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AUTH ACTIONS */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium">
                P1
              </div>
              <span className="text-sm font-medium text-zinc-300">Player One</span>
            </div>
          ) : (
            <Link href="/auth">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur px-4 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border/40">
            <Link href="/auth" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
