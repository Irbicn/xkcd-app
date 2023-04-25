import { NextUIProvider } from "@nextui-org/react";
import '@/styles/globals.css';
import Head from "next/head";
import { I18nProvider, useI18n } from "@/context/i18n";

const DefaultHead = ()=>{
  const { t } = useI18n();
  return (
    <Head>
        <title>{t("SEO_DEFAULT_TITLE")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta charset="utf-8"/>
    </Head>
  )
}

export default function App({ Component, pageProps }) {
  return(
    <>
            <I18nProvider>
              <DefaultHead />
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </I18nProvider>
    </>
  )
}
