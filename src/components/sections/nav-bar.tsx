"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { useEffect, useState } from "react";
import { GridM } from "../grid-m";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isTop = scrollPosition <= 10;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-screen bg-primary-foreground backdrop-blur-sm"
      )}
    >
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 z-99 py-4")}>
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 text-md font-bold uppercase tracking-widest text-foreground",

          )}
        >
          <span className={cn("flex h-10 w-10 items-center justify-center text-xs font-bold transition-colors duration-300 border", isTop ? "border-white/20" : "border-foreground/20")}>
            IL
          </span>
          IV LABS
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "px-5 py-2 text-md uppercase tracking-wider transition-colors hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button className={cn("hidden px-6 text-xs uppercase tracking-wider md:inline-flex", isTop ? "text-white" : "")}>
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="border border-foreground/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-foreground/10 bg-background md:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-sm uppercase tracking-wider text-foreground/70 hover:text-foreground border-l-2 border-transparent hover:border-foreground/30 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button className="w-full text-xs uppercase tracking-wider">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
      {/* <GridM className="absolute top-0 left-0 -z-1" config={[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}/> */}
    </header>
  );
}
