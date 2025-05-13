import { useTranslations } from "next-intl";
import Markdown from "react-markdown";
export default function Hero() {
    const t = useTranslations();
    return(
        <div>
            <Markdown>{t("Home.name")}</Markdown>
            <Markdown>{t("Home.content")}</Markdown>
            
        </div>
    )
}
