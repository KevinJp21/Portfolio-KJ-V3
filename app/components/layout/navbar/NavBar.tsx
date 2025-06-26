"use client";
import { useEffect, useState } from "react";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitch from "@/app/components/LanguageSwitch";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useNavbarNavigation } from "@/app/hooks/useNavbarNavigation";
import { useLocale } from "next-intl";

export default function NavBar() {
  const [scroll, setScroll] = useState(false);
  const t = useTranslations("Header");
  const activeSection = useActiveSection();
  const locale = useLocale();
  const { navigateToSection } = useNavbarNavigation();

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === `/${locale}` && activeSection === "home") return true;
    if (href === "#about-me" && activeSection === "about-me") return true;
    if (href === "#projects" && activeSection === "projects") return true;
    if (href === "#skills" && activeSection === "skills") return true;
    return false;
  };

  const handleSectionClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    navigateToSection(section, locale);
  };

  return (
    <header className={`h-[3.75rem] top-0 transition-[top] duration-300 ease-out ${scroll ? "max-w-[1440px] w-[80vw] min-[72.5rem]:w-[50vw] fixed top-5 left-[50%] translate-x-[-50%] right-0 z-100 rounded-full bg-[var(--NavBar-bg)] shadow-[var(--NavBar-Shadow)_5px_0_40px_1px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[var(--NavBar-bg)] before:backdrop-blur-sm before:-z-10 before:rounded-full" : ""}`}>
      <nav className="h-full w-full flex items-center justify-center py-[0.938rem]">
        <div className="h-full w-[90%] flex items-center justify-around px-3">
          <span className={`text-base text-[var(--Grey-Dark)] font-bold ${scroll ? "hidden" : ""}`}>Kevin Julio Pineda</span>
          <div>
            <ul className="m-0 p-0 list-none flex items-center [&>*]:px-2.5 [&>*_a]:text-[var(--Grey)] [&>*_a]:transition-normal [&>*_a]:duration-300 [&>*_a]:ease-out [&>*_a]:text-sm [&>*_a]:font-bold [&>*_a]:hover:text-[var(--Blue-Hover)]">
              <li>
                <Link 
                  href={`/${locale}`} 
                  className={isLinkActive(`/${locale}`) ? "text-[var(--Blue)]!" : ""}
                >
                  {t("start")}
                </Link>
              </li>
              <li>
                <a 
                  href="#about-me"
                  onClick={(e) => handleSectionClick(e, "about-me")}
                  className={isLinkActive("#about-me") ? "text-[var(--Blue)]!" : ""}
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  onClick={(e) => handleSectionClick(e, "projects")}
                  className={isLinkActive("#projects") ? "text-[var(--Blue)]!" : ""}
                >
                  {t("projects")}
                </a>
              </li>
              <li>
                <a 
                  href="#skills"
                  onClick={(e) => handleSectionClick(e, "skills")}
                  className={isLinkActive("#skills") ? "text-[var(--Blue)]!" : ""}
                >
                  {t("skills")}
                </a>
              </li>
              <li>
                <Link href={`/${locale}/blog`}>{t("blog")}</Link>
              </li>
              <li>
                <ThemeSwitch />
              </li>
              <li>
                <LanguageSwitch />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
