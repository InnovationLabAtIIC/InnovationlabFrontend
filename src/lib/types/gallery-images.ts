import type { UserRole } from "./users";

export interface GalleryImageAuthor {
  id: number;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  role: UserRole | null;
}

export interface GalleryImageRecord {
  id: number;
  imageUrl: string;
  addedById: number | null;
  createdAt: string;
  updatedAt: string;
  addedBy: GalleryImageAuthor | null;
}

export interface CreateGalleryImagePayload {
  imageUrl: string;
}

export interface PaginatedGalleryImagesResponse {
  data: GalleryImageRecord[];
}
