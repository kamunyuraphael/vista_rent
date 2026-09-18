import { Shield, MapPin, Award, Users } from "lucide-react";
import { SectionLabel } from "../components/common/SectionLabel";
import { useLanguage } from "../context/i18n";

const stats = [
  { label: "Vehicles in Fleet", value: "50+" },
  { label: "Years Operating", value: "8" },
  { label: "Cities Served", value: "4" },
  { label: "Corporate Clients", value: "120+" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    body: "Every vehicle is fully insured, GPS-tracked, and serviced on a strict schedule before it ever reaches a customer.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    body: "Based in Nairobi and built for Kenyan roads — from city traffic to Maasai Mara backroads.",
  },
  {
    icon: Award,
    title: "Reliability",
    body: "Real-time availability and instant booking confirmation mean no ghost bookings, ever.",
  },
  {
    icon: Users,
    title: "People-Led",
    body: "A small, dedicated team that knows the fleet and the customers — not a call center.",
  },
];

export function AboutPage() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="bg-card border-b border-border py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel>{t("about.label")}</SectionLabel>
          <h1
            className="text-6xl md:text-7xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("about.title")}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            VistaRent started in Nairobi with a simple idea: car hire shouldn't feel like a gamble. Every vehicle we
            put on the road is insured, tracked, and maintained to a standard we'd trust for our own families.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-4xl font-black text-primary mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <SectionLabel>What We Stand For</SectionLabel>
          <h2
            className="text-4xl font-black uppercase leading-tight mb-8"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Our approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
