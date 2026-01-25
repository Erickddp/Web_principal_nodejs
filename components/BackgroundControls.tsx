"use client";

import { useState } from "react";
import { AnimatedBackgroundProps } from "./AnimatedBackgroundCanvas";
import { DEFAULT_BACKGROUND_PARAMS, ANIMATION_LIMITS } from "@/lib/backgroundDefaults";

interface BackgroundControlsProps {
    params: Required<AnimatedBackgroundProps>;
    onChange: (newParams: Required<AnimatedBackgroundProps>) => void;
    onReset: () => void;
}

export function BackgroundControls({ params, onChange, onReset }: BackgroundControlsProps) {
    const [isOpen, setIsOpen] = useState(false);

    // SVG Icons
    const GearIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    const updateParam = (key: keyof AnimatedBackgroundProps, value: string | number) => {
        onChange({
            ...params,
            [key]: value,
        });
    };

    return (
        <div className="fixed z-50 top-4 right-4 flex flex-col items-end">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-lg"
                aria-label="Toggle Controls"
            >
                {isOpen ? <XIcon /> : <GearIcon />}
            </button>

            {/* Panel */}
            {isOpen && (
                <div className="mt-4 w-72 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Animation Control</h3>

                    <div className="space-y-5">
                        {/* Speed / Intensity */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Speed</span>
                                <span>{params.intensity.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min={ANIMATION_LIMITS.intensity.min}
                                max={ANIMATION_LIMITS.intensity.max}
                                step={ANIMATION_LIMITS.intensity.step}
                                value={params.intensity}
                                onChange={(e) => updateParam("intensity", parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                        {/* Particle Count */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Particles</span>
                                <span>{params.particleCount}</span>
                            </div>
                            <input
                                type="range"
                                min={ANIMATION_LIMITS.particleCount.min}
                                max={ANIMATION_LIMITS.particleCount.max}
                                step={ANIMATION_LIMITS.particleCount.step}
                                value={params.particleCount}
                                onChange={(e) => updateParam("particleCount", parseInt(e.target.value))}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        {/* Blur/Trail */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Trails</span>
                                <span>{(params.blur * 100).toFixed(0)}%</span>
                            </div>
                            <input
                                type="range"
                                min={ANIMATION_LIMITS.blur.min}
                                max={ANIMATION_LIMITS.blur.max}
                                step={ANIMATION_LIMITS.blur.step}
                                value={params.blur}
                                onChange={(e) => updateParam("blur", parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                        </div>

                        {/* Color Mode */}
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 block">Theme</label>
                            <div className="grid grid-cols-3 gap-2">
                                {["Neon", "Ocean", "Mono"].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => updateParam("colorMode", mode)}
                                        className={`px-2 py-1.5 text-xs rounded-md transition-colors border ${params.colorMode === mode
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500"
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reset */}
                        <div className="pt-4 border-t border-white/10">
                            <button
                                onClick={onReset}
                                className="w-full py-2 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                Reset to Defaults
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
