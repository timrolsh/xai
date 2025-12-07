"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function StudioIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first step of the studio flow
    router.replace("/studio/company/name");
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4"></div>
        <p className="text-gray-400">Loading studio...</p>
      </div>
    </div>
  );
}

