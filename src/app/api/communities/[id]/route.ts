import { NextResponse } from "next/server";
import { and, eq, inArray } from "drizzle-orm";

import { requireUser } from "@/lib/api/auth";
import { ApiError, toErrorResponse } from "@/lib/api/errors";
import {
    getCommunityById,
    getCommunityWithMembersById
} from "@/lib/api/resources/communities";
import { updateCommunitySchema } from "@/lib/api/validation/communities";
import { db } from "@/lib/db";
import { communities, communityMembers } from "@/lib/db/schema";

function parseId(param: string) {
    const value = Number.parseInt(param, 10);

    if (Number.isNaN(value) || value <= 0) {
        throw new ApiError(400, "Invalid id parameter");
    }

    return value;
}

function normalizeNullable(input: string | null | undefined) {
    if (input === undefined || input === null) {
        return null;
    }

    const trimmed = input.trim();
    return trimmed.length > 0 ? trimmed : null;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseId(params.id);
        const url = new URL(request.url);
        const includeMembersParam = url.searchParams.get("includeMembers");
        const includeMembers = includeMembersParam ? includeMembersParam !== "false" : true;

        const record = includeMembers
            ? await getCommunityWithMembersById(id)
            : await getCommunityById(id);

        if (!record) {
            throw new ApiError(404, "Community not found");
        }

        return NextResponse.json({ data: record });
    } catch (error) {
        return toErrorResponse(error);
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        await requireUser({ roles: ["admin", "editor"] });

        const id = parseId(params.id);
        const existing = await getCommunityWithMembersById(id);

        if (!existing) {
            throw new ApiError(404, "Community not found");
        }

        const body = await request.json().catch(() => null);
        const parsed = updateCommunitySchema.safeParse(body);

        if (!parsed.success) {
            throw new ApiError(400, "Validation failed", parsed.error.flatten());
        }

        const payload = parsed.data;
        const updates: Partial<typeof communities.$inferInsert> = {};
        let shouldTouchTimestamp = false;

        if (payload.name !== undefined) {
            const name = payload.name.trim();

            if (!name) {
                throw new ApiError(400, "Name is required");
            }

            updates.name = name;
            shouldTouchTimestamp = true;
        }

        if (payload.slug !== undefined) {
            const slug = payload.slug.trim().toLowerCase();

            if (!slug) {
                throw new ApiError(400, "Slug is required");
            }

            if (slug !== existing.slug) {
                const [slugCheck] = await db
                    .select({ id: communities.id })
                    .from(communities)
                    .where(eq(communities.slug, slug))
                    .limit(1);

                if (slugCheck && slugCheck.id !== id) {
                    throw new ApiError(409, "Slug already exists");
                }
            }

            updates.slug = slug;
            shouldTouchTimestamp = true;
        }

        if (payload.description !== undefined) {
            updates.description = normalizeNullable(payload.description);
            shouldTouchTimestamp = true;
        }

        if (payload.coverImageUrl !== undefined) {
            updates.coverImageUrl = normalizeNullable(payload.coverImageUrl);
            shouldTouchTimestamp = true;
        }

        await db.transaction(async tx => {
            const now = new Date();
            const memberUpdatesRequested = payload.members !== undefined;
            const hasFieldUpdates = Object.keys(updates).length > 0;

            if (hasFieldUpdates) {
                updates.updatedAt = now;
                await tx.update(communities).set(updates).where(eq(communities.id, id));
            } else if (memberUpdatesRequested || shouldTouchTimestamp) {
                await tx
                    .update(communities)
                    .set({ updatedAt: now })
                    .where(eq(communities.id, id));
            }

            if (!memberUpdatesRequested) {
                return;
            }

            const incomingMembers = payload.members ?? [];
            const existingMembersMap = new Map(existing.members.map(member => [member.id, member]));
            const seenIds = new Set<number>();

            for (let index = 0; index < incomingMembers.length; index += 1) {
                const member = incomingMembers[index];
                const name = member.name.trim();

                if (!name) {
                    throw new ApiError(400, `Member #${index + 1} requires a name`);
                }

                const current = member.id ? existingMembersMap.get(member.id) ?? null : null;
                const existingRank = current?.rank;

                let computedRank: number | null;

                if (member.rank === undefined) {
                    if (existingRank === undefined) {
                        computedRank = index;
                    } else {
                        computedRank = existingRank;
                    }
                } else if (member.rank === null) {
                    computedRank = null;
                } else {
                    computedRank = member.rank;
                }

                const memberValues: Partial<typeof communityMembers.$inferInsert> = {
                    name,
                    title: normalizeNullable(member.title),
                    role: normalizeNullable(member.role),
                    year: normalizeNullable(member.year),
                    rank: computedRank,
                    imageUrl: normalizeNullable(member.imageUrl),
                    bio: normalizeNullable(member.bio),
                    updatedAt: now
                };

                if (member.id) {
                    if (!existingMembersMap.has(member.id)) {
                        throw new ApiError(400, `Member id ${member.id} does not belong to this community`);
                    }

                    if (seenIds.has(member.id)) {
                        throw new ApiError(400, "Duplicate member id in payload");
                    }

                    seenIds.add(member.id);

                    await tx
                        .update(communityMembers)
                        .set(memberValues)
                        .where(
                            and(
                                eq(communityMembers.id, member.id),
                                eq(communityMembers.communityId, id)
                            )
                        );
                } else {
                    await tx.insert(communityMembers).values({
                        communityId: id,
                        ...memberValues,
                        updatedAt: now
                    });
                }
            }

            const idsToDelete = existing.members
                .filter(member => !seenIds.has(member.id))
                .map(member => member.id);

            if (idsToDelete.length > 0) {
                await tx
                    .delete(communityMembers)
                    .where(inArray(communityMembers.id, idsToDelete));
            }
        });

        const record = await getCommunityWithMembersById(id);

        return NextResponse.json({ data: record });
    } catch (error) {
        return toErrorResponse(error);
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await requireUser({ roles: ["admin", "editor"] });

        const id = parseId(params.id);
        const existing = await getCommunityById(id);

        if (!existing) {
            throw new ApiError(404, "Community not found");
        }

        await db.delete(communities).where(eq(communities.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        return toErrorResponse(error);
    }
}
