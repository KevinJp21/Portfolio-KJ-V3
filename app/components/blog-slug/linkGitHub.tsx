import Link from "next/link";
import { Icon } from "../Icon";
export default function LinkGitHub({ link }: { link: string }) {
    return (
        <Link
            href={link}
            target="_blank"
            className="flex items-center gap-2 group"
        >
            <span className="text-[var(--Grey-Dark)] text-sm underline underline-offset-2 font-semibold group-hover:text-[var(--Blue-Hover)]">
                GitHub
            </span>
            <Icon name="github" className="w-[30px] h-[30px] fill-[var(--Grey-Dark)] transition-all duration-300 ease-out group-hover:scale-125" />
        </Link>
    )
}