"use client";

import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Link as LinkIcon,
  Sparkles,
  Loader2
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
interface Demographic {
  header: string;
  age_range: string;
  gender: string;
  geolocation: string;
  instruction: string;
  tweet_text: string;
  image_url?: string;
}

interface Segment extends Demographic {
  id: string;
  color: "cyan" | "purple" | "pink" | "emerald";
}

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

const colors: Array<"cyan" | "purple" | "pink" | "emerald"> = ["cyan", "purple", "pink", "emerald"];

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
        <h3 className="font-gothic text-lg text-white mb-1">{segment.header}</h3>
        <p className="text-xs text-gray-500">{segment.age_range} · {segment.gender}</p>
      </div>
    </motion.button>
  );
}

// X/Twitter Style Ad Card
function AdCard({
  segment,
  companyName,
  index,
  color
}: {
  segment: Segment;
  companyName: string;
  index: number;
  color: "cyan" | "purple" | "pink" | "emerald";
}) {
  const [copied, setCopied] = useState(false);
  const colors = colorMap[color];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(segment.tweet_text);
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
            <span className="text-white font-bold text-sm">{companyName.charAt(0)}</span>
          </div>

          {/* Name and handle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-gothic text-lg text-white">{companyName}</span>
              <span className="text-gray-500 text-sm">@{companyName.toLowerCase().replace(/\s+/g, '')}</span>
              <span className="text-gray-600 text-sm">·</span>
              <span className="text-gray-500 text-sm">Just now</span>
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

        {/* Tweet text */}
        <p className="text-white text-[15px] leading-relaxed mb-4">
          {segment.tweet_text}
        </p>

        {/* Image preview */}
        {segment.image_url && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
              <LinkIcon size={12} className="text-gray-500" />
              <span className="text-xs text-gray-500">Generated by Grok Imagine</span>
            </div>
            <div className="aspect-[2/1] relative overflow-hidden">
              <img
                src={segment.image_url}
                alt="Generated ad image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60";
                }}
              />
              {/* Gradient overlay on image */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
              <div className={`absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l ${colors.border} opacity-30`} />
            </div>
          </div>
        )}

        {/* Image prompt indicator */}
        <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
          <Sparkles size={14} className={colors.text + " mt-0.5 shrink-0"} />
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium mb-1">Image Generation Prompt:</p>
            <p className="text-xs text-gray-500 leading-relaxed">{segment.instruction}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function AdsPage() {
  const router = useRouter();
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
        router.push("/studio/segments");
        return;
      }

      const parsedData = JSON.parse(adsData);
      const selectedIds = JSON.parse(selectedSegments);

      // Transform demographics into segments and filter by selected
      const allSegments: Segment[] = parsedData.demographics.map((demo: Demographic, index: number) => ({
        ...demo,
        id: String(index + 1),
        color: colors[index % colors.length]
      }));

      const filteredSegments = allSegments.filter(s => selectedIds.includes(s.id));
      setSegments(filteredSegments);
      setActiveSegmentId(filteredSegments[0]?.id || "");
      setIsLoading(false);
    }
  }, [router]);

  const activeSegment = segments.find((s) => s.id === activeSegmentId) || segments[0];

  const handleContinue = () => {
    router.push("/studio/personalization");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading ads...</p>
        </div>
      </div>
    );
  }

  if (segments.length === 0) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No segments selected</p>
          <button
            onClick={() => router.push("/studio/segments")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
                  Ads for {activeSegment?.header || "Segment"}
                </h1>
              </div>

              {/* Ad Card */}
              <AnimatePresence mode="wait">
                {activeSegment && (
                  <motion.div
                    key={activeSegmentId}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3}}
                  >
                    <AdCard
                      segment={activeSegment}
                      companyName={companyName}
                      index={0}
                      color={activeSegment.color}
                    />
                  </motion.div>
                )}
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
