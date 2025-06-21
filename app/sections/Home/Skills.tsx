import Tools from "@/app/components/Tools";
import { useTranslations } from "next-intl";

export default function Skills() {
  const t = useTranslations('Skills');

  const Tool = [
    { name: 'TypeScript' },
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Remix' },
    { name: 'NextJS' },
    { name: 'TailwindCSS' },
    { name: 'Angular' },
    { name: 'GraphQL' },
    { name: 'Shopify' },
    { name: 'MySQL' },
    { name: 'Java' },
    { name: 'Python' },
    { name: 'PHP' },
    { name: 'ExpressJS' },
    { name: 'Flask' },
    { name: 'SQLAlchemy' },
  ];

  const ToolIA = [
    { name: 'TensorFlow' },
    { name: 'Keras' },
    { name: 'NLTK' },
    { name: 'SciKitLearn' },
    { name: 'Matplotlib' },
    { name: 'Seaborn' },
    { name: 'Pandas' },
    { name: 'NumPy' },
  ];

  const OthersTools = [{ name: 'npm' },
    { name: 'pnpm' },
    { name: 'Git' },
  ]

  return (
    <section className="lazy-section container-section [&>_h3]:relative [&>_h3]:w-full [&>_h3]:h-[2.313rem] [&>_h3]:text-left [&>_h3]:text-[var(--Blue)] [&>_h3]:text-2xl [&>_h3]:ps-3.5 [&>_h3]:mt-5 [&>_h3]:before:absolute [&>_h3]:before:top-0 [&>_h3]:before:left-0 [&>_h3]:before:content-[''] [&>_h3]:before:w-1.5 [&>_h3]:before:h-full [&>_h3]:before:bg-[var(--Blue)] [&>_h3]:before:mr-5">
      <h2 className="home-title">{t('title')}</h2>
      <h3>{t('SubTitle1')}</h3>
      <div className="ContentSkills">
        {Tool.map((Tool, index) => (
          <Tools key={index} name={Tool.name} />
        ))}
      </div>

      <h3>{t('SubTitle2')}</h3>
      <div className="ContentSkills">
        {ToolIA.map((Tool, index) => (
          <Tools key={index} name={Tool.name} />
        ))}
      </div>

      <h3>{t('SubTitle3')}</h3>
      <div className="ContentSkills">
        {OthersTools.map((Tool, index) => (
          <Tools key={index} name={Tool.name} />
        ))}
      </div>
    </section>
  );
}