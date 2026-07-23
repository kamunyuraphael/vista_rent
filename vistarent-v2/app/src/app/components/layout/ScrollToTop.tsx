import { useEffect } from "react";
import { useLocation } from "react-router";

/** Scrolls to the top of the page on every route change (client-side nav doesn't do this by default). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
