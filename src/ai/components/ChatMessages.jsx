import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RotateCcw } from 'lucide-react';
import ChatBubble from './ChatBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import EmptyState from './EmptyState.jsx';

/**
 * @param {{
 *   messages: Array,
 *   isLoading: boolean,
 *   error: string|null,
 *   onQuickAction: (text: string) => void,
 *   onRetry: () => void
 * }} props
 */
export default function ChatMessages({ messages, isLoading, error, onQuickAction, onRetry }) {
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message whenever the list changes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, error]);

  if (messages.length === 0 && !isLoading) {
    return <EmptyState onQuickAction={onQuickAction} />;
  }

  return (
    <div
      className="apna-scroll flex flex-col gap-4 px-4 py-4 overflow-y-auto h-full"
      style={{ background: 'var(--apna-surface)' }}
    >
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-2"
          >
            <div
              className="w-7 h-7 rounded-full shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--apna-marigold), var(--apna-ink-2))' }}
            />
            <TypingIndicator />
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs"
            style={{ background: '#fdecec', color: 'var(--apna-danger)' }}
          >
            <AlertCircle size={15} className="shrink-0" />
            <span className="flex-1">Unable to connect.</span>
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-1 font-medium underline underline-offset-2"
            >
              <RotateCcw size={12} />
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
