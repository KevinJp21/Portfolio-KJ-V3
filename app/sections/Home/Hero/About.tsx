import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

const components: Components = {
  p: ({ children }) => (
    <p className="text-[var(--Grey-Dark)] text-xl font-light text-pretty mt-2.5 [&_strong]:text-[var(--Blue)] [&_strong]:font-bold">
      {children}
    </p>
  )
}

export default function About() {
  const t = useTranslations();
  return (
    <section className="container-home-section">
      <h2 className="text-[var(--Grey-Dark)] text-[2.5rem] font-bold p-5 text-center text-balance">
        {t("About.title")}
      </h2>
      <div className="max-w-[50rem] w-full">
        <ReactMarkdown components={components}>
          {t("About.content")}
        </ReactMarkdown>
      </div>
    </section>
  );
}