import { useTranslations } from "next-intl";
import Markdown from "react-markdown";
import { Link } from "../../../../i18n/navigation";
export default function Hero() {
    const t = useTranslations();
    return(
        <section className="min-h-[37.5rem] flex items-center justify-center py-8 px-5 mx-auto max-w-[90rem] w-full">
            <div className="w-full h-full flex justify-center items-center lg:gap-10 flex-wrap p-5">
                <div className="relative flex justify-center items-center h-[25rem] w-[25rem] [background:var(--imgBG)] [clip-path:circle()]">
                  <img src="assets/Images/KevinJp.avif" alt="Kevin Jp" className="w-full h-full object-contain " />
                </div>
                <div className="max-w-[35rem] w-full">
                    <h2 className="text-4xl md:text-5xl  text-[var(--Grey-Dark)] text-center font-semibold p-1 leading-15 text-balance">
                        {t("Home.name")}
                    </h2>
                    <div className="text-[var(--Grey-Dark)] text-center p-1 font-normal text-[1.25rem] [&_strong]:text-[var(--Blue)] [&_p]:text-balance">
                    <Markdown>
                        {t("Home.content")}
                    </Markdown>
                    </div>
                    <div className="flex justify-center gap-2.5 mt-2.5">
                        <Link href="assets/Docs/KevinJpCV.pdf" className="flex justify-center items-center w-[8.875rem] h-10 rounded-4xl cursor-pointer bg-[var(--Blue)] text-[var(--White)] font-semibold text-center text-sm hover:bg-[var(--Blue-Hover)] transition-all duration-300">
                            {t("Home.btnCV")}
                        </Link>
                        <Link href="mailto:kevinjp21@gmail.com" className="flex justify-center items-center w-[8.875rem] h-10 rounded-4xl cursor-pointer bg-[var(--Blue)] text-[var(--White)] font-semibold text-center text-sm hover:bg-[var(--Blue-Hover)] transition-all duration-300">
                            {t("Home.btnContact")}
                        </Link>
                    </div>
                    <div className="mt-5 flex justify-center items-center gap-1 list-none [&>*]:p-1.5 [&>*_svg]:w-10 [&>*_svg]:h-10 [&>*_svg]:fill-[var(--Grey-Dark)] [&>*_svg]:transition-all [&>*_svg]:duration-300 [&>*_svg]:ease-out [&>*_svg]:hover:scale-125">
                        <Link href="https://www.linkedin.com/in/kevin-julio-667280240/" target="_blank">
                            <svg>
                                <use href="assets/Icons/Icons.svg#linkedin" />
                            </svg>
                        </Link>
                        <Link href="https://github.com/KevinJp21" target="_blank">
                            <svg>
                                <use href="assets/Icons/Icons.svg#github" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
