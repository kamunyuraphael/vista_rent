import { useSearchParams } from "react-router";
import { Shield, Headphones, Zap } from "lucide-react";
import type { FleetCategory } from "../types";
import type { Vehicle } from "../data/vehicles";
import { managementBookingUrl } from "../api/management";
import { SectionLabel } from "../components/common/SectionLabel";
import { VehicleCard } from "../components/fleet/VehicleCard";
import { useLanguage } from "../context/i18n";

const fleetTabs: { label: string; value: FleetCategory }[] = [
  { label: "All Vehicles", value: "all" },
  { label: "Luxury", value: "luxury" },
  { label: "Saloon", value: "saloon" },
  { label: "SUV / Off-Road", value: "suv" },
  { label: "Vans & MPVs", value: "vans" },
];

const isFleetCategory = (v: string | null): v is FleetCategory =>
  !!v && fleetTabs.some((t) => t.value === v);

export function FleetPage({ vehicles }: { vehicles: Vehicle[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const rawFilter = searchParams.get("category");
  const filter: FleetCategory = isFleetCategory(rawFilter) ? rawFilter : "all";

  const setFilter = (value: FleetCategory) => {
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const list = filter === "all" ? vehicles : vehicles.filter((v) => v.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-28">
      <div className="mb-10">
        <SectionLabel>{t("fleet.label")}</SectionLabel>
        <h1
          className="text-6xl font-black uppercase leading-none mb-3"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {t("fleet.title")}
        </h1>
        <p className="text-muted-foreground max-w-xl">
          {t("fleet.subtitle")}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-border">
        {fleetTabs.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              filter === value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground self-center">
          {list.length} vehicle{list.length !== 1 ? "s" : ""} available
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((v) => (
          <VehicleCard key={v.id} vehicle={v} reserveHref={managementBookingUrl(v.id)} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No vehicles in this category right now. Please check back shortly.
        </div>
      )}

      {/* Info strip */}
      <div className="mt-14 bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield size={18} className="text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm">Comprehensive Insurance Included</div>
            <div className="text-xs text-muted-foreground">All vehicles. All rentals. No exceptions.</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Headphones size={18} className="text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm">24 / 7 Roadside Support</div>
            <div className="text-xs text-muted-foreground">Call +254 700 123 456 any time.</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap size={18} className="text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm">Instant Booking Confirmation</div>
            <div className="text-xs text-muted-foreground">Receive your booking voucher in seconds.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
