"use client";

import { motion } from "framer-motion";
import { Building2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GrokopediaToggle } from "@/components/studio/company/GrokopediaToggle";
import { useCompanyStore } from "@/lib/store/company-store";
import { useStepNavigation } from "@/lib/hooks/use-step-navigation";
import { fetchGrokopedia } from "@/lib/api/grok";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export default function CompanyNamePage() {
  const { 
    name, 
    setName, 
    useGrokopedia, 
    toggleGrokopedia, 
    setGrokopediaData,
    setIsLoading,
    isLoading
  } = useCompanyStore();
  
  const { goToNext } = useStepNavigation();
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!name.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const data = await fetchGrokopedia(name);
      setGrokopediaData(data);
    } catch (err) {
      setError("Failed to fetch company data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter a company name");
      return;
    }
    // Save to localStorage for API access
    localStorage.setItem("companyName", name);
    goToNext();
  };

  return (
    <div className="px-4 py-8 md:p-12 min-h-[60vh] flex flex-col justify-center">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-2xl mx-auto w-full space-y-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-[#007AFF] mb-4">
             <Building2 size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            What company is this for?
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Grok will analyze your brand to generate tailored audiences and creatives.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-3">
            <div className="relative group">
              <Input
                id="company-name"
                autoFocus
                placeholder="Company Name (e.g. Tesla, Notion)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                className="pl-6 h-16 text-xl rounded-2xl transition-all bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-[#007AFF] focus-visible:border-[#007AFF] shadow-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                {isLoading && <Loader2 size={20} className="animate-spin text-[#007AFF]" />}
              </div>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm pl-2 font-medium">
                {error}
              </motion.p>
            )}
          </div>

          <GrokopediaToggle 
            checked={useGrokopedia}
            onCheckedChange={toggleGrokopedia}
          />

          {/* Grokopedia Fetch Action */}
          {useGrokopedia && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden pt-2"
            >
              <Button
                onClick={handleFetch}
                disabled={isLoading || !name.trim()}
                variant="outline"
                className="w-full h-14 rounded-2xl border-dashed border-gray-300 dark:border-white/20 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 text-[#007AFF] justify-center gap-2 group text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyzing Brand Context...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="group-hover:text-[#0051D5] transition-colors" />
                    Auto-fill details from Grokopedia
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Actions */}
        <motion.div variants={fadeInUp} className="pt-8 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
          <span className="text-sm text-gray-400 font-medium">
            1 / 4
          </span>
          <Button
            onClick={handleContinue}
            disabled={!name.trim()}
            size="lg"
            className="h-14 px-10 bg-[#007AFF] hover:bg-[#0051D5] text-white rounded-full shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 text-[15px] font-semibold"
          >
            Continue
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
