"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function DockerCommand() {
  const [copied, setCopied] = useState(false);
  const command = "docker compose up -d";

  function handleCopy() {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="relative inline-flex items-center gap-3 rounded-[10px] px-5 py-3 text-sm"
      style={{
        background: "linear-gradient(180deg, #080b12, #0d1220)",
        border: "1px solid var(--hair-2)",
        color: "var(--fg-0)",
        fontFamily: "var(--font-mono)",
        boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.6)",
      }}
    >
      <span style={{ color: "var(--fg-3)" }} className="select-none">
        $
      </span>
      <code style={{ color: "var(--fg-0)", background: "transparent", border: 0, padding: 0 }}>
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="ml-2 transition-colors"
        style={{ color: copied ? "var(--ok)" : "var(--fg-3)" }}
        aria-label="Copy command"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
