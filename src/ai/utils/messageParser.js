/**
 * Generates a reasonably unique id for a locally-created message.
 * Falls back gracefully if crypto.randomUUID isn't available.
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Formats a Date (or timestamp) into a short local time string, e.g. "10:42 AM".
 */
export function formatTimestamp(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Builds a normalized message object used throughout the chat UI.
 *
 * @param {'user'|'ai'} role
 * @param {string} content
 * @param {{ status?: 'sent'|'sending'|'error' }} [meta]
 */
export function createMessage(role, content, meta = {}) {
  return {
    id: generateId(),
    role,
    content,
    timestamp: Date.now(),
    status: meta.status || 'sent',
  };
}

/**
 * Strips characters that could break simple text rendering while
 * leaving markdown syntax intact for react-markdown to interpret.
 */
export function sanitizePlainInput(text) {
  return text.replace(/\u0000/g, '').trim();
}
