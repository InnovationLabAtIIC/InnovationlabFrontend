'use client'

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React from 'react';

const TESTIMONIALS = [
    {
        name: "Aarav Sharma",
        title: "Student Innovator",
        text: "IVLAB gave me the platform to turn my ideas into reality. The mentors and community are amazing!",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        borderColor: "border-emerald-500",
        bgColor: "bg-emerald-100",
        avatarBg: "bg-emerald-300",
        button: "emerald",
    },
    {
        name: "Priya Verma",
        title: "Tech Volunteer",
        text: "I loved collaborating on projects and learning new skills. The events are super fun and inspiring.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        borderColor: "border-pink-500",
        bgColor: "bg-pink-100",
        avatarBg: "bg-pink-300",
        button: "pink",
    },
    {
        name: "Rahul Singh",
        title: "Workshop Attendee",
        text: "The workshops are hands-on and practical. I learned so much about design thinking and teamwork.",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
        borderColor: "border-cyan-500",
        bgColor: "bg-cyan-100",
        avatarBg: "bg-cyan-300",
        button: "cyan",
    },
    {
        name: "Sneha Patel",
        title: "Event Winner",
        text: "Winning Creative Clash boosted my confidence. IVLAB is the best place to grow and connect!",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        borderColor: "border-yellow-500",
        bgColor: "bg-yellow-100",
        avatarBg: "bg-yellow-300",
        button: "yellow",
    },
];

export default function Testimonials() {
    const verticalOffsets = ["mt-0", "mt-12 md:mt-24", "mt-6 md:mt-12", "mt-16 md:mt-32"];
    const verticalBottomOffsets = ["mb-6", "mb-0 md:mb-0", "mb-0 md:mb-12", "mb-0 md:mb-0"];
    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <div className="w-screen flex justify-center bg-white pb-16">
            <div className="max-w-[1240px] w-full flex flex-col px-4 md:px-0">
                <h2 className="font-bold text-left text-black my-6 md:my-12 text-[8vw] md:text-[5vw]">
                    TESTIMONIALS
                </h2>
                <div className="block md:hidden mt-12">
                    <div ref={emblaRef}>
                        <div className="flex pl-2 pr-2">
                            {TESTIMONIALS.map((t, idx) => (
                                <div
                                    key={t.name}
                                    className={`flex-[0_0_90%] max-w-[85vw] mr-4 ${idx === TESTIMONIALS.length - 1 ? 'mr-0' : ''}`}
                                >
                                    <div
                                        className={`relative flex flex-col items-stretch ${t.bgColor} p-0 pt-16 min-h-[340px] border-l-8 ${t.borderColor} group`}
                                    >
                                        <div className={`absolute -top-10 left-6 w-20 h-20 ${t.avatarBg} flex items-center justify-center`}>
                                            <Image src={t.image} alt={t.name} className="w-full h-full object-cover translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4" />
                                        </div>
                                        <div className="mt-12 flex flex-col items-start text-left px-6 py-6">
                                            <h3 className="text-xl font-bold text-black mb-1">{t.name}</h3>
                                            <span className="text-sm text-black mb-3">{t.title}</span>
                                            <p className="text-md font-medium text-black mb-4">“{t.text}”</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-0 md:gap-4 lg:gap-0 mt-12">
                    {TESTIMONIALS.map((t, idx) => (
                        <div
                            key={t.name}
                            className={`relative flex flex-col items-stretch ${t.bgColor} p-0 pt-16 min-h-[450px] border-l-8 lg:border-l-12 ${t.borderColor} ${verticalOffsets[idx % verticalOffsets.length]} ${verticalBottomOffsets[idx % verticalBottomOffsets.length]} group`}
                        >
                            <div className={`absolute -top-10 md:-top-14 left-6 w-20 h-20 md:w-28 md:h-28 ${t.avatarBg} flex items-center justify-center`}>
                                <Image src={t.image} alt={t.name} className="w-full h-full object-cover translate-x-4 -translate-y-4" />
                            </div>
                            <div className="mt-12 md:mt-0 flex flex-col items-start text-left px-6 md:px-8 py-6 md:py-8">
                                <h3 className="text-lg md:text-2xl font-bold text-black mb-1">{t.name}</h3>
                                <span className="text-sm md:text-base text-black mb-3">{t.title}</span>
                                <p className="text-md md:text-lg text-black font-medium mb-4">“{t.text}”</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
