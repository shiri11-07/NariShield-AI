import { useState } from 'react';
import { ClipboardCheck, ListChecks, Phone } from 'lucide-react';
import { ACTIONS, EVIDENCE } from '../data/library';
import { useLang } from '../context/LanguageContext';
import ChecklistItem from './ChecklistItem';
import ResourceList from './ResourceList';
import ProgressBar from './ProgressBar';

/**
 * Renders suggested actions, an evidence checklist and where-to-report resources.
 * Ticks are local to the panel; saving as an incident carries the ticks over via onChange.
 */
export default function GuidancePanel({ steps = [], evidence = [], resources = [], checked, onToggle }) {
  const { t, tr } = useLang();
  const [local, setLocal] = useState({});
  const state = checked || local;
  const toggle = (id) => {
    if (onToggle) onToggle(id);
    else setLocal((s) => ({ ...s, [id]: !s[id] }));
  };
  const total = steps.length + evidence.length;
  const done = [...steps, ...evidence].filter((id) => state[id]).length;

  return (
    <div className="space-y-6">
      <ProgressBar value={total ? (done / total) * 100 : 0} label={t('guide.progress')} tone="green" />

      <section aria-labelledby="gp-steps">
        <h3 id="gp-steps" className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
          <ListChecks size={20} className="text-brand-600" aria-hidden="true" />
          {t('guide.suggestedActions')}
        </h3>
        <div className="space-y-2">
          {steps.map((id, i) => (
            <ChecklistItem key={id} index={i + 1} checked={state[id]} onToggle={() => toggle(id)}>
              {tr(ACTIONS[id])}
            </ChecklistItem>
          ))}
        </div>
      </section>

      <section aria-labelledby="gp-evidence">
        <h3 id="gp-evidence" className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
          <ClipboardCheck size={20} className="text-brand-600" aria-hidden="true" />
          {t('guide.evidenceChecklist')}
        </h3>
        <div className="space-y-2">
          {evidence.map((id) => (
            <ChecklistItem key={id} checked={state[id]} onToggle={() => toggle(id)}>
              {tr(EVIDENCE[id])}
            </ChecklistItem>
          ))}
        </div>
      </section>

      {resources.length > 0 && (
        <section aria-labelledby="gp-resources">
          <h3 id="gp-resources" className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
            <Phone size={20} className="text-brand-600" aria-hidden="true" />
            {t('guide.whereToReport')}
          </h3>
          <ResourceList ids={resources} />
        </section>
      )}
    </div>
  );
}
