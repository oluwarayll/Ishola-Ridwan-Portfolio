import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";

type Variant = "up" | "left" | "right" | "scale";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  threshold?: number;
}

const variantClass: Record<Variant, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export default function Reveal({ children, className, variant = "up", delay = 0, threshold }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div ref={ref} style={style} className={cn("reveal", variantClass[variant], inView && "is-in", className)}>
      {children}
    </div>
  );
}
