import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { formatTimestamp } from '../utils/messageParser.js';

/**
 * Renders one message bubble, aligned left for the AI and right for the user.
 *
 * @param {{ message: { id: string, role: 'user'|'ai', content: string, timestamp: number } }} props
 */
export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: isUser ? 'var(--apna-ink)' : 'linear-gradient(135deg, var(--apna-marigold), var(--apna-ink-2))',
        }}
      >
        {isUser ? (
          <User size={14} color="#fff" />
        ) : (
          <Bot size={14} color="#fff" />
        )}
      </div>

      <div className={`flex flex-col max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
            isUser ? 'rounded-br-md' : 'rounded-bl-md'
          }`}
          style={{
            background: isUser
              ? 'linear-gradient(135deg, var(--apna-ink), var(--apna-ink-2))'
              : 'var(--apna-cloud)',
            color: isUser ? '#fff' : 'var(--apna-ink-text)',
          }}
        >
          <div className="apna-markdown [&_p]:m-0 [&_p+p]:mt-2 [&_a]:underline [&_ul]:pl-4 [&_ul]:m-0 [&_ol]:pl-4 [&_ol]:m-0 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs"
               style={{ '--tw-prose-code': isUser ? '#fff' : 'var(--apna-ink)' }}>
            <ReactMarkdown
              components={{
                code: ({ children }) => (
                  <code
                    style={{
                      background: isUser ? 'rgba(255,255,255,0.15)' : 'rgba(34,22,63,0.08)',
                      fontFamily: 'var(--apna-font-mono)',
                    }}
                  >
                    {children}
                  </code>
                ),
                a: ({ children, href }) => (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        <span className="text-[10px] mt-1 px-1" style={{ color: 'var(--apna-muted)' }}>
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
