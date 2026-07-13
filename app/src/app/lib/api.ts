import type { Vehicle } from "../data/vehicles";
import type { Faq } from "../data/faqs";
import type { Testimonial } from "../data/testimonials";
import type { FleetCategory } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.error ?? `Request failed with status ${res.status}`, res.status);
  }

  return res.json() as Promise<T>;
}

// ─── Shape translation ──────────────────────────────────────────────────────
// The backend returns Mongo documents (_id: string). The frontend works with a
// plain `id: string` field so components stay decoupled from Mongo's naming.

type WithMongoId<T> = T & { _id: string };

function toVehicle(doc: WithMongoId<Omit<Vehicle, "id">>): Vehicle {
  const { _id, ...rest } = doc;
  return { id: _id, ...rest };
}

function toFaq(doc: WithMongoId<Faq>): Faq {
  const { _id, ...rest } = doc;
  void _id;
  return rest;
}

function toTestimonial(doc: WithMongoId<Testimonial>): Testimonial {
  const { _id, ...rest } = doc;
  void _id;
  return rest;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function fetchVehicles(category?: FleetCategory): Promise<Vehicle[]> {
  const query = category && category !== "all" ? `?category=${category}` : "";
  const docs = await request<WithMongoId<Omit<Vehicle, "id">>[]>(`/vehicles${query}`);
  return docs.map(toVehicle);
}

export async function fetchVehicle(id: string): Promise<Vehicle> {
  const doc = await request<WithMongoId<Omit<Vehicle, "id">>>(`/vehicles/${id}`);
  return toVehicle(doc);
}

export async function fetchFaqs(): Promise<Faq[]> {
  const docs = await request<WithMongoId<Faq>[]>("/faqs");
  return docs.map(toFaq);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const docs = await request<WithMongoId<Testimonial>[]>("/testimonials");
  return docs.map(toTestimonial);
}

export interface CreateBookingInput {
  vehicleId: string;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  pickupDate: string; // ISO date
  returnDate: string; // ISO date
  notes?: string;
}

export interface Booking extends CreateBookingInput {
  _id: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  return request<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export { ApiError };
