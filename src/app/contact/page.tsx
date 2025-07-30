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
            <div className="w-full h-auto flex items-center justify-center pb-24">
                <div className="w-full h-auto max-w-[1240px] p-4 sm:p-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <AnimatedText className="hidden md:block text-4xl sm:text-5xl md:text-[8.2vw] font-bold" text="CONTACT" />
                        <AnimatedText className="block md:hidden text-4xl sm:text-5xl md:text-[8.2vw] font-bold" text="CONTACT" />
                    </div>
                    <div className="w-full min-h-[400px] md:min-h-screen flex flex-col md:flex-row mt-10 md:mt-13 sm:mt-28 gap-8 sm:gap-24">
                        <div className="w-[96%] md:w-full md:min-h-screen h-[28rem] md:h-96 relative">
                            <div className="w-full h-full z-0 bg-green-500" />
                            <div className="w-full h-full p-4 md:p-12 absolute z-10 top-0 left-0 border-4 sm:border-6 border-green-500 bg-white -translate-y-3 sm:-translate-y-6 translate-x-3 sm:translate-x-6">
                                {form.map((field) => (
                                    <label key={field.name} className="flex flex-col gap-2">
                                        <span className="font-semibold text-black text-xl mn">{field.label}</span>
                                        {field.inputType === "input" ? (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                className="border border-green-300   px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                                placeholder={field.placeholder}
                                            />
                                        ) : (
                                            <textarea
                                                name={field.name}
                                                required
                                                rows={field.rows}
                                                className="border border-green-300   px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </label>
                                ))}
                                <button
                                    type="submit"
                                    className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6   transition"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 min-h-[300px] md:min-h-screen flex flex-col gap-6 sm:gap-10">
                            <Card bg="purple" />
                            <Card bg="orange" />
                        </div>
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
