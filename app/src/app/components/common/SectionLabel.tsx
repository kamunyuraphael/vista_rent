export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-5 h-px bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{children}</span>
    </div>
  );
}
