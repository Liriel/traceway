export function ImpactScoreVisual() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/checkout",
      score: "Critical",
      tone: "crit",
      p50: "320ms",
      p95: "1.8s",
      p99: "4.2s",
      requests: "12.4k",
    },
    {
      method: "GET",
      path: "/api/users",
      score: "High",
      tone: "warn",
      p50: "85ms",
      p95: "420ms",
      p99: "1.1s",
      requests: "48.2k",
    },
    {
      method: "POST",
      path: "/api/upload",
      score: "Medium",
      tone: "med",
      p50: "210ms",
      p95: "680ms",
      p99: "950ms",
      requests: "3.1k",
    },
    {
      method: "GET",
      path: "/api/health",
      score: "Good",
      tone: "ok",
      p50: "2ms",
      p95: "8ms",
      p99: "15ms",
      requests: "102k",
    },
  ];

  const slis = [
    "Inverted apdex variant",
    "Error rate floor",
    "P99 floor",
    "Client error floor",
    "Volume error floor",
  ];

  const toneStyle = (tone: string): React.CSSProperties => {
    if (tone === "crit")
      return { color: "var(--crit)", background: "color-mix(in oklab, var(--crit) 14%, transparent)", border: "1px solid color-mix(in oklab, var(--crit) 30%, transparent)" };
    if (tone === "warn")
      return { color: "var(--a3)", background: "color-mix(in oklab, var(--a3) 14%, transparent)", border: "1px solid color-mix(in oklab, var(--a3) 30%, transparent)" };
    if (tone === "med")
      return { color: "var(--a4)", background: "color-mix(in oklab, var(--a4) 14%, transparent)", border: "1px solid color-mix(in oklab, var(--a4) 30%, transparent)" };
    return { color: "var(--ok)", background: "color-mix(in oklab, var(--ok) 14%, transparent)", border: "1px solid color-mix(in oklab, var(--ok) 30%, transparent)" };
  };

  return (
    <div className="w-full">
      <div
        className="rounded-[12px] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--ink-3), var(--ink-2))",
          border: "1px solid var(--hair-2)",
          boxShadow: "0 30px 60px -30px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div
          className="flex items-center gap-1.5 px-4 py-3"
          style={{
            background: "rgba(8, 11, 18, 0.6)",
            borderBottom: "1px solid var(--hair)",
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5a5f" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffd166" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22e0a8" }} />
          <span
            className="ml-3 text-[11px] tracking-wider uppercase"
            style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}
          >
            endpoints — impact score
          </span>
        </div>

        <div
          className="grid gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "1fr 90px 80px 80px 80px 70px",
            background: "rgba(0,0,0,0.15)",
            borderBottom: "1px solid var(--hair)",
            color: "var(--fg-3)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div>Endpoint</div>
          <div>Score</div>
          <div className="text-right">P50</div>
          <div className="text-right">P95</div>
          <div className="text-right">P99</div>
          <div className="text-right">Reqs</div>
        </div>

        {endpoints.map((ep, i) => (
          <div
            key={ep.path}
            className="grid gap-2 px-4 py-3"
            style={{
              gridTemplateColumns: "1fr 90px 80px 80px 80px 70px",
              borderBottom: i < endpoints.length - 1 ? "1px solid var(--hair)" : "none",
            }}
          >
            <div className="truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--fg-0)" }}>
              <span style={{ color: "var(--fg-3)" }}>{ep.method}</span>{" "}
              <span style={{ color: "var(--a2)" }}>{ep.path}</span>
            </div>
            <div>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold"
                style={{ ...toneStyle(ep.tone), fontFamily: "var(--font-mono)" }}
              >
                {ep.score}
              </span>
            </div>
            <div className="text-right text-sm" style={{ color: "var(--fg-1)", fontFamily: "var(--font-mono)" }}>
              {ep.p50}
            </div>
            <div className="text-right text-sm" style={{ color: "var(--fg-1)", fontFamily: "var(--font-mono)" }}>
              {ep.p95}
            </div>
            <div className="text-right text-sm" style={{ color: "var(--fg-1)", fontFamily: "var(--font-mono)" }}>
              {ep.p99}
            </div>
            <div className="text-right text-sm" style={{ color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
              {ep.requests}
            </div>
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-center text-sm"
        style={{ color: "var(--fg-2)" }}
      >
        The Impact Score takes the{" "}
        <span style={{ color: "var(--fg-0)", fontWeight: 500 }}>max</span> across five SLIs:{" "}
        {slis.map((sli, i) => (
          <span key={sli}>
            <span style={{ color: "var(--fg-1)", fontWeight: 500 }}>{sli}</span>
            {i < slis.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </div>
  );
}
