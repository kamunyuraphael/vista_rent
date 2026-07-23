import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../../routes";
import { PrimaryBtn } from "../common/PrimaryBtn";
import { GhostBtn } from "../common/GhostBtn";
import { managementSignInUrl } from "../../lib/management";
import { ThemeToggle } from "../common/ThemeToggle";
import { LanguageToggle } from "../common/LanguageToggle";
import { useLanguage } from "../../lib/i18n";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), to: ROUTES.home },
    { label: t("nav.fleet"), to: ROUTES.fleet },
    { label: t("nav.services"), to: ROUTES.services },
    { label: t("nav.blog"), to: ROUTES.blog },
    { label: t("nav.faq"), to: ROUTES.faq },
  ];

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
          {/*<div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>V</span>
          </div>*/}
          <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Vista<span className="text-primary">Rent</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === ROUTES.home} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* Sign-in and account management live on the management system, not this marketing site. */}
          <LanguageToggle />
          <ThemeToggle />
          <GhostBtn href={managementSignInUrl()}>{t("nav.signIn")}</GhostBtn>
          <PrimaryBtn to={ROUTES.fleet}>{t("nav.bookNow")}</PrimaryBtn>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="text-foreground cursor-pointer p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
          <a
            href={managementSignInUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left text-sm font-medium py-1 cursor-pointer text-muted-foreground"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.signIn")}
          </a>
          <PrimaryBtn full to={ROUTES.fleet} onClick={() => setMenuOpen(false)}>
            {t("nav.bookNow")}
          </PrimaryBtn>
        </div>
      )}
    </nav>
  );
}
