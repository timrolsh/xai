"use client";

import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  AtSign,
  ExternalLink,
  Sparkles,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Flame,
  BarChart3,
  MessageCircle,
  Rocket,
  Check,
  Download
} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {MainStepper} from "@/components/StudioStepper";

// Animation variants
const fadeInUp = {
  hidden: {opacity: 0, y: 30, filter: "blur(10px)"},
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {duration: 0.6, ease: "easeOut" as const}
  }
};

const staggerContainer = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const slideInLeft = {
  hidden: {opacity: 0, x: -30},
  visible: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.5, ease: "easeOut" as const}
  }
};

const slideInRight = {
  hidden: {opacity: 0, x: 30},
  visible: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.5, ease: "easeOut" as const, delay: 0.2}
  }
};

const pulseWave = {
  animate: {
    scaleY: [1, 1.5, 1, 2, 1, 1.3, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// Types
interface MicroPersona {
  topInterests: string[];
  engagementPattern: string[];
  communicationStyle: string[];
}

interface PersonalizedAd {
  companyName: string;
  handle: string;
  targetHandle: string;
  timeAgo: string;
  copy: string;
  hashtags: string[];
  previewImage: string;
  imageLabel: string;
  reasoning: string[];
}

// Mock personalized ad for @elonmusk
const mockPersona: MicroPersona = {
  topInterests: ["Rockets", "Memes", "AI", "Mars"],
  engagementPattern: ["High Frequency", "Shitposty", "Direct"],
  communicationStyle: ["Humorous", "Visionary", "Unfiltered"]
};

const mockPersonalizedAd: PersonalizedAd = {
  companyName: "Nebula AI",
  handle: "@NebulaAI",
  targetHandle: "@elonmusk",
  timeAgo: "1h",
  copy: "Yo @elonmusk, heard you like shipping rockets & memes. 🚀 Our AI writes code faster than you tweet. Stop writing boilerplate, start building the future.",
  hashtags: ["#AI", "#Mars", "#DogeDeveloper"],
  previewImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&auto=format&fit=crop&q=60",
  imageLabel: "Builder-core",
  reasoning: [
    "Based on recent interest in AI development",
    "References to space exploration & engineering",
    "Matches 'Builder-core' tone with meme culture nods"
  ]
};

// Navigation Component
function StudioNavigation() {
  return (
    <motion.nav
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6, delay: 0.1}}
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-[rgba(12,18,34,0.7)] backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-gothic text-xl tracking-wide text-white">Grok Ads Studio</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 rounded-full border border-white/10">
            xAI Hackathon · Ads Track
          </span>
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
          >
            View API Docs
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// Micro-Persona Card
function PersonaCard({
  icon,
  title,
  values,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  values: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay}}
      className="relative group"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{padding: "1px"}} />
      
      <div className="relative rounded-xl p-4 bg-[rgba(17,24,39,0.95)]" style={{margin: "1px"}}>
        <div className="text-cyan-400 mb-2">{icon}</div>
        <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{values.join(", ")}</p>
      </div>
    </motion.div>
  );
}

// Audio Wave Animation Component
function AudioWave({isAnimating}: {isAnimating: boolean}) {
  const bars = 12;
  
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({length: bars}).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-white/80 rounded-full"
          style={{height: "100%"}}
          animate={
            isAnimating
              ? {
                  scaleY: [0.3, Math.random() * 0.7 + 0.3, 0.3],
                  transition: {
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }
                }
              : {scaleY: 0.3}
          }
        />
      ))}
    </div>
  );
}

