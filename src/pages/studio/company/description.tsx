"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Main steps data
const mainSteps = [
  { id: 1, label: "Company & Goal", active: true },
  { id: 2, label: "Audience Segments", active: false },
  { id: 3, label: "Ads per Segment", active: false },
  { id: 4, label: "X Personalization", active: false },
];

// Navigation Component
function StudioNavigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-[rgba(12,18,34,0.7)] backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-gothic text-xl tracking-wide text-white">
            Grok Ads Studio
          </span>
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

// Main Stepper Component
function MainStepper() {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center justify-center gap-2 md:gap-4"
    >
      {mainSteps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              step.active
                ? "text-white"
                : "text-gray-500 hover:text-gray-400"
            }`}
          >
            {/* Active step glow border */}
            {step.active && (
              <>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50" />
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
                  layoutId="activeStep"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
            <span className="relative z-10">
              {step.id}. {step.label}
            </span>
          </div>
          {index < mainSteps.length - 1 && (
            <div className="w-8 md:w-12 h-px bg-gray-700/50 mx-1" />
          )}
        </div>
      ))}
    </motion.div>
  );
}

// Sub-step indicator with progress dots
function SubStepIndicator({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center justify-center gap-3"
    >
      <span className="px-4 py-2 text-sm text-gray-400 bg-white/5 rounded-full border border-white/10">
        Step {current} of {total} · {label}
      </span>
      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i < current
                ? "bg-cyan-400"
                : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Company Snapshot Preview Component
function CompanySnapshot({ 
  companyName, 
  description, 
  useGrokopedia 
}: { 
  companyName: string; 
  description: string; 
  useGrokopedia: boolean;
}) {
  return (
    <motion.div
      variants={slideInRight}
      className="glass-lighter rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Company Snapshot</h3>
        {useGrokopedia && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/30">
            <Sparkles size={12} />
            Powered by Grokopedia
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider">Name</label>
          <AnimatePresence mode="wait">
            <motion.p
              key={companyName}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-white font-medium mt-1"
            >
              {companyName || "—"}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Description Preview */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
          <AnimatePresence mode="wait">
            <motion.p
              key={description.slice(0, 50)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-gray-300 text-sm mt-1 leading-relaxed"
            >
              {description || "Start typing to see preview..."}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Grokopedia Status */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider">Grokopedia</label>
          <div className="mt-1">
            <span
              className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                useGrokopedia
                  ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                  : "text-gray-400 bg-gray-500/10 border border-gray-500/30"
              }`}
            >
              {useGrokopedia ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function CompanyDescriptionPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [useGrokopedia, setUseGrokopedia] = useState(false);
  const maxChars = 500;

  // Load data from previous step
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("companyName");
      const savedGrokopedia = localStorage.getItem("useGrokopedia");
      const savedDescription = localStorage.getItem("companyDescription");
      
      if (savedName) setCompanyName(savedName);
      if (savedGrokopedia) setUseGrokopedia(savedGrokopedia === "true");
      if (savedDescription) setDescription(savedDescription);
    }
  }, []);

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("companyDescription", description);
    }
    router.push("/studio/company/goal");
  };

  const handleBack = () => {
    router.push("/studio/company/name");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,7,18,0.85)] via-[rgba(3,7,18,0.8)] to-[rgba(3,7,18,0.95)]" />
        {/* Aurora effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div
            className="absolute top-20 right-1/4 w-[500px] h-[350px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "1s" }}
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
          className="w-full max-w-5xl flex flex-col items-center gap-6"
        >
          {/* Main Stepper */}
          <MainStepper />

          {/* Sub-step indicator */}
          <SubStepIndicator current={2} total={3} label="Company description" />

          {/* Main Glass Card - Two Column Layout */}
          <motion.div
            variants={fadeInUp}
            className="w-full glass rounded-3xl p-8 md:p-10 mt-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Description Form */}
              <motion.div variants={slideInLeft} className="space-y-6">
                {/* Title */}
                <div>
                  <h1 className="font-gothic text-2xl md:text-3xl mb-2">
                    What does your company do?
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Explain this in plain language. Grok will turn this into structured context.
                  </p>
                </div>

                {/* Textarea */}
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-500">
                    <FileText size={18} />
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, maxChars))}
                    placeholder="We build AI-powered tools that help marketing teams create personalized ad campaigns at scale. Our platform uses machine learning to analyze audience segments and generate high-converting ad copy..."
                    rows={8}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  />
                  {/* Character count */}
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    <span className={description.length >= maxChars ? "text-red-400" : ""}>
                      {description.length}
                    </span>
                    /{maxChars}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    disabled={!description.trim()}
                    className={`px-6 py-3 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      description.trim()
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column - Company Snapshot Preview */}
              <CompanySnapshot
                companyName={companyName}
                description={description}
                useGrokopedia={useGrokopedia}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

