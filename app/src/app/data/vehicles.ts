import type { FleetCategory } from "../types";

export interface Vehicle {
  id: string;
  name: string;
  category: FleetCategory;
  price: number;
  seats: number;
  transmission: string;
  engine: string;
  luggage: string;
  badge: string | null;
  image: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Toyota Land Cruiser Prado",
    category: "suv" as FleetCategory,
    price: 12500,
    seats: 7,
    transmission: "Automatic",
    engine: "2700cc",
    luggage: "Large",
    badge: "Most Popular",
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742301/sarbjit-singh-_ehg0qg8p0Y-unsplash_dyckol.jpg",
  },
  {
    id: "v2",
    name: "Mercedes-Benz E-Class",
    category: "luxury" as FleetCategory,
    price: 18500,
    seats: 5,
    transmission: "Automatic",
    engine: "2000cc",
    luggage: "Medium",
    badge: "Executive Pick",
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742292/amine-ben-mohamed-SsjZkYx0rEM-unsplash_r8jyq2.jpg",
  },
  {
    id: "v3",
    name: "Toyota Corolla",
    category: "saloon" as FleetCategory,
    price: 5500,
    seats: 5,
    transmission: "Automatic",
    engine: "1800cc",
    luggage: "Medium",
    badge: null,
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742306/mohammad-fathollahi-ebXSlDQ-Vtc-unsplash_uvkptg.jpg",
  },
  {
    id: "v4",
    name: "Land Rover Defender 110",
    category: "suv" as FleetCategory,
    price: 22000,
    seats: 5,
    transmission: "Automatic",
    engine: "3000cc",
    luggage: "Extra Large",
    badge: "Safari Ready",
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742754/haberdoedas-hF4bTmrQirQ-unsplash_1_fu6y9d.jpg",
  },
  {
    id: "v5",
    name: "Toyota HiAce Commuter",
    category: "vans" as FleetCategory,
    price: 9500,
    seats: 14,
    transmission: "Manual",
    engine: "2700cc",
    luggage: "Extra Large",
    badge: null,
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742306/jonas-gerlach-fRVxvA5169I-unsplash_kftnsx.jpg",
  },
  {
    id: "v6",
    name: "BMW 5 Series",
    category: "luxury" as FleetCategory,
    price: 20000,
    seats: 5,
    transmission: "Automatic",
    engine: "2500cc",
    luggage: "Medium",
    badge: "Premium",
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/chris-saran-iXHHhfwJD1E-unsplash_yvbqmy.jpg",
  },
  {
    id: "v7",
    name: "Subaru Forester",
    category: "suv" as FleetCategory,
    price: 8500,
    seats: 5,
    transmission: "Automatic",
    engine: "2000cc",
    luggage: "Large",
    badge: null,
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742306/jed-cobourn-rM22zNdvP_s-unsplash_ltawj0.jpg",
  },
  {
    id: "v8",
    name: "Toyota Voxy",
    category: "vans" as FleetCategory,
    price: 8000,
    seats: 8,
    transmission: "Automatic",
    engine: "1800cc",
    luggage: "Large",
    badge: "Family Favourite",
    image: "https://res.cloudinary.com/iprdnhzp/image/upload/v1789742300/huy-phan-o2HKV9AA3oo-unsplash_wcw274.jpg",
  },
];
