import { cn } from "@/lib/utils";

export type FaqItem = {
  q: string;
  a: React.ReactNode;
};

export function FaqList({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <div className={cn("faq-list", className)}>
      {items.map((it, i) => (
        <details className="faq-q" key={i}>
          <summary>
            <span>{it.q}</span>
            <span className="plus" aria-hidden>
              +
            </span>
          </summary>
          <div className="faq-a">
            {typeof it.a === "string" ? <p>{it.a}</p> : it.a}
          </div>
        </details>
      ))}
    </div>
  );
}
