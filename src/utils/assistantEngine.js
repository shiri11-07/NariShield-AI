import { RULES, FALLBACK, FLAGS } from '../data/assistantRules';
import { SEVERITY_ORDER } from '../data/categories';

/**
 * Rule-based safety assistant. Pure JavaScript, fully offline.
 * analyze(text) -> {
 *   primary, matches[], risk, flags[], panic, explanation, steps[], evidence[], resources[], understood
 * }
 */

function bump(risk, levels = 1) {
  const i = SEVERITY_ORDER.indexOf(risk);
  return SEVERITY_ORDER[Math.min(SEVERITY_ORDER.length - 1, i + levels)];
}

function maxRisk(a, b) {
  return SEVERITY_ORDER.indexOf(a) >= SEVERITY_ORDER.indexOf(b) ? a : b;
}

function scoreRule(rule, text) {
  let hits = 0;
  for (const p of rule.patterns) {
    if (p.test(text)) hits += 1;
  }
  return hits * rule.weight;
}

function unique(list) {
  return Array.from(new Set(list));
}

export function analyze(rawText) {
  const text = (rawText || '').trim();
  if (!text) return null;

  const scored = RULES.map((rule) => ({ rule, score: scoreRule(rule, text) }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  const flags = FLAGS.filter((f) => f.pattern.test(text)).map((f) => f.id);
  const has = (id) => flags.includes(id);

  // ----- No category matched: gentle fallback ------------------------------------
  if (scored.length === 0) {
    const steps = [...FALLBACK.steps];
    if (has('panic')) steps.unshift('support_wellbeing');
    return {
      understood: false,
      primary: 'other',
      matches: [],
      risk: has('physical') ? 'high' : 'low',
      flags,
      panic: has('panic'),
      explanation: FALLBACK.explanation,
      steps: unique(steps),
      evidence: FALLBACK.evidence,
      resources: FALLBACK.resources,
    };
  }

  const primaryRule = scored[0].rule;
  const matches = scored.map((m) => ({ id: m.rule.id, score: m.score }));

  // ----- Risk calculation -------------------------------------------------------
  let risk = primaryRule.risk;
  scored.forEach((m) => {
    risk = maxRisk(risk, m.rule.risk);
  });
  const ids = matches.map((m) => m.id);
  if (has('physical')) risk = 'critical';
  if (has('minor')) risk = 'critical';
  if (has('money') && (ids.includes('blackmail') || ids.includes('sextortion'))) risk = 'critical';
  if (has('money') && ids.includes('fake_profile')) risk = maxRisk(risk, 'high');
  if (has('deadline') && risk !== 'critical') risk = bump(risk, 1);
  if (has('persistent') && risk !== 'critical') risk = bump(risk, 1);

  // ----- Steps: signal-driven first, then the primary category, then others -------
  const steps = [];
  if (has('physical') || risk === 'critical') steps.push('call_112');
  if (has('minor')) steps.push('childline', 'no_forward');
  if (has('money') && !ids.includes('phishing')) steps.push('dont_pay');
  steps.push(...primaryRule.steps);
  scored.slice(1, 3).forEach((m) => steps.push(...m.rule.steps.slice(0, 3)));
  if (has('workplace')) steps.push('report_internal');
  if (has('known') && !has('physical')) steps.push('boundary_msg', 'legal_notice');
  if (has('panic')) steps.push('support_wellbeing');

  const evidence = [];
  evidence.push(...primaryRule.evidence);
  scored.slice(1, 3).forEach((m) => evidence.push(...m.rule.evidence.slice(0, 2)));
  const resources = [];
  if (risk === 'critical') resources.push('e112');
  if (has('minor')) resources.push('childline');
  resources.push(...primaryRule.resources);
  scored.slice(1, 3).forEach((m) => resources.push(...m.rule.resources));

  return {
    understood: true,
    primary: primaryRule.id,
    matches,
    risk,
    flags,
    panic: has('panic'),
    explanation: primaryRule.explanation,
    steps: unique(steps).slice(0, 10),
    evidence: unique(evidence).slice(0, 7),
    resources: unique(resources).slice(0, 5),
  };
}

export const EXAMPLE_PROMPTS = [
  {
    en: 'Someone created a fake Instagram account using my photos.',
    te: 'ఎవరో నా ఫోటోలతో నకిలీ ఇన్‌స్టాగ్రామ్ ఖాతా సృష్టించారు.',
  },
  {
    en: 'A stranger says he will leak my private photos unless I pay him money within 24 hours.',
    te: 'డబ్బు ఇవ్వకపోతే నా ప్రైవేట్ ఫోటోలు లీక్ చేస్తానని ఒక అపరిచితుడు 24 గంటల గడువు ఇచ్చాడు.',
  },
  {
    en: 'My ex keeps following me and I think he is tracking my phone.',
    te: 'నా ex నన్ను వెంబడిస్తున్నాడు, నా ఫోన్ ట్రాక్ చేస్తున్నాడేమో అనిపిస్తోంది.',
  },
  {
    en: 'A buyer on OLX asked me to scan a QR code to receive the advance payment.',
    te: 'OLXలో ఒక కొనుగోలుదారు అడ్వాన్స్ పొందడానికి QR కోడ్ స్కాన్ చేయమన్నాడు.',
  },
  {
    en: 'I keep getting abusive DMs from random accounts every day.',
    te: 'రోజూ అపరిచిత ఖాతాల నుండి దుర్భాషల DMలు వస్తున్నాయి.',
  },
];
