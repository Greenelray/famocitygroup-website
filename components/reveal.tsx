"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const hiddenState = reduceMotion
    ? { opacity: 0, y: 16 }
    : { opacity: 0, y: 52, scale: 0.955, rotateX: 10, rotateY: -2, filter: "blur(12px)" };
  const visibleState = reduceMotion
    ? { opacity: 1, y: 0 }
    : {
        opacity: [0, 0.74, 1],
        y: [52, -5, 0],
        scale: [0.955, 1.012, 1],
        rotateX: [10, -1, 0],
        rotateY: [-2, 0.4, 0],
        filter: ["blur(12px)", "blur(1px)", "blur(0px)"]
      };

  return (
    <motion.div
      className={className}
      initial={hiddenState}
      whileInView={visibleState}
      // `once: false` resets the entrance state when the section leaves view,
      // allowing the same animation to play while scrolling in either direction.
      viewport={{ once: false, amount: 0.16, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.84, times: [0, 0.74, 1], ease: [0.16, 1, 0.3, 1], delay }}
      style={{ perspective: 1100, willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}
