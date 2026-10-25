import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

// Rounded glassmorphism surface. Pass `animate` to fade/slide in when mounted inside a staggered parent.
export default function GlassCard({ as = 'div', className = '', animate = false, children, ...rest }) {
  const base = `glass p-5 sm:p-6 ${className}`;
  if (animate) {
    const MotionTag = motion[as] || motion.div;
    return (
      <MotionTag variants={fadeUp} className={base} {...rest}>
        {children}
      </MotionTag>
    );
  }
  const Tag = as;
  return (
    <Tag className={base} {...rest}>
      {children}
    </Tag>
  );
}
