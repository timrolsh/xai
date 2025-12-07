"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCompanyStore } from "@/lib/store/company-store";
import { useStepNavigation } from "@/lib/hooks/use-step-navigation";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { useEffect, useState } from "react";

export default function CompanyDescriptionPage() {
  const { description, setDescription, grokopediaData } = useCompanyStore();
  const { goToNext } = useStepNavigation();
  const [isTyping, setIsTyping] = useState(false);

  // Auto-fill from Grokopedia if available and description is empty
  useEffect(() => {
    if (grokopediaData && !description) {
      setDescription(grokopediaData.description || "");
    }
  }, [grokopediaData, description, setDescription]);

  const handleContinue = () => {
    if (!description.trim()) return;
    // Save to localStorage for API access
    localStorage.setItem("companyDescription", description);
    goToNext();
  };

  return (
    <div className="px-4 py-8 md:p-12 min-h-[60vh] flex flex-col justify-center">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
      >
        {/* Left Column: Input */}
        <div className="space-y-8">
          <motion.div variants={fadeInUp} className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-[#007AFF] mb-4">
               <FileText size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Describe your product
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              What are you selling? Who is it for? What makes it unique?
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="relative group">
              <Textarea
                autoFocus
                placeholder="e.g. We build autonomous drones for underwater pipeline inspection. Our main customers are oil & gas companies..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsTyping(true);
                  setTimeout(() => setIsTyping(false), 1000);
                }}
                className="min-h-[240px] text-lg p-6 rounded-2xl bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-[#007AFF] focus-visible:border-[#007AFF] shadow-sm resize-none leading-relaxed"
              />
              {/* Typing Indicator */}
              <div className="absolute bottom-4 right-4">
                 {isTyping ? (
                   <span className="flex items-center gap-2 text-xs text-[#007AFF] font-medium animate-pulse">
                     <Sparkles size={12} /> Grok is listening...
                   </span>
                 ) : (
                   <span className="text-xs text-gray-400 font-medium">
                     {description.length} chars
                   </span>
                 )}
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!description.trim()}
              size="lg"
              className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-[15px] font-semibold"
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Live Snapshot (Glass Card) */}
        <motion.div 
          variants={fadeInUp}
          className="hidden lg:block"
        >
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-lg relative overflow-hidden">
             {/* Decorative BG */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/5 to-purple-500/5 pointer-events-none" />
             
             <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-2 mb-6">
                 <Sparkles size={16} className="text-[#007AFF]" />
                 <span className="text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">Live Grok Analysis</span>
               </div>

               {/* Dynamic Chips based on text length/content */}
               <div className="space-y-6">
                 <AnalysisItem 
                   icon={<Target className="text-emerald-500" size={20} />}
                   label="Target Audience"
                   value={description.length > 20 ? "Identified" : "Waiting for input..."}
                   active={description.length > 20}
                 />
                 <AnalysisItem 
                   icon={<Zap className="text-amber-500" size={20} />}
                   label="Key Selling Point"
                   value={description.length > 50 ? "Extracted" : "Waiting for input..."}
                   active={description.length > 50}
                 />
                 <AnalysisItem 
                   icon={<Sparkles className="text-purple-500" size={20} />}
                   label="Brand Tone"
                   value={description.length > 10 ? "Analyzing..." : "Waiting..."}
                   active={description.length > 10}
                 />
               </div>

               {/* Mock JSON Preview */}
               <div className="mt-8 p-4 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 font-mono text-xs text-gray-600 dark:text-gray-400">
                 <p className="opacity-50">{"{"}</p>
                 <p className="pl-4">"context_depth": <span className="text-[#007AFF]">{Math.min(100, Math.floor(description.length / 2))}%</span>,</p>
                 <p className="pl-4">"ready_for_ads": <span className={description.length > 50 ? "text-emerald-500" : "text-red-500"}>{description.length > 50 ? "true" : "false"}</span></p>
                 <p className="opacity-50">{"}"}</p>
               </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AnalysisItem({ icon, label, value, active }: { icon: any, label: string, value: string, active: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl transition-colors duration-300 ${active ? "bg-white/60 dark:bg-white/10" : "opacity-50"}`}>
      <div className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
      {active && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-[#007AFF]">
          <div className="w-2 h-2 rounded-full bg-current" />
        </motion.div>
      )}
    </div>
  );
}

