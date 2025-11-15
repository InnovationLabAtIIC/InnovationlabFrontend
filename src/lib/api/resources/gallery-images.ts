import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { galleryImages, users } from "@/lib/db/schema";

export const galleryImageSelection = {
  id: galleryImages.id,
  imageUrl: galleryImages.imageUrl,
  addedById: galleryImages.addedById,
  createdAt: galleryImages.createdAt,
  updatedAt: galleryImages.updatedAt,
  addedBy: {
    id: users.id,
    name: users.name,
    email: users.email,
    avatarUrl: users.avatarUrl,
    role: users.role
  }
} as const;

export async function getGalleryImageById(id: number) {
  const [record] = await db
    .select(galleryImageSelection)
    .from(galleryImages)
    .leftJoin(users, eq(galleryImages.addedById, users.id))
    .where(eq(galleryImages.id, id));

  return record ?? null;
}

interface ListGalleryImagesOptions {
  limit?: number;
  offset?: number;
}

export async function listGalleryImages(options: ListGalleryImagesOptions = {}) {
  let query = db
    .select(galleryImageSelection)
    .from(galleryImages)
    .leftJoin(users, eq(galleryImages.addedById, users.id))
    .orderBy(desc(galleryImages.createdAt));

  if (typeof options.limit === "number") {
    query = query.limit(options.limit);
  }

  if (typeof options.offset === "number") {
    query = query.offset(options.offset);
  }

  const records = await query;

  return records;
}
