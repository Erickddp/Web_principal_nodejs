import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { GmailIcon } from "@/components/icons/GmailIcon";

const LINKEDIN_URL = "https://www.linkedin.com/in/REPLACE_ME";
const EMAIL_TO = "REPLACE_ME@example.com";

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

                {/* LinkedIn Button */}
                <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3"
                    aria-label="Visit LinkedIn Profile"
                >
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-[#0A66C2]/20 group-hover:border-[#0A66C2]/50 shadow-lg group-hover:shadow-[#0A66C2]/30">
                        <LinkedInIcon className="w-7 h-7 text-[var(--fg-secondary)] group-hover:text-[#0A66C2] transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] text-[var(--label-fg)] tracking-wider font-medium group-hover:text-[#0A66C2] transition-colors duration-300">
                        LinkedIn
                    </span>
                </a>

                {/* Gmail Button */}
                <a
                    href={`mailto:${EMAIL_TO}?subject=Contacto%20desde%20erickddp.com&body=Hola%20Erick,%20`}
                    className="group flex flex-col items-center gap-3"
                    aria-label="Send Email via Gmail"
                >
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:bg-[#EA4335]/20 group-hover:border-[#EA4335]/50 shadow-lg group-hover:shadow-[#EA4335]/30">
                        <GmailIcon className="w-7 h-7 text-[var(--fg-secondary)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] text-[var(--label-fg)] tracking-wider font-medium group-hover:text-[#EA4335] transition-colors duration-300">
                        Gmail
                    </span>
                </a>

            </div>
        </footer>
    );
}
