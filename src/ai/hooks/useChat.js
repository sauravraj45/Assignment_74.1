import { useCallback, useContext, useRef } from 'react';
import { ChatContext } from '../context/ChatContext.jsx';
import { sendChatMessage } from '../services/chatApi.js';
import { createMessage } from '../utils/messageParser.js';

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

        // ==========================================
        // Save latest AI tool result
        // ==========================================

        if (data.tool_result) {

          localStorage.setItem(
            "apna_ai_tool_result",
            JSON.stringify(data.tool_result)
          );

          // ----------------------------------------
          // Existing AI Product Cache
          // ----------------------------------------

          const existingProducts = JSON.parse(
            localStorage.getItem("apna_ai_products") || "[]"
          );

          const productMap = new Map();

          existingProducts.forEach((product) => {
            productMap.set(product.id, product);
          });

          // ----------------------------------------
          // Product Search
          // ----------------------------------------

          if (data.tool_result.type === "product_search") {

            (data.tool_result.recommendations || []).forEach((product) => {
              productMap.set(product.id, product);
            });

          }

          // ----------------------------------------
          // Product Recommendation
          // ----------------------------------------

          else if (
            data.tool_result.type === "product_recommendation"
          ) {

            (data.tool_result.recommendations || []).forEach((product) => {
              productMap.set(product.id, product);
            });

          }

          // ----------------------------------------
          // Product Details
          // ----------------------------------------

          else if (
            data.tool_result.type === "product_details" &&
            data.tool_result.product
          ) {

            productMap.set(
              data.tool_result.product.id,
              data.tool_result.product
            );

          }
                    // ----------------------------------------
            // Product Compare
            // ----------------------------------------

            else if (
              data.tool_result.type === "product_compare"
            ) {

              (data.tool_result.products || []).forEach((product) => {

                productMap.set(
                  product.id,
                  product
                );

              });

            }

         

          // ----------------------------------------
          // Save merged cache
          // ----------------------------------------

          localStorage.setItem(
            "apna_ai_products",
            JSON.stringify(
              Array.from(productMap.values())
            )
          );
        }

        // ==========================================
        // AI Message
        // ==========================================

        const aiMessage = createMessage(
          'ai',
          data.reply,
          {
            toolResult: data.tool_result ?? null,
          }
        );

        dispatch({
          type: 'SEND_SUCCESS',
          reply: aiMessage,
          conversationId: data.conversation_id,
          toolResult: data.tool_result ?? null,
        });

      } catch (err) {

        console.error('Chat Error:', err);

        let errorMessage =
          'Something went wrong. Please try again.';

        if (!err.response) {

          errorMessage =
            'Unable to connect to the server. Please check your internet connection.';

        } else if (err.response.data) {

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

  // ==========================================
  // Clear Chat
  // ==========================================

  const clearChat = useCallback(() => {

    localStorage.removeItem("apna_ai_products");
    localStorage.removeItem("apna_ai_tool_result");

    dispatch({
      type: 'CLEAR_CHAT',
    });

  }, [dispatch]);

  // ==========================================
  // New Chat
  // ==========================================

  const newChat = useCallback(() => {

    localStorage.removeItem("apna_ai_products");
    localStorage.removeItem("apna_ai_tool_result");

    dispatch({
      type: 'NEW_CHAT',
    });

  }, [dispatch]);

  return {
    isOpen: state.isOpen,
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    conversationId: state.conversationId,

    toolResult: state.toolResult,

    showQuickActions: state.showQuickActions,
    quickActionsDisabled: state.quickActionsDisabled,

    toggleOpen,

    sendMessage: sendUserMessage,
    sendQuickAction,

    retry,
    clearChat,
    newChat,
  };
}