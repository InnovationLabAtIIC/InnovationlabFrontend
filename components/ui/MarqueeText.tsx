'use client'

import Marquee from "react-fast-marquee";

interface MarqueeTextProps {
    text: string;
    speed?: number;
    className?: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
    text,
    speed = 100,
    className = "",
}) => {
    
    return (
        <div>
            <Marquee className="overflow-hidden" loop={0}>
                <p className={className}>{text}</p>
            </Marquee>
        </div>
    );
};

export default MarqueeText;