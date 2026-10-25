import { RECOVERY_GROUPS } from '../data/recoveryData';
import { incidentProgress } from './guides';

const TOTAL_RECOVERY_ITEMS = RECOVERY_GROUPS.reduce((n, g) => n + g.items.length, 0);

export function recoveryCompletion(recoveryDone) {
  const done = RECOVERY_GROUPS.reduce(
    (n, g) => n + g.items.filter((it) => recoveryDone[it.id]).length,
    0,
  );
  return TOTAL_RECOVERY_ITEMS ? done / TOTAL_RECOVERY_ITEMS : 0;
}

export function groupCompletion(group, recoveryDone) {
  const done = group.items.filter((it) => recoveryDone[it.id]).length;
  return group.items.length ? done / group.items.length : 0;
}

export function actionCompletion(incidents) {
  if (!incidents.length) return 0;
  const total = incidents.reduce((n, inc) => n + incidentProgress(inc), 0);
  return total / incidents.length / 100;
}

/**
 * Recovery score (0-100): a transparent blend of four behaviours, not a clinical measure.
 *  - 40% recovery & security checklist completion
 *  - 30% action-plan completion across incidents
 *  - 15% having a Trusted Circle (up to 3 people)
 *  - 15% reflecting in the journal recently (up to 3 entries in the last 14 days)
 */
export function computeRecoveryScore({ recoveryDone, incidents, circle, journal }) {
  const recovery = recoveryCompletion(recoveryDone);
  const actions = actionCompletion(incidents);
  const circleScore = Math.min(circle.length, 3) / 3;
  const cutoff = Date.now() - 14 * 24 * 3600 * 1000;
  const recent = journal.filter((j) => new Date(j.date).getTime() >= cutoff).length;
  const journalScore = Math.min(recent, 3) / 3;

  const parts = {
    recovery: Math.round(recovery * 40),
    actions: Math.round(actions * 30),
    circle: Math.round(circleScore * 15),
    journal: Math.round(journalScore * 15),
  };
  const total = parts.recovery + parts.actions + parts.circle + parts.journal;
  return { total, parts, recovery, actions, circleScore, journalScore };
}
