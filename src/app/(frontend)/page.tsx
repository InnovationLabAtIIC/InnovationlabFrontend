"use client";

import { Button } from "@/components/ui/button";
import {
    ArrowUpRight,
    CalendarDays,
    CircleDashed,
    MessageCircle,
    Rocket,
    Sparkles,
    Target,
    Trophy,
    Users,
    Zap,
} from "lucide-react";
import Image from "next/image";

interface NewsItem {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
}

interface EventItem {
    date: string;
    time: string;
    title: string;
    category: string;
    description: string;
    location: string;
    link: string;
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

const newsItems: NewsItem[] = [
    {
        image:
            "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1200&q=80",
        category: "Development",
        date: "01 Feb, 2025",
        title: "Robot haru le momo banaunda laptop pani royo",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ligula sit amet sem tincidunt auctor.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
        category: "Community",
        date: "18 Jan, 2025",
        title: "Community meetup ma free sel roti, say no more",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ligula sit amet sem tincidunt auctor.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        category: "Research",
        date: "09 Jan, 2025",
        title: "Tihar lights le sensors confuse, data pani chillax",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ligula sit amet sem tincidunt auctor.",
    },
];

const eventItems: EventItem[] = [
    {
        date: "Nov 12, 2025",
        time: "10:00 AM – 5:00 PM",
        title: "PASTRAMA 2025: Ideas, momo, repeat",
        category: "Conference",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet enim vel urna blandit gravida.",
        location: "IIC atrium ma comfy kura",
        link: "#",
    },
    {
        date: "Dec 05, 2025",
        time: "9:00 AM – 3:00 PM",
        title: "BYE BYE C QUEST 3.0: Last minute hero mode",
        category: "Workshop",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet enim vel urna blandit gravida.",
        location: "SSD ko sunny patio",
        link: "#",
    },
    {
        date: "Jan 20, 2026",
        time: "11:00 AM – 6:00 PM",
        title: "WHAT THE HEX 3.0: Demo gara, wow sun",
        category: "Exhibition",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet enim vel urna blandit gravida.",
        location: "Guild Hall, IIC",
        link: "#",
    },
];

const testimonials: Testimonial[] = [
    {
        quote:
            "Morning standup ma punchline diyera sabai lai jagaaunu parcha. Yo team le deadline lai pani comedian banaucha, believe me.",
        author: "Manjeyy Gautam",
        role: "CEO, NASA (allegedly)",
    },
    {
        quote:
            "Prototype demo dekhi signature chai latte samma handle garne talent. Innovation lai kehi bhaye ni meme ready, respect!",
        author: "Anshu Punchgain",
        role: "CTO, Nykaa ko maato",
    },
    {
        quote:
            "Yesko presentation ma lights off bhaye pani energy on. I could not see them, tara uniharule future dekheshan, wow!",
        author: "John Cena",
        role: "Still invisible",
    },
];

const capabilityTiles = [
    {
        title: "Recognize chiya cups",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in eros ut sapien vulputate pretium.",
        icon: Target,
    },
    {
        title: "Train ideas to Pokhara",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in eros ut sapien vulputate pretium.",
        icon: Zap,
    },
    {
        title: "Build successful prototypes",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in eros ut sapien vulputate pretium.",
        icon: Users,
    },
];

const statBadges = [
    { label: "SUCCESS", value: "87%" },
    { label: "TEAMS", value: "5" },
    { label: "MEMBERS", value: "18" },
];

const highlightTracks = [
    {
        title: "Future of Learning",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan leo nec sapien mattis dapibus.",
        icon: Sparkles,
    },
    {
        title: "Civic Tech",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan leo nec sapien mattis dapibus.",
        icon: CircleDashed,
    },
    {
        title: "Responsible AI",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan leo nec sapien mattis dapibus.",
        icon: MessageCircle,
    },
];

const achievementStats = [
    { value: "500+", label: "Projects delivered", icon: Rocket },
    { value: "12+", label: "Years of momentum", icon: CalendarDays },
    { value: "50+", label: "Collaborators", icon: Users },
    { value: "25", label: "Awards & honours", icon: Trophy },
];

export default function Frontend() {
    return (
        <main className="w-full bg-background text-foreground">
            <section className="relative isolate overflow-hidden py-12">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary)/15%,transparent_60%),radial-gradient(circle_at_80%_0%,theme(colors.primary)/8%,transparent_45%)]" />
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center">
                        <div className="space-y-10">
                            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-foreground/60">
                                <span className="rounded-full border border-foreground/15 px-4 py-2">Innovation Lab</span>
                                <span className="rounded-full border border-foreground/15 px-4 py-2">Itahari International College</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                                INNOVATION LAB TURNS HAREBRAINED KHYAL INTO GAJAB SOLUTIONS, HAINA RA!
                            </h1>
                            <p className="text-lg leading-relaxed text-foreground/70 max-w-2xl">
                                From "batti gayo" brainstorms to "haiyaa deadline" deliveries, we remix chaos, chiya, and code. Hamro mantra simple ho: dream wild, build faster, laugh out loud while Git commits clean huncha.
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Button size="lg" className="rounded-full px-8 py-6 text-sm uppercase tracking-wide">
                                    LET&apos;S EXPLORE
                                </Button>
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="rounded-full border border-foreground/20 px-8 py-6 text-sm uppercase tracking-wide"
                                >
                                    JOIN THE MAYA
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-5">
                            <div className="rounded-3xl border border-foreground/12 bg-gradient-to-br from-primary/12 via-background to-background p-8 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.35em] text-foreground/60">Inside the lab</p>
                                <p className="mt-4 text-xl font-semibold leading-relaxed text-foreground/90">
                                    Morning standup ma jokes, rati samma shandar demos. Yo lab ko recipe: wild imagination + wai wai + adhuro charging cable = magic.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {statBadges.map((badge) => (
                                    <div
                                        key={badge.label}
                                        className="rounded-3xl border border-foreground/12 bg-background/85 p-6 text-center backdrop-blur"
                                    >
                                        <span className="block text-3xl font-semibold">{badge.value}</span>
                                        <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-foreground/55">
                                            {badge.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Ke garnu?</p>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Teamwork le banayo bandhaki chill innovation</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-relaxed text-foreground/65">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis dui lacus, nec sodales eros.
                        </p>
                    </div>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {capabilityTiles.map((tile) => {
                            const Icon = tile.icon;
                            return (
                                <div
                                    key={tile.title}
                                    className="flex h-full flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/80 p-8 backdrop-blur"
                                >
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground/90">{tile.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-foreground/65">{tile.description}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="mt-auto w-fit rounded-full border border-transparent px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60 hover:border-foreground/20"
                                    >
                                        Explore
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-background via-primary/10 to-background">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Stories in motion</p>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">News &amp; gossip worth screenshot</h2>
                        </div>
                        <Button className="h-12 w-12 rounded-full shadow-none" variant="outline">
                            <ArrowUpRight className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <article className="group relative overflow-hidden rounded-3xl border border-foreground/12 bg-background/90 backdrop-blur">
                            <div className="relative h-72 w-full">
                                <Image
                                    src={newsItems[0].image}
                                    alt={newsItems[0].title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            <div className="space-y-5 p-10">
                                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/50">
                                    <span>{newsItems[0].category}</span>
                                    <span className="h-1 w-1 rounded-full bg-foreground/40" />
                                    <span>{newsItems[0].date}</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-foreground/90">{newsItems[0].title}</h3>
                                <p className="text-sm leading-relaxed text-foreground/65">{newsItems[0].description}</p>
                                <Button variant="ghost" className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                                    La read gara
                                </Button>
                            </div>
                        </article>
                        <div className="grid gap-6">
                            {newsItems.slice(1).map((item) => (
                                <article
                                    key={item.title}
                                    className="group flex flex-col rounded-3xl border border-foreground/12 bg-background/80 p-8 backdrop-blur"
                                >
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/50">
                                        <span>{item.category}</span>
                                        <span className="h-1 w-1 rounded-full bg-foreground/40" />
                                        <span>{item.date}</span>
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-foreground/90">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-foreground/65">{item.description}</p>
                                    <Button
                                        variant="ghost"
                                        className="mt-auto w-fit rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60"
                                    >
                                        La read gara
                                    </Button>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Next up</p>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Events jaha laughter ra learning dubai</h2>
                        </div>
                        <Button className="rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] shadow-none" variant="outline">
                            Calendar hera na
                        </Button>
                    </div>
                    <div className="mt-14 grid gap-6 lg:grid-cols-3">
                        {eventItems.map((event) => (
                            <article
                                key={event.title}
                                className="flex h-full flex-col gap-6 rounded-3xl border border-foreground/12 bg-background/85 p-8 backdrop-blur"
                            >
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/50">
                                    <span>{event.date}</span>
                                    <span>{event.time}</span>
                                </div>
                                <div className="space-y-3">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-foreground/55">
                                        <CalendarDays className="h-3.5 w-3.5" />
                                        {event.category}
                                    </span>
                                    <h3 className="text-xl font-semibold text-foreground/90">{event.title}</h3>
                                    <p className="text-sm leading-relaxed text-foreground/65">{event.description}</p>
                                </div>
                                <div className="mt-auto flex items-center justify-between border-t border-foreground/15 pt-4 text-xs uppercase tracking-[0.3em] text-foreground/50">
                                    <span>{event.location}</span>
                                    <Button variant="ghost" className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
                                        Details chai?
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-b from-primary/10 via-background to-background">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Tracks in focus</p>
                                <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Curiosity meets impact, dhamaal style</h2>
                            </div>
                            <p className="text-base leading-relaxed text-foreground/70">
                                Residencies ra challenge programs ma hamro deep dive: pressing themes, playful playlists, ra pakkai pani empathy. Tech lai responsibly explore garne, tara fun flavor skip chaina.
                            </p>
                            <div className="grid gap-6 sm:grid-cols-3">
                                {highlightTracks.map((track) => {
                                    const Icon = track.icon;
                                    return (
                                        <div
                                            key={track.title}
                                            className="flex flex-col gap-3 rounded-3xl border border-foreground/12 bg-background/80 p-6 text-sm backdrop-blur"
                                        >
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <h3 className="text-lg font-semibold text-foreground/90">{track.title}</h3>
                                            <p className="text-foreground/65 leading-relaxed">{track.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="rounded-3xl border border-foreground/12 bg-background/75 p-10 backdrop-blur">
                            <p className="text-sm uppercase tracking-[0.35em] text-foreground/50">Testimonials</p>
                            <div className="mt-8 space-y-8">
                                {testimonials.map((item, index) => (
                                    <div key={item.author} className="space-y-4">
                                        <p className="text-base leading-relaxed text-foreground/80">{item.quote}</p>
                                        <div className="text-sm text-foreground/60">
                                            <p className="font-semibold text-foreground/85">{item.author}</p>
                                            <p>{item.role}</p>
                                        </div>
                                        {index < testimonials.length - 1 && <div className="h-px w-full bg-foreground/12" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                        <div className="rounded-3xl border border-foreground/12 bg-background/80 p-10 backdrop-blur">
                            <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Momentum we cultivate</p>
                            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
                                Growth anchored in collaborative experimentation ra thukka maja
                            </h2>
                            <p className="mt-6 text-base leading-relaxed text-foreground/70">
                                Sprint gara hamro sanga: measurable impact + banter + bonus playlists. New markets explore gara, digital services scale gara, ya immersive experiences prototype gara—sabai ma hamro vibes constant.
                            </p>
                            <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
                                <div className="rounded-2xl border border-foreground/12 p-6">
                                    <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Mentors onboard</p>
                                    <p className="mt-3 text-2xl font-semibold">110</p>
                                </div>
                                <div className="rounded-2xl border border-foreground/12 p-6">
                                    <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Global pilots</p>
                                    <p className="mt-3 text-2xl font-semibold">72</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {achievementStats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="flex flex-col items-center gap-3 rounded-3xl border border-foreground/12 bg-background/75 p-8 text-center backdrop-blur"
                                    >
                                        <Icon className="h-6 w-6 text-primary" />
                                        <span className="text-3xl font-semibold">{stat.value}</span>
                                        <span className="text-xs uppercase tracking-[0.35em] text-foreground/55">{stat.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}