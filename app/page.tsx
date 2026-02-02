"use client";

import { useState, useEffect } from "react";
import { HeroIdentity } from "@/components/HeroIdentity";
import { AnimatedBackgroundCanvas, AnimatedBackgroundProps } from "@/components/AnimatedBackgroundCanvas";
import { BackgroundControls } from "@/components/BackgroundControls";
import { ActionCards } from "@/components/ActionCards";
import { CardModal } from "@/components/CardModal";
import { SocialFooter } from "@/components/SocialFooter";
import { CvCtaBand } from "@/components/CvCtaBand";
import { DEFAULT_BACKGROUND_PARAMS } from "@/lib/backgroundDefaults";
import { CardConfig } from "@/lib/cards";

export default function Home() {
  const [params, setParams] = useState<Required<AnimatedBackgroundProps>>(DEFAULT_BACKGROUND_PARAMS);

  // Check for reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setParams((prev) => ({ ...prev, intensity: 0.1 }));
    }
  }, []);

  const [selectedCard, setSelectedCard] = useState<CardConfig | null>(null);

  const handleCardSelect = (card: CardConfig) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleReset = () => {
    setParams(DEFAULT_BACKGROUND_PARAMS);
  };

  return (
    <>
      <AnimatedBackgroundCanvas
        intensity={params.intensity}
        particleCount={params.particleCount}
        blur={params.blur}
        colorMode={params.colorMode}
      />

      {/* Dark Overlay for Legibility */}
      <div className="fixed inset-0 z-[5] bg-black/40 pointer-events-none" />

      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-auto py-20 px-4 selection:bg-blue-500/30">
        <div className="w-full max-w-5xl flex flex-col items-center gap-12 sm:gap-16">
          <HeroIdentity />
          <ActionCards onCardSelect={handleCardSelect} />

          <div className="w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-backwards">
            <CvCtaBand />
          </div>

          <SocialFooter />
        </div>
      </main>

      <BackgroundControls
        params={params}
        onChange={setParams}
        onReset={handleReset}
      />

      <CardModal
        open={!!selectedCard}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </>
  );
}
