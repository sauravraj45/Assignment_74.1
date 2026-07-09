import { motion } from 'framer-motion';
import { Bot, X, RefreshCcw, Trash2 } from 'lucide-react';

/**
 * @param {{ onClose: () => void, onNewChat: () => void, onClearChat: () => void }} props
 */
export default function ChatHeader({ onClose, onNewChat, onClearChat }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, var(--apna-ink), var(--apna-ink-2))' }}>
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <Bot size={20} color="#fff" />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{ background: 'var(--apna-teal)', borderColor: 'var(--apna-ink)' }}
            />
          </div>
          <div>
            <p
              className="text-sm font-semibold text-white"
              style={{ fontFamily: 'var(--apna-font-display)' }}
            >
              APNA AI
            </p>
            <p className="text-[11px] text-white/70">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="New chat"
            onClick={onNewChat}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCcw size={16} />
          </button>
          <button
            type="button"
            title="Clear chat"
            onClick={onClearChat}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <motion.button
            type="button"
            title="Close"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </motion.button>
        </div>
      </div>

      {/* Signature element — marigold toran (garland) thread */}
      <div className="apna-toran">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
    </div>
  );
}
