import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";
import path from "path";
import fs from "fs";

export default async function LocaleLayout({ children, params, }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  const spritePath = path.join(process.cwd(), 'public', 'assets', 'Icons', 'Icons.svg');
  const sprite = fs.readFileSync(spritePath, 'utf8');

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body suppressHydrationWarning={true}>
          <div dangerouslySetInnerHTML={{ __html: sprite }} style={{ display: 'none' }} />
          <ThemeProvider>
            <NextIntlClientProvider locale={locale}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
