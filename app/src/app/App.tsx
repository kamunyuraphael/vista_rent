import { Routes, Route } from "react-router";
import { ROUTES } from "./routes";
import { vehicles as fallbackVehicles } from "./data/vehicles";
import { faqs as fallbackFaqs } from "./data/faqs";
import { testimonials as fallbackTestimonials } from "./data/testimonials";
import { fetchVehicles, fetchFaqs, fetchTestimonials } from "./api/client";
import { useApiData } from "./hooks/useApiData";
import { ComparisonProvider } from "./context/comparison-context";
import { LanguageProvider } from "./context/i18n";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { FleetPage } from "./pages/FleetPage";
import { VehicleDetailPage } from "./pages/VehicleDetailPage";
import { ComparePage } from "./pages/ComparePage";
import { ServicesPage } from "./pages/ServicesPage";
import { FaqPage } from "./pages/FaqPage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { LocationsPage } from "./pages/LocationsPage";
import { LocationDetailPage } from "./pages/LocationDetailPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  // Each hook fetches live data from the backend on mount and falls back to
  // the local mock data if the API is unreachable, so the site never breaks.
  const { data: vehicles } = useApiData(() => fetchVehicles(), fallbackVehicles);
  const { data: faqs } = useApiData(() => fetchFaqs(), fallbackFaqs);
  const { data: testimonials } = useApiData(() => fetchTestimonials(), fallbackTestimonials);

  return (
    <LanguageProvider>
      <ComparisonProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.home} element={<HomePage vehicles={vehicles} testimonials={testimonials} />} />
            <Route path={ROUTES.fleet} element={<FleetPage vehicles={vehicles} />} />
            <Route path={ROUTES.vehicleDetail} element={<VehicleDetailPage vehicles={vehicles} />} />
            <Route path={ROUTES.compare} element={<ComparePage vehicles={vehicles} />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.faq} element={<FaqPage faqs={faqs} />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />
            <Route path={ROUTES.careers} element={<ComingSoonPage label="Company" title="Careers" />} />
            <Route path={ROUTES.press} element={<ComingSoonPage label="Company" title="Press" />} />
            <Route
              path={ROUTES.sustainability}
              element={<ComingSoonPage label="Company" title="Sustainability" />}
            />
            <Route path={ROUTES.locations} element={<LocationsPage />} />
            <Route path={ROUTES.locationDetail} element={<LocationDetailPage />} />
            <Route path={ROUTES.blog} element={<BlogPage />} />
            <Route path={ROUTES.blogPost} element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ComparisonProvider>
    </LanguageProvider>
  );
}
