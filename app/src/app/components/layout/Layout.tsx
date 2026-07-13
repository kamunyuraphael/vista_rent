import { Outlet } from "react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <ScrollToTop />
      <Nav />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
