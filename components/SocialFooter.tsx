import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function SocialFooter() {
    return (
        <footer className="w-full flex flex-col items-center py-6 mt-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">

            {/* Subtle Label */}
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--label-fg)] mb-5">
                Contacto directo
            </span>

            <div className="flex gap-8">

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/525534806184?text=Hola%20Erick%2C%20vengo%20desde%20tu%20landing%20page%20y%20quiero%20informaci%C3%B3n." // Placeholder
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3"
                    aria-label="Contact via WhatsApp"
                >
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/50 shadow-lg group-hover:shadow-[#25D366]/30">
                        <WhatsAppIcon className="w-7 h-7 text-[var(--fg-secondary)] group-hover:text-[#25D366] transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] text-[var(--label-fg)] tracking-wider font-medium group-hover:text-[#25D366] transition-colors duration-300">
                        WhatsApp
                    </span>
                </a>

                {/* Facebook Button */}
                <a
                    href="https://www.facebook.com/profile.php?id=61584844233250" // Placeholder
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3"
                    aria-label="Visit Facebook Profile"
                >
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-[#1877F2]/20 group-hover:border-[#1877F2]/50 shadow-lg group-hover:shadow-[#1877F2]/30">
                        <FacebookIcon className="w-7 h-7 text-[var(--fg-secondary)] group-hover:text-[#1877F2] transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] text-[var(--label-fg)] tracking-wider font-medium group-hover:text-[#1877F2] transition-colors duration-300">
                        Facebook
                    </span>
                </a>

            </div>
        </footer>
    );
}
