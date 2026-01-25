import { AnimatedBackgroundProps } from "@/components/AnimatedBackgroundCanvas";

export const DEFAULT_BACKGROUND_PARAMS: Required<AnimatedBackgroundProps> = {
    intensity: 1,
    particleCount: 200,
    blur: 0.5,
    colorMode: "Neon",
};

export const ANIMATION_LIMITS = {
    intensity: { min: 0, max: 2, step: 0.1 },
    particleCount: { min: 50, max: 400, step: 10 },
    blur: { min: 0, max: 0.95, step: 0.05 },
};
