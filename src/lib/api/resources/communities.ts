import { and, asc, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import { communities, communityMembers } from "@/lib/db/schema";

export const communitySelection = {
    id: communities.id,
    name: communities.name,
    slug: communities.slug,
    description: communities.description,
    coverImageUrl: communities.coverImageUrl,
    createdAt: communities.createdAt,
    updatedAt: communities.updatedAt
} as const;

export const communityMemberSelection = {
    id: communityMembers.id,
    communityId: communityMembers.communityId,
    name: communityMembers.name,
    title: communityMembers.title,
    role: communityMembers.role,
    year: communityMembers.year,
    rank: communityMembers.rank,
    imageUrl: communityMembers.imageUrl,
    bio: communityMembers.bio,
    createdAt: communityMembers.createdAt,
    updatedAt: communityMembers.updatedAt
} as const;

export type CommunityRecord = typeof communities.$inferSelect;
export type CommunityMemberRecord = typeof communityMembers.$inferSelect;
export type CommunityWithMembers = CommunityRecord & {
    members: CommunityMemberRecord[];
};

function normalizeSlug(slug?: string | null) {
    const value = slug?.trim().toLowerCase() ?? "";
    return value.length > 0 ? value : null;
}

export async function listCommunities(options?: { slug?: string; id?: number }) {
    const filters: Array<ReturnType<typeof eq>> = [];
    const normalizedSlug = normalizeSlug(options?.slug ?? null);

    if (normalizedSlug) {
        filters.push(eq(communities.slug, normalizedSlug));
    }

    if (options?.id !== undefined) {
        filters.push(eq(communities.id, options.id));
    }

    const whereClause = (() => {
        if (filters.length === 0) {
            return undefined;
        }

        if (filters.length === 1) {
            return filters[0];
        }

        const [first, ...rest] = filters;
        return and(first, ...rest);
    })();

    const baseQuery = db.select(communitySelection).from(communities);

    const query = whereClause ? baseQuery.where(whereClause) : baseQuery;

    const items = await query.orderBy(asc(communities.name));
    return items as CommunityRecord[];
}

export async function listCommunitiesWithMembers(options?: { slug?: string; id?: number }) {
    const baseItems = await listCommunities(options);

    if (baseItems.length === 0) {
        return [] as CommunityWithMembers[];
    }

    const ids = baseItems.map(item => item.id);
    const memberRows = await db
        .select(communityMemberSelection)
        .from(communityMembers)
        .where(inArray(communityMembers.communityId, ids))
        .orderBy(
            asc(communityMembers.communityId),
            asc(communityMembers.rank),
            asc(communityMembers.name)
        );

    const grouped = new Map<number, CommunityMemberRecord[]>();

    for (const member of memberRows as CommunityMemberRecord[]) {
        const bucket = grouped.get(member.communityId);

        if (bucket) {
            bucket.push(member);
        } else {
            grouped.set(member.communityId, [member]);
        }
    }

    return baseItems.map(item => ({
        ...item,
        members: grouped.get(item.id) ?? []
    })) as CommunityWithMembers[];
}

export async function getCommunityById(id: number) {
    const [record] = await listCommunities({ id });
    return record ?? null;
}

export async function getCommunityBySlug(slug: string) {
    const [record] = await listCommunities({ slug });
    return record ?? null;
}

export async function getCommunityWithMembersBySlug(slug: string) {
    const [record] = await listCommunitiesWithMembers({ slug });
    return record ?? null;
}

export async function getCommunityWithMembersById(id: number) {
    const [record] = await listCommunitiesWithMembers({ id });
    return record ?? null;
}
