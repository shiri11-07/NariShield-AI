import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input:not([type="hidden"]),select,[tabindex]:not([tabindex="-1"])';

export default function Modal({ open, onClose, title, children, wide = false }) {
  const { t } = useLang();
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRef.current();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll(FOCUSABLE);
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector('input,select,textarea') || panelRef.current?.querySelector('button');
      target?.focus();
    }, 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      if (previous && previous.focus) previous.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`glass-strong max-h-[92vh] w-full overflow-y-auto rounded-b-none p-5 sm:rounded-b-3xl sm:p-7 ${
              wide ? 'sm:max-w-3xl' : 'sm:max-w-xl'
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="btn-soft btn-sm !min-h-[44px] !min-w-[44px] !px-2"
                aria-label={t('common.close')}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
