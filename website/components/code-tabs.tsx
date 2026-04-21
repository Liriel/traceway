"use client";

import { useState } from "react";

const tabs = [
  {
    label: "Go",
    filename: "main.go",
    code: (
      <>
        <span style={{ color: "var(--a3)" }}>func</span>{" "}
        <span style={{ color: "var(--a2)" }}>main</span>() {"{"}
        {"\n"}
        {"  "}r := gin.<span style={{ color: "var(--a2)" }}>Default</span>()
        {"\n"}
        {"  "}r.<span style={{ color: "var(--a2)" }}>Use</span>(tracewaygin.
        <span style={{ color: "var(--a2)" }}>New</span>(
        <span style={{ color: "var(--ok)" }}>{`"{TOKEN}@https://{SERVER_URL}/api/report"`}</span>
        )){"\n"}
        {"\n"}
        {"  "}r.<span style={{ color: "var(--a2)" }}>GET</span>(
        <span style={{ color: "var(--ok)" }}>&quot;/test&quot;</span>,{" "}
        <span style={{ color: "var(--a3)" }}>func</span>(ctx *gin.Context) {"{"}
        {"\n"}
        {"    "}ctx.<span style={{ color: "var(--a2)" }}>AbortWithError</span>(
        <span style={{ color: "var(--a4)" }}>500</span>, fmt.
        <span style={{ color: "var(--a2)" }}>Errorf</span>(
        <span style={{ color: "var(--ok)" }}>&quot;Worked!&quot;</span>))
        {"\n"}
        {"  "}
        {"}"}){"\n"}
        {"  "}r.<span style={{ color: "var(--a2)" }}>Run</span>(
        <span style={{ color: "var(--ok)" }}>&quot;:8080&quot;</span>){"\n"}
        {"}"}
      </>
    ),
  },
  {
    label: "JavaScript",
    filename: "app.js",
    code: (
      <>
        <span style={{ color: "var(--a3)" }}>const</span> express ={" "}
        <span style={{ color: "var(--a2)" }}>require</span>(
        <span style={{ color: "var(--ok)" }}>&quot;express&quot;</span>){"\n"}
        <span style={{ color: "var(--a3)" }}>const</span> traceway ={" "}
        <span style={{ color: "var(--a2)" }}>require</span>(
        <span style={{ color: "var(--ok)" }}>&quot;@traceway/express&quot;</span>){"\n"}
        {"\n"}
        <span style={{ color: "var(--a3)" }}>const</span> app ={" "}
        <span style={{ color: "var(--a2)" }}>express</span>(){"\n"}
        app.<span style={{ color: "var(--a2)" }}>use</span>(traceway.
        <span style={{ color: "var(--a2)" }}>init</span>(
        <span style={{ color: "var(--ok)" }}>{`"{TOKEN}@https://{SERVER_URL}/api/report"`}</span>
        )){"\n"}
        {"\n"}
        app.<span style={{ color: "var(--a2)" }}>get</span>(
        <span style={{ color: "var(--ok)" }}>&quot;/test&quot;</span>, (req, res) =&gt; {"{"}
        {"\n"}
        {"  "}
        <span style={{ color: "var(--a3)" }}>throw new</span>{" "}
        <span style={{ color: "var(--a2)" }}>Error</span>(
        <span style={{ color: "var(--ok)" }}>&quot;Worked!&quot;</span>){"\n"}
        {"}"}){"\n"}
        {"\n"}
        app.<span style={{ color: "var(--a2)" }}>listen</span>(
        <span style={{ color: "var(--a4)" }}>8080</span>)
      </>
    ),
  },
];

export function CodeTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className="rounded-[10px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080b12, #0d1220)",
        border: "1px solid var(--hair-2)",
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: "rgba(8, 11, 18, 0.6)",
          borderBottom: "1px solid var(--hair)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5a5f" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffd166" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22e0a8" }} />
        </div>
        <div className="flex items-center gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className="px-2.5 py-0.5 rounded text-[10px] font-medium transition-colors"
              style={{
                fontFamily: "var(--font-mono)",
                color: activeTab === i ? "var(--fg-0)" : "var(--fg-3)",
                background: activeTab === i ? "var(--ink-3)" : "transparent",
                border: activeTab === i ? "1px solid var(--hair-2)" : "1px solid transparent",
              }}
            >
              {tab.filename}
            </button>
          ))}
        </div>
      </div>
      <div className="p-0 overflow-x-auto">
        <pre
          className="p-4 text-xs leading-relaxed"
          style={{ fontFamily: "var(--font-mono)", color: "var(--fg-1)" }}
        >
          <code className="block" style={{ background: "transparent", border: 0, padding: 0, color: "inherit" }}>
            {tabs[activeTab].code}
          </code>
        </pre>
      </div>
    </div>
  );
}
