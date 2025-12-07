"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, RefreshCw, CheckCircle2, Loader2, Users, Globe, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanyStore } from "@/lib/store/company-store";
import { useStepNavigation } from "@/lib/hooks/use-step-navigation";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import type { Demographic, AdsData } from "@/backend/ads_schema";

interface Segment extends Demographic {
  id: string;
  image_url?: string;
}

export default function SegmentsPage() {
  const { name, description, goal } = useCompanyStore();
  const { goToNext } = useStepNavigation();
  
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateAds = async () => {
      try {
        // Get company info from store or localStorage
        const companyName = name || localStorage.getItem("companyName");
        const companyDescription = description || localStorage.getItem("companyDescription");
        const campaignGoal = goal || localStorage.getItem("campaignGoal");

        if (!companyName || !companyDescription || !campaignGoal) {
          setError("Missing company information. Please start from the beginning.");
          setIsLoading(false);
          return;
        }

        // Save to localStorage for persistence
        localStorage.setItem("companyName", companyName);
        localStorage.setItem("companyDescription", companyDescription);
        localStorage.setItem("campaignGoal", campaignGoal);

        // Check if we already have ads data
        const cachedData = localStorage.getItem("adsData");
        if (cachedData && cachedData !== "null") {
          const adsData: AdsData & { demographics: Array<Demographic & { image_url?: string }> } = JSON.parse(cachedData);
          const transformedSegments: Segment[] = adsData.demographics.map((demo, index) => ({
            ...demo,
            id: String(index + 1)
          }));
          setSegments(transformedSegments);
          setSelectedIds(new Set(transformedSegments.map((s) => s.id)));
          setIsLoading(false);
          return;
        }

        // Call the API
        const response = await fetch("/api/generate-ads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName,
            description: companyDescription,
            goal: campaignGoal
          })
        });

        if (!response.ok) {
          throw new Error("Failed to generate ads");
        }

        const adsData: AdsData & { demographics: Array<Demographic & { image_url?: string }> } = await response.json();

        // Store the ads data
        localStorage.setItem("adsData", JSON.stringify(adsData));

        // Transform demographics into segments
        const transformedSegments: Segment[] = adsData.demographics.map((demo, index) => ({
          ...demo,
          id: String(index + 1)
        }));

        setSegments(transformedSegments);
        setSelectedIds(new Set(transformedSegments.map((s) => s.id)));
      } catch (err: any) {
        setError(err.message || "Failed to generate segments");
      } finally {
        setIsLoading(false);
      }
    };

    generateAds();
  }, [name, description, goal]);

  const toggleSegment = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    localStorage.setItem("adsData", "null");

    try {
      const companyName = name || localStorage.getItem("companyName");
      const companyDescription = description || localStorage.getItem("companyDescription");
      const campaignGoal = goal || localStorage.getItem("campaignGoal");

      const response = await fetch("/api/generate-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          description: companyDescription,
          goal: campaignGoal
        })
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate ads");
      }

      const adsData: AdsData & { demographics: Array<Demographic & { image_url?: string }> } = await response.json();
      localStorage.setItem("adsData", JSON.stringify(adsData));

      const transformedSegments: Segment[] = adsData.demographics.map((demo, index) => ({
        ...demo,
        id: String(index + 1)
      }));

      setSegments(transformedSegments);
      setSelectedIds(new Set(transformedSegments.map((s) => s.id)));
    } catch (err: any) {
      setError(err.message || "Failed to regenerate segments");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleContinue = () => {
    localStorage.setItem("selectedSegments", JSON.stringify(Array.from(selectedIds)));
    goToNext();
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#007AFF]/30 border-t-[#007AFF] animate-spin" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Grok is analyzing market data...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This may take a moment
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-lg text-red-500">{error}</p>
        <Button
          onClick={() => window.location.href = "/studio/company/name"}
          className="bg-[#007AFF] hover:bg-[#0051D5]"
        >
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 md:p-12 min-h-[60vh] flex flex-col">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Audience Segments
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {segments.length} segments generated by Grok. Select the ones you want to target.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="gap-2 bg-white/60 dark:bg-white/10 border-gray-300 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20"
          >
            <RefreshCw size={14} className={isRegenerating ? "animate-spin" : ""} />
            Regenerate
          </Button>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {segments.map((segment) => {
            const isSelected = selectedIds.has(segment.id);

            return (
              <motion.div
                key={segment.id}
                variants={fadeInUp}
                onClick={() => toggleSegment(segment.id)}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                className={`
                  relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group
                  ${isSelected 
                    ? "bg-white/80 dark:bg-white/20 backdrop-blur-xl border-[#007AFF] shadow-lg shadow-blue-500/10" 
                    : "bg-white/60 dark:bg-white/10 backdrop-blur-xl border-white/30 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/30 hover:bg-white/70 dark:hover:bg-white/15"
                  }
                `}
              >
                {/* Selected checkmark */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center shadow-md">
                        <CheckCircle2 size={20} className="text-white" fill="white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pr-10">
                  {segment.header}
                </h3>

                {/* Metadata with icons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20 flex items-center gap-1.5">
                    <Users size={12} />
                    {segment.age_range}
                  </span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20 flex items-center gap-1.5">
                    <Globe size={12} />
                    {segment.geolocation}
                  </span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/20 flex items-center gap-1.5">
                    <Target size={12} />
                    {segment.gender}
                  </span>
                </div>

                {/* Tweet Preview */}
                <div className="p-3 rounded-lg bg-white/40 dark:bg-black/20 border border-white/30 dark:border-white/10">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
                    {segment.tweet_text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end pt-8 border-t border-gray-200 dark:border-white/10"
        >
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500 dark:text-gray-400">
               {selectedIds.size} selected
             </span>
             <Button
                onClick={handleContinue}
                disabled={selectedIds.size === 0}
                size="lg"
                className="h-12 px-8 rounded-full bg-[#007AFF] hover:bg-[#0051D5] text-white shadow-lg shadow-blue-500/20 transition-all text-[15px] font-semibold"
              >
                Generate Ads <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
