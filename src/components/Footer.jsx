import { useI18n } from "@/context/i18n";

export default function Footer(){
  const { t } = useI18n();
  return (
    <footer className="max-w-lg m-auto">
      <a className="text-lg" href="https://xkcd.com" target="_blank" rel="noopener noreferrer">
        { t("CREDITS_XKCD") }
      </a>
    </footer>
  )
}
