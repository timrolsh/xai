"use client";

import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Sparkles
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
    transition: {duration: 0.5, ease: "easeOut" as const, delay: 0.1}
  }
};

// Types
interface Segment {
  id: string;
  name: string;
  funnelStage: string;
  color: "cyan" | "purple" | "pink" | "emerald";
}

interface Ad {
  id: string;
  segmentId: string;
  companyName: string;
  handle: string;
  timeAgo: string;
  copy: string;
  hashtags: string[];
  imagePrompt: string;
  previewImage: string;
}

// Mock data
const mockSegments: Segment[] = [
  {id: "1", name: "Gen Z AI Builders", funnelStage: "Awareness", color: "cyan"},
  {id: "2", name: "B2B Marketing Leads", funnelStage: "Decision", color: "purple"},
  {id: "3", name: "Crypto Founders", funnelStage: "Decision", color: "pink"},
  {id: "5", name: "SaaS Growth Hackers", funnelStage: "Decision", color: "emerald"}
];

const mockAds: Ad[] = [
  {
    id: "1a",
    segmentId: "1",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "1h",
    copy: "Ship faster with AI that understands your codebase. 🚀 No more boilerplate, just pure building. Try the beta now.",
    hashtags: ["#AI", "#DevTools", "#GenZBuilders"],
    imagePrompt: "A futuristic coding workspace with holographic code floating in the air, neon cyan and purple accents, dark background, minimal and sleek aesthetic",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "1b",
    segmentId: "1",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "1h",
    copy: "Your code, supercharged. 💡 Nebula AI writes, reviews, and deploys—so you can focus on what matters. Join the waitlist.",
    hashtags: ["#AI", "#DevTools", "#GenZBuilders"],
    imagePrompt: "Abstract visualization of neural networks connecting code blocks, gradient from cyan to purple, futuristic tech aesthetic",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "1c",
    segmentId: "1",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "1h",
    copy: "Stop writing boilerplate. Start shipping products. ⚡ Nebula AI is the copilot that actually gets your stack.",
    hashtags: ["#AI", "#Startups", "#BuildInPublic"],
    imagePrompt: "Rocket launching from a laptop screen, particle effects, dark mode UI elements, startup vibes",
    previewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "2a",
    segmentId: "2",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "2h",
    copy: "Marketing teams are shipping 3x faster with AI-powered content generation. See how Nebula AI transforms your workflow.",
    hashtags: ["#B2B", "#MarTech", "#AIMarketing"],
    imagePrompt: "Professional dashboard showing marketing analytics with AI suggestions, clean enterprise UI, blue and white color scheme",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "2b",
    segmentId: "2",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "2h",
    copy: "From brief to campaign in minutes, not weeks. 📊 Nebula AI helps marketing teams scale content without scaling headcount.",
    hashtags: ["#B2B", "#ContentMarketing", "#Efficiency"],
    imagePrompt: "Time-lapse visualization of content creation, professional marketing team silhouettes, productivity graphs",
    previewImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "3a",
    segmentId: "3",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "3h",
    copy: "Building the next DeFi protocol? 🔗 Nebula AI audits smart contracts and generates secure code. Web3-native AI for crypto builders.",
    hashtags: ["#Web3", "#DeFi", "#CryptoBuilders"],
    imagePrompt: "Blockchain network visualization with glowing nodes, crypto aesthetic, dark purple and gold accents",
    previewImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "5a",
    segmentId: "5",
    companyName: "Nebula AI",
    handle: "@NebulaAI",
    timeAgo: "4h",
    copy: "PLG metrics up 40% with AI-driven onboarding. 📈 Nebula AI helps SaaS teams convert users into power users.",
    hashtags: ["#SaaS", "#PLG", "#GrowthHacking"],
    imagePrompt: "Growth chart ascending with rocket trajectory, SaaS dashboard elements, green success indicators",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
  }
];

