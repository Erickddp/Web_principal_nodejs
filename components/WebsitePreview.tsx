"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface WebsitePreviewProps {
    url: string;
    fallbackImage: string;
    title: string;
}

export function WebsitePreview({ url, fallbackImage, title }: WebsitePreviewProps) {
    const [showIframe, setShowIframe] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Timer to check if loading takes too long (suggesting blocked iframe or slow network)
    useEffect(() => {
        if (!showIframe) return;

        const timer = setTimeout(() => {
            if (isLoading) {
                setLoadError(true); // Trigger the "Having trouble?" UI, but don't force switch yet
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [showIframe, isLoading]);

    const handleIframeLoad = () => {
        setIsLoading(false);
        setLoadError(false);
    };

    const switchToImage = () => {
        setShowIframe(false);
        setIsLoading(false);
    };

    const switchToLive = () => {
        setShowIframe(true);
        setIsLoading(true);
        setLoadError(false);
    };

    return (
        <div className="flex flex-col w-full h-[50vh] sm:h-[60vh] bg-[var(--bg-canvas)] rounded-lg border border-[var(--card-border)] overflow-hidden shadow-inner">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--card-bg)] border-b border-[var(--card-border)] shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-xs text-[var(--fg-muted)] ml-2 font-mono truncated max-w-[150px]">
                        {url}
                    </span>
                </div>

                {/* Toggle Switch */}
                <div className="flex bg-[var(--card-border)] rounded-lg p-0.5 border border-[var(--card-border)]">
                    <button
                        onClick={switchToLive}
                        className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${showIframe ? "bg-[var(--accent-primary)] text-white shadow-sm" : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                            }`}
                    >
                        Live
                    </button>
                    <button
                        onClick={switchToImage}
                        className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${!showIframe ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Image
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 bg-white">
                {showIframe ? (
                    <>
                        {/* Loading / Error Overlay */}
                        {(isLoading || loadError) && (
                            <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${!isLoading && loadError ? 'bg-black/90' : 'bg-gray-100'}`}>
                                {isLoading && (
                                    <div className="text-center space-y-3">
                                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
                                        <p className="text-xs text-gray-500 font-medium">Connecting...</p>
                                    </div>
                                )}

                                {/* Optional 'Trouble loading' hint if it takes too long */}
                                {loadError && (
                                    <div className="mt-4 text-center animate-in fade-in slide-in-from-bottom-2">
                                        <p className="text-sm text-gray-600 mb-3">Taking a while...</p>
                                        <button
                                            onClick={switchToImage}
                                            className="px-4 py-2 bg-white border border-gray-300 shadow-sm rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                                        >
                                            Switch to Image Preview
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <iframe
                            ref={iframeRef}
                            src={url}
                            title={`Preview of ${title}`}
                            className="w-full h-full border-0"
                            onLoad={handleIframeLoad}
                            // Sandbox for safety, allow scripts/popups but restricted appropriately
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                    </>
                ) : (
                    <div className="relative w-full h-full bg-gray-900 group">
                        <Image
                            src={fallbackImage}
                            alt={`Preview of ${title}`}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        {/* Overlay hint */}
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                            <span className="text-xs text-gray-300">Static Preview</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
