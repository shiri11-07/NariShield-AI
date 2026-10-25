import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';

const ICONS = { success: CheckCircle2, info: Info, warn: TriangleAlert };

export default function Toasts() {
  const { toasts, dismissToast } = useApp();
  const { t } = useLang();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4 lg:bottom-8"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const IconCmp = ICONS[toast.tone] || Info;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass-strong pointer-events-auto flex max-w-md items-start gap-3 px-4 py-3 text-base font-medium text-ink"
            >
              <IconCmp className="mt-0.5 shrink-0 text-brand-600" size={20} aria-hidden="true" />
              <span className="flex-1">{toast.message}</span>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label={t('common.close')}
                className="rounded-lg p-1 text-slate-500 hover:bg-brand-50"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
