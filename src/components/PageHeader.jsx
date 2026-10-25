import { motion } from 'framer-motion';

export default function PageHeader({ icon: IconCmp, title, subtitle, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="flex items-start gap-4">
        {IconCmp && (
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-blush-500 text-white shadow-lg shadow-brand-500/30"
            aria-hidden="true"
          >
            <IconCmp size={28} />
          </span>
        )}
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 max-w-2xl text-base text-slate-600">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </motion.div>
  );
}
