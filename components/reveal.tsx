"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      // `once: false` resets the entrance state when the section leaves view,
      // allowing the same animation to play while scrolling in either direction.
      viewport={{ once: false, amount: 0.16, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
