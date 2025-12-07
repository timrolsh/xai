"use client";

import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Check,
  Users,
  Globe,
  Target,
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
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const cardVariant = {
  hidden: {opacity: 0, y: 40, scale: 0.95},
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

const slideInRight = {
  hidden: {opacity: 0, x: 40},
  visible: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.5, ease: "easeOut" as const, delay: 0.3}
  }
};

// Segment type
interface Segment {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  geo: string;
  funnelStage: string;
  interests: string[];
  color: "cyan" | "purple" | "pink" | "emerald";
}

// Mock segments data
const mockSegments: Segment[] = [
  {
    id: "1",
    name: "Gen Z AI Builders",
    description: "AI awareness on Gen Z AI Builders to developers, hatch new innovations.",
    ageRange: "18-24",
    geo: "Global",
    funnelStage: "Awareness",
    interests: ["AI/ML", "Coding", "Startups"],
    color: "cyan"
  },
  {
    id: "2",
    name: "B2B Marketing Leads",
    description: "B2B Marketing leads, to potentiators and marketing, development reads.",
    ageRange: "25-44",
    geo: "Global",
    funnelStage: "Decision",
    interests: ["SaaS", "Marketing", "Analytics"],
    color: "purple"
  },
  {
    id: "3",
    name: "Crypto Founders",
    description: "Nootify react our-optic products in conts and after-protocol onontag ap canvas.",
    ageRange: "25-34",
    geo: "Global",
    funnelStage: "Decision",
    interests: ["Web3", "DeFi", "NFTs"],
    color: "pink"
  },
  {
    id: "4",
    name: "Crypto Builders",
    description: "AI mobile grownster ads for AI note-taker and resource seutislacs.",
    ageRange: "18-24",
    geo: "Global",
    funnelStage: "Awareness",
    interests: ["Blockchain", "Smart Contracts"],
    color: "emerald"
  },
  {
    id: "5",
    name: "SaaS Growth Hackers",
    description: "SaaS growth hackers, for cempinst and and growth antiem testing Suite.",
    ageRange: "18-24",
    geo: "Global",
    funnelStage: "Decision",
    interests: ["Growth", "PLG", "Metrics"],
    color: "cyan"
  },
  {
    id: "6",
    name: "DevTool Enthusiasts",
    description: "Developers who actively seek and adopt new development tools and workflows.",
    ageRange: "22-35",
    geo: "US & EU",
    funnelStage: "Consideration",
    interests: ["DevOps", "IDE", "Productivity"],
    color: "purple"
  },
  {
    id: "7",
    name: "Startup Founders",
    description: "Early-stage startup founders looking for tools to accelerate growth.",
    ageRange: "25-40",
    geo: "Global",
    funnelStage: "Decision",
    interests: ["Funding", "MVP", "Scale"],
    color: "pink"
  },
  {
    id: "8",
    name: "Enterprise CTOs",
    description: "Technical leaders at large companies evaluating enterprise solutions.",
    ageRange: "35-55",
    geo: "US",
    funnelStage: "Decision",
    interests: ["Security", "Compliance", "Scale"],
    color: "emerald"
  },
  {
    id: "9",
    name: "Product Managers",
    description: "Product managers looking for AI tools to enhance product development.",
    ageRange: "28-45",
    geo: "Global",
    funnelStage: "Awareness",
    interests: ["Roadmaps", "Analytics", "UX"],
    color: "cyan"
  }
];

