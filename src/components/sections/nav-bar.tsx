"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-foreground/70"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-xs font-semibold">
            IL
          </span>
          IVLABS
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-transparent px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground/85"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button className="hidden rounded-full px-6 py-2 text-xs uppercase tracking-[0.3em] shadow-none md:inline-flex">
            Join residency
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-foreground/15 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
