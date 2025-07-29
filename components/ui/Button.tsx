import { ReactNode } from "react";

const BG_COLORS: Record<string, { main: string; light: string }> = {
    emerald: { main: "bg-emerald-600", light: "bg-emerald-200" },
    blue: { main: "bg-blue-600", light: "bg-blue-200" },
    red: { main: "bg-red-600", light: "bg-red-200" },
    purple: { main: "bg-purple-600", light: "bg-purple-200" },
    green: { main: "bg-green-600", light: "bg-green-200" },
};

export default function Button({ children, bg = "emerald" }: { children: ReactNode, bg: string }) {
    const bgClasses = BG_COLORS[bg] || BG_COLORS["emerald"];
    return (
        <div className="flex flex-col group cursor-pointer w-full max-w-[180px] sm:max-w-sm md:max-w-[240px]">
            <div className={`px-1 py-2 text-sm sm:px-4 sm:py-3 sm:text-lg md:px-8 md:py-3 md:text-xl group-active:translate-y-2 transition-all duration-50 ${bgClasses.main} text-white font-normal text-center`}>
                {children}
            </div>
            <div className={`w-7/12 h-1 sm:w-9/12 sm:h-2 md:w-10/12 ${bgClasses.main} opacity-40 transition-all duration-50 group-hover:w-full`} />
        </div>
    );
}
