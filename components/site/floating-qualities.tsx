"use client";

import { motion } from "framer-motion";
import { heroQualities } from "@/lib/school-data";

export function FloatingQualities() {
  const positions = [
    "left-[5%] top-[10%]",
    "right-[3%] top-[15%]",
    "left-[0%] bottom-[24%]",
    "right-[8%] bottom-[18%]",
    "left-[32%] -top-[4%]",
    "right-[32%] -bottom-[3%]"
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
      {heroQualities.map((quality, index) => (
        <motion.div
          key={quality}
          className={`absolute ${positions[index]} rounded-full border border-skalvi-orange/40 bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-skalvi-deep shadow-soft backdrop-blur`}
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.5, delay: index * 0.08 },
            scale: { duration: 0.5, delay: index * 0.08 },
            y: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
          }}
        >
          {quality}
        </motion.div>
      ))}
    </div>
  );
}
