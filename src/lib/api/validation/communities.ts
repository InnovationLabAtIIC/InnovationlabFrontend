import { z } from "zod";

const memberSchema = z.object({
  name: z.string().min(1).max(200),
  title: z.string().trim().max(200).optional().nullable(),
  role: z.string().trim().max(200).optional().nullable(),
  year: z.string().trim().max(50).optional().nullable(),
  rank: z.number().int().min(0).max(100000).optional().nullable(),
  imageUrl: z.string().trim().max(2048).optional().nullable(),
  bio: z.string().trim().max(2000).optional().nullable()
});

export const createCommunitySchema = z.object({
  name: z.string().min(3).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().trim().max(2000).optional().nullable(),
  coverImageUrl: z.string().trim().max(2048).optional().nullable(),
  members: z.array(memberSchema).optional()
});

export const updateCommunitySchema = createCommunitySchema.partial().extend({
  slug: z.string().min(1).max(200).optional(),
  members: z.array(
    memberSchema.extend({
      id: z.number().int().positive().optional()
    })
  )
    .optional()
    .nullable()
});

export type CommunityInput = z.infer<typeof createCommunitySchema>;
export type CommunityMemberInput = z.infer<typeof memberSchema>;
