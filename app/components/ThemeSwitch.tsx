"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  let CurrentTheme = resolvedTheme;
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
    { label: "Claro", value: "light" },
    { label: "Oscuro", value: "dark" },
    { label: "Auto", value: "system" },
  ];

  const renderIcon = () => {
    if (!mounted)
      return (
        <svg>
          <use href="/assets/Icons/Icons.svg#monitor" />
        </svg>
      );
    switch (theme) {
      case "light":
        return (
          <svg>
            <use href="/assets/Icons/Icons.svg#sun" />
          </svg>
        );
      case "dark":
        return (
          <svg>
            <use href="/assets/Icons/Icons.svg#moon" />
          </svg>
        );
      case "system":
      default:
        return (
          <svg>
            <use href="/assets/Icons/Icons.svg#monitor" />
          </svg>
        );
    }
  };

  return (
    <div className="relative">
      <button
        title="Theme Switch"
        className="appearance-none text-[var(--Grey)] flex transition-all duration-300 cursor-pointer [&>svg]:w-6 [&>svg]:h-6 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:hover:[filter:drop-shadow(0_0_10px_var(--Blue))] [&>svg]:hover:scale-110"
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
