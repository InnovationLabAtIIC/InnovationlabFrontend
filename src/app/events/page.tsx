'use client'

import { AnimatedText } from "../../../components/ui/AnimatedText";
import GridSectionDivider from "../../../components/ui/GridSectionDivider";
import Image from "next/image";

const EVENTS = [
  {
    title: "TechXpo 2025",
    description:
      "A showcase of the latest innovations in technology, featuring student projects, industry demos, and hands-on workshops. Join us for a day of inspiration and discovery!\n\nHighlights:\n- 30+ student projects\n- Industry keynote speakers\n- Live tech demos\n- Networking sessions\n\nDon't miss the biggest tech event of the year!",
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    ],
    color: "bg-emerald-500",
  },
  {
    title: "Innovation Hackathon",
    description:
      "Compete in our 24-hour hackathon to solve real-world problems with creative solutions. Network with mentors, win prizes, and turn your ideas into reality!\n\nWhat to Expect:\n- Diverse teams\n- Expert mentorship\n- Free food & swag\n- Cash prizes for winners\n\nBring your ideas and energy!",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    ],
    color: "bg-indigo-500",
  },
  {
    title: "Design Thinking Bootcamp",
    description:
      "A hands-on bootcamp to learn the fundamentals of design thinking. Collaborate, ideate, and prototype with guidance from industry experts.\n\nBootcamp Features:\n- Interactive workshops\n- Real-world case studies\n- Team-based challenges\n- Certificate of completion\n\nPerfect for all experience levels!",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    ],
    color: "bg-pink-500",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-auto flex flex-col items-center bg-white pb-0 px-24">
      <div className="max-w-[1240px] mt-8 w-full h-auto flex flex-col md:flex-col md:items-start md:px-0 p-4 gap-12 relative z-10">
        <div className="flex flex-col gap-2 px-2">
          <AnimatedText className="md:block text-5xl md:text-[8.2vw] font-bold" text="EVENTS" />
        </div>
      </div>
    </div>
  );
}