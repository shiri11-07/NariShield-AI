import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, label, showValue = true, height = 'h-3', tone = 'brand' }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const fill =
    tone === 'pink'
      ? 'from-blush-400 to-brand-500'
      : tone === 'green'
        ? 'from-emerald-400 to-teal-500'
        : 'from-brand-500 to-indigo-500';
  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>{label}</span>
          {showValue && <span>{pct}%</span>}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-brand-100 ${height}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${fill}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
