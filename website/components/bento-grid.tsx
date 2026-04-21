import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Size = "wide" | "tall" | "med" | "sm";

const SIZE_CLASS: Record<Size, string> = {
  wide: "b b-wide",
  tall: "b b-tall",
  med: "b b-med",
  sm: "b b-sm",
};

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("bento-grid", className)}>{children}</div>;
}

export function BentoCell({
  size = "med",
  icon: Icon,
  title,
  description,
  children,
  className,
  iconColor,
}: {
  size?: Size;
  icon?: LucideIcon;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  iconColor?: string;
}) {
  return (
    <div
      className={cn(SIZE_CLASS[size], className)}
      style={iconColor ? ({ ["--a1" as string]: iconColor } as React.CSSProperties) : undefined}
    >
      {(Icon || title) && (
        <div className="b-head">
          {Icon ? (
            <div className="b-ico">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </div>
          ) : null}
          {title ? <h4>{title}</h4> : null}
        </div>
      )}
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  );
}
