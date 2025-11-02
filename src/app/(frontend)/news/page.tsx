import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  MessageCircle,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

import { resolveApiBaseUrl } from "@/lib/http/resolve-api-base-url";
import type { NewsRecord } from "@/lib/types/news";
import { estimateReadingTime, normalizeLexicalState } from "@/lib/editor/lexical-utils";

export const revalidate = 60;

interface NewsApiResponse {
  data: NewsRecord[];
}

interface NewsPresentation {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedDate: string;
  author: string;
  readTime: string;
  chips: string[];
}

async function fetchPublishedNews(): Promise<NewsRecord[]> {
  const baseUrl = resolveApiBaseUrl();
  const url = new URL("/api/news", baseUrl);
  url.searchParams.set("status", "published");
  url.searchParams.set("limit", "12");

  const response = await fetch(url.toString(), {
    next: { revalidate },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to load news: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as NewsApiResponse;
  return payload.data;
}

function formatPublishedDate(record: NewsRecord) {
  const source = record.publishedAt ?? record.createdAt;
  const date = new Date(source);

  if (Number.isNaN(date.getTime())) {
    return "Publication date coming soon";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getAuthorLabel(record: NewsRecord) {
  if (record.author?.name && record.author.name.trim()) {
    return record.author.name.trim();
  }

  if (record.author?.email && record.author.email.trim()) {
    return record.author.email.trim();
  }

  return "Innovation Lab";
}

function toPresentation(record: NewsRecord): NewsPresentation {
  const normalized = normalizeLexicalState(record.content);
  const excerpt = record.excerpt?.trim() ?? normalized.paragraphs[0] ?? "More details arriving soon.";
  const plainText = normalized.plainText || excerpt;

  return {
    slug: record.slug,
    title: record.title,
    excerpt,
    coverImage: record.coverImageUrl?.trim() ? record.coverImageUrl.trim() : null,
    publishedDate: formatPublishedDate(record),
    author: getAuthorLabel(record),
    readTime: estimateReadingTime(plainText),
    chips: record.author?.role ? [record.author.role] : [],
  };
}

function sortNews(records: NewsRecord[]) {
  return [...records].sort((a, b) => {
    const aTime = Date.parse(a.publishedAt ?? a.createdAt);
    const bTime = Date.parse(b.publishedAt ?? b.createdAt);
    const safeATime = Number.isNaN(aTime) ? 0 : aTime;
    const safeBTime = Number.isNaN(bTime) ? 0 : bTime;

    return safeBTime - safeATime;
  });
}

export default async function NewsPage() {
  let records: NewsRecord[] = [];

  try {
    records = await fetchPublishedNews();
  } catch (_error) {
    return (
      <main className="w-full bg-background text-foreground">
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight">News</h1>
            <p className="mt-4 text-base text-foreground/70">
              We couldn&apos;t load the latest stories at the moment. Please refresh and try again shortly.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (records.length === 0) {
    return (
      <main className="w-full bg-background text-foreground">
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight">News</h1>
            <p className="mt-4 text-base text-foreground/70">
              Fresh stories are brewing. Check back soon for updates from the Innovation Lab.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const [featured, ...rest] = sortNews(records);
  const featuredArticle = toPresentation(featured);
  const otherArticles = rest.map(toPresentation);

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative isolate overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary)/20%,transparent_60%),radial-gradient(circle_at_80%_0%,theme(colors.primary)/12%,transparent_45%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8 sm:space-y-10">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-foreground/60">
                <span className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">Lab Journal</span>
                <span className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">Insights</span>
                <span className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">Playbooks</span>
              </div>
              <h1 className="text-pretty text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight">
                Stories ra rituals jaba chiya, keyboard, imagination collide.
              </h1>
              <p className="text-pretty text-base sm:text-lg leading-relaxed text-foreground/80 max-w-2xl">
                Explore field notes from the lab, dispatches from our residencies, and behind-the-scenes experiments.
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
                {featuredArticle.chips.length > 0
                  ? featuredArticle.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">
                        {chip}
                      </span>
                    ))
                  : ["Strategy Sprints", "Prototype Studio", "Residency", "Learning Hubs"].map((tag) => (
                      <span key={tag} className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">
                        {tag}
                      </span>
                    ))}
              </div>
            </div>
            <article className="group rounded-3xl border border-foreground/12 bg-background/85 backdrop-blur">
              <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden rounded-t-3xl">
                {featuredArticle.coverImage ? (
                  <Image
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,theme(colors.primary)/24%,transparent_70%)]" />
                )}
              </div>
              <div className="space-y-5 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/55">
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                    <User className="h-3.5 w-3.5" />
                    {featuredArticle.author}
                  </span>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {featuredArticle.publishedDate}
                  </span>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <h2 className="text-pretty text-xl sm:text-2xl font-semibold text-foreground/90">{featuredArticle.title}</h2>
                <p className="text-pretty text-base leading-relaxed text-foreground/75">{featuredArticle.excerpt}</p>
                {featuredArticle.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.chips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-foreground/60"
                      >
                        <Tag className="h-3 w-3" />
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/65 transition-colors hover:text-foreground/90"
                >
                  Read story
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Browse the archive</p>
              <h2 className="text-pretty text-3xl sm:text-4xl font-semibold tracking-tight">
                Fresh perspectives, kurakani ra memes
              </h2>
            </div>
            <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <Sparkles className="h-3.5 w-3.5" />
                Highlights
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <MessageCircle className="h-3.5 w-3.5" />
                Dialogues
              </span>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2">
            {otherArticles.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-foreground/12 bg-background/85 p-8 text-center text-sm uppercase tracking-[0.35em] text-foreground/60">
                More stories are on the way. In the meantime, explore the featured article above.
              </div>
            ) : (
              otherArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group flex h-full flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/85 p-6 sm:p-8 backdrop-blur"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/55">
                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                      <User className="h-3.5 w-3.5" />
                      {article.author}
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {article.publishedDate}
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-pretty text-xl sm:text-2xl font-semibold text-foreground/90">{article.title}</h3>
                  <p className="text-pretty text-base leading-relaxed text-foreground/75">{article.excerpt}</p>
                  {/* {article.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.chips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-foreground/60"
                        >
                          <Tag className="h-3 w-3" />
                          {chip}
                        </span>
                      ))}
                    </div>
                  )} */}
                  <Link
                    href={`/news/${article.slug}`}
                    className="mt-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/65 transition-colors hover:text-foreground/90"
                  >
                    Read story
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
