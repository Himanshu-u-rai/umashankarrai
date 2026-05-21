"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 28, className, style }) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
