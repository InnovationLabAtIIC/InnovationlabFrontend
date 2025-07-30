import Image from "next/image";
import { AnimatedText } from "../../../components/ui/AnimatedText";

export default function AboutPage() {
    const About = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
            bg: 'bg-purple-500',
            name: 'Our Mission',
            desc: "We strive to innovate and deliver high-quality solutions that empower our clients to achieve their goals."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
            bg: 'bg-blue-500',
            name: 'Our Team',
            desc: "Our diverse team of experts brings together creativity, technical skill, and passion for excellence."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
            bg: 'bg-green-500',
            name: 'Our Vision',
            desc: "We envision a future where technology bridges gaps and creates new opportunities for everyone."
        }
    ]

    return (
        <div className="min-h-screen flex justify-center pb-24">
            <div className="max-w-[1240px] mt-8 w-full h-auto flex flex-col md:px-0 p-4 relative z-10">
                <div className="flex flex-col gap-2">
                    <AnimatedText className="hidden md:block text-5xl md:text-[8.2vw] font-bold" text="ABOUT US" />
                    <AnimatedText className="block md:hidden text-5xl md:text-[8.2vw] font-bold" text="ABOUT US" />
                </div>
                <div className="mt-12">
                    <div className="w-full h-auto mt-3 md:mt-5 flex flex-col gap-16 md:gap-16">
                        {About.map((item, idx) => (
                            <div
                                key={item.id}
                                className={`relative overflow-hidden flex flex-col md:flex-row w-full h-auto pb-0 md:pb-0 ${
                                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                <div className="w-full md:w-5/12 h-64 md:h-96 relative">
                                    <div className={`${item.bg} h-52 md:h-86 absolute top-10 left-0 w-10/12 z-0`} />
                                    <div className="w-full h-62 md:h-96 bg-gray-100 translate-x-4 -translate-y-4 relative z-10 flex items-center justify-center overflow-hidden">
                                        <Image
                                            alt=""
                                            src={item.image}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-0 md:px-16 flex flex-col flex-1 mt-4 relative z-10">
                                    <h3 className="text-xl md:text-3xl font-bold mb-2 text-black">{item.name}</h3>
                                    <p className="text-base md:text-lg text-black mb-4">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}