import { Link } from "react-router";
import { X } from "lucide-react";
import type { Vehicle } from "../data/vehicles";
import { useComparison } from "../lib/comparison-context";
import { managementBookingUrl } from "../lib/management";
import { ROUTES } from "../routes";
import { SectionLabel } from "../components/common/SectionLabel";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { useLanguage } from "../lib/i18n";

const specRows: { label: string; get: (v: Vehicle) => string }[] = [
  { label: "Category", get: (v) => v.category.toUpperCase() },
  { label: "Price / day", get: (v) => `KES ${v.price.toLocaleString()}` },
  { label: "Seats", get: (v) => `${v.seats}` },
  { label: "Transmission", get: (v) => v.transmission },
  { label: "Engine", get: (v) => v.engine },
  { label: "Luggage", get: (v) => v.luggage },
];

export function ComparePage({ vehicles }: { vehicles: Vehicle[] }) {
  const { selectedIds, toggle } = useComparison();
  const { t } = useLanguage();
  const selected = selectedIds.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => !!v);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-28">
      <SectionLabel>{t("compare.label")}</SectionLabel>
      <h1 className="text-5xl font-black uppercase leading-none mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {t("compare.title")}
      </h1>

      {selected.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground mb-6">
            You haven't added any vehicles to compare yet. Tap the scale icon on a vehicle card to add it here.
          </p>
          <Link to={ROUTES.fleet}>
            <PrimaryBtn>Browse the Fleet</PrimaryBtn>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="text-left text-xs uppercase tracking-widest text-muted-foreground font-medium pb-4 pr-4 w-32">
                  &nbsp;
                </th>
                {selected.map((v) => (
                  <th key={v.id} className="text-left pb-4 px-3 align-top">
                    <div className="relative">
                      <button
                        onClick={() => toggle(v.id)}
                        aria-label={`Remove ${v.name} from comparison`}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        className="w-full h-28 object-cover rounded-lg mb-2"
                      />
                      <div className="font-semibold text-sm leading-tight">{v.name}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specRows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="text-xs uppercase tracking-widest text-muted-foreground font-medium py-3 pr-4">
                    {row.label}
                  </td>
                  {selected.map((v) => (
                    <td key={v.id} className="py-3 px-3 text-sm">
                      {row.get(v)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td className="py-4 pr-4" />
                {selected.map((v) => (
                  <td key={v.id} className="py-4 px-3">
                    <PrimaryBtn full href={managementBookingUrl(v.id)}>
                      Reserve
                    </PrimaryBtn>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
