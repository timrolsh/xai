"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  PenTool,
  AtSign,
  Settings2,
  Check,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[rgba(12,18,34,0.85)] backdrop-blur-xl border-b border-white/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <span className="font-gothic text-white text-sm font-bold">G</span>
          </div>
          <span className="font-gothic text-lg tracking-wide text-white">
            Grok Ads Studio
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Cookbook
          </a>
          <a
            href="#"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/studio"
            className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
          >
            Launch Studio
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,7,18,0.7)] via-[rgba(3,7,18,0.6)] to-[rgba(3,7,18,0.95)]" />
        {/* Aurora/Northern lights effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[350px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main Glass Card */}
          <motion.div
            variants={fadeInUp}
            className="glass rounded-3xl p-8 md:p-12 max-w-4xl w-full"
          >
            {/* Logo in card */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="font-gothic text-xl md:text-2xl tracking-wide neon-underline inline-block pb-2">
                Grok Ads Studio
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-gothic text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              <span className="block">Hyper-personalized ads,</span>
              <span className="block">written by Grok.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
            >
              Turn a company name into 10–15 laser-focused audiences, X-ready ad
              creatives, and even 1:1 ads for specific usernames.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link href="/studio">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center justify-center gap-2 text-lg"
                >
                  <span>Launch Studio</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost flex items-center justify-center gap-2"
              >
                View live demo
              </motion.button>
            </motion.div>

            {/* Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <span className="badge badge-glow">
                <Sparkles size={14} className="text-cyan-400" />
                Built on xAI Grok
              </span>
              <span className="badge">
                <span className="text-purple-400">✦</span>
                xAI Hackathon · Ads Track
              </span>
            </motion.div>
          </motion.div>

          {/* Preview Strip */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {/* Segments Preview */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="preview-card"
            >
              <div className="text-xs text-gray-400 mb-3 font-medium">
                Segments
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
                  <span className="text-2xl">👨‍💻</span>
                  <span className="text-[10px] text-gray-400">Gen Z</span>
                  <span className="text-[10px] text-gray-500">Builders</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
                  <span className="text-2xl">🎯</span>
                  <span className="text-[10px] text-gray-400">SaaS</span>
                  <span className="text-[10px] text-gray-500">Founders</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
                  <span className="text-2xl">🦧</span>
                  <span className="text-[10px] text-gray-400">Crypto</span>
                  <span className="text-[10px] text-gray-500">Apes</span>
                </div>
              </div>
            </motion.div>

            {/* Ad Variant Preview */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="preview-card"
            >
              <div className="text-xs text-gray-400 mb-3 font-medium">
                Ad Variant
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-500 mb-1">X Header</div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Turn a company name into 10–15 laser focused ads to our
                    creative.
                  </p>
                  <button className="mt-2 text-[10px] px-2 py-1 rounded bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30">
                    Ad copy →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Username Personalization Preview */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="preview-card"
            >
              <div className="text-xs text-gray-400 mb-3 font-medium">
                @username personalized ad
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  <img
                    src="https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg"
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-white">
                      elonmusk
                    </span>
                    <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.52 3.59a3.08 3.08 0 0 1 4.96 0l.69.83a1.09 1.09 0 0 0 .7.38l1.07.11a3.08 3.08 0 0 1 2.45 3.53l-.19 1.06a1.09 1.09 0 0 0 .16.78l.59.88a3.08 3.08 0 0 1-1 4.24l-.9.57a1.09 1.09 0 0 0-.48.68l-.24 1.05a3.08 3.08 0 0 1-4.06 2.15l-1-.38a1.09 1.09 0 0 0-.8 0l-1 .38a3.08 3.08 0 0 1-4.06-2.15l-.24-1.05a1.09 1.09 0 0 0-.48-.68l-.9-.57a3.08 3.08 0 0 1-1-4.24l.59-.88a1.09 1.09 0 0 0 .16-.78l-.19-1.06a3.08 3.08 0 0 1 2.45-3.53l1.07-.11a1.09 1.09 0 0 0 .7-.38zM12 8a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1zm-1 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                    </svg>
                  </div>
                  <div className="text-[10px] text-gray-500 mb-1">
                    @elonmusk
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    See what an ad looks like for a specific @username. ✨
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <Settings2 className="w-5 h-5" />,
      badge: "From 0",
      title: "From 0 → Segments",
      description: "Auto-generate 10–15 best-fit audiences.",
    },
    {
      icon: <PenTool className="w-5 h-5" />,
      badge: "21st.dev",
      title: "Ads That Feel Native",
      description: "Segment-based creatives tuned for X.",
    },
    {
      icon: <AtSign className="w-5 h-5" />,
      badge: "21st.dev",
      title: "1:1 For Handles",
      description: "See what an ad looks like for a specific @username.",
    },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="feature-card group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-gothic text-sm text-gray-400">
                  {feature.badge}
                </span>
                <div className="text-gray-500 group-hover:text-cyan-400 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
