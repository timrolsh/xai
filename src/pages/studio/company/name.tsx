"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Sparkles, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
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

// Sub-step indicator
function SubStepIndicator({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center justify-center"
    >
      <span className="px-4 py-2 text-sm text-gray-400 bg-white/5 rounded-full border border-white/10">
        Step {current} of {total} · {label}
      </span>
    </motion.div>
  );
}

// Main Page Component
export default function CompanyNamePage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [useGrokopedia, setUseGrokopedia] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchGrokopedia = async () => {
    if (!companyName.trim()) return;
    setIsFetching(true);
    // Simulate API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  const handleContinue = () => {
    // Store company name in localStorage or state management
    if (typeof window !== "undefined") {
      localStorage.setItem("companyName", companyName);
      localStorage.setItem("useGrokopedia", String(useGrokopedia));
    }
    router.push("/studio/company/description");
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
          <SubStepIndicator current={1} total={3} label="Company shell" />

          {/* Main Glass Card */}
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-2xl glass rounded-3xl p-8 md:p-10 mt-4"
          >
            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-gothic text-3xl md:text-4xl text-center mb-3"
            >
              Let's start with your company
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-center mb-8"
            >
              Grok will use this as the core context for your campaign and audience generation
            </motion.p>

            {/* Form */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Company Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Building2 size={18} />
                  </div>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Cluely, Notion, Grok Ads"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Grokopedia Toggle Section */}
              <div className="flex items-start justify-between gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-3">
                  {/* Toggle Switch */}
                  <button
                    onClick={() => setUseGrokopedia(!useGrokopedia)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 mt-0.5 ${
                      useGrokopedia
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ x: useGrokopedia ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Use Grokopedia to auto-fill profile
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Automatically fetch details using Grok's knowledge base.
                    </div>
                  </div>
                </div>

                {/* Fetch Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFetchGrokopedia}
                  disabled={!useGrokopedia || !companyName.trim() || isFetching}
                  className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${
                    useGrokopedia && companyName.trim()
                      ? "text-white border border-transparent bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30"
                      : "text-gray-500 border border-gray-700 cursor-not-allowed"
                  }`}
                  style={{
                    background: useGrokopedia && companyName.trim()
                      ? "linear-gradient(#0c1222, #0c1222) padding-box, linear-gradient(135deg, #a855f7, #ec4899) border-box"
                      : undefined,
                    border: useGrokopedia && companyName.trim()
                      ? "1px solid transparent"
                      : undefined,
                  }}
                >
                  {isFetching ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Fetch from Grokopedia
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between mt-8 pt-6 border-t border-white/10"
            >
              <span className="text-sm text-gray-500">
                Next: Describe what your company actually does.
              </span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                disabled={!companyName.trim()}
                className={`px-6 py-3 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                  companyName.trim()
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

