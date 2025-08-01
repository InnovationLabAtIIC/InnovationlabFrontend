import Image from "next/image";

const TEAMS = [
    {
        name: "Core Team",
        description: "The driving force behind IVLAB, responsible for strategy, operations, and vision.",
        members: [
            {
                name: "Michael Johnson",
                title: "Team Lead",
                year: "2025",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                borderColor: "border-emerald-500",
                bgColor: "bg-emerald-100",
                avatarBg: "bg-emerald-300",
            },
            {
                name: "Emily Davis",
                title: "Operations",
                year: "2025",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                borderColor: "border-pink-500",
                bgColor: "bg-pink-100",
                avatarBg: "bg-pink-300",
            },
            {
                name: "Christopher Miller",
                title: "Tech Lead",
                year: "2024",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                borderColor: "border-blue-500",
                bgColor: "bg-blue-100",
                avatarBg: "bg-blue-300",
            },
        ],
    },
    {
        name: "Design Team",
        description: "Crafting the visual identity and user experience for all IVLAB projects.",
        members: [
            {
                name: "Matthew Wilson",
                title: "Designer",
                year: "2026",
                image: "https://randomuser.me/api/portraits/men/65.jpg",
                borderColor: "border-cyan-500",
                bgColor: "bg-cyan-100",
                avatarBg: "bg-cyan-300",
            },
            {
                name: "Olivia Brown",
                title: "UX Researcher",
                year: "2026",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                borderColor: "border-yellow-500",
                bgColor: "bg-yellow-100",
                avatarBg: "bg-yellow-300",
            },
            {
                name: "Sophia Anderson",
                title: "Illustrator",
                year: "2025",
                image: "https://randomuser.me/api/portraits/women/22.jpg",
                borderColor: "border-purple-500",
                bgColor: "bg-purple-100",
                avatarBg: "bg-purple-300",
            },
            {
                name: "James Martinez",
                title: "Animator",
                year: "2024",
                image: "https://randomuser.me/api/portraits/men/77.jpg",
                borderColor: "border-orange-500",
                bgColor: "bg-orange-100",
                avatarBg: "bg-orange-300",
            },
        ],
    },
    {
        name: "Development Team",
        description: "Building and maintaining the technical backbone of IVLAB.",
        members: [
            {
                name: "Ava Thompson",
                title: "Frontend Developer",
                year: "2025",
                image: "https://randomuser.me/api/portraits/women/55.jpg",
                borderColor: "border-green-500",
                bgColor: "bg-green-100",
                avatarBg: "bg-green-300",
            },
            {
                name: "Benjamin Garcia",
                title: "Backend Developer",
                year: "2024",
                image: "https://randomuser.me/api/portraits/men/23.jpg",
                borderColor: "border-indigo-500",
                bgColor: "bg-indigo-100",
                avatarBg: "bg-indigo-300",
            },
            {
                name: "Mia Robinson",
                title: "Full Stack Developer",
                year: "2026",
                image: "https://randomuser.me/api/portraits/women/33.jpg",
                borderColor: "border-red-500",
                bgColor: "bg-red-100",
                avatarBg: "bg-red-300",
            },
        ],
    },
    {
        name: "Dummy Team",
        description: "This is a placeholder team for demonstration purposes.",
        members: [
            {
                name: "John Doe",
                title: "Dummy Member",
                year: "2027",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                borderColor: "border-gray-500",
                bgColor: "bg-gray-100",
                avatarBg: "bg-gray-300",
            },
            {
                name: "Jane Smith",
                title: "Dummy Member",
                year: "2027",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
                borderColor: "border-gray-500",
                bgColor: "bg-gray-100",
                avatarBg: "bg-gray-300",
            },
        ],
    },
];

export default function TeamPage() {
    return (
        <div className="min-h-auto flex flex-col items-center bg-white pb-24">
            <div className="max-w-[1240px] mt-8 w-full h-auto flex flex-col p-4 gap-12 relative z-10">
                <h1 className="text-5xl md:text-[8vw] font-bold mb-8">TEAM</h1>
                <div className="flex flex-col gap-12 md:gap-24">
                    {TEAMS.map((team, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 w-full items-stretch">
                            <div className="md:w-1/3 flex flex-col justify-center">
                                <h2 className="text-2xl md:text-4xl font-bold text-black mb-2">{team.name}</h2>
                                <p className="text-base md:text-xl text-black">{team.description}</p>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {team.members.map((t,k) => (
                                    <div
                                        key={k}
                                        className={`relative mt-8 flex flex-col items-stretch ${t.bgColor} p-0 pt-10 min-h-[180px] border-l-4 ${t.borderColor} group`}
                                    >
                                        <div className={`absolute -top-8 left-3 w-16 h-16 ${t.avatarBg} flex items-center justify-center`}>
                                            <Image fill src={t.image} alt={t.name} className="w-full h-full object-cover translate-x-1 -translate-y-1 md:translate-x-2 md:-translate-y-2" />
                                        </div>
                                        <div className="mt-6 flex flex-col items-start text-left px-3 py-3">
                                            <h3 className=" text-md md:text-xl font-bold text-black mb-1">{t.name}</h3>
                                            <span className={`text-md font-medium mb-1`}>{t.title}</span>
                                            <span className="text-md text-black mb-2">{t.year}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
