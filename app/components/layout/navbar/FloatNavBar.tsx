import ThemeSwitch from "@/app/components/ThemeSwitch";
import LanguageSwitch from "@/app/components/LanguageSwitch";
import Link from "next/link";
import { Icon } from "@/app/components/Icon";

export default function FloatNavBar() {
  return (
    <header className="fixed w-[90vw] sm:w-[70vw] h-[3.75rem] bg-[var(--NavBar-bg)] top-5 left-1/2 -translate-x-1/2 rounded-full shadow-[var(--NavBar-Shadow)_0_0.625em_2.5rem_0.063rem] z-10 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:backdrop-blur-sm before:-z-10 before:rounded-full before:bg-[var(--NavBar-bg)] ">
      <nav className="h-full flex items-center justify-center py-3.5">
        <div className="h-full w-[90%] flex items-center justify-center px-3">
          <div className="w-full h-full">
            <ul className="h-full list-none flex items-center justify-around [&>*]:h-full [&>*]:px-2.5 [&>*]:flex [&>*]:items-center [&>*_a]:h-full [&>*_a]:text-[var(--Grey)] [&>*_a]:transition-normal [&>*_a]:duration-300 [&>*_a]:ease-out [&>*_svg]:h-full [&>*_svg]:fill-[var(--Grey)] [&>*_svg]:transition-all [&>*_svg]:max-w-5 [&>*_svg]:w-full [&>*_svg]:hover:fill-[var(--Blue)] [&>*_svg]:hover:scale-150">
              <li>
                <Link href="/#Start">
                  <Icon name="home" />
                </Link>
              </li>
              <li>
                <Link href="/#Projects">
                  <Icon name="project" />
                </Link>
              </li>
              <li>
                <Link href="/#About">
                  <Icon name="about" />
                </Link>
              </li>
              <li>
                <Link href="/#Skills">
                  <Icon name="skills" />
                </Link>
              </li>
              <li>
                <Link href="/#Contact">
                  <Icon name="contact" />
                </Link>
              </li>
              <li className="[&>*_svg]:max-w-6">
                <ThemeSwitch />
              </li>
              <li className="[&>*_svg]:max-w-6">
                <LanguageSwitch />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
