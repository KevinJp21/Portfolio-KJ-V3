"use client";
import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Crear un mapa de secciones visibles con su porcentaje de visibilidad
        const visibleSections = new Map<string, number>();
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            
            // Calcular qué porcentaje de la sección está visible
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const sectionHeight = rect.height;
            const visibilityPercentage = Math.max(0, visibleHeight / sectionHeight);
            
            visibleSections.set(entry.target.id, visibilityPercentage);
          }
        });

        // Si hay secciones visibles, determinar cuál es la más prominente
        if (visibleSections.size > 0) {
          let bestSection = '';
          let bestScore = 0;

          visibleSections.forEach((visibility, sectionId) => {
            // Calcular un score basado en la visibilidad y la posición
            const section = document.getElementById(sectionId);
            if (section) {
              const rect = section.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              
              // Priorizar secciones que están en la parte superior del viewport
              const topPosition = rect.top;
              const isNearTop = topPosition >= 0 && topPosition < viewportHeight * 0.3;
              
              // Score más alto para secciones más visibles y más cerca del centro del viewport
              const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
              const baseScore = visibility * (1 - centerDistance / viewportHeight);
              
              // Bonus para secciones cerca del top (especialmente Hero)
              const topBonus = isNearTop ? 0.5 : 0;
              const heroBonus = sectionId === 'home' && isNearTop ? 0.3 : 0;
              
              const score = baseScore + topBonus + heroBonus;
              
              if (score > bestScore) {
                bestScore = score;
                bestSection = sectionId;
              }
            }
          });

          if (bestSection && bestSection !== activeSection) {
            setActiveSection(bestSection);
          }
        } else {
          // Si no hay secciones visibles, usar la sección más cercana al viewport
          const scrollY = window.scrollY;
          let closestSection = '';
          let closestDistance = Infinity;

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const distance = Math.abs(sectionTop - scrollY);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section.id;
            }
          });

          if (closestSection && closestSection !== activeSection) {
            setActiveSection(closestSection);
          }
        }
      },
      {
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [activeSection]);

  return activeSection;
} 