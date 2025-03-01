"use client";

import { motion, useInView, TargetAndTransition } from "framer-motion";
import { useRef } from "react";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animationProps?: {
    initial?: TargetAndTransition;
    animate?: TargetAndTransition;
    transition?: TargetAndTransition;
  };
  threshold?: number;
  once?: boolean;
}

const AnimatedContainer = ({ 
  children, 
  className = "", 
  animationProps = {},
  threshold = 0.1,
  once = true
}: AnimatedContainerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Default animation values with explicit TargetAndTransition type
  const defaultAnimation: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    transition: TargetAndTransition;
  } = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Merge default animation with any custom animation props
  const animation = {
    initial: animationProps.initial ?? defaultAnimation.initial,
    animate: isInView 
      ? animationProps.animate ?? defaultAnimation.animate
      : animationProps.initial ?? defaultAnimation.initial,
    transition: animationProps.transition ?? defaultAnimation.transition
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
