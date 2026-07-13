import type { FleetCategory } from "./types";

// Central route path map — keep Nav, Footer, and links in sync from one place.
export const ROUTES = {
  home: "/",
  fleet: "/fleet",
  services: "/services",
  faq: "/faq",
  booking: "/book/:vehicleId",
} as const;

export function fleetPath(category?: FleetCategory) {
  if (!category || category === "all") return ROUTES.fleet;
  return `${ROUTES.fleet}?category=${category}`;
}

export function bookingPath(vehicleId: string) {
  return `/book/${vehicleId}`;
}