// Color map for gradient borders
const colorMap = {
  cyan: {
    border: "from-cyan-400 to-cyan-600",
    glow: "shadow-cyan-500/20",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
  },
  purple: {
    border: "from-purple-400 to-purple-600",
    glow: "shadow-purple-500/20",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30"
  },
  pink: {
    border: "from-pink-400 to-pink-600",
    glow: "shadow-pink-500/20",
    badge: "bg-pink-500/10 text-pink-400 border-pink-500/30"
  },
  emerald: {
    border: "from-emerald-400 to-emerald-600",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
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

// Segment Card Component
function SegmentCard({
  segment,
  isSelected,
  onToggle,
  index
}: {
  segment: Segment;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}) {
  const colors = colorMap[segment.color];

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{y: -4, transition: {duration: 0.2}}}
      className="relative group"
    >
      {/* Gradient border wrapper */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.border} opacity-${isSelected ? "100" : "50"} group-hover:opacity-100 transition-opacity duration-300`}
        style={{padding: "1px"}}
      />

      {/* Card content */}
      <div
        className={`relative rounded-2xl p-5 h-full cursor-pointer transition-all duration-300 ${
          isSelected
            ? "bg-[rgba(17,24,39,0.95)] shadow-lg " + colors.glow
            : "bg-[rgba(17,24,39,0.8)] hover:bg-[rgba(17,24,39,0.9)]"
        }`}
        onClick={onToggle}
        style={{margin: "1px"}}
      >
        {/* Selected checkmark */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0, opacity: 0}}
              transition={{type: "spring", stiffness: 500, damping: 30}}
              className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br ${colors.border} flex items-center justify-center`}
            >
              <Check size={14} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Segment name */}
        <h3 className="font-gothic text-xl text-white mb-2 pr-8">{segment.name}</h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{segment.description}</p>

        {/* Metadata labels */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <Users size={12} />
            Age Range
          </span>
          <span className="flex items-center gap-1">
            <Globe size={12} />
            Geo
          </span>
          <span className="flex items-center gap-1">
            <Target size={12} />
            Funnel Stage
          </span>
        </div>

        {/* Metadata values */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-300 border border-white/10">
            {segment.ageRange}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-300 border border-white/10">
            {segment.geo}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-md border ${colors.badge}`}>
            {segment.funnelStage}
          </span>
        </div>

        {/* Toggle row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs text-gray-500">
            {isSelected ? "Selected" : "Tap to select"}
          </span>
          <button
            className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
              isSelected ? `bg-gradient-to-r ${colors.border}` : "bg-gray-700"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md"
              animate={{x: isSelected ? 20 : 0}}
              transition={{type: "spring", stiffness: 500, damping: 30}}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Selected Segments Sidebar
function SelectedSidebar({
  segments,
  selectedIds
}: {
  segments: Segment[];
  selectedIds: Set<string>;
}) {
  const selectedSegments = segments.filter((s) => selectedIds.has(s.id));

  return (
    <motion.div
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      className="glass-lighter rounded-2xl p-6 sticky top-28"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{selectedIds.size}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">segments selected</h3>
      </div>

      <AnimatePresence mode="popLayout">
        {selectedSegments.length > 0 ? (
          <motion.div className="space-y-2 mb-4">
            {selectedSegments.map((segment) => (
              <motion.div
                key={segment.id}
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -20}}
                transition={{duration: 0.2}}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorMap[segment.color].border}`}
                />
                {segment.name}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="text-gray-500 text-sm mb-4"
          >
            No segments selected yet. Click on segments to select them.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 leading-relaxed">
          <Sparkles size={12} className="inline mr-1 text-purple-400" />
          Grok uses provider prioritization, how audience segments the developence selocated
          segments. Groks cards animate in with a staggered grid flew reveal.
        </p>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function SegmentsPage() {
  const router = useRouter();
  const [segments] = useState<Segment[]>(mockSegments);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["1", "2", "3", "5"]));
  const [isRegenerating, setIsRegenerating] = useState(false);

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

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 2000);
  };

  const handleContinue = () => {
    // Save selected segments
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedSegments", JSON.stringify(Array.from(selectedIds)));
    }
    router.push("/studio/ads");
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
            <MainStepper currentMainStep={2} currentSubStep={1} />
          </div>

          {/* Header Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-gothic text-3xl md:text-4xl text-white mb-2">
                Audience Segments
              </h1>
              <p className="text-gray-400">
                {segments.length} segments generated from Grok. Select the ones you want to target.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Regenerate button */}
              <motion.button
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="px-4 py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-all text-white border border-transparent"
                style={{
                  background:
                    "linear-gradient(#0c1222, #0c1222) padding-box, linear-gradient(135deg, #a855f7, #ec4899) border-box",
                  border: "1px solid transparent"
                }}
              >
                <RefreshCw size={16} className={isRegenerating ? "animate-spin" : ""} />
                Regenerate segments
              </motion.button>

              {/* Continue button */}
              <motion.button
                whileHover={{scale: 1.03, boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)"}}
                whileTap={{scale: 0.98}}
                onClick={handleContinue}
                disabled={selectedIds.size === 0}
                className={`px-6 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                  selectedIds.size > 0
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue to ads
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Segments Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {segments.map((segment, index) => (
                <SegmentCard
                  key={segment.id}
                  segment={segment}
                  isSelected={selectedIds.has(segment.id)}
                  onToggle={() => toggleSegment(segment.id)}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SelectedSidebar segments={segments} selectedIds={selectedIds} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

