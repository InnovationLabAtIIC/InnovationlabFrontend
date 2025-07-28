'use client'

import React from "react";
// import { motion, useAnimationFrame } from "framer-motion";

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
    const containerRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLDivElement>(null);
    const [widths, setWidths] = React.useState({ container: 0, text: 0 });
    const [x, setX] = React.useState(0);

    React.useLayoutEffect(() => {
        if (containerRef.current && textRef.current) {
            setWidths({
                container: containerRef.current.offsetWidth,
                text: textRef.current.offsetWidth,
            });
        }
    }, [text]);

    React.useEffect(() => {
        if (widths.text === 0) return;
        let animationFrame: number;
        let lastTime = performance.now();

        const animate = (now: number) => {
            const delta = now - lastTime;
            lastTime = now;
            setX(prev => {
                let next = prev - (speed * delta) / 1000;
                if (Math.abs(next) >= widths.text) {
                    next = 0;
                }
                return next;
            });
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [speed, widths.text]);

    return (
        <div ref={containerRef} className={className} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div
                ref={textRef}
                style={{
                    display: "inline-block",
                    transform: `translateX(${x}px)`,
                    willChange: "transform",
                }}
            >
                {text}
            </div>
            <div
                style={{
                    display: "inline-block",
                    transform: `translateX(${x + widths.text}px)`,
                    willChange: "transform",
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default MarqueeText;