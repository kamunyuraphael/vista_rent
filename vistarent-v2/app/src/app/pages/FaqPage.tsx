import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import type { Faq } from "../data/faqs";
import { SectionLabel } from "../components/common/SectionLabel";
import { JsonLd } from "../components/common/JsonLd";
import { useLanguage } from "../lib/i18n";

export function FaqPage({ faqs: faqList }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div>
      <JsonLd data={faqSchema} />
      <div className="bg-card border-b border-border py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel>{t("faq.label")}</SectionLabel>
          <h1
            className="text-6xl md:text-7xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t("faq.title1")}
            <br />
            <span className="text-primary">{t("faq.title2")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("faq.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-2 mb-20">
          {faqList.map((item, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                openFaq === i ? "border-primary/40 bg-card" : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-semibold text-sm pr-4 leading-snug">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-primary" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <SectionLabel>Still need help?</SectionLabel>
          <h2
            className="text-4xl font-black uppercase mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Talk to our team
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Our support team is available around the clock. Reach us through any channel and we'll get back to you within minutes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, title: "Call Us", value: "+254 700 123 456", sub: "Available 24 / 7" },
              { icon: Mail, title: "Email", value: "hello@vistarent.co.ke", sub: "Response within 2 hours" },
              { icon: MapPin, title: "Office", value: "Westlands, Nairobi", sub: "Mon–Sat, 7am – 7pm" },
            ].map(({ icon: Icon, title, value, sub }) => (
              <div key={title} className="bg-secondary border border-border rounded-xl p-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon size={17} className="text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{title}</div>
                <div className="font-semibold text-sm mb-0.5">{value}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
