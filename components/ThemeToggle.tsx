"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // After mounting, we have access to the theme
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" /> // spacer to avoid layout shift
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`
                fixed top-[max(1.25rem,env(safe-area-inset-top))] right-5 z-50 p-3.5 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300
                hover:scale-105 active:scale-95 group
                ${isDark
                    ? "bg-white/10 border-white/20 hover:bg-white/20 text-yellow-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "bg-white/90 border-gray-200 hover:bg-white text-orange-500 shadow-xl"
                }
            `}
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 transition-transform duration-500 rotate-0 ${isDark ? 'opacity-0 -rotate-90' : 'opacity-100'}`}
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>

                {/* Moon Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 transition-transform duration-500 rotate-0 ${isDark ? 'opacity-100' : 'opacity-0 rotate-90'}`}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>

            {/* Tooltip hint */}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
