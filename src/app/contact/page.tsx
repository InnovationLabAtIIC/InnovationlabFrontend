'use client'

import { AnimatedText } from "../../../components/ui/AnimatedText";
import GridSectionDivider from "../../../components/ui/GridSectionDivider";

export default function ContactPage() {

    const form =
        [
            {
                label: "Name",
                name: "name",
                type: "text",
                placeholder: "Your Name",
                inputType: "input",
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "you@email.com",
                inputType: "input",
            },
            {
                label: "Message",
                name: "message",
                placeholder: "Type your message...",
                inputType: "textarea",
                rows: 5,
            },
        ]

    return (
        <>
            <div className="w-full min-h-screen flex justify-center pb-24">
                <div className="w-full h-auto max-w-[1240px] p-4 sm:p-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <AnimatedText className="hidden md:block text-4xl sm:text-5xl md:text-[8.2vw] font-bold" text="CONTACT" />
                        <AnimatedText className="block md:hidden text-4xl sm:text-5xl md:text-[8.2vw] font-bold" text="CONTACT" />
                    </div>
                </div>
            </div>
            <GridSectionDivider colorMap={{ b: 'bg-slate-950', g: 'bg-white' }} flipDirection={true} />
        </>
    );
}

const bgClassMap: Record<string, string> = {
    purple: "bg-purple-500 border-purple-500",
    orange: "bg-sky-500 border-sky-500",
};

function Card({ bg }: { bg: string }) {
    const classes = bgClassMap[bg] || "";
    const [bgColor, borderColor] = classes.split(" ");
    return (
        <div className=" w-[96%] md:w-full h-48 sm:h-72 md:h-96 relative">
            <div className={`w-full h-full z-0 ${bgColor}`} />
            <div className={`w-full h-full absolute z-10 top-0 left-0 border-4 sm:border-6 ${borderColor} bg-white -translate-y-3 sm:-translate-y-6 translate-x-3 sm:translate-x-6`} />
        </div>
    );
}
