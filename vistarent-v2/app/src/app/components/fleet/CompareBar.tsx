import { Link } from "react-router";
import { X, Scale } from "lucide-react";
import { useComparison } from "../../lib/comparison-context";
import { ROUTES } from "../../routes";

export function CompareBar() {
  const { selectedIds, clear } = useComparison();

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-6 z-40 bg-card border border-border rounded-full shadow-lg pl-4 pr-2 py-2 flex items-center gap-3">
      <Scale size={16} className="text-primary shrink-0" />
      <span className="text-sm font-medium">
        {selectedIds.length} vehicle{selectedIds.length !== 1 ? "s" : ""} selected
      </span>
      <Link
        to={ROUTES.compare}
        className="text-sm font-semibold text-primary-foreground bg-primary rounded-full px-4 py-1.5 hover:opacity-90 transition-opacity cursor-pointer"
      >
        Compare
      </Link>
      <button
        onClick={clear}
        aria-label="Clear comparison"
        className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <X size={14} />
      </button>
    </div>
  );
}
