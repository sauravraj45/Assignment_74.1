import { motion } from 'framer-motion';

/**
 * Compact loading spinner used inside buttons (e.g. Send, Retry)
 * while a request is in flight.
 *
 * @param {{ color?: string, size?: number }} props
 */
export default function LoadingDots({ color = '#ffffff', size = 5 }) {
  return (
    <span className="inline-flex items-center gap-1" role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: 999,
            background: color,
            display: 'inline-block',
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </span>
  );
}
