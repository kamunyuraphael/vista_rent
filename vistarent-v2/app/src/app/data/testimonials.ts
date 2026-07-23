export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
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
