import { AnimatedText } from "../ui/AnimatedText";
import Button from "../ui/Button";
import HeroSlider from "./HeroSlider";

export default function Hero() {
    return (
        <>
            <div className=" w-full h-auto flex items-center justify-center ">
                <div className="w-full h-full max-w-[1240px] p-4 mt-8">
                    <div className="flex flex-col gap-2">
                        <AnimatedText className="hidden md:block text-5xl md:text-[8.2vw] font-bold" text="INNOVATION LABS" />
                        <AnimatedText className="block md:hidden text-5xl md:text-[8.2vw] font-bold" text="INNOVATIONLABS" />
                        <p className=" text-md md:text-xl max-w-[600px]">There are many variations of passages of Lorem Ipsum available, but the  majority have suffered alteration in some form, by injected humour, or  randomised words which don't look even slightly believable.</p>
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <Button bg="">GET STARTED</Button>
                        <Button bg="">ABOUT US</Button>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full flex justify-end">
                    <div className="grid grid-cols-2 grid-rows-2 gap-0 w-16 h-16 md:w-48 md:h-48">
                        {['bg-white', 'bg-emerald-200', 'bg-emerald-100', 'bg-emerald-300'].map((item, i) => (
                            <div key={i} className={`w-full h-full ${item}`}></div>
                        ))}
                    </div>
                </div>
                <HeroSlider />
                <div className="w-full flex justify-start bg-white">
                    <div className="grid grid-cols-2 grid-rows-2 gap-0 w-16 h-16 md:w-48 md:h-48">
                        {['bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200', 'bg-white'].map((item, i) => (
                            <div key={i} className={`w-full h-full ${item}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}