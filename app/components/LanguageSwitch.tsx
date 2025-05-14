"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitch() {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    setDropdownOpen(false);
    const segments = pathname.split("/");
    segments[1] = option; 
    router.push(segments.join("/") || "/");
  };

  const optionsTheme = [
    { label: "Español", value: "es" },
    { label: "English", value: "en" },
  ];

  return (
    <div className="relative">
      <button
        title={t("BtnTLanguage")}
        className="appearance-none text-[var(--Grey)] flex transition-all duration-300 cursor-pointer [&>svg]:w-6 [&>svg]:h-6 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:hover:[filter:drop-shadow(0_0_10px_var(--Blue))] [&>svg]:hover:scale-110"
        onClick={handleDropdownClick}
      >
        <svg>
          <use href="/assets/Icons/Icons.svg#worlds" />
        </svg>
      </button>
      {dropdownOpen && (
        <ul className="absolute top-8 right-0 w-full p-2.5 min-w-[150px] bg-[var(--NavBar-bg)] shadow-[0_0.5em_1em_#0003] rounded-lg text-[#9fa5b5] backdrop-blur-[10px]">
          {optionsTheme.map((option) => (
            <li
              key={option.value}
              className="p-2.5 rounded-[10px] cursor-pointer hover:bg-[#0003]"
              onClick={() => handleOptionClick(option.value)}
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
