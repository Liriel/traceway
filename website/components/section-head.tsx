import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/eyebrow";

type Align = "left" | "center" | "split";

export function SectionHead({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  cta,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: Align;
  className?: string;
  cta?: React.ReactNode;
}) {
  if (align === "center") {
    return (
      <div className={cn("text-center flex flex-col items-center gap-4 mb-12 max-w-2xl mx-auto", className)}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2>{title}</h2>
        {description ? (
          <p style={{ color: "var(--fg-2)" }} className="text-base md:text-lg">
            {description}
          </p>
        ) : null}
        {cta}
      </div>
    );
  }

  if (align === "split") {
    return (
      <div className={cn("section-head mb-12", className)}>
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="mt-3">{title}</h2>
        </div>
        {description ? (
          <p className="muted max-w-[420px]">{description}</p>
        ) : null}
      </div>
    );
  }

  // left
  return (
    <div className={cn("max-w-3xl mb-12", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3">{title}</h2>
      {description ? (
        <p style={{ color: "var(--fg-2)" }} className="mt-4 text-base md:text-lg max-w-xl">
          {description}
        </p>
      ) : null}
      {cta ? <div className="mt-6">{cta}</div> : null}
    </div>
  );
}
