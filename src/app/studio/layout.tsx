"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ProgressStepper } from "@/components/studio/layout/ProgressStepper";
import { StudioShell } from "@/components/studio/layout/StudioShell";
import { useStepNavigation } from "@/lib/hooks/use-step-navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Aurora from "@/components/ui/Aurora";
import Template from "./template";

export default function StudioLayout({ children }: { children: ReactNode }) {
  const { currentStep, currentIndex } = useStepNavigation();

  // Calculate granular progress for the stepper line
  // Total visual steps: 4 (3 segments)
  // Indices 0-2 are sub-steps of Step 1. Index 3 is Step 2.
  // 0 -> 0
  // 1 -> 0.33
  // 2 -> 0.66
  // 3 -> 1.0
  // 4 -> 2.0
  // 5 -> 3.0
  
  let rawProgress = 0;
  if (currentIndex <= 3) {
    rawProgress = currentIndex / 3;
  } else {
    rawProgress = 1 + (currentIndex - 3);
  }
  
  const normalizedProgress = Math.min(Math.max(rawProgress / 3, 0), 1);

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-[#007AFF] selection:text-white relative overflow-hidden">
      
      {/* Aurora Background - Subtle for Studio */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50 pointer-events-none">
        <Aurora 
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} 
          speed={0.3} 
          amplitude={0.8} 
        />
      </div>

      {/* Studio Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white gap-2 pl-2 hover:bg-white/10">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 pointer-events-auto">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#0051D5] flex items-center justify-center shadow-md shadow-blue-500/20">
             <span className="text-white font-bold text-sm">G</span>
           </div>
        </div>
      </header>

      <main className="relative z-10 pt-28 pb-20 px-6 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-4xl space-y-8">
           {/* Stepper */}
           <div className="px-4">
             <ProgressStepper currentStep={currentStep.mainStepId} progress={normalizedProgress} />
           </div>
           
           {/* Main Content Shell - Matching Landing Page 'Ice' Style */}
           <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[40px] shadow-2xl overflow-hidden p-1 relative">
             {/* Inner Gradient Shine */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none opacity-40 dark:opacity-10" />
             
             <StudioShell className="bg-transparent border-none shadow-none relative z-10">
               <Template>
                 {children}
               </Template>
             </StudioShell>
           </div>
        </div>
      </main>
    </div>
  );
}
