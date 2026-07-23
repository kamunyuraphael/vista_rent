# VistaRent Frontend

Full-stack car hire site: a Vite + React + TypeScript frontend (design from Figma)
and an Express + MongoDB backend, wired together with `react-router` and a small
typed API client.

## Structure

```
.
├── src/                  ← frontend (Vite + React + TypeScript + Tailwind)
│   └── app/
│       ├── App.tsx        route table
│       ├── routes.ts       central path constants
│       ├── types.ts
│       ├── data/            local mock data — used as a fallback if the API is down
│       ├── lib/
│       │   ├── api.ts        typed fetch client for the backend
│       │   └── hooks.ts      useApiData: fetch-with-fallback hook
│       ├── components/
│       │   ├── common/       PrimaryBtn, GhostBtn, SectionLabel
│       │   ├── layout/       Nav, Footer, Layout, ScrollToTop
│       │   ├── fleet/        VehicleCard
│       │   └── ui/            shadcn/ui primitives (untouched from the Figma export)
│       └── pages/            HomePage, FleetPage, ServicesPage, FaqPage, BookingPage
└── server/                ← backend (Express + MongoDB + Mongoose + JWT)
    └── src/
        ├── index.ts          app entrypoint
        ├── config/db.ts
        ├── models/           Vehicle, Faq, Testimonial, User, Booking
        ├── routes/           vehicles, faqs, testimonials, auth, bookings
        ├── middleware/auth.ts
        └── scripts/seed.ts    populates MongoDB with the same data as src/app/data
```

## Running it

**1. Backend**

```bash
cd server
npm install
cp .env.example .env      # then fill in MONGODB_URI and JWT_SECRET
npm run seed               # one-time: populate vehicles/faqs/testimonials
npm run dev                 # starts on http://localhost:4000
```

`MONGODB_URI` can point at a local `mongod` or a free MongoDB Atlas cluster.
`JWT_SECRET` can be any long random string (e.g. `openssl rand -hex 32`).

**2. Frontend**

```bash
npm install
cp .env.example .env      # VITE_API_URL defaults to http://localhost:4000/api
npm run dev                 # starts on http://localhost:5173
```

The frontend works even if the backend isn't running — every API call falls
back to the local mock data in `src/app/data/`, so `npm run dev` alone still
gives you a fully-clickable site. Booking a specific vehicle does require the
backend, since it needs a real vehicle `_id` to reserve against.

## What's wired up

- **Routing** — `react-router` v7 (declarative mode). Real URLs (`/fleet?category=suv`,
  `/faq`, `/book/:vehicleId`), browser back/forward, and shareable links all work.
- **Live data** — Home, Fleet, and FAQ pages fetch vehicles/faqs/testimonials from
  the API on load, with silent fallback to local data if the backend is unreachable.
- **Booking flow** — `/book/:vehicleId` fetches the vehicle, shows a real form,
  computes the total server-side, checks for date-range overlaps against existing
  bookings, and creates a `Booking` document. Works for guests (no account needed).
- **Auth scaffolding** — `POST /api/auth/register` and `/login` issue JWTs
  (password hashing via Node's built-in `scrypt`, no native deps). Not yet wired
  into the frontend's "Sign In" button — that's the natural next step.

## Not yet done (intentionally out of scope for this pass)

- Frontend sign-in/sign-up UI (backend routes exist, ready to call)
- Admin views for managing vehicles/bookings
- Payments, digital inspection checklists, telematics, geo-fencing, overdue-penalty
  engine — the premium RideKE features from your project paper. This pass focused
  on getting a real, working booking loop end-to-end first.
