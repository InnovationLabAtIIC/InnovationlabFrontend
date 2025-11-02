import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from "lucide-react"

import { resolveApiBaseUrl } from "@/lib/http/resolve-api-base-url"
import type { EventRecord } from "@/lib/types/events"

export const revalidate = 60

interface EventsApiResponse {
  data: EventRecord[]
}

async function fetchPublishedEvents(): Promise<EventRecord[]> {
  const baseUrl = resolveApiBaseUrl()
  const url = new URL("/api/events", baseUrl)
  url.searchParams.set("status", "published")
  url.searchParams.set("limit", "12")

  const response = await fetch(url.toString(), {
    next: { revalidate },
    cache: "force-cache",
  })

  if (!response.ok) {
    throw new Error(`Failed to load events: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as EventsApiResponse
  return payload.data
}

function getStartTimestamp(event: EventRecord) {
  const value = Date.parse(event.startsAt)
  return Number.isNaN(value) ? Number.POSITIVE_INFINITY : value
}

function chooseSpotlight(events: EventRecord[]) {
  if (events.length === 0) {
    return { spotlight: null as EventRecord | null, others: [] as EventRecord[] }
  }

  const sorted = [...events].sort((a, b) => getStartTimestamp(a) - getStartTimestamp(b))
  const now = Date.now()

  const upcoming = sorted.filter((event) => {
    const start = Date.parse(event.startsAt)

    if (!Number.isNaN(start) && start >= now) {
      return true
    }

    if (!event.endsAt) {
      return false
    }

    const end = Date.parse(event.endsAt)
    return !Number.isNaN(end) && end >= now
  })

  if (upcoming.length > 0) {
    const spotlight = upcoming[0]

    return {
      spotlight,
      others: sorted.filter((event) => event.id !== spotlight.id),
    }
  }

  const [spotlight, ...rest] = sorted
  return { spotlight, others: rest }
}

function formatSchedule(event: EventRecord) {
  const start = new Date(event.startsAt)

  if (Number.isNaN(start.getTime())) {
    return { date: "Date coming soon", time: "Time to be announced" }
  }

  const date = start.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

  const startTime = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })

  if (!event.endsAt) {
    return { date, time: startTime }
  }

  const end = new Date(event.endsAt)

  if (Number.isNaN(end.getTime())) {
    return { date, time: startTime }
  }

  const endTime = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })

  return {
    date,
    time: `${startTime} – ${endTime}`,
  }
}

function getLocationLabel(event: EventRecord) {
  if (event.isVirtual) {
    return "Remote"
  }

  if (event.location && event.location.trim()) {
    return event.location.trim()
  }

  return "Location to be announced"
}

function getEventTags(event: EventRecord) {
  const tags = new Set<string>()

  tags.add(event.isVirtual ? "Virtual session" : "In-person gathering")

  if (event.organizer?.name) {
    tags.add(event.organizer.name)
  } else if (event.organizer?.email) {
    tags.add(event.organizer.email)
  }

  if (event.registrationUrl) {
    tags.add("Registration open")
  }

  return Array.from(tags)
}

function getEventSummary(event: EventRecord) {
  if (event.summary && event.summary.trim()) {
    return event.summary.trim()
  }

  return "Further details coming soon."
}

export default async function EventsPage() {
  let records: EventRecord[] = []

  try {
    records = await fetchPublishedEvents()
  } catch (_error) {
    return (
      <main className="w-full bg-background text-foreground">
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
            <p className="mt-4 text-base text-foreground/70">
              We&apos;re unable to load upcoming gatherings right now. Please refresh the page in a moment.
            </p>
          </div>
        </section>
      </main>
    )
  }

  const { spotlight, others } = chooseSpotlight(records)

  if (!spotlight) {
    return (
      <main className="w-full bg-background text-foreground">
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
            <p className="mt-4 text-base text-foreground/70">
              There are no published events just yet. Check back soon for what&apos;s happening at the Innovation Lab.
            </p>
          </div>
        </section>
      </main>
    )
  }

  const spotlightSchedule = formatSchedule(spotlight)
  const spotlightTags = getEventTags(spotlight)
  const spotlightImage = spotlight.image && spotlight.image.trim() ? spotlight.image.trim() : null
  const otherEvents = others

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
                {spotlightImage ? (
                  <Image
                    src={spotlightImage}
                    alt={spotlight.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary)/30%,transparent_70%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/20 to-background/60" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-foreground">
                  <span className="text-xs uppercase tracking-[0.35em] text-foreground/70">Featured</span>
                  <p className="mt-2 text-lg font-semibold text-foreground/90 sm:text-xl">{spotlightSchedule.date}</p>
                  <p className="text-sm text-foreground/65">{spotlightSchedule.time}</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {spotlightSchedule.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                    <Clock className="h-3.5 w-3.5" />
                    {spotlightSchedule.time}
                  </span>
                </div>
                <h2 className="text-pretty text-2xl sm:text-3xl font-semibold text-foreground/90">{spotlight.title}</h2>
                <p className="text-pretty text-base leading-relaxed text-foreground/75">
                  {getEventSummary(spotlight)}
                </p>
                {/* {spotlightTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60">
                    {spotlightTags.map((item) => (
                      <span key={item} className="rounded-full border border-foreground/15 px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                )} */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-xs uppercase tracking-[0.3em] text-foreground/65">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {getLocationLabel(spotlight)}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {spotlight.registrationUrl && (
                      <Link
                        href={spotlight.registrationUrl}
                        className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
                      >
                        Register
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                    <Link
                      href={`/events/${spotlight.slug}`}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
                    >
                      Event details
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
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
            {otherEvents.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-foreground/12 bg-background/85 p-8 text-center text-sm uppercase tracking-[0.35em] text-foreground/60">
                More gatherings coming soon. Meanwhile, explore the featured program above.
              </div>
            ) : (
              otherEvents.map((event) => {
                const schedule = formatSchedule(event)
                const tags = getEventTags(event)
                const eventImage = event.image && event.image.trim() ? event.image.trim() : null

                return (
                  <article
                    key={event.slug}
                    className="flex h-full flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/85 backdrop-blur"
                  >
                    <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                      {eventImage ? (
                        <Image
                          src={eventImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary)/24%,transparent_70%)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/40 to-background/10" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <span className="text-xs uppercase tracking-[0.35em] text-foreground/65">Upcoming</span>
                        <p className="text-sm font-semibold text-foreground/85">{schedule.date}</p>
                        <p className="text-xs text-foreground/60">{schedule.time}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {schedule.date}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                          <Clock className="h-3.5 w-3.5" />
                          {schedule.time}
                        </span>
                      </div>
                      <h3 className="text-pretty text-xl sm:text-2xl font-semibold text-foreground/90">{event.title}</h3>
                      <p className="text-pretty text-base leading-relaxed text-foreground/75">
                        {getEventSummary(event)}
                      </p>
                      {/* {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60">
                          {tags.map((item) => (
                            <span key={item} className="rounded-full border border-foreground/15 px-3 py-1">
                              {item}
                            </span>
                          ))}
                        </div>
                      )} */}
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-xs uppercase tracking-[0.3em] text-foreground/65">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {getLocationLabel(event)}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {event.registrationUrl && (
                            <Link
                              href={event.registrationUrl}
                              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
                            >
                              Register
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          )}
                          <Link
                            href={`/events/${event.slug}`}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
                          >
                            Event details
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
