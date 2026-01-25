import Image from "next/image";

export function HeroIdentity() {
    return (
        <div className="z-10 flex flex-col items-center justify-center text-center p-4 animate-in fade-in duration-1000">

            {/* Avatar Wrapper with Interactions */}
            <div className="group relative w-32 h-32 mb-8 transition-transform duration-300 ease-out hover:scale-105 active:scale-95">

                {/* Outer Glow Ring (animated) */}
                <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Outer Border Ring */}
                <div className="absolute -inset-1 rounded-full border border-blue-400/30 group-hover:border-blue-400/60 transition-colors duration-300" />

                {/* Main Avatar Container */}
                <div className="relative w-full h-full rounded-full border-2 border-blue-500/10 overflow-hidden shadow-2xl backdrop-blur-sm">
                    <Image
                        src="/avatar.png"
                        alt="Erick Domínguez"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Status Dot (Online/Active) */}
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[var(--bg-canvas)] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--fg-primary)] mb-3 drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-b from-[var(--fg-primary)] to-[var(--fg-secondary)]">
                Erick Domínguez
            </h1>

            {/* Subtitles */}
            <div className="space-y-2">
                <p className="text-xl md:text-2xl font-light text-[var(--fg-secondary)] tracking-wide uppercase">
                    Contador Público
                </p>
                <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-8 bg-blue-500/50" />
                    <p className="text-sm md:text-base font-medium text-[var(--accent-primary)] tracking-[0.2em] uppercase glow-text">
                        Constructor de Sistemas
                    </p>
                    <span className="h-px w-8 bg-blue-500/50" />
                </div>
            </div>
        </div>
    );
}
