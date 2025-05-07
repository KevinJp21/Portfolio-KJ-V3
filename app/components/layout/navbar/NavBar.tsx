"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/ThemeSwitch";
export default function NavBar() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setScroll(window.screenY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <header className="h-14">
      <nav className="h-full w-full flex items-center justify-center py-4">
        <div className="h-full w-[90%] flex items-center justify-around px-3">
          <h1 className="text-[var(--color-Grey-Dark)]">Kevin Julio Pineda</h1>
          <div>
            <ul>
              <li>
                <ThemeSwitch />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
