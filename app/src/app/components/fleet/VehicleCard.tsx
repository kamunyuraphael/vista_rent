import { Settings2, Users, Zap, Package, Scale, Check } from "lucide-react";
import type { Vehicle } from "../../data/vehicles";
import { PrimaryBtn } from "../common/PrimaryBtn";
import { srcSetFor, DEFAULT_SIZES } from "../../utils/images";
import { detailPath } from "../../routes";
import { useComparison } from "../../context/comparison-context";
import { useLanguage } from "../../context/i18n";
import { Link } from "react-router";

type VehicleCardProps = {
  vehicle: Vehicle;
  /** External URL (e.g. the management system) to open when "Reserve" is clicked. */
  reserveHref: string;
};

export function VehicleCard({ vehicle, reserveHref }: VehicleCardProps) {
  const { isSelected, toggle, isFull } = useComparison();
  const { t } = useLanguage();
  const selected = isSelected(vehicle.id);

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200">
      <div className="relative h-48 bg-secondary overflow-hidden">
        <Link to={detailPath(vehicle.id)}>
          <img
            src={vehicle.image}
            srcSet={srcSetFor(vehicle.image)}
            sizes={DEFAULT_SIZES}
            loading="lazy"
            decoding="async"
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {vehicle.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {vehicle.badge}
          </div>
        )}
        <button
          onClick={() => toggle(vehicle.id)}
          disabled={!selected && isFull}
          title={selected ? "Remove from comparison" : "Add to comparison"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-background/80 text-muted-foreground hover:text-foreground backdrop-blur-sm"
          }`}
        >
          {selected ? <Check size={15} /> : <Scale size={14} />}
        </button>
      </div>
      <div className="p-5">
        <Link to={detailPath(vehicle.id)} className="block">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-foreground leading-tight hover:text-primary transition-colors">
              {vehicle.name}
            </h3>
            <div className="text-right shrink-0">
              <div className="text-primary font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                KES {vehicle.price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">/day</div>
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { icon: Settings2, label: vehicle.transmission },
            { icon: Users, label: `${vehicle.seats} Seats` },
            { icon: Zap, label: vehicle.engine },
            { icon: Package, label: vehicle.luggage },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon size={12} className="text-primary shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            to={detailPath(vehicle.id)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer"
          >
            {t("vehicle.details")}
          </Link>
          <div className="flex-1">
            <PrimaryBtn full href={reserveHref}>
              {t("vehicle.reserve")}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
