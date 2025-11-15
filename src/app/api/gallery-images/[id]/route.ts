import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { requireUser } from "@/lib/api/auth";
import { ApiError, toErrorResponse } from "@/lib/api/errors";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireUser({ roles: ["admin", "editor"] });

    const idParam = context.params.id;
    const id = Number.parseInt(idParam, 10);

    if (Number.isNaN(id)) {
      throw new ApiError(400, "Invalid gallery image id");
    }

    const [existing] = await db
      .select({ id: galleryImages.id })
      .from(galleryImages)
      .where(eq(galleryImages.id, id))
      .limit(1);

    if (!existing) {
      throw new ApiError(404, "Gallery image not found");
    }

    await db.delete(galleryImages).where(eq(galleryImages.id, id));

    return NextResponse.json({ data: { id } });
  } catch (error) {
    return toErrorResponse(error);
  }
}
