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
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=640&h=400&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=640&h=400&fit=crop&auto=format",
  },
];
