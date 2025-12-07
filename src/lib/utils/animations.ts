// Apple-style easing curves
export const EASING = {
  default: [0.4, 0, 0.2, 1],
  gentle: [0.4, 0, 0.6, 1],
  wobbly: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.6, 0.32, 1.6],
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.4, ease: EASING.default }
};

// Fade In Up
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASING.default }
};

// Stagger Container
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

// Stagger Item
export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASING.default }
};

// Card Hover
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.3, ease: EASING.default }
  }
};

// Scale In
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: EASING.default }
};

