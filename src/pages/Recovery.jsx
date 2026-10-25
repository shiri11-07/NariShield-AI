import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, HeartPulse, LockKeyhole, RotateCcw, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import ChecklistItem from '../components/ChecklistItem';
import ProgressBar from '../components/ProgressBar';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { ENCOURAGEMENTS, PRIVACY_REMINDERS, RECOVERY_GROUPS } from '../data/recoveryData';
import { RESOURCES } from '../data/library';
import ResourceList from '../components/ResourceList';
import { computeRecoveryScore, groupCompletion } from '../utils/score';

export default function Recovery() {
  const { recoveryDone, toggleRecovery, incidents, circle, journal, resetDemo, wipeAll, notify } = useApp();
  const { t, tr } = useLang();
  const score = useMemo(
    () => computeRecoveryScore({ recoveryDone, incidents, circle, journal }),
    [recoveryDone, incidents, circle, journal],
  );
  const message = ENCOURAGEMENTS[(new Date().getDate() + incidents.length) % ENCOURAGEMENTS.length];

  return (
    <div className="space-y-6">
      <PageHeader icon={HeartPulse} title={t('recovery.title')} subtitle={t('recovery.subtitle')} />

      <GlassCard className="bg-gradient-to-br from-white/85 to-blush-100/80">
        <div className="flex items-start gap-4">
          <Heart size={32} className="shrink-0 text-blush-500" aria-hidden="true" />
          <div>
            <p className="text-xl font-bold leading-snug text-ink">{tr(message)}</p>
            <p className="mt-2 text-sm text-slate-600">{t('recovery.notFault')}</p>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={score.total} label={t('dash.recoveryScore')} tone="pink" height="h-4" />
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        {RECOVERY_GROUPS.map((g) => (
          <GlassCard key={g.id}>
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-ink">
              <Icon name={g.icon} size={22} className="text-brand-600" />
              {tr(g.title)}
            </h2>
            <div className="mb-4">
              <ProgressBar value={groupCompletion(g, recoveryDone) * 100} showValue label="" />
            </div>
            <div className="space-y-2">
              {g.items.map((it) => (
                <ChecklistItem key={it.id} checked={recoveryDone[it.id]} onToggle={() => toggleRecovery(it.id)}>
                  {tr(it.text)}
                </ChecklistItem>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h2 className="mb-3 text-lg font-bold text-ink">{t('recovery.support')}</h2>
        <ResourceList ids={['telemanas', 'h1091', 'cybercrime']} />
        <p className="mt-3 text-sm text-slate-600">{t('recovery.journalHint')} <Link to="/journal" className="font-bold text-brand-700 underline">{t('nav.journal')}</Link></p>
      </GlassCard>

      <GlassCard>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
          <LockKeyhole size={20} className="text-brand-600" aria-hidden="true" />
          {t('recovery.privacyTitle')}
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-base text-slate-700">
          {PRIVACY_REMINDERS.map((p, i) => <li key={i}>{tr(p)}</li>)}
        </ul>
      </GlassCard>

      <GlassCard>
        <h2 className="mb-2 text-lg font-bold text-ink">{t('recovery.dataTitle')}</h2>
        <p className="mb-4 text-slate-700">{t('recovery.dataText')}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn-soft"
            onClick={() => {
              resetDemo();
              notify(t('recovery.resetDone'));
            }}
          >
            <RotateCcw size={20} aria-hidden="true" />
            {t('recovery.resetDemo')}
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={() => {
              if (window.confirm(t('recovery.wipeConfirm'))) {
                wipeAll();
                notify(t('recovery.wipeDone'), 'info');
              }
            }}
          >
            <Trash2 size={20} aria-hidden="true" />
            {t('recovery.wipe')}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
