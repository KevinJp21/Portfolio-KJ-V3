"use client";
import { useState, useLayoutEffect } from "react";
import Footer from "./footer/Footer";
import NavBar from "./navbar/NavBar";
import FloatNavBar from "./navbar/FloatNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true); // se ejecuta antes del paint
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);
  
  if (!isClient) return null;
  return (
    <div className="min-h-screen relative">
      <div className={`fixed top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]`}></div>
      {isMobile ? <FloatNavBar /> : <NavBar />}
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
