import { Outlet } from "react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { WhatsAppButton } from "../common/WhatsAppButton";
import { CompareBar } from "../fleet/CompareBar";
import { JsonLd } from "../common/JsonLd";
import { CookieConsent } from "../common/CookieConsent";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "VistaRent Kenya",
  description: "Premium self-drive and chauffeur-driven car hire across Nairobi and Kenya.",
  url: "https://www.vistarent.co.ke/",
  telephone: "+254700123456",
  email: "hello@vistarent.co.ke",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  priceRange: "KES",
};

export function Layout() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <JsonLd data={localBusinessSchema} />
      <ScrollToTop />
      <Nav />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CompareBar />
      <CookieConsent />
    </div>
  );
}
