import { NextResponse } from "next/server";

import { requireUser } from "@/lib/api/auth";
import { ApiError, toErrorResponse } from "@/lib/api/errors";
import { getGalleryImageById, listGalleryImages } from "@/lib/api/resources/gallery-images";
import { createGalleryImageSchema } from "@/lib/api/validation/gallery-images";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const offsetParam = url.searchParams.get("offset");

    const limit = limitParam ? Math.min(50, Math.max(1, Number.parseInt(limitParam, 10) || 0)) : 24;
    const offset = offsetParam ? Math.max(0, Number.parseInt(offsetParam, 10) || 0) : 0;

    const data = await listGalleryImages({ limit, offset });

    return NextResponse.json({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireUser({ roles: ["admin", "editor"] });
    const body = await request.json().catch(() => null);

    const parsed = createGalleryImageSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Validation failed", parsed.error.flatten());
    }

    const { imageUrl } = parsed.data;
    const normalizedUrl = imageUrl.trim();

    const [inserted] = await db
      .insert(galleryImages)
      .values({
        imageUrl: normalizedUrl,
        addedById: session.user.id
      })
      .returning({ id: galleryImages.id });

    const record = await getGalleryImageById(inserted.id);

    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
