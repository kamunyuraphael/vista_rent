import { Link, useParams } from "react-router";
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react";
import { locations } from "../data/locations";
import { ROUTES } from "../routes";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { SectionLabel } from "../components/common/SectionLabel";
import { JsonLd } from "../components/common/JsonLd";
import { NotFoundPage } from "./NotFoundPage";

export function LocationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);

  if (!location) return <NotFoundPage />;

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressCountry: "KE",
    },
    telephone: location.phone,
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-8 pb-28">
      <JsonLd data={placeSchema} />

      <Link to={ROUTES.locations} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={14} /> All locations
      </Link>

      <SectionLabel>{location.city}</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {location.name}
      </h1>
      <p className="text-muted-foreground mb-8">{location.blurb}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4">
          <MapPin size={16} className="text-primary mb-2" />
          <div className="text-xs text-muted-foreground mb-0.5">Address</div>
          <div className="text-sm font-semibold">{location.address}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <Clock size={16} className="text-primary mb-2" />
          <div className="text-xs text-muted-foreground mb-0.5">Hours</div>
          <div className="text-sm font-semibold">{location.hours}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <Phone size={16} className="text-primary mb-2" />
          <div className="text-xs text-muted-foreground mb-0.5">Phone</div>
          <div className="text-sm font-semibold">{location.phone}</div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-border mb-8 h-72">
        <iframe
          title={`Map of ${location.name}`}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`}
        />
      </div>

      <PrimaryBtn to={ROUTES.fleet}>Browse Vehicles Available Here</PrimaryBtn>
    </div>
  );
}
