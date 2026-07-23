import { Link } from "react-router";
import { Clock } from "lucide-react";
import { ROUTES } from "../routes";
import { SectionLabel } from "../components/common/SectionLabel";

export function ComingSoonPage({ label, title }: { label: string; title: string }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Clock className="text-primary" size={26} />
      </div>
      <SectionLabel>{label}</SectionLabel>
      <h1 className="text-4xl font-black uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {title}
      </h1>
      <p className="text-muted-foreground mb-8">
        This page is coming soon. In the meantime, reach us directly at hello@vistarent.co.ke.
      </p>
      <Link to={ROUTES.home} className="text-primary font-semibold text-sm">
        Back to home
      </Link>
    </div>
  );
}
