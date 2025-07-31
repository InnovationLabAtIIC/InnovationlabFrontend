'use client'

import { useState } from "react";
import { AnimatedText } from "../../../components/ui/AnimatedText";
import GridSectionDivider from "../../../components/ui/GridSectionDivider";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-auto flex flex-col items-center bg-white pb-0">
            <div className="max-w-[1240px] mt-8 w-full h-auto flex flex-col md:flex-col md:items-start md:px-0 p-4 gap-12 relative z-10">
                <div className="flex flex-col gap-2">
                    <AnimatedText className="md:block text-5xl md:text-[8.2vw] font-bold" text="CONTACT" />
                </div>
            </div>
            <div className="mt-6 md:mt-12 w-full bg-slate-800 pb-24 flex items-center justify-center flex-col h-auto">
                <GridSectionDivider colorMap={{ b: 'bg-white', g: '800' }} />
                <div className="mt-2 px-4 md:mt-8 w-full max-w-[1240px] h-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">

                    <div className="flex-1 flex flex-col gap-8 justify-center relative">
                        <h2 className="font-bold text-[8vw] md:text-[5vw] text-white text-left mb-6">GET IN TOUCH</h2>
                        <div className="grid grid-cols-2 gap-6 sm:gap-8">
                            <ContactInfoBox icon="📧" title="Email" value="info@innovationlab.com" bgColor="bg-emerald-900" borderColor="border-emerald-700" bitColor="bg-emerald-400" />
                            <ContactInfoBox icon="📞" title="Phone" value="+1 234 567 890" bgColor="bg-pink-900" borderColor="border-pink-700" bitColor="bg-pink-400" />
                            <ContactInfoBox icon="📍" title="Address" value="123 SundarHaraincha Nepal" bgColor="bg-cyan-900" borderColor="border-cyan-700" bitColor="bg-cyan-300" />
                            <ContactInfoBox icon="💬" title="WhatsApp" value="+1 987654321" bgColor="bg-indigo-900" borderColor="border-indigo-700" bitColor="bg-indigo-400" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                        
                        <div className="absolute translate-y-3 md:translate-y-5 -translate-x-4 w-[90%] h-full bg-emerald-400 opacity-90 z-0 rounded-none" />
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white translate-x-1 md:translate-x-4  p-10 w-[95%] max-w-xl flex flex-col gap-6 relative z-10"
                        >
                            <div className="relative flex items-center mb-2">
                                
                                <h3 className="text-2xl font-bold text-slate-900 z-10 relative pl-6">Send us a message</h3>
                            </div>
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                                    placeholder="you@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-semibold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
                                    placeholder="Type your message here..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 transition text-lg"
                            >
                                Send Message
                            </button>
                            {submitted && (
                                <div className="text-green-600 font-semibold text-center mt-2">
                                    Thank you for reaching out! We'll get back to you soon.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <GridSectionDivider colorMap={{ b: 'bg-slate-950', g: 'bg-slate-800' }} flipDirection={true} />
        </div>
    );
}

interface ContactInfoBoxProps {
    icon: string;
    title: string;
    value: string;
    bgColor: string;
    borderColor: string;
    bitColor: string;
}

function ContactInfoBox({ icon, title, value, bgColor, borderColor, bitColor }: ContactInfoBoxProps) {
    return (
        <div className={`relative flex flex-col items-start ${bgColor} pt-10 min-h-[130px] border-l-8 ${borderColor} group px-6 pb-6 overflow-visible`}>
            <div className={`absolute -top-2 left-3 w-14 h-14 ${bitColor} opacity-90 z-0 rounded-none`} />
            <div className={`absolute -top-2 left-3 w-14 h-14 flex items-center justify-center text-3xl bg-${borderColor.split("-")[1]}-700 z-10 translate-x-2 -translate-y-2`}>
                <span>{icon}</span>
            </div>
            <div className="mt-5 flex flex-col items-start text-left">
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-md font-medium text-white break-all">{value}</p>
            </div>
        </div>
    );
}