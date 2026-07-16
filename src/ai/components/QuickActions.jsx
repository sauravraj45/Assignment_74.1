import { motion } from 'framer-motion';

const ACTIONS = [
  'An order I placed',
  'Not about an Order',
];

export default function QuickActions({
  onSelect,
  disabled,
}) {
  const handleClick = (label) => {
    if (disabled) return;

    onSelect(label);
  };

  return (
    <div className="w-full flex justify-start pl-5 mt-5">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block overflow-hidden rounded-xl border"
        style={{
          borderColor: '#dcdcdc',
          background: disabled ? '#f3f4f6' : '#ffffff',
        }}
      >
        {/* Empty Row */}
        <div
          style={{
            height: '24px',
            borderBottom: '1px solid #ececec',
            background: disabled ? '#f3f4f6' : '#ffffff',
          }}
        />

        {ACTIONS.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(label)}
            className="block w-full whitespace-nowrap text-left transition-colors"
            style={{
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 400,
              color: '#2874F0',
              background: disabled ? '#f3f4f6' : '#ffffff',
              cursor: disabled ? 'not-allowed' : 'pointer',
              borderBottom:
                index !== ACTIONS.length - 1
                  ? '1px solid #ececec'
                  : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </motion.div>
    </div>
  );
}