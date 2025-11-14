import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { resolveApiBaseUrl } from "@/lib/http/resolve-api-base-url";
import type {
  CommunitiesResponse,
  CommunityMemberRecord,
  CommunityWithMembers,
} from "@/lib/types/communities";
import { ArrowRight, Calendar, Target, Trophy, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Community | Innovation Labs",
  description:
    "Discover the Innovation Labs communities and meet the members shaping our initiatives.",
};

export const revalidate = 120;

type CommunitiesApiResponse = CommunitiesResponse<CommunityWithMembers[]>;

async function fetchCommunities(): Promise<CommunityWithMembers[]> {
  const baseUrl = resolveApiBaseUrl();
  const url = new URL("/api/communities", baseUrl);

  const response = await fetch(url.toString(), {
    next: { revalidate },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load communities: ${response.status} ${response.statusText}`
    );
  }

  const payload = (await response.json()) as CommunitiesApiResponse;
  return payload.data;
}

function normalizeImageUrl(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function sortMembers(members: CommunityMemberRecord[]) {
  return [...members].sort((a, b) => {
    const rankA = a.rank ?? Number.MAX_SAFE_INTEGER;
    const rankB = b.rank ?? Number.MAX_SAFE_INTEGER;

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return a.name.localeCompare(b.name);
  });
}

function formatMemberMeta(member: CommunityMemberRecord) {
  const parts = [member.role, member.title, member.year]
    .map((part) => (part ? part.trim() : ""))
    .filter((part) => part.length > 0);

  return parts.join(" • ");
}

function getMemberInitials(name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    return "IL";
  }

  const segments = trimmed.split(/\s+/).slice(0, 2);
  const initials = segments
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "IL";
}

function MemberCard({ member }: { member: CommunityMemberRecord }) {
  const imageUrl = normalizeImageUrl(member.imageUrl);
  const meta = formatMemberMeta(member);
  const initials = getMemberInitials(member.name);

  return (
    <article className="flex h-full flex-col border border-foreground/20 bg-background transition-colors hover:border-foreground/40">
      <div className="relative h-48 w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 text-2xl font-semibold text-foreground/30">
            {initials}
          </div>
        )}

        {member.rank !== null && (
          <div className="absolute left-4 top-4">
            <Badge
              variant="outline"
              className="border-foreground/40 bg-background/80 px-3 py-1 text-xs uppercase tracking-wider"
            >
              #{member.rank}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-foreground/10 p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">{member.name}</h3>
          {meta && (
            <p className="text-sm uppercase tracking-wider text-foreground/60">
              {meta}
            </p>
          )}
        </div>

        {member.bio && member.bio.trim().length > 0 && (
          <p className="text-sm leading-relaxed text-foreground/70 line-clamp-4">
            {member.bio.trim()}
          </p>
        )}
      </div>
    </article>
  );
}

function CommunitySection({ community }: { community: CommunityWithMembers }) {
  const members = sortMembers(community.members);
  const coverImage = normalizeImageUrl(community.coverImageUrl);
  const memberCount = members.length;

  return (
    <section id={community.slug} className="border-t border-foreground/10 py-20 first:border-t-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] lg:items-start lg:gap-12">
            <div className="space-y-6">
              <div className="overflow-hidden border border-foreground/20 bg-background">
                <div className="relative h-60 w-full overflow-hidden">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={community.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-background to-foreground/5" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-flex border border-foreground/20 px-4 py-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                    Community Profile
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {community.name}
                  </h2>

                  {community.description && community.description.trim().length > 0 && (
                    <p className="text-base leading-relaxed text-foreground/70">
                      {community.description.trim()}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wider text-foreground/60">
                  <span className="inline-flex items-center gap-2 border border-foreground/20 px-3 py-1">
                    {memberCount} {memberCount === 1 ? "member" : "members"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {members.length === 0 ? (
                <div className="col-span-full border border-foreground/20 p-10 text-center text-sm uppercase tracking-wider text-foreground/60">
                  We&apos;re welcoming members to this community soon.
                </div>
              ) : (
                members.map((member) => <MemberCard key={member.id} member={member} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ErrorState() {
  return (
    <main className="w-full bg-background text-foreground">
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-3xl font-semibold tracking-tight">Community</h1>
          <p className="mt-4 text-base text-foreground/70">
            We&apos;re unable to load community details right now. Please refresh the page in a moment.
          </p>
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <main className="w-full bg-background text-foreground">
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-3xl font-semibold tracking-tight">Community</h1>
          <p className="mt-4 text-base text-foreground/70">
            Our community profiles are coming together. Check back soon to meet the teams driving Innovation Labs.
          </p>
        </div>
      </section>
    </main>
  );
}

export default async function CommunityPage() {
  let communities: CommunityWithMembers[] = [];

  try {
    communities = await fetchCommunities();
  } catch (error) {
    return <ErrorState />;
  }

  if (communities.length === 0) {
    return <EmptyState />;
  }

  const featured = communities[0];
  const totalMembers = communities.reduce(
    (sum, community) => sum + community.members.length,
    0
  );
  const featuredImage = normalizeImageUrl(featured.coverImageUrl);
  const memberLabel = totalMembers === 1 ? "member" : "members";

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-foreground/10">

        <div className="absolute inset-0 bg-background/85" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex border border-foreground/20 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                Community Spotlight
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Inside the Innovation Labs Network
            </h1>

            <p className="text-lg leading-relaxed text-foreground/70">
              Meet the communities that power Innovation Labs. From research collectives to product squads, these are the teams turning bold ideas into real-world impact.
            </p>

            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                  Active Communities
                </p>
                <p className="text-4xl font-semibold tracking-tight text-foreground">
                  {communities.length.toString().padStart(2, "0")}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                  Community Members
                </p>
                <p className="text-4xl font-semibold tracking-tight text-foreground">
                  {totalMembers.toString().padStart(2, "0")} {memberLabel}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button asChild variant="secondary" className="px-6 text-xs uppercase tracking-wider">
                <Link href={`#${featured.slug}`}>Explore Featured Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {communities.map((community) => (
        <CommunitySection key={community.id} community={community} />
      ))}
    </main>
  );
}
