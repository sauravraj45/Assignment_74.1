
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

      dispatch({
        type: 'SEND_START',
        message: userMessage,
      });

      abortRef.current = new AbortController();

      try {
        const data = await sendChatMessage(
          trimmed,
          state.conversationId,
          {
            signal: abortRef.current.signal,
          }
        );

        if (!data.success) {
          throw new Error(
            data.message ||
            data.reply ||
            'Something went wrong.'
          );
        }

        const aiMessage = createMessage('ai', data.reply);

        dispatch({
          type: 'SEND_SUCCESS',
          reply: aiMessage,
          conversationId: data.conversation_id,
        });
      } catch (err) {
        console.error('Chat Error:', err);

        let errorMessage =
          'Something went wrong. Please try again.';

        // Request never reached the server
        if (!err.response) {
          errorMessage =
            'Unable to connect to the server. Please check your internet connection.';
        }

        // FastAPI returned a JSON response
        else if (err.response.data) {
          errorMessage =
            err.response.data.message ||
            err.response.data.detail ||
            errorMessage;
        }

        dispatch({
          type: 'SEND_ERROR',
          error: errorMessage,
          originalMessage: trimmed,
        });
      }
    },
    [state.isLoading, state.conversationId, dispatch]
  );
const sendQuickAction = useCallback(
  (text) => {
    dispatch({ type: 'DISABLE_QUICK_ACTIONS' });
    dispatchSend(text);
  },
  [dispatch, dispatchSend]
);

const sendUserMessage = useCallback(
  (text) => {
    dispatch({ type: 'HIDE_QUICK_ACTIONS' });
    dispatchSend(text);
  },
  [dispatch, dispatchSend]
);


  const retry = useCallback(() => {
    if (state.lastFailedMessage) {
      dispatchSend(state.lastFailedMessage);
    }
  }, [state.lastFailedMessage, dispatchSend]);

  const clearChat = useCallback(
    () => dispatch({ type: 'CLEAR_CHAT' }),
    [dispatch]
  );

  const newChat = useCallback(
    () => dispatch({ type: 'NEW_CHAT' }),
    [dispatch]
  );

  return {
  isOpen: state.isOpen,
  messages: state.messages,
  isLoading: state.isLoading,
  error: state.error,
  conversationId: state.conversationId,

  // ⭐ New states
  showQuickActions: state.showQuickActions,
  quickActionsDisabled: state.quickActionsDisabled,

  toggleOpen,

  // ⭐ Different message handlers
  sendMessage: sendUserMessage,
  sendQuickAction,

  retry,
  clearChat,
  newChat,
};
}