import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition",
    variant === "primary" && "bg-skalvi-orange text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#e77514]",
    variant === "secondary" && "bg-skalvi-purple text-white hover:-translate-y-0.5 hover:bg-skalvi-deep",
    variant === "ghost" && "border border-skalvi-purple/20 bg-white text-skalvi-ink hover:border-skalvi-orange",
    className
  );

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
        <ArrowRight aria-hidden size={16} />
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
      <ArrowRight aria-hidden size={16} />
    </Link>
  );
}
