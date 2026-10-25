import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, GitBranch, RotateCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import GuidancePanel from '../components/GuidancePanel';
import SaveIncidentButton from '../components/SaveIncidentButton';
import { SeverityBadge, CategoryChip } from '../components/Badges';
import { useLang } from '../context/LanguageContext';
import { NODES, TREE_START } from '../data/decisionTree';

export default function Guide() {
  const { t, tr } = useLang();
  const [params] = useSearchParams();
  const startParam = params.get('start');
  const first = NODES[startParam] ? startParam : TREE_START;
  // path = list of { node, answer } so the user can step back
  const [path, setPath] = useState([{ id: first, answer: null }]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    setPath([{ id: first, answer: null }]);
    setChecked({});
  }, [first]);

  const current = NODES[path[path.length - 1].id];
  const choose = (option) => {
    setPath((p) => [...p, { id: option.next, answer: tr(option.label) }]);
    setChecked({});
  };
  const back = () => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
  const restart = () => {
    setPath([{ id: TREE_START, answer: null }]);
    setChecked({});
  };

  const answers = path.slice(1);

  return (
    <div>
      <PageHeader icon={GitBranch} title={t('guide.title')} subtitle={t('guide.subtitle')} />

      {answers.length > 0 && (
        <GlassCard className="mb-4 !p-4">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-700">{t('guide.yourPath')}</p>
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {answers.map((a, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} aria-hidden="true" className="text-brand-400" />}
                <span className="rounded-full bg-brand-100 px-3 py-1 font-semibold text-brand-800">{a.answer}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={path.map((p) => p.id).join('>')}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          {current.outcome ? (
            <GlassCard>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <CategoryChip category={current.category} />
                <SeverityBadge level={current.severity} />
              </div>
              <h2 className="text-2xl font-extrabold text-ink">{tr(current.title)}</h2>
              <p className="mb-6 mt-2 text-base leading-relaxed text-slate-700">{tr(current.summary)}</p>
              <GuidancePanel
                steps={current.steps}
                evidence={current.evidence}
                resources={current.resources}
                checked={checked}
                onToggle={(id) => setChecked((c) => ({ ...c, [id]: !c[id] }))}
              />
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <SaveIncidentButton
                  category={current.category}
                  severity={current.severity}
                  title={tr(current.title)}
                  summary={`${tr(current.title)}. ${answers.map((a) => a.answer).join(' → ')}`}
                  checklist={checked}
                />
                <button type="button" className="btn-soft" onClick={back}>
                  <ArrowLeft size={20} aria-hidden="true" />
                  {t('guide.back')}
                </button>
                <button type="button" className="btn-soft" onClick={restart}>
                  <RotateCcw size={20} aria-hidden="true" />
                  {t('guide.restart')}
                </button>
              </div>
            </GlassCard>
          ) : (
            <GlassCard>
              <h2 className="mb-5 text-2xl font-extrabold text-ink">{tr(current.q)}</h2>
              <div className="grid gap-3">
                {current.options.map((o) => (
                  <button
                    key={o.next}
                    type="button"
                    onClick={() => choose(o)}
                    className="flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border-2 border-brand-100 bg-white/90 px-5 py-4 text-left text-lg font-semibold text-ink transition hover:border-brand-500 hover:bg-brand-50"
                  >
                    <span>{tr(o.label)}</span>
                    <ChevronRight size={22} className="shrink-0 text-brand-600" aria-hidden="true" />
                  </button>
                ))}
              </div>
              {path.length > 1 && (
                <div className="mt-5 flex gap-3">
                  <button type="button" className="btn-soft" onClick={back}>
                    <ArrowLeft size={20} aria-hidden="true" />
                    {t('guide.back')}
                  </button>
                  <button type="button" className="btn-soft" onClick={restart}>
                    <RotateCcw size={20} aria-hidden="true" />
                    {t('guide.restart')}
                  </button>
                </div>
              )}
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
