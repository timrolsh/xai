"use client";

import { motion } from "framer-motion";

export function WallpaperBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#fafafa] dark:bg-[#1c1c1e]">
      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-[rgba(0,0,0,0.05)] dark:to-[rgba(0,0,0,0.3)] pointer-events-none" />
      
      {/* Subtle Ambient Light (Optional - very faint) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}

