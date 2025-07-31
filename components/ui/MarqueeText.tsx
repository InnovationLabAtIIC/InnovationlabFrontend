'use client'

import Marquee from "react-fast-marquee";

interface MarqueeTextProps {
    text: string;
    speed?: number;
    className?: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
    text,
    className = "",
}) => {

    return (
        <Marquee className="overflow-hidden" loop={0}>
            <p className={className}>{text}</p>
        </Marquee>
    );
};

export default MarqueeText;