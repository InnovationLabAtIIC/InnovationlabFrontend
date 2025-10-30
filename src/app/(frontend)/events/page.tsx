import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

const events = [
  {
    slug: "design-futures-summit",
  title: "Design Futures Summit: chiya meets chaos",
    category: "Conference",
    date: "Nov 12, 2025",
    time: "10:00 AM – 5:00 PM",
    location: "New York City, USA",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a lorem vel leo vehicula fermentum.",
    focus: ["Immersive Labs", "Responsible Tech", "Learning Futures"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "creative-lab-workshop",
  title: "Creative Lab Workshop: figma bhanda funny",
    category: "Workshop",
    date: "Dec 05, 2025",
    time: "9:00 AM – 3:00 PM",
    location: "Berlin, Germany",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a lorem vel leo vehicula fermentum.",
    focus: ["Experience Mapping", "Low-code", "Community Insights"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "innovation-expo",
  title: "Innovation Expo: demo gara wow suna",
    category: "Exhibition",
    date: "Jan 20, 2026",
    time: "11:00 AM – 6:00 PM",
    location: "Tokyo, Japan",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a lorem vel leo vehicula fermentum.",
    focus: ["Prototype Demos", "AI Tooling", "Global Partnerships"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "residency-showcase",
  title: "Residency Showcase: cohort ko dhamaka",
    category: "Showcase",
    date: "Feb 14, 2026",
    time: "1:00 PM – 4:00 PM",
    location: "Singapore",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a lorem vel leo vehicula fermentum.",
    focus: ["Mentor Talks", "Cohort Stories", "Pilot Roadmaps"],
    image:
      "https://images.unsplash.com/photo-1467664631004-58beab1ece0d?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function EventsPage() {
  const [spotlight, ...others] = events;

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative isolate overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary)/18%,transparent_60%),radial-gradient(circle_at_80%_10%,theme(colors.primary)/10%,transparent_45%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8 sm:space-y-10">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-foreground/60">
                <span className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">Gatherings</span>
                <span className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">Workshops</span>
                <span className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">Summits</span>
              </div>
              <h1 className="text-pretty text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight">
                Events jaha bold thinkers ra buff momo ekai table ma bascha.
              </h1>
              <p className="text-pretty text-base sm:text-lg leading-relaxed text-foreground/80 max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae lacus porttitor, accumsan
                arcu id, aliquam augue.
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
                {["Strategy", "Prototyping", "Community", "Learning"].map((tag) => (
                  <span key={tag} className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <article className="rounded-3xl border border-foreground/12 bg-background/85 backdrop-blur">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={spotlight.image}
                  alt={spotlight.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-6 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {spotlight.date}
                </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                  <Clock className="h-3.5 w-3.5" />
                  {spotlight.time}
                </span>
                </div>
                <h2 className="text-pretty text-2xl sm:text-3xl font-semibold text-foreground/90">{spotlight.title}</h2>
                <p className="text-pretty text-base leading-relaxed text-foreground/75">{spotlight.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60">
                  {spotlight.focus.map((item) => (
                    <span key={item} className="rounded-full border border-foreground/15 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-xs uppercase tracking-[0.3em] text-foreground/65">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {spotlight.location}
                  </span>
                  <Link
                    href={`/events/${spotlight.slug}`}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
                  >
                    Event details
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Upcoming gatherings</p>
              <h2 className="text-pretty text-3xl sm:text-4xl font-semibold tracking-tight">Stay in the loop, miss garnu bhaye FOMO</h2>
            </div>
            <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <CalendarClock className="h-3.5 w-3.5" />
                Calendar view
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <Users className="h-3.5 w-3.5" />
                Meetups
              </span>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2">
            {others.map((event) => (
              <article
                key={event.slug}
                className="flex h-full flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/85 backdrop-blur"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-5 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                  </div>
                  <h3 className="text-pretty text-xl sm:text-2xl font-semibold text-foreground/90">{event.title}</h3>
                  <p className="text-pretty text-base leading-relaxed text-foreground/75">{event.summary}</p>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60">
                    {event.focus.map((item) => (
                      <span key={item} className="rounded-full border border-foreground/15 px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-xs uppercase tracking-[0.3em] text-foreground/65">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
                    >
                      Event details
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
