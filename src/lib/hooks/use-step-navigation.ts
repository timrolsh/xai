"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const STUDIO_STEPS = [
  { id: 1, path: "/studio/company/name", label: "Company Name", mainStepId: 1 },
  { id: 2, path: "/studio/company/description", label: "Description", mainStepId: 1 },
  { id: 3, path: "/studio/company/goal", label: "Goal", mainStepId: 1 },
  { id: 4, path: "/studio/segments", label: "Audience Segments", mainStepId: 2 },
  { id: 5, path: "/studio/ads", label: "Ads per Segment", mainStepId: 3 },
  { id: 6, path: "/studio/personalization", label: "X Personalization", mainStepId: 4 },
];

export function useStepNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const currentStep = useMemo(() => {
    return STUDIO_STEPS.find((s) => s.path === pathname) || STUDIO_STEPS[0];
  }, [pathname]);

  const currentIndex = STUDIO_STEPS.findIndex((s) => s.path === pathname);
  
  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < STUDIO_STEPS.length - 1;

  const goToNext = () => {
    if (canGoNext) {
      router.push(STUDIO_STEPS[currentIndex + 1].path);
    }
  };

  const goToPrevious = () => {
    if (canGoBack) {
      router.push(STUDIO_STEPS[currentIndex - 1].path);
    }
  };

  return {
    currentStep,
    mainStepId: currentStep.mainStepId,
    currentIndex, // Exported
    goToNext,
    goToPrevious,
    canGoBack,
    canGoNext,
    steps: STUDIO_STEPS
  };
}
