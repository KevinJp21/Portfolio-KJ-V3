"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { getSlugForLocale } from '@/app/config/slugMapping';
import { Icon } from "./Icon";
export default function LanguageSwitch() {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (newLocale: string) => {
    // Extraer las partes de la URL
    const pathParts = pathname.split('/').filter(Boolean);
    
    // Detectar si estamos en una página de blog con slug
    if (pathParts.length >= 3 && pathParts[1] === 'blog' && pathParts[2]) {
      const currentSlug = pathParts[2];
      // Obtener el slug correspondiente en el nuevo idioma
      const newSlug = getSlugForLocale(currentSlug, newLocale);
      // Construir la nueva URL para blog
      const newPath = `/${newLocale}/blog/${newSlug}`;
      router.push(newPath);
    } else {
      // Para cualquier otra página, solo cambiar el idioma
      const newPath = `/${newLocale}${pathname.substring(3)}`; // Remover el locale actual
      router.push(newPath);
    }
  };

  const optionsTheme = [
    { label: "Español", value: "es" },
    { label: "English", value: "en" },
  ];

  return (
    <div className="relative z-100">
      <button
        title={t("BtnTLanguage")}
        className="appearance-none text-[var(--Grey)] flex transition-all duration-300 cursor-pointer [&>svg]:max-w-6 [&>svg]:w-full [&>svg]:h-6 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:hover:[filter:drop-shadow(0_0_10px_var(--Blue))] [&>svg]:hover:scale-110"
        onClick={handleDropdownClick}
      >
        <Icon name="worlds" />
      </button>
      {dropdownOpen && (
        <ul className="absolute top-8 right-0 w-full p-2.5 min-w-[150px] bg-[var(--NavBar-bg)] shadow-[0_0.5em_1em_#0003] rounded-lg text-[#9fa5b5] backdrop-blur-[10px]">
          {optionsTheme.map((option) => (
            <li
              key={option.value}
              className="p-2.5 rounded-[10px] cursor-pointer hover:bg-[#0003]"
              onClick={() => handleLanguageChange(option.value)}
            >
              <span className="text-sm font-semibold text-[var(--Grey)]">
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
