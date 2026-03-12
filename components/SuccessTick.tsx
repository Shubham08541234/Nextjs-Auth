"use client";

import { motion } from "framer-motion";

export default function SuccessTick() {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 52 52"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="#22c55e"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />

      <motion.path
        fill="none"
        stroke="#22c55e"
        strokeWidth="3"
        d="M14 27l7 7 16-16"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
    </motion.svg>
  );
}