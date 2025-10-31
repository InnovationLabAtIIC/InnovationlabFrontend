import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { events, users } from "@/lib/db/schema";

export const eventSelection = {
  id: events.id,
  title: events.title,
  slug: events.slug,
  summary: events.summary,
  description: events.description,
  location: events.location,
  registrationUrl: events.registrationUrl,
  isVirtual: events.isVirtual,
  startsAt: events.startsAt,
  endsAt: events.endsAt,
  status: events.status,
  publishedAt: events.publishedAt,
  organizerId: events.organizerId,
  createdAt: events.createdAt,
  updatedAt: events.updatedAt,
  organizer: {
    id: users.id,
    name: users.name,
    email: users.email,
    avatarUrl: users.avatarUrl,
    role: users.role
  }
} as const;

export async function getEventById(id: number) {
  const [record] = await db
    .select(eventSelection)
    .from(events)
    .leftJoin(users, eq(events.organizerId, users.id))
    .where(eq(events.id, id));

  return record ?? null;
}
