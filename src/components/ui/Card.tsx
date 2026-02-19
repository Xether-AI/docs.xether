import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export function Card({ title, href, children, className }: CardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-2 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-primary/5",
        className,
      )}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-semibold text-sm"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          style={{ color: "var(--primary)" }}
        />
      </div>
      {children && (
        <div
          className="text-sm leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {children}
        </div>
      )}
    </Link>
  );
}

interface CardsProps {
  children: React.ReactNode;
  className?: string;
}

export function Cards({ children, className }: CardsProps) {
  return (
    <div
      className={cn("my-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {children}
    </div>
  );
}
