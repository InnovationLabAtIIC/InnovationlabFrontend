import { apiRequest } from "@/lib/http/api-client"
import {
  type CreateEventPayload,
  type PaginatedEventsResponse,
  type EventRecord,
  type EventStatus,
  type UpdateEventPayload,
} from "@/lib/types/events"

export interface EventListFilters {
  status?: EventStatus | "all"
  isVirtual?: boolean
  search?: string
  slug?: string
  from?: string
  to?: string
  organizerId?: number
  limit?: number
  offset?: number
}

function buildQuery(params: EventListFilters) {
  const query = new URLSearchParams()

  if (params.status && params.status !== "all") {
    query.set("status", params.status)
  }

  if (typeof params.isVirtual === "boolean") {
    query.set("isVirtual", String(params.isVirtual))
  }

  if (params.search && params.search.trim()) {
    query.set("search", params.search.trim())
  }

  if (params.slug && params.slug.trim()) {
    query.set("slug", params.slug.trim().toLowerCase())
  }

  if (params.from) {
    query.set("from", params.from)
  }

  if (params.to) {
    query.set("to", params.to)
  }

  if (typeof params.organizerId === "number") {
    query.set("organizerId", String(params.organizerId))
  }

  if (typeof params.limit === "number") {
    query.set("limit", String(params.limit))
  }

  if (typeof params.offset === "number") {
    query.set("offset", String(params.offset))
  }

  const queryString = query.toString()
  return queryString ? `?${queryString}` : ""
}

export async function listEvents(params: EventListFilters = {}): Promise<EventRecord[]> {
  const response = await apiRequest<PaginatedEventsResponse>(`/api/events${buildQuery(params)}`)

  return response.data
}

export async function getEventBySlug(slug: string): Promise<EventRecord | null> {
  const normalized = slug.trim().toLowerCase()

  if (!normalized) {
    return null
  }

  const results = await listEvents({ slug: normalized, limit: 1 })

  return results.length > 0 ? results[0] : null
}

export async function createEvent(payload: CreateEventPayload) {
  const response = await apiRequest<{ data: EventRecord }>(`/api/events`, {
    method: "POST",
    body: JSON.stringify(payload),
  })

  return response.data
}

export async function updateEvent(id: number, payload: UpdateEventPayload) {
  const response = await apiRequest<{ data: EventRecord }>(`/api/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })

  return response.data
}

export async function deleteEvent(id: number) {
  await apiRequest(`/api/events/${id}`, { method: "DELETE" })
}
