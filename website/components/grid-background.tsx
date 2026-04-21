import { cn } from "@/lib/utils";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--hair) 1px, transparent 1px), linear-gradient(to bottom, var(--hair) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #000 50%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #000 50%, transparent 100%)",
      }}
    />
  );
}
