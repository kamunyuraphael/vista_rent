#!/usr/bin/env node
// Generates public/sitemap.xml, combining the static marketing pages with
// live vehicle detail pages pulled from the API (so /fleet/:id entries use
// real database IDs instead of the mock "v1" style ids used offline).
//
// Usage:
//   node scripts/generate-sitemap.mjs
//
// Env vars:
//   SITEMAP_SITE_URL  — public site origin (default: https://www.vistarent.co.ke)
//   SITEMAP_API_URL   — API base to fetch vehicles from (default: VITE_API_URL or localhost:4000/api)
//
// NOTE: if you add a new static page/route to the site, add it to
// STATIC_ROUTES below too — this script doesn't import routes.ts directly
// since that requires a TS-aware runtime this plain Node script doesn't have.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = (process.env.SITEMAP_SITE_URL ?? "https://www.vistarent.co.ke").replace(/\/$/, "");
const API_URL = process.env.SITEMAP_API_URL ?? process.env.VITE_API_URL ?? "http://localhost:4000/api";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/fleet", changefreq: "weekly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/locations", changefreq: "monthly", priority: "0.7" },
  { path: "/locations/nairobi-cbd", changefreq: "monthly", priority: "0.6" },
  { path: "/locations/jkia-airport", changefreq: "monthly", priority: "0.6" },
  { path: "/locations/westlands", changefreq: "monthly", priority: "0.6" },
  { path: "/locations/mombasa", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/blog/documents-you-need-to-hire-a-car-in-kenya", changefreq: "yearly", priority: "0.6" },
  { path: "/blog/best-road-trips-from-nairobi", changefreq: "yearly", priority: "0.6" },
  { path: "/blog/safari-prep-checklist", changefreq: "yearly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

async function fetchVehicleIds() {
  try {
    const res = await fetch(`${API_URL}/vehicles`);
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const vehicles = await res.json();
    return vehicles.map((v) => v._id).filter(Boolean);
  } catch (err) {
    console.warn(`[sitemap] Couldn't fetch vehicles from ${API_URL} (${err.message}). Skipping vehicle detail pages.`);
    return [];
  }
}

function urlEntry({ path: p, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${SITE_URL}${p}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function main() {
  const vehicleIds = await fetchVehicleIds();
  const vehicleEntries = vehicleIds.map((id) =>
    urlEntry({ path: `/fleet/${id}`, changefreq: "weekly", priority: "0.7" })
  );

  const allEntries = [...STATIC_ROUTES.map(urlEntry), ...vehicleEntries];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries,
    "</urlset>",
    "",
  ].join("\n");

  const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
  await writeFile(outPath, xml, "utf-8");
  console.log(`[sitemap] Wrote ${STATIC_ROUTES.length} static + ${vehicleEntries.length} vehicle pages to ${outPath}`);
}

main();
