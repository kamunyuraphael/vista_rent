import { Link } from "react-router";

type GhostBtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  /** If provided, renders as a router Link instead of a <button> (internal navigation). */
  to?: string;
  /** If provided, renders as a plain external <a> (e.g. out to the management system). */
  href?: string;
};

const className =
  "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer";

export function GhostBtn({ children, onClick, to, href }: GhostBtnProps) {
  if (href) {
    return (
      <a href={href} onClick={onClick} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

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
