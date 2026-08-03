import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { formatTimestamp } from '../utils/messageParser.js';
import AIProductCard from './AIProductCard.jsx';
import AIComparisonCard from "./AIComparisonCard.jsx";

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  const toolResult = message.toolResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: isUser
            ? 'var(--apna-ink)'
            : 'linear-gradient(135deg,var(--apna-marigold),var(--apna-ink-2))',
        }}
      >
        {isUser ? (
          <User size={14} color="#fff" />
        ) : (
          <Bot size={14} color="#fff" />
        )}
      </div>

      <div
        className={`flex flex-col max-w-[78%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        {/* Message */}

        <div
          className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
            isUser ? 'rounded-br-md' : 'rounded-bl-md'
          }`}
          style={{
            background: isUser
              ? 'linear-gradient(135deg,var(--apna-ink),var(--apna-ink-2))'
              : 'var(--apna-cloud)',
            color: isUser ? '#fff' : 'var(--apna-ink-text)',
          }}
        >
          <div className="apna-markdown [&_p]:m-0 [&_p+p]:mt-2 [&_a]:underline [&_ul]:pl-4 [&_ol]:pl-4">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Timestamp */}

        <span
          className="text-[10px] mt-1 px-1"
          style={{
            color: 'var(--apna-muted)',
          }}
        >
          {formatTimestamp(message.timestamp)}
        </span>

        {/* ======================================
            PRODUCT SEARCH
        ======================================= */}

        {!isUser &&
          toolResult?.type === "product_search" &&
          toolResult?.recommendations?.length > 0 && (
            <div className="mt-3 flex flex-col gap-3 w-full">
              {toolResult.recommendations.map((product) => (
                <AIProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
        )}

        {/* ======================================
            PRODUCT DETAILS
        ======================================= */}

        {!isUser &&
          toolResult?.type === "product_details" &&
          toolResult?.product && (
            <div className="mt-3 w-full">
              <AIProductCard
                product={toolResult.product}
              />
            </div>
        )}

        {/* ======================================
            PRODUCT RECOMMENDATION
        ======================================= */}

        {!isUser &&
          toolResult?.type === "product_recommendation" &&
          toolResult?.recommendations?.length > 0 && (
            <div className="mt-3 flex flex-col gap-3 w-full">
              {toolResult.recommendations.map((product) => (
                <AIProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
        )}

            {/* ======================================
        PRODUCT COMPARE
    ====================================== */}

    {!isUser &&
      toolResult?.type === "product_compare" &&
      toolResult?.products?.length >= 2 && (

        <div className="mt-3 w-full">

          <AIComparisonCard
            products={toolResult.products}
            comparison={toolResult.comparison}
          />

        </div>

      )}

        
      </div>
    </motion.div>
  );
}