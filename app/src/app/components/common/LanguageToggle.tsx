import { useLanguage } from "../../context/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "sw" : "en")}
      aria-label="Switch language"
      className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-2 py-1.5 rounded hover:bg-secondary"
    >
      {language === "en" ? "EN" : "SW"}
    </button>
  );
}
