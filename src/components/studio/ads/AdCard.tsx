"use client";

import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Repeat2, 
  Heart, 
  BarChart2, 
  Share, 
  BadgeCheck, 
  MoreHorizontal 
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AdCardProps {
  avatarSrc?: string;
  name?: string;
  handle?: string;
  content: string;
  imageSrc?: string;
  stats?: {
    replies: string;
    reposts: string;
    likes: string;
    views: string;
  };
  verified?: boolean;
}

export function AdCard({
  avatarSrc = "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
  name = "Elon Musk",
  handle = "elonmusk",
  content,
  imageSrc,
  stats = {
    replies: "4.2K",
    reposts: "12K",
    likes: "150K",
    views: "22M"
  },
  verified = true
}: AdCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(stats.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Parse K/M for rough update, or just toggle visually for demo
    // For demo simplicity, we just toggle state.
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 font-sans">
      <div className="p-4 flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
            {avatarSrc && (
              <Image 
                src={avatarSrc} 
                alt={name} 
                fill 
                className="object-cover" 
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 truncate">
              <span className="font-bold text-[15px] text-gray-900 dark:text-white truncate hover:underline cursor-pointer">
                {name}
              </span>
              {verified && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1D9BF0]">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="4 9 7 12 12 5" />
                  </svg>
                </span>
              )}
              <span className="text-[15px] text-gray-500 dark:text-gray-500 truncate">
                @{handle}
              </span>
              <span className="text-[15px] text-gray-500 dark:text-gray-500">·</span>
              <span className="text-[15px] text-gray-500 dark:text-gray-500 hover:underline cursor-pointer">
                1h
              </span>
            </div>
            <button className="text-gray-500 hover:text-[#1D9BF0] transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Post Text */}
          <div className="mt-1 text-[15px] text-gray-900 dark:text-white leading-normal whitespace-pre-wrap">
            {content}
          </div>

          {/* Media Attachment */}
          {imageSrc && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative aspect-video bg-gray-100 dark:bg-gray-900">
              <Image 
                src={imageSrc} 
                alt="Post media" 
                fill 
                className="object-cover hover:opacity-95 transition-opacity cursor-pointer" 
              />
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-3 flex items-center justify-between max-w-[425px]">
            <ActionButton icon={<MessageCircle size={18} />} count={stats.replies} color="blue" />
            <ActionButton icon={<Repeat2 size={18} />} count={stats.reposts} color="green" />
            <ActionButton 
              icon={<Heart size={18} fill={isLiked ? "currentColor" : "none"} />} 
              count={likesCount} 
              color="pink" 
              active={isLiked}
              onClick={handleLike}
            />
            <ActionButton icon={<BarChart2 size={18} />} count={stats.views} color="blue" />
            <div className="flex items-center group">
               <button className="p-2 rounded-full text-gray-500 group-hover:bg-blue-500/10 group-hover:text-[#1D9BF0] transition-all">
                 <Share size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ 
  icon, 
  count, 
  color, 
  active = false,
  onClick 
}: { 
  icon: React.ReactNode, 
  count: string, 
  color: "blue" | "green" | "pink",
  active?: boolean,
  onClick?: () => void
}) {
  const colorClasses = {
    blue: "group-hover:text-[#1D9BF0] group-hover:bg-[#1D9BF0]/10",
    green: "group-hover:text-[#00BA7C] group-hover:bg-[#00BA7C]/10",
    pink: "group-hover:text-[#F91880] group-hover:bg-[#F91880]/10"
  };

  const activeTextColors = {
    blue: "text-[#1D9BF0]",
    green: "text-[#00BA7C]",
    pink: "text-[#F91880]"
  };

  return (
    <div 
      className={`flex items-center gap-1 group cursor-pointer min-w-[60px]`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-full transition-all ${colorClasses[color]} ${active ? activeTextColors[color] : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-[13px] transition-colors ${active ? activeTextColors[color] : 'text-gray-500'} ${color === 'pink' ? 'group-hover:text-[#F91880]' : color === 'green' ? 'group-hover:text-[#00BA7C]' : 'group-hover:text-[#1D9BF0]'}`}>
        {count}
      </span>
    </div>
  );
}
