import { RULES, FALLBACK } from '../data/assistantRules';
import { ACTIONS, EVIDENCE, RESOURCES } from '../data/library';
import { CATEGORIES, SEVERITY, STATUS } from '../data/categories';

// Action plan + evidence checklist recommended for an incident category.
export function getCategoryGuide(category) {
  const rule = RULES.find((r) => r.id === category);
  const base = rule || FALLBACK;
  return {
    steps: base.steps,
    evidence: base.evidence,
    resources: base.resources,
  };
}

export function incidentProgress(incident) {
  const guide = getCategoryGuide(incident.category);
  const ids = [...guide.steps, ...guide.evidence];
  if (!ids.length) return 0;
  const done = ids.filter((id) => incident.checklist && incident.checklist[id]).length;
  return Math.round((done / ids.length) * 100);
}

// Plain-text evidence summary (downloadable / copyable). Written for the person who owns the data.
export function buildIncidentSummary(incident, lang, fmtDate) {
  const tr = (o) => (o && (o[lang] || o.en)) || '';
  const guide = getCategoryGuide(incident.category);
  const lines = [];
  lines.push('NariShield AI — Incident summary (prepared locally on this device)');
  lines.push('='.repeat(64));
  lines.push(`Title: ${incident.title}`);
  lines.push(`Category: ${tr(CATEGORIES[incident.category]?.label)}`);
  lines.push(`Severity: ${tr(SEVERITY[incident.severity]?.label)}`);
  lines.push(`Status: ${tr(STATUS[incident.status]?.label)}`);
  lines.push(`Platform: ${incident.platform || '-'}`);
  lines.push(`Created: ${fmtDate(incident.createdAt)}`);
  if (incident.summary) {
    lines.push('');
    lines.push('What happened:');
    lines.push(incident.summary);
  }
  lines.push('');
  lines.push('Timeline:');
  const events = [...(incident.events || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
  if (!events.length) lines.push('  (no events recorded yet)');
  events.forEach((e, i) => {
    lines.push(`  ${i + 1}. [${fmtDate(e.date)}] ${e.title}${e.detail ? ` — ${e.detail}` : ''}${e.url ? ` (${e.url})` : ''}${e.image ? ' [screenshot saved]' : ''}`);
  });
  lines.push('');
  lines.push('Action plan progress:');
  guide.steps.forEach((id) => {
    lines.push(`  [${incident.checklist?.[id] ? 'x' : ' '}] ${tr(ACTIONS[id])}`);
  });
  lines.push('');
  lines.push('Evidence collected:');
  guide.evidence.forEach((id) => {
    lines.push(`  [${incident.checklist?.[id] ? 'x' : ' '}] ${tr(EVIDENCE[id])}`);
  });
  lines.push('');
  lines.push('Where to report:');
  guide.resources.forEach((id) => {
    const r = RESOURCES[id];
    lines.push(`  - ${tr(r.label)}: ${r.detail}`);
  });
  lines.push('');
  lines.push('This is a guidance prototype, not legal advice. Helpline numbers are for India.');
  return lines.join('\n');
}
