import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { requireUser } from "@/lib/api/auth";
import { ApiError, toErrorResponse } from "@/lib/api/errors";
import {
  getCommunityWithMembersById,
  getCommunityWithMembersBySlug,
  listCommunities,
  listCommunitiesWithMembers
} from "@/lib/api/resources/communities";
import { createCommunitySchema } from "@/lib/api/validation/communities";
import { db } from "@/lib/db";
import { communities, communityMembers } from "@/lib/db/schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slugParam = url.searchParams.get("slug");
    const includeMembersParam = url.searchParams.get("includeMembers");
    const includeMembers = includeMembersParam ? includeMembersParam !== "false" : true;

    if (slugParam) {
      const slug = slugParam.trim().toLowerCase();

      if (!slug) {
        throw new ApiError(400, "slug parameter cannot be empty");
      }

      if (includeMembers) {
        const record = await getCommunityWithMembersBySlug(slug);

        if (!record) {
          throw new ApiError(404, "Community not found");
        }

        return NextResponse.json({ data: record });
      }

      const communityList = await listCommunities({ slug });
      const record = communityList[0];

      if (!record) {
        throw new ApiError(404, "Community not found");
      }

      return NextResponse.json({ data: record });
    }

    const data = includeMembers ? await listCommunitiesWithMembers() : await listCommunities();

    return NextResponse.json({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireUser({ roles: ["admin", "editor"] });

    const body = await request.json().catch(() => null);
    const parsed = createCommunitySchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Validation failed", parsed.error.flatten());
    }

    const payload = parsed.data;
    const slug = payload.slug.trim().toLowerCase();
    const name = payload.name.trim();

    if (!name) {
      throw new ApiError(400, "Name is required");
    }

    const existing = await db
      .select({ id: communities.id })
      .from(communities)
      .where(eq(communities.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      throw new ApiError(409, "Slug already exists");
    }

    const [created] = await db
      .insert(communities)
      .values({
        name,
        slug,
        description: payload.description?.trim() ?? null,
        coverImageUrl: payload.coverImageUrl?.trim() ?? null
      })
      .returning({ id: communities.id });

    const members = payload.members ?? [];

    if (members.length > 0) {
      await db.insert(communityMembers).values(
        members.map((member, index) => ({
          communityId: created.id,
          name: member.name.trim(),
          title: member.title?.trim() ?? null,
          role: member.role?.trim() ?? null,
          year: member.year?.trim() ?? null,
          rank: member.rank ?? index,
          imageUrl: member.imageUrl?.trim() ?? null,
          bio: member.bio?.trim() ?? null
        }))
      );
    }

    const record = await getCommunityWithMembersById(created.id);

    return NextResponse.json({ data: record }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
