import {type ReactNode, useRef} from "react";
import { motion ,useInView} from "motion/react"

type Props = {
  children: ReactNode;
};

export function TopAnimation({ children }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // trigger only once
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={isInView?{ opacity: 1, y: 0 }:{}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
export function BottomAnimation({ children }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // trigger only once
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView?{ opacity: 1, y: 0 }:{}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
export function PageAnimated({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

