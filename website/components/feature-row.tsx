import Image from "next/image";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/eyebrow";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  bullets?: string[];
  image?: { src: string; alt: string; width?: number; height?: number };
  children?: React.ReactNode;
  reverse?: boolean;
  eyebrowColor?: string;
  cta?: React.ReactNode;
};

export function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  image,
  children,
  reverse,
  eyebrowColor,
  cta,
}: Props) {
  return (
    <div className={cn("feature-row", reverse && "reverse")}>
      <div className="feat-copy">
        {eyebrow ? (
          <Eyebrow
            className={cn(eyebrowColor && "eyebrow")}
            {...(eyebrowColor ? { style: { color: eyebrowColor } } : {})}
          >
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2>{title}</h2>
        <p>{description}</p>
        {bullets?.length ? (
          <ul className="feat-bullets">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
        {cta ? <div className="mt-6">{cta}</div> : null}
      </div>
      <div className="feat-visual">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1200}
            height={image.height ?? 800}
            className="w-full h-auto"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
