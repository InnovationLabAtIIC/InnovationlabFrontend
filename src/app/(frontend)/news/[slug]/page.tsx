import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Quote,
  Tag,
} from "lucide-react";

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  intro: string[];
  quote: string;
  sections: ArticleSection[];
  highlights: string[];
  next?: { title: string; slug: string };
}

const articles: Article[] = [
  {
    slug: "scalable-infrastructures",
  title: "Scalable infrastructures: code pani, chiya pani",
    category: "Development",
    date: "01 Feb, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=2000&q=80",
    tags: ["Strategy", "Prototyping", "Delivery"],
    intro: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
    ],
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper nulla sed arcu iaculis, a feugiat nisl tempus.",
    sections: [
      {
        heading: "Mapping the delivery gap, lol style",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Design-to-code pipelines ko remix",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Outcomes, next steps, ani celebration",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  next: { title: "Latest innovation residency: haasya + hardcore", slug: "innovation-residency" },
  },
  {
    slug: "innovation-residency",
  title: "Latest innovation residency: haasya + hardcore",
    category: "Community",
    date: "18 Jan, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2000&q=80",
    tags: ["Residency", "Community", "AI"],
    intro: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
    ],
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper nulla sed arcu iaculis, a feugiat nisl tempus.",
    sections: [
      {
        heading: "Immersive onboarding ma wow",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Rapid experimentation cycles, jhatpat",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Showcase, deployment, ra celebration",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  next: { title: "Responsible prototyping: slow harm, fast lol", slug: "responsible-prototyping" },
  },
  {
    slug: "responsible-prototyping",
  title: "Responsible prototyping: slow harm, fast lol",
    category: "Research",
    date: "09 Jan, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80",
    tags: ["Research", "Ethics", "Playbook"],
    intro: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
    ],
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper nulla sed arcu iaculis, a feugiat nisl tempus.",
    sections: [
      {
        heading: "Ethics checkpoints ko dhamaal",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Community co-creation ko adda",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Guardrail tooling, safe ra swag",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  next: { title: "Adaptive learning futures: kahani pani, data pani", slug: "learning-futures" },
  },
  {
    slug: "learning-futures",
  title: "Adaptive learning futures: kahani pani, data pani",
    category: "Learning",
    date: "02 Jan, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2000&q=80",
    tags: ["Learning", "Content", "Experience"],
    intro: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat nibh id mauris molestie, eget tristique ipsum posuere.",
    ],
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper nulla sed arcu iaculis, a feugiat nisl tempus.",
    sections: [
      {
        heading: "Narrative architecture ma drama",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Signals and adaptation, talai pani malai pani",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
      {
        heading: "Production workflow ko chakravyuh",
        paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit felis in ex tempus, non suscipit magna volutpat.",
        ],
      },
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  next: { title: "Scalable infrastructures: code pani, chiya pani", slug: "scalable-infrastructures" },
  },
];

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

interface NewsArticlePageProps {
  params: { slug: string };
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,theme(colors.primary)/18%,transparent_55%),radial-gradient(circle_at_80%_10%,theme(colors.primary)/8%,transparent_45%)]" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <Link
              href="/news"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/65 transition-colors hover:text-foreground/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to news
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <CalendarDays className="h-3.5 w-3.5" />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-2">
                <Tag className="h-3.5 w-3.5" />
                {article.category}
              </span>
            </div>
            <h1 className="text-pretty text-3xl sm:text-5xl font-semibold tracking-tight">{article.title}</h1>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-foreground/60">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-foreground/15 px-4 py-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] w-full overflow-hidden rounded-3xl border border-foreground/12 bg-background/80 backdrop-blur">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-pretty text-base sm:text-lg leading-relaxed text-foreground/80">
            {article.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-foreground/12 bg-background/85 p-6 sm:p-10 text-pretty text-base leading-relaxed text-foreground/80 backdrop-blur">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/55">
              <Quote className="h-4 w-4" />
              Field note
            </div>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-foreground/90">{article.quote}</p>
          </div>

          <div className="mt-12 sm:mt-16 grid gap-10 sm:gap-12">
            {article.sections.map((section) => (
              <div key={section.heading} className="space-y-6">
                <h2 className="text-pretty text-2xl font-semibold tracking-tight text-foreground/90">{section.heading}</h2>
                <div className="space-y-4 text-pretty text-base sm:text-lg leading-relaxed text-foreground/80">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 rounded-3xl border border-foreground/12 bg-background/80 p-6 sm:p-10 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/55">Highlights</p>
            <ul className="mt-6 space-y-4 text-pretty text-sm sm:text-base leading-relaxed text-foreground/80">
              {article.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {article.next && (
            <div className="mt-16 sm:mt-20 flex flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/90 p-6 sm:p-10 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-foreground/55">Up next</p>
              <Link
                href={`/news/${article.next.slug}`}
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground/90"
              >
                {article.next.title}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
