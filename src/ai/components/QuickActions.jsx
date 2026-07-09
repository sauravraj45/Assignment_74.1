import { motion } from 'framer-motion';
import { Truck, Package, MapPin, CreditCard, Undo2, ShoppingBag } from 'lucide-react';

const ACTIONS = [
  { label: 'Track My Order', icon: Truck },
  { label: 'Show My Orders', icon: Package },
  { label: 'My Addresses', icon: MapPin },
  { label: 'Payment Help', icon: CreditCard },
  { label: 'Return Order', icon: Undo2 },
  { label: 'Shopping Help', icon: ShoppingBag },
];

/**
 * Grid of quick-reply shortcuts. Selecting one sends its label as a message.
 *
 * @param {{ onSelect: (text: string) => void }} props
 */
export default function QuickActions({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {ACTIONS.map(({ label, icon: Icon }, i) => (
        <motion.button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-left border transition-colors"
          style={{
            borderColor: 'var(--apna-marigold-soft)',
            background: 'var(--apna-surface)',
            color: 'var(--apna-ink)',
          }}
        >
          <Icon size={15} style={{ color: 'var(--apna-marigold)' }} strokeWidth={2.25} />
          <span>{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
