import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatInput from './ChatInput.jsx';
import { useChat } from '../hooks/useChat.js';

const windowVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 28,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

export default function ChatWindow() {
  const {
    messages,
    isLoading,
    error,

    // ⭐ Backend tool result
    toolResult,

    toggleOpen,

    sendMessage,
    sendQuickAction,

    retry,
    clearChat,
    newChat,

    showQuickActions,
    quickActionsDisabled,
  } = useChat();

  return (
    <motion.div
      variants={windowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed z-[9999] bottom-24 right-5 w-[calc(100vw-2.5rem)] sm:w-[380px] lg:w-[420px] h-[70vh] max-h-[640px] flex flex-col overflow-hidden rounded-3xl border"
      style={{
        borderColor: 'rgba(34,22,63,0.08)',
        boxShadow:
          '0 24px 60px -12px rgba(34,22,63,0.35), 0 8px 24px -8px rgba(255,159,28,0.18)',
        background: 'var(--apna-surface)',
        backdropFilter: 'blur(16px)',
      }}
      role="dialog"
      aria-label="APNA AI support chat"
    >
      <ChatHeader
        onClose={() => toggleOpen(false)}
        onNewChat={newChat}
        onClearChat={clearChat}
      />

      <div className="flex-1 min-h-0">
        <ChatMessages
          messages={messages}
          toolResult={toolResult}
          isLoading={isLoading}
          error={error}
          onQuickAction={sendQuickAction}
          onRetry={retry}
          showQuickActions={showQuickActions}
          quickActionsDisabled={quickActionsDisabled}
        />
      </div>

      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </motion.div>
  );
}