// This marketing site never handles bookings, accounts, or admin actions
// itself — it hands off to the separate management system for all of that.
// VITE_MANAGEMENT_APP_URL is a placeholder until that system has a real URL.

const MANAGEMENT_APP_URL = import.meta.env.VITE_MANAGEMENT_APP_URL ?? "https://app.vistarent.example";

/** Link to the management system's booking flow, optionally deep-linked to a vehicle. */
export function managementBookingUrl(vehicleId?: string): string {
  return vehicleId ? `${MANAGEMENT_APP_URL}/book/${vehicleId}` : `${MANAGEMENT_APP_URL}/book`;
}

/** Link to the management system's sign-in page. */
export function managementSignInUrl(): string {
  return `${MANAGEMENT_APP_URL}/sign-in`;
}
