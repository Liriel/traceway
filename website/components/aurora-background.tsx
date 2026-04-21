import { cn } from "@/lib/utils";

type Variant = "default" | "hero" | "cta";

export function AuroraBackground({
  variant = "default",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const intensity =
    variant === "hero" ? "hero" : variant === "cta" ? "cta" : "default";
  return (
    <div
      aria-hidden
      data-aurora={intensity}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute -inset-24"
        style={{
          background:
            variant === "hero"
              ? `radial-gradient(900px 500px at 80% 0%, color-mix(in oklab, var(--a1) 22%, transparent), transparent 60%),
                 radial-gradient(700px 420px at 10% 30%, color-mix(in oklab, var(--a2) 16%, transparent), transparent 65%),
                 radial-gradient(500px 300px at 60% 90%, color-mix(in oklab, var(--a3) 10%, transparent), transparent 60%)`
              : variant === "cta"
              ? `radial-gradient(700px 400px at 50% 0%, color-mix(in oklab, var(--a1) 20%, transparent), transparent 65%),
                 radial-gradient(500px 320px at 50% 100%, color-mix(in oklab, var(--a2) 16%, transparent), transparent 65%)`
              : `radial-gradient(600px 380px at 80% 0%, color-mix(in oklab, var(--a1) 10%, transparent), transparent 65%)`,
        }}
      />
    </div>
  );
}
