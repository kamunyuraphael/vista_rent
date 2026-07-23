export interface Location {
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapQuery: string;
  blurb: string;
}

export const locations: Location[] = [
  {
    slug: "nairobi-cbd",
    name: "Nairobi CBD Office",
    city: "Nairobi",
    address: "Kimathi Street, Nairobi CBD",
    phone: "+254 700 123 456",
    hours: "Mon–Sat, 7am – 7pm",
    mapQuery: "Kimathi Street, Nairobi",
    blurb: "Our main office and largest fleet selection, a short walk from most CBD hotels.",
  },
  {
    slug: "jkia-airport",
    name: "JKIA Airport Pickup",
    city: "Nairobi",
    address: "Jomo Kenyatta International Airport, Arrivals Hall",
    phone: "+254 700 123 456",
    hours: "24 / 7",
    mapQuery: "Jomo Kenyatta International Airport",
    blurb: "Land and go — our team meets you at Arrivals with your vehicle ready.",
  },
  {
    slug: "westlands",
    name: "Westlands Office",
    city: "Nairobi",
    address: "Waiyaki Way, Westlands",
    phone: "+254 700 123 456",
    hours: "Mon–Sat, 7am – 7pm",
    mapQuery: "Waiyaki Way, Westlands, Nairobi",
    blurb: "Convenient for business travelers staying in Westlands and Parklands.",
  },
  {
    slug: "mombasa",
    name: "Mombasa Office",
    city: "Mombasa",
    address: "Moi Avenue, Mombasa",
    phone: "+254 700 123 456",
    hours: "Mon–Sat, 8am – 6pm",
    mapQuery: "Moi Avenue, Mombasa",
    blurb: "Coastal fleet for beach holidays and Mombasa business trips alike.",
  },
];
