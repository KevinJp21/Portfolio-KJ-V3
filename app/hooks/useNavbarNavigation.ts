"use client";
import { useRouter } from "next/navigation";
import { useCurrentPath } from "./useCurrentPath";

export function useNavbarNavigation() {
  const router = useRouter();
  const { isHomePage } = useCurrentPath();

  const navigateToSection = (section: string, locale: string) => {
    if (isHomePage(locale)) {
      // Si estamos en la página principal, hacer scroll suave
      const element = document.querySelector(`#${section}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Si estamos en otra página, navegar a la página principal con hash
      router.push(`/${locale}#${section}`);
    }
  };

  return { navigateToSection };
} 