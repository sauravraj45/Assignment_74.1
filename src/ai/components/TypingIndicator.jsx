import { motion } from 'framer-motion';

/**
 * Three-dot "AI is typing" indicator, shown inside an AI-style bubble.
 */
export default function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3 w-fit"
      style={{ background: 'var(--apna-cloud)' }}
      aria-label="APNA AI is typing"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-2 h-2 rounded-full"
          style={{ background: 'var(--apna-ink-2)' }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
