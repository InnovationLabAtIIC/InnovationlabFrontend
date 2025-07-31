import Image from "next/image";
import { AnimatedText } from "../../../components/ui/AnimatedText";
import GridSectionDivider from "../../../components/ui/GridSectionDivider";

const aboutSections = [
    {
        title: "1. STARTING THE MISSION",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        imageUrl:
            "https://img.freepik.com/free-photo/close-up-chameleon-nature_23-2151724829.jpg?t=st=1736538527~exp=1736542127~hmac=3d97954b88e2f8b3a1d7b684eb578e99d52ededfb3ef411f9f7a4714560d47fe",
        bg: "green",
    },
    {
        title: "1. STARTING THE MISSION",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        imageUrl:
            "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-beach-free-image-after-sunset-sky-free-photo.jpeg?w=600&quality=80",
        bg: "purple",
    },
    {
        title: "1. STARTING THE MISSION",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        imageUrl:
            "https://img.freepik.com/photos-gratuite/paysage-naturel-ciel-etoile-clair_23-2151683206.jpg?semt=ais_hybrid&w=740&q=80",
        bg: "blue",
    },
    // Add more sections as needed
];

export default function AboutPage() {
    return (
        <div className="min-h-auto flex flex-col items-center bg-white pb-0">
            <div className="max-w-[1240px] mt-8 w-full h-auto flex flex-col md:flex-col md:items-start md:px-0 p-4 gap-12 relative z-10">
                <div className="flex flex-col gap-2">
                    <AnimatedText className=" text-4xl sm:text-5xl md:text-[8.2vw] font-bold" text="ABOUT" />
                </div>
            </div>
            <div className=" mt-6 md:mt-12 w-full bg-black flex items-center justify-center flex-col h-auto">
                <GridSectionDivider colorMap={{ b: 'bg-white', g: 'bg-black' }} />
                <div className=" mt-2 md:mt-8 w-full max-w-[1240px] h-auto flex flex-col md:flex-col md:items-start md:px-0 p-4 gap-12 relative z-10">
                    <h2 className=" font-bold text-[8vw] md:text-[5vw]  text-white text-left my-6 md:my-12">THE BEGINNING</h2>
                    <div className="flex flex-col gap-6 md:gap-24">
                        {aboutSections.map((section, idx) => (
                            <AboutContainerGrid
                                key={idx}
                                title={section.title}
                                description={section.description}
                                imageUrl={section.imageUrl}
                                bg={section.bg}
                                reverse={idx % 2 == 0 ? true : false}
                            />
                        ))}
                    </div>
                    <h2 className=" font-bold text-[8vw] md:text-[5vw]  text-white text-left my-6 md:my-12">OUR MISSION</h2>
                    <AboutMissionGrid />
                </div>
            </div>
            <GridSectionDivider colorMap={{ b: 'bg-black', g: 'bg-slate-950' }} />
        </div>
    );
}
interface AboutContainerGridProps {
    title: string;
    description: string;
    imageUrl: string;
    bg: string
    imageAlt?: string;
}

function AboutContainerGrid({
    title,
    description,
    imageUrl,
    bg,
    imageAlt = "About section image",
    reverse = false,
}: AboutContainerGridProps & { reverse?: boolean }) {
    return (
        <div
            className={`w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 ${reverse ? "md:flex-row-reverse" : ""
                }`}
            style={reverse ? { direction: "rtl" } : {}}
        >
            <div className="w-full h-full" style={reverse ? { direction: "ltr" } : {}}>
                <h3 className="text-xl md:text-3xl font-bold mb-2 text-white">{title}</h3>
                <span className="text-md md:text-xl text-white mb-2">{description}</span>
            </div>
            <div className="w-full h-60 md:h-96 relative flex justify-center">
                <div className={`bg-${bg}-500 h-[91.5%] md:h-[calc(100%-2.3rem)] absolute top-6 md:top-10 left-0 w-11/12 md:w-10/12 z-0`} />
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-[98%] h-full bg-slate-800 object-cover translate-x-2 -translate-y-2 md:translate-x-4 md:-translate-y-4 relative z-10"
                />
            </div>
        </div>
    );
}

