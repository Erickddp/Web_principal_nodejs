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
                 bg-white/5 hover:bg-white/10 backdrop-blur-md 
                 border border-white/10 hover:border-white/20 
                 rounded-xl transition-all duration-200 
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 
                 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
            <div className="flex w-full justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">
                    {title}
                </h3>
                {badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30 rounded-full">
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wide">
                {subtitle}
            </p>

            {/* Decorative gradient line at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}
