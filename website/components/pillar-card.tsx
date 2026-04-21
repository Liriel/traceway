import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Color = "a1" | "a2" | "a3" | "ok" | "a4";

const COLOR_TOKEN: Record<Color, string> = {
  a1: "var(--a1)",
  a2: "var(--a2)",
  a3: "var(--a3)",
  ok: "var(--ok)",
  a4: "var(--a4)",
};

export function PillarCard({
  icon: Icon,
  title,
  description,
  href,
  color = "a1",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color?: Color;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("pillar", className)}
      style={{ ["--pc" as string]: COLOR_TOKEN[color] }}
    >
      <div className="p-ico">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div className="p-title">{title}</div>
      <p className="p-desc">{description}</p>
    </Link>
  );
}

export function PillarSec({
  icon: Icon,
  title,
  description,
  href,
  color = "a1",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color?: Color;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("pillar-sec", className)}
      style={{ ["--pc" as string]: COLOR_TOKEN[color] }}
    >
      <div className="ps-title">{title}</div>
      <div className="ps-body">
        <div className="ps-ico">
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
        <div className="ps-desc">{description}</div>
      </div>
    </Link>
  );
}
