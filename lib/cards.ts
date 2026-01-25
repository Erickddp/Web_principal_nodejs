export interface CardConfig {
    id: "website" | "projects" | "recognitions";
    title: string;
    subtitle: string;
    description: string;
    href: string; // The cta link (external)
    badge?: string;
    ctaLabel?: string;
    note?: string;
    // Preview configuration
    preview: {
        type: "iframe";
        url: string; // URL to load in iframe (can be same as href)
        fallbackImage: string; // path starting with /
        preferredWidth?: number;
        preferredHeight?: number;
    };
}















export const CARDS: CardConfig[] = [
    {
        id: "website",
        title: "Sitio Profesional",
        subtitle: "Servicios y herramientas", // Updated
        description: "Mi espacio profesional donde ofrezco servicios contables, asesoría estratégica y herramientas diseñadas para simplificar la operación y el cumplimiento fiscal.",
        href: "https://web.erickddp.com",
        badge: "Main",
        ctaLabel: "Visitar Sitio",
        preview: {
            type: "iframe",
            url: "https://web.erickddp.com",
            fallbackImage: "/previews/website.svg",
        },
    },
    {
        id: "projects",
        title: "Proyectos Activos",
        subtitle: "Automatizacion contable", // Updated
        description: "Sistemas y proyectos en desarrollo enfocados en automatizar procesos, reducir errores y facilitar la contabilidad mediante tecnología y diseño inteligente.",
        href: "https://proyectos.erickddp.com/",
        badge: "Code",
        ctaLabel: "View Proyectos",
        note: "",
        preview: {
            type: "iframe",
            url: "https://app.evorix.com.mx",
            fallbackImage: "/previews/projects.svg",
        },
    },
    {
        id: "recognitions",
        title: "Certificaciones",
        subtitle: "Formación y reconocimientos", // Updated
        description: "Cursos, certificaciones, proyectos y conocimientos adquiridos a lo largo de mi formación en contabilidad, tecnología y sistemas.",
        href: "https://nsl-reconocimientos.blogspot.com/",
        badge: "Learn",
        ctaLabel: "Ver Certificados",
        note: "",
        preview: {
            type: "iframe",
            url: "https://nsl-reconocimientos.blogspot.com/",
            fallbackImage: "/previews/recognitions.svg",
        },
    },
];
