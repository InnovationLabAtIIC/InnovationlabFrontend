import Link from "next/link";

interface FooterMenuItem {
  title: string;
  links: { text: string; url: string }[];
}

interface FooterProps {
  tagline?: string;
  menuItems?: FooterMenuItem[];
  bottomLinks?: { text: string; url: string }[];
  copyright?: string;
}

const menuDefaults: FooterMenuItem[] = [
  {
    title: "Studio",
    links: [
      { text: "About", url: "/(frontend)/about" },
      { text: "Residency", url: "#" },
      { text: "Partners", url: "#" },
      { text: "Careers", url: "#" },
    ],
  },
  {
    title: "Programmes",
    links: [
      { text: "Strategy Sprints", url: "#" },
      { text: "Prototype Studio", url: "#" },
      { text: "Community Lab", url: "#" },
      { text: "Learning Hub", url: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Journal", url: "#news" },
      { text: "Playbooks", url: "#" },
      { text: "Events", url: "#events" },
      { text: "Press", url: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { text: "hello@innovationlab.com", url: "mailto:hello@innovationlab.com" },
      { text: "LinkedIn", url: "#" },
      { text: "Instagram", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

const bottomDefaults = [
  { text: "Privacy", url: "#" },
  { text: "Terms", url: "#" },
  { text: "Cookie Policy", url: "#" },
];

export function Footer({
  tagline = "Innovation Lab",
  menuItems = menuDefaults,
  bottomLinks = bottomDefaults,
  copyright = "© 2025 Innovation Lab. All rights reserved.",
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-gradient-to-b from-background via-primary/10 to-background py-20">
      <div className="absolute inset-x-0 -top-32 mx-auto h-64 w-[70%] rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-foreground/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 text-sm font-semibold">
                IL
              </span>
              Innovation Lab
            </Link>
            <p className="text-sm leading-relaxed text-foreground/65">
              We partner with teams to prototype inclusive futures. Programmes, residencies, and playbooks crafted to
              turn intention into impact.
            </p>
            <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.4em] text-foreground/50">
              {["Strategy", "Prototyping", "Residency", "Learning"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {menuItems.map((section) => (
            <div key={section.title} className="space-y-5">
              <h3 className="text-xs uppercase tracking-[0.35em] text-foreground/55">{section.title}</h3>
              <ul className="space-y-3 text-sm text-foreground/60">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.url}
                      className="transition-colors hover:text-foreground/90"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-foreground/10 pt-6 text-xs uppercase tracking-[0.3em] text-foreground/50 md:flex-row md:items-center md:justify-between">
          <p>{tagline}</p>
          <div className="flex flex-wrap gap-4 text-[11px]">
            {bottomLinks.map((link) => (
              <Link key={link.text} href={link.url} className="hover:text-foreground/80">
                {link.text}
              </Link>
            ))}
          </div>
          <p className="text-[11px]">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
