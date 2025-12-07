"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressStepperProps {
  currentStep: number; // 1, 2, 3, 4
  progress?: number; // 0 to 1 (Global progress for the line)
  className?: string;
}

const steps = [
  { id: 1, label: "Company & Goal" },
  { id: 2, label: "Audience Segments" },
  { id: 3, label: "Ads per Segment" },
  { id: 4, label: "X Personalization" },
];

export function ProgressStepper({ currentStep, progress, className = "" }: ProgressStepperProps) {
  // If progress is not provided, fallback to step-based calculation
  const lineProgress = progress !== undefined 
    ? progress 
    : (currentStep - 1) / (steps.length - 1);

  return (
    <div className={`w-full max-w-4xl mx-auto px-6 py-8 ${className}`}>
      <div className="relative flex items-center justify-between h-12">
        {/* Connecting Line Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200 dark:bg-gray-800 rounded-full z-0" />

        {/* Connecting Line Progress */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#007AFF] rounded-full z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: lineProgress }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center justify-center gap-3 w-8">
              <motion.div
                className={`rounded-full flex items-center justify-center border-2 transition-colors duration-300 relative z-20 ${
                  isCompleted
                    ? "bg-[#007AFF] border-[#007AFF] text-white"
                    : isActive
                    ? "bg-white dark:bg-[#1c1c1e] border-[#007AFF] text-[#007AFF]"
                    : "bg-white dark:bg-[#1c1c1e] border-gray-200 dark:border-gray-700 text-gray-400"
                }`}
                style={{
                  width: 32,
                  height: 32,
                }}
                initial={false}
                animate={{
                  scale: isActive ? 1.4 : 1,
                  boxShadow: isActive ? "0 0 0 6px rgba(0, 122, 255, 0.15)" : "none"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <span className="text-[12px] font-bold">{step.id}</span>
                )}
              </motion.div>
              
              <div className="absolute top-10 left-1/2 -translate-x-1/2 min-w-[120px] text-center">
                <span 
                  className={`text-[11px] font-medium whitespace-nowrap transition-colors duration-300 block ${
                    isActive 
                      ? "text-[#007AFF] font-semibold" 
                      : isCompleted 
                      ? "text-gray-900 dark:text-gray-100" 
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
