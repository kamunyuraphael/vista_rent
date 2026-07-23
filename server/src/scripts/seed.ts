import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { VehicleModel } from "../models/Vehicle.js";
import { FaqModel } from "../models/Faq.js";
import { TestimonialModel } from "../models/Testimonial.js";

// Mirrors src/app/data/*.ts on the frontend. Kept as a separate copy rather than
// a cross-package import so the server package can be built/deployed independently.
// If you change the frontend's mock data, update this list to match.

const vehicles = [
  {
    name: "Toyota Land Cruiser Prado",
    category: "suv",
    price: 12500,
    seats: 7,
    transmission: "Automatic",
    engine: "2700cc",
    luggage: "Large",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "Mercedes-Benz E-Class",
    category: "luxury",
    price: 18500,
    seats: 5,
    transmission: "Automatic",
    engine: "2000cc",
    luggage: "Medium",
    badge: "Executive Pick",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "Toyota Corolla",
    category: "saloon",
    price: 5500,
    seats: 5,
    transmission: "Automatic",
    engine: "1800cc",
    luggage: "Medium",
    badge: null,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "Land Rover Defender 110",
    category: "suv",
    price: 22000,
    seats: 5,
    transmission: "Automatic",
    engine: "3000cc",
    luggage: "Extra Large",
    badge: "Safari Ready",
    image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "Toyota HiAce Commuter",
    category: "vans",
    price: 9500,
    seats: 14,
    transmission: "Manual",
    engine: "2700cc",
    luggage: "Extra Large",
    badge: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "BMW 5 Series",
    category: "luxury",
    price: 20000,
    seats: 5,
    transmission: "Automatic",
    engine: "2500cc",
    luggage: "Medium",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "Subaru Forester",
    category: "suv",
    price: 8500,
    seats: 5,
    transmission: "Automatic",
    engine: "2000cc",
    luggage: "Large",
    badge: null,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=640&h=400&fit=crop&auto=format",
  },
  {
    name: "Toyota Voxy",
    category: "vans",
    price: 8000,
    seats: 8,
    transmission: "Automatic",
    engine: "1800cc",
    luggage: "Large",
    badge: "Family Favourite",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=640&h=400&fit=crop&auto=format",
  },
];

const faqs = [
  {
    q: "How does the security deposit hold work, and when is it refunded?",
    a: "A security deposit of KES 20,000–50,000 is held on your card at pickup, depending on the vehicle class. It is released within 3–5 business days after the vehicle is returned in its original condition, with no damage, fuel discrepancy, or traffic violations recorded.",
  },
  {
    q: "What documents do I need to upload for KYC verification?",
    a: "You will need a valid national ID or passport, a valid driving licence (minimum 2 years issued), and a secondary form of identification such as a KRA PIN certificate. Corporate bookings additionally require a letter of introduction on official company letterhead.",
  },
  {
    q: "What is the difference between the Within Nairobi and Outside Nairobi rates?",
    a: "Within Nairobi rates apply for travel within the Greater Nairobi metropolitan area — including CBD, Westlands, Karen, Gigiri, Thika Road, and Mombasa Road up to Mlolongo. Outside Nairobi rates apply beyond those boundaries and include a higher daily mileage allowance plus a driver allowance.",
  },
  {
    q: "Can I book a vehicle with a professional chauffeur?",
    a: "Yes. Every vehicle in our fleet can be booked with a vetted, professional chauffeur. Chauffeur-driven bookings include a complimentary meet-and-greet, bottled water, and real-time GPS tracking shared with your emergency contact.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, Airtel Money, Visa, Mastercard, and direct bank transfer. Corporate clients may be invoiced monthly against a pre-approved credit facility. All transactions are encrypted and processed securely.",
  },
  {
    q: "What happens if the vehicle breaks down during my rental?",
    a: "We operate a 24/7 roadside assistance line. In the event of a mechanical failure, we dispatch a replacement vehicle within 2 hours inside Nairobi and within 4 hours elsewhere in Kenya. Breakdown downtime is never charged to the customer.",
  },
  {
    q: "Is insurance included in the rental rate?",
    a: "Yes — comprehensive insurance cover is included in all rental rates. This covers third-party liability and own-damage. You may optionally purchase an excess waiver at pickup to reduce your exposure to zero.",
  },
  {
    q: "Can I drive the vehicle outside of Kenya?",
    a: "Cross-border travel is available for select vehicles to Uganda, Tanzania, and Rwanda. A cross-border permit is required and must be requested at least 48 hours before departure. Additional daily rates and permit fees apply.",
  },
];

const testimonials = [
  {
    name: "Amina Ochieng",
    role: "Senior Partner, Ochieng & Associates",
    text: "VistaRent has completely transformed our firm's travel. The cars are impeccable and the booking process is genuinely the smoothest I have ever used in Nairobi.",
    rating: 5,
  },
  {
    name: "David Kamau",
    role: "Head of Logistics, Safaricom PLC",
    text: "We moved our entire executive fleet account to VistaRent three months ago. Zero ghost bookings, instant confirmation, and the vehicles are always exactly what we ordered.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    role: "Travel Lead, USAID Kenya",
    text: "The Defender we hired for our Laikipia field visit was spotless. The chauffeur knew every road and the real-time tracking gave our security team total peace of mind.",
    rating: 5,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/vista_rent";
  await connectDB(uri);

  console.log("[seed] clearing existing vehicles, faqs, testimonials...");
  await Promise.all([
    VehicleModel.deleteMany({}),
    FaqModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
  ]);

  console.log(`[seed] inserting ${vehicles.length} vehicles...`);
  await VehicleModel.insertMany(vehicles);

  console.log(`[seed] inserting ${faqs.length} faqs...`);
  await FaqModel.insertMany(faqs.map((f, i) => ({ ...f, order: i })));

  console.log(`[seed] inserting ${testimonials.length} testimonials...`);
  await TestimonialModel.insertMany(testimonials);

  console.log("[seed] done.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
