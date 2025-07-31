import Button from '../ui/Button';
import Image from 'next/image';

export default function Events() {

    const EVENTS = [
        {
            id: 1,
            bg: 'bg-red-500',
            name: 'SUMMER ENRICHMENT',
            desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            button: 'red',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            bg: 'bg-purple-500',
            name: 'IIC QUEST',
            desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            button: 'purple',
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            bg: 'bg-green-500',
            name: 'CREATIVE CLASH',
            desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            button: 'green',
            image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
        },
    ];

    if (EVENTS.length === 0) return null;

    return (
        <>
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
                            <div
                                key={item.id}
                                className="relative overflow-hidden flex flex-col md:flex-row w-full h-auto pb-0 md:pb-0"
                            >
                                <div className=" w-full md:w-5/12 h-64 md:h-96 relative">
                                    <div className={`${item.bg} h-52 md:h-86 absolute top-10 left-0 w-10/12 z-0`} />
                                    <div className="w-full h-62 md:h-96 bg-white translate-x-4 -translate-y-4 relative z-10 flex items-center justify-center overflow-hidden">
                                        <Image
                                            alt=""
                                            src={item.image}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className=" p-0 md:px-16 flex flex-col flex-1 mt-4 relative z-10">
                                    <h3 className="text-xl md:text-3xl font-bold mb-2 text-white">{item.name}</h3>
                                    <p className="text-base md:text-lg text-white mb-4">{item.desc}</p>
                                    <div>
                                        <Button bg={item.button}>
                                            EXPLORE
                                        </Button>
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