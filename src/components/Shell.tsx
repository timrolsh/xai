import React, {ReactNode} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Head from "next/head";
import {useRouter} from "next/router";
import {Sparkles, Menu, X} from "lucide-react";
import Link from "next/link";

interface ShellProps {
  children: ReactNode;
  title?: string;
}

export function Shell({children, title = "AdStudio"}: ShellProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen relative font-sans text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Head>
        <title>{title}</title>
      </Head>

      {/* Nature Background */}
      <div className="bg-nature" />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-shadow duration-300">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-gothic text-xl tracking-wider font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:to-white transition-all duration-300">
                GROK<span className="text-cyan-400">STUDIO</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["Studio", "Campaigns", "Analytics", "Settings"].map((item) => {
                const isActive = router.pathname.startsWith(`/${item.toLowerCase()}`);
                return (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-white relative group ${
                      isActive ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full ${
                        isActive ? "w-full" : ""
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </div>
              <button className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white">JD</span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-4 min-h-screen flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{opacity: 0, y: 20, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -20, scale: 0.98}}
            transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            className="w-full max-w-7xl"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Background Particles/Noise overlay could go here */}
    </div>
  );
}
