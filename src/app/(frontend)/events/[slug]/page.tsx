import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
}

interface EventDetail {
  slug: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  description: string[];
  focus: string[];
  agenda: EventAgendaItem[];
  speakers: { name: string; role: string }[];
  next?: { title: string; slug: string };
}

const events: EventDetail[] = [
  {
    slug: "design-futures-summit",
  title: "Design Futures Summit: chiya meets chaos",
    category: "Conference",
    date: "Nov 12, 2025",
    time: "10:00 AM – 5:00 PM",
    location: "New York City, USA",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim orci at vulputate volutpat.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
    ],
    focus: ["Immersive Labs", "Responsible Tech", "Learning Futures"],
    agenda: [
      {
        time: "10:00",
        title: "Opening ritual (chiya cheers)",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "11:00",
  title: "Signals & trends ma gossip",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "13:00",
  title: "Prototype studios ko dhamaka",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "16:00",
  title: "Commitment circle, halka bhayad", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
    speakers: [
      { name: "Amina Calderon", role: "Director, Speculative Futures Lab" },
      { name: "Leo Ghosh", role: "Principal Designer, Resonance" },
      { name: "Priya Chen", role: "Learning Strategist, Horizon Collective" },
    ],
  next: { title: "Creative Lab Workshop: figma bhanda funny", slug: "creative-lab-workshop" },
  },
  {
    slug: "creative-lab-workshop",
  title: "Creative Lab Workshop: figma bhanda funny",
    category: "Workshop",
    date: "Dec 05, 2025",
    time: "9:00 AM – 3:00 PM",
    location: "Berlin, Germany",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim orci at vulputate volutpat.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
    ],
    focus: ["Experience Mapping", "Low-code", "Community Insights"],
    agenda: [
      {
        time: "09:00",
        title: "Immersion circuit, dai chai ready",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "10:30",
  title: "Concept weaving ra wisecracks",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "12:30",
  title: "Prototype dash ma sprint",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "14:30",
  title: "Showcase forum: clap clap",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
    speakers: [
      { name: "Maya Ruiz", role: "Innovation Coach, CoLab" },
      { name: "Haruto Sato", role: "Experience Architect, Shift Studio" },
      { name: "Elena Rossi", role: "Community Research Lead, OpenCity" },
    ],
  next: { title: "Innovation Expo: demo gara wow suna", slug: "innovation-expo" },
  },
  {
    slug: "innovation-expo",
  title: "Innovation Expo: demo gara wow suna",
    category: "Exhibition",
    date: "Jan 20, 2026",
    time: "11:00 AM – 6:00 PM",
    location: "Tokyo, Japan",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim orci at vulputate volutpat.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
    ],
    focus: ["Prototype Demos", "AI Tooling", "Global Partnerships"],
    agenda: [
      {
        time: "11:00",
        title: "Exhibit hall opens, selfie time",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "13:00",
  title: "Founder fireside ko chit-chat",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "15:00",
  title: "Demo theatre drama",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "17:00",
  title: "Closing reflections + high-fives",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
    speakers: [
      { name: "Jonas Meyer", role: "Head of Ventures, Summit Labs" },
      { name: "Sofia Laurent", role: "Product Lead, CivicStack" },
      { name: "Dr. Layla Farouk", role: "Director, Inclusive AI Network" },
    ],
  next: { title: "Residency Showcase: cohort ko dhamaka", slug: "residency-showcase" },
  },
  {
    slug: "residency-showcase",
  title: "Residency Showcase: cohort ko dhamaka",
    category: "Showcase",
    date: "Feb 14, 2026",
    time: "1:00 PM – 4:00 PM",
    location: "Singapore",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim orci at vulputate volutpat.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed risus quis justo tempus elementum.",
    ],
    focus: ["Mentor Talks", "Cohort Stories", "Pilot Roadmaps"],
    agenda: [
      {
        time: "13:00",
        title: "Welcome circle ra warm vibes",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "13:30",
  title: "Lightning showcases (wow wow)",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "15:00",
  title: "Mentorship salons ko adda",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        time: "16:00",
  title: "Celebration & commitments, dance optional",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
    speakers: [
      { name: "Ravi Yuen", role: "Residency Director, Innovation Lab" },
      { name: "Sasha Bennett", role: "Community Partnerships Lead, Collective Commons" },
      { name: "Nazanin Ortiz", role: "Mentor, Emerging Futures Guild" },
    ],
  next: { title: "Design Futures Summit: chiya meets chaos", slug: "design-futures-summit" },
  },
];

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

interface EventDetailPageProps {
  params: { slug: string };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = events.find((item) => item.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative isolate overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,theme(colors.primary)/18%,transparent_55%),radial-gradient(circle_at_80%_10%,theme(colors.primary)/8%,transparent_45%)]" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <Link
              href="/events"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-foreground/60 transition-colors hover:text-foreground/85"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to events
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-foreground/50">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2">
                <CalendarDays className="h-3.5 w-3.5" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2">
                <Clock className="h-3.5 w-3.5" />
                {event.time}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{event.title}</h1>
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-foreground/55">
              {event.focus.map((focus) => (
                <span key={focus} className="rounded-full border border-foreground/15 px-4 py-2">
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-base leading-relaxed text-foreground/70">{event.summary}</p>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/70">
            {event.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-foreground/12 bg-background/85 p-10 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Agenda</p>
            <div className="mt-8 space-y-6">
              {event.agenda.map((item) => (
                <div key={item.time} className="flex flex-col gap-2 rounded-2xl border border-foreground/12 bg-background/80 p-6">
                  <span className="text-xs uppercase tracking-[0.35em] text-foreground/55">{item.time}</span>
                  <p className="text-lg font-semibold text-foreground/90">{item.title}</p>
                  <p className="text-sm leading-relaxed text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-foreground/12 bg-background/85 p-10 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Featured mentors</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {event.speakers.map((speaker) => (
                <div key={speaker.name} className="rounded-2xl border border-foreground/12 bg-background/80 p-6">
                  <p className="text-sm font-semibold text-foreground/85">{speaker.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-foreground/55">{speaker.role}</p>
                </div>
              ))}
            </div>
          </div>

          {event.next && (
            <div className="mt-20 flex flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/90 p-10 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Next in the series</p>
              <Link
                href={`/events/${event.next.slug}`}
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-foreground/65 transition-colors hover:text-foreground/90"
              >
                {event.next.title}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
