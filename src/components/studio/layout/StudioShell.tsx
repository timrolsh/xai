"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StudioShellProps {
  children: ReactNode;
  className?: string;
}

export function StudioShell({ children, className = "" }: StudioShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        relative w-full max-w-4xl mx-auto
        bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(28,28,30,0.85)]
        backdrop-blur-[40px]
        rounded-2xl md:rounded-[20px]
        shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]
        dark:shadow-[0_4px_24px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1)]
        border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.1)]
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

