import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={
        "rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300 " +
        className
      }
    >
      {children}
    </motion.div>
  );
}