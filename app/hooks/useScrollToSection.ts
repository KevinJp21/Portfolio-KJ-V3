"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    // Verificar si hay un hash en la URL
    const hash = window.location.hash;
    
    if (hash) {
      // Esperar a que el DOM esté listo
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          // Scroll suave a la sección
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [pathname]);

  // Función para hacer scroll suave a una sección
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return { scrollToSection };
} 