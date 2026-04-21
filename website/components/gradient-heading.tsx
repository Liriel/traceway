import { cn } from "@/lib/utils";

type Props = {
  as: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
};

export function GradientHeading({ as: Tag, children, className }: Props) {
  return <Tag className={cn(className)}>{children}</Tag>;
}

export function Gradient({ children }: { children: React.ReactNode }) {
  return <em>{children}</em>;
}
