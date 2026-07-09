import { useCallback, useContext, useRef } from 'react';
import { ChatContext } from '../context/ChatContext.jsx';
import { sendChatMessage } from '../services/chatApi.js';
import { createMessage } from '../utils/messageParser.js';

/**
 * useChat — the single hook the UI components need to talk to the
 * AI support backend. Wraps ChatContext + chatApi so components never
 * touch axios or reducer actions directly.
 */
export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChat must be used within a <ChatProvider>');
  }
  const { state, dispatch } = ctx;
  const abortRef = useRef(null);

  const toggleOpen = useCallback(
    (value) => dispatch({ type: 'TOGGLE_OPEN', value }),
    [dispatch]
  );

  const dispatchSend = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || state.isLoading) return;

      const userMessage = createMessage('user', trimmed);
      dispatch({ type: 'SEND_START', message: userMessage });

      abortRef.current = new AbortController();

      try {
        const data = await sendChatMessage(trimmed, state.conversationId, {
          signal: abortRef.current.signal,
        });

        if (!data.success) {
          throw new Error(data.reply || 'The assistant could not process that.');
        }

        const aiMessage = createMessage('ai', data.reply);
        dispatch({
          type: 'SEND_SUCCESS',
          reply: aiMessage,
          conversationId: data.conversation_id,
        });
      } catch (err) {
        dispatch({
          type: 'SEND_ERROR',
          error: err?.message || 'Unable to connect.',
          originalMessage: trimmed,
        });
      }
    },
    [state.isLoading, state.conversationId, dispatch]
  );

  const sendMessage = useCallback((text) => dispatchSend(text), [dispatchSend]);

  const retry = useCallback(() => {
    if (state.lastFailedMessage) {
      dispatchSend(state.lastFailedMessage);
    }
  }, [state.lastFailedMessage, dispatchSend]);

  const clearChat = useCallback(() => dispatch({ type: 'CLEAR_CHAT' }), [dispatch]);
  const newChat = useCallback(() => dispatch({ type: 'NEW_CHAT' }), [dispatch]);

  return {
    isOpen: state.isOpen,
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    conversationId: state.conversationId,
    toggleOpen,
    sendMessage,
    retry,
    clearChat,
    newChat,
  };
}
