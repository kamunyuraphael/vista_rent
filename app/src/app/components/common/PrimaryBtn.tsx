import { Link } from "react-router";

const baseClass = (full: boolean, large: boolean) => `
  inline-flex items-center justify-center gap-2 font-semibold rounded
  bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]
  transition-all duration-150 cursor-pointer
  ${full ? "w-full" : ""}
  ${large ? "px-8 py-4 text-base" : "px-5 py-2.5 text-sm"}
`;

type PrimaryBtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
  large?: boolean;
  /** If provided, renders as a router Link instead of a <button>. */
  to?: string;
};

export function PrimaryBtn({ children, onClick, full = false, large = false, to }: PrimaryBtnProps) {
  const className = baseClass(full, large);

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
