import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return <Tag className={cn("eyebrow", className)}>{children}</Tag>;
}
