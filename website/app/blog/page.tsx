import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Traceway",
  description: "Release notes and updates from the Traceway team.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="relative">
      <section className="wrap py-20">
        <div className="prose">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-4 mb-3">Releases & updates</h1>
          <p style={{ color: "var(--fg-3)" }} className="mb-12">
            What we shipped, and when.
          </p>

          {posts.length === 0 ? (
            <p style={{ color: "var(--fg-3)" }}>No posts yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {posts.map((post) => (
                <li
                  key={post.slug}
                  style={{ borderTop: "1px solid var(--hair)", padding: "20px 0" }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: "var(--fg-0)", textDecoration: "none" }}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div
                      className="text-[12px] mb-1"
                      style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}
                    >
                      {formatDate(post.date)}
                    </div>
                    <div
                      className="text-[18px] font-medium"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {post.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
