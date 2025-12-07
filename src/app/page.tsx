"use client";

import {motion} from "framer-motion";
import {ArrowRight, Sparkles, BookOpen, FileText, Github} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {fadeInUp, staggerContainer} from "@/lib/utils/animations";
import {AdCard} from "@/components/studio/ads/AdCard";
import Aurora from "@/components/ui/Aurora";
import {FloatingNav} from "@/components/ui/floating-navbar";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Aurora Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.5} amplitude={1.2} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        {/* Massive Ice-Glass Container Encapsulating Everything */}
        <div className="relative p-8 md:p-16 rounded-[40px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
          {/* Inner Gradient Shine - cooler tone for ice effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none opacity-40 dark:opacity-10" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white leading-[0.95] drop-shadow-sm"
            >
              Hyper-personalized ads,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#0051D5]">
                made by Grok.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Turn a company name into 10–15 laser-focused audiences, X-ready ad creatives, and 1:1
              personalized campaigns.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/studio/company/name">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-[#007AFF] hover:bg-[#0051D5] text-white text-[16px] font-semibold shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 border-none"
                >
                  Start Campaign <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="h-14 px-8 rounded-full text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/10 text-[16px]"
              >
                View Demo
              </Button>
            </motion.div>

            {/* Tweets Container */}
            <motion.div variants={fadeInUp} className="w-full max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Card 1 */}
                <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.4, duration: 0.5}}
                  className="transform transition-transform duration-300 hover:scale-[1.01]"
                >
                  <AdCard
                    name="Grok"
                    handle="grok"
                    avatarSrc="https://pbs.twimg.com/profile_images/1893219113717342208/Vgg2hEPa_400x400.jpg"
                    content="Just generated 14 unique audience segments for @Tesla's new Cybertruck campaign. 🚀 #AI #AdTech"
                    imageSrc="/grok_image.jpg"
                    verified={true}
                    stats={{
                      replies: "342",
                      reposts: "1.2K",
                      likes: "8.5K",
                      views: "450K"
                    }}
                  />
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.5, duration: 0.5}}
                  className="transform transition-transform duration-300 hover:scale-[1.01]"
                >
                  <AdCard
                    name="Tesla"
                    handle="tesla"
                    avatarSrc="https://pbs.twimg.com/profile_images/1337607516008501250/6Ggc4S5n_400x400.png"
                    content="Built for any planet. Cybertruck is now available for immediate delivery. Order yours today. 📐"
                    imageSrc="/cybertruck.png"
                    verified={true}
                    stats={{
                      replies: "8.2K",
                      reposts: "15K",
                      likes: "142K",
                      views: "12M"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const navItems = [
    {
      name: "Cookbook",
      link: "#",
      icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />
    },
    {
      name: "Docs",
      link: "#",
      icon: <FileText className="h-4 w-4 text-neutral-500 dark:text-white" />
    },
    {
      name: "GitHub",
      link: "#",
      icon: <Github className="h-4 w-4 text-neutral-500 dark:text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black text-gray-900 dark:text-white selection:bg-[#007AFF] selection:text-white relative overflow-hidden">
      <FloatingNav navItems={navItems} />
      <HeroSection />
    </div>
  );
}
