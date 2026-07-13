import { Routes, Route } from "react-router";
import { ROUTES } from "./routes";
import { vehicles as fallbackVehicles } from "./data/vehicles";
import { faqs as fallbackFaqs } from "./data/faqs";
import { testimonials as fallbackTestimonials } from "./data/testimonials";
import { fetchVehicles, fetchFaqs, fetchTestimonials } from "./lib/api";
import { useApiData } from "./lib/hooks";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { FleetPage } from "./pages/FleetPage";
import { ServicesPage } from "./pages/ServicesPage";
import { FaqPage } from "./pages/FaqPage";
import { BookingPage } from "./pages/BookingPage";

export default function App() {
  // Each hook fetches live data from the backend on mount and falls back to
  // the local mock data if the API is unreachable, so the site never breaks.
  const { data: vehicles } = useApiData(() => fetchVehicles(), fallbackVehicles);
  const { data: faqs } = useApiData(() => fetchFaqs(), fallbackFaqs);
  const { data: testimonials } = useApiData(() => fetchTestimonials(), fallbackTestimonials);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<HomePage vehicles={vehicles} testimonials={testimonials} />} />
        <Route path={ROUTES.fleet} element={<FleetPage vehicles={vehicles} />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.faq} element={<FaqPage faqs={faqs} />} />
        <Route path={ROUTES.booking} element={<BookingPage />} />
      </Route>
    </Routes>
  );
}
