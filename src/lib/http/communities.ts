import { apiRequest } from "@/lib/http/api-client";
import {
  type CommunitiesResponse,
  type CommunityWithMembers,
  type CreateCommunityPayload,
  type UpdateCommunityPayload
} from "@/lib/types/communities";

interface CommunityListOptions {
  includeMembers?: boolean;
}

interface CommunityDetailOptions {
  includeMembers?: boolean;
}

function buildQuery(params: { includeMembers?: boolean; slug?: string }) {
  const search = new URLSearchParams();

  if (params.includeMembers === false) {
    search.set("includeMembers", "false");
  }

  if (params.slug) {
    search.set("slug", params.slug.trim().toLowerCase());
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function listCommunities(options: CommunityListOptions = {}) {
  const response = await apiRequest<CommunitiesResponse<CommunityWithMembers[]>>(
    `/api/communities${buildQuery(options)}`
  );

  return response.data;
}

export async function getCommunity(id: number, options: CommunityDetailOptions = {}) {
  const response = await apiRequest<CommunitiesResponse<CommunityWithMembers>>(
    `/api/communities/${id}${buildQuery(options)}`
  );

  return response.data;
}

export async function getCommunityBySlug(slug: string, options: CommunityDetailOptions = {}) {
  const normalized = slug.trim().toLowerCase();

  if (!normalized) {
    throw new Error("Slug is required");
  }

  const response = await apiRequest<CommunitiesResponse<CommunityWithMembers>>(
    `/api/communities${buildQuery({ ...options, slug: normalized })}`
  );

  return response.data;
}

export async function createCommunity(payload: CreateCommunityPayload) {
  const response = await apiRequest<CommunitiesResponse<CommunityWithMembers>>(`/api/communities`, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return response.data;
}

export async function updateCommunity(id: number, payload: UpdateCommunityPayload) {
  const response = await apiRequest<CommunitiesResponse<CommunityWithMembers>>(
    `/api/communities/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload)
    }
  );

  return response.data;
}

export async function deleteCommunity(id: number) {
  await apiRequest(`/api/communities/${id}`, { method: "DELETE" });
}
