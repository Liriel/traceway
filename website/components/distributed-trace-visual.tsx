import { Link2, ArrowRight } from "lucide-react";

const traces = [
  {
    service: "Backend API",
    method: "GET",
    path: "/api/test-error",
    status: "500",
    duration: "72ms",
    badge: "Exception",
    color: "var(--crit)",
  },
  {
    service: "React Frontend",
    method: null as string | null,
    path: "Error: GET /api/test-error failed: 500 Internal Server Error",
    status: null as string | null,
    duration: null as string | null,
    badge: "Exception",
    color: "var(--crit)",
  },
];

export function DistributedTraceVisual() {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--ink-3), var(--ink-2))",
        border: "1px solid var(--hair-2)",
        boxShadow: "0 30px 60px -30px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid var(--hair)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Link2 className="w-4 h-4" style={{ color: "var(--fg-3)" }} />
          <span
            className="text-base font-semibold"
            style={{ color: "var(--fg-0)", fontFamily: "var(--font-display)" }}
          >
            Distributed Trace
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--fg-2)" }}>
          This trace spans across multiple services
        </p>
      </div>

      <div>
        {traces.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5 py-4"
            style={{
              borderBottom: i < traces.length - 1 ? "1px solid var(--hair)" : "none",
            }}
          >
            <span
              className="shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "var(--ink-3)",
                color: "var(--fg-1)",
                border: "1px solid var(--hair)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t.service}
            </span>

            <div
              className="flex-1 min-w-0 flex items-center gap-2 text-sm truncate"
              style={{ fontFamily: "var(--font-mono)", color: "var(--fg-1)" }}
            >
              {t.method && (
                <span className="font-semibold" style={{ color: "var(--fg-3)" }}>
                  {t.method}
                </span>
              )}
              <span className="truncate" style={{ color: "var(--a2)" }}>
                {t.path}
              </span>
              {t.status && (
                <span className="font-semibold" style={{ color: "var(--crit)" }}>
                  {t.status}
                </span>
              )}
              {t.duration && (
                <span style={{ color: "var(--fg-3)" }}>{t.duration}</span>
              )}
            </div>

            <span
              className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{
                background: "color-mix(in oklab, var(--crit) 90%, transparent)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t.badge}
            </span>

            <span
              className="shrink-0 flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors"
              style={{ color: "var(--fg-2)" }}
            >
              View <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
