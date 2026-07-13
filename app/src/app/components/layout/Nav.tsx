import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../../routes";
import { PrimaryBtn } from "../common/PrimaryBtn";
import { GhostBtn } from "../common/GhostBtn";

const navLinks = [
  { label: "Home", to: ROUTES.home },
  { label: "Fleet", to: ROUTES.fleet },
  { label: "Services", to: ROUTES.services },
  { label: "Support", to: ROUTES.faq },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors cursor-pointer ${
      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-left text-sm font-medium py-1 cursor-pointer ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={ROUTES.home} className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>V</span>
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Vista<span className="text-primary">Rent</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === ROUTES.home} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <GhostBtn>Sign In</GhostBtn>
          <PrimaryBtn to={ROUTES.fleet}>Book Now</PrimaryBtn>
        </div>

        <button
          className="md:hidden text-foreground cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 py-4 flex flex-col gap-3">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.home}
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <PrimaryBtn full to={ROUTES.fleet} onClick={() => setMenuOpen(false)}>
            Book Now
          </PrimaryBtn>
        </div>
      )}
    </nav>
  );
}
