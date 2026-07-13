import { Link } from "react-router";
import { ROUTES } from "../../routes";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>V</span>
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Vista<span className="text-primary">Rent</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-[200px]">
            Premium fleet hire across Nairobi and Kenya. Zero friction, instant booking.
          </p>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>+254 700 123 456</span>
            <span>hello@vistarent.co.ke</span>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            {["About Us", "Careers", "Press", "Sustainability"].map((l) => (
              <span key={l} className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Services</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Self-Drive Hire", to: ROUTES.fleet },
              { label: "Chauffeur Service", to: ROUTES.services },
              { label: "Corporate Accounts", to: ROUTES.services },
              { label: "Safari Tours", to: ROUTES.services },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Legal</h4>
          <div className="flex flex-col gap-2">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Insurance Terms"].map((l) => (
              <span key={l} className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">© 2025 VistaRent Kenya Ltd. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Registered in Kenya · Nairobi Business District</p>
      </div>
    </footer>
  );
}
