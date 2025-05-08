"use client";
import { useEffect, useState } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import Link from "next/link";
export default function NavBar() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  return (
    <header className={`h-[3.75rem] top-0 transition-[top] duration-300 ease-out ${scroll ? "w-[60vw] fixed top-5 left-[50%] translate-x-[-50%] right-0 z-100 rounded-full bg-[var(--NavBar-bg)] shadow-[var(--NavBar-Shadow)_5px_0_40px_1px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[var(--NavBar-bg)] before:backdrop-blur-sm before:-z-10 before:rounded-full" : ""}`}>
      <nav className="h-full w-full flex items-center justify-center py-[0.938rem]">
        <div className="h-full w-[90%] flex items-center justify-around px-3">
          <h1 className={`text-base text-[var(--Grey-Dark)] font-bold ${scroll ? "hidden" : ""}`}>Kevin Julio Pineda</h1>
          <div>
            <ul className="m-0 p-0 list-none flex items-center [&>*]:px-2.5 [&>*_a]:text-[var(--Grey)] [&>*_a]:transition-normal [&>*_a]:duration-300 [&>*_a]:ease-out [&>*_a]:text-sm [&>*_a]:font-bold [&>*_a]:hover:text-[var(--Blue-Hover)]">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Project</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/skills">Skills</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
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
