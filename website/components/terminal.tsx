import { cn } from "@/lib/utils";

export type TerminalLine = {
  ln?: string;
  type?: "cmd" | "tx" | "mute" | "ok";
  content: React.ReactNode;
};

export function Terminal({
  title,
  lines,
  showCursor,
  className,
}: {
  title?: string;
  lines: TerminalLine[];
  showCursor?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("term", className)}>
      <div className="term-head">
        <span className="tdot" style={{ background: "#ff5a5f" }} />
        <span className="tdot" style={{ background: "#ffd166" }} />
        <span className="tdot" style={{ background: "#22e0a8" }} />
        {title ? <span className="ttl">{title}</span> : null}
      </div>
      <div className="term-body">
        {lines.map((l, i) => (
          <div className="term-line" key={i}>
            <span className="ln">{l.ln ?? (i + 1).toString().padStart(2, "0")}</span>
            <span className={l.type ?? "tx"}>
              {l.content}
              {showCursor && i === lines.length - 1 ? (
                <span className="cursor" aria-hidden />
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
