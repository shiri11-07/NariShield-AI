import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, GitBranch, Send, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import GuidancePanel from '../components/GuidancePanel';
import SaveIncidentButton from '../components/SaveIncidentButton';
import { SeverityBadge, CategoryChip } from '../components/Badges';
import { useLang } from '../context/LanguageContext';
import { analyze, EXAMPLE_PROMPTS } from '../utils/assistantEngine';
import { FLAGS, START_BRANCH } from '../data/assistantRules';

function Reply({ message }) {
  const { t, tr } = useLang();
  const r = message.result;
  const [checked, setChecked] = useState({});
  const flagLabels = r.flags.map((id) => FLAGS.find((f) => f.id === id)).filter(Boolean);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryChip category={r.primary} />
        <SeverityBadge level={r.risk} />
        {flagLabels.map((f) => (
          <span key={f.id} className="chip border-brand-200 bg-white/80 text-brand-800">
            {tr(f.label)}
          </span>
        ))}
      </div>
      <div>
        <h3 className="mb-1 text-lg font-bold text-ink">{t('assistant.riskExplained')}</h3>
        <p className="text-base leading-relaxed text-slate-700">{tr(r.explanation)}</p>
      </div>
      {r.panic && (
        <p className="rounded-2xl bg-blush-50 p-3 text-base font-medium text-blush-500" role="note">
          {t('assistant.panicNote')}{' '}
          <Link to="/calm" className="font-bold underline">
            {t('nav.calm')}
          </Link>
        </p>
      )}
      <GuidancePanel
        steps={r.steps}
        evidence={r.evidence}
        resources={r.resources}
        checked={checked}
        onToggle={(id) => setChecked((c) => ({ ...c, [id]: !c[id] }))}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <SaveIncidentButton
          category={r.primary}
          severity={r.risk}
          summary={message.text}
          checklist={checked}
        />
        {START_BRANCH[r.primary] && (
          <Link to={`/guide?start=${START_BRANCH[r.primary]}`} className="btn-soft">
            <GitBranch size={20} aria-hidden="true" />
            {t('assistant.refine')}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Assistant() {
  const { t, tr } = useLang();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  const send = (textArg) => {
    const text = (textArg ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), text, result: analyze(text) }]);
    setInput('');
  };

  return (
    <div>
      <PageHeader icon={Bot} title={t('assistant.title')} subtitle={t('assistant.subtitle')} />

      <GlassCard className="mb-4">
        <p className="flex items-start gap-2 text-base text-slate-700">
          <Sparkles size={20} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
          {t('assistant.how')}
        </p>
      </GlassCard>

      <div className="space-y-4" aria-live="polite">
        {messages.length === 0 && (
          <GlassCard>
            <h2 className="mb-3 text-lg font-bold text-ink">{t('assistant.tryExamples')}</h2>
            <div className="flex flex-col gap-2">
              {EXAMPLE_PROMPTS.map((p, i) => (
                <button key={i} type="button" onClick={() => send(tr(p))} className="btn-soft !justify-start text-left">
                  {tr(p)}
                </button>
              ))}
            </div>
          </GlassCard>
        )}
        {messages.map((m) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="ml-auto max-w-[90%] rounded-3xl rounded-br-md bg-gradient-to-r from-brand-600 to-indigo-600 p-4 text-white shadow-lg sm:max-w-[75%]">
              {m.text}
            </div>
            <GlassCard className="max-w-full">
              <Reply message={m} />
            </GlassCard>
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="glass-strong sticky bottom-24 mt-4 flex items-end gap-2 p-3 lg:bottom-4"
      >
        <label htmlFor="assistant-input" className="sr-only">
          {t('assistant.inputLabel')}
        </label>
        <textarea
          id="assistant-input"
          rows={2}
          className="input flex-1 resize-none"
          placeholder={t('assistant.placeholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button type="submit" className="btn-primary !min-h-[56px]" disabled={!input.trim()} aria-label={t('assistant.send')}>
          <Send size={20} aria-hidden="true" />
          <span className="hidden sm:inline">{t('assistant.send')}</span>
        </button>
      </form>
    </div>
  );
}
