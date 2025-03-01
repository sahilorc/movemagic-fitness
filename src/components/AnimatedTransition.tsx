
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
}

const AnimatedTransition = ({ children, className }: AnimatedTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
