"use client";

import { useEffect, useRef } from "react";

export interface AnimatedBackgroundProps {
    intensity?: number;
    particleCount?: number;
    blur?: number;
    colorMode?: "Neon" | "Ocean" | "Mono";
}

export function AnimatedBackgroundCanvas({
    intensity = 1,
    particleCount = 200,
    blur = 0.5,
    colorMode = "Neon",
}: AnimatedBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let isMobile = false;

        // Particle class-like structure in closure
        type Particle = {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            hue: number;
        };

        let particles: Particle[] = [];
        let time = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            isMobile = width < 768;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            ctx.scale(dpr, dpr);

            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Adjust count based on screen size (safeguard)
            const safeCount = isMobile ? Math.min(particleCount, 100) : particleCount;

            for (let i = 0; i < safeCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 2 + 0.5,
                    hue: Math.random() * 60, // Local hue variation
                });
            }
        };

        const getBaseHue = () => {
            switch (colorMode) {
                case "Ocean": return 200; // Cyan/Blue
                case "Mono": return 0; // White/Gray (handled in draw)
                case "Neon":
                default: return 260; // Purple/Blue
            }
        };

        const draw = () => {
            // Trail effect
            // Use logic: if blur is high, we clear less (more trails).
            // actually standard trick is ctx.fillStyle = `rgba(0,0,0, ${1 - blur})`;
            // If user sets blur 0.95 -> we want LONG trails -> opacity 0.05
            // If user sets blur 0 -> we want NO trails -> opacity 1
            const fadeAlpha = 1 - Math.min(Math.max(blur, 0.05), 0.99); // Clamp for safety

            ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
            ctx.fillRect(0, 0, width, height);

            const baseHue = getBaseHue();
            time += 0.005 * intensity;

            particles.forEach((p) => {
                // Flow field logic using simple trig noise
                // Angle based on position
                const zoom = 0.002;
                const noise = Math.sin(p.x * zoom + time) + Math.cos(p.y * zoom + time) * 0.5;
                const angle = noise * Math.PI * 2;

                const speed = isMobile ? 0.5 : 1 + (intensity * 0.5);

                p.vx += Math.cos(angle) * 0.1;
                p.vy += Math.sin(angle) * 0.1;

                // Friction
                p.vx *= 0.9;
                p.vy *= 0.9;

                // Apply
                p.x += p.vx * speed;
                p.y += p.vy * speed;

                // Wrap around
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Draw
                ctx.beginPath();
                const pColor = colorMode === "Mono"
                    ? `hsla(0, 0%, 80%, 0.8)`
                    : `hsla(${baseHue + p.hue}, 80%, 60%, 0.8)`;

                ctx.fillStyle = pColor;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(draw);
        };

        // Initial setup
        resize();
        window.addEventListener("resize", resize);
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [intensity, particleCount, blur, colorMode]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 bg-black">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
