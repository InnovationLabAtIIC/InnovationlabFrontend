import { AnimatedText } from "../../../components/ui/AnimatedText";


export default function AboutPage() {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="max-w-[1240px] mt-8 w-full h-auto flex flex-col md:px-0 p-4 relative z-10">
                <div className="flex flex-col gap-2">
                    <AnimatedText className="hidden md:block text-5xl md:text-[8.2vw] font-bold" text="ABOUT US" />
                    <AnimatedText className="block md:hidden text-5xl md:text-[8.2vw] font-bold" text="ABOUT US" />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}