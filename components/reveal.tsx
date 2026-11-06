"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "rise" | "slide-left" | "slide-right" | "scale" | "card" | "hero" | "spotlight";
};

export function Reveal({ children, delay = 0, className, variant = "rise" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const states = {
    rise: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
    "slide-left": { hidden: { opacity: 0, x: -52 }, visible: { opacity: 1, x: 0 } },
    "slide-right": { hidden: { opacity: 0, x: 52 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, y: 18, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } },
    card: { hidden: { opacity: 0, y: 42, scale: 0.94, rotate: -1.5 }, visible: { opacity: 1, y: 0, scale: 1, rotate: 0 } },
    hero: {
      hidden: { opacity: 0, y: 34, scale: 0.97, clipPath: "inset(0 0 16% 0 round 1.5rem)" },
      visible: { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0 round 1.5rem)" }
    },
    spotlight: { hidden: { opacity: 0, y: 22, scale: 0.94, rotateX: 8 }, visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 } }
  };
  const motionState = reduceMotion
    ? { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }
    : states[variant];
  const transition = variant === "card" || variant === "spotlight"
    ? { type: "spring" as const, stiffness: 130, damping: 18, delay }
    : { duration: variant === "hero" ? 0.82 : 0.64, ease: [0.22, 1, 0.36, 1] as const, delay };

  return (
    <motion.div
      className={className}
      initial={motionState.hidden}
      whileInView={motionState.visible}
      // `once: false` resets the entrance state when the section leaves view,
      // allowing the same animation to play while scrolling in either direction.
      viewport={{ once: false, amount: 0.16, margin: "-8% 0px -8% 0px" }}
      transition={transition}
      style={{ perspective: 1100, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
