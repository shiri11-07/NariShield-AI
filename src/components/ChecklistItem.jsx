import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// A large, keyboard-friendly checkbox row. The whole row is the button.
export default function ChecklistItem({ checked, onToggle, children, index }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={!!checked}
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition sm:p-4 ${
        checked ? 'border-emerald-300 bg-emerald-50/80' : 'border-brand-100 bg-white/80 hover:border-brand-300'
      }`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold ${
          checked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-brand-300 bg-white text-brand-700'
        }`}
        aria-hidden="true"
      >
        {checked ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
            <Check size={18} strokeWidth={3} />
          </motion.span>
        ) : (
          index != null && <span>{index}</span>
        )}
      </span>
      <span className={`text-base ${checked ? 'text-slate-600 line-through decoration-emerald-400/70' : 'text-slate-800'}`}>
        {children}
      </span>
    </button>
  );
}
