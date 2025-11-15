import { z } from "zod";

export const createGalleryImageSchema = z.object({
  imageUrl: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .max(2048, "Image URL must be 2048 characters or fewer")
});

export type CreateGalleryImageInput = z.infer<typeof createGalleryImageSchema>;
