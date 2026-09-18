import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Calendar, Users, ArrowRight, ChevronDown, Star, Shield, Zap, Clock, Settings2, Award } from "lucide-react";
import { ROUTES } from "../routes";
import { managementBookingUrl } from "../api/management";
import type { Vehicle } from "../data/vehicles";
import type { Testimonial } from "../data/testimonials";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { GhostBtn } from "../components/common/GhostBtn";
import { SectionLabel } from "../components/common/SectionLabel";
import { VehicleCard } from "../components/fleet/VehicleCard";
import { useLanguage } from "../context/i18n";

export function HomePage({
  vehicles,
  testimonials,
}: {
  vehicles: Vehicle[];
  testimonials: Testimonial[];
}) {
  const [pickup, setPickup] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [vtype, setVtype] = useState("Any Vehicle");
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1800&h=1000&fit=crop&auto=format')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">{t("hero.badge")}</span>
            </div>
            <h1
              className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tight mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t("hero.title1")}
              <br />
              <span className="text-primary">{t("hero.title2")}</span>
              <br />
              {t("hero.title3")}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryBtn large to={ROUTES.fleet}>
                {t("hero.cta.explore")} <ArrowRight size={16} />
              </PrimaryBtn>
              <GhostBtn to={ROUTES.services}>
                {t("hero.cta.corporate")} <ChevronDown size={14} className="rotate-[-90deg]" />
              </GhostBtn>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {[["500+", "Bookings Monthly"], ["98%", "Satisfaction Rate"], ["24/7", "Roadside Assist"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Widget */}
      <section className="relative z-10 -mt-16 max-w-6xl mx-auto px-6 mb-24">
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5">
            Quick Search &amp; Reserve
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Pickup Location</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Nairobi CBD, JKIA…"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Pickup Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Return Date</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Vehicle Type</label>
              <div className="relative">
                <select
                  value={vtype}
                  onChange={(e) => setVtype(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                  {["Any Vehicle", "SUV / Off-Road", "Luxury", "Saloon", "Van / People Mover"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn large full to={ROUTES.fleet}>
              Search Available Vehicles <ArrowRight size={16} />
            </PrimaryBtn>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="text-center mb-14">
          <SectionLabel>Why VistaRent</SectionLabel>
          <h2
            className="text-5xl font-black uppercase leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Built for people who value their time
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Zap,
              title: "Real-Time Availability",
              desc: "Live inventory updates mean zero ghost bookings. What you see is what you get — confirmed instantly.",
            },
            {
              icon: Shield,
              title: "Comprehensive Insurance",
              desc: "Every rental includes full comprehensive cover. Optional excess waivers bring your exposure to zero.",
            },
            {
              icon: Clock,
              title: "24 / 7 Roadside Assist",
              desc: "Our support team and replacement vehicles are on standby around the clock, across Kenya.",
            },
            {
              icon: Settings2,
              title: "Instant Mobile Checkout",
              desc: "Pay via M-Pesa, Airtel Money, or card in under 60 seconds. No paperwork, no queues.",
            },
            {
              icon: Award,
              title: "Transparent Pricing",
              desc: "The price you see is the price you pay. No hidden surcharges, no surprises at the fuel pump.",
            },
            {
              icon: Users,
              title: "Corporate Fleet Accounts",
              desc: "Volume pricing, monthly invoicing, and a dedicated account manager for businesses of all sizes.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:bg-secondary transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel>Featured Vehicles</SectionLabel>
            <h2
              className="text-5xl font-black uppercase leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Vehicles for every mission
            </h2>
          </div>
          <Link
            to={ROUTES.fleet}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            View full fleet <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {vehicles.slice(0, 3).map((v) => (
            <VehicleCard key={v.id} vehicle={v} reserveHref={managementBookingUrl(v.id)} />
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <PrimaryBtn full to={ROUTES.fleet}>
            View All Vehicles <ArrowRight size={15} />
          </PrimaryBtn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card border-y border-border py-24 mb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>Client Stories</SectionLabel>
            <h2
              className="text-5xl font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Trusted by Nairobi's best
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.name} className="bg-secondary border border-border rounded-xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{item.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-primary rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-5xl md:text-6xl font-black uppercase text-primary-foreground leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ready to move?
            </h2>
            <p className="text-primary-foreground/70 text-base mt-2">
              Browse our full fleet and reserve in under 2 minutes.
            </p>
          </div>
          <Link
            to={ROUTES.fleet}
            className="shrink-0 px-8 py-4 bg-primary-foreground text-primary font-bold rounded-lg text-base hover:opacity-90 transition-opacity cursor-pointer"
          >
            Browse Fleet Now
          </Link>
        </div>
      </section>
    </div>
  );
}
