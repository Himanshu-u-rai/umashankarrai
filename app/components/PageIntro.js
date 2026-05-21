"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAME = "Umashankar Rai";

// Power4.inOut — imperceptibly slow start, then the curtain rockets off
const POWER4 = [0.87, 0, 0.13, 1];
const SPRING  = [0.33, 1, 0.68, 1];

export default function PageIntro() {
  const [phase, setPhase] = useState("enter"); // enter → exit → done
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setTimeout(() => setPhase("done"), 300); return; }
    const exit = setTimeout(() => setPhase("exit"), 1800);
    const done = setTimeout(() => setPhase("done"), 1800 + 950);
    return () => { clearTimeout(exit); clearTimeout(done); };
  }, [reduced]);

  if (phase === "done") return null;
  const leaving = phase === "exit";

  return (
    <>
      {/* ── Curtain: slides up revealing the page ── */}
      <motion.div
        className="pi-curtain"
        initial={{ y: "0%" }}
        animate={leaving ? { y: "-102%" } : { y: "0%" }}
        transition={leaving ? { duration: 0.92, ease: POWER4 } : { duration: 0 }}
        aria-hidden="true"
      />

      {/* ── Name: fades out just before the curtain lifts ── */}
      <motion.div
        className="pi-stage"
        initial={{ opacity: 1, y: 0 }}
        animate={leaving ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
        transition={leaving ? { duration: 0.28, ease: "easeIn" } : { duration: 0 }}
        aria-hidden="true"
      >
        <div className="pi-name">
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.55,
                delay: ch === " " ? 0 : 0.08 + i * 0.045,
                ease: SPRING,
              }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="pi-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          Senior LIC Insurance Advisor
        </motion.p>
      </motion.div>

      <style>{`
        /* ─── Curtain ─────────────────────────────── */
        .pi-curtain {
          position: fixed;
          inset: 0;
          z-index: 9998;
          will-change: transform;
          background: #FBF8F2;
        }

        /* ─── Stage (name container) ─────────────── */
        .pi-stage {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          will-change: opacity, transform;
        }

        /* ─── Name ───────────────────────────────── */
        .pi-name {
          display: flex;
          align-items: baseline;
          white-space: nowrap;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(30px, 7.5vw, 88px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #0E1320;
          text-shadow: none;
        }

        /* ─── Subtitle ───────────────────────────── */
        .pi-sub {
          margin-top: 20px;
          font-size: clamp(10px, 2.4vw, 12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(14, 19, 32, 0.4);
        }
      `}</style>
    </>
  );
}
