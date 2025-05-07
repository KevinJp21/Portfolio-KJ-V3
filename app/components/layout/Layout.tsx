"use client";
import { useEffect, useState } from "react";
import Footer from "./footer/Footer";
import NavBar from "./navbar/NavBar";
import FloatNavBar from "./navbar/FloatNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);

        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        }
        mediaQuery.addEventListener("change", handleMediaChange);
        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange);
        }
    }, []);

    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <main>
                {isMobile ? <FloatNavBar /> : <NavBar />}
                {children}
                <Footer />
            </main>
        </>
    );
}
