import { useEffect, useState } from "react";

interface UseApiDataResult<T> {
  data: T;
  loading: boolean;
  /** True if the live fetch failed and we're showing the fallback data instead. */
  isFallback: boolean;
}

/**
 * Fetches from `fetcher` on mount. If it fails (e.g. the backend isn't running
 * yet), falls back to `fallback` so the UI still renders instead of breaking.
 */
export function useApiData<T>(fetcher: () => Promise<T>, fallback: T): UseApiDataResult<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setIsFallback(false);
        }
      })
      .catch((err) => {
        console.warn("[api] falling back to local data:", err instanceof Error ? err.message : err);
        if (!cancelled) {
          setData(fallback);
          setIsFallback(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, isFallback };
}
