'use client';

import Image from "next/image";
import MarqueeText from "../ui/MarqueeText";

export default function Footer() {

    return (
        <footer className="w-full h-full min-h-[50vh] md:min-h-screen flex flex-col items-start justify-end bg-gray-950 relative overflow-hidden pt-4 pb-8 mt-0">
            <MarqueeText className="w-full text-gray-900 text-4xl md:text-9xl font-bold" text="010000100101100101001101010000010100111001001010010001010101100101011001" />
            <div className="w-full max-w-[1240px] mx-auto">

            <div className="relative z-10 w-full max-w-[1240px] flex flex-col items-start gap-8 px-4">
                <div className="relative w-fit mx-auto">
                <h1 className="text-white text-[9.8vw] md:text-[6.1vw] font-extrabold tracking-tight text-center drop-shadow-lg">INNOVATION LABS</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-2 w-full text-base md:text-xl font-mono tracking-widest mt-2">
                <span className="w-full sm:w-auto text-center bg-gray-900/60 px-3 py-1 border border-emerald-700 shadow-md text-emerald-400 font-semibold">Empowering Innovation</span>
                <span className="w-full sm:w-auto text-center bg-gray-900/60 px-3 py-1 border border-pink-700 shadow-md text-pink-400 font-semibold">Building Community</span>
                <span className="w-full sm:w-auto text-center bg-gray-900/60 px-3 py-1 border border-yellow-700 shadow-md text-yellow-300 font-semibold">Inspiring Creativity</span>
                </div>
                <div className="w-full flex justify-center my-8">
                <div className="grid grid-cols-12 gap-1 w-full max-w-[54rem]">
                    {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-2 ${i % 3 === 0 ? 'bg-emerald-400' : 'bg-gray-800'}`}></div>
                    ))}
                </div>
                </div>
                <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 mt-4">
                <div className="flex gap-6 text-gray-300 text-sm md:text-base text-center items-center justify-center">
                    <a href="#" className="hover:text-emerald-400 transition font-semibold">Home</a>
                    <a href="#" className="hover:text-emerald-400 transition font-semibold">Events</a>
                    <a href="#" className="hover:text-emerald-400 transition font-semibold">About</a>
                    <a href="#" className="hover:text-emerald-400 transition font-semibold">Team</a>
                    <a href="#" className="hover:text-emerald-400 transition font-semibold">Contact</a>
                </div>
                </div>
            </div>
            <div className="relative z-10 w-full flex justify-center mt-8">
                <span className="text-gray-500 text-xs md:text-sm">&copy; {new Date().getFullYear()} Innovation Labs. All rights reserved.</span>
            </div>
            </div>
            <MarqueeText className="w-full text-gray-900 text-4xl md:text-9xl font-bold" text="010000100101100101001101010000010100111001001010010001010101100101011001" />
            <Image
            alt=""
            fill
            className="object-cover grayscale opacity-20 w-full h-full absolute top-0 left-0 z-[0]"
            src="https://pictures.altai-travel.com/1920x0/mount-everest-aerial-view-himalayas-istock-3745.jpg"
            />
        </footer>
    );
}