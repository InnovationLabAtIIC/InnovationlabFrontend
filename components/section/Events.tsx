import { motion } from 'framer-motion'
import Button from '../ui/Button';
import GridSectionDivider from '../ui/GridSectionDivider';

export default function Events() {

    const EVENTS = [
        {
            id: 1,
            bg: 'bg-red-500',
            name: 'SUMMER ENRICHMENT',
            desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            button: 'red'
        },
        {
            id: 2,
            bg: 'bg-purple-500',
            name: 'IIC QUEST',
            desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            button: 'purple'
        },
        {
            id: 3,
            bg: 'bg-green-500',
            name: 'CREATIVE CLASH',
            desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            button: 'green'
        },
    ];

    if (EVENTS.length === 0) return null;

    return (
        <>
            {/* <GridSectionDivider /> */}
            <div className="w-screen h-auto bg-black flex items-start justify-center pb-12 relative overflow-hidden">
                {/* <div
                className="absolute inset-0 pointer-events-none z-0"
                aria-hidden="true"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '64px 64px',
                    width: '100%',
                    height: '100%',
                }}
            /> */}
                <div className="max-w-[1240px] w-full h-auto mt-0 flex flex-col md:px-0 p-4 relative z-10">
                    <h2 className=" font-bold text-[8vw] md:text-[5vw]  text-white text-left my-6 md:my-12">EVENTS</h2>
                    <div className="w-full h-auto mt-3 md:mt-10 flex flex-col gap-16 md:gap-32">
                        {EVENTS.map((item) => (
                            <div key={item.id} className="w-full md:h-96 h-auto relative ">
                                <div className="w-full h-full relative flex flex-col md:flex-row z-10">
                                    <div className="w-full md:w-96 h-64 md:h-96 bg-gray-800 relative flex-shrink-0">
                                        <div className={`flex w-full h-full ${item.bg} translate-y-2 md:-translate-x-0 md:-translate-y-0 -translate-x-2 `}></div>
                                        <div className="md:flex w-full h-full bg-gray-800 absolute top-0 md:translate-x-12 md:-translate-y-12"></div>
                                    </div>
                                    <div className="w-full md:w-[calc(100%-24rem)] h-auto md:h-96 py-6 md:py-0 md:px-8 md:pl-24 flex flex-col justify-start">
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">{item.name}</h3>
                                        <p className="text-base md:text-lg text-gray-200 mb-4 md:mb-6">
                                            {item.desc}
                                        </p>
                                        <div>
                                            <Button bg={item.button}>
                                                EXPLORE
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}