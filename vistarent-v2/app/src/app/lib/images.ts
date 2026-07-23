// Vehicle photos are served from Unsplash with a fixed width in the URL
// (?w=640&h=400&fit=crop&auto=format). This helper generates a matching
// srcset so browsers can pick a smaller image on small screens instead of
// always downloading the full 640px version.

function withWidth(url: string, width: number): string {
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    return u.toString();
  } catch {
    return url;
  }
}

const WIDTHS = [320, 480, 640, 960];

export function srcSetFor(url: string): string {
  return WIDTHS.map((w) => `${withWidth(url, w)} ${w}w`).join(", ");
}

export const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
