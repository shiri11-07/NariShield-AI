import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Bot, ChevronRight, FolderLock, GitBranch, LockKeyhole, ShieldCheck, Wind } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { CategoryChip, SeverityBadge, StatusBadge } from '../components/Badges';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';
import { PRIVACY_REMINDERS } from '../data/recoveryData';
import { computeRecoveryScore } from '../utils/score';
import { incidentProgress } from '../utils/guides';
import { assetUrl } from '../utils/imageTools';
import { fadeUp, stagger } from '../animations/variants';

function ScoreRing({ value, label }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto h-40 w-40" role="img" aria-label={`${label}: ${value}/100`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#ede9fe" strokeWidth="12" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#ring)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-ink">{value}</span>
        <span className="text-xs font-semibold text-slate-600">/ 100</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { incidents, circle, journal, recoveryDone } = useApp();
  const { t, tr, fmt } = useLang();

  const score = useMemo(
    () => computeRecoveryScore({ recoveryDone, incidents, circle, journal }),
    [recoveryDone, incidents, circle, journal],
  );

  const byCategory = useMemo(() => {
    const counts = {};
    incidents.forEach((i) => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return Object.entries(counts).map(([id, value]) => ({
      id,
      name: tr(CATEGORIES[id]?.label),
      value,
      color: CATEGORIES[id]?.color || '#64748b',
    }));
  }, [incidents, tr]);

  const bySeverity = useMemo(
    () =>
      ['low', 'medium', 'high', 'critical'].map((s) => ({
        name: s,
        count: incidents.filter((i) => i.severity === s).length,
      })),
    [incidents],
  );

  const open = incidents.filter((i) => i.status !== 'resolved').length;
  const avgProgress = incidents.length
    ? Math.round(incidents.reduce((n, i) => n + incidentProgress(i), 0) / incidents.length)
    : 0;
  const reminder = PRIVACY_REMINDERS[new Date().getDate() % PRIVACY_REMINDERS.length];

  const sevLabels = { low: t('sev.low'), medium: t('sev.medium'), high: t('sev.high'), critical: t('sev.critical') };

  return (
    <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="space-y-6">
      {/* Hero */}
      <motion.section variants={fadeUp} className="glass-strong grid items-center gap-6 overflow-hidden p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-800">
            <ShieldCheck size={16} aria-hidden="true" />
            {t('dash.badge')}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            {t('dash.heroA')} <span className="gradient-text">{t('dash.heroB')}</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-slate-700">{t('dash.heroText')}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link to="/assistant" className="btn-primary">
              <Bot size={20} aria-hidden="true" />
              {t('dash.ctaAssistant')}
            </Link>
            <Link to="/guide" className="btn-soft">
              <GitBranch size={20} aria-hidden="true" />
              {t('dash.ctaGuide')}
            </Link>
            <Link to="/calm" className="btn-pink">
              <Wind size={20} aria-hidden="true" />
              {t('nav.calm')}
            </Link>
          </div>
        </div>
        <img src={assetUrl('illustrations/hero.svg')} alt="" className="mx-auto hidden max-h-64 animate-floaty md:block" />
      </motion.section>

      {/* Stats */}
      <motion.section variants={fadeUp} className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label={t('dash.stats')}>
        {[
          { label: t('dash.incidents'), value: incidents.length },
          { label: t('dash.open'), value: open },
          { label: t('dash.avgProgress'), value: `${avgProgress}%` },
          { label: t('dash.circleSize'), value: circle.length },
        ].map((s) => (
          <div key={s.label} className="glass p-4 text-center">
            <p className="text-3xl font-extrabold text-ink">{s.value}</p>
            <p className="text-sm font-semibold text-slate-600">{s.label}</p>
          </div>
        ))}
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recovery score */}
        <GlassCard animate className="text-center">
          <h2 className="mb-3 text-lg font-bold text-ink">{t('dash.recoveryScore')}</h2>
          <ScoreRing value={score.total} label={t('dash.recoveryScore')} />
          <ul className="mt-4 space-y-1 text-left text-sm text-slate-700">
            <li className="flex justify-between"><span>{t('dash.partRecovery')}</span><b>{score.parts.recovery}/40</b></li>
            <li className="flex justify-between"><span>{t('dash.partActions')}</span><b>{score.parts.actions}/30</b></li>
            <li className="flex justify-between"><span>{t('dash.partCircle')}</span><b>{score.parts.circle}/15</b></li>
            <li className="flex justify-between"><span>{t('dash.partJournal')}</span><b>{score.parts.journal}/15</b></li>
          </ul>
          <p className="mt-3 text-xs text-slate-600">{t('dash.scoreNote')}</p>
          <Link to="/recovery" className="btn-soft btn-sm mt-3">{t('nav.recovery')}</Link>
        </GlassCard>

        {/* Risk categories */}
        <GlassCard animate>
          <h2 className="mb-2 text-lg font-bold text-ink">{t('dash.categories')}</h2>
          {byCategory.length === 0 ? (
            <p className="py-10 text-center text-slate-600">{t('dash.noData')}</p>
          ) : (
            <>
              <div className="h-48" role="img" aria-label={t('dash.categories')}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={42} outerRadius={78} paddingAngle={3}>
                      {byCategory.map((d) => (
                        <Cell key={d.id} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {byCategory.map((d) => (
                  <li key={d.id} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ background: d.color }} aria-hidden="true" />
                      {d.name}
                    </span>
                    <b>{d.value}</b>
                  </li>
                ))}
              </ul>
            </>
          )}
        </GlassCard>

        {/* Severity */}
        <GlassCard animate>
          <h2 className="mb-2 text-lg font-bold text-ink">{t('dash.severity')}</h2>
          <div className="h-48" role="img" aria-label={t('dash.severity')}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bySeverity.map((d) => ({ ...d, label: sevLabels[d.name] }))}>
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} width={24} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {bySeverity.map((d) => (
                    <Cell key={d.name} fill={{ low: '#059669', medium: '#d97706', high: '#ea580c', critical: '#b91c1c' }[d.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <ProgressBar value={avgProgress} label={t('dash.avgProgress')} tone="pink" />
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* History */}
        <GlassCard animate>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <FolderLock size={20} className="text-brand-600" aria-hidden="true" />
              {t('dash.history')}
            </h2>
            <Link to="/evidence" className="font-semibold text-brand-700 underline">{t('dash.viewAll')}</Link>
          </div>
          {incidents.length === 0 ? (
            <p className="py-6 text-center text-slate-600">{t('evidence.empty')}</p>
          ) : (
            <ul className="space-y-3">
              {[...incidents]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((inc) => (
                  <li key={inc.id}>
                    <Link
                      to={`/evidence/${inc.id}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-white/80 p-3 transition hover:border-brand-300"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-ink">{inc.title}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-2">
                          <CategoryChip category={inc.category} />
                          <SeverityBadge level={inc.severity} />
                          <StatusBadge status={inc.status} />
                          {(inc.demo || inc.id?.startsWith('demo_')) && <span className="chip border-amber-300 bg-amber-50 text-amber-900">{t('common.demoData')}</span>}
                        </span>
                        <span className="mt-1 block text-xs text-slate-600">{fmt(inc.createdAt, false)}</span>
                      </span>
                      <ChevronRight size={20} className="shrink-0 text-brand-500" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </GlassCard>

        {/* Privacy */}
        <GlassCard animate className="bg-gradient-to-br from-white/80 to-brand-100/70">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-ink">
            <LockKeyhole size={20} className="text-brand-600" aria-hidden="true" />
            {t('dash.privacy')}
          </h2>
          <p className="text-base text-slate-700">{tr(reminder)}</p>
          <Link to="/privacy" className="btn-soft btn-sm mt-4">{t('nav.privacy')}</Link>
        </GlassCard>
      </div>
    </motion.div>
  );
}
