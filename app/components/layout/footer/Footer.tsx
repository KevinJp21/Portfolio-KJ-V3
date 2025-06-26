import Link from "next/link";
import { Icon } from "../../Icon";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Home");
    return (
        <footer className="h-16 flex items-end justify-center">
            <div className="relative w-[80%] py-4 flex justify-around gap-5 items-center before:content-[''] before:absolute before:top-0 before:h-px before:w-full before:bg-[var(--Grey-Dark)]">
                <span className="text-[clamp(0.813rem,3vw,0.875rem)] font-bold text-[var(--Grey-Dark)]">
                    Developed by KevinJp
                </span>
                <ul className="flex justify-center items-center gap-1.5 list-none [&>*]:p-1.5 [&>*_svg]:w-6 [&>*_svg]:h-6 [&>*_svg]:fill-[var(--Grey-Dark)] [&>*_svg]:transition-all [&>*_svg]:duration-300 [&>*_svg]:ease-out [&>*_svg]:hover:scale-125">
                    <li>
                        <Link href="https://github.com/KevinJp21" target="_blank" title="GitHub">
                            <Icon name="github" />
                        </Link>
                    </li>
                    <li>
                    <Link href="https://www.linkedin.com/in/kevin-julio-667280240/" target="_blank" title="LinkedIn">
                            <Icon name="linkedin" />
                        </Link>
                    </li>
                    <li>
                    <Link href="mailto: kevinjp821@gmail.com" target="_blank" title={t("btnContact")}>
                            <Icon name="contact" />
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
