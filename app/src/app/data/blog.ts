export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  body: string[]; // paragraphs
}

export const blogPosts: BlogPost[] = [
  {
    slug: "documents-you-need-to-hire-a-car-in-kenya",
    title: "Documents You Need to Hire a Car in Kenya",
    excerpt: "A quick checklist so you're not turned away at pickup for both Kenyan residents and visitors.",
    coverImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=700&fit=crop&auto=format",
    publishedAt: "2026-05-12",
    readingMinutes: 4,
    body: [
      "Renting a car in Kenya is straightforward once you know what to bring. The most common reason a booking gets delayed at pickup is a missing document so it's worth double-checking before you arrive.",
      "Kenyan residents will need a valid national ID or passport, a current Kenyan driving license, and a credit or debit card for the security deposit. Visitors from abroad can typically drive on a valid driving license from their home country alongside an International Driving Permit (IDP), plus their passport.",
      "Most rental agreements set a minimum driver age of 23, sometimes with a young-driver surcharge for those under 25, this varies by vehicle category, so it's worth asking when you book.",
      "If you're planning to take the vehicle across the border into Tanzania or Uganda, for example, you'll need to arrange a cross-border permit in advance, since this isn't something that can be sorted at the last minute.",
      "Bring printed or digital copies of your booking confirmation too. It speeds up verification and means the handover takes minutes rather than an extended back-and-forth.",
    ],
  },
  {
    slug: "best-road-trips-from-nairobi",
    title: "5 Best Road Trips From Nairobi",
    excerpt: "Where to point the car for a weekend away from lakeside towns to rift valley viewpoints.",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=700&fit=crop&auto=format",
    publishedAt: "2026-04-03",
    readingMinutes: 5,
    body: [
      "Nairobi's location makes it a genuinely great base for weekend road trips most of the destinations below are under four hours away, so a Friday afternoon start gets you there in time for dinner.",
      "Naivasha (roughly 1.5 hours) is the easiest overnight escape, with lake boat rides, Hell's Gate cycling trails, and a growing list of good lodges right on the water.",
      "Lake Nakuru National Park (around 2.5 hours) rewards an early start with flamingos, rhino sightings, and some of the most dramatic rift valley scenery in the country.",
      "Naro Moru and the Mount Kenya foothills (about 3 hours) suit anyone who wants cooler air and forest trails without committing to a full mountain trek.",
      "Diani Beach is a longer haul if you're driving the whole way (around 8 hours), but for a proper coastal break, flying into Mombasa and picking up a vehicle from our Mombasa office cuts that down considerably.",
      "Whichever route you take, an SUV is worth the upgrade for anything off the main highway several of these routes have stretches of gravel or pothole-heavy tarmac where ground clearance matters.",
    ],
  },
  {
    slug: "safari-prep-checklist",
    title: "Safari Prep Checklist: What to Pack and Plan For",
    excerpt: "Self-drive safaris are more accessible than people think here's how to prepare properly.",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=700&fit=crop&auto=format",
    publishedAt: "2026-03-18",
    readingMinutes: 6,
    body: [
      "A self-drive safari gives you a flexibility that guided tours don't you set the pace, linger where you want, and aren't sharing a vehicle with strangers. It does need a bit more planning though.",
      "Vehicle choice matters most. Parks like Maasai Mara and Amboseli have sections that turn to thick mud in the rains, so a 4x4 with real ground clearance, a Land Cruiser Prado or Land Rover Defender, rather than a standard SUV is the safer choice outside the dry season.",
      "Pack layers. Early morning game drives in the Mara can be genuinely cold, while midday sun is intense light, breathable clothing plus something warm for dawn starts covers both ends.",
      "Bring more water than you think you'll need, a physical park map as backup for when signal drops, and a printed copy of your park entry permits and vehicle documents.",
      "Fuel up whenever you pass a station, even if the tank looks fine. Distances between fuel stops inside and around the parks are longer than they appear on a map, and running low far from a town is not a situation you want.",
      "Finally, check your rental's insurance terms for off-road and park driving specifically not all standard policies cover it the same way, and it's worth confirming before you're already on a dirt track.",
    ],
  },
];
