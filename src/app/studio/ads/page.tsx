"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStepNavigation } from "@/lib/hooks/use-step-navigation";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { AdCard } from "@/components/studio/ads/AdCard";
import type { Demographic, AdsData } from "@/backend/ads_schema";

interface Segment extends Demographic {
  id: string;
  image_url?: string;
}

// Segment Sidebar Item
function SegmentSidebarItem({
  segment,
  isActive,
  onClick
}: {
  segment: Segment;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-xl transition-all duration-300 ${
        isActive 
          ? "bg-white/70 dark:bg-white/15 backdrop-blur-xl border-2 border-[#007AFF] shadow-md" 
          : "bg-white/50 dark:bg-white/10 backdrop-blur-xl border-2 border-transparent hover:bg-white/60 dark:hover:bg-white/15 hover:border-gray-200 dark:hover:border-white/20"
      }`}
    >
      <div className="relative z-10">
        <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">{segment.header}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">{segment.age_range} · {segment.gender}</p>
      </div>
    </motion.button>
  );
}

export default function AdsPage() {
  const { goToNext } = useStepNavigation();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [activeSegmentId, setActiveSegmentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adsData = localStorage.getItem("adsData");
      const selectedSegments = localStorage.getItem("selectedSegments");
      const name = localStorage.getItem("companyName") || "Company";
      
      setCompanyName(name);

      if (!adsData || adsData === "null" || !selectedSegments) {
        window.location.href = "/studio/segments";
        return;
      }

      const parsedData: AdsData & { demographics: Array<Demographic & { image_url?: string }> } = JSON.parse(adsData);
      const selectedIds: string[] = JSON.parse(selectedSegments);

      // Transform demographics into segments and filter by selected
      const allSegments: Segment[] = parsedData.demographics.map((demo, index) => ({
        ...demo,
        id: String(index + 1)
      }));

      const filteredSegments = allSegments.filter(s => selectedIds.includes(s.id));
      setSegments(filteredSegments);
      setActiveSegmentId(filteredSegments[0]?.id || "");
      setIsLoading(false);
    }
  }, []);

  const activeSegment = segments.find((s) => s.id === activeSegmentId) || segments[0];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <Loader2 className="animate-spin h-12 w-12 text-[#007AFF]" />
        <p className="text-gray-500 dark:text-gray-400">Loading ads...</p>
      </div>
    );
  }

  if (segments.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-gray-500 dark:text-gray-400 mb-4">No segments selected</p>
        <Button
          onClick={() => window.location.href = "/studio/segments"}
          className="bg-[#007AFF] hover:bg-[#0051D5]"
        >
          Go Back
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
              Generated Campaigns
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              High-performing creative tailored for your target audiences.
            </p>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Segments */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-1 space-y-2"
          >
            {segments.map((segment) => (
              <SegmentSidebarItem
                key={segment.id}
                segment={segment}
                isActive={segment.id === activeSegmentId}
                onClick={() => setActiveSegmentId(segment.id)}
              />
            ))}
          </motion.div>

          {/* Right Content - Ads */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-3"
          >
            {/* Segment Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Targeting: {activeSegment?.header || "Segment"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activeSegment?.age_range} · {activeSegment?.geolocation} · {activeSegment?.gender}
              </p>
            </div>

            {/* Ad Card - Using the proper AdCard component */}
            <AnimatePresence mode="wait">
              {activeSegment && (
                <motion.div
                  key={activeSegmentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdCard
                    name={companyName}
                    handle={companyName.toLowerCase().replace(/\s+/g, '')}
                    content={activeSegment.tweet_text}
                    imageSrc={activeSegment.image_url}
                    verified={true}
                    stats={{
                      replies: "0",
                      reposts: "0",
                      likes: "0",
                      views: "0",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex justify-end"
            >
              <Button
                onClick={goToNext}
                size="lg"
                className="h-12 px-8 rounded-full bg-[#007AFF] hover:bg-[#0051D5] text-white shadow-lg shadow-blue-500/20 transition-all text-[15px] font-semibold"
              >
                Continue to Personalization <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
