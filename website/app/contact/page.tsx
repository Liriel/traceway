"use client";

import { useState, FormEvent } from "react";
import { Eyebrow } from "@/components/eyebrow";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, email, message, customerType }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setSubject("");
      setEmail("");
      setMessage("");
      setCustomerType("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--ink-2)",
    border: "1px solid var(--hair-2)",
    color: "var(--fg-0)",
    fontFamily: "var(--font-mono)",
  };

  return (
    <main className="relative">
      <section className="wrap py-20">
        <div className="max-w-xl mx-auto">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 mb-3">Get in touch</h1>
          <p className="mb-10" style={{ color: "var(--fg-2)" }}>
            Have a question or need help? Send us a message and we&apos;ll get
            back to you.
          </p>

          {status === "success" ? (
            <div
              className="rounded-[10px] p-6 text-center"
              style={{
                background: "color-mix(in oklab, var(--ok) 12%, transparent)",
                border: "1px solid color-mix(in oklab, var(--ok) 30%, transparent)",
                color: "var(--ok)",
              }}
            >
              <p className="font-medium">
                Thank you for reaching out! We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--fg-0)", fontFamily: "var(--font-display)" }}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 transition"
                  style={{
                    ...inputStyle,
                    ["--tw-ring-color" as string]: "var(--a1)",
                  }}
                  placeholder="What can we help with?"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--fg-0)", fontFamily: "var(--font-display)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 transition"
                  style={inputStyle}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="customerType"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--fg-0)", fontFamily: "var(--font-display)" }}
                >
                  Customer type
                </label>
                <select
                  id="customerType"
                  required
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value)}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 transition"
                  style={inputStyle}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Existing Customer">Existing Customer</option>
                  <option value="New Customer">New Customer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--fg-0)", fontFamily: "var(--font-display)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 transition resize-none"
                  style={inputStyle}
                  placeholder="Tell us more..."
                />
              </div>

              {status === "error" && (
                <div
                  className="rounded-md px-4 py-3 text-sm"
                  style={{
                    background: "color-mix(in oklab, var(--crit) 12%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--crit) 30%, transparent)",
                    color: "var(--crit)",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-accent w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
