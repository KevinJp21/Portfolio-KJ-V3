export const slugMapping = {
    "chikos-gourmet": {
        en: "chikos-gourmet",
        es: "chikos-gourmet"
    },
    "verezza-e-commerce": {
        en: "verezza-e-commerce",
        es: "verezza-e-commerce"
    },
    "docme-assistant-chatbot": {
        en: "docme-assistant-chatbot",
        es: "asistente-docme-chatbot"
    },
    "ferreteria-rueda": {
        en: "ferreteria-rueda",
        es: "ferreteria-rueda"
    }
    // ... más mapeos
};

export function getSlugForLocale(slug: string, locale: string): string {
    // Buscar la clave que corresponde a este slug
    for (const [, mapping] of Object.entries(slugMapping)) {
        if (mapping.en === slug || mapping.es === slug) {
            return mapping[locale as 'en' | 'es'] || slug;
        }
    }
    return slug;
} 