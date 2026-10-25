import { ExternalLink, Phone, Smartphone } from 'lucide-react';
import { RESOURCES } from '../data/library';
import { useLang } from '../context/LanguageContext';

export default function ResourceList({ ids = [] }) {
  const { tr, t } = useLang();
  if (!ids.length) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {ids.map((id) => {
        const r = RESOURCES[id];
        if (!r) return null;
        const body = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              {r.tel ? <Phone size={20} aria-hidden="true" /> : r.url ? <ExternalLink size={20} aria-hidden="true" /> : <Smartphone size={20} aria-hidden="true" />}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-ink">{tr(r.label)}</span>
              <span className="block break-words text-sm font-medium text-brand-700">{r.detail}</span>
            </span>
          </>
        );
        const cls =
          'flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/80 p-3 transition hover:border-brand-300 hover:bg-white';
        return (
          <li key={id}>
            {r.tel ? (
              <a href={`tel:${r.tel}`} className={cls} aria-label={`${tr(r.label)} ${r.detail} — ${t('common.tapToCall')}`}>
                {body}
              </a>
            ) : r.url ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className={cls}>
                {body}
              </a>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