// Personalized Ad Preview Card
function PersonalizedAdCard({
  ad,
  persona,
  isVisible
}: {
  ad: PersonalizedAd | null;
  persona: MicroPersona | null;
  isVisible: boolean;
}) {
  const [showReasoning, setShowReasoning] = useState(true);

  if (!isVisible || !ad) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-gray-500">
        <Sparkles size={48} className="mb-4 opacity-50" />
        <p className="text-center">Enter an X handle and generate<br />to see your personalized ad</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.95}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.5}}
      className="space-y-4"
    >
      {/* Ad Card */}
      <div className="relative">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 opacity-70" style={{padding: "1px"}} />
        
        <div className="relative rounded-2xl p-5 bg-[rgba(17,24,39,0.95)]" style={{margin: "1px"}}>
          {/* Header row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">{ad.companyName.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-gothic text-lg text-white">{ad.companyName}</span>
                <span className="text-gray-500 text-sm">{ad.handle}</span>
                <span className="text-gray-600 text-sm">·</span>
                <span className="text-gray-500 text-sm">{ad.timeAgo}</span>
              </div>
            </div>
          </div>

          {/* Ad copy with highlighted mention */}
          <p className="text-white text-[15px] leading-relaxed mb-2">
            Yo <span className="text-cyan-400">{ad.targetHandle}</span>, {ad.copy.split(ad.targetHandle + ", ")[1] || ad.copy}{" "}
            <span className="text-cyan-400">{ad.hashtags.join(" ")}</span>
          </p>

          {/* Image preview */}
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
            <div className="relative aspect-[16/9] overflow-hidden">
              {/* Image label */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                <LinkIcon size={10} className="text-gray-400" />
                <span className="text-xs text-gray-300">{ad.imageLabel}</span>
              </div>
              <img
                src={ad.previewImage}
                alt="Personalized ad preview"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-t border-white/10">
              <LinkIcon size={12} className="text-gray-500" />
              <span className="text-xs text-gray-500">Link preview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why this ad section */}
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3}}
        className="glass-lighter rounded-xl overflow-hidden"
      >
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-white">Why this ad?</span>
          {showReasoning ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
        
        <AnimatePresence>
          {showReasoning && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: "auto", opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.2}}
              className="overflow-hidden"
            >
              <ul className="px-4 pb-4 space-y-2">
                {ad.reasoning.map((reason, i) => (
                  <motion.li
                    key={i}
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: i * 0.1}}
                    className="flex items-start gap-2 text-sm text-gray-400"
                  >
                    <span className="text-cyan-400 mt-0.5">•</span>
                    {reason}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Main Page Component
export default function PersonalizationPage() {
  const router = useRouter();
  const [xHandle, setXHandle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<MicroPersona | null>(null);
  const [currentAd, setCurrentAd] = useState<PersonalizedAd | null>(null);

  const handleGenerate = () => {
    if (!xHandle.trim()) return;
    
    setIsGenerating(true);
    setShowPreview(false);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentPersona(mockPersona);
      setCurrentAd({
        ...mockPersonalizedAd,
        targetHandle: xHandle.startsWith("@") ? xHandle : `@${xHandle}`,
        copy: `Yo ${xHandle.startsWith("@") ? xHandle : `@${xHandle}`}, heard you like shipping rockets & memes. 🚀 Our AI writes code faster than you tweet. Stop writing boilerplate, start building the future.`
      });
      setIsGenerating(false);
      setShowPreview(true);
    }, 2500);
  };

  const handleFinish = () => {
    // Could download results or redirect
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,7,18,0.9)] via-[rgba(3,7,18,0.85)] to-[rgba(3,7,18,0.98)]" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div
            className="absolute top-20 right-1/4 w-[500px] h-[350px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{animationDelay: "1s"}}
          />
        </div>
      </div>

      <StudioNavigation />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stepper */}
          <div className="flex justify-center mb-8">
            <MainStepper currentMainStep={4} currentSubStep={1} />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Input & Persona */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="glass rounded-2xl p-6 md:p-8"
            >
              {/* Title */}
              <h1 className="font-gothic text-2xl md:text-3xl text-white mb-6">
                What would the ad look like for me?
              </h1>

              {/* X Handle Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  X handle
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <AtSign size={18} />
                  </div>
                  <input
                    type="text"
                    value={xHandle}
                    onChange={(e) => setXHandle(e.target.value)}
                    placeholder="username"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Micro-Persona Analysis */}
              <AnimatePresence>
                {showPreview && currentPersona && (
                  <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.3}}
                    className="mb-6"
                  >
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Sparkles size={14} className="text-cyan-400" />
                      Grok&apos;s Micro-Persona Analysis
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <PersonaCard
                        icon={<Flame size={18} />}
                        title="Top Interests"
                        values={currentPersona.topInterests}
                        delay={0}
                      />
                      <PersonaCard
                        icon={<BarChart3 size={18} />}
                        title="Engagement Pattern"
                        values={currentPersona.engagementPattern}
                        delay={0.1}
                      />
                      <PersonaCard
                        icon={<MessageCircle size={18} />}
                        title="Communication Style"
                        values={currentPersona.communicationStyle}
                        delay={0.2}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate Button */}
              <motion.button
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                onClick={handleGenerate}
                disabled={isGenerating || !xHandle.trim()}
                className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all ${
                  xHandle.trim()
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
              >
                {isGenerating ? (
                  <>
                    <span>Analyzing X profile...</span>
                    <AudioWave isAnimating={true} />
                  </>
                ) : (
                  <>
                    <span>Generate personalized ad</span>
                    <AudioWave isAnimating={false} />
                  </>
                )}
              </motion.button>

              {/* Helper text */}
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                We analyze public X data to build a dynamic micro-persona for this handle, then craft the perfect creative.
              </p>
            </motion.div>

            {/* Right Column - Preview */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="glass rounded-2xl p-6 md:p-8"
            >
              <h2 className="font-gothic text-2xl md:text-3xl text-white mb-6">
                Personalized Ad Preview
              </h2>

              <PersonalizedAdCard
                ad={currentAd}
                persona={currentPersona}
                isVisible={showPreview}
              />
            </motion.div>
          </div>

          {/* Bottom Actions */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.6}}
            className="mt-8 flex justify-center gap-4"
          >
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              onClick={handleFinish}
              className="px-8 py-3 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400"
            >
              <Check size={18} />
              Finish & Export Campaign
            </motion.button>
            
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              className="px-6 py-3 text-sm font-medium rounded-xl flex items-center gap-2 transition-all bg-white/5 border border-white/10 hover:bg-white/10 text-white"
            >
              <Download size={16} />
              Download All
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

