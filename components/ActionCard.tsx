"use client";

interface ActionCardProps {
    title: string;
    subtitle: string;
    description: string; // Added description to props to show it on the card if desired, or just pass it through
    badge?: string;
    onClick: () => void;
}

export function ActionCard({ title, subtitle, badge, onClick }: ActionCardProps) {
    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-start w-full p-6 text-left 
                 bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] backdrop-blur-md 
                 border border-[var(--card-border)] hover:border-[var(--card-hover-border)] 
                 rounded-xl transition-all duration-200 
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 
                 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
            <div className="flex w-full justify-between items-start mb-2">
                <h3 className="text-xl font-bold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {title}
                </h3>
                {badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-[var(--pill-bg)] text-[var(--pill-fg)] border border-[var(--pill-border)] rounded-full">
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-sm font-medium text-[var(--fg-secondary)] group-hover:text-[var(--fg-primary)] transition-colors uppercase tracking-wide">
                {subtitle}
            </p>

            {/* Decorative gradient line at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}
