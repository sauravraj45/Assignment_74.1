import axios from 'axios';

/**
 * Base URL for the AI support backend.
 * Configure per environment via a `.env` file:
 *   VITE_AI_API_URL=https://your-fastapi-backend.onrender.com
 */
const API_URL = import.meta.env.VITE_AI_API_URL || '';

/**
 * Dedicated axios instance for the AI chat module.
 * Kept isolated from any other axios instance the host app may use.
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT stored by the host app on every request.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token?.trim()) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Sends a message to the AI support endpoint.
 *
 * @param {string} message - The user's message text.
 * @param {string|null} conversationId - Existing conversation id, or null to start a new one.
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ success: boolean, reply: string, conversation_id: string }>}
 */
export async function sendChatMessage(message, conversationId, options = {}) {
  const { data } = await apiClient.post(
    '/chat',
    {
      message,
      conversation_id: conversationId,
    },
    { signal: options.signal }
  );
  return data;
}

export default apiClient;
