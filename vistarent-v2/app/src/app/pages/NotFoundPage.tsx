import { Link } from "react-router";
import { Compass } from "lucide-react";
import { ROUTES } from "../routes";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { useLanguage } from "../lib/i18n";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Compass className="text-primary" size={26} />
      </div>
      <h1 className="text-6xl font-black uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {t("notFound.title")}
      </h1>
      <p className="text-muted-foreground mb-8">
        {t("notFound.subtitle")}
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link to={ROUTES.home} className="text-sm text-muted-foreground hover:text-foreground">
          {t("notFound.backHome")}
        </Link>
        <PrimaryBtn to={ROUTES.fleet}>{t("notFound.browseFleet")}</PrimaryBtn>
      </div>
    </div>
  );
}
