import { apiRequest } from "@/lib/http/api-client";
import {
  type CreateGalleryImagePayload,
  type GalleryImageRecord,
  type PaginatedGalleryImagesResponse
} from "@/lib/types/gallery-images";

export interface GalleryImageListFilters {
  limit?: number;
  offset?: number;
}

function buildQuery(params: GalleryImageListFilters = {}) {
  const query = new URLSearchParams();

  if (typeof params.limit === "number") {
    query.set("limit", String(params.limit));
  }

  if (typeof params.offset === "number") {
    query.set("offset", String(params.offset));
  }

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export async function listGalleryImages(
  params: GalleryImageListFilters = {}
): Promise<GalleryImageRecord[]> {
  const response = await apiRequest<PaginatedGalleryImagesResponse>(
    `/api/gallery-images${buildQuery(params)}`
  );

  return response.data;
}

export async function createGalleryImage(payload: CreateGalleryImagePayload) {
  const response = await apiRequest<{ data: GalleryImageRecord }>("/api/gallery-images", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return response.data;
}

export async function deleteGalleryImage(id: number) {
  await apiRequest(`/api/gallery-images/${id}`, { method: "DELETE" });
}
