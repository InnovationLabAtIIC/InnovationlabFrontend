import type { Metadata } from "next";
import Image from "next/image";
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

import { LexicalRenderer } from "@/components/blocks/editor-x/viewer";
import { resolveApiBaseUrl } from "@/lib/http/resolve-api-base-url";
import type { EventRecord } from "@/lib/types/events";

export const revalidate = 60;

interface EventsApiResponse {
  data: EventRecord[];
}

interface DescriptionContent {
  lexicalState: string | null;
  paragraphs: string[];
}

function getEventTags(event: EventRecord) {
  const tags = new Set<string>();

  tags.add(event.isVirtual ? "Virtual session" : "In-person gathering");

  if (event.organizer?.name) {
    tags.add(event.organizer.name);
  } else if (event.organizer?.email) {
    tags.add(event.organizer.email);
  }

  if (event.registrationUrl) {
    tags.add("Registration open");
  }

  return Array.from(tags);
}

function formatSchedule(event: EventRecord) {
  const start = new Date(event.startsAt);

  if (Number.isNaN(start.getTime())) {
    return { date: "Date coming soon", time: "Time to be announced" };
  }

  const date = start.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const startTime = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!event.endsAt) {
    return { date, time: startTime };
  }

  const end = new Date(event.endsAt);

  if (Number.isNaN(end.getTime())) {
    return { date, time: startTime };
  }

  const endTime = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    date,
    time: `${startTime} – ${endTime}`,
  };
}

function getLocationLabel(event: EventRecord) {
  if (event.isVirtual) {
    return "Remote";
  }

  if (event.location && event.location.trim()) {
    return event.location.trim();
  }

  return "Location to be announced";
}

function resolveDescriptionContent(description: string | null): DescriptionContent {
  const empty: DescriptionContent = { lexicalState: null, paragraphs: [] };

  if (!description) {
    return empty;
  }

  const trimmed = description.trim();

  if (!trimmed) {
    return empty;
  }

  try {
    const parsed = JSON.parse(trimmed) as {
      root?: {
        children?: Array<{
          text?: string;
          children?: unknown[];
        }>;
      };
    };

    if (!parsed?.root) {
  return { lexicalState: null, paragraphs: [trimmed] };
    }

    const gather = (node: any): string => {
      if (!node) {
        return "";
      }

      if (typeof node.text === "string") {
        return node.text;
      }

      if (Array.isArray(node.children)) {
        return node.children.map(gather).join("");
      }

      return "";
    };

    const paragraphs = Array.isArray(parsed.root.children)
      ? parsed.root.children.map(child => gather(child).trim()).filter(Boolean)
      : [];

    return { lexicalState: trimmed, paragraphs };
  } catch (_error) {
    return { lexicalState: null, paragraphs: [trimmed] };
  }
}

async function fetchEventBySlug(slug: string): Promise<EventRecord | null> {
  const baseUrl = resolveApiBaseUrl();
  const url = new URL("/api/events", baseUrl);
  url.searchParams.set("slug", slug);
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    next: { revalidate },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to load event: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as EventsApiResponse;
  return payload.data[0] ?? null;
}

export async function generateStaticParams() {
  try {
    const baseUrl = resolveApiBaseUrl();
    const url = new URL("/api/events", baseUrl);
    url.searchParams.set("status", "published");
    url.searchParams.set("limit", "50");

    const response = await fetch(url.toString(), {
      next: { revalidate },
      cache: "force-cache",
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as EventsApiResponse;
    return payload.data.map(event => ({ slug: event.slug }));
  } catch (_error) {
    return [];
  }
}

interface EventDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = await fetchEventBySlug(params.slug.toLowerCase());

  if (!event) {
    return {
      title: "Event not found — Innovation Lab",
      description: "The event you were looking for could not be found.",
    };
  }

  return {
    title: `${event.title} — Innovation Lab`,
    description: event.summary ?? `Discover ${event.title} hosted by Innovation Lab.`,
    openGraph: {
      title: `${event.title} — Innovation Lab`,
      description: event.summary ?? undefined,
      images: event.image ? [{ url: event.image }] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const normalizedSlug = params.slug.toLowerCase();
  const event = await fetchEventBySlug(normalizedSlug);

  if (!event) {
    notFound();
  }

  const schedule = formatSchedule(event);
  const tags = getEventTags(event);
  const locationLabel = getLocationLabel(event);
  const descriptionContent = resolveDescriptionContent(event.description);
  const imageUrl = event.image && event.image.trim() ? event.image.trim() : null;

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

            <div className="relative overflow-hidden rounded-3xl border border-foreground/12 bg-background/90">
              <div className="relative h-64 w-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary)/24%,transparent_70%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
              </div>
              <div className="flex flex-col gap-4 p-8">
                <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-foreground/55">
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {schedule.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2">
                    <Clock className="h-3.5 w-3.5" />
                    {schedule.time}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {locationLabel}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground/95">{event.title}</h1>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-foreground/60">
                    {tags.map(tag => (
                      <span key={tag} className="rounded-full border border-foreground/15 px-4 py-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {event.summary && (<p className="text-base leading-relaxed text-foreground/70">{event.summary}</p>
          )}

          {descriptionContent.lexicalState ? (
            <div className="mt-10">
              <LexicalRenderer
                state={descriptionContent.lexicalState}
                contentClassName="space-y-6 text-base leading-relaxed text-foreground/70 [&_strong]:text-foreground [&_em]:italic"
              />
            </div>
          ) : descriptionContent.paragraphs.length > 0 ? (
            <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/70">
              {descriptionContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-foreground/12 bg-background/85 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/55">Schedule</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-foreground/75">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {schedule.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {schedule.time}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-foreground/12 bg-background/85 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/55">Hosted by</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-foreground/75">
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {event.organizer?.name ?? event.organizer?.email ?? "Innovation Lab"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {locationLabel}
                </span>
              </div>
            </div>
          </div>

          {event.registrationUrl && (
            <div className="mt-12 flex justify-center">
              <Link
                href={event.registrationUrl}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-xs uppercase tracking-[0.35em] text-foreground/70 transition-colors hover:text-foreground/90"
              >
                Reserve your spot
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
