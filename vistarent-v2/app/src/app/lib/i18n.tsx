import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "sw";

const STORAGE_KEY = "vistarent_lang";

// A lightweight, hand-rolled i18n layer — no extra dependency needed for the
// current scope. Covers the highest-traffic surfaces (nav, hero, key CTAs,
// footer tagline). Longer-form content (blog posts, legal pages) is not
// translated yet; that's a larger content task best done with a professional
// Swahili translation pass rather than machine-translated placeholder copy.
const dictionary = {
  en: {
    "nav.home": "Home",
    "nav.fleet": "Fleet",
    "nav.services": "Services",
    "nav.faq": "Support",
    "nav.blog": "Guides",
    "nav.signIn": "Sign In",
    "nav.bookNow": "Book Now",
    "hero.badge": "Nairobi's Premium Fleet",
    "hero.title1": "Premium Fleet.",
    "hero.title2": "Zero",
    "hero.title3": "Friction.",
    "hero.subtitle":
      "Luxury, saloon, off-road, and people-mover vehicles available across Nairobi and Kenya — with instant booking and real-time availability.",
    "hero.cta.explore": "Explore Fleet",
    "hero.cta.corporate": "Corporate Accounts",
    "vehicle.reserve": "Reserve",
    "vehicle.details": "Details",
    "footer.tagline": "Premium fleet hire across Nairobi and Kenya. Zero friction, instant booking.",

    "fleet.label": "Fleet Showroom",
    "fleet.title": "Choose your vehicle",
    "fleet.subtitle":
      "Every vehicle is fully insured, GPS-tracked, and freshly serviced. Real-time availability means no ghost bookings — ever.",

    "services.label": "Services & Corporate",
    "services.title": "Beyond the ordinary rental",

    "faq.label": "Support & FAQ",
    "faq.title1": "Got questions?",
    "faq.title2": "We have answers.",
    "faq.subtitle": "Everything you need to know before your first booking — and every one after.",

    "about.label": "About VistaRent",
    "about.title": "Built for Kenya's roads",

    "locations.label": "Pickup Locations",
    "locations.title": "Find us near you",
    "locations.subtitle": "Pick up and drop off across Nairobi and the coast — or have a vehicle brought straight to you.",

    "blog.label": "From the Road",
    "blog.title": "Travel & Hire Guides",
    "blog.subtitle": "Practical guides for driving in Kenya — documents, routes, and safari prep.",

    "compare.label": "Compare Vehicles",
    "compare.title": "Side by side",

    "notFound.title": "404",
    "notFound.subtitle": "This page doesn't exist — it may have moved, or the link may be out of date.",
    "notFound.backHome": "Back to home",
    "notFound.browseFleet": "Browse the Fleet",
  },
  sw: {
    "nav.home": "Nyumbani",
    "nav.fleet": "Magari",
    "nav.services": "Huduma",
    "nav.faq": "Msaada",
    "nav.blog": "Miongozo",
    "nav.signIn": "Ingia",
    "nav.bookNow": "Weka Nafasi",
    "hero.badge": "Magari Bora ya Nairobi",
    "hero.title1": "Magari Bora.",
    "hero.title2": "Bila",
    "hero.title3": "Usumbufu.",
    "hero.subtitle":
      "Magari ya kifahari, saluni, ya barabara mbaya, na ya kubeba watu wengi yanapatikana Nairobi na Kenya nzima — na uwezo wa kuweka nafasi papo hapo.",
    "hero.cta.explore": "Angalia Magari",
    "hero.cta.corporate": "Akaunti za Kampuni",
    "vehicle.reserve": "Weka Nafasi",
    "vehicle.details": "Maelezo",
    "footer.tagline": "Kukodisha magari bora Nairobi na Kenya nzima. Bila usumbufu, uwekaji wa haraka.",

    "fleet.label": "Onyesho la Magari",
    "fleet.title": "Chagua Gari Lako",
    "fleet.subtitle":
      "Kila gari lina bima kamili, linafuatiliwa kwa GPS, na limehudumiwa hivi karibuni. Upatikanaji wa papo hapo humaanisha hakuna uwekaji nafasi wa uongo — kamwe.",

    "services.label": "Huduma na Kampuni",
    "services.title": "Zaidi ya Ukodishaji wa Kawaida",

    "faq.label": "Msaada na Maswali",
    "faq.title1": "Una maswali?",
    "faq.title2": "Tuna majibu.",
    "faq.subtitle": "Kila kitu unachohitaji kujua kabla ya uwekaji nafasi wako wa kwanza — na kila mmoja baada ya huo.",

    "about.label": "Kuhusu VistaRent",
    "about.title": "Imejengwa kwa Barabara za Kenya",

    "locations.label": "Maeneo ya Kuchukua Magari",
    "locations.title": "Tupate karibu nawe",
    "locations.subtitle": "Chukua na urudishe gari Nairobi na pwani — au tuletee gari mahali ulipo.",

    "blog.label": "Kutoka Barabarani",
    "blog.title": "Miongozo ya Safari na Ukodishaji",
    "blog.subtitle": "Miongozo ya vitendo ya kuendesha gari Kenya — nyaraka, njia, na maandalizi ya safari.",

    "compare.label": "Linganisha Magari",
    "compare.title": "Bega kwa Bega",

    "notFound.title": "404",
    "notFound.subtitle": "Ukurasa huu haupo — huenda umehamishwa, au kiungo si sahihi tena.",
    "notFound.backHome": "Rudi Nyumbani",
    "notFound.browseFleet": "Angalia Magari",
  },
} as const;

export type TranslationKey = keyof (typeof dictionary)["en"];

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "sw") setLanguageState(stored);
  }, []);

  function setLanguage(lang: Language) {
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  }

  function t(key: TranslationKey): string {
    return dictionary[language][key] ?? dictionary.en[key];
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
