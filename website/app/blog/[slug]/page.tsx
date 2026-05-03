import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found — Traceway" };
  return {
    title: `${post.title} — Traceway`,
    description: `Release notes for Traceway ${post.title}.`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative">
      <section className="wrap py-20">
        <div className="prose">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[13px] mb-6"
            style={{
              color: "var(--fg-2)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
            }}
          >
            <ArrowLeft className="h-3 w-3" />
            All posts
          </Link>

          <Eyebrow>Release</Eyebrow>
          <h1 className="mt-4 mb-3">{post.title}</h1>
          <p
            style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}
            className="mb-12 text-[13px]"
          >
            {formatDate(post.date)}
          </p>

          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
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
