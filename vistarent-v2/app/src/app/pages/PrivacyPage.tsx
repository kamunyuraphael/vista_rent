import { SectionLabel } from "../components/common/SectionLabel";

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-28">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        Privacy &amp; Cookie Policy
      </h1>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 text-sm text-amber-600 mb-10">
        Template content — replace with a policy reviewed by a lawyer familiar with Kenya's Data Protection Act,
        2019, before this site goes live.
      </div>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Information we collect</h2>
          <p>
            When you submit an enquiry through this site (for example, the corporate quote form), we collect the
            details you provide — company name, contact name, work email, phone number, and any message you include.
            We do not collect payment information or process bookings on this site; those are handled by our
            management system when you proceed to hire a vehicle.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">How we use it</h2>
          <p>
            Enquiry details are used solely to respond to your request for a quote or information, and are not sold
            or shared with third parties for marketing purposes.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Cookies</h2>
          <p>
            This site does not currently set marketing or tracking cookies. If analytics tools are added in future,
            this section will be updated to describe what's collected and how to opt out.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Your rights</h2>
          <p>
            Under Kenya's Data Protection Act, 2019, you have the right to access, correct, or request deletion of
            personal data we hold about you. To make a request, contact us at hello@vistarent.co.ke.
          </p>
        </section>
        <section>
          <h2 className="text-foreground font-semibold text-lg mb-2">Contact</h2>
          <p>Questions about this policy can be sent to hello@vistarent.co.ke or +254 700 123 456.</p>
        </section>
      </div>
    </div>
  );
}
