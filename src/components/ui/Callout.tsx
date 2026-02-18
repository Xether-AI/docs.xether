import { cn } from "@/lib/utils";
import { AlertCircle, Info, Lightbulb, TriangleAlert, Zap } from "lucide-react";

type CalloutVariant = "note" | "tip" | "warning" | "danger" | "info";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  {
    icon: React.ElementType;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    defaultTitle: string;
  }
> = {
  note: {
    icon: Info,
    borderColor: "rgba(120, 252, 214, 0.4)",
    bgColor: "rgba(120, 252, 214, 0.05)",
    iconColor: "var(--primary)",
    defaultTitle: "Note",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "rgba(120, 252, 214, 0.4)",
    bgColor: "rgba(120, 252, 214, 0.05)",
    iconColor: "var(--primary)",
    defaultTitle: "Tip",
  },
  info: {
    icon: Zap,
    borderColor: "rgba(99, 179, 237, 0.4)",
    bgColor: "rgba(99, 179, 237, 0.05)",
    iconColor: "#63b3ed",
    defaultTitle: "Info",
  },
  warning: {
    icon: TriangleAlert,
    borderColor: "rgba(246, 173, 85, 0.4)",
    bgColor: "rgba(246, 173, 85, 0.05)",
    iconColor: "#f6ad55",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    borderColor: "rgba(252, 129, 129, 0.4)",
    bgColor: "rgba(252, 129, 129, 0.05)",
    iconColor: "#fc8181",
    defaultTitle: "Danger",
  },
};

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn("my-4 rounded-lg border-l-4 p-4", className)}
      style={{
        borderLeftColor: config.borderColor,
        backgroundColor: config.bgColor,
      }}
    >
      <div className="flex items-start gap-3">
        <Icon
          className="mt-0.5 h-4 w-4 shrink-0"
          style={{ color: config.iconColor }}
        />
        <div className="flex-1 min-w-0">
          {(title || config.defaultTitle) && (
            <p
              className="mb-1 text-sm font-semibold"
              style={{ color: config.iconColor }}
            >
              {title ?? config.defaultTitle}
            </p>
          )}
          <div
            className="text-sm leading-relaxed"
            style={{ color: "var(--foreground)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
