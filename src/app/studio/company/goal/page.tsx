"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCompanyStore } from "@/lib/store/company-store";
import { useStepNavigation } from "@/lib/hooks/use-step-navigation";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { useState } from "react";

const EXAMPLE_GOALS = [
  "Launch awareness ads for our AI note-taker",
  "Drive signups for Solana data marketplace",
  "Promote our new SaaS product launch",
  "Increase downloads for mobile app"
];

export default function CompanyGoalPage() {
  const { name, description, goal, setGoal } = useCompanyStore();
  const { goToNext } = useStepNavigation();
  const [isTyping, setIsTyping] = useState(false);

  const handleContinue = () => {
    if (!goal.trim()) return;
    // Save to localStorage for API access
    localStorage.setItem("campaignGoal", goal);
    // Clear cached ads data so new data is generated
    localStorage.setItem("adsData", "null");
    goToNext();
  };

  const companyData = {
    company: {
      name,
      description,
      campaign_goal: goal
    },
    status: "ready_for_segmentation"
  };

  return (
    <div className="px-4 py-8 md:p-12 min-h-[60vh] flex flex-col justify-center">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Column: Input */}
        <div className="space-y-8">
          <motion.div variants={fadeInUp} className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-[#007AFF] mb-4">
               <Target size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              What do you want to create?
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Describe the specific campaign or ads you want Grok to generate.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="relative group">
              <Textarea
                autoFocus
                placeholder="e.g. Launch awareness ads for our AI note-taker"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                  setIsTyping(true);
                  setTimeout(() => setIsTyping(false), 1000);
                }}
                className="min-h-[160px] text-lg p-6 rounded-2xl bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-[#007AFF] focus-visible:border-[#007AFF] shadow-sm resize-none leading-relaxed"
              />
              {/* Typing Indicator */}
              <div className="absolute bottom-4 right-4">
                 {isTyping ? (
                   <span className="flex items-center gap-2 text-xs text-[#007AFF] font-medium animate-pulse">
                     <Sparkles size={12} /> Grok is listening...
                   </span>
                 ) : (
                   <span className="text-xs text-gray-400 font-medium">
                     {goal.length} chars
                   </span>
                 )}
              </div>
            </div>

            {/* Example Goals */}
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_GOALS.map((example) => (
                  <button
                    key={example}
                    onClick={() => setGoal(example)}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!goal.trim()}
              size="lg"
              className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-[15px] font-semibold"
            >
              Continue to Segments
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Right Column: JSON Preview */}
        <motion.div 
          variants={fadeInUp}
          className="hidden lg:block sticky top-8"
        >
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-lg relative overflow-hidden min-h-[400px]">
             {/* Decorative BG */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/5 to-purple-500/5 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col h-full">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">Context Snapshot</span>
                 </div>
                 <span className="text-xs text-gray-400">JSON</span>
               </div>

               <div className="flex-1 p-4 rounded-xl bg-[#1e1e1e] border border-white/10 overflow-auto text-xs font-mono text-gray-300 leading-relaxed">
                 <pre className="whitespace-pre-wrap">
{JSON.stringify(companyData, null, 2)}
                 </pre>
               </div>
               
               <div className="mt-4 text-center">
                 <p className="text-xs text-gray-400">
                   Next: Grok will generate 10-15 segments based on this data.
                 </p>
               </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
