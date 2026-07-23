import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../routes";

const STORAGE_KEY = "vistarent_cookie_consent";

export type ConsentValue = "accepted" | "declined";

/** Read the stored consent choice, if any has been made yet. */
export function getCookieConsent(): ConsentValue | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function CookieConsent() {
  const [choice, setChoice] = useState<ConsentValue | null>("accepted"); // assume set until checked, avoids a flash

  useEffect(() => {
    setChoice(getCookieConsent());
  }, []);

  function decide(value: ConsentValue) {
    localStorage.setItem(STORAGE_KEY, value);
    setChoice(value);
  }

  if (choice !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          This site doesn't use tracking cookies today. If we add analytics in future, they'll only run with your
          consent. See our{" "}
          <Link to={ROUTES.privacy} className="text-primary font-medium">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => decide("declined")}
            className="px-4 py-2 text-sm font-medium rounded border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={() => decide("accepted")}
            className="px-4 py-2 text-sm font-semibold rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
