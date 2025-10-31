import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { news, users } from "@/lib/db/schema";

export const newsSelection = {
  id: news.id,
  title: news.title,
  slug: news.slug,
  excerpt: news.excerpt,
  content: news.content,
  coverImageUrl: news.coverImageUrl,
  status: news.status,
  publishedAt: news.publishedAt,
  authorId: news.authorId,
  createdAt: news.createdAt,
  updatedAt: news.updatedAt,
  author: {
    id: users.id,
    name: users.name,
    email: users.email,
    avatarUrl: users.avatarUrl,
    role: users.role
  }
} as const;

export async function getNewsById(id: number) {
  const [record] = await db
    .select(newsSelection)
    .from(news)
    .leftJoin(users, eq(news.authorId, users.id))
    .where(eq(news.id, id));

  return record ?? null;
}
