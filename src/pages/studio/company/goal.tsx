"use client";

import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ArrowRight, ArrowLeft, ExternalLink, Sparkles} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {MainStepper, SubStepIndicator} from "@/components/StudioStepper";

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

const slideInLeft = {
  hidden: {opacity: 0, x: -40, filter: "blur(10px)"},
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {duration: 0.5, ease: "easeOut" as const}
  }
};

const slideInRight = {
  hidden: {opacity: 0, x: 40, filter: "blur(10px)"},
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {duration: 0.5, ease: "easeOut" as const, delay: 0.1}
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-gothic text-xl tracking-wide text-white">Grok Ads Studio</span>
        </Link>

        {/* Right side */}
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

// JSON Syntax Highlighting Component
function JsonPreview({data}: {data: object}) {
  const formatValue = (value: unknown, indent: number = 0): React.ReactNode => {
    const indentStr = "  ".repeat(indent);

    if (typeof value === "string") {
      return <span className="text-emerald-400">"{value}"</span>;
    }
    if (typeof value === "boolean") {
      return <span className="text-amber-400">{value.toString()}</span>;
    }
    if (typeof value === "number") {
      return <span className="text-cyan-400">{value}</span>;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-gray-400">[]</span>;
      return (
        <>
          <span className="text-gray-400">[</span>
          {value.map((item, i) => (
            <span key={i}>
              {"\n" + indentStr + "  "}
              {formatValue(item, indent + 1)}
              {i < value.length - 1 && <span className="text-gray-400">,</span>}
            </span>
          ))}
          {"\n" + indentStr}
          <span className="text-gray-400">]</span>
        </>
      );
    }
    if (typeof value === "object" && value !== null) {
      const entries = Object.entries(value);
      return (
        <>
          <span className="text-gray-400">{"{"}</span>
          {entries.map(([k, v], i) => (
            <span key={k}>
              {"\n" + indentStr + "  "}
              <span className="text-purple-400">"{k}"</span>
              <span className="text-gray-400">: </span>
              {formatValue(v, indent + 1)}
              {i < entries.length - 1 && <span className="text-gray-400">,</span>}
            </span>
          ))}
          {"\n" + indentStr}
          <span className="text-gray-400">{"}"}</span>
        </>
      );
    }
    return <span className="text-gray-500">null</span>;
  };

  return (
    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
      {formatValue(data)}
    </pre>
  );
}

// Company Profile Preview Component
function CompanyProfilePreview({
  companyName,
  description,
  goal,
  useGrokopedia
}: {
  companyName: string;
  description: string;
  goal: string;
  useGrokopedia: boolean;
}) {
  const profileData = {
    name: companyName || "...",
    description: description || "...",
    goal: goal || "(Pending input from left...)",
    useGrokopedia: useGrokopedia,
    derived: {
      industry: useGrokopedia ? "Software Development" : "...",
      main_products: useGrokopedia ? ["AI Code Assistant", "Automated Testing Suite"] : ["..."],
      target_customers: useGrokopedia ? ["Software Engineers", "Tech Leads", "CTOs"] : ["..."],
      value_props: useGrokopedia
        ? ["Increased developer productivity", "Reduced bug rates"]
        : ["..."]
    }
  };

  return (
    <motion.div
      variants={slideInRight}
      className="glass-lighter rounded-2xl p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-gothic text-xl text-white">Company Profile Preview</h3>
        {useGrokopedia && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/30">
            <Sparkles size={12} />
            Powered by Grokopedia
          </span>
        )}
      </div>

      {/* JSON Preview */}
      <div className="flex-1 bg-[rgba(0,0,0,0.3)] rounded-xl p-4 overflow-auto border border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${companyName}-${description}-${goal}`}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
          >
            <JsonPreview data={profileData} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function CompanyGoalPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [useGrokopedia, setUseGrokopedia] = useState(false);
  const maxChars = 1000;

  // Load data from previous steps
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("companyName");
      const savedDescription = localStorage.getItem("companyDescription");
      const savedGrokopedia = localStorage.getItem("useGrokopedia");
      const savedGoal = localStorage.getItem("campaignGoal");

      if (savedName) setCompanyName(savedName);
      if (savedDescription) setDescription(savedDescription);
      if (savedGrokopedia) setUseGrokopedia(savedGrokopedia === "true");
      if (savedGoal) setGoal(savedGoal);
    }
  }, []);

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("campaignGoal", goal);
    }
    router.push("/studio/segments");
  };

  const handleBack = () => {
    router.push("/studio/company/description");
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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,7,18,0.85)] via-[rgba(3,7,18,0.8)] to-[rgba(3,7,18,0.95)]" />
        {/* Aurora effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div
            className="absolute top-20 right-1/4 w-[500px] h-[350px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{animationDelay: "1s"}}
          />
        </div>
      </div>

      <StudioNavigation />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center pt-28 pb-12 px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-6xl flex flex-col items-center gap-6"
        >
          {/* Main Stepper */}
          <MainStepper currentMainStep={1} currentSubStep={3} />

          {/* Sub-step indicator */}
          <SubStepIndicator current={3} total={3} label="Campaign intent" />

          {/* Main Glass Card - Two Column Layout */}
          <motion.div variants={fadeInUp} className="w-full glass rounded-3xl p-8 md:p-10 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Campaign Goal Form */}
              <motion.div variants={slideInLeft} className="flex flex-col">
                {/* Title */}
                <div className="mb-6">
                  <h1 className="font-gothic text-2xl md:text-3xl mb-3">
                    What do you want to create?
                  </h1>
                  <p className="text-gray-400 text-sm">
                    e.g. Launch awareness ads for our AI note-taker / Drive signups for Solana data
                    marketplace
                  </p>
                </div>

                {/* Textarea */}
                <div className="relative flex-1 min-h-[200px]">
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value.slice(0, maxChars))}
                    placeholder="e.g. Drive sign-ups for the upcoming beta launch of our code review assistant..."
                    className="w-full h-full min-h-[200px] px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  />
                  {/* Character count */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    <span className={goal.length >= maxChars ? "text-red-400" : ""}>
                      {goal.length}
                    </span>
                    / {maxChars}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                  <span className="text-sm text-gray-500">
                    Next: Grok turns this into structured segments.
                  </span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                      onClick={handleBack}
                      className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-2 transition-all"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{scale: 1.03, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"}}
                      whileTap={{scale: 0.98}}
                      onClick={handleContinue}
                      disabled={!goal.trim()}
                      className={`group relative px-6 py-3 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all overflow-hidden ${
                        goal.trim()
                          ? "bg-white text-gray-900 hover:bg-gray-100"
                          : "bg-gray-700 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {/* Gradient border effect for active state */}
                      {goal.trim() && (
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2))"
                          }}
                        />
                      )}
                      <span className="relative z-10">Continue to segments</span>
                      <ArrowRight size={16} className="relative z-10" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Company Profile Preview */}
              <CompanyProfilePreview
                companyName={companyName}
                description={description}
                goal={goal}
                useGrokopedia={useGrokopedia}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
