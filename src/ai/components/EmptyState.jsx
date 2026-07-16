import { motion } from 'framer-motion';
import QuickActions from './QuickActions.jsx';

/**
 * Welcome message shown at the top of every conversation.
 */
export default function EmptyState({
  onQuickAction,
  showQuickActions,
  quickActionsDisabled,
}) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const firstName = user?.fullName?.split(' ')[0] || 'there';

  const hour = new Date().getHours();

  let greeting = 'Hello';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else if (hour >= 17 && hour < 22) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Good Night';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-5 py-4"
    >
      {/* Greeting */}
      <div className="text-center">
        <h3
          className="text-xl font-semibold"
          style={{
            fontFamily: 'var(--apna-font-display)',
            color: 'var(--apna-ink)',
          }}
        >
          {greeting}, {firstName} 👋
        </h3>

        <p
          className="mt-2 text-sm"
          style={{
            color: 'var(--apna-muted)',
            lineHeight: '1.7',
          }}
        >
          I'm your <strong>AI Buddy</strong>, your personal shopping assistant.
          <br />
          How can I help you today?
        </p>
      </div>

      {/* Guided Menu */}
      {showQuickActions && (
        <QuickActions
          onSelect={onQuickAction}
          disabled={quickActionsDisabled}
        />
      )}
    </motion.div>
  );
}