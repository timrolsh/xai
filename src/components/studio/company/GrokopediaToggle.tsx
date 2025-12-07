"use client";

import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface GrokopediaToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function GrokopediaToggle({ checked, onCheckedChange, disabled }: GrokopediaToggleProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
      <Switch
        id="grokopedia-mode"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="data-[state=checked]:bg-[#007AFF] mt-1"
      />
      <div className="flex-1 space-y-1">
        <Label htmlFor="grokopedia-mode" className="font-medium text-gray-900 dark:text-white flex items-center gap-2 cursor-pointer">
          Auto-fill with Grokopedia
          {checked && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center p-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-[#007AFF]"
            >
              <Sparkles size={10} />
            </motion.span>
          )}
        </Label>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
          Use xAI's knowledge base to automatically generate your company profile and audience segments.
        </p>
      </div>
    </div>
  );
}
