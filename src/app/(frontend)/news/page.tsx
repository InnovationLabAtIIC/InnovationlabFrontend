import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  MessageCircle,
  Sparkles,
  Tag,
} from "lucide-react";

const newsArticles = [
  {
    slug: "scalable-infrastructures",
  title: "Scalable infrastructures: code pani, chiya pani",
    category: "Development",
    date: "01 Feb, 2025",
    readTime: "6 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque purus vitae tempor aliquet.",
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1600&q=80",
    tags: ["Strategy", "Prototyping", "Delivery"],
  },
  {
    slug: "innovation-residency",
  title: "Latest innovation residency: haasya + hardcore",
    category: "Community",
    date: "18 Jan, 2025",
    readTime: "5 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque purus vitae tempor aliquet.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Residency", "Community", "AI"],
  },
  {
    slug: "responsible-prototyping",
  title: "Responsible prototyping: slow harm, fast lol",
    category: "Research",
    date: "09 Jan, 2025",
    readTime: "7 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque purus vitae tempor aliquet.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Research", "Ethics", "Playbook"],
  },
  {
    slug: "learning-futures",
  title: "Adaptive learning futures: kahani pani, data pani",
    category: "Learning",
    date: "02 Jan, 2025",
    readTime: "8 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque purus vitae tempor aliquet.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Learning", "Content", "Experience"],
  },
];

export default function NewsPage() {
  const [featured, ...rest] = newsArticles;

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non justo vulputate, dapibus est sit
                amet, viverra massa.
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
                {["Strategy Sprints", "Prototype Studio", "Residency", "Learning Hubs"].map((tag) => (
                  <span key={tag} className="rounded-full border border-foreground/15 px-3 py-2 sm:px-4">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <article className="group rounded-3xl border border-foreground/12 bg-background/85 backdrop-blur">
              <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-5 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/55">
                  <span>{featured.category}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <span>{featured.date}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="text-pretty text-xl sm:text-2xl font-semibold text-foreground/90">{featured.title}</h2>
                <p className="text-pretty text-base leading-relaxed text-foreground/75">{featured.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-foreground/60"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/news/${featured.slug}`}
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
              <h2 className="text-pretty text-3xl sm:text-4xl font-semibold tracking-tight">Fresh perspectives, kurakani ra memes</h2>
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
            {rest.map((article) => (
              <article
                key={article.slug}
                className="group flex h-full flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/85 p-6 sm:p-8 backdrop-blur"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/55">
                  <span>{article.category}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <span>{article.date}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-foreground/40 sm:inline-block" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-pretty text-xl sm:text-2xl font-semibold text-foreground/90">{article.title}</h3>
                <p className="text-pretty text-base leading-relaxed text-foreground/75">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-foreground/60"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/news/${article.slug}`}
                  className="mt-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/65 transition-colors hover:text-foreground/90"
                >
                  Read story
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
