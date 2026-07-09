import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import LoadingDots from './LoadingDots.jsx';

/**
 * @param {{ onSend: (text: string) => void, isLoading: boolean }} props
 */
export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Shift+Enter falls through and inserts a newline naturally.
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-grow the textarea up to a sensible max height.
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
  };

  return (
    <div
      className="flex items-end gap-2 px-3 py-3 border-t"
      style={{ borderColor: 'rgba(34,22,63,0.08)', background: 'var(--apna-surface)' }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask about your order, returns, payments…"
        className="flex-1 resize-none outline-none text-sm px-3 py-2.5 rounded-xl border bg-white placeholder:text-[color:var(--apna-muted)]"
        style={{ borderColor: 'rgba(34,22,63,0.12)', color: 'var(--apna-ink-text)', maxHeight: 96 }}
        disabled={isLoading}
      />
      <motion.button
        type="button"
        onClick={handleSend}
        disabled={isLoading || !value.trim()}
        whileHover={{ scale: value.trim() ? 1.05 : 1 }}
        whileTap={{ scale: value.trim() ? 0.95 : 1 }}
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        style={{ background: 'linear-gradient(135deg, var(--apna-marigold), var(--apna-ink-2))' }}
        aria-label="Send message"
      >
        {isLoading ? <LoadingDots color="#fff" /> : <SendHorizontal size={17} color="#fff" />}
      </motion.button>
    </div>
  );
}
