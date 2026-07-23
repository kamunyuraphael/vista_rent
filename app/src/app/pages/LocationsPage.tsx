import { Link } from "react-router";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { locations } from "../data/locations";
import { locationPath } from "../routes";
import { SectionLabel } from "../components/common/SectionLabel";
import { useLanguage } from "../lib/i18n";

export function LocationsPage() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="bg-card border-b border-border py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel>{t("locations.label")}</SectionLabel>
          <h1
            className="text-6xl md:text-7xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("locations.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("locations.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              to={locationPath(loc.slug)}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="font-semibold text-lg">{loc.name}</h2>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                  {loc.address}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary shrink-0" />
                  {loc.hours}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary shrink-0" />
                  {loc.phone}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
