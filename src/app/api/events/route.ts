import { NextResponse } from "next/server";
import { and, desc, eq, gte, ilike, lte } from "drizzle-orm";

import { requireUser } from "@/lib/api/auth";
import { ApiError, toErrorResponse } from "@/lib/api/errors";
import { eventSelection, getEventById } from "@/lib/api/resources/events";
import {
  createEventSchema,
  parseEventDate,
  resolveEventPublishedAt,
  type EventStatus,
  validateEventWindow
} from "@/lib/api/validation/events";
import { db } from "@/lib/db";
import { eventStatusEnum, events, users } from "@/lib/db/schema";

type BoolString = "true" | "false";

function parseBoolean(param: string): boolean {
  if (param === "true") {
    return true;
  }

  if (param === "false") {
    return false;
  }

  throw new ApiError(400, "Boolean query parameters must be 'true' or 'false'");
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");
    const organizerParam = url.searchParams.get("organizerId");
    const virtualParam = url.searchParams.get("isVirtual");
    const searchParam = url.searchParams.get("search");
    const fromParam = url.searchParams.get("from");
    const toParam = url.searchParams.get("to");
    const limitParam = url.searchParams.get("limit");
    const offsetParam = url.searchParams.get("offset");

    let statusFilter: EventStatus | undefined;

    if (statusParam) {
      if (!eventStatusEnum.enumValues.includes(statusParam as EventStatus)) {
        throw new ApiError(400, "Invalid status filter");
      }

      statusFilter = statusParam as EventStatus;
    }

    let organizerFilter: number | undefined;

    if (organizerParam) {
      const parsed = Number.parseInt(organizerParam, 10);

      if (Number.isNaN(parsed)) {
        throw new ApiError(400, "organizerId must be a number");
      }

      organizerFilter = parsed;
    }

    let virtualFilter: boolean | undefined;

    if (virtualParam) {
      virtualFilter = parseBoolean(virtualParam as BoolString);
    }

    const limit = limitParam ? Math.min(100, Math.max(1, Number.parseInt(limitParam, 10))) : 20;
    const offset = offsetParam ? Math.max(0, Number.parseInt(offsetParam, 10) || 0) : 0;

    const filters: Array<ReturnType<typeof eq>> = [];

    if (statusFilter) {
      filters.push(eq(events.status, statusFilter));
    }

    if (organizerFilter !== undefined) {
      filters.push(eq(events.organizerId, organizerFilter));
    }

    if (virtualFilter !== undefined) {
      filters.push(eq(events.isVirtual, virtualFilter));
    }

    if (fromParam) {
      filters.push(gte(events.startsAt, parseEventDate(fromParam, "from")));
    }

    if (toParam) {
      filters.push(lte(events.startsAt, parseEventDate(toParam, "to")));
    }

    if (searchParam) {
      filters.push(ilike(events.title, `%${searchParam}%`));
    }

    const baseQuery = db
      .select(eventSelection)
      .from(events)
      .leftJoin(users, eq(events.organizerId, users.id));

    const filteredQuery = filters.length > 0 ? baseQuery.where(and(...filters)) : baseQuery;

    const items = await filteredQuery
      .orderBy(desc(events.startsAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ data: items });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireUser({ roles: ["admin", "editor"] });
    const body = await request.json().catch(() => null);

    const parsed = createEventSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Validation failed", parsed.error.flatten());
    }

    const payload = parsed.data;
    const status: EventStatus = payload.status ?? "draft";
    const slug = payload.slug.trim().toLowerCase();

    const existingSlug = await db
      .select({ id: events.id })
      .from(events)
      .where(eq(events.slug, slug))
      .limit(1);

    if (existingSlug.length > 0) {
      throw new ApiError(409, "Slug already exists");
    }

    const startsAt = parseEventDate(payload.startsAt, "startsAt");
    const endsAt = payload.endsAt ? parseEventDate(payload.endsAt, "endsAt") : null;

    validateEventWindow(startsAt, endsAt);

    const publishedAt = resolveEventPublishedAt({
      incoming: payload.publishedAt,
      status,
      mode: "create"
    });

    const organizerId = payload.organizerId ?? session.user.id;

    const [created] = await db
      .insert(events)
      .values({
        title: payload.title.trim(),
        slug,
        summary: payload.summary?.trim() ?? null,
        description: payload.description ?? null,
        location: payload.location?.trim() ?? null,
        registrationUrl: payload.registrationUrl?.trim() ?? null,
        isVirtual: payload.isVirtual ?? false,
        startsAt,
        endsAt,
        status,
        publishedAt,
        organizerId
      })
      .returning({ id: events.id });

    const record = await getEventById(created.id);

    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
