"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Icon } from "./Icon";

export default function ThemeSwitch() {
  const t = useTranslations("Header");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    setTheme(option);
    setDropdownOpen(false);
  };

  const optionsTheme = [
    { label: t("BtnThemModeLight"), value: "light" },
    { label: t("BtnThemModeDark"), value: "dark" },
    { label: t("BtnThemModeSystem"), value: "system" },
  ];

  const renderIcon = () => {
    if (!mounted)
      return (
        <Icon name="monitor" />
      );
    switch (theme) {
      case "light":
        return (
          <Icon name="sun" />
        );
      case "dark":
        return (
          <Icon name="moon" />
        );
      case "system":
      default:
        return (
          <Icon name="monitor" />
        );
    }
  };

  return (
    <div className="relative z-100">
      <button
        title={t("BtnThemMode")}
        className="appearance-none text-[var(--Grey)] flex transition-all duration-300 cursor-pointer [&>svg]:max-w-6 [&>svg]:w-full [&>svg]:h-6 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:hover:[filter:drop-shadow(0_0_10px_var(--Blue))] [&>svg]:hover:scale-110"
        onClick={handleDropdownClick}
      >
        {renderIcon()}
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
