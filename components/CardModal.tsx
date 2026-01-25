"use client";

import { useRef, useEffect, useCallback } from "react";
import { WebsitePreview } from "./WebsitePreview";
import { CardConfig } from "@/lib/cards";

interface CardModalProps {
    open: boolean;
    onClose: () => void;
    card: CardConfig | null;
}

export function CardModal({ open, onClose, card }: CardModalProps) {
    // ESC Key handler
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [open, handleKeyDown]);

    if (!open || !card) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-5xl h-[85vh] sm:h-auto sm:max-h-[92vh] 
                   bg-[#0a0a0a] border border-white/10 rounded-2xl 
                   shadow-2xl overflow-hidden flex flex-col 
                   animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300"
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-white/10 shrink-0 bg-[#0a0a0a]">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{card.title}</h2>
                        <p className="text-gray-400 text-sm mt-1">{card.description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-black/50">

                    {/* Note if present */}
                    {card.note && (
                        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-xs text-blue-200 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            <span>{card.note}</span>
                        </div>
                    )}

                    {/* Preview Component */}
                    {card.preview ? (
                        <WebsitePreview
                            url={card.preview.url}
                            fallbackImage={card.preview.fallbackImage}
                            title={card.title}
                        />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center bg-white/5 rounded-lg border border-dashed border-white/10">
                            <span className="text-gray-500 text-sm">No preview available</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 shrink-0 flex justify-end gap-3 bg-[#0a0a0a]">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        Close
                    </button>
                    <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                        {card.ctaLabel || "Open Link"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
