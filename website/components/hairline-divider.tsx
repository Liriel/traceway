import { cn } from "@/lib/utils";

export function HairlineDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  if (!label) {
    return <div className={cn("hair-rule", className)} />;
  }
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-fg-3 font-mono text-[11px] tracking-widest uppercase",
        className
      )}
    >
      <span className="hair-rule flex-1" />
      <span>{label}</span>
      <span className="hair-rule flex-1" />
    </div>
  );
}
