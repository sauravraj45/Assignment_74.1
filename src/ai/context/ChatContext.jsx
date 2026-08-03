import { createContext, useReducer, useMemo } from 'react';

export const ChatContext = createContext(null);

const STORAGE_KEY = 'apna_ai_conversation_id';

const initialState = {
  isOpen: false,
  messages: [],
  conversationId: localStorage.getItem(STORAGE_KEY) || null,
  isLoading: false,
  error: null,
  lastFailedMessage: null,

  // ⭐ Latest AI tool result
  toolResult: null,

  // Quick Actions
  showQuickActions: true,
  quickActionsDisabled: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_OPEN':
      return {
        ...state,
        isOpen: action.value ?? !state.isOpen,
      };

    case 'SEND_START':
      return {
        ...state,
        messages: [...state.messages, action.message],
        isLoading: true,
        error: null,
        lastFailedMessage: null,
      };

    case 'SEND_SUCCESS':
      localStorage.setItem(STORAGE_KEY, action.conversationId);

      return {
        ...state,
        messages: [...state.messages, action.reply],
        conversationId: action.conversationId,
        toolResult: action.toolResult ?? null,
        isLoading: false,
      };

    case 'SEND_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        lastFailedMessage: action.originalMessage,
      };

    // ==========================
    // Quick Actions
    // ==========================

    case 'DISABLE_QUICK_ACTIONS':
      return {
        ...state,
        quickActionsDisabled: true,
      };

    case 'ENABLE_QUICK_ACTIONS':
      return {
        ...state,
        quickActionsDisabled: false,
      };

    case 'HIDE_QUICK_ACTIONS':
      return {
        ...state,
        showQuickActions: false,
      };

    case 'SHOW_QUICK_ACTIONS':
      return {
        ...state,
        showQuickActions: true,
      };

    // ==========================
    // Chat Reset
    // ==========================

    case 'CLEAR_CHAT':
      localStorage.removeItem(STORAGE_KEY);

      return {
        ...state,
        messages: [],
        conversationId: null,
        isLoading: false,
        error: null,
        lastFailedMessage: null,
        toolResult: null,

        showQuickActions: true,
        quickActionsDisabled: false,
      };

    case 'NEW_CHAT':
      localStorage.removeItem(STORAGE_KEY);

      return {
        ...initialState,
        isOpen: state.isOpen,
        conversationId: null,
        toolResult: null,

        showQuickActions: true,
        quickActionsDisabled: false,
      };

    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}