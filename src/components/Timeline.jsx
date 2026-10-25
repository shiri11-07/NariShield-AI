import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { EVENT_TYPES } from '../data/categories';
import { useLang } from '../context/LanguageContext';
import Icon from './Icon';
import Modal from './Modal';
import { stagger, slideInLeft } from '../animations/variants';

export default function Timeline({ events = [], onDelete, demo = false }) {
  const { t, tr, fmt } = useLang();
  const [zoom, setZoom] = useState(null);
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!sorted.length) {
    return (
      <p className="rounded-2xl border border-dashed border-brand-300 bg-white/60 p-6 text-center text-slate-600">
        {t('evidence.noEvents')}
      </p>
    );
  }

  return (
    <>
      <motion.ol variants={stagger(0.08)} initial="hidden" animate="show" className="relative space-y-5 pl-2">
        <span
          className="absolute bottom-3 left-[27px] top-3 w-1 rounded-full bg-gradient-to-b from-brand-400 via-indigo-300 to-blush-300"
          aria-hidden="true"
        />
        {sorted.map((ev, i) => {
          const type = EVENT_TYPES[ev.type] || EVENT_TYPES.note;
          return (
            <motion.li key={ev.id} variants={slideInLeft} className="relative flex gap-4">
              <span
                className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ background: type.color }}
                aria-hidden="true"
              >
                <Icon name={type.icon} size={24} />
              </span>
              <div className="glass min-w-0 flex-1 !rounded-2xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: type.color }}>
                      {t('evidence.step', { n: i + 1 })} · {tr(type.label)}
                    </p>
                    <h4 className="text-lg font-bold text-ink">{ev.title}{demo ? <span className="ml-2 text-xs font-semibold text-amber-800">({t('common.demoData')})</span> : null}</h4>
                  </div>
                  <time className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800" dateTime={ev.date}>
                    {fmt(ev.date)}
                  </time>
                </div>
                {ev.detail && <p className="mt-2 text-base text-slate-700">{ev.detail}</p>}
                {ev.url && (
                  <p className="mt-2 break-all rounded-xl bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800">{ev.url}</p>
                )}
                {ev.image && (
                  <button
                    type="button"
                    onClick={() => setZoom(ev)}
                    className="mt-3 block overflow-hidden rounded-2xl border border-brand-200"
                    aria-label={t('evidence.viewImage')}
                  >
                    <img src={ev.image} alt={ev.title} className="max-h-44 w-auto object-cover" />
                  </button>
                )}
                {onDelete && (
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onDelete(ev.id)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      {t('common.delete')}
                    </button>
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      <Modal open={!!zoom} onClose={() => setZoom(null)} title={zoom?.title || ''} wide>
        {zoom?.image && <img src={zoom.image} alt={zoom.title} className="w-full rounded-2xl" />}
      </Modal>
    </>
  );
}
