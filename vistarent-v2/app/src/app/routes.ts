import type { FleetCategory } from "./types";

// Central route path map — keep Nav, Footer, and links in sync from one place.
// This is a marketing site only: there's no internal booking, sign-in, or
// account route here. Those live on the separate management system —
// see lib/management.ts for the outbound links that send customers there.
export const ROUTES = {
  home: "/",
  fleet: "/fleet",
  vehicleDetail: "/fleet/:vehicleId",
  compare: "/compare",
  services: "/services",
  faq: "/faq",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
  careers: "/careers",
  press: "/press",
  sustainability: "/sustainability",
  locations: "/locations",
  locationDetail: "/locations/:slug",
  blog: "/blog",
  blogPost: "/blog/:slug",
} as const;

export function fleetPath(category?: FleetCategory) {
  if (!category || category === "all") return ROUTES.fleet;
  return `${ROUTES.fleet}?category=${category}`;
}

export function detailPath(vehicleId: string) {
  return `/fleet/${vehicleId}`;
}

export function locationPath(slug: string) {
  return `/locations/${slug}`;
}

export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}
