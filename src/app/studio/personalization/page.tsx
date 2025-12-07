"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Wand2, Rocket, AtSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompanyStore } from "@/lib/store/company-store";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { AdCard } from "@/components/studio/ads/AdCard";
import type { XPersonalizedAdsData } from "@/backend/x_personalized_ads_schema";

interface PersonalizedAdResult extends XPersonalizedAdsData {
  image_url?: string;
  x_user_info?: {
    profile: {
      name: string;
      username: string;
      description: string;
      profile_image_url?: string;
      verified?: boolean;
    };
  };
}

export default function PersonalizationPage() {
  const { name } = useCompanyStore();
  const [handle, setHandle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAd, setGeneratedAd] = useState<PersonalizedAdResult | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalize = async () => {
    if (!handle.trim()) return;
    
    setIsGenerating(true);
    setGeneratedAd(null);
    setError(null);

    try {
      // Get company info from store or localStorage (same pattern as segments page)
      const companyName = name || localStorage.getItem("companyName");
      const companyDescription = localStorage.getItem("companyDescription");
      const campaignGoal = localStorage.getItem("campaignGoal");

      if (!companyName || !companyDescription || !campaignGoal) {
        setError("Missing company information. Please start from the beginning.");
        setIsGenerating(false);
        return;
      }

      // Clean the handle (remove @ if present)
      const cleanHandle = handle.replace(/^@/, "");

      // Call the API
      const response = await fetch("/api/generate-personalized-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xHandle: cleanHandle,
          companyName,
          description: companyDescription,
          goal: campaignGoal
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate personalized ad");
      }

      const result: PersonalizedAdResult = await response.json();
      setGeneratedAd(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate personalized ad");
      console.error("Error generating personalized ad:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  if (isLaunched) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full bg-[#007AFF] flex items-center justify-center shadow-lg shadow-blue-500/40">
            <Rocket size={40} className="text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-[#007AFF] rounded-full -z-10"
          />
        </motion.div>
        
        <div className="space-y-4 max-w-lg">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Campaign Launched!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
             Personalized ads are now being served to your target audience on X.
          </p>
        </div>

        <Button 
          variant="outline"
          className="mt-8 border-gray-200 dark:border-white/10"
          onClick={() => window.location.href = '/'}
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 md:p-12 min-h-[60vh] flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Who do you want to target?
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Enter an X handle to see how Grok personalizes the ad copy specifically for them based on their public profile.
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="max-w-xl mx-auto w-full relative"
        >
          <div className="relative flex items-center">
            <AtSign className="absolute left-4 text-gray-400" size={20} />
            <Input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="elonmusk"
              className="pl-12 h-14 rounded-full bg-white/60 dark:bg-white/5 border-gray-200 dark:border-white/10 text-lg shadow-sm focus-visible:ring-[#007AFF]"
              onKeyDown={(e) => e.key === 'Enter' && handlePersonalize()}
            />
            <Button
              onClick={handlePersonalize}
              disabled={!handle || isGenerating}
              className="absolute right-2 h-10 rounded-full px-6 bg-[#007AFF] hover:bg-[#0051D5] text-white"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Personalize"
              )}
            </Button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto w-full"
          >
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {generatedAd && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto"
            >
              {/* Product Context Card */}
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Product Context</h3>
                 <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                   {generatedAd.product_context}
                 </p>
              </div>

              {/* Ad Card */}
              <div className="space-y-6">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0 md:text-right">Generated Creative</h3>
                 <AdCard
                    name={name || localStorage.getItem("companyName") || "Company"}
                    handle={(name || localStorage.getItem("companyName") || "company").toLowerCase().replace(/\s+/g, '')}
                    content={generatedAd.tweet_text}
                    imageSrc={generatedAd.image_url || "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60"}
                    verified={true}
                    stats={{
                      replies: "0",
                      reposts: "0",
                      likes: "0",
                      views: "0",
                    }}
                  />
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleLaunch}
                      size="lg"
                      className="w-full md:w-auto h-12 px-8 rounded-full bg-[#007AFF] hover:bg-[#0051D5] text-white shadow-lg shadow-blue-500/20 font-semibold"
                    >
                      <Rocket className="mr-2 w-4 h-4" />
                      Launch This Ad
                    </Button>
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto w-full text-center space-y-4 py-12"
          >
            <Loader2 className="animate-spin h-12 w-12 text-[#007AFF] mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">
              Grok is analyzing {handle.replace(/^@/, "")}'s profile and generating a personalized ad...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              This may take a moment
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
