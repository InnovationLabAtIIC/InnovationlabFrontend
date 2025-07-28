import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col md:max-w-[240px] group cursor-pointer w-full max-w-[300px] sm:max-w-sm">
            <div className="px-4 py-3  sm:px-6 sm:py-2.5 md:px-8 md:py-3 group-active:translate-y-2 transition-all duration-50 bg-emerald-600 text-white font-normal text-base sm:text-lg md:text-xl text-center">
                {children}
            </div>
            <div className="w-8/12 h-2 bg-emerald-200 transition-all duration-50 group-hover:w-full sm:w-9/12 md:w-10/12" />
        </div>
    );
}
