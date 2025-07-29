"use client";

import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, {
    ComponentPropsWithoutRef,
    useEffect,
    useMemo,
    useState,
    useRef,
} from "react";

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView] as const;
}

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
    const animations = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: "spring", stiffness: 350, damping: 40 },
    };

    return (
        <motion.div {...animations} layout className="mx-auto w-full">
            {children}
        </motion.div>
    );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
    children: React.ReactNode;
    delay?: number;
}

export const AnimatedList = React.memo(
    ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
        const [index, setIndex] = useState(0);
        const childrenArray = useMemo(
            () => React.Children.toArray(children),
            [children],
        );

        const [ref, inView] = useInView();

        useEffect(() => {
            if (!inView) return;
            if (index < childrenArray.length - 1) {
                const timeout = setTimeout(() => {
                    setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
                }, delay);

                return () => clearTimeout(timeout);
            }
        }, [index, delay, childrenArray.length, inView]);

        useEffect(() => {
            if (!inView) setIndex(0);
        }, [inView]);

        const itemsToShow = useMemo(() => {
            const result = childrenArray.slice(0, index + 1).reverse();
            return result;
        }, [index, childrenArray]);

        return (
            <div
                ref={ref}
                className={cn(`flex flex-col items-center gap-4`, className)}
                {...props}
            >
                <AnimatePresence>
                    {itemsToShow.map((item) => (
                        <AnimatedListItem key={(item as React.ReactElement).key}>
                            {item}
                        </AnimatedListItem>
                    ))}
                </AnimatePresence>
            </div>
        );
    },
);

AnimatedList.displayName = "AnimatedList";