// Color map
const colorMap = {
  cyan: {
    border: "from-cyan-400 to-cyan-600",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20"
  },
  purple: {
    border: "from-purple-400 to-purple-600",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "shadow-purple-500/20"
  },
  pink: {
    border: "from-pink-400 to-pink-600",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    glow: "shadow-pink-500/20"
  },
  emerald: {
    border: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20"
  }
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
  const colors = colorMap[segment.color];

  return (
    <motion.button
      variants={slideInLeft}
      whileHover={{x: 4}}
      whileTap={{scale: 0.98}}
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-xl transition-all duration-300 ${
        isActive ? "bg-white/5" : "hover:bg-white/5"
      }`}
    >
      {/* Gradient border */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.border} transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{padding: "1px"}}
      >
        <div className="absolute inset-[1px] rounded-xl bg-[#0c1222]" />
      </div>

      <div className="relative z-10">
        <h3 className="font-gothic text-lg text-white mb-1">{segment.name}</h3>
        <p className="text-xs text-gray-500">Funnel Stage</p>
      </div>
    </motion.button>
  );
}

// X/Twitter Style Ad Card
function AdCard({
  ad,
  index,
  color
}: {
  ad: Ad;
  index: number;
  color: "cyan" | "purple" | "pink" | "emerald";
}) {
  const [showImagePrompt, setShowImagePrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const colors = colorMap[color];

  const handleCopy = async () => {
    const fullText = `${ad.copy} ${ad.hashtags.join(" ")}`;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: index * 0.1}}
      className="relative group"
    >
      {/* Gradient border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.border} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
        style={{padding: "1px"}}
      />

      {/* Card content */}
      <div
        className="relative rounded-2xl p-5 bg-[rgba(17,24,39,0.95)]"
        style={{margin: "1px"}}
      >
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          {/* Profile pic */}
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.border} flex items-center justify-center shrink-0`}>
            <span className="text-white font-bold text-sm">{ad.companyName.charAt(0)}</span>
          </div>

          {/* Name and handle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-gothic text-lg text-white">{ad.companyName}</span>
              <span className="text-gray-500 text-sm">{ad.handle}</span>
              <span className="text-gray-600 text-sm">·</span>
              <span className="text-gray-500 text-sm">{ad.timeAgo}</span>
            </div>
          </div>

          {/* Copy button */}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} className="text-gray-500" />
            )}
          </motion.button>
        </div>

        {/* Ad copy */}
        <p className="text-white text-[15px] leading-relaxed mb-2">
          {ad.copy}{" "}
          <span className={colors.text}>{ad.hashtags.join(" ")}</span>
        </p>

        {/* Link preview */}
        <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
            <LinkIcon size={12} className="text-gray-500" />
            <span className="text-xs text-gray-500">Link preview</span>
          </div>
          <div className="aspect-[2/1] relative overflow-hidden">
            <img
              src={ad.previewImage}
              alt="Ad preview"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay on image */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
            <div className={`absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l ${colors.border} opacity-30`} />
          </div>
        </div>

        {/* Image prompt expander */}
        <button
          onClick={() => setShowImagePrompt(!showImagePrompt)}
          className="flex items-center gap-2 mt-3 text-sm text-gray-500 hover:text-gray-400 transition-colors"
        >
          {showImagePrompt ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          View suggested image prompt
        </button>

        <AnimatePresence>
          {showImagePrompt && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: "auto", opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.2}}
              className="overflow-hidden"
            >
              <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-2">
                  <Sparkles size={14} className={colors.text + " mt-0.5 shrink-0"} />
                  <p className="text-xs text-gray-400 leading-relaxed">{ad.imagePrompt}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function AdsPage() {
  const router = useRouter();
  const [segments] = useState<Segment[]>(mockSegments);
  const [activeSegmentId, setActiveSegmentId] = useState<string>("1");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [allCopied, setAllCopied] = useState(false);

  const activeSegment = segments.find((s) => s.id === activeSegmentId) || segments[0];
  const activeAds = mockAds.filter((ad) => ad.segmentId === activeSegmentId);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 2000);
  };

  const handleCopyAll = async () => {
    const allText = activeAds
      .map((ad) => `${ad.copy} ${ad.hashtags.join(" ")}`)
      .join("\n\n---\n\n");
    await navigator.clipboard.writeText(allText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const handleContinue = () => {
    router.push("/studio/personalization");
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
        <div className="max-w-7xl mx-auto">
          {/* Stepper */}
          <div className="flex justify-center mb-8">
            <MainStepper currentMainStep={3} currentSubStep={1} />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Segments */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
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
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="font-gothic text-2xl md:text-3xl text-white">
                  Ads for {activeSegment.name}
                </h1>

                <div className="flex items-center gap-3">
                  {/* Regenerate button */}
                  <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="px-4 py-2 text-sm font-medium rounded-xl flex items-center gap-2 transition-all bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  >
                    <RefreshCw size={14} className={isRegenerating ? "animate-spin" : ""} />
                    Regenerate ads
                  </motion.button>

                  {/* Copy all button */}
                  <motion.button
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    onClick={handleCopyAll}
                    className="px-4 py-2 text-sm font-medium rounded-xl flex items-center gap-2 transition-all bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  >
                    {allCopied ? (
                      <>
                        <Check size={14} className="text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy all ads
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Ads Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSegmentId}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -20}}
                  transition={{duration: 0.3}}
                  className="space-y-4"
                >
                  {activeAds.length > 0 ? (
                    activeAds.map((ad, index) => (
                      <AdCard
                        key={ad.id}
                        ad={ad}
                        index={index}
                        color={activeSegment.color}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p>No ads generated for this segment yet.</p>
                      <button
                        onClick={handleRegenerate}
                        className="mt-4 text-cyan-400 hover:text-cyan-300"
                      >
                        Generate ads →
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Continue button */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5}}
                className="mt-8 flex justify-end"
              >
                <motion.button
                  whileHover={{scale: 1.03, boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)"}}
                  whileTap={{scale: 0.98}}
                  onClick={handleContinue}
                  className="px-6 py-3 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all bg-white text-gray-900 hover:bg-gray-100"
                >
                  Continue to X Personalization
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

