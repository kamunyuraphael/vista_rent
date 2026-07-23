import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "vistarent_compare";
const MAX_COMPARE = 3;

interface ComparisonContextValue {
  selectedIds: string[];
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: boolean;
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

function readStored(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds(readStored());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  function toggle(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  function clear() {
    setSelectedIds([]);
  }

  return (
    <ComparisonContext.Provider
      value={{
        selectedIds,
        toggle,
        clear,
        isSelected: (id) => selectedIds.includes(id),
        isFull: selectedIds.length >= MAX_COMPARE,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error("useComparison must be used within a ComparisonProvider");
  return ctx;
}
