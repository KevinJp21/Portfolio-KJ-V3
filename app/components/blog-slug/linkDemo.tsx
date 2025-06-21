import Link from "next/link";
import { Icon } from "../Icon";

export default function LinkDemo({ link }: { link: string }) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-2 group"
    >
      <span className="text-sm underline underline-offset-2 font-semibold group-hover:text-[var(--Blue-Hover)]">
        Demo
      </span>
      <Icon name='link' className="[var(--Grey-Dark)] w-[25px] h-[25px] fill-[var(--Grey-Dark)] transition-all duration-300 ease-out group-hover:scale-125" />
    </Link>
  );
}