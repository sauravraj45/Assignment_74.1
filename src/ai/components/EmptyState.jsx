import { motion } from 'framer-motion';
import QuickActions from './QuickActions.jsx';

/**
 * Welcome screen shown when a conversation has no messages yet.
 *
 * @param {{ onQuickAction: (text: string) => void }} props
 */
export default function EmptyState({ onQuickAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8 gap-4 h-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
        style={{
          background: 'linear-gradient(135deg, var(--apna-marigold), var(--apna-ink-2))',
        }}
      >
        👋
      </motion.div>

      <div>
        <h3
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--apna-font-display)', color: 'var(--apna-ink)' }}
        >
          Hello 👋 I'm APNA AI
        </h3>
        <p className="text-sm mt-1" style={{ color: 'var(--apna-muted)' }}>
          How can I help you today?
        </p>
      </div>

      <div className="w-full mt-2">
        <QuickActions onSelect={onQuickAction} />
      </div>
    </div>
  );
}
