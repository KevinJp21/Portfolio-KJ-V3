import Link from "next/link";

export default function Footer() {
    return (
        <footer className="h-16 flex items-end justify-center">
            <div className="relative w-[80%] py-4 flex justify-around gap-5 items-center before:content-[''] before:absolute before:top-0 before:h-px before:w-full before:bg-[var(--Grey-Dark)]">
                <span className="text-[clamp(0.813rem,3vw,0.875rem)] font-bold text-[var(--Grey-Dark)]">
                    Developed by KevinJp
                </span>
                <ul className="flex justify-center items-center gap-1.5 list-none [&>*]:p-1.5 [&>*_svg]:w-6 [&>*_svg]:h-6 [&>*_svg]:fill-[var(--Grey-Dark)] [&>*_svg]:transition-all [&>*_svg]:duration-300 [&>*_svg]:ease-out [&>*_svg]:hover:scale-125">
                    <li>
                        <Link href="https://github.com/KevinJp21" target="_blank">
                            <svg>
                                <use href="/assets/Icons/Icons.svg#github"></use>
                            </svg>
                        </Link>
                    </li>
                    <li>
                    <Link href="https://www.linkedin.com/in/kevin-julio-667280240/" target="_blank">
                            <svg>
                                <use href="/assets/Icons/Icons.svg#linkedin"></use>
                            </svg>
                        </Link>
                    </li>
                    <li>
                    <Link href="mailto: kevinjp821@gmail.com" target="_blank">
                            <svg>
                                <use href="/assets/Icons/Icons.svg#contact"></use>
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
