import { useState } from 'react';
import { MapPinned, Printer } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import ChecklistItem from '../components/ChecklistItem';
import Icon from '../components/Icon';
import { SeverityBadge } from '../components/Badges';
import { useLang } from '../context/LanguageContext';
import { ITEMS, OPTIONS, SCENARIOS, buildPlan } from '../data/boundaryData';

const FIELDS = ['time', 'venue', 'familiarity', 'transport', 'duration'];
const DEFAULTS = { time: 'day', venue: 'public', familiarity: 'some', transport: 'own', duration: 'short', payment: 'cash' };

export default function Boundary() {
  const { t, tr } = useLang();
  const [scenario, setScenario] = useState('meetup');
  const [inputs, setInputs] = useState(DEFAULTS);
  const [plan, setPlan] = useState(null);
  const [done, setDone] = useState({});

  const generate = () => {
    setPlan(buildPlan(scenario, inputs));
    setDone({});
  };
  const fields = scenario === 'marketplace' ? [...FIELDS, 'payment'] : FIELDS;
  const sections = plan
    ? [
        ['before', 'boundary.before'],
        ['during', 'boundary.during'],
        ['after', 'boundary.after'],
      ]
    : [];
  const total = plan ? plan.before.length + plan.during.length + plan.after.length : 0;
  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div>
      <PageHeader icon={MapPinned} title={t('boundary.title')} subtitle={t('boundary.subtitle')} />

      <GlassCard className="mb-5">
        <h2 className="mb-3 text-lg font-bold text-ink">{t('boundary.pick')}</h2>
        <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={t('boundary.pick')}>
          {Object.entries(SCENARIOS).map(([id, s]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={scenario === id}
              onClick={() => {
                setScenario(id);
                setPlan(null);
              }}
              className={`flex min-h-[88px] items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                scenario === id ? 'border-brand-600 bg-brand-50' : 'border-brand-100 bg-white/80 hover:border-brand-300'
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-blush-500 text-white">
                <Icon name={s.icon} size={24} />
              </span>
              <span>
                <span className="block text-lg font-bold text-ink">{tr(s.title)}</span>
                <span className="block text-sm text-slate-600">{tr(s.desc)}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((f) => (
            <div key={f}>
              <label className="label" htmlFor={`bp-${f}`}>{t(`boundary.f.${f}`)}</label>
              <select
                id={`bp-${f}`}
                className="input"
                value={inputs[f]}
                onChange={(e) => setInputs({ ...inputs, [f]: e.target.value })}
              >
                {OPTIONS[f].map((o) => (
                  <option key={o.id} value={o.id}>{tr(o.label)}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button type="button" className="btn-primary mt-5" onClick={generate}>
          {t('boundary.generate')}
        </button>
      </GlassCard>

      {plan && (
        <div className="space-y-5">
          <GlassCard className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-ink">{t('boundary.exposure')}</span>
              <SeverityBadge level={plan.exposure === 'high' ? 'high' : plan.exposure === 'medium' ? 'medium' : 'low'} />
            </div>
            <p className="font-semibold text-slate-700">{t('boundary.done', { a: doneCount, b: total })}</p>
            <button type="button" className="btn-soft btn-sm no-print" onClick={() => window.print()}>
              <Printer size={18} aria-hidden="true" />
              {t('boundary.print')}
            </button>
          </GlassCard>
          <div className="grid gap-5 lg:grid-cols-3">
            {sections.map(([key, label]) => (
              <GlassCard key={key}>
                <h2 className="mb-3 text-lg font-bold text-ink">{t(label)}</h2>
                <div className="space-y-2">
                  {plan[key].map((id) => (
                    <ChecklistItem key={id} checked={done[id]} onToggle={() => setDone((d) => ({ ...d, [id]: !d[id] }))}>
                      {tr(ITEMS[id])}
                    </ChecklistItem>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
