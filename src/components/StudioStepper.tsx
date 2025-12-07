"use client";

import {motion} from "framer-motion";

interface StepperProps {
  currentMainStep: number; // 1-4
  currentSubStep: number; // 1-3 for Company & Goal
  subStepLabel: string;
}

const mainSteps = [
  {id: 1, label: "Company & Goal"},
  {id: 2, label: "Audience Segments"},
  {id: 3, label: "Ads per Segment"},
  {id: 4, label: "X Personalization"}
];

export function MainStepper({
  currentMainStep,
  currentSubStep
}: {
  currentMainStep: number;
  currentSubStep: number;
}) {
  // Calculate progress percentage for the progress bar under each step
  // Step 1 has 3 sub-steps, others are single step (100%)
  const getSubStepProgress = () => {
    if (currentMainStep === 1) return (currentSubStep / 3) * 100;
    return 100; // Full progress for steps 2, 3, 4
  };
  const subStepProgress = getSubStepProgress();

  return (
    <motion.div
      initial={{opacity: 0, y: -10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="flex items-center justify-center gap-0"
    >
      {mainSteps.map((step, index) => {
        const isActive = step.id === currentMainStep;
        const isCompleted = step.id < currentMainStep;
        const isNext = step.id === currentMainStep + 1;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step */}
            <div className="relative">
              <motion.div
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : isCompleted ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {/* Active step glow border */}
                {isActive && (
                  <motion.div
                    layoutId="activeStepBorder"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }}
                  />
                )}
                <span className="relative z-10">
                  {step.id}. {step.label}
                </span>
              </motion.div>

              {/* Animated underline for active step */}
              {isActive && (
                <motion.div
                  layoutId="activeStepUnderline"
                  className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
                  style={{
                    width: `${subStepProgress}%`,
                    x: "-50%",
                    maxWidth: "80px"
                  }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </div>

            {/* Connector line between steps */}
            {index < mainSteps.length - 1 && (
              <div className="relative w-8 md:w-12 h-0.5 mx-1 bg-gray-700/50 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  initial={{width: "0%"}}
                  animate={{
                    width: isCompleted ? "100%" : isActive && currentSubStep === 3 ? "50%" : "0%"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}

export function SubStepIndicator({
  current,
  total,
  label
}: {
  current: number;
  total: number;
  label: string;
}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay: 0.1}}
      className="flex items-center justify-center"
    >
      <motion.span
        key={`${current}-${label}`}
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.3}}
        className="px-4 py-2 text-sm text-gray-400 bg-white/5 rounded-full border border-white/10"
      >
        Step {current} of {total} · {label}
      </motion.span>
    </motion.div>
  );
}
