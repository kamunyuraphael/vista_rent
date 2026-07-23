import { useState, type FormEvent } from "react";
import { ArrowRight, Award, Briefcase, Check, Clock, Loader2, Users } from "lucide-react";
import { ROUTES } from "../routes";
import { createLead, ApiError } from "../lib/api";
import { useLanguage } from "../lib/i18n";
import { PrimaryBtn } from "../components/common/PrimaryBtn";
import { SectionLabel } from "../components/common/SectionLabel";

export function ServicesPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    workEmail: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createLead(form);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="relative bg-card border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>{t("services.label")}</SectionLabel>
          <h1
            className="text-6xl md:text-7xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("services.title")}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            From executive chauffeur services to long-term corporate fleet solutions — we tailor our offering to match your needs precisely.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-28 pt-20 space-y-28">

        {/* Chauffeur */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Chauffeur Service</SectionLabel>
            <h2
              className="text-5xl font-black uppercase leading-tight mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Executive transport, redefined
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our chauffeurs are professionally trained, background-checked, and experienced in executive protocol. Whether you need airport transfers, full-day availability for meetings across Nairobi, or transport for a special occasion — we deliver a seamless experience every time.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Vetted, uniformed professional drivers",
                "Complimentary meet-and-greet at pickup",
                "Real-time GPS tracking shared with your contact",
                "Airport, hotel, and office transfers",
                "Weddings, events, and diplomatic transport",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <PrimaryBtn to={ROUTES.fleet}>
              Book a Chauffeur <ArrowRight size={15} />
            </PrimaryBtn>
          </div>
          <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&h=600&fit=crop&auto=format"
              alt="Professional chauffeur service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Corporate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <SectionLabel>Corporate Accounts</SectionLabel>
            <h2
              className="text-5xl font-black uppercase leading-tight mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Fleet solutions for forward-thinking teams
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Consolidate your organisation's transport spend under a single, streamlined account. From once-off executive vehicles to permanent fleet leasing, VistaRent corporate accounts come with volume pricing, dedicated account management, and consolidated monthly invoicing.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Monthly Invoicing", icon: Briefcase },
                { label: "Dedicated Manager", icon: Users },
                { label: "Volume Discounts", icon: Award },
                { label: "Priority Bookings", icon: Clock },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2.5 bg-secondary rounded-lg px-4 py-3 border border-border">
                  <Icon size={16} className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Corporate lead form */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              {submitted ? (
                <div className="flex items-start gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Enquiry received</h3>
                    <p className="text-sm text-muted-foreground">
                      Thanks — our corporate accounts team will reach out within one business day.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h3 className="font-semibold text-sm mb-1">Request a Corporate Quote</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      placeholder="Company Name"
                      value={form.companyName}
                      onChange={update("companyName")}
                      className="px-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      required
                      placeholder="Your Name"
                      value={form.contactName}
                      onChange={update("contactName")}
                      className="px-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <input
                    required
                    placeholder="Work Email"
                    type="email"
                    value={form.workEmail}
                    onChange={update("workEmail")}
                    className="w-full px-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    required
                    placeholder="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    className="w-full px-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <textarea
                    rows={3}
                    placeholder="Brief description of your fleet requirements…"
                    value={form.message}
                    onChange={update("message")}
                    className="w-full px-3 py-2.5 rounded bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />

                  {error && (
                    <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5">
                      {error}
                    </div>
                  )}

                  <PrimaryBtn full>
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="animate-spin" size={14} /> Sending…
                      </span>
                    ) : (
                      <>
                        Submit Enquiry <ArrowRight size={14} />
                      </>
                    )}
                  </PrimaryBtn>
                </form>
              )}
            </div>
          </div>
          <div className="relative h-80 lg:h-[580px] rounded-2xl overflow-hidden bg-secondary lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=700&fit=crop&auto=format"
              alt="Corporate fleet management"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Safari / Tours */}
        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&h=700&fit=crop&auto=format')",
            }}
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="relative max-w-2xl px-10 py-20">
            <SectionLabel>Custom Tours &amp; Exploration</SectionLabel>
            <h2
              className="text-5xl font-black uppercase leading-tight mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Kenya's open road awaits
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Our off-road fleet is built for Kenya's terrain. Whether you're heading to Maasai Mara, the Aberdares, or across the border into Tanzania — we equip you with a battle-ready vehicle and an optional guide who knows every track.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Maasai Mara", "Amboseli", "Laikipia Plateau", "Mt Kenya", "Tsavo East", "Cross-Border"].map((dest) => (
                <span key={dest} className="px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold border border-primary/30">
                  {dest}
                </span>
              ))}
            </div>
            <PrimaryBtn large to={ROUTES.faq}>
              Plan Your Trip <ArrowRight size={16} />
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
