import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import "../globals.css";

export default async function LocaleLayout({ children, params, }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body suppressHydrationWarning={true}>
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
