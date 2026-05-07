import { cn } from "@/lib/utils";

export function Chip({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "ok" | "crit";
  className?: string;
}) {
  return (
    <span className={cn("chip", variant !== "default" && variant, className)}>
      {children}
    </span>
  );
}
