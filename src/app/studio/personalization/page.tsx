"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Wand2, Rocket, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompanyStore } from "@/lib/store/company-store";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { AdCard } from "@/components/studio/ads/AdCard";

// Mock User Data for specific handles
const MOCK_X_USERS: Record<string, { name: string; role: string; avatar: string; interests: string[] }> = {
  "elonmusk": {
    name: "Elon Musk",
    role: "Everything App",
    avatar: "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
    interests: ["Mars", "Memes", "Engineering"]
  },
  "satyanadella": {
    name: "Satya Nadella",
    role: "CEO at Microsoft",
    avatar: "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg",
    interests: ["Cloud", "AI", "Accessibility"]
  },
  "default": {
    name: "X User",
    role: "Early Adopter",
    avatar: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    interests: ["Tech", "Startups", "Innovation"]
  }
};

export default function PersonalizationPage() {
  const { name, ads } = useCompanyStore();
  const [handle, setHandle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAd, setGeneratedAd] = useState<{ copy: string; user: typeof MOCK_X_USERS['default'] } | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);

  const baseAd = ads[0] || {
    imageSrc: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
  };

  const handlePersonalize = () => {
    if (!handle) return;
    setIsGenerating(true);
    setGeneratedAd(null);

    // Simulate API call and generation
    setTimeout(() => {
      const cleanHandle = handle.replace('@', '').toLowerCase();
      const user = MOCK_X_USERS[cleanHandle] || {
        ...MOCK_X_USERS['default'],
        name: `@${cleanHandle}`,
      };

      const copy = `Hey @${cleanHandle}, noticed you're interested in ${user.interests[0]}. ${name} is the perfect tool to help you achieve more. 🚀 #AI`;
      
      setGeneratedAd({ copy, user });
      setIsGenerating(false);
    }, 1500);
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

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {generatedAd && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto"
            >
              {/* User Context Card */}
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Target Profile</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={generatedAd.user.avatar} 
                      alt={generatedAd.user.name} 
                      className="w-16 h-16 rounded-full border-2 border-white/10"
                    />
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">{generatedAd.user.name}</div>
                      <div className="text-gray-500">{generatedAd.user.role}</div>
                    </div>
                 </div>
                 <div className="space-y-2">
                   <div className="text-sm text-gray-500">Detected Interests:</div>
                   <div className="flex flex-wrap gap-2">
                      {generatedAd.user.interests.map(i => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {i}
                        </span>
                      ))}
                   </div>
                 </div>
              </div>

              {/* Ad Card */}
              <div className="space-y-6">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0 md:text-right">Generated Creative</h3>
                 <AdCard
                    name={name || "Company"}
                    handle={(name || "company").toLowerCase().replace(/\s+/g, '')}
                    content={generatedAd.copy}
                    imageSrc={baseAd.imageSrc}
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

      </div>
    </div>
  );
}
