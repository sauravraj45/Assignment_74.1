import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { ChatProvider } from '../context/ChatContext.jsx';
import { useChat } from '../hooks/useChat.js';
import ChatWindow from './ChatWindow.jsx';
import '../styles/theme.css';
import { useState, useEffect } from 'react';


function LauncherButton() {
  const { isOpen, toggleOpen } = useChat();

  return (
    <motion.button
      type="button"
      onClick={() => toggleOpen()}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed z-[9999] bottom-5 right-5 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, var(--apna-marigold), var(--apna-ink-2))',
        boxShadow: '0 12px 28px -6px rgba(255,159,28,0.55)',
      }}
      aria-label={isOpen ? 'Close APNA AI support chat' : 'Open APNA AI support chat'}
    >
      {/* Ambient pulse ring — a quiet "someone's listening" cue */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: 'var(--apna-marigold)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            <X size={22} color="#fff" />
          </motion.span>
        ) : (
          <motion.span
            key="chat"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            <MessageCircle size={22} color="#fff" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function WidgetInner() {
  const { isOpen } = useChat();

  return (
    <>
      <LauncherButton />
      <AnimatePresence>{isOpen && <ChatWindow />}</AnimatePresence>
    </>
  );
}

/**
 * <ChatWidget /> — drop this once anywhere in your app tree
 * (e.g. in App.jsx, alongside your routes) and it renders a fully
 * self-contained floating AI support launcher + chat window.
 *
 * Requires:
 *  - `localStorage.token` to already hold a valid JWT
 *  - `VITE_AI_API_URL` set in your .env
 */
export default function ChatWidget() {
  return (
    <div className="apna-ai-root">
      <ChatProvider>
        <WidgetInner />
      </ChatProvider>
    </div>
  );
}
