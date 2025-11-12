"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

const images = [
    { src: "https://cdn.wallpapersafari.com/64/10/vLNdMD.jpg", alt: "Students collaborating" },
    { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80", alt: "Prototype workshop" },
    { src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80", alt: "Event crowd" },
];

export default function HeroCarousel() {
    const [api, setApi] = React.useState<any | null>(null);
    const [index, setIndex] = React.useState(0);
    const AUTOPLAY = 5000;
    const autoplayRef = React.useRef<number | null>(null);

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            try {
                const selected = api.selectedScrollSnap();
                setIndex(selected ?? 0);
            } catch (e) {
                // ignore
            }
        };

        onSelect();
        api.on("select", onSelect);

        return () => {
            api?.off("select", onSelect);
        };
    }, [api]);

    React.useEffect(() => {
        if (!api) return;

        const start = () => {
            stop();
            autoplayRef.current = window.setInterval(() => {
                api.scrollNext();
            }, AUTOPLAY);
        };

        const stop = () => {
            if (autoplayRef.current) {
                window.clearInterval(autoplayRef.current);
                autoplayRef.current = null;
            }
        };

        start();
        const onInteraction = () => stop();

        // pause autoplay on pointer interactions
        api?.on("pointerDown", onInteraction);

        return () => {
            stop();
            api?.off("pointerDown", onInteraction);
        };
    }, [api]);

    return (
        <Carousel className="relative h-screen w-screen" setApi={setApi}>
            <CarouselContent className="h-screen">
                {images.map((img, i) => (
                    <CarouselItem key={i} className="relative h-screen">
                        <Image src={img.src} alt={img.alt} fill className="object-cover" priority={i === 0} />
                        {/* solid overlay to guarantee contrast (no gradients) */}
                        <div className="absolute inset-0 bg-neutral-900/50 dark:bg-neutral-900/60 pointer-events-none" />

                                    

                        {/* <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="max-w-4xl text-center text-white z-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-xs uppercase tracking-widest text-white/80 mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Itahari International College
                </div>

                <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
                  INNOVATION
                  <br />
                  <span className="text-primary">LAB</span>
                </h1>

                <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
                  At the heart of Itahari International College, the Innovation Lab empowers students to
                  build projects, run experiments, and collaborate across disciplines.
                </p>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <Button size="lg" className="px-8 text-sm uppercase tracking-wider">
                    Explore Projects
                  </Button>
                  <Button variant="outline" size="lg" className="px-8 text-sm uppercase tracking-wider" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div> */}
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="h-screen w-32 absolute left-0 top-0 bg-transparent group">
                <CarouselPrevious className=" -left-20 group-hover:left-0 top-1/2 -translate-y-1/2 z-30 text-white h-32 w-16 bg-primary rounded-none border-0" />
            </div>

            <div className="h-screen w-32 absolute right-0 top-0 bg-transparent group">
                <CarouselNext className="-right-20 group-hover:right-0 top-1/2 -translate-y-1/2 z-30 text-white h-32 w-16 bg-primary rounded-none border-0" />
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2 w-8 transition-colors ${i === index ? "bg-primary" : "bg-primary/40"}`}
                    />
                ))}
            </div>
        </Carousel>
    );
}