const MISSIONS = [
    {
        title: "Foster Innovation",
        description: "We empower students to turn creative ideas into impactful solutions through hands-on projects and mentorship.",
        icon: "🚀",
        borderColor: "border-emerald-700",
        bgColor: "bg-emerald-900",
        iconBg: "bg-emerald-700",
    },
    {
        title: "Build Community",
        description: "We connect like-minded innovators, encouraging collaboration and lifelong friendships within our vibrant community.",
        icon: "🤝",
        borderColor: "border-pink-700",
        bgColor: "bg-pink-900",
        iconBg: "bg-pink-700",
    },
    {
        title: "Promote Learning",
        description: "We organize workshops and events to help members learn new skills, from design thinking to technical expertise.",
        icon: "📚",
        borderColor: "border-cyan-700",
        bgColor: "bg-cyan-900",
        iconBg: "bg-cyan-700",
    },
    {
        title: "Celebrate Success",
        description: "We recognize and reward achievements, inspiring everyone to reach their full potential and celebrate together.",
        icon: "🏆",
        borderColor: "border-yellow-700",
        bgColor: "bg-yellow-900",
        iconBg: "bg-yellow-700",
    },
];

function AboutMissionGrid() {
    const verticalOffsets = ["mt-0", "mt-12 md:mt-24", "mt-6 md:mt-12", "mt-16 md:mt-32"];
    const verticalBottomOffsets = ["mb-6", "mb-0 md:mb-0", "mb-0 md:mb-12", "mb-0 md:mb-0"];
    return (
        <div className="w-full flex flex-col items-center overflow-visible">
            <div className="block md:hidden mt-12 overflow-visible w-full">
                <div className="flex pl-0 pr-2 overflow-visible overflow-x-auto">
                    {MISSIONS.map((m, idx) => (
                        <div
                            key={m.title}
                            className={`flex-[0_0_95%] max-w-[85vw] mr-4 ${idx === MISSIONS.length - 1 ? 'mr-0' : ''}`}
                        >
                            <div className={`relative flex flex-col items-stretch ${m.bgColor} p-0 pt-16 min-h-[340px] border-l-8 ${m.borderColor} group`}>
                                <div className={`absolute -top-10 left-6 w-20 h-20 ${m.iconBg} flex items-center justify-center text-4xl`}>
                                    <span>{m.icon}</span>
                                </div>
                                <div className="mt-12 flex flex-col items-start text-left px-6 py-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{m.title}</h3>
                                    <p className="text-md font-medium text-white mb-4">{m.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hidden overflow-visible md:grid grid-cols-2 lg:grid-cols-4 gap-0 md:gap-4 lg:gap-0 mt-12 w-full">
                {MISSIONS.map((m, idx) => (
                    <div
                        key={m.title}
                        className={`relative flex flex-col items-stretch ${m.bgColor} p-0 pt-16 min-h-[350px] border-l-8 lg:border-l-12 ${m.borderColor} ${verticalOffsets[idx % verticalOffsets.length]} ${verticalBottomOffsets[idx % verticalBottomOffsets.length]} group`}
                    >
                        <div className={`absolute -top-10 md:-top-14 left-6 w-20 h-20 md:w-28 md:h-28 ${m.iconBg} flex items-center justify-center text-5xl md:text-6xl`}>
                            <span>{m.icon}</span>
                        </div>
                        <div className="mt-12 md:mt-0 flex flex-col items-start text-left px-6 md:px-8 py-6 md:py-8">
                            <h3 className="text-lg md:text-2xl font-bold text-white mb-1">{m.title}</h3>
                            <p className="text-md md:text-lg text-white font-medium mb-4">{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
