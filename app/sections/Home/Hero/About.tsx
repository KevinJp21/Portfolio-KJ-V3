import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

const components: Components = {
  p: ({ children }) => (
    <p className="text-[var(--Grey-Dark)] text-xl text-pretty mt-2.5 [&_strong]:text-[var(--Blue)] [&_strong]:font-bold">
      {children}
    </p>
  )
}

export default function About() {
  const t = useTranslations('About');
  return (
    <section className="container-home-section">
      <h2 className="home-title">
        {t("title")}
      </h2>
      <div className="max-w-[50rem] w-full">
        <ReactMarkdown components={components}>
          {t("content")}
        </ReactMarkdown>
      </div>
    </section>
  );
}