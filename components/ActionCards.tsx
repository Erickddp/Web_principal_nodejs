"use client";

import { CARDS, CardConfig } from "@/lib/cards";
import { ActionCard } from "./ActionCard";

interface ActionCardsProps {
    onCardSelect: (card: CardConfig) => void;
}

export function ActionCards({ onCardSelect }: ActionCardsProps) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
            {CARDS.map((card) => (
                <ActionCard
                    key={card.id}
                    title={card.title}
                    subtitle={card.subtitle}
                    description={card.description}
                    badge={card.badge}
                    onClick={() => onCardSelect(card)}
                />
            ))}
        </div>
    );
}
