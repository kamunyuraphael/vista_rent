import { SectionLabel } from "../components/common/SectionLabel";

export function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-28">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Terms of Service
      </h1>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 text-sm text-amber-600 mb-10">
        Template content — replace with terms reviewed by a lawyer before this site goes live. Actual rental
        contracts, deposits, and insurance excess are finalized in the management system at time of booking.
      </div>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">About this site</h2>
          <p>
            This website is an informational and marketing resource for VistaRent Kenya Ltd. It does not itself
            process bookings, payments, or customer accounts — clicking "Reserve" or "Book Now" directs you to our
            management system, where the actual rental agreement is presented and accepted before any booking is
            confirmed.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Insurance</h2>
          <p>
            All vehicles in the VistaRent fleet carry comprehensive insurance as standard. Specific excess amounts,
            coverage exclusions, and driver eligibility requirements are set out in the rental agreement you'll
            review and accept in the management system before a booking is confirmed.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Pricing shown on this site</h2>
          <p>
            Daily rates displayed on the Fleet page are indicative and may not include optional add-ons (chauffeur,
            child seats, cross-border permits) or seasonal adjustments. Final pricing is confirmed at the time of
            booking.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Contact</h2>
          <p>Questions about these terms can be sent to hello@vistarent.co.ke or +254 700 123 456.</p>
        </section>
      </div>
    </div>
  );
}
