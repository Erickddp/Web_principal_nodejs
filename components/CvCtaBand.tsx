"use client";

import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useReducedMotion,
    Variants
} from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

export const CvCtaBand = () => {
    const ref = useRef<HTMLAnchorElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement for spotlight
    const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // For nebula/glow position (inverse/parallax effect could be added, but keeping simple for now)

    const shouldReduceMotion = useReducedMotion();

    // Animation variants
    const kickVariant: Variants = {
        rest: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.01,
            rotate: [0, -0.5, 0.5, 0],
            transition: {
                duration: 0.25,
                ease: "easeInOut",
            },
        },
        tap: { scale: 0.98 },
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    // Spotlight gradient - integrated with nebula feeling
    const spotlightMask = useMotionTemplate`radial-gradient(400px circle at ${mouseXSpring}px ${mouseYSpring}px, rgba(255,255,255,0.2), transparent 80%)`;

    return (
        <motion.a
            ref={ref}
            href="https://cv.erickddp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir CV Dinámico en una nueva pestaña"
            initial="rest"
            whileHover={shouldReduceMotion ? "rest" : "hover"}
            whileTap="tap"
            onMouseMove={handleMouseMove}
            variants={kickVariant}
            className="group relative w-full h-auto min-h-[5rem] max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 p-6 sm:px-8 mt-2
                 overflow-hidden rounded-2xl md:rounded-3xl
                 bg-transparent
                 cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-400/50 transition-all z-0"
        >
            {/* CAPA 1A: Border Core (Clean & Sharp) */}
            <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none transition-all duration-300 z-0"
                style={{
                    padding: "2px", // Grosor 2px
                    background:
                        "conic-gradient(from 210deg at 50% 50%, rgba(59,130,246,0) 0%, rgba(59,130,246,1) 20%, rgba(168,85,247,0.9) 45%, rgba(34,211,238,0.8) 70%, rgba(59,130,246,0) 100%)",
                    mask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: 0.85, // Borde muy visible por defecto
                    filter: "saturate(1.0)",
                }}
            />
            {/* CAPA 1B: Border Glow (External Glow) */}
            <div
                className="absolute -inset-[6px] rounded-[inherit] pointer-events-none transition-all duration-500 z-0 opacity-35 group-hover:opacity-55"
                style={{
                    background:
                        "conic-gradient(from 210deg at 50% 50%, rgba(59,130,246,0) 0%, rgba(59,130,246,1) 20%, rgba(168,85,247,1) 45%, rgba(34,211,238,1) 70%, rgba(59,130,246,0) 100%)",
                    mask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    filter: "blur(10px)",
                }}
            />

            {/* Galaxy Border Hover Boost (Core Saturation) */}
            <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 mix-blend-plus-lighter"
                style={{
                    padding: "2px",
                    background:
                        "conic-gradient(from 210deg at 50% 50%, rgba(59,130,246,0) 0%, rgba(59,130,246,1) 20%, rgba(168,85,247,1) 45%, rgba(34,211,238,1) 70%, rgba(59,130,246,0) 100%)",
                    mask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    filter: "saturate(1.5)", // Extra punch en hover
                }}
            />

            {/* CAPA 2: Nebula Inner Glow (Very Subtle) */}
            {!shouldReduceMotion && (
                <>
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_60%)] mix-blend-screen pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_60%)] mix-blend-screen pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
                </>
            )}

            {/* CAPA 3: Spotlight */}
            {!shouldReduceMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block z-0 mix-blend-screen"
                    style={{ background: spotlightMask }}
                />
            )}

            {/* CAPA 4: Comet Streak (Enhanced Visibility) */}
            {!shouldReduceMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none from-transparent via-cyan-300/40 to-transparent w-[150%] -skew-x-45 blur-2xl z-0"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.5) 50%, transparent 100%)' }}
                    initial={{ x: "-150%", opacity: 0 }}
                    variants={{
                        hover: {
                            x: "150%",
                            opacity: 1,
                            transition: {
                                duration: 0.6,
                                ease: "easeInOut",
                            },
                        },
                    }}
                />
            )}

            {/* CAPA 5: Spark Corner */}
            {!shouldReduceMotion && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/30 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-0" />
            )}


            {/* Content Section (z-10 to stay above effects) */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 z-10 w-full md:w-auto text-center md:text-left transition-transform group-hover:translate-x-1 duration-300">
                <div className="p-3 bg-white/50 dark:bg-black/40 rounded-full w-fit mx-auto md:mx-0 shadow-inner border border-black/10 dark:border-white/10 backdrop-blur-sm group-hover:bg-white/60 dark:group-hover:bg-black/50 transition-colors">
                    <FileText className="w-6 h-6 text-slate-900 dark:text-white/80" />
                </div>
                <div className="relative">
                    {/* Legibility text shadows (Tailwind drop-shadows as requested) */}
                    <h2
                        className="text-xl md:text-2xl font-extrabold dark:font-bold tracking-tight text-slate-900 dark:text-white drop-shadow-[0_1px_10px_rgba(255,255,255,0.55)] dark:drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
                    >
                        Mi CV Dinámico
                    </h2>
                    <p
                        className="text-sm md:text-base font-semibold dark:font-medium text-slate-700 dark:text-white/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.55)] dark:drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
                    >
                        Explora mi experiencia y logros
                    </p>
                </div>
            </div>

            {/* CTA Section (z-10) */}
            <div className="flex flex-col items-center md:items-end gap-1 z-10 transition-transform group-hover:-translate-x-1 duration-300">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/85 text-white hover:bg-black dark:bg-white/10 dark:text-white dark:hover:bg-white/15 rounded-full border border-black/10 dark:border-white/20 transition-all shadow-md dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-lg dark:group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] dark:group-hover:border-white/40">
                    <span className="text-sm font-bold dark:font-medium drop-shadow-md">Abrir ahora</span>
                    <ArrowRight className="w-4 h-4 text-white dark:text-blue-200 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-white/60 font-bold dark:font-semibold mt-1 drop-shadow-sm">
                    cv.erickddp.com
                </span>
            </div>
        </motion.a>
    );
};
