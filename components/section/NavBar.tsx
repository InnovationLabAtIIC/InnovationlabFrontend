'use client'

import { useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";

export default function NavBar() {
    const [open, setOpen] = useState(false);

    const navigation_links = [
        { id: 1, name: "HOME", link: '/' },
        { id: 2, name: "EVENTS", link: '/events' },
        { id: 3, name: "ABOUT", link: '/about' },
        { id: 4, name: "TEAM", link: '/team' },
        { id: 5, name: "CONTACT", link: '/contact' },
    ];

    return (
        <div className="w-screen h-18 md:h-22 border-b-1 border-gray-200 flex items-center justify-center">
            <div className="max-w-[1240px] w-full h-full flex flex-row items-center px-4">
                <div className="w-4/12 md:w-2/12 h-full border-r-1 border-gray-200 flex items-center">
                    <h1 className=" text-3xl md:text-5xl font-normal">LOGO</h1>
                </div>
                <div className="flex-1 flex items-center justify-end md:hidden">
                    <button onClick={() => setOpen(!open)} className="focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                <div className="w-8/12 h-full items-center px-15 gap-15 hidden md:flex">
                    {
                        navigation_links.map((item) => {
                            return (
                                <Link href={item.link || '#'} key={item.id} className="">{item.name}</Link>
                            )
                        })
                    }
                </div>
                <div className="hidden md:flex items-center justify-end">
                    <Button bg="">Start Here</Button>
                </div>
            </div>
            <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    <button onClick={() => setOpen(false)} className="absolute top-6 right-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {
                        navigation_links.map((item) => (
                            <Link href={item.link} key={item.id} onClick={() => setOpen(!open)} className=" text-xl md:text-3xl">{item.name}</Link>
                        ))
                    }
                    <Button bg="">Start Here</Button>
                </div>
            </div>
        </div>
    );
}