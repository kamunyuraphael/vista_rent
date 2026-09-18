# VistaRent Frontend

A marketing/informational site for VistaRent car hire: a Vite + React +
TypeScript frontend (design from Figma) backed by a small Express + MongoDB
content API. This site does **not** handle bookings, sign-in, or accounts —
it showcases the fleet, FAQs, testimonials, and services, then hands visitors
off to a separate management application for anything transactional.

## Structure

```
.
├── src/                        ← frontend (Vite + React + TypeScript + Tailwind)
│   └── app/
│       ├── App.tsx               route table
│       ├── routes.ts             central path constants
│       ├── types.ts
│       ├── api/
│       │   ├── client.ts          typed fetch client for the content API
│       │   └── management.ts      outbound links to the external management app
│       ├── context/
│       │   ├── comparison-context.tsx
│       │   └── i18n.tsx
│       ├── hooks/
│       │   └── useApiData.ts      fetch-with-fallback hook
│       ├── utils/
│       │   └── images.ts
│       ├── data/                  local mock data — used as a fallback if the API is down
│       ├── components/
│       │   ├── common/            PrimaryBtn, GhostBtn, SectionLabel
│       │   ├── layout/            Nav, Footer, Layout, ScrollToTop
│       │   ├── fleet/             VehicleCard, CompareBar
│       │   └── ui/                shadcn/ui primitives (untouched from the Figma export)
│       └── pages/                 HomePage, FleetPage, ServicesPage, FaqPage, ...
└── server/                     ← backend (Express + MongoDB + Mongoose), MVC layout
    └── src/
        ├── index.ts               app entrypoint
        ├── config/db.ts
        ├── models/                Vehicle, Faq, Testimonial, Lead
        ├── controllers/           request handlers for each resource
        ├── routes/                thin routers wiring paths to controllers
        └── scripts/seed.ts        populates MongoDB with the same data as src/app/data
```

## Running it

**1. Backend**

```bash
cd server
npm install
cp .env.example .env      # then fill in MONGODB_URI
npm run seed               # one-time: populate vehicles/faqs/testimonials
npm run dev                 # starts on http://localhost:4000
```

`MONGODB_URI` can point at a local `mongod` or a free MongoDB Atlas cluster.

**2. Frontend**

```bash
npm install
cp .env.example .env      # VITE_API_URL and VITE_MANAGEMENT_APP_URL
npm run dev                 # starts on http://localhost:5173
```

The frontend works even if the backend isn't running — every API call falls
back to the local mock data in `src/app/data/`, so `npm run dev` alone still
gives you a fully-clickable site.

## What's wired up

- **Routing** — `react-router` v7 (declarative mode). Real URLs (`/fleet?category=suv`,
  `/faq`, `/fleet/:vehicleId`), browser back/forward, and shareable links all work.
- **Live data** — Home, Fleet, and FAQ pages fetch vehicles/faqs/testimonials from
  the API on load, with silent fallback to local data if the backend is unreachable.
- **Corporate leads** — the Services page posts quote enquiries to `POST /api/leads`.
- **Sign in / Book a vehicle** — these are intentionally *not* implemented here.
  `Nav`, `VehicleDetailPage`, `FleetPage`, `ComparePage`, and `HomePage` all link
  out to the external management app via `src/app/api/management.ts`
  (`VITE_MANAGEMENT_APP_URL`), which owns accounts, bookings, and admin.

## Out of scope for this site

Accounts, bookings, payments, digital inspection checklists, telematics,
geo-fencing, and the overdue-penalty engine all live in the separate
management application, not here.
