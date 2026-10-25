import { useMemo, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BookHeart, Lightbulb, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { JOURNAL_PROMPTS, MOODS } from '../data/demoJournal';

export default function Journal() {
  const { journal, addJournalEntry, deleteJournalEntry, incidents, notify } = useApp();
  const { t, tr, fmt } = useLang();
  const [mood, setMood] = useState(3);
  const [text, setText] = useState('');
  const [promptIdx, setPromptIdx] = useState(0);

  const sorted = useMemo(() => [...journal].sort((a, b) => new Date(b.date) - new Date(a.date)), [journal]);
  const chart = useMemo(
    () =>
      [...journal]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((j) => ({ date: fmt(j.date, false), mood: j.mood })),
    [journal, fmt],
  );

  // Recovery timeline: journal entries interleaved with incident milestones.
  const timeline = useMemo(() => {
    const items = [
      ...journal.map((j) => ({ id: j.id, date: j.date, kind: 'journal', mood: j.mood, text: j.text, demo: j.demo || ['j1', 'j2', 'j3'].includes(j.id) })),
      ...incidents.map((i) => ({ id: `i-${i.id}`, date: i.createdAt, kind: 'incident', text: i.title })),
      ...incidents
        .filter((i) => i.status === 'resolved')
        .map((i) => ({ id: `r-${i.id}`, date: i.events?.[i.events.length - 1]?.date || i.createdAt, kind: 'resolved', text: i.title })),
    ];
    return items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 12);
  }, [journal, incidents]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addJournalEntry({ mood, text: text.trim() });
    setText('');
    notify(t('journal.saved'));
  };

  return (
    <div>
      <PageHeader icon={BookHeart} title={t('journal.title')} subtitle={t('journal.subtitle')} />
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <GlassCard>
          <form onSubmit={submit} className="space-y-4">
            <fieldset>
              <legend className="label">{t('journal.mood')}</legend>
              <div className="grid grid-cols-5 gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    aria-pressed={mood === m.value}
                    aria-label={tr(m.label)}
                    onClick={() => setMood(m.value)}
                    className={`flex min-h-[64px] flex-col items-center justify-center rounded-2xl border-2 text-2xl transition ${
                      mood === m.value ? 'border-brand-600 bg-brand-50' : 'border-brand-100 bg-white/80 hover:border-brand-300'
                    }`}
                  >
                    <span aria-hidden="true">{m.emoji}</span>
                    <span className="text-[11px] font-semibold text-slate-700">{tr(m.label)}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex items-start gap-2 rounded-2xl bg-amber-50 p-3 text-sm text-amber-900">
              <Lightbulb size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {tr(JOURNAL_PROMPTS[promptIdx % JOURNAL_PROMPTS.length])}{' '}
                <button type="button" className="font-bold underline" onClick={() => setPromptIdx((n) => n + 1)}>
                  {t('journal.nextPrompt')}
                </button>
              </span>
            </div>
            <div>
              <label className="label" htmlFor="j-text">{t('journal.write')}</label>
              <textarea id="j-text" className="input min-h-[140px]" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={!text.trim()}>{t('journal.save')}</button>
            <p className="text-sm text-slate-600">{t('journal.private')}</p>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-2 text-lg font-bold text-ink">{t('journal.moodTrend')}</h2>
          {chart.length < 2 ? (
            <p className="py-10 text-center text-slate-600">{t('journal.needMore')}</p>
          ) : (
            <div className="h-56" role="img" aria-label={t('journal.moodTrend')}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart}>
                  <defs>
                    <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#8b5cf6" stopOpacity={0.5} />
                      <stop offset="1" stopColor="#ec4899" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} width={24} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="mood" stroke="#7c3aed" strokeWidth={3} fill="url(#moodFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </GlassCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-3 text-lg font-bold text-ink">{t('journal.entries')}</h2>
          {sorted.length === 0 ? (
            <p className="text-slate-600">{t('journal.none')}</p>
          ) : (
            <ul className="space-y-3">
              {sorted.map((j) => {
                const m = MOODS.find((x) => x.value === j.mood);
                return (
                  <li key={j.id} className="rounded-2xl border border-brand-100 bg-white/80 p-4">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-brand-800">{m?.emoji} {tr(m?.label)} · {fmt(j.date)}{(j.demo || ['j1', 'j2', 'j3'].includes(j.id)) ? ` · ${t('common.demoData')}` : ''}</span>
                      <button type="button" className="btn-danger btn-sm" onClick={() => deleteJournalEntry(j.id)} aria-label={t('common.delete')}>
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <p className="whitespace-pre-line text-slate-800">{j.text}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </GlassCard>

        <GlassCard>
          <h2 className="mb-3 text-lg font-bold text-ink">{t('journal.timeline')}</h2>
          <ol className="relative space-y-4 border-l-4 border-brand-200 pl-5">
            {timeline.map((it) => (
              <li key={it.id} className="relative">
                <span
                  className={`absolute -left-[30px] top-1 h-4 w-4 rounded-full border-2 border-white ${
                    it.kind === 'incident' ? 'bg-red-500' : it.kind === 'resolved' ? 'bg-emerald-500' : 'bg-brand-500'
                  }`}
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold text-slate-600">{fmt(it.date)} · {t(`journal.kind.${it.kind}`)}{it.demo ? ` · ${t('common.demoData')}` : ''}</p>
                <p className="text-base text-ink">{it.text.length > 110 ? `${it.text.slice(0, 110)}…` : it.text}</p>
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>
    </div>
  );
}
