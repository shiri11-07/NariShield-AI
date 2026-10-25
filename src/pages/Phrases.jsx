import { useState } from 'react';
import { BookmarkPlus, MessageSquareQuote, RefreshCw, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { INTENTS } from '../data/phrases';

export default function Phrases() {
  const { codes, addCode, deleteCode, circle, notify } = useApp();
  const { t, tr } = useLang();
  const [intentId, setIntentId] = useState('leave');
  const [index, setIndex] = useState(0);
  const [contactId, setContactId] = useState('');
  const intent = INTENTS.find((i) => i.id === intentId);
  const phrase = intent.phrases[index % intent.phrases.length];

  const save = () => {
    addCode({
      intent: intent.id,
      phrase,
      contact: circle.find((c) => c.id === contactId)?.name || '',
    });
    notify(t('phrases.saved'));
  };

  return (
    <div>
      <PageHeader icon={MessageSquareQuote} title={t('phrases.title')} subtitle={t('phrases.subtitle')} />
      <GlassCard className="mb-5">
        <p className="text-slate-700">{t('phrases.how')}</p>
        <p className="mt-2 text-sm font-semibold text-amber-800">{t('phrases.demoOnly')}</p>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <GlassCard>
          <h2 className="mb-3 text-lg font-bold text-ink">{t('phrases.pick')}</h2>
          <div className="space-y-2" role="radiogroup" aria-label={t('phrases.pick')}>
            {INTENTS.map((i) => (
              <button
                key={i.id}
                type="button"
                role="radio"
                aria-checked={intentId === i.id}
                onClick={() => {
                  setIntentId(i.id);
                  setIndex(0);
                }}
                className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-semibold transition ${
                  intentId === i.id ? 'border-brand-600 bg-brand-50 text-ink' : 'border-brand-100 bg-white/80 text-slate-700 hover:border-brand-300'
                }`}
              >
                <Icon name={i.icon} size={22} className="shrink-0 text-brand-600" />
                {tr(i.title)}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="bg-gradient-to-br from-white/85 to-brand-100/80">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-700">{t('phrases.generated')}</p>
            <div className="my-4 rounded-3xl bg-white p-5 shadow-lg">
              <p className="text-xl font-bold leading-snug text-ink">“{tr(phrase)}”</p>
            </div>
            <p className="text-base text-slate-700"><b>{t('phrases.meaning')}:</b> {tr(intent.meaning)}</p>
            {circle.length > 0 && (
              <div className="mt-4">
                <label className="label" htmlFor="ph-contact">{t('phrases.shareWith')}</label>
                <select id="ph-contact" className="input" value={contactId} onChange={(e) => setContactId(e.target.value)}>
                  <option value="">{t('phrases.nobody')}</option>
                  {circle.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="btn-soft" onClick={() => setIndex((n) => n + 1)}>
                <RefreshCw size={20} aria-hidden="true" />
                {t('phrases.another')}
              </button>
              <button type="button" className="btn-primary" onClick={save}>
                <BookmarkPlus size={20} aria-hidden="true" />
                {t('phrases.save')}
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-3 text-lg font-bold text-ink">{t('phrases.book')}</h2>
            {codes.length === 0 ? (
              <p className="text-slate-600">{t('phrases.bookEmpty')}</p>
            ) : (
              <ul className="space-y-3">
                {codes.map((c) => {
                  const it = INTENTS.find((i) => i.id === c.intent);
                  return (
                    <li key={c.id} className="flex items-start justify-between gap-3 rounded-2xl border border-brand-100 bg-white/80 p-3">
                      <div>
                        <p className="font-bold text-ink">“{tr(c.phrase)}”</p>
                        <p className="text-sm text-slate-600">
                          {tr(it?.title)}{c.contact ? ` · ${c.contact}` : ''}
                        </p>
                      </div>
                      <button type="button" className="btn-danger btn-sm" onClick={() => deleteCode(c.id)} aria-label={t('common.delete')}>
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
