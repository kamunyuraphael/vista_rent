import { Link, useParams } from "react-router";
import { ArrowLeft, Settings2, Users, Zap, Package, Shield } from "lucide-react";
import type { Vehicle } from "../data/vehicles";
import { ROUTES } from "../routes";
import { managementBookingUrl } from "../lib/management";
import { srcSetFor, DEFAULT_SIZES } from "../lib/images";
import { SectionLabel } from "../components/common/SectionLabel";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { VehicleCard } from "../components/fleet/VehicleCard";
import { JsonLd } from "../components/common/JsonLd";
import { NotFoundPage } from "./NotFoundPage";

const categoryBlurb: Partial<Record<Vehicle["category"], string>> = {
  luxury: "A refined ride for executive travel, client meetings, and airport transfers where first impressions matter.",
  saloon: "A comfortable, fuel-efficient daily driver — ideal for city trips and inter-town travel.",
  suv: "Built for Kenyan roads, from Nairobi traffic to backroads on the way to the coast or a safari.",
  vans: "Spacious seating for groups, families, or teams that need to travel together.",
};
const defaultBlurb = "A well-maintained, fully insured vehicle ready for your next trip.";

export function VehicleDetailPage({ vehicles }: { vehicles: Vehicle[] }) {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) return <NotFoundPage />;

  const similar = vehicles.filter((v) => v.category === vehicle.category && v.id !== vehicle.id).slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    category: vehicle.category,
    image: vehicle.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: vehicle.price,
      availability: "https://schema.org/InStock",
      url: managementBookingUrl(vehicle.id),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-28">
      <JsonLd data={productSchema} />

      <Link to={ROUTES.fleet} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={14} /> Back to Fleet
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="relative rounded-xl overflow-hidden bg-secondary h-72 md:h-96">
            <img
              src={vehicle.image}
              srcSet={srcSetFor(vehicle.image)}
              sizes={DEFAULT_SIZES}
              loading="eager"
              decoding="async"
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
            {vehicle.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {vehicle.badge}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <SectionLabel>{vehicle.category.toUpperCase()}</SectionLabel>
          <h1 className="text-4xl font-black uppercase leading-none mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {vehicle.name}
          </h1>
          <div className="text-primary font-black text-3xl mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            KES {vehicle.price.toLocaleString()}
            <span className="text-sm text-muted-foreground font-normal"> /day</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{categoryBlurb[vehicle.category] ?? defaultBlurb}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: Settings2, label: "Transmission", value: vehicle.transmission },
              { icon: Users, label: "Seats", value: `${vehicle.seats}` },
              { icon: Zap, label: "Engine", value: vehicle.engine },
              { icon: Package, label: "Luggage", value: vehicle.luggage },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-card border border-border rounded-lg p-3">
                <Icon size={14} className="text-primary mb-1.5" />
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Shield size={14} className="text-primary shrink-0" />
            Fully insured, GPS-tracked, and serviced before every rental.
          </div>

          <PrimaryBtn full large href={managementBookingUrl(vehicle.id)}>
            Reserve This Vehicle
          </PrimaryBtn>
          <p className="text-xs text-muted-foreground text-center mt-3">
            You'll be directed to our booking system to confirm dates and complete payment.
          </p>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-20">
          <SectionLabel>You Might Also Like</SectionLabel>
          <h2 className="text-3xl font-black uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Similar vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similar.map((v) => (
              <VehicleCard key={v.id} vehicle={v} reserveHref={managementBookingUrl(v.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
